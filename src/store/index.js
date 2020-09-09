import { nested } from "./modules/nested.js";
import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default () => new Vuex.Store({
    namespaced: true,
    modules: {
        nested
    }
});