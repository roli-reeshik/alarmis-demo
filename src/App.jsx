import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, CheckCircle, Play, MessageCircle, LayoutDashboard, Globe, ArrowLeft, Search, FileText, Target, Info } from 'lucide-react';

// --- TRANSLATION DATA ---
const translations = {
  en: {
    title: "Oxygen Therapy",
    searchPlaceholder: "Search clinical terms...",
    tabs: ["Introduction", "Definition", "Purpose", "Study Material"],
    flipPrompt: "Click for clinical application",
    dashTitle: "Institutional Overview",
    viewDash: "View Dashboard",
    back: "Back to Learning",
    purposeText: "To maintain adequate tissue oxygenation while minimizing cardiopulmonary work.",
    introText: "Oxygen therapy is a medical intervention that provides supplemental oxygen to patients with respiratory distress."
  },
  hi: {
    title: "ऑक्सीजन थेरेपी",
    searchPlaceholder: "नैदानिक शब्द खोजें...",
    tabs: ["परिचय", "परिभाषा", "उद्देश्य", "अध्ययन सामग्री"],
    flipPrompt: "नैदानिक उपयोग के लिए क्लिक करें",
    dashTitle: "संस्थान का अवलोकन",
    viewDash: "डैशबोर्ड देखें",
    back: "सीखने पर वापस जाएं",
    purposeText: "कार्डियोपल्मोनरी कार्य को कम करते हुए पर्याप्त ऊतक ऑक्सीजन बनाए रखना।",
    introText: "ऑक्सीजन थेरेपी एक चिकित्सा हस्तक्षेप है जो श्वसन संकट वाले रोगियों को पूरक ऑक्सीजन प्रदान करता है।"
  }
};

export default function AlarmisApp() {
  const [lang, setLang] = useState('en');
  const [view, setView] = useState('learning');
  const [activeTab, setActiveTab] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const t = translations[lang];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">A</div>
          <span className="text-xl font-black text-blue-900 uppercase tracking-tighter">Alarmis.in</span>
        </div>
        
        <div className="hidden md:flex relative w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder={t.searchPlaceholder} className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="text-xs font-bold text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50">
            <Globe size={14} className="inline mr-1"/> {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <button onClick={() => setView(view === 'learning' ? 'dashboard' : 'learning')} className="bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase">
            {view === 'learning' ? t.viewDash : t.back}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        {view === 'learning' ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <header className="text-center py-4">
              <h1 className="text-4xl font-black text-slate-900">{t.title}</h1>
            </header>

            {/* Structured Content Tabs */}
            <div className="flex space-x-1 bg-slate-200 p-1 rounded-xl overflow-x-auto">
              {t.tabs.map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === idx ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {idx === 0 && <Info size={14}/>}
                  {idx === 1 && <FileText size={14}/>}
                  {idx === 2 && <Target size={14}/>}
                  {idx === 3 && <BookOpen size={14}/>}
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab + lang}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[300px]"
              >
                {activeTab === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-800">{t.tabs[0]}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{t.introText}</p>
                    
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold text-blue-800 mb-6">{t.tabs[1]}</h3>
                    <div className="relative w-full max-w-sm h-52 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                      <motion.div className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-500" animate={{ rotateY: isFlipped ? 180 : 0 }}>
                        <div className="absolute inset-0 bg-blue-600 text-white rounded-2xl flex flex-col items-center justify-center p-6 [backface-visibility:hidden]">
                          <h4 className="text-2xl font-black">Hypoxia</h4>
                          <p className="mt-2 text-[10px] uppercase tracking-widest opacity-70">{t.flipPrompt}</p>
                        </div>
                        <div className="absolute inset-0 bg-slate-50 border-2 border-blue-600 rounded-2xl flex items-center justify-center p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          <p className="text-center font-medium">A state where the body is deprived of adequate oxygen supply at the tissue level.</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-800">{t.tabs[2]}</h3>
                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r-xl">
                      <p className="text-blue-900 font-medium italic">"{t.purposeText}"</p>
                    </div>
                  </div>
                )}

                {activeTab === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-800">{t.tabs[3]}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-100 rounded-xl flex items-center gap-3">
                        <Play className="text-blue-600" />
                        <div>
                          <p className="text-sm font-bold">Video: Flow Meter Setup</p>
                          <p className="text-xs text-slate-500">4:20 mins</p>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-100 rounded-xl flex items-center gap-3">
                        <FileText className="text-red-600" />
                        <div>
                          <p className="text-sm font-bold">PDF: Safety Checklist</p>
                          <p className="text-xs text-slate-500">2.4 MB</p>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Dashboard View - Unchanged from previous but compatible */
          <div className="bg-white p-8 rounded-3xl border shadow-sm">
             <h2 className="text-2xl font-black mb-6">Institutional Dashboard</h2>
             <p className="text-slate-500">Real-time student mastery data goes here...</p>
          </div>
        )}
      </main>

      <button className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={28} />
      </button>
    </div>
  );
}