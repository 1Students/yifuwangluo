<template>
    <div>
      商家资金结算
      <el-table
        :data="tableData"
        border
        style="width: 100%" >

        <el-table-column prop="user_id" label="部门Id"  align="center">
        </el-table-column>
        <el-table-column prop="name" label=" 姓名"  align="center">
        </el-table-column>
        <el-table-column prop="identity_card" label="身份证"  align="center"
     >
        </el-table-column>
        <el-table-column prop="bankcard_number" label=" 银行卡"  align="center"
       >
        </el-table-column>
        <el-table-column prop="reserved_phone" label=" 预留电话 "  align="center"
        >
        </el-table-column>
        <el-table-column prop="open_bank" label="  银行卡类型 "  align="center"
        >
        </el-table-column>
        <el-table-column prop="create_time" label=" 开始时间 "  align="center"
     >
        </el-table-column>
        <el-table-column prop="modify_time" label="结束时间 "  align="center"
       >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="primary" size="small">查看</el-button>
            <el-button type="danger" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {shopv} from  '../../api/api.js'
    export default {
        name: "setts",
      data(){
          return{
          id:"",
            tableData:[{
              name:'',
              identity_card:'',
              bankcard_number:'',
              reserved_phone:'',
              open_bank:'',
              sub_bank:'',
              begin_time:'',
              end_time:'',

            }],
            // offset:'',
            // limit:'',
          }
      },
      created(){
        this.id = window.sessionStorage.getItem("id")
        this.init()
      },
      methods:{
          init(){
            let id = this.id;
            shopv({ }).then(res=>{
              console.log(1251)
              console.log(res)
              this.tableData = res.data_list
              console.log(this.tableData)
            })
          }
          }

    }
</script>

<style scoped>

</style>
