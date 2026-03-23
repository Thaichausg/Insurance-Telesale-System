import { ExportFormat, ExportStatus } from '../types';

export const EXPORT_FORMATS: ExportFormat[] = ['CSV', 'EXCEL', 'PDF'];

export const STATUS_COLORS: Record<ExportStatus, string> = {
  PENDING: 'bg-slate-100 text-slate-600',
  PROCESSING: 'bg-amber-100 text-amber-600 animate-pulse',
  COMPLETED: 'bg-emerald-100 text-emerald-700',
  FAILED: 'bg-rose-100 text-rose-700'
};
