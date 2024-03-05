export const _ = Symbol('placeholder')

export function partial(func, ...argsBound) {
	return function (...args) {
		let handled = 0
		let newArgs: any = []

		argsBound.forEach(item => {
			let curArg
			if (item === _) {
				curArg = args[handled]
				handled++
			} else {
				curArg = item
			}
			newArgs.push(curArg)
		})

		for (let i = handled; i < args.length; i++) {
			newArgs.push(args[i])
		}

		return func.call(this, ...newArgs)
	}
}
