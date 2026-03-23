# Coding Rules

Dự án áp dụng kiến trúc Module-based nghiêm ngặt.

## 1. Tính độc lập của Module
- **Tuyệt đối KHÔNG** import chéo giữa các module nghiệp vụ nội bộ (No cross-importing internal files).
- Giao tiếp giữa các module phải thông qua các Public API / Services được export tường minh qua `index.ts` của module đó.
- *Ví dụ:* Module `leads` không được import `src/modules/auth/services/auth.internal.service.ts`. Chỉ được phép import nội dung từ `src/modules/auth/index.ts`.

## 2. Cấu trúc một Module
Mỗi module sẽ có cấu trúc đầy đủ từ interface, type, hooks (Web), service (API), repository:

### API (NestJS)
```
[module-name]/
├── controllers/
├── services/
├── dto/
├── entities/ (hoặc models/)
├── interfaces/
├── [module-name].module.ts
└── index.ts (File ĐỘC NHẤT để export các public service/type)
```

### Web (Next.js)
```
[module-name]/
├── components/
├── hooks/
├── services/ (API calls)
├── types/
├── store/
└── index.ts (Public export)
```

## 3. Naming Convention
- **Thư mục:** `kebab-case` (ví dụ: `telesale-management`).
- **File:** `kebab-case` kèm loại file (ví dụ: `lead.service.ts`, `data-table.component.tsx`).
- **Class/Interface/Type/Component:** `PascalCase`.
- **Hàm/Biến:** `camelCase`.

## 4. State Management & Data Fetching
- **Web:** Dùng Server Components (nếu có thể) và các thư viện như SWR / React Query cho fetching dữ liệu. Hook phải gói gọn trong thư mục của Module đó.
- **API:** Tuân thủ Controller -> Service -> Repository pattern.
