import { partial, _ } from '../src/partial'

describe('greet', () => {
	function greet(greeting, name) {
		return greeting + ' ' + name
	}
	it('should hello xxx', () => {
		const sayHelloTo = partial(greet, 'hello')
		expect(sayHelloTo('fred')).toBe('hello fred')
	})

	it('should xxx to fred', () => {
		const greetFred = partial(greet, _, 'fred')
		expect(greetFred('hi')).toBe('hi fred')
	})

	it('class shoud pass', () => {
		const user = {
			name: 'Jayden',
			say(time, message) {
				return `[${time}] ${this.name}: ${message}`
			},
		} as any
		const timeNow = '12:00'
		user.sayNow = partial(user.say, timeNow)
		expect(user.sayNow('hello')).toBe(`[${timeNow}] Jayden: hello`)

		user.sayHello = partial(user.say, _, 'hello')
		expect(user.sayHello('11:00')).toBe(`[11:00] Jayden: hello`)
	})

	it('should run when no bound arguments', () => {
		const sayHelloTo = partial(greet)
		expect(sayHelloTo('hello', 'fred')).toBe('hello fred')
	})

	it('all be bound', () => {
		const greetFred = partial(greet, 'hi', 'fred')
		expect(greetFred()).toBe('hi fred')
	})
})
