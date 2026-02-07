import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, BookOpen, CheckCircle, Play, MessageCircle, 
  LayoutDashboard, Globe, Search, FileText, Target, Info 
} from 'lucide-react';

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
    introText: "Oxygen therapy is a medical intervention that provides supplemental oxygen to patients with respiratory distress or chronic conditions.",
    checklistTitle: "Safety Checklist Preview",
    downloadBtn: "DOWNLOAD PDF"
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
    introText: "ऑक्सीजन थेरेपी एक चिकित्सा हस्तक्षेप है जो श्वसन संकट या पुरानी स्थितियों वाले रोगियों को पूरक ऑक्सीजन प्रदान करता है।",
    checklistTitle: "सुरक्षा चेकलिस्ट पूर्वावलोकन",
    downloadBtn: "पीडीएफ डाउनलोड करें"
  }
};

const checklistData = [
  { en: "Verify physician's order for flow rate", hi: "प्रवाह दर के लिए चिकित्सक के आदेश की पुष्टि करें" },
  { en: "Check for 'No Smoking' signs", hi: "धूम्रपान निषेध संकेतों की जाँच करें" },
  { en: "Ensure sterile water in humidifier", hi: "ह्यूमिडिफ़ायर में स्टेरिल पानी सुनिश्चित करें" },
  { en: "Monitor skin for pressure sores", hi: "दबाव के घावों के लिए त्वचा की निगरानी करें" }
];

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
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">A</div>
          <span className="text-xl font-black text-blue-900 uppercase tracking-tighter">Alarmis.in</span>
        </div>
        
        <div className="hidden md:flex relative w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder={t.searchPlaceholder} className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setLang(lang === 'en' ? 'hi' : 'en')} className="flex items-center gap-1 text-xs font-bold text-blue-600 border border-blue-200 px-3 py-2 rounded-xl hover:bg-blue-50 transition-all">
            <Globe size={14}/> {lang === 'en' ? 'हिन्दी' : 'English'}
          </button>
          <button onClick={() => setView(view === 'learning' ? 'dashboard' : 'learning')} className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
            {view === 'learning' ? t.viewDash : t.back}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6">
        {view === 'learning' ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <header className="text-center py-6">
              <h1 className="text-5xl font-black text-slate-900 tracking-tight">{t.title}</h1>
            </header>

            {/* Structured Navigation Tabs */}
            <div className="flex space-x-1 bg-slate-200/50 p-1.5 rounded-2xl overflow-x-auto border border-slate-200">
              {t.tabs.map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => {setActiveTab(idx); setIsFlipped(false);}}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 text-xs font-black rounded-xl transition-all whitespace-nowrap ${activeTab === idx ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {idx === 0 && <Info size={14}/>}
                  {idx === 1 && <FileText size={14}/>}
                  {idx === 2 && <Target size={14}/>}
                  {idx === 3 && <BookOpen size={14}/>}
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Container */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab + lang}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 min-h-[400px]"
              >
                {/* Intro Tab */}
                {activeTab === 0 && (
                  <div className="space-y-6">
                    <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase">{t.tabs[0]}</div>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium">{t.introText}</p>
                    <div className="bg-slate-100 rounded-3xl h-48 flex items-center justify-center text-slate-400 italic text-sm">
                      
                    </div>
                  </div>
                )}

                {/* Definition Tab with Flip Card */}
                {activeTab === 1 && (
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase mb-8">{t.tabs[1]}</div>
                    <div className="relative w-full max-w-sm h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
                      <motion.div className="w-full h-full relative [transform-style:preserve-3d] transition-all duration-700" animate={{ rotateY: isFlipped ? 180 : 0 }}>
                        <div className="absolute inset-0 bg-blue-600 text-white rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl [backface-visibility:hidden]">
                          <h4 className="text-4xl font-black">Hypoxia</h4>
                          <p className="mt-4 text-xs font-bold uppercase tracking-widest opacity-80">{t.flipPrompt}</p>
                        </div>
                        <div className="absolute inset-0 bg-white border-4 border-blue-600 rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          <p className="text-center text-lg font-bold text-slate-800 leading-snug">
                            {lang === 'en' 
                              ? "A state where the body is deprived of adequate oxygen supply at the tissue level."
                              : "ऐसी स्थिति जिसमें शरीर के ऊतकों को पर्याप्त ऑक्सीजन की आपूर्ति नहीं मिल पाती है।"}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Purpose Tab */}
                {activeTab === 2 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase">{t.tabs[2]}</div>
                    <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 opacity-10"><Target size={120} /></div>
                      <p className="text-2xl font-bold italic leading-tight relative z-10">"{t.purposeText}"</p>
                    </div>
                  </div>
                )}

                {/* Study Material Tab with Checklist */}
                {activeTab === 3 && (
                  <div className="space-y-6">
                    <div className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase">{t.tabs[3]}</div>
                    
                    {/* Simulated PDF Download */}
                    <div className="flex items-center justify-between p-5 bg-red-50 border border-red-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <div className="bg-red-600 p-2 rounded-lg text-white"><FileText size={20} /></div>
                        <div>
                          <p className="text-sm font-black text-slate-900 tracking-tight">Safety_Protocol_v2.pdf</p>
                          <p className="text-[10px] text-red-600 font-bold uppercase tracking-wider">1.4 MB • {lang === 'en' ? 'Bilingual' : 'द्विभाषी'}</p>
                        </div>
                      </div>
                      <button className="bg-white border-2 border-red-600 text-red-600 px-4 py-2 rounded-xl text-xs font-black hover:bg-red-600 hover:text-white transition-all shadow-sm">
                        {t.downloadBtn}
                      </button>
                    </div>

                    {/* Live Safety Checklist Preview */}
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">{t.checklistTitle}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {checklistData.map((item, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                            <div className="bg-green-100 p-1 rounded-full"><CheckCircle className="text-green-600" size={16} /></div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{item.en}</p>
                              <p className="text-xs text-slate-500 font-medium">{item.hi}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Institutional Dashboard View */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.dashTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-100/50">
                <Users className="text-blue-600 mb-4" size={32} />
                <p className="text-xs font-black text-blue-500 uppercase tracking-widest">Total Active Learners</p>
                <p className="text-5xl font-black text-slate-900 mt-2 tracking-tighter">1,240</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-green-100/50">
                <Target className="text-green-600 mb-4" size={32} />
                <p className="text-xs font-black text-green-500 uppercase tracking-widest">Average Module Mastery</p>
                <p className="text-5xl font-black text-slate-900 mt-2 tracking-tighter">88%</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Support FAB */}
      <button className="fixed bottom-8 right-8 bg-blue-600 text-white p-5 rounded-3xl shadow-2xl hover:scale-110 hover:rotate-12 transition-all active:scale-95">
        <MessageCircle size={28} />
      </button>
    </div>
  );
}