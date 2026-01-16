
import React, { useState, useEffect } from 'react';
import { Section, VideoItem, PDFResource } from './types';
import { MAIN_COURSE_PLAYLIST, TUTORIALS, PDF_RESOURCES } from './constants';
import LockScreen from './components/LockScreen';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [currentVideo, setCurrentVideo] = useState<VideoItem>(MAIN_COURSE_PLAYLIST[0]);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [premiumCode, setPremiumCode] = useState('');
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  if (!isUnlocked) {
    return <LockScreen onUnlock={() => setIsUnlocked(true)} />;
  }

  const handlePremiumUnlock = () => {
    if (premiumCode.toUpperCase() === 'ND_2026') {
      setIsPremiumUnlocked(true);
    } else {
      alert("Code ND Incorrect");
    }
  };

  const SectionDivider = ({ title }: { title: string }) => (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white shrink-0">{title}</h2>
      <div className="flex-grow ml-8 h-px bg-gradient-to-r from-[#00ff99] to-transparent opacity-30"></div>
    </div>
  );

  return (
    <div className="min-h-screen text-white pb-24 lg:pb-0 flex flex-col">
      {/* HEADER DESKTOP */}
      <header className="sticky top-0 z-50 py-4 bg-black/90 backdrop-blur-xl border-b border-gray-900">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-12">
            <h1 
              onClick={() => setActiveSection('home')} 
              className="text-3xl font-black italic tracking-tighter text-[#00ff99] logo-neon cursor-pointer"
            >
              GROK
            </h1>
            <nav className="hidden lg:block">
              <ul className="flex space-x-8 text-[11px] font-black uppercase tracking-widest text-gray-500">
                {['home', 'tutoriels', 'pdfs', 'directs', 'premium'].map((s) => (
                  <li key={s}>
                    <button 
                      onClick={() => setActiveSection(s as Section)}
                      className={`relative py-2 transition-all hover:text-white ${activeSection === s ? 'text-[#00ff99]' : ''}`}
                    >
                      {s === 'home' ? 'Accueil' : s === 'pdfs' ? 'Débuter en ...' : s === 'premium' ? 'GROK ND' : s.charAt(0).toUpperCase() + s.slice(1)}
                      {activeSection === s && (
                        <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00ff99] shadow-[0_0_10px_#00ff99]" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-gray-800 flex items-center justify-center overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=User&background=1a1a1a&color=fff" alt="User" />
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAV */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-black/80 backdrop-blur-2xl border-t border-gray-900 px-6 py-4">
        <div className="flex justify-between items-center max-w-md mx-auto">
          {[
            { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            { id: 'tutoriels', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
            { id: 'pdfs', icon: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z' },
            { id: 'directs', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 00-2 2z' },
            { id: 'premium', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)} 
              className={`flex flex-col items-center space-y-1 transition-all ${activeSection === item.id ? 'text-[#00ff99]' : 'text-gray-600'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              <span className="text-[8px] font-black uppercase">{item.id === 'pdfs' ? 'PDF' : item.id === 'premium' ? 'ND' : item.id}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 lg:py-16 flex-grow">
        
        {/* HOME */}
        {activeSection === 'home' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <SectionDivider title="Formation Masterclass" />
            <div className="flex flex-col lg:flex-row gap-8 bg-[#0a0a0a] rounded-[2.5rem] p-4 lg:p-8 border border-gray-900 shadow-2xl">
              <div className="lg:w-2/3">
                <div className="aspect-video bg-black rounded-[1.5rem] overflow-hidden border border-gray-800">
                  <iframe 
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=0`}
                    allowFullScreen
                  />
                </div>
                <div className="mt-8">
                  <h3 className="text-2xl lg:text-3xl font-black tracking-tight">{currentVideo.title}</h3>
                  <p className="text-gray-500 text-sm mt-3 font-medium leading-relaxed">{currentVideo.description}</p>
                </div>
              </div>
              
              <div className="lg:w-1/3 flex flex-col h-[450px] lg:h-auto">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                  <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">Contenu du cours</span>
                  <span className="text-[10px] bg-[#1a1a1a] px-3 py-1 rounded-full text-[#00ff99] font-black tracking-tighter uppercase">{MAIN_COURSE_PLAYLIST.length} Épisodes</span>
                </div>
                <div className="overflow-y-auto flex-grow custom-scrollbar space-y-2 p-2 mt-4">
                  {MAIN_COURSE_PLAYLIST.map((video, idx) => (
                    <button 
                      key={video.id}
                      onClick={() => setCurrentVideo(video)}
                      className={`w-full text-left p-5 rounded-2xl transition-all flex items-center space-x-4 border ${
                        currentVideo.id === video.id 
                          ? 'bg-[#00ff99]/5 border-[#00ff99]/20 text-[#00ff99]' 
                          : 'bg-transparent border-transparent text-gray-400 hover:bg-gray-900/50 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] font-black opacity-30">{(idx + 1).toString().padStart(2, '0')}</span>
                      <span className="text-xs font-bold leading-tight">{video.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TUTORIELS */}
        {activeSection === 'tutoriels' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <SectionDivider title="Bibliothèque Tutoriels" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TUTORIALS.map((tuto) => (
                <div 
                  key={tuto.id}
                  onClick={() => setModalVideo(tuto)}
                  className="bg-[#0f0f0f] border border-gray-900 rounded-[2rem] overflow-hidden group cursor-pointer transition-all hover:translate-y-[-6px] hover:border-[#00ff99] hover:shadow-[0_20px_40px_-15px_rgba(0,255,153,0.15)]"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={`https://img.youtube.com/vi/${tuto.youtubeId}/maxresdefault.jpg`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      alt={tuto.title}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-[#00ff99] rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-black fill-current" viewBox="0 0 20 20">
                          <path d="M4.5 3.5l12 6.5-12 6.5v-13z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[#00ff99] text-[9px] font-black uppercase tracking-widest">{tuto.level}</span>
                    <h4 className="font-bold text-lg mt-1 group-hover:text-[#00ff99] transition leading-tight">{tuto.title}</h4>
                    <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">{tuto.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PDFS */}
        {activeSection === 'pdfs' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <SectionDivider title="Débuter dans les langages" />
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.3em] mb-12">Guides PDF de démarrage rapide pour les futurs experts.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {PDF_RESOURCES.map((pdf) => (
                <div 
                  key={pdf.id}
                  className={`bg-[#0f0f0f] p-10 rounded-[2.5rem] border border-gray-900 flex flex-col items-center text-center relative overflow-hidden group hover:border-${pdf.color}-500/30 transition-all duration-500`}
                >
                  <div className={`w-24 h-24 bg-${pdf.color}-500/10 text-${pdf.color}-500 rounded-[2rem] flex items-center justify-center mb-8 border border-${pdf.color}-500/20 group-hover:scale-110 transition-transform`}>
                    <span className="text-4xl font-black">{pdf.icon}</span>
                  </div>
                  <h4 className="font-black text-xl mb-2">{pdf.title}</h4>
                  <p className="text-[10px] text-gray-600 mb-8 uppercase tracking-widest font-bold">{pdf.category}</p>
                  <ul className="text-[10px] text-gray-500 text-left w-full space-y-3 mb-10 font-bold uppercase">
                    {pdf.topics.map((topic, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <span className={`w-1.5 h-1.5 bg-${pdf.color}-500 rounded-full`}></span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={pdf.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`w-full py-5 bg-${pdf.color}-500 text-${pdf.color === 'yellow' || pdf.color === 'orange' ? 'black' : 'white'} font-black rounded-[1.5rem] hover:opacity-90 transition-all uppercase text-[10px] tracking-widest text-center shadow-lg`}
                  >
                    Télécharger PDF
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DIRECTS */}
        {activeSection === 'directs' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            <SectionDivider title="Archives Directs" />
            <div className="bg-blue-600/5 border border-blue-500/20 rounded-[2.5rem] p-12 lg:p-20 mb-12 text-center">
              <span className="inline-block px-4 py-2 bg-blue-500/10 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Prochainement</span>
              <h3 className="text-3xl lg:text-5xl font-black text-blue-400 italic tracking-tighter mb-4">SAMEDI 18H : REVUE DE CODE</h3>
              <p className="text-gray-500 uppercase text-xs tracking-widest font-bold">Session interactive de debugging en direct sur Discord & Plateforme</p>
            </div>
          </div>
        )}

        {/* PREMIUM */}
        {activeSection === 'premium' && (
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
            {!isPremiumUnlocked ? (
              <div className="max-w-2xl mx-auto text-center p-12 lg:p-20 border border-dashed border-[#facc15]/30 rounded-[3rem] bg-[#0a0a0a]">
                <div className="mb-10 inline-block p-6 rounded-full bg-[#facc15]/10 text-[#facc15]">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-2xl lg:text-4xl font-black text-[#facc15] mb-4 uppercase italic tracking-tighter">ZONE CONFIDENTIELLE GROK ND</h2>
                <p className="text-gray-500 text-[10px] mb-12 uppercase tracking-[0.4em] font-bold">Accès réservé aux membres de l'élite ARAKNET.</p>
                
                <div className="space-y-5">
                  <input 
                    type="password" 
                    value={premiumCode}
                    onChange={(e) => setPremiumCode(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePremiumUnlock()}
                    placeholder="CODE ND" 
                    className="w-full bg-black border border-gray-800 rounded-2xl px-6 py-5 text-center focus:border-[#facc15] outline-none text-white tracking-[0.8em] font-black text-xl transition-all"
                  />
                  <button 
                    onClick={handlePremiumUnlock}
                    className="w-full bg-[#facc15] text-black font-black py-5 rounded-2xl hover:bg-yellow-400 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-widest shadow-xl"
                  >
                    Pénétrer la zone
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-1000">
                <div className="text-center mb-16">
                  <span className="text-[#facc15] text-[10px] font-black uppercase tracking-[0.6em] block mb-4">Accès Autorisé</span>
                  <h2 className="text-5xl lg:text-7xl font-black text-[#facc15] italic tracking-tighter">COULOIR ND</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-[#0f0f0f] border border-[#facc15]/20 p-8 rounded-[2rem] aspect-square flex items-center justify-center group hover:border-[#facc15] transition-all cursor-pointer">
                      <div className="text-center">
                        <div className="text-[#facc15] font-black text-6xl mb-4 group-hover:scale-110 transition-transform">0{i}</div>
                        <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Contenu Secret</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="py-16 border-t border-gray-900 text-center">
        <div className="text-[#00ff99] font-black italic text-2xl mb-4 tracking-tighter">GROK</div>
        <p className="text-gray-700 text-[10px] tracking-[0.6em] uppercase font-black">Système ARAKNET &copy; 2026</p>
      </footer>

      {/* CHAT WIDGET */}
      <ChatWidget />

      {/* VIDEO MODAL */}
      {modalVideo && (
        <div className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="w-full max-w-5xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#00ff99] font-black uppercase tracking-widest text-sm">{modalVideo.title}</h3>
              <button 
                onClick={() => setModalVideo(null)}
                className="text-white text-4xl hover:text-[#00ff99] transition"
              >
                &times;
              </button>
            </div>
            <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-gray-800 shadow-2xl">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${modalVideo.youtubeId}?autoplay=1`} 
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
