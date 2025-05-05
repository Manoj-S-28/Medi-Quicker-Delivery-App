// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Icon from "../../../components/AppIcon";

// const RegistrationForm = () => {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [showAddressFields, setShowAddressFields] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     agreeToTerms: false
//   });
//   const [errors, setErrors] = useState({});
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const newValue = type === "checkbox" ? checked : value;
    
//     setFormData({
//       ...formData,
//       [name]: newValue
//     });

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors({
//         ...errors,
//         [name]: ""
//       });
//     }

//     // Calculate password strength
//     if (name === "password") {
//       calculatePasswordStrength(value);
//     }
//   };

//   const calculatePasswordStrength = (password) => {
//     let strength = 0;
    
//     if (password.length >= 8) strength += 1;
//     if (/[A-Z]/.test(password)) strength += 1;
//     if (/[0-9]/.test(password)) strength += 1;
//     if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
//     setPasswordStrength(strength);
//   };

//   const getStrengthLabel = () => {
//     switch (passwordStrength) {
//       case 0:
//         return "Very Weak";
//       case 1:
//         return "Weak";
//       case 2:
//         return "Medium";
//       case 3:
//         return "Strong";
//       case 4:
//         return "Very Strong";
//       default:
//         return "";
//     }
//   };

//   const getStrengthColor = () => {
//     switch (passwordStrength) {
//       case 0:
//         return "bg-error-600";
//       case 1:
//         return "bg-error-600";
//       case 2:
//         return "bg-warning-500";
//       case 3:
//         return "bg-success-600";
//       case 4:
//         return "bg-success-600";
//       default:
//         return "bg-neutral-300";
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = "Full name is required";
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }
    
//     if (!formData.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
//       newErrors.phone = "Phone number must be 10 digits";
//     }
    
//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 8) {
//       newErrors.password = "Password must be at least 8 characters";
//     }
    
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Please confirm your password";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//     }
    
//     if (showAddressFields) {
//       if (!formData.address.trim()) {
//         newErrors.address = "Address is required";
//       }
      
//       if (!formData.city.trim()) {
//         newErrors.city = "City is required";
//       }
      
//       if (!formData.state.trim()) {
//         newErrors.state = "State is required";
//       }
      
//       if (!formData.zipCode.trim()) {
//         newErrors.zipCode = "ZIP code is required";
//       }
//     }
    
//     if (!formData.agreeToTerms) {
//       newErrors.agreeToTerms = "You must agree to the terms and privacy policy";
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       console.log("Form submitted successfully", formData);
//       // In a real app, you would send this data to your API
//       navigate("/user-dashboard");
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div className="text-center mb-8">
//         <h1 className="text-2xl font-display font-bold text-neutral-800 mb-2">Create Your Account</h1>
//         <p className="text-neutral-600">Join MediQuick for fast medicine delivery</p>
//       </div>
      
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Full Name */}
//         <div>
//           <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1">
//             Full Name
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//               <Icon name="User" size={18} />
//             </div>
//             <input
//               type="text" id="fullName" name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               className={`pl-10 pr-4 py-2 w-full border ${errors.fullName ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//               placeholder="John Doe"
//             />
//           </div>
//           {errors.fullName && <p className="mt-1 text-sm text-error-600">{errors.fullName}</p>}
//         </div>
        
//         {/* Email */}
//         <div>
//           <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
//             Email Address
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//               <Icon name="Mail" size={18} />
//             </div>
//             <input
//               type="email" id="email" name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className={`pl-10 pr-4 py-2 w-full border ${errors.email ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//               placeholder="your.email@example.com"
//             />
//           </div>
//           {errors.email && <p className="mt-1 text-sm text-error-600">{errors.email}</p>}
//         </div>
        
//         {/* Phone */}
//         <div>
//           <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
//             Phone Number
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//               <Icon name="Phone" size={18} />
//             </div>
//             <input
//               type="tel" id="phone" name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className={`pl-10 pr-4 py-2 w-full border ${errors.phone ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//               placeholder="(123) 456-7890"
//             />
//           </div>
//           {errors.phone && <p className="mt-1 text-sm text-error-600">{errors.phone}</p>}
//         </div>
        
//         {/* Password */}
//         <div>
//           <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//               <Icon name="Lock" size={18} />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password" name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`pl-10 pr-10 py-2 w-full border ${errors.password ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//               placeholder="••••••••"
//             />
//             <button
//               type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
//             </button>
//           </div>
//           {errors.password && <p className="mt-1 text-sm text-error-600">{errors.password}</p>}
          
//           {/* Password strength indicator */}
//           {formData.password && (
//             <div className="mt-2">
//               <div className="flex justify-between items-center mb-1">
//                 <span className="text-xs text-neutral-600">Password Strength:</span>
//                 <span className={`text-xs font-medium ${
//                   passwordStrength <= 1 ? 'text-error-600' : passwordStrength === 2 ?'text-warning-500': 'text-success-600'
//                 }`}>
//                   {getStrengthLabel()}
//                 </span>
//               </div>
//               <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
//                 <div 
//                   className={`h-full ${getStrengthColor()}`} 
//                   style={{ width: `${passwordStrength * 25}%` }}
//                 ></div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {/* Confirm Password */}
//         <div>
//           <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">
//             Confirm Password
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//               <Icon name="Lock" size={18} />
//             </div>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               id="confirmPassword" name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`pl-10 pr-10 py-2 w-full border ${errors.confirmPassword ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//               placeholder="••••••••"
//             />
//             <button
//               type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
//             </button>
//           </div>
//           {errors.confirmPassword && <p className="mt-1 text-sm text-error-600">{errors.confirmPassword}</p>}
//         </div>
        
