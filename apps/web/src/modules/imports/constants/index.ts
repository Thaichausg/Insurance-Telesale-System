export const IMPORT_COLUMNS = [
  { key: 'customerName', label: 'Tên Khách Hàng', required: true },
  { key: 'phoneNumber', label: 'Số Điện Thoại', required: true },
  { key: 'source', label: 'Nguồn (Facebook, Ads, SMS...)', required: false },
  { key: 'interestProduct', label: 'Sản Phẩm Quan Tâm', required: false },
  { key: 'groupTag', label: 'Gắn Thẻ / Nhãn', required: false }
];

export const MAX_IMPORT_ROWS = 500;
export const MAX_FILE_SIZE_MB = 2;
