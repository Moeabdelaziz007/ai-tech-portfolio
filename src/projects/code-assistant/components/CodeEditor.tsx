import { useState, useEffect, useRef } from 'react';
import { loader } from '@monaco-editor/loader';
import { useDebounce } from 'use-debounce';
import { MODEL_CONFIGS } from '../lib/modelConfig';

interface CodeEditorProps {
  language: string;
  selectedModel: string;
  onCodeChange: (code: string) => void;
  onCompletion: (completions: any[]) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ language, selectedModel, onCodeChange, onCompletion }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<any>(null);
  const [code, setCode] = useState('// Start coding...\n');
  const [debouncedCode] = useDebounce(code, 600);

  useEffect(() => {
    if (editor && code !== editor.getValue()) {
      editor.setValue(code);
    }
  }, [code, editor]);

  useEffect(() => {
    let disposeFn: (() => void) | null = null;
    loader.init().then((monaco) => {
      if (!containerRef.current) return;
      const instance = monaco.editor.create(containerRef.current, {
        value: code,
        language,
        theme: 'vs-dark',
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      });

      const provider = monaco.languages.registerCompletionItemProvider(language, {
        provideCompletionItems: async (model, position) => {
          const word = model.getWordUntilPosition(position);
          if (!word?.word) return { suggestions: [] } as any;
          
          const modelCfg = MODEL_CONFIGS[selectedModel] || MODEL_CONFIGS.gemini;
          const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
          
          try {
            const res = await fetch(`${modelCfg.apiUrl}?key=${apiKey}`, {
              method: 'POST',
              headers: modelCfg.headers,
              body: JSON.stringify(modelCfg.buildBody(`Complete this code: ${word.word}`)),
            });
            const data = await res.json();
            const completions = modelCfg.parseCompletions(data);
            
            return {
              suggestions: completions.map((comp: any) => ({
                label: comp.label,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: comp.insertText,
                detail: comp.detail,
                range: new monaco.Range(
                  position.lineNumber,
                  word.startColumn,
                  position.lineNumber,
                  word.endColumn
                ),
              })),
            } as any;
          } catch (err) {
            console.error('Completion error:', err);
            return { suggestions: [] } as any;
          }
        },
      });

      instance.onDidChangeModelContent(() => {
        const val = instance.getValue();
        setCode(val);
        onCodeChange(val);
      });

      setEditor(instance);
      disposeFn = () => {
        provider.dispose();
        instance.dispose();
      };
    });

    return () => {
      if (disposeFn) disposeFn();
    };
  }, [language]);

  useEffect(() => {
    if (!debouncedCode || debouncedCode.length < 10) return;
    
    const modelCfg = MODEL_CONFIGS[selectedModel] || MODEL_CONFIGS.gemini;
    const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
    
    const fetchData = async () => {
      try {
        const prompt = `Suggest code completions for:\n${debouncedCode.slice(-200)}`;
        const res = await fetch(`${modelCfg.apiUrl}?key=${apiKey}`, {
          method: 'POST',
          headers: modelCfg.headers,
          body: JSON.stringify(modelCfg.buildBody(prompt)),
        });
        const data = await res.json();
        const completions = modelCfg.parseCompletions(data);
        onCompletion(completions);
      } catch (err) {
        console.error('Completion fetch error', err);
      }
    };
    
    fetchData();
  }, [debouncedCode, selectedModel, onCompletion]);

  return <div ref={containerRef} className="h-96 border border-gray-700 rounded" />;
}; 