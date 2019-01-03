export default class State {
	constructor(data) {
		if (typeof data === 'object' || data === undefined) {
			for (let dataKey in data) {
				console.log(dataKey, data[dataKey])
				this.buildAttribute(dataKey, data[dataKey])
			}
		} else {
			throw 'Type Error: data passed is not an object'
		}	
	}

	buildAttribute(name, value) {
		console.log('hit')
		this['_' + name] = value

		this.__defineGetter__(name, () => {
			return this['_' + name]
		})

		this.__defineSetter__(name, val => {
			console.log('state changed, triggering virtual dom update')
			if (typeof this._onChange === "function") {
				this._onChange()
			}

			this['_' + name] = val
		})

		console.log(this)
	}
}