const Eleventy = require('@11ty/eleventy');


async function build() {
  const elev = new Eleventy();
  await elev.init();
  await elev.write();
}

async function serve() {
  const elev = new Eleventy();
  await elev.init();
  await elev.watch();
  return elev.serve();
}

module.exports = {
  build,
  serve,
};
