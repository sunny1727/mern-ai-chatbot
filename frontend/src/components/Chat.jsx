import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Chat = () => {
    const [prompt, setPrompt] = useState('');
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const scrollRef = useRef(null);
    const API_URL = "https://mern-ai-chatbot-sunny1727.onrender.com/api";
    const token = localStorage.getItem('token');

    const copyIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
    const checkIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10a37f" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>;

    useEffect(() => {
        const fetchHistory = async () => {
            try { const res = await axios.get(`${API_URL}/chat/history`, { headers: { Authorization: token } }); setHistory(res.data); }
            catch (err) { console.log(err); }
        };
        fetchHistory();
    }, []);

    useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history, loading]);

    const handleChat = async (e) => {
        e.preventDefault();
        if (!prompt) return;
        const cur = prompt; setPrompt(''); setLoading(true);
        setHistory(p => [...p, { prompt: cur, response: '...' }]);
        try {
            const res = await axios.post(`${API_URL}/chat`, { prompt: cur }, { headers: { Authorization: token } });
            setHistory(p => { const n = [...p]; n[n.length - 1] = res.data; return n; });
        } catch (err) { alert("AI error!"); }
        setLoading(false);
    };

    const clearHistory = async () => {
        if (window.confirm("Start a new chat? Your current conversation history will be deleted.")) {
            await axios.delete(`${API_URL}/chat/clear`, { headers: { Authorization: token } });
            setHistory([]); setIsSidebarOpen(false);
        }
    };

    return (
        <div className="app-container">
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div>
                <h2 className="animated-title" style={{fontSize: '22px', textAlign: 'center'}}>SUNNY AI PRO</h2>
                <button onClick={clearHistory} className="side-btn delete-btn">+ New Chat</button>
                <button onClick={() => {localStorage.clear(); window.location.href='/login'}} className="side-btn">Logout</button>
                </div>
                <div className="side-dev-name"> 
                    <span style={{color: '#8e8ea0', fontSize: '12px'}}>Developed by:</span><br/>
                    <strong className="animated-title" style={{fontSize: '18px',display: 'block',marginTop: '3px'}}>SUNNY SINGH</strong>
                </div>
            </div>
            {isSidebarOpen && <div className="menu-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
            <div className="chat-main">
                <div className="mobile-header">
                    <button onClick={(e) => {e.stopPropagation(); setIsSidebarOpen(true)}} style={{background:'none', border:'none', cursor:'pointer'}}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                    <div className="animated-title" style={{fontSize: '16px', margin: '0 auto'}}>SUNNY AI PRO</div>
                    <div style={{width: '24px'}}></div>
                </div>

                <div className="chat-history">
                    {history.map((chat, i) => (
                        <div key={i}>
                            <div className="message-row user">
                                <div className="message-content">
                                    <div className="avatar" style={{background: '#5436da'}}>U</div>
                                    <div className="text-content">{chat.prompt}</div>
                                </div>
                            </div>
                            <div className="message-row ai">
                                <div className="message-content">
                                    <div className="avatar" style={{background: '#10a37f'}}>AI</div>
                                    <div className="text-content">
                                        <ReactMarkdown>{chat.response}</ReactMarkdown>
                                        {chat.response !== '...' && 
                                            <button className="icon-copy-btn" onClick={() => {navigator.clipboard.writeText(chat.response); setCopiedIndex(i); setTimeout(()=>setCopiedIndex(null), 2000)}}>
                                                {copiedIndex === i ? checkIcon : copyIcon}
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && <div className="message-row ai"><div className="message-content"><div className="avatar" style={{background: '#10a37f'}}>AI</div><div className="text-content">Thinking...</div></div></div>}
                    <div ref={scrollRef} />
                </div>

                <div className="input-area">
                    <form className="input-wrapper" onSubmit={handleChat}>
                        <input className="chat-input" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Message Sunny AI..." />
                        <button className="send-btn" type="submit" disabled={loading}>➤</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Chat;