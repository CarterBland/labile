import Maps from './maps.js'

export default class VirtualDOM {
  constructor (root, state) {
    this.root = root

    this.state = state

    this.sotDOM = this.generateVDOM(root)

    this.currentVirtualDOM = []

    this.buildDOM(state)
  }

  generateVDOM (root) {
    root.constructor.name === 'HTMLCollection' ? root[0].normalize() : root.normalize()

    return Maps.mapNodes(root)
  }

  generateVDOMWithState () {
    this.currentVirtualDOM = Maps.mapVDOM(this.sotDOM, this.state)

    return this.currentVirtualDOM
  }

  buildDOM (state) {
    this.state = state

    let docFrag = Maps.mapHTML(this.generateVDOMWithState()[0].children)

    window.requestAnimationFrame(() => {
      this.root[0].innerHTML = ''
      this.root[0].appendChild(docFrag)

      let newHTML = this.root[0].innerHTML

      this.root[0].innerHTML = newHTML
    })
  }
}
