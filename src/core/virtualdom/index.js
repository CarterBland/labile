export default class VirtualDOM {
  constructor (root, state) {
    // Sets our root, this is what we're going to be patching
    this.root = root

    // Sets our state
    this.state = state

    // Source of truth
    this.sotDOM = this.mapDOM(root)

    // Current DOM
    this.currentVirtualDOM = []

    // Triggers an automatic rerender, super inefficient but for first load, who cares.
    this.buildDOM(state)
  }

  mapDOM (root) {
    root.constructor.name === 'HTMLCollection' ? root[0].normalize() : root.normalize()

    return (function mapNode (domRoot = document.getElementsByTagName('body')) {
      const nodeArray = []

      for (let node of domRoot) {
        if (node.nodeType === 1 && node.nodeName !== 'SCRIPT') {
          const attributeMap = () => {
            let attributes = {}

            for (let attribute of node.attributes) {
              attributes[attribute.name] = attribute.value
            }

            return attributes
          }

          nodeArray.push({
            type: node.nodeName,
            attributes: attributeMap(),
            children: node.childNodes.length ? mapNode(node.childNodes) : []
          })
        } else {
          if (node.nodeType === 3) {
            nodeArray.push({
              type: '#text',
              text: node.nodeValue
            })
          }
        }
      }
      return nodeArray
    })(root)
  }

  replaceState (text) {
    for (let key of Object.keys(this.state)) {
      if (key[0] !== '_') {
        text = text.replace(new RegExp('{{2} ?' + key + ' ?}{2}', 'g'), this.state[key])
      }
    }

    return text
  }

  buildNewVirtualDOM () {
    this.currentVirtualDOM = function applyState (root) {
      const nodeArray = []

      for (let node of root) {
        if (node.type !== '#text') {
          const attributeMap = () => {
            let attributes = {}

            for (let attribute of Object.keys(node.attributes)) {
              attributes[this.replaceState(attribute)] = this.replaceState(node.attributes[attribute])
            }

            return attributes
          }

          nodeArray.push({
            type: node.type,
            attributes: attributeMap(),
            children: applyState.bind(this)(node.children, {})
          })
        } else {
          nodeArray.push({
            type: node.type,
            text: this.replaceState(node.text)
          })
        }
      }

      return nodeArray
    }.bind(this)(this.sotDOM)

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
    })(document.createDocumentFragment(), this.buildNewVirtualDOM()[0].children)

    window.requestAnimationFrame(() => {
      this.root[0].innerHTML = ''
      this.root[0].appendChild(docFrag)

      let newHTML = this.root[0].innerHTML

      this.root[0].innerHTML = newHTML
    })
  }
}
