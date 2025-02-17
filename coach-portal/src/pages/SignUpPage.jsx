import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';

const SignUpPage = () => {
    const { signUp, error, isLoading, setError } = useSignUp();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
    };

    const togglePassword = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        await signUp(formData.firstName, formData.lastName, formData.email, formData.password);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
                    <p className="text-gray-600">Join Elite Soccer Blueprint and start your journey</p>
                </div>

                {error && (
                    <div className="alert-error p-4 rounded-md mb-4">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="input-group">
                        <label htmlFor="firstName" className="input-label">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="form-input"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="lastName" className="input-label">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="form-input"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email" className="input-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-input"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="input-group relative">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="form-input"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePassword('password')}
                        >
                            <i className={`fas fa-eye${showPassword ? '-slash' : ''}`} />
                        </button>
                    </div>

                    <div className="input-group relative">
                        <label htmlFor="confirmPassword" className="input-label">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-input"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => togglePassword('confirm')}
                        >
                            <i className={`fas fa-eye${showConfirmPassword ? '-slash' : ''}`} />
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 mt-4">
                        By clicking Create Account, you agree to our{' '}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>{' '}
                        and{' '}
                        <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                    </p>

                    <button 
                        type="submit" 
                        className="btn-primary w-full py-3"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Creating Account...
                            </>
                        ) : 'Create Account'}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>

                {/* Social Sign Up */}
                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button 
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => console.log('Google signup')}
                        >
                            <i className="fab fa-google mr-2"></i>
                            Google
                        </button>
                        <button 
                            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={() => console.log('Apple signup')}
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

export default SignUpPage; 