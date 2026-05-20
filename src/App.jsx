import React, { useState, createContext, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MuseumDetail from './pages/MuseumDetail';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import { Language } from '../types';
import { INITIAL_MUSEUMS, UI_LABELS } from './constants';
import { translateText } from './services/translationService';

export const AppContext = createContext(null);
const App = () => {
    const [language, setLanguage] = useState(Language.ENGLISH);
    const [museums, setMuseums] = useState(INITIAL_MUSEUMS);
    const [isAdmin, setIsAdmin] = useState(false);
    const [uiLabels, setUiLabels] = useState(UI_LABELS[Language.ENGLISH]);
    // Load language from local storage
    useEffect(() => {
        const savedLang = localStorage.getItem('museumx_lang');
        if (savedLang) {
            const lang = Object.values(Language).includes(savedLang) ? savedLang : Language.ENGLISH;
            handleSetLanguage(lang);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const translateLabels = useCallback(async (lang) => {
        if (lang === Language.ENGLISH) {
            setUiLabels(UI_LABELS[Language.ENGLISH]);
            return;
        }
        const sourceLabels = UI_LABELS[Language.ENGLISH];
        const newLabels = { ...sourceLabels };
        // We can translate keys in parallel
        const keys = Object.keys(sourceLabels);
        const textsToTranslate = Object.values(sourceLabels);
        try {
            const translatedTexts = await Promise.all(textsToTranslate.map(text => translateText(text, lang)));
            keys.forEach((key, index) => {
                newLabels[key] = translatedTexts[index];
            });
            setUiLabels(newLabels);
        }
        catch (error) {
            console.error("Error translating UI labels:", error);
            // Fallback to English is automatic since we started with it
        }
    }, []);
    // Save language and trigger auto-translation
    const handleSetLanguage = useCallback(async (lang) => {
        setLanguage(lang); // Cast to Language enum if needed
        localStorage.setItem('museumx_lang', lang);
        // 1. Translate UI Labels
        translateLabels(lang);
        // 2. Generic translation trigger for Museum Content
        if (lang !== Language.ENGLISH) {
            const needsTranslation = museums.some(m => m.name[lang] === m.name[Language.ENGLISH]);
            if (needsTranslation) {
                const updatedMuseums = await Promise.all(museums.map(async (m) => {
                    // Translate if content is same as source (placeholder)
                    if (m.name[lang] === m.name[Language.ENGLISH]) {
                        try {
                            const newM = {
                                ...m,
                                name: { ...m.name },
                                location: { ...m.location },
                                shortDescription: { ...m.shortDescription },
                                description: { ...m.description },
                                features: { ...m.features },
                                highlights: [...m.highlights],
                                galleryImages: [...m.galleryImages]
                            };
                            const [tName, tLoc, tShort, tDesc] = await Promise.all([
                                translateText(m.name[Language.ENGLISH], lang),
                                translateText(m.location[Language.ENGLISH], lang),
                                translateText(m.shortDescription[Language.ENGLISH], lang),
                                translateText(m.description[Language.ENGLISH], lang)
                            ]);
                            newM.name[lang] = tName;
                            newM.location[lang] = tLoc;
                            newM.shortDescription[lang] = tShort;
                            newM.description[lang] = tDesc;
                            if (m.features[Language.ENGLISH]) {
                                const tFeatures = await Promise.all(m.features[Language.ENGLISH].map(f => translateText(f, lang)));
                                newM.features[lang] = tFeatures;
                            }
                            const tHighlights = await Promise.all(m.highlights.map(async (h) => ({
                                ...h,
                                title: { ...h.title, [lang]: await translateText(h.title[Language.ENGLISH], lang) },
                                description: { ...h.description, [lang]: await translateText(h.description[Language.ENGLISH], lang) }
                            })));
                            newM.highlights = tHighlights;
                            const tGallery = await Promise.all(m.galleryImages.map(async (g) => ({
                                ...g,
                                title: { ...g.title, [lang]: await translateText(g.title[Language.ENGLISH], lang) },
                                description: { ...g.description, [lang]: await translateText(g.description[Language.ENGLISH], lang) },
                                artist: { ...g.artist, [lang]: await translateText(g.artist[Language.ENGLISH], lang) },
                                medium: { ...g.medium, [lang]: await translateText(g.medium[Language.ENGLISH], lang) },
                            })));
                            newM.galleryImages = tGallery;
                            return newM;
                        }
                        catch (e) {
                            console.error(`Failed to translate museum ${m.id} to ${lang}`, e);
                            return m;
                        }
                    }
                    return m;
                }));
                setMuseums(updatedMuseums);
            }
        }
    }, [museums, translateLabels]);
    const addMuseum = useCallback((newMuseum) => {
        setMuseums([...museums, newMuseum]);
    }, [museums]);
    const toggleAdmin = useCallback(() => setIsAdmin(current => !current), []);
    const contextValue = {
        language,
        setLanguage: handleSetLanguage,
        museums,
        addMuseum,
        isAdmin,
        toggleAdmin,
        uiLabels
    };
    return (<AppContext.Provider value={contextValue}>
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="museum/:id" element={<MuseumDetail />} />
                    <Route path="museum/:id/gallery" element={<Gallery />} />
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        </Router>
    </AppContext.Provider>);
};
export default App;
