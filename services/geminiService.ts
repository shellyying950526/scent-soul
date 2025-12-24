
import { AnalysisResult } from "../types";

export const analyzeFace = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Server error');
    }

    return await response.json();
  } catch (error) {
    console.error("Analysis service error:", error);
    throw error;
  }
};
