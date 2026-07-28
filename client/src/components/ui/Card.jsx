const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md border border-gray-200 p-5 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
