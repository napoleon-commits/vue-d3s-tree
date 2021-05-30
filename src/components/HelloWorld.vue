<template>
  <div>
    <tree
      :data="tree"
      node-text="name"
      layoutType="horizontal"
      class="tidytree"
      id="my-custom-tree"
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
import LevelTraverseTree from '@/utils/LevelTraverseTree';
const generateChildren = require('../utils/GenerateChildren').generateChildren;

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
        children: generateChildren(),
      },
    };
  },
  computed: {
    // ${this.getGrayedOutCss()}
    cssStyle() {
      return `
        .linktree {
          stroke: red !important;
        }
      `;
    }
  },
  methods: {
    getGrayedOutCss(){
      let levelOrderTree = LevelTraverseTree(this.tree);
      // remove the head of the tree
      levelOrderTree.shift();
      // reverse the tree
      levelOrderTree = levelOrderTree.reverse();
      let grayCss = '';
      for(let i = 0; i < levelOrderTree.length; i+=1){
        if(this.$store.state.checkedServices.includes(levelOrderTree[i]) === false){
          grayCss += `
            #my-custom-tree > svg > g > path:nth-child(${i+1}) {
              stroke: grey !important;
            }
          `;
        }
      }
      return grayCss;
    },
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