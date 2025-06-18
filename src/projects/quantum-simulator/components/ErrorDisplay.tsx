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
    <div className="mb-6" data-oid="5-pr7dj">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-3"
        data-oid="sl4.o:y"
      >
        <div className="flex items-center gap-2" data-oid="vfmlt4s">
          {errorCount > 0 && (
            <div
              className="flex items-center gap-1 text-red-600"
              data-oid="2.zhl6f"
            >
              <FaExclamationCircle size={16} data-oid="w.7.0u6" />
              <span className="font-semibold" data-oid="w3hitxk">
                {errorCount} Error{errorCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          {warningCount > 0 && (
            <div
              className="flex items-center gap-1 text-yellow-600"
              data-oid="kjxt4bl"
            >
              <FaExclamationTriangle size={16} data-oid="2gozvzj" />
              <span className="font-semibold" data-oid="1kolsmt">
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
            data-oid="akrxq3:"
          >
            <FaTimes size={16} data-oid="w5gx84s" />
          </button>
        )}
      </div>

      {/* Error/Warning List */}
      <div className="space-y-2" data-oid="4cpga.g">
        {errors.map((error, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border-l-4 ${
              error.type === "error"
                ? "bg-red-50 border-red-400 text-red-800"
                : "bg-yellow-50 border-yellow-400 text-yellow-800"
            }`}
            data-oid="s3gxrtk"
          >
            <div className="flex items-start gap-2" data-oid="2.:bu5x">
              {error.type === "error" ? (
                <FaExclamationCircle
                  className="text-red-500 mt-0.5 flex-shrink-0"
                  size={14}
                  data-oid="dw2w9dj"
                />
              ) : (
                <FaExclamationTriangle
                  className="text-yellow-500 mt-0.5 flex-shrink-0"
                  size={14}
                  data-oid="xz0bv6f"
                />
              )}
              <div className="flex-1" data-oid="z5rdt:7">
                <p className="text-sm font-medium" data-oid="ljndbk9">
                  {error.message}
                </p>
                {error.gateIndex !== undefined && (
                  <p className="text-xs opacity-75 mt-1" data-oid="zlvcdqf">
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
          data-oid="nb83y_1"
        >
          <strong data-oid="x6c8jz:">Note:</strong> Please fix all errors before
          running the simulation.
        </div>
      )}
    </div>
  );
};
