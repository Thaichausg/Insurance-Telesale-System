import { LeadModel } from '../types';

export const MOCK_LEADS: LeadModel[] = [
  { id: 'LD001', name: 'Nguyễn Trần Phúc', phone: '0901111222', status: 'NEW', source: 'FACEBOOK', createdAt: '2026-03-20T08:00:00Z', notes: 'Khách để lại SDT trên bài quảng cáo bảo hiểm gói trẻ em' },
  { id: 'LD002', name: 'Lê Hoàng Đạo', phone: '0988777666', status: 'ASSIGNED', source: 'GOOGLE', assignedTo: 'usr-3', createdAt: '2026-03-21T09:15:00Z' },
  { id: 'LD003', name: 'Phạm Thị Thảo', phone: '0912345678', status: 'CALLING', source: 'ZALO', assignedTo: 'usr-3', createdAt: '2026-03-22T10:30:00Z' },
  { id: 'LD004', name: 'Trịnh Cường', phone: '0933212345', status: 'FOLLOW_UP', source: 'REFERRAL', assignedTo: 'usr-2', createdAt: '2026-03-21T14:00:00Z', notes: 'Đã báo giá, khách đang trao đổi với gia đình' },
  { id: 'LD005', name: 'Cao Văn Sơn', phone: '0945678901', status: 'SUCCESS', source: 'DIRECT', assignedTo: 'usr-2', createdAt: '2026-03-15T11:00:00Z', notes: 'Đã hoàn tất thanh toán phí đợt 1' },
  { id: 'LD006', name: 'Đoàn Minh Tú', phone: '0987654321', status: 'REJECTED', source: 'FACEBOOK', createdAt: '2026-03-10T15:20:00Z', notes: 'Chê phí bảo hiểm quá cao' },
  { id: 'LD007', name: 'Lý Quốc An', phone: '0911223344', status: 'EXPIRED', source: 'GOOGLE', createdAt: '2026-02-01T08:00:00Z', notes: 'Lead quá 30 ngày không liên lạc được' },
  { id: 'LD008', name: 'Châu Cẩm Ly', phone: '0909999888', status: 'BUSY', source: 'ZALO', assignedTo: 'usr-3', createdAt: '2026-03-23T08:30:00Z', notes: 'Máy bận liên tục 3 lần' },
  { id: 'LD009', name: 'Trần Bích Phương', phone: '0966555444', status: 'NO_ANSWER', source: 'FACEBOOK', assignedTo: 'usr-3', createdAt: '2026-03-23T09:40:00Z' },
  { id: 'LD010', name: 'Hoàng Quốc Việt', phone: '0977112233', status: 'CALL_BACK', source: 'REFERRAL', assignedTo: 'usr-2', createdAt: '2026-03-23T11:00:00Z', notes: 'Khách hẹn gọi lại vào sáng mai lúc 9h' },
];
