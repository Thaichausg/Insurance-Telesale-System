import { redirect } from 'next/navigation';

export default function RootPage() {
  // Tự động điều hướng vào Dashboard/Login dựa trên Middleware xử lý
  redirect('/admin/telesales');
}
