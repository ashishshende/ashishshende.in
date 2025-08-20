'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Let&apos;s discuss your next project or collaboration opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-300 text-sm sm:text-base break-all">ashish.shende034@gmail.com</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Phone</h3>
            <p className="text-gray-300 text-sm sm:text-base">+91 XXXXX XXXXX</p>
          </div>
          
          <div className="text-center sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Location</h3>
            <p className="text-gray-300 text-sm sm:text-base">India</p>
          </div>
        </div>
      </div>
    </section>
  );
}