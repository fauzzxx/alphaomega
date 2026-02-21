-- Update payment_method constraint to allow new payment methods
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_payment_method_check;

ALTER TABLE orders ADD CONSTRAINT orders_payment_method_check 
CHECK (payment_method IN (
  'Cash on Delivery', 
  'Online Payment', 
  'Bank Transfer',
  'UPI Manual',
  'WhatsApp Manual'
));
