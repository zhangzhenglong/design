import pandas as pd
import asyncio
import time
import json
import math # calculate_dashboard_standards uses it
import os   # calculate_dashboard_standards uses it (for .env)
# from dotenv import load_dotenv, find_dotenv # Not strictly needed here if ENV vars are already set

# --- Configuration ---
INPUT_EXCEL_FILE = 'input_patients.xlsx'  # Your input Excel file
OUTPUT_EXCEL_FILE = 'output_patients_with_nutrition.xlsx' # Output file
ERROR_SAVE_EXCEL_FILE = 'output_patients_PARTIAL_ERROR.xlsx' # Error save file
NEW_COLUMN_NAME = 'NutritionalStandards' # Name for the new column

# Define your Excel column names HERE
# These MUST match the column headers in your input_patients.xlsx
PATIENT_ID_COLUMN = 'PatientID' # Example: '用户ID', '患者编号'
HEIGHT_CM_COLUMN = 'Height(cm)'   # Example: '身高cm'
WEIGHT_KG_COLUMN = 'Weight(kg)'   # Example: '体重kg'
AGE_COLUMN = 'Age'                # Example: '年龄'
GENDER_COLUMN = 'Gender'          # Example: '性别' (should contain 'Male' or 'Female')
PAL_COLUMN = 'PAL'                # Example: '体力活动水平'
MEDICAL_CONDITIONS_COLUMN = 'MedicalConditions' # Example: '医疗状况' (e.g., "I50.0, E11.2")

# Optional columns (if they don't exist in your Excel, they will be passed as None)
EGFR_COLUMN = 'eGFR'
HBA1C_COLUMN = 'HbA1c'
ALBUMIN_COLUMN = 'Albumin'
DIURETIC_USE_COLUMN = 'DiureticUse' # Expects True/False or 1/0 if present

# --- Your Calculation Logic (calculate_dashboard_standards) ---
# (Paste your entire calculate_dashboard_standards function here)
# For brevity, I'll assume it's defined above or in an imported module
# Make sure it's accessible in this script's scope.

# Example: Assuming your calculate_dashboard_standards is in a file named 'nutrition_calculator.py'
# from nutrition_calculator import calculate_dashboard_standards
# OR, paste the full function definition here:

