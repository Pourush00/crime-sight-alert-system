import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import UploadCard from '@/components/UploadCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileImage, 
  Video, 
  Shield,
  ArrowRight,
  Info
} from 'lucide-react';

const Upload = () => {
  const navigate = useNavigate();
  const [recentUploads] = useState([
    {
      id: '1',
      fileName: 'security_cam_001.mp4',
      type: 'video',
      status: 'danger',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      detections: ['Weapon Detected', 'Suspicious Activity']
    },
    {
      id: '2', 
      fileName: 'entrance_photo.jpg',
      type: 'image',
      status: 'safe',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      detections: []
    },
    {
      id: '3',
      fileName: 'crowd_analysis.mp4',
      type: 'video',
      status: 'warning',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      detections: ['Crowd Density Alert']
    }
  ]);

  const supportedFormats = [
    { type: 'Images', formats: 'JPEG, PNG, WEBP', icon: FileImage, color: 'text-blue-500' },
    { type: 'Videos', formats: 'MP4, AVI, MOV, WEBM', icon: Video, color: 'text-purple-500' }
  ];

  const detectionCapabilities = [
    'Weapon Detection (Guns, Knives, etc.)',
    'Violence & Assault Recognition',
    'Blood & Crime Scene Analysis',
    'Suspicious Behavior Patterns',
    'Crowd Anomaly Detection',
    'Unauthorized Access Monitoring'
  ];

  const handleUpload = (files: File[]) => {
    // In a real application, this would process the files
    console.log('Uploading files:', files);
    
    // Simulate navigation to results after processing
    setTimeout(() => {
      navigate('/results');
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'danger':
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'safe':
        return <CheckCircle className="w-4 h-4 text-success" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              Upload Files for Crime Detection
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload images or videos to analyze for potential security threats using our advanced AI detection system.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              <UploadCard onUpload={handleUpload} />
              
              {/* Supported Formats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="w-5 h-5 text-primary" />
                    Supported File Formats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {supportedFormats.map((format, index) => {
                      const Icon = format.icon;
                      return (
                        <div key={index} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <Icon className={`w-6 h-6 ${format.color}`} />
                          <div>
                            <div className="font-medium">{format.type}</div>
                            <div className="text-sm text-muted-foreground">{format.formats}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <div className="flex items-center gap-2 text-sm font-medium text-warning">
                      <AlertTriangle className="w-4 h-4" />
                      File Size Limit
                    </div>
                    <p className="text-xs text-warning/80 mt-1">
                      Maximum file size: 100MB per file. For optimal performance, keep files under 50MB.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Detection Capabilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Detection Capabilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {detectionCapabilities.map((capability, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                        <span>{capability}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Uploads */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Recent Uploads</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/results')}
                    >
                      View All
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentUploads.map((upload) => (
                      <div key={upload.id} className="p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {upload.type === 'video' ? 
                              <Video className="w-4 h-4 text-purple-500" /> : 
                              <FileImage className="w-4 h-4 text-blue-500" />
                            }
                            <span className="text-sm font-medium truncate max-w-[120px]">
                              {upload.fileName}
                            </span>
                          </div>
                          <Badge className={getStatusColor(upload.status)}>
                            {getStatusIcon(upload.status)}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-muted-foreground mb-1">
                          {upload.timestamp.toLocaleString()}
                        </div>
                        
                        {upload.detections.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {upload.detections.map((detection, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {detection}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/live-feed')}
                  >
                    <Video className="w-4 h-4 mr-2" />
                    View Live Feed
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate('/dashboard')}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Security Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;