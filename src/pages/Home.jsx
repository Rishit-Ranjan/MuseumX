import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Search, ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react';
import { AppContext } from '../App';
import { Language } from '../../types';

const ExhibitionSlider = ({ museums = [] }) => {
  const [current, setCurrent] = useState(0);
  const { language, uiLabels: labels } = useContext(AppContext);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c === museums.length - 1 ? 0 : c + 1)), 6000);
    return () => clearInterval(t);
  }, [museums.length]);

  if (!museums.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-20 relative z-30">
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-white/10 p-2 shadow-2xl">
        <div className="relative h-[450px] md:h-[500px] rounded-2xl overflow-hidden group">
          {museums.map((museum, idx) => {
            const exhibition = museum.highlights?.[0];
            const bgImage = museum.galleryImages?.[0]?.url || museum.image;
            const title = exhibition?.title?.[language] || '';
            const desc = exhibition?.description?.[language] || '';
            return (
              <div
                key={museum.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === current ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}>
                <img src={bgImage} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col justify-end h-full">
                  <div className={`transform transition-all duration-700 delay-200 ${idx === current ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/90 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wider">
                        <Star size={12} /> {labels.featuredExhibition}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">{title}</h3>
                    <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl">{desc}</p>
                    <div className="flex flex-wrap items-center gap-6">
                      <Link to={`/museum/${museum.id}`} className="group/btn bg-white/10 hover:bg-amber-500 hover:text-slate-900 text-white border border-white/30 px-8 py-3 rounded-full font-bold flex items-center gap-2">
                        {labels.readMore} <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="absolute bottom-8 right-8 z-20 flex gap-3">
            <button onClick={() => setCurrent((c) => (c === 0 ? museums.length - 1 : c - 1))} className="bg-black/30 p-3 rounded-full">
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => setCurrent((c) => (c === museums.length - 1 ? 0 : c + 1))} className="bg-black/30 p-3 rounded-full">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const { museums = [], language, uiLabels: labels } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = museums.filter((m) => {
    const name = m.name[language] || m.name[Language.ENGLISH] || '';
    const location = m.location[language] || m.location[Language.ENGLISH] || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="pb-20">
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-950" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto -mt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
            <Sparkles size={16} className="text-amber-400" />
            <span className="text-slate-300 text-sm font-medium">{labels.heroBadge}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white to-amber-200">{labels.appName || 'MuseumX'}</h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">{labels.heroTagline}</p>

          <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full blur opacity-20" />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="text-slate-400" />
              </div>
              <input type="text" placeholder={labels.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-full py-4 pl-12 pr-6 text-white placeholder-slate-500" />
            </div>
          </div>
        </div>
      </section>

      <ExhibitionSlider museums={museums} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-1.5 h-10 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full" />
          <h2 className="text-3xl font-bold text-white">{labels.explore}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((museum) => (
            <Link key={museum.id} to={`/museum/${museum.id}`} className="group bg-slate-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
              <div className="relative h-64 overflow-hidden">
                <img src={museum.image} alt={museum.name[language] || museum.name[Language.ENGLISH]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-90" />
                <div className="absolute bottom-5 left-5 right-5 z-10">
                  <h3 className="text-2xl font-bold text-white mb-2">{museum.name[language] || museum.name[Language.ENGLISH]}</h3>
                  <div className="flex items-center text-slate-400 text-sm gap-1.5"><MapPin size={14} className="text-amber-500" /> <span className="truncate">{museum.location[language] || museum.location[Language.ENGLISH]}</span></div>
                </div>
              </div>

              <div className="p-6 pt-2 flex-1 flex flex-col">
                <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed border-b border-slate-800 pb-4">{museum.shortDescription[language] || museum.shortDescription[Language.ENGLISH]}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex gap-2">
                    {(museum.features[language] || museum.features[Language.ENGLISH] || []).slice(0, 2).map((feature, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs font-medium rounded-lg border border-slate-700">{feature}</span>
                    ))}
                  </div>
                  <span className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-amber-500"><ArrowRight size={20} /></span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && <div className="text-center py-20 text-slate-500">{labels.noResults || 'No museums found matching your search.'}</div>}
      </section>
    </div>
  );
};

export default Home;
