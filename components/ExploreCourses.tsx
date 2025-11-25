import React, { useState, useMemo } from 'react';
import { Course } from '../types';

interface ExploreCoursesProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
  userAvatar: string;
}

const ExploreCourses: React.FC<ExploreCoursesProps> = ({ courses, onCourseClick, userAvatar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = ['All', 'Design', 'Coding', 'Business'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = (course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             course.instructor.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel]);

  const popularPicks = filteredCourses.filter(c => c.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col flex-grow pb-24 animate-in fade-in duration-300">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm border-b border-transparent dark:border-gray-800">
        <div className="flex items-center p-4">
          <div className="flex size-12 shrink-0 items-center justify-start">
            <img className="h-10 w-10 rounded-full object-cover ring-2 ring-white dark:ring-gray-800" src={userAvatar} alt="User avatar" />
          </div>
          <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">Explore Courses</h1>
          <div className="flex w-12 items-center justify-end">
            <button className="flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-text-light dark:text-text-dark hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Search Bar */}
        <div className="px-4 py-3">
          <label className="flex w-full flex-col h-12 min-w-40">
            <div className="flex h-full w-full flex-1 items-stretch rounded-xl shadow-sm">
              <div className="flex items-center justify-center rounded-l-xl border-y border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark pl-4 text-text-muted-light dark:text-text-muted-dark">
                <span className="material-symbols-outlined text-2xl">search</span>
              </div>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-xl border-y border-r border-gray-200 bg-white px-4 py-2 text-base font-normal leading-normal text-text-light placeholder:text-text-muted-light focus:border-primary focus:outline-0 focus:ring-0 dark:border-gray-700 dark:bg-surface-dark dark:text-text-dark dark:placeholder:text-text-muted-dark dark:focus:border-primary transition-all" 
                placeholder="Search for courses..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-2 mb-2">
            {/* Category Chips */}
            <div className="flex gap-3 overflow-x-auto px-4 pt-1 no-scrollbar">
            {categories.map((cat) => (
                <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors text-sm font-medium border ${
                    selectedCategory === cat 
                    ? 'bg-primary text-white border-primary' 
                    : 'bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                >
                {cat}
                </button>
            ))}
            </div>

            {/* Level Chips */}
            <div className="flex gap-3 overflow-x-auto px-4 pb-2 no-scrollbar">
            {levels.map((lvl) => (
                <button 
                key={lvl} 
                onClick={() => setSelectedLevel(lvl)}
                className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 transition-colors text-sm font-medium border ${
                    selectedLevel === lvl 
                    ? 'bg-secondary text-white border-secondary' 
                    : 'bg-white dark:bg-surface-dark text-text-light dark:text-text-dark border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                >
                {lvl}
                </button>
            ))}
            </div>
        </div>

        {filteredCourses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-in fade-in zoom-in duration-300">
                <div className="bg-gray-100 dark:bg-surface-dark p-4 rounded-full mb-4">
                    <span className="material-symbols-outlined text-4xl text-text-muted-light dark:text-text-muted-dark">search_off</span>
                </div>
                <h3 className="text-lg font-bold text-text-light dark:text-text-dark">No courses found</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mt-1">Try adjusting your search or filters.</p>
                <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All'); }}
                    className="mt-4 text-primary font-medium hover:underline"
                >
                    Clear all filters
                </button>
            </div>
        ) : (
            <>
                {/* Popular Picks (Only show if there are featured courses in the filtered list) */}
                {popularPicks.length > 0 && (
                <>
                    <h2 className="px-4 pb-3 pt-4 text-[22px] font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">Popular Picks</h2>
                    <div className="flex overflow-x-auto no-scrollbar pb-4">
                    <div className="flex items-stretch gap-4 px-4">
                        {popularPicks.map((course) => (
                        <div key={course.id} className="flex h-full min-w-[280px] w-[280px] flex-col gap-3 rounded-xl bg-white shadow-sm dark:bg-surface-dark overflow-hidden border border-transparent dark:border-gray-800 transition-transform hover:scale-[1.02] duration-200 cursor-pointer" onClick={() => onCourseClick(course)}>
                            <div 
                            className="aspect-video w-full bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url("${course.thumbnail}")` }}
                            />
                            <div className="flex flex-1 flex-col justify-between gap-4 p-4 pt-0">
                            <div>
                                <p className="text-base font-medium leading-normal text-text-light dark:text-text-dark line-clamp-1">{course.title}</p>
                                <p className="text-sm font-normal leading-normal text-text-muted-light dark:text-text-muted-dark">{course.level} • {course.duration}</p>
                            </div>
                            <button className="flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 px-4 text-sm font-bold leading-normal tracking-[0.015em] text-text-light dark:bg-gray-700 dark:text-text-dark hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                <span className="truncate">View Details</span>
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </>
                )}

                {/* All Courses */}
                <h2 className="px-4 pb-3 pt-4 text-[22px] font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">All Courses</h2>
                <div className="grid grid-cols-1 gap-6 p-4 pt-0 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                    <div 
                    key={course.id} 
                    className={`flex flex-col overflow-hidden rounded-xl shadow-sm cursor-pointer transition-transform hover:scale-[1.01] duration-200 ${course.id === 'ux-design' ? 'bg-secondary text-white' : 'bg-white dark:bg-surface-dark border border-transparent dark:border-gray-800'}`}
                    onClick={() => onCourseClick(course)}
                    >
                    <div 
                        className="aspect-video w-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url("${course.thumbnail}")` }}
                    />
                    <div className={`flex flex-1 flex-col p-4 ${course.id === 'ux-design' ? 'text-white' : ''}`}>
                        {course.id === 'ux-design' && <p className="text-xs font-bold uppercase tracking-wider mb-1">FEATURED</p>}
                        <p className={`text-base font-medium ${course.id === 'ux-design' ? 'text-white' : 'text-text-light dark:text-text-dark'}`}>{course.title}</p>
                        <p className={`mt-1 text-sm ${course.id === 'ux-design' ? 'text-white/90' : 'text-text-muted-light dark:text-text-muted-dark'}`}>
                        {course.id === 'ux-design' ? 'Master the art of creating beautiful and functional interfaces.' : course.instructor}
                        </p>
                        <div className={`mt-3 flex items-center gap-1 ${course.id === 'ux-design' ? 'text-white' : 'text-text-muted-light dark:text-text-muted-dark'}`}>
                        <span className={`material-symbols-outlined text-sm ${course.id === 'ux-design' ? 'text-white' : 'text-secondary'} fill-icon`}>star</span>
                        <span className="text-xs font-medium">{course.rating} ({course.reviewCount})</span>
                        </div>
                        <div className="mt-4 flex flex-1 items-end">
                        <button className={`flex h-11 w-full items-center justify-center rounded-lg px-6 text-sm font-bold ${course.id === 'ux-design' ? 'bg-white text-secondary' : 'bg-primary text-white'}`}>
                            <span className="truncate">Enroll Now</span>
                        </button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </>
        )}
      </main>
    </div>
  );
};

export default ExploreCourses;