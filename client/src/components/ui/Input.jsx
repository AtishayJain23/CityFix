const Input = ({
  
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  required = false,
  className = "",
}) => {
  return (
    <div className="mb-4">
      

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
};

export default Input;
