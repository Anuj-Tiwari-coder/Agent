import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [userMsg, setUserMsg] = useState("");
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

<<<<<<< HEAD
    const API_URL = "https://backend-nine-ruby-89.vercel.app";
=======
    const API_URL = "backend-nine-ruby-89.vercel.app";
>>>>>>> a35345bc1a88163496148b17d33df7fca9927ea7

    const sendMessage = async () => {
        if (!userMsg.trim()) return;

        const newMsg = { user: userMsg };
        const updatedMessages = [...messages, newMsg];
        setMessages(updatedMessages);
        setUserMsg("");
        setLoading(true);

        try {
            const context = updatedMessages.slice(-100);

            const res = await axios.post(`${API_URL}/api/chat`, {
                message: userMsg,
                context,
            });

            const botMsg = { bot: res.data.response };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { bot: "⚠️ Error: Unable to reach server." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    useEffect(() => {
        const saved = localStorage.getItem("ai_chat_messages");
        if (saved) setMessages(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("ai_chat_messages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div
            className={`w-screen h-screen flex items-center justify-center ${darkMode ? "bg-black text-white" : "bg-white text-black"} transition-all duration-300`}
        >
            <div
                className={`w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl backdrop-blur-md bg-white/5 dark:bg-black/20 shadow-2xl border border-white/10 overflow-hidden`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                    <h1 className="text-2xl font-semibold">🧠 Gemini AI </h1>
                    <button
                        onClick={() => setDarkMode((prev) => !prev)}
                        className="px-4 py-1 text-sm font-medium rounded-lg transition bg-blue-600 text-white hover:bg-blue-700"
                    >
                        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {messages.map((m, i) => (
                        <div
                            key={i}
                            className={`flex ${m.user ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${m.user
                                    ? "bg-blue-600 text-white rounded-br-none"
                                    : "bg-gray-200 dark:bg-gray-800 dark:text-white text-black rounded-bl-none"
                                    }`}
                            >
                                {m.user || m.bot}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex justify-start">
                            <div className="px-4 py-3 rounded-2xl bg-gray-300 dark:bg-gray-700 shadow-sm text-sm">
                                Gemini is thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-white/10 px-6 py-4 bg-transparent">
                    <div className="flex gap-2">
                        <input
                            value={userMsg}
                            onChange={(e) => setUserMsg(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask me anything..."
                            className={`flex-1 px-4 py-2 rounded-xl bg-white/10 dark:bg-black/20 backdrop-blur text-white placeholder-gray-300 outline-none border border-white/20 focus:ring-2 focus:ring-blue-400`}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className={`px-4 py-2 rounded-xl transition ${loading
                                ? "bg-blue-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                                } text-white`}
                        >
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
