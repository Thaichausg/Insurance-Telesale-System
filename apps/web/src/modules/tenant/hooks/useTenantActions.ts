import { useTenantStore } from '../store/tenant.store';
import { TenantApi } from '../api';
import { CreateTenantInput, UpdateTenantInput } from '../types';

export const useTenantActions = () => {
  const { tenants, setTenants, closeModal } = useTenantStore();

  const handleCreate = async (data: CreateTenantInput) => {
    try {
      const newTenant = await TenantApi.createTenant(data);
      setTenants([newTenant, ...tenants]);
      closeModal();
    } catch (error) {
      alert('Lỗi khi tạo đối tác');
    }
  };

  const handleUpdate = async (id: string, data: UpdateTenantInput) => {
    try {
      const updated = await TenantApi.updateTenant(id, data);
      setTenants(tenants.map(t => t.id === id ? updated : t));
      closeModal();
    } catch (error) {
      alert('Lỗi khi cập nhật đối tác');
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const updated = await TenantApi.toggleStatus(id);
      setTenants(tenants.map(t => t.id === id ? updated : t));
    } catch (error) {
      alert('Lỗi khi thay đổi trạng thái');
    }
  };

  return { handleCreate, handleUpdate, handleToggle };
};
