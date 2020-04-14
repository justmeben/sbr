<template>
     <v-app>
      <router-view></router-view>
    </v-app>
</template>

<style>
body,
.v-application {
  font-family: "Segoe UI", "Roboto", sans-serif;
}

.form-container {
  margin-bottom: 55px;
  padding: 0 77px;
}

.my-card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}

.my-card {
  width: 344px;
  max-width: 100%;
  margin: 5px;
}

.blurred-text {
  color: transparent;
  text-shadow: 0 0 4px #000;
}

.username {
  text-transform: capitalize;
}

.appbar-link {
  text-decoration: none;
}

.router-link-active {
  font-weight: bold;
}

.details-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.details {
  width: 33.33%;
  box-sizing: border-box;
  padding: 11px;
  /* direction: rtl; */
}

.details-checkbox {
  margin-top: 0;
  padding-top: 0;
}

.detail {
  display: flex;
}
.detail__title {
  font-weight: bold;
}

.detail__value {
  margin-right: 11px;
}

.space-between {
  display: flex;
  justify-content: space-between;
}

.mrtb-11 {
  margin: 11px 0;
}

@media only screen and (max-width: 700px) {
  .details {
    width: 50%;
  }
  .form-container {
    padding: 22px;
  }
}

    .formdiv{
    background: white;
    width: 95%;
    max-width: 700px;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  }


  .cc{
    justify-content: center; display:flex; flex-direction:column; align-items: center;
    text-align: center;
  }
</style>

<script>
export default {
}
</script>