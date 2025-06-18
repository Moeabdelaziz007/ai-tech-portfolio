import React, { useState, useEffect } from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { ModelSelector } from '../components/ModelSelector';
import { CompletionStats } from '../components/CompletionStats';
import { BeatLoader } from 'react-spinners';
import ReactMarkdown from 'react-markdown';
import { FaBrain } from 'react-icons/fa6';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RefactorButton } from '../components/RefactorButton';

export const CodeAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('javascript');
  const [selectedModel, setSelectedModel] = useState('codex');
  const [code, setCode] = useState('// Start coding...');
  const [completions, setCompletions] = useState<any[]>([]);
  const [latency, setLatency] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [explanation, setExplanation] = useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCompletion = (newCompletions: any[]) => {
    setCompletions(newCompletions);
  };

  const handleRefactor = (refactoredCode: string) => {
    setCode(refactoredCode);
    // The editor will update via useEffect when code state changes
  };

  const generateExplanation = async (codeSnippet: string) => {
    setIsGenerating(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      const firstWord = codeSnippet.split(/\s|\(/)[1] || 'code';
      setExplanation(`This snippet defines **${firstWord}** and demonstrates basic usage.`);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLatency(Math.random() * 200 + 50);
    }, 100);
    return () => clearTimeout(timer);
  }, [completions]);

  return (
    <div className="min-h-screen bg-dark-bg text-tech-white p-6">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 bg-white text-dark-bg px-4 py-2 rounded shadow hover:bg-gray-200"
      >
        <ArrowLeft size={18} />
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6">AI Code Assistant</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor & controls */}
        <div className="lg:col-span-2">
          <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />

          <CodeEditor language={language} onCodeChange={handleCodeChange} onCompletion={handleCompletion} selectedModel={selectedModel} />

          <div className="flex justify-between items-center mt-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-600 bg-dark-bg px-3 py-2 rounded"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => generateExplanation(code)}
                disabled={isGenerating}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? <BeatLoader color="#fff" size={8} /> : <FaBrain />} 
                Explain Code
              </button>
              
              <RefactorButton code={code} onRefactor={handleRefactor} />
            </div>
          </div>

          {completions.length > 0 && <CompletionStats completions={completions} latency={latency} />}
        </div>

        {/* Assistant panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 p-4 rounded h-full overflow-y-auto">
            <h3 className="font-bold mb-4 text-neon-green">AI Assistant</h3>
            {explanation ? (
              <ReactMarkdown className="prose prose-invert max-w-none">{explanation}</ReactMarkdown>
            ) : (
              <p className="text-gray-400">Code analysis will appear here...</p>
            )}

            {completions.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium mb-2 text-neon-green">Suggested Completions</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {completions.map((c, i) => (
                    <li key={i}>{c.label}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 