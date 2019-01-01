export default class State {
	constructor(data) {
		if (typeof data === 'object' || data === undefined) {
			for (let dataKey in data) {
				this.buildAttribute(dataKey, data[dataKey])
			}
		} else {
			throw 'Type Error: data passed is not an object'
		}	
	}

	buildAttribute(name, value) {
		this.state['_' + name] = value

		this.state.__defineGetter__(name, () => {
			return this['_' + name]
		})

		this.state.__defineSetter__(name, val => {
			this['_' + name] = val
		})
	}
}