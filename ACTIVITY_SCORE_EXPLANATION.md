# 📊 Total Activity Score Calculation

## How the Score Works

The **Total Activity Score** displayed in the application is calculated as follows:

### 1. Weekly Scores (From Excel)

Your Excel file (`combined_dataset.xlsx`) contains pre-calculated `total_activity_score` values in the **EngagementLogs** sheet for each student, each week (16 weeks total).

**Weekly Score Components (in your Excel):**
The Excel file already has a formula that calculates the weekly `total_activity_score` from these metrics:
- LMS Logins
- Events Attended  
- Counseling Visits
- Assignments Submitted
- Attendance Rate (%)
- Peer Interactions
- Physical Activity Score
- Social Interaction Score
- Wellness Index

**Note:** The exact formula used in your Excel file determines how these metrics are weighted and combined into the weekly score.

### 2. Average Score (Displayed in App)

The application takes all 16 weekly scores for each student and calculates the **average**:

```javascript
Total Activity Score = Sum of all 16 weekly scores / 16
```

**Example: Student S1001**
```
Week 1:  17.89
Week 2:  13.47
Week 3:  16.83
...
Week 16: 15.21
-------------------
Total:   251.96
Average: 251.96 ÷ 16 = 15.75
```

### 3. Engagement Level Classification

Based on the **average** activity score across all students, we categorize them into three groups:

| Engagement Level | Score Range | Percentage | Count |
|-----------------|-------------|------------|-------|
| **High** 🟢 | ≥ 16.6 | Top 33% | ~327 students |
| **Moderate** 🟡 | 15.8 - 16.6 | Middle 34% | ~345 students |
| **Low** 🔴 | < 15.8 | Bottom 33% | ~328 students |

### 4. Score Distribution

**From Your Actual Data (1000 Students):**
- **Minimum Average:** 13.35
- **Maximum Average:** 18.85
- **Overall Average:** 16.22
- **Median:** 16.22

---

## What Gets Displayed Where

### Dashboard
- Shows **count** of students in each engagement level
- Bar Chart: **Average** scores by department
- Line Chart: **Average** weekly trends across all students

### Student Profile Page
- **Total Activity Score:** Average of student's 16 weekly scores
- **Progress Bar:** Score relative to maximum (27)
- **Events vs Counseling:** Total sum across all 16 weeks
- **LMS Logins Chart:** Individual weekly values (last 8 weeks shown)

### Low Engagement Page
- Lists students with **average score < 15.8**
- Shows their average score in the table

---

## Key Points

1. ✅ **Weekly scores are pre-calculated** in your Excel file
2. ✅ **App averages** these 16 weekly scores per student
3. ✅ **Engagement levels** based on percentiles (33/34/33 split)
4. ✅ **All data is real** - nothing is simulated or randomized
5. ✅ Each student has **16 weeks of data** processed

---

## If You Want to Change the Formula

To modify how the activity score is calculated, you would need to:

**Option 1: Update Excel (Recommended)**
- Modify the formula in your Excel EngagementLogs sheet
- Re-upload the file
- App will automatically use new scores

**Option 2: Calculate in App**
- Modify `/app/frontend/src/utils/dataLoader.js`
- Create custom calculation from individual metrics
- Override the Excel `total_activity_score` values

**Current Implementation:** We use the pre-calculated scores from your Excel file as-is.
