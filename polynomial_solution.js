const fs = require('fs');

function decodeYValue(base, value) {
    return parseInt(value, base);
}

function lagrangeInterpolationTheorem(x, y, k) {
    let constantValue = 0;
    for (let i = 0; i < k; i++) {
        let term = y[i];
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                term *= (0 - x[j]) / (x[i] - x[j]);
            }
        }
        constantValue+=term;
    }
    return constantValue;
}

const data = JSON.parse(fs.readFileSync('input.json', 'utf-8'));
const { n, k } = data.keys;
const roots = Object.keys(data).filter(key => !isNaN(key)).map(key => ({
    x: parseInt(key, 10),
    base: parseInt(data[key].base, 10),
    value: data[key].value,
}));

const xValues = [];
const yValues = [];

for (let i = 0; i < k; i++) {
    const { x, base, value } = roots[i];
    const y = decodeYValue(base, value);
    xValues.push(x);
    yValues.push(y);
}

const constant = lagrangeInterpolationTheorem(xValues, yValues, k);
console.log(`Constant Value : ${Math.round(constant)}`);
