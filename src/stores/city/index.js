import { deflate } from "zlib";

const state = {
    nm: window.localStorage.getItem('cityName') || '北京',
    id: window.localStorage.getItem('cityId') || 1
};
const acitons = {

};
const mutations = {
    CITY_INFO(state, payload){
        state.nm = payload.nm;
        state.id = payload.id;

        window.localStorage.setItem('cityName', payload.nm)
        window.localStorage.setItem('cityId', payload.id)
    }
};

export default {
    namespaced: true,
    state,
    acitons,
    mutations
}