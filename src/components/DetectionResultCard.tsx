import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Clock, Eye, Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface DetectionResult {
  id: string;
  fileName: string;
  imageUrl: string;
  detections: {
    type: 'weapon' | 'blood' | 'violence' | 'suspicious_activity' | 'safe';
    label: string;
    confidence: number;
    boundingBox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }[];
  timestamp: Date;
  status: 'danger' | 'warning' | 'safe';
  processingTime: number; // in seconds
}

interface DetectionResultCardProps {
  result: DetectionResult;
  onViewDetails?: (id: string) => void;
}

const DetectionResultCard = ({ result, onViewDetails }: DetectionResultCardProps) => {
  const { toast } = useToast();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-warning" />;
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-success" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'danger':
        return 'bg-danger/10 text-danger border-danger/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'safe':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getDetectionBadgeColor = (type: string) => {
    switch (type) {
      case 'weapon':
        return 'bg-danger text-danger-foreground';
      case 'blood':
        return 'bg-crime-red text-white';
      case 'violence':
        return 'bg-crime-orange text-white';
      case 'suspicious_activity':
        return 'bg-warning text-warning-foreground';
      case 'safe':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleDownload = () => {
    toast({
      title: "Download initiated",
      description: "Analysis report is being prepared for download.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share link copied",
      description: "Detection result link has been copied to clipboard.",
    });
  };

  const dangerousDetections = result.detections.filter(d => 
    ['weapon', 'blood', 'violence'].includes(d.type)
  );

  const maxConfidence = Math.max(...result.detections.map(d => d.confidence));

  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${
      result.status === 'danger' ? 'border-danger/30 shadow-danger/10' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {getStatusIcon(result.status)}
              {result.fileName}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {result.timestamp.toLocaleString()}
              <span className="text-xs">
                • Processed in {result.processingTime}s
              </span>
            </div>
          </div>
          
          <Badge className={getStatusColor(result.status)}>
            {result.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image Preview with Bounding Boxes */}
        <div className="relative group">
          <img
            src={result.imageUrl}
            alt={result.fileName}
            className="w-full h-48 object-cover rounded-lg bg-muted"
          />
          
          {/* Overlay for bounding boxes would go here in a real implementation */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg">
            {result.detections.length > 0 && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-black/70 text-white">
                  {result.detections.length} detection(s)
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Detection Results */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Detection Results</h4>
          
          {result.detections.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-success" />
              No suspicious activity detected
            </div>
          ) : (
            <div className="space-y-2">
              {result.detections.map((detection, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg border ${
                    ['weapon', 'blood', 'violence'].includes(detection.type)
                      ? 'border-danger/20 bg-danger/5'
                      : 'border-muted bg-muted/20'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Badge className={getDetectionBadgeColor(detection.type)}>
                      {detection.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {(detection.confidence * 100).toFixed(1)}% confidence
                    </span>
                  </div>
                  
                  {['weapon', 'blood', 'violence'].includes(detection.type) && (
                    <AlertTriangle className="w-4 h-4 text-danger pulse-danger" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* High Risk Alert */}
        {dangerousDetections.length > 0 && (
          <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium text-danger">
              <AlertTriangle className="w-4 h-4" />
              High Risk Detection Alert
            </div>
            <p className="text-xs text-danger/80 mt-1">
              {dangerousDetections.length} dangerous item(s) detected with {maxConfidence * 100}% max confidence. 
              Immediate attention required.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails?.(result.id)}
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetectionResultCard;