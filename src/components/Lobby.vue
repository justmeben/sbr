<template>
  <v-app>
    <center style='border: 3px solid #19eda6; height: 100%;'>
      <img :src='require(`@/assets/logo.png`)' style='position: absolute; top: 0; right: 10px;' width='50px' height='50px'>
      <h1 style='margin-bottom: 20px; background: #19eda6; color: white;'> The Town Lobby </h1>
      <p>
        Waiting for people to join
      </p>

      <h2 
      style='background: #19eda6; color: white; margin: 10px; border-radius: 5px; padding: 10px;
             padding: 5px; border: 3px dashed #16b881; max-width: 300px'>Game ID: {{ game }}</h2>

      <v-btn v-if="show_start" :disabled='start_btn_disabled' @click='start_game()' outlined style='margin-top: 20px; font-size: 18px'>Start</v-btn>

      <div style='margin-top: 50px; font-size: 24px'>
        <h2 style='text-align: left; margin: 10px; color: #19eda6'>Players:</h2>
        <div style='background: #19eda6; margin: 10px; border-radius: 5px; float: left; padding: 10px 20px; position: relative'
         v-for="item in players" :key="item.id" v-bind:class="{ mainPlayer: item.id == player }">
         <div v-if='game_creator == item.id'
          style='font-size: 16px; position: absolute; top: -15px; left: 0px; font-weight: 400;
           background: #19eda6; border-radius: 5px; padding: 2px 5px;'>Host</div>
         {{ item.name }}</div>
      </div>
    </center>
  </v-app>
</template>

<style scoped>

.mainPlayer {
  font-weight: bold;
}
</style>

<script>
import axiosInstance from "../service/axiosInstance";
import router from "../routes";
  export default {
    name: 'Lobby',

    data: () => ({
      game: -1,
      player: -1,
      players: [],
      start_btn_disabled: false,
      show_start: false,
      game_creator: -1
    }),

    mounted () {
      this.game = this.$route.params.gameid
      this.player = this.$route.params.playerid

      this.get_game_state()
    },

    methods: {
      start_game(){
            axiosInstance
              .post("start/" , {'game': this.game})
              .then(() => {
                  this.start_btn_disabled = true
              })
              .catch(e => {
                console.log(e)
              });
      },
      get_game_state: function(){           
          this.intervalid1 = setInterval(function(){
               axiosInstance
                .post("state/" , {'game': this.game, 'player': this.player})
                .then(res => {
                  this.players = res['data']['game']['players']
                  this.game_creator = res['data']['game']['creator_id']
                  if(this.player == res['data']['game']['creator_id']){
                    this.show_start = true
                  }

                  if(res['data']['game']['phase'] == 2)
                  {
                    router.replace({path: 'game/' + this.game + '/' + this.player, name: 'game' })
                    clearInterval(this.intervalid1)
                  }

                })
                .catch(e => {
                  console.log(e)
                });
          }.bind(this), 1000);
      }
    }
  }
</script>
