<template>
    <div id="money">
      <div class="mont">

         <p class="zi">
        账户查询
      </p>
        <table border="1" class="table">

          <tr>
            <th class="th"  style="background-color:#fff">钱包余额（元）</th>
            <td  class="td"  ><el-input  v-model="dat.total_money" ></el-input></td>
          </tr>
          <tr>
            <th class="th" style="background-color:#fff">可用资金（元）</th>
            <td>  <el-input v-model="dat.avaliable_money"  ></el-input></td>
          </tr>
          <tr>
            <th class="th" style="background-color:#fff">待确认资金（元）</th>
            <td>  <el-input  v-model="dat.abnormal_money" ></el-input></td>
          </tr>
        </table>
       <div class="fout">
         <el-button type="success" style="width: 50%;margin-left: 10%;margin-top: 30px" >提现</el-button>
         <p>(线上提现功能暂时不可用)</p>
         <p>(商户发起提现申请后请及时联系商户管理员)</p>
         <p>(服务时间9:00-20:00)</p>
       </div>
       </div>

    </div>
</template>

<script>
  import { money , moneys} from '../../api/api.js'
    export default {
        name: "money",
      data(){
          return{
            id:'',
            dat:{
              total_money :'',//钱包
              avaliable_money :'',//可用
              abnormal_money :'',//确认
            }
          }
      },
      created(){
        this.id = window.sessionStorage.getItem('id'),
          this.init()
      },
      methods:{
        init(){
          let id = this.id;
          money({
           params:{user_id:id
           }
          }).then(res=>{
            console.log(res);
            this.dat = res;
          console.log(this.dat)
          })
        },

      }

    }
</script>

<style scoped>
  #money{
    height: 800px;
    background-color: whitesmoke;
  }
  .table{
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }
  .mont{
    margin-left: 30px;
    border: 1px white solid;
  }
  .zi{
    font-size: 20px;
  }
  .fout{
   float: right;
  }
</style>
