-- Add the missing payment_screenshot_url column
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_screenshot_url TEXT;
