<template>
  <div class="basic-table vm-margin">
    <Row class="vm-table vm-panel">
      <div class="panel-body">
        <Row type="flex" justify="space-between" class="control">
        <div class="table-style">
        </div>
        <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></Input>
              <Button type="ghost" @click="search" shape="circle" icon="ios-search"></Button>
        </div>
        </Row>
        <div class="edit" >

        </div>
        <Table :stripe="showStripe" :size="tableSize" :columns="showColumns" :data="data" ></Table>
      </div>
    </Row>

    <router-view></router-view>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        type:"edit_edit",  //=>用于展示操作模块
         keyword:'',
         searchdataShow:[],
         showStripe: false,
         tableSize: 'default',
        dataColumns: [
        {
          id: 2,
          title: '域名',
          key: 'ip',
          sortable: true
        },
        {
          id: 4,
          title: '端口',
          key: 'port',
          sortable: true
        },
      ],
      db_info:[{
        ip:'default',
        port:'default',
      }]
        }
        },

    computed: {
      showColumns() {
        let showColumn = this.columns.slice()
        showColumn.forEach((elem) => {
          elem.sortable = true
        })
          if (this.type === 'edit_edit') {
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
          return this.dataColumns
        },
        set(){

        }
      },
      data:{
        get(){
          return this.db_info
        },
        set(){

        }
      },


    },

        methods: {
      fetchDBInfo(){
        fetch("http://100.73.20.3:8888/server/dbinfo")
        .then(res => res.json())
        .then(data => {
          this.db_info = data
        })
        .catch(err => console.log(err))
      },

      renderOperate: function (h, params) {
        return h('div', [
          h('Button', {
            props: {
              type: 'info',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.$router.push({
                  name:"statistics",
                  params:{
                    dbinfo:params.row
                  }
                })
              }
            }
          }, '查看'),

        ])
      },

      search(){
        if(this.keyword == ''){
          this.fetchDBInfo()
          return
        }
        let tempData = this.data
        tempData.forEach((elem) => {
          for(let i in elem){
            if(elem[i].toString().indexOf(this.keyword) > -1){
              this.searchdataShow.push(elem)
            }
          }
        })
        this.$store.dispatch("setdataTable",this.searchdataShow)
        this.searchdataShow = []
      },
},

    mounted() {
    },
    created(){
      this.fetchDBInfo()
    }

  }
</script>
