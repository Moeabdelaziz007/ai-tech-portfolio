import React from "react";
import {
  FaExclamationTriangle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
import { ValidationError, ErrorDisplayProps } from "../types";

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  errors,
  onClear,
}) => {
  if (errors.length === 0) {
    return null;
  }

  const errorCount = errors.filter((e) => e.type === "error").length;
  const warningCount = errors.filter((e) => e.type === "warning").length;

  return (
    <div className="mb-6">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-3"
      >
        <div className="flex items-center gap-2">
          {errorCount > 0 && (
            <div
              className="flex items-center gap-1 text-red-600"
            >
              <FaExclamationCircle size={16} />
              <span className="font-semibold">
                {errorCount} Error{errorCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          {warningCount > 0 && (
            <div
              className="flex items-center gap-1 text-yellow-600"
            >
              <FaExclamationTriangle size={16} />
              <span className="font-semibold">
                {warningCount} Warning{warningCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
        {onClear && (
          <button
            onClick={onClear}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Clear all messages"
          >
            <FaTimes size={16} />
          </button>
        )}
      </div>

      {/* Error/Warning List */}
      <div className="space-y-2">
        {errors.map((error, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border-l-4 ${
              error.type === "error"
                ? "bg-red-50 border-red-400 text-red-800"
                : "bg-yellow-50 border-yellow-400 text-yellow-800"
            }`}
          >
            <div className="flex items-start gap-2">
              {error.type === "error" ? (
                <FaExclamationCircle
                  className="text-red-500 mt-0.5 flex-shrink-0"
                  size={14}
                />
              ) : (
                <FaExclamationTriangle
                  className="text-yellow-500 mt-0.5 flex-shrink-0"
                  size={14}
                />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {error.message}
                </p>
                {error.gateIndex !== undefined && (
                  <p className="text-xs opacity-75 mt-1">
                    Gate #{error.gateIndex + 1}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      {errorCount > 0 && (
        <div
          className="mt-3 p-2 bg-red-100 rounded text-sm text-red-700"
        >
          <strong>Note:</strong> Please fix all errors before
          running the simulation.
        </div>
      )}
    </div>
  );
};
