'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Dumbbell, ShoppingCart, MessageCircle, Calendar } from 'lucide-react';

export function ProjectsSection() {
  const projects = [
    {
      title: 'Gym Management SaaS',
      description: 'A comprehensive gym management platform with member tracking, payment processing, and analytics dashboard.',
      icon: Dumbbell,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      features: ['Member Management', 'Payment Integration', 'Analytics Dashboard', 'Multi-gym Support'],
      github: '#',
      live: '/admin/login'
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce solution with shopping cart, payment gateway, and admin panel.',
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      technologies: ['Next.js', 'Express.js', 'PostgreSQL', 'Stripe API', 'Redux'],
      features: ['Product Catalog', 'Shopping Cart', 'Payment Processing', 'Order Management'],
      github: '#',
      live: '#'
    },
    {
      title: 'Real-time Chat App',
      description: 'Modern chat application with real-time messaging, file sharing, and group conversations.',
      icon: MessageCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Material-UI'],
      features: ['Real-time Messaging', 'File Sharing', 'Group Chats', 'User Authentication'],
      github: '#',
      live: '#'
    },
    {
      title: 'Event Management System',
      description: 'Complete event management solution with booking, scheduling, and attendee management.',
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      technologies: ['React', 'Express.js', 'MySQL', 'JWT', 'Bootstrap'],
      features: ['Event Creation', 'Booking System', 'Calendar Integration', 'Attendee Management'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card 
                key={project.title} 
                className={`hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${project.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${project.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">{project.description}</p>
                  
                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}