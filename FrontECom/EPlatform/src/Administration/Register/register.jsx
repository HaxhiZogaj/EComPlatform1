import { useState } from 'react';
import { register } from '../../Services/AuthService/AuthApi';
import './register.css';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await register(fullName, email, password);
      if (response.data.isSuccess) {
        alert("Registration successful!");
      } else {
        alert(response.data.errors?.join(", ") || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Error during registration");
    }
    console.log("Registration data:",response.data);
  };

  return (
    <div>
      <h2>Register</h2>
      <input 
        type="text" 
        placeholder="Full Name" 
        value={fullName} 
        onChange={(e) => setFullName(e.target.value)} 
      />
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
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}
