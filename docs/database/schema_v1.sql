-- =========================================================================================
-- MODULE: PLATFORM SETTINGS & POLICY CONFIGURATION
-- =========================================================================================

-- ENUMS for Platform Settings
CREATE TYPE setting_data_type AS ENUM ('STRING', 'INTEGER', 'BOOLEAN', 'JSON', 'DECIMAL');

-- 1. Platform Settings Table
CREATE TABLE platform_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_group VARCHAR(50) NOT NULL,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    data_type setting_data_type NOT NULL,
    is_editable_by_ta BOOLEAN DEFAULT false,
    description TEXT,
    updated_by UUID, -- FK to Users Table (assumed to exist)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Feature Flags Table
CREATE TABLE feature_flags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_name VARCHAR(100) UNIQUE NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    description TEXT,
    updated_by UUID, -- FK to Users Table
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Audit Logs Table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID NOT NULL, -- FK to Users Table
    action VARCHAR(100) NOT NULL,
    target_module VARCHAR(100) NOT NULL,
    target_id UUID, -- Optional, ID of the affected record
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- =========================================================================================
-- MODULE: REFERRAL REWARD MANAGEMENT
-- =========================================================================================

-- ENUMS for Referral Management
CREATE TYPE reward_type_enum AS ENUM ('FIXED_CASH', 'PERCENTAGE', 'VOUCHER');
CREATE TYPE campaign_status_enum AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE');
CREATE TYPE owner_role_enum AS ENUM ('JAMAAH', 'MUTAWWIF', 'AGENCY');
CREATE TYPE conversion_status_enum AS ENUM ('REGISTERED', 'BOOKED', 'CANCELLED');
CREATE TYPE reward_status_enum AS ENUM ('PENDING_REVIEW', 'ELIGIBLE', 'APPROVED', 'REJECTED', 'REVERSED');
CREATE TYPE finance_payout_status_enum AS ENUM ('QUEUED', 'PROCESSING', 'PAID', 'FAILED');

-- 4. Referral Campaigns Table
CREATE TABLE referral_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    agency_id UUID, -- Nullable. If Null, it's a platform-wide campaign. FK to Agencies table.
    reward_type reward_type_enum NOT NULL,
    reward_value DECIMAL(12, 2) NOT NULL,
    status campaign_status_enum DEFAULT 'DRAFT',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Referral Codes Table
CREATE TABLE referral_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL, -- FK to Users Table
    owner_role owner_role_enum NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    campaign_id UUID NOT NULL REFERENCES referral_campaigns(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- 6. Referral Attributions Table (Snapshot when someone uses the code)
CREATE TABLE referral_attributions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referral_code_id UUID NOT NULL REFERENCES referral_codes(id),
    invited_user_id UUID NOT NULL, -- FK to Users Table (The person who was referred)
    related_booking_id UUID, -- FK to Bookings Table (Once they make a booking)
    conversion_status conversion_status_enum DEFAULT 'REGISTERED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Referral Rewards Table (Owned by Admin Ops for Validation)
CREATE TABLE referral_rewards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attribution_id UUID UNIQUE NOT NULL REFERENCES referral_attributions(id),
    reward_amount_calculated DECIMAL(12, 2) NOT NULL,
    status reward_status_enum DEFAULT 'PENDING_REVIEW',
    reason_code VARCHAR(100), -- E.g., 'FRAUD_DETECTED', 'DUPLICATE_ACCOUNT'
    approved_by UUID, -- FK to Users Table (Ops Staff)
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Finance Handoff Queue Table (Owned by Finance for Payout Execution)
CREATE TABLE finance_handoff_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    referral_reward_id UUID UNIQUE NOT NULL REFERENCES referral_rewards(id),
    payout_status finance_payout_status_enum DEFAULT 'QUEUED',
    finance_staff_id UUID, -- FK to Users Table (Finance Staff who processed the payout)
    paid_at TIMESTAMP WITH TIME ZONE,
    payment_reference VARCHAR(255), -- ID from payment gateway or internal receipt
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_platform_settings_key ON platform_settings(setting_key);
CREATE INDEX idx_feature_flags_name ON feature_flags(module_name);
CREATE INDEX idx_referral_codes_code ON referral_codes(code);
CREATE INDEX idx_referral_attributions_user ON referral_attributions(invited_user_id);
CREATE INDEX idx_finance_handoff_status ON finance_handoff_queue(payout_status);
