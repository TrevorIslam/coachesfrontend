import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showAccessibility, setShowAccessibility] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showPrivacyPolicy || showTerms || showAccessibility) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showPrivacyPolicy, showTerms, showAccessibility]);

    const Modal = ({ show, onClose, title, children }) => {
        if (!show) return null;
        
        return (
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-8"
                onClick={(e) => {
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div 
                    className="bg-white rounded-lg w-full max-w-4xl mx-4"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <button 
                                onClick={onClose}
                                className="text-gray-500 hover:text-gray-700 text-xl"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                    <div className="p-6 max-h-[60vh] overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <footer className="footer" style={{ padding: '1rem 0' }}>
                <div className="footer-container">
                    <div className="footer-bottom" style={{ borderTop: 'none', paddingTop: '0' }}>
                        <p>© 2025 Elite Soccer Blueprint. All rights reserved.</p>
                        <p className="mt-2">
                            <button 
                                onClick={() => setShowPrivacyPolicy(true)}
                                className="text-white underline hover:text-gray-200 bg-transparent border-none cursor-pointer"
                            >
                                Privacy Policy
                            </button>
                            {' • '}
                            <button 
                                onClick={() => setShowTerms(true)}
                                className="text-white underline hover:text-gray-200 bg-transparent border-none cursor-pointer"
                            >
                                Terms of Service
                            </button>
                            {' • '}
                            <button 
                                onClick={() => setShowAccessibility(true)}
                                className="text-white underline hover:text-gray-200 bg-transparent border-none cursor-pointer"
                            >
                                Accessibility
                            </button>
                        </p>
                    </div>
                </div>
            </footer>

            <Modal 
                show={showPrivacyPolicy} 
                onClose={() => setShowPrivacyPolicy(false)} 
                title="Privacy Policy"
            >
                <div className="space-y-6 text-gray-700">
                    <p className="text-sm text-gray-500">Last updated: February 13, 2025</p>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">1. Introduction</h3>
                        <p>Elite Soccer Blueprint ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">2. Information We Collect</h3>
                        <p>We collect several types of information from and about users of our website, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Identity Data: name, date of birth, username</li>
                            <li>Contact Data: email address, phone number, billing address</li>
                            <li>Technical Data: IP address, browser type, device information</li>
                            <li>Profile Data: your preferences, feedback, and survey responses</li>
                            <li>Usage Data: information about how you use our website and services</li>
                            <li>Marketing Data: your preferences in receiving marketing from us</li>
                            <li>Health and Fitness Data: information about your physical condition, injuries, and athletic performance</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">3. How We Use Your Information</h3>
                        <p>We use your personal data for the following purposes:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>To provide and maintain our service</li>
                            <li>To match you with appropriate coaches</li>
                            <li>To personalize your training experience</li>
                            <li>To process your payments</li>
                            <li>To communicate important updates</li>
                            <li>To improve our services</li>
                            <li>To comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">4. Data Sharing and Third Parties</h3>
                        <p>We may share your personal information with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Our coaches and training staff</li>
                            <li>Payment processors</li>
                            <li>Analytics providers</li>
                            <li>Cloud service providers</li>
                            <li>Professional advisers</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">5. Data Security</h3>
                        <p>We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">6. Your Rights</h3>
                        <p>You have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request erasure of your data</li>
                            <li>Object to processing of your data</li>
                            <li>Request restriction of processing</li>
                            <li>Request transfer of your data</li>
                            <li>Withdraw consent</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">7. Cookies</h3>
                        <p>We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">8. Children's Privacy</h3>
                        <p>Our service is intended for users who are 13 years of age or older. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">9. Contact Us</h3>
                        <p>For any questions about this Privacy Policy, please contact us at:</p>
                        <p>Email: privacy@elitesoccerblueprint.com<br />
                        Address: [Your Business Address]<br />
                        Phone: [Your Phone Number]</p>
                    </section>
                </div>
            </Modal>

            <Modal 
                show={showTerms} 
                onClose={() => setShowTerms(false)} 
                title="Terms of Service"
            >
                <div className="space-y-6 text-gray-700">
                    <p className="text-sm text-gray-500">Last updated: February 13, 2025</p>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">1. Agreement to Terms</h3>
                        <p>By accessing or using Elite Soccer Blueprint's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">2. Service Description</h3>
                        <p>Elite Soccer Blueprint provides online soccer training, coaching, and educational services. Our services include:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>One-on-one coaching sessions</li>
                            <li>Training plans and programs</li>
                            <li>Video analysis</li>
                            <li>Educational content</li>
                            <li>Performance tracking</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">3. User Accounts</h3>
                        <p>When you create an account with us, you must provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">4. Payment Terms</h3>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All payments are processed securely through our payment providers</li>
                            <li>Prices are subject to change with notice</li>
                            <li>Refunds are available according to our refund policy</li>
                            <li>Subscription services will auto-renew unless cancelled</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">5. Cancellation and Rescheduling</h3>
                        <p>Sessions must be cancelled or rescheduled at least 24 hours in advance. Late cancellations may result in forfeiture of the session fee.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">6. Code of Conduct</h3>
                        <p>Users must:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Treat coaches and other users with respect</li>
                            <li>Provide accurate information</li>
                            <li>Follow safety guidelines</li>
                            <li>Not share account access</li>
                            <li>Not misuse our services</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">7. Intellectual Property</h3>
                        <p>All content, features, and functionality of our services are owned by Elite Soccer Blueprint and are protected by copyright, trademark, and other intellectual property laws.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">8. Limitation of Liability</h3>
                        <p>Elite Soccer Blueprint shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">9. Disclaimers</h3>
                        <p>Our services are provided "as is" without warranties of any kind. Users participate in physical activities at their own risk and should consult healthcare providers before starting any exercise program.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">10. Changes to Terms</h3>
                        <p>We reserve the right to modify these terms at any time. Users will be notified of significant changes.</p>
                    </section>
                </div>
            </Modal>

            <Modal 
                show={showAccessibility} 
                onClose={() => setShowAccessibility(false)} 
                title="Accessibility Statement"
            >
                <div className="space-y-6 text-gray-700">
                    <p className="text-sm text-gray-500">Last updated: February 13, 2025</p>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">Our Commitment</h3>
                        <p>Elite Soccer Blueprint is committed to ensuring digital accessibility for people of all abilities. We aim to continually improve the user experience and apply relevant accessibility standards.</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">Accessibility Features</h3>
                        <p>Our website includes the following accessibility features:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Screen reader compatibility</li>
                            <li>Keyboard navigation</li>
                            <li>Alt text for images</li>
                            <li>Clear headings and structure</li>
                            <li>Sufficient color contrast</li>
                            <li>Resizable text</li>
                            <li>Consistent navigation</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">Assistance</h3>
                        <p>If you experience any difficulty accessing our website or services, please contact us at:</p>
                        <p>Email: accessibility@elitesoccerblueprint.com<br />
                        Phone: [Your Phone Number]</p>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold">Standards</h3>
                        <p>We strive to meet WCAG 2.1 Level AA standards and regularly test our website to ensure compliance. Our team actively works to maintain and improve these standards:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Regular accessibility audits</li>
                            <li>User feedback incorporation</li>
                            <li>Ongoing staff training</li>
                            <li>Commitment to continuous improvement</li>
                        </ul>
                    </section>
                </div>
            </Modal>
        </>
    );
};

export default Footer;