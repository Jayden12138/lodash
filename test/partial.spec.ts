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

	// lodash test
	it(`creates a function that can be invoked with additional arguments`, () => {
		const fn = function (a, b) {
				return [a, b]
			},
			par = partial(fn, 'a'),
			expected = ['a', 'b']

		expect(par('b')).toEqual(expected)
	})

	it(`works when there are no partially applied arguments and the created function is invoked without additional arguments`, () => {
		const fn = function () {
				return arguments.length
			},
			par = partial(fn)

		expect(par()).toBe(0)
	})

	it(`works when there are no partially applied arguments and the created function is invoked with additional arguments`, () => {
		const identity = value => value
		const par = partial(identity)
		expect(par('a')).toBe('a')
	})

	it(`should support placeholders`, () => {
		let fn = function () {
				return [...arguments]
			},
			par = partial(fn, _, 'b', _)
		par('a', 'c')
		expect(par('a', 'c')).toEqual(['a', 'b', 'c'])
		expect(par('a')).toEqual(['a', 'b', undefined])
		expect(par()).toEqual([undefined, 'b', undefined])

		expect(par('a', 'c', 'd')).toEqual(['a', 'b', 'c', 'd'])
	})

	// TODO: 这个不知道怎么跑起来
	// it(`\`_.${methodName}\` should use \`_.placeholder\` when set`, () => {
	// 	const _ph = (placeholder = {}),
	// 		fn = function () {
	// 			return slice.call(arguments);
	// 		},
	// 		par = func(fn, _ph, 'b', ph),
	// 		expected = isPartial ? ['a', 'b', ph, 'c'] : ['a', 'c', 'b', ph];

	// 	expect(par('a', 'c')).toEqual(expected);
	// 	delete placeholder;
	// });

	it(`creates a function with a \`length\` of \`0\``, () => {
		const fn = function (a, b, c) {},
			par = partial(fn, 'a')

		expect(par.length).toBe(0)
	})

	it(`should ensure \`new par\` is an instance of \`func\``, () => {
		function Foo(value) {
			return value && object
		}

		var object = {},
			par = partial(Foo)

		expect(new par() instanceof Foo)
		expect(new par(true)).toBe(object)
	})

	it(` should clone metadata for created functions`, () => {
		function greet(greeting, name) {
			return `${greeting} ${name}`
		}

		const par1 = partial(greet, 'hi'),
			par2 = partial(par1, 'barney'),
			par3 = partial(par1, 'pebbles')

		expect(par1('fred')).toBe('hi fred')
		expect(par2()).toBe('hi barney')
		expect(par3()).toBe('hi pebbles')
	})

	// TODO: 需要curry方法
	// it(` should work with curried functions`, () => {
	// 	const fn = function (a, b, c) {
	// 			return a + b + c
	// 		},
	// 		curried = curry(partial(fn, 1), 2)

	// 	expect(curried(2, 3)).toBe(6)
	// 	expect(curried(2)(3)).toBe(6)
	// })

	// TODO: 需要curry方法
	// it('should work with placeholders and curried functions', () => {
	// 	const fn = function () {
	// 			return slice.call(arguments)
	// 		},
	// 		curried = curry(fn),
	// 		par = partial(curried, _, 'b', _, 'd')

	// 	expect(par('a', 'c')).toEqual(['a', 'b', 'c', 'd'])
	// })
})
