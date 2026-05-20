import React, { useState, useContext } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { AppContext } from '../App';

const Contact = () => {
    const { uiLabels: labels } = useContext(AppContext);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-3 rounded-full bg-amber-500/10 px-4 py-2 text-amber-300 text-sm uppercase tracking-[0.24em] font-semibold">
                        Contact Us
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">Get in touch with MuseumX</h1>
                        <p className="max-w-2xl text-slate-400 leading-relaxed text-lg">
                            Whether you have a question about our museums, need help planning a visit, or want to share feedback, our team is here to support you.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-black/10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-300 mb-4">
                                <MapPin size={22} />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Visit Us</h2>
                            <p className="text-slate-400 leading-relaxed">
                                Shyamla Hills, Bhopal, Madhya Pradesh
                                <br />India
                            </p>
                        </div>
                        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-black/10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-300 mb-4">
                                <Mail size={22} />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Email</h2>
                            <p className="text-slate-400 leading-relaxed">hello@museumx.app</p>
                        </div>
                        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-black/10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-300 mb-4">
                                <Phone size={22} />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Call</h2>
                            <p className="text-slate-400 leading-relaxed">+91 98765 43210</p>
                        </div>
                        <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-black/10">
                            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-300 mb-4">
                                <Send size={22} />
                            </div>
                            <h2 className="text-xl font-semibold text-white mb-2">Response Time</h2>
                            <p className="text-slate-400 leading-relaxed">We usually reply within one business day.</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-slate-800 bg-slate-950/90 p-8 shadow-2xl shadow-black/20">
                    <div className="mb-8 space-y-2">
                        <p className="text-sm uppercase text-amber-300 tracking-[0.24em]">Send a message</p>
                        <h2 className="text-3xl font-bold text-white">Drop us a note</h2>
                        <p className="text-slate-400 leading-relaxed">Share your question, suggestion, or collaboration idea and we’ll get back to you soon.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <label className="block">
                            <span className="text-slate-300 text-sm font-medium">Name</span>
                            <input
                                name="name"
                                value={formState.name}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                placeholder="Your name"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-slate-300 text-sm font-medium">Email</span>
                            <input
                                type="email"
                                name="email"
                                value={formState.email}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                                placeholder="you@example.com"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="text-slate-300 text-sm font-medium">Message</span>
                            <textarea
                                name="message"
                                value={formState.message}
                                onChange={handleChange}
                                className="mt-2 w-full min-h-[160px] rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none"
                                placeholder="Tell us what you need help with"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        >
                            Send Message
                        </button>
                        {submitted && (
                            <p className="text-emerald-400 text-sm mt-2">Thank you! Your message has been recorded. We’ll get back to you shortly.</p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
