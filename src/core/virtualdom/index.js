export default class VirtualDOM {
  constructor (root, state) {
    this.root = root

    // Source of truth
    this.sotDOM = this.mapDOM(root)

    this.buildDOM(state)
  }

  mapDOM (root) {
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

  buildDOM (state) {
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
    })(document.createDocumentFragment(), this.virtualDOM[0].children)

    window.requestAnimationFrame(() => {
      this.root[0].innerHTML = ''
      this.root[0].appendChild(docFrag)

      let newHTML = this.root[0].innerHTML

      for (let key of Object.keys(state)) {
        if (key[0] !== '_') {
          newHTML = newHTML.replace(new RegExp('{{2} ?' + key + '  ?}{2}', 'g'), state[key])
        }
      }

      this.root[0].innerHTML = newHTML
    })
  }
  
}
