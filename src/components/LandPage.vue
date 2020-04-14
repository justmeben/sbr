<template>
  <v-app >
    <center style='border: 3px solid #19eda6; height: 100%;'>
      <h1 style='margin-bottom: 20px; background: #19eda6; color: white;'> SBR Game </h1>
      <p>
        Welcome to SBR Game! Create a new game and invite your friends, or join an existing one
      </p>
      <br>
        <h1 style='color: #19eda6; margin-bottom: 25px'>Create a game</h1>
        <v-text-field style='max-width: 400px;' color='#19eda6' filled v-model='player_name' label='Nickname'></v-text-field>
        <v-btn style='color: white' @click='create_game' color='#19eda6' :disabled='player_name == ""'>Create a new game</v-btn>
      <br>
      <br>
      <br>
      <div style='max-width: 550px; height: 2px; background: #19eda6'></div>
      <br>
      <br>
       <h1 style='color: #19eda6; margin-bottom: 25px'>Join a game</h1>
        <v-text-field style='max-width: 400px;' color='#19eda6' filled v-model='player_name' label='Nickname'></v-text-field>
        <v-text-field style='max-width: 400px;' color='#19eda6' filled v-model='game_id' label='Game ID'></v-text-field>
        <v-btn style='color: white' color='#19eda6' @click='join_game' :disabled='game_id == "" || player_name == ""'>Join a game</v-btn>
    </center>

    <v-alert border="top"
      color="red lighten-2"
      dark style='position: fixed; right: 20px; bottom: 10px'
      v-model='alert'
      dismissible
      >
      <div style='margin: 0 20px'>
        {{ alert_msg }}
      </div>
    </v-alert>
  </v-app>
</template>

<script>
import axiosInstance from "../service/axiosInstance";
import router from "../routes";
  export default {
    name: 'LandPage',

    data: () => ({
      game_id: '',
      player_name: '',
      alert_msg: 'Something wrong happend :/',
      alert: false
    }),
    methods: {
      create_game(){
        axiosInstance
        .post("create/" , {'name': this.player_name})
        .then(res => {
          router.push({path: 'lobby/' + res['data']['game'] + '/' + res['data']['player'] })
        })
        .catch(e => {
          console.log(e.response)
        });
      },
      join_game(){
        axiosInstance
        .post("join/" , {'name': this.player_name, 'game': this.game_id})
        .then(res => {
          router.push({path: 'lobby/' + res['data']['game'] + '/' + res['data']['player']})
        })
        .catch(e => {
          console.log(e.response)
          if ('msg' in e.response.data){
            this.alert = true
            this.alert_msg = e.response.data.msg
          }
        });
      }
    }
  }
</script>
