import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';

const SignUpPage = () => {
    const { signUp, error, isLoading, setError } = useSignUp();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
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

        await signUp(formData.email, formData.password);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold mb-2">Create Your Coach Account</h1>
                    <p className="text-gray-600">Join Elite Soccer Blueprint as a coach</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <p className="text-sm text-blue-800">
                        <i className="fas fa-info-circle mr-2"></i>
                        After signing up, your account will need to be approved before you can access the coaching platform.
                    </p>
                </div>

                {error && (
                    <div className="alert-error p-4 rounded-md mb-4">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
            </div>
        </div>
    );
};

export default SignUpPage; 