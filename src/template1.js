const { ping } = require('simo-package');
const host = 'example.com';
ping(host)
  .then(latency => {
    console.log(`Tempo di risposta per ${host}: ${latency} ms`);
  })
  .catch(error => console.error(error.message));