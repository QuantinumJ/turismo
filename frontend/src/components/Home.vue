<template>
  <div class="hello" v-if="user!=null">
    <div v-for=" a in array " :key="a"> 
    {{a}}

    </div>


  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => {
        return {
            user:null,
            editDocumento: false,
            documentacion_obj: {},
            array:["Hola", "mundo"," 21"]
        }
    },
    components: {
        //"confirm": confirm_modal
    },
    methods:{
        getData: function(){
          this.$http.get("http://localhost:3005/users/all").then(response=>{
            console.log(response)
          }).catch(err=>{
            console.log(err)
          })
          

        }

        


        // setFile: function (event) {
        //     this.postobject.documentacion = this.$refs.file.files[0]           
        // },
    },
    beforeMount(){ //Se renderiza antes el html
   this.getData()
    },
    mounted(){  //despues de renderizado

    }  
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
