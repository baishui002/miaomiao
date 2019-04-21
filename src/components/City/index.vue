<template>
  <div class="city-con">
    <Loading v-if="isLoading"/>
    <BScroller v-else ref="city_list">
      <div class="city-list">
        <div class="hot-city">
          <h3 class="city-h3">热门城市</h3>
          <ul>
            <li
              v-for="item in hotCity"
              :key="item.id"
              @tap="handleToCity(item.nm , item.id)"
            >{{item.nm}}</li>
            <!-- <li>北京</li> -->
          </ul>
        </div>
        <div class="city-sort" ref="city_sort">
          <div class="city-items" v-for="item in cityList" :key="item.index">
            <h3 class="city-h3">{{item.index}}</h3>
            <ul>
              <li
                v-for="city in item.list"
                :key="city.id"
                @tap="handleToCity(city.nm , city.id)"
              >{{city.nm}}</li>
              <!-- <li>北京</li> -->
            </ul>
          </div>
        </div>
      </div>
    </BScroller>
    <div class="city-index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "City",
  data() {
    return {
      //cityList: [ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
      hotCity: [],
      cityList: [],
      isLoading: true
    };
  },
  created() {
    this.getCityList();
  },
  mounted() {},
  methods: {
    getCityList() {
      this.hotCity = JSON.parse(localStorage.getItem("hotCity"));
      this.cityList = JSON.parse(localStorage.getItem("cityList"));

      if (this.hotCity && this.cityList) {
          this.isLoading = false;
      } else {
        this.axios.get("/api/cityList").then(res => {
          if (res.data.status === 0) {
            this.isLoading = false;
            var cities = res.data.data.cities;
            var { hotCity, cityList } = this.formatCityList(cities);

            this.hotCity = hotCity;
            this.cityList = cityList;

            localStorage.setItem("hotCity", JSON.stringify(hotCity));
            localStorage.setItem("cityList", JSON.stringify(cityList));
          }
        });
      }
    },
    formatCityList(cities) {
      var cityList = [];
      var hotCity = [];

      for (var i = 0; i < cities.length; i++) {
        //热门城市
        if (cities[i].isHot === 1) {
          hotCity.push(cities[i]);
        }

        // 所有城市
        //cityList: [ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
        var firstWorld = cities[i].py.slice(0, 1).toUpperCase();

        if (toCom(firstWorld)) {
          //累加数据
          cityList.some(item => {
            if (item.index === firstWorld) {
              item.list.push({
                nm: cities[i].nm,
                id: cities[i].id
              });
              return true;
            }
          });
        } else {
          //新增index
          cityList.push({
            index: firstWorld,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        }
      }

      function toCom(firstWorld) {
        return cityList.some(item => {
          return firstWorld === item.index;
        });
      }

      //城市排序
      cityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      });

      return {
        hotCity,
        cityList
      };
    },
    handleToIndex(index) {
      var h3 = this.$refs.city_sort.getElementsByTagName("h3");
      //this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_list.toScrollTop(-h3[index].offsetTop);
    },
    handleToCity(nm, id) {
        var cityId = this.$store.state.city.id;
        if (cityId === id){
            this.$store.state.city.cityIsChange = true;
        }
        this.$store.commit('city/CITY_INFO', {nm, id})
        this.$router.push({name: 'playing'})
    }
  }
};
</script>

<style lang="scss" scoped>
.city-con {
  width: 100%;
  display: flex;

  position: absolute;
  margin-top: 45px;
  top: 0;
  bottom: 0;
  .city-list {
    flex: 1;
    background: #fff5f0;
    overflow: auto;
    .city-h3 {
      width: 100%;
      line-height: 30px;
      font-size: 14px;
      padding-left: 15px;
      font-weight: 400;
      background: #f0f0f0;
    }

    .hot-city {
      margin-top: 20px;

      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        li {
          width: 29%;
          height: 35px;
          line-height: 35px;
          text-align: center;
          background: #fff;
          margin-left: 3%;
          margin-top: 15px;
          border: 1px solid #e6e6e6;
          border-radius: 3px;
          box-sizing: border-box;
        }

        li:nth-child(3n) {
          margin-right: 3%;
        }
      }
    }

    .city-sort {
      .city-items {
        margin-top: 20px;
        ul {
          padding-left: 20px;
          li {
            line-height: 30px;
          }
        }
      }
    }
  }
  .city-index {
    width: 20px;
    text-align: center;
    border-left: 1px solid #eee;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
