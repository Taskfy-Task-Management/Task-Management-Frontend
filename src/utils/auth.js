import jwt_decode from 'jwt-decode';

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserIdFromToken = () => {
  if (typeof window === 'undefined') {
    console.log('Server-side rendering; no localStorage available.');
    return null;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found in localStorage.');
    return null;
  }

  try {
    const base64Payload = token.split('.')[1]; // Extract the payload part
    const decodedPayload = JSON.parse(atob(base64Payload)); // Decode Base64 and parse JSON
    console.log('Manually decoded token:', decodedPayload);
    return decodedPayload.sub; // Extract the `sub` field as the userId
  } catch (error) {
    console.error('Error manually decoding token:', error);
    return null;
  }
};
