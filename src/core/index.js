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

		if (typeof this.onChange === "function") { 
			this.onMountEvent()
		}
	}

	onMount(func) {
		func()
	}

	onUpdate(func) {
		this.onUpdateFunction = func
	}

	onUnMount(func) {
		this.onUnMountFunction = func
	}

}