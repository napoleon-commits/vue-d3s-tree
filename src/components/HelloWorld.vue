<template>
  <div>
    <tree
      :data="tree"
      node-text="name"
      layoutType="horizontal"
      class="tidytree"
      id="my-custom-tree"
      ref="my-custom-tree"
      @clickedNode="onClickedNode"
      :duration="duration"
    >
    </tree>
    <component :is="'style'" type="text/css">
      {{cssStyle}}
    </component>
  </div>
</template>

<script>
import { tree } from 'vued3tree';
import ServiceBranches from '@/static/ServiceBranches';
const generateChildren = require('../utils/GenerateChildren').generateChildren;
const levelOrderVisibleNodes = require('../utils/LevelOrderVisibleNodes').getLevelOrderTraverseOfVisibleNodes;

export default {
  components: {
    tree
  },
  // <g> tag: level order traversal traversing right node, then left node
  // <path> tag: level order but starting at the leaf and leftmost
  data() {
    return {
      tree: {
        name: ServiceBranches[Math.floor(Math.random()*ServiceBranches.length)],
        children: generateChildren(),
      },
      duration: 10,
      visibleNodesArray: [],
    };
  },
  computed: {
    cssStyle() {
      return `
        .linktree {
          stroke: red !important;
        }
        ${this.getGrayedOutCss}
      `;
    },
    getGrayedOutCss(){
      let grayCss = '';
      for(let i = (this.visibleNodesArray.length - 1); i > 0; i-=1){
        const node = this.visibleNodesArray[i];
        if(this.$store.state.checkedServices.includes(node.data.name) === false){
          grayCss += `
            #my-custom-tree > svg > g > path:nth-child(${(this.visibleNodesArray.length - i - 1)+1}) {
              stroke: grey !important;
            }
          `;
        }
      }
      return grayCss;
    },
  },
  methods: {
    onClickedNode(argumentObject){
      if(argumentObject.element.depth > 0){
        this.$refs['my-custom-tree'].collapseAll(this.$refs['my-custom-tree'].internaldata.root)
      }
      setTimeout((()=>{
        this.$refs['my-custom-tree'].show(argumentObject.element);
        this.setVisibleNodesArray();
      }), this.duration*10);
    },
    setVisibleNodesArray(){
      this.visibleNodesArray = levelOrderVisibleNodes(this.$refs);
    },
  },
  mounted(){
    this.setVisibleNodesArray();
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