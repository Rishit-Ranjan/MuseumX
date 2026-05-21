import { Language } from '../types';

// Image imports
import stateMuseumImg from './assets/images/state_museum/state_museum.png';
import manavSangrahalayaImg from './assets/images/manav_sangrahalaya/Manav-sangrahalaya.png';
import bharatBhavanImg from './assets/images/bharat_bhavan/bharat-bhavan.png';
import tribalMuseumImg from './assets/images/tribal_museum/tribal-museum.png';
import ghadarMemorialImg from './assets/images/ghadar_memorial/ghadar_memorial.png';

const galleryImageList = [
    stateMuseumImg,
    manavSangrahalayaImg,
    bharatBhavanImg,
    tribalMuseumImg,
    ghadarMemorialImg
];

const getImgUrl = (id) => galleryImageList[id % galleryImageList.length];

// Helper to generate gallery items with metadata
const getGalleryItems = (startId, count, type) => {
    return Array.from({ length: count }).map((_, i) => {
        const isEven = i % 2 === 0;
        // Default Metadata Containers
        let titleEn = '';
        let descEn = '';
        let artistEn = 'Unknown';
        let mediumEn = 'Mixed Media';
        let date = isEven ? '1992' : '2005';
        if (type === 'Tribal') {
            titleEn = `Tribal Artifact ${i + 1}`;
            descEn = 'A traditional painting depicting forest life and rituals.';
            artistEn = isEven ? 'Jangarh Singh Shyam' : 'Bhuri Bai';
            mediumEn = 'Natural Pigments on Wall';
        }
        else if (type === 'History') {
            titleEn = `Ancient Sculpture ${i + 1}`;
            descEn = 'Carved stone sculpture from the Mauryan period.';
            artistEn = 'Mauryan Artisan';
            date = '3rd Century BC';
            mediumEn = 'Sandstone';
        }
        else if (type === 'Art') {
            titleEn = `Modern Art Piece ${i + 1}`;
            descEn = 'Abstract expressionism capturing the vibrant culture of India.';
            artistEn = isEven ? 'S.H. Raza' : 'M.F. Husain';
            mediumEn = 'Acrylic on Canvas';
        }
        else {
            titleEn = `Historical Document ${i + 1}`;
            descEn = 'Archival photograph from the 1984 incident.';
            artistEn = 'Bhopal Archive';
            date = '1984';
            mediumEn = 'Photograph';
        }
        // Note: Hindi fields initialized with English text to be translated dynamically
        return {
            url: getImgUrl(startId + i),
            title: { [Language.ENGLISH]: titleEn, [Language.HINDI]: titleEn },
            description: { [Language.ENGLISH]: descEn, [Language.HINDI]: descEn },
            artist: { [Language.ENGLISH]: artistEn, [Language.HINDI]: artistEn },
            date,
            medium: { [Language.ENGLISH]: mediumEn, [Language.HINDI]: mediumEn }
        };
    });
};
// Mock media assets
const MEDIA_ASSETS = {
    VIDEO: {
        EN: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        HI: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    AUDIO: {
        EN: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        HI: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    }
};
export const INITIAL_MUSEUMS = [
    {
        id: 'state-museum-bhopal',
        name: {
            [Language.ENGLISH]: 'State Museum, Bhopal',
            [Language.HINDI]: 'State Museum, Bhopal'
        },
        location: {
            [Language.ENGLISH]: 'Shyamla Hills, near Bharat Bhavan',
            [Language.HINDI]: 'Shyamla Hills, near Bharat Bhavan'
        },
        shortDescription: {
            [Language.ENGLISH]: 'The premier museum of Madhya Pradesh housing a vast collection of artifacts.',
            [Language.HINDI]: 'The premier museum of Madhya Pradesh housing a vast collection of artifacts.'
        },
        description: {
            [Language.ENGLISH]: 'Set in a beautiful, sprawling complex, the State Museum is the custodian of Madhya Pradesh\'s rich heritage. From prehistoric fossils to medieval sculpture, it offers a journey through time.',
            [Language.HINDI]: 'Set in a beautiful, sprawling complex, the State Museum is the custodian of Madhya Pradesh\'s rich heritage. From prehistoric fossils to medieval sculpture, it offers a journey through time.'
        },
        image: stateMuseumImg,
        galleryImages: getGalleryItems(100, 6, 'History'),
        features: {
            [Language.ENGLISH]: ['Archaeology', 'Numismatics', 'Fossils', 'Tribal Art'],
            [Language.HINDI]: ['Archaeology', 'Numismatics', 'Fossils', 'Tribal Art']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Archaeology Section', [Language.HINDI]: 'Archaeology Section' },
                description: {
                    [Language.ENGLISH]: 'Features sculptures from Sanchi, Udayagiri, and Khajuraho.',
                    [Language.HINDI]: 'Features sculptures from Sanchi, Udayagiri, and Khajuraho.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Fossil Section', [Language.HINDI]: 'Fossil Section' },
                description: {
                    [Language.ENGLISH]: 'Includes a 65-million-year-old fossil of a dinosaur egg.',
                    [Language.HINDI]: 'Includes a 65-million-year-old fossil of a dinosaur egg.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Mansoor Gallery', [Language.HINDI]: 'Mansoor Gallery' },
                description: {
                    [Language.ENGLISH]: 'Named after the legendary Mughal painter, displaying miniature paintings.',
                    [Language.HINDI]: 'Named after the legendary Mughal painter, displaying miniature paintings.'
                }
            }
        ],
        coordinates: { lat: 23.25, lng: 77.40 },
        multimedia: {
            [Language.ENGLISH]: { videoUrl: MEDIA_ASSETS.VIDEO.EN, audioUrl: MEDIA_ASSETS.AUDIO.EN },
            [Language.HINDI]: { videoUrl: MEDIA_ASSETS.VIDEO.HI, audioUrl: MEDIA_ASSETS.AUDIO.HI }
        }
    },
    {
        id: 'manav-sangrahalaya',
        name: {
            [Language.ENGLISH]: 'Manav Sangrahalaya (IGRMS)',
            [Language.HINDI]: 'Manav Sangrahalaya (IGRMS)'
        },
        location: {
            [Language.ENGLISH]: 'Shamla Hills, near Upper Lake',
            [Language.HINDI]: 'Shamla Hills, near Upper Lake'
        },
        shortDescription: {
            [Language.ENGLISH]: 'A massive open-air "Museum of Mankind" spread over 200 acres.',
            [Language.HINDI]: 'A massive open-air "Museum of Mankind" spread over 200 acres.'
        },
        description: {
            [Language.ENGLISH]: 'Not a conventional museum, IGRMS is a celebration of human evolution and cultural diversity. It features life-size tribal dwellings and open-air exhibits that blend seamlessly with the natural landscape.',
            [Language.HINDI]: 'Not a conventional museum, IGRMS is a celebration of human evolution and cultural diversity. It features life-size tribal dwellings and open-air exhibits that blend seamlessly with the natural landscape.'
        },
        image: manavSangrahalayaImg,
        galleryImages: getGalleryItems(200, 6, 'Tribal'),
        features: {
            [Language.ENGLISH]: ['Open-Air Exhibits', 'Tribal Dwellings', 'Boat Gallery'],
            [Language.HINDI]: ['Open-Air Exhibits', 'Tribal Dwellings', 'Boat Gallery']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Open-Air Exhibits', [Language.HINDI]: 'Open-Air Exhibits' },
                description: {
                    [Language.ENGLISH]: 'Authentic, life-size replicas of traditional tribal and rural dwellings.',
                    [Language.HINDI]: 'Authentic, life-size replicas of traditional tribal and rural dwellings.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Village Complex', [Language.HINDI]: 'Village Complex' },
                description: {
                    [Language.ENGLISH]: 'A walk-through replica of a tribal village.',
                    [Language.HINDI]: 'A walk-through replica of a tribal village.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Boat Gallery', [Language.HINDI]: 'Boat Gallery' },
                description: {
                    [Language.ENGLISH]: 'A unique museum on a boat showcasing maritime culture.',
                    [Language.HINDI]: 'A unique museum on a boat showcasing maritime culture.'
                }
            }
        ],
        coordinates: { lat: 23.24, lng: 77.39 },
        multimedia: {
            [Language.ENGLISH]: { videoUrl: MEDIA_ASSETS.VIDEO.EN, audioUrl: MEDIA_ASSETS.AUDIO.EN },
            [Language.HINDI]: { videoUrl: MEDIA_ASSETS.VIDEO.HI, audioUrl: MEDIA_ASSETS.AUDIO.HI }
        }
    },
    {
        id: 'bharat-bhavan',
        name: {
            [Language.ENGLISH]: 'Bharat Bhavan',
            [Language.HINDI]: 'Bharat Bhavan'
        },
        location: {
            [Language.ENGLISH]: 'Shamla Hills, near Upper Lake',
            [Language.HINDI]: 'Shamla Hills, near Upper Lake'
        },
        shortDescription: {
            [Language.ENGLISH]: 'A multi-arts complex housing a superb art museum for art lovers.',
            [Language.HINDI]: 'A multi-arts complex housing a superb art museum for art lovers.'
        },
        description: {
            [Language.ENGLISH]: 'Designed by Charles Correa, Bharat Bhavan is a center for the performing and visual arts. The Roopankar Museum within it is a treasure trove of tribal and modern Indian art.',
            [Language.HINDI]: 'Designed by Charles Correa, Bharat Bhavan is a center for the performing and visual arts. The Roopankar Museum within it is a treasure trove of tribal and modern Indian art.'
        },
        image: bharatBhavanImg,
        galleryImages: getGalleryItems(300, 5, 'Art'),
        features: {
            [Language.ENGLISH]: ['Modern Art', 'Tribal Art', 'Graphic Studio', 'Theater'],
            [Language.HINDI]: ['Modern Art', 'Tribal Art', 'Graphic Studio', 'Theater']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Roopankar Museum of Arts', [Language.HINDI]: 'Roopankar Museum of Arts' },
                description: {
                    [Language.ENGLISH]: 'Excellent collection of indigenous, tribal, and contemporary Indian art.',
                    [Language.HINDI]: 'Excellent collection of indigenous, tribal, and contemporary Indian art.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Collection', [Language.HINDI]: 'Collection' },
                description: {
                    [Language.ENGLISH]: 'Gond and Bhil paintings, terracotta works, and canvases by modern masters.',
                    [Language.HINDI]: 'Gond and Bhil paintings, terracotta works, and canvases by modern masters.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Graphic Studio', [Language.HINDI]: 'Graphic Studio' },
                description: {
                    [Language.ENGLISH]: 'Live print-making studio.',
                    [Language.HINDI]: 'Live print-making studio.'
                }
            }
        ],
        coordinates: { lat: 23.245, lng: 77.405 },
        multimedia: {
            [Language.ENGLISH]: { videoUrl: MEDIA_ASSETS.VIDEO.EN, audioUrl: MEDIA_ASSETS.AUDIO.EN },
            [Language.HINDI]: { videoUrl: MEDIA_ASSETS.VIDEO.HI, audioUrl: MEDIA_ASSETS.AUDIO.HI }
        }
    },
    {
        id: 'tribal-museum',
        name: {
            [Language.ENGLISH]: 'Tribal Museum',
            [Language.HINDI]: 'Tribal Museum'
        },
        location: {
            [Language.ENGLISH]: 'Next to State Museum, Shyamla Hills',
            [Language.HINDI]: 'Next to State Museum, Shyamla Hills'
        },
        shortDescription: {
            [Language.ENGLISH]: 'A vibrant museum dedicated exclusively to the tribal communities of MP.',
            [Language.HINDI]: 'A vibrant museum dedicated exclusively to the tribal communities of MP.'
        },
        description: {
            [Language.ENGLISH]: 'This museum is not just about artifacts; it is about the living traditions of the Gond, Bhil, Baiga, and Korku tribes. The architecture and installations are immersive and colorful.',
            [Language.HINDI]: 'This museum is not just about artifacts; it is about the living traditions of the Gond, Bhil, Baiga, and Korku tribes. The architecture and installations are immersive and colorful.'
        },
        image: tribalMuseumImg,
        galleryImages: getGalleryItems(400, 6, 'Tribal'),
        features: {
            [Language.ENGLISH]: ['Interactive Displays', 'Thematic Galleries', 'Art Shop'],
            [Language.HINDI]: ['Interactive Displays', 'Thematic Galleries', 'Art Shop']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Thematic Galleries', [Language.HINDI]: 'Thematic Galleries' },
                description: {
                    [Language.ENGLISH]: 'Dedicated to different tribes, showcasing rituals, music, and daily life.',
                    [Language.HINDI]: 'Dedicated to different tribes, showcasing rituals, music, and daily life.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Interactive Displays', [Language.HINDI]: 'Interactive Displays' },
                description: {
                    [Language.ENGLISH]: 'Uses sound, light, and life-size installations.',
                    [Language.HINDI]: 'Uses sound, light, and life-size installations.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Art Shop', [Language.HINDI]: 'Art Shop' },
                description: {
                    [Language.ENGLISH]: 'Sells authentic tribal handicrafts.',
                    [Language.HINDI]: 'Sells authentic tribal handicrafts.'
                }
            }
        ],
        coordinates: { lat: 23.251, lng: 77.401 },
        multimedia: {
            [Language.ENGLISH]: { videoUrl: MEDIA_ASSETS.VIDEO.HI, audioUrl: MEDIA_ASSETS.AUDIO.EN },
            [Language.HINDI]: { videoUrl: MEDIA_ASSETS.VIDEO.EN, audioUrl: MEDIA_ASSETS.AUDIO.HI }
        }
    },
    {
        id: 'ghadar-memorial',
        name: {
            [Language.ENGLISH]: 'Ghadar Memorial Museum',
            [Language.HINDI]: 'Ghadar Memorial Museum'
        },
        location: {
            [Language.ENGLISH]: 'Hamidia Road, near Taj-ul-Masajid',
            [Language.HINDI]: 'Hamidia Road, near Taj-ul-Masajid'
        },
        shortDescription: {
            [Language.ENGLISH]: 'Housed in the historic building of the Bhopal Gas Tragedy.',
            [Language.HINDI]: 'Housed in the historic building of the Bhopal Gas Tragedy.'
        },
        description: {
            [Language.ENGLISH]: 'A poignant reminder of the 1984 tragedy, this museum documents the events, aftermath, and struggle for justice of the world\'s worst industrial disaster.',
            [Language.HINDI]: 'A poignant reminder of the 1984 tragedy, this museum documents the events, aftermath, and struggle for justice of the world\'s worst industrial disaster.'
        },
        image: ghadarMemorialImg,
        galleryImages: getGalleryItems(500, 4, 'Modern'),
        features: {
            [Language.ENGLISH]: ['Historical Records', 'Photography', 'Industrial History'],
            [Language.HINDI]: ['Historical Records', 'Photography', 'Industrial History']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'A Memorial', [Language.HINDI]: 'A Memorial' },
                description: {
                    [Language.ENGLISH]: 'Serves as a sobering reminder of December 2-3, 1984.',
                    [Language.HINDI]: 'Serves as a sobering reminder of December 2-3, 1984.'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Exhibits', [Language.HINDI]: 'Exhibits' },
                description: {
                    [Language.ENGLISH]: 'Photographs, documents, and news clippings detailing the event.',
                    [Language.HINDI]: 'Photographs, documents, and news clippings detailing the event.'
                }
            }
        ],
        coordinates: { lat: 23.26, lng: 77.40 },
        multimedia: {
            [Language.ENGLISH]: { videoUrl: MEDIA_ASSETS.VIDEO.EN, audioUrl: MEDIA_ASSETS.AUDIO.EN },
            [Language.HINDI]: { videoUrl: MEDIA_ASSETS.VIDEO.HI, audioUrl: MEDIA_ASSETS.AUDIO.HI }
        }
    }
];
// Replaced Hindi hardcoded strings with English strings to act as placeholders for dynamic translation
const ENGLISH_LABELS = {
    home: 'Home',
    explore: 'Explore Museums',
    gallery: 'Gallery',
    admin: 'Admin',
    contact: 'Contact',
    search: 'Search museums...',
    readMore: 'Read More',
    virtualGuide: 'AI Curator',
    location: 'Location',
    highlights: 'Highlights',
    audio: 'Audio Guide',
    video: 'Video Tour',
    features: 'Features',
    back: 'Back',
    adminPanel: 'Admin Panel',
    addMuseum: 'Add New Museum',
    digitalGuide: 'Digital Media Guide',
    watchVideo: 'Watch Video',
    listenAudio: 'Listen Audio',
    nowPlaying: 'Now Playing',
    selectLang: 'Media Language',
    // Footer
    privacy: 'Privacy',
    terms: 'Terms',
    copyright: 'MuseumX Inc.',
    // Gallery
    digitalGallery: 'Digital Gallery Collection',
    clickExpand: 'Click to expand',
    artist: 'Artist',
    date: 'Date',
    medium: 'Medium',
    // Chat
    aiHeader: 'AI Curator (Local)',
    askCurator: 'Ask Curator',
    chatPlaceholder: 'Ask about the museum...',
    processing: 'Processing...',
    initialGreeting: 'Hello! I am your AI Curator for {museum}. Ask me anything about the exhibits, history, or timings!',
    // Museum Detail & Misc
    locateMap: 'Locate on Map',
    mediaUnavailable: 'Media not available for this language.',
    // Admin
    museumNameLabel: 'Museum Name',
    locationLabel: 'Location',
    currentMuseums: 'Current Museums',
    accessRestricted: 'Access restricted to authorized personnel only.',
    loginAdmin: 'Login as Administrator',
    logout: 'Logout',
    deleteMock: 'Delete (Mock)'
};
// Hindi UI labels (local fallback when translation API is not configured)
const HINDI_LABELS = {
    home: 'होम',
    explore: 'संग्रहालय खोजें',
    gallery: 'गेलरी',
    admin: 'प्रशासक',
    contact: 'संपर्क',
    search: 'संग्रहालय खोजें...',
    readMore: 'और पढ़ें',
    virtualGuide: 'एआई क्यूरेटर',
    location: 'स्थान',
    highlights: 'मुख्य आकर्षण',
    audio: 'ऑडियो गाइड',
    video: 'वीडियो टूर',
    features: 'विशेषताएँ',
    back: 'वापस',
    adminPanel: 'प्रशासन पैनल',
    addMuseum: 'नया संग्रहालय जोड़ें',
    digitalGuide: 'डिजिटल मीडिया गाइड',
    watchVideo: 'वीडियो देखें',
    listenAudio: 'ऑडियो सुनें',
    nowPlaying: 'अब चल रहा है',
    selectLang: 'मीडिया भाषा',
    // Footer
    privacy: 'गोपनीयता',
    terms: 'शर्तें',
    copyright: 'MuseumX Inc.',
    // Gallery
    digitalGallery: 'डिजिटल गैलरी संग्रह',
    clickExpand: 'विस्तारित करने के लिए क्लिक करें',
    artist: 'कलाकार',
    date: 'तिथि',
    medium: 'माध्यम',
    // Chat
    aiHeader: 'एआई क्यूरेटर (लोकल)',
    askCurator: 'क्यूरेटर से पूछें',
    chatPlaceholder: 'संग्रहालय के बारे में पूछें...',
    processing: 'प्रक्रियाधीन...',
    initialGreeting: 'नमस्ते! मैं {museum} के लिए आपका एआई क्यूरेटर हूँ। मुझसे प्रदर्शनियों, इतिहास, या समय के बारे में पूछें!',
    // Museum Detail & Misc
    locateMap: 'मानचित्र पर स्थान-पकड़ें',
    mediaUnavailable: 'इस भाषा के लिए मीडिया उपलब्ध नहीं है।',
    // Admin
    museumNameLabel: 'संग्रहालय का नाम',
    locationLabel: 'स्थान',
    currentMuseums: 'वर्तमान संग्रहालय',
    accessRestricted: 'पहुँच केवल अधिकृत कर्मियों के लिए प्रतिबंधित है।',
    loginAdmin: 'प्रशासक के रूप में लॉगिन करें',
    logout: 'लॉगआउट',
    deleteMock: 'हटाएं (नकली)'
};
export const UI_LABELS = {
    [Language.ENGLISH]: ENGLISH_LABELS,
    [Language.HINDI]: HINDI_LABELS // Local Hindi fallback labels
};
