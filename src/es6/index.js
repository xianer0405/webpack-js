export {test} from './promise/promise'
// import 'babel-polyfill'
class Person {
	constructor(name='jack', age=31) {
		this.name = name 
		this.age = age
	}
	toString() {
		console.log(`name:${this.name}, age:${this.age}`)
	}
}

console.log('HMR')

let arr = [1,2,4]

let newArr = arr.map((item) => {
	return item*2
})

let set = new Set(newArr)
console.log(set)

let ret = newArr.includes(4)
console.log(ret)
export default Person