import React from 'react';
import { Course, User } from '../types';

interface DashboardProps {
  user: User;
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, courses, onCourseClick }) => {
  const activeCourses = courses.filter(c => c.progress > 0 && c.progress < 100);
  // Simple logic to find a recommended course (first one not started)
  const recommendedCourse = courses.find(c => c.progress === 0);

  return (
    <div className="flex flex-col flex-grow pb-24 animate-in fade-in duration-300">
      {/* Top Header */}
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        <div className="flex size-12 shrink-0 items-center">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white dark:ring-gray-800"
            style={{ backgroundImage: `url("${user.avatar}")` }}
          />
        </div>
        <h1 className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em] flex-1 ml-3">
          Welcome back, {user.name.split(' ')[0]}!
        </h1>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 text-text-muted-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Overall Progress */}
        <div className="flex flex-col gap-3 p-4">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal">Overall Progress</p>
            <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">{user.totalProgress}% Complete</p>
          </div>
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-2 overflow-hidden">
            <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${user.totalProgress}%` }}></div>
          </div>
        </div>

        {/* My Courses Section */}
        <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">My Courses</h2>
        <div className="flex flex-col gap-4">
          {activeCourses.map((course) => (
             <div key={course.id} className="px-4 group cursor-pointer" onClick={() => onCourseClick(course)}>
              <div className="flex flex-col items-stretch justify-start rounded-xl shadow-sm bg-white dark:bg-surface-dark overflow-hidden transition-transform hover:scale-[1.02] duration-200 border border-transparent dark:border-gray-800">
                <div 
                  className="w-full h-40 bg-center bg-no-repeat bg-cover" 
                  style={{ backgroundImage: `url("${course.thumbnail}")` }}
                />
                <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                  <p className="text-text-light dark:text-text-dark text-lg font-bold leading-tight tracking-[-0.015em]">{course.title}</p>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-base font-normal leading-normal">{course.instructor}</p>
                  <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700 my-2 h-1.5">
                    <div className="h-1.5 rounded-full bg-primary" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between gap-3 mt-1">
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-normal leading-normal">
                      {course.completedLessons}/{course.totalLessons} Lessons Complete
                    </p>
                    <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-white text-sm font-medium leading-normal hover:bg-primary-dark transition-colors">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* My Learning Path (Recommended Course) */}
        {recommendedCourse && (
          <>
            <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-8">My Learning Path</h2>
            <div className="px-4">
              <div 
                onClick={() => onCourseClick(recommendedCourse)}
                className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm dark:bg-surface-dark cursor-pointer border border-transparent dark:border-gray-800 transition-transform hover:scale-[1.02] duration-200"
              >
                <div className="absolute top-3 left-3 z-10">
                   <span className="inline-flex items-center rounded-md bg-secondary/90 px-2 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-md">
                    Recommended Next
                   </span>
                </div>
                <div 
                    className="h-32 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${recommendedCourse.thumbnail}")` }}
                />
                <div className="p-4">
                   <h3 className="text-lg font-bold text-text-light dark:text-text-dark">{recommendedCourse.title}</h3>
                   <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1 line-clamp-2">
                     Based on your recent activity, this course is the perfect next step to advance your skills in {recommendedCourse.category}.
                   </p>
                   <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:underline">
                      Start Learning <span className="material-symbols-outlined text-lg ml-1">arrow_forward</span>
                   </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Upcoming Activities */}
        <h2 className="text-text-light dark:text-text-dark text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-8">What's Next</h2>
        <div className="flex flex-col gap-3 px-4">
          <div className="flex items-center gap-4 rounded-xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-transparent dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors cursor-pointer">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <div className="flex-grow">
              <p className="font-medium text-text-light dark:text-text-dark">Quiz: Color Theory Basics</p>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Due Tomorrow, 11:59 PM</p>
            </div>
            <span className="material-symbols-outlined text-text-muted-light">chevron_right</span>
          </div>

          <div className="flex items-center gap-4 rounded-xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-transparent dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors cursor-pointer">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined">videocam</span>
            </div>
            <div className="flex-grow">
              <p className="font-medium text-text-light dark:text-text-dark">Live Q&A Session</p>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Today at 4:00 PM</p>
            </div>
            <span className="material-symbols-outlined text-text-muted-light">chevron_right</span>
          </div>

          <div className="flex items-center gap-4 rounded-xl p-4 bg-white dark:bg-surface-dark shadow-sm border border-transparent dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors cursor-pointer">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <span className="material-symbols-outlined">assignment</span>
            </div>
            <div className="flex-grow">
              <p className="font-medium text-text-light dark:text-text-dark">Project: Python Web Scraper</p>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">Due in 3 days</p>
            </div>
            <span className="material-symbols-outlined text-text-muted-light">chevron_right</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;