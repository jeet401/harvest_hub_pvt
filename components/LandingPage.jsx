import { ArrowRight, Leaf, Users, TrendingUp, Shield, Star, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './ImageWithFallback';

export function LandingPage({ onShowAuth }) {
  const features = [
    {
      icon: Users,
      title: "Direct Connection",
      description: "Connect farmers directly with buyers, eliminating middlemen and increasing profits for all."
    },
    {
      icon: Shield,
      title: "AGMARK Certified",
      description: "All crops are quality certified with AGMARK grading system for transparency and trust."
    },
    {
      icon: TrendingUp,
      title: "Market Analytics",
      description: "Access real-time market data, price trends, and demand forecasting tools."
    },
    {
      icon: Leaf,
      title: "Sustainable Trading",
      description: "Promote sustainable farming practices and eco-friendly agricultural solutions."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Farmer from Punjab",
      rating: 5,
      comment: "HarvestHub helped me get 30% better prices for my wheat harvest. Direct connection with buyers is amazing!"
    },
    {
      name: "Priya Wholesaler",
      role: "Agricultural Buyer",
      rating: 5,
      comment: "Quality assured crops with AGMARK certification. The platform makes sourcing so much easier."
    },
    {
      name: "Green Valley Co-op",
      role: "Agricultural Cooperative",
      rating: 5,
      comment: "Perfect platform for managing our member farmers' produce and connecting with reliable buyers."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Farmers" },
    { number: "12,000+", label: "Verified Buyers" },
    { number: "₹500Cr+", label: "Total Trade Value" },
    { number: "98%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-harvest-gradient p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded text-center flex items-center justify-center">
                  🌾
                </div>
              </div>
              <h1 className="text-2xl font-bold text-primary">HarvestHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onShowAuth}>
                Login
              </Button>
              <Button onClick={onShowAuth}>
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
                🌱 Connecting Agriculture
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Direct Farm-to-Market
                <span className="text-primary"> Trading Platform</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Empowering farmers with direct access to buyers, transparent pricing, 
                and AGMARK quality certification. Build a sustainable agricultural ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={onShowAuth} className="bg-harvest-gradient hover:opacity-90">
                  Start Trading Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Fresh vegetables and crops"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold">₹2.5L+ Daily</p>
                    <p className="text-sm text-muted-foreground">Trade Volume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary text-secondary-foreground">
              🚀 Platform Features
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose HarvestHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides everything you need for successful agricultural trading
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to start trading
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-harvest-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Register & Verify</h3>
              <p className="text-muted-foreground">
                Sign up as a farmer or buyer and complete AGMARK verification for quality assurance
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-harvest-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">List or Browse</h3>
              <p className="text-muted-foreground">
                Farmers list their crops while buyers browse and post requirements with smart filtering
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-harvest-gradient rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Trade & Track</h3>
              <p className="text-muted-foreground">
                Connect, negotiate, complete secure payments and track orders in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our community says about HarvestHub
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-harvest-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers who are already benefiting from direct, transparent trading
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={onShowAuth}>
              Start as Farmer
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" onClick={onShowAuth}>
              Start as Buyer
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-harvest-gradient p-2 rounded-lg">
                  <div className="w-6 h-6 bg-white rounded text-center flex items-center justify-center">
                    🌾
                  </div>
                </div>
                <h3 className="text-xl font-bold">HarvestHub</h3>
              </div>
              <p className="text-muted-foreground">
                Connecting agriculture, empowering communities, building sustainable futures.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">For Farmers</a></li>
                <li><a href="#" className="hover:text-foreground">For Buyers</a></li>
                <li><a href="#" className="hover:text-foreground">AGMARK Certification</a></li>
                <li><a href="#" className="hover:text-foreground">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Training</a></li>
                <li><a href="#" className="hover:text-foreground">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 HarvestHub. All rights reserved. Made with 🌱 for farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
