import axios from 'axios';//axios is used to make HTTP requests to APIs (like GET, POST, PUT, DELETE).

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL || 'http://localhost:5000',//
    withCredentials: true  // 👈 Add this line
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
/*
baseURL: This sets a base URL that will be prepended to all requests. 
So if you call api.get('/users'), 
it actually goes to http://localhost:5000/users or whatever is in VITE_API_URL.

What it does: Adds a "request interceptor" — a function that runs before any request is sent.
Purpose: Attach a token (if available) to every request.
localStorage.getItem('token'): Fetches a token (usually set when the user logs in).
If a token is found, it sets the Authorization header to Bearer <token>.
Bearer token: A way to securely tell the server "this user is authenticated."
If there’s an error in setting up the request, it’s caught and rejected.

What it does: Adds a "response interceptor" — runs after receiving a response.
If the server returns a 401 (Unauthorized) error:
That usually means the token is invalid or expired.
So, we clear the token from local storage.
Then redirect the user to the login page.
Fallback: Any error is passed on with Promise.reject().
*/ 