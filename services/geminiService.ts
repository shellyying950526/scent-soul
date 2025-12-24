import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
你是一位结合了面相学和调香艺术的专业顾问。你的任务是通过分析照片中人物的面部特征，解读其性格特质，并推荐与之匹配的香水。

## 工作流程

### 第一步：面相特征观察
仔细观察照片中的面部特征（眼睛、眉毛、鼻子、嘴巴、脸型、整体气质）。

### 第二步：性格特质分析
分析外在人格（Persona/社交面具）和内在本我（True Self/真实自我）。

### 第三步：香水推荐
1. 外在印象（The Facade）：契合外在形象。
2. 内在真我（The Essence）：呼应内在本质。

请保持专业、温暖、富有洞察力的语气。
`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    observation: {
      type: Type.STRING,
      description: "详细描述观察到的面部特征 (Detailed observation of facial features)",
    },
    outerPersona: {
      type: Type.STRING,
      description: "外在人格 - 社交面具 (Analysis of outer persona/social mask)",
    },
    innerSelf: {
      type: Type.STRING,
      description: "内在本我 - 真实自我 (Analysis of true inner self)",
    },
    perfumeOuter: {
      type: Type.OBJECT,
      description: "香水1：外在印象之选",
      properties: {
        brand: { type: Type.STRING, description: "Brand name" },
        name: { type: Type.STRING, description: "Perfume name" },
        family: { type: Type.STRING, description: "Olfactory family (e.g., Woody, Floral)" },
        notes: {
          type: Type.OBJECT,
          properties: {
            top: { type: Type.ARRAY, items: { type: Type.STRING } },
            middle: { type: Type.ARRAY, items: { type: Type.STRING } },
            base: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
        reason: { type: Type.STRING, description: "Recommendation reason" },
        occasion: { type: Type.STRING, description: "Best occasion" },
      },
      required: ["brand", "name", "family", "notes", "reason", "occasion"],
    },
    perfumeInner: {
      type: Type.OBJECT,
      description: "香水2：内在真我之选",
      properties: {
        brand: { type: Type.STRING, description: "Brand name" },
        name: { type: Type.STRING, description: "Perfume name" },
        family: { type: Type.STRING, description: "Olfactory family" },
        notes: {
          type: Type.OBJECT,
          properties: {
            top: { type: Type.ARRAY, items: { type: Type.STRING } },
            middle: { type: Type.ARRAY, items: { type: Type.STRING } },
            base: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
        reason: { type: Type.STRING, description: "Recommendation reason" },
        occasion: { type: Type.STRING, description: "Best occasion" },
      },
      required: ["brand", "name", "family", "notes", "reason", "occasion"],
    },
    closingMessage: {
      type: Type.STRING,
      description: "调香师寄语 (Closing message from the perfumer)",
    },
  },
  required: ["observation", "outerPersona", "innerSelf", "perfumeOuter", "perfumeInner", "closingMessage"],
};

export const analyzeFace = async (base64Image: string): Promise<AnalysisResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Image,
            },
          },
          {
            text: "请分析这张面孔，并根据提供的系统指令生成JSON格式的香水推荐报告。",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const result = JSON.parse(text) as AnalysisResult;
    return result;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
