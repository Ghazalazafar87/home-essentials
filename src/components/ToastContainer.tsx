import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#1C1917] text-white p-3.5 border border-[#3A3530] shadow-xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-150"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isWarning && <AlertCircle className="w-4 h-4 text-amber-400" />}
              {!isSuccess && !isWarning && <Info className="w-4 h-4 text-[#C47D4C]" />}
            </div>

            <div className="flex-1 text-xs">
              <div className="font-semibold text-stone-100">{toast.title}</div>
              {toast.message && <div className="text-stone-300 mt-0.5 leading-relaxed">{toast.message}</div>}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-stone-400 hover:text-white shrink-0 p-0.5"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
