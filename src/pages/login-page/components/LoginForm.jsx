// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Icon from "../../../components/AppIcon";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   // Mock credentials
//   const mockCredentials = {
//     user: { email: "user@mediquick.com", password: "user123" },
//     admin: { email: "admin@mediquick.com", password: "admin123" },
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
    
//     // Clear errors when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: "",
//       });
//     }
    
//     // Clear login error when user changes input
//     if (loginError) {
//       setLoginError("");
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Email validation
//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email address is invalid";
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       setIsSubmitting(true);
      
//       // Simulate API call with timeout
//       setTimeout(() => {
//         // Check credentials
//         if (formData.email === mockCredentials.user.email && 
//             formData.password === mockCredentials.user.password) {
//           navigate("/user-dashboard");
//         } else if (formData.email === mockCredentials.admin.email && 
//                   formData.password === mockCredentials.admin.password) {
//           navigate("/admin-dashboard");
//         } else {
//           setLoginError("Invalid email or password. Please try again.");
//         }
//         setIsSubmitting(false);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="w-full max-w-md">
//       <div className="mb-8">
//         <h2 className="text-2xl font-display font-bold text-neutral-800 mb-2">Welcome back</h2>
//         <p className="text-neutral-600">Sign in to your account to continue</p>
//       </div>
      
//       {loginError && (
//         <div className="mb-6 p-4 bg-error-100 border border-error-600 text-error-600 rounded-lg flex items-start">
//           <Icon name="AlertCircle" size={20} className="mr-2 mt-0.5 flex-shrink-0" />
//           <span>{loginError}</span>
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
//             Email
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Icon name="Mail" size={18} className="text-neutral-500" />
//             </div>
//             <input
//               type="email" id="email" name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`pl-10 pr-4 py-2 w-full border ${
//                 errors.email ? "border-error-600" : "border-neutral-300"
//               } rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//               placeholder="your@email.com" aria-describedby={errors.email ?"email-error" : undefined}
//             />
//           </div>
//           {errors.email && (
//             <p id="email-error" className="mt-1 text-sm text-error-600">
//               {errors.email}
//             </p>
//           )}
//         </div>
        
//         <div className="mb-6">
//           <div className="flex justify-between items-center mb-1">
//             <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
//               Password
//             </label>
//             <a href="#" className="text-sm text-primary-600 hover:text-primary-700">
//               Forgot Password?
//             </a>
//           </div>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <Icon name="Lock" size={18} className="text-neutral-500" />
//             </div>
//             <input
//               type="password" id="password" name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`pl-10 pr-4 py-2 w-full border ${
//                 errors.password ? "border-error-600" : "border-neutral-300"
//               } rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//               placeholder="••••••••" aria-describedby={errors.password ?"password-error" : undefined}
//             />
//           </div>
//           {errors.password && (
//             <p id="password-error" className="mt-1 text-sm text-error-600">
//               {errors.password}
//             </p>
//           )}
//         </div>
        
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center">
//             <input
//               id="rememberMe" name="rememberMe" type="checkbox"
//               checked={formData.rememberMe}
//               onChange={handleChange}
//               className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
//             />
//             <label htmlFor="rememberMe" className="ml-2 block text-sm text-neutral-700">
//               Remember me
//             </label>
//           </div>
//         </div>
        
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center"
//         >
//           {isSubmitting ? (
//             <>
//               <Icon name="Loader" size={20} className="animate-spin mr-2" />
//               Signing in...
//             </>
//           ) : (
//             "Sign in"
//           )}
//         </button>
        
//         <div className="mt-6 text-center">
//           <p className="text-neutral-600">
//             Don't have an account?{" "}
//             <a href="/registration-page" className="font-medium text-primary-600 hover:text-primary-700">
//               Register now
//             </a>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Icon from '../../../components/AppIcon'; // Reuse your Icon component

// const UnifiedLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     identifier: '',
//     password: '',
//     rememberMe: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [loginError, setLoginError] = useState('');

