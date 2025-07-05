import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertToastContainer, AlertData } from '@/components/AlertToast';
import { 
  Camera, 
  Play, 
  Pause, 
  Square, 
  Settings, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Volume2,
  VolumeX,
  Maximize,
  Eye,
  Radio
} from 'lucide-react';

const LiveFeed = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [detectionCount, setDetectionCount] = useState(0);

  // Mock live feed data
  const [feedData] = useState({
    cameras: [
      {
        id: 'cam-001',
        name: 'Main Entrance',
        status: 'active',
        lastDetection: new Date(Date.now() - 2 * 60 * 1000),
        threatLevel: 'safe',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475'
      },
      {
        id: 'cam-002',
        name: 'Parking Lot',
        status: 'active',
        lastDetection: new Date(Date.now() - 1 * 60 * 1000),
        threatLevel: 'danger',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5'
      },
      {
        id: 'cam-003',
        name: 'Back Exit',
        status: 'active',
        lastDetection: new Date(Date.now() - 5 * 60 * 1000),
        threatLevel: 'warning',
        url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22'
      },
      {
        id: 'cam-004',
        name: 'Corridor A',
        status: 'active',
        lastDetection: new Date(Date.now() - 10 * 60 * 1000),
        threatLevel: 'safe',
        url: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb'
      }
    ],
    currentCamera: 'cam-002'
  });

  const currentCamera = feedData.cameras.find(cam => cam.id === feedData.currentCamera);

  // Simulate real-time detections
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly trigger detection alerts
      if (Math.random() < 0.3) { // 30% chance every 5 seconds
        const detectionTypes = [
          { type: 'crime', title: 'Weapon Detected!', message: 'Gun identified in Parking Lot camera feed.' },
          { type: 'warning', title: 'Suspicious Activity', message: 'Unusual movement pattern detected.' },
          { type: 'crime', title: 'Violence Alert!', message: 'Aggressive behavior detected in main entrance.' },
          { type: 'warning', title: 'Crowd Density', message: 'High crowd density detected in corridor.' }
        ];
        
        const randomDetection = detectionTypes[Math.floor(Math.random() * detectionTypes.length)];
        const newAlert: AlertData = {
          id: Date.now().toString(),
          ...randomDetection,
          timestamp: new Date(),
          autoClose: true,
          duration: 8000
        } as AlertData;
        
        setAlerts(prev => [...prev, newAlert]);
        setDetectionCount(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCloseAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'danger':
        return 'text-danger border-danger bg-danger/10';
      case 'warning':
        return 'text-warning border-warning bg-warning/10';
      case 'safe':
        return 'text-success border-success bg-success/10';
      default:
        return 'text-muted-foreground border-muted bg-muted/10';
    }
  };

  const getThreatIcon = (level: string) => {
    switch (level) {
      case 'danger':
        return <AlertTriangle className="w-4 h-4" />;
      case 'warning':
        return <Clock className="w-4 h-4" />;
      case 'safe':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Radio className="w-8 h-8 text-primary animate-pulse" />
                Live Security Feed
              </h1>
              <p className="text-muted-foreground">
                Real-time monitoring with AI-powered crime detection
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-success text-success-foreground">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse mr-2" />
                LIVE
              </Badge>
              <Badge className="bg-primary/10 text-primary">
                {detectionCount} Detections Today
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Primary Feed Display */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      {currentCamera?.name}
                      <Badge className={getThreatColor(currentCamera?.threatLevel || 'safe')}>
                        {getThreatIcon(currentCamera?.threatLevel || 'safe')}
                        {currentCamera?.threatLevel?.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Maximize className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-black">
                    <img
                      src={currentCamera?.url}
                      alt={currentCamera?.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Live overlay */}
                    <div className="absolute inset-0 bg-black/10">
                      {/* Detection overlay boxes would be rendered here */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-black/70 text-white">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
                          RECORDING
                        </Badge>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-black/70 text-white">
                          {new Date().toLocaleTimeString()}
                        </Badge>
                      </div>
                      
                      {/* Simulated detection boxes */}
                      {currentCamera?.threatLevel === 'danger' && (
                        <div className="absolute top-20 left-20 w-24 h-16 border-2 border-danger animate-pulse">
                          <Badge className="absolute -top-6 left-0 bg-danger text-danger-foreground text-xs">
                            WEAPON: 94%
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Controls */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant={isPlaying ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                      {isPlaying ? 'Pause' : 'Play'}
                    </Button>
                    
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <Square className="w-4 h-4 mr-2" /> : <Radio className="w-4 h-4 mr-2" />}
                      {isRecording ? 'Stop Recording' : 'Start Recording'}
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Camera Grid & Info */}
            <div className="space-y-6">
              {/* Camera Grid */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">All Cameras</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {feedData.cameras.map((camera) => (
                    <div
                      key={camera.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:bg-muted/30 ${
                        camera.id === feedData.currentCamera ? 'border-primary bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{camera.name}</span>
                        <Badge className={getThreatColor(camera.threatLevel)}>
                          {getThreatIcon(camera.threatLevel)}
                        </Badge>
                      </div>
                      
                      <div className="aspect-video rounded overflow-hidden bg-muted mb-2">
                        <img
                          src={camera.url}
                          alt={camera.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        Last: {camera.lastDetection.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Detection Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Today's Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Detections</span>
                      <span className="font-semibold">{detectionCount + 47}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">High Priority</span>
                      <span className="font-semibold text-danger">3</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Medium Priority</span>
                      <span className="font-semibold text-warning">8</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">False Positives</span>
                      <span className="font-semibold text-muted-foreground">2</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="text-sm font-medium mb-2">System Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-sm text-success">All Systems Operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Toast Container */}
      <AlertToastContainer
        alerts={alerts}
        onClose={handleCloseAlert}
        position="top-right"
      />
    </div>
  );
};

export default LiveFeed;