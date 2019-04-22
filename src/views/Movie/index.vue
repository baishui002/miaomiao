<template>
  <div id="main">
    <Header title="喵喵电影"/>

    <div class="content">
      <div class="movie-menu">
        <router-link tag="div" :to="{name: 'city'}" class="city_name">
          <span>{{$store.state.city.nm}}</span>
          <i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <router-link tag="div" :to="{name: 'playing'}" class="playing">
          <span>正在热映</span>
        </router-link>
        <router-link tag="div" :to="{name: 'coming'}" class="coming">
          <span>即将上映</span>
        </router-link>
        <router-link tag="div" :to="{name: 'search'}" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>

    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import { messageBox } from "@/components/JS";
import { setTimeout } from "timers";

export default {
  name: "Movie",
  data() {
    return {};
  },
  mounted() {
    this.getLocalCity();
  },
  methods: {
    getLocalCity() {
      var cityId = this.$store.state.city.id;

      setTimeout(() => {
        this.axios.get("/api/getLocation").then(res => {
          if (res.data.status === 0) {
            var cityInfo = res.data.data;
            if (cityId == cityInfo.id) {
              return;
            } else {
              messageBox({
                title: "定位",
                city: cityInfo.nm,
                cancel: "取消",
                ok: "切换城市",
                handleOk() {
                  window.localStorage.setItem("cityName",cityInfo.nm);
                  window.localStorage.setItem("cityId",cityInfo.id);
                  window.location.reload();
                }
              });
            }
          }
        });
      }, 3000);
    }
  },
  components: {
    Header,
    TabBar
  }
};
</script>

<style lang="scss" scoped>
#main {
  .content {
    width: 100%;
    flex: 1;
    position: relative;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    .movie-menu {
      width: 100%;
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      background: #fff;
      // position: relative;
      z-index: 10;

      div {
        line-height: 45px;
      }
      .router-link-active {
        border-bottom: 2px solid red;
        color: red;
      }
      .city_name {
        margin-left: 20px;
      }
      .playing {
        padding: 0 10px;
      }
      .coming {
        padding: 0 10px;
      }
      .search_entry {
        margin-right: 20px;
        i {
          font-size: 24px;
          color: red;
        }
      }
    }
  }
}
</style>
