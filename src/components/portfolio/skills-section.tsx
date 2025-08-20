'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code2, 
  Database, 
  Server, 
  Smartphone, 
  Cloud, 
  GitBranch,
  Palette,
  Settings
} from 'lucide-react';

export function SkillsSection() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Material-UI', 'Styled Components', 'Redux', 'Context API', 'React Hooks', 'JSX', 'Webpack', 'Vite']
    },
    {
      title: 'Backend Development',
      icon: Server,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      skills: ['Node.js', 'Express.js', 'RESTful APIs', 'GraphQL', 'JWT Authentication', 'Middleware', 'API Design', 'Server Architecture', 'Microservices', 'WebSockets', 'Socket.io', 'Passport.js']
    },
    {
      title: 'Database & Storage',
      icon: Database,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'Firebase', 'Mongoose ODM', 'Prisma', 'Database Design', 'Query Optimization', 'Data Modeling', 'Aggregation', 'Indexing']
    },
    {
      title: 'Python & AI/ML',
      icon: Smartphone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'Data Analysis', 'AI Integration', 'Natural Language Processing', 'Computer Vision', 'Deep Learning']
    },
    {
      title: 'Cloud & DevOps',
      icon: Cloud,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      skills: ['AWS', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Jenkins', 'GitHub Actions', 'Vercel', 'Netlify', 'Heroku', 'Digital Ocean', 'Load Balancing']
    },
    {
      title: 'Version Control & Tools',
      icon: GitBranch,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      skills: ['Git', 'GitHub', 'GitLab', 'Bitbucket', 'Version Control Workflows', 'Code Review', 'Branch Management', 'Merge Strategies', 'Git Flow', 'Pull Requests', 'Issue Tracking']
    },
    {
      title: 'Development Practices',
      icon: Palette,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      skills: ['Agile/Scrum', 'Test-Driven Development', 'Unit Testing', 'Integration Testing', 'Code Quality', 'ESLint', 'Prettier', 'Jest', 'Cypress', 'Quality Assurance', 'Code Reviews', 'Documentation']
    },
    {
      title: 'Project Management',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      skills: ['Project Planning', 'Cross-functional Collaboration', 'Team Leadership', 'Client Communication', 'Requirements Analysis', 'Technical Documentation', 'Problem Solving', 'Mentoring', 'Code Architecture', 'Performance Optimization']
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title} 
                className="group perspective-1000 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative w-full h-80 transform-style-preserve-3d transition-transform duration-700 group-hover:rotate-y-180">
                  {/* Front Side */}
                  <Card className="absolute inset-0 backface-hidden hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`w-8 h-8 ${category.color}`} />
                      </div>
                      <CardTitle className="text-lg text-white">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pb-0">
                      <p className="text-gray-400 text-sm">Click to explore skills</p>
                    </CardContent>
                  </Card>
                  
                  {/* Back Side */}
                  <Card className="absolute inset-0 backface-hidden rotate-y-180 hover:shadow-lg transition-shadow bg-gray-800 border-gray-700">
                    <CardHeader className="text-center pb-2">
                      <CardTitle className="text-sm font-semibold text-white">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 max-h-60 overflow-y-auto">
                        {category.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs hover:bg-gray-600 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}