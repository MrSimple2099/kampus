const http = require('node:http');

function createServer() {
  return http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.url === '/health') {
      res.end(JSON.stringify({ status: 'ok' }));
    } else if (req.url === '/api/status') {
      res.end(JSON.stringify({
        layanan: ['pendaftaran', 'krs', 'nilai', 'pembayaran-ukt'],
        versi: process.env.APP_VERSION || 'dev'
      }));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: 'tidak ditemukan' }));
    }
  });
}

if (require.main === module) {
  const port = process.env.PORT || 3000;
  createServer().listen(port, () => console.log(`Server berjalan di port ${port}`));
}

module.exports = { createServer };
