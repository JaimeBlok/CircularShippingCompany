import Image from 'next/image';

export default function VoorwaardenPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b bg-white/80 border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/LogoMain.png"
                alt="Circular Shipping Company"
                width={200}
                height={80}
                className="h-12 w-auto"
                priority
              />
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-black hover:opacity-70 transition-opacity">
                Home
              </a>
              <a href="/#contact" className="text-black hover:opacity-70 transition-opacity">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Voorwaarden & Privacy
            </h1>
            <p className="text-lg text-gray-600">
              Algemene voorwaarden en privacybeleid van Circular Shipping Company
            </p>
          </div>

          {/* Content */}
          <div className="space-y-12">
            {/* Algemene Voorwaarden */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Algemene Voorwaarden</h2>
              
              <div className="space-y-6 text-gray-600">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Definities</h3>
                  <p className="leading-relaxed">
                    In deze voorwaarden wordt verstaan onder "Circular Shipping Company" of "wij": Circular Shipping Company B.V., 
                    gevestigd in Nederland. "Klant" of "u" betekent de natuurlijke of rechtspersoon die gebruik maakt van onze diensten.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Diensten</h3>
                  <p className="leading-relaxed">
                    Circular Shipping Company levert herbruikbare verpakkingen en bijbehorende logistieke diensten. 
                    Onze diensten omvatten het leveren, ophalen, reinigen en onderhouden van herbruikbare verpakkingen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Bestellingen en Levering</h3>
                  <p className="leading-relaxed">
                    Alle bestellingen zijn onderworpen aan onze schriftelijke bevestiging. Levering vindt plaats volgens de 
                    overeengekomen voorwaarden. Wij streven ernaar om leveringen binnen de afgesproken termijnen uit te voeren.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Betaling</h3>
                  <p className="leading-relaxed">
                    Betaling dient plaats te vinden binnen 30 dagen na factuurdatum, tenzij anders overeengekomen. 
                    Bij late betaling zijn wij gerechtigd rente in rekening te brengen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Aansprakelijkheid</h3>
                  <p className="leading-relaxed">
                    Onze aansprakelijkheid is beperkt tot de waarde van de geleverde diensten. Wij zijn niet aansprakelijk 
                    voor indirecte schade, gevolgschade of gederfde winst.
                  </p>
                </div>
              </div>
            </section>

            {/* Privacy Beleid */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Beleid</h2>
              
              <div className="space-y-6 text-gray-600">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Verzameling van Gegevens</h3>
                  <p className="leading-relaxed">
                    Wij verzamelen alleen de persoonsgegevens die nodig zijn voor het verlenen van onze diensten. 
                    Dit omvat contactgegevens, factuurgegevens en communicatie-informatie.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Doeleinden van Verwerking</h3>
                  <p className="leading-relaxed">
                    Uw persoonsgegevens worden gebruikt voor het uitvoeren van onze diensten, communicatie, 
                    facturering en het verbeteren van onze dienstverlening.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Delen van Gegevens</h3>
                  <p className="leading-relaxed">
                    Wij delen uw gegevens niet met derden, behalve wanneer dit wettelijk verplicht is of 
                    noodzakelijk voor de uitvoering van onze diensten.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Uw Rechten</h3>
                  <p className="leading-relaxed">
                    U heeft het recht om inzage te krijgen in uw persoonsgegevens, deze te corrigeren of te verwijderen. 
                    Neem contact met ons op voor vragen over uw privacy.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Beveiliging</h3>
                  <p className="leading-relaxed">
                    Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen 
                    tegen ongeautoriseerde toegang, verlies of diefstal.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact</h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <p className="text-gray-600 mb-4">
                  Voor vragen over deze voorwaarden of ons privacybeleid, neem contact met ons op:
                </p>
                <div className="space-y-2">
                  <p className="text-gray-900 font-medium">Circular Shipping Company B.V.</p>
                  <p className="text-gray-600">E-mail: info@circularshipping.com</p>
                  <p className="text-gray-600">Telefoon: +31 (0) 15 123 4567</p>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-500">
              Laatst bijgewerkt: {new Date().toLocaleDateString('nl-NL')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
