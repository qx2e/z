import http from 'http';

function keepAlive() { 
  http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("I'm alive\n"); 
  }).listen(8080, () => {
  });
}


export { keepAlive }; 