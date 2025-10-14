import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Package, Check, Truck, MapPin, Phone, MessageCircle, Calendar, DollarSign } from 'lucide-react';
import MagicBento from '../../components/MagicBento';
import MagicCard from '../../components/MagicCard';
import { mockApi } from '../../lib/mockApi.js';

const OrderTracking = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Use mock API for farmer-specific orders
      const response = await mockApi.getOrders({ seller: 'current' });
      setOrders(response.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      // Fallback to empty array if API fails
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };



  const getOrdersByStatus = (status) => {
    switch (status) {
      case 'active':
        return orders.filter(order => ['confirmed', 'shipped'].includes(order.status));
      case 'completed':
        return orders.filter(order => order.status === 'delivered');
      case 'cancelled':
        return orders.filter(order => order.status === 'cancelled');
      default:
        return orders;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = getOrdersByStatus(activeTab);

  if (loading) {
    return (
      <MagicBento className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">Loading magical orders... ✨</div>
          </div>
        </div>
      </MagicBento>
    );
  }

  return (
    <MagicBento className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent mb-2">
            📦 Order Tracking ✨
          </h1>
          <p className="text-gray-600">Track your orders and communicate with farmers with magical precision</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <MagicCard className="p-1 max-w-md" glowIntensity="low">
            <div className="flex space-x-1">
              {[
                { key: 'active', label: 'Active', count: getOrdersByStatus('active').length },
                { key: 'completed', label: 'Completed', count: getOrdersByStatus('completed').length },
                { key: 'cancelled', label: 'Cancelled', count: getOrdersByStatus('cancelled').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </MagicCard>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <MagicCard className="p-8 text-center" glowIntensity="low">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} orders</h3>
            <p className="text-gray-600">Orders will appear here once customers start placing them</p>
          </MagicCard>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <MagicCard key={order.id} className="p-6" glowIntensity="medium">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{order.product}</h3>
                    <p className="text-sm text-gray-600">Order ID: {order.id} • From {order.buyer}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg">
                      <Package className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Quantity</p>
                      <p className="font-medium">{order.quantity} kg</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg">
                      <Truck className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Expected Delivery</p>
                      <p className="font-medium">{new Date(order.expectedDelivery).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Order Progress ✨</span>
                    <span className="text-sm text-gray-600">{order.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-sm glow-pulse" 
                      style={{ width: `${order.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                  {order.steps.map((step, index) => {
                    // Map icon names to components
                    const iconMap = {
                      'Package': Package,
                      'Check': Check,
                      'Truck': Truck,
                      'MapPin': MapPin
                    };
                    const Icon = iconMap[step.icon] || Package;
                    
                    return (
                      <div key={step.name} className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                          step.completed 
                            ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white glow-pulse' 
                            : step.current 
                            ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                            : 'bg-gray-300 text-gray-500'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className={`text-xs mt-2 text-center ${
                          step.completed || step.current ? 'font-medium' : 'text-gray-500'
                        }`}>
                          {step.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Status Update */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 mb-4 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full shadow-lg">
                      <Truck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900">Your order is on the way! 🚚</h4>
                      <p className="text-sm text-blue-700 mt-1">Tracking ID: {order.trackingId}</p>
                      <p className="text-sm text-blue-600 mt-1">📍 Last seen: {order.location}</p>
                    </div>
                  </div>
                </div>

                {/* Farmer Info & Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold text-white">{order.buyer.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.buyer}</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm text-gray-600">⭐ 4.8 (127 reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="shadow-sm hover:shadow-lg transition-all duration-300">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" className="shadow-sm hover:shadow-lg transition-all duration-300">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </div>
              </MagicCard>
            ))}
          </div>
        )}
      </div>
    </MagicBento>
  );
};

export default OrderTracking;