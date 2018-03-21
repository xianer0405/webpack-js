import * as es6 from './src/es6/index'
import {test} from './src/es5/index'


// 如何给default取别名


console.log(es6) 
let p = new es6.default() 
es6.test() 
p.toString()
test() ;