<template>
    <div class="search-con">
        <div class="input-search">
            <input type="search" v-model="keyWord">
            <i class="iconfont icon-sousuo"></i>
        </div>
        <Loading v-if="isLoading"/>
        <div v-else class="search-list">
            <h3>电影/电视剧/综艺</h3>
            <ul>
                <li v-for="item in searchList" :key="item.id">
                    <div class="movie-img">
                        <img :src="item.img | imgSetWH('128.180')" alt>
                    </div>
                    <div class="movie-info">
                        <h1>{{item.nm}}</h1>
                        <p>{{item.enm}}</p>
                        <p>{{item.cat}}</p>
                        <p>{{item.rt}}</p>
                    </div>
                    <div class="movie-score">
                        <span>{{item.sc}}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { request } from "http";

export default {
    name: "",
    data() {
        return {
            searchList: [],
            isLoading: false,
            keyWord: "",
            timer: null
        };
    },
    created() {
        // this.getSearchList();
    },
    methods: {
        getSearchList(word) {
            this.isLoading = true;
            var cityId = this.$store.state.city.id;
            this.axios
                .get("/api/searchList?cityId=" + cityId + "&kw=" + word)
                .then(res => {
                    if (res.data.status === 0) {
                        this.isLoading = false;
                        this.searchList = res.data.data.movies.list;
                    }
                });

            // 取消频繁请求
            // this.cancelRequest();
            // this.axios
            //     .get("/api/searchList?cityId=" + cityId + "&kw=" + word, {
            //         cancelToken: new this.axios.CancelToken(c => {
            //             this.source = c;
            //         })
            //     })
            //     .then(res => {
            //         if (res.data.status === 0) {
            //             this.isLoading = false;
            //             this.searchList = res.data.data.movies.list;
            //         }
            //     })
            //     .catch(err => {
            //         if (this.axios.isCancel(err)) {
            //             console.log("Request canceld", err.message);
            //         } else {
            //             console.log("err:", err);
            //         }
            //     });
        },
        cancelRequest() {
            if (typeof this.source === "function") {
                console.log("zhongzhiqingqiu");
                this.isLoading = false;
                this.source("终止请求");
            }
        }
    },
    watch: {
        keyWord(newWord, oldWord) {
            if (newWord.replace(/\s/g, "").length === 0) return;

            //节流
            if(this.timer) {
                clearTimeout(this.timer);
            }
            if(newWord) {
                this.timer = setTimeout(() => {
                    this.getSearchList(newWord);
                }, 800);
            } else {
                this.getSearchList(newWord)
            }
            // this.getSearchList(newWord);
        }
    }
};
</script>

<style lang="scss" scoped>
.search-con {
    width: 100%;
    margin-top: 45px;
    position: absolute;
    top: 0;
    bottom: 0;

    .input-search {
        width: 100%;
        position: relative;
        padding: 10px;
        background: #f5f5f5;
        input {
            width: 100%;
            height: 25px;
            margin-top: 7px;
            padding-left: 30px;
            border: 1px solid #ccc;
            border-radius: 5px;
            outline: none;
            background: #fff;
        }
        i {
            font-size: 16px;
            position: absolute;
            top: 20px;
            left: 15px;
        }
    }

    .search-list {
        h3 {
            font-size: 15px;
            color: #999;
            font-weight: 400;
            padding: 5px 10px;
        }
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
                .movie-score {
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
}
</style>
