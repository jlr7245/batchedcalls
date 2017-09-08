const axios = require('axios');

const urls = require('./urls');

let results = [];

function resolvePromises(arr, obj) {
    Promise.all(arr).then(res => {
      results = results.concat(res);
      if (typeof arr[arr.length - 1] == 'number') {
        resolvePromises(obj[arr[arr.length - 1]], obj);
      } else {
        console.log(results);
        console.log(results.length);
      };
    });
}

function getUrls(arr) {
  const result = arr.reduce((acc, val) => {
    if (acc.count % 5) {
      acc[acc.batch].push(axios.get(val));
      acc.count++;
      return acc;
    } else if (acc.count < acc.total && !(acc.count % 5)) {
      acc[acc.batch].push(acc.batch + 1);
      acc.batch++;
      acc[acc.batch] = [axios.get(val)];
      acc.count++;
      return acc;
    } else {
      acc[acc.batch].push(null);
      return acc;
    }
  }, {
    total: arr.length,
    count: 0,
    batch: 0,
    0: [],
  })
  resolvePromises(result[0], result);
}

getUrls(urls);
