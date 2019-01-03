import State from './state'
import VirtualDOM from './virtualdom'

export default class Labile {
	constructor(domRoot, state) {
		if (state === undefined) {
			this.state = new State(domRoot)
			this.virtualDOM = new VirtualDOM()
		} else {
			this.state = new State(state)
			this.virtualDOM = new VirtualDOM(domRoot)
		}

		(async function() {
			setTimeout(() => {
				if (typeof this.onMountEvent === "function") { 
					this.onMountEvent.bind(this)()
				}
			}, 0)
		}).bind(this)()

		console.log(this)
		this.state._onChange = this.stateChange.bind(this)
	}

	stateChange() {
		console.log('alert from state', this.state)
		if (typeof this.onUpdateEvent === "function") { 
			this.onUpdateEvent.bind(this)()
		}
	}

	onMount(func) {
		this.onMountEvent = func

		return this
	}

	onUpdate(func) {
		this.onUpdateEvent = func.bind(this)

		return this
	}

	onUnMount(func) {
		this.onUnMountFunction = func

		return this
	}

}