import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
    const { login, error, isLoading, setError } = useLogin();
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
                    <h1 className="text-2xl font-bold mb-2">Coach Login</h1>
                    <p className="text-gray-600">Log in to your Elite Soccer Blueprint coaching account</p>
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
                            Don't have a coach account?{' '}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage; 