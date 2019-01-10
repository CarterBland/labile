export default class State {
  constructor (data) {
    if (typeof data === 'object' || data === undefined) {
      for (let dataKey in data) {
        this.buildAttribute(dataKey, data[dataKey])
      }
    } else {
      throw new Error('Type Error: data passed is not an object')
    }
  }

  buildAttribute (name, value) {
    this['_' + name] = value

    this.__defineGetter__(name, () => {
      return this['_' + name]
    })

    this.__defineSetter__(name, val => {
      this['_' + name] = val

      if (typeof this._onChange === 'function') {
        this._onChange()
      }
    })
  }
}
