<template>
  <tree
    :data="tree"
    node-text="name"
    layoutType="horizontal"
    class="tidytree"
  >
  </tree>
</template>

<script>
import { tree } from 'vued3tree';

export default {
  components: {
    tree
  },
  data() {
    return {
      tree: {
        name: "father",
        children:[{
          name: "son1",
          children:[ {name: "grandson"}, {name: "grandson2"}]
        },{
          name: "son2",
          children:[ {name: "grandson3"}, {name: "grandson4"}]
        }]
      },
    };
  },
}
</script>

<style>
  .tidytree {
    height: 80vh;
    width: 80vw;
    margin: auto;
  }
  .linktree {
    stroke: red !important;
  }
</style>