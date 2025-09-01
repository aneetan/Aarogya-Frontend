import type { SuggestedQuestion } from "../../types/chat.types";

const SuggestedQuestions: React.FC<{
  questions: SuggestedQuestion[];
  onQuestionClick: (question: string) => void;
}> = ({ questions, onQuestionClick }) => {
  return (
    <div className="p-3 bg-gray-100 border-t border-gray-200">
      <p className="text-xs text-gray-500 mb-2">Quick first aid questions:</p>
      <div className="flex overflow-x-auto pb-2 space-x-2">
        {questions.map((question) => (
          <button
            key={question.id}
            onClick={() => onQuestionClick(question.text)}
            className="flex-shrink-0 text-xs bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-full px-3 py-1 transition"
          >
            {question.text}
          </button> 
        ))}
      </div>
    </div>
  );
};

export default SuggestedQuestions;