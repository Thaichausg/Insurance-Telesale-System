-- 1. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'TELESALE', -- SUPER_ADMIN, MANAGER, ADMIN, TELESALE
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Leads Table
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    source VARCHAR(100) DEFAULT 'DIRECT',
    group_tag VARCHAR(100),
    interest_product VARCHAR(255),
    status VARCHAR(50) DEFAULT 'NEW', -- NEW, IN_PROGRESS, SUCCESS, REJECTED, FOLLOW_UP
    assigned_to_id UUID REFERENCES users(id),
    created_by_id UUID REFERENCES users(id),
    owner_type VARCHAR(20) DEFAULT 'TENANT', -- TENANT, USER
    note TEXT,
    deadline_at TIMESTAMP WITH TIME ZONE,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create System Configuration Table
CREATE TABLE IF NOT EXISTS system_configs (
    id VARCHAR(50) PRIMARY KEY, -- 'GLOBAL_AI', 'GLOBAL_DISTRIBUTION', etc.
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID REFERENCES users(id)
);

-- 4. Create AI Reply Templates Table
CREATE TABLE IF NOT EXISTS ai_reply_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword VARCHAR(255) NOT NULL,
    response TEXT NOT NULL,
    suggested_actions JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Sample Data - Super Admin (Password: 'password123' - bcrypt hash example)
INSERT INTO users (email, password_hash, name, role) 
VALUES ('admin@antigravity.local', '$2b$10$ExvL6Y.E.m.S5Z0k5s6G.e/mJzB4W9l7vE4z7F/Z7/u.kP6A1aO2q', 'System Admin', 'SUPER_ADMIN')
ON CONFLICT (email) DO NOTHING;

-- 6. Sample AI Config
INSERT INTO system_configs (id, config_key, config_value)
VALUES ('GLOBAL_AI', 'ai_settings', '{"provider": "GEMINI", "model": "gemini-1.5-pro", "temperature": 0.7, "maxTokens": 1000}')
ON CONFLICT (id) DO NOTHING;

-- 7. Sample Templates
INSERT INTO ai_reply_templates (keyword, response, suggested_actions)
VALUES 
('Bảo hiểm', 'Chào bạn, chúng tôi chuyên cung cấp giải pháp bảo hiểm sức khỏe FWD Care. Bạn quan tâm nội trú hay ngoại trú?', '["Gửi báo giá", "Hẹn gọi lại"]'),
('FWD', 'FWD là tập đoàn bảo hiểm hàng đầu Châu Á với quy trình bồi thường minh bạch.', '["Xem video giới thiệu"]');
