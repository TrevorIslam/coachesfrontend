import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCoachProfile } from '../hooks/useCoachProfile';

const Header = () => {
    const { user, logout } = useAuth();
    const { profile } = useCoachProfile();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Handle sticky header shadow using ref
        const handleScroll = () => {
            if (!headerRef.current) return;
            
            if (window.pageYOffset <= 0) {
                headerRef.current.classList.remove('shadow-md');
            } else {
                headerRef.current.classList.add('shadow-md');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Only need click outside for mobile menu now
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.nav-container')) {
                setIsMobileMenuOpen(false);
            }
        };

        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscKey);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header" ref={headerRef}>
            <nav className="nav-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    Coach Portal
                </Link>

                {/* Nav Links */}
                <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/profile" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
                    <Link to="/availability" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Availability</Link>
                    <Link to="/sessions" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Sessions</Link>
                    <Link to="/clients" className="nav-item" onClick={() => setIsMobileMenuOpen(false)}>Clients</Link>
                </div>

                {/* Right Nav Section */}
                <div className="right-nav flex items-center gap-4">
                    {/* Auth Section */}
                    <div className="auth-buttons">
                        {user ? (
                            <div className="profile-menu-container">
                                <button className="profile-button">
                                    <div className="profile-photo">
                                        {profile?.profile_picture_url ? (
                                            <img 
                                                src={profile.profile_picture_url} 
                                                alt="Profile" 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <i className="fas fa-user" />
                                        )}
                                    </div>
                                    <span className="profile-name">
                                        Hi, {profile?.first_name || user.email.split('@')[0]}
                                    </span>
                                    <i className="fas fa-chevron-down" />
                                </button>

                                <div className="profile-dropdown">
                                    <Link to="/profile" className="dropdown-item">
                                        <i className="fas fa-user" />
                                        Profile
                                    </Link>
                                    <Link to="/settings" className="dropdown-item">
                                        <i className="fas fa-cog" />
                                        Settings
                                    </Link>
                                    <button 
                                        onClick={logout}
                                        className="dropdown-item"
                                    >
                                        <i className="fas fa-sign-out-alt" />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link 
                                to="/login" 
                                state={{ from: location }}
                                className="btn-login"
                            >
                                Log In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className="menu-icon" />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
