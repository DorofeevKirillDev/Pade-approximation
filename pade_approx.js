//const math = require('mathjs');
//import Chart from 'chart.js/auto';
// let func = 'sin(x)'

// let x = 1.57079
// let der = func

//console.log(taylorSeries(func, x, 3)); 
// Функция для вычисления факториала
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  } else {
    for (let i = n - 1; i >= 2; i--) {
      n *= i;
    }
    return n;
  }
}

function derivativeAtPoint(derivative, x) {
  return derivative.evaluate({ x: x });
}

function taylorSeries(func, x, n) {
  let coefs = []
  const func_p = math.parse(func);
  const func_c = func_p.compile();
  coefs[0] = func_c.evaluate({ x: x })
  let der = func
  for (let i = 1; i <= n; i++) {
    der =  math.derivative(der, 'x')
    coefs[i] = derivativeAtPoint(der, x) / factorial(i)
  }
  return coefs
}

function getPadeParams(){
  const func = document.getElementById('function').value;
  const x = parseFloat(document.getElementById('x').value);
  const numDeg = document.getElementById('numDeg').value;
  const denomDeg = document.getElementById('denomDeg').value;
  return [func, x, numDeg, denomDeg]
}

// Функция для вычисления коэффициентов Паде
function padeApproximation() {
  let params = getPadeParams();
  const func = params[0];
  const x = params[1];
  const numDeg = +params[2];
  const denomDeg = +params[3];

  coefs = taylorSeries(func, x, numDeg + denomDeg);
  var rhs = [];
  var matrix = [];
  mat_size = denomDeg
  for (var i = 0; i < mat_size; i++) {
    rhs[i] = -coefs[i + numDeg + 1];
    matrix[i] = [];
    let c_ind = numDeg + i;
    for (var j = 0; j < mat_size; j++) {
      if (c_ind >= 0) {
        matrix[i][j] = coefs[c_ind];
      } else {
        matrix[i][j] = 0;
      }
      c_ind -= 1;
    }
  }
  let invMat = math.inv(matrix);
  const denomCoefs1 = [1];
  const denomCoefs2 = math.multiply(invMat, rhs);
  const denomCoefs = denomCoefs1.concat(denomCoefs2);
  let numCoefs = [coefs[0]]
  for (var i = 1; i <= numDeg; i++) {
    let c_ind = i;
    let b_ind = 0;
    numCoefs[i] = [0]
    while (c_ind >= 0 && b_ind <= denomDeg) {
      numCoefs[i] = parseFloat(numCoefs[i]);
      numCoefs[i] += parseFloat(coefs[c_ind]) * parseFloat(denomCoefs[b_ind]);
      c_ind -= 1;
      b_ind += 1;
    }
  }
  return[numCoefs, denomCoefs]
}

function calcTaylor(coefs, x, x_0){
  var result = 0;
    
  for (var i = 0; i < coefs.length; i++) {
    result += coefs[i] * Math.pow((x-x_0), i);
  }

  return result;
}

function calcPade(numCoefs, denomCoefs, x, x_0){
  var result1 = 0;
  var result2 = 0;
  for (var i = 0; i < numCoefs.length; i++) {
    result1 += numCoefs[i] * Math.pow((x - x_0), i);
  }
  for (var i = 0; i < denomCoefs.length; i++) {
    result2 += denomCoefs[i] * Math.pow((x - x_0), i);
  }
  res = result1 / result2;
  console.log(res);
  return res;
}


function plotPadeApproximation(){
  const canvas = document.getElementsByClassName('canvas')[0];
  const chartContext = canvas.getContext('2d');
  const x = document.getElementById('x').value;
  offset = 5;
  const start = x - offset;
  const stop = x + offset;
  const step = 0.5;
  const length = 2 * offset / step + 1;
  const domain = Array.from(Array(length), (_, index) => start + index * step);

  const func = document.getElementById('function').value;
  const func_p = math.parse(func);
  const func_c = func_p.compile();
  const range = domain.map(x => func_c.evaluate({ x: x }));
  coefsT = taylorSeries(func, x, 5);
  coefsP = padeApproximation();
  const rangeT = domain.map(y => calcTaylor(coefsT, y, x));
  const rangeP = domain.map(y => calcPade(coefsP[0], coefsP[1], y, x));
  new Chart(chartContext, {
    type: 'line',
    data: {
      labels: domain,
      datasets: [
        {
          label: "f(x)",
          data: range,
          lineTension: 0.4,
          backgroundColor: ["rgba(105, 0, 132, .2)"],
          borderColor: ["rgba(200, 99, 132, .7)"],
          borderWidth: 2
        },
        {
          label: `Taylor Series`,
          data: rangeT,
          backgroundColor: ["rgba(0, 137, 132, .2)"],
          borderColor: ["rgba(0, 10, 130, .7)"],
          borderWidth: 2
        }, 
        {
          label: "Pade",
          data: rangeP,
          lineTension: 0.4,
          backgroundColor: ["rgba(105, 0, 132, .2)"],
          borderColor: ["rgba(0, 99, 132, .7)"],
          borderWidth: 2
        }
      ]
    },
    options: {
      scales: {
          xAxes: [{
            type: 'linear',
            ticks: {
              callback: function(value, index, values) {
                return parseFloat(value).toFixed(2);
              },
              autoSkip: false,
              maxTicksLimit: 10,
              stepSize: .2
          }}]
      }
  }
  });
}

// function drawSinusGraph() {
//   console.log('Функция отрисовки вызвана') 
//   // Ваш код для отрисовки графика синуса
//   // Например, использование библиотеки Chart.js:
//   const canvas = document.getElementsByClassName('canvas')[0];
//   console.log(canvas);
//   constchartContext = canvas.getContext('2d');
//   const step = 0.1;
//   const length = 100;
//   const xValues = Array.from({ length }, (_, index) => index * step);
//   const yValues = xValues.map(x => Math.sin(x));

//   var data = {
//       labels: xValues, // массив значений x
//       datasets: [{
//           label: 'sin(x)',
//           data: yValues, // массив значений sin(x)
//           borderColor: 'blue',
//           borderWidth: 1
//       }]
//   };
//   var myChart = new ChartchartContext, {
//       type: 'line',
//       data: data
//   });
// }





