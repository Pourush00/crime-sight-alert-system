import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import DetectionResultCard, { DetectionResult } from '@/components/DetectionResultCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Eye,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  // Mock detection results
  const [results] = useState<DetectionResult[]>([
    {
      id: '1',
      fileName: 'security_camera_feed_001.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      detections: [
        {
          type: 'weapon',
          label: 'Gun Detected',
          confidence: 0.92,
          boundingBox: { x: 120, y: 80, width: 60, height: 40 }
        },
        {
          type: 'suspicious_activity',
          label: 'Suspicious Behavior',
          confidence: 0.78,
          boundingBox: { x: 200, y: 150, width: 80, height: 100 }
        }
      ],
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'danger',
      processingTime: 2.3
    },
    {
      id: '2',
      fileName: 'entrance_monitoring.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      detections: [],
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'safe',
      processingTime: 1.1
    },
    {
      id: '3',
      fileName: 'parking_lot_cctv.mp4',
      imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22',
      detections: [
        {
          type: 'blood',
          label: 'Blood Stain Detected',
          confidence: 0.85,
          boundingBox: { x: 150, y: 200, width: 40, height: 30 }
        }
      ],
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'danger',
      processingTime: 1.8
    },
    {
      id: '4',
      fileName: 'office_surveillance.jpg',
      imageUrl: 'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb',
      detections: [
        {
          type: 'suspicious_activity',
          label: 'Unusual Movement Pattern',
          confidence: 0.65,
          boundingBox: { x: 100, y: 120, width: 70, height: 90 }
        }
      ],
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      status: 'warning',
      processingTime: 1.5
    }
  ]);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || result.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: results.length,
    danger: results.filter(r => r.status === 'danger').length,
    warning: results.filter(r => r.status === 'warning').length,
    safe: results.filter(r => r.status === 'safe').length
  };

  const handleViewDetails = (id: string) => {
    // In a real app, this would navigate to a detailed view
    console.log('Viewing details for result:', id);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleExportResults = () => {
    // In a real app, this would export/download the results
    console.log('Exporting results...');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/upload')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Upload
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Detection Results</h1>
                <p className="text-muted-foreground">
                  Analysis results from your uploaded files
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleExportResults}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stats.total}
                </div>
                <div className="text-sm text-muted-foreground">Total Scans</div>
              </CardContent>
            </Card>
            
            <Card className="border-danger/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-danger mb-1">
                  {stats.danger}
                </div>
                <div className="text-sm text-muted-foreground">High Risk</div>
              </CardContent>
            </Card>
            
            <Card className="border-warning/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1">
                  {stats.warning}
                </div>
                <div className="text-sm text-muted-foreground">Medium Risk</div>
              </CardContent>
            </Card>
            
            <Card className="border-success/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">
                  {stats.safe}
                </div>
                <div className="text-sm text-muted-foreground">Safe</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filter Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by filename..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="danger">High Risk</SelectItem>
                    <SelectItem value="warning">Medium Risk</SelectItem>
                    <SelectItem value="safe">Safe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results Grid */}
          {filteredResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((result) => (
                <DetectionResultCard
                  key={result.id}
                  result={result}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Results Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.' 
                    : 'Upload some files to see detection results here.'
                  }
                </p>
                <Button onClick={() => navigate('/upload')}>
                  Upload Files
                </Button>
              </CardContent>
            </Card>
          )}

          {/* High Priority Alert */}
          {stats.danger > 0 && (
            <Card className="mt-8 border-danger/30 bg-danger/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-danger" />
                  <h3 className="text-lg font-semibold text-danger">
                    Security Alert - Immediate Attention Required
                  </h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  {stats.danger} high-risk detection(s) require immediate review. 
                  Potential security threats have been identified in your uploaded files.
                </p>
                <div className="flex gap-3">
                  <Button variant="destructive" size="sm">
                    Review High Risk Items
                  </Button>
                  <Button variant="outline" size="sm">
                    Generate Security Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;