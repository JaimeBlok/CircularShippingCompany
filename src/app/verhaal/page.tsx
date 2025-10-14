'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function VerhaalPage() {
  // State for customer type selection
  const [customerType, setCustomerType] = useState<'particulier' | 'zakelijk'>('particulier');

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`font-sans transition-colors duration-300 ${
      customerType === 'zakelijk'
        ? 'bg-gray-900 text-white'
        : 'bg-white text-black'
    }`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        customerType === 'zakelijk'
          ? 'bg-gray-900/80 border-gray-700'
          : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="hover:opacity-80 transition-opacity">
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
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/verhaal"
                className={`hover:opacity-70 transition-opacity font-bold ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-black'
                }`}
                style={{
                  color: 'var(--color-accent-green)'
                }}
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

              {/* Verpakking inleveren button */}
              <a
                href="/inleverpunten"
                className="inline-block text-white px-4 py-2 rounded-full font-medium transition-colors duration-300 text-sm"
                style={{
                  backgroundColor: 'var(--color-accent-green)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-green-dark)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent-green)';
                }}
              >
                Verpakking inleveren
              </a>

              {/* Vertical separator between FAQ and customer type buttons */}
              <div className={`w-px h-6 ${(customerType === 'zakelijk' ? 'bg-gray-600' : 'bg-gray-300')}`}></div>

              {/* Desktop Customer Type Links */}
              <a
                href="/"
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
              </a>
              <a
                href="/?type=zakelijk"
                className={`hover:opacity-70 transition-opacity ${
                  customerType === 'zakelijk'
                    ? 'font-bold text-white'
                    : 'text-black'
                }`}
                style={{
                  color: customerType === 'zakelijk' ? 'var(--color-accent-green)' : undefined
                }}
              >
                Zakelijk
              </a>
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
                  href="/verhaal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 font-bold ${
                    customerType === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
                  }`}
                  style={{
                    color: 'var(--color-accent-green)'
                  }}
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

                {/* Verpakking inleveren button - mobile */}
                <a
                  href="/inleverpunten"
                  className="block text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 text-left text-sm"
                  style={{
                    backgroundColor: 'var(--color-accent-green)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-green-dark)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent-green)';
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Verpakking inleveren
                </a>

                {/* Horizontal separator */}
                <div className={`w-full h-px ${
                  customerType === 'zakelijk' ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>

                {/* Customer Type Links - both always visible */}
                <a
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 text-left ${
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
                </a>
                <a
                  href="/?type=zakelijk"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 text-left ${
                    customerType === 'zakelijk'
                      ? 'font-bold text-white hover:bg-gray-700'
                      : 'text-black hover:bg-gray-100'
                  }`}
                  style={{
                    color: customerType === 'zakelijk' ? 'var(--color-accent-green)' : undefined
                  }}
                >
                  Zakelijk
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-40">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
            }`}>
              Ons verhaal<span style={{ color: 'var(--color-accent-green)', fontSize: '1.2em' }}>.</span>
            </h1>
            <p className={`text-lg md:text-xl leading-relaxed max-w-4xl mx-auto transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Wij zijn drie bevlogen TU Delft studenten met een missie: een einde maken aan single-use verpakkingen.
              Onze herbruikbare verzendverpakkingen zijn gemaakt van gerecycled plastic en worden binnen een closed-loop systeem hergebruikt.
            </p>
          </div>

          {/* Story Content - Hero Layout */}
          <div className="grid lg:grid-cols-3 gap-16 items-stretch">
            {/* Left side - Story content (1/3) */}
            <div className="lg:col-span-1 flex flex-col justify-center space-y-12">
              <h2 className={`text-4xl md:text-5xl font-bold leading-tight transition-colors duration-300 ${
                customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
              }`}>
                Over Circular Shipping<span style={{ color: 'var(--color-accent-green)', fontSize: '1.2em' }}>.</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-green)' }}></div>
                <div>
                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>
                      2023 - Het Begin
                    </h3>
                    <p className={`leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                      Tijdens onze studie aan de TU Delft werden we geconfronteerd met de enorme hoeveelheid plastic afval in de logistieke sector. 
                      We realiseerden ons dat er een betere manier moest zijn om producten te verzenden.
                  </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-green)' }}></div>
                <div>
                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>
                      2024 - Eerste Oplossing
                    </h3>
                    <p className={`leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                      We ontwikkelden onze eerste herbruikbare verpakkingen en testten het concept met verschillende webshops. 
                      Het bewijs was duidelijk: 80% CO₂ besparing en een circulaire oplossing.
                  </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--color-accent-green)' }}></div>
                <div>
                    <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>
                      2025 - Schaalvergroting
                    </h3>
                    <p className={`leading-relaxed transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                      Vandaag werken we samen met meer dan 20 bedrijven in Nederland en hebben we al duizenden verpakkingen succesvol laten circuleren.
                  </p>
                  </div>
                </div>
              </div>
                  </div>

            {/* Right side - Image (2/3) */}
            <div className="lg:col-span-2 flex">
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                  src="/Afbeelding1.jpg"
                  alt="Circular Shipping Company - Duurzame logistiek"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    Ontstaan in Delft,
                  </h3>
                  <p className="text-lg md:text-xl opacity-90">
                    Pakketen door heel Nederland
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Section */}
          <div className="mt-40">
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-20 leading-tight transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
            }`}>
              Ontmoet het team<span style={{ color: 'var(--color-accent-green)', fontSize: '1.2em' }}>.</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Joost */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/joost2.jpg"
                  alt="Joost"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Joost
                  </h3>
                  <p className="text-lg mb-3 opacity-90">
                    Co-founder & CTO
                  </p>
                  <p className="text-sm leading-relaxed opacity-90">
                    Als technisch specialist focust Joost zich op het ontwikkelen van innovatieve verpakkingsoplossingen.
                  </p>
                </div>
              </div>

              {/* Boris */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Boris.jpg"
                  alt="Boris"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Boris
                  </h3>
                  <p className="text-lg mb-3 opacity-90">
                    Co-founder & CEO
                  </p>
                  <p className="text-sm leading-relaxed opacity-90">
                    Boris leidt de strategische visie van het bedrijf en bouwt partnerships met webshops en logistieke partners.
                  </p>
                </div>
              </div>

              {/* Bart */}
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Bart Kroese.jpg"
                  alt="Bart"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    Bart
                  </h3>
                  <p className="text-lg mb-3 opacity-90">
                    Co-founder & COO
                  </p>
                  <p className="text-sm leading-relaxed opacity-90">
                    Bart zorgt voor de dagelijkse operaties en de implementatie van onze circulaire logistieke processen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section - Only for Particulier */}
          {customerType === 'particulier' && (
            <section id="contact" className={`py-16 sm:py-20 md:py-24 px-4 sm:px-6 transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'bg-gray-900' : 'bg-white'
            }`}>
              <div className="max-w-7xl mx-auto">
                <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  {/* Two blocks above the send button */}
                  <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 md:mb-20">
                    {/* Left side - Text blocks */}
                    <div className="space-y-6 sm:space-y-8">
                      {/* Main title block */}
                      <div className="text-left">
                        <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 sm:mb-6 transition-colors duration-300 ${
                          customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                          }`}>
                            Neem contact op!
            </h2>
                      </div>
                      
                      {/* Subtitle block */}
                      <div className="text-left flex items-start">
                        <p className={`text-base sm:text-lg md:text-xl leading-relaxed transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          Heb je vragen, wil je een proefpakket aanvragen of wil je samenwerken? Laat hier je gegevens achter via ons contactformulier en we nemen zo snel mogelijk contact met je op.
                        </p>
                      </div>
                    </div>

                    {/* Right side - Contact form */}
                    <div className="flex items-start">
                      <div className="w-full">
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
          )}

          {/* FAQ Section - Only for Particulier */}
          {customerType === 'particulier' && (
            <section id="faq" className={`py-24 pb-40 px-6 transition-colors duration-300 rounded-b-3xl ${
              customerType === 'zakelijk' 
                ? 'bg-gray-900' 
                : 'bg-white'
            }`}>
              <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <div className="flex items-center justify-center mb-6">
                    <div className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-600">
                      FAQ (Consument)
                    </div>
                  </div>
                  <h2 className={`text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-none transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Veelgestelde <span className="scribble-underline" style={{ color: 'var(--color-accent-green)' }}>Vragen</span>
                  </h2>
                </div>

                {/* FAQ Items */}
                <div className="space-y-4">
                  {/* Consumer FAQ 1 */}
                  <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <button
                      onClick={() => {
                        // Toggle FAQ functionality would go here
                      }}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                    >
                      <h3 className="text-xl transition-colors duration-300 text-gray-900">
                        Waarom is een herbruikbare verpakking duurzamer dan karton?
                      </h3>
                      <Image 
                        src="/ReverseArrow.png" 
                        alt="Arrow" 
                        width={24} 
                        height={24}
                        className={`w-6 h-6 transition-transform duration-300`}
                        style={{ 
                          filter: 'none',
                          color: 'var(--color-accent-green)'
                        }}
                      />
                    </button>
                  </div>

                  {/* Consumer FAQ 2 */}
                  <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <button
                      onClick={() => {
                        // Toggle FAQ functionality would go here
                      }}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                    >
                      <h3 className="text-xl transition-colors duration-300 text-gray-900">
                        Hoe lever ik de doos in?
                      </h3>
                      <Image 
                        src="/ReverseArrow.png" 
                        alt="Arrow" 
                        width={24} 
                        height={24}
                        className={`w-6 h-6 transition-transform duration-300`}
                        style={{ 
                          filter: 'none',
                          color: 'var(--color-accent-green)'
                        }}
                      />
                    </button>
                  </div>

                  {/* Consumer FAQ 3 */}
                  <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <button
                      onClick={() => {
                        // Toggle FAQ functionality would go here
                      }}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                    >
                      <h3 className="text-xl transition-colors duration-300 text-gray-900">
                        Is de doos schoon en veilig?
                      </h3>
                      <Image 
                        src="/ReverseArrow.png" 
                        alt="Arrow" 
                        width={24} 
                        height={24}
                        className={`w-6 h-6 transition-transform duration-300`}
                        style={{ 
                          filter: 'none',
                          color: 'var(--color-accent-green)'
                        }}
                      />
                    </button>
                  </div>

                  {/* Consumer FAQ 4 */}
                  <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <button
                      onClick={() => {
                        // Toggle FAQ functionality would go here
                      }}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                    >
                      <h3 className="text-xl transition-colors duration-300 text-gray-900">
                        Wat als de doos beschadigd is?
                      </h3>
                      <Image 
                        src="/ReverseArrow.png" 
                        alt="Arrow" 
                        width={24} 
                        height={24}
                        className={`w-6 h-6 transition-transform duration-300`}
                        style={{ 
                          filter: 'none',
                          color: 'var(--color-accent-green)'
                        }}
                      />
                    </button>
                  </div>

                  {/* Consumer FAQ 5 */}
                  <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <button
                      onClick={() => {
                        // Toggle FAQ functionality would go here
                      }}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                    >
                      <h3 className="text-xl transition-colors duration-300 text-gray-900">
                        Moet ik betalen voor het terugbrengen?
                      </h3>
                      <Image 
                        src="/ReverseArrow.png" 
                        alt="Arrow" 
                        width={24} 
                        height={24}
                        className={`w-6 h-6 transition-transform duration-300`}
                        style={{ 
                          filter: 'none',
                          color: 'var(--color-accent-green)'
                        }}
                      />
                    </button>
                  </div>

                  {/* Consumer FAQ 6 */}
                  <div className="rounded-2xl border transition-all duration-300 overflow-hidden group bg-gray-50 border-gray-200 hover:bg-gray-100">
                    <button
                      onClick={() => {
                        // Toggle FAQ functionality would go here
                      }}
                      className="w-full p-6 text-left flex items-center justify-between transition-colors duration-300"
                    >
                      <h3 className="text-xl transition-colors duration-300 text-gray-900">
                        Mijn drop-off punt is vol/gesloten — wat nu?
                      </h3>
                      <Image 
                        src="/ReverseArrow.png" 
                        alt="Arrow" 
                        width={24} 
                        height={24}
                        className={`w-6 h-6 transition-transform duration-300`}
                        style={{ 
                          filter: 'none',
                          color: 'var(--color-accent-green)'
                        }}
                      />
                    </button>
                  </div>
            </div>
          </div>
            </section>
          )}

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
                <li><a href="/#contact" className="hover:opacity-100 transition-opacity">Contact</a></li>
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
          className="px-4 py-3 bg-white rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-200"
        >
          <span className="text-sm font-medium" style={{ color: 'var(--color-primary-dark)' }}>
            NL
          </span>
        </button>
      </div>
    </div>
  );
}
