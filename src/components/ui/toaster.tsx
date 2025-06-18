import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider data-oid="e5pajfz">
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} data-oid="ydz71c2">
            <div className="grid gap-1" data-oid="-6d5czv">
              {title && <ToastTitle data-oid="avxrx:h">{title}</ToastTitle>}
              {description && (
                <ToastDescription data-oid=".75-q4_">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose data-oid="4.mmpi0" />
          </Toast>
        );
      })}
      <ToastViewport data-oid="b1vleg1" />
    </ToastProvider>
  );
}
