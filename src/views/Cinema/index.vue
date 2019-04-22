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
            <BScroller>
                <div class="cinema-body">
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
            preCityId: -1
        };
    },
    activated() {
        this.getCinemaList();
    },
    methods: {
        getCinemaList() {
            var cityId = this.$store.state.city.id;
            if (this.preCityId === cityId) {
                return;
            }
            this.preCityId = cityId;
            this.axios.get("/api/cinemaList?cityId=" + cityId).then(res => {
                if (res.data.status === 0) {
                    this.cinemaList = res.data.data.cinemas;
                }
            });
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
.cinema-menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 45px;
    border-bottom: 1px solid #ccc;
    // z-index: 11;
}

.cinema-body {
    flex:1;
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
