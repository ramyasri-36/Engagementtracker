import { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { loadStudentData, getEngagementStats, getDepartmentEngagement, getWeeklyTrend } from '../utils/dataLoader';
import { StatCard } from '../components/StatCard';
import { Users, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export const Dashboard = () => {
  const [stats, setStats] = useState({ engaged: 0, moderate: 0, low: 0 });
  const [departmentData, setDepartmentData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadData = async () => {
      const data = await loadStudentData();
      const engagementStats = getEngagementStats(data);
      const deptEngagement = getDepartmentEngagement(data);
      const weekly = getWeeklyTrend(data);
      
      setStats(engagementStats);
      setDepartmentData(deptEngagement);
      setWeeklyData(weekly);
      setLoading(false);
    };
    
    loadData();
  }, []);
  
  const barChartData = {
    labels: departmentData.map(d => d.department),
    datasets: [
      {
        label: 'Average Engagement Score',
        data: departmentData.map(d => d.average),
        backgroundColor: 'hsl(211 81% 48% / 0.8)',
        borderColor: 'hsl(211 81% 48%)',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };
  
  const lineChartData = {
    labels: weeklyData.map(w => w.week),
    datasets: [
      {
        label: 'Weekly Engagement Trend',
        data: weeklyData.map(w => w.score),
        borderColor: 'hsl(142 71% 45%)',
        backgroundColor: 'hsl(142 71% 45% / 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: 'hsl(142 71% 45%)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        fill: true
      }
    ]
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: 'Inter'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 14,
          family: 'Inter'
        },
        bodyFont: {
          size: 13,
          family: 'Inter'
        },
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter'
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter'
          }
        }
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Activity className="w-12 h-12 text-primary animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1758270705518-b61b40527e76"
            alt="Students collaboration"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Student Engagement Dashboard</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            Real-time insights into student engagement and wellness metrics to support academic success.
          </p>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Engaged Students"
            value={stats.engaged}
            icon={Users}
            color="success"
            trend="Excellent participation"
          />
          <StatCard
            title="Moderate Engagement"
            value={stats.moderate}
            icon={TrendingUp}
            color="warning"
            trend="Room for improvement"
          />
          <StatCard
            title="Low Engagement"
            value={stats.low}
            icon={AlertTriangle}
            color="danger"
            trend="Needs attention"
          />
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Average Engagement by Department</h2>
            <div className="h-80">
              <Bar data={barChartData} options={chartOptions} />
            </div>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-6 shadow-card">
            <h2 className="text-xl font-bold text-foreground mb-4">Weekly Engagement Trend</h2>
            <div className="h-80">
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Sample Student Photos Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-card rounded-xl border border-border p-8 shadow-card">
          <h2 className="text-2xl font-bold text-foreground mb-4">Our Diverse Student Community</h2>
          <p className="text-muted-foreground mb-6">Supporting students from all backgrounds in their academic journey</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150',
              'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
              'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?w=150',
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
              'https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=150',
              'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150'
            ].map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Student ${idx + 1}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-border shadow-md hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