def calculate_dashboard_standards(
    patient_id: str,
    height_cm: float,
    weight_kg: float,  # Actual Body Weight (ABW)
    age: int,
    gender: str,  # 'Male' or 'Female'
    pal: float,  # Physical Activity Level factor
    medical_conditions: list,  # List of ICD-10 codes e.g., ['I50.x', 'E11.x']
    # Optional inputs
    egfr: float = None,
    hba1c: float = None,
    albumin: float = None,
    diuretic_use: bool = False
):
    """
    Calculates nutritional dashboard standards based on patient data and medical conditions.
    根据患者数据和医疗状况计算营养仪表盘标准。
    """
    print(
        f"\n--- Starting Calculation for Patient ID: {patient_id} / 开始为患者 ID 计算: {patient_id} ---")

    results = {
        "Patient ID": patient_id,
        "BMI": None,
        "Calculation Weight (kg)": None,
        "Energy (kcal)": {"min": None, "max": None, "unit": "kcal"},
        "Protein (g)": {"min": None, "max": None, "unit": "g"},
        "Fat (g)": {"min": None, "max": None, "unit": "g"},
        "Carbohydrates (net)": {"min": None, "max": None, "unit": "g"},
        "Fluid (ml)": {"min": None, "max": None, "unit": "ml"},
        "Sodium (mg)": {"min": None, "max": None, "unit": "mg"},
        "Potassium (mg)": {"min": None, "max": None, "unit": "mg"},
        "Phosphorus (mg)": {"min": None, "max": None, "unit": "mg"},
        "Calcium (mg)": {"min": None, "max": None, "unit": "mg"},
        "Iron (mg)": {"min": None, "max": None, "unit": "mg"}
    }

    # Helper to check for conditions (handles '.x' wildcards)
    def has_condition(code_prefix):
        if not medical_conditions: # Handle empty or None medical_conditions
            return False
        for condition in medical_conditions:
            if condition and condition.startswith(code_prefix.replace('.x', '')): # Add check for condition being non-empty
                return True
        return False

    def get_ckd_stage_info():
        stage = 0
        is_dialysis = False
        specific_code = None
        if not medical_conditions:
            return stage, is_dialysis, specific_code
        for condition in medical_conditions:
            if condition and condition.startswith("N18."): # Add check for condition
                specific_code = condition
                try:
                    stage_char = condition.split('.')[1][0]
                    if stage_char.isdigit():
                        current_stage = int(stage_char)
                        stage = max(stage, current_stage)
                        if current_stage == 6: # N18.6 is ESRD, often implies dialysis
                            is_dialysis = True
                except (IndexError, ValueError):
                     # Fallback for codes like N18.G (unspecified), N18.30, N18.31 etc.
                    if "N18.6" in condition: # ESRD/Dialysis
                        stage = max(stage, 6) # Treat as highest stage for logic
                        is_dialysis = True
                    elif "N18.5" in condition:
                        stage = max(stage, 5)
                    elif "N18.4" in condition:
                        stage = max(stage, 4) # Often grouped with stage 5 for general advice
                    elif "N18.3" in condition: # Covers N18.3, N18.30, N18.31, N18.32
                        stage = max(stage, 3)
        return stage, is_dialysis, specific_code


    if not all([isinstance(height_cm, (int, float)), isinstance(weight_kg, (int, float)), height_cm > 0]):
        print(f"  -  [ERROR] Invalid height/weight for Patient ID {patient_id}. Height: {height_cm}, Weight: {weight_kg}. Skipping detailed calculation.")
        results["Error"] = "Invalid height/weight input"
        return results


    height_m = height_cm / 100
    abw = weight_kg

    print(f"\n[INFO] Step 1: Determine Calculation Weight ")
    # --- Step 1: Determine Calculation Weight ---
    bmi = abw / (height_m ** 2) if height_m > 0 else 0
    results["BMI"] = round(bmi, 1)
    print(
        f"  -  BMI Calculation. Formula: Weight (kg) / (Height (m))^2. Input: Weight={abw}kg, Height={height_m}m. Result BMI: {results['BMI']:.1f}")

    # IBW (Hamwi)
    height_in = height_cm / 2.54
    inches_over_5_ft = max(0, height_in - 60)

    if gender == 'Male':
        ibw = 48 + (2.7 * inches_over_5_ft)
    elif gender == 'Female':
        ibw = 45.5 + (2.2 * inches_over_5_ft)
    else: # Fallback if gender is not 'Male' or 'Female'
        print(f"  -  [WARNING] Unknown gender '{gender}' for patient {patient_id}. Using average of Male/Female IBW factors.")
        ibw_male = 48 + (2.7 * inches_over_5_ft)
        ibw_female = 45.5 + (2.2 * inches_over_5_ft)
        ibw = (ibw_male + ibw_female) / 2

    ibw = max(ibw, 0) # Ensure IBW is not negative

    calculation_weight = abw  # Default
    is_obese_e66x = has_condition('E66.x')
    is_anorexia_f500 = has_condition('F50.0')


    if is_anorexia_f500:
        calculation_weight = ibw
    elif bmi < 18.5:
        calculation_weight = ibw
    elif 18.5 <= bmi <= 24.9:
        calculation_weight = abw
    elif 25 <= bmi <= 29.9: # Overweight
        calculation_weight = abw # Often ABW is used unless severely obese
    elif bmi >= 30: # Obese
        # Use adjusted body weight for obesity classes
        adj_bw = ((abw - ibw) * 0.25) + ibw
        calculation_weight = adj_bw


    results["Calculation Weight (kg)"] = round(calculation_weight, 1)

    print(f"\n[INFO] Step 2: Calculate Basal Metabolic Rate (BMR) ")
    # --- Step 2: Calculate Basal Metabolic Rate (BMR) ---
    # Mifflin-St Jeor Equation
    if calculation_weight <= 0: # Avoid issues with non-positive calculation_weight
        bmr = 0
        print(f"  -  [WARNING] Calculation weight is {calculation_weight:.1f} kg. BMR cannot be accurately calculated. Setting BMR to 0.")
    elif gender == 'Male':
        bmr = (10 * calculation_weight) + (6.25 * height_cm) - (5 * age) + 5
    elif gender == 'Female':
        bmr = (10 * calculation_weight) + (6.25 * height_cm) - (5 * age) - 161
    else: # Fallback for unknown gender
        bmr_male = (10 * calculation_weight) + (6.25 * height_cm) - (5 * age) + 5
        bmr_female = (10 * calculation_weight) + (6.25 * height_cm) - (5 * age) - 161
        bmr = (bmr_male + bmr_female) / 2

    bmr = max(0, bmr) # Ensure BMR is not negative

    print(f"\n[INFO] Step 3: Calculate Total Daily Energy Expenditure (TDEE) ")
    tdee = bmr * pal
    tdee = max(0, tdee) # Ensure TDEE is not negative

    print(f"\n[INFO] Step 4: Adjust Energy Needs for Medical Conditions ")
    adjusted_energy_min = tdee
    adjusted_energy_max = tdee
    weight_loss_goal_active = False


    if is_anorexia_f500:
        # For anorexia, start with 1000-1200 kcal or BMR * 1.0-1.2, aiming for gradual increase
        an_fixed_min, an_fixed_max = 1000, 1200
        an_bmr_mult_min, an_bmr_mult_max = bmr * 1.0, bmr * 1.2
        # Choose the higher of the two potential starting ranges, or a blend
        adjusted_energy_min = max(an_fixed_min, an_bmr_mult_min)
        adjusted_energy_max = max(an_fixed_max, an_bmr_mult_max)
        # Ensure min <= max
        if adjusted_energy_min > adjusted_energy_max: adjusted_energy_max = adjusted_energy_min

    else:
        i50x_present = has_condition('I50.x') # Heart failure
        e11x_present = has_condition('E11.x') # Type 2 Diabetes

        current_adj_energy_min = adjusted_energy_min
        current_adj_energy_max = adjusted_energy_max

        if i50x_present:
            # Heart failure: symptomatic may need 1.1-1.2x TDEE.
            # If obese + HF, weight loss goal TDEE-500.
            if is_obese_e66x: # BMI >=30 or E66.x code
                current_adj_energy_min = tdee - 500
                current_adj_energy_max = tdee - 500
                weight_loss_goal_active = True
            else: # Not obese but HF, assume symptomatic needs
                current_adj_energy_min = tdee * 1.1
                current_adj_energy_max = tdee * 1.2

        if e11x_present and bmi >= 25 and not weight_loss_goal_active:
            # Diabetes + Overweight/Obese, not already in weight loss from HF
            current_adj_energy_min = tdee - 500
            current_adj_energy_max = tdee - 500
            weight_loss_goal_active = True

        adjusted_energy_min = current_adj_energy_min
        adjusted_energy_max = current_adj_energy_max

        ckd_stage, _, _ = get_ckd_stage_info()
        if ckd_stage > 0 and calculation_weight > 0 :
            # CKD: 30-35 kcal/kg calculation weight, unless weight loss is active
            ckd_energy_target_min = 30 * calculation_weight
            ckd_energy_target_max = 35 * calculation_weight
            if not weight_loss_goal_active:
                # If current range is below CKD target, adjust to CKD target
                adjusted_energy_min = max(adjusted_energy_min, ckd_energy_target_min)
                adjusted_energy_max = max(adjusted_energy_max, ckd_energy_target_max)
                if adjusted_energy_min > adjusted_energy_max : adjusted_energy_max = adjusted_energy_min


    # Ensure energy is not negative
    adjusted_energy_min = max(0, adjusted_energy_min)
    adjusted_energy_max = max(0, adjusted_energy_max)
    if adjusted_energy_min > adjusted_energy_max: adjusted_energy_max = adjusted_energy_min


    results["Energy (kcal)"]["min"] = round(adjusted_energy_min)
    results["Energy (kcal)"]["max"] = round(adjusted_energy_max)

    print(f"\n[INFO] Step 5: Determine Protein Needs ")
    protein_factor_min = 0.8
    protein_factor_max = 1.0
    ckd_stage, ckd_is_dialysis, ckd_code_full = get_ckd_stage_info()
    ckd_protein_restricted = False

    if age > 65:
        protein_factor_min = max(protein_factor_min, 1.0)
        protein_factor_max = max(protein_factor_max, 1.2)

    if ckd_stage > 0 and not ckd_is_dialysis:
        if 1 <= ckd_stage <= 5: # N18.1-N18.5 (No dialysis)
            new_min_factor, new_max_factor = 0.6, 0.8
            protein_factor_min = new_min_factor
            protein_factor_max = new_max_factor
            ckd_protein_restricted = True

    temp_factors_to_consider = []
    if has_condition('I50.x'): temp_factors_to_consider.append(((1.0, 1.2), "I50.x (Stable)"))
    if ckd_is_dialysis: temp_factors_to_consider.append(((1.2, 1.5), "N18.6 (Dialysis)")) # General range for HD/PD
    if has_condition('E11.x'): temp_factors_to_consider.append(((0.8, 1.0), "E11.x (base)")) # Can go up to 1.5g/kg if GFR normal, but that's specific
    if is_anorexia_f500: temp_factors_to_consider.append(((1.0, 1.2), "F50.0 (Refeeding)")) # Initial, may increase

    for (f_min, f_max), _ in temp_factors_to_consider:
        if not ckd_protein_restricted or (ckd_is_dialysis and f_min >= 1.2): # Dialysis overrides non-dialysis CKD restriction
            protein_factor_min = max(protein_factor_min, f_min)
            protein_factor_max = max(protein_factor_max, f_max)

    if protein_factor_min > protein_factor_max: protein_factor_max = protein_factor_min

    protein_goal_min_g = calculation_weight * protein_factor_min if calculation_weight > 0 else 0
    protein_goal_max_g = calculation_weight * protein_factor_max if calculation_weight > 0 else 0
    protein_goal_min_g = max(0, protein_goal_min_g)
    protein_goal_max_g = max(0, protein_goal_max_g)


    results["Protein (g)"]["min"] = round(protein_goal_min_g)
    results["Protein (g)"]["max"] = round(protein_goal_max_g)
    protein_calories_min = protein_goal_min_g * 4
    protein_calories_max = protein_goal_max_g * 4

    print(f"\n[INFO] Step 6: Determine Fat Needs ")
    fat_percentage_target_min, fat_percentage_target_max = 0.25, 0.35 # 25-35% of total energy
    fat_calories_min = adjusted_energy_min * fat_percentage_target_min
    fat_calories_max = adjusted_energy_max * fat_percentage_target_max
    fat_goal_min_g = max(0, fat_calories_min / 9)
    fat_goal_max_g = max(0, fat_calories_max / 9)
    if fat_goal_min_g > fat_goal_max_g: fat_goal_max_g = fat_goal_min_g


    results["Fat (g)"]["min"] = round(fat_goal_min_g)
    results["Fat (g)"]["max"] = round(fat_goal_max_g)

    print(f"\n[INFO] Step 7: Determine Carbohydrate Needs ")
    carb_calories_min = adjusted_energy_min - protein_calories_max - fat_calories_max # Prioritize protein, then fat
    carb_calories_max = adjusted_energy_max - protein_calories_min - fat_calories_min

    carb_goal_min_g = max(0, carb_calories_min / 4)
    carb_goal_max_g = max(carb_goal_min_g, carb_calories_max / 4) # Ensure max is at least min

    if has_condition('E11.x'):
        min_carb_g_e11x = 130 # General recommendation for DM
        carb_goal_min_g = max(carb_goal_min_g, min_carb_g_e11x)
        if carb_goal_max_g < carb_goal_min_g: carb_goal_max_g = carb_goal_min_g

    results["Carbohydrates (net)"]["min"] = round(carb_goal_min_g)
    results["Carbohydrates (net)"]["max"] = round(carb_goal_max_g)

    print(f"\n[INFO] Step 8: Determine Fluid Needs ")
    fluid_goal_min = 30 * calculation_weight if calculation_weight > 0 else 0 # 30-35 mL/kg or 1mL/kcal
    fluid_goal_max = 35 * calculation_weight if calculation_weight > 0 else 0
    # fluid_goal_min = max(fluid_goal_min, adjusted_energy_min * 1) # 1ml/kcal
    # fluid_goal_max = max(fluid_goal_max, adjusted_energy_max * 1)

    if has_condition('I50.x'): # Heart failure restriction
        fluid_goal_min = min(fluid_goal_min, 1500)
        fluid_goal_max = min(fluid_goal_max, 2000)
        if fluid_goal_min > fluid_goal_max : fluid_goal_min = fluid_goal_max # ensure min <= max


    if ckd_is_dialysis: # Dialysis fluid restriction (highly individual, placeholder)
        # Rule: Urine Output + 500-1000 mL. UO not available.
        hd_fluid_min_placeholder = 750
        hd_fluid_max_placeholder = 1000 # This is a very general placeholder
        fluid_goal_min = min(fluid_goal_min, hd_fluid_min_placeholder)
        fluid_goal_max = min(fluid_goal_max, hd_fluid_max_placeholder)
        if fluid_goal_min > fluid_goal_max : fluid_goal_min = fluid_goal_max


    fluid_goal_min = max(0, fluid_goal_min)
    fluid_goal_max = max(0, fluid_goal_max)
    if fluid_goal_min > fluid_goal_max : fluid_goal_max = fluid_goal_min


    results["Fluid (ml)"]["min"] = round(fluid_goal_min)
    results["Fluid (ml)"]["max"] = round(fluid_goal_max)

    print(f"\n[INFO] Step 9: Determine Key Micronutrient Needs ")
    # Sodium (Na)
    na_limit = 2300
    if has_condition('I50.x') or has_condition('I10'): na_limit = min(na_limit, 2000) # HF, HTN
    if ckd_stage > 0 : na_limit = min(na_limit, 2300) # CKD generally <2000-2300
    results["Sodium (mg)"]["min"] = results["Sodium (mg)"]["max"] = round(max(0, na_limit))


    # Potassium (K)
    k_target_min_dri = 2600 if gender == 'Female' else 3400
    k_target_max_dri = k_target_min_dri
    k_final_min, k_final_max = k_target_min_dri, k_target_max_dri

    # CKD Stage 3b+ or dialysis: Restrict K+ to 2000-3000 mg/day
    # This logic needs careful check against specific CKD stage definitions (e.g. N18.3a vs N18.3b)
    # Simplified: if ckd_stage >= 4 or (ckd_stage == 3 and 'b' in ckd_code_full if ckd_code_full else False) or ckd_is_dialysis:
    if ckd_stage >= 3 or ckd_is_dialysis: # Broadly for stage 3+, more restrictive for 4/5/dialysis
        k_restrict_min, k_restrict_max = 2000, 3000
        # If DRI is already lower than restriction, DRI might be fine, but restriction is an upper cap.
        # This means the target should be within the restricted range.
        k_final_min = k_restrict_min
        k_final_max = k_restrict_max
    results["Potassium (mg)"]["min"] = round(max(0, k_final_min))
    results["Potassium (mg)"]["max"] = round(max(0, k_final_max))
    if results["Potassium (mg)"]["min"] > results["Potassium (mg)"]["max"]:
        results["Potassium (mg)"]["max"] = results["Potassium (mg)"]["min"]


    # Phosphorus (P)
    phos_target_min_dri, phos_target_max_dri = 700, 700 # DRI
    phos_final_min, phos_final_max = phos_target_min_dri, phos_target_max_dri
    if ckd_stage >= 3: # CKD Stage 3+ restrict to 800-1000 mg/day
        phos_restrict_min, phos_restrict_max = 800, 1000
        phos_final_min = phos_restrict_min
        phos_final_max = phos_restrict_max
    results["Phosphorus (mg)"]["min"] = round(max(0, phos_final_min))
    results["Phosphorus (mg)"]["max"] = round(max(0, phos_final_max))
    if results["Phosphorus (mg)"]["min"] > results["Phosphorus (mg)"]["max"]:
        results["Phosphorus (mg)"]["max"] = results["Phosphorus (mg)"]["min"]


    # Calcium (Ca) - General DRI, manage with P/Vit D in CKD
    ca_target_min, ca_target_max = 1000, 1300 # General adult range
    if age <= 18: ca_target_min = ca_target_max = 1300
    elif age >= 51 and gender == 'Female': ca_target_min = ca_target_max = 1200
    elif age >= 71: ca_target_min = ca_target_max = 1200
    results["Calcium (mg)"]["min"] = round(max(0, ca_target_min))
    results["Calcium (mg)"]["max"] = round(max(0, ca_target_max))
    if results["Calcium (mg)"]["min"] > results["Calcium (mg)"]["max"]:
        results["Calcium (mg)"]["max"] = results["Calcium (mg)"]["min"]

    # Iron (Fe)
    fe_target = 8
    if gender == 'Female' and 19 <= age <= 50: fe_target = 18 # Premenopausal women
    elif gender == 'Female' and age > 50 : fe_target = 8 # Postmenopausal
    results["Iron (mg)"]["min"] = results["Iron (mg)"]["max"] = round(max(0, fe_target))

    print(f"--- Calculation Finished for Patient ID: {patient_id} ---")
    return results

