<template>
  <div class="movie_body">
    <Loading v-if="isLoading"/>
    <BScroller v-else :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
      <ul>
        <li class="pulldown">{{pullDownMsg}}</li>
        <li v-for="item in comingList" :key="item.id">
          <div class="movie-img">
            <img :src="item.img | imgSetWH('128.180')" alt>
          </div>
          <div class="movie-info" @tap="handleToDetail">
            <h1>{{item.nm}}</h1>
            <p>{{item.wish}}&nbsp;想看</p>
            <p>主演: {{item.star}}</p>
            <p>{{item.rt}}&nbsp;上映</p>
          </div>
          <div class="btn-buy">购票</div>
        </li>
      </ul>
    </BScroller>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { constants } from "crypto";

export default {
  name: "",
  data() {
    return {
      comingList: [],
      isLoading: true,
      pullDownMsg: "",
      preCityId: -1
    };
  },
  //当被keep-alive 缓存后，不用再被调用
  // mounted() {
  //   this.getMovieList();
  // },
  activated() {
    this.getMovieList();
  },
  methods: {
    getMovieList() {
      
      var cityId = this.$store.state.city.id;
      if (cityId === this.preCityId) return;

      this.isLoading = true;
      this.axios.get("/api/movieComingList?cityId=207").then(res => {
          console.log('coming-api')
        if (res.data.status === 0) {
          this.isLoading = false;
          this.comingList = res.data.data.comingList;
          this.preCityId = cityId
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
        this.axios.get("/api/movieComingList?cityId=" + this.$store.state.city.id).then(res => {
          if (res.data.status === 0) {
            this.pullDownMsg = "更新完成";
            setTimeout(() => {
              this.comingList = res.data.data.comingList;
              this.pullDownMsg = "";
            }, 2000);
          }
        });
      }
    },
    handleToDetail() {
      console.log("detail");
    }
  }
};
</script>

<style lang="scss" scoped>
.movie_body {
  flex: 1;
  width: 100%;
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

        p {
          font-size: 13px;
          color: #666;
          width: 200px;
          line-height: 22px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .btn-buy {
        width: 47px;
        height: 27px;
        line-height: 27px;
        text-align: center;
        background: #3c9fe6;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
