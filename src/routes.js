// routes.js
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import LandPage from './components/LandPage.vue'
import Lobby from './components/Lobby.vue'
import GamePhase from './components/GamePhase.vue'
import PostGame from './components/PostGame.vue'

export default new Router({
    routes: [
        { path: '/', component: LandPage, name: 'home' },
        { path: '/lobby/:gameid/:playerid', component: Lobby, name: 'lobby'},
        { path: '/game/:gameid/:playerid', component: GamePhase, name: 'game'},
        { path: '/postgame/:gameid/:playerid', component: PostGame, name: 'postgame'}
    ],
    mode: "history"
});