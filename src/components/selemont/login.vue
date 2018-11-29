<template>
    <div class="log">
     <span class="spa"> 登录密码修改</span>
      <el-form >
        <el-form-item label="原密码" class="lap">
          <el-input v-model="pa" ></el-input>
        </el-form-item>
        <el-form-item label="新密码" class="lap">
          <el-input  v-model="xa"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="init" class="but">确定修改</el-button>
    </div>
</template>

<script>
  import {prd} from "../../api/api.js"
    export default {

        name: "login",
      data(){
          return{
            id:'',

              pa:'',
              xa:"",


        }

      },
      created(){
        // this.id = window.sessionStorage.getItem('id');
        this.id =window.sessionStorage.getItem("id");
      },
      methods:{
        init(){
          let  id = this.id;
          let pa = this.pa;
          let xa = this.xa;
          prd({
           user_id: id,
              old_pwd:pa,
              new_pwd:xa
          }).then(res=>{
            if( res="" ){
              this.$message({message:'修改密码失败',type:'error'})
            }else {
              this.$message({message:'修改密码成功',type:'success'})

            }
            console.log(res)
          })
        }
       }
    }
</script>

<style scoped>
  .el-input{
    width: 250px;

  }
  .log{
    height: 230px;
    background-color: whitesmoke;
  }
  .lap{
    margin-left: 30px;
  }
  .but{
    margin-left: 30px;
  }
  .spa{
    display: inline-block;
    /*border-bottom: 2px solid green;*/
    margin-left: 30px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
