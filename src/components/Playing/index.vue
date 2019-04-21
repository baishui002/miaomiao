<template>
  <div class="movie_body">
    <Loading v-if="isLoading"/>
    <BScroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pulldown">{{pullDownMsg}}</li>
        <li v-for="item in movieList" :key="item.id">
          <div class="movie-img">
            <img :src="item.img | imgSetWH('128.180')" alt>
          </div>
          <div class="movie-info">
            <h1>{{item.nm}}</h1>
            <img v-if="item.version" src="@/assets/images/imax.png" alt>
            <p>
              观众评
              <span class="gold">{{item.sc}}</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn-buy">购票</div>
        </li>
      </ul>
    </BScroller>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "",
  data() {
    return {
      movieList: [],
      isLoading: true,
      pullDownMsg: "",
      preCityId: -1
    };
  },
  activated() {
    this.getMovieList();
  },
  methods: {
    getMovieList() {
      var cityId = this.$store.state.city.id;
      //没切换城市时，返回，不请求数据
      if (cityId === this.preCityId) return;
      this.isLoading = true;
    
      this.axios.get("/api/movieOnInfoList?cityId=" + cityId).then(res => {
        if (res.data.status === 0) {
          this.isLoading = false;
          this.movieList = res.data.data.movieList;
          this.preCityId = cityId;
        }
      });
    },
    //滚动事件触发
    handleToScroll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新中";
      }
    },
    //滚动事件结束触发
    handleToTouchEnd(pos) {
      if (pos.y > 30) {
        this.axios.get("/api/movieOnInfoList?cityId=10").then(res => {
          if (res.data.status === 0) {
            this.pullDownMsg = "更新完成";
            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.pullDownMsg = "";
            }, 2000);
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.movie_body {
  width: 100%;
  flex: 1;
  margin-top: 45px;
  position: absolute;
  top: 0;
  bottom: 0;
  ul {
    padding: 0 10px;
    .pulldown {
      margin: 0;
      padding: 0;
      border: none;
    }
    li {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #ccc;

      .movie-img {
        width: 64px;
        height: 90px;
        img {
          width: 100%;
        }
      }
      .movie-info {
        margin-left: 10px;
        flex: 1;
        position: relative;
        h1 {
          width: 150px;
          font-size: 17px;
          line-height: 19px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        img {
          width: 50px;
          position: absolute;
          top: 5px;
          right: 10px;
        }
        p {
          font-size: 13px;
          color: #666;
          width: 200px;
          line-height: 22px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .gold {
          color: #faaf00;
          font-size: 15px;
          font-weight: 700;
        }
      }
      .btn-buy {
        width: 47px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        background: #f03d37;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