//   const mockCredentials = {
//     user: { email: 'user@mediquick.com', password: 'user123' },
//     admin: { email: 'admin@mediquick.com', password: 'admin123' },
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
//     if (loginError) setLoginError('');
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.identifier) {
//       newErrors.identifier = 'Email or User ID is required';
//     } else if (!formData.identifier.includes('@') && !/^MQU\d+$/.test(formData.identifier)) {
//       newErrors.identifier = 'Enter a valid email or user ID';
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setIsSubmitting(true);

//     setTimeout(() => {
//       const { identifier, password } = formData;
//       if (identifier === mockCredentials.user.email && password === mockCredentials.user.password) {
//         localStorage.setItem('userToken', 'mock-user-token');
//         localStorage.setItem('userRole', 'user');
//         navigate('/user-dashboard');
//       } else if (identifier === mockCredentials.admin.email && password === mockCredentials.admin.password) {
//         localStorage.setItem('adminToken', 'mock-admin-token');
//         localStorage.setItem('userRole', 'admin');
//         navigate('/admin-dashboard');
//       } else {
//         setLoginError('Invalid credentials. Please try again.');
//       }
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
//       <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
//         <div className="text-center">
//           <img src="/logo.png" alt="Medi-Quick" className="h-16 mx-auto mb-4" />
//           <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back</h2>
//           <p className="mt-2 text-sm text-gray-600">Access your medical delivery account</p>
//         </div>

//         {loginError && (
//           <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md flex items-center">
//             <Icon name="AlertCircle" size={18} className="mr-2" />
//             {loginError}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
//               User ID or Email
//             </label>
//             <input
//               type="text"
//               id="identifier"
//               name="identifier"
//               placeholder="MQU1001 or user@mediquick.com"
//               value={formData.identifier}
//               onChange={handleChange}
//               className={`mt-1 block w-full px-3 py-2 border ${
//                 errors.identifier ? 'border-red-500' : 'border-gray-300'
//               } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//             />
//             {errors.identifier && (
//               <p className="text-sm text-red-600 mt-1">{errors.identifier}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               className={`mt-1 block w-full px-3 py-2 border ${
//                 errors.password ? 'border-red-500' : 'border-gray-300'
//               } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
//             />
//             {errors.password && (
//               <p className="text-sm text-red-600 mt-1">{errors.password}</p>
//             )}
//           </div>

//           <div className="flex justify-between items-center">
//             <label className="flex items-center text-sm">
//               <input
//                 type="checkbox"
//                 name="rememberMe"
//                 checked={formData.rememberMe}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               />
//               <span className="ml-2 text-gray-900">Remember me</span>
//             </label>
//             <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//               isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {isSubmitting ? (
//               <>
//                 <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
//                 </svg>
//                 Signing in...
//               </>
//             ) : (
//               'Sign In'
//             )}
//           </button>
//         </form>

//         <div className="text-center text-sm mt-4">
//           <p className="text-gray-600">
//             Don't have an account?{' '}
//             <Link to="/user/register" className="text-blue-600 hover:text-blue-500 font-medium">
//               Register here
//             </Link>
//           </p>
//           <p className="mt-2">
//             <Link to="/admin/login" className="text-gray-500 hover:text-gray-700">
//               Are you staff? Admin login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnifiedLogin;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Icon from '../../../components/AppIcon';

// const AuthPage = () => {
//   const navigate = useNavigate();
//   const [isLoginMode, setIsLoginMode] = useState(true);
//   const [loginData, setLoginData] = useState({ identifier: '', password: '', rememberMe: false });
//   const [registerData, setRegisterData] = useState({
//     fullName: '',
//     email: '',
//     mobile: '',
//     address: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [loginError, setLoginError] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const mockCredentials = {
//     user: { email: 'user@mediquick.com', password: 'user123' },
//     admin: { email: 'admin@mediquick.com', password: 'admin123' },
//   };

//   const handleChange = (e, isLogin) => {
//     const { name, value, type, checked } = e.target;
//     if (isLogin) {
//       setLoginData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
//       if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
//     } else {
//       setRegisterData((prev) => ({ ...prev, [name]: value }));
//       if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//     if (loginError) setLoginError('');
//   };

//   const validateLogin = () => {
//     const newErrors = {};
//     if (!loginData.identifier) newErrors.identifier = 'Email or User ID is required';
//     if (!loginData.password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateRegister = () => {
//     const newErrors = {};
//     const { fullName, email, mobile, address, password, confirmPassword } = registerData;
//     if (!fullName) newErrors.fullName = 'Full name is required';
//     if (!email.includes('@')) newErrors.email = 'Valid email is required';
//     if (!mobile.match(/^\d{10}$/)) newErrors.mobile = 'Mobile must be 10 digits';
//     if (!address) newErrors.address = 'Address is required';
//     if (password.length < 6) newErrors.password = 'Password must be 6+ characters';
//     if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (!validateLogin()) return;
//     setIsSubmitting(true);

//     setTimeout(() => {
//       const { identifier, password } = loginData;
//       if (identifier === mockCredentials.user.email && password === mockCredentials.user.password) {
//         localStorage.setItem('userToken', 'mock-user-token');
//         localStorage.setItem('userRole', 'user');
//         navigate('/user-dashboard');
//       } else if (identifier === mockCredentials.admin.email && password === mockCredentials.admin.password) {
//         localStorage.setItem('adminToken', 'mock-admin-token');
//         localStorage.setItem('userRole', 'admin');
//         navigate('/admin-dashboard');
//       } else {
//         setLoginError('Invalid credentials. Please try again.');
//       }
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (!validateRegister()) return;

//     const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
//     const newUser = { ...registerData, id: `MQU${Date.now()}` };
//     users.push(newUser);
//     localStorage.setItem('registeredUsers', JSON.stringify(users));

//     alert('Registration successful! You can now log in.');
//     setIsLoginMode(true);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
//       <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
//         <div className="text-center mb-6">
//           <img src="/logo.png" alt="MediQuick" className="h-16 mx-auto" />
//           <div className="mt-4 flex justify-center space-x-4">
//             <button
//               onClick={() => setIsLoginMode(true)}
//               className={`px-4 py-2 rounded-md ${isLoginMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               Login
//             </button>
//             <button
//               onClick={() => setIsLoginMode(false)}
//               className={`px-4 py-2 rounded-md ${!isLoginMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//             >
//               Register
//             </button>
//           </div>
//         </div>

//         {isLoginMode ? (
//           <form onSubmit={handleLogin} className="space-y-5">
//             {loginError && (
//               <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md flex items-center">
//                 <Icon name="AlertCircle" size={18} className="mr-2" />
//                 {loginError}
//               </div>
//             )}
//             <div>
//               <label className="text-sm font-medium">User ID or Email</label>
//               <input
//                 type="text"
//                 name="identifier"
//                 value={loginData.identifier}
//                 onChange={(e) => handleChange(e, true)}
//                 className={`w-full p-2 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded`}
//               />
//               {errors.identifier && <p className="text-sm text-red-600">{errors.identifier}</p>}
//             </div>

//             <div>
//               <label className="text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={loginData.password}
//                 onChange={(e) => handleChange(e, true)}
//                 className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
//               />
//               {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
//             </div>

//             <button
//               type="submit"
//               className={`w-full py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Signing in...' : 'Sign In'}
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleRegister} className="space-y-4">
//             <div>
//               <label className="text-sm font-medium">Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={registerData.fullName}
//                 onChange={(e) => handleChange(e, false)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
//             </div>

