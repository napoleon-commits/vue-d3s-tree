<template>
  <div>
    <tree
      :data="tree"
      node-text="name"
      layoutType="horizontal"
      class="tidytree"
      id="my-custom-tree"
      ref="my-custom-tree"
      @expand="onExpand"
      @retract="onRetract"
    >
    </tree>
    <component :is="'style'" type="text/css">
      {{cssStyle}}
    </component>
  </div>
</template>

<script>
import { tree } from 'vued3tree';
import ServiceBrances from '@/static/ServiceBranches';

export default {
  components: {
    tree
  },
  // <g> tag: level order traversal traversing right node, then left node
  // <path> tag: level order but starting at the leaf and leftmost
  data() {
    return {
      tree: {
        name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)],
        children:(()=>{
          const numberOfChildren = Math.floor(Math.random() * 5) + 1;
          const children = [];
          for(let i = 0; i < numberOfChildren; i+=1){
            children.push({name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)]})
          }
          for(let i = 0; i < children.length; i+=1){
            const child = children[i];
            const grandChildren = [];
            const numberOfGrandChildren = Math.floor(Math.random() * 5);
            for(let j = 0; j < numberOfGrandChildren; j+=1){
              grandChildren.push({name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)]})
            }
            child.children = grandChildren;
          }
          for(let i = 0; i < children.length; i+=1){
            for(let j = 0; j < children[i].children.length; j+=1){
              const grandChild = children[i].children[j];
              const numberOfGreatGrandChildren = Math.floor(Math.random() * 5);
              const greatGrandChildren = [];
              for(let k = 0; k < numberOfGreatGrandChildren; k+=1){
                greatGrandChildren.push({name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)]})
              }
              grandChild.children = greatGrandChildren;
            }
          }
          return children;
        })()
      },
      cssStyle: '',
    };
  },
  mounted(){
    this.$root.$on("setNodeTreeCss", this.setNodeTreeCss);
    window.requestAnimationFrame(() => {
      const nodesToCollapse = this.getNodesAtLevel(2);
      nodesToCollapse.forEach(node => {
        this.$refs['my-custom-tree'].collapseAll(node)
      });
      this.setNodeTreeCss();
    });
  },
  methods: {
    getNodesAtLevel(level){
      const nodesAtLevel = [];
      if(level <= (this.$refs['my-custom-tree'].internaldata.root.height + 1)){
        let doneTraversing = false;
        const queue = [];
        queue.push(this.$refs['my-custom-tree'].internaldata.root);
        while(queue.length > 0 && doneTraversing === false){
          const lengthOfQueue = queue.length;
          if((queue[0].depth + 1) > level){
            doneTraversing = true;
          }
          else {
            for(let i = 0; i < lengthOfQueue; i+=1)
            {
              const poppedNode = queue.shift();
              if((poppedNode.depth + 1) === level){
                nodesAtLevel.push(poppedNode)
              }
              if(poppedNode.children){
                poppedNode.children.forEach(node => {
                  queue.push(node)
                });
              }
            }
          }
        }
      }
      return nodesAtLevel;
    },
    getLevelOrderTraverseOfVisibleNodes(){
      const levelOrderArray = [];
      if(this.$refs['my-custom-tree'] && this.$refs['my-custom-tree'].internaldata){
        const queue = [];
        queue.push(this.$refs['my-custom-tree'].internaldata.root);
        while(queue.length > 0){
          const lengthOfQueue = queue.length;
          for(let i = 0; i < lengthOfQueue; i+=1)
          {
            const poppedNode = queue.shift();
            levelOrderArray.push(poppedNode);
            if(poppedNode.children){
              poppedNode.children.forEach(node => {
                queue.push(node)
              });
            }
          }
        }
      }
      return levelOrderArray;
    },
    setNodeTreeCss(){
      this.cssStyle = `
        .linktree {
          stroke: red !important;
        }
        ${(()=>{
          let levelOrderTree = this.getLevelOrderTraverseOfVisibleNodes();
          // remove the head of the tree
          levelOrderTree.shift();
          // reverse the tree
          levelOrderTree = levelOrderTree.reverse();
          let grayCss = '';
          for(let i = 0; i < levelOrderTree.length; i+=1){
            if(this.$store.state.checkedServices.includes(levelOrderTree[i].data.name) === false){
              grayCss += `
                #my-custom-tree > svg > g > path:nth-child(${i+1}) {
                  stroke: grey !important;
                }
              `;
            }
          }
          return grayCss;
        })()}
      `
    },
    onExpand(){
      this.setNodeTreeCss();
    },
    onRetract(){
      this.setNodeTreeCss();
    }
  },
}
</script>

<style>
  .tidytree {
    height: 80vh;
    width: 80vw;
    margin: auto;
  }
</style>