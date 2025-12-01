import React, { useState, useEffect, useRef } from 'react';
import { Play, TrendingUp, Cpu, Zap, Brain, Rocket, Activity, ChevronDown, ChevronUp, Calendar, Users, Zap as FastIcon, Target, Sparkles, AlertTriangle, Database, Smile, Award, Terminal, Gauge, UserCheck } from 'lucide-react';

// Impact View Component
const ImpactView = ({ onBack }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(-1); // Start at -1 (no cards shown)
  const [showFinalSection, setShowFinalSection] = useState(false);
  const [showPersonalImpact, setShowPersonalImpact] = useState(false);
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(-1); // For engineer benefits
  const [showSurvivalPage, setShowSurvivalPage] = useState(false); // For "Adapt and Survive" page
  const [currentMandateIndex, setCurrentMandateIndex] = useState(-1); // For mandate cards
  
  // Refs for mandate cards scrolling
  const mandate0Ref = useRef(null);
  const mandate1Ref = useRef(null);
  const mandate2Ref = useRef(null);

  // Keyboard navigation for cards, personal impact, benefit cards, and mandates
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        if (showSurvivalPage && currentMandateIndex < 2) {
          setCurrentMandateIndex(prev => prev + 1);
        } else if (showPersonalImpact && currentBenefitIndex < 2) {
          setCurrentBenefitIndex(prev => prev + 1);
        } else if (currentCardIndex < 2) {
          setCurrentCardIndex(prev => prev + 1);
        } else if (currentCardIndex === 2 && !showPersonalImpact) {
          setShowPersonalImpact(true);
          setCurrentBenefitIndex(-1); // Reset benefit cards
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (showSurvivalPage && currentMandateIndex > -1) {
          setCurrentMandateIndex(prev => prev - 1);
        } else if (showPersonalImpact && currentBenefitIndex > -1) {
          setCurrentBenefitIndex(prev => prev - 1);
        } else if (showPersonalImpact) {
          setShowPersonalImpact(false);
          setCurrentBenefitIndex(-1);
        } else if (currentCardIndex > -1) {
          setCurrentCardIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentCardIndex, showPersonalImpact, currentBenefitIndex, showSurvivalPage, currentMandateIndex]);





  const handleNext = () => {
    if (showPersonalImpact && currentBenefitIndex < 2) {
      setCurrentBenefitIndex(prev => prev + 1);
    } else if (currentCardIndex < 2) {
      setCurrentCardIndex(prev => prev + 1);
    } else if (currentCardIndex === 2 && !showPersonalImpact) {
      setShowPersonalImpact(true);
      setCurrentBenefitIndex(-1);
    }
  };

  const handlePrev = () => {
    if (showPersonalImpact && currentBenefitIndex > -1) {
      setCurrentBenefitIndex(prev => prev - 1);
    } else if (showPersonalImpact) {
      setShowPersonalImpact(false);
      setCurrentBenefitIndex(-1);
    } else if (showFinalSection) {
      setShowFinalSection(false);
    } else if (currentCardIndex > -1) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const cards = [
    {
      icon: <Target size={40} />,
      iconColor: 'text-blue-400',
      title: 'SaaS is Dead.\nLong Live Service.',
      highlightStat: 'Klarna\'s AI agent did the work of 700 humans in Month 1.',
      coreMessage: 'We stop building interfaces for interaction amd start building intelligence for resolution. Let\'s stop  measuring success by \'features shipped\' and start measuring by \'problems resolved\'.',
      glowColor: 'group-hover:shadow-blue-500/50'
    },
    {
      icon: <Database size={40} />,
      iconColor: 'text-amber-400',
      title: 'Our Data is\nOur Moat',
      highlightStat: 'AI unlocks the 90% of data that was previously \'dark\' to software. (McKinsey)',
      coreMessage: 'Models like Gemini and GPT are commodities; everyone has them. Our resident feedback and converasations is the gold. We don\'t just store data anymore; we refine it into intelligence.',
      glowColor: 'group-hover:shadow-amber-500/50'
    },
    {
      icon: <AlertTriangle size={40} />,
      iconColor: 'text-red-500',
      title: 'Adapt or\nBe Eaten',
      highlightStat: 'By 2028, 1/3 of all apps will have NO user interface (Gartner).',
      coreMessage: 'If our value is "users logging in", we are obsolete. We must build the engine that Agents use, not just the screens Humans visit.',
      glowColor: 'group-hover:shadow-red-500/50'
    }
  ];

  // Scroll to current mandate card
  useEffect(() => {
    if (showSurvivalPage && currentMandateIndex >= 0 && currentMandateIndex <= 2) {
      const refs = [mandate0Ref, mandate1Ref, mandate2Ref];
      refs[currentMandateIndex].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentMandateIndex, showSurvivalPage]);

  // Render "Adapt and Survive" page
  if (showSurvivalPage) {
    const mandates = [
      {
        icon: UserCheck,
        headline: 'CONTEXT IS YOUR\nNEW SYNTAX.',
        title: 'The Context Mandate',
        message: "To be a good prompt engineer, you must deeply understand what you are building. What is the user trying to do? If you can't articulate the 'Why' and the 'Who', you cannot guide the AI to the 'How'. Product mastery is now an engineering requirement.",
        color: 'text-cyan-400',
        borderColor: 'border-cyan-500/30',
        glowColor: 'shadow-cyan-500/50'
      },
      {
        icon: Terminal,
        headline: 'FIX THE PROMPT,\nNOT THE CODE.',
        title: 'The Driver Mandate',
        message: "Stop typing syntax. Start driving logic. If the AI generates a bug, do not manually patch it. That is failure. Refine your instructions and regenerate. You are the Pilot; the AI is the Engine. Do not get out and push the car.",
        color: 'text-orange-400',
        borderColor: 'border-orange-500/30',
        glowColor: 'shadow-orange-500/50'
      },
      {
        icon: AlertTriangle,
        headline: '50% FASTER in 6m\nOR EXIT.',
        title: 'The Survival Standard',
        message: "This is the standard for retention at Opiniion. If utilizing AI does not make you 50% faster in the next 6 months, you will not have a future here. We are building a velocity-first culture, and we cannot afford manual drag.",
        color: 'text-red-500',
        borderColor: 'border-red-500/50',
        glowColor: 'shadow-red-500/70'
      }
    ];

    return (
      <div className="min-h-screen h-screen w-full bg-black text-white overflow-y-auto relative">
        {/* Command Center Background - Red/Orange Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(255, 69, 0, .4) 25%, rgba(255, 69, 0, .4) 26%, transparent 27%, transparent 74%, rgba(255, 69, 0, .4) 75%, rgba(255, 69, 0, .4) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(255, 69, 0, .4) 25%, rgba(255, 69, 0, .4) 26%, transparent 27%, transparent 74%, rgba(255, 69, 0, .4) 75%, rgba(255, 69, 0, .4) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Pulsing Alert Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-orange-900/10 animate-pulse pointer-events-none" />

        {/* Back Button - Top Left */}
        <button
          onClick={() => {
            setShowSurvivalPage(false);
            setCurrentMandateIndex(-1);
          }}
          className="absolute top-8 left-8 z-50 text-lg font-bold text-white bg-transparent border-0 hover:text-red-400 transition-all duration-300 flex items-center gap-2 p-0 m-0"
          style={{ background: 'transparent', backgroundColor: 'transparent' }}
        >
          <ChevronUp size={20} className="rotate-[-90deg]" />
          Back
        </button>

        <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
          {/* Urgent Header */}
          <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
            <div className="text-red-500 text-xl font-mono mb-4 tracking-widest animate-pulse uppercase">
              ⚠ CRITICAL DIRECTIVE ⚠
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.5)] uppercase">
              ADAPT AND SURVIVE
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 uppercase">
              IN THE NEW WORLD
            </h2>
          </div>

          {/* The 3 Mandates */}
          <div className="space-y-8 mb-16">
            {mandates.map((mandate, index) => {
              const Icon = mandate.icon;
              const isVisible = index <= currentMandateIndex;
              const refs = [mandate0Ref, mandate1Ref, mandate2Ref];
              
              return (
                <div
                  key={index}
                  ref={refs[index]}
                  className={`transition-all duration-700 transform ${
                    isVisible 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-10 pointer-events-none'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 0.2}s` : '0s'
                  }}
                >
                  <div className={`group relative bg-gradient-to-br from-slate-900 to-black border-2 ${mandate.borderColor} rounded-2xl p-8 hover:scale-[1.02] transition-all duration-500 hover:${mandate.glowColor} hover:shadow-2xl`}>
                    {/* Warning Stripe */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-t-2xl" />

                    <div className="flex items-start gap-6">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-16 h-16 ${index === 2 ? 'text-red-500 animate-pulse' : mandate.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                        <Icon size={64} strokeWidth={2.5} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Headline - Large and Urgent */}
                        <h3 className={`text-4xl md:text-5xl font-black ${mandate.color} mb-3 tracking-wide leading-tight uppercase whitespace-pre-line drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]`}>
                          {mandate.headline}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm font-mono uppercase text-slate-500 mb-4 tracking-widest">
                          Mandate {index + 1}: {mandate.title}
                        </p>

                        {/* Message */}
                        <p className="text-lg leading-relaxed text-slate-200 font-medium">
                          {mandate.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Acknowledge Button - Only show after all mandates are visible */}
          {currentMandateIndex >= 2 && (
            <div className="text-center animate-[fadeIn_1s_ease-out]">
              <button
                onClick={() => {
                  setShowSurvivalPage(false);
                  setShowPersonalImpact(false);
                  setShowFinalSection(false);
                  setCurrentCardIndex(-1);
                  setCurrentBenefitIndex(-1);
                  setCurrentMandateIndex(-1);
                  onBack();
                }}
                className="group relative px-12 py-6 text-2xl font-black tracking-wider text-white bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-xl shadow-2xl hover:shadow-red-500/70 transition-all duration-500 hover:scale-105 overflow-hidden border-2 border-red-500 uppercase animate-pulse"
              >
                <span className="relative z-10 flex items-center gap-3">
                  ACKNOWLEDGE & INITIALIZE
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render "What This Means For You" view (with Engineer Benefits)
  if (showPersonalImpact) {
    const benefits = [
      {
        icon: Smile,
        title: 'Code Less,\nSolve More',
        stat: '95% of devs report higher job satisfaction using AI (GitHub).',
        message: "AI eats the chores—boilerplate, testing, regex. You get to focus on the hard, fun architectural puzzles. We want you in 'Flow State', not 'Syntax Hell'.",
        color: 'from-green-400 to-emerald-600',
        glowColor: 'shadow-green-500/50'
      },
      {
        icon: Award,
        title: 'Your Market Value\nJust Spiked',
        stat: 'AI-skilled engineers are in high demand.',
        message: "We aren't automating you out; we are upskilling you. Mastering these agents makes you the most valuable type of engineer in the 2025 market.",
        color: 'from-amber-400 to-orange-600',
        glowColor: 'shadow-amber-500/50'
      },
      {
        icon: FastIcon,
        title: 'Build at the\nSpeed of Thought',
        stat: 'On average devs are shiping 50% faster with AI.',
        message: "No more getting blocked by documentation or unknown libraries. AI handles the 'how' so you can focus on the 'what'. You become a 10x architect.",
        color: 'from-cyan-400 to-blue-600',
        glowColor: 'shadow-cyan-500/50'
      }
    ];

    return (
      <div className="min-h-screen w-full bg-black text-white overflow-auto relative">
        {/* Retro Grid Background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(0, 255, 100, .3) 25%, rgba(0, 255, 100, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 100, .3) 75%, rgba(0, 255, 100, .3) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(0, 255, 100, .3) 25%, rgba(0, 255, 100, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 100, .3) 75%, rgba(0, 255, 100, .3) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Back Button - Top Left */}
        <button
          onClick={() => setShowPersonalImpact(false)}
          className="absolute top-8 left-8 z-50 text-lg font-bold text-white bg-transparent border-0 hover:text-slate-300 transition-all duration-300 flex items-center gap-2 p-0 m-0"
          style={{ background: 'transparent', backgroundColor: 'transparent' }}
        >
          <ChevronUp size={20} className="rotate-[-90deg]" />
          Back
        </button>

        {/* Navigation Buttons */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
          <button 
            onClick={handlePrev}
            className="p-0 m-0 text-white bg-transparent border-0 hover:text-green-400 hover:scale-110 transition-all group disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'transparent', backgroundColor: 'transparent' }}
            disabled={currentBenefitIndex <= -1}
            aria-label="Previous"
          >
            <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
          </button>

          <button 
            onClick={handleNext}
            className="p-0 m-0 text-white bg-transparent border-0 hover:text-green-400 hover:scale-110 transition-all group disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'transparent', backgroundColor: 'transparent' }}
            disabled={currentBenefitIndex >= 2}
            aria-label="Next"
          >
            <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-16 relative z-10">
          {/* Level Up Header */}
          <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
          
            <h1 className="text-6xl md:text-8xl font-black tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 drop-shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              WHY IT MATTERS TO YOU
            </h1>
          
          
          </div>

          {/* Benefit Cards - Side by Side Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const isVisible = index <= currentBenefitIndex;
              
              return (
                <div
                  key={index}
                  className={`transition-all duration-700 transform ${
                    isVisible 
                      ? 'opacity-100 translate-y-0 scale-100' 
                      : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${index * 0.15}s` : '0s'
                  }}
                >
                  <div className={`group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all duration-700 hover:scale-105 hover:border-slate-600 shadow-xl ${benefit.glowColor} h-full`}>
                    {/* Icon and Title on same line */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`flex-shrink-0 w-10 h-10 transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={40} className="text-green-400" strokeWidth={2.5} />
                      </div>
                      <h3 className="text-2xl font-bold text-white leading-tight flex-1 whitespace-pre-line">
                        {benefit.title}
                      </h3>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                      {/* Highlight Stat - Hard Data */}
                      <div className="bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 border border-cyan-500/30 rounded-lg p-4">
                        <p className="text-xs font-mono uppercase text-cyan-400 mb-2 tracking-widest">Hard Data</p>
                        <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-yellow-300 leading-snug">
                          {benefit.stat}
                        </p>
                      </div>

                      {/* Core Message - What This Means */}
                      <div className="pt-4 border-t border-slate-800">
                        <p className="text-xs font-mono uppercase text-slate-500 mb-3 tracking-widest">What This Means</p>
                        <p className="text-base leading-relaxed text-slate-200 font-medium">
                          {benefit.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Next Button - Only show after all benefits are visible */}
          {currentBenefitIndex >= 2 && (
            <div className="mt-16 text-center animate-[fadeIn_1s_ease-out]">
              <button
                onClick={() => {
                  setShowSurvivalPage(true);
                  setCurrentMandateIndex(-1); // Reset mandate cards
                }}
                className="group relative px-12 py-5 text-2xl font-black tracking-wider text-black bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 rounded-xl shadow-2xl hover:shadow-green-400/50 transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  HOW TO NOT GET LEFT BEHIND
               
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Render main cards view
  return (
    <div className="min-h-screen w-full bg-black text-white overflow-auto relative">
      {/* Back Button - Top Left */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 z-50 text-lg font-bold text-white bg-transparent border-0 hover:text-slate-300 transition-all duration-300 flex items-center gap-2 p-0 m-0"
        style={{ background: 'transparent', backgroundColor: 'transparent' }}
      >
        <ChevronUp size={20} className="rotate-[-90deg]" />
        Back
      </button>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16 animate-[fadeIn_0.8s_ease-out]">
          <h1 className="text-6xl md:text-8xl font-black tracking-wider mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400">
            WHAT THIS MEANS FOR OPINIION
          </h1>
        
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                group relative bg-slate-900 border border-slate-800 rounded-2xl p-8 
                transition-all duration-700 hover:scale-105 hover:border-slate-600
                shadow-xl ${card.glowColor}
                ${index <= currentCardIndex
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
                }
              `}
            >
              {/* Icon and Title on same line */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`${card.iconColor} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight whitespace-pre-line flex-1">
                  {card.title}
                </h3>
              </div>

              {/* Content Sections */}
              <div className="space-y-6">
                {/* Highlight Stat - Bold and Eye-catching */}
                {card.highlightStat && (
                  <div className="bg-gradient-to-r from-cyan-500/10 to-yellow-500/10 border border-cyan-500/30 rounded-lg p-4">
                    <p className="text-xs font-mono uppercase text-cyan-400 mb-2 tracking-widest">Hard Data</p>
                    <p className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-yellow-300 leading-snug">
                      {card.highlightStat}
                    </p>
                  </div>
                )}

                {/* Core Message */}
                {card.coreMessage && (
                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs font-mono uppercase text-slate-500 mb-3 tracking-widest">What This Means</p>
                    <p className="text-base leading-relaxed text-slate-200 font-medium">
                      {card.coreMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-8">
          {(currentCardIndex > -1 || showFinalSection || showPersonalImpact) && (
            <button 
              onClick={handlePrev}
              className="text-white bg-transparent border-0 hover:text-pink-400 transition-all font-mono text-xs tracking-wider uppercase"
              style={{ background: 'transparent', backgroundColor: 'transparent' }}
              aria-label="Previous Card"
            >
              ← PREVIOUS
            </button>
          )}
          
          {!showPersonalImpact && (
            <button 
              onClick={handleNext}
              className="text-white bg-transparent border-0 hover:text-purple-400 transition-all font-mono text-xs tracking-wider uppercase"
              style={{ background: 'transparent', backgroundColor: 'transparent' }}
              aria-label="Next Card"
            >
              NEXT →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  // State for the active step (0 to eras.length - 1)
  const [activeEraIndex, setActiveEraIndex] = useState(0);
  
  // State for the smooth animation of the graph line (0.0 to 1.0)
  const [visualProgress, setVisualProgress] = useState(0);
  
  // State for view switching between timeline and impact page
  const [currentView, setCurrentView] = useState('timeline');
  
  // Removed showLinear toggle/button; keeping layout simpler

  // Ref for the scroll container (kept for potential future features or accessibility focus)
  const containerRef = useRef(null);

  // The eras of human progress
  const eras = [
    {
      id: 'ancient',
      year: '10,000 BC - 1700 AD',
      title: 'The Long Flatline',
      subtitle: 'Tools, Agriculture, Writing',
      description: 'For millennia, progress was linear and generational. A person born in 1500 lived a life almost identical to their grandfather.',
      icon: <Activity size={24} />,
      color: 'text-stone-400',
      bgGlow: 'shadow-stone-500/20',
      yPos: 95,
      // Rural/Ancient landscape
      image: 'https://asegyppurdgqudiaogim.supabase.co/storage/v1/object/public/content-creator/Gemini_Generated_Image_1q4ba21q4ba21q4b.png' 
    },
    {
      id: 'industrial',
      year: '1760 - 1950',
      title: 'The Mechanical Awakening',
      subtitle: 'Steam, Electricity, Flight',
      description: 'The curve begins to bend. Machines replace muscle. The world shrinks, and productivity doubles for the first time in centuries.',
      icon: <Zap size={24} />,
      color: 'text-amber-400',
      bgGlow: 'shadow-amber-500/20',
      yPos: 85,
      // Steam/Industrial engine
      image: 'https://asegyppurdgqudiaogim.supabase.co/storage/v1/object/public/content-creator/Gemini_Generated_Image_3livup3livup3liv.png'
    },
    {
      id: 'computing',
      year: '1970 - 2020',
      title: 'The Silicon Slope',
      subtitle: 'Moore\'s Law, Internet, Mobile',
      description: 'The era we grew up in. Computing power doubles every 2 years. Fast, predictable, and manageable growth. We thought this was fast.',
      icon: <Cpu size={24} />,
      color: 'text-blue-400',
      bgGlow: 'shadow-blue-500/20',
      yPos: 60,
      // Server racks/Blue light
      image: 'https://asegyppurdgqudiaogim.supabase.co/storage/v1/object/public/content-creator/Gemini_Generated_Image_dbg7rtdbg7rtdbg7.png'
    },
    {
      id: 'ai_ignition',
      year: '2022 - 2024',
      title: 'The Ignition Point',
      subtitle: 'The "Vertical Wall" Begins',
      description: 'In late 2022, the curve broke. Adoption speeds that used to take decades happened in weeks.',
      icon: <Brain size={24} />,
      color: 'text-purple-400',
      bgGlow: 'shadow-purple-500/50',
      yPos: 30,
      // Abstract Network/AI
      image: 'https://asegyppurdgqudiaogim.supabase.co/storage/v1/object/public/content-creator/Gemini_Generated_Image_vrhvjbvrhvjbvrhv.png',
      milestones: [
        { date: 'Nov 30, 2022', event: 'ChatGPT Released', icon: <FastIcon size={14} /> },
        { date: 'Jan 2023', event: '100 Million Users (in 3 months, it took 7 year for the internet to get 100m)', icon: <Users size={14} />, highlight: true },
        { date: 'Mar 2023', event: 'GPT-4 (Reasoning Capabilities)', icon: <Brain size={14} /> },
        { date: 'Feb 2024', event: 'Gemini 1.5 (1M+ Context Window)', icon: <Cpu size={14} /> },
      ]
    },
    {
      id: 'future',
      year: 'Nov 2025 & Beyond',
      title: 'Straight up: The AI Wall',
      subtitle: 'The Agentic Era',
      description: 'We are here.  We have moved from "Chatbots" to "Agents" that can reason, plan, and execute. The rate of change is now compounding WEEKLY.',
      icon: <Rocket size={24} />,
      color: 'text-pink-500',
      bgGlow: 'shadow-pink-500/50',
      yPos: 5,
      // Space/Future Ascent
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop',
      milestones: [
        { date: 'Nov 2025', event: 'Gemini 3 and Chat GPT 5.1 Released (Deep Reasoning)', icon: <Rocket size={14} />, highlight: true },
        { date: '2026+', event: 'Autonomous Science & Engineering', icon: <Activity size={14} /> },
      ]
    }
  ];

  // Animation Loop for the Graph Line
  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      // Calculate target progress based on active Era
      // We map the steps: 0 -> 0.1, 1 -> 0.3, etc. to ensure we see the line draw
      // Era 0: 0.0
      // Era 4: 1.0
      const targetProgress = activeEraIndex / (eras.length - 1);
      
      setVisualProgress(prev => {
        const diff = targetProgress - prev;
        // If close enough, snap to target
        if (Math.abs(diff) < 0.001) return targetProgress;
        // Lerp for smooth ease-out effect
        return prev + diff * 0.05;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeEraIndex, eras.length]);

  const handleNext = () => {
    if (activeEraIndex < eras.length - 1) {
      setActiveEraIndex(prev => prev + 1);
    } else if (activeEraIndex === eras.length - 1) {
      setCurrentView('impact');
    }
  };

  const handlePrev = () => {
    if (activeEraIndex > 0) {
      setActiveEraIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeEraIndex < eras.length - 1) {
          setActiveEraIndex(prev => prev + 1);
        } else if (activeEraIndex === eras.length - 1) {
          setCurrentView('impact');
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeEraIndex > 0) {
          setActiveEraIndex(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeEraIndex, eras.length]);

  // Calculate dynamic point on the curve based on visualProgress
  const getPathPoint = (progress) => {
    const x = progress * 100;
    
    // Mathematical approximation of the "Hockey Stick" curve
    let y = 95; 
    
    if (progress < 0.5) {
        // Flat period
        y = 95 - (progress * 5); 
    } else if (progress < 0.65) {
        // Industrial/Computing Slope
        const localP = (progress - 0.5) / 0.15; // 0 to 1
        y = 92.5 - (localP * 20);
    } else {
        // The Vertical Wall - Nearly straight up
        const localP = (progress - 0.65) / 0.35; // 0 to 1
        // Very steep linear ascent
        y = 72.5 - (localP * 70);
    }
    
    return { x, y: Math.max(y, 2) }; // Clamp to prevent going off screen
  };

  const currentPoint = getPathPoint(visualProgress);

  // Render impact page if view is switched
  if (currentView === 'impact') {
    return <ImpactView onBack={() => setCurrentView('timeline')} />;
  }

  // Render timeline view
  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      
      {/* LEFT PANEL: The Visualization */}
      <div className="w-1/2 h-full relative border-r border-slate-800 hidden md:block overflow-hidden">
        
        {/* DYNAMIC IMAGE BACKGROUND LAYER */}
        {eras.map((era, index) => (
            <div 
                key={`bg-${era.id}`}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeEraIndex ? 'opacity-100' : 'opacity-0'}`}
            >
                {era.image ? (
                    <>
                        {/* Image */}
                        <img 
                            src={era.image} 
                            alt={era.title}
                            className="w-full h-full object-cover opacity-80 scale-105"
                        />
                        {/* Gradient Overlay to ensure graph readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/50 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-slate-950/30"></div>
                    </>
                ) : (
                    <div className="w-full h-full bg-slate-900/50"></div>
                )}
            </div>
        ))}

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-10"></div>
        
        {/* Header Overlay */}
        <div className="absolute top-8 left-8 z-20">
          <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-md">
            THE TECHNOLOGY
          </h1>
                    <h1 className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-md">
WALL</h1>
          <p className="text-slate-400 text-sm mt-1 font-mono">
            HUMAN PROGRESS vs. TIME
          </p>
        </div>

        {/* Legend / Toggle */}
      <div className="absolute top-8 right-8 z-20 flex flex-col items-end">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
          <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
          AI Reality
        </div>
      </div>

        {/* The Graph */}
        <svg className="absolute inset-0 w-full h-full p-12 overflow-visible z-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Removed linear expectation toggle & line */}

          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78716c" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="85%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* The Path */}
          <path 
            d="M 0 95 L 50 90 Q 75 88 85 60 T 100 0" 
            fill="none" 
            stroke="url(#lineGradient)" 
            strokeWidth="0.8"
            filter="url(#glow)"
            className="opacity-70"
          />

          {/* The "Current Time" Tracer Line */}
           <path 
            d={`M 0 95 L ${currentPoint.x} ${currentPoint.y}`}
            fill="none" 
            stroke="white" 
            strokeWidth="0" 
          />

          {/* The "You Are Here" Marker */}
          <g transform={`translate(${currentPoint.x}, ${currentPoint.y})`}>
            <circle r="1.5" fill="white" className="animate-pulse" />
            <circle r="6" fill="rgba(168, 85, 247, 0.4)" className="animate-ping" />
            <foreignObject x={activeEraIndex === eras.length - 1 ? "-27" : "2"} y="-4" width="25" height="8">
               <div className="text-[1.5px] text-center font-bold text-white bg-purple-600 rounded-sm shadow-lg  flex items-center justify-center h-full leading-none">
                 {eras[activeEraIndex]?.year || 'NOW'}
               </div>
            </foreignObject>
          </g>
        </svg>

        {/* Background "Speed Lines" effect */}
        <div className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-1000 ${visualProgress > 0.8 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        </div>

      </div>

      {/* RIGHT PANEL: The Content */}
      <div 
        ref={containerRef} 
        className="w-full md:w-1/2 h-full relative z-20 bg-slate-950/50 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent overflow-hidden"
      >
        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex gap-8">
           {activeEraIndex > 0 && (
               <button 
                  onClick={handlePrev}
                  className="text-white bg-transparent border-0 hover:text-pink-400 transition-all font-mono text-xs tracking-wider uppercase"
                  style={{ background: 'transparent', backgroundColor: 'transparent' }}
                  aria-label="Previous Era"
               >
                  ← PREVIOUS
               </button>
           )}
           
           <button 
              onClick={handleNext}
              className="text-white bg-transparent border-0 hover:text-purple-400 transition-all font-mono text-xs tracking-wider uppercase"
              style={{ background: 'transparent', backgroundColor: 'transparent' }}
              aria-label="Next"
           >
              NEXT →
           </button>
        </div>

        {/* Sliding Content Container */}
        <div 
            className="w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.45,0,0.55,1)]"
            style={{ transform: `translateY(-${activeEraIndex * 100}%)` }}
        >
            {eras.map((era, index) => {
            const isActive = index === activeEraIndex;
            
            return (
                <div 
                key={era.id} 
                className="h-full w-full flex items-center justify-center p-8 md:p-16 relative border-b border-slate-900/50"
                >
                <div 
                    className={`
                    max-w-md transition-all duration-1000 transform delay-300
                    ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 blur-[2px]'}
                    `}
                >
                    <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl bg-slate-900 border border-slate-800 ${isActive ? era.color : 'text-slate-600'} ${isActive ? era.bgGlow : ''} shadow-lg transition-all duration-500`}>
                        {era.icon}
                    </div>
                    <span className={`text-sm font-mono tracking-widest uppercase ${isActive ? 'text-slate-200' : 'text-slate-600'}`}>
                        {era.year}
                    </span>
                    </div>
                    
                    <h2 className={`text-3xl md:text-5xl font-bold mb-4 leading-tight ${isActive ? 'text-white' : 'text-slate-700'}`}>
                    {era.title}
                    </h2>
                    
                    <h3 className={`text-xl mb-6 font-light ${isActive ? era.color : 'text-slate-700'}`}>
                    {era.subtitle}
                    </h3>
                    
                    <p className={`text-lg leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-800'}`}>
                    {era.description}
                    </p>

                    {/* MILESTONES SECTION */}
                    {era.milestones && (
                    <div className={`mt-8 space-y-3 transition-opacity duration-1000 delay-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        <h4 className="text-xs font-mono uppercase text-slate-500 tracking-widest mb-4 border-b border-slate-800 pb-2">Velocity Check</h4>
                        {era.milestones.map((ms, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${ms.highlight ? 'bg-purple-900/20 border-purple-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
                            <div className={`${ms.highlight ? 'text-purple-400' : 'text-slate-500'}`}>
                                {ms.icon}
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xs font-bold ${ms.highlight ? 'text-purple-300' : 'text-slate-400'}`}>{ms.date}</span>
                                <span className={`text-sm ${ms.highlight ? 'text-white' : 'text-slate-300'}`}>{ms.event}</span>
                            </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
