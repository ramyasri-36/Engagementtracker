import { useEffect, useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { loadStudentData, getAdvisorComments } from '../utils/dataLoader';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

export const Feedback = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  useEffect(() => {
    const loadData = async () => {
      const data = await loadStudentData();
      const advisorComments = getAdvisorComments(data);
      setComments(advisorComments);
    };
    loadData();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('This is a prototype. In production, this would save to database.');
    setNewComment('');
  };
  
  const profileImages = [
    'https://images.unsplash.com/photo-1544717305-2782549b5136?w=100',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
    'https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?w=100',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    'https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=100',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100'
  ];
  
  return (
    <div className="min-h-screen bg-gradient-subtle py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">Advisor Feedback and Notes</h1>
              <p className="text-muted-foreground">Review comments and add new observations</p>
            </div>
          </div>
        </div>
        
        {/* Add New Comment */}
        <Card className="p-6 mb-8 shadow-card" style={{
          backgroundImage: 'repeating-linear-gradient(hsl(var(--secondary)) 0px, hsl(var(--secondary)) 24px, hsl(var(--border)) 24px, hsl(var(--border)) 25px)'
        }}>
          <h2 className="text-xl font-bold text-foreground mb-4">Add New Comment (Prototype Only)</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Enter your feedback or observations about a student..."
              className="min-h-32 bg-card"
            />
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback (Mock)
            </Button>
          </form>
        </Card>
        
        {/* Recent Comments */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground mb-4">Recent Advisor Comments</h2>
          {comments.map((comment, idx) => (
            <Card key={comment.studentId} className="p-6 shadow-card hover:shadow-lg transition-shadow">
              <div className="flex gap-4">
                <img
                  src={profileImages[idx % profileImages.length]}
                  alt="Advisor"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{comment.studentName}</h3>
                      <p className="text-sm text-muted-foreground">Student ID: {comment.studentId}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-foreground leading-relaxed">{comment.comment}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
