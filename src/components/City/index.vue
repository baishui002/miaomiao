<template>
  <div class="city-con">
    <div class="city-list">
      <div class="hot-city">
        <h3 class="city-h3">热门城市</h3>
        <ul>
          <li>北京</li>
          <li>北京</li>
          <li>北京</li>
          <li>北京</li>
          <li>北京</li>
          <li>北京</li>
          <li>北京</li>
        </ul>
      </div>
      <div class="city-sort">
        <div class="city-items">
          <h3 class="city-h3">A</h3>
          <ul>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
          </ul>
        </div>
        <div class="city-items">
          <h3 class="city-h3">A</h3>
          <ul>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
          </ul>
        </div>
        <div class="city-items">
          <h3 class="city-h3">A</h3>
          <ul>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
            <li>北京</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="city-index">
      <ul>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
        <li>A</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { truncate } from 'fs';

export default {
  name: "City",
  data() {
    return {
        //cityList: [ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
        hotCity:[],
        cityList: []
    };
  },
  created(){
      this.getCityList()
  },
  methods: {
      getCityList(){
          this.axios.get('/api/cityList').then((res)=>{
              if(res.data.status === 0 ){
                  var cities = res.data.data.cities;
                  
                  var {hotCity, cityList} = this.formatCityList(cities)
                  console.log(hotCity)
                  console.log(cityList)
              }
          })
      },
      formatCityList(cities){
          var cityList = []
          var hotCity = []

          for(var i=0;i< cities.length;i++){

              //热门城市
              if(cities[i].isHot === 1){
                  hotCity.push(cities[i])
              }
            
                // 所有城市
                //cityList: [ { index : 'A' , list : [{ nm : '阿城' , id : 123 }] } ]
                var firstWorld = cities[i].py.slice(0, 1).toUpperCase();
                // 如果已存在，则找到对应的index后再插入数据
                if(toCom(firstWorld)){  
                    cityList.some(item=>{
                        if(item.index === firstWorld){
                            item.list.push({cname: cities[i].nm, id: cities[i].id})
                            return true
                        }
                    })
                } else{
                    cityList.push({index: firstWorld, list: [{cname: cities[i].nm,id:cities[i].id}]})
                }

          }

        function toCom(firstWorld){
            return cityList.some(item=>{
               return firstWorld === item.inde
            })
        }

        return {
            hotCity,
            cityList
        }
          
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
    height: 100%;
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
