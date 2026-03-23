import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/use-auth';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login, isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 animate-in fade-in zoom-in duration-300">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-indigo-100 mb-4">
           A
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Chào mừng trở lại!</h1>
        <p className="text-slate-400 font-medium text-sm mt-1">Đăng nhập để quản lý công việc Telesale.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-1.5 ml-1">Email Tài Khoản</label>
          <input
            {...register('email')}
            type="email"
            placeholder="admin@antigravity.com"
            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-600/20 focus:bg-white outline-none transition-all placeholder:text-slate-300 font-medium"
          />
          {errors.email && <p className="mt-2 text-xs font-bold text-rose-500 animate-in slide-in-from-top-1 ml-1">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5 ml-1">
             <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Mật Khẩu</label>
             <button type="button" className="text-[10px] font-bold text-indigo-600 hover:underline">Quên mật khẩu?</button>
          </div>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••••"
            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:border-indigo-600/20 focus:bg-white outline-none transition-all placeholder:text-slate-300"
          />
          {errors.password && <p className="mt-2 text-xs font-bold text-rose-500 animate-in slide-in-from-top-1 ml-1">{errors.password.message}</p>}
        </div>

        {error && (
          <div className="p-4 bg-rose-50 border-2 border-rose-100 rounded-2xl flex items-center gap-3 animate-in shake duration-300">
             <span className="text-lg">🚫</span>
             <p className="text-xs font-bold text-rose-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
        >
          {isLoading ? (
             <div className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>ĐANG XÁC THỰC...</span>
             </div>
          ) : (
             <span>ĐĂNG NHẬP NGAY</span>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-slate-50 text-center">
         <p className="text-xs font-medium text-slate-400">Chưa có tài khoản? <span className="text-indigo-600 font-bold hover:underline cursor-pointer">Liên hệ Admin</span></p>
      </div>
    </div>
  );
};
