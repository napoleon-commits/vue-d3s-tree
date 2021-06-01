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
      :duration="$store.state.treeAnimationDuration"
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
const getNodesAtDepth = require('../utils/GetNodesAtDepth').getNodesAtDepth;

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
      if(argumentObject.element.depth === 0){
        this.handleClickedRoot();
      }
      else{
        this.handleClickedNonRoot(argumentObject);
      }
    },
    setVisibleNodesArray(){
      this.visibleNodesArray = levelOrderVisibleNodes(this.$refs);
    },
    setDepth(depth){
      this.$refs['my-custom-tree'].collapseAll(this.$refs['my-custom-tree'].internaldata.root);
      this.performTimeoutFunction(() => {
        this.$refs['my-custom-tree'].expandAll(this.$refs['my-custom-tree'].internaldata.root);
        const nodesToDisplay = getNodesAtDepth(this.$refs, depth - 1);
        nodesToDisplay.forEach(node => {
          this.$refs['my-custom-tree'].collapse(node);
        });
      })
    },
    performTimeoutFunction(fn){
      setTimeout(fn, this.$store.state.treeAnimationDuration*this.$store.state.timeOutMultiplier)
    },
    handleClickedRoot(){
      this.performTimeoutFunction(() => {
        this.setDepth(2);
        this.performTimeoutFunction(() => {
          this.setVisibleNodesArray();
        });
      });
    },
    handleClickedNonRoot(argumentObject){
      this.$refs['my-custom-tree'].collapseAll(this.$refs['my-custom-tree'].internaldata.root)
      this.performTimeoutFunction(() => {
        this.$refs['my-custom-tree'].show(argumentObject.element);
        this.setVisibleNodesArray();
      });
    },
  },
  mounted(){
    this.$root.$on("setDepth", this.setDepth);
    this.$root.$on("setVisibleNodesArray", this.setVisibleNodesArray);
    this.$store.state.maxTreeDepth = this.$refs['my-custom-tree'].internaldata.root.height;
    this.setDepth(this.$store.state.displayDepth);
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