# --- End of calculate_dashboard_standards ---


async def get_data_for_row(row_data: pd.Series, row_index: int) -> str:
    """
    Extracts data from an Excel row, calls the calculation function,
    and returns the result as a JSON string.
    This function itself is async to be awaited by asyncio.gather,
    but the core calculation is run in a thread.
    """
    try:
        # --- Parameter Extraction and Type Conversion ---
        # Required fields
        patient_id = str(row_data[PATIENT_ID_COLUMN])
        
        # Handle potential NaN or missing values before conversion
        height_val = row_data[HEIGHT_CM_COLUMN]
        weight_val = row_data[WEIGHT_KG_COLUMN]
        age_val = row_data[AGE_COLUMN]
        pal_val = row_data[PAL_COLUMN]
        gender_val = str(row_data.get(GENDER_COLUMN, "")).strip().capitalize() # Default to empty, strip, capitalize

        if pd.isna(height_val) or pd.isna(weight_val) or pd.isna(age_val) or pd.isna(pal_val) or not gender_val:
             error_msg = f"Missing required basic data for patient {patient_id} at Excel row {row_index+2} (Height, Weight, Age, PAL, or Gender)."
             print(f"[ERROR] {error_msg}")
             return json.dumps({"patient_id": patient_id, "error": error_msg, "excel_row": row_index+2})

        height_cm = float(height_val)
        weight_kg = float(weight_val)
        age = int(age_val)
        pal = float(pal_val)
        
        if gender_val not in ['Male', 'Female']:
            gender_val = 'Unknown' # Or handle as error, current calc function has a fallback

        # Medical conditions: expect comma-separated string, convert to list
        medical_conditions_str = str(row_data.get(MEDICAL_CONDITIONS_COLUMN, ""))
        medical_conditions_list = [cond.strip() for cond in medical_conditions_str.split(',') if cond.strip()] \
                                  if medical_conditions_str else []

        # Optional fields with .get() and type conversion if present
        egfr = float(row_data.get(EGFR_COLUMN)) if pd.notna(row_data.get(EGFR_COLUMN)) else None
        hba1c = float(row_data.get(HBA1C_COLUMN)) if pd.notna(row_data.get(HBA1C_COLUMN)) else None
        albumin = float(row_data.get(ALBUMIN_COLUMN)) if pd.notna(row_data.get(ALBUMIN_COLUMN)) else None
        
        diuretic_use_val = row_data.get(DIURETIC_USE_COLUMN)
        diuretic_use = None
        if pd.notna(diuretic_use_val):
            if isinstance(diuretic_use_val, bool):
                diuretic_use = diuretic_use_val
            elif str(diuretic_use_val).lower() in ['true', '1', 'yes']:
                diuretic_use = True
            elif str(diuretic_use_val).lower() in ['false', '0', 'no']:
                diuretic_use = False
            # else: diuretic_use remains None or you could raise an error for invalid value

        print(f"Extracted for patient {patient_id} (Excel row {row_index+2}): H:{height_cm}, W:{weight_kg}, Age:{age}, Sex:{gender_val}, PAL:{pal}, Conds:{medical_conditions_list}")

        # Call the synchronous, CPU-bound function in a separate thread
        # to avoid blocking the asyncio event loop.
        # `asyncio.to_thread` is available in Python 3.9+
        loop = asyncio.get_running_loop()
        result_dict = await loop.run_in_executor(
            None, # Uses default ThreadPoolExecutor
            calculate_dashboard_standards,
            patient_id,
            height_cm,
            weight_kg,
            age,
            gender_val, # Use the processed gender_val
            pal,
            medical_conditions_list,
            egfr,
            hba1c,
            albumin,
            diuretic_use
        )
        # For Python < 3.9, you would manage your own ThreadPoolExecutor:
        # with concurrent.futures.ThreadPoolExecutor() as pool:
        #     result_dict = await loop.run_in_executor(
        #         pool, calculate_dashboard_standards, ...
        #     )

        return json.dumps(result_dict, ensure_ascii=False) # indent=2 for pretty print, but makes cells larger

    except KeyError as e:
        error_msg = f"Missing column '{e}' in Excel for patient data at row {row_index+2}."
        print(f"[ERROR] {error_msg} Patient ID might be {row_data.get(PATIENT_ID_COLUMN, 'Unknown') if isinstance(row_data, pd.Series) else 'Unknown'}")
        return json.dumps({"error": error_msg, "excel_row": row_index+2, "details": str(e)})
    except ValueError as e:
        error_msg = f"Data conversion error for patient data at row {row_index+2}: {e}."
        print(f"[ERROR] {error_msg} Patient ID might be {row_data.get(PATIENT_ID_COLUMN, 'Unknown') if isinstance(row_data, pd.Series) else 'Unknown'}")
        return json.dumps({"error": error_msg, "excel_row": row_index+2, "details": str(e)})
    except Exception as e:
        error_msg = f"Unexpected error processing patient data at row {row_index+2}: {type(e).__name__} - {e}."
        print(f"[ERROR] {error_msg} Patient ID might be {row_data.get(PATIENT_ID_COLUMN, 'Unknown') if isinstance(row_data, pd.Series) else 'Unknown'}")
        import traceback
        traceback.print_exc()
        return json.dumps({"error": error_msg, "excel_row": row_index+2, "details": str(e)})

