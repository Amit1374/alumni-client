import React from "react";
import { Link } from "react-router-dom";
import { Users, GraduationCap, Building2, Quote, ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* ================= NAVBAR ================= */}
      <nav className="flex items-center justify-between px-6 md:px-16 py-5 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
       <div className="flex items-center gap-3 group cursor-pointer">
  {/* The Icon: Minimalist & Layered */}
  <div className="relative">
    {/* Background Decorative Element */}
    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-indigo-800 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
    
    <div className="relative w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-105">
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6 text-white" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        {/* Abstract "C" for Connect that looks like a link */}
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </div>
  </div>

  {/* The Text: High-End Professional Typography */}
  <div className="flex flex-col justify-center">
    <h1 className="text-2xl font-[900] tracking-tighter text-slate-900 leading-[0.85]">
      Alumni<span className="text-indigo-800">Connect</span>
    </h1>
    <div className="flex items-center gap-1.5 mt-1">
      <span className="h-[1px] w-4 bg-indigo-600/40"></span>
      <span className="text-[10px] font-bold tracking-[0.25em] text-slate-400 uppercase">
        Network Portal
      </span>
    </div>
  </div>
</div>
        <div className="hidden md:flex space-x-8 items-center">
          <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Features</a>
          <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">About Us</a>
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Login</Link>
          <Link to="/register" className="bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200">
            Get Started
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <header className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
         <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-orange-100 rounded-full shadow-sm">
            <span className="text-sm text-orange-600 font-medium">Bridge the gap between Generations!</span>
</div>
          <h2 className="text-5xl md:text-6xl font-extrabold leading-[1.1] text-slate-900">
            Welcome to the <br />
            <span className="text-amber-500">Future of Networking.</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
            Forge meaningful connections, unlock career-defining mentorships, and stay rooted in your alma mater. A professional ecosystem built for growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="bg-violet-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all transform hover:-translate-y-1 shadow-xl shadow-indigo-100 flex items-center gap-2">
              Join the Network <ArrowRight size={18} />
            </Link>
          </div>
        </div>
        
        {/* HERO IMAGE CONTAINER */}
        <div className="relative group animate-in fade-in slide-in-from-right duration-1000">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl opacity-10 blur-2xl group-hover:opacity-20 transition duration-500"></div>
          <img 
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000" 
            alt="Students and Alumni" 
            className="relative rounded-3xl shadow-2xl border border-white/50 object-cover h-[450px] w-full"
          />
        </div>
      </header>

      {/* ================= SERVICES/FEATURES SECTION ================= */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h3 className="text-3xl font-bold text-slate-900">Tailored for Our Community</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">One platform, three powerful experiences designed to benefit everyone involved.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Users className="text-blue-600" />}
              title="For Alumni"
              description="Reconnect with lost classmates, mentor rising talent, and share job opportunities within your trusted circle."
              color="bg-blue-50"
            />
            <FeatureCard 
              icon={<GraduationCap className="text-indigo-600" />}
              title="For Students"
              description="Access exclusive internships, get 1-on-1 career guidance, and learn from those who've walked your path."
              color="bg-indigo-50"
            />
            <FeatureCard 
              icon={<Building2 className="text-purple-600" />}
              title="For Institutions"
              description="Track graduate success, boost institutional prestige, and organize seamless events with data-driven insights."
              color="bg-purple-50"
            />
          </div>
        </div>
      </section>

      {/* ================= STORIES SECTION ================= */}
      <section className="py-24 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-16">Voices of Success</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <StoryCard 
              quote="Found my first job at a Fortune 500 company thanks to a referral from an alum I met here. The mentorship was invaluable!"
              author="Shiv Patel"
              role="Class of '24 Student"
            />
            <StoryCard 
              quote="Being able to give back to my college by mentoring bright young minds has been the most rewarding part of my career."
              author="Anita Desai"
              role="Senior Architect, Alum '12"
            />
          </div>
        </div>
      </section>

      {/* ================= ABOUT US SECTION ================= */}
      <section id="about" className="py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
             <div className="h-48 bg-indigo-100 rounded-2xl flex items-center justify-center p-6 text-center">
               <span className="font-bold text-indigo-700">100+ <br/> Active Users</span>
             </div>
             <div className="h-48 bg-slate-900 rounded-2xl mt-8 flex items-center justify-center p-6 text-center text-white">
                <span className="font-bold">50+ <br/> Events Hosted</span>
             </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-slate-900">About AlumniConnect</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              We started with a simple mission: to ensure that no student ever feels alone in their professional journey and no alum ever feels disconnected from their roots. 
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our platform uses advanced matching algorithms to pair mentors and mentees, while providing a secure space for institutional growth. We believe in the power of a shared history to build a brighter future.
            </p>
            <div className="pt-4">
               <button className="font-semibold text-indigo-600 hover:text-indigo-700 underline underline-offset-8">Read our full story</button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-slate-800 pb-12">
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-white font-bold text-xl mb-6">AlumniConnect</h4>
            <p className="text-sm leading-relaxed">Empowering the next generation through the wisdom of the previous one.</p>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-6">Explore</h5>
            <ul className="space-y-4 text-sm">
              <li><Link to="/register" className="hover:text-white transition">Join Network</Link></li>
              <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
              <li><a href="#" className="hover:text-white transition">Events</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-6">Legal</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-semibold mb-6">Stay Connected</h5>
            <input type="email" placeholder="Email address" className="bg-slate-800 border-none rounded-lg px-4 py-2 w-full text-sm mb-4 focus:ring-2 focus:ring-indigo-500" />
            <button className="bg-indigo-600 text-white w-full py-2 rounded-lg font-medium text-sm hover:bg-indigo-700 transition">Subscribe</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 text-center text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} AlumniConnect. Crafted for excellence.
        </div>
      </footer>
    </div>
  );
};

/* ---------- SUB-COMPONENTS ---------- */

const FeatureCard = ({ icon, title, description, color }) => (
  <div className={`p-8 rounded-2xl ${color} border border-transparent hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 group transform hover:-translate-y-2`}>
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-xl font-bold mb-3 text-slate-900">{title}</h4>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const StoryCard = ({ quote, author, role }) => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-start gap-6">
    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
      <Quote size={20} fill="currentColor" />
    </div>
    <p className="text-lg italic text-slate-700 leading-relaxed">"{quote}"</p>
    <div>
      <h5 className="font-bold text-slate-900">{author}</h5>
      <p className="text-xs text-indigo-600 font-semibold tracking-wider uppercase">{role}</p>
    </div>
  </div>
);

export default Home;