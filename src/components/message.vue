<template>
  <div id="message">
    <div class="had" >
      <div class="hade">
        <img src="../assets/logoes.png" alt="" class="pho">
        <span class="zi">资金结算</span>
        <p class="but">
          <button class="exit" @click="qui">退 出</button>
          <img src="../assets/toxa.png" alt="" class="pg">
        </p>
      </div>
    </div>
    <div class="hed">
      <div class="hede">
        <router-link  to="/message">
          <span class="hezuo">合作商信息</span>
        </router-link>
        <!--<router-link  to="/deal">-->
          <!--<span >交易管理</span>-->
        <!--</router-link>-->

      </div>
      <!--<el-button style="margin-right: 30px">交易管理</el-button>-->
      <!--<el-button>业务处理</el-button>-->
    </div>
    <div class="box">
      <div class="lef">
        <div class="tit">
          <span style="text-indent: 35px;font-weight: 900" >你好 <span class="hele">{{partnerHello}}</span>!</span>
          <div class="titi">
            <p>
              <span style="font-weight: 900" >选择日期</span>
              <el-date-picker
                class="searchdate"
                v-model="xms"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
                style="width: 150px">
              </el-date-picker>
              <el-button  style="background-color: #e58329;color:#ffffff " size="small" @click="ch()" >查询</el-button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </p>

      </div>
        </div>
        <div class="bor">
          <div class="leda"  >
            <p class="tid" >交易数据</p>
            <p class="lda"> <span style="padding-left: 20px;" >成功金额：</span>  <span class="lrf"> {{deal.amount}}</span> 元 </p>
            <div class="les"><p style="margin: 0">成功笔数 :</p><span class="less" >{{deal.okCount}}</span> <span>笔</span>  </div>
            <div class="ler"> <p style="margin: 0">失败笔数: </p> <span class="lerr">{{deal.errCount}}</span> 笔 </div>
          </div>
          <div class="regs">
            <p class="tid">提现数据</p>
            <p class="lda"><span style="padding-left: 20px;">成功金额：</span>  <span class="lrf" >{{withs.amount}} </span>元 </p>
            <div class="les"><p style="margin: 0">成功笔数 :</p><span class="less" >{{withs.okCount}}</span> <span>笔</span>  </div>
            <div class="ler" > <p style="margin: 0">失败笔数 :</p > <span class="lerr">{{withs.errCount}} </span>笔 </div>
          </div>
        </div>

      </div>

      <div class="rig">
        <p class="fti">渠道商信息  </p>
        <p class="mss">
          <span>账户名：<span>{{account}}</span></span>
          <span>账户类型：<span> 普通账户 </span></span>  </p>
        <div class="rigx">
          <div :class="{crc:index%2===0}"
               v-for=" (item,index) in partner "
               :data-index="index ">
            <div class="crcc" style="height: 100px">
              <p class="qu">{{item.channelName}} </p>
              <p class="xi">
                <span>交易费率 <span style="margin-right: 18px">{{item.rate*10000/100}}%</span> </span>
                <span>提现费率 <span>{{item.fee}}元/笔</span> </span>
              </p>
            </div>

          </div>
        </div>

      </div>
      <el-button class="cha" round  @click="cha(xms)"> 查看更多</el-button>
    </div>
  </div>
</template>

