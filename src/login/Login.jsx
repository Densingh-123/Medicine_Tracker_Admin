import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import './Login.css'; // Import the updated CSS file

const firebaseConfig = {
  apiKey: "AIzaSyC_8esGfDo0R91xwRkyO5teQ2i5dZth9Dg",
  authDomain: "medicine-tracker-a9c6f.firebaseapp.com",
  projectId: "medicine-tracker-a9c6f",
  storageBucket: "medicine-tracker-a9c6f.appspot.com",
  messagingSenderId: "566257166281",
  appId: "1:566257166281:web:eb875643515e01fddf2a18",
  measurementId: "G-1YVYZDTRHC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const App = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), { name, email });
      alert('Registration successful!');
      navigate('/home'); // Navigate after successful registration
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/home'); // Navigate after successful login
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
      });
      alert('Google Sign-In successful!');
      navigate('/home'); // Navigate after successful Google login
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <div className="image-side">
        <img src="https://c8.alamy.com/comp/2XHXTX3/digital-healthcare-illustration-a-woman-in-a-wheelchair-schedules-medication-reminders-on-her-smartphone-the-convenience-of-mobile-health-apps-vector-illustration-2XHXTX3.jpg" alt="Beautiful" />
      </div>
      <div className="form-side">
        <h1>{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
        <p className="subtitle">
          {isLogin ? 'Login to continue' : 'Sign up to get started'}
        </p>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="primary-btn">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="divider">
          <span>OR</span>
        </div>
        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTBKa4AW-ADa6QApUii0HsbfEalrLCPEf_gg&s"
            alt="Google Logo"
          />
          Sign in with Google
        </button>
        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;
