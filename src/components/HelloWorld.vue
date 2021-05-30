<template>
  <div>
    <tree
      :data="tree"
      node-text="name"
      layoutType="horizontal"
      class="tidytree"
      id="my-custom-tree"
      @clickedNode="onClickedNode"
      ref="my-custom-tree"
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
        name: ServiceBrances[Math.floor(Math.random()*ServiceBrances.length)],
        children: generateChildren(),
      },
      visibleNodesArray: [],
      cssStyle: '',
    };
  },
  methods: {
    getGrayedOutCss(){
      let grayCss = '';
      for(let i = this.visibleNodesArray.length - 1; i > 0; i-=1){
        if(this.$store.state.checkedServices.includes(this.visibleNodesArray[i].data.name) === false){
          grayCss += `
            #my-custom-tree > svg > g > path:nth-child(${(this.visibleNodesArray.length - i - 1)+1}) {
              stroke: grey !important;
            }
          `;
        }
      }
      return grayCss;
    },
    onClickedNode(){
      console.log('UPDATE VISIBLE NODES FROM onClickedNode');
      this.setVisibleNodesArray();
      this.setCssStyle();
    },
    setVisibleNodesArray(){
      // wait for animation to finish
      window.requestAnimationFrame(() => {
        this.visibleNodesArray = levelOrderVisibleNodes(this.$refs);
        console.log(this.visibleNodesArray);
      });
    },
    setCssStyle(){
      this.cssStyle = `
        .linktree {
          stroke: red !important;
        }
        ${this.getGrayedOutCss()}
      `;
    }
  },
  mounted(){
    this.$root.$on("setVisibleNodesArray", this.setVisibleNodesArray);
    this.$root.$on("setCssStyle", this.setCssStyle);
    this.setVisibleNodesArray();
    this.setCssStyle();
  }
}
</script>

<style>
  .tidytree {
    height: 80vh;
    width: 80vw;
    margin: auto;
  }
</style>