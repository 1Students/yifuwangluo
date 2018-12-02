<template>
    <div id="home">

      <el-container style="height: 100%"  >
        <el-aside width="200px"style="background-color: #545c64;"  >
          <el-col :span="24">
          <span  style="text-align: center">

            <div style="text-align: center"  class="zid">Alian支付</div>
          </span>
            <div >
            <el-menu  default-active="activeIndex"  class="el-menu-vertical-demo" background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b" @select="handleSelect"
            >
              <el-menu-item index="5">
                <i ><img src="../assets/pay.png" alt="" class="img"></i>
                  <span slot="title">支付账单</span>
              </el-menu-item>
              <el-menu-item index="6">
                <i > <img src="../assets/dan.png" alt="" class="img"> </i>
               <span slot="title" >结算信息</span>
              </el-menu-item>
              <el-menu-item index="7">
                <i ><img src="../assets/bao.png" alt="" class="img"></i>
                <span slot="title" >钱包</span>
              </el-menu-item>
              <el-submenu index="1">
                <template slot="title">
                  <i ><img src="../assets/key2.png" alt="" class="img"></i>
                  <span>密匙管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">登录密码</el-menu-item>
                  <el-menu-item index="1-2" style="display: none">交易密码</el-menu-item>
                  <el-menu-item index="1-3">商户密钥</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3" style="display: none" >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>代付</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">基础信息</el-menu-item>
                    <el-menu-item index="2-2">钱包</el-menu-item>
                   <el-menu-item  index="2-3">账单</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="4" style="display: none">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
            </div>
          </el-col>

        </el-aside>
        <el-container>
          <el-header>
            <div class="title" >Ali支付
            <el-button type="primary" class="tui" @click="tui"> 退出</el-button>
            </div>
          </el-header>
          <el-main style="height: 700px">
          <div>
            <router-view></router-view>
          </div>
          </el-main>
        </el-container>
      </el-container>

    </div>
</template>

<script>

    export default {
        name: "home",
      data(){
          return{
            activeIndex: '1',
          }
      },
      methods:{
        handleSelect(key, keyPath){
          switch(key){
            case '5':
              this.$router.push('/pay');
              this.breadcrumbItems  = ['导航一']
              break;
            case '6':
              this.$router.push('/sett');
              this.breadcrumbItems  = ['导航一']
              break;
            case '7':
              this.$router.push('/money');
              this.breadcrumbItems  = ['导航一']
              break;
            case '1-1':
              this.$router.push('/login');
              this.breadcrumbItems  = ['导航一']
              break;
            case '1-2':
              this.$router.push('/trans');
              this.breadcrumbItems  = ['导航一']
              break;
            case '1-3':
              this.$router.push('/keys');
              this.breadcrumbItems  = ['导航一']
              break;
            case '2-1':
              this.$router.push('/message')
              this.breadcrumbItems  = ['导航二']
              break;
            case '2-2':
              this.$router.push('/wallet')
              this.breadcrumbItems  = ['导航二']
              break;
            case '2-3':
              this.$router.push('/bill')
              this.breadcrumbItems  = ['导航二']
              break;
            case '3':
              this.$router.push('/Page3')
              this.breadcrumbItems  = ['导航三']
              break;
            case '4':
              this.$router.push('/setts')
              this.breadcrumbItems  = ['导航三']
              break;
          }
        },

        tui() {
          this.$confirm('此操作将退出此系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            this.$router.push('/');
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }

      }
    }
</script>

<style scoped>
  #home{

  }
  .had{
    width: 85%;
    height: 70px;
    float: right;
    border-top: 5px solid #e58329;
    border-bottom: 3px solid #f2f2f2;
    display: flex;
    justify-content: space-around;

  }
  .img{
    width: 25px;
    height: 25px;

  }
  .el-menu-vertical-demo{
    height: 100%;
  }
  .pho{
    height: 80px;
    width: 250px;
    padding-top: 10px;
    padding-left: 10%;
  }
  .zid{
    text-align: center;
    margin-top: 20px;
    color: white;
  }
  .zi{
    font-size: 40px;
    font-weight: 700;
   text-align: center;
    margin-top: 10px;
    color: #e58329;
  }
  .but{
    margin-top: 30px;
    height: 50px;
   margin-right: 10%;
  }
  .hed{
    height: 60px;
    border: 1px solid red;
    background-color: #ffffff;
  }
  .bot{
    margin-left: 20%;
    margin-top: 10px;
    margin-right: 30px;
  }
  .lack{
    height: 800px;
    width: 15%;
    background-color:skyblue ;
  }
  .title{
    text-align: center;
    margin-top:10px ;
    font-size: 25px;
  }
  .tui{
    float: right;
    margin-right: 20px;
    margin-bottom: 10px;
  }
</style>
