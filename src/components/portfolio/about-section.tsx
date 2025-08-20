'use client';

import { Card, CardContent } from '@/components/ui/card';
import { User, MapPin, Calendar, GraduationCap } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            I'm a dedicated MERN Stack Developer with a passion for creating innovative web solutions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Personal Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-blue-600" />
                <span className="text-gray-300">Software Consultant</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-300">India</span>
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">12+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-3">
                <GraduationCap className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">Bachelor of Engineering (IT)</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              I specialize in building full-stack web applications using the MERN stack (MongoDB, Express.js, React, Node.js) and Python. 
              As an AI enthusiast, I integrate machine learning capabilities into web applications, creating intelligent solutions 
              that combine traditional web development with cutting-edge AI technologies.
            </p>

            <p className="text-gray-300 leading-relaxed">
              My expertise spans modern JavaScript frameworks, Python development, AI/ML integration, database design, API development, and cloud deployment. 
              I'm passionate about leveraging AI to solve complex problems while maintaining clean, maintainable code and staying updated with the latest industry trends.
            </p>
          </div>

          {/* Right - Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow animate-fade-in-up bg-gray-700 border-gray-600">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-blue-400">50+</div>
                <div className="text-gray-300">Projects Completed</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow animate-fade-in-up delay-100 bg-gray-700 border-gray-600">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-green-400">12+</div>
                <div className="text-gray-300">Years Experience</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow animate-fade-in-up delay-200 bg-gray-700 border-gray-600">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-purple-400">25+</div>
                <div className="text-gray-300">Happy Clients</div>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow animate-fade-in-up delay-300 bg-gray-700 border-gray-600">
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-orange-400">15+</div>
                <div className="text-gray-300">Technologies</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}