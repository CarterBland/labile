import StateObject from './state'
import VirtualDOM from './virtualdom'
import { lifecycles } from '../globals'

export default class Labile extends StateObject {
  constructor (obj) {
    super(obj.state);

    (async function () {
      setTimeout(() => {
        this.fireLifeCycle('Mount')
        this.mounted = true
      }, 0)
    }).bind(this)()

    this.buildLifeCycle()

    this.virtualdom = new VirtualDOM(obj.root || null, this.getStateObject())
  }

  updateComponent () {
    if (this.mounted !== undefined) {
      this.fireLifeCycle('Update')
    }

    this.virtualdom.buildDOM(this.getStateObject())
  }

  buildLifeCycle () {
    for (let event of lifecycles) {
      this['on' + event] = (func) => {
        this['on' + event + 'Method'] = func

        return this
      }
    }
  }

  fireLifeCycle (event) {
    if (typeof this['on' + event + 'Method'] === 'function') {
      this['on' + event + 'Method']()
    }
  }
}
