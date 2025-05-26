import pandas as pd

# 读取三个表格
df_patient = pd.read_excel("./user.xlsx")
df_icd10 = pd.read_excel("./icd10_info.xlsx")
df_md = pd.read_excel("./md.xlsx")

# 标准化列名
df_patient.columns = df_patient.columns.str.lower().str.strip()
df_icd10.columns = df_icd10.columns.str.lower().str.strip()
df_md.columns = df_md.columns.str.lower().str.strip()

# 拆分 icd10_codes 字符串为多行
df_patient = df_patient.dropna(subset=['icd10_codes'])
df_expanded = df_patient.assign(icd10_code=df_patient['icd10_codes'].astype(str).str.split(",")).explode("icd10_code")
df_expanded['icd10_code'] = df_expanded['icd10_code'].str.strip()

# 合并 icd10 英文名称
df_icd10_subset = df_icd10[['icd10_code', 'icd10_name_en']]
df_merged = df_expanded.merge(df_icd10_subset, how='left', on='icd10_code')

# 按 patient_id 汇总 icd10_code 和英文名称
df_icd_grouped = df_merged.groupby(['patient_id', 'name', 'height', 'weight', 'gender']).agg({
    'icd10_code': lambda x: ', '.join(sorted(set(x.dropna()))),
    'icd10_name_en': lambda x: ', '.join(sorted(set(x.dropna()))),
}).reset_index()

# 重命名字段
df_icd_grouped.rename(columns={
    'icd10_code': 'icd10_codes',
    'icd10_name_en': 'icd10_codes_name'
}, inplace=True)

# 整理药物信息（每个 patient_id 合并所有药物）
df_medications = df_md[['patient_id', 'medication']].dropna()
df_medications_grouped = df_medications.groupby('patient_id')['medication'] \
                                       .apply(lambda x: ', '.join(sorted(set(x)))) \
                                       .reset_index()

# 合并药物信息
df_final = df_icd_grouped.merge(df_medications_grouped, how='left', on='patient_id')

# 保存结果
df_final.to_excel("统一表格结果.xlsx", index=False)
print("✅ 合并完成，使用英文 ICD-10 名称，结果保存在：统一表格结果.xlsx")