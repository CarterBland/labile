export default class VirtualDOM {
  constructor (root) {
    this.virtualDOM = (function mapNode (domRoot = document.getElementsByTagName('body')) {
      let nodeArray = []
      for (let node of domRoot) {
        if (node.nodeType === 1) {
          const attributeMap = () => {
            let attributes = {}
            console.log(node.attributes)
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
        }
      }
      return nodeArray
    })(root)[0]
  }

  buildDOMFrom () {

  }
}
