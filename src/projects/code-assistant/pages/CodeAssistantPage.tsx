import React, { useState, useEffect } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { ModelSelector } from "../components/ModelSelector";
import { CompletionStats } from "../components/CompletionStats";
import { BeatLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { FaBrain } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RefactorButton } from "../components/RefactorButton";

export const CodeAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("javascript");
  const [selectedModel, setSelectedModel] = useState("codex");
  const [code, setCode] = useState("// Start coding...");
  const [completions, setCompletions] = useState<any[]>([]);
  const [latency, setLatency] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [explanation, setExplanation] = useState("");

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
      const firstWord = codeSnippet.split(/\s|\(/)[1] || "code";
      setExplanation(
        `This snippet defines **${firstWord}** and demonstrates basic usage.`,
      );
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
    <div
      className="min-h-screen bg-dark-bg text-tech-white p-6"
      data-oid="3l5i1c1"
    >
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-6 bg-white text-dark-bg px-4 py-2 rounded shadow hover:bg-gray-200"
        data-oid="x8nmgxn"
      >
        <ArrowLeft size={18} data-oid="66_6bhh" />
        Back
      </button>
      <h1 className="text-3xl font-bold mb-6" data-oid="pj1pyyd">
        AI Code Assistant
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-oid="sgw:01t">
        {/* Editor & controls */}
        <div className="lg:col-span-2" data-oid="2aakuzz">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            data-oid="_ja9y4l"
          />

          <CodeEditor
            language={language}
            onCodeChange={handleCodeChange}
            onCompletion={handleCompletion}
            selectedModel={selectedModel}
            data-oid="xph.ihl"
          />

          <div
            className="flex justify-between items-center mt-4"
            data-oid="7gqxi_7"
          >
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border border-gray-600 bg-dark-bg px-3 py-2 rounded"
              data-oid="cqqxav2"
            >
              <option value="javascript" data-oid="bd7l5j2">
                JavaScript
              </option>
              <option value="typescript" data-oid="uzhiym4">
                TypeScript
              </option>
              <option value="python" data-oid="viu5uqj">
                Python
              </option>
            </select>

            <div className="flex gap-2" data-oid="gyz0y6d">
              <button
                onClick={() => generateExplanation(code)}
                disabled={isGenerating}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 disabled:opacity-50"
                data-oid="s3.jfwk"
              >
                {isGenerating ? (
                  <BeatLoader color="#fff" size={8} data-oid="aabaq71" />
                ) : (
                  <FaBrain data-oid="e7:uf5." />
                )}
                Explain Code
              </button>

              <RefactorButton
                code={code}
                onRefactor={handleRefactor}
                data-oid="r3q787r"
              />
            </div>
          </div>

          {completions.length > 0 && (
            <CompletionStats
              completions={completions}
              latency={latency}
              data-oid="13bfd54"
            />
          )}
        </div>

        {/* Assistant panel */}
        <div className="lg:col-span-1" data-oid="3yyysnx">
          <div
            className="bg-gray-900 p-4 rounded h-full overflow-y-auto"
            data-oid="f43:qey"
          >
            <h3 className="font-bold mb-4 text-neon-green" data-oid="bevx_7c">
              AI Assistant
            </h3>
            {explanation ? (
              <ReactMarkdown
                className="prose prose-invert max-w-none"
                data-oid="_w82269"
              >
                {explanation}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400" data-oid="e9ye5:3">
                Code analysis will appear here...
              </p>
            )}

            {completions.length > 0 && (
              <div className="mt-6" data-oid="72o9_56">
                <h4
                  className="font-medium mb-2 text-neon-green"
                  data-oid="d0:3xm7"
                >
                  Suggested Completions
                </h4>
                <ul
                  className="list-disc list-inside space-y-1 text-sm"
                  data-oid="mb9k0t3"
                >
                  {completions.map((c, i) => (
                    <li key={i} data-oid="rt06y4c">
                      {c.label}
                    </li>
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
