const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 float-right">
          &times;
        </button>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;