//             <div>
//               <label className="text-sm font-medium">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={registerData.email}
//                 onChange={(e) => handleChange(e, false)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="text-sm font-medium">Mobile</label>
//               <input
//                 type="text"
//                 name="mobile"
//                 value={registerData.mobile}
//                 onChange={(e) => handleChange(e, false)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
//             </div>

//             <div>
//               <label className="text-sm font-medium">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={registerData.address}
//                 onChange={(e) => handleChange(e, false)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
//             </div>

//             <div>
//               <label className="text-sm font-medium">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={registerData.password}
//                 onChange={(e) => handleChange(e, false)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
//             </div>

//             <div>
//               <label className="text-sm font-medium">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 value={registerData.confirmPassword}
//                 onChange={(e) => handleChange(e, false)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               />
//               {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Register
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [loginData, setLoginData] = useState({ identifier: '', password: '', rememberMe: false });
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, isLogin) => {
    const { name, value, type, checked } = e.target;
    if (isLogin) {
      setLoginData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    } else {
      setRegisterData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (loginError) setLoginError('');
    if (registerSuccess) setRegisterSuccess(false);
  };

  const validateLogin = () => {
    const newErrors = {};
    if (!loginData.identifier) newErrors.identifier = 'Email or User ID is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    const { fullName, email, mobile, address, password, confirmPassword } = registerData;
    
    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Valid email is required';
    if (!mobile) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    if (!address) newErrors.address = 'Address is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be 6+ characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsSubmitting(true);

    // Check credentials against registered users
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = registeredUsers.find(
      (user) => (user.email === loginData.identifier || user.id === loginData.identifier) && 
                user.password === loginData.password
    );
    setTimeout(() => {
      if (user) {
        localStorage.setItem('userToken', `user-token-${Date.now()}`);
        localStorage.setItem('userRole', 'user');
        localStorage.setItem('userData', JSON.stringify({
          name: user.fullName,
          email: user.email,
          id: user.id
        }));
        navigate('/home');
      } else {
        setLoginError('Invalid credentials. Please try again.');
      }
      setIsSubmitting(false);
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateRegister()) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
      
      // Check if email already exists
      if (users.some(user => user.email === registerData.email)) {
        setErrors({ email: 'Email already registered' });
        setIsSubmitting(false);
        return;
      }

      const newUser = { 
        ...registerData,
        id: `MQU${Date.now()}`,
        // Remove confirmPassword before storing
      };
      
      // Remove confirmPassword from the stored object
      const { confirmPassword, ...userToStore } = newUser;
      
      users.push(userToStore);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Reset form and show success
      setRegisterData({
        fullName: '',
        email: '',
        mobile: '',
        address: '',
        password: '',
        confirmPassword: '',
      });
      setRegisterSuccess(true);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-xl p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
        <Icon name="Stethoscope" size={28} className=" text-primary-600 h-14 mx-auto  flex justify-center " />
          <h3 className="h-14 mx-auto mt-4 flex justify-center text-primary-700 font-bold " >
          Medi-Quicker
          </h3>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`px-4 py-2 rounded-md ${isLoginMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`px-4 py-2 rounded-md ${!isLoginMode ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              Register
            </button>
          </div>
        </div>

        {isLoginMode ? (
          <form onSubmit={handleLogin} className="space-y-5">
            {loginError && (
              <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md flex items-center">
                <Icon name="AlertCircle" size={18} className="mr-2" />
                {loginError}
              </div>
            )}
            
            {registerSuccess && (
              <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md flex items-center">
                <Icon name="CheckCircle" size={18} className="mr-2" />
                Registration successful! Please login with your credentials.
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="text"
                name="identifier"
                value={loginData.identifier}
                onChange={(e) => handleChange(e, true)}
                className={`w-full p-2 border ${errors.identifier ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your registered email"
              />
              {errors.identifier && <p className="text-sm text-red-600">{errors.identifier}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={(e) => handleChange(e, true)}
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your password"
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={loginData.rememberMe}
                onChange={(e) => handleChange(e, true)}
                className="mr-2"
              />
              <label className="text-sm">Remember me</label>
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button type="button" className="text-blue-600 hover:text-blue-800 font-medium" onClick={() => setIsLoginMode(false)}>
                  Register
                </button>
              </p>
              </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            {registerSuccess && (
              <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md flex items-center">
                <Icon name="CheckCircle" size={18} className="mr-2" />
                Registration successful! You can now login.
              </div>
            )}

            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={registerData.fullName}
                onChange={(e) => handleChange(e, false)}
                className={`w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your full name"
              />
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={(e) => handleChange(e, false)}
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={registerData.mobile}
                onChange={(e) => handleChange(e, false)}
                className={`w-full p-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter 10-digit mobile number"
              />
              {errors.mobile && <p className="text-sm text-red-600">{errors.mobile}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={registerData.address}
                onChange={(e) => handleChange(e, false)}
                className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter your address"
              />
              {errors.address && <p className="text-sm text-red-600">{errors.address}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={(e) => handleChange(e, false)}
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Enter password (6+ characters)"
              />
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={registerData.confirmPassword}
                onChange={(e) => handleChange(e, false)}
                className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded-md text-white ${isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button type="button" className="text-blue-600 hover:text-blue-800 font-medium" onClick={() => setIsLoginMode(true)}>
              Login
              </button>
              {/* <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link> */}
            </p>
          </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;