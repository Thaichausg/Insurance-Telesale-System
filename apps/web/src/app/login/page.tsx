import React from 'react';
import { LoginForm } from '@/modules/auth/components/LoginForm';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-slate-50 to-white">
      <LoginForm />
    </main>
  );
}
