/**
 * 
 * Level order traverse a tree
 * 
 * @params {Node} root 
 * 
 * @returns {Array} The names of each node in level order
 */
export default (root) => {
    const nodeNames = [];
    const traverseNode = (node) => {
        if (node === undefined) {
            return;
        }
        const queue = [];
        queue.push(node);
        while (queue.length !== 0) {
            let nodesOnLevel = queue.length;
            while (nodesOnLevel > 0) {
                const poppedItem = queue.shift();
                nodeNames.push(poppedItem.name);
                if (poppedItem.children && poppedItem.children.length) {
                    for (let i = 0; i < poppedItem.children.length; i += 1) {
                        queue.push(poppedItem.children[i]);
                    }
                }
                nodesOnLevel -= 1;
            }
        }
    };
    traverseNode(root);
    return nodeNames;
};