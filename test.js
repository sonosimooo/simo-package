const { ping } = require('simo-package');
ping ('google.com')
  .then(latency => {
    console.log(`Tempo di risposta per ${host}: ${latency} ms`);
  })
  .catch(error => console.error(error.message));