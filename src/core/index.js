import State from './state'
import VirtualDOM from './virtualdom'
import { lifecycles } from '../globals'

export default class Labile {
	constructor(domRoot, state) {
		this.buildLifeCycle()

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

	buildLifeCycle() {
		for (let event of lifecycles) {
			this['on' + event] = () => {
				console.log('test')
			}
		}
	}
	
}