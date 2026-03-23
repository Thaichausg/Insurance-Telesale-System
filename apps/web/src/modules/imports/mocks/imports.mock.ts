import { ImportLeadRow } from '../types';

export const MOCK_CSV_DATA: ImportLeadRow[] = [
  {
    id: 'row-1',
    customerName: 'Nguyễn Văn Mạnh',
    phoneNumber: '0988777666',
    source: 'Meta Ads',
    interestProduct: 'Bảo hiểm nhân thọ FWD',
    groupTag: 'VIP_K1',
    isValid: true,
  },
  {
    id: 'row-2',
    customerName: 'Trần Thị Hằng',
    phoneNumber: '0912345',
    source: 'Zalo OA',
    interestProduct: 'Gói sức khoẻ',
    groupTag: 'HOT',
    isValid: false,
    errors: ['Số điện thoại không hợp lệ']
  },
  {
    id: 'row-3',
    customerName: 'Phạm Minh',
    phoneNumber: '0334445556',
    source: 'Tiktok',
    interestProduct: 'Y tế nội trú',
    groupTag: '',
    isValid: true,
  }
];
