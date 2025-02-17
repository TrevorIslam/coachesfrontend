import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
    const { login, error, isLoading, setError } = useLogin();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setError('');
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData.email, formData.password);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-gray-600">Log in to your Elite Soccer Blueprint account</p>
                </div>

                {error && (
                    <div className="alert-error p-4 rounded-md mb-4">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="input-group">
                        <label htmlFor="email" className="input-label">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-input ${error && 'error'}`}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group relative">
                        <label htmlFor="password" className="input-label">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className={`form-input ${error && 'error'}`}
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={togglePassword}
                        >
                            <i className={`fas fa-eye${showPassword ? '-slash' : ''}`} />
                        </button>
                    </div>

                    <div className="flex justify-end mb-4">
                        <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button 
                        type="submit" 
                        className="btn-primary w-full py-3"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Logging In...
                            </>
                        ) : 'Log In'}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Social Login */}
                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or log in with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button 
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => console.log('Google login')}
                        >
                            <i className="fab fa-google mr-2"></i>
                            Google
                        </button>
                        <button 
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => console.log('Apple login')}
                        >
                            <i className="fab fa-apple mr-2"></i>
                            Apple
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; 