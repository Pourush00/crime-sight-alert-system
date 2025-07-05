import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Upload, 
  Eye, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Camera,
  BarChart3,
  Zap,
  Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const Home = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    totalScans: 15847,
    threatsDetected: 234,
    accuracy: 98.7,
    processingTime: 1.2
  });

  const features = [
    {
      icon: AlertTriangle,
      title: 'Real-time Threat Detection',
      description: 'Advanced AI algorithms detect weapons, violence, and suspicious activities in real-time.',
      color: 'text-danger',
      bgColor: 'bg-danger/10'
    },
    {
      icon: Camera, 
      title: 'Live CCTV Integration',
      description: 'Seamlessly integrate with existing CCTV systems for continuous monitoring.',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Process images and videos in under 2 seconds with 98%+ accuracy.',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analytics',
      description: 'Detailed reporting and analytics dashboard for security insights.',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const useCases = [
    'Public Safety & Surveillance',
    'Airport & Transportation Security',
    'Educational Institution Safety',
    'Corporate Security Monitoring',
    'Event & Crowd Management',
    'Retail Loss Prevention'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              <Shield className="w-4 h-4 mr-2" />
              Next-Generation Security AI
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-crime-orange bg-clip-text text-transparent">
              Advanced Crime Scene Detection with AI
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Protect your environment with cutting-edge artificial intelligence that detects weapons, 
              violence, and suspicious activities in real-time. Enhance security with automated threat analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/upload')}
                className="text-lg px-8 py-3"
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Detection
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/live-feed')}
                className="text-lg px-8 py-3"
              >
                <Eye className="w-5 h-5 mr-2" />
                View Live Feed
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-danger/5" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stats.totalScans.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Scans</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-danger mb-2">
                  {stats.threatsDetected}
                </div>
                <div className="text-sm text-muted-foreground">Threats Detected</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-success mb-2">
                  {stats.accuracy}%
                </div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-warning mb-2">
                  {stats.processingTime}s
                </div>
                <div className="text-sm text-muted-foreground">Avg Processing</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Powerful Security Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive security monitoring with advanced detection capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Trusted Across Industries
              </h2>
              <p className="text-xl text-muted-foreground">
                Our crime detection system is deployed across various sectors for enhanced security.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {useCases.map((useCase, index) => (
                <Card key={index} className="group hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="font-medium">{useCase}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary/10 to-danger/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Enhance Your Security?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start using our advanced AI crime detection system today. Upload your first file or connect to live feeds in minutes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate('/upload')}
                  className="px-8 py-3"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Get Started Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => navigate('/about')}
                  className="px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;