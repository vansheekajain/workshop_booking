/**
 * API Service Layer
 * Handles all communication with Django backend
 * Uses native Fetch API (no need for axios)
 */

const BACKEND_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API_URL = `${BACKEND_URL}/api`;

// Helper to get CSRF token
const getCsrfToken = () => {
  const name = 'csrftoken';
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

// Generic fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add CSRF token for non-GET requests
  if (options.method && options.method !== 'GET') {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Include cookies
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    // Handle no content response
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Authentication APIs
 */
export const authAPI = {
  login: (username, password) =>
    fetchAPI(`${BACKEND_URL}/workshop/login/`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    fetchAPI(`${BACKEND_URL}/workshop/logout/`, { method: 'POST' }),

  register: (userData) =>
    fetchAPI(`${BACKEND_URL}/workshop/register/`, {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getCurrentUser: () =>
    fetchAPI(`${BACKEND_URL}/workshop/view_profile/`),
};

/**
 * Workshop APIs
 */
export const workshopAPI = {
  // Get workshops for coordinator
  getCoordinatorWorkshops: () =>
    fetchAPI(`${BACKEND_URL}/workshop/status`),

  // Get workshops for instructor (dashboard)
  getInstructorWorkshops: () =>
    fetchAPI(`${BACKEND_URL}/workshop/dashboard`),

  // Get workshop details
  getWorkshopDetails: (workshopId) =>
    fetchAPI(`${BACKEND_URL}/workshop/details/${workshopId}`),

  // Get workshop types list
  getWorkshopTypes: () =>
    fetchAPI(`${BACKEND_URL}/workshop/types/`),

  // Get workshop type details
  getWorkshopTypeDetails: (typeId) =>
    fetchAPI(`${BACKEND_URL}/workshop/type_details/${typeId}`),

  // Accept workshop (instructor)
  acceptWorkshop: (workshopId) =>
    fetchAPI(`${BACKEND_URL}/workshop/accept_workshop/${workshopId}`, {
      method: 'POST',
    }),

  // Propose new workshop
  proposeWorkshop: (workshopData) =>
    fetchAPI(`${BACKEND_URL}/workshop/propose/`, {
      method: 'POST',
      body: JSON.stringify(workshopData),
    }),

  // Change workshop date
  changeWorkshopDate: (workshopId, newDate) =>
    fetchAPI(`${BACKEND_URL}/workshop/change_workshop_date/${workshopId}`, {
      method: 'POST',
      body: JSON.stringify({ date: newDate }),
    }),
};

/**
 * Statistics APIs
 */
export const statisticsAPI = {
  // Get public statistics
  getPublicStats: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return fetchAPI(`${BACKEND_URL}/statistics/public?${params}`);
  },

  // Get team statistics
  getTeamStats: (teamId = null) => {
    const url = teamId 
      ? `${BACKEND_URL}/statistics/team?team_id=${teamId}`
      : `${BACKEND_URL}/statistics/team`;
    return fetchAPI(url);
  },

  // Get profile statistics
  getProfileStats: () =>
    fetchAPI(`${BACKEND_URL}/statistics/profile_stats/`),

  // Get dashboard statistics
  getDashboardStats: () =>
    fetchAPI(`${BACKEND_URL}/api/statistics/dashboard/`),
};

/**
 * Profile APIs
 */
export const profileAPI = {
  // Get current user profile
  getProfile: async () => {
    const url = `${BACKEND_URL}/workshop/view_profile/`;
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
    };
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  // Get public profile
  getPublicProfile: (userId) =>
    fetchAPI(`${BACKEND_URL}/workshop/view_profile/${userId}`),

  // Update profile - sends form-encoded data for Django compatibility
  updateProfile: async (profileData) => {
    const url = `${BACKEND_URL}/workshop/view_profile/`;
    
    // Create FormData for form-encoded submission
    const formData = new FormData();
    formData.append('first_name', profileData.first_name || '');
    formData.append('last_name', profileData.last_name || '');
    formData.append('phone_number', profileData.phone_number || '');
    formData.append('institute', profileData.institute || '');
    formData.append('department', profileData.department || '');
    formData.append('state', profileData.state || '');
    formData.append('title', profileData.title || '');
    
    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      console.warn('CSRF token not found - profile update may fail');
    }
    
    const headers = {
      'X-CSRFToken': csrfToken || '',
      'X-Requested-With': 'XMLHttpRequest',
    };
    
    console.log('Updating profile at:', url);
    console.log('CSRF Token:', csrfToken ? 'Present' : 'Missing');
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers,
        credentials: 'include',
      });
      
      console.log('Profile update response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'No error details');
        console.error('Profile update error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText || 'Profile update failed'}`);
      }
      
      // Try to parse JSON, but accept redirect/success even without JSON response
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        console.log('Profile updated successfully (no JSON response)');
        return { success: true };
      }
    } catch (error) {
      console.error('Profile update error:', error.message);
      throw error;
    }
  },
};

/**
 * Helper functions
 */
export const helpers = {
  // Fetch with error handling
  fetchWithErrorHandling: async (fetchFn) => {
    try {
      const data = await fetchFn();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Check if user is authenticated (checks for session)
  isAuthenticated: () => {
    return document.cookie.includes('sessionid');
  },

  // Format workshop data for display
  formatWorkshop: (workshop) => {
    return {
      id: workshop.id,
      title: workshop.workshop_type?.name || 'Workshop',
      instructor: workshop.instructor?.get_full_name || 'TBA',
      coordinator: workshop.coordinator?.get_full_name || 'TBA',
      date: workshop.date,
      duration: workshop.duration || 'TBA',
      location: workshop.location || 'Virtual',
      status: workshop.status,
      capacity: {
        current: workshop.participants_registered || 0,
        total: workshop.max_participants || 50,
      },
    };
  },

  // Get status badge color
  getStatusColor: (status) => {
    const statusMap = {
      0: 'pending', // Pending
      1: 'completed', // Approved
      2: 'rejected', // Rejected
    };
    return statusMap[status] || 'pending';
  },

  // Get workshop status text
  getStatusText: (status) => {
    const statusMap = {
      0: 'Pending',
      1: 'Approved',
      2: 'Rejected',
    };
    return statusMap[status] || 'Unknown';
  },
};

export { fetchAPI };
export default {
  authAPI,
  workshopAPI,
  statisticsAPI,
  profileAPI,
  helpers,
};
