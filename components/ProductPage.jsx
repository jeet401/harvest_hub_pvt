import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Calendar, User, MessageSquare, ShoppingCart, Shield, Truck, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ImageWithFallback } from './ImageWithFallback';

export function ProductPage({ crop, currentUser, onStartChat, onStartPayment, addNotification }) {
  const [quantity, setQuantity] = useState(100);
  const [showOrderDialog, setShowOrderDialog] = useState(false);

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800 border-green-200';
      case 'A': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'B+': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'B': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'C': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getGradeStars = (grade) => {
    switch (grade) {
      case 'A+': return 5;
      case 'A': return 4;
      case 'B+': return 3;
      case 'B': return 2;
      case 'C': return 1;
      default: return 0;
    }
  };

  const getGradeDescription = (grade) => {
    switch (grade) {
      case 'A+': return 'Premium quality with exceptional standards';
      case 'A': return 'Excellent quality meeting high standards';
      case 'B+': return 'Good quality suitable for most applications';
      case 'B': return 'Standard quality for general use';
      case 'C': return 'Basic quality meeting minimum requirements';
      default: return 'Quality grade not specified';
    }
  };

  const handleOrder = () => {
    if (!currentUser) {
      addNotification('Please login to place an order');
      return;
    }

    const order = {
      id: `order-${Date.now()}`,
      cropId: crop.id,
      cropName: crop.name,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      quantity: quantity,
      totalPrice: crop.price * quantity,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    onStartPayment(order);
  };

  const handleChat = () => {
    if (!currentUser) {
      addNotification('Please login to start chat');
      return;
    }
    onStartChat(crop.farmerId, crop.farmerName);
  };

  const totalPrice = crop.price * quantity;
  const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const goToDashboard = () => {
    if (currentUser?.role === 'farmer') {
      window.location.href = '/farmer-dashboard';
    } else if (currentUser?.role === 'buyer') {
      window.location.href = '/buyer-dashboard';
    } else {
      window.location.href = '/';
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" className="mb-6" onClick={goToDashboard}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <ImageWithFallback
              src={crop.photo}
              alt={crop.name}
              className="w-full h-96 object-cover"
            />
            <Badge className={`absolute top-4 right-4 ${getGradeColor(crop.agmarkGrade)} border-2`}>
              AGMARK {crop.agmarkGrade}
            </Badge>
          </div>
          
          {/* Additional Images Placeholder */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Photo {i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{crop.name}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground mb-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {crop.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
              </div>
            </div>

            {/* AGMARK Rating */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800">AGMARK Certified</span>
                </div>
                <Badge className={getGradeColor(crop.agmarkGrade)}>
                  Grade {crop.agmarkGrade}
                </Badge>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < getGradeStars(crop.agmarkGrade)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground">
                  ({getGradeStars(crop.agmarkGrade)}/5)
                </span>
              </div>
              <p className="text-sm text-green-700">{getGradeDescription(crop.agmarkGrade)}</p>
            </div>

            <div className="text-3xl font-bold text-primary mb-2">
              ₹{crop.price.toFixed(2)} <span className="text-lg font-normal text-muted-foreground">per {crop.unit}</span>
            </div>
            <p className="text-muted-foreground mb-4">
              {crop.quantity.toLocaleString()} {crop.unit} available
            </p>
          </div>

          {/* Farmer Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Farmer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {crop.farmerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{crop.farmerName}</h3>
                  <p className="text-sm text-muted-foreground">Certified Farmer</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm">4.8/5 (127 reviews)</span>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Farm Size:</span> 25 acres
                </div>
                <div>
                  <span className="font-medium">Experience:</span> 15+ years
                </div>
                <div>
                  <span className="font-medium">Certification:</span> Organic, AGMARK
                </div>
                <div>
                  <span className="font-medium">Delivery:</span> Available
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Section */}
          <Card>
            <CardHeader>
              <CardTitle>Place Order</CardTitle>
              <CardDescription>
                Select quantity and place your order
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity ({crop.unit})</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={crop.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
                <p className="text-xs text-muted-foreground">
                  Maximum available: {crop.quantity} {crop.unit}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Unit Price:</span>
                  <span>₹{crop.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quantity} {crop.unit}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4" />
                <span>Estimated delivery: {estimatedDelivery.toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-black text-white font-semibold"
                  onClick={handleOrder}
                  disabled={!currentUser}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
                <Button
                  className="flex-1 bg-blue-600 text-white font-semibold"
                  onClick={handleChat}
                  disabled={!currentUser}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat with Farmer
                </Button>
              </div>

              {!currentUser && (
                <p className="text-sm text-muted-foreground text-center">
                  Please login to place orders or chat with farmers
                </p>
              )}
            </CardContent>
          </Card>

          {/* Trust & Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Trust & Safety</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>AGMARK Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Return Policy</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Description */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Product Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {crop.description}
          </p>
          <Separator className="my-4" />
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Growing Conditions</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Organic farming methods</li>
                <li>• Natural fertilizers only</li>
                <li>• Regular soil testing</li>
                <li>• Optimal weather conditions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quality Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AGMARK {crop.agmarkGrade} certified</li>
                <li>• Moisture content: 12-14%</li>
                <li>• Foreign matter: &lt; 1%</li>
                <li>• Damage grains: &lt; 2%</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Storage &amp; Handling</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Properly cleaned and dried</li>
                <li>• Stored in clean warehouses</li>
                <li>• Pest-free environment</li>
                <li>• Ready for immediate dispatch</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
