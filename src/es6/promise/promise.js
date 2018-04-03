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
  test1()
  test2()
  test3()
  test4()
}

function testAjax() {
  const getJSON = function(url) {
    const handler = function()
  }
}

/*ajax获取数据*/
function test4() {
  var search = function() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1521626319495'
    let xhr = new XMLHttpRequest()
    let result;
    let p = new Promise((resolve, reject) => {
      xhr.open('GET', url, true)
      // referer: 'https://c.y.qq.com/',
            // host: 'c.y.qq.com'
      xhr.setRequestHeader('host', 'c.y.qq.com')
      xhr.setRequestHeader('referer', 'https://c.y.qq.com/')
      xhr.onload = function(e) {
        if (this.status === 200) {
          result = JSON.parse(this.responseText)
          resolve(result)
        }
      }
      xhr.onerror = function(e) {
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
  var preloadImage = function(path) {
    return new Promise((resolve, reject) => {
      var image = new Image()
      image.onload = function() {
        console.log(image)
        resolve(image)
      }
      image.onerror = reject
      image.src = path
    })
  }
  // 加载图像插入到页面中
  preloadImage(imageUrl).then((res) => {
    console.log(`test3 res=${res}`)
    var imageWrapperEl = document.createElement('div')
    // imageWrapperEl.style.border = "1px soild #ccc"
    imageWrapperEl.style.height = "300px"
    imageWrapperEl.appendChild(res);
    document.body.appendChild(imageWrapperEl)
  })
}

/*then方法调用*/
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