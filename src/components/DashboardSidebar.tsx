import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Upload, 
  Eye, 
  BarChart3, 
  Settings, 
  Menu, 
  X,
  AlertTriangle,
  Clock,
  CheckCircle,
  Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface DashboardSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const DashboardSidebar = ({ collapsed: propCollapsed, onToggle }: DashboardSidebarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const location = useLocation();
  
  // Use prop if provided, otherwise use internal state
  const collapsed = propCollapsed !== undefined ? propCollapsed : internalCollapsed;
  const toggleSidebar = onToggle || (() => setInternalCollapsed(!internalCollapsed));

  const navigationItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: BarChart3,
      badge: null
    },
    {
      title: 'Upload Files',
      path: '/upload',
      icon: Upload,
      badge: null
    },
    {
      title: 'Live Feed',
      path: '/live-feed',
      icon: Camera,
      badge: { text: 'LIVE', variant: 'success' as const }
    },
    {
      title: 'Detection Results',
      path: '/results',
      icon: Eye,
      badge: { text: '3', variant: 'danger' as const }
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
      badge: null
    }
  ];

  const quickStats = [
    {
      label: 'Active Threats',
      value: '2',
      icon: AlertTriangle,
      color: 'text-danger',
      bgColor: 'bg-danger/10'
    },
    {
      label: 'Processing',
      value: '1',
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Safe Files',
      value: '15',
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  const getBadgeVariant = (variant: string) => {
    switch (variant) {
      case 'danger':
        return 'bg-danger text-danger-foreground';
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!collapsed && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 left-0 z-40 h-full
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-64'}
        bg-card border-r border-border
        flex flex-col shadow-lg lg:shadow-none
      `}>
        
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-crime-orange bg-clip-text text-transparent">
                  CrimeGuard
                </span>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className={collapsed ? 'w-full' : ''}
            >
              {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${active
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  
                  {!collapsed && (
                    <>
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge className={`text-xs ${getBadgeVariant(item.badge.variant)}`}>
                          {item.badge.text}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Quick Stats */}
        {!collapsed && (
          <div className="p-4 border-t border-border">
            <Card>
              <CardContent className="p-3">
                <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                  Quick Stats
                </h4>
                <div className="space-y-2">
                  {quickStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded ${stat.bgColor} flex items-center justify-center`}>
                          <Icon className={`w-3 h-3 ${stat.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground truncate">
                            {stat.label}
                          </p>
                        </div>
                        <span className={`text-sm font-medium ${stat.color}`}>
                          {stat.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Collapsed State Tooltip Indicator */}
        {collapsed && (
          <div className="p-2 text-center">
            <div className="w-8 h-1 bg-primary/20 rounded-full mx-auto" />
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardSidebar;