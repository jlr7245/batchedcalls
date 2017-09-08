const numArr = [];

for (let i = 0; i < 100; i++) {
  numArr.push(i);
}

const HMM = numArr.reduce((acc, val) => {
  if (acc.count % 5) {
    acc[acc.batch].push(val);
    acc.count++;
    return acc;
  } else if (!(acc.count % 5) && acc.count < acc.total) {
    acc[acc.batch].push(acc.batch + 1);
    acc[acc.batch + 1] = [val];
    acc.batch++;
    acc.count++;
    return acc;
  } else {
    acc[acc.batch].push(null);
    return acc;
  }
}, {
  total: 100,
  batch: 0,
  count: 0,
  0: [],
})

console.log(HMM);