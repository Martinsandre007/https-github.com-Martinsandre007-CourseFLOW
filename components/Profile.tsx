import React, { useState } from 'react';
import { User, Course } from '../types';

interface ProfileProps {
  user: User;
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, courses, onCourseClick }) => {
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  const completedCourses = courses.filter(c => c.progress === 100);

  const [notifications, setNotifications] = useState({
    courseUpdates: true,
    studyReminders: false,
    newAchievements: true,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col flex-grow pb-24 animate-in fade-in duration-300">
      {/* Header */}
      <header className="flex items-center p-4 bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <div className="flex items-center gap-3 flex-1">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-white dark:ring-gray-800"
            style={{ backgroundImage: `url("${user.avatar}")` }}
          />
          <div>
            <h1 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight">{user.name}</h1>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Keep up the great work!</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-text-light dark:text-text-dark">notifications</span>
        </button>
      </header>

      <main className="flex flex-col gap-8 p-4">
        {/* Overall Progress Chart */}
        <section className="flex flex-col gap-4">
          <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">Your Learning Journey</h2>
          <div className="bg-white dark:bg-surface-dark rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm border border-transparent dark:border-gray-800">
            <div className="relative size-48">
              <svg className="size-full transform -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                {/* Background Circle */}
                <circle className="stroke-gray-100 dark:stroke-gray-700" cx="18" cy="18" r="16" fill="none" strokeWidth="3"></circle>
                {/* Progress Circle */}
                <circle 
                  className="stroke-primary transition-all duration-1000 ease-out" 
                  cx="18" 
                  cy="18" 
                  r="16" 
                  fill="none" 
                  strokeWidth="3" 
                  strokeDasharray="100" 
                  strokeDashoffset={100 - user.totalProgress} 
                  strokeLinecap="round"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-text-light dark:text-text-dark text-4xl font-bold">{user.totalProgress}%</span>
                <span className="text-text-muted-light dark:text-text-muted-dark text-sm">Completed</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Summary */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 rounded-lg p-4 bg-white dark:bg-surface-dark shadow-sm border border-transparent dark:border-gray-800">
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium">Courses Completed</p>
            <p className="text-text-light dark:text-text-dark text-2xl font-bold">{user.coursesCompleted}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg p-4 bg-white dark:bg-surface-dark shadow-sm border border-transparent dark:border-gray-800">
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium">Total Study Hours</p>
            <p className="text-text-light dark:text-text-dark text-2xl font-bold">{user.studyHours}</p>
          </div>
          <div className="flex flex-col gap-2 rounded-lg p-4 bg-white dark:bg-surface-dark shadow-sm border border-transparent dark:border-gray-800">
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-medium">Achievements</p>
            <p className="text-text-light dark:text-text-dark text-2xl font-bold">{user.achievements}</p>
          </div>
        </section>

        {/* In Progress Courses */}
        <section className="flex flex-col gap-4">
          <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">In Progress</h2>
          <div className="flex flex-col gap-3">
            {inProgressCourses.length > 0 ? inProgressCourses.map((course) => (
              <div key={course.id} className="bg-white dark:bg-surface-dark rounded-xl p-4 flex flex-col gap-4 shadow-sm border border-transparent dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className={`flex size-12 items-center justify-center rounded-lg ${course.id.includes('ux') ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                    <span className="material-symbols-outlined">{course.id.includes('ux') ? 'design_services' : 'code'}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-text-light dark:text-text-dark">{course.title}</h3>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Chapter 4: Prototyping</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <span className="text-sm font-medium text-text-muted-light dark:text-text-muted-dark">{course.progress}%</span>
                </div>
                <button 
                  onClick={() => onCourseClick(course)}
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-dark transition-colors active:scale-95"
                >
                  Continue Learning
                </button>
              </div>
            )) : (
              <div className="p-4 text-center text-text-muted-light">No courses in progress.</div>
            )}
          </div>
        </section>

        {/* Recent Achievements */}
        <section className="flex flex-col gap-4">
          <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">Recent Achievements</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
            <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-28 group">
              <div className="flex size-20 items-center justify-center rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                <span className="material-symbols-outlined text-secondary text-4xl">workspace_premium</span>
              </div>
              <p className="text-xs text-center font-medium text-text-muted-light dark:text-text-muted-dark">First Course Completed</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-28 group">
              <div className="flex size-20 items-center justify-center rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                <span className="material-symbols-outlined text-secondary text-4xl">local_fire_department</span>
              </div>
              <p className="text-xs text-center font-medium text-text-muted-light dark:text-text-muted-dark">5-Day Study Streak</p>
            </div>
             <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-28 group">
              <div className="flex size-20 items-center justify-center rounded-full bg-secondary/20 group-hover:bg-secondary/30 transition-colors">
                <span className="material-symbols-outlined text-secondary text-4xl">verified</span>
              </div>
              <p className="text-xs text-center font-medium text-text-muted-light dark:text-text-muted-dark">Perfect Quiz Score</p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 flex-shrink-0 w-28">
              <div className="flex size-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 text-4xl">lock</span>
              </div>
              <p className="text-xs text-center font-medium text-text-muted-light dark:text-text-muted-dark">Night Owl</p>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">Certificates</h2>
          {completedCourses.length > 0 ? (
            <div className="flex flex-col gap-4">
              {completedCourses.map(course => (
                 <div key={course.id} className="relative w-full aspect-[1.5] bg-[#fdfbf7] rounded-lg shadow-sm border-4 border-double border-gray-300 p-1 overflow-hidden transition-transform hover:scale-[1.02] duration-300">
                    <div className="h-full w-full border border-gray-300 flex flex-col items-center justify-center text-center p-4 relative">
                        <div className="mb-2">
                            <span className="material-symbols-outlined text-4xl text-secondary">workspace_premium</span>
                        </div>
                        
                        <h3 className="font-serif text-2xl font-bold text-gray-900 leading-none mb-1">Certificate</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">of Completion</p>
                        
                        <p className="text-xs text-gray-500 italic mb-1">This is to certify that</p>
                        <p className="font-serif text-xl font-bold text-gray-800 border-b border-gray-300 pb-1 mb-3 px-4">{user.name}</p>
                        
                        <p className="text-xs text-gray-500 italic mb-1">has successfully completed the course</p>
                        <p className="font-serif text-sm font-bold text-primary mb-4 leading-tight">{course.title}</p>
                        
                        <div className="flex justify-between w-full items-end mt-auto px-2">
                             <div className="flex flex-col items-center">
                                 <p className="text-[10px] font-bold text-gray-800">Oct 24, 2023</p>
                                 <div className="w-12 h-px bg-gray-300 mt-0.5"></div>
                                 <p className="text-[8px] uppercase text-gray-400 mt-0.5">Date</p>
                             </div>
                             <div className="flex flex-col items-center">
                                 <p className="font-handwriting text-xs text-gray-800 leading-none mb-1 italic">{course.instructor.split(' ')[0]}</p>
                                 <div className="w-16 h-px bg-gray-300"></div>
                                 <p className="text-[8px] uppercase text-gray-400 mt-0.5">Instructor</p>
                             </div>
                        </div>
                    </div>
                    
                    {/* Download Overlay Button */}
                    <button className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm text-gray-600 hover:text-primary transition-colors z-10">
                        <span className="material-symbols-outlined text-xl">download</span>
                    </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-surface-dark rounded-xl p-6 text-center text-text-muted-light dark:text-text-muted-dark border border-dashed border-gray-300 dark:border-gray-700">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">school</span>
              <p>Complete a course to earn your first certificate!</p>
            </div>
          )}
        </section>

        {/* Notification Settings */}
        <section className="flex flex-col gap-4">
          <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em]">Notification Settings</h2>
          <div className="bg-white dark:bg-surface-dark rounded-xl p-2 flex flex-col shadow-sm border border-transparent dark:border-gray-800">
            
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">update</span>
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark text-sm">Course Updates</p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Get notified about new course content.</p>
                </div>
              </div>
              <button 
                onClick={() => toggleNotification('courseUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface-dark ${notifications.courseUpdates ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.courseUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">schedule</span>
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark text-sm">Study Reminders</p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Daily reminders to keep you on track.</p>
                </div>
              </div>
              <button 
                onClick={() => toggleNotification('studyReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface-dark ${notifications.studyReminders ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.studyReminders ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 last:border-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">emoji_events</span>
                <div>
                  <p className="font-bold text-text-light dark:text-text-dark text-sm">New Achievements</p>
                  <p className="text-xs text-text-muted-light dark:text-text-muted-dark">Celebrate your milestones instantly.</p>
                </div>
              </div>
              <button 
                onClick={() => toggleNotification('newAchievements')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-surface-dark ${notifications.newAchievements ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.newAchievements ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;