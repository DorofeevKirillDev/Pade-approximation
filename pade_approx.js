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
  const func = document.getElementById('func').value;
  const x = document.getElementById('x').value;
  const numDeg = document.getElementById('numDeg').value;
  const denomDeg = document.getElementById('denomDeg').value;
  return {func, x, numDeg, denomDeg}
}

// Функция для вычисления коэффициентов Паде
function padeApproximation() {
  let params = getPadeParams;
  const func = params[0];
  const x = params[1];
  const numDeg = params[2];
  const denomDeg = params[3];

  coefs = taylorSeries(func, x, n + m);
}

function calcTaylor(coefs, x, x_0){
  var result = 0;
    
  for (var i = 0; i < coefs.length; i++) {
    result += coefs[i] * Math.pow((x-x_0), i);
  }

  return result;
}



function plotPadeApproximation(){
  const chartContext = document.getElementsByClassName('canvas')[0].getContext('2d');
  const x = document.getElementById('x').value;
  offset = 5;
  const start = x - offset;
  const stop = x + offset;
  const step = 0.1;
  const length = 2 * offset / step + 1;
  const domain = Array.from(Array(length), (_, index) => start + index * step);
  // const fxnToArray = fxn => Array.from(domain, fxn);
  // const range = fxnToArray(Math.sin);
  const range = domain.map(x => Math.sin(x));
  coefs = taylorSeries('sin(x)', x, 5)
  const rangeT = domain.map(y => calcTaylor(coefs, y, x));
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
          label: `Taylor Series (n = 5)`,
          data: rangeT,
          backgroundColor: ["rgba(0, 137, 132, .2)"],
          borderColor: ["rgba(0, 10, 130, .7)"],
          borderWidth: 2
        }
      ]
    },
    options: {
      scale: {
        ticks: {
          min : -7,
          max : 7,
          precision: 0
        }
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
//   const ctx = canvas.getContext('2d');
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
//   var myChart = new Chart(ctx, {
//       type: 'line',
//       data: data
//   });
// }






