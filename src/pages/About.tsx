import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Users, 
  Target, 
  Zap, 
  Eye,
  BarChart3,
  Github,
  Linkedin,
  Mail,
  ExternalLink
} from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Rodriguez',
      role: 'Lead AI Engineer',
      description: 'Specializes in computer vision and deep learning algorithms for security applications.',
      avatar: '👨‍💻',
      skills: ['TensorFlow', 'PyTorch', 'OpenCV', 'YOLO']
    },
    {
      name: 'Sarah Chen',
      role: 'Security Systems Architect',
      description: 'Expert in surveillance systems integration and real-time threat detection.',
      avatar: '👩‍🔬',
      skills: ['System Design', 'CCTV Integration', 'Network Security']
    },
    {
      name: 'Michael Johnson',
      role: 'Full Stack Developer',
      description: 'Develops robust web applications and user interfaces for security platforms.',
      avatar: '👨‍💼',
      skills: ['React', 'Node.js', 'MongoDB', 'Real-time Systems']
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Research Scientist',
      description: 'PhD in Computer Vision, researches advanced detection algorithms.',
      avatar: '👩‍🎓',
      skills: ['Machine Learning', 'Research', 'Algorithm Design']
    }
  ];

  const features = [
    {
      icon: Eye,
      title: 'Advanced Computer Vision',
      description: 'State-of-the-art neural networks trained on extensive security datasets for precise threat detection.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Lightning-fast analysis with sub-second response times for immediate threat identification.'
    },
    {
      icon: BarChart3,
      title: 'Comprehensive Analytics',
      description: 'Detailed reporting and insights to help security teams make informed decisions.'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with encrypted data transmission and secure cloud infrastructure.'
    }
  ];

  const stats = [
    { label: 'Detection Accuracy', value: '98.7%' },
    { label: 'Response Time', value: '<2s' },
    { label: 'Uptime Guarantee', value: '99.9%' },
    { label: 'Supported Formats', value: '10+' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-crime-orange bg-clip-text text-transparent">
              About CrimeGuard AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're revolutionizing security through artificial intelligence, providing cutting-edge crime detection 
              solutions that help protect communities, businesses, and public spaces worldwide.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="px-4 py-2 text-sm">AI-Powered</Badge>
              <Badge className="px-4 py-2 text-sm">Real-time Detection</Badge>
              <Badge className="px-4 py-2 text-sm">Enterprise Grade</Badge>
              <Badge className="px-4 py-2 text-sm">24/7 Monitoring</Badge>
            </div>
          </div>

          {/* Mission Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-6 h-6 text-primary" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To make the world safer through intelligent technology. We believe that advanced AI can significantly 
                  enhance security operations by providing real-time threat detection, reducing response times, and 
                  preventing incidents before they escalate.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-6 h-6 text-primary" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  A future where intelligent systems work alongside security professionals to create safer environments 
                  for everyone. We envision AI-powered security becoming the standard for protecting public spaces, 
                  workplaces, and communities globally.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">What Makes Us Different</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-card/50 rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Platform Statistics</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Our diverse team of experts combines deep technical knowledge with real-world security experience 
              to build solutions that make a difference.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{member.avatar}</div>
                    <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                    <div className="text-primary font-medium text-sm mb-3">{member.role}</div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <Card className="mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <h4 className="font-semibold mb-3">AI & Machine Learning</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>TensorFlow & PyTorch</div>
                    <div>YOLO Object Detection</div>
                    <div>OpenCV Computer Vision</div>
                    <div>Custom Neural Networks</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold mb-3">Backend & Infrastructure</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>Node.js & Express</div>
                    <div>MongoDB Database</div>
                    <div>AWS Cloud Services</div>
                    <div>Redis Caching</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold mb-3">Frontend & Mobile</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div>React & TypeScript</div>
                    <div>Tailwind CSS</div>
                    <div>Real-time WebSockets</div>
                    <div>Progressive Web App</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact/CTAs */}
          <Card className="bg-gradient-to-r from-primary/10 to-danger/10 border-primary/20">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Enhance Your Security?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of organizations already using CrimeGuard AI to protect their assets and people.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  <Shield className="w-5 h-5 mr-2" />
                  Get Started Today
                </Button>
                <Button variant="outline" size="lg" className="px-8">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Schedule Demo
                </Button>
              </div>
              
              <div className="mt-8 text-sm text-muted-foreground">
                <p>Enterprise solutions available • 24/7 support • Custom integrations</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;