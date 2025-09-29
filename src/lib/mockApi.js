// Mock API service for HarvestHub Frontend Demo
// This replaces all backend API calls with static mock data

// Mock user data
const mockUsers = {
  farmer: {
    id: '1',
    name: 'Ramesh Kumar',
    email: 'ramesh.farmer@example.com',
    role: 'farmer',
    location: 'Punjab, India',
    phone: '+91 98765 43210',
    farmSize: '25 acres',
    experience: '15 years'
  },
  buyer: {
    id: '2', 
    name: 'Priya Sharma',
    email: 'priya.buyer@example.com',
    role: 'buyer',
    location: 'Delhi, India',
    phone: '+91 87654 32109',
    company: 'Fresh Mart Pvt Ltd'
  },
  admin: {
    id: '3',
    name: 'Admin User', 
    email: 'admin@harvesthub.com',
    role: 'admin'
  }
};

// Mock product data
const mockProducts = [
  {
    _id: '1',
    title: 'Organic Basmati Rice',
    description: 'Premium quality organic basmati rice, aged for 2 years. AGMARK certified Grade A+. Perfect aroma and long grains.',
    price: 120,
    stock: 5000,
    unit: 'kg',
    images: ['/basmati rice.jpeg'],
    category: 'Grains',
    categoryId: { _id: '1', name: 'Grains' },
    sellerId: { 
      _id: '1', 
      email: 'ramesh.farmer@example.com', 
      name: 'Ramesh Kumar',
      location: 'Punjab, India' 
    },
    agmarkGrade: 'A+',
    harvestDate: '2025-08-15',
    location: 'Punjab, India',
    organicCertified: true,
    createdAt: '2025-08-20T10:30:00Z'
  },
  {
    _id: '2', 
    title: 'Fresh Red Tomatoes',
    description: 'Juicy and fresh red tomatoes, perfect for cooking and salads. Grown using organic farming methods.',
    price: 45,
    stock: 2000,
    unit: 'kg', 
    images: ['/tomatoes.jpg'],
    category: 'Vegetables',
    categoryId: { _id: '2', name: 'Vegetables' },
    sellerId: { 
      _id: '2', 
      email: 'suresh.farmer@example.com', 
      name: 'Suresh Patel',
      location: 'Gujarat, India' 
    },
    agmarkGrade: 'A',
    harvestDate: '2025-08-25',
    location: 'Gujarat, India',
    organicCertified: true,
    createdAt: '2025-08-26T09:15:00Z'
  },
  {
    _id: '3',
    title: 'Premium Wheat',
    description: 'High-quality wheat grains with excellent protein content. Perfect for flour production.',
    price: 28,
    stock: 8000,
    unit: 'kg',
    images: ['/wheat.jpeg'], 
    category: 'Grains',
    categoryId: { _id: '1', name: 'Grains' },
    sellerId: { 
      _id: '3', 
      email: 'vikram.farmer@example.com', 
      name: 'Vikram Singh',
      location: 'Haryana, India' 
    },
    agmarkGrade: 'A+',
    harvestDate: '2025-07-20',
    location: 'Haryana, India', 
    organicCertified: false,
    createdAt: '2025-07-25T14:20:00Z'
  },
  {
    _id: '4',
    title: 'Organic Mixed Fruits',
    description: 'Fresh assorted organic fruits including apples, oranges, and bananas. Seasonal variety pack.',
    price: 150,
    stock: 500,
    unit: 'kg',
    images: ['/fresh-colorful-fruits-apples-oranges-bananas.png'],
    category: 'Fruits', 
    categoryId: { _id: '3', name: 'Fruits' },
    sellerId: { 
      _id: '4', 
      email: 'kiran.farmer@example.com', 
      name: 'Kiran Reddy',
      location: 'Karnataka, India' 
    },
    agmarkGrade: 'A+',
    harvestDate: '2025-08-28',
    location: 'Karnataka, India',
    organicCertified: true,
    createdAt: '2025-08-30T11:45:00Z'
  },
  {
    _id: '5',
    title: 'Organic Fertilizer',
    description: 'Natural compost and organic fertilizer made from farm waste. Eco-friendly and nutrient-rich.',
    price: 25,
    stock: 1500,
    unit: 'kg',
    images: ['/organic-fertilizer-bags-compost-natural-farming.png'],
    category: 'Fertilizers',
    categoryId: { _id: '4', name: 'Fertilizers' },
    sellerId: { 
      _id: '1', 
      email: 'ramesh.farmer@example.com', 
      name: 'Ramesh Kumar',
      location: 'Punjab, India' 
    },
    agmarkGrade: 'A',
    harvestDate: '2025-08-10',
    location: 'Punjab, India',
    organicCertified: true,
    createdAt: '2025-08-12T16:30:00Z'
  },
  {
    _id: '6',
    title: 'Fresh Carrots & Onions',
    description: 'Crisp and fresh carrots with premium onions. Great for cooking and raw consumption.',
    price: 35,
    stock: 1200,
    unit: 'kg',
    images: ['/carrots_onions.webp'],
    category: 'Vegetables',
    categoryId: { _id: '2', name: 'Vegetables' },
    sellerId: { 
      _id: '2', 
      email: 'suresh.farmer@example.com', 
      name: 'Suresh Patel',
      location: 'Gujarat, India' 
    },
    agmarkGrade: 'A',
    harvestDate: '2025-08-22',
    location: 'Gujarat, India',
    organicCertified: true,
    createdAt: '2025-08-24T13:10:00Z'
  }
];

