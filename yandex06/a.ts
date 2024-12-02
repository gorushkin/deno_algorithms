// https://contest.yandex.ru/contest/66793/problems/

console.log('start');

type List = number[];
type Input = [number, List];

const solution = (n: number, list: List): List => {
  const result: List = [];

  let currentSum = 0;

  for (const l of list) {
    currentSum += l;
    result.push(currentSum);
  }

  return result;
};


const test1 = { input: [5, [10, -4, 5, 0, 2]] as Input, output: [10, 6, 11, 11, 13] };

const tests = [test1];

for (const test of tests) {
  const result = solution(test.input[0], test.input[1]);

  console.log(JSON.stringify(result) === JSON.stringify(test.output) ? 'ok' : 'error');
}
