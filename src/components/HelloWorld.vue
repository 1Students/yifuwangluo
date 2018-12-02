<template>
  <div class="hellosc">
      <img src="../assets/bg.png" alt="" class="bg" width="100%">
      <div class="logos">
         <!--<img src="../assets/bglogo.png" alt="" class="er">-->
          <!--<p class="logo">后台登录</p>-->
        <div class="zhanghu">
        <el-row >
              <el-col :span="25" style="padding-left:14%;padding-top:40px;padding-ringht:30px" >
                <el-input id="name"  v-model="name" placeholder="请输入帐号">
                  <template slot="prepend">帐号</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="25" style="margin-left:14%;"  >
                <el-input id="password" v-model="password"   type="password" placeholder="请输入密码">
                      <template slot="prepend">密码</template>
                </el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20" style="padding-left:15%;  padding-bottom:30px;">
                <el-button id="login" v-on:click="ck" @keydown.enter="check" style="width:45%;color: #3a8ee6" >注册</el-button>
                <el-button  class="log"  v-on:click="check"  style="width:45%;"  type="primary" >登录</el-button>
              </el-col>
          </el-row>
      </div>
      </div>

  </div>
</template>

<script >
import bg from '../assets/bg.png'
import {logo} from '../api/api.js'
export default {
  name: 'hellosc',
  data () {


    return {
      name : '',
			password : '',
      img:'',
      bg:bg ,
      msg: '',
      form:{
        inp:'',
        int:''
      },

    }
  },
    methods: {
    ck(){
      this.$router.push({path:'/deal'})
    },
      check : function(event){
				//获取值
				let name = this.name;
				let password = this.password;
				if(name == '' || password == ''){
					this.$message({	message : '账号或密码为空！',	type : 'error'})
					return;
				} else {

          logo({
            phone : name,
            password : password,
          }).then(res=>{
            console.log(res)
            if(res.code === 400004004){
              this.$message({	message : '用户名或密码输入有误，请检查后重新输入！',	type : 'error'});
              // this.$router.push({path:'/home'})
            }else{
              console.log(res.id)
              this.$message({	message : '登陆成功',	type : 'success'})
              window.sessionStorage.setItem('id',res.id);
              this.$router.push({path:'/message'})
            }

          })
        }

			}

    },
    created(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg{
  /* background:url("../assets/bg.png") no-repeat; */
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
  left: 40%;
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
  left: 40%;
  top: 250px;
  background-color: white;
  width: 366px;
}
.log{
  margin-top: 20px;

  margin-left:8%;
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
