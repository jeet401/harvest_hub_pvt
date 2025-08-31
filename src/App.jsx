import React, { useState } from 'react';
import { Toaster } from '../components/ui/sonner';
import { LandingPage } from '../components/LandingPage';
import { FarmerDashboard } from '../components/farmer/FarmerDashboard';
import { ProfileFarmer } from '../components/farmer/ProfileFarmer';
import { ProfileBuyer } from '../components/buyer/ProfileBuyer';
import { ProfileAdmin } from '../components/admin/ProfileAdmin';
import { BuyerDashboard } from '../components/buyer/BuyerDashboard';
import { ProductPage } from '../components/ProductPage';
import { ChatPage } from '../components/ChatPage';
import { PaymentPage } from '../components/PaymentPage';
import { OrderTracking } from '../components/OrderTracking';
import { AdminPanel } from '../components/admin/AdminPanel';
import { Analytics } from '../components/Analytics';
import { AuthModal } from '../components/AuthModal';
import { SettingsFarmer } from '../components/farmer/SettingsFarmer';
import { SettingsBuyer } from '../components/buyer/SettingsBuyer';
import { SettingsAdmin } from '../components/admin/SettingsAdmin';
import { Navigation } from '../components/Navigation';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [chatRecipient, setChatRecipient] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowAuthModal(false);
    
    // Navigate to appropriate dashboard based on role
    if (user.role === 'farmer') {
      setCurrentView('farmer-dashboard');
    } else if (user.role === 'buyer') {
      setCurrentView('buyer-dashboard');
    } else if (user.role === 'admin') {
      setCurrentView('admin');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };

  const handleViewProduct = (crop) => {
    setSelectedCrop(crop);
    setCurrentView('product');
  };

  const handleStartChat = (recipientId, recipientName) => {
    setChatRecipient({ id: recipientId, name: recipientName });
    setCurrentView('chat');
  };

  const handleStartPayment = (order) => {
    setSelectedOrder(order);
    setCurrentView('payment');
  };

  const addNotification = (message) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 5000);
  };

  const renderCurrentView = () => {
  switch (currentView) {
      case 'profile':
        if (!currentUser) {
          setCurrentView('landing');
          return null;
        }
        if (currentUser.role === 'farmer') {
          return <ProfileFarmer user={currentUser} />;
        } else if (currentUser.role === 'buyer') {
          return <ProfileBuyer user={currentUser} />;
        } else if (currentUser.role === 'admin') {
          return <ProfileAdmin user={currentUser} />;
        }
        return null;
      case 'settings':
        if (!currentUser) {
          setCurrentView('landing');
          return null;
        }
        if (currentUser.role === 'farmer') {
          return <SettingsFarmer user={currentUser} onSaveSettings={() => setCurrentView('farmer-dashboard')} />;
        } else if (currentUser.role === 'buyer') {
          return <SettingsBuyer user={currentUser} onSaveSettings={() => setCurrentView('buyer-dashboard')} />;
        } else if (currentUser.role === 'admin') {
          return <SettingsAdmin user={currentUser} onSaveSettings={() => setCurrentView('admin')} />;
        }
        return null;
      case 'landing':
        return (
          <LandingPage 
            onNavigate={setCurrentView}
            onShowAuth={() => setShowAuthModal(true)}
          />
        );
      case 'farmer-dashboard':
        if (!currentUser) {
          setCurrentView('landing');
          return null;
        }
        return (
          <FarmerDashboard 
            user={currentUser}
            onViewProduct={handleViewProduct}
            onStartChat={handleStartChat}
            addNotification={addNotification}
          />
        );
      case 'buyer-dashboard':
        if (!currentUser) {
          setCurrentView('landing');
          return null;
        }
        return (
          <BuyerDashboard 
            user={currentUser}
            onViewProduct={handleViewProduct}
            onStartChat={handleStartChat}
            addNotification={addNotification}
          />
        );
      case 'product':
        if (!selectedCrop) {
          setCurrentView(currentUser?.role === 'farmer' ? 'farmer-dashboard' : 'buyer-dashboard');
          return null;
        }
        return (
          <ProductPage 
            crop={selectedCrop}
            currentUser={currentUser}
            onStartChat={handleStartChat}
            onStartPayment={handleStartPayment}
            addNotification={addNotification}
          />
        );
      case 'chat':
        if (!currentUser || !chatRecipient) {
          return (
            <div className="container mx-auto px-4 py-8">
              <div className="text-center">
                <p className="text-muted-foreground">Invalid chat session. Please go back and try again.</p>
                <button 
                  onClick={() => setCurrentView(currentUser?.role === 'farmer' ? 'farmer-dashboard' : 'buyer-dashboard')}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          );
        }
        return (
          <ChatPage 
            currentUser={currentUser}
            recipient={chatRecipient}
            crop={selectedCrop}
          />
        );
      case 'payment':
        if (!selectedOrder) {
          setCurrentView('orders');
          return null;
        }
        return (
          <PaymentPage 
            order={selectedOrder}
            onPaymentComplete={() => {
              setCurrentView('orders');
              addNotification('Payment completed successfully!');
            }}
          />
        );
      case 'orders':
        if (!currentUser) {
          setCurrentView('landing');
          return null;
        }
        return (
          <OrderTracking 
            currentUser={currentUser}
            onViewProduct={handleViewProduct}
          />
        );
      case 'admin':
        if (!currentUser || currentUser.role !== 'admin') {
          setCurrentView('landing');
          return null;
        }
        return (
          <AdminPanel 
            addNotification={addNotification}
          />
        );
      case 'analytics':
        if (!currentUser) {
          setCurrentView('landing');
          return null;
        }
        return (
          <Analytics 
            userRole={currentUser.role}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentView} onShowAuth={() => setShowAuthModal(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {currentUser && (
        <Navigation 
          currentUser={currentUser}
          currentView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          notifications={notifications}
        />
      )}
      
      <main className={currentUser ? "pt-16" : ""}>
        {renderCurrentView()}
      </main>

      {showAuthModal && (
        <AuthModal 
          onLogin={handleLogin}
          onClose={() => setShowAuthModal(false)}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
