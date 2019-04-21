import { deflate } from "zlib";

const state = {
    nm: JSON.parse(window.localStorage.getItem('cityInfo')).nm || '北京',
    id: JSON.parse(window.localStorage.getItem('cityInfo')).id || 1
};
const acitons = {

};
const mutations = {
    CITY_INFO(state, payload){
        state.nm = payload.nm;
        state.id = payload.id;

        window.localStorage.setItem('cityInfo', JSON.stringify({nm: payload.nm, id: payload.id}))
    }
};

export default {
    namespaced: true,
    state,
    acitons,
    mutations
}