const protobuf = require('protobufjs');
const base32 = require('thirty-two'); // for base32 encoding
const url = require('url');

const migrationUrl = process.argv[2];

if (!migrationUrl) {
  console.error('❌ Please provide the otpauth-migration:// URL as the first argument.');
  process.exit(1);
}

const parsed = url.parse(migrationUrl, true);
const dataBase64 = parsed.query.data;

if (!dataBase64) {
  console.error('❌ No data field found in URL.');
  process.exit(1);
}

protobuf.load('otp_migration.proto').then(root => {
  const MigrationPayload = root.lookupType('MigrationPayload');
  const buffer = Buffer.from(dataBase64, 'base64');

  const message = MigrationPayload.decode(buffer);
  const object = MigrationPayload.toObject(message, { longs: String, enums: String, bytes: Buffer });

  object.otpParameters.forEach(otp => {
    // secret is a Buffer, encode it as base32
    const secretBase32 = base32.encode(otp.secret).toString().replace(/=/g, '').replace(/\n/g, '');
    console.log('Account:', otp.name);
    console.log('Issuer:', otp.issuer);
    console.log('Secret (base32):', secretBase32);
    console.log('Algorithm:', otp.algorithm);
    console.log('Digits:', otp.digits);
    console.log('Type:', otp.type);
    console.log('---------------------------');
  });
}).catch(err => {
  console.error('Failed to decode protobuf:', err);
});
