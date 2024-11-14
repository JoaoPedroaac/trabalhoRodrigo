const http = require('http');

function calcularIMC(peso, altura) {
  if (altura <= 0 || peso <= 0) {
    return 'Valores de peso e altura devem ser positivos.';
  }
  const imc = peso / (altura * altura);
  return `Seu IMC: ${imc.toFixed(2)}. tabela: ${classificarIMC(imc)}`;
}


function classificarIMC(imc) {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 24.9) return 'Peso normal';
  if (imc < 29.9) return 'Sobrepeso';
  return 'Obesidade';
}

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>Calculadora de IMC</title>
        </head>
        <body>
          <h1>Calculadora de IMC</h1>
          <form action="/calcularIMC" method="get">
            <label for="peso">Peso (kg):</label>
            <input type="number" step="0.1" id="peso" name="peso" required><br>
            <label for="altura">Altura (m):</label>
            <input type="number" step="0.01" id="altura" name="altura" required><br>
            <button type="submit">Calcular IMC</button>
          </form>
          <div id="resultado"></div>
        </body>
      </html>
    `);
  } else if (req.method === 'GET' && req.url.startsWith('/calcularIMC')) {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    const peso = parseFloat(urlParams.get('peso'));
    const altura = parseFloat(urlParams.get('altura'));

    const resultado = calcularIMC(peso, altura);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html>
        <head>
          <title>Resultado</title>
        </head>
        <body>
          <h1>Calculadora de IMC</h1>
          <form action="/calcularIMC" method="get">
            <label for="peso">Peso (kg):</label>
            <input type="number" step="0.1" id="peso" name="peso" required><br>
            <label for="ala">Altura (m):</label>
            <input type="number" step="0.01" id="altura" name="altura" required><br>
            <button type="submit">Calcular IMC</button>
          </form>
          <div id="resultado">
            <h2>Resultado:</h2>
            <p>${resultado}</p>
          </div>
        </body>
      </html>
    `);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Recurso não encontrado. Utilize /calcularIMC?peso=xx&altura=yy');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
