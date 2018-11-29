<template>
      <div>
        <el-button @click="cha">查询</el-button>
        账单
      </div>
</template>

<script>
  import {shops} from '../../api/api.js'
    export default {
        name: "bill",
      data(){
          return{
            id:''
          }

      },
      created(){

        this.init()
      },
      methods:{
          init(){
            shops({ id:id}).then(res=>{
              console.log(res)
            })
          },
          cha(){
            shops({}).then(res=>{
              console.log(res)
            })
          }
      }
    }
</script>

<style scoped>

</style>
