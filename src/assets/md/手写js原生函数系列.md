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

### 节流

```js
/**
 * 节流 throttle
 * 节流是指在一个函数执行后的指定时间内，该函数不再被执行。（类似技能冷却，技能使用后有冷却时间，冷却时间结束后才能被再次使用）
 * 1、滚动加载
 * 2、高频点击
 */
function throttle(fn, time) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, ...args);
        timer = null;
      }, time);
    }
  };
};
```

### 防抖

```js
/**
 * 防抖 debounce
 * 防抖是指一个函数在指定的时间后执行，在此期间，如果再次调用该函数，则重置该时间。（类似回城被打断，回城被打断后，只能重新读秒回城）
 * 1、拖动窗口大小时，只在窗口调整完成后，再计算窗口大小，防止重复渲染
 * 2、搜索框搜索输入，在最后一次输入完，再发送请求
 */
function debounce(fn, time) {
  let timer;
  return function(...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(context, ...args);
    }, time);
  };
};
```

### bind

```js
Function.prototype.myBind = function(context, ...bindArgs) {
  const originalFunc = this;
  if (typeof originalFunc !== 'function') {
    throw new Error('error');
  }
  function newFunc(...callArgs) {
    const thisArg = this intanceof newFunc ? this : context;
    return originalFunc.apply(thisArg, [...bindArgs, ...callArgs]);
  }

  newFunc.prototype = Object.create(originalFunc.prototype);
  return newFunc;
}
```

### 模拟new

```js
function myNew(constructor, ...args) {
  const obj = {};
  obj.__proto__ = constructor.prototype;
  const res = constructor.call(obj, ...args);
  return typeof res === 'object' ? res : obj;
}
```

### 发布订阅

```js
class EventHub {
  constructor() {
    this.eventQueue = {};
  }
  on(name, fn) {
    this.eventQueue[name] = this.eventQueue[name] || [];
    this.eventQueue[name].push(fn);
  },
  emit(name) {
    if (!this.eventQueue[name]) {
      return;
    }
    this.eventQueue[name].forEach(i => i());
  },
  off(name, fn) {
    if (!this.eventQueue[name]) {
      return;
    }
    const _index = this.eventQueue[name].indexOf(fn);
    if (_index < 0) {
      return;
    }
    this.eventQueue.splice(_index, 1);
  },
};
```

### ajax

```js
function ajax(url, method, data, success, fail) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, xhr, true);
  xhr.onreadystatechange = function() {
    if (xhr.readystate === 4) {
      if (xhr.status >= 200 && xhr.status <= 304) {
        success();
      } else {
        fail();
      }
    }
  }
  if (method === 'POST' || method === 'PUT') {
    xhr.send(data);
  } else {
    xhr.send(null);
  }
}
```

### 深拷贝

```js
function deepClone(obj, hash=new WeakMap()) {
  // 基本数据类型
  if (typeof obj !== 'object') {
    return obj;
  }
  // 引用数据类型
  // 日期
  if (obj instanceof Date) {
    return new Date(obj);
  }
  // 数组
  if (obj instanceof Array) {
    const copy = [];
    for (const i = 0; i < obj.length; i++) {
      copy[i] = deepClone(obj[i]);
    }
    return copy;
  }
  // 正则
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  // null
  if (obj === null) {
    return obj;
  }
  // 函数
  if (obj instanceof Function) {
    return obj;
  }
  // 对象
  if (obj instanceof Object) {
    const copy = {};
    if (hash.get(obj)) {
      return hash.get(obj);
    }
    hash.set(obj, {});
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        copy[i] = deepClone(obj[i], hash);
      }
    }
    return copy;
  }
  throw new Error('未知类型');
}
```

