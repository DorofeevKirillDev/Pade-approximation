const math = require('mathjs');
require('chartjs');
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
  const denumDeg = document.getElementById('denumDeg').value;
  return {func, x, numDeg, denumDeg}
}

// Функция для вычисления коэффициентов Паде
function padeApproximation() {
  let params = getPadeParams
  func = params[0]
  x = params[1]
  numDeg = params[2]
  denumDeg = params[3]

  let result = padeApproximation('sin(x)', numDeg, denumDeg);
  // console.log("Числитель коэффициентов Паде:", result.numerator);
  // console.log("Знаменатель коэффициентов Паде:", result.denominator);
  coefs = taylorSeries(func, x, n + m)
}

function plotPadeApproximation(){
  const chartContext = document.getElementsByClassName('canvas')[0].getContext('2d');
  //const x = document.getElementById('x').value;
  const x = 5;
  const start = x - 5;
  const stop = x + 5;
  const step = 0.1;
  const length = (stop - start) / step + 1;
  const domain = Array.from(Array(length), (_, index) => start + index * step);
  // const fxnToArray = fxn => Array.from(domain, fxn);
  // const range = fxnToArray(Math.sin);
  const range = domain.map(x => Math.sin(x));
  new Chart(chartContext, {
    type: 'line',
    data: {
      labels: domain,
      datasets: [
        {
          label: "f(x)",
          data: range,
          backgroundColor: ["rgba(105, 0, 132, .2)"],
          borderColor: ["rgba(200, 99, 132, .7)"],
          borderWidth: 2
        }//,
        // {
        //   label: `Taylor Series (n = ${degree - 1})`,
        //   data: rangeOfApproximation,
        //   backgroundColor: ["rgba(0, 137, 132, .2)"],
        //   borderColor: ["rgba(0, 10, 130, .7)"],
        //   borderWidth: 2
        // }
      ]
    }//,
    // options: {
    //   responsive: true
    // }
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






