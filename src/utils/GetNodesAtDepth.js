const nodesAtDepth = [];
const queue = [];
const getNodesAtDepth = (vueReferences, depth) => {
    nodesAtDepth.length =  0;
    if(vueReferences['my-custom-tree'] && vueReferences['my-custom-tree'].internaldata){
        queue.length = 0;
        queue.push(vueReferences['my-custom-tree'].internaldata.root);
        traverseQueue(depth)
    }
    return nodesAtDepth;
};

const traverseQueue = (depth) => {
    let doneTraversing = false;
    while(queue.length > 0 && doneTraversing === false)
    {
        if(queue[0].depth > depth){
            doneTraversing = true;
        }
        else
        {
            traverseLevel(depth);
        }
    }
};

const traverseLevel = (depth) => {
    const lengthOfQueue = queue.length;
    for(let i = 0; i < lengthOfQueue; i+=1)
    {
        const poppedNode = queue.shift();
        if(poppedNode.depth === depth)
        {
            nodesAtDepth.push(poppedNode);
        }
        if(poppedNode.children)
        {
            poppedNode.children.forEach(node => {
                queue.push(node);
            })
        }
    }
};

module.exports.getNodesAtDepth = getNodesAtDepth;
