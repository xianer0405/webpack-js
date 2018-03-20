class Person {
	constructor(name='jack', age=31) {
		this.name = name 
		this.age = age
	}
	toString() {
		console.log(`name:${this.name}, age:${this.age}`)
	}
}

export default Person