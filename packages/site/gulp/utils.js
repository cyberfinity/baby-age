const http = require('http');

const browserSyncPort = 8080;

function reloadBrowser(done) {
  const url = `http://localhost:${browserSyncPort}/__browser_sync__?method=reload`;

  http.get(url, (resp) => {
    resp.on('data',() => {});
    resp.on('end', () => {
      done();
    });
  }).on('error', (err) => {
    done(err);
  });
}

module.exports = {
  reloadBrowser,
}
