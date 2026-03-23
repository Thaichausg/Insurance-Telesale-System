# Module List - Insurance Telesale System

Danh sách các module đã được scaffold theo chuẩn **Vibecode Professional + Antigravity Module Architecture**.

| STT | Module Name | Tính năng chính | Frontend Trọng tâm | Backend Trọng tâm |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **`auth`** | Xác thực, Quản lý Token | Login, Guard, Token Store | JWT, Passport, Login Flow |
| 2 | **`users`** | Quản lý Nhân sự & Role | User List, Role Modal | User Entity, DTO Valids |
| 3 | **`tenant`** | Đa đại lý (Multi-tenancy) | Partner List, Auto-Slug | Tenant Entity, Patch Status |
| 4 | **`leads`** | Quản lý Dữ liệu KH | Lead Grid, Edit Status | Lead Repository, Interfaces |
| 5 | **`telesale-management`** | Quy trình Vận hành Chính | Call UI, Phân Lead RoundRobin | Distribution Logic Service |
| 6 | **`ai-assistant`** | Auto-Reply & LLM Chat | AI Suggestion Box, Keywords | Hybrid Logic (Rule or LLM) |
| 7 | **`reports`** | Dashboad & Analytics | KPI Cards, Performance Table | Data Aggregation, Global Sum |
| 8 | **`imports`** | Tải dữ liệu hàng loạt | CSV Parser (Browser side) | Batch-Insert, Check Dùng SĐT |
| 9 | **`exports`** | Kết xuất dữ liệu rời | Download Table, Status Sync | Background Worker Center |
| 10 | **`system-config`** | Cấu hình tham số hệ thống | API Keys, App Params Store | Generic Config Manager |

---
*Tình trạng: Tất cả các module đã hoàn thiện Scaffold 100% (Mock-Data Flow).*