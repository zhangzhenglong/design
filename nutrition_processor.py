import math
import json
import os
import time
from dotenv import load_dotenv, find_dotenv
import openai  
# from openai import OpenAI

_ = load_dotenv(find_dotenv())

# 调用API
# client = OpenAI(
#     api_key=os.getenv("OPENAI_API_KEY"),
#     base_url=os.getenv("OPENAI_BASE_URL")
# )
openai.api_key=os.getenv("OPENAI_API_KEY")
openai.api_base=os.getenv("OPENAI_BASE_URL")


def calculate_dashboard_standards(
    patient_id: str,
    height_cm: float,
    weight_kg: float,  # Actual Body Weight (ABW)
    age: int,
    gender: str,  # 'Male' or 'Female'
    pal: float,  # Physical Activity Level factor
    medical_conditions: list,  # List of ICD-10 codes e.g., ['I50.x', 'E11.x']
    # Optional inputs (currently not used in deep logic but good for future)
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
    if age is None:
        default_age = 40
        print(f"[WARNING] Patient ID {patient_id}: Age not provided. Using default age: {default_age} years. / 年龄未提供，使用默认年龄: {default_age} 岁。")
        age = default_age
    if pal is None:
        default_pal = 1.2 # 久坐PAL值
        print(f"[WARNING] Patient ID {patient_id}: Physical Activity Level (PAL) not provided. Using default PAL: {default_pal} (Sedentary). / 身体活动水平 (PAL) 未提供，使用默认PAL: {default_pal} (久坐)。")
        pal = default_pal

    # Helper to check for conditions (handles '.x' wildcards)
    def has_condition(code_prefix):
        for condition in medical_conditions:
            if condition.startswith(code_prefix.replace('.x', '')):
                return True
        return False

    def get_ckd_stage_info():
        stage = 0
        is_dialysis = False
        specific_code = None
        for condition in medical_conditions:
            if condition.startswith("N18."):
                specific_code = condition
                try:
                    stage_char = condition.split('.')[1][0]
                    if stage_char.isdigit():
                        current_stage = int(stage_char)
                        stage = max(stage, current_stage)
                        if current_stage == 6:
                            is_dialysis = True
                except (IndexError, ValueError):
                    if "N18.6" in condition:
                        stage = max(stage, 6)
                        is_dialysis = True
                    elif "N18.5" in condition:
                        stage = max(stage, 5)
                    elif "N18.4" in condition:
                        stage = max(stage, 5)
                    elif "N18.3" in condition:
                        stage = max(stage, 3)
        return stage, is_dialysis, specific_code

    height_m = height_cm / 100
    abw = weight_kg

    print(f"\n[INFO] Step 1: Determine Calculation Weight ")
    # --- Step 1: Determine Calculation Weight ---
    bmi = abw / (height_m ** 2)
    results["BMI"] = round(bmi, 1)
    print(
        f"  -  BMI Calculation. Formula: Weight (kg) / (Height (m))^2. Input: Weight={abw}kg, Height={height_m}m. Result BMI: {results['BMI']:.1f}")
    # print(f"  - 中文: BMI 计算. 公式: 体重 (kg) / (身高 (m))^2. 输入: 体重={abw}kg, 身高={height_m}m. 结果 BMI: {results['BMI']:.1f}")

    # IBW (Hamwi)
    height_in = height_cm / 2.54
    inches_over_5_ft = max(0, height_in - 60)

    if gender == 'Male':
        ibw = 48 + (2.7 * inches_over_5_ft)
        print(
            f"  -  IBW (Hamwi) for Male. Formula: 48 + 2.7 * ((Height (cm) - 152.4) / 2.54). Input: Height={height_cm}cm ({inches_over_5_ft:.2f} inches over 5ft). Result IBW: {ibw:.2f} kg")
        # print(f"  - 中文: 男性理想体重 (Hamwi). 公式: 48 + 2.7 * ((身高 (cm) - 152.4) / 2.54). 输入: 身高={height_cm}cm ({inches_over_5_ft:.2f} 英寸超过5英尺). 结果 IBW: {ibw:.2f} kg")
    else:  # Female
        ibw = 45.5 + (2.2 * inches_over_5_ft)
        print(
            f"  -  IBW (Hamwi) for Female. Formula: 45.5 + 2.2 * ((Height (cm) - 152.4) / 2.54). Input: Height={height_cm}cm ({inches_over_5_ft:.2f} inches over 5ft). Result IBW: {ibw:.2f} kg")
        # print(f"  - 中文: 女性理想体重 (Hamwi). 公式: 45.5 + 2.2 * ((身高 (cm) - 152.4) / 2.54). 输入: 身高={height_cm}cm ({inches_over_5_ft:.2f} 英寸超过5英尺). 结果 IBW: {ibw:.2f} kg")

    ibw = max(ibw, 0)

    calculation_weight = abw  # Default
    is_obese_e66x = has_condition('E66.x')
    is_anorexia_f500 = has_condition('F50.0')

    print(
        f"  -  Determining Calculation Weight based on BMI ({results['BMI']:.1f}) and conditions.")
    # print(f"  - 中文: 根据 BMI ({results['BMI']:.1f}) 和医疗状况确定计算体重。")

    if is_anorexia_f500:
        calculation_weight = ibw
        print(
            f"  -  Condition F50.0 (Anorexia Nervosa) present. Using IBW for calculation weight. Calculation Weight: {calculation_weight:.2f} kg")
        # print(f"  - 中文: 存在 F50.0 (神经性厌食症) 状况。使用理想体重 (IBW) 作为计算体重。计算体重: {calculation_weight:.2f} kg")
    elif bmi < 18.5:
        calculation_weight = ibw
        print(
            f"  -  BMI < 18.5. Using IBW for calculation weight. Calculation Weight: {calculation_weight:.2f} kg")
        # print(f"  - 中文: BMI < 18.5。使用理想体重 (IBW) 作为计算体重。计算体重: {calculation_weight:.2f} kg")
    elif 18.5 <= bmi <= 24.9:
        calculation_weight = abw
        print(
            f"  -  BMI 18.5 - 24.9. Using ABW for calculation weight. Calculation Weight: {calculation_weight:.2f} kg")
        # print(f"  - 中文: BMI 18.5 - 24.9。使用实际体重 (ABW) 作为计算体重。计算体重: {calculation_weight:.2f} kg")
    elif 25 <= bmi <= 29.9:
        calculation_weight = abw
        print(
            f"  -  BMI 25 - 29.9. Using ABW for calculation weight. Calculation Weight: {calculation_weight:.2f} kg")
        # print(f"  - 中文: BMI 25 - 29.9。使用实际体重 (ABW) 作为计算体重。计算体重: {calculation_weight:.2f} kg")
    elif bmi >= 30:
        adj_bw = ((abw - ibw) * 0.25) + ibw
        calculation_weight = adj_bw
        print(
            f"  -  BMI >= 30. Using Adjusted Body Weight (AdjBW). Formula: ((ABW - IBW) * 0.25) + IBW. Input: ABW={abw:.2f}kg, IBW={ibw:.2f}kg. Result AdjBW: {adj_bw:.2f} kg. Calculation Weight: {calculation_weight:.2f} kg")
        # print(f"  - 中文: BMI >= 30。使用调整后体重 (AdjBW)。公式: ((实际体重 - 理想体重) * 0.25) + 理想体重. 输入: 实际体重={abw:.2f}kg, 理想体重={ibw:.2f}kg. 结果 AdjBW: {adj_bw:.2f} kg. 计算体重: {calculation_weight:.2f} kg")

    results["Calculation Weight (kg)"] = round(calculation_weight, 1)
    print(
        f"  -  Final Calculation Weight: {results['Calculation Weight (kg)']:.1f} kg")
    # print(f"  - 中文: 最终计算体重: {results['Calculation Weight (kg)']:.1f} kg")

    print(f"\n[INFO] Step 2: Calculate Basal Metabolic Rate (BMR) ")
    # --- Step 2: Calculate Basal Metabolic Rate (BMR) ---
    if gender == 'Male':
        bmr = (10 * calculation_weight) + (6.25 * height_cm) - (5 * age) + 5
        print(
            f"  -  BMR (Mifflin-St Jeor) for Male. Formula: (10 * CalcWt) + (6.25 * Ht) - (5 * Age) + 5. Input: CalcWt={calculation_weight:.1f}kg, Ht={height_cm}cm, Age={age}yrs. Result BMR: {bmr:.2f} kcal")
        # print(f"  - 中文: 男性基础代谢率 (Mifflin-St Jeor). 公式: (10 * 计算体重) + (6.25 * 身高) - (5 * 年龄) + 5. 输入: 计算体重={calculation_weight:.1f}kg, 身高={height_cm}cm, 年龄={age}岁. 结果 BMR: {bmr:.2f} kcal")
    else:  # Female
        bmr = (10 * calculation_weight) + (6.25 * height_cm) - (5 * age) - 161
        print(
            f"  -  BMR (Mifflin-St Jeor) for Female. Formula: (10 * CalcWt) + (6.25 * Ht) - (5 * Age) - 161. Input: CalcWt={calculation_weight:.1f}kg, Ht={height_cm}cm, Age={age}yrs. Result BMR: {bmr:.2f} kcal")
        # print(f"  - 中文: 女性基础代谢率 (Mifflin-St Jeor). 公式: (10 * 计算体重) + (6.25 * 身高) - (5 * 年龄) - 161. 输入: 计算体重={calculation_weight:.1f}kg, 身高={height_cm}cm, 年龄={age}岁. 结果 BMR: {bmr:.2f} kcal")

    bmr = max(0, bmr)

    print(f"\n[INFO] Step 3: Calculate Total Daily Energy Expenditure (TDEE) ")
    # --- Step 3: Calculate Total Daily Energy Expenditure (TDEE) ---
    tdee = bmr * pal
    print(
        f"  -  TDEE Calculation. Formula: BMR * PAL. Input: BMR={bmr:.2f}kcal, PAL={pal}. Result TDEE: {tdee:.2f} kcal")
    # print(f"  - 中文: TDEE 计算. 公式: BMR * PAL. 输入: BMR={bmr:.2f}kcal, PAL={pal}. 结果 TDEE: {tdee:.2f} kcal")

    print(f"\n[INFO] Step 4: Adjust Energy Needs for Medical Conditions ")
    # --- Step 4: Adjust Energy Needs for Medical Conditions ---
    adjusted_energy_min = tdee
    adjusted_energy_max = tdee
    print(
        f"  -  Initial Adjusted Energy Range set to TDEE: {tdee:.2f} - {tdee:.2f} kcal")
    # print(f"  - 中文: 初始调整能量范围设为 TDEE: {tdee:.2f} - {tdee:.2f} kcal")

    # Renamed this variable to avoid conflict with other scopes
    weight_loss_goal_active = False

    if is_anorexia_f500:
        temp_min_f50 = bmr * 1.0
        temp_max_f50 = bmr * 1.2
        an_energy_option1_min, an_energy_option1_max = 1000, 1200

        print(f"  -  Condition F50.0 (Anorexia Nervosa) present. Rule: Start 1000-1200 kcal/day or BMR * 1.0-1.2.")
        # print(f"  - 中文: 存在 F50.0 (神经性厌食症) 状况。规则: 开始 1000-1200 kcal/天 或 BMR * 1.0-1.2。")
        print(
            f"    -  BMR * 1.0-1.2 = {temp_min_f50:.2f} - {temp_max_f50:.2f} kcal. Fixed range = {an_energy_option1_min}-{an_energy_option1_max} kcal.")
        # print(f"    - 中文: BMR * 1.0-1.2 = {temp_min_f50:.2f} - {temp_max_f50:.2f} kcal. 固定范围 = {an_energy_option1_min}-{an_energy_option1_max} kcal.")

        if temp_max_f50 < an_energy_option1_min:
            adjusted_energy_min = an_energy_option1_min
            adjusted_energy_max = an_energy_option1_max
        elif temp_min_f50 < an_energy_option1_min:
            adjusted_energy_min = an_energy_option1_min
            adjusted_energy_max = temp_max_f50
        else:
            adjusted_energy_min = temp_min_f50
            adjusted_energy_max = temp_max_f50
        print(
            f"  -  F50.0 Adjusted Energy Range: {adjusted_energy_min:.2f} - {adjusted_energy_max:.2f} kcal")
        # print(f"  - 中文: F50.0 调整后能量范围: {adjusted_energy_min:.2f} - {adjusted_energy_max:.2f} kcal")

    else:  # Not F50.0
        # I50.x adjustments before potential weight loss override.
        i50x_present = has_condition('I50.x')
        e11x_present = has_condition('E11.x')

        # Store original TDEE based adjusted_energy before specific condition modifications
        current_adj_energy_min = adjusted_energy_min
        current_adj_energy_max = adjusted_energy_max

        if i50x_present:
            if is_obese_e66x:  # implies weight loss goal for I50.x context
                current_adj_energy_min = tdee - 500
                current_adj_energy_max = tdee - 500
                weight_loss_goal_active = True
                print(
                    f"  -  Condition I50.x and E66.x present. Weight loss goal active. Energy adjusted to TDEE - 500 kcal. New Range: {current_adj_energy_min:.2f} - {current_adj_energy_max:.2f} kcal")
                # print(f"  - 中文: 存在 I50.x 和 E66.x 状况。激活减重目标。能量调整为 TDEE - 500 kcal。新范围: {current_adj_energy_min:.2f} - {current_adj_energy_max:.2f} kcal")
            else:
                # Assuming "Symptomatic" 1.1-1.2 multiplier if not cachectic (cachectic not specified as input)
                current_adj_energy_min = tdee * 1.1
                current_adj_energy_max = tdee * 1.2
                print(
                    f"  -  Condition I50.x present (symptomatic assumed). Energy adjusted to TDEE * 1.1-1.2. New Range: {current_adj_energy_min:.2f} - {current_adj_energy_max:.2f} kcal")
                # print(f"  - 中文: 存在 I50.x 状况 (假定为有症状)。能量调整为 TDEE * 1.1-1.2。新范围: {current_adj_energy_min:.2f} - {current_adj_energy_max:.2f} kcal")

        if e11x_present and bmi >= 25 and not weight_loss_goal_active:
            current_adj_energy_min = tdee - 500
            current_adj_energy_max = tdee - 500
            weight_loss_goal_active = True
            print(
                f"  -  Condition E11.x present and BMI >= 25. Weight loss goal active. Energy adjusted to TDEE - 500 kcal. New Range: {current_adj_energy_min:.2f} - {current_adj_energy_max:.2f} kcal")
            # print(f"  - 中文: 存在 E11.x 状况且 BMI >= 25。激活减重目标。能量调整为 TDEE - 500 kcal。新范围: {current_adj_energy_min:.2f} - {current_adj_energy_max:.2f} kcal")

        adjusted_energy_min = current_adj_energy_min
        adjusted_energy_max = current_adj_energy_max

        # N18.x (CKD) Adjustment
        ckd_stage, _, _ = get_ckd_stage_info()
        if ckd_stage > 0:
            ckd_energy_target_min = 30 * calculation_weight
            ckd_energy_target_max = 35 * calculation_weight
            print(
                f"  -  CKD (N18.x) present. Target energy: 30-35 kcal/kg Calculation_Weight. Target Range: {ckd_energy_target_min:.2f} - {ckd_energy_target_max:.2f} kcal")
            # print(f"  - 中文: 存在 CKD (N18.x) 状况。目标能量: 30-35 kcal/kg 计算体重。目标范围: {ckd_energy_target_min:.2f} - {ckd_energy_target_max:.2f} kcal")

            if not weight_loss_goal_active:  # Only adjust upwards if not actively in weight loss mode via TDEE-500
                if adjusted_energy_max < ckd_energy_target_min:
                    print(
                        f"  -  Current adjusted energy max ({adjusted_energy_max:.2f}) is below CKD target min ({ckd_energy_target_min:.2f}). Adjusting to CKD target range.")
                    # print(f"  - 中文: 当前调整后能量最大值 ({adjusted_energy_max:.2f}) 低于 CKD 目标最小值 ({ckd_energy_target_min:.2f})。调整至 CKD 目标范围。")
                    adjusted_energy_min = ckd_energy_target_min
                    adjusted_energy_max = ckd_energy_target_max
                elif adjusted_energy_min < ckd_energy_target_min:
                    print(
                        f"  -  Current adjusted energy min ({adjusted_energy_min:.2f}) is below CKD target min ({ckd_energy_target_min:.2f}). Adjusting min to CKD target min.")
                    # print(f"  - 中文: 当前调整后能量最小值 ({adjusted_energy_min:.2f}) 低于 CKD 目标最小值 ({ckd_energy_target_min:.2f})。将最小值调整至 CKD 目标最小值。")
                    adjusted_energy_min = ckd_energy_target_min
            else:
                print(
                    f"  -  CKD energy target (30-35 kcal/kg) not applied to raise energy levels due to active weight loss goal.")
                # print(f"  - 中文: 由于存在减重目标，CKD 能量目标 (30-35 kcal/kg) 未用于提高能量水平。")

    results["Energy (kcal)"]["min"] = round(adjusted_energy_min)
    results["Energy (kcal)"]["max"] = round(adjusted_energy_max)
    print(
        f"  -  Final Adjusted Energy Range: {results['Energy (kcal)']['min']} - {results['Energy (kcal)']['max']} kcal")
    # print(f"  - 中文: 最终调整后能量范围: {results['Energy (kcal)']['min']} - {results['Energy (kcal)']['max']} kcal")

    print(f"\n[INFO] Step 5: Determine Protein Needs ")
    protein_factor_min = 0.8
    protein_factor_max = 1.0
    print(
        f"  -  Base protein factor: {protein_factor_min}-{protein_factor_max} g/kg Calculation_Weight.")
    # print(f"  - 中文: 基础蛋白质系数: {protein_factor_min}-{protein_factor_max} g/kg 计算体重。")

    ckd_stage, ckd_is_dialysis, ckd_code_full = get_ckd_stage_info()
    ckd_protein_restricted = False

    # Age > 65 takes precedence over base IF it's higher
    if age > 65:
        protein_factor_min = max(protein_factor_min, 1.0)
        protein_factor_max = max(protein_factor_max, 1.2)
        print(
            f"  -  Age > 65. Protein factor adjusted to: {protein_factor_min}-{protein_factor_max} g/kg.")
        # print(f"  - 中文: 年龄 > 65岁。蛋白质系数调整为: {protein_factor_min}-{protein_factor_max} g/kg。")

    # CKD non-dialysis restrictions (can override age or other factors if lower)
    if ckd_stage > 0 and not ckd_is_dialysis:
        if 1 <= ckd_stage <= 5:  # N18.1-N18.5 (No dialysis)
            # For N18.1-3, rule is 0.6-0.8 (up to 1.0 if needed). Use 0.6-0.8.
            # For N18.4-5, rule is 0.6-0.8.
            # This is a restriction, so it might lower previously set factors.
            new_min_factor = 0.6
            new_max_factor = 0.8
            protein_factor_min = new_min_factor  # This is a hard restriction
            protein_factor_max = new_max_factor
            ckd_protein_restricted = True
            print(
                f"  -  CKD Stage {ckd_stage} (No dialysis). Protein factor restricted to: {protein_factor_min}-{protein_factor_max} g/kg.")
            # print(f"  - 中文: CKD {ckd_stage}期 (非透析)。蛋白质系数限制为: {protein_factor_min}-{protein_factor_max} g/kg。")

    # Factors that increase needs (applied by taking the max, unless CKD restricted and this new factor is higher than restriction)
    temp_factors_to_consider = []
    if has_condition('I50.x'):
        # Stable 1.0-1.2 g/kg; Cachectic 1.2-1.5 g/kg. Assume "Stable".
        temp_factors_to_consider.append(((1.0, 1.2), "I50.x (Stable)"))
    if ckd_is_dialysis:
        dialysis_type = "Hemodialysis"
        factor_range = (1.2, 1.4)
        if ckd_code_full and "Peritoneal Dialysis" in ckd_code_full:  # Placeholder check
            dialysis_type = "Peritoneal Dialysis"
            factor_range = (1.2, 1.5)
        temp_factors_to_consider.append(
            (factor_range, f"N18.6 ({dialysis_type})"))
    # No CKD restriction or on dialysis allows higher protein if needed
    if has_condition('E11.x'):
        # "0.8-1.0 g/kg (up to 1.5 g/kg or 15-20% energy if GFR normal)"
        # Base E11.x is 0.8-1.0, won't override age>65 or I50x if they are higher.
        # This means if not CKD restricted, this is a potential lower bound, but higher factors from other conditions take precedence.
        # If CKD restricted, this factor is ignored if it's higher than restriction.
        temp_factors_to_consider.append(((0.8, 1.0), "E11.x (base)"))
    if is_anorexia_f500:
        temp_factors_to_consider.append(((1.0, 1.2), "F50.0 (Refeeding)"))

    for (f_min, f_max), condition_name in temp_factors_to_consider:
        print(
            f"  -  Considering protein factor for {condition_name}: {f_min}-{f_max} g/kg.")
        # print(f"  - 中文: 考虑 {condition_name} 的蛋白质系数: {f_min}-{f_max} g/kg。")
        if ckd_protein_restricted:
            # If CKD restricted, we don't increase beyond the restriction (0.6-0.8)
            # unless "up to 1.0 if needed" for N18.1-3 could be triggered by another mechanism (not modeled here)
            print(
                f"  -  CKD protein restriction is active ({protein_factor_min}-{protein_factor_max} g/kg). {condition_name} factor not used to exceed this.")
            # print(f"  - 中文: CKD 蛋白质限制 ({protein_factor_min}-{protein_factor_max} g/kg) 生效。{condition_name} 系数不用于超过此限制。")
        else:
            # If not CKD restricted (or if it's a dialysis factor which is inherently higher)
            # Apply the highest need
            protein_factor_min = max(protein_factor_min, f_min)
            protein_factor_max = max(protein_factor_max, f_max)
            print(
                f"  -  Updated protein factor after considering {condition_name}: {protein_factor_min}-{protein_factor_max} g/kg.")
            # print(f"  - 中文: 考虑 {condition_name} 后更新的蛋白质系数: {protein_factor_min}-{protein_factor_max} g/kg。")

    # Ensure min <= max for protein factor
    if protein_factor_min > protein_factor_max:
        protein_factor_max = protein_factor_min

    protein_goal_min_g = calculation_weight * protein_factor_min
    protein_goal_max_g = calculation_weight * protein_factor_max

    results["Protein (g)"]["min"] = round(protein_goal_min_g)
    results["Protein (g)"]["max"] = round(protein_goal_max_g)
    print(
        f"  -  Final Protein Factor Range: {protein_factor_min:.2f}-{protein_factor_max:.2f} g/kg. Protein Goal: {results['Protein (g)']['min']}-{results['Protein (g)']['max']} g")
    # print(f"  - 中文: 最终蛋白质系数范围: {protein_factor_min:.2f}-{protein_factor_max:.2f} g/kg. 蛋白质目标: {results['Protein (g)']['min']}-{results['Protein (g)']['max']} g")

    protein_calories_min = protein_goal_min_g * 4
    protein_calories_max = protein_goal_max_g * 4
    print(
        f"  -  Protein Calories Range: {protein_calories_min:.0f}-{protein_calories_max:.0f} kcal (Protein (g) * 4 kcal/g)")
    # print(f"  - 中文: 蛋白质热量范围: {protein_calories_min:.0f}-{protein_calories_max:.0f} kcal (蛋白质 (g) * 4 kcal/g)")

    print(f"\n[INFO] Step 6: Determine Fat Needs ")
    # --- Step 6: Determine Fat Needs ---
    fat_percentage_target_min = 0.25  # 25%
    fat_percentage_target_max = 0.35  # 35%
    print(
        f"  -  Fat Target: {fat_percentage_target_min*100:.0f}% - {fat_percentage_target_max*100:.0f}% of Adjusted Energy.")
    # print(f"  - 中文: 脂肪目标: 调整后能量的 {fat_percentage_target_min*100:.0f}% - {fat_percentage_target_max*100:.0f}%。")

    fat_calories_min = adjusted_energy_min * fat_percentage_target_min
    fat_calories_max = adjusted_energy_max * fat_percentage_target_max
    print(
        f"  -  Fat Calories Range: {fat_calories_min:.0f}-{fat_calories_max:.0f} kcal (Adjusted Energy * Fat %)")
    # print(f"  - 中文: 脂肪热量范围: {fat_calories_min:.0f}-{fat_calories_max:.0f} kcal (调整后能量 * 脂肪百分比)")

    fat_goal_min_g = fat_calories_min / 9
    fat_goal_max_g = fat_calories_max / 9

    results["Fat (g)"]["min"] = round(fat_goal_min_g)
    results["Fat (g)"]["max"] = round(fat_goal_max_g)
    print(
        f"  -  Fat Goal: {results['Fat (g)']['min']}-{results['Fat (g)']['max']} g (Fat Calories / 9 kcal/g)")
    # print(f"  - 中文: 脂肪目标: {results['Fat (g)']['min']}-{results['Fat (g)']['max']} g (脂肪热量 / 9 kcal/g)")

    print(f"\n[INFO] Step 7: Determine Carbohydrate Needs ")
    # --- Step 7: Determine Carbohydrate Needs ---
    carb_calories_min = adjusted_energy_min - \
        protein_calories_max - fat_calories_max
    carb_calories_max = adjusted_energy_max - \
        protein_calories_min - fat_calories_min
    print(
        f"  -  Carbohydrate Calories by subtraction. Min: {adjusted_energy_min:.0f}(EnergyMin) - {protein_calories_max:.0f}(ProtMax) - {fat_calories_max:.0f}(FatMax) = {carb_calories_min:.0f} kcal")
    # print(f"  - 中文: 通过减法计算碳水化合物热量。最小: {adjusted_energy_min:.0f}(能量最小) - {protein_calories_max:.0f}(蛋白质最大) - {fat_calories_max:.0f}(脂肪最大) = {carb_calories_min:.0f} kcal")
    print(
        f"  -  Carbohydrate Calories by subtraction. Max: {adjusted_energy_max:.0f}(EnergyMax) - {protein_calories_min:.0f}(ProtMin) - {fat_calories_min:.0f}(FatMin) = {carb_calories_max:.0f} kcal")
    # print(f"  - 中文: 通过减法计算碳水化合物热量。最大: {adjusted_energy_max:.0f}(能量最大) - {protein_calories_min:.0f}(蛋白质最小) - {fat_calories_min:.0f}(脂肪最小) = {carb_calories_max:.0f} kcal")

    carb_goal_min_g = max(0, carb_calories_min / 4)
    carb_goal_max_g = max(carb_goal_min_g, carb_calories_max / 4)
    print(
        f"  -  Initial Carbohydrate Goal: {carb_goal_min_g:.0f}-{carb_goal_max_g:.0f} g (Carb Calories / 4 kcal/g)")
    # print(f"  - 中文: 初始碳水化合物目标: {carb_goal_min_g:.0f}-{carb_goal_max_g:.0f} g (碳水化合物热量 / 4 kcal/g)")

    if has_condition('E11.x'):
        min_carb_g_e11x = 130
        print(
            f"  -  Condition E11.x present. Minimum carbohydrate intake ~130 g/day. Current min: {carb_goal_min_g:.0f}g.")
        # print(f"  - 中文: 存在 E11.x 状况。最低碳水化合物摄入量约130克/天。当前最小值: {carb_goal_min_g:.0f}g。")
        carb_goal_min_g = max(carb_goal_min_g, min_carb_g_e11x)
        if carb_goal_max_g < carb_goal_min_g:
            carb_goal_max_g = carb_goal_min_g
        print(
            f"  -  Adjusted Carbohydrate Goal for E11.x (min 130g): {carb_goal_min_g:.0f}-{carb_goal_max_g:.0f} g")
        # print(f"  - 中文: 针对 E11.x 调整后的碳水化合物目标 (最少130g): {carb_goal_min_g:.0f}-{carb_goal_max_g:.0f} g")

    results["Carbohydrates (net)"]["min"] = round(carb_goal_min_g)
    results["Carbohydrates (net)"]["max"] = round(carb_goal_max_g)
    print(
        f"  -  Final Carbohydrate Goal: {results['Carbohydrates (net)']['min']}-{results['Carbohydrates (net)']['max']} g")
    # print(f"  - 中文: 最终碳水化合物目标: {results['Carbohydrates (net)']['min']}-{results['Carbohydrates (net)']['max']} g")

    print(f"\n[INFO] Step 8: Determine Fluid Needs ")
    # --- Step 8: Determine Fluid Needs ---
    fluid_baseline_min_calc_wt = 30 * calculation_weight
    fluid_baseline_max_calc_wt = 35 * calculation_weight
    print(
        f"  -  Baseline fluid needs (30-35 mL/kg Calculation_Weight): {fluid_baseline_min_calc_wt:.0f}-{fluid_baseline_max_calc_wt:.0f} mL. (Using Calculation_Weight={calculation_weight:.1f}kg)")
    # print(f"  - 中文: 基线液体需求 (30-35 mL/kg 计算体重): {fluid_baseline_min_calc_wt:.0f}-{fluid_baseline_max_calc_wt:.0f} mL。(使用计算体重={calculation_weight:.1f}kg)")
    # Alternative: 1 mL/kcal Adjusted_Energy
    # fluid_baseline_min_energy = 1 * adjusted_energy_min
    # fluid_baseline_max_energy = 1 * adjusted_energy_max
    # print(f"  -  Baseline fluid needs (1 mL/kcal Adjusted_Energy): {fluid_baseline_min_energy:.0f}-{fluid_baseline_max_energy:.0f} mL.")
    # print(f"  - 中文: 基线液体需求 (1 mL/kcal 调整后能量): {fluid_baseline_min_energy:.0f}-{fluid_baseline_max_energy:.0f} mL。")

    # Using the weight-based calculation as primary for baseline as per code logic
    fluid_goal_min = fluid_baseline_min_calc_wt
    fluid_goal_max = fluid_baseline_max_calc_wt

    fluid_restricted = False
    if has_condition('I50.x'):
        i50_fluid_min = 1500
        i50_fluid_max = 2000
        print(
            f"  -  Condition I50.x present. Fluid restriction: {i50_fluid_min}-{i50_fluid_max} mL/day.")
        # print(f"  - 中文: 存在 I50.x 状况。液体限制: {i50_fluid_min}-{i50_fluid_max} mL/天。")
        fluid_goal_min = min(fluid_goal_min, i50_fluid_min)
        fluid_goal_max = min(fluid_goal_max, i50_fluid_max)
        fluid_restricted = True
        print(
            f"  -  Fluid goal after I50.x restriction: {fluid_goal_min:.0f}-{fluid_goal_max:.0f} mL")
        # print(f"  - 中文: I50.x 限制后液体目标: {fluid_goal_min:.0f}-{fluid_goal_max:.0f} mL")

    # N18.6 Hemodialysis or PD (though HD has stricter rule)
    if ckd_is_dialysis:
        # Assuming Hemodialysis for stricter rule if not specified.
        # "Restrict based on urine output + 500-1000 mL/day." UO not input.
        hd_fluid_min_placeholder = 750  # Placeholder for UO(e.g. 0-250) + 500
        # Placeholder for UO(e.g. 0-250) + 750-1000
        hd_fluid_max_placeholder = 1000
        print(
            f"  -  CKD N18.6 (Dialysis) present. Fluid restriction rule: Urine Output + 500-1000 mL. Using placeholder restriction: {hd_fluid_min_placeholder}-{hd_fluid_max_placeholder} mL due to no UO input.")
        # print(f"  - 中文: 存在 CKD N18.6 (透析) 状况。液体限制规则: 尿量 + 500-1000 mL。由于无尿量输入，使用占位符限制: {hd_fluid_min_placeholder}-{hd_fluid_max_placeholder} mL。")
        fluid_goal_min = min(fluid_goal_min, hd_fluid_min_placeholder)
        fluid_goal_max = min(fluid_goal_max, hd_fluid_max_placeholder)
        fluid_restricted = True
        print(
            f"  -  Fluid goal after N18.6 restriction: {fluid_goal_min:.0f}-{fluid_goal_max:.0f} mL")
        # print(f"  - 中文: N18.6 限制后液体目标: {fluid_goal_min:.0f}-{fluid_goal_max:.0f} mL")

    if fluid_goal_min > fluid_goal_max:
        print(
            f"  -  Fluid min ({fluid_goal_min:.0f}) exceeded max ({fluid_goal_max:.0f}) after restrictions, setting min = max.")
        # print(f"  - 中文: 限制后液体最小值 ({fluid_goal_min:.0f}) 超过最大值 ({fluid_goal_max:.0f})，将最小值设为最大值。")
        fluid_goal_min = fluid_goal_max

    results["Fluid (ml)"]["min"] = round(fluid_goal_min)
    results["Fluid (ml)"]["max"] = round(fluid_goal_max)
    print(
        f"  -  Final Fluid Goal: {results['Fluid (ml)']['min']}-{results['Fluid (ml)']['max']} mL")
    # print(f"  - 中文: 最终液体目标: {results['Fluid (ml)']['min']}-{results['Fluid (ml)']['max']} mL")

    print(f"\n[INFO] Step 9: Determine Key Micronutrient Needs ")
    # --- Step 9: Determine Key Micronutrient Needs ---
    # Sodium (Na)
    na_limit = 2300
    print(f"  -  Sodium (Na): General limit < {na_limit} mg/day.")
    # print(f"  - 中文: 钠 (Na): 一般限制 < {na_limit} mg/天。")
    if has_condition('I50.x'):
        na_limit = min(na_limit, 2000)
    if has_condition('I10'):
        na_limit = min(na_limit, 2000)  # ideally < 1500
    if ckd_stage > 0:
        # prompt was <2000-2300, using 2300 as upper of that if other limits not tighter.
        na_limit = min(na_limit, 2300)
    results["Sodium (mg)"]["min"] = results["Sodium (mg)"]["max"] = round(
        na_limit)
    print(
        f"  -  Final Sodium Limit after considering conditions: < {results['Sodium (mg)']['max']} mg/day.")
    # print(f"  - 中文: 考虑医疗状况后最终钠限制: < {results['Sodium (mg)']['max']} mg/天。")

    # Potassium (K)
    k_target_min_dri = 2600 if gender == 'Female' else 3400
    k_target_max_dri = k_target_min_dri
    print(
        f"  -  Potassium (K): DRI target ~{k_target_min_dri} mg/day (Gender: {gender}).")
    # print(f"  - 中文: 钾 (K): DRI 目标约 {k_target_min_dri} mg/天 (性别: {gender})。")

    k_final_min = k_target_min_dri
    k_final_max = k_target_max_dri

    # N18.3b+ / N18.6: Restrict < 2000 - 3000. Assuming N18.3 is 3a/3b, so stage 3 onwards for "N18.3b+" logic.
    # Simplified: stage 3 can be tricky, stage 4/5/6 clearer
    if (ckd_stage >= 3 and ckd_code_full and ("N18.3b" in ckd_code_full or int(ckd_code_full.split('.')[1][0]) > 3)) or ckd_is_dialysis or (ckd_stage >= 4):
        k_restrict_min = 2000  # Lower bound of restriction range
        k_restrict_max = 3000  # Upper bound of restriction range
        print(
            f"  -  CKD Stage >=3b or Dialysis. Potassium restriction target: < {k_restrict_min}-{k_restrict_max} mg/day.")
        # print(f"  - 中文: CKD >=3b期或透析。钾限制目标: < {k_restrict_min}-{k_restrict_max} mg/天。")
        # The target becomes the restricted range.
        # This is the new target min, not necessarily DRI.
        k_final_min = k_restrict_min
        k_final_max = k_restrict_max  # This is the new target max.
        # It is a "restrict < X-Y", so the goal is to be within X-Y, or often, less than Y.
        # For the output format, if it's a limit, max is the limit. If it's a target range, min/max define it.
        # The prompt said "Restrict < 2000-3000". This usually means aim for not exceeding 3000, ideally around 2000-3000.
        # Let's interpret this as target range 2000-3000.
    results["Potassium (mg)"]["min"] = round(k_final_min)
    results["Potassium (mg)"]["max"] = round(k_final_max)
    print(
        f"  -  Final Potassium Target/Range: {results['Potassium (mg)']['min']}-{results['Potassium (mg)']['max']} mg/day.")
    # print(f"  - 中文: 最终钾目标/范围: {results['Potassium (mg)']['min']}-{results['Potassium (mg)']['max']} mg/天。")

    # Phosphorus (P)
    phos_target_min = 700  # DRI
    phos_target_max = 700  # DRI
    print(f"  -  Phosphorus (P): DRI ~{phos_target_min} mg/day.")
    # print(f"  - 中文: 磷 (P): DRI 约 {phos_target_min} mg/天。")
    if ckd_stage >= 3:  # N18.3+
        phos_target_min = 800
        phos_target_max = 1000
        print(
            f"  -  CKD Stage >=3. Phosphorus restriction target: {phos_target_min}-{phos_target_max} mg/day.")
        # print(f"  - 中文: CKD >=3期。磷限制目标: {phos_target_min}-{phos_target_max} mg/天。")
    results["Phosphorus (mg)"]["min"] = round(phos_target_min)
    results["Phosphorus (mg)"]["max"] = round(phos_target_max)
    print(
        f"  -  Final Phosphorus Target/Range: {results['Phosphorus (mg)']['min']}-{results['Phosphorus (mg)']['max']} mg/day.")
    # print(f"  - 中文: 最终磷目标/范围: {results['Phosphorus (mg)']['min']}-{results['Phosphorus (mg)']['max']} mg/天。")

    # Calcium (Ca)
    ca_target_min = 1000
    ca_target_max = 1300  # General DRI range
    if age <= 18:
        if 9 <= age <= 18:
            ca_target_min = ca_target_max = 1300
    elif age >= 51 and gender == 'Female':
        ca_target_min = ca_target_max = 1200
    elif age >= 71:
        ca_target_min = ca_target_max = 1200  # For both M/F age 71+ DRI is 1200

    print(
        f"  -  Calcium (Ca): Base DRI target {ca_target_min}-{ca_target_max} mg/day (age/gender adjusted).")
    # print(f"  - 中文: 钙 (Ca): 基线 DRI 目标 {ca_target_min}-{ca_target_max} mg/天 (根据年龄/性别调整)。")
    # N18.x: Manage with P/Vit D. Avoid excess. (implies sticking to DRI)
    results["Calcium (mg)"]["min"] = round(ca_target_min)
    results["Calcium (mg)"]["max"] = round(ca_target_max)
    print(
        f"  -  Final Calcium Target: {results['Calcium (mg)']['min']}-{results['Calcium (mg)']['max']} mg/day.")
    # print(f"  - 中文: 最终钙目标: {results['Calcium (mg)']['min']}-{results['Calcium (mg)']['max']} mg/天。")

    # Iron (Fe)
    fe_target = 8
    if gender == 'Female' and age <= 50:
        fe_target = 18
    print(
        f"  -  Iron (Fe): DRI target ~{fe_target} mg/day (Gender: {gender}, Age: {age}).")
    # print(f"  - 中文: 铁 (Fe): DRI 目标约 {fe_target} mg/天 (性别: {gender}, 年龄: {age})。")
    results["Iron (mg)"]["min"] = results["Iron (mg)"]["max"] = round(
        fe_target)
    print(f"  -  Final Iron Target: {results['Iron (mg)']['max']} mg/day.")
    # print(f"  - 中文: 最终铁目标: {results['Iron (mg)']['max']} mg/天。")

    print(f"\n--- Calculation Finished for Patient ID: {patient_id} ")
    return results

    # patient1_inputs = {
    #     "patient_id": "P001", "height_cm": 180, "weight_kg": 75, "age": 35,
    #     "gender": "Male", "pal": 1.4, "medical_conditions": []
    # }
    #    output1 = calculate_dashboard_standards(**patient1_inputs)
user_input = "身高 180cm, 体重 110kg (BMI >= 30), 年龄 50岁, 男性, PAL 1.4, 医疗状况: E66.0 (肥胖), I50.0 (心衰，稳定但有症状), E11.2 (糖尿病，有减重目标)。"

system_prompt = '''
You are a clinical nutrition assistant. Extract structured data from the user’s description into the following JSON:
{
  "patient_id": "string",
  "height_cm": number,
  "weight_kg": number,
  "age": number,
  "gender": "Male" | "Female",
  "pal": number,
  "medical_conditions": ["ICD-10 codes like E66.0", "I50.0"],
  "egfr": number | null,
  "hba1c": number | null,
  "albumin": number | null,
  "diuretic_use": boolean
}
Only return a JSON object matching the schema.
'''


def get_user_data_by_openAI(user_input):
    # 在API调用前
    print(f"准备调用OpenAI API处理用户: {user_input.get('name')}")

    # Step 1: GPT解析输入
    user_input_str = json.dumps(user_input, ensure_ascii=False)
    print(f"user_input_str: {user_input_str}")
    start_time = time.time()
    print(f"OpenAi")
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_input_str}
        ]
    )
# 在API调用后
    print(f"OpenAI API调用完成，开始解析响应")
    end_time = time.time()
    print(f"接口响应时间: {round(end_time - start_time, 2)} 秒")

    # Step 2: 提取结构数据
    data = json.loads(response.choices[0].message.content)
    print("结构化数据:")
    print(json.dumps(data, indent=2, ensure_ascii=False))

    # Step 3: 计算营养建议
    result = calculate_dashboard_standards(**data)
    print("\n营养建议结果:")
    # 将结果转换为JSON字符串
    return json.dumps(result, ensure_ascii=False)
    # print(json.dumps(result, indent=2, ensure_ascii=False))
