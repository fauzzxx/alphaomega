-- Add missing columns to orders table
-- Run this in your Supabase SQL Editor

ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS order_reference VARCHAR(50),
ADD COLUMN IF NOT EXISTS source VARCHAR(20) DEFAULT 'website';

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_reference ON orders(order_reference);
