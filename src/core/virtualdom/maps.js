export default class Maps {
  static mapState (state, text) {
    for (let key of Object.keys(state)) {
      text = text.replace(new RegExp('{{2} ?' + key + ' ?}{2}', 'g'), state[key])
    }

    return text
  }

  static mapAttributes (attributes, state = null) {
    let attributeMap = {}

    if (attributes.length) {
      for (let attribute of attributes) {
        if (state !== null) {
          attributeMap[this.mapState(state, attribute)] = this.mapState(state, attributes[attribute])
        } else {
          attributeMap[attribute.name] = attribute.value
        }
      }
    }

    return attributeMap
  }

  static mapNodes (root) {
    const nodeArray = []

    for (let node of root) {
      if (node.nodeType === 1 && node.nodeName !== 'SCRIPT') {
        nodeArray.push({
          type: node.nodeName,
          attributes: this.mapAttributes(node.attributes),
          children: node.childNodes.length ? this.mapNodes(node.childNodes) : []
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
  }

  static mapVDOM (root, state) {
    const nodeArray = []

    for (let node of root) {
      if (node.type !== '#text') {
        nodeArray.push({
          type: node.type,
          attributes: this.mapAttributes(node.attributes, state),
          children: this.mapVDOM(node.children, state)
        })
      } else {
        nodeArray.push({
          type: node.type,
          text: this.mapState(state, node.text)
        })
      }
    }

    return nodeArray
  }

  static mapHTML (vDOM, root = null) {
    if (root === null) {
      root = document.createDocumentFragment()
    }

    for (let element of vDOM) {
      if (element.type !== '#text') {
        let newElement = document.createElement(element.type)

        for (let key of Object.keys(element.attributes)) {
          newElement.setAttribute(key, element.attributes[key])
        }

        newElement = this.mapHTML(element.children, newElement)
        newElement.normalize()
        root.appendChild(newElement)
      } else {
        let newTextElement = document.createTextNode(element.text)
        root.appendChild(newTextElement)
      }
    }

    return root
  }
}
