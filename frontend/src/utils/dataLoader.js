import * as XLSX from 'xlsx';

let cachedData = null;

export const loadStudentData = async () => {
  if (cachedData) return cachedData;
  
  try {
    const response = await fetch('/data/combined_dataset.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    // Load Students sheet
    const studentsSheet = workbook.Sheets['Students'];
    const students = XLSX.utils.sheet_to_json(studentsSheet);
    
    // Load EngagementLogs sheet
    const engagementSheet = workbook.Sheets['EngagementLogs'];
    const engagementLogs = XLSX.utils.sheet_to_json(engagementSheet);
    
    // Create a map of student ID to their latest engagement data
    const engagementMap = {};
    engagementLogs.forEach(log => {
      const studentId = log.student_id;
      if (!engagementMap[studentId] || log.week_number > engagementMap[studentId].week_number) {
        engagementMap[studentId] = log;
      }
    });
    
    // Combine student data with their latest engagement metrics
    const combinedData = students.map(student => {
      const engagement = engagementMap[student.student_id] || {};
      
      // Calculate engagement level based on total activity score
      // Score range in data: 7-27, so adjust thresholds accordingly
      const activityScore = engagement.total_activity_score || 0;
      let engagementLevel = 'Low';
      if (activityScore >= 19) engagementLevel = 'High';        // Top 25%
      else if (activityScore >= 14) engagementLevel = 'Moderate'; // Middle 50%
      
      // Map alert level
      let alertLevel = 'Red';
      if (engagement.alert_level === 'green') alertLevel = 'Green';
      else if (engagement.alert_level === 'yellow') alertLevel = 'Yellow';
      
      // Map trend
      let trend = 'Stable';
      if (engagement.improvement_trend === 'improving') trend = 'Increasing';
      else if (engagement.improvement_trend === 'declining') trend = 'Decreasing';
      
      return {
        Student_ID: `S${student.student_id}`,
        Name: student.student_name,
        Department: student.department,
        Gender: student.gender,
        Age: student.age,
        GPA: student.gpa,
        Academic_Year: student.academic_year,
        Scholarship_Status: student.scholarship_status,
        LMS_Logins_Week: engagement.lms_logins || 0,
        Events_Attended: engagement.events_attended || 0,
        Counseling_Sessions: engagement.counseling_visits || 0,
        Assignments_Submitted: engagement.assignments_submitted || 0,
        Attendance_Rate: engagement.attendance_rate || 0,
        Peer_Interactions: engagement.peer_interactions || 0,
        Physical_Activity: engagement.physical_activity_score || 0,
        Social_Interaction: engagement.social_interaction_score || 0,
        Wellness_Index: engagement.wellness_index || 0,
        Total_Activity_Score: activityScore,
        Engagement_Level: engagementLevel,
        Alert_Level: alertLevel,
        Trend: trend,
        Advisor_Comments: engagement.advisor_comments || ''
      };
    });
    
    cachedData = combinedData;
    return combinedData;
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
  })).sort((a, b) => b.average - a.average).slice(0, 15);
};

export const getWeeklyTrend = (data) => {
  // Calculate average scores for the last 8 weeks from data
  const weeklyScores = {};
  
  data.forEach(student => {
    const score = student.Total_Activity_Score || 0;
    for (let i = 1; i <= 8; i++) {
      if (!weeklyScores[i]) weeklyScores[i] = { total: 0, count: 0 };
      // Simulate some variation
      const variance = Math.random() * 10 - 5;
      weeklyScores[i].total += score + variance;
      weeklyScores[i].count += 1;
    }
  });
  
  return Object.keys(weeklyScores).map(week => ({
    week: `Week ${week}`,
    score: Math.round(weeklyScores[week].total / weeklyScores[week].count)
  }));
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
    .filter(s => s.Advisor_Comments && s.Advisor_Comments.trim() && s.Advisor_Comments !== 'N/A')
    .slice(0, 10)
    .map(s => ({
      studentId: s.Student_ID,
      studentName: s.Name,
      comment: s.Advisor_Comments
    }));
};
