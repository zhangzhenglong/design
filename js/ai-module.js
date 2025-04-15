/**
 * NutriLife AI Module
 * 这个模块负责处理与AI模型的交互，包括问卷分析、方案生成、记录分析和报告生成
 * 默认使用Gemini API，但设计为可替换的模块化结构
 */

const NutriLifeAI = (function() {
    // 配置参数
    const config = {
        apiKey: '', // 需要设置你的Gemini API Key
        apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent',
        streamingEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent'
    };

    // 存储用户数据
    let userData = {
        basicInfo: {},
        dietaryPreferences: {},
        healthGoals: {},
        restrictions: {},
        activityLevel: {},
        sleepPattern: {},      // 睡眠规律数据
        dailySchedule: {},     // 日常活动安排
        mealHistory: [],       // 饮食历史记录
        exerciseHistory: [],   // 运动历史记录
        progressData: {}       // 进度数据
    };

    /**
     * 初始化AI模块
     * @param {Object} options - 配置选项
     */
    function init(options = {}) {
        if (options.apiKey) {
            config.apiKey = options.apiKey;
        }
        
        // 检查是否有存储的用户数据
        const savedUserData = localStorage.getItem('nutrilife_user_data');
        if (savedUserData) {
            try {
                userData = JSON.parse(savedUserData);
                console.log('已加载用户数据:', userData);
            } catch (e) {
                console.error('加载用户数据失败:', e);
            }
        }
        
        console.log('NutriLife AI 模块已初始化');
    }

    /**
     * 保存用户数据
     */
    function saveUserData() {
        try {
            localStorage.setItem('nutrilife_user_data', JSON.stringify(userData));
        } catch (e) {
            console.error('保存用户数据失败:', e);
        }
    }

    /**
     * 更新用户基本信息
     * @param {Object} basicInfo - 用户基本信息
     */
    function updateBasicInfo(basicInfo) {
        userData.basicInfo = {...userData.basicInfo, ...basicInfo};
        saveUserData();
        return userData.basicInfo;
    }

    /**
     * 更新用户饮食偏好
     * @param {Object} preferences - 用户饮食偏好
     */
    function updateDietaryPreferences(preferences) {
        userData.dietaryPreferences = {...userData.dietaryPreferences, ...preferences};
        saveUserData();
        return userData.dietaryPreferences;
    }

    /**
     * 更新用户健康目标
     * @param {Object} goals - 用户健康目标
     */
    function updateHealthGoals(goals) {
        userData.healthGoals = {...userData.healthGoals, ...goals};
        saveUserData();
        return userData.healthGoals;
    }

    /**
     * 更新用户饮食限制
     * @param {Object} restrictions - 用户饮食限制
     */
    function updateRestrictions(restrictions) {
        userData.restrictions = {...userData.restrictions, ...restrictions};
        saveUserData();
        return userData.restrictions;
    }

    /**
     * 更新用户活动水平
     * @param {Object} activityLevel - 用户活动水平
     */
    function updateActivityLevel(activityLevel) {
        userData.activityLevel = {...userData.activityLevel, ...activityLevel};
        saveUserData();
        return userData.activityLevel;
    }
    
    /**
     * 更新用户睡眠规律
     * @param {Object} sleepPattern - 用户睡眠规律数据
     */
    function updateSleepPattern(sleepPattern) {
        userData.sleepPattern = {...userData.sleepPattern, ...sleepPattern};
        saveUserData();
        return userData.sleepPattern;
    }
    
    /**
     * 更新用户日常活动安排
     * @param {Object} dailySchedule - 用户日常活动安排
     */
    function updateDailySchedule(dailySchedule) {
        userData.dailySchedule = {...userData.dailySchedule, ...dailySchedule};
        saveUserData();
        return userData.dailySchedule;
    }
    
    /**
     * 添加饮食记录到历史
     * @param {Object} mealRecord - 饮食记录
     */
    function addMealRecord(mealRecord) {
        userData.mealHistory.push({...mealRecord, timestamp: new Date().toISOString()});
        if (userData.mealHistory.length > 100) { // 限制历史记录数量
            userData.mealHistory = userData.mealHistory.slice(-100);
        }
        saveUserData();
        return userData.mealHistory;
    }
    
    /**
     * 添加运动记录到历史
     * @param {Object} exerciseRecord - 运动记录
     */
    function addExerciseRecord(exerciseRecord) {
        userData.exerciseHistory.push({...exerciseRecord, timestamp: new Date().toISOString()});
        if (userData.exerciseHistory.length > 100) { // 限制历史记录数量
            userData.exerciseHistory = userData.exerciseHistory.slice(-100);
        }
        saveUserData();
        return userData.exerciseHistory;
    }
    
    /**
     * 更新用户进度数据
     * @param {Object} progressData - 进度数据
     */
    function updateProgressData(progressData) {
        userData.progressData = {...userData.progressData, ...progressData};
        saveUserData();
        return userData.progressData;
    }

    /**
     * 调用Gemini API
     * @param {Object} prompt - 提示内容
     * @param {Boolean} streaming - 是否使用流式响应
     * @param {Function} onChunk - 流式响应的回调函数
     * @returns {Promise} - API响应
     */
    async function callGeminiAPI(prompt, streaming = false, onChunk = null) {
        if (!config.apiKey) {
            throw new Error('未设置API Key');
        }

        const endpoint = streaming ? config.streamingEndpoint : config.apiEndpoint;
        const url = `${endpoint}?key=${config.apiKey}`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        };

        if (streaming && onChunk) {
            // 流式响应处理
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let buffer = '';

                while (true) {
                    const {done, value} = await reader.read();
                    if (done) break;
                    
                    buffer += decoder.decode(value, {stream: true});
                    
                    // 处理缓冲区中的完整JSON对象
                    let startIdx = 0;
                    while (startIdx < buffer.length) {
                        const endIdx = buffer.indexOf('\n', startIdx);
                        if (endIdx === -1) break;
                        
                        const line = buffer.substring(startIdx, endIdx).trim();
                        startIdx = endIdx + 1;
                        
                        if (!line) continue;
                        
                        try {
                            const chunk = JSON.parse(line);
                            onChunk(chunk);
                        } catch (e) {
                            console.error('解析流式响应失败:', e, line);
                        }
                    }
                    
                    // 保留未处理的部分
                    buffer = buffer.substring(startIdx);
                }
                
                return true;
            } catch (error) {
                console.error('流式API调用失败:', error);
                throw error;
            }
        } else {
            // 非流式响应处理
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error(`API调用失败: ${response.status}`);
                }

                const data = await response.json();
                return data;
            } catch (error) {
                console.error('API调用失败:', error);
                throw error;
            }
        }
    }

    /**
     * 生成问卷问题
     * @param {Number} step - 当前问卷步骤
     * @returns {Promise} - 问卷问题
     */
    async function generateQuestions(step) {
        // 根据步骤生成不同的问题
        const prompts = {
            1: '请生成关于用户基本信息的营养问卷问题，包括年龄、性别、身高、体重等。',
            2: '请生成关于用户饮食偏好的营养问卷问题，包括喜欢和不喜欢的食物、口味偏好等。',
            3: '请生成关于用户健康目标的营养问卷问题，包括减重、增肌、改善健康指标等。',
            4: '请生成关于用户饮食限制的营养问卷问题，包括过敏、宗教限制、素食主义等。',
            5: '请生成关于用户活动水平的营养问卷问题，包括运动频率、强度、类型等。'
        };

        const prompt = prompts[step] || '请生成营养相关的问卷问题';
        
        try {
            const response = await callGeminiAPI(prompt);
            // 解析API响应获取问题
            if (response && response.candidates && response.candidates[0].content.parts) {
                return response.candidates[0].content.parts[0].text;
            }
            return '无法生成问题，请稍后再试';
        } catch (error) {
            console.error('生成问题失败:', error);
            return '生成问题时出错，请稍后再试';
        }
    }

    /**
     * 分析用户问卷数据并生成方案
     * @returns {Promise} - 个性化方案
     */
    async function analyzeSurvey() {
        const prompt = `
        请根据以下用户信息，生成一个详细的个性化营养方案：
        
        基本信息：${JSON.stringify(userData.basicInfo)}
        饮食偏好：${JSON.stringify(userData.dietaryPreferences)}
        健康目标：${JSON.stringify(userData.healthGoals)}
        饮食限制：${JSON.stringify(userData.restrictions)}
        活动水平：${JSON.stringify(userData.activityLevel)}
        睡眠规律：${JSON.stringify(userData.sleepPattern)}
        日常安排：${JSON.stringify(userData.dailySchedule)}
        
        请提供以下内容：
        1. 详细的每日饮食计划，精确到每一餐（早餐、午餐、晚餐和加餐）的具体食物、份量和营养素分配
        2. 根据用户的睡眠规律和日常安排，为每餐提供最佳的时间安排
        3. 针对用户健康目标的个性化运动建议，包括具体的运动类型、时长、频率和最佳时间
        4. 生活习惯调整建议
        5. 详细的每周进度跟踪指标
        
        请确保建议是具体、可行的，并考虑用户的所有限制和偏好。方案应该足够详细，让用户可以直接按照计划执行。
        `;

        try {
            // 这里可以使用流式响应来逐步显示生成的方案
            let plan = {
                dietPlan: {
                    breakfast: { foods: [], timing: '', nutrients: {} },
                    lunch: { foods: [], timing: '', nutrients: {} },
                    dinner: { foods: [], timing: '', nutrients: {} },
                    snacks: [{ foods: [], timing: '', nutrients: {} }]
                },
                exercisePlan: {
                    daily: [],
                    weekly: []
                },
                lifestyleTips: '',
                trackingMetrics: ''
            };
            
            const response = await callGeminiAPI(prompt);
            
            // 解析API响应获取方案
            if (response && response.candidates && response.candidates[0].content.parts) {
                const text = response.candidates[0].content.parts[0].text;
                
                // 尝试解析更详细的结构化数据
                try {
                    // 解析饮食计划
                    if (text.includes('早餐')) {
                        const breakfastSection = text.split('早餐')[1].split(/午餐|晚餐|加餐|运动建议/)[0].trim();
                        plan.dietPlan.breakfast = {
                            foods: extractFoodItems(breakfastSection),
                            timing: extractTiming(breakfastSection),
                            nutrients: extractNutrients(breakfastSection)
                        };
                    }
                    
                    if (text.includes('午餐')) {
                        const lunchSection = text.split('午餐')[1].split(/晚餐|加餐|运动建议/)[0].trim();
                        plan.dietPlan.lunch = {
                            foods: extractFoodItems(lunchSection),
                            timing: extractTiming(lunchSection),
                            nutrients: extractNutrients(lunchSection)
                        };
                    }
                    
                    if (text.includes('晚餐')) {
                        const dinnerSection = text.split('晚餐')[1].split(/加餐|运动建议/)[0].trim();
                        plan.dietPlan.dinner = {
                            foods: extractFoodItems(dinnerSection),
                            timing: extractTiming(dinnerSection),
                            nutrients: extractNutrients(dinnerSection)
                        };
                    }
                    
                    if (text.includes('加餐')) {
                        const snacksSection = text.split('加餐')[1].split(/运动建议/)[0].trim();
                        plan.dietPlan.snacks = [{
                            foods: extractFoodItems(snacksSection),
                            timing: extractTiming(snacksSection),
                            nutrients: extractNutrients(snacksSection)
                        }];
                    }
                    
                    // 解析运动建议
                    if (text.includes('运动建议')) {
                        const exerciseSection = text.split('运动建议')[1].split('生活习惯调整')[0].trim();
                        plan.exercisePlan = parseExercisePlan(exerciseSection);
                    }
                    
                    // 解析生活习惯调整
                    if (text.includes('生活习惯调整')) {
                        plan.lifestyleTips = text.split('生活习惯调整')[1].split('每周进度跟踪')[0].trim();
                    }
                    
                    // 解析进度跟踪
                    if (text.includes('每周进度跟踪')) {
                        plan.trackingMetrics = text.split('每周进度跟踪')[1].trim();
                    }
                } catch (e) {
                    console.error('解析方案失败:', e);
                }
                
                // 如果解析失败，则使用完整文本
                if (!plan.dietPlan.breakfast.foods.length && !plan.dietPlan.lunch.foods.length && !plan.lifestyleTips) {
                    plan = {
                        fullPlan: text
                    };
                }
            }
            
            return plan;
        } catch (error) {
            console.error('分析问卷失败:', error);
            return {
                error: '生成方案时出错，请稍后再试'
            };
        }
    }

    /**
     * 辅助函数：从文本中提取食物项目
     * @param {String} text - 文本内容
     * @returns {Array} - 食物项目数组
     */
    function extractFoodItems(text) {
        const foodItems = [];
        // 简单的提取逻辑，实际应用中可能需要更复杂的解析
        const lines = text.split('\n');
        for (const line of lines) {
            if (line.includes('：') || line.includes(':')) {
                const parts = line.split(/：|:/)[1];
                if (parts) {
                    const items = parts.split(/[,，、]/).map(item => item.trim()).filter(Boolean);
                    foodItems.push(...items);
                }
            }
        }
        return foodItems;
    }
    
    /**
     * 辅助函数：从文本中提取时间信息
     * @param {String} text - 文本内容
     * @returns {String} - 时间信息
     */
    function extractTiming(text) {
        // 查找时间相关的信息
        const timeRegex = /(\d{1,2}[:.：]\d{1,2}|早上|上午|中午|下午|晚上|[0-9一二三四五六七八九十]+点)/;
        const match = text.match(timeRegex);
        return match ? match[0] : '';
    }
    
    /**
     * 辅助函数：从文本中提取营养素信息
     * @param {String} text - 文本内容
     * @returns {Object} - 营养素信息
     */
    function extractNutrients(text) {
        const nutrients = {};
        const nutrientRegex = /(蛋白质|碳水化合物|脂肪|热量|卡路里|蛋白|碳水|维生素|矿物质)[:：]?\s*([\d.]+)\s*(克|千卡|g|kcal|%)/gi;
        let match;
        while ((match = nutrientRegex.exec(text)) !== null) {
            const name = match[1];
            const value = parseFloat(match[2]);
            const unit = match[3];
            nutrients[name] = { value, unit };
        }
        return nutrients;
    }
    
    /**
     * 辅助函数：解析运动计划
     * @param {String} text - 文本内容
     * @returns {Object} - 运动计划
     */
    function parseExercisePlan(text) {
        const plan = {
            daily: [],
            weekly: []
        };
        
        const lines = text.split('\n');
        let currentSection = 'daily';
        
        for (const line of lines) {
            if (line.toLowerCase().includes('每周') || line.toLowerCase().includes('weekly')) {
                currentSection = 'weekly';
                continue;
            }
            
            if (line.trim() && !line.includes('运动建议') && !line.includes('Exercise')) {
                plan[currentSection].push(line.trim());
            }
        }
        
        return plan;
    }
    
    /**
     * 分析用户的饮食记录并给出建议
     * @param {Object} mealData - 饮食记录数据
     * @returns {Promise} - 饮食建议
     */
    async function analyzeMealLog(mealData) {
        // 添加到历史记录
        addMealRecord(mealData);
        
        const prompt = `
        请分析以下用户的饮食记录，并给出针对性的建议：
        
        用户基本信息：${JSON.stringify(userData.basicInfo)}
        用户健康目标：${JSON.stringify(userData.healthGoals)}
        用户饮食限制：${JSON.stringify(userData.restrictions)}
        用户睡眠规律：${JSON.stringify(userData.sleepPattern)}
        用户日常安排：${JSON.stringify(userData.dailySchedule)}
        
        当前饮食记录：${JSON.stringify(mealData)}
        历史饮食记录（最近3条）：${JSON.stringify(userData.mealHistory.slice(-3))}
        
        请提供：
        1. 这餐饮食的详细营养评价（包括宏量营养素分析）
        2. 针对用户健康目标的具体改进建议
        3. 与用户当前计划的符合度评估
        4. 下一餐的具体建议（包括食物选择、份量和最佳时间）
        5. 鼓励性的反馈
        `;

        try {
            const response = await callGeminiAPI(prompt);
            
            // 解析API响应获取建议
            if (response && response.candidates && response.candidates[0].content.parts) {
                return response.candidates[0].content.parts[0].text;
            }
            
            return '无法分析饮食记录，请稍后再试';
        } catch (error) {
            console.error('分析饮食记录失败:', error);
            return '分析饮食记录时出错，请稍后再试';
        }
    }

    /**
     * 分析用户的运动记录并给出建议
     * @param {Object} exerciseData - 运动记录数据
     * @returns {Promise} - 运动建议
     */
    async function analyzeExerciseLog(exerciseData) {
        // 添加到历史记录
        addExerciseRecord(exerciseData);
        
        const prompt = `
        请分析以下用户的运动记录，并给出针对性的建议：
        
        用户基本信息：${JSON.stringify(userData.basicInfo)}
        用户健康目标：${JSON.stringify(userData.healthGoals)}
        用户活动水平：${JSON.stringify(userData.activityLevel)}
        用户睡眠规律：${JSON.stringify(userData.sleepPattern)}
        用户日常安排：${JSON.stringify(userData.dailySchedule)}
        
        当前运动记录：${JSON.stringify(exerciseData)}
        历史运动记录（最近3条）：${JSON.stringify(userData.exerciseHistory.slice(-3))}
        
        请提供：
        1. 这次运动的详细评价（包括强度、持续时间、消耗热量等分析）
        2. 针对用户健康目标的具体改进建议
        3. 与用户当前计划的符合度评估
        4. 下一次运动的具体建议（包括运动类型、强度、持续时间和最佳时间）
        5. 鼓励性的反馈
        `;

        try {
            const response = await callGeminiAPI(prompt);
            
            // 解析API响应获取建议
            if (response && response.candidates && response.candidates[0].content.parts) {
                return response.candidates[0].content.parts[0].text;
            }
            
            return '无法分析运动记录，请稍后再试';
        } catch (error) {
            console.error('分析运动记录失败:', error);
            return '分析运动记录时出错，请稍后再试';
        }
    }

    /**
     * 生成周期性报告
     * @param {Object} userRecords - 用户记录数据
     * @returns {Promise} - 周期性报告
     */
    async function generateReport(userRecords) {
        const prompt = `
        请根据以下用户的记录数据，生成一份周期性健康报告：
        
        用户基本信息：${JSON.stringify(userData.basicInfo)}
        用户健康目标：${JSON.stringify(userData.healthGoals)}
        
        记录数据：${JSON.stringify(userRecords)}
        
        请提供：
        1. 总体进展评估
        2. 饮食习惯分析
        3. 运动习惯分析
        4. 达成目标的进度
        5. 下一阶段的改进建议
        6. 鼓励性的总结
        `;

        try {
            const response = await callGeminiAPI(prompt);
            
            // 解析API响应获取报告
            if (response && response.candidates && response.candidates[0].content.parts) {
                const text = response.candidates[0].content.parts[0].text;
                
                // 简单解析文本以提取各部分内容
                return {
                    fullReport: text,
                    summary: text.substring(0, 200) + '...', // 简短摘要
                };
            }
            
            return {
                error: '无法生成报告，请稍后再试'
            };
        } catch (error) {
            console.error('生成报告失败:', error);
            return {
                error: '生成报告时出错，请稍后再试'
            };
        }
    }

    /**
     * 更新用户的营养方案
     * @param {Object} userProgress - 用户进度数据
     * @returns {Promise} - 更新后的方案
     */
    async function updatePlan(userProgress) {
        // 更新进度数据
        updateProgressData(userProgress);
        
        const prompt = `
        请根据以下用户的进度数据，更新其个性化营养方案：
        
        用户基本信息：${JSON.stringify(userData.basicInfo)}
        用户健康目标：${JSON.stringify(userData.healthGoals)}
        用户饮食限制：${JSON.stringify(userData.restrictions)}
        用户活动水平：${JSON.stringify(userData.activityLevel)}
        用户睡眠规律：${JSON.stringify(userData.sleepPattern)}
        用户日常安排：${JSON.stringify(userData.dailySchedule)}
        
        进度数据：${JSON.stringify(userProgress)}
        历史饮食记录：${JSON.stringify(userData.mealHistory.slice(-5))}
        历史运动记录：${JSON.stringify(userData.exerciseHistory.slice(-5))}
        
        请提供更新后的详细方案：
        1. 详细的每日饮食计划，精确到每一餐（早餐、午餐、晚餐和加餐）的具体食物、份量、营养素分配和最佳时间
        2. 针对用户健康目标和当前进度的个性化运动建议，包括具体的运动类型、时长、频率和最佳时间
        3. 生活习惯调整建议
        4. 详细的调整理由，解释为什么需要这些变化
        5. 新的进度跟踪指标
        
        请确保方案是具体、可行的，并考虑用户的所有限制、偏好和进度数据。方案应该足够详细，让用户可以直接按照计划执行。
        `;

        try {
            const response = await callGeminiAPI(prompt);
            
            // 解析API响应获取更新后的方案
            if (response && response.candidates && response.candidates[0].content.parts) {
                return response.candidates[0].content.parts[0].text;
            }
            
            return '无法更新方案，请稍后再试';
        } catch (error) {
            console.error('更新方案失败:', error);
            return '更新方案时出错，请稍后再试';
        }
    }

    // 公开API
    return {
        init,
        updateBasicInfo,
        updateDietaryPreferences,
        updateHealthGoals,
        updateRestrictions,
        updateActivityLevel,
        updateSleepPattern,
        updateDailySchedule,
        addMealRecord,
        addExerciseRecord,
        updateProgressData,
        generateQuestions,
        analyzeSurvey,
        analyzeMealLog,
        analyzeExerciseLog,
        generateReport,
        updatePlan
    };
})();

// 导出模块
window.NutriLifeAI = NutriLifeAI;