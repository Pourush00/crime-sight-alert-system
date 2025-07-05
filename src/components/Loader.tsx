import { Shield, AlertTriangle, Eye } from 'lucide-react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'crime' | 'analysis';
  text?: string;
  className?: string;
}

const Loader = ({ 
  size = 'md', 
  variant = 'default', 
  text,
  className = '' 
}: LoaderProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-6 h-6';
      case 'lg':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-sm';
      case 'lg':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const renderSpinner = () => {
    const sizeClasses = getSizeClasses();
    
    switch (variant) {
      case 'crime':
        return (
          <div className="relative">
            <div className={`${sizeClasses} border-4 border-danger/20 border-t-danger rounded-full animate-spin`} />
            <AlertTriangle className="absolute inset-0 m-auto w-4 h-4 text-danger animate-pulse" />
          </div>
        );
      
      case 'analysis':
        return (
          <div className="relative">
            <div className={`${sizeClasses} border-4 border-primary/20 border-t-primary rounded-full animate-spin`} />
            <Eye className="absolute inset-0 m-auto w-4 h-4 text-primary animate-pulse" />
          </div>
        );
      
      default:
        return (
          <div className={`${sizeClasses} border-4 border-muted border-t-foreground rounded-full animate-spin`} />
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      {renderSpinner()}
      
      {text && (
        <p className={`${getTextSize()} text-muted-foreground text-center animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
};

// Full Screen Loader
interface FullScreenLoaderProps {
  variant?: 'default' | 'crime' | 'analysis';
  title?: string;
  subtitle?: string;
}

export const FullScreenLoader = ({ 
  variant = 'analysis',
  title = "Analyzing for Crime Detection",
  subtitle = "Processing your files with advanced AI technology..."
}: FullScreenLoaderProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="text-center space-y-6 p-8">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-md">
            {subtitle}
          </p>
        </div>
        
        {variant === 'crime' && (
          <div className="flex items-center justify-center space-x-2 text-sm text-danger">
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            <span>High-priority security analysis in progress</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline Loader for buttons
export const ButtonLoader = ({ className = "w-4 h-4" }: { className?: string }) => {
  return (
    <div className={`border-2 border-current border-t-transparent rounded-full animate-spin ${className}`} />
  );
};

// Skeleton Loader for cards
export const SkeletonLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded-md w-3/4" />
        <div className="h-4 bg-muted rounded-md w-1/2" />
        <div className="h-32 bg-muted rounded-lg" />
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded-md flex-1" />
          <div className="h-8 bg-muted rounded-md flex-1" />
        </div>
      </div>
    </div>
  );
};

export default Loader;