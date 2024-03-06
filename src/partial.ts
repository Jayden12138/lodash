import { isSame } from './utils'

export const _ = Symbol('__lodash_placeholder__')

export function partial(func, ...argsBound) {
	return function (this, ...args) {
		const result = replaceHolders(argsBound, args, _)
		return func.call(this, ...result)
	}
}

function replaceHolders(argsBound, args, placeholder) {
	const result = argsBound.slice(0)
	const length = result ? result.length : 0
	let argsIdx = 0
	let index = -1

	while (++index < length) {
		const value = result[index]
		if (isSame(value, placeholder)) {
			result[index] = args[argsIdx]
			argsIdx++
		}
	}

	if (argsIdx < args.length) {
		result.push(...args.slice(argsIdx))
	}

	return result
}
