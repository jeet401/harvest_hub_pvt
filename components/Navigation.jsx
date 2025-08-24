import { Bell, Menu, Search, User, LogOut, BarChart3, MessageSquare, ShoppingCart, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export function Navigation({ currentUser, currentView, onNavigate, onLogout, notifications }) {
  const getNavItems = () => {
    const common = [
      { key: 'chat', label: 'Messages', icon: MessageSquare },
      { key: 'orders', label: 'Orders', icon: ShoppingCart },
      { key: 'analytics', label: 'Analytics', icon: BarChart3 },
    ];

    if (currentUser.role === 'farmer') {
      return [
        { key: 'farmer-dashboard', label: 'Dashboard', icon: User },
        ...common,
      ];
    } else if (currentUser.role === 'buyer') {
      return [
        { key: 'buyer-dashboard', label: 'Dashboard', icon: User },
        ...common,
      ];
    } else if (currentUser.role === 'admin') {
      return [
        { key: 'admin', label: 'Admin Panel', icon: Settings },
        ...common,
      ];
    }
    return common;
  };

  const navItems = getNavItems();

  return (
    <header className="fixed top-0 w-full bg-card border-b border-border z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="bg-harvest-gradient p-2 rounded-lg">
              <div className="w-6 h-6 bg-white rounded text-center flex items-center justify-center">
                🌾
              </div>
            </div>
            <h1 className="text-xl font-bold text-primary">HarvestHub</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.key}
                  variant={currentView === item.key ? "default" : "ghost"}
                  onClick={() => onNavigate(item.key)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Search crops, farmers, buyers..." 
                className="pl-10"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {notifications.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground">
                      {notifications.length}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                {notifications.length > 0 ? (
                  notifications.map((notification, index) => (
                    <DropdownMenuItem key={index}>
                      {notification}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>
                    No new notifications
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:block">{currentUser.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.key}
                        variant={currentView === item.key ? "default" : "ghost"}
                        onClick={() => onNavigate(item.key)}
                        className="flex items-center space-x-2 w-full justify-start"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
