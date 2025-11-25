import React, { useState } from 'react';

interface AuthProps {
  onLogin: () => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [authType, setAuthType] = useState<'signup' | 'login'>('signup');

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display overflow-x-hidden bg-background-light dark:bg-background-dark">
      <div className="flex w-full flex-col items-center p-4">
        
        {/* Logo and Headline */}
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 text-primary">
            <span className="material-symbols-outlined !text-4xl">school</span>
          </div>
          <h2 className="text-text-light dark:text-text-dark tracking-light text-2xl sm:text-3xl font-bold leading-tight text-center">
            Start your learning journey
          </h2>
        </div>

        {/* Toggle */}
        <div className="flex w-full max-w-md px-4 py-3">
          <div className="flex h-12 flex-1 items-center justify-center rounded-xl bg-gray-200 dark:bg-surface-dark p-1">
            <button 
              onClick={() => setAuthType('signup')}
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all ${authType === 'signup' ? 'bg-background-light dark:bg-background-dark shadow-sm text-text-light dark:text-text-dark' : 'text-text-muted-light dark:text-text-muted-dark'}`}
            >
              Sign Up
            </button>
            <button 
              onClick={() => setAuthType('login')}
              className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-all ${authType === 'login' ? 'bg-background-light dark:bg-background-dark shadow-sm text-text-light dark:text-text-dark' : 'text-text-muted-light dark:text-text-muted-dark'}`}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="w-full max-w-md space-y-4 px-4 py-3">
          {authType === 'signup' && (
            <label className="flex flex-col flex-1">
              <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Full Name</p>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-gray-800/50 focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal transition-colors"
                placeholder="Enter your full name" 
              />
            </label>
          )}
          <label className="flex flex-col flex-1">
            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Email Address</p>
            <input 
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-gray-800/50 focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal transition-colors"
              placeholder="yourname@example.com" 
              type="email"
            />
          </label>
          <label className="flex flex-col flex-1">
            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Password</p>
            <div className="relative flex w-full items-center">
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-gray-800/50 focus:border-primary h-14 placeholder:text-gray-500 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal pr-12 transition-colors"
                placeholder="Enter your password" 
                type="password"
              />
              <button className="absolute right-0 mr-4 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                <span className="material-symbols-outlined">visibility</span>
              </button>
            </div>
          </label>
        </div>

        {/* CTA */}
        <div className="w-full max-w-md px-4 py-3">
          <button 
            onClick={onLogin}
            className="flex h-14 w-full items-center justify-center rounded-lg bg-primary text-white text-base font-bold leading-normal transition-all hover:bg-primary/90 active:scale-95"
          >
            {authType === 'signup' ? 'Create Account' : 'Log In'}
          </button>
        </div>

        {/* Footer */}
        <div className="w-full max-w-md px-4 text-center">
          {authType === 'signup' && (
            <p className="text-xs text-text-muted-light dark:text-text-muted-dark">
              By signing up, you agree to our <a href="#" className="font-medium text-primary hover:underline">Terms of Service</a>.
            </p>
          )}
          <button className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Socials Divider */}
        <div className="w-full max-w-md px-4 py-6">
          <div className="flex items-center">
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
            <p className="px-4 text-sm text-gray-500 dark:text-gray-400">OR</p>
            <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="w-full max-w-md space-y-3 px-4 pb-8">
          <button className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base font-medium leading-normal transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.578 12.27c0-.777-.07-1.537-.205-2.28H12v4.305h5.938c-.26 1.41-.41 1.687-1.2 2.585-1.144.633-2.613.91-4.738.91-3.645 0-6.598-2.953-6.598-6.598s2.953-6.598 6.598-6.598c2.09 0 3.824 1.04 4.88 2.315l3.43-3.43C19.86 2.16 17.595 0 12 0 5.373 0 0 5.373 0 12s5.373 12 12 12c4.545 0 8.04-1.83 10.578-4.738.633-2.242.961-4.752.961-7.492Z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>
           <button className="flex h-14 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark text-base font-medium leading-normal transition-colors hover:bg-gray-100 dark:hover:bg-gray-800">
             <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.13 13.211c-.053.003-.106.003-.162.003C14.73 13.214 13.06 11.23 13.06 9c0-2.43 1.89-4.32 4.07-4.32.75 0 1.44.22 1.98.57.17-.23.33-.47.47-.72-1.07-.63-2.38-1.05-3.8-1.05C12.4 3.48 9.92 6.13 9.92 9.17c0 2.22.95 3.86 2.37 5.14-1.6 1.25-3.8 1.13-4.82 1.13-1.4 0-2.82-.47-3.86-1.57-.02 2.19.7 4.29 2.11 5.76.99 1.05 2.25 1.63 3.63 1.63 1.21 0 2.37-.42 3.25-1.2.98.81 2.2 1.28 3.56 1.28.01 0 .01 0 .02 0 .01 0 .01 0 .02 0a4.347 4.347 0 003.17-1.47c-.7-.47-1.25-1.12-1.6-1.92a4.233 4.233 0 01-1.23-.15zM15.22 8.44c0 1.54 1.24 2.78 2.78 2.78s2.78-1.24 2.78-2.78-1.24-2.78-2.78-2.78-2.78 1.24-2.78 2.78z"></path>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;