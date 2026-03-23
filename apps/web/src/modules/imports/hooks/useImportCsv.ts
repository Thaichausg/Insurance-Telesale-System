import { useCallback } from 'react';
import { useImportsStore } from '../store/imports.store';
import { ImportApi } from '../api';
import { ImportLeadRow } from '../types';

export const useImportCsv = () => {
  const { setPreviewData, setProcessing, setResult, setError, resetAll, previewData, setStep } = useImportsStore();

  const handleFileUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n');
      
      if (lines.length <= 1) {
         setError('File CSV trống hoặc không có dữ liệu khách hàng.');
         return;
      }

      const parsedData: ImportLeadRow[] = lines.slice(1)
        .filter(line => line.trim().length > 0)
        .map((line, index) => {
          const values = line.split(',');
          // Mapping: Tên(0), SĐT(1), Nguồn(2), Sản phẩm(3), Tag(4)
          const customerName = values[0]?.trim() || '';
          const phoneNumber = values[1]?.trim() || '';
          const source = values[2]?.trim() || 'DIRECT';
          const interestProduct = values[3]?.trim() || '';
          const groupTag = values[4]?.trim() || '';

          const errors: string[] = [];
          if (!customerName) errors.push('Tên khách hàng trống');
          if (!phoneNumber) errors.push('Số điện thoại trống');
          if (phoneNumber && phoneNumber.length < 10) errors.push('SĐT không hợp lệ');

          return {
            id: `row-${index}`,
            customerName,
            phoneNumber,
            source,
            interestProduct,
            groupTag,
            isValid: errors.length === 0,
            errors
          };
        });

      setPreviewData(parsedData);
      setStep('PREVIEW');
    };
    reader.readAsText(file);
  }, [setPreviewData, setError, setStep]);

  const processImport = useCallback(async () => {
    const validLeads = previewData.filter(row => row.isValid);
    if (validLeads.length === 0) {
       setError('Không có dữ liệu hợp lệ để Import. Vui lòng kiểm tra lại file hoặc xóa các dòng lỗi.');
       return;
    }

    setProcessing(true);
    setError(null);

    try {
      const payload = {
        leads: validLeads.map(({ id, isValid, errors, ...rest }) => rest)
      };
      
      const result = await ImportApi.importLeads(payload);
      setResult(result);
      setStep('RESULT');
      return result;
    } catch (e: any) {
      setError(e.message || 'Hệ thống Backend gặp sự cố khi lưu dữ liệu Leads.');
      return null;
    } finally {
      setProcessing(false);
    }
  }, [previewData, setProcessing, setResult, setError, setStep]);

  return {
    handleFileUpload,
    processImport,
    reset: resetAll
  };
};
