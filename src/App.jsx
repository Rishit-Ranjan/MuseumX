import React, { useState, createContext, useEffect, useCallback, useMemo } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MuseumDetail from './pages/MuseumDetail';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
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
        // Update UI labels synchronously if they exist in constants; 
        // otherwise reset to English so the useEffect can detect a translation is needed.
        if (UI_LABELS[lang]) {
            setUiLabels(UI_LABELS[lang]);
        } else {
            setUiLabels(UI_LABELS[Language.ENGLISH]);
        }
    }, []);

    useEffect(() => {
        // Only translate if we are not in English, don't have static labels, 
        // AND the current labels are still the English ones (indicating translation hasn't happened yet).
        if (language !== Language.ENGLISH && !UI_LABELS[language] && uiLabels === UI_LABELS[Language.ENGLISH]) {
            // Defer calling translateLabels to avoid synchronous setState inside an effect
            const timer = setTimeout(() => { translateLabels(language); }, 0);
            return () => clearTimeout(timer);
        }

        if (language === Language.ENGLISH) return;

        const translateMuseums = async () => {
            // Check if any museum lacks translation for the current language
            const untranslatedMuseums = museums.filter(m => !m.name[language]);
            if (untranslatedMuseums.length === 0) return;

            try {
                const updatedMuseums = await Promise.all(museums.map(async (m) => {
                    if (!m.name[language]) {
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
    }, [language, museums, translateLabels, uiLabels]);

    const addMuseum = useCallback((newMuseum) => {
        setMuseums(prev => [...prev, newMuseum]);
    }, []);

    const toggleAdmin = useCallback(() => setIsAdmin(current => !current), []);
    
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = useCallback((museumID) => {
        setFavorites(prev => 
            prev.includes(museumID) 
                ? prev.filter(id => id !== museumID) 
                : [...prev, museumID]
        );
    }, []);

    const contextValue = useMemo(() => ({
        language,
        setLanguage: handleSetLanguage,
        museums,
        addMuseum,
        isAdmin,
        toggleAdmin,
        uiLabels,
        favorite: favorites,
        toggleFavorite
    }), [language, handleSetLanguage, museums, addMuseum, isAdmin, toggleAdmin, uiLabels, favorites, toggleFavorite]);

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
