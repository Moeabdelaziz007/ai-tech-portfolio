import { FaBrain, FaBolt, FaGear, FaGoogle } from 'react-icons/fa6';

interface Model {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onModelChange }) => {
  const models: Model[] = [
    {
      id: 'codex',
      name: 'Codex',
      description: 'OpenAI Codex model for code generation',
      icon: <FaBrain className="text-blue-500" />,
    },
    {
      id: 'gemini',
      name: 'Gemini',
      description: 'Google Gemini Code model',
      icon: <FaGoogle className="text-red-500" />,
    },
    {
      id: 'gpt-j',
      name: 'GPT-J',
      description: 'Open-source alternative for code completion',
      icon: <FaBolt className="text-purple-500" />,
    },
    {
      id: 'codegen',
      name: 'CodeGen',
      description: 'Salesforce CodeGen model',
      icon: <FaGear className="text-green-500" />,
    },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
      <h3 className="font-bold mb-3">Select Model</h3>
      <div className="flex flex-wrap gap-3">
        {models.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`flex items-center gap-2 p-3 rounded-lg transition text-left w-full sm:w-auto ${
              selectedModel === model.id
                ? 'bg-white dark:bg-gray-700 shadow-md'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {model.icon}
            <div>
              <div className="font-medium">{model.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {model.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}; 