// Mock categories
const mockCategories = [
  { _id: '1', name: 'Grains', description: 'Rice, Wheat, Barley, etc.' },
  { _id: '2', name: 'Vegetables', description: 'Fresh vegetables and greens' },
  { _id: '3', name: 'Fruits', description: 'Fresh seasonal fruits' },
  { _id: '4', name: 'Fertilizers', description: 'Organic and chemical fertilizers' },
  { _id: '5', name: 'Seeds', description: 'High-quality seeds for planting' }
];

// Mock orders data with enhanced farmer-specific information
const mockOrders = [
  {
    id: 'ORD-001',
    _id: '1',
    buyerId: '2',
    sellerId: '1', 
    product: 'Organic Basmati Rice',
    buyer: 'Priya Sharma',
    buyerPhone: '+91 87654 32109',
    buyerEmail: 'priya.buyer@example.com',
    products: [
      { productId: '1', quantity: 500, price: 120 }
    ],
    quantity: 500,
    totalAmount: 60000,
    status: 'shipped',
    paymentStatus: 'completed',
    shippingAddress: 'Delhi, India',
    orderDate: '2025-01-18T10:30:00Z',
    expectedDelivery: '2025-01-25T15:45:00Z',
    deliveryDate: null,
    progress: 75,
    trackingId: 'TRKORD-001',
    location: 'Delhi, approaching destination',
    steps: [
      { name: 'Order Placed', completed: true, icon: 'Package' },
      { name: 'Confirmed', completed: true, icon: 'Check' },
      { name: 'Shipped', completed: true, current: true, icon: 'Truck' },
      { name: 'Delivered', completed: false, icon: 'MapPin' }
    ]
  },
  {
    id: 'ORD-002',
    _id: '2',
    buyerId: '2',
    sellerId: '1',
    product: 'Premium Wheat',
    buyer: 'Rajesh Kumar',
    buyerPhone: '+91 98765 43210',
    buyerEmail: 'rajesh.buyer@example.com',
    products: [
      { productId: '3', quantity: 300, price: 28 }
    ],
    quantity: 300,
    totalAmount: 8400,
    status: 'confirmed',
    paymentStatus: 'completed', 
    shippingAddress: 'Mumbai, India',
    orderDate: '2025-01-20T14:20:00Z',
    expectedDelivery: '2025-01-27T12:00:00Z',
    deliveryDate: null,
    progress: 50,
    trackingId: 'TRKORD-002',
    location: 'Order confirmed, preparing for shipment',
    steps: [
      { name: 'Order Placed', completed: true, icon: 'Package' },
      { name: 'Confirmed', completed: true, current: true, icon: 'Check' },
      { name: 'Shipped', completed: false, icon: 'Truck' },
      { name: 'Delivered', completed: false, icon: 'MapPin' }
    ]
  },
  {
    id: 'ORD-003',
    _id: '3',
    buyerId: '3',
    sellerId: '1',
    product: 'Organic Fertilizer',
    buyer: 'Suresh Patel',
    buyerPhone: '+91 97654 32108',
    buyerEmail: 'suresh.buyer@example.com',
    products: [
      { productId: '5', quantity: 100, price: 25 }
    ],
    quantity: 100,
    totalAmount: 2500,
    status: 'delivered',
    paymentStatus: 'completed',
    shippingAddress: 'Gujarat, India',
    orderDate: '2025-01-15T09:15:00Z',
    expectedDelivery: '2025-01-20T10:00:00Z',
    deliveryDate: '2025-01-19T14:30:00Z',
    progress: 100,
    trackingId: 'TRKORD-003',
    location: 'Delivered successfully',
    steps: [
      { name: 'Order Placed', completed: true, icon: 'Package' },
      { name: 'Confirmed', completed: true, icon: 'Check' },
      { name: 'Shipped', completed: true, icon: 'Truck' },
      { name: 'Delivered', completed: true, icon: 'MapPin' }
    ]
  }
];

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API class
class MockAPI {
  constructor() {
    this.currentUser = null;
    this.cart = JSON.parse(localStorage.getItem('demo_cart') || '[]');
  }

