import { FaBolt, FaClock, FaCheck } from "react-icons/fa6";

interface CompletionStatsProps {
  completions: any[];
  latency: number;
}

export const CompletionStats: React.FC<CompletionStatsProps> = ({
  completions,
  latency,
}) => {
  return (
    <div
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4 mt-4"
      data-oid="jhzwdq0"
    >
      <h3 className="font-bold mb-3" data-oid="1erih3-">
        Completion Stats
      </h3>
      <div className="grid grid-cols-3 gap-4 text-center" data-oid="76:qp:r">
        <div className="flex flex-col items-center" data-oid="hf.cxju">
          <FaBolt className="text-blue-500 mb-1" data-oid="spc.fzu" />
          <span className="text-sm font-medium" data-oid=":8frqo1">
            Completions
          </span>
          <span className="text-lg font-bold" data-oid="xxgg037">
            {completions.length}
          </span>
        </div>
        <div className="flex flex-col items-center" data-oid="wowskwm">
          <FaClock className="text-purple-500 mb-1" data-oid=".2t6e3a" />
          <span className="text-sm font-medium" data-oid="0z.237s">
            Latency
          </span>
          <span className="text-lg font-bold" data-oid="l9krilo">
            {latency.toFixed(0)} ms
          </span>
        </div>
        <div className="flex flex-col items-center" data-oid="1l2o0b7">
          <FaCheck className="text-green-500 mb-1" data-oid="x3ziccn" />
          <span className="text-sm font-medium" data-oid="n5g:5i-">
            Accuracy
          </span>
          <span className="text-lg font-bold" data-oid="8j2ai5a">
            -
          </span>
        </div>
      </div>
    </div>
  );
};
