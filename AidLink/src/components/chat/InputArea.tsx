const InputArea: React.FC<{
  inputText: string;
  onInputChange: (text: string) => void;
  onSendMessage: () => void;
}> = ({ inputText, onInputChange, onSendMessage }) => {
  return (
    <div className="p-3 bg-white border-t border-gray-200">
      <div className="flex items-center">
        <button className="p-2 text-gray-400 hover:text-gray-600 mr-1">
          <span className="text-xl">+</span>
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
          placeholder="Describe your first aid situation..."
          className="flex-1 border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <button
          onClick={onSendMessage}
          disabled={inputText.trim() === ''}
          className={`bg-red-600 text-white rounded-r-lg px-4 py-2 font-semibold ${
            inputText.trim() === '' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
          }`}
        >
          Send
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        AidLink provides first aid guidance only. In emergencies, always call local emergency services.
      </p>
    </div>
  );
};

export default InputArea;