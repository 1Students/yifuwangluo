<template>
    <div id="pay">
      <div class="sys ">
        <p style="border: 1px solid white;padding-left: 10px;background-color: white;width: 300px;margin-left: 25px" >
          最新统计
        </p>
        <div>
          <p  class="cuy" >
            今日成功成交额  <span style="color: red;font-size: 30px" >  <br> {{total}} </span> 元
          </p>
          <p class="cuys">
            今天成交笔数 <span style="color: green;font-size: 30px;margin-left: 30px" > <br> {{count}}</span>   笔
          </p>
      </div>


      <el-table
        :data="days" border style="width: 100%">
        <el-table-column
          type="index" label="序号" >
        </el-table-column>
        <el-table-column
          prop="mch_order_id" label="商户订单号" >
        </el-table-column>
        <el-table-column
          prop="sys_order_id"
          label="系统订单号">
        </el-table-column>
        <el-table-column
          prop="money"
          label="金额">
          <template slot-scope="scope">
            <span>{{scope.row.money / 100 | rounding}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付类型"
          :formatter="formatRole">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="trade_time"
          label="交易时间">
        </el-table-column>

      </el-table>


    </div>

      <button @click="shy" style="display: none">实验</button>
    </div>
</template>

<script>

  import {cn ,chn ,shiy } from '../../api/api.js'
    export default {
        name: "pay",
      data(){
         return{
            id:'',
           count:'',//成交金额
           total:'',//成交笔数
           days:[{
             mch_order_id:'',
             money:'',
             pay_type:'',
             state:'',
             sys_order_id:'',
             trade_time:'',
           }],
           offset:'',
           total_count:'',
        }
      },
      created(){
          this.id = window.sessionStorage.getItem('id');
        this.init();
        this.pad();
      },
      methods:{

        formatRole: function(row, column) {
          return row.pay_type == 'alipay' ? "支付宝" : row.authority == 'wx ' ? "微信 " : "";
        },
        init(){
          let id = this.id;
          cn({
           params:{
             user_id:id
           }
          }).then(res=>{
            console.log(res);
            this.count = res.count;
            this.total = res.total;
          })
        },
        pad(){
          let id = this.id;
          chn({params:{user_id:id}
          }).then(res=>{
            console.log(res)
            this.days = res.data_list

          })
        },
        shy(){
          let id = this.id;
          shiy(
            {
              mch_id : 1002,
              money : 10000,
              mch_order_id : "20181129A001",
              notify_url : "http://127.0.0.1:8080/pay/notify",
              redirect_url : "",
              reserve: "",
              sign : "4322B82E9F6BD46481D4E165B0A70549",
              pay_type : "alipay"
            }
          ).then(res=>{
            console.log(res)

          })
        },

      }
    }
</script>

<style scoped>
    #pay{
      background-color: whitesmoke;
      padding-bottom: 45px;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 15px;
      height: 100%;
    }
  .sys{
    border: 1px solid whitesmoke;

  }
  .cuy{
    border: 1px solid white;
    padding-bottom: 10px;
    padding-top: 10px;
    width: 300px;
    margin-left: 25px;

    background-color: white;
  }
  .cuys{
    border: 1px solid white;
    padding-bottom: 10px;
    padding-top: 10px;
    width: 300px;
    margin-left: 25px;
    background-color: white;
  }
</style>
