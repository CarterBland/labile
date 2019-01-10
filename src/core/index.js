import State from './state'
import VirtualDOM from './virtualdom'
import { lifecycles } from '../globals'

export default class Labile {
  constructor (obj) {
    (async function () {
      setTimeout(() => {
        this.fireLifeCycle('Mount')
        this.mounted = true
      }, 0)
    }).bind(this)()

    this.buildLifeCycle()

    this.state = new State(obj.state)
    this.state._onChange = () => this.updateComponent()

    this.virtualdom = new VirtualDOM(obj.root || document.getElementsByTagName('body'), this.state)
  }

  updateComponent () {
    if (this.mounted !== undefined) {
      this.fireLifeCycle('Update')
    }

    this.virtualdom.buildDOM(this.state)
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
