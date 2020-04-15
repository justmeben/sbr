<template>
  <v-app>
    <center style='border: 3px solid #19eda6; height: 100%;'>
      <div>
        <h1 style='margin-bottom: 20px; background: #19eda6; color: white;'> SBR Game </h1>
        <h2 style='text-align: left; margin: 10px; color: #19eda6'>You:</h2>
        <div class='cardcont'>
          <div class='card cardalt' v-bind:class="{ carddisabled: !player_data.is_alive }">
              <h2 class="display-1 text--primary" style='margin-bottom: 15px; font-size: 28px'>
                  {{ player_data.name }}
              </h2>
              <p style='margin-bottom: 5px; color: #444'>{{ get_alive_text(player_data) }}</p>
              <p style='margin-bottom: 0; color: #444'> {{ get_villian_text(player_data) }} </p>
          </div>
        </div>

        <h2 style='text-align: left; margin: 10px; color: #19eda6'>Players:</h2>
        
        <div class='card'  v-bind:class="{ carddisabled: !item.is_alive }" v-for="item in otherPlayers" :key="item.id">
            <h2 class="display-1 text--primary" style='margin-bottom: 15px; font-size: 28px'>
                {{ item.name }}
            </h2>
            <p style='margin-bottom: 5px; color: #555'>{{ get_alive_text(item) }}</p>
            <p style='margin-bottom: 20px; color: #555'> {{ get_villian_text(item) }} </p>
            <v-btn depressed @click="start_vote(item.id)" :disabled='!item.is_alive || !player_data.is_alive'>
                <img width=20 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC/0lEQVRoge2ZX4hMURzHPzM7iyj2TcNi0KLw5I3yIMWDsFp5keT/ss9IPCta7UqeSFKSR8WGWEsoxYPyICFWyiaT3Wlsu81eD+deO2Z+555zZ85cmuZbv5f7O+f7+37vufd3z70X6gRNMdebAXjARMx1/6ADeAzk/BgAtkWY3wLcR5kYAta6FmiDHl+AFN2WHBdL5n0EEs6VhqADvYkg2i14PgnzWmqgV4sngoDSeGTgaAYKJXNGiXlFcpiNjBg4MsKcd66FJg15z4LD1IFahWOfLXgjwWTklQWHacwc4digBW8kmIz0WnD0GPLSijg3YoNu9PfHGc2caahudgP5PjtgWTsDXAa+oMzvrkD/X2gH+pl8IPYDW0rGTAE2AdeAn4Q3iI2Gegmgi/KTUACWVmtGQgrYgDprP0KEl8aiEM6FqBOlm3vUtYlVwJsI4oN4puFLAIdR7Txs/nFXBlLASWAsooECcAuYLXBmgAcWHGPAChcm2oDnEcSPAn3AQSAt8CWAQ8CwBVcW2FGtgQTQid2TPoi3wMwQzgVM7ohN0YfcxiMh7RNFvRc8YI/AlwD2Y+5snj9mHw72ZWngfYUmgsthbhHfPOCu5dx7wPxqDQS4FFIobynoNuqM7sVuFYZR943T3XFWKFQATqOeBTbCPOC15biHqA7mFEnkFnu9aEynpUBT5IAj1PAd5apQdALY7OeTqHf5akwMAItrZSDALOCDUDyL2koALAF+VWAgDxzDvAN3htXAuCDkBTDVH3MioomnqIdr7DilEXTez6eAl5oxpZdlL+o9/p+gCfWRQRK3zh+zXpMPYhzYHqdoHVqB75QLPOfnVwq54tgVs95QbKVc4E4/t1zIBXEndqUW6EJ9KRxEbeeD3r8MvZE18cusHG3ojUyvdXGXPTzs+1beYR0RcRmpOVwaKTjkioyGEQGNS8sFGisioG5WpG6MNC4tF2isiIC6WZG6MeIB34TjQw5raOH6U8wV4dhNxzViQTNwFvUb7itwgRheqhr4H/Ebwk/3koMntY0AAAAASUVORK5CYII="/>
                &nbsp;&nbsp; vote kick
            </v-btn>
        </div>
      </div>
    </center>

    <v-dialog v-model="dialog" persistent max-width="330">
      <v-card>
        <v-card-title class="headline">Vote to kick {{ game_data.vote_target }}</v-card-title>
        <v-card-text>If more then half vote yes, the player will be removed from the game. Are you sure you wish to kick {{ game_data.vote_target }}?</v-card-text>

        <v-card-actions>
          <v-btn color="secondary" depressed @click="vote(true)">Yes</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" depressed @click="vote(false)">No</v-btn>          
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="results_dialog" persistent max-width="330">
      <v-card>
        <v-card-title class="headline">Vote to kick {{ game_data.vote_target }}</v-card-title>
        <v-card-text>Waiting for others to vote...</v-card-text>
        <h2 style='position: relative; bottom: 10px; left: 25px'> {{ calced_vote_count }} / {{ alive_count }} </h2>

      </v-card>
    </v-dialog>

  </v-app>
