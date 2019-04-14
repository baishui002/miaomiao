<template>
  <header class="main">
      <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: '喵喵电影'
    }

  },
  methods: {}
};
</script>

<style lang="scss" scoped>
  .main {
    width: 100%;
    height: 50px;
    background: #e54847;
    text-align: center;
    position: relative;
    z-index: 10;
    h1 {
      font-size: 18px;
      font-weight: 400;
      line-height: 50px;
      color: #fff;
    }
  }
</style>
