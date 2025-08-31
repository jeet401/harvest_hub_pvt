import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, MessageSquare, Calendar, MapPin, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ImageWithFallback } from '../ImageWithFallback';

export function FarmerDashboard({ user, onViewProduct, onStartChat, addNotification }) {
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);

  // Mock data for farmer's crops
  const [crops, setCrops] = useState([
    {
      id: 'crop-1',
      name: 'Organic Wheat',
      quantity: 500,
      unit: 'kg',
      price: 25,
      harvestDate: '2025-01-15',
      photo: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      agmarkGrade: 'A+',
      farmerId: user.id,
      farmerName: user.name,
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
      farmerId: user.id,
      farmerName: user.name,
      location: 'Punjab, India',
      description: 'Aromatic long-grain Basmati rice with excellent quality.'
    }
  ]);

  // Form state for adding/editing crops
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    price: '',
    harvestDate: '',
    agmarkGrade: 'A+',
    description: '',
    photo: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const cropData = {
      id: editingCrop ? editingCrop.id : `crop-${Date.now()}`,
      name: formData.name,
      quantity: parseInt(formData.quantity),
      unit: formData.unit,
      price: parseFloat(formData.price),
      harvestDate: formData.harvestDate,
      photo: formData.photo || `https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      agmarkGrade: formData.agmarkGrade,
      farmerId: user.id,
      farmerName: user.name,
      location: 'Punjab, India',
      description: formData.description
    };

    if (editingCrop) {
      setCrops(crops.map(crop => crop.id === editingCrop.id ? cropData : crop));
      addNotification('Crop updated successfully!');
    } else {
      setCrops([...crops, cropData]);
      addNotification('New crop added successfully!');
    }

    // Reset form
    setFormData({
      name: '',
      quantity: '',
      unit: 'kg',
      price: '',
      harvestDate: '',
      agmarkGrade: 'A+',
      description: '',
      photo: ''
    });
    setShowAddCrop(false);
    setEditingCrop(null);
  };

  const handleEdit = (crop) => {
    setFormData({
      name: crop.name,
      quantity: crop.quantity.toString(),
      unit: crop.unit,
      price: crop.price.toString(),
      harvestDate: crop.harvestDate,
      agmarkGrade: crop.agmarkGrade,
      description: crop.description,
      photo: crop.photo
    });
    setEditingCrop(crop);
    setShowAddCrop(true);
  };

  const handleDelete = (cropId) => {
    setCrops(crops.filter(crop => crop.id !== cropId));
    addNotification('Crop deleted successfully!');
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

  const totalRevenue = crops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0);
  const totalQuantity = crops.reduce((sum, crop) => sum + crop.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}!</h1>
          <p className="text-muted-foreground">Manage your crop listings and track your sales</p>
        </div>
        <Dialog open={showAddCrop} onOpenChange={setShowAddCrop}>
          <DialogTrigger asChild>
            <Button className="bg-harvest-gradient">
              <Plus className="w-4 h-4 mr-2" />
              Add New Crop
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingCrop ? 'Edit Crop' : 'Add New Crop'}
              </DialogTitle>
              <DialogDescription>
                {editingCrop ? 'Update your crop listing details' : 'Add a new crop to your listings'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crop-name">Crop Name</Label>
                <Input
                  id="crop-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g., Organic Wheat"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    placeholder="500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({...formData, unit: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="tonnes">Tonnes</SelectItem>
                      <SelectItem value="quintals">Quintals</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per {formData.unit}</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="25.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="harvest-date">Harvest Date</Label>
                  <Input
                    id="harvest-date"
                    type="date"
                    value={formData.harvestDate}
                    onChange={(e) => setFormData({...formData, harvestDate: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="agmark-grade">AGMARK Grade</Label>
                <Select value={formData.agmarkGrade} onValueChange={(value) => setFormData({...formData, agmarkGrade: value})}>
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your crop quality, farming methods, etc."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Photo URL (optional)</Label>
                <Input
                  id="photo"
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({...formData, photo: e.target.value})}
                  placeholder="https://example.com/crop-photo.jpg"
                />
              </div>
              <Button type="submit" className="w-full">
                {editingCrop ? 'Update Crop' : 'Add Crop'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Crops</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              🌾
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{crops.length}</div>
            <p className="text-xs text-muted-foreground">Active listings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              📦
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">kg available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              💰
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Expected earnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. AGMARK Grade</CardTitle>
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              ⭐
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">A+</div>
            <p className="text-xs text-muted-foreground">Quality rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Crops Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Crop Listings</CardTitle>
          <CardDescription>
            Manage and track all your crop listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Crop</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Harvest Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crops.map((crop) => (
                  <TableRow key={crop.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <ImageWithFallback
                          src={crop.photo}
                          alt={crop.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{crop.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {crop.location}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {crop.quantity.toLocaleString()} {crop.unit}
                    </TableCell>
                    <TableCell>
                      ₹{crop.price}/{crop.unit}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge className={getGradeColor(crop.agmarkGrade)}>
                          {crop.agmarkGrade}
                        </Badge>
                        <div className="flex items-center">
                          {[...Array(getGradeStars(crop.agmarkGrade))].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(crop.harvestDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onViewProduct(crop)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(crop)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onStartChat('buyer-1', 'Interested Buyer')}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(crop.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
