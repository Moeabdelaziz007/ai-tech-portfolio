import { FaBolt, FaClock, FaCheck } from 'react-icons/fa6';

interface CompletionStatsProps {
  completions: any[];
  latency: number;
}

export const CompletionStats: React.FC<CompletionStatsProps> = ({ completions, latency }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 mt-4">
      <h3 className="font-bold mb-3">Completion Stats</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center">
          <FaBolt className="text-blue-500 mb-1" />
          <span className="text-sm font-medium">Completions</span>
          <span className="text-lg font-bold">{completions.length}</span>
        </div>
        <div className="flex flex-col items-center">
          <FaClock className="text-purple-500 mb-1" />
          <span className="text-sm font-medium">Latency</span>
          <span className="text-lg font-bold">{latency.toFixed(0)} ms</span>
        </div>
        <div className="flex flex-col items-center">
          <FaCheck className="text-green-500 mb-1" />
          <span className="text-sm font-medium">Accuracy</span>
          <span className="text-lg font-bold">-</span>
        </div>
      </div>
    </div>
  );
}; 