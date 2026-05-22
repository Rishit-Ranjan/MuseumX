import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { INITIAL_MUSEUMS, LANGUAGE_NAMES } from '../constants';
import { Plus, Trash2, Lock, X, User } from 'lucide-react';
import { Language } from 'C:\\Users\\Asus\\OneDrive\\Documents\\epics_project\\museumx\\types.js';
const Admin = () => {
    const { isAdmin, toggleAdmin, museums, addMuseum, language, uiLabels: labels } = useContext(AppContext);
    const navigate = useNavigate();
    // Login State
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    // English Form State Only
    const [nameEn, setNameEn] = useState('');
    const [locationEn, setLocationEn] = useState('');
    const [shortDescEn, setShortDescEn] = useState('');
    const [descEn, setDescEn] = useState('');
    const handleLogin = (e) => {
        e.preventDefault();
        // Robust check: Username AND Password required
        if (username === 'admin' && password === 'admin123') {
            toggleAdmin();
            setLoginError('');
            setPassword('');
            setUsername('');
        }
        else {
            setLoginError('Invalid credentials');
        }
    };
    const handleClose = () => {
        navigate('/');
    };
    const handleAdd = (e) => {
        e.preventDefault();
        if (!nameEn || !locationEn)
            return;
        // Create a new museum entry
        const mockMuseum = {
            id: `custom-${Date.now()}`,
            name: { [Language.ENGLISH]: nameEn, [Language.HINDI]: nameEn },
            location: { [Language.ENGLISH]: locationEn, [Language.HINDI]: locationEn },
            shortDescription: {
                [Language.ENGLISH]: shortDescEn || 'Newly added museum.',
                [Language.HINDI]: shortDescEn || 'Newly added museum.'
            },
            description: {
                [Language.ENGLISH]: descEn || 'No description provided.',
                [Language.HINDI]: descEn || 'No description provided.'
            },
            image: `https://picsum.photos/800/600?random=${Date.now()}`,
            features: INITIAL_MUSEUMS[0].features,
            highlights: INITIAL_MUSEUMS[0].highlights,
            coordinates: { lat: 23.25, lng: 77.40 },
            galleryImages: [{
                url: `https://picsum.photos/800/600?random=${Date.now() + 1}`,
                title: { [Language.ENGLISH]: 'New Exhibit', [Language.HINDI]: 'New Exhibit' },
                description: { [Language.ENGLISH]: 'Description', [Language.HINDI]: 'Description' },
                artist: { [Language.ENGLISH]: 'Artist', [Language.HINDI]: 'Artist' },
                date: '2024',
                medium: { [Language.ENGLISH]: 'Digital', [Language.HINDI]: 'Digital' }
            }]
        };
        addMuseum(mockMuseum);
        // Reset form
        setNameEn('');
        setLocationEn('');
        setShortDescEn('');
        setDescEn('');
        alert('Museum added! Content will be translated automatically when language is switched.');
    };
    return (_jsx("div", {
        className: "relative min-h-screen", children: !isAdmin ? (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx("div", { className: "absolute inset-0 bg-slate-950/80 backdrop-blur-xl", children: _jsx("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.05),transparent_60%)]" }) }), _jsxs("div", { className: "bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full relative z-10 animate-zoom-in", children: [_jsx("button", { onClick: handleClose, className: "absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-700/50 hover:bg-slate-600 rounded-full p-2 transition-all", "aria-label": "Close", children: _jsx(X, { size: 20 }) }), _jsx("div", { className: "w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 shadow-inner", children: _jsx(Lock, { size: 32 }) }), _jsx("h2", { className: "text-2xl font-bold text-white mb-2 text-center", children: labels.adminPanel }), _jsx("p", { className: "text-slate-400 mb-6 text-center text-sm", children: labels.accessRestricted }), _jsxs("form", { onSubmit: handleLogin, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-3.5 text-slate-500", size: 18 }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), className: "w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:border-amber-500 focus:outline-none placeholder-slate-500 transition-colors", placeholder: "Username", autoFocus: true })] }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "absolute left-3 top-3.5 text-slate-500", size: 18 }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "w-full bg-slate-900 border border-slate-600 rounded-lg p-3 pl-10 text-white focus:border-amber-500 focus:outline-none placeholder-slate-500 transition-colors", placeholder: "Password" })] })] }), loginError && _jsx("p", { className: "text-red-400 text-sm font-medium text-center bg-red-500/10 p-2 rounded", children: loginError }), _jsx("button", { type: "submit", className: "w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-amber-500/20 mt-2", children: labels.loginAdmin })] })] })] })) : (
            /* SECURE CONTENT: Only rendered when authorized */
            _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in", children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-white", children: labels.adminPanel }), _jsx("button", { onClick: toggleAdmin, className: "text-red-400 hover:text-red-300 text-sm hover:underline", children: labels.logout })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { className: "lg:col-span-1 space-y-6", children: _jsxs("div", { className: "bg-slate-800 p-6 rounded-2xl border border-slate-700", children: [_jsxs("h2", { className: "text-xl font-bold text-amber-500 mb-6 flex items-center gap-2", children: [_jsx(Plus, { size: 20 }), labels.addMuseum] }), _jsxs("form", { onSubmit: handleAdd, className: "space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: "text-xs font-bold text-slate-500 uppercase", children: "English Content" }), _jsx("input", { type: "text", value: nameEn, onChange: (e) => setNameEn(e.target.value), className: "w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none", placeholder: "Museum Name" }), _jsx("input", { type: "text", value: locationEn, onChange: (e) => setLocationEn(e.target.value), className: "w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none", placeholder: "Location" }), _jsx("input", { type: "text", value: shortDescEn, onChange: (e) => setShortDescEn(e.target.value), className: "w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none", placeholder: "Short Description" }), _jsx("textarea", { value: descEn, onChange: (e) => setDescEn(e.target.value), className: "w-full bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-amber-500 focus:outline-none h-24 resize-none", placeholder: "Full Description" })] }), _jsx("button", { type: "submit", className: "w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded-lg transition-colors mt-4 shadow-lg shadow-amber-500/20", children: labels.addMuseum })] })] }) }), _jsx("div", { className: "lg:col-span-2", children: _jsxs("div", { className: "bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden", children: [_jsxs("div", { className: "p-6 border-b border-slate-700 flex justify-between items-center", children: [_jsxs("h2", { className: "text-xl font-bold text-white", children: [labels.currentMuseums, " (", museums.length, ")"] }), _jsxs("span", { className: "text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-700", children: ["Previewing: ", LANGUAGE_NAMES[language] || language.toUpperCase()] })] }), _jsx("div", { className: "divide-y divide-slate-700", children: museums.map((m) => (_jsxs("div", { className: "p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors group", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("img", { src: m.image, alt: "", className: "w-16 h-16 rounded-lg object-cover bg-slate-600 shadow-md" }), _jsxs("div", { children: [_jsx("h3", { className: "font-bold text-white text-lg", children: m.name[language] }), _jsx("p", { className: "text-sm text-amber-500/80 mb-1", children: m.location[language] }), _jsx("p", { className: "text-xs text-slate-400 line-clamp-1", children: m.shortDescription[language] })] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "text-right hidden sm:block", children: _jsxs("span", { className: "text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-700", children: ["ID: ", m.id.split('-').pop()] }) }), _jsx("button", { className: "text-slate-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-full transition-all", title: labels.deleteMock, children: _jsx(Trash2, { size: 18 }) })] })] }, m.id))) })] }) })] })] }))
    }));
};
export default Admin;
