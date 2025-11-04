import { useEffect, useState } from 'react';
import { AlertTriangle, Filter } from 'lucide-react';
import { loadStudentData, getLowEngagementStudents } from '../utils/dataLoader';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export const LowEngagement = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('all');
  
  useEffect(() => {
    const loadData = async () => {
      const data = await loadStudentData();
      const lowEngagement = getLowEngagementStudents(data);
      setStudents(lowEngagement);
      setFilteredStudents(lowEngagement);
      
      const uniqueDepts = [...new Set(data.map(s => s.Department))];
      setDepartments(uniqueDepts);
    };
    loadData();
  }, []);
  
  useEffect(() => {
    if (selectedDept === 'all') {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter(s => s.Department === selectedDept));
    }
  }, [selectedDept, students]);
  
  const getAlertColor = (level) => {
    const colors = {
      Red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      Yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      Green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    };
    return colors[level] || colors.Red;
  };
  
  const getTrendColor = (trend) => {
    if (trend === 'Decreasing') return 'text-red-600';
    if (trend === 'Increasing') return 'text-green-600';
    return 'text-yellow-600';
  };
  
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Low Engagement Summary</h1>
              <p className="text-muted-foreground">Students requiring immediate attention and support</p>
            </div>
          </div>
        </div>
        
        {/* Background Image */}
        <div className="mb-8 rounded-xl overflow-hidden h-48 relative">
          <img
            src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b"
            alt="Analytics dashboard"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20" />
        </div>
        
        {/* Filter */}
        <Card className="p-6 mb-8 shadow-card">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium text-foreground">Filter by Department:</span>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Badge variant="outline" className="ml-auto">
              {filteredStudents.length} students
            </Badge>
          </div>
        </Card>
        
        {/* Table */}
        <Card className="shadow-elevated overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Student ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Department</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Activity Score</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Alert Level</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStudents.map((student, idx) => (
                  <tr key={student.Student_ID} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {student.Student_ID}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://images.unsplash.com/photo-${1544717305000 + idx}?w=50`}
                          alt={student.Name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-border"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=50';
                          }}
                        />
                        <span className="font-medium text-foreground">{student.Name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{student.Department}</td>
                    <td className="px-6 py-4 text-center">
                      <Badge variant="outline" className="font-bold">
                        {student.Total_Activity_Score}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Badge className={getAlertColor(student.Alert_Level)}>
                        {student.Alert_Level}
                      </Badge>
                    </td>
                    <td className={`px-6 py-4 text-center text-sm font-medium ${getTrendColor(student.Trend)}`}>
                      {student.Trend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No students found with low engagement in this department.</p>
          </div>
        )}
      </div>
    </div>
  );
};
