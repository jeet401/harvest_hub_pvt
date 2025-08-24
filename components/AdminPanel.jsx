import { useState } from 'react';
import { Users, Shield, BarChart3, Star, FileCheck, AlertTriangle, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback } from './ui/avatar';

export function AdminPanel({ addNotification }) {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAgmarkUpload, setShowAgmarkUpload] = useState(false);

  // Mock data for admin
  const [users] = useState([
    {
      id: 'farmer-1',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      role: 'farmer',
      status: 'active',
      joinDate: '2025-01-01'
    },
    {
      id: 'buyer-1',
      name: 'Priya Wholesaler',
      email: 'priya@example.com',
      role: 'buyer',
      status: 'active',
      joinDate: '2025-01-02'
    },
    {
      id: 'farmer-2',
      name: 'Amit Singh',
      email: 'amit@example.com',
      role: 'farmer',
      status: 'pending',
      joinDate: '2025-01-08'
    }
  ]);

  const [agmarkCertifications] = useState([
    {
      id: 'cert-1',
      cropId: 'crop-1',
      cropName: 'Organic Wheat',
      farmerId: 'farmer-1',
      farmerName: 'Rajesh Kumar',
      grade: 'A+',
      certificationDate: '2025-01-05',
      expiryDate: '2025-07-05',
      status: 'approved',
      documents: ['certificate.pdf', 'lab-report.pdf']
    },
    {
      id: 'cert-2',
      cropId: 'crop-2',
      cropName: 'Basmati Rice',
      farmerId: 'farmer-1',
      farmerName: 'Rajesh Kumar',
      grade: 'A',
      certificationDate: '2025-01-06',
      expiryDate: '2025-07-06',
      status: 'pending',
      documents: ['certificate.pdf']
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'farmer'
  });

  const [agmarkForm, setAgmarkForm] = useState({
    cropId: '',
    grade: 'A+',
    documents: ''
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    addNotification(`User ${newUser.name} added successfully!`);
    setNewUser({ name: '', email: '', role: 'farmer' });
    setShowAddUser(false);
  };

  const handleAgmarkUpload = (e) => {
    e.preventDefault();
    addNotification('AGMARK certification uploaded for review!');
    setAgmarkForm({ cropId: '', grade: 'A+', documents: '' });
    setShowAgmarkUpload(false);
  };

  const handleApproveAgmark = (certId) => {
    addNotification('AGMARK certification approved!');
  };

  const handleRejectAgmark = (certId) => {
    addNotification('AGMARK certification rejected!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': case 'rejected': return 'bg-red-100 text-red-800';
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

  const stats = {
    totalUsers: users.length,
    activeFarmers: users.filter(u => u.role === 'farmer' && u.status === 'active').length,
    activeBuyers: users.filter(u => u.role === 'buyer' && u.status === 'active').length,
    pendingApprovals: users.filter(u => u.status === 'pending').length + agmarkCertifications.filter(c => c.status === 'pending').length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage users, certifications, and platform operations</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account for the platform
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select value={newUser.role || ''} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">Farmer</SelectItem>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">Add User</Button>
              </form>
            </DialogContent>
          </Dialog>

          <Dialog open={showAgmarkUpload} onOpenChange={setShowAgmarkUpload}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileCheck className="w-4 h-4 mr-2" />
                Upload AGMARK
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload AGMARK Certification</DialogTitle>
                <DialogDescription>
                  Upload quality certification documents for review
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAgmarkUpload} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-id">Crop ID</Label>
                  <Input
                    id="crop-id"
                    value={agmarkForm.cropId}
                    onChange={(e) => setAgmarkForm({...agmarkForm, cropId: e.target.value})}
                    placeholder="crop-123"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Select value={agmarkForm.grade} onValueChange={(value) => setAgmarkForm({...agmarkForm, grade: value})}>
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
                  <Label htmlFor="documents">Documents (URLs)</Label>
                  <Input
                    id="documents"
                    value={agmarkForm.documents}
                    onChange={(e) => setAgmarkForm({...agmarkForm, documents: e.target.value})}
                    placeholder="https://example.com/certificate.pdf"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Upload Certification</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Farmers</CardTitle>
            <div className="w-4 h-4 text-muted-foreground">👨‍🌾</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeFarmers}</div>
            <p className="text-xs text-muted-foreground">Verified farmers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buyers</CardTitle>
            <div className="w-4 h-4 text-muted-foreground">🏢</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeBuyers}</div>
            <p className="text-xs text-muted-foreground">Verified buyers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertTriangle className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="agmark">AGMARK Certifications</TabsTrigger>
          <TabsTrigger value="analytics">Platform Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage farmers, buyers, and admin accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(user.joinDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agmark">
          <Card>
            <CardHeader>
              <CardTitle>AGMARK Certifications</CardTitle>
              <CardDescription>Review and manage quality certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Certification Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agmarkCertifications.map((cert) => (
                    <TableRow key={cert.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{cert.cropName}</div>
                          <div className="text-sm text-muted-foreground">ID: {cert.cropId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{cert.farmerName}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">
                            {cert.grade}
                          </Badge>
                          <div className="flex items-center">
                            {[...Array(getGradeStars(cert.grade))].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(cert.status)}>
                          {cert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(cert.certificationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {cert.status === 'pending' && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApproveAgmark(cert.id)}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRejectAgmark(cert.id)}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm">
                            View Docs
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Platform Growth</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New Users This Month</span>
                    <span className="font-semibold">+23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Transactions</span>
                    <span className="font-semibold">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Trade Volume</span>
                    <span className="font-semibold">₹2.5L</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Quality Metrics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AGMARK Certifications</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Quality Grade</span>
                    <span className="font-semibold">A+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Customer Satisfaction</span>
                    <span className="font-semibold">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
