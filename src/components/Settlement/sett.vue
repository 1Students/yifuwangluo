<template>
    <div class="set">
     <span  class="sop" >商户结算信息详情</span>
      <el-form  v-model="fromdata">
        <div class="shop">
           <p>
             <span>部门ID</span>   <el-input  v-model="fromdata.open_bank"></el-input>
             <span>姓名</span>   <el-input v-model="fromdata.name"></el-input>
             <span>银行卡</span>   <el-input v-model="fromdata.bankcard_number" ></el-input>
           </p>
        <p>
          <span>手机号</span>   <el-input v-model="fromdata.reserved_phone"></el-input>
          <span>卡类型</span>   <el-input  v-model="fromdata.bank_type"></el-input>
          <span>身份证</span>   <el-input v-model="fromdata.identity_card"></el-input>
        </p>
        <p>
          <span>开户支行</span>   <el-input v-model="fromdata.sub_bank" ></el-input>
          <span>提现类型</span>   <el-input v-model="fromdata.charge_type"></el-input>
          <span>提现费率</span>   <el-input  v-model="fromdata.charge_rate"></el-input>
        </p>
          <el-button type="success" style="margin-left: 40%" @click="modify">修改信息</el-button>
        </div>

      </el-form>

    </div>
</template>


<script>
  import {shops ,  revise} from '../../api/api.js'
    export default {
        name: "sett",
      data(){
        return{
          id:'',
          fromdata:{
            user_id:'',
            name:'',
            identity_card:'',
            bankcard_number:'',
            reserved_phone:'',
            bank_type:'',
            open_bank:'',
            sub_bank:'',
            charge_type:'',
            charge_rate:'',
          }
        }

      },
      created(){
        this.id =window.sessionStorage.getItem("id");
        console.log(this.id);
        this.init()
      },
      methods:{
        init(){
          let id = this.id
          shops({
           user_id: id

          }
        ).then(res=>{
            console.log(res)
            this.fromdata = res
          })
        },
        cha(){

        },
        modify(){
          let id = this.id;
          let fromdata = this.fromdata;
          revise({
            user_id:id,
            name:fromdata.name,
            identity_card:fromdata.identity_card,
            bankcard_number:fromdata.bankcard_number,
            reserved_phone:fromdata.reserved_phone,
            open_bank:fromdata.open_bank,
            sub_bank:fromdata.sub_bank,
          }).then(res=>{
            this.$message({	message : '修改成功！',	type : 'success'})
            console.log(res)
          })
        }

      }
    }

</script>

<style scoped>
 .el-input{
  width: 150px;
}
  .shop{
    margin-left: 10%;
    width: 70%;
    /*border: 1px red solid;*/
  }
.set{
  height: 350px;
  background-color: whitesmoke;
}
  .sop{
    display: inline-block;
    font-size: 25px;
    margin-left: 30%;
    margin-top: 10px;
  }
  .shop{

    margin-top: 30px;
  }
</style>
