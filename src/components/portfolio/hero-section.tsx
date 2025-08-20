'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Code, Database, Server, GitBranch, Settings, Cloud, Zap, Cpu, Brain, Bot } from 'lucide-react';

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = useMemo(() => ['MERN Stack Developer', 'Full Stack Engineer', 'React Specialist', 'Node.js Expert', 'AI Enthusiast'], []);

  useEffect(() => {
    const currentWord = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
        if (displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/video/hero-background.mp4" type="video/mp4" />
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid xl:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up xl:col-span-1 col-span-full">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Ashish Shende</span>
              </h1>
              <div className="text-xl sm:text-2xl lg:text-3xl text-white h-8 sm:h-10 lg:h-12 flex items-center">
                <span>
                  {displayText}
                </span>
                <span className="animate-blink ml-1">|</span>
              </div>
              <p className="text-base sm:text-lg text-gray-200 max-w-2xl">
                Senior Full Stack Developer & AI Enthusiast with 12+ years of experience in building scalable web applications. 
                Expert in React, Node.js, TypeScript, Python, and modern development practices including microservices and CI/CD.
              </p>
            </div>

            {/* Tech Stack Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 text-green-400">
                <Code className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">React/Next.js</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">Node.js</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Database className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">TypeScript</span>
              </div>
              <div className="flex items-center space-x-2 text-red-400">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">Python</span>
              </div>
              <div className="flex items-center space-x-2 text-orange-400">
                <GitBranch className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">Git/CI-CD</span>
              </div>
              <div className="flex items-center space-x-2 text-cyan-400">
                <Cloud className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">Docker/K8s</span>
              </div>
              <div className="flex items-center space-x-2 text-pink-400">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">AI/ML</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-400">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-medium text-sm sm:text-base">Microservices</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download Resume
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#contact">Get In Touch</a>
              </Button>
            </div>


          </div>

          {/* Right Content - Profile Image */}
          <div className="relative animate-fade-in-right mt-8 lg:mt-0 hidden xl:block">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 mx-auto">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-pulse opacity-20"></div>
              <div className="absolute inset-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full animate-spin-slow opacity-30"></div>
              
              {/* Profile Image */}
              <div className="absolute inset-4 rounded-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/assets/img/avatar.jpg" 
                  alt="Ashish Shende" 
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-lg flex items-center justify-center animate-bounce" style={{animationDelay: '0.3s'}}>
                <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-lg flex items-center justify-center animate-bounce" style={{animationDelay: '1.2s'}}>
                <Database className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute top-1/2 -right-4 sm:-right-8 w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '0.7s'}}>
                <Server className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -top-4 sm:-top-8 left-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-orange-500 rounded-full flex items-center justify-center animate-bounce" style={{animationDelay: '1.8s'}}>
                <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div className="absolute -bottom-4 sm:-bottom-8 right-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-lg flex items-center justify-center animate-bounce" style={{animationDelay: '0.9s'}}>
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}