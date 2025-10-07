'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // State for customer type selection
  const [customerType, setCustomerType] = useState<'particulier' | 'zakelijk'>('particulier');
  const particulierRef = useRef<HTMLButtonElement>(null);
  const zakelijkRef = useRef<HTMLButtonElement>(null);
  
  // State for language selection
  const [language, setLanguage] = useState<'en' | 'nl'>('en');
  
  // State for FAQ accordion
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const faqRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  // FAQ toggle function with GSAP animation
  const toggleFAQ = (index: number) => {
    const contentRef = faqRefs.current[index];
    if (!contentRef) return;

    if (openFAQ === index) {
      // Close current FAQ
      gsap.to(contentRef, {
        height: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          setOpenFAQ(null);
        }
      });
    } else {
      // Close any open FAQ first
      if (openFAQ !== null) {
        const currentContentRef = faqRefs.current[openFAQ];
        if (currentContentRef) {
          gsap.to(currentContentRef, {
            height: 0,
            duration: 0.3,
            ease: "power2.inOut"
          });
        }
      }
      
      // Open new FAQ
      setOpenFAQ(index);
      gsap.fromTo(contentRef, 
        { height: 0 },
        { 
          height: "auto",
          duration: 0.3,
          ease: "power2.inOut"
        }
      );
    }
  };
  
  

  // Update pil position and width when customer type changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updatePilPosition = () => {
      if (customerType === 'particulier' && particulierRef.current) {
        const rect = particulierRef.current.getBoundingClientRect();
        const containerRect = particulierRef.current.parentElement?.getBoundingClientRect();
        if (containerRect) {
          setPilPosition(rect.left - containerRect.left);
          setPilWidth(rect.width);
        }
      } else if (customerType === 'zakelijk' && zakelijkRef.current) {
        const rect = zakelijkRef.current.getBoundingClientRect();
        const containerRect = zakelijkRef.current.parentElement?.getBoundingClientRect();
        if (containerRect) {
          setPilPosition(rect.left - containerRect.left);
          setPilWidth(rect.width);
        }
      }
    };

    // Initial calculation
    updatePilPosition();
    
    // Recalculate on window resize
    window.addEventListener('resize', updatePilPosition);
    
    return () => {
      window.removeEventListener('resize', updatePilPosition);
    };
  }, [customerType]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Smooth scroll with proper clamping
    let scrollTimeout: NodeJS.Timeout;
    let currentScroll = 0;
    let targetScroll = 0;
    let isScrolling = false;
    
    const smoothScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          const diff = targetScroll - currentScroll;
          const speed = 0.15; // Smooth but not too slow
          currentScroll += diff * speed;
          
          // Clamp the scroll to prevent overshooting
          if (Math.abs(diff) < 0.5) {
            currentScroll = targetScroll;
            isScrolling = false;
          } else {
            smoothScroll();
          }
          
          window.scrollTo(0, currentScroll);
        });
      }
    };
    
    const handleScroll = () => {
      targetScroll = window.pageYOffset;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!isScrolling) {
          smoothScroll();
        }
      }, 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Subtle parallax effects that respect section boundaries
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      
      // Hero section - very subtle movement
      const heroSection = heroRef.current;
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.3;
          const yPos = (scrolled - rect.top) * speed;
          heroSection.style.transform = `translateY(${Math.max(-50, Math.min(50, yPos))}px)`;
        }
      }
      
      // Mission section - opposite direction, clamped
      const missionSection = document.querySelector('.sticky');
      if (missionSection) {
        const rect = missionSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = -0.2;
          const yPos = (scrolled - rect.top) * speed;
          (missionSection as HTMLElement).style.transform = `translateY(${Math.max(-30, Math.min(30, yPos))}px)`;
        }
      }
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });

    // Hero animations
    const heroTitle = heroRef.current?.querySelector('.hero-title');
    const heroSubtitle = heroRef.current?.querySelector('.hero-subtitle');
    const heroButtons = heroRef.current?.querySelector('.hero-buttons');

    if (heroTitle) {
      gsap.fromTo(heroTitle, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      );
    }

    if (heroSubtitle) {
      gsap.fromTo(heroSubtitle, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
      );
    }

    if (heroButtons) {
      gsap.fromTo(heroButtons, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1 }
      );
    }




    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleParallax);
      clearTimeout(scrollTimeout);
    };

  }, []);

  return (
    <div className={`font-sans transition-colors duration-300 ${
      customerType === 'zakelijk' 
        ? 'bg-gray-900 text-white' 
        : 'bg-white text-black'
    }`}>
      <style jsx>{`
        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .carousel-animation {
          animation: infiniteScroll 30s linear infinite;
        }
        .carousel-animation:hover {
          animation-play-state: paused;
        }
        
        /* Smooth scroll with better performance */
        html {
          scroll-behavior: smooth;
        }
        
        /* Ensure sections stay in their containers */
        section {
          position: relative;
          overflow: hidden;
        }
        
        /* Smooth scroll container */
        .smooth-scroll-container {
          will-change: transform;
        }
        
        /* Anchor offset for fixed navigation */
        #diensten,
        #about,
        #contact {
          scroll-margin-top: 120px;
        }

        /* Design System - Consistent Spacing */
        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .section-title {
          font-size: 4rem;
          line-height: 1.1;
          font-weight: 700;
          margin-bottom: 24px;
        }
        
        .section-subtitle {
          font-size: 1.25rem;
          line-height: 1.6;
          opacity: 0.8;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .badge {
          display: inline-block;
          padding: 8px 16px;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 32px;
        }
        
        .card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid #e5e7eb;
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .card-dark {
          background: #1f2937;
          border: 1px solid #374151;
          color: white;
        }
        
        .card-dark:hover {
          background: #111827;
        }
        
        .icon-container {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }
        
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }
        
        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1.125rem;
          transition: all 0.3s ease;
          text-decoration: none;
          border: none;
          cursor: pointer;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        
        .cta-primary {
          background: var(--color-primary-dark);
          color: white;
        }
        
        .cta-secondary {
          background: var(--color-accent-green);
          color: white;
        }
        
      `}</style>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        customerType === 'zakelijk'
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
        <Image
                src="/LogoMain.png"
                alt="Circular Shipping Company"
                width={200}
                height={80}
                className={`h-10 sm:h-12 w-auto transition-all duration-300 ${
                  customerType === 'zakelijk' ? 'brightness-0 invert' : ''
                }`}
          priority
        />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#verhaal" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('verhaal');
                  if (element) {
                    const headerHeight = 80;
                    const elementPosition = element.offsetTop - headerHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className={`hover:opacity-70 transition-opacity ${
                customerType === 'zakelijk' ? 'text-white' : 'text-black'
                }`}
              >
                Ons verhaal
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('contact');
                  if (element) {
                    const headerHeight = 80;
                    const elementPosition = element.offsetTop - headerHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className={`hover:opacity-70 transition-opacity ${
                customerType === 'zakelijk' ? 'text-white' : 'text-black'
                }`}
              >
                Contact
              </a>
              <a 
                href="#faq" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('faq');
                  if (element) {
                    const headerHeight = 80;
                    const elementPosition = element.offsetTop - headerHeight;
                    window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                  }
                }}
                className={`hover:opacity-70 transition-opacity ${
                customerType === 'zakelijk' ? 'text-white' : 'text-black'
                }`}
              >
                FAQ
              </a>
              
              {/* Vertical separator between FAQ and customer type buttons */}
              <div className={`w-px h-6 ${customerType === 'zakelijk' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
              
              {/* Desktop Customer Type Links */}
              <button
                onClick={() => setCustomerType('particulier')}
                className={`hover:opacity-70 transition-opacity ${
                  customerType === 'particulier' 
                    ? 'font-bold' 
                    : customerType === 'zakelijk' 
                      ? 'text-white' 
                      : 'text-black'
                }`}
                style={{
                  color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                }}
              >
                Particulier
              </button>
              <button
                onClick={() => setCustomerType('zakelijk')}
                className={`hover:opacity-70 transition-opacity ${
                  customerType === 'zakelijk' 
                    ? 'font-bold' 
                    : customerType === 'zakelijk' 
                      ? 'text-white' 
                      : 'text-black'
                }`}
                style={{
                  color: customerType === 'zakelijk' ? 'var(--color-accent-green)' : undefined
                }}
              >
                Zakelijk
              </button>
            </div>
            
            
            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 transition-colors duration-300 ${
                  customerType === 'zakelijk' 
                    ? 'text-white hover:text-gray-300' 
                    : 'text-black hover:text-gray-600'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className={`mt-4 pb-4 border-t transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex flex-col space-y-4 pt-4">
                {/* Mobile Navigation Links */}
                <a 
                  href="#verhaal" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('verhaal');
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    }
                  }}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 ${
                    customerType === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
                  }`}
                >
                  Ons verhaal
                </a>
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('contact');
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    }
                  }}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 ${
                    customerType === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
                  }`}
                >
                  Contact
                </a>
                <a 
                  href="#faq" 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileMenuOpen(false);
                    const element = document.getElementById('faq');
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    }
                  }}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 ${
                    customerType === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
                  }`}
                >
                  FAQ
                </a>
                
                {/* Horizontal separator */}
                <div className={`w-full h-px ${
                  customerType === 'zakelijk' ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>
                
                {/* Customer Type Links - both always visible */}
                <button
                  onClick={() => {
                    setCustomerType('particulier');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 text-left ${
                    customerType === 'particulier' 
                      ? 'font-bold' 
                      : customerType === 'zakelijk' 
                        ? 'text-white hover:bg-gray-700' 
                        : 'text-black hover:bg-gray-100'
                  }`}
                  style={{
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                >
                  Particulier
                </button>
                <button
                  onClick={() => {
                    setCustomerType('zakelijk');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 text-left ${
                    customerType === 'zakelijk' 
                      ? 'font-bold' 
                      : customerType === 'zakelijk' 
                        ? 'text-white hover:bg-gray-700' 
                        : 'text-black hover:bg-gray-100'
                  }`}
                  style={{
                    color: customerType === 'zakelijk' ? 'var(--color-accent-green)' : undefined
                  }}
                >
                  Zakelijk
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Only for Particulier */}
      {customerType === 'particulier' && (
        <section ref={heroRef} className="pt-32 sm:pt-40 md:pt-48 pb-32 sm:pb-40 md:pb-48 px-4 sm:px-6 relative z-30">
        <div className="section-container">
          <div className="section-header">
          {/* Hero Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative">
              {/* Background layers */}
              <div className="absolute -top-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-300 opacity-60"></div>
              <div className="absolute -top-1 -left-1 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-400 opacity-80"></div>
              
              {/* Main icon */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg" 
                   style={{ backgroundColor: 'var(--color-accent-green)' }}>
                <Image
                  src="/IcoonMain.png"
                  alt="Circular Shipping Company"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 brightness-0 invert"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Main Headline */}
            <h1 className={`hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-none transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : ''
                }`} style={{
                  color: customerType === 'zakelijk' ? 'white' : 'var(--color-primary-dark)'
                }}>
             {customerType === 'zakelijk' ? (
               <>
                 Waarom <span style={{ color: 'var(--color-accent-green)' }}>overstappen</span>
              <br />
                   naar herbruikbare verpakkingen?
               </>
             ) : (
               <>
                 De <span style={{ color: 'var(--color-accent-green)' }}>Duurzaamste</span>
                 <br />
                   verzendoplossing<span style={{ color: 'var(--color-accent-green)', fontSize: '1.2em' }}>.</span>
               </>
             )}
            </h1>
          
          {/* Sub-headline */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
              Herbruikbare verpakkingen die 80% CO₂ besparen en volledig circulair zijn.
            <br className="hidden sm:block" />
              <span className="hidden sm:inline">De toekomst van duurzaam verzenden, nu beschikbaar.</span>
            </p>
          </div>
          
          {/* CTA Button and Social Proof Section */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8">
            {/* Left side - CTA Button */}
            <div className="flex-shrink-0">
              <button className="cta-button cta-primary text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 flex items-center gap-2" 
                    style={{ backgroundColor: 'var(--color-primary-dark)' }}>
              Ontdek meer
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-accent-green)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H7m10 0v10" />
                  </svg>
              </button>
          </div>
          
            {/* Right side - Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              {/* Profile Pictures */}
              <div className="flex -space-x-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src="/joost2.jpg"
                    alt="Team member"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
              </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src="/Boris.jpg"
                    alt="Team member"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
            </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src="/Bart Kroese.jpg"
                    alt="Team member"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
          </div>
        </div>

              {/* Text */}
              <div className="text-center sm:text-left">
                <p className={`text-sm sm:text-lg font-bold transition-colors duration-300 ${
                      customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                    }`}>
                  Vertrouwd door 20+ bedrijven
                </p>
                    <p className={`text-xs sm:text-sm transition-colors duration-300 ${
                      customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                  in Nederland
                    </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sticky Stats Section Container */}







      {/* Ons Verhaal Section - Only for Particulier */}
      {customerType === 'particulier' && (
        <section id="verhaal" className={`h-[80vh] transition-colors duration-300 relative overflow-hidden ${
          customerType === 'zakelijk' ? 'bg-gray-800' : 'bg-white'
        }`}>
        {/* Background Image */}
        <div className="absolute inset-0">
                <Image
            src="/Afbeelding1.jpg"
            alt="Circular Shipping Background"
            fill
            className="object-cover"
          />
          </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {/* Left to right fade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent"></div>
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-start z-10">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left side - Our Mission */}
              <div className="text-left">
                <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-none transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-white'
                }`}>
                  Onze missie<span style={{ color: 'var(--color-accent-green)', fontSize: '1.2em' }}>.</span>
              </h2>
                <p className={`text-lg md:text-xl leading-relaxed mb-8 transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-gray-200' : 'text-gray-100'
                }`}>
                  Wij zijn drie studenten van de TU Delft met één missie: een wereld zonder single-use verpakkingen. 
                  Onze herbruikbare verpakkingen zijn gemaakt van gerecycled plastic en worden binnen een closed-loop gerecycled.
                </p>
                <button 
                  onClick={() => {
                    // Scroll to contact section where FAQ is located
                    const element = document.getElementById('faq');
                    if (element) {
                      const headerHeight = 80;
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
                    }
                  }}
                  className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                >
                  Ons verhaal
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    style={{ color: 'var(--color-accent-green)' }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7m0 0H7m10 0v10" />
                  </svg>
                </button>
                </div>
                
              {/* Right side - Empty for now */}
              <div className="hidden md:block">
                      </div>
                    </div>
                  </div>
                </div>
        </section>
      )}

      {/* Help Section - Only for Particulier */}
      {customerType === 'particulier' && (
        <section className={`py-20 px-6 flex items-center min-h-screen transition-colors duration-300 ${
          customerType === 'zakelijk' ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className="max-w-7xl mx-auto w-full">
            <div className="space-y-16">
              
              {/* Block 1 - Text First on Mobile, Image Left on Desktop */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2 p-8 lg:p-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Hoe kan ik helpen?</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Wil je bijdragen aan een duurzamere wereld? Er zijn verschillende manieren waarop je kunt helpen om herbruikbare verpakkingen de norm te maken.
                  </p>
                  <button className="hidden lg:flex bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 items-center gap-2 w-fit">
                    Meer informatie
                    <Image
                      src="/Arrow.png" 
                      alt="Arrow" 
                      width={16} 
                      height={16}
                      className="w-4 h-4 brightness-0 invert"
                    />
                  </button>
                  </div>
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                  <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                      <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent-green)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                </div>
                    {/* Mobile CTA Button - Bottom Right */}
                    <button className="lg:hidden absolute bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2 text-sm">
                      Meer informatie
                  <Image
                        src="/Arrow.png" 
                        alt="Arrow" 
                        width={14} 
                        height={14}
                        className="w-3.5 h-3.5 brightness-0 invert"
                      />
                    </button>
              </div>
                  </div>
                </div>

              {/* Block 2 - Text First on Mobile, Text Left on Desktop */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-1 p-8 lg:p-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Ik heb een pakket ontvangen</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Heb je een herbruikbare verpakking ontvangen? Leer hoe je deze kunt terugsturen en bijdraagt aan de circulaire economie.
                  </p>
                  <button className="hidden lg:flex bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 items-center gap-2 w-fit">
                    Terugsturen
                    <Image
                      src="/Arrow.png" 
                      alt="Arrow" 
                      width={16} 
                      height={16}
                      className="w-4 h-4 brightness-0 invert"
                    />
                  </button>
                  </div>
                <div className="w-full lg:w-1/2 order-2 lg:order-2">
                  <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                      <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent-green)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                </div>
                    {/* Mobile CTA Button - Bottom Right */}
                    <button className="lg:hidden absolute bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2 text-sm">
                      Terugsturen
                  <Image
                        src="/Arrow.png" 
                        alt="Arrow" 
                        width={14} 
                        height={14}
                        className="w-3.5 h-3.5 brightness-0 invert"
                      />
                    </button>
              </div>
            </div>
              </div>

              {/* Block 3 - Text First on Mobile, Image Left on Desktop */}
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="w-full lg:w-1/2 flex flex-col justify-center order-1 lg:order-2 p-8 lg:p-12">
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Ik heb een idee</h3>
                  <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                    Heb je een innovatief idee voor duurzame verpakkingen? We horen graag van je en werken samen aan de toekomst van logistiek.
                  </p>
                  <button className="hidden lg:flex bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 items-center gap-2 w-fit">
                    Idee delen
                    <Image
                      src="/Arrow.png" 
                      alt="Arrow" 
                      width={16} 
                      height={16}
                      className="w-4 h-4 brightness-0 invert"
                    />
            </button>
                  </div>
                <div className="w-full lg:w-1/2 order-2 lg:order-1">
                  <div className="relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent-green)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                </div>
                    {/* Mobile CTA Button - Bottom Right */}
                    <button className="lg:hidden absolute bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300 flex items-center gap-2 text-sm">
                      Idee delen
                      <Image
                        src="/Arrow.png" 
                        alt="Arrow" 
                        width={14} 
                        height={14}
                        className="w-3.5 h-3.5 brightness-0 invert"
                      />
            </button>
              </div>
            </div>
          </div>
          
          </div>
        </div>
      </section>
      )}

      {/* Business Hero Section - Exact Copy of Particulier */}
      {customerType === 'zakelijk' && (
        <section ref={heroRef} className="pt-32 sm:pt-40 md:pt-48 pb-32 sm:pb-40 md:pb-48 px-4 sm:px-6 relative z-30">
        <div className="section-container">
          <div className="section-header">
          {/* Hero Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative">
              {/* Background layers */}
              <div className="absolute -top-2 -left-2 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-300 opacity-60"></div>
              <div className="absolute -top-1 -left-1 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gray-400 opacity-80"></div>
              
              {/* Main icon */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg" 
                   style={{ backgroundColor: 'var(--color-accent-green)' }}>
                <Image
                  src="/IcoonMain.png"
                  alt="Circular Shipping Company"
                  width={48}
                  height={48}
                  className="w-10 h-10 sm:w-12 sm:h-12 brightness-0 invert"
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Main Headline */}
            <h1 className={`hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-none transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-white' : ''
            }`} style={{ 
              color: customerType === 'zakelijk' ? 'white' : 'var(--color-primary-dark)' 
            }}>
             Waarom <span style={{ color: 'var(--color-accent-green)' }}>overstappen</span>
              <br />
                naar herbruikbare verpakkingen?
            </h1>
          </div>
        </div>
      </section>
      )}



      {/* Contact Section */}
      <section ref={contactRef} id="contact" className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 transition-colors duration-300 ${
        customerType === 'zakelijk' ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 transition-colors duration-300 ${
            customerType === 'zakelijk' ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            {/* Two blocks above the send button */}
            <div className="grid lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
              {/* Left side - Text blocks */}
              <div className="space-y-6 sm:space-y-8 lg:col-span-2">
                {/* Main title block */}
                <div className="text-left">
                  <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4 sm:mb-6 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Neem contact op!
                  </h2>
                </div>
                
                {/* Subtitle block */}
                <div className="text-left flex items-start">
                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Heb je vragen, wil je een proefpakket aanvragen of wil je samenwerken? Laat hier je gegevens achter via ons contactformulier en we nemen zo snel mogelijk contact met je op.
                  </p>
                </div>
              </div>

              {/* Right side - Contact form */}
              <div className="flex items-start lg:col-span-2">
                <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full">
                  <form className="space-y-3 sm:space-y-4">
                    <div>
                      <input
                        type="text"
                        placeholder="Naam"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 bg-white text-sm sm:text-base ${
                          customerType === 'zakelijk' 
                            ? 'text-gray-900 placeholder-gray-500' 
                            : 'text-gray-900 placeholder-gray-500'
                        } focus-ring-logo`}
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="E-mail"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 bg-white text-sm sm:text-base ${
                          customerType === 'zakelijk' 
                            ? 'text-gray-900 placeholder-gray-500' 
                            : 'text-gray-900 placeholder-gray-500'
                        } focus-ring-logo`}
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        placeholder="Telefoonnummer"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 bg-white text-sm sm:text-base ${
                          customerType === 'zakelijk' 
                            ? 'text-gray-900 placeholder-gray-500' 
                            : 'text-gray-900 placeholder-gray-500'
                        } focus-ring-logo`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Bedrijf"
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 bg-white text-sm sm:text-base ${
                          customerType === 'zakelijk' 
                            ? 'text-gray-900 placeholder-gray-500' 
                            : 'text-gray-900 placeholder-gray-500'
                        } focus-ring-logo`}
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Bericht"
                        rows={3}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors duration-300 resize-none bg-white text-sm sm:text-base ${
                          customerType === 'zakelijk' 
                            ? 'text-gray-900 placeholder-gray-500' 
                            : 'text-gray-900 placeholder-gray-500'
                        } focus-ring-logo`}
                      />
                    </div>
                    <div className="pt-4">
                      <button className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  customerType === 'zakelijk' 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      }`}>
                        Verzend
                        <Image
                          src="/Arrow.png" 
                          alt="Arrow" 
                          width={20} 
                          height={20}
                          className="w-5 h-5 brightness-0 invert"
                        />
            </button>
              </div>
                  </form>
              </div>
            </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-20 pb-32 px-6 transition-colors duration-300 rounded-b-3xl ${
        customerType === 'zakelijk' 
          ? 'bg-gray-900' 
          : 'bg-white'
      }`}>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                {customerType === 'zakelijk' ? 'FAQ (Zakelijk)' : 'FAQ (Consument)'}
              </div>
            </div>
            <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-none transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
            }`}>
              Veelgestelde <span className="scribble-underline" style={{ color: 'var(--color-accent-green)' }}>Vragen</span>
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {customerType === 'zakelijk' ? (
              /* Business FAQ */
              <>
                {/* Business FAQ 1 */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${
              customerType === 'zakelijk' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <button
                onClick={() => toggleFAQ(0)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
              >
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                }`}>
                      Waarom zou ik kiezen voor herbruikbare verpakkingen in plaats van karton?
                </h3>
                <Image 
                  src="/ReverseArrow.png" 
                  alt="Arrow" 
                  width={24} 
                  height={24}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openFAQ === 0 ? 'rotate-180' : ''
                  }`}
                  style={{ 
                    filter: customerType === 'zakelijk' ? 'brightness(0) invert(1)' : 'none',
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                />
              </button>
              <div 
                ref={(el) => { faqRefs.current[0] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                        Op korte termijn kan karton goedkoper lijken, maar bij herhaalde inzet verlagen herbruikbare dozen de kosten per zending, verminderen retourstromen en versterken ze uw duurzame merkpositionering. Daarnaast beperken ze afvalstromen en CO₂-uitstoot. Hoe dit precies werkt, leggen we u graag uit in een adviesgesprek.
                  </p>
                </div>
              </div>
            </div>

                {/* Business FAQ 2 */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${
              customerType === 'zakelijk' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <button
                onClick={() => toggleFAQ(1)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
              >
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                }`}>
                      Wie is verantwoordelijk bij schade of productverlies?
                </h3>
                <Image 
                  src="/ReverseArrow.png" 
                  alt="Arrow" 
                  width={24} 
                  height={24}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openFAQ === 1 ? 'rotate-180' : ''
                  }`}
                  style={{ 
                    filter: customerType === 'zakelijk' ? 'brightness(0) invert(1)' : 'none',
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                />
              </button>
              <div 
                ref={(el) => { faqRefs.current[1] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                        Wij adviseren en ondersteunen contractuele afspraken. In veel cases is de leverancier verantwoordelijk voor de verpakking. We adviseren altijd om productaansprakelijkheid en AVB met uw verzekeraar te bespreken.
                  </p>
                </div>
              </div>
            </div>

                {/* Business FAQ 3 */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${
              customerType === 'zakelijk' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <button
                onClick={() => toggleFAQ(2)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
              >
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                }`}>
                      Wat zijn de logistieke vereisten?
                </h3>
                <Image 
                  src="/ReverseArrow.png" 
                  alt="Arrow" 
                  width={24} 
                  height={24}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openFAQ === 2 ? 'rotate-180' : ''
                  }`}
                  style={{ 
                    filter: customerType === 'zakelijk' ? 'brightness(0) invert(1)' : 'none',
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                />
              </button>
              <div 
                ref={(el) => { faqRefs.current[2] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                        Onze dozen zijn ontworpen voor standaard handling. We leveren logistieke specificaties (afmetingen, stapelbelasting, retour qr-code) zodat uw fulfilmentpartner soepel op kan schalen.
                  </p>
                </div>
              </div>
            </div>

                {/* Business FAQ 4 */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${
              customerType === 'zakelijk' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <button
                onClick={() => toggleFAQ(3)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
              >
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                }`}>
                      Hoe garanderen jullie hygiëne en reiniging?
                </h3>
                <Image 
                  src="/ReverseArrow.png" 
                  alt="Arrow" 
                  width={24} 
                  height={24}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openFAQ === 3 ? 'rotate-180' : ''
                  }`}
                  style={{ 
                    filter: customerType === 'zakelijk' ? 'brightness(0) invert(1)' : 'none',
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                />
              </button>
              <div 
                ref={(el) => { faqRefs.current[3] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                        Wij inspecteren de geretourneerde verpakkingen grondig en reinigen waar nodig de verpakking. Voor gevoelige producten bespreken we extra eisen en kunnen we aangepaste reinigingsprotocollen vastleggen.
                  </p>
                </div>
              </div>
            </div>

                {/* Business FAQ 5 */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${
              customerType === 'zakelijk' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <button
                onClick={() => toggleFAQ(4)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
              >
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                }`}>
                      Kan de verpakking mijn branding hebben?
                </h3>
                <Image 
                  src="/ReverseArrow.png" 
                  alt="Arrow" 
                  width={24} 
                  height={24}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openFAQ === 4 ? 'rotate-180' : ''
                  }`}
                  style={{ 
                    filter: customerType === 'zakelijk' ? 'brightness(0) invert(1)' : 'none',
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                />
              </button>
              <div 
                ref={(el) => { faqRefs.current[4] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className={`text-base leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                        Op dit moment niet voor kleine oplages, er is meer mogelijk bij oplages boven de 10.000 verpakkingen.
                  </p>
              </div>
              </div>
            </div>

                {/* Business FAQ 6 */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${
              customerType === 'zakelijk' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <button
                onClick={() => toggleFAQ(5)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
              >
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                }`}>
                      Kan de verpakking mijn branding hebben?
                </h3>
                <Image 
                  src="/ReverseArrow.png" 
                  alt="Arrow" 
                  width={24} 
                  height={24}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openFAQ === 5 ? 'rotate-180' : ''
                  }`}
                  style={{ 
                    filter: customerType === 'zakelijk' ? 'brightness(0) invert(1)' : 'none',
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                />
              </button>
              <div 
                ref={(el) => { faqRefs.current[5] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className={`text-base leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                        Op dit moment niet voor kleine oplages, er is meer mogelijk bij oplages boven de 10.000 verpakkingen.
                  </p>
                </div>
              </div>
            </div>

                {/* Business FAQ 7 */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden group ${
              customerType === 'zakelijk' 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}>
              <button
                onClick={() => toggleFAQ(6)}
                className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
              >
                <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                }`}>
                      Hoe zit het met verlies en vervangingen?
                </h3>
                <Image 
                  src="/ReverseArrow.png" 
                  alt="Arrow" 
                  width={24} 
                  height={24}
                  className={`w-6 h-6 transition-transform duration-300 ${
                    openFAQ === 6 ? 'rotate-180' : ''
                  }`}
                  style={{ 
                    filter: customerType === 'zakelijk' ? 'brightness(0) invert(1)' : 'none',
                    color: customerType === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                />
              </button>
              <div 
                ref={(el) => { faqRefs.current[6] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                  <p className={`text-base leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                        We monitoren retourratio's en verwerken vervangingen in abonnementsmodellen. Tarieven per gebruik houden rekening met verwachte verliespercentages, daarnaast betaald de consument ook statiegeld, zo komen er nooit onverwachte kosten bij u terecht.
                  </p>
              </div>
              </div>
            </div>
              </>
            ) : (
              /* Consumer FAQ */
              <>
                {/* Consumer FAQ 1 */}
                <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                  <button
                    onClick={() => toggleFAQ(0)}
                    className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 text-gray-900">
                      Waarom is een herbruikbare verpakking duurzamer dan karton?
                    </h3>
                    <Image 
                      src="/ReverseArrow.png" 
                      alt="Arrow" 
                      width={24} 
                      height={24}
                      className={`w-6 h-6 transition-transform duration-300 ${
                        openFAQ === 0 ? 'rotate-180' : ''
                      }`}
                      style={{ 
                        filter: 'none',
                        color: 'var(--color-accent-green)'
                      }}
                    />
                  </button>
                  <div 
                    ref={(el) => { faqRefs.current[0] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-base leading-relaxed transition-colors duration-300 text-gray-600">
                        Omdat één herbruikbare verpakking tientallen keren gebruikt kan worden, daalt de milieubelasting per verzending sterk. Onze dozen zijn gemaakt van gerecycled materiaal en worden opnieuw verwerkt in een gesloten keten, waardoor er veel minder grondstofverbruik en CO₂-uitstoot per gebruik ontstaat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consumer FAQ 2 */}
                <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                  <button
                    onClick={() => toggleFAQ(1)}
                    className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 text-gray-900">
                      Hoe lever ik de doos in?
                    </h3>
                    <Image 
                      src="/ReverseArrow.png" 
                      alt="Arrow" 
                      width={24} 
                      height={24}
                      className={`w-6 h-6 transition-transform duration-300 ${
                        openFAQ === 1 ? 'rotate-180' : ''
                      }`}
                      style={{ 
                        filter: 'none',
                        color: 'var(--color-accent-green)'
                      }}
                    />
                  </button>
                  <div 
                    ref={(el) => { faqRefs.current[1] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-base leading-relaxed transition-colors duration-300 text-gray-600">
                        Kijk op https://boxo.nu/inleverpunten/ voor een inleverpunt bij jou in de buurt. Volg het retourlabel of de instructies in de e-mail van de webshop.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consumer FAQ 3 */}
                <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                  <button
                    onClick={() => toggleFAQ(2)}
                    className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 text-gray-900">
                      Is de doos schoon en veilig?
                    </h3>
                    <Image 
                      src="/ReverseArrow.png" 
                      alt="Arrow" 
                      width={24} 
                      height={24}
                      className={`w-6 h-6 transition-transform duration-300 ${
                        openFAQ === 2 ? 'rotate-180' : ''
                      }`}
                      style={{ 
                        filter: 'none',
                        color: 'var(--color-accent-green)'
                      }}
                    />
                  </button>
                  <div 
                    ref={(el) => { faqRefs.current[2] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-base leading-relaxed transition-colors duration-300 text-gray-600">
                        Ja, alle dozen worden geïnspecteerd en gereinigd volgens strikte protocollen voordat ze opnieuw in gebruik komen.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consumer FAQ 4 */}
                <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                  <button
                    onClick={() => toggleFAQ(3)}
                    className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 text-gray-900">
                      Wat als de doos beschadigd is?
                    </h3>
                    <Image 
                      src="/ReverseArrow.png" 
                      alt="Arrow" 
                      width={24} 
                      height={24}
                      className={`w-6 h-6 transition-transform duration-300 ${
                        openFAQ === 3 ? 'rotate-180' : ''
                      }`}
                      style={{ 
                        filter: 'none',
                        color: 'var(--color-accent-green)'
                      }}
                    />
                  </button>
                  <div 
                    ref={(el) => { faqRefs.current[3] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-base leading-relaxed transition-colors duration-300 text-gray-600">
                        Kleine slijtage is normaal; wij nemen de staat van de doos voor onze rekening en zorgen voor reparatie of vervanging. Bij grote beschadiging nemen we de verpakking in en zullen we deze vervangen, de kapotte verpakking wordt gerecycled.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Consumer FAQ 5 */}
                <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                  <button
                    onClick={() => toggleFAQ(4)}
                    className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 text-gray-900">
                      Moet ik betalen voor het terugbrengen?
                </h3>
                    <Image 
                      src="/ReverseArrow.png" 
                      alt="Arrow" 
                      width={24} 
                      height={24}
                      className={`w-6 h-6 transition-transform duration-300 ${
                        openFAQ === 4 ? 'rotate-180' : ''
                      }`}
                      style={{ 
                        filter: 'none',
                        color: 'var(--color-accent-green)'
                      }}
                    />
              </button>
              <div 
                ref={(el) => { faqRefs.current[4] = el; }}
                className="overflow-hidden"
                style={{ height: 0 }}
              >
                <div className="px-6 pb-6">
                      <p className="text-base leading-relaxed transition-colors duration-300 text-gray-600">
                        Nee, dat is helemaal gratis! Bij het terugbrengen krijg je zelfs je statiegeld terug, de kosten zijn voor ons. Volg de instructies van de verzender voor de retouropties.
                  </p>
              </div>
              </div>
            </div>

                {/* Consumer FAQ 6 */}
                <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                  <button
                    onClick={() => toggleFAQ(5)}
                    className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                  >
                    <h3 className="text-xl font-semibold transition-colors duration-300 text-gray-900">
                      Mijn drop-off punt is vol/gesloten — wat nu?
                    </h3>
                    <Image 
                      src="/ReverseArrow.png" 
                      alt="Arrow" 
                      width={24} 
                      height={24}
                      className={`w-6 h-6 transition-transform duration-300 ${
                        openFAQ === 5 ? 'rotate-180' : ''
                      }`}
                      style={{ 
                        filter: 'none',
                        color: 'var(--color-accent-green)'
                      }}
                    />
                  </button>
                  <div 
                    ref={(el) => { faqRefs.current[5] = el; }}
                    className="overflow-hidden"
                    style={{ height: 0 }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-base leading-relaxed transition-colors duration-300 text-gray-600">
                        Controleer een alternatief punt op de BOXO-pagina of stuur ons een bericht; we helpen je met een oplossing.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-16 pb-12 px-6 text-white relative overflow-hidden" style={{ backgroundColor: 'var(--color-accent-green)' }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
        
        {/* Large background icon */}
        <div className="absolute top-1/2 -right-20 md:-right-32 lg:-right-40 transform -translate-y-1/2 opacity-10 pointer-events-none">
          <Image
            src="/IcoonMain.png"
            alt="Circular Shipping Icon"
            width={600}
            height={600}
            className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] brightness-0 invert"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 text-white">
                Circular Shipping Company B.V.
              </div>
              <p className="text-sm text-white opacity-80">
                Sustainable shipping solutions for a better tomorrow.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Bedrijf</h4>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li><a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a></li>
                <li><a href="/voorwaarden" className="hover:opacity-100 transition-opacity">Voorwaarden</a></li>
                <li><a href="/voorwaarden" className="hover:opacity-100 transition-opacity">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-white opacity-80">
                <li>info@circularshipping.nl</li>
                <li>+31 6 42 36 04 48</li>
                <li>Hooidrift 116A-02, 3023KV, Rotterdam</li>
                <li>BTW: NL865622474B01</li>
                <li>KVK: 91337410</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-white opacity-80" style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
            <p>© 2025 Circular Shipping Company B.V. Alle rechten voorbehouden | <a href="/voorwaarden" className="hover:opacity-100 transition-opacity">Voorwaarden & Privacybeleid</a> | Aangedreven door <a href="https://www.nieuw-net.nl" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">NieuwNet</a></p>
          </div>
        </div>
      </footer>

      {/* Language Switcher - Fixed Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setLanguage(language === 'en' ? 'nl' : 'en')}
          className="px-4 py-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
        >
          <span className="text-sm font-medium" style={{ color: 'var(--color-primary-dark)' }}>
            {language === 'en' ? 'EN' : 'NL'}
          </span>
        </button>
      </div>
    </div>
  );
}
