import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Send, Bot, X, MessageSquare, Loader2 } from 'lucide-react';
import { createLocalSession, sendMessageToLocalAI } from '../services/localAIService';
import { AppContext } from '../App';
const AIChat = ({ museumName, museumContext }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef(null);
    const messagesEndRef = useRef(null);
    const { language, uiLabels: labels } = useContext(AppContext);
    // Reset chat when museum or language changes to ensure fresh context/greeting
    useEffect(() => {
        if (isOpen) {
            // Re-initialize session with potentially new language name, although service is English based for logic
            chatSessionRef.current = createLocalSession(museumName, museumContext);
            // Add localized greeting
            const greetingText = labels.initialGreeting.replace('{museum}', museumName);
            setMessages([{
                role: 'model',
                text: greetingText,
                timestamp: Date.now()
            }]);
        }
    }, [isOpen, museumName, museumContext, language, labels.initialGreeting]);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const handleSend = async () => {
        if (!inputText.trim() || !chatSessionRef.current)
            return;
        const userMsg = { role: 'user', text: inputText, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);
        try {
            // Note: The local AI service logic is currently hardcoded to English regex. 
            // Fully localizing the NLP logic would require a more complex setup.
            const responseText = await sendMessageToLocalAI(chatSessionRef.current, userMsg.text);
            setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: Date.now() }]);
        }
        catch {
            setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble processing that right now.", timestamp: Date.now() }]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter')
            handleSend();
    };
    return (_jsxs("div", {
        className: "fixed bottom-6 right-6 z-40 flex flex-col items-end", children: [isOpen && (_jsxs("div", {
            className: "bg-slate-800 border border-slate-700 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden animate-float", children: [_jsxs("div", { className: "bg-gradient-to-r from-amber-600 to-amber-500 p-4 flex justify-between items-center text-slate-900", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bot, { size: 20, className: "text-slate-900" }), _jsx("h3", { className: "font-bold", children: labels.aiHeader })] }), _jsx("button", { onClick: () => setIsOpen(false), className: "hover:bg-amber-700/20 rounded-full p-1 transition", children: _jsx(X, { size: 20 }) })] }), _jsxs("div", {
                className: "flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50", children: [messages.map((msg, idx) => (_jsx("div", {
                    className: `flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`, children: _jsx("div", {
                        className: `max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                            ? 'bg-amber-500 text-slate-900 rounded-tr-none'
                            : 'bg-slate-700 text-slate-100 rounded-tl-none'}`, children: msg.text
                    })
                }, idx))), isLoading && (_jsx("div", { className: "flex justify-start", children: _jsxs("div", { className: "bg-slate-700 p-3 rounded-2xl rounded-tl-none flex items-center gap-2", children: [_jsx(Loader2, { size: 16, className: "animate-spin text-amber-400" }), _jsx("span", { className: "text-xs text-slate-400", children: labels.processing })] }) })), _jsx("div", { ref: messagesEndRef })]
            }), _jsxs("div", { className: "p-3 bg-slate-800 border-t border-slate-700 flex gap-2", children: [_jsx("input", { type: "text", value: inputText, onChange: (e) => setInputText(e.target.value), onKeyDown: handleKeyPress, placeholder: labels.chatPlaceholder, className: "flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors" }), _jsx("button", { onClick: handleSend, disabled: isLoading || !inputText.trim(), className: "bg-amber-500 hover:bg-amber-600 disabled:bg-slate-700 disabled:text-slate-500 text-slate-900 p-2 rounded-full transition-colors", children: _jsx(Send, { size: 18 }) })] })]
        })), !isOpen && (_jsxs("button", { onClick: () => setIsOpen(true), className: "bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-3 rounded-full shadow-lg shadow-amber-500/20 flex items-center gap-2 font-bold transition-all hover:scale-105", children: [_jsx(MessageSquare, { size: 20 }), _jsx("span", { children: labels.askCurator })] }))]
    }));
};
export default AIChat;
