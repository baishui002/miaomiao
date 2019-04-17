<template>
    <div class="coming-con">
           <Loading v-if="isLoading" />
        <ul v-else>
            <li v-for="item in comingList" :key="item.id">
                <div class="movie-img">
                    <img :src="item.img | imgSetWH('128.180')" alt>
                </div>
                <div class="movie-info">
                    <h1>{{item.nm}}</h1>
                    <p>{{item.wish}}&nbsp;想看</p>
                    <p>主演: {{item.star}}</p>
                    <p>{{item.rt}}&nbsp;上映</p>
                </div>
                <div class="btn-buy">购票</div>
           </li>
        </ul>
    </div>
</template>

<script>
import { constants } from "crypto";
export default {
    name: "",
    data() {
        return {
            comingList: [],
            isLoading: true
        };
    },
    created() {
        this.getMovieList();
    },
    methods: {
        getMovieList() {
            this.axios.get("/api/movieComingList?cityId=207").then(res => {
                console.log(res);
                
                if (res.data.status === 0) {
                    this.isLoading = false;
                    this.comingList = res.data.data.comingList;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.coming-con {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 45px;
    position: absolute;
    top: 0;
    bottom: 0;
    ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 10px;
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
