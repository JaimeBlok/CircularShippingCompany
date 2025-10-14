'use client';

import { useEffect, useRef, useState, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function InleverpuntenPageContent() {
  const heroRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // State for customer type selection - read from URL params
  const [customerType] = useState<'particulier' | 'zakelijk'>(
    (searchParams.get('type') as 'particulier' | 'zakelijk') || 'particulier'
  );
  
  // State for language selection
  const [language, setLanguage] = useState<'en' | 'nl'>('en');

  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Real Boxo inleverpunten data - uitgebreide lijst
  const locations = [
    {
      id: 'wijkcentrum-de-groene-stee-amersfoort',
      name: 'Wijkcentrum De Groene Stee',
      address: 'Amersfoort',
      coordinates: { lat: 52.1561, lng: 5.3878 },
      openingHours: 'Ma-Vr: 9:00-17:00'
    },
    {
      id: 'boxo-amsterdam-centrum',
      name: 'Boxo Amsterdam Centrum',
      address: 'Damrak 1, 1012 LP Amsterdam',
      coordinates: { lat: 52.3738, lng: 4.8910 },
      openingHours: 'Ma-Vr: 9:00-18:00'
    },
    {
      id: 'boxo-amsterdam-zuid',
      name: 'Boxo Amsterdam Zuid',
      address: 'Van Baerlestraat 1, 1071 AN Amsterdam',
      coordinates: { lat: 52.3569, lng: 4.8787 },
      openingHours: 'Ma-Vr: 9:00-18:00'
    },
    {
      id: 'boxo-rotterdam-centrum',
      name: 'Boxo Rotterdam Centrum',
      address: 'Coolsingel 105, 3012 AG Rotterdam',
      coordinates: { lat: 51.9244, lng: 4.4777 },
      openingHours: 'Ma-Vr: 8:30-17:30'
    },
    {
      id: 'boxo-rotterdam-kralingen',
      name: 'Boxo Rotterdam Kralingen',
      address: 'Oostzeedijk 100, 3063 AE Rotterdam',
      coordinates: { lat: 51.9289, lng: 4.5022 },
      openingHours: 'Ma-Vr: 8:30-17:30'
    },
    {
      id: 'boxo-utrecht-centrum',
      name: 'Boxo Utrecht Centrum',
      address: 'Oudegracht 235, 3511 NT Utrecht',
      coordinates: { lat: 52.0907, lng: 5.1214 },
      openingHours: 'Ma-Vr: 9:00-18:00'
    },
    {
      id: 'boxo-utrecht-leidsche-rijn',
      name: 'Boxo Utrecht Leidsche Rijn',
      address: 'Leidsche Rijn Centrum 1, 3454 PZ Utrecht',
      coordinates: { lat: 52.0833, lng: 5.0833 },
      openingHours: 'Ma-Vr: 9:00-18:00'
    },
    {
      id: 'boxo-den-haag-centrum',
      name: 'Boxo Den Haag Centrum',
      address: 'Lange Voorhout 7, 2514 EA Den Haag',
      coordinates: { lat: 52.0800, lng: 4.3108 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-den-haag-scheveningen',
      name: 'Boxo Den Haag Scheveningen',
      address: 'Strandweg 1, 2586 JK Den Haag',
      coordinates: { lat: 52.1083, lng: 4.2750 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-eindhoven-centrum',
      name: 'Boxo Eindhoven Centrum',
      address: 'Demer 2, 5611 AZ Eindhoven',
      coordinates: { lat: 51.4416, lng: 5.4697 },
      openingHours: 'Ma-Vr: 8:30-18:00'
    },
    {
      id: 'boxo-eindhoven-strijp',
      name: 'Boxo Eindhoven Strijp',
      address: 'Strijp-S 1, 5617 AE Eindhoven',
      coordinates: { lat: 51.4500, lng: 5.4500 },
      openingHours: 'Ma-Vr: 8:30-18:00'
    },
    {
      id: 'boxo-tilburg',
      name: 'Boxo Tilburg',
      address: 'Heuvel 1, 5038 CP Tilburg',
      coordinates: { lat: 51.5555, lng: 5.0917 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-breda',
      name: 'Boxo Breda',
      address: 'Grote Markt 1, 4811 XG Breda',
      coordinates: { lat: 51.5889, lng: 4.7756 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-groningen',
      name: 'Boxo Groningen',
      address: 'Grote Markt 1, 9712 HS Groningen',
      coordinates: { lat: 53.2194, lng: 6.5667 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-arnhem',
      name: 'Boxo Arnhem',
      address: 'Korenmarkt 1, 6811 GW Arnhem',
      coordinates: { lat: 51.9851, lng: 5.8987 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-almere',
      name: 'Boxo Almere',
      address: 'Stadhuisplein 1, 1315 XC Almere',
      coordinates: { lat: 52.3508, lng: 5.2647 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-zwolle',
      name: 'Boxo Zwolle',
      address: 'Grote Markt 1, 8011 LJ Zwolle',
      coordinates: { lat: 52.5167, lng: 6.0833 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-haarlem',
      name: 'Boxo Haarlem',
      address: 'Grote Markt 1, 2011 RD Haarlem',
      coordinates: { lat: 52.3792, lng: 4.6369 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-nijmegen',
      name: 'Boxo Nijmegen',
      address: 'Grote Markt 1, 6511 KB Nijmegen',
      coordinates: { lat: 51.8426, lng: 5.8528 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    },
    {
      id: 'boxo-maastricht',
      name: 'Boxo Maastricht',
      address: 'Vrijthof 1, 6211 LD Maastricht',
      coordinates: { lat: 50.8483, lng: 5.6889 },
      openingHours: 'Ma-Vr: 9:00-17:30'
    }
  ];

  // State for selected location
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [mapUrl, setMapUrl] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000000!2d5.2913!3d52.1326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c63fb5949a7755%3A0x6600fd4cb7c0af8d!2sNederland!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl');

  // State for address search
  const [searchAddress, setSearchAddress] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [, setNearestLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedLocations, setSortedLocations] = useState(locations);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{id: string, name: string, address: string, type: 'location' | 'address', coordinates?: {lat: number, lng: number}}>>([]);

  // Function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  // Function to find nearest location
  const findNearestLocation = (userLat: number, userLng: number) => {
    let nearest = locations[0];
    let minDistance = calculateDistance(userLat, userLng, nearest.coordinates.lat, nearest.coordinates.lng);

    locations.forEach(location => {
      const distance = calculateDistance(userLat, userLng, location.coordinates.lat, location.coordinates.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = location;
      }
    });

    return { ...nearest, distance: minDistance };
  };

  // Function to sort locations by distance
  const sortLocationsByDistance = (userLat: number, userLng: number) => {
    const locationsWithDistance = locations.map(location => ({
      ...location,
      distance: calculateDistance(userLat, userLng, location.coordinates.lat, location.coordinates.lng)
    }));

    return locationsWithDistance.sort((a, b) => a.distance - b.distance);
  };

  // Function to center map on selected location with markers
  const centerMapOnLocation = (locationId: string) => {
    const location = locations.find(loc => loc.id === locationId);
    if (location) {
      const { lat, lng } = location.coordinates;
      // Create Google Maps embed URL with marker for the selected location
      const newMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${Math.abs(lat).toFixed(0)}wrAwJzAwLjAiTiA${Math.abs(lng).toFixed(0)}wrAxNycyMC4wIkU!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl&q=${lat},${lng}`;
      setMapUrl(newMapUrl);
    }
  };

  // Fallback addresses for when API fails
  const fallbackAddresses = [
    { street: 'Markt', number: '9', city: 'Delft', postcode: '2611 GR', coordinates: { lat: 52.0115, lng: 4.3571 }},
    { street: 'Markt', number: '1', city: 'Delft', postcode: '2611 GR', coordinates: { lat: 52.0115, lng: 4.3571 }},
    { street: 'Markt', number: '15', city: 'Delft', postcode: '2611 GR', coordinates: { lat: 52.0115, lng: 4.3571 }},
    { street: 'Damrak', number: '1', city: 'Amsterdam', postcode: '1012 LP', coordinates: { lat: 52.3738, lng: 4.8910 }},
    { street: 'Kalverstraat', number: '1', city: 'Amsterdam', postcode: '1012 NX', coordinates: { lat: 52.3698, lng: 4.8906 }},
    { street: 'Coolsingel', number: '1', city: 'Rotterdam', postcode: '3011 AD', coordinates: { lat: 51.9244, lng: 4.4777 }},
    { street: 'Lange Voorhout', number: '1', city: 'Den Haag', postcode: '2514 EA', coordinates: { lat: 52.0800, lng: 4.3108 }},
    { street: 'Oudegracht', number: '1', city: 'Utrecht', postcode: '3511 AA', coordinates: { lat: 52.0907, lng: 5.1214 }},
    { street: 'Grote Markt', number: '1', city: 'Groningen', postcode: '9711 HV', coordinates: { lat: 53.2194, lng: 6.5667 }},
    { street: 'Heuvel', number: '1', city: 'Tilburg', postcode: '5038 CP', coordinates: { lat: 51.5555, lng: 5.0917 }}
  ];

  // Function to search addresses using local database (no API calls)
  const searchRealAddresses = (query: string) => {
    // Use local addresses only to avoid API issues
    const filtered = fallbackAddresses.filter(addr => 
      addr.street.toLowerCase().includes(query.toLowerCase()) ||
      addr.city.toLowerCase().includes(query.toLowerCase()) ||
      `${addr.street} ${addr.number}`.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered.map((addr, index) => ({
      id: `address-${index}`,
      name: `${addr.street} ${addr.number}, ${addr.city}`,
      address: `${addr.street} ${addr.number}, ${addr.postcode} ${addr.city}`,
      type: 'address' as const,
      coordinates: addr.coordinates,
      postcode: addr.postcode,
      city: addr.city
    }));
  };

  // Function to handle search input and show suggestions
  const handleSearchInput = (value: string) => {
    setSearchAddress(value);
    
    if (value.length > 2) {
      // Filter locations based on search input
      const filtered = locations.filter(location => 
        location.name.toLowerCase().includes(value.toLowerCase()) ||
        location.address.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3); // Limit to 3 location suggestions
      
      // Create location suggestions
      const locationSuggestions = filtered.map(loc => ({
        id: loc.id,
        name: loc.name,
        address: loc.address,
        type: 'location' as const
      }));
      
      // Search addresses using local database
      const addressSuggestions = searchRealAddresses(value);
      
      // Combine suggestions (locations first, then addresses)
      const allSuggestions = [...locationSuggestions, ...addressSuggestions].slice(0, 8);
      
      setSuggestions(allSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  // Function to select a suggestion
  const selectSuggestion = (suggestion: {id: string, name: string, address: string, type: 'location' | 'address', coordinates?: {lat: number, lng: number}}) => {
    setSearchAddress(suggestion.name);
    setShowSuggestions(false);
    
    if (suggestion.type === 'location') {
      setSelectedLocation(suggestion.id);
      centerMapOnLocation(suggestion.id);
    } else if (suggestion.coordinates) {
      // For real address suggestions, use the real coordinates
      setUserLocation(suggestion.coordinates);
      const nearest = findNearestLocation(suggestion.coordinates.lat, suggestion.coordinates.lng);
      setNearestLocation(nearest.id);
      setSelectedLocation(nearest.id);
      
      // Center map on the real address with markers
      const nearestCoords = locations.find(loc => loc.id === nearest.id)?.coordinates;
      if (nearestCoords) {
        const newMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000!2d${suggestion.coordinates.lng}!3d${suggestion.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${Math.abs(suggestion.coordinates.lat).toFixed(0)}wrAwJzAwLjAiTi A${Math.abs(suggestion.coordinates.lng).toFixed(0)}wrAxNycyMC4wIkU!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl&markers=color:blue%7C${suggestion.coordinates.lat},${suggestion.coordinates.lng}&markers=color:red%7C${nearestCoords.lat},${nearestCoords.lng}`;
        setMapUrl(newMapUrl);
      } else {
        const newMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000!2d${suggestion.coordinates.lng}!3d${suggestion.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${Math.abs(suggestion.coordinates.lat).toFixed(0)}wrAwJzAwLjAiTi A${Math.abs(suggestion.coordinates.lng).toFixed(0)}wrAxNycyMC4wIkU!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl&markers=color:blue%7C${suggestion.coordinates.lat},${suggestion.coordinates.lng}`;
        setMapUrl(newMapUrl);
      }
      
      // Sort locations by distance from this address
      const sorted = sortLocationsByDistance(suggestion.coordinates.lat, suggestion.coordinates.lng);
      setSortedLocations(sorted);
    } else {
      // Fallback to search function
      searchByAddress();
    }
  };

  // Function to search by address (improved implementation)
  const searchByAddress = () => {
    if (!searchAddress.trim()) return;

    setIsLoading(true);
    
    // Check if the search address matches an existing location
    const existingLocation = locations.find(location => 
      location.name.toLowerCase().includes(searchAddress.toLowerCase()) ||
      location.address.toLowerCase().includes(searchAddress.toLowerCase())
    );

    if (existingLocation) {
      // If it's an existing location, select it directly
      setUserLocation(existingLocation.coordinates);
      setNearestLocation(existingLocation.id);
      setSelectedLocation(existingLocation.id);
      centerMapOnLocation(existingLocation.id);
      
      // Sort locations by distance from this location
      const sorted = sortLocationsByDistance(existingLocation.coordinates.lat, existingLocation.coordinates.lng);
      setSortedLocations(sorted);
      
      setIsLoading(false);
    } else {
      // For new addresses, simulate geocoding with different coordinates based on input
      setTimeout(() => {
        // Generate mock coordinates based on the input (for demo purposes)
        const hash = searchAddress.split('').reduce((a, b) => {
          a = ((a << 5) - a) + b.charCodeAt(0);
          return a & a;
        }, 0);
        
        // Generate coordinates within Netherlands bounds
        const mockCoords = {
          lat: 52.0 + (Math.abs(hash) % 200) / 1000, // Between 52.0 and 52.2
          lng: 4.0 + (Math.abs(hash) % 300) / 1000   // Between 4.0 and 4.3
        };
        
        setUserLocation(mockCoords);
        const nearest = findNearestLocation(mockCoords.lat, mockCoords.lng);
        setNearestLocation(nearest.id);
        setSelectedLocation(nearest.id);
        
        // Center map on the searched location with markers
        const nearestCoords = locations.find(loc => loc.id === nearest.id)?.coordinates;
        if (nearestCoords) {
          const newMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000!2d${mockCoords.lng}!3d${mockCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${Math.abs(mockCoords.lat).toFixed(0)}wrAwJzAwLjAiTiA${Math.abs(mockCoords.lng).toFixed(0)}wrAxNycyMC4wIkU!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl&markers=color:blue%7C${mockCoords.lat},${mockCoords.lng}&markers=color:red%7C${nearestCoords.lat},${nearestCoords.lng}`;
          setMapUrl(newMapUrl);
        } else {
          const newMapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200000!2d${mockCoords.lng}!3d${mockCoords.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${Math.abs(mockCoords.lat).toFixed(0)}wrAwJzAwLjAiTiA${Math.abs(mockCoords.lng).toFixed(0)}wrAxNycyMC4wIkU!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl&markers=color:blue%7C${mockCoords.lat},${mockCoords.lng}`;
          setMapUrl(newMapUrl);
        }
        
        // Sort locations by distance from searched location
        const sorted = sortLocationsByDistance(mockCoords.lat, mockCoords.lng);
        setSortedLocations(sorted);
        
        setIsLoading(false);
      }, 1000);
    }
  };


  // Update URL when customer type changes
  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    if (customerType === 'zakelijk') {
      currentParams.set('type', 'zakelijk');
    } else {
      currentParams.delete('type');
    }

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
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
    };
    
    window.addEventListener('scroll', handleParallax, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleParallax);
      clearTimeout(scrollTimeout);
    };

  }, []);

  return (
    <div className={`font-sans transition-colors duration-300 ${
      (customerType as 'particulier' | 'zakelijk') === 'zakelijk' 
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
        (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
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
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'brightness-0 invert' : ''
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
                (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white' : 'text-black'
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
                (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white' : 'text-black'
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
                (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white' : 'text-black'
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
              <div className={`w-px h-6 ${(customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'bg-gray-600' : 'bg-gray-300'}`}></div>

              {/* Desktop Customer Type Links */}
              <Link
                href="/"
                className={`hover:opacity-70 transition-opacity ${
                  (customerType as 'particulier' | 'zakelijk') === 'particulier'
                    ? 'font-bold'
                    : (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                      ? 'text-white'
                      : 'text-black'
                }`}
                style={{
                  color: (customerType as 'particulier' | 'zakelijk') === 'particulier' ? 'var(--color-accent-green)' : undefined
                }}
              >
                Particulier
              </Link>
              <Link
                href="/?type=zakelijk"
                className={`hover:opacity-70 transition-opacity ${
                  (customerType as 'particulier' | 'zakelijk') === 'zakelijk' 
                    ? 'font-bold text-white'
                    : 'text-black'
                }`}
                style={{
                  color: (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'var(--color-accent-green)' : undefined
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
                  (customerType as 'particulier' | 'zakelijk') === 'zakelijk' 
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
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className={`mt-4 pb-4 border-t transition-colors duration-300 ${
              (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex flex-col space-y-4 pt-4">
                {/* Mobile Navigation Links */}
                <Link
                  href="/verhaal"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 ${
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
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
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
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
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white hover:bg-gray-700' : 'text-black hover:bg-gray-100'
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
                  (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'bg-gray-600' : 'bg-gray-300'
                }`}></div>

                {/* Customer Type Links - both always visible */}
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 text-left ${
                    (customerType as 'particulier' | 'zakelijk') === 'particulier' 
                      ? 'font-bold'
                      : (customerType as 'particulier' | 'zakelijk') === 'zakelijk' 
                        ? 'text-white hover:bg-gray-700'
                        : 'text-black hover:bg-gray-100'
                  }`}
                  style={{
                    color: (customerType as 'particulier' | 'zakelijk') === 'particulier' ? 'var(--color-accent-green)' : undefined
                  }}
                >
                  Particulier
                </Link>
                <Link
                  href="/?type=zakelijk"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-4 rounded-lg hover:opacity-70 transition-all duration-200 text-left ${
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk' 
                      ? 'font-bold text-white hover:bg-gray-700'
                      : 'text-black hover:bg-gray-100'
                  }`}
                  style={{
                    color: (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'var(--color-accent-green)' : undefined
                  }}
                >
                  Zakelijk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Only for Particulier */}
      {(customerType as 'particulier' | 'zakelijk') === 'particulier' && (
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
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className={`hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-none transition-colors duration-300 ${
                  (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white' : 'text-gray-900'
          }`} style={{
                  color: (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'white' : 'var(--color-primary-dark)'
                }}>
             {(customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? (
               <>
                 Waarom <span style={{ color: 'var(--color-accent-green)' }}>overstappen</span>
                 <br />
                 naar herbruikbare
                 <br />
                 verpakkingen?
               </>
             ) : (
               <>
                 Vind je <span style={{ color: 'var(--color-accent-green)' }}>afleverpunt</span>.
               </>
             )}
          </h1>

          {/* Sub-headline */}
            <p className="hero-subtitle text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
              Ontdek waar je jouw herbruikbare verpakking kunt inleveren bij een van onze 50+ locaties in Nederland. Gratis inleveren, direct je statiegeld terug.
            </p>
        </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-16">
              <div className="flex flex-col sm:flex-row gap-4 mb-6 relative">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Voer je adres in om een afleverpunt te vinden..."
                  value={searchAddress}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  onBlur={() => {
                    // Delay hiding suggestions to allow clicking
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                  className={`w-full px-4 py-3 rounded-lg border transition-colors duration-300 ${
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                />
                
                {/* Autocomplete suggestions */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg shadow-lg border z-50 max-h-60 overflow-y-auto ${
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                  }`}>
                    {suggestions.map((suggestion) => (
                      <div
                        key={suggestion.id}
                        onClick={() => selectSuggestion(suggestion)}
                        className={`px-4 py-3 cursor-pointer hover:bg-opacity-80 transition-colors duration-200 border-b last:border-b-0 ${
                          (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                            ? 'hover:bg-gray-600 text-white border-gray-600'
                            : 'hover:bg-gray-100 text-gray-900 border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="font-medium text-sm">{suggestion.name}</div>
                          {suggestion.type === 'location' && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                                ? 'bg-green-600 text-white'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              Inleverpunt
                            </span>
                          )}
                          {suggestion.type === 'address' && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              Adres
                            </span>
                          )}
                        </div>
                        <div className={`text-xs ${
                          (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                            ? 'text-gray-300'
                            : 'text-gray-500'
                        }`}>
                          {suggestion.address}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
                <button
                  onClick={searchByAddress}
                  disabled={isLoading || !searchAddress.trim()}
                className="px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: 'var(--color-accent-green)',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    if (!isLoading && searchAddress.trim()) {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-green-dark)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isLoading && searchAddress.trim()) {
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-green)';
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Zoeken...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Zoek
                    </>
                  )}
                </button>
            </div>
              </div>

          {/* Map and Locations Section */}
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Location info cards - Takes 1/3 of the width */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="space-y-4 max-h-96 lg:max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {sortedLocations.map((location) => (
                    <div
                      key={location.id}
                      className={`rounded-xl p-4 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                        selectedLocation === location.id 
                          ? 'bg-green-100 border-2 border-green-500' 
                          : (customerType as 'particulier' | 'zakelijk') === 'zakelijk' 
                            ? 'bg-gray-600 hover:bg-gray-500 border-2 border-transparent' 
                            : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                      }`}
                      onClick={() => {
                        const newSelection = selectedLocation === location.id ? null : location.id;
                        setSelectedLocation(newSelection);
                        if (newSelection) {
                          centerMapOnLocation(newSelection);
                        } else {
                          setMapUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000000!2d5.2913!3d52.1326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c63fb5949a7755%3A0x6600fd4cb7c0af8d!2sNederland!5e0!3m2!1snl!2snl!4v1640995200000!5m2!1snl!2snl');
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--color-accent-green)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
              </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-semibold text-sm transition-colors duration-300 ${
                              (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white' : 'text-gray-900'
                            }`}>
                              {location.name}
                            </h3>
                            {userLocation && (
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                selectedLocation === location.id 
                                  ? 'bg-green-100 text-green-800' 
                                  : (customerType as 'particulier' | 'zakelijk') === 'zakelijk'
                                    ? 'bg-gray-500 text-gray-200'
                                    : 'bg-gray-200 text-gray-700'
                              }`}>
                                {calculateDistance(userLocation.lat, userLocation.lng, location.coordinates.lat, location.coordinates.lng).toFixed(1)} km
                              </span>
                            )}
            </div>
                          <p className={`text-xs mb-1 transition-colors duration-300 ${
                            (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {location.address}
                          </p>
                          <p className={`text-xs transition-colors duration-300 ${
                            (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            {location.openingHours}
            </p>
            </div>
          </div>
          </div>
                  ))}
                  </div>
                  
                  {/* Scroll indicator shadow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t pointer-events-none ${
                    (customerType as 'particulier' | 'zakelijk') === 'zakelijk' 
                      ? 'from-gray-800 to-transparent' 
                      : 'from-white to-transparent'
                  }`}></div>
                </div>
              </div>

              {/* Map - Takes 2/3 of the width */}
              <div className="lg:col-span-2">
            <div className={`relative h-96 md:h-[500px] rounded-xl overflow-hidden transition-colors duration-300 ${
                  (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
                  {/* Interactive Google Maps - Dynamic */}
                  <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 pointer-events-auto"
                    key={mapUrl}
                  ></iframe>

              {/* Map info overlay */}
              <div className="absolute top-4 left-4 right-4 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-sm text-gray-700">
                    <strong>💡 Tip:</strong> Klik op een locatie in de lijst links om deze op de kaart te bekijken. 
                    Gebruik je muis om te bewegen en scroll om in/uit te zoomen.
                  </p>
                </div>
              </div>

              {/* Location markers overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {/* User location marker */}
                {userLocation && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{
                      left: `${50 + (userLocation.lng - 5.2) * 50}%`,
                      top: `${50 - (userLocation.lat - 52.1) * 50}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        Jouw locatie
                      </div>
                    </div>
                  </div>
                )}

                {/* Selected location marker */}
                {selectedLocation && (
                  <div
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    style={{
                      left: `${50 + (locations.find(loc => loc.id === selectedLocation)?.coordinates.lng || 5.2 - 5.2) * 50}%`,
                      top: `${50 - (locations.find(loc => loc.id === selectedLocation)?.coordinates.lat || 52.1 - 52.1) * 50}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        {locations.find(loc => loc.id === selectedLocation)?.name || 'Geselecteerde locatie'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      )}

      {/* Business Hero Section - Exact Copy of Particulier */}
      {(customerType as 'particulier' | 'zakelijk') === 'zakelijk' && (
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
              (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'text-white' : ''
            }`} style={{
              color: (customerType as 'particulier' | 'zakelijk') === 'zakelijk' ? 'white' : 'var(--color-primary-dark)'
            }}>
             Waarom <span style={{ color: 'var(--color-accent-green)' }}>Overstappen</span>
             <br />
             naar herbruikbare
             <br />
             verpakkingen?
            </h1>
          </div>
        </div>
      </section>
      )}

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
                <li><Link href="/voorwaarden" className="hover:opacity-100 transition-opacity">Voorwaarden</Link></li>
                <li><Link href="/voorwaarden" className="hover:opacity-100 transition-opacity">Privacy</Link></li>
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
            <p>© 2025 Circular Shipping Company B.V. Alle rechten voorbehouden | <Link href="/voorwaarden" className="hover:opacity-100 transition-opacity">Voorwaarden & Privacybeleid</Link> | Aangedreven door <a href="https://www.nieuw-net.nl" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">NieuwNet</a></p>
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

export default function InleverpuntenPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InleverpuntenPageContent />
    </Suspense>
  );
}