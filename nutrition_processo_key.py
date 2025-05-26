'''
Author: zhang
Date: 2025-05-26 09:54:50
Description: 
LastEditors: zhangzhenglong
LastEditTime: 2025-05-26 10:07:31
'''
import math
import json
import os
import time
from dotenv import load_dotenv, find_dotenv
# from openai import OpenAI
import openai

_ = load_dotenv(find_dotenv())

# 调用API
# client = OpenAI(
#     api_key=os.getenv("OPENAI_API_KEY"),
#     base_url=os.getenv("OPENAI_BASE_URL")
# )
openai.api_key = os.getenv("OPENAI_API_KEY")
openai.api_base = os.getenv("OPENAI_BASE_URL")

data = {
    "diseases": [
        {
            "name": "Diabetes",
            "icd_10_codes": ["E10.x", "E11.x", "E13.x"],
            "focus_nutrients": [
                "Energy: Moderate control, individualized targets",
                "Added Sugars: Strictly limit, main sources should be natural complex carbohydrates",
                "Carbohydrates: Complex carbohydrates, focus on Glycemic Index (GI) and Glycemic Load (GL)",
                "Protein: 15-20% of total energy, high-quality protein sources recommended",
                "Dietary Fiber: 30-50 grams per day, helps with blood sugar control",
                "Healthy Fats: Limit saturated and trans fats, increase unsaturated fats",
                "Magnesium: Common deficiency, affects insulin sensitivity",
                "Zinc: Involved in insulin synthesis and secretion",
                "Chromium: May help improve insulin action",
                "Vitamin D: Common deficiency, associated with insulin resistance",
                "Omega-3 Fatty Acids: Beneficial for cardiovascular health"
            ],
            "dietary_patterns": [
                "Balanced diet: Follow the plate method, plenty of vegetables, whole grains, lean protein",
                "Focus on foods with low Glycemic Index (GI) and Glycemic Load (GL)",
                "Regular meal times and portion control, avoid binge eating"
            ]
        },
        {
            "name": "Hypertension",
            "icd_10_codes": ["I10"],
            "focus_nutrients": [
                "Sodium: Strictly limit, target below 2300 mg/day, ideally below 1500 mg/day",
                "Potassium: Increase intake, e.g., through fruits, vegetables",
                "Magnesium: Increase intake",
                "Calcium: Increase intake"
            ],
            "dietary_patterns": [
                "DASH diet (Dietary Approaches to Stop Hypertension): Rich in vegetables, fruits, whole grains, low-fat dairy, lean meats; low in sodium and saturated fat"
            ]
        },
        {
            "name": "Cardiovascular Disease (CVD)",
            "icd_10_codes": ["I25.x", "I50.x", "I21.x", "I20.x"],
            "focus_nutrients": [
                "Saturated Fat: Limit intake",
                "Trans Fat: Avoid intake",
                "Cholesterol: Moderate limitation",
                "Sodium: Limit intake",
                "Dietary Fiber: Increase intake",
                "Unsaturated Fats: Prioritize, such as monounsaturated and polyunsaturated fatty acids"
            ],
            "dietary_patterns": [
                "Mediterranean diet pattern: Rich in vegetables, fruits, whole grains, legumes, nuts, olive oil, fish; moderate poultry and dairy; limit red meat and processed foods",
                "Plant-based diet"
            ]
        },
        {
            "name": "Heart Failure",
            "icd_10_codes": ["I50.x", "I50.0"],
            "focus_nutrients": [
                "Sodium: Strictly limit to reduce fluid retention",
                "Fluids: Strictly control intake to prevent worsening edema",
                "Potassium: Needs adjustment based on diuretic use and serum potassium levels",
                "Energy: Maintain appropriate body weight, avoid energy excess or deficiency"
            ],
            "dietary_patterns": [
                "Low-sodium, fluid-restricted diet",
                "Balanced, nutrient-rich foods, avoid processed foods"
            ]
        },
        {
            "name": "Chronic Kidney Disease (CKD)",
            "icd_10_codes": ["N18.x", "N18.3", "N18.4", "N18.5", "N18.6"],
            "focus_nutrients": [
                "Protein: Restricted in early stages, may need to increase during dialysis, individualized management",
                "Sodium: Limit intake",
                "Potassium: Limit intake (especially in late stages or with hyperkalemia)",
                "Phosphorus: Limit intake",
                "Fluids: Strictly control intake (especially in late stages or with edema)",
                "Iron: Common deficiency, may require supplementation",
                "Calcium: Needs to be balanced, avoid excessively high or low levels"
            ],
            "dietary_patterns": [
                "Low-protein, low-phosphorus, low-potassium, low-sodium diet, with strict fluid intake control",
                "Individualized adjustments based on kidney function stage and dialysis status"
            ]
        },
        {
            "name": "Obesity",
            "icd_10_codes": ["E66.x", "E66.0"],
            "focus_nutrients": [
                "Energy: Create an energy deficit to achieve weight loss",
                "Protein: Adequate intake, aids satiety and muscle maintenance",
                "Dietary Fiber: Increase intake, aids satiety and digestion",
                "Added Sugars: Strictly limit",
                "Unhealthy Fats: Limit saturated and trans fats"
            ],
            "dietary_patterns": [
                "Balanced, diverse whole-food diet",
                "Portion control, regular meals",
                "Increase intake of vegetables, fruits, whole grains, lean protein"
            ]
        },
        {
            "name": "Celiac Disease",
            "icd_10_codes": ["K90.0"],
            "focus_nutrients": [
                "Gluten: Lifelong strict avoidance (wheat, barley, rye, and their products)",
                "Iron: Common deficiency, monitor and supplement as needed",
                "Folate: Common deficiency, monitor and supplement as needed",
                "Vitamin D: Common deficiency, monitor and supplement as needed",
                "Calcium: Common deficiency, monitor and supplement as needed",
                "Vitamin B12: Common deficiency, monitor and supplement as needed"
            ],
            "dietary_patterns": [
                "Strict gluten-free diet, including avoiding cross-contamination",
                "Address vitamin and mineral deficiencies due to malabsorption, supplement if necessary"
            ]
        },
        {
            "name": "Inflammatory Bowel Disease (IBD)",
            "icd_10_codes": ["K50.x", "K51.x"],
            "focus_nutrients": [
                "Omega-3 Fatty Acids: May have anti-inflammatory effects",
                "Dietary Fiber: Adjust based on tolerance, may require low fiber during flare-ups",
                "Vitamin B12: Common deficiency",
                "Folate: Common deficiency",
                "Vitamin D: Common deficiency",
                "Vitamin E: Common deficiency",
                "Vitamin K: Common deficiency",
                "Vitamin A: Common deficiency",
                "Magnesium: Common deficiency",
                "Zinc: Common deficiency",
                "Calcium: Common deficiency",
                "Potassium: Common deficiency"
            ],
            "dietary_patterns": [
                "Avoid trigger foods such as high-sugar, high-fat, alcohol",
                "May require liquid or low-residue diet during flare-ups, diversify as much as possible during remission",
                "Individualized dietary adjustments, keep a food tolerance journal"
            ]
        },
        {
            "name": "Anorexia Nervosa",
            "icd_10_codes": ["F50.0"],
            "focus_nutrients": [
                "Energy: Gradually increase, aiming for weight restoration and stabilization",
                "Macronutrients: Balanced intake of carbohydrates, protein, and fat to support weight gain and physiological recovery",
                "Electrolytes: Close monitoring and supplementation (especially in early refeeding to prevent refeeding syndrome), e.g., potassium, phosphorus, magnesium",
                "Vitamins and Minerals: Widespread deficiencies, comprehensive supplementation needed (e.g., Vitamin D, calcium, iron, zinc, B vitamins)",
                "Fluids: Adequate intake to maintain hydration"
            ],
            "dietary_patterns": [
                "Refeeding plan under strict medical supervision, gradually increasing energy and nutrient intake",
                "Small, frequent meals; energy-dense, nutrient-dense foods",
                "Focus on patient's mental health, combine dietary intervention with psychotherapy"
            ]
        }
    ],
    "medication_interactions": [
        {
            "drug_class": "Diuretics",
            "examples": ["Thiazide diuretics", "Loop diuretics"],
            "impact": "May cause loss of potassium, magnesium, sodium, zinc, folate, vitamins B1, B6, C. Thiazide diuretics may reduce calcium excretion.",
            "dietary_considerations": "Supplement with potassium and magnesium-rich foods (e.g., bananas, leafy greens), monitor electrolyte levels."
        },
        {
            "drug_class": "Antacids/Acid Suppressors",
            "examples": ["Aluminum-containing antacids", "Proton Pump Inhibitors (PPIs)", "H2 blockers"],
            "impact": "May reduce absorption of folate, iron, zinc, phosphorus, calcium, magnesium, vitamin B12, vitamin C.",
            "dietary_considerations": "Monitor levels of related nutrients, consider supplementation at times different from medication intake, or adjust diet."
        },
        {
            "drug_class": "Antibiotics",
            "examples": ["Broad-spectrum antibiotics"],
            "impact": "Disrupt gut flora balance, affecting synthesis of B vitamins and vitamin K, and overall nutrient absorption.",
            "dietary_considerations": "Recommend supplementing with probiotics and prebiotics during and after medication to restore gut health."
        },
        {
            "drug_class": "Statins",
            "examples": ["Atorvastatin", "Simvastatin"],
            "impact": "May lower Coenzyme Q10 (CoQ10) levels. Grapefruit juice increases statin blood concentration, raising risk of side effects.",
            "dietary_considerations": "Avoid grapefruit and grapefruit juice; consider CoQ10 supplementation under medical advice."
        },
        {
            "drug_class": "Corticosteroids",
            "examples": ["Prednisone"],
            "impact": "Causes loss of calcium, potassium, sodium, protein, vitamin C, vitamin D. May increase appetite, leading to weight gain, muscle/bone loss, hypertension, abnormal blood sugar.",
            "dietary_considerations": "Increase calcium and vitamin D intake, monitor blood sugar and blood pressure, control total energy intake to prevent excessive weight gain."
        },
        {
            "drug_class": "Oral Contraceptives",
            "examples": ["Combined oral contraceptives"],
            "impact": "May lower levels of vitamins B6, B12, folate; may increase vitamin D levels.",
            "dietary_considerations": "Focus on intake of B vitamins and folate."
        },
        {
            "drug_class": "Warfarin",
            "examples": ["Warfarin"],
            "impact": "Interacts with vitamin K; vitamin K reduces warfarin's anticoagulant effect.",
            "dietary_considerations": "Maintain stable vitamin K intake, avoid large amounts of vitamin K-rich foods (e.g., dark green leafy vegetables, broccoli), consult a doctor or dietitian to balance diet."
        }
    ]
}


