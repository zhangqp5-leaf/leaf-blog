### promise.all()

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    // 验证是否为数组
    if (!Array.isArray(promises)) {
      throw new Error('参数应为数组');
    }
    // 是否为空
    const promiseNum = promises.length;
    if (!promiseNum) {
      return resolve([]);
    }
    // 遍历
    let resolvedValues = [], resolvedCount = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          resolvedValues[index] = value;
          resolvedCount++;
          if (resolvedCount === promiseNum) {
            resolve(resolvedValues);
          }
        },
        reason => {
          reject(reason);
        },
      )
    })
  })
};
```

### promise.race()

```js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    // 验证是否为数组
    if (!Array.isArray(promises)) {
      throw new Error('参数应为数组');
    }
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        value => {
          resolve(value);
        },
        reason => {
          reject(reason);
        }
      )
    }
  })
}
```