//         {/* Address Toggle */}
//         <div>
//           <button
//             type="button" className="flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm"
//             onClick={() => setShowAddressFields(!showAddressFields)}
//           >
//             <Icon name={showAddressFields ? "ChevronDown" : "ChevronRight"} size={18} className="mr-1" />
//             {showAddressFields ? "Hide Address Details" : "Add Delivery Address"}
//           </button>
//         </div>
        
//         {/* Address Fields (Conditional) */}
//         {showAddressFields && (
//           <div className="space-y-4 pt-2 pb-2 border-t border-b border-neutral-200">
//             {/* Street Address */}
//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
//                 Street Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//                   <Icon name="MapPin" size={18} />
//                 </div>
//                 <input
//                   type="text" id="address" name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className={`pl-10 pr-4 py-2 w-full border ${errors.address ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//                   placeholder="123 Main Street, Apt 4B"
//                 />
//               </div>
//               {errors.address && <p className="mt-1 text-sm text-error-600">{errors.address}</p>}
//             </div>
            
//             {/* City, State, ZIP grid */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
//                   City
//                 </label>
//                 <input
//                   type="text" id="city" name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className={`px-4 py-2 w-full border ${errors.city ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//                   placeholder="New York"
//                 />
//                 {errors.city && <p className="mt-1 text-sm text-error-600">{errors.city}</p>}
//               </div>
              
//               <div>
//                 <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
//                   State
//                 </label>
//                 <input
//                   type="text" id="state" name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className={`px-4 py-2 w-full border ${errors.state ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//                   placeholder="NY"
//                 />
//                 {errors.state && <p className="mt-1 text-sm text-error-600">{errors.state}</p>}
//               </div>
//             </div>
            
//             {/* ZIP Code */}
//             <div>
//               <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
//                 ZIP Code
//               </label>
//               <input
//                 type="text" id="zipCode" name="zipCode"
//                 value={formData.zipCode}
//                 onChange={handleChange}
//                 className={`px-4 py-2 w-full border ${errors.zipCode ? 'border-error-600' : 'border-neutral-300'} rounded-lg focus:ring-primary-500 focus:border-primary-500`}
//                 placeholder="10001"
//               />
//               {errors.zipCode && <p className="mt-1 text-sm text-error-600">{errors.zipCode}</p>}
//             </div>
//           </div>
//         )}
        
//         {/* Terms and Conditions */}
//         <div className="flex items-start">
//           <div className="flex items-center h-5">
//             <input
//               id="agreeToTerms" name="agreeToTerms" type="checkbox"
//               checked={formData.agreeToTerms}
//               onChange={handleChange}
//               className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
//             />
//           </div>
//           <div className="ml-3 text-sm">
//             <label htmlFor="agreeToTerms" className="text-neutral-600">
//               I agree to the <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">Privacy Policy</a>
//             </label>
//             {errors.agreeToTerms && <p className="mt-1 text-sm text-error-600">{errors.agreeToTerms}</p>}
//           </div>
//         </div>
        
//         {/* Submit Button */}
//         <button
//           type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-300 flex items-center justify-center"
//         >
//           Create Account
//           <Icon name="ArrowRight" size={18} className="ml-2" />
//         </button>
        
//         {/* Login Link */}
//         <div className="text-center mt-4">
//           <p className="text-neutral-600">
//             Already have an account?{" "}
//             <Link to="/login-page" className="text-primary-600 hover:text-primary-700 font-medium">
//               Login
//             </Link>
//           </p>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (registerSuccess) setRegisterSuccess(false);
  };

  const validateRegister = () => {
    const newErrors = {};
    const { fullName, email, mobile, address, password, confirmPassword } = registerData;
    
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Valid email is required';
    if (!mobile.trim()) newErrors.mobile = 'Mobile is required';
    else if (!/^\d{10}$/.test(mobile)) newErrors.mobile = 'Mobile must be 10 digits';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be 6+ characters';
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="MediQuick" className="h-16 mx-auto" />
          <h2 className="text-2xl font-bold mt-4">Create an Account</h2>
          <p className="text-gray-600 mt-2">Join MediQuick to manage your medications</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {registerSuccess && (
            <div className="p-3 text-sm text-green-700 bg-green-100 rounded-md flex items-center">
              <Icon name="CheckCircle" size={18} className="mr-2" />
              Registration successful! <Link to="/login" className="ml-1 text-green-800 font-medium">Login now</Link>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={registerData.fullName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="John Doe"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={registerData.mobile}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="9876543210"
            />
            {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={registerData.address}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Your full address"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="At least 6 characters"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Re-enter your password"
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${isSubmitting ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Icon name="Loader" className="animate-spin mr-2" size={18} />
                Registering...
              </span>
            ) : 'Register'}
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
      </div>
    </div>
  );
};

export default RegisterPage;