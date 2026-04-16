import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const API_URL = "http://localhost:5000/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { await axios.post(`${API_URL}/auth/signup`, form); alert("Account Created!"); navigate('/login'); }
        catch (err) { alert("Username taken!"); }
    };

    return (
        <div className="auth-container">
            <div className="top-nav-line"></div>
            <div className="auth-card-wrapper">
                <div className="auth-card">
                    <h2 className="animated-title" style={{fontSize: '38px', marginBottom: '25px'}}>REGISTER</h2>
                    <form onSubmit={handleSubmit}>
                        <input className="auth-input" type="text" placeholder="Username" required onChange={e => setForm({...form, username: e.target.value})} />
                        <input className="auth-input" type="password" placeholder="Password" required onChange={e => setForm({...form, password: e.target.value})} />
                        <button className="auth-btn" type="submit">SIGN UP</button>
                    </form>
                    <p style={{marginTop: '25px', fontSize: '13px', color: '#94a3b8'}}>Already a member? <Link to="/login" style={{color: '#fff', fontWeight: 'bold'}}>Login</Link></p>
                    <div className="animated-title" style={{fontSize: '11px', marginTop: '20px', letterSpacing: '2px'}}>CREATED BY SUNNY SINGH</div>
                </div>
            </div>
        </div>
    );
};
export default Signup;