  // Auth methods
  async login(credentials) {
    await delay(800); // Simulate network delay
    const { email, role } = credentials;
    
    if (role === 'farmer') {
      this.currentUser = mockUsers.farmer;
    } else if (role === 'buyer') {
      this.currentUser = mockUsers.buyer;
    } else if (role === 'admin') {
      this.currentUser = mockUsers.admin;
    }
    
    localStorage.setItem('demo_user', JSON.stringify(this.currentUser));
    return { user: this.currentUser, token: 'mock_token_' + Date.now() };
  }

  async register(userData) {
    await delay(1000);
    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };
    this.currentUser = newUser;
    localStorage.setItem('demo_user', JSON.stringify(this.currentUser));
    return { user: newUser, token: 'mock_token_' + Date.now() };
  }

  async logout() {
    await delay(300);
    this.currentUser = null;
    localStorage.removeItem('demo_user');
    localStorage.removeItem('demo_cart');
    this.cart = [];
    return { success: true };
  }

  async getProfile() {
    await delay(400);
    const savedUser = JSON.parse(localStorage.getItem('demo_user') || 'null');
    if (savedUser) {
      this.currentUser = savedUser;
      return { profile: savedUser, user: savedUser };
    }
    throw new Error('User not found');
  }

  // Products methods  
  async getProducts(params = {}) {
    await delay(600);
    const { limit = 50, category, search, seller } = params;
    
    let filteredProducts = [...mockProducts];
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    
    if (search) {
      filteredProducts = filteredProducts.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (seller === 'current' && this.currentUser) {
      filteredProducts = filteredProducts.filter(p => 
        p.sellerId.email === this.currentUser.email
      );
    }
    
    return {
      products: filteredProducts.slice(0, limit),
      total: filteredProducts.length,
      page: 1,
      totalPages: Math.ceil(filteredProducts.length / limit)
    };
  }

  async getProduct(productId) {
    await delay(400);
    const product = mockProducts.find(p => p._id === productId);
    if (!product) throw new Error('Product not found');
    return { product };
  }

  async createProduct(productData) {
    await delay(800);
    const newProduct = {
      ...productData,
      _id: Date.now().toString(),
      sellerId: this.currentUser,
      createdAt: new Date().toISOString(),
      agmarkGrade: 'A+',
      organicCertified: true
    };
    
    // Save to localStorage for persistence in demo
    const userProducts = JSON.parse(localStorage.getItem('farmerProducts') || '[]');
    userProducts.push(newProduct);
    localStorage.setItem('farmerProducts', JSON.stringify(userProducts));
    
    return { product: newProduct };
  }

  async updateProduct(productId, updateData) {
    await delay(600);
    const productIndex = mockProducts.findIndex(p => p._id === productId);
    if (productIndex === -1) throw new Error('Product not found');
    
    mockProducts[productIndex] = { ...mockProducts[productIndex], ...updateData };
    return { product: mockProducts[productIndex] };
  }

  async deleteProduct(productId) {
    await delay(500);
    const productIndex = mockProducts.findIndex(p => p._id === productId);
    if (productIndex === -1) throw new Error('Product not found');
    
    mockProducts.splice(productIndex, 1);
    return { success: true };
  }

  // Categories methods
  async getCategories() {
    await delay(300);
    return { categories: mockCategories };
  }

  // Cart methods
  async addToCart(productId, quantity = 1) {
    await delay(400);
    const product = mockProducts.find(p => p._id === productId);
    if (!product) throw new Error('Product not found');
    
    const existingItem = this.cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        productId,
        product,
        quantity,
        addedAt: new Date().toISOString()
      });
    }
    
    localStorage.setItem('demo_cart', JSON.stringify(this.cart));
    return { cart: this.cart };
  }

  async getCart() {
    await delay(300);
    return { cart: this.cart };
  }

  async updateCartItem(productId, quantity) {
    await delay(300);
    const item = this.cart.find(item => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.cart = this.cart.filter(item => item.productId !== productId);
      } else {
        item.quantity = quantity;
      }
      localStorage.setItem('demo_cart', JSON.stringify(this.cart));
    }
    return { cart: this.cart };
  }

  async removeFromCart(productId) {
    await delay(300);
    this.cart = this.cart.filter(item => item.productId !== productId);
    localStorage.setItem('demo_cart', JSON.stringify(this.cart));
    return { cart: this.cart };
  }

  async clearCart() {
    await delay(200);
    this.cart = [];
    localStorage.setItem('demo_cart', JSON.stringify(this.cart));
    return { cart: this.cart };
  }

  // Orders methods
  async getOrders(params = {}) {
    await delay(500);
    const { seller } = params;
    
    let filteredOrders = [...mockOrders];
    
    // If seller is 'current' and we have a logged-in farmer, filter by sellerId
    if (seller === 'current' && this.currentUser && this.currentUser.role === 'farmer') {
      filteredOrders = filteredOrders.filter(order => 
        order.sellerId === this.currentUser.id
      );
    }
    
    return { orders: filteredOrders };
  }

  async createOrder(orderData) {
    await delay(1000);
    const newOrder = {
      _id: Date.now().toString(),
      ...orderData,
      buyerId: this.currentUser.id,
      orderDate: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'completed'
    };
    
    mockOrders.push(newOrder);
    this.clearCart(); // Clear cart after order
    
    return { order: newOrder };
  }

  // Payment methods (mock)
  async processPayment(paymentData) {
    await delay(2000); // Simulate payment processing
    return { 
      success: true, 
      transactionId: 'TXN_' + Date.now(),
      paymentMethod: paymentData.method || 'razorpay'
    };
  }
}

// Export singleton instance
export const mockApi = new MockAPI();

// Also export the mock data for direct access if needed
export { mockProducts, mockCategories, mockUsers, mockOrders };