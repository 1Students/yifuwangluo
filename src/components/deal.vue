<template>
  <div id="deal">
    <div class="had">
      <img src="../assets/logoes.png" alt="" class="pho">
      <span class="zi">资金结算</span>
      <p class="but">
        <button class="exit" @click="qui">退 出</button>
        <img src="../assets/toxa.png" alt="" class="pg">
      </p>
    </div>
    <div class="hed">
      <router-link to="/message">
        <span class="jiaoyi">合作商信息</span>
      </router-link>
      <!--<router-link to="/deal">-->
        <!--<span  class="jiaoyi">交易管理</span>-->
      <!--</router-link>-->
      <!--<H></H>-->
      <!--<router-link to="">-->
        <!--<span>业务处理</span>-->
      <!--</router-link>-->
      <!--<el-button>业务处理</el-button>-->
    </div>
    <div class="box">
      <div class="boxx">
        <p class="boxxLeft" style="margin:15px 0;">
          <span>
             <span class="mingChen">渠道名称</span>
          <el-select v-model="ifc" placeholder="" style="width:165px">
            <el-option
              v-for="item in qu"
              :key="item.channelCode"
              :label="item.channelName"
              :value="item.channelCode">
            </el-option>
          </el-select>
          </span>
          <span>
           <span class="mingChen">业务类型</span>
          <el-select v-model="val" placeholder="" style="width:100px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
            <!--<el-option label="提现" val="0"></el-option>-->
            <!--<el-option label="交易" val="1"></el-option>-->
          </el-select>
         </span>

        </p>

        <div style="display: flex;justify-content: flex-end;width: 470px;">
          <p>
            <span class="demonstration mingChen">选择日期</span>
            <el-date-picker
              v-model="sta"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始时间"
              :picker-options="pickerOptions0"
              style="width:150px">
            </el-date-picker>
            -
            <el-date-picker
              v-model="over"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束时间"
              :picker-options="pickerOptions0"
              style="width:150px">
            </el-date-picker>
            <button class="chas" @click="che()">查询</button>
          </p>
        </div>
      </div>

    </div>
    <div class="boy">
      <el-table
        id="tableTh"
        :header-cell-style="{color:'black',fontFamily:'黑体'}"
        :data="tableData"
        :border=false
        style="width: 90%;margin-left: 5%;margin-bottom: 10px">
        <el-table-column
          prop="name"
          align="center"
          label="通道名称"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="recordDate"
          width="100"
          label="日期">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="业务类型"
          :formatter="formatRole">
        </el-table-column>
        <el-table-column
          align="center"
          prop="amount"
          label="总金额">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userFee"
          label="用户手续费">
        </el-table-column>
        <el-table-column
          align="center"
          prop="partnerFee"
          label="合作商分润"
          width="130">
        </el-table-column>
        <el-table-column
          align="center"
          prop="okCount"
          label="成功笔数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="errCount"
          label="失败笔数">
        </el-table-column>
      </el-table>
      <div class="blocks">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5,10,15,20,25]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tos" v-if="tos">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import {ChannelList,partnerStat } from '../api/api.js'
  export default {
    name: "deal",
    data() {

      return {
        val:'',
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now()- 8.64e7;
          }
        },
        options: [
          {label: "提现", value: 0},
          {label: "交易", value: 1},
          {label: "全部", value: ''}
          ],
        tableData:[[

        ]],
        sta:'',//选择开始时间
        over:'',//选择结束时间
        is:'',//类型
        tos:'',//总数
        currentPage:1,
        pagesize:5,
        qu:[{
          channelCode:'',
          channelName:'',
        }],
        ifc:'',
        days:'',
        dayss:'',
        types:'',
        valPage:'',
        s1:1 ,
        s2:10 ,
      }
    },
    created(){
      // 昨天日期
      this.days =this.$route.params.id;
      // 前天日期
      this.dayss=this.$route.params.id;
      // console.log(this.days);
      // console.log(this.dayss);
      this.ppr();
      this.par();
      this.chs();
    },
    update(){
    },
    methods:{
      disabledDate (over) {
        if (Date.now() >= over) {
          return true
        }
        return false
      },
      formatRole (row, type) {
        // return row.type == 0 ? '提现' : '交易'
        if(row.type==0){
          return '提现'
        }else if(row.type==1){
          return '交易'
        }else{
          return '全部'
        }
      },
      open() {
        this.$alert('请重新输入查询日期', '数据为空', {
          confirmButtonText: '确定',
          callback: action => {
            this.sta=this.$route.params.id;
            this.over=this.$route.params.id;
            this.ppr();
            this.par();
            this.chs();
          }
        });
      },
      login(){
          this.$alert('登陆超时，请重新登陆', '', {
            confirmButtonText: '确定',
            callback: action => {
              window.location.hash='#/'
            }
          });
      },

      par(){
        let days = this.days;
        let dayss = this.dayss;
        let types = this.types;
        ChannelList({
          startDate: dayss,
          endDate:days,
          pageSize: 10,
          pageNum: 1,
          type:types
        }).then(res=>{
          console.log(res);

          this.qu = res.data.list;
          this.qu.push({
            channelCode: "",
            channelName: "全部"
          }),
          console.log(this.tos)
        })
      },


      ppr(){
        let days = this.days;
        let dayss = this.dayss;
        this.sta = this.dayss;
        this.over = this.days;
        partnerStat({
          startDate:dayss,
          endDate:days,
          pageSize: 10,
          pageNum: 1,
        }).then(res=>{
          console.log(res);
          this.tableData = res.data.list;
          console.log(this.tableData);
          this.tos = res.data.total;
          console.log(this.tos)
        })
      },
      che(){
        let sta = this.sta;
        let over = this.over;
        let val = this.val;
        let ifc = this.ifc;
        let pagesize = this.pagesize;
        let currentPage = this.currentPage;
        this.currentPage=1;
        let s1 = this.s1
        if(over<sta){
          this.$message({ message:'查询结束时间不能小于开始时间',	type : 'error'})
        }
        partnerStat({
          startDate:sta,
          endDate:over,
          type:val,
          pageSize:pagesize,
          pageNum: s1,
          channelCode:ifc
        }).then(res=>{
          if(res.code!='C_000'){
            this.login()
          }

          // window.location.reload()
          console.log(res);
          this.tableData = res.data.list;
          console.log(this.tableData);
          this.tos = res.data.total;
          if(this.tos==0){
            // this.open()
          }
          console.log(this.tos)
        })
      },
      chs(){
        let sta = this.sta;
        let over = this.over;
        let val = this.val;
        let ifc = this.ifc;
        let pagesize = this.pagesize;
        let currentPage = this.currentPage;

        if(over<sta){
          this.$message({ message:'查询结束时间不能小于开始时间',	type : 'error'})
        }
        partnerStat({
          startDate:sta,
          endDate:over,
          type:val,
          pageSize:pagesize,
          pageNum: currentPage,
          channelCode:ifc
        }).then(res=>{
          if(res.code!='C_000'){
           this.login()
          }

          // window.location.reload()
          console.log(res);
          this.tableData = res.data.list;
          console.log(this.tableData);
          this.tos = res.data.total;
          if(this.tos==0){
            // this.open()
          }
          console.log(this.tos)
        })
      },
      handleSizeChange(val) {
        this.pagesize = val;
        this.currentPage = 1;
        this.chs(this.currentPage);
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.chs(this.currentPage,this.pagesize,);
        console.log(`当前页: ${val}`);
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

<style scoped>
  html{
    width: 100%;
    height: 100%;
  }
  body{
    width: 100%;
    height: 100%;
  }
  #deal{
    height: 100%;
    width: 100%;
    /*border: 1px solid blue;*/
    background-color: #ebeef2;
    /*background-color: red;*/
  }

  .mingChen{
    color: black;
    font-size: 16px;
    font-weight: 900;
    font-family: '黑体';
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
  .had{
    width: 60%;
    height: 100px;
    border-top: 5px solid #e58329;
    border-bottom: 3px solid #f2f2f2;
    display: flex;
    padding: 0 20%;
    justify-content: space-between;
    background-color: #ffffff ;

  }
  .jiaoyi{
    height: 60px;
    border-bottom: 2px solid #e58329;
    line-height: 60px;
    display: inline-block;
  }
  .hed a{
    margin-right: 50px;
    text-decoration: none;
    color:#2c3e50;
    font-size: 18px;
    font-family: '微软雅黑 Light';
    font-weight: 900;
  }
  .pho{
    height: 107px;
    width: 297px;
  }
  .zi{
    font-size: 40px;
    font-weight: 700;
    padding-top: 25px;
    color: #e58329;
  }

  .hed{
    height: 60px;
    width: 60%;
    padding: 0 20%;
    background-color: #ffffff;
  }
  .boxxLeft{
    width: 455px;
  }

  .box{
    margin-left: 20%;
    margin-right: 15%;
    margin-top: 30px;
    width:60%;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    border-top:5px solid #e58329;
    margin-bottom: 25px;
  }
  .boxx{
    width: 90%;
    display: flex;
    justify-content:space-between;
    margin-left: 5%
  }
  .boy{
    margin-left: 20%;
    margin-right: 15%;
    width:60%;
    margin-bottom: 30px;
    background-color: #ffffff;
    padding-bottom: 10px;
    border-bottom: 5px solid #e58329;
  }
  .chas{
    display: inline;
    width: 80px;
    height: 40px;
    background-color: #e58329;
    outline: none;
    border: none;
    color:white;
  }
  .blocks{
    margin-top: 20px;
    text-align: center;
  }
  .but{
    background-color:#ffffff;
    height: 40px;
    padding-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .pg{
    width: 40px;
    height: 40px;
    margin-left: 20px;
  }
 td{
    color:red
  }
  @media screen and (max-width:1720px) {
    .boxx{
      flex-direction: column;
      justify-content: flex-start;
    }
    .boxxLeft{
      display: flex;
      justify-content: space-between;
    }
  }
</style>
