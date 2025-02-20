import React, { useState, useEffect } from 'react';
import { useCoachProfile } from '../hooks/useCoachProfile';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageCropper from '../components/ImageCropper';

const PendingApprovalPage = () => {
    const { user } = useAuth();
    const { 
        profile, 
        loading: profileLoading, 
        updateProfile, 
        uploadProfilePicture, 
        fetchProfile,
        loading: submitLoading, 
        error: submitError 
    } = useCoachProfile();

    // Track original and current form data
    const [originalData, setOriginalData] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        position: '',
        graduation_year: '',
        eligibility_class: '',
        hometown: '',
        profile_picture: null,
        profile_picture_url: ''
    });
    const [changedFields, setChangedFields] = useState(new Set());
    const [submitting, setSubmitting] = useState(false);
    const [showCropper, setShowCropper] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // Initialize form with profile data
    useEffect(() => {
        if (profile) {
            const initialData = {
                first_name: profile.first_name || '',
                last_name: profile.last_name || '',
                phone_number: profile.phone || '',
                position: profile.position || '',
                graduation_year: profile.grad_year || '',
                eligibility_class: profile.eligibility_class || '',
                hometown: profile.hometown || '',
                profile_picture_url: profile.profile_picture_url || ''
            };
            setFormData(initialData);
            setOriginalData(initialData);
            if (profile.profile_picture_url) {
                setPreviewImage(profile.profile_picture_url);
            }
        }
    }, [profile]);

    if (profileLoading) return <LoadingSpinner />;
    
    // If user is already approved, redirect to dashboard
    if (user?.status === 'active') {
        return <Navigate to="/dashboard" />;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Track changed fields
        if (value !== originalData?.[name]) {
            setChangedFields(prev => new Set(prev).add(name));
        } else {
            setChangedFields(prev => {
                const newSet = new Set(prev);
                newSet.delete(name);
                return newSet;
            });
        }
    };

    const getFieldWrapperClassName = (fieldName) => {
        const isCompleted = originalData?.[fieldName] && !changedFields.has(fieldName);
        return isCompleted ? "relative" : "";
    };

    const getFieldClassName = (fieldName) => {
        return "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary";
    };

    const CompletedCheckmark = () => (
        <div className="absolute right-0 top-0 -mt-2 -mr-2 bg-green-500 rounded-full p-1">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        </div>
    );

    const FormField = ({ label, name, type = "text", ...props }) => {
        const isCompleted = originalData?.[name] && !changedFields.has(name);
        
        return (
            <div className={getFieldWrapperClassName(name)}>
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="relative">
                    <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className={getFieldClassName(name)}
                        required
                        {...props}
                    />
                    {isCompleted && (
                        <div className="absolute inset-0 rounded-md bg-green-50 bg-opacity-50 pointer-events-none">
                            <CompletedCheckmark />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const FormSelect = ({ label, name, options, ...props }) => {
        const isCompleted = originalData?.[name] && !changedFields.has(name);
        
        return (
            <div className={getFieldWrapperClassName(name)}>
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <div className="relative">
                    <select
                        name={name}
                        value={formData[name]}
                        onChange={handleInputChange}
                        className={getFieldClassName(name)}
                        required
                        {...props}
                    >
                        {options}
                    </select>
                    {isCompleted && (
                        <div className="absolute inset-0 rounded-md bg-green-50 bg-opacity-50 pointer-events-none">
                            <CompletedCheckmark />
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData(prev => ({
            ...prev,
            profile_picture: file
        }));
    };

    const handleCroppedImage = async (file) => {
        try {
            const pictureUrl = await uploadProfilePicture(file);
            setFormData(prev => ({
                ...prev,
                profile_picture_url: pictureUrl
            }));
            setPreviewImage(URL.createObjectURL(file));
            setShowCropper(false);
            setChangedFields(prev => new Set(prev).add('profile_picture_url'));
        } catch (err) {
            console.error('Failed to upload profile picture:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const profileData = {
                ...formData,
                profile_picture: undefined
            };
            
            await updateProfile(profileData);
            await fetchProfile();
            setChangedFields(new Set());
        } catch (err) {
            console.error('Failed to update profile:', err);
        } finally {
            setSubmitting(false);
        }
    };

    const hasChanges = changedFields.size > 0;

    const renderProfilePictureSection = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Profile Picture</h2>
            <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <i className="fas fa-user text-gray-400 text-4xl" />
                    )}
                </div>
                <button
                    type="button"
                    onClick={() => setShowCropper(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                    {previewImage ? 'Change Picture' : 'Add Picture'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold mb-2">Complete Your Profile</h1>
                        <p className="text-gray-600">
                            Your account is pending approval. Please complete your profile information to expedite the review process.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Personal Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    label="First Name"
                                    name="first_name"
                                />
                                <FormField
                                    label="Last Name"
                                    name="last_name"
                                />
                                <FormField
                                    label="Phone Number"
                                    name="phone_number"
                                    type="tel"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={user?.email || ''}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Athletic Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    label="Position"
                                    name="position"
                                />
                                <FormField
                                    label="Graduation Year"
                                    name="graduation_year"
                                    type="number"
                                    min="2000"
                                    max="2030"
                                />
                                <FormSelect
                                    label="Eligibility Class"
                                    name="eligibility_class"
                                    options={
                                        <>
                                            <option value="">Select Class</option>
                                            <option value="Freshman">Freshman</option>
                                            <option value="Sophomore">Sophomore</option>
                                            <option value="Junior">Junior</option>
                                            <option value="Senior">Senior</option>
                                            <option value="Graduate">Graduate</option>
                                        </>
                                    }
                                />
                                <FormField
                                    label="Hometown"
                                    name="hometown"
                                />
                            </div>
                        </div>

                        {renderProfilePictureSection()}

                        {submitError && (
                            <div className="text-red-600 text-sm">
                                {submitError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitting || !hasChanges}
                            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? 'Submitting...' : hasChanges ? 'Save Changes' : 'No Changes to Save'}
                        </button>
                    </form>
                </div>
            </div>

            {showCropper && (
                <ImageCropper
                    onCroppedImage={handleCroppedImage}
                    onClose={() => setShowCropper(false)}
                />
            )}
        </div>
    );
};

export default PendingApprovalPage; 