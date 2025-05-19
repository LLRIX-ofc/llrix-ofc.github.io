import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { GameData, GameSection } from '../types';

interface GameProps {
  onBack: () => void;
}

export function Game({ onBack }: GameProps) {
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string>('Section1');
  const [currentText, setCurrentText] = useState<string>('');
  const [command, setCommand] = useState<string>('');
  const [happening, setHappening] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [bpm, setBpm] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/LLRIX-ofc/GAME/refs/heads/main/gameText.json')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch game data');
        }
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data) || !data[0]?.Sections) {
          throw new Error('Invalid game data format');
        }
        setGameData(data[0]);
      })
      .catch(err => {
        console.error('Error loading game:', err);
        setError(err.message);
      });

    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!gameData?.Sections) return;

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const section = gameData.Sections[currentSection];
    if (!section) {
      console.log('Game completed or section not found');
      return;
    }

    // Determine if the background is a video
    setIsVideo(section.image?.match(/\.(mp4|webm|ogg)$/i) !== null);

    // Handle section number skipping
    const sectionNumber = parseInt(currentSection.replace(/[^\d]/g, ''));
    const expectedNumber = 1;
    const skipDelay = Math.max(0, (sectionNumber - expectedNumber) * 10000);

    // Immediately update content
    if (section.Type) {
      handleActionSection(section);
    } else {
      setCurrentText(section.Text1);
      setCommand(section.Text1_Command || '');
      setHappening(section.Text1_Happening || '');
    }

    // Brief transition effect
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 300);

    // Schedule next section
    const duration = section.Duration ? section.Duration * 1000 : 10000;
    const totalDelay = skipDelay + duration;

    timerRef.current = setTimeout(() => {
      const nextSectionNumber = sectionNumber + 1;
      const nextSectionKey = `Section${nextSectionNumber}`;
      
      if (gameData.Sections[nextSectionKey]) {
        setCurrentSection(nextSectionKey);
      }
    }, totalDelay);

  }, [currentSection, gameData]);

  const handleActionSection = (section: GameSection) => {
    if (!section.Type) return;

    setCurrentText(section.Text?.Text1 || '');
    setCommand(section.Type);
    setHappening(section.Text?.Text1_Happening || '');

    // Handle metronome
    let startBpm = 0;
    let maxBpm = 0;

    switch (section.Type) {
      case 'Jerky':
        startBpm = 30;
        maxBpm = 120;
        break;
      case 'Ana':
        startBpm = 15;
        maxBpm = 120;
        break;
      case 'Oreo':
        startBpm = 30;
        maxBpm = 120;
        break;
      case 'Span':
        startBpm = 30;
        maxBpm = 180;
        break;
      case 'End':
        if (section.Version === 'Org') {
          startBpm = 90;
          maxBpm = 240;
        } else if (section.Version === 'Ruin') {
          startBpm = 120;
          maxBpm = 240;
        }
        break;
      case 'After':
        if (section.Version === 'Ball') {
          startBpm = 30;
          maxBpm = 120;
        } else if (section.Version === 'Jerky') {
          startBpm = 120;
          maxBpm = 240;
        }
        break;
    }

    if (startBpm > 0) {
      setBpm(startBpm);
      const increment = (maxBpm - startBpm) / (section.Duration || 10);
      const interval = setInterval(() => {
        setBpm(prev => {
          if (prev >= maxBpm) {
            clearInterval(interval);
            return maxBpm;
          }
          return prev + increment;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    if (bpm > 0 && audioRef.current) {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
      });
      audioRef.current.playbackRate = bpm / 60;
    }
  }, [bpm]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Menu
        </button>
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!gameData?.Sections) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8">
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Back to Menu
        </button>
        <div className="text-white text-xl">Loading game...</div>
      </div>
    );
  }

  const currentBackground = gameData.Sections[currentSection]?.image;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center relative overflow-hidden">
      {/* Background media */}
      {currentBackground && (
        isVideo ? (
          <video
            key={currentBackground}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={currentBackground} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
            style={{ backgroundImage: `url(${currentBackground})` }}
          />
        )
      )}

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-white hover:text-gray-300 transition-colors z-10"
      >
        <ArrowLeft className="w-6 h-6" />
        Back to Menu
      </button>

      {/* Command text at top */}
      <div className="w-full text-center pt-16 mb-8 z-10">
        <div 
          className={`text-blue-400 text-2xl font-bold tracking-wide transform transition-all duration-300 ${
            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {command}
        </div>
      </div>

      {/* Main content centered vertically and horizontally */}
      <div className="flex-1 w-full max-w-2xl flex flex-col items-center justify-center gap-8 px-4 z-10">
        <div 
          className={`text-white text-4xl text-center font-bold leading-relaxed transform transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {currentText}
        </div>
        
        <div 
          className={`text-gray-400 text-xl text-center italic transform transition-all duration-300 ${
            isTransitioning ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          {happening}
        </div>
      </div>

      <audio ref={audioRef} src="/metronome.mp3" loop />
    </div>
  );
}