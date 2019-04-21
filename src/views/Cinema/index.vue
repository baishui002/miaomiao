<template>
  <div>
    <Header title="喵喵影院"></Header>
    <div id="content">
      <div class="cinema-menu">
        <div>
          <span>全城</span>
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div>
          <span>品牌</span>
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div>
          <span>特色</span>
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>
      <div class="cinema-body">
        <div class="cinema-item" v-for="item in cinemaList" :key="item.id">
          <div class="body-left">
            <p>
              {{item.nm}}
              <span class="font-red">{{item.sellPrice}}元起</span>
            </p>
            <p>{{item.addr}}</p>
            <p>
              <span v-for="(value, key) in item.tag" :key="key">{{key | formatTag }}</span>
              <!-- <span class="font-blue">退</span>
              <span class="font-gold">折扣卡</span>
              <span class="font-gold">小吃</span> -->
            </p>
          </div>
          <div class="body-right">{{item.distance}}</div>
        </div>
      </div>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";

export default {
  name: "Cinema",
  data() {
    return {
        cinemaList: []
    };
  },
  mounted(){
      this.getCinemaList();
  },
  methods: {
      getCinemaList(){
          var cityId = this.$store.state.city.id;
          this.axios.get('/api/cinemaList?cityId=' + cityId).then(res=>{
              if (res.data.status === 0){
                  this.cinemaList = res.data.data.cinemas.slice(0, 1);
              }
          })
      }
  },
  components: {
    Header,
    TabBar
  },
  filters:{
      formatTag(key){
          var tags = [
              {key: "allowRefund", value: "改签"},
              {key: "endorse", value: "退"},
              {key: "sell", value: "折扣卡"},
              {key: "snack", value: "小吃"}
          ]

        //   tags.forEach(item=>{
        //       if (key === item.key){
        //           console.log(key, item.value)
        //         return item.value
        //       } 
        //   })
          for(var i=0;i<tags.length;i++){
                if(tags[i].key === key){
                    return tags[i].value;
                }
            }
          return ''
       },
       tt(key){
           return key+'123'
       },
       ClassTag(key){
           var classNames = [
              {key: "allowRefund", value: "font-blue"},
              {key: "endorse", value: "font-blue"},
              {key: "sell", value: "font-gold"},
              {key: "snack", value: "font-gold"}
           ]

            classNames.forEach(item=>{
                if (key === item.key){
                    return item.value;
                } else {
                    return ''
                }
            })

       }
    }
}
</script>

<style lang="scss" scoped>
.cinema-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 45px;
  border-bottom: 1px solid #ccc;
}

.cinema-body {
  padding: 0 10px;
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
