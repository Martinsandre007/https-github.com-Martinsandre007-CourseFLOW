import React from 'react';

interface OnboardingProps {
  onComplete: () => void;
  onSkip: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, onSkip }) => {
  return (
    <div className="relative flex h-full min-h-screen w-full flex-col p-6 bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <div className="flex items-center justify-end pb-4">
        <button 
          onClick={onSkip}
          className="text-text-light/70 dark:text-text-dark/70 text-base font-bold leading-normal tracking-[0.015em] shrink-0"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-between">
        {/* Image Area */}
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-sm">
            <img 
              className="w-full h-auto object-contain" 
              alt="Illustration of a happy student learning on a laptop" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkM8xnpfk7rSnHQ46ufYVoSC_N88R1a8XGE1lIVjAsAgqCN528-mJPkt8nkdx-rafDdwjGNdepQ-h4hI3ThjRYMzL29f3oi7hceUoOtcZBiB8ABlDs6cJputqk6EPewaCYx1q8bvJT1hof7ACkKbOy_E7qiNesKQjrOkQslAeX80bqA-MPhgzxMF5w_N62hXgrrfpRkzMXIzJtXYwY2WA09UwoTcNvS8ecwpZvxHaQp7qFHaIUkYvvH-63Ud4b_SOdqfu8nhwI0Hs"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="pt-8">
          <h1 className="text-text-light dark:text-text-dark tracking-tight text-[32px] font-bold leading-tight text-center">
            Welcome to CourseFlow!
          </h1>
          <p className="text-text-light/80 dark:text-text-dark/80 text-base font-normal leading-relaxed text-center pt-2 pb-8">
            Your personal journey to mastering new skills starts here.
          </p>
          
          {/* Page Indicators */}
          <div className="flex w-full flex-row items-center justify-center gap-3 py-5">
            <div className="h-2.5 w-6 rounded-full bg-primary"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-primary/20 dark:bg-white/20"></div>
            <div className="h-2.5 w-2.5 rounded-full bg-primary/20 dark:bg-white/20"></div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="w-full pt-8 pb-4">
        <button 
          onClick={onComplete}
          className="w-full bg-primary text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          Get Started
        </button>
        <p className="text-center pt-5 text-base">
          <span className="text-text-light/60 dark:text-text-dark/60">Already have an account?</span>
          <button onClick={onComplete} className="font-bold text-primary ml-1 hover:underline">Log In</button>
        </p>
      </div>
    </div>
  );
};

export default Onboarding;