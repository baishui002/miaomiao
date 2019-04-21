<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { log } from "util";

export default {
  name: "BScroll",
  data() {
    return {
        scroll: ''
    };
  },
  props: {
    handleToScroll: {
      type: Function,
      default: function() {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function() {}
    }
  },
  mounted() {
    var scroll = new BScroll(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    });

    this.scroll = scroll;

    //监听滚动事件
    scroll.on("scroll", pos => {
      //   this.$emit('scroll', pos)
      this.handleToScroll(pos);
    });

    //监听滚动事件结束
    scroll.on("touchEnd", pos => {
      //   this.$emit('touchEnd', pos)
      this.handleToTouchEnd(pos);
    });
  },
  methods: {
      toScrollTop(y){
          this.scroll.scrollTo(0, y)
      },
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
