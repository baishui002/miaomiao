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
import BScroll from 'better-scroll'

export default {
  name: "City",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.city-con {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #fff5f0;
  position: absolute;
  margin-top: 45px;
  top: 0;

  .city-list {
    height: 100%;
    flex: 1;
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
