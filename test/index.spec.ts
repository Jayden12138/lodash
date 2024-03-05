import { sum, sayHelloTo, greetFred } from '../src'

describe('sum', () => {
	it('should add two numbers', () => {
		expect(sum(1, 2)).toBe(3)
	})
})

describe('greet', () => {
	it('should hello xxx', () => {
		expect(sayHelloTo('fred')).toBe('hello fred')
	})

	it('should xxx to fred', () => {
		expect(greetFred('hi')).toBe('hi fred')
	})
})
