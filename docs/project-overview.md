# Project Overview: Insurance Telesale System

## Giới thiệu
Hệ thống quản lý quy trình telesale cho sản phẩm bảo hiểm, hỗ trợ từ khâu nhận lead, gọi điện tư vấn, cập nhật trạng thái, đến chốt sale, tái tục hợp đồng.

## Mục tiêu
- **Quản trị Lead:** Phân bổ lead tự động/thủ công cho telesale agent hiệu quả.
- **Tương tác Sale:** Hỗ trợ kịch bản gọi (call script), ghi âm, nhắc lịch gọi lại.
- **Báo cáo:** Dashboard realtime, đo lường KPI (tỷ lệ chốt, thời gian gọi).
- **Phân quyền:** Super Admin, Manager, Team Leader, Agent.

## Tech Stack
- **Frontend:** Next.js, React, Tailwind CSS, TypeScript
- **Backend:** NestJS, TypeORM/Prisma, PostgreSQL, TypeScript
- **Architecture:** Module-based Architecture

## Nguyên tắc thiết kế (Core Principles)
- Cô lập module (High cohesion, low coupling).
- Mọi logic nghiệp vụ đóng gói gọn gàng trong thư mục của nó.
- Tái sử dụng thông qua các Shared Modules thay vì cross-import.
