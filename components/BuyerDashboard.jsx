import { useState } from 'react';
import { Search, Filter, Plus, Star, MapPin, Calendar, MessageSquare, ShoppingCart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './ImageWithFallback';

export function BuyerDashboard({ user, onViewProduct, onStartChat, addNotification }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showPostRequirement, setShowPostRequirement] = useState(false);

  // Mock data for available crops
  const [availableCrops] = useState([
    {
      id: 'crop-1',
      name: 'Organic Wheat',
      quantity: 500,
      unit: 'kg',
      price: 25,
      harvestDate: '2025-01-15',
      photo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      agmarkGrade: 'A+',
      farmerId: 'farmer-1',
      farmerName: 'Rajesh Kumar',
      location: 'Punjab, India',
      description: 'Premium quality organic wheat grown without pesticides.'
    },
    {
      id: 'crop-2',
      name: 'Basmati Rice',
      quantity: 1000,
      unit: 'kg',
      price: 45,
      harvestDate: '2025-01-10',
      photo: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      agmarkGrade: 'A',
      farmerId: 'farmer-1',
      farmerName: 'Rajesh Kumar',
      location: 'Punjab, India',
      description: 'Aromatic long-grain Basmati rice with excellent quality.'
    },
    {
      id: 'crop-3',
      name: 'Yellow Corn',
      quantity: 2000,
      unit: 'kg',
      price: 18,
      harvestDate: '2025-01-20',
      photo: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      agmarkGrade: 'B+',
      farmerId: 'farmer-2',
      farmerName: 'Amit Singh',
      location: 'Maharashtra, India',
      description: 'High-quality yellow corn suitable for feed and food processing.'
    },
    {
      id: 'crop-4',
      name: 'Tomatoes',
      quantity: 300,
      unit: 'kg',
      price: 35,
      harvestDate: '2025-01-12',
      photo: 'https://images.unsplash.com/photo-1546470427-e30b120dcb53?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      agmarkGrade: 'A',
      farmerId: 'farmer-3',
      farmerName: 'Sunita Devi',
      location: 'Karnataka, India',
      description: 'Fresh, juicy tomatoes perfect for processing and retail.'
    }
  ]);

  // Mock buyer requirements
  const [requirements, setRequirements] = useState([
    {
      id: 'req-1',
      cropType: 'Organic Wheat',
      quantity: 1000,
      maxPrice: 30,
      qualityGrade: 'A+',
      requiredBy: '2025-02-01',
      buyerId: user.id,
      buyerName: user.name,
      description: 'Looking for premium organic wheat for our retail chain.'
    }
  ]);

  // Form state for posting requirements
  const [requirementForm, setRequirementForm] = useState({
    cropType: '',
    quantity: '',
    maxPrice: '',
    qualityGrade: 'A+',
    requiredBy: '',
    description: ''
  });

  const filteredCrops = availableCrops.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crop.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           crop.name.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const matchesPrice = crop.price >= priceRange[0] && crop.price <= priceRange[1];
    
    const matchesGrade = gradeFilter === 'all' || crop.agmarkGrade === gradeFilter;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesGrade;
  });

  const handlePostRequirement = (e) => {
    e.preventDefault();
    
    const newRequirement = {
      id: `req-${Date.now()}`,
      cropType: requirementForm.cropType,
      quantity: parseInt(requirementForm.quantity),
      maxPrice: parseFloat(requirementForm.maxPrice),
      qualityGrade: requirementForm.qualityGrade,
      requiredBy: requirementForm.requiredBy,
      buyerId: user.id,
      buyerName: user.name,
      description: requirementForm.description
    };

    setRequirements([...requirements, newRequirement]);
    addNotification('Requirement posted successfully!');
    
    // Reset form
    setRequirementForm({
      cropType: '',
      quantity: '',
      maxPrice: '',
      qualityGrade: 'A+',
      requiredBy: '',
      description: ''
    });
    setShowPostRequirement(false);
  };

  const handleQuickOrder = (crop) => {
    const order = {
      id: `order-${Date.now()}`,
      cropId: crop.id,
      cropName: crop.name,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      buyerId: user.id,
      buyerName: user.name,
      quantity: 100, // Default quantity
      totalPrice: crop.price * 100,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    addNotification(`Order placed for ${crop.name}!`);
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+': return 'bg-green-100 text-green-800';
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'B+': return 'bg-yellow-100 text-yellow-800';
      case 'B': return 'bg-orange-100 text-orange-800';
      case 'C': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">Discover quality crops and connect with farmers</p>
        </div>
        <Dialog open={showPostRequirement} onOpenChange={setShowPostRequirement}>
          <DialogTrigger asChild>
            <Button className="bg-harvest-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Post Requirement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Post Crop Requirement</DialogTitle>
              <DialogDescription>
                Describe your crop requirements and connect with farmers
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePostRequirement} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crop-type">Crop Type</Label>
                <Input
                  id="crop-type"
                  value={requirementForm.cropType}
                  onChange={(e) => setRequirementForm({...requirementForm, cropType: e.target.value})}
                  placeholder="e.g., Organic Wheat"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="req-quantity">Quantity (kg)</Label>
                  <Input
                    id="req-quantity"
                    type="number"
                    value={requirementForm.quantity}
                    onChange={(e) => setRequirementForm({...requirementForm, quantity: e.target.value})}
                    placeholder="1000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-price">Max Price per kg</Label>
                  <Input
                    id="max-price"
                    type="number"
                    step="0.01"
                    value={requirementForm.maxPrice}
                    onChange={(e) => setRequirementForm({...requirementForm, maxPrice: e.target.value})}
                    placeholder="30.00"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Quality Grade</Label>
                  <Select value={requirementForm.qualityGrade} onValueChange={(value) => setRequirementForm({...requirementForm, qualityGrade: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+ (Premium)</SelectItem>
                      <SelectItem value="A">A (Excellent)</SelectItem>
                      <SelectItem value="B+">B+ (Good)</SelectItem>
                      <SelectItem value="B">B (Standard)</SelectItem>
                      <SelectItem value="C">C (Basic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="required-by">Required By</Label>
                  <Input
                    id="required-by"
                    type="date"
                    value={requirementForm.requiredBy}
                    onChange={(e) => setRequirementForm({...requirementForm, requiredBy: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="req-description">Description</Label>
                <Textarea
                  id="req-description"
                  value={requirementForm.description}
                  onChange={(e) => setRequirementForm({...requirementForm, description: e.target.value})}
                  placeholder="Describe your specific requirements..."
                  rows={3}
                />
              </div>
              <Button type="submit" className="w-full">
                Post Requirement
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Crops</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              🌾
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableCrops.length}</div>
            <p className="text-xs text-muted-foreground">Active listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Requirements</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              📋
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requirements.length}</div>
            <p className="text-xs text-muted-foreground">Posted requirements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Farmers</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              👨‍🌾
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Connected farmers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Grade</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              ⭐
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A</div>
            <p className="text-xs text-muted-foreground">Quality rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Find Crops</CardTitle>
          <CardDescription>Search and filter crops based on your requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search crops, farmers, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="tomato">Tomatoes</SelectItem>
              </SelectContent>
            </Select>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="A+">A+</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="B+">B+</SelectItem>
                <SelectItem value="B">B</SelectItem>
                <SelectItem value="C">C</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4">
            <Label className="text-sm font-medium mb-2 block">
              Price Range: ₹{priceRange[0]} - ₹{priceRange[1]} per kg
            </Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Crops Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredCrops.map((crop) => (
          <Card key={crop.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={crop.photo}
                alt={crop.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <Badge className={`absolute top-3 right-3 ${getGradeColor(crop.agmarkGrade)}`}>
                {crop.agmarkGrade}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{crop.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="w-3 h-3 mr-1" />
                    {crop.location}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">₹{crop.price}/{crop.unit}</div>
                  <div className="flex items-center mt-1">
                    {[...Array(getGradeStars(crop.agmarkGrade))].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{crop.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="w-3 h-3 mr-1" />
                  Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
                </div>
                <div className="text-sm font-medium">
                  {crop.quantity} {crop.unit} available
                </div>
              </div>
              <div className="text-sm text-muted-foreground mb-4">
                By: {crop.farmerName}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewProduct(crop)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button
                  size="sm"
                  onClick={() => onStartChat(crop.farmerId, crop.farmerName)}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Chat
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuickOrder(crop)}
                >
                  <ShoppingCart className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Posted Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Your Posted Requirements</CardTitle>
          <CardDescription>Track your crop requirements and responses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {requirements.map((req) => (
              <div key={req.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{req.cropType}</h3>
                  <Badge className={getGradeColor(req.qualityGrade)}>
                    Min. {req.qualityGrade}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{req.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Quantity:</span> {req.quantity.toLocaleString()} kg
                  </div>
                  <div>
                    <span className="font-medium">Max Price:</span> ₹{req.maxPrice}/kg
                  </div>
                  <div>
                    <span className="font-medium">Required By:</span> {new Date(req.requiredBy).toLocaleDateString()}
                  </div>
                  <div>
                    <Button size="sm" variant="outline">
                      View Responses (2)
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
