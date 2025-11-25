import React, { useState } from 'react';
import { Course } from '../types';

interface CourseDetailsProps {
  course: Course;
  onBack: () => void;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course, onBack }) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'assignments' | 'resources'>('lessons');

  const resources = [
    { title: 'Course Syllabus', type: 'PDF', size: '1.2 MB', icon: 'picture_as_pdf' },
    { title: 'Project Assets', type: 'ZIP', size: '15 MB', icon: 'folder_zip' },
    { title: 'Lecture Notes - Module 1', type: 'PDF', size: '2.4 MB', icon: 'description' },
    { title: 'Starter Code', type: 'Code', size: '5 KB', icon: 'code' },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto min-h-screen flex flex-col bg-background-light dark:bg-background-dark animate-in slide-in-from-right duration-300">
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <button 
          onClick={onBack}
          className="flex items-center justify-center size-10 text-text-light dark:text-text-dark rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-text-light dark:text-text-dark flex-1 text-center truncate px-2">{course.title}</h1>
        <button className="flex items-center justify-center size-10 text-text-light dark:text-text-dark rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">more_vert</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col overflow-y-auto px-4 pb-24">
        {/* Headline and Body Text */}
        <div className="pt-6 pb-2">
          <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">{course.title}</h2>
          <p className="pt-1 text-base text-text-muted-light dark:text-text-muted-dark">Instructor: {course.instructor}</p>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-2 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-text-light dark:text-text-dark">Course Progress</p>
            <p className="text-sm font-medium text-primary">{course.progress}%</p>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
          </div>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            You've completed {course.completedLessons} out of {course.totalLessons} lessons
          </p>
        </div>

        {/* Tabs */}
        <div className="sticky top-[73px] z-10 bg-background-light dark:bg-background-dark pt-4">
          <div className="flex border-b border-gray-200 dark:border-gray-800">
            <button 
              onClick={() => setActiveTab('lessons')}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 flex-1 transition-colors ${activeTab === 'lessons' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
            >
              <p className="text-sm font-bold">Lessons</p>
            </button>
            <button 
              onClick={() => setActiveTab('assignments')}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 flex-1 transition-colors ${activeTab === 'assignments' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
            >
              <p className="text-sm font-bold">Assignments</p>
            </button>
            <button 
              onClick={() => setActiveTab('resources')}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 flex-1 transition-colors ${activeTab === 'resources' ? 'border-primary text-primary' : 'border-transparent text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
            >
              <p className="text-sm font-bold">Resources</p>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex flex-col gap-4 py-6 animate-in fade-in duration-300">
          
          {/* Lessons Tab */}
          {activeTab === 'lessons' && (
            <>
              {/* Module Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Module 1: Fundamentals</h3>
                <span className="text-xs font-medium text-secondary bg-secondary/10 dark:bg-secondary/20 px-2 py-1 rounded-full">Completed</span>
              </div>
              
              {/* Lesson Item: Completed */}
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark border border-transparent dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-center size-10 bg-secondary rounded-full text-white">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-text-light dark:text-text-dark">1. What is UX Design?</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">12 min</p>
                </div>
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">play_circle</span>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark border border-transparent dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-center size-10 bg-secondary rounded-full text-white">
                  <span className="material-symbols-outlined">check</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-text-light dark:text-text-dark">2. The Design Thinking Process</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">18 min</p>
                </div>
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">play_circle</span>
              </div>

              {/* Module Header */}
              <div className="flex items-center justify-between pt-4">
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark">Module 2: User Research</h3>
                <span className="text-xs font-medium text-primary bg-primary/10 dark:bg-primary/20 px-2 py-1 rounded-full">In Progress</span>
              </div>

              {/* Lesson Item: In Progress */}
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark border border-transparent dark:border-gray-800 rounded-lg ring-1 ring-primary/20 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                <div className="flex items-center justify-center size-10 bg-primary rounded-full text-white shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined">play_arrow</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-text-light dark:text-text-dark">3. Conducting User Interviews</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">25 min</p>
                </div>
                <span className="material-symbols-outlined text-primary">play_circle</span>
              </div>

              {/* Lesson Item: Locked */}
              <div className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark border border-transparent dark:border-gray-800 rounded-lg opacity-75">
                <div className="flex items-center justify-center size-10 bg-gray-200 dark:bg-gray-700 rounded-full text-text-muted-light dark:text-text-muted-dark">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-text-light dark:text-text-dark">4. Creating User Personas</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">20 min</p>
                </div>
                <span className="material-symbols-outlined text-text-muted-light dark:text-text-muted-dark">play_circle</span>
              </div>
            </>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
             <div className="flex flex-col items-center justify-center py-10 text-center text-text-muted-light dark:text-text-muted-dark">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">assignment_turned_in</span>
                <p>No pending assignments.</p>
                <p className="text-sm">Great job keeping up!</p>
             </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
             <div className="flex flex-col gap-3">
                {resources.map((res, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark border border-transparent dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center justify-center size-10 bg-primary/10 dark:bg-primary/20 rounded-lg text-primary">
                            <span className="material-symbols-outlined">{res.icon}</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-text-light dark:text-text-dark">{res.title}</p>
                            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{res.type} • {res.size}</p>
                        </div>
                        <button className="p-2 text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary transition-colors" title="Download">
                            <span className="material-symbols-outlined">download</span>
                        </button>
                    </div>
                ))}
             </div>
          )}
        </div>
      </main>

      {/* Floating Action Button - Only show on Lessons tab or if we want it persistent */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pt-8">
        <button className="w-full flex items-center justify-center gap-2 h-14 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/25 hover:bg-primary-dark active:scale-95 transition-all">
          <span className="material-symbols-outlined">play_arrow</span>
          Start Next Lesson
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;