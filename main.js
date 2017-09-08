const axios = require('axios');

const urls = require('./urls');



function batchUrls(arr) {
  const result = arr.reduce((acc, val) => {
    if (acc.count % 5) {
      acc[acc.batch].container.push(val);
      acc.count++;
      return acc;
    } else if (acc.count < acc.total && !(acc.count % 5)) {
      acc[acc.batch].next = acc.batch + 1;
      acc.batch++;
      acc[acc.batch] = {
        container: [val]
      }
      acc.count++;
      return acc;
    } else {
      acc[acc.batch].next = null;
      return acc;
    }
  }, {
    total: arr.length,
    count: 1,
    batch: 0,
    0: {
      container: [],
    },
  })
  getResults(result[0], result, []);
}

function getResults(subObj, fullObj, hold) {
  const promises = subObj.container.map(val => {
    return axios.get(val);
  });
  Promise.all(promises).then(res => {
    hold = hold.concat(res);
    if (subObj.next) {
      getResults(fullObj[subObj.next], fullObj, hold);
    } else {
      console.log(hold.map(res => {
        return ({
          name: res.data.name,
          url: res.data.url,
        })
      }));
    }
  }).catch(err => console.log(err));
}

console.log(batchUrls(urls));
