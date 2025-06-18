import React, { useState } from 'react';
import { FaWrench } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';

interface RefactorButtonProps {
  code: string;
  onRefactor: (newCode: string) => void;
}

export const RefactorButton: React.FC<RefactorButtonProps> = ({ code, onRefactor }) => {
  const [isRefactoring, setIsRefactoring] = useState(false);

  const handleRefactor = async () => {
    if (!code.trim() || isRefactoring) return;
    
    setIsRefactoring(true);
    try {
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      const prompt = `Refactor the following code to improve readability, performance, and follow best practices. Keep the same functionality but make it cleaner and more efficient:\n\n${code}\n\nRefactored code:`;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }],
            role: 'user'
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Refactoring request failed');
      }

      const data = await response.json();
      const refactoredCode = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      if (refactoredCode) {
        // Extract code block if wrapped in markdown
        const codeMatch = refactoredCode.match(/```[\w]*\n([\s\S]*?)```/);
        const cleanCode = codeMatch ? codeMatch[1] : refactoredCode;
        onRefactor(cleanCode.trim());
      }
    } catch (error) {
      console.error('Refactoring error:', error);
      alert('Failed to refactor code. Please try again.');
    } finally {
      setIsRefactoring(false);
    }
  };

  return (
    <button
      onClick={handleRefactor}
      disabled={isRefactoring}
      className="bg-purple-500 hover:bg-purple-600 disabled:bg-purple-400 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
    >
      {isRefactoring ? (
        <>
          <BeatLoader color="#fff" size={8} />
          <span>Refactoring...</span>
        </>
      ) : (
        <>
          <FaWrench />
          <span>Refactor Code</span>
        </>
      )}
    </button>
  );
}; 