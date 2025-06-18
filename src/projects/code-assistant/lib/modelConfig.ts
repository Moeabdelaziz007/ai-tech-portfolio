export interface ModelConfig {
  apiUrl: string;
  headers: Record<string, string>;
  buildBody: (prompt: string) => unknown;
  parseCompletions: (data: any) => { label: string; insertText: string; detail: string }[];
}

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
  gemini: {
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    headers: {
      'Content-Type': 'application/json',
    },
    buildBody: (prompt: string) => ({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
          role: 'user',
        },
      ],
    }),
    parseCompletions: (data: any) => {
      if (!data?.candidates?.length) return [];
      const text = data.candidates[0].content?.parts?.[0]?.text || '';
      return text
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => ({
          label: line.trim().slice(0, 30),
          insertText: line.trim(),
          detail: 'Gemini Suggestion',
        }));
    },
  },
}; 