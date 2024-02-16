import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

interface Toast {
  id: string;
  message: string;
}

interface ToastContextType {
  addToast: (message: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastId = 0;

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string) => {
    const id = (++toastId).toString();
    setToasts((currentToasts) => [...currentToasts, { id, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-5 right-5 z-50 space-y-2">
        {toasts.map((toast) => (
          <ToastComponent
            key={toast.id}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastComponent: React.FC<{ message: string; onClose: () => void }> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="p-4 bg-black text-white rounded-md shadow-lg">
      {message}
    </div>
  );
};
