import { useState } from 'react';
import { SystemConfigApi } from '../api';
import { useSystemConfigStore } from '../store/system-config.store';
import { AiConfig, DistributionConfig, FollowUpConfig } from '../types';

export const useUpdateSystemConfig = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const store = useSystemConfigStore();

  const updateAi = async (data: AiConfig) => {
    setIsUpdating(true);
    const success = await SystemConfigApi.updateAi(data);
    if (success) store.updateAiConfig(data);
    setIsUpdating(false);
    return success;
  };

  const updateDist = async (data: DistributionConfig) => {
    setIsUpdating(true);
    const success = await SystemConfigApi.updateDistribution(data);
    if (success) store.updateDistributionConfig(data);
    setIsUpdating(false);
    return success;
  };

  const updateFollowUp = async (data: FollowUpConfig) => {
    setIsUpdating(true);
    const success = await SystemConfigApi.updateFollowUp(data);
    if (success) store.updateFollowUpConfig(data);
    setIsUpdating(false);
    return success;
  };

  return { updateAi, updateDist, updateFollowUp, isUpdating };
};
