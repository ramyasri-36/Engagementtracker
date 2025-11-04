import Papa from 'papaparse';

export const loadStudentData = async () => {
  try {
    const response = await fetch('/data/combined_dataset.csv');
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          resolve(results.data);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error loading student data:', error);
    return [];
  }
};

export const getEngagementStats = (data) => {
  const engaged = data.filter(s => s.Engagement_Level === 'High').length;
  const moderate = data.filter(s => s.Engagement_Level === 'Moderate').length;
  const low = data.filter(s => s.Engagement_Level === 'Low').length;
  
  return { engaged, moderate, low };
};

export const getDepartmentEngagement = (data) => {
  const deptMap = {};
  
  data.forEach(student => {
    if (!deptMap[student.Department]) {
      deptMap[student.Department] = {
        total: 0,
        count: 0
      };
    }
    deptMap[student.Department].total += student.Total_Activity_Score || 0;
    deptMap[student.Department].count += 1;
  });
  
  return Object.keys(deptMap).map(dept => ({
    department: dept,
    average: Math.round(deptMap[dept].total / deptMap[dept].count)
  }));
};

export const getWeeklyTrend = (data) => {
  // Simulated weekly trend data
  return [
    { week: 'Week 1', score: 12 },
    { week: 'Week 2', score: 14 },
    { week: 'Week 3', score: 13 },
    { week: 'Week 4', score: 16 },
    { week: 'Week 5', score: 15 },
    { week: 'Week 6', score: 17 },
    { week: 'Week 7', score: 18 }
  ];
};

export const searchStudent = (data, searchTerm) => {
  const term = searchTerm.toLowerCase().trim();
  return data.find(student => 
    student.Student_ID?.toLowerCase() === term ||
    student.Name?.toLowerCase().includes(term)
  );
};

export const getLowEngagementStudents = (data) => {
  return data.filter(s => s.Engagement_Level === 'Low')
    .sort((a, b) => a.Total_Activity_Score - b.Total_Activity_Score);
};

export const getAdvisorComments = (data) => {
  return data
    .filter(s => s.Advisor_Comments && s.Advisor_Comments.trim())
    .slice(0, 10)
    .map(s => ({
      studentId: s.Student_ID,
      studentName: s.Name,
      comment: s.Advisor_Comments
    }));
};