async def process_excel_rows(df: pd.DataFrame) -> list:
    tasks = []
    # Pre-allocate list for results, filled with a placeholder for errors or unprocessed rows
    # This helps maintain order and correctly map results back if some tasks fail early.
    all_results_data = [json.dumps({"error": "Not processed", "excel_row": i+2}) for i in range(len(df))]

    for index, row in df.iterrows():
        # Create a task for each row. Pass the row data and original index.
        task = asyncio.create_task(get_data_for_row(row, index), name=f"Task_Row_{index+2}")
        tasks.append(task)

    print(f"\nStarting parallel processing for {len(tasks)} rows...")
    
    # gather results, return_exceptions=True allows us to get exceptions as results
    results_from_gather = await asyncio.gather(*tasks, return_exceptions=True)
    
    # Place results back into the all_results_data list at correct positions
    # This loop structure assumes tasks and results_from_gather are in the same order
    # which asyncio.gather guarantees for the input tasks list.
    for i, result_or_exception in enumerate(results_from_gather):
        original_df_index = i # Since tasks were added in df order
        if isinstance(result_or_exception, Exception):
            # An exception occurred in asyncio.gather itself or task creation (less likely here)
            # or if a task was cancelled and raised CancelledError.
            # More specific errors from get_data_for_row are already JSON strings.
            print(f"Task for Excel row {original_df_index + 2} had an unhandled exception: {result_or_exception}")
            all_results_data[original_df_index] = json.dumps({
                "error": f"Unhandled task exception: {type(result_or_exception).__name__}",
                "details": str(result_or_exception),
                "excel_row": original_df_index + 2
            })
        else:
            # result_or_exception is the JSON string returned by get_data_for_row
            all_results_data[original_df_index] = result_or_exception
            
    return all_results_data


