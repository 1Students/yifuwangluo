<template>
    <div class="key">
      <span class="sp">密匙信息</span>
      <p>
        <span class="sck">商户密匙</span>
        <el-input v-model="key"></el-input>
      </p>
      <p  style="display: none">
        <span class="sck">支付密码</span>
        <el-input ></el-input>
      </p>
      <el-button class="but" @click="sui">随机生成私钥</el-button>
      <el-button  type="success"  @click="xiu">修改私钥</el-button>
    </div>

</template>

<script>
  import {keys ,shopkeys, xukeys } from  '../../api/api.js'
    export default {
        name: "keys",
      data(){
          return{
            id:'',
            key:''
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
            params:{
              user_id:id
            }
          }).then(res=>{
            this.key = res.key
          })
        },
        sui(){
          let id = this.id;
          shopkeys({
            user_id:id
          }).then(res=>{
            this.key = res.key
          })
        },
        xiu(){
          let id = this.id;
          let key = this.key;
          xukeys({
            user_id:id,
            secret_key:key,
          }).then(res=>{
            this.key = res.key
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
