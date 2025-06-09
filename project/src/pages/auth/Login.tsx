import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const { login, user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormValues>();


  useEffect(() => {
    const lastEmail = localStorage.getItem('lastEmail');
    if (lastEmail) {
      setValue('email', lastEmail);
    }
  }, [setValue]);

  useEffect(() => {
    if (user?.role === 'admin') navigate('/admin-dashboard');
    else if (user?.role === 'cashier') navigate('/cashier');
    else if (user?.role === 'assistant') navigate('/assistant');
    else if (user) navigate('/dashboard');
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      if (data.rememberMe) {
        localStorage.setItem('lastEmail', data.email);
      } else {
        localStorage.removeItem('lastEmail');
      }
      toast.success('Welcome back! Login successful.');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Login Container */}
      <div className="relative z-10 backdrop-blur-lg bg-white/10 border border-white/30 shadow-2xl rounded-3xl p-8 w-full max-w-md text-white transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            Welcome Back
          </h1>
          <p className="text-sm text-blue-100 mt-2">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-blue-100">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Mail className="h-5 w-5 text-blue-200" />
              </div>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-blue-300/30 placeholder-blue-200/70 text-white focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-300 hover:bg-white/20"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email',
                  },
                })}
              />
            </div>
            {errors.email && <p className="text-sm text-blue-200 mt-2">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-100">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Lock className="h-5 w-5 text-blue-200" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/15 backdrop-blur-sm border border-blue-300/30 placeholder-blue-200/70 text-white focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all duration-300 hover:bg-white/20"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Minimum 6 characters',
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-200 hover:text-white transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-blue-200 mt-2">{errors.password.message}</p>}
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-blue-100">
              <input 
                type="checkbox" 
                {...register('rememberMe')} 
                className="form-checkbox rounded text-blue-500 bg-white/20 border-blue-300/50 focus:ring-blue-400" 
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link 
              to="/forgot-password" 
              className="text-blue-200 hover:text-white underline underline-offset-2 transition-colors duration-300"
            >
              Forgot?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || authLoading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            {isLoading || authLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading || authLoading ? 'Signing in...' : (
              <span className="flex items-center">
                Sign In <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-blue-100">
          Don’t have an account?{' '}
          <Link 
            to="/register" 
            className="font-medium text-blue-200 hover:text-white underline underline-offset-2 transition-colors duration-300"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;