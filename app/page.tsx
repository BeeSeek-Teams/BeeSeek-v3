'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, X, ChevronDown } from 'lucide-react';
// @ts-ignore - react-simple-maps doesn't have types for React 19
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

// Using world-atlas CDN (same as analytics page)
const NIGERIA_TOPO_JSON = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function FAQ() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showBanner, setShowBanner] = useState(true);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [waitlistName, setWaitlistName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zone, setZone] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isExperienceDropdownOpen, setIsExperienceDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    // Countdown timer
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-12-19T00:00:00Z').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="min-h-screen font-lato bg-white overflow-x-hidden">
      {/* Countdown Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#1E3A5F] text-white py-3 sm:py-3 px-2 sm:px-4"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base font-bold">
                <span className="hidden sm:inline">BeeSeek Early Access opens in:</span>
                <span className="sm:hidden">Early Access in:</span>
                <div className="flex gap-1 sm:gap-2">
                  <div className="bg-[#549FE5] px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                    <span className="text-white font-black text-xs sm:text-sm">{timeLeft.days}d</span>
                  </div>
                  <div className="bg-[#549FE5] px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                    <span className="text-white font-black text-xs sm:text-sm">{timeLeft.hours}h</span>
                  </div>
                  <div className="bg-[#549FE5] px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                    <span className="text-white font-black text-xs sm:text-sm">{timeLeft.minutes}m</span>
                  </div>
                  <div className="bg-[#549FE5] px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                    <span className="text-white font-black text-xs sm:text-sm">{timeLeft.seconds}s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowBanner(false)}
              className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fixed Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          isScrolled ? 'bg-white' : 'bg-transparent'
        } ${showBanner ? 'mt-10 sm:mt-12' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo Section */}
            <motion.div 
              className="flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="/beeseek.png"
                  alt="BeeSeek"
                  width={45}
                  height={45}
                  className="object-contain sm:w-[55px] sm:h-[55px]"
                />
              </motion.div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">BeeSeek</span>
            </motion.div>

            {/* Join Early Access Button */}
            <motion.button
              onClick={() => setShowWaitlistModal(true)}
              className="bg-[#F76300] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full hover:bg-orange-600 transition-all font-bold text-xs sm:text-sm xl:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Join Early Access
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="pt-16 sm:pt-20 bg-gradient-to-br from-white via-blue-50 to-orange-50 min-h-[100vh] relative flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-6xl mx-auto pt-12">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#1E3A5F] leading-tight mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span 
                className="block"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Become a Verified
              </motion.span>
              <motion.span 
                className="text-[#549FE5] block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                BeeSeek Agent
              </motion.span>
            </motion.h1>
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 font-semibold max-w-4xl mx-auto mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Get access to verified clients, clear agreements, and protected payments.
            </motion.p>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-gray-500 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              Limited spots per category and per city.
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white"></div>
      </motion.section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 md:h-24 bg-white"></div>

      {/* Why Agents Want This Section - Problem Statement */}
      <motion.section
        className="bg-white min-h-[100vh] flex items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Content */}
            <div>
              {/* Section Header */}
              <motion.h2 
                className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3A5F] mb-12 text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Why we need this
              </motion.h2>

              {/* Problem Statement */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 leading-relaxed mb-8 text-left">
                  The old way of service work is broken:
                </p>
                <ul className="text-base sm:text-lg md:text-xl text-gray-600 space-y-3 md:space-y-4">
                  <li className="flex items-start">
                    <span className="text-[#F76300] mr-4">•</span>
                    <span>Chaotic timing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F76300] mr-4">•</span>
                    <span>Unwritten agreements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F76300] mr-4">•</span>
                    <span>Unfair treatment</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F76300] mr-4">•</span>
                    <span>Unorganized calendar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F76300] mr-4">•</span>
                    <span>Late payments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F76300] mr-4">•</span>
                    <span>Failed payments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#F76300] mr-4">•</span>
                    <span>Broken agreements</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Right: Single Image */}
            <motion.div
              className="mt-8 lg:mt-0 rounded-3xl overflow-hidden bg-gray-50"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
                <Image
                  src="/stressed.png"
                  alt="Service work challenges"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 md:h-24 bg-white"></div>

      {/* BeeSeek Solution Section */}
      <motion.section
        className="bg-white flex items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 w-full">
          <div className="flex flex-col justify-center">
            {/* Solution Header */}
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3A5F] mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              BeeSeek fixes the foundation
            </motion.h2>

            {/* Benefits Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-16">
              {/* Large Card - Verified clients */}
              <motion.div
                className="md:col-span-2 md:row-span-2 bg-white rounded-2xl p-8 flex flex-col justify-center border-2 border-gray-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">Verified clients</h4>
                <p className="text-gray-600 text-base sm:text-lg">Every client is verified before they can book your services</p>
              </motion.div>

              {/* Medium Card - Clear agreements */}
              <motion.div
                className="md:col-span-2 bg-white rounded-2xl p-6 flex items-center border-2 border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-xl font-bold text-[#1E3A5F]">Clear agreements before work begins</span>
              </motion.div>

              {/* Small Card - Protected payments */}
              <motion.div
                className="bg-white rounded-2xl p-6 flex items-center border-2 border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-lg font-bold text-[#1E3A5F]">Protected payments</span>
              </motion.div>

              {/* Small Card - Instant payouts */}
              <motion.div
                className="bg-white rounded-2xl p-6 flex items-center border-2 border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-lg font-bold text-[#1E3A5F]">Instant payouts</span>
              </motion.div>

              {/* Medium Card - Reliable bookings */}
              <motion.div
                className="md:col-span-2 bg-white rounded-2xl p-6 flex items-center border-2 border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="text-xl font-bold text-[#1E3A5F]">Reliable bookings</span>
              </motion.div>

              {/* Small Card - Professional visibility */}
              <motion.div
                className="bg-white rounded-2xl p-6 flex items-center border-2 border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="text-lg font-bold text-[#1E3A5F]">Professional visibility</span>
              </motion.div>

              {/* Small Card - Fair structure */}
              <motion.div
                className="bg-white rounded-2xl p-6 flex items-center border-2 border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <span className="text-lg font-bold text-[#1E3A5F]">Fair structure</span>
              </motion.div>
            </div>

            {/* Closing Statement */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal text-[#1E3A5F] leading-relaxed font-[family-name:var(--font-dancing-script)]">
                "Finally, a platform built for people who actually do the work."
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 md:h-24 bg-white"></div>

      {/* What You Get as a BeeSeek Agent Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-white min-h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3A5F] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What You Get as a BeeSeek Agent
          </motion.h2>

          {/* Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
            {/* Card 1 - Verified Clients - Tall */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col min-h-[320px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative w-full h-64">
                <Image
                  src="/mansory-01.png"
                  alt="Verified Clients"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
                    1
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-3 sm:mb-4">Verified Clients</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    No more uncertainty or timing chaos.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Protected Payments - Regular */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col min-h-[200px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full h-52">
                <Image
                  src="/mansory-02.png"
                  alt="Protected Payments"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#549FE5] rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
                  2
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2 sm:mb-3">Protected Payments</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  Clients pay into BeeSeek first.
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  You get paid when work is completed; no excuses.
                </p>
              </div>
            </motion.div>

            {/* Card 3 - Clear Job Agreements - Wide */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 lg:col-span-1 flex flex-col min-h-[240px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative w-full h-52">
                <Image
                  src="/mansory-03.png"
                  alt="Clear Job Agreements"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
                  3
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2 sm:mb-3">Clear Job Agreements</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Start time, end time, expectations, price, all confirmed before the job starts.
                </p>
              </div>
            </motion.div>

            {/* Card 4 - Instant Payouts - Regular */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col min-h-[200px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="relative w-full h-52">
                <Image
                  src="/mansory-04.png"
                  alt="Instant Payouts"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#549FE5] rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
                  4
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2 sm:mb-3">Instant Payouts</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  No "I'll send it later."
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  Your payout is guaranteed once the job is completed.
                </p>
              </div>
            </motion.div>

            {/* Card 5 - Professional Profile - Tall */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col min-h-[280px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="relative w-full h-64">
                <Image
                  src="/mansory-05.png"
                  alt="Professional Profile"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1E3A5F] rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
                    5
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-3 sm:mb-4">Professional Profile</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Stand out with a verified BeeSeek badge, reviews, portfolio, and category ranking.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 6 - Fair Structure - Regular */}
            <motion.div
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 flex flex-col min-h-[180px]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="relative w-full h-52">
                <Image
                  src="/mansory-06.png"
                  alt="Fair Structure"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#549FE5] rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
                  6
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2 sm:mb-3">Fair Structure</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  Transparent commission. No hidden deductions.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 md:h-24 bg-white"></div>

      {/* How It Works Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-white min-h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3A5F] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works (For Agents)
          </motion.h2>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>

            <div className="space-y-12 sm:space-y-20">
              {/* Step 1 */}
              <motion.div
                className="relative flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="absolute left-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">1</span>
                </div>
                <div className="ml-16 sm:ml-24">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2">Join Early Access</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Submit your details now. Get notified when BeeSeek launches on January 15.
                  </p>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="relative flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="absolute left-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">2</span>
                </div>
                <div className="ml-16 sm:ml-24">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2">App Launches (January 15)</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    BeeSeek Agent app goes live. Access the platform and begin your setup.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="relative flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="absolute left-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">3</span>
                </div>
                <div className="ml-16 sm:ml-24">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2">Create & Verify Your Account</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Build your professional profile with identity verification and credentials.
                  </p>
                </div>
              </motion.div>

              {/* Step 4 */}
              <motion.div
                className="relative flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="absolute left-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">4</span>
                </div>
                <div className="ml-16 sm:ml-24">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2">Create Your Bees</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    List the services you offer. Each service is called a "Bee" on our platform.
                  </p>
                </div>
              </motion.div>

              {/* Step 5 */}
              <motion.div
                className="relative flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="absolute left-0 w-12 h-12 sm:w-16 sm:h-16 bg-[#1E3A5F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">5</span>
                </div>
                <div className="ml-16 sm:ml-24">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-2">Go Live & Start Earning</h3>
                  <p className="text-base sm:text-lg text-gray-600">
                    Your profile goes live in your area. Receive job requests, complete work, and get paid.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 md:h-24 bg-white"></div>

      {/* Cities & Zones Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-white min-h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3A5F] mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Cities & Zones We're Opening First
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Nigeria Map */}
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  rotate: [-8, 0, 0],
                  center: [0, 9],
                  scale: 5000,
                }}
                width={1200}
                height={1000}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <defs>
                  {/* Dot pattern for Nigeria */}
                  <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.5" fill="#D1D5DB" />
                  </pattern>
                  
                  {/* Radial gradient for markers */}
                  <radialGradient id="markerGradient" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#F76300" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#F76300" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#F76300" stopOpacity="0.1" />
                  </radialGradient>
                </defs>

                <Geographies geography={NIGERIA_TOPO_JSON}>
                  {({ geographies }: any) =>
                    geographies
                      .filter((geo: any) => geo.properties.name === "Nigeria")
                      .map((geo: any) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill="url(#dots)"
                          stroke="#B0B0B0"
                          strokeWidth={1}
                          style={{
                            default: { fill: "url(#dots)", stroke: "#B0B0B0", outline: "none" },
                            hover: { fill: "url(#dots)", stroke: "#8B8B8B", outline: "none" },
                            pressed: { fill: "url(#dots)", stroke: "#8B8B8B", outline: "none" },
                          }}
                        />
                      ))
                  }
                </Geographies>

                {/* Lagos Marker with glow effect */}
                <Marker coordinates={[3.3792, 6.5244]}>
                  {/* Outer glow circles */}
                  <circle r={40} fill="url(#markerGradient)" opacity={0.3} />
                  <circle r={25} fill="url(#markerGradient)" opacity={0.5} />
                  {/* Main marker */}
                  <circle r={12} fill="#F76300" stroke="#FFFFFF" strokeWidth={3} />
                  {/* Inner dot */}
                  <circle r={5} fill="#FFFFFF" />
                  {/* Label */}
                  <text
                    textAnchor="middle"
                    y={-50}
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "14px",
                      fontWeight: "700",
                      fill: "#1E3A5F",
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    Lagos
                  </text>
                </Marker>

                {/* Ibadan Marker with glow effect */}
                <Marker coordinates={[3.9470, 7.3775]}>
                  {/* Outer glow circles */}
                  <circle r={35} fill="url(#markerGradient)" opacity={0.3} />
                  <circle r={20} fill="url(#markerGradient)" opacity={0.5} />
                  {/* Main marker */}
                  <circle r={10} fill="#F76300" stroke="#FFFFFF" strokeWidth={3} />
                  {/* Inner dot */}
                  <circle r={4} fill="#FFFFFF" />
                  {/* Label */}
                  <text
                    textAnchor="middle"
                    y={-45}
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "14px",
                      fontWeight: "700",
                      fill: "#1E3A5F",
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    Ibadan
                  </text>
                </Marker>
              </ComposableMap>
            </motion.div>

            {/* Cities Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A5F] mb-6 sm:mb-8">
                Now onboarding for:
              </h3>

              <div className="space-y-5 sm:space-y-6 mb-8 sm:mb-12">
                {/* Lagos */}
                <div className="border-l-4 border-[#F76300] pl-4 sm:pl-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-1 sm:mb-2">Lagos</h4>
                  <p className="text-base sm:text-lg text-gray-600">
                    Island & Mainland zones
                  </p>
                </div>

                {/* Ibadan */}
                <div className="border-l-4 border-[#F76300] pl-4 sm:pl-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-[#1E3A5F] mb-1 sm:mb-2">Ibadan</h4>
                  <p className="text-base sm:text-lg text-gray-600">
                    Bodija / UI axis
                  </p>
                </div>
              </div>

              {/* Other Cities */}
              <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
                <h4 className="text-lg sm:text-xl font-bold text-[#1E3A5F] mb-2 sm:mb-3">
                  Other cities:
                </h4>
                <p className="text-sm sm:text-base text-gray-600 mb-2">
                  Still welcome to join Early Access.
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  You'll be notified when your area opens.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 md:h-24 bg-white"></div>

      {/* Who Can Join (Categories) Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-white min-h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Left Aligned */}
          <motion.div
            className="flex justify-start mb-20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E3A5F] border-b-4 border-[#549FE5] pb-2">
              Who Can Use BeeSeek
            </h2>
          </motion.div>

          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-2xl md:text-3xl lg:text-4xl text-gray-600 font-semibold">
            We are onboarding verified professionals in:
          </p>
        </motion.div>          {/* Tabs Navigation - Horizontal Scroll */}
          <div className="mb-8 -mx-4 sm:mx-0">
            <div className="overflow-x-auto overflow-y-hidden px-4 sm:px-0 hide-scrollbar">
              <div className="flex gap-6 min-w-max pb-2">
                {[
                  { id: 1, name: "Home Repairs & Maintenance" },
                  { id: 2, name: "Cleaning & Domestic Support" },
                  { id: 3, name: "Outdoor & Environmental" },
                  { id: 4, name: "Device & Technical Repairs" },
                  { id: 5, name: "Events & Occasion" },
                  { id: 6, name: "Creative Services" },
                  { id: 7, name: "Fashion" },
                  { id: 8, name: "Personal Care" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-base sm:text-lg whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-[#549FE5] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {selectedCategory === 1 && (
              <motion.div
                key="tab1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'Electrician', 'Plumber', 'AC Repair', 'Fridge/Freezer Repair',
                  'Washing Machine Repair', 'Generator Repair', 'Water Pump Repair',
                  'Borehole Repair & Servicing', 'Carpenter', 'Furniture Repair',
                  'Painter', 'Tiler', 'Welder', 'POP Specialist', 'Roofer',
                  'Door/Gate Installer', 'Window Repair Technician', 'Solar/Inverter Installer',
                  'CCTV Installer', 'Smart Home Installer', 'Handyman'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedCategory === 2 && (
              <motion.div
                key="tab2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'House Cleaning', 'Deep Cleaning', 'Post-Construction Cleaning',
                  'Laundry Pickup & Delivery', 'Upholstery Cleaning', 'Mattress Cleaning',
                  'Window Cleaning', 'Compound/Outdoor Cleaning', 'Drain/Gutter Cleaning',
                  'Sofa/Carpet Cleaning'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedCategory === 3 && (
              <motion.div
                key="tab3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'Gardening', 'Yard Work', 'Landscaping', 'Pest Control',
                  'Waste Disposal', 'Car Wash'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedCategory === 4 && (
              <motion.div
                key="tab4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'Phone Repair', 'Laptop Repair', 'Tablet Repair', 'TV Repair',
                  'Printer Repair', 'Networking / Wi-Fi Setup', 'CCTV Maintenance',
                  'Doorbell/Smart Lock Installations'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedCategory === 5 && (
              <motion.div
                key="tab5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'Event Planning', 'Event Setup', 'Event Decoration', 'Party Decorations',
                  'Event Rentals', 'Event Clean-Up', 'Caterers', 'Bakers',
                  'Ushers', 'Event MC', 'DJ', 'Sound/Lighting Assistants',
                  'Stage/Backdrop Setup'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedCategory === 6 && (
              <motion.div
                key="tab6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'Photography', 'Event Photography', 'Videography', 'Photo/Video Assistant'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedCategory === 7 && (
              <motion.div
                key="tab7"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'Tailoring', 'Cloth Adjustment/Fitting', 'Basic Fashion Fixes'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {selectedCategory === 8 && (
              <motion.div
                key="tab8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-16"
              >
                {[
                  'Barbing', 'Hairdressing', 'Makeup Artist'
                ].map((service, index) => (
                  <motion.div
                    key={service}
                    className="bg-white rounded-xl p-5 sm:p-6 md:p-8 text-center transition-all border border-gray-200 hover:border-[#549FE5]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-[#1E3A5F] font-bold text-sm md:text-base">{service}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Message */}
          <motion.div
            className="text-center mt-24 md:mt-32"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-black rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 shadow-xl">
              <div className="bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-2">
                <div className="bg-black rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 space-y-4 sm:space-y-6">
                  <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold">
                    Do you have a skill people need?
                  </p>
                  <p className="text-lg md:text-xl text-white/90 font-semibold">
                    Ready to turn it into income? Limited spots available in each category.
                  </p>
                  
                  {/* CTA Button */}
                  <motion.button
                    onClick={() => setShowWaitlistModal(true)}
                    className="bg-[#F76300] text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full hover:bg-orange-600 transition-all font-bold text-base sm:text-lg shadow-lg mt-4 sm:mt-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    Yes, I Want to Join
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Spacer */}
      <div className="h-12 sm:h-16 md:h-24 bg-white"></div>

      {/* FAQs Section */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 bg-white min-h-screen"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header - Right Aligned */}
          <motion.div
            className="flex justify-end mb-16"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1E3A5F] border-b-4 border-[#549FE5] pb-2">
              Frequently Asked Questions
            </h2>
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                question: 'Is Early Access free?',
                answer: 'Yes. There is no cost to join.',
              },
              {
                question: 'When will I start receiving jobs?',
                answer: 'Once your profile gets approved and the client program goes online, you can start receiving jobs within your area.',
              },
              {
                question: 'What documents do I need to verify?',
                answer: 'A valid ID, a selfie, and email verification via magic link. You will be selected for a skills assessment at designated times. Exceptional performance earns you a verified badge.',
              },
              {
                question: "Can I join if I'm not in Lagos or Ibadan?",
                answer: "Yes. You'll be added to the waitlist and notified when your area opens.",
              },
              {
                question: 'How does payout work?',
                answer: 'Clients pay BeeSeek first. You get your money after completing the job.',
              },
              {
                question: 'Are there limited slots?',
                answer: 'Yes. To maintain quality, each category and city has limited openings.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full text-left p-4 md:p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm sm:text-base md:text-lg font-bold text-[#1E3A5F] pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <svg
                      className="w-6 h-6 text-[#F76300]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 sm:px-6 pb-6 sm:pb-8 pt-4 sm:pt-6 text-gray-600 text-sm sm:text-base md:text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        className="py-32 sm:py-40 md:py-48 lg:py-64 bg-white relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Double border top */}
        <div className="absolute top-0 left-0 right-0">
          <div className="border-t-2 border-gray-300"></div>
          <div className="border-t-2 border-white mt-1"></div>
          <div className="border-t-2 border-gray-300 mt-1"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#1E3A5F] mb-4 sm:mb-6">
              Become a Verified BeeSeek Agent
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-semibold">
              Clear work, fair pay, and structured protection.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-br from-[#1E3A5F] via-[#2D4A6B] to-[#3A5577] py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-6">
                <Image
                  src="/beeseek.png"
                  alt="BeeSeek"
                  width={45}
                  height={45}
                  className="object-contain sm:w-[55px] sm:h-[55px]"
                />
              <span className="text-2xl font-bold text-white">BeeSeek</span>
            </div>
            <p className="text-white/90 text-lg max-w-2xl mx-auto leading-relaxed mb-6">
              Connecting you with trusted service providers in your area. Making everyday tasks effortless, fast, and secure.
            </p>
            <div className="space-y-2">
              <p className="text-white/80 text-sm font-bold">Business Email:</p>
              <a href="mailto:info@beeseek.site" className="text-white hover:text-[#FAC132] transition-colors text-sm">
                info@beeseek.site 
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/80 text-sm text-center md:text-left">
                © {new Date().getFullYear()} BeeSeek is a product of Loin Tech. All rights reserved.
              </p>
              
              {/* Social Links */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://x.com/beeseek_site" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FAC132] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/beeseek_site/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FAC132] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@beeseek_site" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FAC132] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@BeeSeek_Site" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FAC132] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a2.894 2.894 0 00-2.033-2.033C19.595 3.55 12 3.55 12 3.55s-7.595 0-9.465.603A2.894 2.894 0 00.502 6.186C0 8.056 0 12 0 12s0 3.944.502 5.814a2.894 2.894 0 002.033 2.033C4.405 20.45 12 20.45 12 20.45s7.595 0 9.465-.603a2.894 2.894 0 002.033-2.033C24 15.944 24 12 24 12s0-3.944-.502-5.814zm-13.77 9.42V8.394l6.355 3.606-6.355 3.606z"/>
                  </svg>
                </a>
                <a 
                  href="https://medium.com/@beeseek.site" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FAC132] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/beeseek" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FAC132] transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showWaitlistModal && (
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWaitlistModal(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 max-w-lg w-full shadow-2xl max-h-[90vh] flex flex-col"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 flex-shrink-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Image
                    src="/beeseek.png"
                    alt="BeeSeek"
                    width={32}
                    height={32}
                    className="object-contain sm:w-9 sm:h-9"
                  />
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#1E3A5F]">Join Early Access</h2>
                </div>
                <button
                  onClick={() => setShowWaitlistModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-6">
                Get early access and be among the first verified agents on BeeSeek.
              </p>

              {/* Form */}
              <form onSubmit={async (e) => {
                e.preventDefault();
                
                if (isSubmitting) return;
                
                setIsSubmitting(true);
                setSubmitStatus('idle');
                setErrorMessage('');
                
                try {
                  const params = new URLSearchParams({
                    full_name: waitlistName,
                    whatsapp_number: whatsappNumber,
                    state: state,
                    city: city,
                    zone: zone,
                    service_category: serviceCategory,
                    custom_category: customCategory,
                    years_of_experience: yearsOfExperience
                  });
                  
                  const response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:jPlRG5T0/early_access?${params.toString()}`, {
                    method: 'POST',
                  });
                  
                  if (response.ok) {
                    setSubmitStatus('success');
                    // Close modal and reset form after showing success
                    setTimeout(() => {
                      setShowWaitlistModal(false);
                      setWaitlistName('');
                      setWhatsappNumber('');
                      setState('');
                      setCity('');
                      setZone('');
                      setServiceCategory('');
                      setCustomCategory('');
                      setYearsOfExperience('');
                      setSubmitStatus('idle');
                    }, 2000);
                  } else {
                    throw new Error('Failed to join waitlist');
                  }
                } catch (error) {
                  setSubmitStatus('error');
                  setErrorMessage('Failed to join waitlist. Please try again.');
                }
                
                setIsSubmitting(false);
              }}>
                <div className="space-y-3 h-[50vh] sm:h-[55vh] overflow-y-auto p-1 pr-2 custom-scrollbar">
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="waitlist-name" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="waitlist-name"
                      type="text"
                      value={waitlistName}
                      onChange={(e) => setWaitlistName(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* WhatsApp Number Field */}
                  <div>
                    <label htmlFor="whatsapp-number" className="block text-xs font-medium text-gray-700 mb-1.5">
                      WhatsApp Number *
                    </label>
                    <input
                      id="whatsapp-number"
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="08012345678"
                    />
                  </div>

                  {/* State & City in Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="state" className="block text-xs font-medium text-gray-700 mb-1.5">
                        State *
                      </label>
                      <input
                        id="state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                        placeholder="Lagos"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-xs font-medium text-gray-700 mb-1.5">
                        City *
                      </label>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                        placeholder="Ikeja"
                      />
                    </div>
                  </div>

                  {/* Zone/Area Field */}
                  <div>
                    <label htmlFor="zone" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Zone / Area *
                    </label>
                    <input
                      id="zone"
                      type="text"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                      required
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Allen Avenue"
                    />
                  </div>

                  {/* Main Service Category Field */}
                  <div className="relative">
                    <label htmlFor="service-category" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Main Service Category *
                    </label>
                    <div
                      onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 min-h-[42px] cursor-pointer flex items-center justify-between bg-white"
                    >
                      <span className={serviceCategory ? 'text-gray-900' : 'text-gray-400'}>
                        {serviceCategory || 'Select service category'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {isCategoryDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {[
                            'Home Repairs & Maintenance',
                            'Cleaning & Domestic Support',
                            'Outdoor & Environmental',
                            'Device & Technical Repairs',
                            'Events & Occasion',
                            'Creative Services',
                            'Fashion',
                            'Personal Care'
                          ].map((category) => (
                            <div
                              key={category}
                              onClick={() => {
                                setServiceCategory(category);
                                setIsCategoryDropdownOpen(false);
                              }}
                              className="px-3 py-2.5 text-sm hover:bg-[#549FE5]/10 cursor-pointer transition-colors text-gray-900"
                            >
                              {category}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Custom Category Field */}
                  <div>
                    <label htmlFor="custom-category" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Can't find your category? Type it here
                    </label>
                    <input
                      id="custom-category"
                      type="text"
                      value={customCategory}
                      onChange={(e) => setCustomCategory(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 placeholder-gray-400"
                      placeholder="Enter your service category"
                    />
                  </div>

                  {/* Years of Experience Field */}
                  <div className="relative">
                    <label htmlFor="years-experience" className="block text-xs font-medium text-gray-700 mb-1.5">
                      Years of Experience *
                    </label>
                    <div
                      onClick={() => setIsExperienceDropdownOpen(!isExperienceDropdownOpen)}
                      className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#549FE5] focus:border-transparent outline-none transition-all text-gray-900 min-h-[42px] cursor-pointer flex items-center justify-between bg-white"
                    >
                      <span className={yearsOfExperience ? 'text-gray-900' : 'text-gray-400'}>
                        {yearsOfExperience || 'Select years'}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${isExperienceDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    <AnimatePresence>
                      {isExperienceDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {[
                            'Less than 1 year',
                            '1-2 years',
                            '3-5 years',
                            '6-10 years',
                            'More than 10 years'
                          ].map((years) => (
                            <div
                              key={years}
                              onClick={() => {
                                setYearsOfExperience(years);
                                setIsExperienceDropdownOpen(false);
                              }}
                              className="px-3 py-2.5 text-sm hover:bg-[#549FE5]/10 cursor-pointer transition-colors text-gray-900"
                            >
                              {years}
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div 
                      className="bg-green-50 border border-green-200 text-green-700 px-3 py-2.5 rounded-lg text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        You've been added to the waitlist!
                      </div>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div 
                      className="bg-red-50 border border-red-200 text-red-700 px-3 py-2.5 rounded-lg text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorMessage}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`w-full font-bold py-3 px-6 rounded-lg transition-all mt-4 text-sm ${
                    isSubmitting || submitStatus === 'success'
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                      : 'bg-[#549FE5] hover:bg-[#1E3A5F] text-white'
                  }`}
                  whileHover={!isSubmitting && submitStatus !== 'success' ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting && submitStatus !== 'success' ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Joining...
                    </div>
                  ) : submitStatus === 'success' ? (
                    '✓ Joined Successfully!'
                  ) : (
                    'Join Early Access'
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #549FE5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1E3A5F;
        }
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
