import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const[resetLoading,setResetLoading]=useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [canResend, setCanResend] = useState(true);

  const handleSendOtp = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BASEURL}/auth/forgot-password`, { email });
      setMessage('OTP sent to your email!');
      setOtpSent(true);
      setCanResend(false);
      setTimeout(() => setCanResend(true), 30000); // 30-second cooldown
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setResetLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_BASEURL}/auth/reset-password`, {
        email,
        otp,
        newPassword
      });
      
      setMessage('Password reset successfully! You can now login with your new password.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {(message || error) && (
            <div className={`mb-4 p-3 rounded-md text-sm ${
              message ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {message || error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    disabled={otpSent}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={!canResend || loading || otpSent}
                  className="h-[42px] px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 
                   otpSent ? 'Sent!' : 
                   canResend ? 'Send OTP' : 'Resend'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm tracking-widest"
                  maxLength={6}
                  disabled={!otpSent}
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={!otpSent}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Minimum 8 characters
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !otpSent}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {resetLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
            >
              Remember your password? Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;