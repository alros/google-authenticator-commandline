const otplib = require('otplib');

// Get secret from command line
const secret = process.argv[2];

if (!secret) {
  console.error('❌ Please provide the secret as the first argument.');
  process.exit(1);
}

// Explicit TOTP configuration
otplib.authenticator.options = {
  algorithm: 'sha1',
  step: 30,     // 30-second time window
  digits: 6     // 6-digit OTP
};

// Generate TOTP
const otp = otplib.authenticator.generate(secret);

console.log(`🔐 Secret: ${secret}`);
console.log(`📟 OTP: ${otp}`);
