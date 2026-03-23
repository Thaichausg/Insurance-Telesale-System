import { ReplyTemplate } from '../types';

export const MOCK_REPLY_TEMPLATES: ReplyTemplate[] = [
  {
    id: 'tpl-1',
    keyword: 'không quan tâm',
    response: 'Dạ, em cảm ơn anh/chị đã chia sẻ. Thực ra thời điểm này chưa quan tâm là điều rất bình thường. Nhưng anh chị có thể để em kết bạn Zalo gửi biểu phí tham khảo, sau này lỡ cần dùng đến thì có ngay người hỗ trợ đúng không ạ?',
    isActive: true,
  },
  {
    id: 'tpl-2',
    keyword: 'đã có bảo hiểm',
    response: 'Tuyệt vời quá anh/chị ạ! Rất ít người có ý thức bảo vệ sớm như mình. Anh/chị cho em hỏi gói của mình đã có bảo trợ y tế nội trú và nha khoa toàn diện chưa ạ? Bên em đang có gói tích hợp bù đắp chi phí mà rất nhiều khách mua thêm.',
    isActive: true,
  },
  {
    id: 'tpl-3',
    keyword: 'để xem thêm',
    response: 'Dạ vâng, để xem xét kỹ là rất cần thiết với quyết định sức khoẻ. Em xin phép gửi qua Zalo bảng minh hoạ chi tiết các Quyền Lợi và Loại Trừ, tối nay anh/chị rảnh em xin phép gọi hướng dẫn qua 2 phút nhé?',
    isActive: true,
  }
];
