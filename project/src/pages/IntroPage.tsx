import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, BarChart3, Users, Shield, ArrowRight, CheckCircle, ChevronRight, Database, RefreshCw } from 'lucide-react';

const IntroPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels, manage products, and get low-stock alerts in real-time.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Comprehensive reporting with charts and insights to drive business decisions.'
    },
    {
      icon: Users,
      title: 'Role-Based Access',
      description: 'Secure access control with Admin, Assistant, and Cashier roles.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with data backup and recovery features.'
    }
  ];

  const benefits = [
    'Real-time stock tracking',
    'Automated low-stock alerts',
    'Sales and purchase management',
    'Comprehensive reporting',
    'Multi-user support',
    'Dark mode interface',
    'Barcode scanning',
    'Multi-currency support'
  ];

  // Simulated stock data
  const stockData = [
    { id: 1, name: 'Laptops', value: 1247, trend: 'up' },
    { id: 2, name: 'Monitors', value: 845, trend: 'up' },
    { id: 3, name: 'Keyboards', value: 234, trend: 'down' },
    { id: 4, name: 'Mice', value: 567, trend: 'up' },
    { id: 5, name: 'Headphones', value: 1092, trend: 'up' },
  ];

  // Function to generate random sales data
  const generateSalesData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      sales: Math.floor(Math.random() * 1000) + 500
    }));
  };

  const [salesData] = useState(generateSalesData());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-900 to-blue-900 text-white">
      {/* Floating particles background */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-500/20 animate-pulse"
            style={{
              width: `${Math.random() * 100 + 20}px`,
              height: `${Math.random() * 100 + 20}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 py-8 relative z-10">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="h-7 w-7 text-blue-100" />
            </div>
            <span className="text-2xl font-bold text-blue-100 tracking-tight">StockManager</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-blue-200 hover:text-white font-medium transition-colors flex items-center group"
            >
              Login
              <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/register"
              className="btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-blue-800/30 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            <span className="text-blue-200 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 animate-spin-slow" />
              Version 3.0 Released
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            <div className="relative inline-block">
              <span className="relative z-10">Streamline Your</span>
              <div className="absolute bottom-0 left-0 w-full h-3 bg-blue-500/40 -z-0 animate-pulse-slow" />
            </div>
            
            <div className="mt-4 relative">
              <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 block font-extrabold tracking-tight animate-gradient-shift"
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Stock Management
              </span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-width-pulse" />
            </div>
          </h1>
          
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto animate-slide-up">
            Powerful inventory management system designed for modern businesses. 
            Track stock, manage sales, and generate insights with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/register"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg px-8 py-4 flex items-center justify-center rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Start Free Trial
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="bg-blue-800/50 hover:bg-blue-700/50 text-blue-100 text-lg px-8 py-4 rounded-xl font-medium backdrop-blur-sm border border-blue-600/30 transition-colors"
            >
              Sign In
            </Link>
          </div>
          
          <div className="mt-16 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 animate-fade-in-up">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {stockData.map((item) => (
                <div key={item.id} className="text-center p-4">
                  <div className="text-3xl font-bold text-cyan-300">{item.value}</div>
                  <div className="text-blue-200 text-sm mt-1">{item.name}</div>
                  <div className={`mt-2 text-xs ${item.trend === 'up' ? 'text-green-400' : 'text-rose-400'}`}>
                    {item.trend === 'up' ? '▲ 12%' : '▼ 3%'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
            Everything You Need
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Comprehensive tools to manage your inventory efficiently and grow your business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`bg-blue-800/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/20 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10 ${
                  mounted ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-blue-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-800/30 to-indigo-900/30 backdrop-blur-sm rounded-3xl p-8 border border-blue-600/20">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
                Why Choose StockManager?
              </h2>
              <p className="text-lg text-blue-200 mb-8">
                Built for businesses of all sizes, our platform provides the tools you need 
                to manage inventory efficiently and make data-driven decisions.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 bg-blue-900/30 rounded-lg hover:bg-blue-800/40 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-1" />
                    <span className="text-blue-100">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-cyan-700/40 to-blue-800/60 backdrop-blur-sm rounded-3xl p-8 text-white border border-cyan-500/30">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-t-3xl" />
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-cyan-300" />
                  Real-time Dashboard
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-blue-200">Total Products</span>
                      <span className="text-xl font-bold">1,247</span>
                    </div>
                    <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" 
                        style={{ width: '90%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-blue-200">Low Stock Items</span>
                      <span className="text-xl font-bold text-yellow-300">23</span>
                    </div>
                    <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" 
                        style={{ width: '12%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-blue-200">Monthly Sales</span>
                      <span className="text-xl font-bold text-green-300">$45,678</span>
                    </div>
                    <div className="w-full h-2 bg-blue-900/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" 
                        style={{ width: '75%' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex justify-between mb-4">
                    <span className="text-blue-200">Daily Sales Trend</span>
                    <span className="text-cyan-300">Last 30 Days</span>
                  </div>
                  <div className="h-32 flex items-end gap-1">
                    {salesData.map((day, index) => (
                      <div 
                        key={index}
                        className="flex-1 flex items-end group"
                        title={`Day ${day.day}: $${day.sales}`}
                      >
                        <div 
                          className="w-full bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t transition-all duration-300 group-hover:opacity-100 opacity-90"
                          style={{ height: `${day.sales / 50}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text">
              Trusted by Businesses
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Join thousands of companies that transformed their inventory management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="bg-gradient-to-br from-blue-800/30 to-indigo-900/30 backdrop-blur-sm rounded-2xl p-6 border border-blue-600/20 hover:border-cyan-500/40 transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
                    <Users className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Sarah Johnson</h4>
                    <p className="text-blue-300 text-sm">Retail Chain Owner</p>
                  </div>
                </div>
                <p className="text-blue-200 italic mb-4">
                  "StockManager reduced our inventory errors by 80% and saved us countless hours. The analytics dashboard alone is worth the investment."
                </p>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-3xl p-12 border border-blue-500/30 animate-pulse-slow">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Join thousands of businesses already using StockManager to streamline their operations.
            </p>
            <Link
              to="/register"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-lg px-8 py-4 inline-flex items-center rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              Start Your Free Trial
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
            <p className="mt-4 text-blue-300 text-sm">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-t from-blue-950 to-blue-900 py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Package className="h-6 w-6 text-blue-100" />
                </div>
                <span className="text-xl font-bold text-blue-100">StockManager</span>
              </div>
              <p className="text-blue-300 mb-4">
                Advanced inventory management for modern businesses.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'facebook', 'linkedin', 'github'].map((social) => (
                  <div key={social} className="bg-blue-800/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-cyan-500/20 cursor-pointer transition-colors">
                    <div className="w-4 h-4 bg-blue-300 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
              <ul className="space-y-2">
                {['Inventory Tracking', 'Sales Management', 'Reporting', 'Multi-User'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-300 hover:text-cyan-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'Tutorials', 'Blog', 'Support Center'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-300 hover:text-cyan-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Contact', 'Partners'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-blue-300 hover:text-cyan-300 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-12 pt-8 text-center">
            <p className="text-blue-400">
              © 2024 StockManager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounceGentle {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-10px); 
          }
        }
        
        @keyframes pulseSlow {
          0%, 100% { 
            opacity: 0.6;
          }
          50% { 
            opacity: 1;
          }
        }
        
        @keyframes widthPulse {
          0%, 100% { 
            width: 30%;
          }
          50% { 
            width: 100%;
          }
        }
        
        @keyframes gradientShift {
          0% { 
            background-position: 0% 50%;
          }
          50% { 
            background-position: 100% 50%;
          }
          100% { 
            background-position: 0% 50%;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease forwards;
          animation-delay: 0.2s;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        .animate-bounce-gentle {
          animation: bounceGentle 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        
        .animate-width-pulse {
          animation: widthPulse 3s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          animation: gradientShift 6s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroPage;