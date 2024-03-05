import _ from 'lodash'

export function sum(a, b) {
	return a + b
}

// demo from https://lodash.com/docs/4.17.15#partial
export function greet(greeting, name) {
	return greeting + ' ' + name
}

export const sayHelloTo = _.partial(greet, 'hello')
sayHelloTo('fred') // => 'hello fred'

// Partially applied with placeholders.
export const greetFred = _.partial(greet, _, 'fred')
greetFred('hi') // => 'hi fred'
