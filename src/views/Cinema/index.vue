<template>
  <div id="main">
    <Header title="喵喵影院"></Header>
    <div class="content">
      <div class="cinema-menu">
        <div class="menu-item">
          <span>全城</span>
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="menu-item">
          <span>品牌</span>
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="menu-item">
          <span>特色</span>
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>

      <div class="cinema-body">
        <div class="pulldown">{{pullDownMsg}}</div>
        <Loading v-if="isLoading"/>
        <BScroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
          <div>
              <div class="cinema-item" v-for="item in cinemaList" :key="item.id">
            <div class="body-left">
              <p>
                {{item.nm}}
                <span class="font-red">{{item.sellPrice}}元起</span>
              </p>
              <p>{{item.addr}}</p>
              <p>
                <span
                  v-for="(value, key) in item.tag"
                  :key="key"
                  v-if="value===1"
                  :class="key | formatClass"
                >{{key | formatTag }}</span>
              </p>
            </div>
            <div class="body-right">{{item.distance}}</div>
          </div>
          </div>
        </BScroller>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import Loading from "@/components/Loading";
import BScroller from "@/components/BScroller";

export default {
  name: "Cinema",
  data() {
    return {
      cinemaList: [],
      preCityId: -1,
      isLoading: true,
      pullDownMsg: ""
    };
  },
  activated() {
    this.getCinemaList();
  },
  methods: {
    getCinemaList() {
      var cityId = this.$store.state.city.id;
      if (this.preCityId === cityId) {
        this.isLoading = false;
        return;
      }
      this.preCityId = cityId;
      this.axios.get("/api/cinemaList?cityId=" + cityId).then(res => {
        if (res.data.status === 0) {
          this.isLoading = false;
          this.cinemaList = res.data.data.cinemas;
        }
      });
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios
          .get("/api/cinemaList?cityId=" + this.$store.state.city.id)
          .then(res => {
            if (res.data.status === 0) {
              this.pullDownMsg = "更新完成";
              setTimeout(() => {
                this.pullDownMsg = "";
                this.cinemaList = res.data.data.cinemas;
              }, 2000);
            }
          });
      }
    }
  },
  components: {
    Header,
    TabBar,
    Loading,
    BScroller
  },
  filters: {
    formatTag(key) {
      var tags = [
        { key: "allowRefund", value: "改签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" }
      ];

      //   tags.forEach(item=>{
      //       if (key === item.key){
      //           console.log(key, item.value)
      //         return item.value    //forEach方法中，无法return至外层
      //       }
      //   })
      //   for(var i=0;i<tags.length;i++){
      //         if(tags[i].key === key){
      //             return tags[i].value;
      //         }
      //     }

      for (var index in tags) {
        if (tags[index].key === key) {
          return tags[index].value;
        }
      }
      return "";
    },

    formatClass(key) {
      var classNames = [
        { key: "allowRefund", value: "font-blue" },
        { key: "endorse", value: "font-blue" },
        { key: "sell", value: "font-gold" },
        { key: "snack", value: "font-gold" }
      ];

      for (var index in classNames) {
        if (classNames[index].key === key) {
          return classNames[index].value;
        }
      }
      return "";
    }
  }
};
</script>

<style lang="scss" scoped>
#main {
  .content {
    width: 100%;
    flex: 1;
    position: relative;
    left: 0;
    top: 0;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
  }
}
.cinema-menu {
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  background: #fff;
  // position: relative;
  z-index: 10;
  .menu-item {
    line-height: 45px;
    span {
      height: 20px;
    }
  }
}

.cinema-body {
  flex: 1;
  padding: 0 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  margin-top: 45px;
  width: 100%;
  .pulldown {
    font-size: 16px;
  }
}
.cinema-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
  .body-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
      padding-bottom: 12px;
    }
    p:first-child {
      font-weight: 700;
    }
    p:nth-child(2) {
      font-size: 12px;
      color: #666;
    }
    p:last-child {
      font-size: 12px;
    }
    .font-red {
      font-size: 14px;
      font-weight: 400;
      color: red;
    }
    .font-blue {
      margin-right: 5px;
      padding: 1px 3px;
      border: 1px solid skyblue;
      color: skyblue;
    }
    .font-gold {
      margin-right: 5px;
      padding: 1px 3px;
      border: 1px solid gold;
      color: gold;
    }
  }
  .body-right {
    width: 45px;
    height: 40px;
    margin-top: 30px;
    font-size: 14px;
  }
}
</style>
