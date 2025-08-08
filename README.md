# Google Authenticator Commandline

Utilities to extract the secrets from Google Authenticator and generate OTPs with NodeJS.

- `node decode-qr-code.js qr.jpeg` to decode the qr code exported from Google Authenticator.
- `otpauth-migration.js` + `otp_migration.proto` to extract the secret from a `otpauth-migration` string.
- `generate-otp.js` to generate an OTP given a secret.

More info on [my blog](https://blog.rossotto.net/2025-08-08-generate-otp-server-side/)
