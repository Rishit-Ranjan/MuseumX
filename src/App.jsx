import React, { useState, createContext, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MuseumDetail from './pages/MuseumDetail';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Contact from './pages/Contact.jsx';
import { Language } from '../types';
import { INITIAL_MUSEUMS, UI_LABELS } from './constants';
import { translateText } from './services/translationService';

const getInitialLanguage = () => {
    if (typeof window === 'undefined') {
        return Language.ENGLISH;
    }
    const savedLang = localStorage.getItem('museumx_lang');
    return savedLang && Object.values(Language).includes(savedLang) ? savedLang : Language.ENGLISH;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);
const App = () => {
    const initialLanguage = getInitialLanguage();
    const [language, setLanguage] = useState(initialLanguage);
    const [museums, setMuseums] = useState(INITIAL_MUSEUMS);
    const [isAdmin, setIsAdmin] = useState(false);
    const [uiLabels, setUiLabels] = useState(UI_LABELS[initialLanguage] || UI_LABELS[Language.ENGLISH]);

    const translateLabels = useCallback(async (lang) => {
        const sourceLabels = UI_LABELS[Language.ENGLISH];
        const newLabels = { ...sourceLabels };
        // We can translate keys in parallel using the translation service if available
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
            // If translation API fails, fallback to English (or previously set labels)
        }
    }, []);
    const handleSetLanguage = useCallback((lang) => {
        setLanguage(lang); // Cast to Language enum if needed
        localStorage.setItem('museumx_lang', lang);
        // Update UI labels synchronously if they exist in constants
        if (UI_LABELS[lang]) {
            setUiLabels(UI_LABELS[lang]);
        }
    }, []);

    useEffect(() => {
        if (language !== Language.ENGLISH && !UI_LABELS[language]) {
            translateLabels(language);
        }

        if (language === Language.ENGLISH) return;

        const translateMuseums = async () => {
            const needsTranslation = museums.some(m => m.name[language] === m.name[Language.ENGLISH]);
            if (!needsTranslation) return;

            try {
                const updatedMuseums = await Promise.all(museums.map(async (m) => {
                    if (m.name[language] === m.name[Language.ENGLISH]) {
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
                            translateText(m.name[Language.ENGLISH], language),
                            translateText(m.location[Language.ENGLISH], language),
                            translateText(m.shortDescription[Language.ENGLISH], language),
                            translateText(m.description[Language.ENGLISH], language)
                        ]);

                        newM.name[language] = tName;
                        newM.location[language] = tLoc;
                        newM.shortDescription[language] = tShort;
                        newM.description[language] = tDesc;

                        if (m.features[Language.ENGLISH]) {
                            const tFeatures = await Promise.all(m.features[Language.ENGLISH].map(f => translateText(f, language)));
                            newM.features[language] = tFeatures;
                        }

                        const tHighlights = await Promise.all(m.highlights.map(async (h) => ({
                            ...h,
                            title: { ...h.title, [language]: await translateText(h.title[Language.ENGLISH], language) },
                            description: { ...h.description, [language]: await translateText(h.description[Language.ENGLISH], language) }
                        })));
                        newM.highlights = tHighlights;

                        const tGallery = await Promise.all(m.galleryImages.map(async (g) => ({
                            ...g,
                            title: { ...g.title, [language]: await translateText(g.title[Language.ENGLISH], language) },
                            description: { ...g.description, [language]: await translateText(g.description[Language.ENGLISH], language) },
                            artist: { ...g.artist, [language]: await translateText(g.artist[Language.ENGLISH], language) },
                            medium: { ...g.medium, [language]: await translateText(g.medium[Language.ENGLISH], language) }
                        })));
                        newM.galleryImages = tGallery;
                        return newM;
                    }
                    return m;
                }));

                setMuseums(updatedMuseums);
            }
            catch (e) {
                console.error(`Failed to translate museums to ${language}`, e);
            }
        };

        translateMuseums();
    }, [language, museums, translateLabels]);
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
                    <Route path="contact" element={<Contact />} />
                    <Route path="admin" element={<Admin />} />
                </Route>
            </Routes>
        </Router>
    </AppContext.Provider>);
};
export default App;
