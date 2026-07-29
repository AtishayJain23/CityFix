const TextArea = ({ label, value, onChange, placeholder = "", rows = 5 }) => {
  return (
    <div className="mb-4">
      {label && <label className="block mb-2 font-medium">{label}</label>}

      <textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TextArea;
