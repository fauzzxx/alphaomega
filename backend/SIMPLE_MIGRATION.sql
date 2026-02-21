-- SIMPLE MIGRATION: Add order_reference and source columns
-- Copy ONLY these lines and run them in Supabase SQL Editor

ALTER TABLE orders ADD COLUMN order_reference VARCHAR(50);
ALTER TABLE orders ADD COLUMN source VARCHAR(20) DEFAULT 'website';
CREATE INDEX idx_orders_order_reference ON orders(order_reference);
