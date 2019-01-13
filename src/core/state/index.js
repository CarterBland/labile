export default class StateObject {
  constructor (state) {
    if (typeof state === 'object' || state === undefined) {
      this.buildState(this, state)
    } else {
      throw new Error('Type Error: data passed is not an object')
    }
  }

  buildState (object, data) {
    for (let dataKey in data) {
      let state = this.buildAttribute(object, { key: dataKey, value: data[dataKey] })

      if (typeof data[dataKey] === 'object') {
        this.buildState(state, data[dataKey])
      }
    }
  }

  buildAttribute (object, data) {
    object['_' + data.key] = data.value

    object.__defineGetter__(data.key, () => {
      return object['_' + data.key]
    })

    object.__defineSetter__(data.key, val => {
      object['_' + data.key] = val

      this.updateComponent()
    })

    return object['_' + data.key]
  }

  getStateObject (object = this) {
    let stateObject = {}

    for (let prop of Object.keys(object)) {
      if (prop[0] === '_') {
        if (typeof object[prop] === 'object') {
          stateObject[prop.replace('_', '')] = this.getStateObject(object[prop])
        } else {
          stateObject[prop.replace('_', '')] = object[prop]
        }
      }
    }

    return stateObject
  }
}
