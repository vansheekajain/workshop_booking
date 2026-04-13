import React, { useState, useEffect } from 'react';
import { profileAPI, helpers } from '../../services/api';

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState({
        name: 'John Doe',
        initials: 'JD',
        role: 'Institution Coordinator',
        institution: 'National Institute of Technology',
        email: 'john.doe@nit.edu',
        workshopsOrganized: 12,
        joinedDate: 'January 2022',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '',
        department: '',
        state: '',
        title: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const result = await helpers.fetchWithErrorHandling(
                () => profileAPI.getProfile()
            );
            
            if (result.success && result.data) {
                const profile = result.data;
                const user = profile.user || {};
                
                const newUserInfo = {
                    name: user.get_full_name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'User',
                    initials: `${(user.first_name?.[0] || 'U')}${(user.last_name?.[0] || 'U')}`.toUpperCase(),
                    role: profile.position === 'coordinator' ? 'Institution Coordinator' : 'Instructor',
                    institution: profile.institute || 'Not specified',
                    email: user.email || 'user@example.com',
                    workshopsOrganized: profile.workshop_count || 0,
                    joinedDate: user.date_joined ? new Date(user.date_joined).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recently',
                    firstName: user.first_name || '',
                    lastName: user.last_name || '',
                    phoneNumber: profile.phone_number || '',
                    department: profile.department || '',
                    state: profile.state || '',
                    title: profile.title || ''
                };
                setUserInfo(newUserInfo);
                setEditData(newUserInfo);
            }
        } catch (err) {
            console.error('Failed to fetch profile:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditData(userInfo);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({});
    };

    const handleInputChange = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);
            
            const profileData = {
                first_name: editData.firstName,
                last_name: editData.lastName,
                phone_number: editData.phoneNumber,
                institute: editData.institution,
                department: editData.department,
                state: editData.state,
                title: editData.title
            };

            console.log('Sending profile data:', profileData);

            const result = await helpers.fetchWithErrorHandling(
                () => profileAPI.updateProfile(profileData)
            );

            console.log('Profile update result:', result);

            if (result.success) {
                console.log('Profile update successful, refetching profile...');
                // Refetch the profile to ensure all data is correct
                await fetchProfile();
                setIsEditing(false);
                alert('Profile updated successfully!');
            } else {
                console.error('Save failed:', result.error);
                alert(`Failed to update profile: ${result.error}`);
            }
        } catch (err) {
            console.error('Failed to save profile:', err);
            alert('Error saving profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="page-section w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {isEditing ? (
                // Edit Mode
                <div className="glass-card rounded-[2rem] p-8 overflow-hidden">
                    <h2 className="text-3xl font-medium tracking-tight text-slate-900 drop-shadow-sm mb-8">Edit Profile</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                            <input
                                type="text"
                                value={editData.firstName || ''}
                                onChange={(e) => handleInputChange('firstName', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-lg border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all"
                                placeholder="First Name"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                            <input
                                type="text"
                                value={editData.lastName || ''}
                                onChange={(e) => handleInputChange('lastName', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-lg border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all"
                                placeholder="Last Name"
                            />
                        </div>

                        {/* Email (Read-only) */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email (Read-only)</label>
                            <input
                                type="email"
                                value={editData.email || ''}
                                disabled
                                className="w-full px-4 py-2.5 bg-white/30 backdrop-blur-sm rounded-lg border border-white/60 text-slate-600 cursor-not-allowed opacity-60"
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                value={editData.phoneNumber || ''}
                                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-lg border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all"
                                placeholder="Phone Number"
                            />
                        </div>

                        {/* Institution */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Institution</label>
                            <input
                                type="text"
                                value={editData.institution || ''}
                                onChange={(e) => handleInputChange('institution', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-lg border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all"
                                placeholder="Institution"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                            <input
                                type="text"
                                value={editData.department || ''}
                                onChange={(e) => handleInputChange('department', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-lg border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all"
                                placeholder="Department"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={editData.title || ''}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-lg border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all"
                                placeholder="Title (Dr., Prof., etc.)"
                            />
                        </div>

                        {/* State */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                            <input
                                type="text"
                                value={editData.state || ''}
                                onChange={(e) => handleInputChange('state', e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/50 backdrop-blur-sm rounded-lg border border-white/60 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#04a9cf] transition-all"
                                placeholder="State"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8 pt-8 border-t border-slate-300/40">
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex-1 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-br from-[#004a9f] to-[#04a9cf] hover:brightness-110 disabled:opacity-60 transition-all shadow-lg border-0"
                        >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                            onClick={handleCancel}
                            className="flex-1 glass-button px-6 py-3 rounded-xl text-sm font-medium text-slate-800 border border-white/60 hover:bg-white/20 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                // View Mode
                <div className="glass-card rounded-[2rem] overflow-hidden">
                {/* Cover Banner */}
                <div className="h-40 bg-gradient-to-br from-[#004a9f]/80 to-[#04a9cf]/80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[4px]"></div>
                    {/* Decorative abstract blobs inside banner */}
                    <div className="absolute top-0 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 right-10 w-40 h-40 bg-blue-300/30 rounded-full blur-2xl"></div>
                </div>
                
                <div className="px-10 pb-10 relative">
                    <div className="-mt-14 mb-8 flex justify-between items-end">
                        <div className="w-28 h-28 rounded-3xl bg-white/40 p-1.5 shadow-xl backdrop-blur-md border border-white/80">
                            <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#004a9f] to-[#04a9cf] flex items-center justify-center text-white text-4xl font-medium shadow-inner">
                                {userInfo.initials}
                            </div>
                        </div>
                        <button 
                            onClick={handleEditClick}
                            className="glass-button px-6 py-2.5 rounded-xl text-sm font-medium text-slate-800 shadow-sm border border-white/60 hover:bg-white/20 transition-all"
                        >
                            Edit Profile
                        </button>
                    </div>
                    
                    <h2 className="text-3xl font-medium tracking-tight text-slate-900 drop-shadow-sm">{userInfo.name}</h2>
                    <p className="text-base font-light text-slate-600 mb-8 mt-1">{userInfo.role} at {userInfo.institution}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-8 border-t border-slate-300/40 relative">
                        <div className="glass-inner p-5 rounded-2xl border-white/60 bg-white/30 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500 block mb-2">Email Address</span>
                            <span className="text-base font-normal text-slate-900">{userInfo.email}</span>
                        </div>
                        <div className="glass-inner p-5 rounded-2xl border-white/60 bg-white/30 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500 block mb-2">Account Role</span>
                            <span className="text-base font-normal text-slate-900">{userInfo.role}</span>
                        </div>
                        <div className="glass-inner p-5 rounded-2xl border-white/60 bg-white/30 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500 block mb-2">Workshops Organized</span>
                            <span className="text-base font-normal text-slate-900">{userInfo.workshopsOrganized}</span>
                        </div>
                        <div className="glass-inner p-5 rounded-2xl border-white/60 bg-white/30 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500 block mb-2">Joined Date</span>
                            <span className="text-base font-normal text-slate-900">{userInfo.joinedDate}</span>
                        </div>
                        <div className="glass-inner p-5 rounded-2xl border-white/60 bg-white/30 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500 block mb-2">Department</span>
                            <span className="text-base font-normal text-slate-900">{userInfo.department || 'Not specified'}</span>
                        </div>
                        <div className="glass-inner p-5 rounded-2xl border-white/60 bg-white/30 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500 block mb-2">Title</span>
                            <span className="text-base font-normal text-slate-900">{userInfo.title || 'Not specified'}</span>
                        </div>
                        <div className="glass-inner p-5 rounded-2xl border-white/60 bg-white/30 backdrop-blur-md">
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500 block mb-2">State</span>
                            <span className="text-base font-normal text-slate-900">{userInfo.state || 'Not specified'}</span>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default ProfilePage;