<script>
  import {partnerList ,getTotal ,} from '../api/api.js'
  export default {
    name: "message",
    data(){
      let aday=(new Date()).toLocaleDateString()
      aday =aday.replace(/\//g,'-');
      function getDay(num, str) {
        var today = new Date();
        var nowTime = today.getTime();
        var ms = 24*3600*1000*num;
        today.setTime(parseInt(nowTime + ms));
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
      }
      var yesterday = getDay(-1, '-');
      console.log(aday);
      console.log(yesterday);
      return{
        partnerHello:'',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now()- 8.64e7;
          }
        },
        xms:'',
        day:aday,
        tabChange:true,
        days:yesterday,
        account:'',
        partner:[{
          channelName:'',
          fee:'',
          rate:'',
        }],
        deal:[{
          amount:'',
          okCount:'',
          errCount:'',
          partnerFee:'',
        }],//交易
        withs:[{
          amount:'',
          okCount:'',
          errCount:'',
          partnerFee:'',
        }],//提现
        pageNum:'',//页面编号
        pageSize:''//页大小
      }
    },
    created(){
    this.xms=this.days;
      this.pcs();
      this.zog();
      // this.td();
      this.account =window.sessionStorage.getItem("name");
      console.log(this.account);
      this.ch()
    },
    methods:{
      login() {
        this.$alert('登陆超时，请重新登陆', '', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.hash='#/'
          }
        });
      },
      pcs(){
        //合作商信息
        partnerList({}).then(res=>{
          console.log(res);
          this.partner = res.data;
          this.partnerHello=this.partner[0].partnerName;
          // console.log('这里')
          // console.log(this.partner)
          if(res.code!='C_000'){
            this.login()
          }
        })
      },
      open() {
        this.$alert('请重新输入查询日期', '数据为空', {
          confirmButtonText: '确定',
          callback: action => {
            this.xms=this.days;
            this.ch()
          }
        });
      },
      ch(){
        let day = this.day;
        let days = this.days;
        let xms = this.xms;
        if ( day <= days){
          this.$message({message: '超过查询日期'
          });
        }else {
          getTotal({
            recordDate:xms
          }).then(res=>{
            if(res.code!='C_000'){
              window.location.hash='#/'
            }
            if(res.data == ''){
              this.$message({message: '暂时没有相关数据'});
              this.pcs();
              this.zog();
              // this.td();
            }
            if(res.data[0].amount==0){
              // this.open();
            };
            console.log(res.data.length)
            this.deal = res.data[1];
            this.deal.amount = res.data[1].amount;
            this.deal.okCount = res.data[1].okCount;
            this.deal.errCount = res.data[1].errCount;
            this.deal.partnerFee = res.data[1].partnerFee;
            this.withs = res.data[0];
            this.withs.amount = res.data[0].amount;
            this.withs.okCount = res.data[0].okCount;
            this.withs.errCount = res.data[0].errCount;
            this.withs.partnerFee = res.data[0].partnerFee;
            console.log(this.deal);
          })
        }


      },
      zog(){
        let days = this.days;
        let xms = this.xms;
        getTotal({
          recordDate:days
        }).then(res=>{
          if(res.code!='C_000'){
            window.location.hash='#/'
          }
          this.partnerId=res.data[1].partnerId;
          this.deal = res.data[1];
          this.deal.amount = res.data[1].amount;
          this.deal.okCount = res.data[1].okCount;
          this.deal.errCount = res.data[1].errCount;
          this.deal.partnerFee = res.data[1].partnerFee;

          this.withs = res.data[0];
          this.withs.amount = res.data[0].amount;
          this.withs.okCount = res.data[0].okCount;
          this.withs.errCount = res.data[0].errCount;
          this.withs.partnerFee = res.data[0].partnerFee;
          console.log(this.deal);
        })
      },
      cha(){
        let xms = this.xms;
        this.$router.push({path:'/deal/${id}'});
        if(xms == ''){
          window.sessionStorage.setItem('day',this.days);
        }else {
          window.sessionStorage.setItem('day',this.xms);
        }
        this.$router.push({
          name: 'deal',
          params: {
            id: this.xms
          }
        })

      },
      qui(){
        this.$confirm('此操作将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!',
          });
          this.$router.push({path:'/',})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped >

  #message{
    background-color: #ebeef2;
  }
  /*tab栏*/
  .hezuo{
    height: 60px;
    border-bottom: 2px solid #e58329;
    line-height: 60px;
    display: inline-block;

  }
  /*退出按钮*/
  .exit{
    width: 120px;
    height: 40px;
    border-radius: 20px;
    background-color: #e58329;
    outline: none;
    border: none;
    color:white;
  }
  .pg{
    width: 40px;
    height: 40px;
    margin-left: 20px;
  }
  .rigx{
    background-color: white;
    height: 300px;
  }
  .had{
    width: 100%;
    height: 100px;
    border-top: 5px solid #e58329;
    border-bottom: 3px solid #f2f2f2;
    background-color: #ffffff;
  }
  .hade{
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .pho{
    height: 107px;
    width: 297px;

  }
  .hede a{
    margin-right: 50px;
    text-decoration: none;
    color:#2c3e50;
    font-size: 18px;
    font-family: '微软雅黑 Light';
    font-weight: 900;
  }
  .zi{
    font-size: 40px;
    font-weight: 700;
    padding-top: 25px;
    color: #e58329;
  }
  .but{
    background-color:#ffffff;
    height: 40px;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .hed{
    height: 60px;
    background-color: #ffffff;
  }
  .bot{
    background-color: #ffffff;
    color: black;

    margin-left: 20%;
    font-size:25px ;
  }
  .lef{

    height: 450px;
    width: 60%;
    float: left;
    background-color:#ffffff ;
  }
  .rig{
    height: 450px;
    width: 35%;

    float: right;
  }
  .titi{
    display: flex;
  }

  .tit{
    border-top: 5px solid #e58329;
    border-bottom: 3px solid #f0f2f5;
    background-color: #ffffff;
    height: 50px;
    padding: 10px 0;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content:space-between;
    align-items:center;
  }
  .lrf{
    padding-left: 10px;
    color: #e79345;
    font-size: 23px;
  }
  .bor{
    overflow: hidden;
    height: 330px;
    width: 100%;
  }
  .leda{
    margin-left: 5%;
    margin-top: 5%;
    height: 250px;
    width: 40%;
    background-color: white ;
    float: left;
  }
  .tid{
    border: 1px whitesmoke solid;
    border-bottom: 5px solid #ffffff ;
    height: 50px;
    width: 100%;
    margin: 0;
    font-size: 18px;
    text-align: center;
    background-color: #f7fafa;
    padding-top:20px ;
    font-weight: 900;
  }
  .lda{
    border: 1px solid whitesmoke;
    width: 100%;
    font-size: 15px;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 30px;
    padding-bottom: 30px;
    height: 30px;
    float: left;
    font-weight: 500;
    color:black;
    background-color: #f7fafa;
  }

  .les{
    font-weight: 500;
    margin-top: 5px;
    border: 1px solid whitesmoke;
    text-align: center;
    width: 48%;
    padding-top: 30px;
    padding-bottom: 30px;
    height: 30px;
    float: left;
    background-color: #f7fafa;
  }

  .less{

    font-size: 20px;
    color: #e79345;
  }
  .ler{
    font-weight: 500;
    color:black;
    border: 1px solid whitesmoke;
    width: 48%;
    text-align: center;
    margin-top: 5px;
    padding-top: 30px;
    padding-bottom: 30px;
    height: 30px;
    float: right;
    background-color: #f7fafa;
  }
  .lerr{
    color: #e71121;
    font-size: 20px;
  }
  .regs{
    padding-top: 1px;
    margin-left: 3%;
    margin-top: 5%;
    height: 250px;
    width: 40%;
    background-color:white ;
    float: right;
    margin-right: 5%;
  }

  .fti{
    width:100% ;
    border-top: 5px solid #e58329;
    border-bottom: 3px solid #f0f2f5;
    background-color: #ffffff;
    height: 50px;
    padding-top: 20px;
    text-align: center ;
    margin: 0;
    font-weight: 900;
  }
  .mss{
    height: 50px;
    margin: 0;
    background-color:#ffffff ;
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: 900;
    display: flex;
    color:black;
    justify-content: space-around
  }
  .crc{
    height: 100px;
    margin: 0;
    background-color: #f7fafa;
  }
  .crcc{
    display: flex;
    flex-direction: column;
  }
  .crcparent{
    height: 70px;
    margin: 0;
  }
  .qu{
    padding-top: 10px;
    margin: 10px;
    text-align: center;
    color:#e58329;
    font-family: '宋体';
    font-weight: 600;
  }
  .xi{
    margin: 0;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 20px;
    font-size: 15px;
    font-weight: 600;
    font-family:'宋体';
    color: black;
    display: flex;
    justify-content: space-around;
  }
  .searchdate{
    outline-color: #e58329;
  }
  .cha{
    width: 100%;
    height: 70px;
    color: white;
    font-size: 25px;
    margin-top: 30px;
    background-color:  #e58329;
  }
  .hede{
    width: 100%;
  }
  .box{
    margin-top: 30px;
    height: 724px;
  }
  @media screen and (min-width:1601px) and (max-width:1920px) {
    .box {
      margin-left: 20%;
      margin-right: 20%;
      width: 60%;
    }
    .hade{
      margin: 0 20%;
    }
    .hede {
    margin: 0 20%;
    }
  }
  @media screen and (min-width:1400px)and (max-width:1600px) {
    .box {
      margin-left: 10%;
      margin-right: 10%;

      width: 80%;
    }
    .hede {
      margin: 0 10%;
    }
    .hade {
      margin: 0 10%;
    }
  }
  @media screen and (max-width:1399px) {
    .box {
      margin-left: 10%;
      margin-right: 10%;
      width: 80%;
    }
    .hede {
      margin: 0 10%;
    }
    .hade {
      margin: 0 10%;
    }
  }
  @media screen and (max-width:1100px) {
    .box {
      margin-left: 5%;
      margin-right: 5%;
      width: 90%;
    }
    .hele{
      display: none;
      font-weight: 900;
    }
    .hede {
      margin: 0 5%;
    }
    .hade {
      margin: 0 5%;
    }
  }
  @media screen and (max-width:900px) {
    .box {
      margin: 0;
      width: 100%;
    }
    .hede {
      margin:0;
    }
    .hade {
      margin: 0;
    }
  }
</style>
