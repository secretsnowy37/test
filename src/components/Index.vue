<template>
  <div class="hello">
    <h1 class="title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: 'Uni Health Care'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.links{
  position: fixed;
  top:0;
  right: 0;
  color:white;
}
.links a{
  color:black;
}
h1, h2 {
  font-weight: normal;
  font-family: 'Raleway', sans-serif;
  font-weight: 100;
  color: black;
  text-align: center;
}
@media only screen and (max-width: 784px) {
  .title {
    font-size: 2em;
  }
}
</style>
