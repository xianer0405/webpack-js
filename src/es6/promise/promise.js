/***
问题提纲，用于复习是回答
Promise是一个对象，也是一个构造函数
0.接收一个回调函数，有两个参数 ？
1.三种状态 ？
2.三种状态的变化途径只有两个 ？
3.一个Promise的最终结果只有两个 ？
4.then声明在Promise的prototype上
5.then方法可以添加回调函数，可以接收两个回调, 分别的回调时机？
6.then方法可以链式使用， 链式调用一个特点就是：Promise 对象的报错具有传递性， 如何理解？
7.下面四种写法的区别
// 写法一
f1().then(function () {
  return f2();
});

// 写法二
f1().then(function () {
  f2();
});

// 写法三
f1().then(f2());

// 写法四
f1().then(f2);

*************************************************/
export function test() {
  console.log('es6/promise/promise.js')
  // test1()
  // test2()
  // test3()
  // test4()
  // testAjax()
  // testPromiseChain()
  // testReturn()
  // testError()
  // testPromiseAll()
  // testPromiseRace()
  testEventLoop()
}

/* 
Promise.try()

***************/

/*  
Promise.reject() 
Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))
注意，Promise.reject()方法的参数，会原封不动地作为reject的理由，变成后续方法的参数。这一点与Promise.resolve方法不一致。
********************/


/* 
需要注意的是，立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。
settimeout 0 是在下一轮时间开始时执行
*/
function testEventLoop() {
  const p = Promise.resolve()
  setTimeout(() => {
    console.log('three')
  }, 0);
  p.then(() => {
    console.log('two')
  })
  console.log('one')
}

/*  
Promise.resolve()
作用：将现有对象转为 Promise 对象
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

Promise.resolve方法的参数分成四种情况。
（1）参数是一个 Promise 实例  
     不做任何修改
（2）参数是一个thenable对象 --》thenable对象指的是具有then方法的对象
     Promise.resolve方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then方法。
（3）参数不是具有then方法的对象，或根本就不是对象
    如果参数是一个原始值，或者是一个不具有then方法的对象，则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
（4）不带有任何参数
    Promise.resolve方法允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。
    所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用Promise.resolve方法。

    需要注意的是，立即resolve的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。
*****************************/

/*
Promise.race()
1.Promise.race方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
2.只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。


race()的应用
如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
*************************************/
function testPromiseRace() {
  const p = Promise.race([
    new Promise((resolve, reject) => {
      //模拟异步任务
      setTimeout(() => {
        resolve('task end')
      }, 3000);
    }),
    new Promise((resolve, reject) => {
      //限定异步任务的执行时间
      setTimeout(() => {
        reject(new Error('task fail'))
      }, 2000);
    })
  ])

  p.then(result => console.log(result))
   .catch(err => console.error(err))

}

/*
注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
********************/
function testPromiseAll() {
  const p1 = new Promise((resolve, reject) => {
    resolve('hello')
  })
  .then(result => result)
  .catch(e => e)

  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  //.catch(e => e);  

  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(err => console.log(err))

}
/*
Promise.all() 将多个Promise实例包装成一个新的Promise实例
const p = Promise.all([p1,p2,p3])
Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例
1.Promise.all方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。
2.p的状态由p1、p2、p3决定，分成两种情况。
 A>只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
 B>只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
3.注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
******************************/

// Promise.prototype.finally, ES2018引入的标准
// finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。
//这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

// 一般总是建议，Promise 对象后面要跟catch方法,用来处理内部发生的错误
// catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。
// catch的回调中，如果有错误，则不会被捕获，除非catch后面还有catch
/* 
 Promise内部的错误不会影像Promise外部的代码， 即Promise会吞掉错误
*******/
function testError() {
  const someAsyncThing = function () {
    return new Promise((resolve, reject) => {
      resolve(x + 1)
    })
  }

  someAsyncThing().then(() => console.log('ok')).catch(err => console.log(err))
  setTimeout(() => {
    console.log(123)
  }, 2000);
}

// Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

// 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。

// Promise.prototype.catch
// 是.then(null, rejection)的别名
// 指定发生错误时的回调函数
// 可以捕获Promise的异步操作发生的错误，也可以捕获then回调中的错误

// Promise.prototype.then  
// 链式then调用

/* 
  then方法返回的是一个新的Promise实例（注意，不是原来那个Promise实例） 
 *******************/
function testReturn() {
  let p = getJSON("./assert/posts.json");
  let p1 = p.then(function (json) {
    return json.name;
  })
  console.log(Object.prototype.toString.apply(p))
  console.log(p === p1)
}

/*
  总结： 
  1.调用resolve或reject并不会终结 Promise 的参数函数的执行。
  2.如果后面有执行语句，仍然会被执行，且比resolve先执行，
    因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
 ***************************************/
function testPromiseChain() {
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('fail')), 4000)
  })

  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(p1)
      console.log('running after resolve')
    }, 1000)
  })


  p2.then(result => console.log(result))
    .catch(err => console.log(err))
}

function testAjax() {

  getJSON('./assert/posts.json').then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}

const getJSON = function (url) {
  const promise = new Promise((resolve, reject) => {
    const handler = function () {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(new Error(this.statusText))
      }
    }
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
    client.setRequestHeader('Accept', 'application/json')
    client.send()
  })
  return promise
}

/*ajax获取数据*/
function test4() {
  var search = function () {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1521626319495'
    let xhr = new XMLHttpRequest()
    let result;
    let p = new Promise((resolve, reject) => {
      xhr.open('GET', url, true)
      // referer: 'https://c.y.qq.com/',
      // host: 'c.y.qq.com'
      xhr.setRequestHeader('host', 'c.y.qq.com')
      xhr.setRequestHeader('referer', 'https://c.y.qq.com/')
      xhr.onload = function (e) {
        if (this.status === 200) {
          result = JSON.parse(this.responseText)
          resolve(result)
        }
      }
      xhr.onerror = function (e) {
        reject(e)
      }
      xhr.send()
    })
    return p
  }

  search().then(console.log, console.error)
}

/*图片加载*/
function test3() {
  const imageUrl = 'https://t12.baidu.com/it/u=496803260,3519642869&fm=173&app=25&f=JPEG?w=640&h=575&s=410B93573ED347D2053DB9EF0300E069'
  var preloadImage = function (url) {
    return new Promise((resolve, reject) => {
      var image = new Image()
      image.onload = function () {
        resolve(image)
      }
      image.onerror = function () {
        reject(new Error('Could not load image at ' + url))
      }
      image.src = url
    })
  }
  // 加载图像插入到页面中
  preloadImage(imageUrl).then((res) => {
    console.log(`test3 lalal res=${res}`)
    var wrapperEl = document.querySelector('.img-wrapper')
    console.log(wrapperEl)
    // imageWrapperEl.style.border = "1px soild #ccc"
    wrapperEl.style.height = "300px"
    wrapperEl.appendChild(res)
  })
}

/**
 * TODO 
 * 
 */
function test2() {
  var p1 = new Promise((resolve, reject) => {
    resolve('成功')
  })
  p1.then(console.log, console.error)

  var p2 = new Promise((resolve, reject) => {
    reject(new Error('失败'))
  })
  p2.then(console.log, console.error)
}

function test1() {
  function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'done')
    })
  }

  timeout(2000).then((res) => {
    console.log(res)
  })
}