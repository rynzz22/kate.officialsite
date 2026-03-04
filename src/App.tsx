import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Moon, Sparkles, Github, Twitter, Instagram, Mail, ArrowRight, ExternalLink } from 'lucide-react';

const LiquidBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[120px]"
      />  
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-blue-900/10 blur-[100px]"
      />
    </div>
  );
};

const InteractiveText = ({ text }: { text: string }) => {
  return (
    <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter flex flex-wrap justify-center gap-x-4">
      {text.split(' ').map((word, wordIdx) => (
        <span key={wordIdx} className="inline-flex">
          {word.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              whileHover={{ 
                scale: 1.2, 
                color: '#d8b4fe',
                textShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: (wordIdx * 5 + charIdx) * 0.05,
                type: "spring",
                stiffness: 300
              }}
              className="cursor-default inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 backdrop-blur-md border-b border-white/5"
    >
      <div className="text-xl font-bold font-display tracking-widest">
        ABOUT<span className="text-purple-400">ME</span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-medium tracking-widest text-zinc-400">
        <a href="#projects" className="hover:text-white transition-colors">PROJECTS</a>
        <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
        <a href="#" className="hover:text-white transition-colors">START UP</a>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-medium transition-all"
      >
        Join Me
      </motion.button>
    </motion.nav>
  );
};



const ProjectCard = ({ title, description, tags, index }: { title: string, description: string, tags: string[], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative p-8 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-2xl font-bold mb-4 font-display">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const MoonComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (moonRef.current) {
        const x = (e.clientX - window.innerWidth / 2) * 0.015;
        const y = (e.clientY - window.innerHeight / 2) * 0.015;
        moonRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={moonRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 1 },
        scale: { duration: 1 },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
      }}
      className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 cursor-pointer z-10"
    >
      <motion.div 
        animate={{
          backgroundColor: isHovered ? '#fbbf24' : '#e2e2e2',
          boxShadow: isHovered 
            ? '0 0 100px rgba(251, 191, 36, 0.8)' 
            : '0 0 50px rgba(216, 180, 254, 0.3)'
        }}
        transition={{ duration: 1, delay: isHovered ? 0.8 : 0 }}
        className="relative w-full h-full rounded-full overflow-hidden"
      >
        {/* Moon Texture/Craters */}
        <motion.div 
          animate={{ opacity: isHovered ? 0 : 0.4 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 mix-blend-multiply pointer-events-none"
        >
          <div className="absolute top-[20%] left-[30%] w-8 h-8 rounded-full bg-zinc-400 blur-[2px]" />
          <div className="absolute top-[50%] left-[60%] w-12 h-12 rounded-full bg-zinc-400 blur-[3px]" />
          <div className="absolute top-[70%] left-[20%] w-6 h-6 rounded-full bg-zinc-400 blur-[1px]" />
          <div className="absolute top-[10%] left-[70%] w-4 h-4 rounded-full bg-zinc-400 blur-[1px]" />
          <div className="absolute top-[40%] left-[10%] w-10 h-10 rounded-full bg-zinc-400 blur-[4px]" />
        </motion.div>
        
        {/* Sun Glow/Gradient (Sun mode) */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-orange-500 to-red-600 opacity-0"
        />

        {/* Moon Glow/Gradient (Moon mode) */}
        <motion.div 
          animate={{ opacity: isHovered ? 0 : 1 }}
          className="absolute inset-0 bg-radial-gradient from-white/40 via-transparent to-black/20" 
        />

        {/* Eclipse Shadow - Slides across */}
        <motion.div
          animate={{
            x: isHovered ? ['100%', '0%', '-100%'] : '100%',
            opacity: isHovered ? [0, 1, 1, 0] : 0
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.4, 0.6, 1],
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-black rounded-full z-20"
        />
      </motion.div>
      
      {/* Outer Glow */}
      <motion.div
        animate={{
          scale: isHovered ? 1.6 : 1,
          opacity: isHovered ? 0.8 : 0.2,
          backgroundColor: isHovered ? 'rgba(251, 191, 36, 0.5)' : 'rgba(168, 85, 247, 0.3)',
        }}
        transition={{ duration: 1 }}
        className="absolute inset-[-40px] rounded-full blur-3xl -z-10"
      />

      {/* Solar Rays (Sun mode) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-60px] pointer-events-none"
          >
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-24 bg-gradient-to-b from-yellow-400/40 to-transparent -translate-x-1/2 origin-top"
                style={{ transform: `rotate(${i * 30}deg) translateY(-100%)` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-purple-500/30 scroll-smooth">
      <LiquidBackground />
      <Navbar />

      <main className="pt-32 px-4">
        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center relative">
          <MoonComponent />
          
          <div className="relative z-20 mt-24">
            <InteractiveText text="KATE LORENE" />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 text-zinc-400 max-w-lg mx-auto leading-relaxed text-lg font-light"
            >
              I love reading Wattpad and watching anime. I also enjoy K-dramas, speak a bit of Korean, and I'm pretty optimistic (and occasionally lazy, but smart).
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-12 flex gap-4"
          >
            <a href="#projects" className="px-8 py-4 bg-purple-600 hover:bg-purple-500 rounded-full font-bold transition-all flex items-center gap-2 group">
              Explore Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto py-32"
        >
          <div className="flex justify-between items-end mb-16 px-4">
            <div>
              <h2 className="text-4xl font-bold font-display mb-4">Selected Works</h2>
              <p className="text-zinc-400">A collection of things I've built and loved.</p>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-5xl font-bold text-white/5 font-display">01</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            <ProjectCard 
              index={0}
              title="Anime Tracker" 
              description="A liquid-smooth interface for tracking your favorite seasonal anime and manga chapters."
              tags={["React", "Framer Motion", "API"]}
            />
            <ProjectCard 
              index={1}
              title="Wattpad Reader" 
              description="An editorial-style reading experience with custom typography and focus modes."
              tags={["Design", "UX", "Typography"]}
            />
            <ProjectCard 
              index={2}
              title="Korean Learner" 
              description="Interactive flashcards and pronunciation guides for beginner Korean speakers."
              tags={["Education", "Interactive"]}
            />
          </div>
        </motion.section>

        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto py-32 text-center">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            className="p-16 rounded-[3rem] bg-gradient-to-b from-zinc-900/50 to-transparent border border-white/5 backdrop-blur-sm"
          >
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-8" />
            <h2 className="text-5xl font-bold font-display mb-6">Let's Create Something</h2>
            <p className="text-zinc-400 mb-12 text-lg">Whether it's about anime, K-dramas, or code—I'm always down to chat.</p>
            
            <div className="flex justify-center gap-6">
              {[Github, Twitter, Instagram, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, color: '#d8b4fe' }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 transition-colors"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-zinc-500 text-sm">
        <p>© 2024 Kate Lorene. Built with passion and a bit of laziness.</p>
      </footer>

      {/* Floating Wave Effect */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none z-0 opacity-20">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <motion.path
            animate={{
              d: [
                "M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128V320H0Z",
                "M0,160L60,176C120,192,240,224,360,224C480,224,600,192,720,176C840,160,960,128,1080,128C1200,128,1320,160,1380,176L1440,192V320H0Z",
                "M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,208C1200,192,1320,160,1380,144L1440,128V320H0Z"
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            fill="#4c1d95"
          />
        </svg>
      </div>
    </div>
  );
}
