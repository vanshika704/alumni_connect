import api from './axios';

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData, role, file) => {
  const formData = new FormData();

  // 1. Append fields
  Object.keys(userData).forEach((key) => {
    const value = userData[key];
    if (value === null || value === undefined) return; // Skip nulls

    if (key === 'milestones' && Array.isArray(value)) {
      formData.append(key, JSON.stringify(value));
    } else if (Array.isArray(value) || typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  // 2. Append Role
  formData.append('role', role.toLowerCase());

  // 3. Append File based on Role
  if (file) {
    if (role === 'Student') {
      formData.append('studentIdCardImage', file);
    } else if (role === 'Alumni') {
      formData.append('idCardImage', file);
    }
  }

  // 4. Send Request
  const response = await api.post('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};