import { api } from '@/lib/api-client';
import { SystemConfigModel } from '../types';

export const SystemConfigApi = {
  getConfig: (): Promise<SystemConfigModel> => 
    api.get<SystemConfigModel>('/system-config'),

  updateConfig: (data: SystemConfigModel): Promise<SystemConfigModel> => 
    api.put<SystemConfigModel>('/system-config', data),

  resetToDefault: (): Promise<SystemConfigModel> => 
    api.post<SystemConfigModel>('/system-config/reset', {}),
};
