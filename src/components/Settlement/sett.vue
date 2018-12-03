<template>
    <div class="set">
     <span  class="sop" >商户结算信息详情</span>
      <el-form  >
        <div class="shop">
          <table border="1" class="table">
            <tr>
              <th class="th"  style="background-color:#fff">姓名</th>
              <td  class="td"><el-input v-model="name" ></el-input></td>
            </tr>
            <tr>
              <th class="th">身份证</th>
              <td>  <el-input v-model="identity_card" ></el-input></td>
            </tr>
            <tr>
              <th class="th">银行卡</th>
              <td>  <el-input v-model="bankcard_number" ></el-input></td>
            </tr>

            <tr>
              <th class="th"> <span>手机号</span>  </th>
              <td>   <el-input v-model="reserved_phone"></el-input></td>
            </tr>
            <tr>
              <th class="th">   <span>银行卡类型</span> </th>
              <td>   <el-input  v-model="bank_type"></el-input></td>
            </tr>
            <tr>
              <th  class="th">  <span>开户行</span></th>
              <td  >     <el-input v-model="open_bank" ></el-input></td>
            </tr>
            <tr>
              <th  class="th">  <span>开户支行</span></th>
              <td  >     <el-input v-model="sub_bank" ></el-input></td>
            </tr>
            <tr>
             <th  class="th">个人信息的修改</th>
              <td> <el-button type="success" style="margin-left: 40%" @click="modify">确认修改</el-button></td>
            </tr>
            <tr>
              <th  class="th">    <span>提现类型</span> </th>
              <td >   <el-input  :disabled="true" v-model="charge_type"></el-input></td>
            </tr>
            <tr>
              <th class="th" >    <span>提现费率</span> </th>
              <td  >  <el-input   :disabled="true" v-model="charge_rate"></el-input></td>
            </tr>
          </table>
        </div>
      </el-form  >

    </div>
</template>


<script>
  import {shops , revise} from '../../api/api.js'
    export default {
        name: "sett",
      data(){
        return{
            id:'',
            user_id:'',
            name:'',//姓名
            identity_card:'',//身份证
            bankcard_number:'',//银行卡
            reserved_phone:'',// 预留电话
            bank_type:'',//银行卡类型
            open_bank:'',//开户行
            sub_bank:'',//开户支行
            charge_type:'',//: 提现类型：1-单次定额；2-单次百分比 ,
            charge_rate:'',//提现费率：charge_type = 1，单位为分；charge_type = 2；单位为 万分之n；

        }

      },
      created(){
        this.id =window.sessionStorage.getItem("id");
        console.log(this.id);
        this.init()
      },
      methods:{
        init(){
          let id = this.id;
          shops({
          params: {
            user_id: id
          }
            }
        ).then(res=>{
            console.log(res);
            this.name = res.name;
            this.identity_card = res.identity_card;
            this.bankcard_number = res.bankcard_number;
            this.reserved_phone = res.reserved_phone;
            this.open_bank = res.open_bank ;
            this.sub_bank = res.sub_bank;
          })
        },

        modify(){
          let id = this.id;
          let name = this.name;
          let identity_card = this.identity_card;
          let bankcard_number = this.bankcard_number;
          let reserved_phone = this.reserved_phone;
          let open_bank = this.open_bank ;
          let  sub_bank = this.sub_bank;
          revise({
              user_id:id,
              name:name,
              identity_card:identity_card,
              bankcard_number:bankcard_number,
              reserved_phone:reserved_phone,
              open_bank:open_bank,
              sub_bank:sub_bank,

          }).then(res=>{

            this.$message({	message : '修改成功！',	type : 'success'})
            console.log(res)
          })
        }

      }
    }

</script>

<style scoped>
  body{
  width: 100%;
  height: 100%;
  background-color: #fff;
  }
 .el-input{
  width: 100%;
}
  .shop{
    margin-left: 10%;
    width: 70%;
    margin-top: 30px;
    margin-bottom: 50px;
    /*border: 1px red solid;*/
  }
  .table{
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
  }
  .th{
    width: 300px;
    background-color: #fff;
    line-height: 20px;
  }
  .td{
    width: 300px;
    background-color: #fff;
  }
.set{
  height: 100%;
  background-color: whitesmoke;
}
  .sop{
    display: inline-block;
    font-size: 25px;
    margin-left: 30%;
    margin-top: 10px;
  }

</style>
