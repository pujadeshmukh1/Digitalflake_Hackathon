import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);

  const validateForm = () => {
    // Simple email validation
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      alert('Please enter a valid email address');
      return false;
    }

    // Simple password validation
    if (!form.password || form.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return false;
    }

    return true;
  };

  const handleOnClick = async (e) => {
    e.preventDefault();

    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      // Simulate API call
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({ email: form.email, password: form.password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Authentication FAILED');
      }

      const data = await response.json();
      const token = data.token;
      console.log(form);
      console.log('user logged in with token', token);

      // Redirect to the dashboard upon successful login
      navigate('dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordPopup(true);
  };

  const closeForgotPasswordPopup = () => {
    setShowForgotPasswordPopup(false);
  };

  return (
    <div className='flex bg-[#eef0ff] ml-1 items-center min-h-screen bg-cover bg-center' style={{ backgroundImage: 'url("./img/image1.png")' }}>
      <div className=''>
      
          <div className='bg-white pb-12 pt-10 w-[650px] mt-5 ml-10 shadow-md p-6 rounded-md w-96'>
            <div className='flex mx-28 justify-center'>
              <img className='' src="./img/image2.png" alt="" />
            </div>

            <p className="text-[#717070] text-center mb-2 text-[32px]">Welcome to Digitalflake Admin</p>
            <form>
              <div className='mx-5 mt-10'>
              <div className="mb-5">
                <label htmlFor='formBasicEmail' className='font-normal  block text-[25px] leading-4 not-italic font-medium text-gray-700'>
                  Email address
                </label>
                <input
                  type="email"
                  className='mt-1 p-2 w-full border rounded-md'
                  id="formBasicEmail"
                  placeholder="Enter email"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label htmlFor='formBasicPassword' className='font-normal block text-[25px] leading-4 not-italic font-medium text-gray-700 mt-10'>
                  Password
                </label>
                <input
                  type="password"
                  className='mt-1 p-2 w-full border rounded-md'
                  id="formBasicPassword"
                  placeholder="Password"
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>
              <div className='flex justify-end'>
                <p className='text-[#5C218B] cursor-pointer' onClick={handleForgotPasswordClick}>
                  Forgot Password?
                </p>
              </div>

              <button type="submit" className='bg-[#5C218B] mt-24 shadow-md text-white w-full mt-24 py-2 rounded-md' onClick={handleOnClick}>
                
                Log In
              </button>
              </div>
            </form>
          </div>
        </div>
      
      {showForgotPasswordPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white px-10 py-5 rounded-md">
            <div className=''>
              <p className='text-[#662671] text-center text-xl font-Poppins font-semibold leading-normal'>Did you forget your password?</p>
              <p className='text-center font-Poppins font-semibold leading-normal text-[#655A5A]'>Enter your email address and well send you a link to restore password</p>
            </div>
            <div className='mx-10 mt-4'>
            <p className='font-Poppins leading-normal text-[17px] text-[#676767]'>Email Address</p>
            <input type="text" className='border 1px px-32 py-2 rounded-md solid transferent border-redius-[5px]' />
           
            </div>
            <div className='w-full px-10 mt-5'>
              <button className='w-full py-2 rounded bg-[#5C218B]'>
                Request reset link
              </button>
            
            </div>
            <div className='flex justify-center mt-4'>
            <button className="text-[#5C218B] underline cursor-pointer" onClick={closeForgotPasswordPopup}>
              Back to Login
            </button>
            </div>
            
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
