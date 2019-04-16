<template>
    <footer id="footer">
        <router-link to="/movie" tag="div">
            <i class="iconfont icon-dianying"></i>
            <span>电影</span>
        </router-link>
        <!-- <div @tap='handleTo()'>
      <i class="iconfont icon-dianying"></i>
      <span>电影</span>
        </div>-->
        <router-link to="/cinema" tag="div">
            <i class="iconfont icon-yingyuan"></i>
            <span>影院</span>
        </router-link>
        <router-link to="/mine" tag="div">
            <i class="iconfont icon-wode"></i>
            <span>我的</span>
        </router-link>
    </footer>
</template>

<script>
export default {
    name: "TabBar",
    data() {
        return {};
    },
    methods: {
        handleTo() {
            console.log("aa");
        }
    }
};
</script>

<style lang="scss" scoped>
#footer {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #eee;
    font-size: 12px;
    background: #fff;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .router-link-active {
        color: #f03d37;
    }
    i {
        font-size: 20px;
    }
}
</style>
