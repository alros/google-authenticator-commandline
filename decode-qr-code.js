const QrCode = require('qrcode-reader');

async function decodeQRCode(path) {
  const jimpModule = await import('jimp');

  // The main class is under jimpModule.Jimp
  const JimpClass = jimpModule.Jimp;

  if (!JimpClass || !JimpClass.read) {
    throw new Error('Jimp.read function not found in imported module');
  }

  const img = await JimpClass.read(path);

  return new Promise((resolve, reject) => {
    const qr = new QrCode();
    qr.callback = (err, value) => {
      if (err) reject(err);
      else resolve(value.result);
    };
    qr.decode(img.bitmap);
  });
}

const filePath = process.argv[2];
if (!filePath) {
  console.error('❌ Please provide the path to the QR code image.');
  process.exit(1);
}

decodeQRCode(filePath)
  .then(result => console.log('Decoded QR code data:\n', result))
  .catch(err => console.error('Failed to decode QR code:', err));