user_input = "身高 180cm, 体重 110kg (BMI >= 30), 年龄 50岁, 男性, PAL 1.4, 医疗状况: E66.0 (肥胖), I50.0 (心衰，稳定但有症状), E11.2 (糖尿病，有减重目标)。"

system_prompt = f'''
        Using the provided guideline and the user’s background information (e.g., age, sex, height, weight), medical diagnoses (ICD-10 codes), and medication usage, identify the five most critical nutrients that the user should pay attention to. For each nutrient, explain why it is important given the user’s specific conditions.
	•	If the guideline includes nutrient recommendations based on the user’s diagnoses or medications, prioritize those.
	•	If the guideline does not provide relevant information, search reliable external sources (e.g., WHO, NIH, PubMed) to supplement.
	•	Output should include exactly five high-priority nutrients, and for each one:
	1.	Nutrient name
	2.	Explanation of its importance (based on disease, medications, or physiological state)
	3.	Source of information (guideline or external reference)

Make sure the output is clear, concise, and structured, suitable for use by clinical dietitians or nutrition support systems.
the guideline is {data}
replay in English
jsonFormat'''


def get_user_data_by_openAI(user_input):
    # 在API调用前
    print(f"准备调用OpenAI API处理用户: {user_input.get('name')}")

    # Step 1: GPT解析输入
    user_input_str = json.dumps(user_input, ensure_ascii=False)
    print(f"user_input_str: {user_input_str}")
    start_time = time.time()
    print(f"OpenAi")
    response = openai.ChatCompletion.create(model="gpt-4o",
                                            response_format={
                                                "type": "json_object"},
                                            messages=[
                                                {"role": "system",
                                                    "content": system_prompt},
                                                {"role": "user",
                                                    "content": user_input_str}
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
    # result = calculate_dashboard_standards(**data)
    # print("\n营养建议结果:")
    # 将结果转换为JSON字符串
    return json.dumps(data, ensure_ascii=False)
    # print(json.dumps(result, indent=2, ensure_ascii=False))
