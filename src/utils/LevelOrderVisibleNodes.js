const levelOrderArray = []
const queue = []
const getLevelOrderTraverseOfVisibleNodes = (vueReferences) => {
  levelOrderArray.length = 0
  if (vueReferences['my-custom-tree'] && vueReferences['my-custom-tree'].internaldata) {
    queue.length = 0
    queue.push(vueReferences['my-custom-tree'].internaldata.root)
    traverseQueue()
  }
  return levelOrderArray
}

const traverseQueue = () => {
  while (queue.length > 0) {
    const lengthOfQueue = queue.length
    for (let i = 0; i < lengthOfQueue; i += 1) {
      const poppedNode = queue.shift()
      levelOrderArray.push(poppedNode)
      if (poppedNode.children) {
        poppedNode.children.forEach(node => {
          queue.push(node)
        })
      }
    }
  }
}

module.exports.getLevelOrderTraverseOfVisibleNodes = getLevelOrderTraverseOfVisibleNodes