</template>

<style scoped>

.card {
    border: 1px solid rgb(209, 209, 209);
    border-radius: 5px;
    padding: 15px;
    padding-top: 5px;
    margin: 10px;
    float: left;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    border: 1px solid #19eda6 !important;

}

.cardcont{
  width: 100%;
  float: left;
}

.cardalt{
  border: 1px solid #a3a3a3 !important;
  margin-bottom: 35px;
}

.carddisabled {
    opacity: .5;
    border: 1px solid #f02727 !important;
}

</style>

<script>
import axiosInstance from "../service/axiosInstance";
import router from "../routes";
  export default {
    name: 'GamePhase',

    data: () => ({
      dialog: false,
      results_dialog: false,
      game: -1,
      player: -1,
      players: [],
      game_data: {},
      player_data: {name: ''}
    }),

    computed: {
        otherPlayers: function(){
            var player_id = this.player
            return this.players.filter(function(u){
                return u.id != player_id
            })
        },
        alive_count: function(){
            return this.players.filter(function(u){
                return u.is_alive
            }).length
        },
        calced_vote_count: function(){
            if(this.game_data.vote_count==-1){
                return this.alive_count
            }
            return this.game_data.vote_count
        }
    },

    mounted () {
      this.game = this.$route.params.gameid
      this.player = this.$route.params.playerid

      this.get_game_state()
    },

    methods: {
        vote(is_yes){
            axiosInstance
            .post("vote/" , {'game': this.game, 'is_yes': is_yes})
            .then(() => {
                this.dialog = false
                this.results_dialog = true
            })
            .catch(e => {
                console.log(e.response)
            });   
        },
        start_vote(id){
            axiosInstance
                .post("vote/create/" , {'game': this.game, 'target': id})
                .then(() => {
                    this.dialog = false
                    this.results_dialog = true
                })
                .catch(e => {
                  console.log(e.response)
                });    
        },
        get_villian_text(item){
            if(item.unknown){
                return 'Unknown'
            }
            if(item.is_villian){
                return 'Villain'
            }
            return 'Citizen'
        },
        get_alive_text(item){
            if(item.is_alive){
                return 'Alive'
            }
            return 'Dead'
        },
        get_game_state: function(){           
          this.intervalid2 = setInterval(function(){
               axiosInstance
                .post("state/" , {'game': this.game, 'player': this.player})
                .then(res => {
                  this.players = res['data']['game']['players']
                  this.game_data = res['data']['game']
                  this.player_data = res['data']['player']

                  if(res['data']['game']['phase'] > 2)
                  {
                    router.replace({path: 'postgame/' + this.game + '/' + this.player, name: 'postgame' })
                    clearInterval(this.intervalid2)
                  }

                  if(this.game_data.vote && !this.results_dialog && this.player_data.is_alive){
                      this.dialog=true
                  }
                  else{
                      this.dialog=false
                  }
                  if(!this.game_data.vote){this.results_dialog = false}

                })
                .catch(e => {
                  console.log(e)
                });
          }.bind(this), 1000);
      }
    }
  }
</script>
