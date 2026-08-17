-- ============================================================================
-- Supabase Full Database Schema Migration for "المهندس الذكي لكهرباء السيارات"
-- Platform: DevForge AI / AutoElec Pro
-- ============================================================================

-- Enable required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- ----------------------------------------------------------------------------
-- ENUMS
-- ----------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM ('admin', 'engineer', 'technician', 'student');
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'workshop', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'expired', 'past_due');
CREATE TYPE system_category AS ENUM (
  'engine',
  'transmission',
  'abs_esp',
  'airbag_srs',
  'bcm_body',
  'steering_eps',
  'can_bus',
  'hvac',
  'hybrid_ev'
);
CREATE TYPE dtc_severity AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE course_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE exam_status AS ENUM ('passed', 'failed', 'in_progress');

-- ----------------------------------------------------------------------------
-- 1. PROFILES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  workshop_name TEXT,
  role user_role NOT NULL DEFAULT 'technician',
  points INTEGER NOT NULL DEFAULT 0,
  bio TEXT,
  country TEXT,
  city TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 2. CAR_COMPANIES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS car_companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  country_origin TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. CAR_MODELS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS car_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES car_companies(id) ON DELETE CASCADE,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  code TEXT NOT NULL,
  body_type TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. MODEL_YEARS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS model_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_model_id UUID NOT NULL REFERENCES car_models(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  generation TEXT,
  obd_protocol TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. ENGINES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS engines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_model_id UUID REFERENCES car_models(id) ON DELETE CASCADE,
  engine_code TEXT NOT NULL,
  displacement_l NUMERIC(3, 1) NOT NULL,
  fuel_type TEXT NOT NULL DEFAULT 'gasoline',
  cylinders INTEGER NOT NULL DEFAULT 4,
  valves INTEGER NOT NULL DEFAULT 16,
  aspiration TEXT DEFAULT 'naturally_aspirated',
  ecu_type TEXT,
  injection_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 6. VEHICLE_SYSTEMS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vehicle_systems (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category system_category NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  description_ar TEXT,
  icon_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 7. DTC_CODES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS dtc_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  system_id UUID REFERENCES vehicle_systems(id) ON DELETE SET NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  meaning_ar TEXT NOT NULL,
  symptoms_ar TEXT[] DEFAULT '{}',
  possible_causes_ar TEXT[] DEFAULT '{}',
  diagnostic_steps_ar TEXT[] DEFAULT '{}',
  severity dtc_severity NOT NULL DEFAULT 'medium',
  freeze_frame_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 8. SENSORS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sensors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_id UUID REFERENCES vehicle_systems(id) ON DELETE SET NULL,
  code TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  function_desc_ar TEXT NOT NULL,
  location_desc_ar TEXT,
  normal_voltage_range TEXT,
  normal_resistance_range TEXT,
  waveform_type TEXT,
  symptoms_of_failure_ar TEXT[] DEFAULT '{}',
  testing_procedure_ar TEXT[] DEFAULT '{}',
  pinout_info JSONB DEFAULT '{}'::jsonb,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 9. ACTUATORS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS actuators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_id UUID REFERENCES vehicle_systems(id) ON DELETE SET NULL,
  code TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  function_desc_ar TEXT NOT NULL,
  control_type TEXT,
  normal_resistance TEXT,
  normal_duty_cycle TEXT,
  testing_procedure_ar TEXT[] DEFAULT '{}',
  common_faults_ar TEXT[] DEFAULT '{}',
  pinout_info JSONB DEFAULT '{}'::jsonb,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 10. LIVE_DATA_PARAMS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS live_data_params (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_id UUID REFERENCES vehicle_systems(id) ON DELETE SET NULL,
  pid_hex TEXT UNIQUE NOT NULL,
  name_ar TEXT NOT NULL,
  name_en TEXT NOT NULL,
  unit TEXT NOT NULL,
  min_normal NUMERIC NOT NULL,
  max_normal NUMERIC NOT NULL,
  idle_typical_value NUMERIC,
  load_typical_value NUMERIC,
  formula_expression TEXT,
  description_ar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 11. WIRING_DIAGRAMS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wiring_diagrams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_company_id UUID REFERENCES car_companies(id) ON DELETE CASCADE,
  car_model_id UUID REFERENCES car_models(id) ON DELETE CASCADE,
  model_year_id UUID REFERENCES model_years(id) ON DELETE CASCADE,
  system_id UUID REFERENCES vehicle_systems(id) ON DELETE SET NULL,
  title_ar TEXT NOT NULL,
  title_en TEXT NOT NULL,
  diagram_svg TEXT,
  pdf_url TEXT,
  image_url TEXT,
  pinout_details JSONB DEFAULT '{}'::jsonb,
  wire_color_legend JSONB DEFAULT '{}'::jsonb,
  is_hd BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 12. DIAGNOSIS_TREES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS diagnosis_trees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  system_id UUID REFERENCES vehicle_systems(id) ON DELETE CASCADE,
  dtc_id UUID REFERENCES dtc_codes(id) ON DELETE SET NULL,
  title_ar TEXT NOT NULL,
  symptom_summary TEXT NOT NULL,
  initial_step_id UUID,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 13. DIAGNOSIS_QUESTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS diagnosis_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tree_id UUID NOT NULL REFERENCES diagnosis_trees(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  question_ar TEXT NOT NULL,
  measurement_tool TEXT,
  expected_value TEXT,
  yes_next_question_id UUID REFERENCES diagnosis_questions(id) ON DELETE SET NULL,
  no_next_question_id UUID REFERENCES diagnosis_questions(id) ON DELETE SET NULL,
  yes_solution_text_ar TEXT,
  no_solution_text_ar TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Foreign Key constraint update for diagnosis_trees.initial_step_id
ALTER TABLE diagnosis_trees
  ADD CONSTRAINT fk_initial_step
  FOREIGN KEY (initial_step_id) REFERENCES diagnosis_questions(id) ON DELETE SET NULL;

-- ----------------------------------------------------------------------------
-- 14. DIAGNOSIS_RESULTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS diagnosis_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tree_id UUID REFERENCES diagnosis_trees(id) ON DELETE SET NULL,
  car_company_id UUID REFERENCES car_companies(id) ON DELETE SET NULL,
  car_model_id UUID REFERENCES car_models(id) ON DELETE SET NULL,
  year INTEGER,
  dtc_code TEXT,
  symptoms_input TEXT,
  steps_taken JSONB DEFAULT '[]'::jsonb,
  final_solution_ar TEXT NOT NULL,
  is_resolved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 15. OBD_SCANS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS obd_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  car_model_id UUID REFERENCES car_models(id) ON DELETE SET NULL,
  vin TEXT,
  protocol_used TEXT,
  dtc_codes_found TEXT[] DEFAULT '{}',
  live_data_snapshot JSONB DEFAULT '{}'::jsonb,
  freeze_frame JSONB DEFAULT '{}'::jsonb,
  notes TEXT,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 16. REPAIR_CASES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS repair_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  car_company_id UUID REFERENCES car_companies(id) ON DELETE SET NULL,
  car_model_id UUID REFERENCES car_models(id) ON DELETE SET NULL,
  year INTEGER NOT NULL,
  dtc_code TEXT,
  title_ar TEXT NOT NULL,
  symptom_ar TEXT NOT NULL,
  root_cause_ar TEXT NOT NULL,
  diagnostic_steps_ar TEXT[] DEFAULT '{}',
  solution_ar TEXT NOT NULL,
  time_spent_minutes INTEGER,
  total_cost_usd NUMERIC(10, 2),
  images_urls TEXT[] DEFAULT '{}',
  likes_count INTEGER NOT NULL DEFAULT 0,
  is_verified_by_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 17. AI_DIAGNOSIS_HISTORY
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_diagnosis_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  car_info TEXT,
  dtc_codes TEXT[],
  user_prompt TEXT NOT NULL,
  ai_response_markdown TEXT NOT NULL,
  recommended_steps TEXT[] DEFAULT '{}',
  tokens_used INTEGER,
  model_name TEXT DEFAULT 'gemini-2.5-flash',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 18. VEHICLE_COMMON_FAULTS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS vehicle_common_faults (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_company_id UUID REFERENCES car_companies(id) ON DELETE CASCADE,
  car_model_id UUID REFERENCES car_models(id) ON DELETE CASCADE,
  year_from INTEGER,
  year_to INTEGER,
  system_id UUID REFERENCES vehicle_systems(id) ON DELETE SET NULL,
  fault_title_ar TEXT NOT NULL,
  symptom_ar TEXT NOT NULL,
  cause_ar TEXT NOT NULL,
  repair_action_ar TEXT NOT NULL,
  bulletin_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 19. COURSES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_ar TEXT NOT NULL,
  title_en TEXT,
  description_ar TEXT NOT NULL,
  instructor_name TEXT NOT NULL,
  level course_level NOT NULL DEFAULT 'beginner',
  duration_hours NUMERIC(5, 1) NOT NULL DEFAULT 0,
  thumbnail_url TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  enrolled_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 20. LESSONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  title_ar TEXT NOT NULL,
  summary_ar TEXT,
  video_url TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  pdf_attachment_url TEXT,
  is_free_preview BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 21. ARTICLES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  category TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  snippet_ar TEXT NOT NULL,
  content_markdown TEXT NOT NULL,
  cover_image_url TEXT,
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  views_count INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 22. EXPERT_VIDEOS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS expert_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  youtube_id TEXT UNIQUE NOT NULL,
  title_ar TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  channel_name TEXT NOT NULL DEFAULT 'سيارتك مع عبدالحق',
  sensor_id UUID REFERENCES sensors(id) ON DELETE SET NULL,
  actuator_id UUID REFERENCES actuators(id) ON DELETE SET NULL,
  related_dtc_codes TEXT[] DEFAULT '{}',
  views_count INTEGER DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 23. EXAMS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  title_ar TEXT NOT NULL,
  description_ar TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  passing_score INTEGER NOT NULL DEFAULT 80,
  questions_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 24. CERTIFICATES
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  exam_id UUID REFERENCES exams(id) ON DELETE SET NULL,
  verification_code TEXT UNIQUE NOT NULL,
  title_ar TEXT NOT NULL,
  score_percentage NUMERIC(5, 2) NOT NULL,
  pdf_url TEXT,
  issued_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 25. NOTIFICATIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title_ar TEXT NOT NULL,
  message_ar TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  link_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 26. SUBSCRIPTIONS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier subscription_tier NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  payment_provider TEXT,
  provider_subscription_id TEXT,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE OPTIMIZATION
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_car_models_company_id ON car_models(company_id);
CREATE INDEX IF NOT EXISTS idx_model_years_car_model_id ON model_years(car_model_id);
CREATE INDEX IF NOT EXISTS idx_engines_car_model_id ON engines(car_model_id);

CREATE INDEX IF NOT EXISTS idx_dtc_codes_code ON dtc_codes(code);
CREATE INDEX IF NOT EXISTS idx_dtc_codes_system_id ON dtc_codes(system_id);
CREATE INDEX IF NOT EXISTS idx_dtc_codes_title_trgm ON dtc_codes USING gin (title_ar gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_sensors_code ON sensors(code);
CREATE INDEX IF NOT EXISTS idx_sensors_system_id ON sensors(system_id);

CREATE INDEX IF NOT EXISTS idx_actuators_code ON actuators(code);
CREATE INDEX IF NOT EXISTS idx_actuators_system_id ON actuators(system_id);

CREATE INDEX IF NOT EXISTS idx_live_data_pid ON live_data_params(pid_hex);
CREATE INDEX IF NOT EXISTS idx_live_data_system ON live_data_params(system_id);

CREATE INDEX IF NOT EXISTS idx_wiring_diagrams_car_model ON wiring_diagrams(car_model_id);
CREATE INDEX IF NOT EXISTS idx_wiring_diagrams_system ON wiring_diagrams(system_id);

CREATE INDEX IF NOT EXISTS idx_diagnosis_questions_tree ON diagnosis_questions(tree_id);
CREATE INDEX IF NOT EXISTS idx_diagnosis_results_user ON diagnosis_results(user_id);
CREATE INDEX IF NOT EXISTS idx_obd_scans_user ON obd_scans(user_id);

CREATE INDEX IF NOT EXISTS idx_repair_cases_author ON repair_cases(author_id);
CREATE INDEX IF NOT EXISTS idx_repair_cases_dtc ON repair_cases(dtc_code);

CREATE INDEX IF NOT EXISTS idx_ai_history_user ON ai_diagnosis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_common_faults_model ON vehicle_common_faults(car_model_id);

CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON lessons(course_id, order_index);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON certificates(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to handle updated_at timestamps automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER trg_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_car_companies_updated_at BEFORE UPDATE ON car_companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_car_models_updated_at BEFORE UPDATE ON car_models FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_dtc_codes_updated_at BEFORE UPDATE ON dtc_codes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_sensors_updated_at BEFORE UPDATE ON sensors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_actuators_updated_at BEFORE UPDATE ON actuators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_wiring_diagrams_updated_at BEFORE UPDATE ON wiring_diagrams FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_repair_cases_updated_at BEFORE UPDATE ON repair_cases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_courses_updated_at BEFORE UPDATE ON courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_articles_updated_at BEFORE UPDATE ON articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create profile on Auth Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    'technician'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all 26 tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE engines ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE dtc_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sensors ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuators ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_data_params ENABLE ROW LEVEL SECURITY;
ALTER TABLE wiring_diagrams ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnosis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE obd_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE repair_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_diagnosis_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_common_faults ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE expert_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Helper Admin Check Function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles
CREATE POLICY "Public profiles are viewable by authenticated users" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Reference Data (Public / Authenticated Read, Admin Write)
CREATE POLICY "Car companies viewable by all" ON car_companies FOR SELECT TO authenticated USING (true);
CREATE POLICY "Car models viewable by all" ON car_models FOR SELECT TO authenticated USING (true);
CREATE POLICY "Model years viewable by all" ON model_years FOR SELECT TO authenticated USING (true);
CREATE POLICY "Engines viewable by all" ON engines FOR SELECT TO authenticated USING (true);
CREATE POLICY "Vehicle systems viewable by all" ON vehicle_systems FOR SELECT TO authenticated USING (true);
CREATE POLICY "DTC codes viewable by all" ON dtc_codes FOR SELECT TO authenticated USING (true);
CREATE POLICY "Sensors viewable by all" ON sensors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Actuators viewable by all" ON actuators FOR SELECT TO authenticated USING (true);
CREATE POLICY "Live data params viewable by all" ON live_data_params FOR SELECT TO authenticated USING (true);
CREATE POLICY "Wiring diagrams viewable by all" ON wiring_diagrams FOR SELECT TO authenticated USING (true);
CREATE POLICY "Diagnosis trees viewable by all" ON diagnosis_trees FOR SELECT TO authenticated USING (true);
CREATE POLICY "Diagnosis questions viewable by all" ON diagnosis_questions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Vehicle common faults viewable by all" ON vehicle_common_faults FOR SELECT TO authenticated USING (true);
CREATE POLICY "Courses viewable by all" ON courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Lessons viewable by all" ON lessons FOR SELECT TO authenticated USING (true);
CREATE POLICY "Articles viewable by all" ON articles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Expert videos viewable by all" ON expert_videos FOR SELECT TO authenticated USING (true);
CREATE POLICY "Exams viewable by all" ON exams FOR SELECT TO authenticated USING (true);

-- User Private Data (Owner Access Only)
CREATE POLICY "Users view own diagnosis results" ON diagnosis_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own diagnosis results" ON diagnosis_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own obd scans" ON obd_scans FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own obd scans" ON obd_scans FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own ai history" ON ai_diagnosis_history FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users insert own ai history" ON ai_diagnosis_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users view own certificates" ON certificates FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users view own notifications" ON notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users view own subscriptions" ON subscriptions FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Repair Cases (Community Shared Data)
CREATE POLICY "Repair cases viewable by all" ON repair_cases FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can create repair cases" ON repair_cases FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own repair cases" ON repair_cases FOR UPDATE TO authenticated USING (auth.uid() = author_id);

-- Admin Global Override Policies
CREATE POLICY "Admins full control car_companies" ON car_companies FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins full control car_models" ON car_models FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins full control dtc_codes" ON dtc_codes FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins full control sensors" ON sensors FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins full control actuators" ON actuators FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins full control wiring_diagrams" ON wiring_diagrams FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins full control courses" ON courses FOR ALL TO authenticated USING (public.is_admin());
CREATE POLICY "Admins full control lessons" ON lessons FOR ALL TO authenticated USING (public.is_admin());
