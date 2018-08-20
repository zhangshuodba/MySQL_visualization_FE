<template>
  <div class="basic-table vm-margin">
    <Row class="vm-table vm-panel">
      <!-- <div class="panel-heading">
        {{ title }}
      </div> -->
      <div class="panel-body">
        <Row type="flex" justify="space-between" class="control">
        <div class="table-style">
          <!-- <h3>Stripe</h3>
          <i-switch v-model="showStripe" style="margin: 0 30px 0 10px"></i-switch> -->
          <!-- <h3>Size</h3> -->
          <!-- <Radio-group v-model="tableSize" type="button" style="margin-left: 10px">
            <Radio label="large">Large</Radio>
            <Radio label="default">Default</Radio>
            <Radio label="small">Small</Radio>
          </Radio-group> -->
              <Button @click="addDBInfo = true"><i class="fa fa-plus"></i> Add</Button>
          
        </div>
        <div class="search-bar">
          <Input placeholder="Please enter ..." v-model="keyword" style="width: 300px"></Input>
              <Button type="ghost" @click="search" shape="circle" icon="ios-search"></Button>

        </div>
        </Row>
        <div class="edit" >
              <!-- <Button @click="addDBInfo = true"><i class="fa fa-plus"></i> Add</Button> -->
        </div>
        <Table :stripe="showStripe" :size="tableSize" :columns="showColumns" :data="data" ></Table>
      </div>
    </Row>
       <Modal
        v-model="addDBInfo"
        title="Add"
        ok-text="OK"
        cancel-text="Cancel"
        v-on:on-ok="addOk">
        <Form :label-width="50">
          <Form-item v-for="item in columns" :label="item.title" :key="item.id">
            <Input v-model="DBInfo[item.key]" :placeholder="'Please enter' + item.title"></Input>
          </Form-item>
        </Form>
    </Modal> 
    <router-view></router-view>
  </div>
</template>

<script>

  export default {

    data () {
      return {
        addDBInfo: false,
        DBInfo:{},
        type:"edit_edit",  //=>用于展示操作模块
        dataSubmit: {},  //=>用于展示编辑，有问题
        modalsubmit: false,
         dataDelete: [],  //=>用于删除模块
         modalDelete: false,
         keyword:'',
         searchdataShow:[],
         showStripe: false,
         tableSize: 'default',
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

      showNum:{
        get(){
          return this.$store.getters.showNum
        },
        set(){

        }
      },
      currentPage:{
        get(){
          return this.$store.getters.currentPage
        },
        set(){

        }
      },
      title:{
        get(){
          return this.$store.getters.title
        },
        set(){

        }
      },
      columns:{
        get(){
          return this.$store.getters.columns
        },
        set(){

        }
      },
      data:{
        get(){
          return this.$store.getters.data
        },
        set(){

        }
      },
      keyword__:{
        get(){
          return this.$store.getters.keyword
        },
        set(){

        }
      },
      modalAdd:{
        get(){
          return this.$store.getters.modalAdd
        },
        set(){

        }
      }
    },

        methods: {


      addOk(){
        let myHeaders = new Headers();
        myHeaders.append('Authorizssation','bearer ' + this.$store.getters.localStorage)
        fetch("http://100.73.20.3:8888/server/adddbinfo",{
          method: "POST",
          body: JSON.stringify(this.DBInfo),
          headers:myHeaders
        }).then(this.$store.dispatch("appandDataTable",this.DBInfo))
        .then(function(response) {
          response.status  //=> number 100–599
          response.statusText //=> String
          response.headers    //=> Headers
          response.url       //=> String
          return response.text()
         }, function(error) {

            error.message //=> String
          })
          },

      fetchDBInfo(){
        fetch("http://100.73.20.3:8888/server/dbinfo")
        .then(res => res.json())
        .then(data => {
          this.$store.dispatch("setdataTable",data)
        })
        .catch(err => console.log(err))
      },

      renderOperate: function (h, params) {
        return h('div', [
          // h('Button', {
          //   props: {
          //     type: 'info',
          //     size: 'small'
          //   },
          //   style: {
          //     marginRight: '5px'
          //   },
          //   on: {
          //     click: () => {
          //       this.$router.push({
          //         name:"submit",
          //         params:{
          //           dbinfo:params.row
          //         }
          //       })
          //     }
          //   }
          // }, '上线'),

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
                  name:"Session",
                  params:{
                    dbinfo:params.row
                  }
                })
              }
            }
          }, '会话')

        ])
      },

      search(){
        if(this.keyword == ''){
          this.fetchDBInfo()
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
        // console.log(this.searchdataShow)
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
