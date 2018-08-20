<template>
  <div class="basic-table vm-margin">
    <Row class="vm-table vm-panel">
        <Row type="flex" justify="space-between" class="control">
        <div class="table-style">
        <Button :disabled="killDisabled"  @click="modalKill = true"> kill</Button>
        <Button type="primary" @click="refurbish">刷新</Button>
          <span>自动刷新</span>
          <i-switch v-model="switch1" @on-change="change"></i-switch>
        </div>

        <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></Input>
          <Button type="ghost" @click="search" shape="circle" icon="ios-search"></Button>
        </div>

        </Row>

      <div class="panel-body">
        <!-- border ref="selection"与handleSelectAll()函数控制全选 -->
        <Table :stripe="showStripe" :size="tableSize" border ref="selection" :columns="showColumns" :data="data" @on-selection-change="selectChange" ></Table>        
        <!-- <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button> -->
        <Row type="flex" justify="space-between" class="footer">
        </Row>
      </div>
    </Row>

    <Modal
        v-model="modalKill"
        title="kill"
        ok-text="OK"
        cancel-text="Cancel"
        v-on:on-ok="killOk">
        确定杀连接吗 ?
    </Modal>
    <router-view></router-view>
  </div>
</template>

<script>
export default {  
    name: '',  
    data () {
      return {
          dbinfo:null,
          switch1: false,
          id1:null,
          modalKill: false,
          killDisabled: true,
          connectioninfo: [],
          kill_info:null,
          keyword:'',
          searchdataShow:[],
          showStripe: false,
          tableSize: 'default',
      }
    },

    computed:{
      showColumns() {
        let showColumn = this.columns.slice()
        showColumn.forEach((elem) => {
          elem.sortable = true
        })
          if (this.type === 'true') {
          showColumn.push({
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: this.renderOperate
          })
        }
        return showColumn
      },

      columns:{
        get(){
          return this.$store.getters.ProcesslistColumns
        },
        set(){

        }
      },
      data:{
        get(){
          return this.$store.getters.ProcesslistValue
        },
        set(){

        }
      },

    },

    methods: {  
      getParams () { 
        // 取到路由带过来的参数   
        let routerParams = this.$route.params.dbinfo  
        // 将数据放在当前组件的数据内  
        this.dbinfo = routerParams  
      },

      fetchDBProcessList(){
        
        console.log(this.keyword)
        this.dbinfo.user = "cathy"
        this.dbinfo.password = "cathy"
         fetch("http://100.73.20.3:8888/server/processList",{
          method: "POST",
          body:JSON.stringify(this.dbinfo)
        })
        .then(res => res.json())
        .then(data => {
            this.$store.dispatch("setProcesslistValue",data)
        })
      },
    refurbish(){
        this.fetchDBProcessList()
    },

     change(){
        if(!this.switch1){
            clearTimeout(this.id1);
            return;
        }else{
            this.fetchDBProcessList()
        };

    this.id1 = setTimeout(() => {
         this.change()
         }, 1000);
         },

    //  handleSelectAll (status) {
    //     this.$refs.selection.selectAll(status);
    //     },
    
      killplain: function () {
        if (this.connectioninfo.length === 0) {
          this.killDisabled = true
        } else {
          this.killDisabled = false
        }
      },

      selectChange: function (data) {
        this.connectioninfo = data
        this.killplain()
      },

      killOk(){
        this.connectioninfo.push({
          user:"cathy",
          password:"cathy",
          ip:this.dbinfo.ip,
          port:this.dbinfo.port
        })
         fetch("http://100.73.20.3:8888/server/kill",{
          method: "POST",
          body:JSON.stringify(this.connectioninfo)
        })
        .then(res => res.json())
        .then(data =>{
          // console.log(data)
        })
        .then(this.killDisabled = true)
        .then(this.fetchDBProcessList())
      },

      search(){
        if(this.keyword == ''){
          this.fetchDBProcessList()
          return
        }
        
        let tempData = this.data

        tempData.forEach((elem) => {
          // delete elem.db 
          // delete elem.Info 
          for(let i in elem){
            if(elem[i].toString().indexOf(this.keyword) > -1){
              this.searchdataShow.push(elem)
            }
          }
        })
        this.$store.dispatch("setProcesslistValue",this.searchdataShow)
        this.searchdataShow = []
      },

    }, 

    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可  
      '$route': 'getParams'
    },
    created(){
       this.getParams()
       this.fetchDBProcessList()
    },  
  }
  </script>

