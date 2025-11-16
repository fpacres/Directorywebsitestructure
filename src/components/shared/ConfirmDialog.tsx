import { Button } from '../ui/button';
import { Warning } from '@phosphor-icons/react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: 'danger' | 'default';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  variant = 'default',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
      />

      {/* Dialog */}
      <div
        className="relative flex flex-col gap-6 p-8 rounded-[var(--radius-lg)] max-w-md w-full shadow-2xl"
        style={{
          backgroundColor: 'var(--card)',
          border: '1px solid var(--border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon and Content */}
        <div className="flex flex-col gap-4">
          {variant === 'danger' && (
            <div className="relative w-12 h-12">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: 'var(--destructive)',
                  opacity: 0.1,
                }}
              />
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center">
                <Warning
                  size={24}
                  weight="fill"
                  style={{ color: 'var(--destructive)' }}
                />
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <h2 style={{ color: 'var(--foreground)' }}>{title}</h2>
            <p style={{ color: 'var(--muted-foreground)' }}>{description}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variant === 'danger' ? 'destructive' : 'default'}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}