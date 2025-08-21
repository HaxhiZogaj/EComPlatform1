import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate
import { login } from '../../Services/AuthService/AuthApi';
import './login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSubmit = async () => {
    try {
      const response = await login(email, password);
      if (response.data.isSuccess) {
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate('/'); 
      } else {
        alert(response.data.errors?.join(", ") || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error during login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
