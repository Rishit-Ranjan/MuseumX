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
        let titleHi = '';
        let descHi = '';
        let artistHi = 'Unknown';
        let mediumHi = 'Mixed Media';
        let date = isEven ? '1992' : '2005';

        switch (type) {
            case 'Tribal':
                titleEn = `Tribal Artifact ${i + 1}`;
                descEn = 'A traditional painting depicting forest life and rituals.';
                artistEn = isEven ? 'Jangarh Singh Shyam' : 'Bhuri Bai';
                mediumEn = 'Natural Pigments on Wall';
                titleHi = `जनजातीय कलाकृति ${i + 1}`;
                descHi = 'वन जीवन और परंपराओं को दर्शाती पारंपरिक पेंटिंग।';
                artistHi = isEven ? 'जंगारह सिंह श्याम' : 'भूरी बाई';
                mediumHi = 'प्राकृतिक रंग दीवार पर';
                break;
            case 'History':
                titleEn = `Ancient Sculpture ${i + 1}`;
                descEn = 'Carved stone sculpture from the Mauryan period.';
                artistEn = 'Mauryan Artisan';
                date = '3rd Century BC';
                mediumEn = 'Sandstone';
                titleHi = `प्राचीन मूर्ति ${i + 1}`;
                descHi = 'मौर्य काल की नक्काशीदार पत्थर की मूर्ति।';
                artistHi = 'मौर्य शिल्पी';
                mediumHi = 'रेत पत्थर';
                break;
            case 'Art':
                titleEn = `Modern Art Piece ${i + 1}`;
                descEn = 'Abstract expressionism capturing the vibrant culture of India.';
                artistEn = isEven ? 'S.H. Raza' : 'M.F. Husain';
                mediumEn = 'Acrylic on Canvas';
                titleHi = `आधुनिक कला कृति ${i + 1}`;
                descHi = 'भारत की जीवंत संस्कृति को पकड़ता आधुनिक कला।';
                artistHi = isEven ? 'एस. एच. रज़ा' : 'एम. एफ. हुसैन';
                mediumHi = 'कैनवास पर एक्रिलिक';
                break;
            default:
                titleEn = `Historical Document ${i + 1}`;
                descEn = 'Archival photograph from the 1984 incident.';
                artistEn = 'Bhopal Archive';
                date = '1984';
                mediumEn = 'Photograph';
                titleHi = `ऐतिहासिक दस्तावेज़ ${i + 1}`;
                descHi = '1984 की घटना से अभिलेखीय फ़ोटो।';
                artistHi = 'भोपाल अभिलेखागार';
                mediumHi = 'फोटोग्राफ';
        }

        return {
            url: getImgUrl(startId + i),
            title: { [Language.ENGLISH]: titleEn, [Language.HINDI]: titleHi },
            description: { [Language.ENGLISH]: descEn, [Language.HINDI]: descHi },
            artist: { [Language.ENGLISH]: artistEn, [Language.HINDI]: artistHi },
            date,
            medium: { [Language.ENGLISH]: mediumEn, [Language.HINDI]: mediumHi }
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
            [Language.HINDI]: 'स्टेट म्यूज़ियम, भोपाल'
        },
        location: {
            [Language.ENGLISH]: 'Shyamla Hills, near Bharat Bhavan',
            [Language.HINDI]: 'श्यामला हिल्स, भारत भवन के पास'
        },
        shortDescription: {
            [Language.ENGLISH]: 'The premier museum of Madhya Pradesh housing a vast collection of artifacts.',
            [Language.HINDI]: 'मध्य प्रदेश का प्रमुख संग्रहालय, जिसमें अनेक कलाकृतियाँ संग्रहीत हैं।'
        },
        description: {
            [Language.ENGLISH]: 'Set in a beautiful, sprawling complex, the State Museum is the custodian of Madhya Pradesh\'s rich heritage. From prehistoric fossils to medieval sculpture, it offers a journey through time.',
            [Language.HINDI]: 'एक सुंदर विस्तृत परिसर में स्थित, स्टेट म्यूज़ियम मध्य प्रदेश की समृद्ध विरासत का संरक्षक है। प्रागैतिहासिक जीवाश्मों से लेकर मध्यकालीन मूर्तियों तक, यह समय यात्रा प्रदान करता है।'
        },
        image: stateMuseumImg,
        galleryImages: getGalleryItems(100, 6, 'History'),
        features: {
            [Language.ENGLISH]: ['Archaeology', 'Numismatics', 'Fossils', 'Tribal Art'],
            [Language.HINDI]: ['पुरातत्व', 'सिक्काशास्त्र', 'जीवाश्म', 'जनजातीय कला']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Archaeology Section', [Language.HINDI]: 'पुरातत्व अनुभाग' },
                description: {
                    [Language.ENGLISH]: 'Features sculptures from Sanchi, Udayagiri, and Khajuraho.',
                    [Language.HINDI]: 'सांची, उदयगिरि और खजुराहो की मूर्तियाँ यहाँ प्रदर्शित हैं।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Fossil Section', [Language.HINDI]: 'जीवाश्म अनुभाग' },
                description: {
                    [Language.ENGLISH]: 'Includes a 65-million-year-old fossil of a dinosaur egg.',
                    [Language.HINDI]: 'यहाँ 65 मिलियन वर्ष पुराना डायनासोर अंडे का जीवाश्म शामिल है।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Mansoor Gallery', [Language.HINDI]: 'मंसूर गैलरी' },
                description: {
                    [Language.ENGLISH]: 'Named after the legendary Mughal painter, displaying miniature paintings.',
                    [Language.HINDI]: 'प्रख्यात मुग़ल चित्रकार के नाम पर, लघु चित्रों का प्रदर्शन।'
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
            [Language.HINDI]: 'मानव संग्रहालय (IGRMS)'
        },
        location: {
            [Language.ENGLISH]: 'Shamla Hills, near Upper Lake',
            [Language.HINDI]: 'श्यामला हिल्स, अपर लेक के पास'
        },
        shortDescription: {
            [Language.ENGLISH]: 'A massive open-air "Museum of Mankind" spread over 200 acres.',
            [Language.HINDI]: '200 एकड़ में फैला विशाल खुले-आकाश "मानव संग्रहालय"।'
        },
        description: {
            [Language.ENGLISH]: 'Not a conventional museum, IGRMS is a celebration of human evolution and cultural diversity. It features life-size tribal dwellings and open-air exhibits that blend seamlessly with the natural landscape.',
            [Language.HINDI]: 'IGRMS पारंपरिक संग्रहालय नहीं है; यह मानव विकास और सांस्कृतिक विविधता का उत्सव है। यहाँ जीवन-आकार की जनजातीय आवास और खुली-हवा प्रदर्शनियां हैं।'
        },
        image: manavSangrahalayaImg,
        galleryImages: getGalleryItems(200, 6, 'Tribal'),
        features: {
            [Language.ENGLISH]: ['Open-Air Exhibits', 'Tribal Dwellings', 'Boat Gallery'],
            [Language.HINDI]: ['खुले प्रदर्शनी', 'जनजातीय आवास', 'बोट गैलरी']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Open-Air Exhibits', [Language.HINDI]: 'खुले प्रदर्शनी' },
                description: {
                    [Language.ENGLISH]: 'Authentic, life-size replicas of traditional tribal and rural dwellings.',
                    [Language.HINDI]: 'परंपरागत जनजातीय और ग्रामीण आवास की वास्तविक जीवन-आकार प्रतिकृतियाँ।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Village Complex', [Language.HINDI]: 'गाँव परिसर' },
                description: {
                    [Language.ENGLISH]: 'A walk-through replica of a tribal village.',
                    [Language.HINDI]: 'एक चलकर देखने योग्य जनजातीय गाँव की प्रतिकृति।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Boat Gallery', [Language.HINDI]: 'बोट गैलरी' },
                description: {
                    [Language.ENGLISH]: 'A unique museum on a boat showcasing maritime culture.',
                    [Language.HINDI]: 'समुद्री संस्कृति को प्रदर्शित करने वाला नाव पर अद्वितीय संग्रहालय।'
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
            [Language.HINDI]: 'भारत भवन'
        },
        location: {
            [Language.ENGLISH]: 'Shamla Hills, near Upper Lake',
            [Language.HINDI]: 'श्यामला हिल्स, अपर लेक के पास'
        },
        shortDescription: {
            [Language.ENGLISH]: 'A multi-arts complex housing a superb art museum for art lovers.',
            [Language.HINDI]: 'कला प्रेमियों के लिए उत्कृष्ट कला संग्रहालय वाला बहु-कलात्मक परिसर।'
        },
        description: {
            [Language.ENGLISH]: 'Designed by Charles Correa, Bharat Bhavan is a center for the performing and visual arts. The Roopankar Museum within it is a treasure trove of tribal and modern Indian art.',
            [Language.HINDI]: 'चार्ल्स कोरेया द्वारा डिजाइन किया गया, भारत भवन प्रदर्शन और दृश्य कलाओं का एक केंद्र है। इसके अंदर रुपंकर म्यूज़ियम में जनजातीय और आधुनिक भारतीय कला का खज़ाना है।'
        },
        image: bharatBhavanImg,
        galleryImages: getGalleryItems(300, 5, 'Art'),
        features: {
            [Language.ENGLISH]: ['Modern Art', 'Tribal Art', 'Graphic Studio', 'Theater'],
            [Language.HINDI]: ['आधुनिक कला', 'जनजातीय कला', 'ग्राफिक स्टूडियो', 'थिएटर']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Roopankar Museum of Arts', [Language.HINDI]: 'रूपांकर कला संग्रहालय' },
                description: {
                    [Language.ENGLISH]: 'Excellent collection of indigenous, tribal, and contemporary Indian art.',
                    [Language.HINDI]: 'देशीय, जनजातीय और समकालीन भारतीय कला का उत्कृष्ट संग्रह।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Collection', [Language.HINDI]: 'संग्रह' },
                description: {
                    [Language.ENGLISH]: 'Gond and Bhil paintings, terracotta works, and canvases by modern masters.',
                    [Language.HINDI]: 'गोंड और भील चित्रकला, टेराकोटा कार्य और आधुनिक कलाकारों के कैनवास।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Graphic Studio', [Language.HINDI]: 'ग्राफिक स्टूडियो' },
                description: {
                    [Language.ENGLISH]: 'Live print-making studio.',
                    [Language.HINDI]: 'लाइव प्रिंट-निर्माण स्टूडियो।'
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
            [Language.HINDI]: 'जनजातीय संग्रहालय'
        },
        location: {
            [Language.ENGLISH]: 'Next to State Museum, Shyamla Hills',
            [Language.HINDI]: 'स्टेट म्यूज़ियम के बगल में, श्यामला हिल्स'
        },
        shortDescription: {
            [Language.ENGLISH]: 'A vibrant museum dedicated exclusively to the tribal communities of MP.',
            [Language.HINDI]: 'मध्य प्रदेश की जनजातीय समुदायों को समर्पित एक जीवंत संग्रहालय।'
        },
        description: {
            [Language.ENGLISH]: 'This museum is not just about artifacts; it is about the living traditions of the Gond, Bhil, Baiga, and Korku tribes. The architecture and installations are immersive and colorful.',
            [Language.HINDI]: 'यह संग्रहालय केवल कलाकृतियों के बारे में नहीं है; यह गोंड, भील, बैगा और कोरकू जनजातियों की जीवंत परंपराओं के बारे में है। इसकी वास्तुकला और प्रदर्शनियाँ इमर्सिव और रंगीन हैं।'
        },
        image: tribalMuseumImg,
        galleryImages: getGalleryItems(400, 6, 'Tribal'),
        features: {
            [Language.ENGLISH]: ['Interactive Displays', 'Thematic Galleries', 'Art Shop'],
            [Language.HINDI]: ['इंटरैक्टिव डिस्प्ले', 'थीमैटिक गैलरी', 'आर्ट शॉप']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'Thematic Galleries', [Language.HINDI]: 'थीमैटिक गैलरी' },
                description: {
                    [Language.ENGLISH]: 'Dedicated to different tribes, showcasing rituals, music, and daily life.',
                    [Language.HINDI]: 'विभिन्न जनजातियों को समर्पित, रीति-रिवाज़, संगीत और दैनिक जीवन को दर्शाती प्रदर्शनियाँ।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Interactive Displays', [Language.HINDI]: 'इंटरैक्टिव डिस्प्ले' },
                description: {
                    [Language.ENGLISH]: 'Uses sound, light, and life-size installations.',
                    [Language.HINDI]: 'ध्वनि, प्रकाश और जीवन-आकार की инस्टॉलेशन का उपयोग।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Art Shop', [Language.HINDI]: 'आर्ट शॉप' },
                description: {
                    [Language.ENGLISH]: 'Sells authentic tribal handicrafts.',
                    [Language.HINDI]: 'प्रामाणिक जनजातीय हस्तशिल्प बेचता है।'
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
            [Language.HINDI]: 'घिड़र मेमोरियल म्यूज़ियम'
        },
        location: {
            [Language.ENGLISH]: 'Hamidia Road, near Taj-ul-Masajid',
            [Language.HINDI]: 'हमिदिया रोड, ताज-उल-मस्जिद के पास'
        },
        shortDescription: {
            [Language.ENGLISH]: 'Housed in the historic building of the Bhopal Gas Tragedy.',
            [Language.HINDI]: 'भोपाल गैस त्रासदी की ऐतिहासिक इमारत में स्थित।'
        },
        description: {
            [Language.ENGLISH]: 'A poignant reminder of the 1984 tragedy, this museum documents the events, aftermath, and struggle for justice of the world\'s worst industrial disaster.',
            [Language.HINDI]: '1984 की त्रासदी की एक मार्मिक स्मृति, यह संग्रहालय घटनाओं, परिणामी प्रभाव और न्याय के संघर्ष का दस्तावेजीकरण करता है।'
        },
        image: ghadarMemorialImg,
        galleryImages: getGalleryItems(500, 4, 'Modern'),
        features: {
            [Language.ENGLISH]: ['Historical Records', 'Photography', 'Industrial History'],
            [Language.HINDI]: ['ऐतिहासिक अभिलेख', 'फोटोग्राफी', 'औद्योगिक इतिहास']
        },
        highlights: [
            {
                title: { [Language.ENGLISH]: 'A Memorial', [Language.HINDI]: 'स्मारक' },
                description: {
                    [Language.ENGLISH]: 'Serves as a sobering reminder of December 2-3, 1984.',
                    [Language.HINDI]: '2-3 दिसंबर, 1984 की घटना की गंभीर स्मृति प्रस्तुत करता है।'
                }
            },
            {
                title: { [Language.ENGLISH]: 'Exhibits', [Language.HINDI]: 'प्रदर्शनी' },
                description: {
                    [Language.ENGLISH]: 'Photographs, documents, and news clippings detailing the event.',
                    [Language.HINDI]: 'घटना से संबंधित फ़ोटो, दस्तावेज़ और समाचार क्लिपिंग्स।'
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
// Add hero and featured labels
ENGLISH_LABELS.featuredExhibition = 'Featured Exhibition';
ENGLISH_LABELS.heroBadge = 'Explore the Heritage of Bhopal';
ENGLISH_LABELS.heroTagline = 'Discover the rich heritage, tribal culture, and artistic legacy of the City of Lakes through an immersive digital experience.';
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
// Add hero and featured labels in Hindi
HINDI_LABELS.featuredExhibition = 'प्रमुख प्रदर्शनी';
HINDI_LABELS.heroBadge = 'भोपाल की विरासत खोजें';
HINDI_LABELS.heroTagline = 'डिस्कवर द रिच हेरिटेज, जनजातीय संस्कृति और कला विरासत ऑफ़ सिटी ऑफ़ लेक्स थ्रू ए इमर्सिव डिजिटल एक्सपीरियंस.';
export const UI_LABELS = {
    [Language.ENGLISH]: ENGLISH_LABELS,
    [Language.HINDI]: HINDI_LABELS // Local Hindi fallback labels
};
