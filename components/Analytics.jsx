import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Package, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function Analytics({ userRole }) {
  // Mock data for analytics
  const monthlyTradeData = [
    { month: 'Jan', volume: 2400, revenue: 180000 },
    { month: 'Feb', volume: 1398, revenue: 120000 },
    { month: 'Mar', volume: 9800, revenue: 280000 },
    { month: 'Apr', volume: 3908, revenue: 200000 },
    { month: 'May', volume: 4800, revenue: 320000 },
    { month: 'Jun', volume: 3800, revenue: 250000 },
  ];

  const cropTypeData = [
    { name: 'Wheat', value: 35, color: '#84cc16' },
    { name: 'Rice', value: 28, color: '#22c55e' },
    { name: 'Corn', value: 20, color: '#16a34a' },
    { name: 'Vegetables', value: 12, color: '#15803d' },
    { name: 'Others', value: 5, color: '#166534' },
  ];

  const qualityGradeData = [
    { grade: 'A+', count: 45, percentage: 35 },
    { grade: 'A', count: 38, percentage: 30 },
    { grade: 'B+', count: 25, percentage: 20 },
    { grade: 'B', count: 15, percentage: 12 },
    { grade: 'C', count: 4, percentage: 3 },
  ];

  const recentTransactions = [
    { id: 'TXN001', crop: 'Organic Wheat', farmer: 'Rajesh Kumar', buyer: 'Green Valley Co-op', amount: 12500, date: '2025-01-12' },
    { id: 'TXN002', crop: 'Basmati Rice', farmer: 'Sunita Devi', buyer: 'Metro Foods', amount: 18000, date: '2025-01-11' },
    { id: 'TXN003', crop: 'Yellow Corn', farmer: 'Amit Singh', buyer: 'Feed Corp Ltd', amount: 9500, date: '2025-01-10' },
  ];

  const kpiData = {
    totalRevenue: 1250000,
    revenueChange: 12.5,
    totalOrders: 248,
    ordersChange: 8.2,
    activeUsers: 1850,
    usersChange: -2.1,
    avgOrderValue: 5040,
    avgChange: 15.3
  };

  const getKPIIcon = (type) => {
    switch (type) {
      case 'revenue': return DollarSign;
      case 'orders': return Package;
      case 'users': return Users;
      case 'avgOrder': return TrendingUp;
      default: return TrendingUp;
    }
  };

  const KPICard = ({ title, value, change, icon: Icon, format = 'number' }) => {
    const formatValue = (val) => {
      switch (format) {
        case 'currency': return `₹${val.toLocaleString()}`;
        case 'percentage': return `${val}%`;
        default: return val.toLocaleString();
      }
    };

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatValue(value)}</div>
          <div className="flex items-center space-x-1 text-xs">
            {change > 0 ? (
              <TrendingUp className="w-3 h-3 text-green-600" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-600" />
            )}
            <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>
              {Math.abs(change)}%
            </span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            {userRole === 'admin' 
              ? 'Platform-wide analytics and insights'
              : `Your ${userRole} analytics and performance metrics`
            }
          </p>
        </div>
        <Select defaultValue="30">
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={kpiData.totalRevenue}
          change={kpiData.revenueChange}
          icon={getKPIIcon('revenue')}
          format="currency"
        />
        <KPICard
          title="Total Orders"
          value={kpiData.totalOrders}
          change={kpiData.ordersChange}
          icon={getKPIIcon('orders')}
        />
        <KPICard
          title="Active Users"
          value={kpiData.activeUsers}
          change={kpiData.usersChange}
          icon={getKPIIcon('users')}
        />
        <KPICard
          title="Avg Order Value"
          value={kpiData.avgOrderValue}
          change={kpiData.avgChange}
          icon={getKPIIcon('avgOrder')}
          format="currency"
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Trade Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trade Volume</CardTitle>
            <CardDescription>Volume and revenue trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTradeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="volume" fill="#84cc16" name="Volume (kg)" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} name="Revenue (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Crop Distribution</CardTitle>
            <CardDescription>Breakdown by crop type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cropTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {cropTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quality Grades & Recent Transactions */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quality Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>AGMARK Quality Distribution</span>
            </CardTitle>
            <CardDescription>Distribution of quality grades across all crops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityGradeData.map((grade) => (
                <div key={grade.grade} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge className="bg-green-100 text-green-800">
                      {grade.grade}
                    </Badge>
                    <span className="text-sm">{grade.count} crops</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div 
                        className="bg-harvest-gradient h-2 rounded-full" 
                        style={{ width: `${grade.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{grade.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest successful trades on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{transaction.crop}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.farmer} → {transaction.buyer}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">
                      ₹{transaction.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ID: {transaction.id}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key insights and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600">Positive Trends</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Revenue increased by 12.5% this month</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Average order value up by 15.3%</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>35% of crops achieving A+ AGMARK grade</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-yellow-600">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Active users decreased by 2.1%</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Consider promoting lower-grade crops</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Increase vegetable variety offerings</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
