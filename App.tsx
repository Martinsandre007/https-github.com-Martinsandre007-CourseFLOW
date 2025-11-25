import React, { useState, useEffect } from 'react';
import { ViewState, Course, User } from './types';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ExploreCourses from './components/ExploreCourses';
import CourseDetails from './components/CourseDetails';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';

// Mock Data
const MOCK_USER: User = {
  name: 'Alex Morgan',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlFfy_nNHxOTRNBmZlbKQ1vD8Ay0i9XSDA56BLsr7-rgTgBnYtQ_OM7bcUcKvNS-N_Fpd4VI4AmlLXhiuAVHxGlYbHqfUmZgLhVgoOG4MZJqBkmeijTtVFN8Zkh8ubpGLwwDamdaFIgKfgcAeZSxjAwsqGn3FL7szqh_pdek4LNfOT5Rt4d4FnQlmcbi1SkJar-iYrjT_9ADvMW5jbhpHC7lYK_SJkOHJARrrUdg4fDPdy0b5BmyUhRzY360s-ABI3-qsk73DNrQ0',
  email: 'alex@example.com',
  totalProgress: 65,
  coursesCompleted: 8,
  studyHours: 120,
  achievements: 15
};

const MOCK_COURSES: Course[] = [
  {
    id: 'intro-graphic-design',
    title: 'Intro to Graphic Design',
    instructor: 'Dr. Angela Yu',
    progress: 60,
    totalLessons: 10,
    completedLessons: 6,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvnvrivJ2b6pd8_T5404aPrss5jlfwzu13SG5mm54F_cot92kXumbIEmO-WqFzDnhxZ17DPNhSN7ZboHppcT2tNvX-G3EvWClU-8IK6PJfO-cbryVAcVetHxizyTDpEGCPuf_tJLORdg_6Xw_TivDWpZW4LkasOd36ffmc-ZmomNuQtOVgTJemZwt9HOtx6irHck9thvFUcHq6CtaoY-kFZrFIvFANtXNSc_zO6KDV82wZwYfG5QYeKvmt2iMb0fFe45u8RgVMKUc',
    category: 'Design',
    level: 'Beginner',
    duration: '3h total'
  },
  {
    id: 'advanced-python',
    title: 'Advanced Python Programming',
    instructor: 'Jose Portilla',
    progress: 13,
    totalLessons: 15,
    completedLessons: 2,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqoSGFBTp5QBn2mL_wj_NPMAjdyXDITK3ZvzN5rdMKEL1QGR4HArSNUUSRfSIrn9sPZob2Tw2JphF_XFx-2tZPDKYXhSBjwaaMOaDc18CJyo66DDVJi54V6CgsMfZxi0ZIYotYXT-extSjUr0HkbBsJ9vXeWKd0FB2jV1tQHDbI8bTr-2xxePoI3zLSVKR_0LLADp2tokpgwvcETLF42Fi0daH28Xu0_Q4OD7QaRx9wI0zmVJE91Vqcg8vMpFmSBmJ9EgRT78TZx8',
    category: 'Coding',
    level: 'Advanced',
    duration: '10h total'
  },
  {
    id: 'web-dev-basics',
    title: 'Web Development Basics',
    instructor: 'Colt Steele',
    progress: 0,
    totalLessons: 20,
    completedLessons: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAolKKbotpEpyXcY1UyXh9ZgOunMXH5iDpLm2Pnau4HxVwn6ydFCiMM-Sdwt2YgRpAfpNzmOIcFoR2BvTHedGZcFxHcsTR5C70vXTttguBb063gK3U8koedpcg3aZof15vOJj2zGcEev_Ml3UlYC7SoqdzpEbGJM5r0P4Jo8ew6NeydcOAlvuLfz6WTqUOziENb-PdZHh_NdHXiBQE-T1g-WiZHAgoM7vqxkc1qlFEAEigVwH3kbNAc98J9W9_B9HUNuG1HGJPqFAE',
    category: 'Coding',
    level: 'Beginner',
    duration: '5h total'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing 101',
    instructor: 'Sarah Smith',
    progress: 0,
    totalLessons: 12,
    completedLessons: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBglSVPx80uWZnXi64k5TzJMPL52kbUUmMSPiQVOd4Ev953Drg7kUHU_wnr02ZXStBaxXeEueDTxw1Frw5voENHD9hNl_N3sMih1Q8mdEmlTmKYv25GEMQ62IAQK8evkaBFkfCur9zpUSqeP8Fy5NMp7wIqKts7wksES2DyJRl7Jir9aWhLHbwRUV_-8zebEIRH-QGMX8WKDp_cn2vVF5dyDGo_vmiHHfszdhcB0uZOmoxFj5jWQMonsoEk9e8tXkqxdifaIAICE3w',
    category: 'Business',
    level: 'Intermediate',
    duration: '4h total'
  },
  {
    id: 'data-science',
    title: 'Data Science Fundamentals',
    instructor: 'Dr. Data',
    progress: 0,
    totalLessons: 22,
    completedLessons: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUHZLpXSOQVcegdW5uVGM70-rj7XvR86plV0tqnIBdWmyHrARjh-gSncmpzyABQyDtSl6Z88cCYHAHKbwQq9qQ4xCf46MniVYXxVgVPR6YVDQfXc-UAqZZEJqaWP-l4XnPQztYPJFEi2DvpHLQLfb3jO3P24jsQi654m-KNLYMg17fXnFD-Cyg5dxXsImxEqCqSyUGGoR3XDDwBaSNiJmbbrpEjc23PNVi9sB0VP-Vel_IUbhde3zWD22bYMfKIRyAiSjmpWx1hS8',
    category: 'Coding',
    rating: 4.8,
    reviewCount: 1230,
    level: 'Beginner',
    duration: '12h total'
  },
  {
    id: 'ux-design',
    title: 'Advanced UI/UX Design',
    instructor: 'Jane Doe',
    progress: 40,
    totalLessons: 10,
    completedLessons: 4,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnOrTiIAH-TR3vhH0aKI6Le1Sw4mLEriESzs02ofrg1FYPrX6C_4LtFCJJmUertsJKQPhIEAlLUdWN1dNoixqcu0F3o56qrcxQKUinVk00jDFcIyvhcPTFuplsGxXElmiItCvKsOrzOMSN-KsJXgwCM1yVRyjoURsLwF6r8XoXz00wCvTr-ayhF2RM-B-mYv0Q6xNFYzOWRhge7j-YAwL6rufMD-_W_GzKyWL8QOiaC5XiqI5zViLW8lJLB8jyNCkcsvHuDz7GrSw',
    category: 'Design',
    rating: 4.9,
    reviewCount: 2510,
    isFeatured: true,
    level: 'Advanced',
    duration: '8h total'
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    instructor: 'Gary Vaynerchuk',
    progress: 0,
    totalLessons: 8,
    completedLessons: 0,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOLWkfvYFNdsUcakdW5ideMcRGTMSS-_rwbZU8FdbUo3my_04pEDEXe6dtGnrYkUglg0TVzgYH3mHF7e_hg3Xecj_StW-7LqwvTIK1WuK-VT_oExgaj4bVEhKE5xTtDNPO7tZt2W0HpsEVK_KrXcNAmSnKLuJDE_p9KnZXz5zHmxgSpYe5D_V-5zcpCgSvzmi06iI2D5XyE3NqIv6Y9r4Z8ZGsP15Bc38AqEK8NcZda1WRujbBxJNcqEXkIzZPG8a0N25ZE3ktvTk',
    category: 'Business',
    rating: 4.7,
    reviewCount: 980,
    level: 'Intermediate',
    duration: '4h total'
  },
  {
    id: 'mastering-react',
    title: 'Mastering React Patterns',
    instructor: 'Kent C. Dodds',
    progress: 100,
    totalLessons: 25,
    completedLessons: 25,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAolKKbotpEpyXcY1UyXh9ZgOunMXH5iDpLm2Pnau4HxVwn6ydFCiMM-Sdwt2YgRpAfpNzmOIcFoR2BvTHedGZcFxHcsTR5C70vXTttguBb063gK3U8koedpcg3aZof15vOJj2zGcEev_Ml3UlYC7SoqdzpEbGJM5r0P4Jo8ew6NeydcOAlvuLfz6WTqUOziENb-PdZHh_NdHXiBQE-T1g-WiZHAgoM7vqxkc1qlFEAEigVwH3kbNAc98J9W9_B9HUNuG1HGJPqFAE',
    category: 'Coding',
    rating: 5.0,
    reviewCount: 3420,
    level: 'Advanced',
    duration: '15h total'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.ONBOARDING);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Simple "router" effect to scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleLogin = () => {
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView(ViewState.COURSE_DETAILS);
  };

  const handleBackFromDetails = () => {
    // If we came from explore, go back to explore, else dashboard?
    // For simplicity, let's assume we return to the dashboard if the course is active, or explore if not.
    // Or just default to the previous view stack logic? 
    // Simpler: Just go to Dashboard if we don't track history.
    // Let's check if the course is in progress to decide context, 
    // but visually, the user expects to go back to where they were.
    // For this demo, let's default to Dashboard as the "Home" or Explore if that was the context.
    // I'll default to Dashboard for now to be safe.
    setCurrentView(ViewState.DASHBOARD);
    setSelectedCourse(null);
  };

  return (
    <div className="mx-auto max-w-md bg-background-light dark:bg-background-dark min-h-screen shadow-2xl overflow-hidden relative">
      
      {currentView === ViewState.ONBOARDING && (
        <Onboarding 
          onComplete={() => setCurrentView(ViewState.AUTH)} 
          onSkip={() => setCurrentView(ViewState.AUTH)}
        />
      )}

      {currentView === ViewState.AUTH && (
        <Auth onLogin={handleLogin} />
      )}

      {currentView === ViewState.DASHBOARD && (
        <Dashboard 
          user={MOCK_USER} 
          courses={MOCK_COURSES} 
          onCourseClick={handleCourseClick} 
        />
      )}

      {currentView === ViewState.EXPLORE && (
        <ExploreCourses 
          courses={MOCK_COURSES} 
          onCourseClick={handleCourseClick}
          userAvatar={MOCK_USER.avatar}
        />
      )}

      {currentView === ViewState.PROFILE && (
        <Profile 
          user={MOCK_USER} 
          courses={MOCK_COURSES}
          onCourseClick={handleCourseClick}
        />
      )}

      {currentView === ViewState.COURSE_DETAILS && selectedCourse && (
        <CourseDetails 
          course={selectedCourse} 
          onBack={handleBackFromDetails} 
        />
      )}

      {/* Show Bottom Nav only on authenticated main screens */}
      {(currentView === ViewState.DASHBOARD || currentView === ViewState.EXPLORE || currentView === ViewState.PROFILE) && (
        <BottomNav currentView={currentView} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default App;