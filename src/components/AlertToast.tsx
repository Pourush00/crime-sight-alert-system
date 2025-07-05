import { useEffect, useState } from 'react';
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface AlertData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'crime';
  title: string;
  message: string;
  timestamp?: Date;
  autoClose?: boolean;
  duration?: number;
}

interface AlertToastProps {
  alert: AlertData;
  onClose: (id: string) => void;
}

const AlertToast = ({ alert, onClose }: AlertToastProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  const duration = alert.duration || 5000; // Default 5 seconds

  useEffect(() => {
    if (alert.autoClose !== false) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - (100 / (duration / 100));
          if (newProgress <= 0) {
            setIsVisible(false);
            setTimeout(() => onClose(alert.id), 300);
            return 0;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [alert.id, alert.autoClose, duration, onClose]);

  const getAlertStyles = () => {
    switch (alert.type) {
      case 'success':
        return {
          containerClass: 'border-success bg-success/10',
          iconClass: 'text-success',
          progressClass: 'bg-success',
          icon: CheckCircle
        };
      case 'error':
        return {
          containerClass: 'border-danger bg-danger/10',
          iconClass: 'text-danger',
          progressClass: 'bg-danger',
          icon: AlertCircle
        };
      case 'warning':
        return {
          containerClass: 'border-warning bg-warning/10',
          iconClass: 'text-warning',
          progressClass: 'bg-warning',
          icon: AlertTriangle
        };
      case 'crime':
        return {
          containerClass: 'border-danger bg-danger/20 crime-alert detection-glow',
          iconClass: 'text-danger pulse-danger',
          progressClass: 'bg-danger',
          icon: AlertTriangle
        };
      default:
        return {
          containerClass: 'border-border bg-card',
          iconClass: 'text-muted-foreground',
          progressClass: 'bg-primary',
          icon: Info
        };
    }
  };

  const styles = getAlertStyles();
  const Icon = styles.icon;

  if (!isVisible) return null;

  return (
    <Card className={`
      ${styles.containerClass}
      p-4 shadow-lg transition-all duration-300 ease-out
      transform translate-x-0 opacity-100
      hover:shadow-xl
      max-w-sm w-full
      relative overflow-hidden
    `}>
      {/* Progress bar */}
      {alert.autoClose !== false && (
        <div className="absolute bottom-0 left-0 h-1 bg-muted/20 w-full">
          <div 
            className={`h-full ${styles.progressClass} transition-all duration-100 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Icon className={`w-5 h-5 ${styles.iconClass}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground">
                {alert.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {alert.message}
              </p>
              {alert.timestamp && (
                <p className="text-xs text-muted-foreground mt-2">
                  {alert.timestamp.toLocaleTimeString()}
                </p>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-muted-foreground hover:text-foreground -mt-1 -mr-1"
              onClick={() => onClose(alert.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Toast Container Component
interface AlertToastContainerProps {
  alerts: AlertData[];
  onClose: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const AlertToastContainer = ({ 
  alerts, 
  onClose, 
  position = 'top-right' 
}: AlertToastContainerProps) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4'; 
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 space-y-2`}>
      {alerts.map((alert) => (
        <AlertToast
          key={alert.id}
          alert={alert}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default AlertToast;