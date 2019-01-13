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

  replaceState (text) {
    for (let key of Object.keys(this.state)) {
      if (key[0] !== '_') {
        text = text.replace(new RegExp('{{2} ?' + key + ' ?}{2}', 'g'), this.state[key])
      }
    }

    return text
  }

  mapVDomWithState () {
    this.currentVirtualDOM = Maps.mapVDOM(this.sotDOM, this.state)

    console.log(this.currentVirtualDOM)

    return this.currentVirtualDOM
  }

  buildDOM (state) {
    this.state = state
    let docFrag = (function buildHTML (root, vDOM) {
      for (let element of vDOM) {
        if (element.type !== '#text') {
          let newElement = document.createElement(element.type)

          for (let key of Object.keys(element.attributes)) {
            newElement.setAttribute(key, element.attributes[key])
          }

          newElement = buildHTML(newElement, element.children)
          newElement.normalize()
          root.appendChild(newElement)
        } else {
          let newTextElement = document.createTextNode(element.text)
          root.appendChild(newTextElement)
        }
      }

      return root
    })(document.createDocumentFragment(), this.mapVDomWithState()[0].children)

    window.requestAnimationFrame(() => {
      this.root[0].innerHTML = ''
      this.root[0].appendChild(docFrag)

      let newHTML = this.root[0].innerHTML

      this.root[0].innerHTML = newHTML
    })
  }
}
