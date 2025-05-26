const { Calcular } = require('../src/models/calcModel.js')


test('1. Soma de dois números positivos', async () => {
const result = await Calcular('5 + 5');
expect(result).toBe(10);
});

test('2. Soma de um número positivo com um negativo', async () => {
const result = await Calcular('5 + -3');
expect(result).toBe(2);
});

test('3. Soma de um número com zero', async () => {
const result = await Calcular('5 + 0');
expect(result).toBe(5);
});

test('4. Soma de dois números negativos', async () => {
const result = await Calcular('-5 + -3');
expect(result).toBe(-8);
});

test('5. Subtração de dois números positivos', async () => {
const result = await Calcular('10 - 4');
expect(result).toBe(6);
});

test('6. Subtração de um número positivo por um negativo', async () => {
const result = await Calcular('10 - -4');
expect(result).toBe(14);
});

test('7. Subtração de um número negativo por um positivo', async () => {
const result = await Calcular('-10 - 4');
expect(result).toBe(-14);
});

test('8. Subtração de um número por zero', async () => {
const result = await Calcular('5 - 0');
expect(result).toBe(5);
});

test('9. Multiplicação de dois números positivos', async () => {
const result = await Calcular('5 X 3');
expect(result).toBe(15);
});

test('10. Multiplicação de um número positivo por um negativo', async () => {
const result = await Calcular('5 X -3');
expect(result).toBe(-15);
});

test('11. Multiplicação de um número por zero', async () => {
const result = await Calcular('5 X 0');
expect(result).toBe(0);
});

test('12. Multiplicação de dois números negativos', async () => {
const result = await Calcular('-5 X -3');
expect(result).toBe(15);
});

test('13. Divisão de dois números positivos', async () => {
const result = await Calcular('10 / 2');
expect(result).toBe(5);
});

test('14. Divisão de um número positivo por um negativo', async () => {
const result = await Calcular('10 / -2');
expect(result).toBe(-5);
});

test('15. Divisão de um número por zero', async () => {
const result = await Calcular('10 / 0');
expect(result).toBe(Infinity);
});

test('16. Divisão de zero por um número positivo', async () => {
const result = await Calcular('0 / 5');
expect(result).toBe(0);
});

test('17. Cálculo de porcentagem de um número', async () => {
const result = await Calcular('50 / 100');
expect(result).toBe(0.5);
});