async def main():
    df = None
    new_column_data_list = []
    successfully_completed = False

    # Check for Python 3.9+ for asyncio.to_thread, otherwise ThreadPoolExecutor is needed.
    # The loop.run_in_executor(None, ...) approach works in older Pythons too.

    try:
        print(f"Starting Excel processing: {INPUT_EXCEL_FILE}")
        try:
            df = pd.read_excel(INPUT_EXCEL_FILE)
            print(f"Successfully read Excel file: {len(df)} rows.")
            print("Excel headers:", df.columns.tolist())
        except FileNotFoundError:
            print(f"ERROR: Input Excel file '{INPUT_EXCEL_FILE}' not found.")
            return
        except Exception as e:
            print(f"ERROR reading Excel file: {e}")
            return

        # Validate required columns (basic check)
        required_cols = [PATIENT_ID_COLUMN, HEIGHT_CM_COLUMN, WEIGHT_KG_COLUMN, AGE_COLUMN, GENDER_COLUMN, PAL_COLUMN]
        missing_cols = [col for col in required_cols if col not in df.columns]
        if missing_cols:
            print(f"ERROR: Missing required columns in Excel: {', '.join(missing_cols)}")
            # Still attempt to save the original df if it was loaded, in finally block
            raise ValueError(f"Missing required columns: {', '.join(missing_cols)}")

        start_time = time.time()
        new_column_data_list = await process_excel_rows(df)
        end_time = time.time()
        
        print(f"\nAll row processing attempts finished in {end_time - start_time:.2f} seconds.")

        if len(new_column_data_list) != len(df):
            print(f"ERROR: Data list length ({len(new_column_data_list)}) mismatch with DataFrame length ({len(df)}).")
            raise ValueError("Data length mismatch after processing.")
        
        successfully_completed = True

    except Exception as e:
        print(f"\n!!!!!!!!!! MAIN PROCESSING ERROR !!!!!!!!!!")
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Message: {e}")
        import traceback
        traceback.print_exc()
        print(f"Attempting to save current (possibly partial) data to: {ERROR_SAVE_EXCEL_FILE}")
    
    finally:
        print("\n--- Entering finally block ---")
        if df is not None:
            if new_column_data_list and len(new_column_data_list) == len(df):
                if NEW_COLUMN_NAME in df.columns:
                    print(f"Column '{NEW_COLUMN_NAME}' already exists, will be overwritten.")
                df[NEW_COLUMN_NAME] = new_column_data_list
                print(f"Added/updated '{NEW_COLUMN_NAME}' column in DataFrame.")
            elif not new_column_data_list and len(df) > 0:
                 print(f"WARNING: New column data list is empty, but DataFrame has {len(df)} rows. '{NEW_COLUMN_NAME}' will not be added/updated correctly.")
            elif new_column_data_list and len(new_column_data_list) != len(df):
                print(f"WARNING: New column data list length ({len(new_column_data_list)}) != DataFrame length ({len(df)}). '{NEW_COLUMN_NAME}' may not be added/updated correctly.")


            save_filename = OUTPUT_EXCEL_FILE if successfully_completed else ERROR_SAVE_EXCEL_FILE
            if successfully_completed:
                print(f"All operations successful. Preparing to save to: {save_filename}")
            else:
                print(f"Operations not fully successful or error occurred. Preparing to save current state to: {save_filename}")

            try:
                df.to_excel(save_filename, index=False)
                print(f"DataFrame successfully saved to: {save_filename}")
            except Exception as e_save:
                print(f"!!!!!! CRITICAL ERROR: Saving Excel file '{save_filename}' in finally block FAILED: {e_save} !!!!!!")
                print("Data may not have been saved. Check DataFrame state if possible.")
        else:
            print("DataFrame (df) was not loaded, nothing to save.")
        
        print("--- finally block finished ---")

if __name__ == "__main__":
    # _ = load_dotenv(find_dotenv()) # If you use .env for API keys for calculate_dashboard_standards
    # client = OpenAI(...) # If client is needed globally by calculate_dashboard_standards
    asyncio.run(main())