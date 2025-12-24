
import { GoogleGenAI, Type, Schema } from "@google/genai";

const SYSTEM_INSTRUCTION = `你是一位结合了面相学和调香艺术的专业顾问。请分析照片中人物的面部特征，解读性格，并推荐两款匹配的香水。`;

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    observation: { type: Type.STRING },
    outerPersona: { type: Type.STRING },
    innerSelf: { type: Type.STRING },
    perfumeOuter: {
      type: Type.OBJECT,
      properties: {
        brand: { type: Type.STRING },
        name: { type: Type.STRING },
        family: { type: Type.STRING },
        notes: {
          type: Type.OBJECT,
          properties: {
            top: { type: Type.ARRAY, items: { type: Type.STRING } },
            middle: { type: Type.ARRAY, items: { type: Type.STRING } },
            base: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
        reason: { type: Type.STRING },
        occasion: { type: Type.STRING },
      },
      required: ["brand", "name", "family", "notes", "reason", "occasion"],
    },
    perfumeInner: {
      type: Type.OBJECT,
      properties: {
        brand: { type: Type.STRING },
        name: { type: Type.STRING },
        family: { type: Type.STRING },
        notes: {
          type: Type.OBJECT,
          properties: {
            top: { type: Type.ARRAY, items: { type: Type.STRING } },
            middle: { type: Type.ARRAY, items: { type: Type.STRING } },
            base: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
        },
        reason: { type: Type.STRING },
        occasion: { type: Type.STRING },
      },
      required: ["brand", "name", "family", "notes", "reason", "occasion"],
    },
    closingMessage: { type: Type.STRING },
  },
  required: ["observation", "outerPersona", "innerSelf", "perfumeOuter", "perfumeInner", "closingMessage"],
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { image } = req.body;
  // 重要：API_KEY 仅在这里被读取，永远不会暴露给浏览器
  const apiKey = process.env.API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
  if (!image) return res.status(400).json({ error: 'Image data is required' });

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: image } },
          { text: "请基于这张肖像照进行面相与性格分析，并给出香水建议。" }
        ]
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    return res.status(200).json(JSON.parse(response.text || '{}'));
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
