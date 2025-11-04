import { Info, Code, Database, BarChart3 } from 'lucide-react';
import { Card } from '../components/ui/card';

export const About = () => {
  const technologies = [
    { name: 'HTML, CSS, JavaScript', icon: Code, description: 'Core web technologies for static site structure' },
    { name: 'Chart.js', icon: BarChart3, description: 'Interactive data visualization library' },
    { name: 'PapaParse', icon: Database, description: 'CSV parsing and data processing' }
  ];
  
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1760351561007-526f5353cc76',
      alt: 'Education and analytics'
      },
    {
      url: 'https://images.pexels.com/photos/8500305/pexels-photo-8500305.jpeg',
      alt: 'Teamwork and collaboration'
    },
    {
      url: 'https://images.unsplash.com/photo-1758270705317-3ef6142d306f',
      alt: 'Diverse students'
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Info className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">About Engagement Tracker</h1>
              <p className="text-muted-foreground">with Wellness Alerts</p>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <Card className="p-8 mb-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">Project Overview</h2>
          <div className="space-y-4 text-foreground leading-relaxed">
            <p>
              This prototype visualizes synthetic student engagement and wellness data for academic analysis. 
              The platform provides advisors and administrators with real-time insights into student participation, 
              academic performance, and overall well-being.
            </p>
            <p>
              By tracking multiple engagement metrics including LMS logins, event attendance, counseling sessions, 
              and academic performance, the system helps identify students who may need additional support or 
              intervention to ensure their academic success.
            </p>
            <p className="font-semibold text-primary">
              Important: No real student data is used. All data presented is synthetic and generated for 
              academic demonstration purposes only.
            </p>
          </div>
        </Card>
        
        {/* Technologies */}
        <Card className="p-8 mb-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-6">Technologies Used</h2>
          <div className="grid gap-4">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <div key={tech.name} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/50">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{tech.name}</h3>
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        
        {/* Illustrations */}
        <Card className="p-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-6">Supporting Academic Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {images.map((image, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-center">
            Empowering educators to identify and support students through data-driven insights
          </p>
        </Card>
        
        {/* Deployment Info */}
        <Card className="p-8 mt-8 shadow-card bg-primary/5">
          <h2 className="text-2xl font-bold text-foreground mb-4">Deployment Information</h2>
          <div className="space-y-2 text-foreground">
            <p><strong>Platform:</strong> Static Website (GitHub Pages compatible)</p>
            <p><strong>Data Source:</strong> combined_dataset.csv (included in /data folder)</p>
            <p><strong>Browser Support:</strong> Modern browsers (Chrome, Firefox, Safari, Edge)</p>
            <p><strong>Responsive Design:</strong> Optimized for desktop, tablet, and mobile devices</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
