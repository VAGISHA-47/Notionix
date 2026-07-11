import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (title: string, message?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((title: string, message?: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => {
      // Prevent duplicate stacked toasts
      const isDuplicate = prev.some((t) => t.title === title && t.message === message);
      if (isDuplicate) return prev;

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== id));
      }, 4000);

      return [...prev, { id, title, message, type }];
    });
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast container floating bottom-right */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => {
            const icons = {
              success: <CheckCircle className="w-5 h-5 text-success" />,
              warning: <AlertTriangle className="w-5 h-5 text-warning" />,
              error: <AlertCircle className="w-5 h-5 text-danger" />,
              info: <Info className="w-5 h-5 text-brand" />,
            };

            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
                className="pointer-events-auto bg-panel/90 border border-border rounded-apple-lg p-4 shadow-premium backdrop-blur-md flex gap-3.5 items-start justify-between"
              >
                <div className="flex gap-3 items-start">
                  <div className="mt-0.5">{icons[t.type]}</div>
                  <div>
                    <h4 className="text-sm font-semibold text-text">{t.title}</h4>
                    {t.message && <p className="text-xs text-text-muted mt-1 leading-relaxed">{t.message}</p>}
                  </div>
                </div>
                <button
                  onClick={() => removeToast(t.id)}
                  className="text-text-muted hover:text-text p-0.5 rounded-full hover:bg-border/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
