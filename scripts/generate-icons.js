import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function createPng(width, height, isMaskable = false) {
  // Raw scanlines with RGBA
  const rowSize = 1 + width * 4;
  const raw = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    raw[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Draw rounded card with gradient background and book/pencil logo
      const nx = (x / width) * 2 - 1; // -1 to 1
      const ny = (y / height) * 2 - 1;
      const dist = Math.sqrt(nx * nx + ny * ny);

      // Background
      let r = 2, g = 6, b = 23, a = 255; // slate-950 #020617

      // Glow in center
      const glow = Math.max(0, 1 - dist * 1.2);
      r = Math.min(255, Math.floor(r + glow * 10));
      g = Math.min(255, Math.floor(g + glow * 140));
      b = Math.min(255, Math.floor(b + glow * 190));

      // Draw book outline in center
      const bx = (x - width * 0.5) / (width * 0.28);
      const by = (y - height * 0.5) / (height * 0.28);

      if (Math.abs(bx) < 1.0 && Math.abs(by) < 1.0) {
        // Book spine in center
        if (Math.abs(bx) < 0.08) {
          r = 6; g = 182; b = 212; // cyan-500
        } else if (Math.abs(bx) < 0.9 && Math.abs(by) < 0.85) {
          // Inside page lines
          const lineY = (by + 0.8) / 0.4;
          const isLine = Math.abs(lineY - Math.round(lineY)) < 0.15 && by > -0.6 && by < 0.6;
          if (isLine) {
            r = 56; g = 189; b = 248; // sky-400
          } else {
            // Book cover fill
            r = 15; g = 23; b = 42; // slate-900
          }
        } else if (Math.abs(bx) < 1.0 && Math.abs(by) < 0.95) {
          // Book border
          r = 6; g = 182; b = 212; // cyan-500
        }
      }

      raw[pxOffset] = r;
      raw[pxOffset + 1] = g;
      raw[pxOffset + 2] = b;
      raw[pxOffset + 3] = a;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: RGBA (6)
  ihdrData[10] = 0; // Compression: Deflate
  ihdrData[11] = 0; // Filter: Standard
  ihdrData[12] = 0; // Interlace: None
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const compressed = zlib.deflateSync(raw, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);

  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180));

console.log('Successfully generated PWA icon PNGs in /public');
