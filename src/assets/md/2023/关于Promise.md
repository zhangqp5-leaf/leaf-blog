本文主要简单记录一下什么是Promise.

## 一句话总结Promise

满足Promise A+ 规范，就是一个promise

## Promise 历程

Promise A+ 规范，出现在es6之前，是一个非官方标准，是一个民间规范，主要是解决异步处理不统一的问题。Promise A+ 规范的核心是：带有一个 then 方法的对象，就是一个promise. 关于then方法实现什么样的功能、接收什么样的参数以及应该返回什么，在后文赘述。

es6 出现之后，官方给出了一个构造函数Promise，当我们通过这个构造函数去 创建一个对象(new Promise)时，创建的对象是满足Promise A+ 规范的。简单来说就是 es6 吸纳了 Promise A+ 规范。

es6 除去满足 Promise A+ 规范之外，还增加了一些新的东西，比如 `.catch`方法、`.finally`方法、`Promise.all`、`Promise.race`方法等。

除去以上，Promise A+ 规范还有一个有意思的点：只要满足Promise A+ 规范，就是一个promise，那么两个Promise之间就是可以互操作的。比如jquery中的一个写法`$.ajax()`返回的是一个promise，但是这个promise不是es6通过构造函数构造的promise，但是它可以和 new Promise 创建的对象进行互操作。

## 关于 Promise A+ 规范

[官方地址](https://promisesaplus.com/)

### 1 术语

> promise 是一个带有 then 方法的对象或者函数，并且 then 方法的行为符合该规范

> thenable 是一个定义 then 方法的对象或者函数

> value 是任何合法的js值（包含undefined、thenable 或 promise）

> exception 是使用throw语句时出现的值

> reason 表示promise被reject的原因

### 2 要求

#### 2.1 Promise的状态

一个 promise 必须处于以下三种状态之一：pending、fulfilled、rejected

> 当处于pending状态时，promise可能会转换到 fulfilled 或 rejected 状态

> 当处于 fulfilled 状态时，promise 不能转换到任何其他状态，并且必须有一个`value`，该`value`不得更改

> 当处于rejected状态时，promise 不得转换到任何其他状态，并且必须有一个`reason`，该`reason`不能改变

#### 2.2 then 方法

promise 必须提供一个 then 方法来访问其当前或最终的`value`或`reason`。then 方法接收两个参数：`promise.then(onFulfilled, onRejected)`

##### 2.2.1 onFulfilled 和 onRejected 都是可选参数

1）如果 onFulfilled 不是一个函数，则必须忽略它

2）如果 onRejected 不是一个函数，则必须忽略它

##### 2.2.2 如果 onFulfilled 是一个函数

1）它必须在promise 状态是 fulfilled 之后调用，并将 promise 的`value`作为其第一个参数

2）在promise状态是fullfilled之前，它不能被调用

3）它不能被多次调用

##### 2.2.3 如果 onRejected 是一个函数

1）它必须在 promise 状态是 rejected 之后调用，并将 promise 的 `reason`作为其第一个参数

2）在promise状态是rejected之前，它不能被调用

3）它不能被多次调用

##### 2.2.4 在执行仅包含平台代码的上下文堆栈之前，不得调用 onFulfilled 和 onRejected

这里的平台代码指的是engine, environment 和 promise的实现代码。

##### 2.2.5 onFulfilled 和 onRejected 必须作为函数调用，也就是说没有 this

##### 2.2.6 then 方法可以在同一个 promise 上多次调用

1）当 promise 状态为 fulfilled 时，所有相应的 onFulfilled 回调必须按照顺序执行 then 方法

2）当 promise 状态为 rejected 时，所有相应的 onRejected 回调必须按照顺序执行 then 方法

##### 2.2.7 then 方法必须返回一个 promise `promise2 = promise1.then(onFulfilled, onRejected)`

1）onFulfilled 或 onRejected 中任何一个返回一个 `value` x，则运行 Promise Resolution Procedure `[[Resolve]](promise2, x)`

2）onFulfilled 或 onRejected 中任何一个抛出异常 e，那么 promise2 必须以 e 作为`reason`转为 rejected 状态

3）如果 onFulfilled 不是一个函数，并且 promise1 状态为 fulfilled，那么 promise2 必须使用与 promise1 相同的 `value` 来转为 fulfilled 状态

4）如果 onRejected 不是一个函数，并且 promise1 状态为 rejected，那么 promise2 必须以与 promise1 相同的 `reason`转为 rejected 状态

#### 2.3 The Promise Resolution Procedure

The **promise resolution procedure** is an abstract operation taking as input a promise and a value, which we denote as `[[Resolve]](promise, x)`. If `x` is a thenable, it attempts to make `promise` adopt the state of `x`, under the assumption that `x` behaves at least somewhat like a promise. Otherwise, it fulfills `promise` with the value `x`.

This treatment of thenables allows promise implementations to interoperate, as long as they expose a Promises/A+-compliant `then` method. It also allows Promises/A+ implementations to “assimilate” nonconformant implementations with reasonable `then` methods.

To run `[[Resolve]](promise, x)`, perform the following steps:

##### 2.3.1 If promise and `x` refer to the same object, reject promise with a TypeError as the reason.

##### 2.3.2 If `x` is a promise, adopt its state

1）If `x` is pending, `promise` must remain pending until `x` is fulfilled or rejected.

2）If/when `x` is fulfilled, fulfill `promise` with the same value.

3）If/when `x` is rejected, reject `promise` with the same reason.


##### 2.3.3 Otherwise, if `x` is an object or function,

1）Let `then` be `x.then`

2）If retrieving the property `x.then` results in a thrown exception `e`, reject `promise` with `e` as the reason.

3）If `then` is a function, call it with `x` as `this`, first argument `resolvePromise`, and second argument `rejectPromise`, where:

If/when `resolvePromise` is called with a value `y`, run `[[Resolve]](promise, y)`.

If/when `rejectPromise` is called with a reason `r`, reject `promise` with `r`.

If both `resolvePromise` and `rejectPromise` are called, or multiple calls to the same argument are made, the first call takes precedence, and any further calls are ignored.

If calling `then` throws an exception `e`,If `resolvePromise` or `rejectPromise` have been called, ignore it.Otherwise, reject `promise` with `e` as the reason.

4）If `then` is not a function, fulfill `promise` with `x`.

##### 2.3.4 If `x` is not an object or function, fulfill `promise` with `x`.

If a promise is resolved with a thenable that participates in a circular thenable chain, such that the recursive nature of `[[Resolve]](promise, thenable)` eventually causes `[[Resolve]](promise, thenable)` to be called again, following the above algorithm will lead to infinite recursion. Implementations are encouraged, but not required, to detect such recursion and reject `promise` with an informative `TypeError` as the reason.

