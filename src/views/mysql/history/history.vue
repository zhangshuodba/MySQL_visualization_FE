<template>
  <div class="basic-table vm-margin">
    <Row class="vm-table vm-panel">
      <div class="panel-body">
        <Table :columns="showColumns" :data="data" ></Table>
        <Row type="flex" justify="space-between" class="footer">
        </Row>
      </div>
    </Row>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        type:"true",  //=>用于展示操作模块
        }
        },

    computed: {
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
          return this.$store.getters.SQLHistoryColumns
        },
        set(){

        }
      },
      data:{
        get(){
          return this.$store.getters.history_data
        },
        set(){

        }
      },

    },

        methods: {
      fetchDBInfo(){
        fetch("http://100.73.20.3:8888/server/historysql")
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          this.$store.dispatch("setHistoryTable",data)
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
                  name:"sqldetail",
                  params:{
                    sqlinfo:params.row
                  }
                })
              }
            }
          }, '详情')
        ])
      },

},
    created(){
      this.fetchDBInfo()
    }

  }
</script>
