import dotenv from 'dotenv';
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

console.log('🧪 Testing Login API...');
console.log(`URL: http://localhost:5000/api/auth/login`);
console.log(`Email: '${ADMIN_EMAIL}'`);
console.log(`Password: '${ADMIN_PASSWORD}'`);

async function testLogin() {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            })
        });

        const data = await response.json();

        console.log('\n--- Server Response ---');
        console.log(`Status: ${response.status}`);
        console.log(JSON.stringify(data, null, 2));

        if (data.success) {
            console.log('\n✅ Login SUCCESS! The backend is working perfectly.');
            console.log('If you still cannot login in the browser, clearer cache or check frontend .env');
        } else {
            console.log('\n❌ Login FAILED.');
            if (data.debug_error) {
                console.log('🔍 DEBUG INFO FOUND:');
                console.log('This confirms the issue is getting the Admin Profile from the DB.');
                console.log('Error Code:', data.debug_error.code);
                console.log('Error Message:', data.debug_error.message);
                console.log('Hint:', data.debug_error.hint);
            }
        }

    } catch (error) {
        console.error('\n❌ Network or Script Error:', error.message);
        if (error.cause) console.error(error.cause);
        console.log('Is the server definitely running on port 5000?');
    }
}

testLogin();
