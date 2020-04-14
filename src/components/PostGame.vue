<template>
  <v-app>
    <center style='border: 3px solid #19eda6; height: 100%;'>
      <div>
        <h1 style='margin-bottom: 20px; background: #19eda6; color: white;'> SBR Game Results </h1>
        <h1 style='background: #19dfed; color: white; max-width: 300px; 
        margin-bottom: 30px; border: 2px dashed white; border-radius: 5px;'> {{ end_game_msg }} </h1>
        
        <v-btn @click='play_again()' style='margin-bottom: 10px;' outlined color='#19eda6'>Play again</v-btn>

        <h2 style='text-align: left; margin: 10px; color: #19eda6'>Winners:</h2>
        <div class='card'  v-bind:class="{ carddisabled: !item.is_alive }" v-for="item in winners" :key="'w'+item.id">
            <h2 class="display-1 text--primary" style='margin-bottom: 15px; font-size: 28px'>
                {{ item.name }}
            </h2>
            <p style='margin-bottom: 5px; color: #555'>{{ get_alive_text(item) }}</p>
            <p style='margin-bottom: 20px; color: #555'> {{ get_villian_text(item) }} </p>
        </div>

        <h2 style='text-align: left; margin: 10px; margin-top: 20px; color: #ed1919; width: 100%; float: left'>Losers:</h2>
        
        <div class='card'  v-bind:class="{ carddisabled: !item.is_alive }" v-for="item in losers" :key="item.id">
            <h2 class="display-1 text--primary" style='margin-bottom: 15px; font-size: 28px'>
                {{ item.name }}
            </h2>
            <p style='margin-bottom: 5px; color: #555'>{{ get_alive_text(item) }}</p>
            <p style='margin-bottom: 20px; color: #555'> {{ get_villian_text(item) }} </p>
        </div>
      </div>
    </center>

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
    name: 'PostGame',

    data: () => ({
      game: -1,
      player: -1,
      players: [],
      game_data: {},
      player_data: {name: ''}
    }),

    computed: {
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
        },
        winners: function(){
            var civ_won = this.game_data.phase == 3
            return this.players.filter(function(u){
                return u.is_villian != civ_won
            })
        },
        losers: function(){
            var civ_won = this.game_data.phase == 3
            return this.players.filter(function(u){
                return u.is_villian == civ_won
            })
        },
        end_game_msg: function(){
          if (this.game_data.phase == 3){
            return 'Civilians Won!'
          }
          return 'Villains Won!'
        },
    },

    mounted () {
      this.game = this.$route.params.gameid
      this.player = this.$route.params.playerid

      this.get_game_state()
    },

    methods: {
        play_again(){
          router.replace({path: '/'})
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
        get_game_state(){           
          axiosInstance
          .post("state/" , {'game': this.game, 'player': this.player})
          .then(res => {
            this.players = res['data']['game']['players']
            this.game_data = res['data']['game']
            this.player_data = res['data']['player']
          })
          .catch(e => {
            console.log(e)
          });
      }
    }
  }
</script>
