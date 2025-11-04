import { useState, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { loadStudentData, searchStudent } from '../utils/dataLoader';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await loadStudentData();
      setStudentData(data);
    };
    loadData();
  }, []);
  
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const student = searchStudent(studentData, searchTerm);
    setSelectedStudent(student || null);
    if (!student) {
      alert('Student not found. Please try another ID or name.');
    }
  };
  
  const getTrendIcon = (trend) => {
    if (trend === 'Increasing') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'Decreasing') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-yellow-600" />;
  };
  
  const getAlertBadge = (level) => {
    const variants = {
      Green: 'bg-green-100 text-green-800 border-green-200',
      Yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Red: 'bg-red-100 text-red-800 border-red-200'
    };
    return (
      <Badge className={`${variants[level]} border`}>
        {level} Alert
      </Badge>
    );
  };
  
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Student Profile Search</h1>
          <p className="text-muted-foreground">Search by Student ID or Name to view detailed engagement metrics</p>
        </div>
        
        {/* Search Section */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter Student ID (e.g., S001) or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="h-12 text-base"
              />
            </div>
            <Button onClick={handleSearch} size="lg" className="px-8">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </Card>
        
        {/* Student Profile Result */}
        {selectedStudent && (
          <div className="space-y-6">
            {/* Profile Header */}
            <Card className="p-8 shadow-elevated">
              <div className="flex items-start gap-6">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=200"
                  alt={selectedStudent.Name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-foreground mb-2">{selectedStudent.Name}</h2>
                      <p className="text-muted-foreground text-lg">ID: {selectedStudent.Student_ID}</p>
                    </div>
                    {getAlertBadge(selectedStudent.Alert_Level)}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Department</p>
                      <p className="font-semibold text-foreground">{selectedStudent.Department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">GPA</p>
                      <p className="font-semibold text-foreground">{selectedStudent.GPA}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Academic Year</p>
                      <p className="font-semibold text-foreground">{selectedStudent.Academic_Year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Scholarship</p>
                      <p className="font-semibold text-foreground">{selectedStudent.Scholarship_Status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity Score Progress */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold text-foreground mb-4">Total Activity Score</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-primary">{selectedStudent.Total_Activity_Score}</span>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(selectedStudent.Trend)}
                      <span className="text-sm text-muted-foreground">{selectedStudent.Trend}</span>
                    </div>
                  </div>
                  <Progress value={(selectedStudent.Total_Activity_Score / 30) * 100} className="h-3" />
                  <p className="text-sm text-muted-foreground">Out of 30 possible points</p>
                </div>
              </Card>
              
              {/* Events vs Counseling */}
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold text-foreground mb-4">Events vs Counseling</h3>
                <div className="h-64">
                  <Doughnut
                    data={{
                      labels: ['Events Attended', 'Counseling Sessions'],
                      datasets: [{
                        data: [selectedStudent.Events_Attended, selectedStudent.Counseling_Sessions],
                        backgroundColor: ['hsl(211 81% 48%)', 'hsl(142 71% 45%)'],
                        borderWidth: 2,
                        borderColor: '#fff'
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: { size: 12, family: 'Inter' }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </Card>
            </div>
            
            {/* LMS Activity */}
            <Card className="p-6 shadow-card">
              <h3 className="text-xl font-bold text-foreground mb-4">LMS Logins Per Week</h3>
              <div className="h-64">
                <Bar
                  data={{
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    datasets: [{
                      label: 'LMS Logins',
                      data: [
                        Math.round(selectedStudent.LMS_Logins_Week * 0.8),
                        Math.round(selectedStudent.LMS_Logins_Week * 0.9),
                        selectedStudent.LMS_Logins_Week,
                        Math.round(selectedStudent.LMS_Logins_Week * 1.1)
                      ],
                      backgroundColor: 'hsl(271 81% 56% / 0.8)',
                      borderColor: 'hsl(271 81% 56%)',
                      borderWidth: 2,
                      borderRadius: 8
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      y: { beginAtZero: true }
                    }
                  }}
                />
              </div>
            </Card>
            
            {/* Advisor Feedback */}
            {selectedStudent.Advisor_Comments && (
              <Card className="p-6 shadow-card">
                <h3 className="text-xl font-bold text-foreground mb-4">Advisor Feedback</h3>
                <div className="bg-secondary/50 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-foreground leading-relaxed">{selectedStudent.Advisor_Comments}</p>
                </div>
              </Card>
            )}
          </div>
        )}
        
        {!selectedStudent && (
          <div className="text-center py-20">
            <Search className="w-20 h-20 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-xl text-muted-foreground">Enter a student ID or name to view their profile</p>
          </div>
        )}
      </div>
    </div>
  );
};
