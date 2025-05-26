import pandas as pd
import asyncio
import time
from nutrition_processor import get_user_data_by_openAI
import json
# --- 配置项 ---
INPUT_EXCEL_FILE = 'input_users.xlsx'
OUTPUT_EXCEL_FILE = 'output_users_with_data.xlsx'
ERROR_SAVE_EXCEL_FILE = 'output_users_PARTIAL.xlsx'
NEW_COLUMN_NAME = 'ProcessedData'
USER_ID_COLUMN = 'patient_id'
USER_NAME_COLUMN = 'name'

# 处理每一行用户数据
async def fetch_data_for_user(row: pd.Series) -> str:
    try:
        user_input = {
            "id": str(row.get("patient_id")),
            "name": str(row.get("name")),
            "age": row.get("age"),
            "birthday": row.get("birthday"),
            "height": row.get("height"),
            "weight": row.get("weight"),
            "gender": row.get("gender"),
            "icd10_codes": row.get("icd10_codes"),
            "icd10_codes_name": row.get("icd10_codes_name"),
            "medication": row.get("medication"),
        }

        print(f"开始处理用户: {user_input['name']} (ID: {user_input['id']})")
    
        result = get_user_data_by_openAI(user_input)
        print(f"完成处理用户: {user_input['name']} (ID: {user_input['id']})")
        return result
    except Exception as e:
        return f"Error: Failed to process row - {e}"

async def process_excel_rows(df: pd.DataFrame) -> list:
    tasks = []
    processed_data_placeholders = [None] * len(df)

    for index, row in df.iterrows():
        try:
            task = asyncio.create_task(fetch_data_for_user(row), name=f"Task_row_{index}")
            tasks.append((index, task))
        except Exception as e:
            print(f"创建任务时发生错误 (行 {index+2}): {e}")
            processed_data_placeholders[index] = f"Error: Task creation failed for row {index+2} - {e}"

    print(f"\n即将开始并行处理 {len([t for _, t in tasks])} 个任务...")
    valid_tasks_with_indices = [(idx, tsk) for idx, tsk in tasks if tsk is not None]

    if not valid_tasks_with_indices:
        print("没有有效任务可以执行。")
        return processed_data_placeholders

    task_futures = [task for _, task in valid_tasks_with_indices]
    gathered_results = await asyncio.gather(*task_futures, return_exceptions=True)

    for i, (original_index, _) in enumerate(valid_tasks_with_indices):
        result = gathered_results[i]
        if isinstance(result, Exception):
            print(f"任务 (行 {original_index+2}) 失败: {result}")
            processed_data_placeholders[original_index] = f"Error: {type(result).__name__} - {str(result)}"
        else:
            processed_data_placeholders[original_index] = result

    return processed_data_placeholders

async def main():
    df = None
    new_column_data_list = []
    successfully_completed = False

    try:
        print(f"开始处理Excel文件: {INPUT_EXCEL_FILE}")
        try:
            df = pd.read_excel(INPUT_EXCEL_FILE)
            print(f"成功读取Excel文件，共 {len(df)} 行数据。")
            print("Excel表头:", df.columns.tolist())
        except FileNotFoundError:
            print(f"错误: 输入的Excel文件 '{INPUT_EXCEL_FILE}' 未找到。")
            return
        except Exception as e:
            print(f"读取Excel文件时发生错误: {e}")
            return

        if USER_ID_COLUMN not in df.columns or USER_NAME_COLUMN not in df.columns:
            raise KeyError(f"缺少必要列：{USER_ID_COLUMN} 或 {USER_NAME_COLUMN}")

        start_time = time.time()
        new_column_data_list = await process_excel_rows(df)
        end_time = time.time()

        print(f"\n所有异步任务完成，耗时: {end_time - start_time:.2f} 秒。")

        if len(new_column_data_list) != len(df):
            raise ValueError("Data length mismatch after processing.")

        successfully_completed = True

    except Exception as e:
        print(f"\n处理过程中发生错误: {type(e).__name__} - {e}")
        import traceback
        traceback.print_exc()
    
    finally:
        print("\n--- 进入 finally 清理块 ---")
        if df is not None:
            if new_column_data_list and len(new_column_data_list) == len(df):
                df[NEW_COLUMN_NAME] = new_column_data_list
                print(f"处理数据已添加到列 '{NEW_COLUMN_NAME}'")
            else:
                print(f"警告: 新列数据未能正确生成或长度不一致")

            save_filename = OUTPUT_EXCEL_FILE if successfully_completed else ERROR_SAVE_EXCEL_FILE
            try:
                df.to_excel(save_filename, index=False)
                print(f"保存成功: {save_filename}")
            except Exception as e_save:
                print(f"保存失败: {e_save}")
        else:
            print("DataFrame 未加载，无法保存。")

        print("--- finally 清理块结束 ---")

if __name__ == "__main__":
    asyncio.run(main())