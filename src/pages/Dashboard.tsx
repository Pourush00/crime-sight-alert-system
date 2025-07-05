import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  Users,
  Camera,
  Shield,
  Activity,
  Download,
  RefreshCw,
  Calendar,
  BarChart3
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState('today');

  // Mock dashboard data
  const stats = {
    totalDetections: 1247,
    activeThreats: 3,
    safeScanns: 1196,
    averageResponseTime: '1.2s',
    systemUptime: 99.7,
    activeCameras: 12,
    totalCameras: 15
  };

  const recentDetections = [
    {
      id: '1',
      type: 'weapon',
      camera: 'Main Entrance',
      confidence: 94,
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'active'
    },
    {
      id: '2',
      type: 'violence',
      camera: 'Parking Lot',
      confidence: 87,
      timestamp: new Date(Date.now() - 12 * 60 * 1000),
      status: 'investigating'
    },
    {
      id: '3',
      type: 'suspicious_activity',
      camera: 'Back Exit',
      confidence: 76,
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      status: 'resolved'
    },
    {
      id: '4',
      type: 'blood',
      camera: 'Corridor A',
      confidence: 82,
      timestamp: new Date(Date.now() - 35 * 60 * 1000),
      status: 'investigating'
    }
  ];

  const threatTrends = [
    { time: '00:00', threats: 2 },
    { time: '04:00', threats: 1 },
    { time: '08:00', threats: 5 },
    { time: '12:00', threats: 8 },
    { time: '16:00', threats: 12 },
    { time: '20:00', threats: 7 },
    { time: 'Now', threats: 3 }
  ];

  const getDetectionIcon = (type: string) => {
    switch (type) {
      case 'weapon':
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      case 'violence':
        return <AlertTriangle className="w-4 h-4 text-danger" />;
      case 'blood':
        return <AlertTriangle className="w-4 h-4 text-crime-red" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-danger text-danger-foreground';
      case 'investigating':
        return 'bg-warning text-warning-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar 
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Shield className="w-8 h-8 text-primary" />
                Security Dashboard
              </h1>
              <p className="text-muted-foreground">
                Real-time crime detection monitoring and analytics
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                {timeRange === 'today' ? 'Today' : 'This Week'}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-danger/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Threats</p>
                    <div className="text-3xl font-bold text-danger">
                      {stats.activeThreats}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-danger" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-danger mr-1" />
                  <span className="text-danger">+2 from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Detections</p>
                    <div className="text-3xl font-bold">
                      {stats.totalDetections.toLocaleString()}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="w-4 h-4 text-success mr-1" />
                  <span className="text-success">+12% this week</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-success/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Safe Scans</p>
                    <div className="text-3xl font-bold text-success">
                      {stats.safeScanns.toLocaleString()}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <span className="text-success">96.2% of all scans</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg Response</p>
                    <div className="text-3xl font-bold">
                      {stats.averageResponseTime}
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-warning" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingDown className="w-4 h-4 text-success mr-1" />
                  <span className="text-success">-0.3s improved</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Detections */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Recent Detections
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/results')}
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDetections.map((detection) => (
                      <div key={detection.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          {getDetectionIcon(detection.type)}
                          <div>
                            <div className="font-medium capitalize">
                              {detection.type.replace('_', ' ')} Detected
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {detection.camera} • {detection.confidence}% confidence
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <Badge className={getStatusColor(detection.status)}>
                            {detection.status}
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            {detection.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status & Quick Actions */}
            <div className="space-y-6">
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>System Uptime</span>
                      <span className="font-medium">{stats.systemUptime}%</span>
                    </div>
                    <Progress value={stats.systemUptime} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Active Cameras</span>
                      <span className="font-medium">
                        {stats.activeCameras}/{stats.totalCameras}
                      </span>
                    </div>
                    <Progress 
                      value={(stats.activeCameras / stats.totalCameras) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span className="text-success font-medium">All Systems Operational</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/upload')}
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Upload for Analysis
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/live-feed')}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      View Live Feed
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Threat Level Indicator */}
              <Card className="border-warning/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning">
                    <AlertTriangle className="w-5 h-5" />
                    Current Threat Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning mb-2">
                      ELEVATED
                    </div>
                    <p className="text-sm text-muted-foreground">
                      3 active threats detected. Security team has been notified.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;