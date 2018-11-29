<template>
    <div class="key">
      <span class="sp">密匙信息</span>
      <p>
        <span class="sck">商户密匙</span>
        <el-input></el-input>
      </p>
      <p >
        <span class="sck">支付密码</span>
        <el-input ></el-input>
      </p>
      <el-button class="but">随机生成私钥</el-button>
      <el-button  type="success"  @click="init">修改私钥</el-button>
    </div>

</template>

<script>
  import {keys} from  '../../api/api.js'
    export default {
        name: "keys",
      data(){
          return{
            id:'',
          }
      },
      created(){
        this.id = window.sessionStorage.getItem('id'),
        this.init()
      },
      methods:{
        init(){
          let id = this.id;
          keys({
            user_id:id
          }).then(res=>{
            console.log(res)
          })
        }
      }
    }
</script>

<style scoped>
  .el-input{
    width: 350px;
  }
  .key{
    height: 250px;
    background-color: whitesmoke;
  }
  .sp {
    display: inline-block;
    border-bottom: 2px solid green;
    margin-left: 30px;
    margin-top: 20px;
  }
  .sck{
    margin-left: 30px;
  }
  .but{
    margin-left: 30px;
  }
</style>
