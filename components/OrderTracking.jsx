import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, MessageSquare, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';

export function OrderTracking({ currentUser, onViewProduct }) {
  // Mock order data
  const [orders] = useState([
    {
      id: 'order-001',
      cropId: 'crop-1',
      cropName: 'Organic Wheat',
      farmerId: 'farmer-1',
      farmerName: 'Rajesh Kumar',
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      quantity: 500,
      totalPrice: 12500,
      status: 'shipped',
      createdAt: '2025-01-08T10:00:00Z',
      estimatedDelivery: '2025-01-15T10:00:00Z'
    },
    {
      id: 'order-002',
      cropId: 'crop-2',
      cropName: 'Basmati Rice',
      farmerId: 'farmer-1',
      farmerName: 'Rajesh Kumar',
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      quantity: 200,
      totalPrice: 9000,
      status: 'confirmed',
      createdAt: '2025-01-10T14:30:00Z',
      estimatedDelivery: '2025-01-17T14:30:00Z'
    },
    {
      id: 'order-003',
      cropId: 'crop-3',
      cropName: 'Yellow Corn',
      farmerId: 'farmer-2',
      farmerName: 'Amit Singh',
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      quantity: 1000,
      totalPrice: 18000,
      status: 'delivered',
      createdAt: '2025-01-05T09:15:00Z',
      estimatedDelivery: '2025-01-12T09:15:00Z'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case 'pending': return 25;
      case 'confirmed': return 50;
      case 'shipped': return 75;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  const getTrackingSteps = (status) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', icon: Clock },
      { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
      { key: 'shipped', label: 'Shipped', icon: Truck },
      { key: 'delivered', label: 'Delivered', icon: Package }
    ];

    const statusOrder = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  const activeOrders = orders.filter(order => ['pending', 'confirmed', 'shipped'].includes(order.status));
  const completedOrders = orders.filter(order => order.status === 'delivered');
  const cancelledOrders = orders.filter(order => order.status === 'cancelled');

  const OrderCard = ({ order }) => {
    const steps = getTrackingSteps(order.status);
    
    return (
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{order.cropName}</CardTitle>
              <CardDescription>
                Order ID: {order.id} • From {order.farmerName}
              </CardDescription>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Order Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Quantity</p>
              <p className="text-muted-foreground">{order.quantity} kg</p>
            </div>
            <div>
              <p className="font-medium">Total Amount</p>
              <p className="text-muted-foreground">₹{order.totalPrice.toLocaleString()}</p>
            </div>
            <div>
              <p className="font-medium">Order Date</p>
              <p className="text-muted-foreground">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="font-medium">Expected Delivery</p>
              <p className="text-muted-foreground">
                {new Date(order.estimatedDelivery).toLocaleDateString()}
              </p>
            </div>
          </div>

          <Separator />

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Order Progress</span>
              <span>{getStatusProgress(order.status)}%</span>
            </div>
            <Progress value={getStatusProgress(order.status)} />
          </div>

          {/* Tracking Steps */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.key} className="flex flex-col items-center relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.completed
                        ? 'bg-primary border-primary text-primary-foreground'
                        : step.active
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <p
                    className={`text-xs mt-2 text-center ${
                      step.completed || step.active ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </p>
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-5 left-10 w-20 h-0.5 ${
                        step.completed ? 'bg-primary' : 'bg-muted-foreground/30'
                      }`}
                      style={{
                        width: `calc(100% - 2.5rem)`,
                        transform: 'translateX(-50%)',
                        left: '50%'
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Farmer Info & Actions */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {order.farmerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{order.farmerName}</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-muted-foreground">4.8 (127 reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                Chat
              </Button>
            </div>
          </div>

          {/* Additional Info for Shipped Orders */}
          {order.status === 'shipped' && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">Your order is on the way!</span>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                Tracking ID: TRK{order.id.toUpperCase()}
              </p>
              <div className="flex items-center space-x-1 text-sm text-blue-600">
                <MapPin className="w-3 h-3" />
                <span>Last seen: Delhi, approaching destination</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
        <p className="text-muted-foreground">
          Track your orders and communicate with farmers
        </p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-96">
          <TabsTrigger value="active" className="relative">
            Active ({activeOrders.length})
            {activeOrders.length > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                {activeOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedOrders.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled">
            Cancelled ({cancelledOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Orders</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any active orders at the moment.
                </p>
                <Button>Browse Crops</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Completed Orders</h3>
                <p className="text-muted-foreground">
                  Your completed orders will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-6">
          {cancelledOrders.length > 0 ? (
            cancelledOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-xl">✕</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">No Cancelled Orders</h3>
                <p className="text-muted-foreground">
                  You haven't cancelled any orders.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
