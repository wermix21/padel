
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Instagram, 
  MessageCircle, 
  Calendar, 
  Clock as ClockIcon, 
  User, 
  ChevronRight,
  ChevronDown,
  Info,
  CheckCircle2,
  Phone,
  Zap,
  Target,
  Layers,
  Search,
  Filter,
  ShieldCheck,
  Award,
  Flashlight,
  Sun,
  Moon
} from 'lucide-react';
import { RACKETS, RULES_GROUPS, WHATSAPP_NUMBER, INSTAGRAM_HANDLE, DEPOSIT_AMOUNT } from './constants';
import { Racket, BookingDetails } from './types';

const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('arcea-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  const [selectedRacket, setSelectedRacket] = useState<Racket | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeBrand, setActiveBrand] = useState<string>('All');
  const [booking, setBooking] = useState<Partial<BookingDetails>>({
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    duration: 1, 
    name: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('arcea-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const categories = ['All', 'Power', 'Control', 'Hybrid'];
  const brands = useMemo(() => ['All', ...Array.from(new Set(RACKETS.map(r => r.brand))).sort()], []);

  const filteredRackets = useMemo(() => {
    return RACKETS.filter(r => {
      const categoryMatch = activeCategory === 'All' || r.category === activeCategory;
      const brandMatch = activeBrand === 'All' || r.brand === activeBrand;
      return categoryMatch && brandMatch;
    });
  }, [activeCategory, activeBrand]);

  const handleBookingChange = (field: keyof BookingDetails, value: any) => {
    setBooking(prev => ({ ...prev, [field]: value }));
  };

  const generateWhatsAppUrl = () => {
    if (!selectedRacket || !booking.name) return '';
    
    const rentalFee = selectedRacket.price * (booking.duration || 1);
    const totalDeposit = DEPOSIT_AMOUNT;
    const totalToPay = rentalFee + totalDeposit;

    const message = `Halo ArceaPadel! 🎾\n\nSaya ingin menyewa raket:\n` +
      `- Raket: *${selectedRacket.models?.[0]}*\n` +
      `- Nama Penyewa: *${booking.name}*\n` +
      `- Tanggal Mulai: *${booking.date}*\n` +
      `- Jam Pengambilan: *${booking.startTime}*\n` +
      `- Durasi Sewa: *${booking.duration} Hari*\n\n` +
      `*Rincian Biaya:*\n` +
      `- Sewa: Rp ${rentalFee.toLocaleString('id-ID')}\n` +
      `- Deposit (Ref): Rp ${totalDeposit.toLocaleString('id-ID')}\n` +
      `- Total Transfer: *Rp ${totalToPay.toLocaleString('id-ID')}*\n\n` +
      `Apakah tersedia untuk tanggal tersebut? Saya sudah membaca Rules & Regulations Jabodetabek. Terima kasih!`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = generateWhatsAppUrl();
    if (url) {
      window.open(url, '_blank');
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Power': return <Zap className="w-3 h-3" />;
      case 'Control': return <Target className="w-3 h-3" />;
      default: return <Layers className="w-3 h-3" />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col ${theme === 'dark' ? 'bg-[#0f172a] text-slate-100' : 'bg-[#fcfdfd] text-slate-900'}`}>
      
      {/* Navigation / Header */}
      <header className={`sticky top-0 z-50 transition-colors duration-300 shadow-xl border-b ${theme === 'dark' ? 'bg-[#0a1a12] text-white border-white/5' : 'bg-white text-slate-900 border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-11 h-11 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <span className="text-2xl font-black text-white italic">A</span>
            </div>
            <div>
              <h1 className={`text-xl font-black tracking-tighter uppercase italic ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Arcea<span className="text-orange-500">Padel</span>
              </h1>
              <p className={`text-[9px] uppercase tracking-[0.3em] font-bold -mt-1 ${theme === 'dark' ? 'text-emerald-400/80' : 'text-emerald-600/80'}`}>Premium Court Gear</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
            <a href="#catalog" className="hover:text-orange-500 transition-colors">Catalog</a>
            <a href="#rules" className="hover:text-orange-500 transition-colors">Rules</a>
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all border-2 flex items-center justify-center ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-slate-300'}`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a href="#booking" className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/30">
              Book Now
            </a>
          </div>

          <div className="flex md:hidden items-center space-x-3">
             <button 
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-all border-2 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
              >
                {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
             <a href="#booking" className="bg-orange-500 p-3 rounded-xl shadow-lg">
               <MessageCircle className="w-6 h-6 text-white" />
             </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0a1a12] text-white py-24 px-4 border-b border-white/5">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-orange-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Jabodetabek Service Area</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter italic">
              MASTER <br/> THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">COURT</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed font-medium">
              Tempat sewa raket padel terpercaya di Jabodetabek. Kualitas premium untuk pemula hingga pro.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wider">Latest 2025/26</p>
                  <p className="text-xs text-slate-500">Official Catalog</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-wider">Secure Deposit</p>
                  <p className="text-xs text-slate-500">Safe & Transparent</p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block relative animate-float">
             <div className="aspect-square bg-gradient-to-br from-orange-500/10 to-emerald-500/10 rounded-[4rem] p-12 backdrop-blur-3xl border border-white/5 flex items-center justify-center">
                <img 
                  src="hhttps://media.discordapp.net/attachments/1460345148528529438/1463153205079707752/Brown_Beige_Old_Paper_Page_on_Wooden_Background_Poster_4.jpg?ex=6970cb1c&is=696f799c&hm=c166566aff9ef079e3c51cb4e76f10c5f62491b9d272a76d0da91270d3e760dd&=&format=webp&width=712&height=1007" 
                  alt="Elite Padel" 
                  className="w-full h-full object-cover rounded-[3rem] shadow-2xl-strong rotate-6 hover:rotate-0 transition-all duration-700"
                />
             </div>
             <div className="absolute -bottom-8 -right-8 bg-white text-black p-8 rounded-3xl shadow-2xl border border-slate-100 flex items-center space-x-6">
                <div className="p-3 bg-orange-100 rounded-2xl">
                  <Phone className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">WhatsApp Reservasi</p>
                  <p className="text-2xl font-black tracking-tight text-slate-900">+62 813-1767-727</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-24 space-y-32 w-full">
        
        {/* Why Arcea Padel? */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h3 className={`text-4xl font-black tracking-tight italic uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              KENAPA HARUS <span className="text-orange-500">ARCEA PADEL?</span>
            </h3>
            <div className={`space-y-6 font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              <p>
                Arcea Padel hadir sebagai solusi utama bagi Anda yang mencari tempat sewa raket padel terbaik dengan kualitas premium di wilayah **Jakarta, Bogor, Depok, Tangerang, dan Bekasi**.
              </p>
              <p>
                Kami memastikan setiap unit raket dalam kondisi prima untuk mendukung performa permainan Anda di lapangan. Dengan layanan pengantaran instan di hari yang sama (*same day*) dan jaminan deposit yang aman, kami menjadi pilihan favorit komunitas pecinta padel.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className={`p-6 rounded-2xl border flex flex-col items-center text-center space-y-3 transition-colors ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                 <Award className="w-8 h-8 text-orange-500" />
                 <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>Kualitas Premium</span>
               </div>
               <div className={`p-6 rounded-2xl border flex flex-col items-center text-center space-y-3 transition-colors ${theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                 <Flashlight className="w-8 h-8 text-orange-500" />
                 <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-300' : 'text-slate-900'}`}>Proses Praktis</span>
               </div>
            </div>
          </div>
          <div className="bg-[#0a1a12] rounded-[3rem] p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full"></div>
             <div className="space-y-6 relative z-10">
               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                 <ShieldCheck className="w-7 h-7 text-[#0a1a12]" />
               </div>
               <h4 className="text-2xl font-black uppercase italic tracking-tight">Solusi Utama Padel</h4>
               <p className="text-emerald-400/80 font-medium italic">"Kami memastikan kenyamanan dan kualitas alat untuk setiap sesi permainan anda."</p>
               <ul className="space-y-3 text-sm font-bold text-slate-400">
                 <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                   Pengantaran Instan (Same Day)
                 </li>
                 <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                   Unit Raket Selalu Prima
                 </li>
                 <li className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                   Pilihan Model Terlengkap 2025/26
                 </li>
               </ul>
             </div>
          </div>
        </section>

        {/* Racket Showcase / Catalog */}
        <section id="catalog" className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h3 className={`text-5xl font-black tracking-tight italic uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                OFFICIAL <span className="text-orange-500">GEAR</span>
              </h3>
              <p className={`font-medium text-lg italic ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
                Pilih raket sesuai gaya permainan anda. Jabodetabek Area Only.
              </p>
            </div>
          </div>
          
          {/* Enhanced Filtering System */}
          <div className={`space-y-8 p-8 rounded-[2.5rem] shadow-sm border transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                <Search className="w-3.5 h-3.5" />
                <span>Select Brand</span>
              </div>
              <div className="flex flex-wrap gap-2">
                 {brands.map(brand => (
                   <button 
                    key={brand}
                    onClick={() => setActiveBrand(brand)}
                    className={`px-6 py-2 rounded-xl text-xs font-bold transition-all border-2 ${
                      activeBrand === brand 
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                      : (theme === 'dark' ? 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500' : 'bg-slate-50 text-slate-500 border-slate-100 hover:border-slate-300')
                    }`}
                   >
                     {brand}
                   </button>
                 ))}
              </div>
            </div>

            <div className={`h-px w-full ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}></div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>By Play Style</span>
              </div>
              <div className="flex flex-wrap gap-2">
                 {categories.map(cat => (
                   <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 flex items-center space-x-2 ${
                      activeCategory === cat 
                      ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/20' 
                      : (theme === 'dark' ? 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200')
                    }`}
                   >
                     {cat !== 'All' && getCategoryIcon(cat)}
                     <span>{cat}</span>
                   </button>
                 ))}
              </div>
            </div>
          </div>
          
          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRackets.length > 0 ? (
              filteredRackets.map((racket) => (
                <div 
                  key={racket.id}
                  className={`group relative rounded-[2.5rem] p-6 transition-all duration-500 border-2 overflow-hidden flex flex-col hover:translate-y-[-8px] ${
                    selectedRacket?.id === racket.id 
                      ? 'border-orange-500 ring-8 ring-orange-500/5 shadow-2xl' 
                      : (theme === 'dark' ? 'bg-slate-900 border-transparent hover:border-slate-700 shadow-xl shadow-black/20' : 'bg-white border-transparent shadow-sm hover:shadow-xl')
                  }`}
                >
                  <div className={`aspect-[1/1] rounded-[2rem] mb-6 overflow-hidden relative shadow-inner border transition-colors ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'}`}>
                    <img 
                      src={racket.image} 
                      alt={racket.brand} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    <div className={`absolute bottom-3 left-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase flex items-center gap-2 shadow-xl backdrop-blur-xl border border-white/20 ${
                      racket.category === 'Power' ? 'bg-orange-500 text-white' : 
                      racket.category === 'Control' ? 'bg-emerald-500 text-white' : 
                      'bg-blue-600 text-white'
                    }`}>
                      {getCategoryIcon(racket.category)}
                      {racket.category}
                    </div>

                    <div className={`absolute top-3 right-3 backdrop-blur-sm px-3 py-1.5 rounded-2xl shadow-sm border transition-colors ${theme === 'dark' ? 'bg-black/40 border-slate-700 text-white' : 'bg-white/90 border-slate-100 text-slate-900'}`}>
                      <span className="text-base font-black tracking-tight italic">Rp {racket.price / 1000}k</span>
                    </div>
                  </div>

                  <div className="flex-grow space-y-4 flex flex-col">
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">
                        {racket.brand}
                      </h4>
                      <h5 className={`text-lg font-black group-hover:text-orange-600 transition-colors tracking-tight italic uppercase leading-[1.2] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {racket.models?.[0]}
                      </h5>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setSelectedRacket(racket);
                        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full mt-auto py-4 rounded-[1.25rem] font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-3 border-2 ${
                        selectedRacket?.id === racket.id 
                          ? 'bg-orange-500 text-white border-orange-500 shadow-xl shadow-orange-500/30' 
                          : (theme === 'dark' ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-white text-slate-900 border-slate-900 hover:bg-slate-900 hover:text-white group-hover:bg-slate-900 group-hover:text-white')
                      }`}
                    >
                      <span>{selectedRacket?.id === racket.id ? 'SELECTED' : 'CHOOSE GEAR'}</span>
                      <ChevronRight className={`w-4 h-4 transform transition-transform ${selectedRacket?.id === racket.id ? 'translate-x-1' : ''}`} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`col-span-full py-20 text-center space-y-4 rounded-[3rem] border-2 border-dashed transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <Info className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-xl font-bold text-slate-400">No gear found.</p>
                <button 
                  onClick={() => { setActiveBrand('All'); setActiveCategory('All'); }}
                  className="text-orange-500 font-black uppercase tracking-widest text-sm hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Rules & Conditions */}
        <section id="rules" className="bg-[#0a1a12] rounded-[4rem] p-10 md:p-20 text-white overflow-hidden relative shadow-3xl">
          <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
            <div className="grid grid-cols-12 h-full">
               {[...Array(24)].map((_, i) => (
                 <div key={i} className="border-r border-white/20"></div>
               ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            <div className="lg:col-span-3 space-y-4 mb-8">
              <h3 className="text-5xl font-black italic tracking-tighter uppercase">RULES & <span className="text-orange-500">REGULATIONS</span></h3>
              <p className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs">Ketentuan Sewa ArceaPadel Jabodetabek</p>
            </div>
            
            {RULES_GROUPS.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-6">
                 <h5 className="text-orange-400 font-black uppercase tracking-widest text-sm italic">{group.title}</h5>
                 <div className="grid gap-4">
                    {group.rules.map((rule, idx) => (
                      <div key={idx} className="group flex items-start gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                        <div className="shrink-0 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          {rule.icon}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-bold uppercase tracking-tight italic">{rule.text}</p>
                      </div>
                    ))}
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Process */}
        <section id="booking" className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h3 className={`text-4xl font-black uppercase italic tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              CONFIRM <span className="text-orange-500">RESERVATION</span>
            </h3>
            <p className={`font-medium italic ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>
              Sesi Harian Jabodetabek: Pengiriman Instan / Same Day.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className={`p-10 md:p-16 rounded-[4rem] shadow-2xl-strong border space-y-10 relative transition-colors ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-50'}`}
          >
            <div className="space-y-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center">
                <div className="w-6 h-6 bg-orange-500 text-white rounded-lg flex items-center justify-center mr-3 shadow-md shadow-orange-500/30">1</div>
                Selected Gear
              </label>
              {selectedRacket ? (
                <div className={`flex items-center justify-between p-6 rounded-3xl group border-2 transition-colors ${theme === 'dark' ? 'bg-slate-800/50 border-orange-500/30' : 'bg-orange-50/50 border-orange-100'}`}>
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-white rounded-2xl p-1 shadow-md">
                      <img src={selectedRacket.image} className="w-full h-full object-cover rounded-xl" alt="" />
                    </div>
                    <div>
                      <div className="flex flex-col gap-1">
                        <p className={`text-lg font-black italic uppercase tracking-tighter leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {selectedRacket.models?.[0]}
                        </p>
                        <span className={`self-start text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-white'}`}>
                          {selectedRacket.category}
                        </span>
                      </div>
                      <p className="text-sm text-orange-600 font-bold mt-2 uppercase tracking-wider italic">Rp {selectedRacket.price.toLocaleString('id-ID')} / Hari</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setSelectedRacket(null)} className={`p-3 transition-all rounded-xl shadow-sm hover:shadow-md border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-red-400' : 'bg-white border-slate-100 text-slate-400 hover:text-red-500'}`}>
                    <Filter className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} className={`flex flex-col items-center justify-center p-16 border-2 border-dashed rounded-[3rem] transition-all text-slate-400 group ${theme === 'dark' ? 'border-slate-800 hover:border-orange-500/50 hover:bg-slate-800/50' : 'border-slate-200 hover:border-orange-400 hover:bg-orange-50/50'} cursor-pointer`}>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}`}>
                    <ChevronDown className="w-7 h-7" />
                  </div>
                  <p className="text-lg font-black uppercase tracking-widest text-slate-500 italic">No Racket Selected</p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest flex items-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <User className="w-4 h-4 mr-2 text-orange-500" />Full Name
                </label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your name" 
                  value={booking.name} 
                  onChange={(e) => handleBookingChange('name', e.target.value)} 
                  className={`w-full px-6 py-4 rounded-2xl focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-bold border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-orange-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-orange-500 focus:bg-white'}`} 
                />
              </div>
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest flex items-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <Calendar className="w-4 h-4 mr-2 text-orange-500" />Start Date
                </label>
                <input 
                  type="date" 
                  required 
                  value={booking.date} 
                  onChange={(e) => handleBookingChange('date', e.target.value)} 
                  className={`w-full px-6 py-4 rounded-2xl focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-bold border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-orange-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-orange-500 focus:bg-white'}`} 
                />
              </div>
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest flex items-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  <ClockIcon className="w-4 h-4 mr-2 text-orange-500" />Pickup Time (07:00-22:00)
                </label>
                <select 
                  className={`w-full px-6 py-4 rounded-2xl focus:ring-4 focus:ring-orange-500/10 outline-none transition-all font-bold border appearance-none ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white focus:border-orange-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-orange-500 focus:bg-white'}`} 
                  value={booking.startTime} 
                  onChange={(e) => handleBookingChange('startTime', e.target.value)}
                >
                  {['07:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '21:00'].map(t => <option key={t} value={t} className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>{t}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className={`text-xs font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Duration (Days)</label>
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3].map((num) => (
                    <button 
                      key={num} 
                      type="button" 
                      onClick={() => handleBookingChange('duration', num)} 
                      className={`py-4 rounded-2xl font-black uppercase tracking-tighter transition-all border-2 text-sm ${booking.duration === num ? 'border-orange-500 bg-orange-500/10 text-orange-500 shadow-inner' : (theme === 'dark' ? 'border-slate-800 bg-slate-800 text-slate-500 hover:border-slate-700' : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200')}`}
                    >
                      {num} Hari
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {selectedRacket && (
              <div className={`p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden group transition-colors ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-900 text-white'}`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full"></div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Biaya Sewa ({booking.duration} Hari)</p>
                      <p className="text-2xl font-black text-white italic">Rp {(selectedRacket.price * (booking.duration || 1)).toLocaleString('id-ID')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Deposit Jaminan (Refundable)</p>
                      <p className="text-xl font-black text-emerald-400 italic">Rp {DEPOSIT_AMOUNT.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-center md:text-right relative z-10 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-8">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Total Transfer Awal</p>
                    <div className="flex items-baseline justify-center md:justify-end space-x-3">
                      <span className="text-5xl font-black text-orange-400 italic">Rp {(selectedRacket.price * (booking.duration || 1) + DEPOSIT_AMOUNT).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={!selectedRacket || !booking.name} className="w-full px-12 py-6 bg-orange-500 hover:bg-orange-600 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-orange-500/40 transition-all flex items-center justify-center space-x-4 active:scale-95 group relative z-10">
                  <MessageCircle className="w-6 h-6" />
                  <span>Kirim Reservasi WhatsApp</span>
                </button>
                <p className="text-[9px] text-center text-slate-500 font-black uppercase tracking-widest italic">Dengan mengklik, Anda menyetujui Rules & Regulations ArceaPadel.</p>
              </div>
            )}
            {isSuccess && (
              <div className={`absolute inset-0 backdrop-blur-sm rounded-[4rem] flex flex-col items-center justify-center p-10 text-center animate-in fade-in duration-500 z-50 transition-colors ${theme === 'dark' ? 'bg-slate-900/95' : 'bg-white/95'}`}>
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h4 className={`text-3xl font-black mb-2 italic ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>RESERVING...</h4>
                <p className="text-slate-500 font-medium">Opening WhatsApp for confirmation. <br/> Mengirim ke +62 813-1767-727.</p>
              </div>
            )}
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className={`py-24 px-4 border-t transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0a1a12] text-white border-white/5' : 'bg-slate-950 text-white border-slate-900'}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 items-start">
          <div className="space-y-8">
             <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center rotate-6 shadow-xl shadow-orange-500/20">
                  <span className="text-4xl font-black italic text-white">A</span>
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic text-white">Arcea<span className="text-orange-500">Padel</span></h2>
                  <p className="text-[10px] text-emerald-400/60 font-black uppercase tracking-[0.3em] -mt-1">Jakarta Premium Gear</p>
                </div>
             </div>
             <p className="text-slate-500 font-medium leading-relaxed max-w-sm italic">
                Sewa raket padel premium 2025/2026. Koleksi lengkap harian Jabodetabek sesuai katalog resmi ArceaPadel.
             </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">Instagram</h4>
            <a href={`https://instagram.com/arceapadel`} target="_blank" className="inline-flex p-4 bg-white/5 hover:bg-orange-500/10 rounded-2xl transition-all border border-white/10 group flex items-center space-x-4 w-full">
              <div className="p-3 bg-pink-500 rounded-xl group-hover:rotate-12 transition-transform">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="block font-black text-slate-300 uppercase tracking-widest text-xs italic">Follow Arcea</span>
                <span className="block font-black text-xl tracking-tight">{INSTAGRAM_HANDLE}</span>
              </div>
            </a>
          </div>
          <div className="space-y-8">
             <h4 className="text-xs font-black uppercase tracking-[0.4em] text-slate-600">Contact Person (Reservasi)</h4>
             <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="flex items-center space-x-6 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] hover:bg-emerald-500/10 transition-all group">
               <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/20">
                 <Phone className="w-7 h-7 text-white" />
               </div>
               <div>
                 <span className="block text-[10px] font-black text-emerald-400 uppercase tracking-widest">WhatsApp Reservasi</span>
                 <span className="block text-2xl font-black tracking-tighter italic">+62 813-1767-727</span>
               </div>
             </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
          <div>&copy; {new Date().getFullYear()} ARCEA PADEL GEAR. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-400 transition-colors">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
