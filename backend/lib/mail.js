import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
        console.error('❌ Email Server Error:', error);
    } else {
        console.log('✅ Email Server is ready to send messages');
    }
});

/**
 * Sends an order notification email to the owner
 * @param {Object} orderData The order details
 */
export async function sendOrderNotification(orderData) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️ Email credentials not set. Skipping email notification.');
        console.log('Order Details:', JSON.stringify(orderData, null, 2));
        return;
    }

    const {
        order_reference,
        customer_name,
        customer_email,
        customer_phone,
        items,
        total,
        payment_method
    } = orderData;

    const itemsHtml = items.map(item => `
        <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} (${item.size})</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">x${item.quantity}</td>
            <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${item.price * item.quantity}</td>
        </tr>
    `).join('');

    const mailOptions = {
        from: `"Alpha & Omega Store" <${process.env.EMAIL_USER}>`,
        to: process.env.OWNER_EMAIL || process.env.EMAIL_USER,
        subject: `🛒 New Order Received: ${order_reference}`,
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #gold; border-radius: 10px; overflow: hidden;">
                <div style="background-color: #000; color: #D4AF37; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; font-family: serif; letter-spacing: 2px;">ALPHA & Ω</h1>
                    <p style="margin: 5px 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">New Order Alert</p>
                </div>
                
                <div style="padding: 30px; background-color: #fff;">
                    <h2 style="color: #000; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Order Summary: ${order_reference}</h2>
                    
                    <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
                        <p style="margin: 5px 0;"><strong>Customer:</strong> ${customer_name}</p>
                        <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer_phone}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${customer_email}</p>
                        <p style="margin: 5px 0;"><strong>Payment:</strong> ${payment_method}</p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <thead>
                            <tr style="background-color: #f5f5f5;">
                                <th style="padding: 10px; text-align: left;">Item</th>
                                <th style="padding: 10px; text-align: left;">Qty</th>
                                <th style="padding: 10px; text-align: right;">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsHtml}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="padding: 20px 10px 10px; text-align: right; font-weight: bold; font-size: 18px;">Grand Total:</td>
                                <td style="padding: 20px 10px 10px; text-align: right; font-weight: bold; font-size: 18px; color: #D4AF37;">₹${total}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div style="text-align: center; margin-top: 30px; padding: 20px; border-top: 1px solid #eee;">
                        <p style="font-size: 12px; color: #888;">This is an automated notification from your store.</p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Order notification sent for ${order_reference}`);
    } catch (error) {
        console.error('❌ Failed to send order notification email:', error);
    }
}
