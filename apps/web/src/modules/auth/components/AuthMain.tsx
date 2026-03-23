import React from 'react';
import { LoginForm } from './LoginForm';

export const AuthMain: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none"></div>
       <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[60%] bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>

       <div className="relative z-10 w-full flex flex-col items-center">
          <LoginForm />
          
          <div className="mt-12 text-center opacity-30 select-none hidden lg:block">
             <h2 className="text-[120px] font-black text-slate-900 leading-none tracking-tighter">ANTIGRAVITY</h2>
             <p className="text-sm font-bold tracking-[1em] text-slate-500 uppercase -mt-4">Insurance Telesale Hub</p>
          </div>
       </div>
    </div>
  );
};
