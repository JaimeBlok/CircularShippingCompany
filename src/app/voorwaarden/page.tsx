'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function VoorwaardenPage() {
  // State for customer type selection
  const [customerType] = useState<'particulier' | 'zakelijk'>('particulier');

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
              <Link href="/" className="hover:opacity-80 transition-opacity">
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
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/verhaal"
                className={`hover:opacity-70 transition-opacity ${
                  customerType === 'zakelijk' ? 'text-white' : 'text-black'
                }`}
              >
                Ons verhaal
              </Link>
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
              <Link
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
              </Link>
              <Link
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
              </Link>
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
                <Link
                  href="/verhaal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 ${
                    customerType === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
                  }`}
                >
                  Ons verhaal
                </Link>
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
                <Link
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
                </Link>
                <Link
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
            }`}>
              Voorwaarden & Privacy
            </h1>
            <p className={`text-lg transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Algemene voorwaarden en privacybeleid van Circular Shipping Company
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Algemene Voorwaarden */}
            <section>
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
              }`}>Algemene Voorwaarden</h2>

              <div className={`space-y-6 transition-colors duration-300 ${
                customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>1. Definities</h3>
                  <p className="leading-relaxed">
                    In deze voorwaarden wordt verstaan onder &ldquo;Circular Shipping Company&rdquo; of &ldquo;wij&rdquo;: Circular Shipping Company B.V.,
                    gevestigd in Nederland. &ldquo;Klant&rdquo; of &ldquo;u&rdquo; betekent de natuurlijke of rechtspersoon die gebruik maakt van onze diensten.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>2. Diensten</h3>
                  <p className="leading-relaxed">
                    Circular Shipping Company levert herbruikbare verpakkingen en bijbehorende logistieke diensten.
                    Onze diensten omvatten het leveren, ophalen, reinigen en onderhouden van herbruikbare verpakkingen.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>3. Bestellingen en Levering</h3>
                  <p className="leading-relaxed">
                    Alle bestellingen zijn onderworpen aan onze schriftelijke bevestiging. Levering vindt plaats volgens de
                    overeengekomen voorwaarden. Wij streven ernaar om leveringen binnen de afgesproken termijnen uit te voeren.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>4. Betaling</h3>
                  <p className="leading-relaxed">
                    Betaling dient plaats te vinden binnen 30 dagen na factuurdatum, tenzij anders overeengekomen.
                    Bij late betaling zijn wij gerechtigd rente in rekening te brengen.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>5. Aansprakelijkheid</h3>
                  <p className="leading-relaxed">
                    Onze aansprakelijkheid is beperkt tot de waarde van de geleverde diensten. Wij zijn niet aansprakelijk
                    voor indirecte schade, gevolgschade of gederfde winst.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy Beleid */}
            <section>
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
              }`}>Privacy Beleid</h2>

              <div className={`space-y-6 transition-colors duration-300 ${
                customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>1. Verzameling van Gegevens</h3>
                  <p className="leading-relaxed">
                    Wij verzamelen alleen de persoonsgegevens die nodig zijn voor het verlenen van onze diensten.
                    Dit omvat contactgegevens, factuurgegevens en communicatie-informatie.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>2. Doeleinden van Verwerking</h3>
                  <p className="leading-relaxed">
                    Uw persoonsgegevens worden gebruikt voor het uitvoeren van onze diensten, communicatie,
                    facturering en het verbeteren van onze dienstverlening.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>3. Delen van Gegevens</h3>
                  <p className="leading-relaxed">
                    Wij delen uw gegevens niet met derden, behalve wanneer dit wettelijk verplicht is of
                    noodzakelijk voor de uitvoering van onze diensten.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>4. Uw Rechten</h3>
                  <p className="leading-relaxed">
                    U heeft het recht om inzage te krijgen in uw persoonsgegevens, deze te corrigeren of te verwijderen.
                    Neem contact met ons op voor vragen over uw privacy.
                  </p>
                </div>

                <div>
                  <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>5. Beveiliging</h3>
                  <p className="leading-relaxed">
                    Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen
                    tegen ongeautoriseerde toegang, verlies of diefstal.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
                customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
              }`}>Contact</h2>
              <div className={`rounded-2xl p-8 transition-colors duration-300 ${
                customerType === 'zakelijk' ? 'bg-gray-800' : 'bg-gray-50'
              }`}>
                <p className={`mb-4 transition-colors duration-300 ${
                  customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Voor vragen over deze voorwaarden of ons privacybeleid, neem contact met ons op:
                </p>
                <div className="space-y-2">
                  <p className={`font-medium transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-white' : 'text-gray-900'
                  }`}>Circular Shipping Company B.V.</p>
                  <p className={`transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>E-mail: info@circularshipping.com</p>
                  <p className={`transition-colors duration-300 ${
                    customerType === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                  }`}>Telefoon: +31 (0) 15 123 4567</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className={`mt-16 pt-8 border-t text-center transition-colors duration-300 ${
            customerType === 'zakelijk' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`text-sm transition-colors duration-300 ${
              customerType === 'zakelijk' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
