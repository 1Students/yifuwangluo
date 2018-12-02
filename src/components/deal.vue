<template>
  <div id="deal">
    <div class="hellosc">
      <img src="../assets/bg.png" alt="" class="bg" width="100%">


      <div class="logos">
        <img src="../assets/bglogo.png" alt="" class="er">
        <p class="logo">注册中心</p>
        <div class="zhanghu">
          <el-row >
            <el-col :span="25" style="padding-left:10%;padding-top:40px;padding-ringht:30px" >
              <el-input id="name"  v-model="name" placeholder="请输入注册手机号码">
                <template slot="prepend">注册手机号码</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="25" style="margin-left:10%;"  >
              <el-input id="password" v-model="password"   type="password" placeholder="请输入注册密码">
                <template slot="prepend">填写登录密码</template>
              </el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" style="padding-left:15%;  padding-bottom:30px;">
              <el-button  class="log"  v-on:click="check"  style="width:100%" type="primary">注册</el-button>
            </el-col>
          </el-row>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import {logos } from '../api/api.js'
  export default {
    name: "deal",
    data() {
      return {
        name: '',
        password: '',
        img: '',

        msg: '',
        form: {
          inp: '',
          int: ''
        }
      }
    },

    methods:{
      check : function(event){
        //获取值
        let name = this.name;
        let password = this.password;
        if(name == '' || password == ''){
          this.$message({	message : '请填写账号或密码！',	type : 'error'})
          return;
        } else {

          logos({
            phone : name,
            password : password,
          }).then(res=>{
            console.log(res)
            if(res.code === 400004004){
              this.$message({	message : '用户名或密码输入有误，请检查后重新输入！',	type : 'error'});
              // this.$router.push({path:'/home'})
            }else{
              console.log(res.id)
              this.$message({	message : '注册成功',	type : 'success'})
              this.$router.push({path:'/'})
            }

          })
        }

      }
    }


  }
</script>

<style scoped>
  .bg{

    height: 100%;
  }

  .hellosc{
    width: 100%;
    height: 100%;
    /* background: url('../assets/bg.png') center center no-repeat; */
    background-size: 100px auto;
    position: fixed;
    left: 0;
    top:0;
  }
  .er{
    position: fixed;
    width: 400px;
    left: 38%;
    top:250px;
  }
  .logo{
    color: aliceblue;
    font-size: 40px;
    position: fixed;
    left: 45%;
    top:250px;

  }
  .zhanghu{
    position: fixed;
    left: 38%;
    top: 380px;
    background-color: white;
    width: 400px;
  }
  .log{
    margin-top: 20px;
    margin-left:0 ;
  }
  .el-row {
    margin-bottom: 20px;
    /* &:last-child {
      margin-bottom: 0;
    } */
  }
  .login-box {
    margin-top:20%;
    margin-left:40%;
  }


</style>
