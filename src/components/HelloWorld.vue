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
      :duration="10"
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
      console.log(
        document.getElementsByClassName('linktree')
      )
      const indexesOfGrayedLinks = [];
      let textTagArray = document.getElementsByTagName('text');
      for(let i = 1; i < textTagArray.length; i+=1)
      {
        const element = textTagArray[i];
        if(this.$store.state.checkedServices.includes(element.innerHTML) === false){
          console.log(element)
          indexesOfGrayedLinks.push(i)
        }
      }
      console.log(indexesOfGrayedLinks);
      const numberOfPathElements = document.getElementsByClassName('linktree').length;
      indexesOfGrayedLinks.forEach(index => {
        grayCss += `
          #my-custom-tree > svg > g > path:nth-child(${numberOfPathElements-index+1}) {
            stroke: grey !important;
          }
        `;
      });
      // for(let i = this.visibleNodesArray.length - 1; i > 0; i-=1){
      //   if(this.$store.state.checkedServices.includes(this.visibleNodesArray[i].data.name) === false){
      //     grayCss += `
      //       #my-custom-tree > svg > g > path:nth-child(${(this.visibleNodesArray.length - i - 1)+1}) {
      //         stroke: grey !important;
      //       }
      //     `;
      //   }
      // }
      return grayCss;
    },
    onExpand(){
      this.updateUI();
    },
    onRetract(){
      this.updateUI();
    },
    setVisibleNodesArray(){
      this.visibleNodesArray = levelOrderVisibleNodes(this.$refs);
    },
    setCssStyle(){
      this.cssStyle = `
        .linktree {
          stroke: red !important;
        }
        ${this.getGrayedOutCss()}
      `;
    },
    updateUI(){
      // wait for animation to finish
      setTimeout(() => {
        this.setVisibleNodesArray();
        this.setCssStyle();
      }, 1000);
    }
  },
  mounted(){
    this.$root.$on("updateUI", this.updateUI);
    this.updateUI();
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