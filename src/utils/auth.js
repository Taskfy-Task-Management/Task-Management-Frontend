import jwt_decode from 'jwt-decode';

/**
 * Checks whether the user is authenticated.
 * 
 * @returns {boolean} `true` if the user is authenticated (i.e., a token exists in localStorage), otherwise `false`.
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Retrieves the user ID from the stored JWT token.
 * Decodes the token manually and extracts the `sub` field.
 * 
 * @returns {number|null} The user ID (`sub` field in the token payload) if the token exists and is valid, otherwise `null`.
 */
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
