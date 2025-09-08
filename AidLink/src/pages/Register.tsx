import type React from "react";
import { useState, type FormEvent } from "react";
import type { RegisterProps } from "../types/auth.types";

import { FaFacebookMessenger, FaMapMarkedAlt } from "react-icons/fa";
import Logo from "../components/Logo";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { registerUser } from "../api/user.api";

// Error messages interface
interface ErrorProps {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  checkbox?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterProps>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    checkbox: false
  });

  const [error, setError] = useState<ErrorProps>({});
  const navigate = useNavigate();

   const mutation = useMutation<AxiosResponse, AxiosError, RegisterProps>({
        mutationFn: registerUser,
        onSuccess: (response) => {
            navigate("/verify-otp", { 
               state: { 
               email: formData.email, 
               token: response.data.token 
               } 
            });
         },
        onError: (e) => {
            if(e.response){
                console.log('Error response data:', e.response.data);
                console.log('Error status:', e.response.status);
            }
        }
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    setError(prev => ({ ...prev, [name]: "" }));
  };

  const validateForms = () => {
    const newErrors: ErrorProps = {};

    // Full name validation
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    // Email validation
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Please enter valid email";

    // Password validation
    if (!formData.password) newErrors.password = "Password is required";
    else {
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(formData.password)) newErrors.password = "Password must be 8+ chars, include uppercase, lowercase, number, and special character";
    }

    // Confirm password validation
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm your password.";
    else if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match.";

    // Role validation
    if (!formData.role) newErrors.role = "Please select a role";

    // Checkbox validation
    if (!formData.checkbox) newErrors.checkbox = "Please agree to the terms and privacy policy";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForms()) return;
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row rounded-2xl shadow-xl overflow-hidden bg-white">
        {/* Left Column - Features Showcase with Background Image */}
        <div className="w-full lg:w-2/5 text-white p-8 flex flex-col justify-center relative overflow-hidden">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-[var(--primary-color)]/20 z-10"></div>
            <div className="mb-8">
               <Logo isName={true} />
            </div>
          <div className="relative z-20 max-w-md mx-auto">
            {/* <h2 className="text-3xl font-bold mb-6 text-[var(--primary-color)]">Join Us</h2> */}
            <p className="text-gray-700 mb-8 text-lg">
              Register now to access health camps and find camps in your area.
            </p>
            
            {/* Feature 1: Map Viewing */}
            <div className="mb-8 flex items-start">
              <div className="bg-[var(--primary-light)] rounded-xl p-3 mr-4 flex-shrink-0">
                  <FaMapMarkedAlt className="w-6 h-6"/>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary-light)]">View Camps on Map</h3>
                <p className="text-gray-700">Find health camps near you with our interactive map interface.</p>
              </div>
            </div>
            
            {/* Feature 2: First Aid Chatbot */}
            <div className="flex items-start">
              <div className="bg-[var(--primary-light)] rounded-xl p-3 mr-4 flex-shrink-0">
                <FaFacebookMessenger className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-[var(--primary-light)]">First Aid Chatbot</h3>
                <p className="text-gray-700">Get immediate assistance with our AI-powered first aid guidance system.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <div className="w-full lg:w-3/5 p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-2">Join us as a Local Body or Regular User</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-base font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                name="fullName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {error.fullName && (<span className="text-sm text-red-500"> {error.fullName} </span>)}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && (<span className="text-sm text-red-500"> {error.email} </span>)}
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-base font-medium text-gray-700 mb-1">
                I want to join as
              </label>
              <select
                id="role"
                name="role"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="user">Normal User</option>
                <option value="local_body">Local Body / Organization</option>
              </select>
              {error.role && (<span className="text-sm text-red-500"> {error.role} </span>)}
              
              {/* Role description */}
              {formData.role === 'local_body' && (
                <p className=" text-sm text-[var(--secondary-color)] mt-2 pt-2 rounded-lg">
                  As a Local Body, you'll be able to create and manage health camps in your area.
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {error.password && (<span className="text-sm text-red-500"> {error.password} </span>)}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {error.confirmPassword && (<span className="text-sm text-red-500"> {error.confirmPassword} </span>)}
            </div>

            {/* Checkbox */}
            <div>
              <div className="flex items-center">
                <input
                  id="checkbox"
                  name="checkbox"
                  checked={formData.checkbox as boolean}
                  onChange={handleChange}
                  type="checkbox"
                  className="h-4 w-4 text-blue-700 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="checkbox" className="ml-2 block text-base text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="font-medium hover:underline cursor-pointer">
                    Terms and Conditions
                  </a> {" "} and  {" "}
                  <a href="#" className="font-medium hover:underline cursor-pointer">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {error.checkbox && (<span className="text-sm text-red-500"> {error.checkbox} </span>)}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-[var(--primary-color)]
                hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-color)] transition ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {mutation.isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering ...
                </>
              ) : `Register as ${formData.role === 'local_body' ? 'Local Body' : 'User'}`}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-base text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-color)]">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;