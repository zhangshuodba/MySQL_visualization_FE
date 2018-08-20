<template>
    <Form :label-width="0">
        <Table :columns="columns1" :data="data1"></Table>
        <!-- <FormItem label="SQL"> -->
            <FormItem>
            <Input v-model="sql" type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="SQL"></Input>
        </FormItem>
        <FormItem>
            <!-- <Button type="primary" @click.prevent="submit">上线</Button>  -->
            <Button type="info" @click="check">inception check</Button>
            <Button type="info" @click="ddlExplain" >ddl explain</Button>
            <Button type="info" @click="ddl_Execute" >ddl execute</Button>
            <Button type="primary" @click="confirm">inception 上线</Button>
            <Button><router-link :to="{name:'instances'}" type="ghost" style="margin-left: 8px">返回</router-link></Button> 
        </FormItem>
        <p>{{sql_check }}</p>
    </Form>
</template>

<script>
export default {  
    name: '',  
    data () {
      return {  
        dbinfo:null,
        sql:"",
        sql_check:null,
        // explain_res:null,
        // ddl_status:'',
        // ddl_log_path:'',
        ddl_log_message:'',
        //  spinShow: true,



                columns1: [
                    {
                        title: '域名',
                        key: 'ip'
                    },
                    {
                        title: '端口',
                        key: 'port'
                    },
                    {
                        title: '库名',
                        key: 'dbname'
                    }
                ],
                data1: [
                    {
                        ip: '',
                        port: '',
                        dbname: '',
                        // date: '2016-10-03'
                    },
                ]

      }
    },

    created(){
       this.getParams()  
    },  
    computed:{

    },
    
    methods: {  
      getParams () { 
        // 取到路由带过来的参数   
        let routerParams = this.$route.params.dbinfo  
        // 将数据放在当前组件的数据内  
        this.dbinfo = routerParams  
        this.data1[0].ip = routerParams.ip
        this.data1[0].port = routerParams.port
        this.data1[0].dbname = routerParams.dbname
        
        

      },
      submit(){
          this.dbinfo.sql_text=this.sql //添加sql语句
          this.dbinfo.user = "cathy"
          this.dbinfo.password = "cathy=="
          this.dbinfo.operate = "execute"
         fetch("http://100.73.20.3:8888/server/inception",{
          method: "POST",
          body:JSON.stringify(this.dbinfo)
        })
        .then(res => res.json())
        .then(res => {
        })
        .then(this.$router.push({name:"submitsqlhistory"}))
      },
      check(){
          this.dbinfo.sql_text=this.sql //添加sql语句
          this.dbinfo.user = "cathy"
          this.dbinfo.password = "cathy"
          this.dbinfo.operate = "check"
         fetch("http://100.73.20.3:8888/server/inception",{
             
          method: "POST",
          body:JSON.stringify(this.dbinfo)
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res);
            this.sql_check = res
        })
        // this.$router.push({name:"DBList"})
      },


      ddlExplain(){
          this.dbinfo.sql_text=this.sql //添加sql语句
        //   this.dbinfo.user = "cathy"
        //   this.dbinfo.password = "cathy"
          this.dbinfo.operate = 1
          
                this.$Spin.show({
                    
                    render: (h) => {
                        
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'load-a',
                                    size: 60,
                                }
                            }),
                            h('div', 'DDL执行计划加载中')
                        ])
                    }
                });
         fetch("http://100.73.20.3:8888/server/ddl",{
          method: "POST",
          body:JSON.stringify(this.dbinfo)
        })
        .then(res => res.json()) 
        .then(res => {
            this.ddl_log_message = res.log_message
            if(res.code ===0){
                this.$Spin.hide();
                this.instance("success");
            }else{
                this.$Spin.hide();
                 this.instance("error");
            }
        })
      },

      ddlExecute(){
          this.dbinfo.sql_text=this.sql //添加sql语句
        //   this.dbinfo.user = "cathy"
        //   this.dbinfo.password = "cathy"
          this.dbinfo.operate = 0
                this.$Spin.show({
                    render: (h) => {
                        
                        return h('div', [
                            h('Icon', {
                                'class': 'demo-spin-icon-load',
                                props: {
                                    type: 'load-a',
                                    size: 60,
                                }
                            }),
                            h('div', 'DDL执行结果加载中')
                        ])
                    }
                });
         fetch("http://100.73.20.3:8888/server/ddl",{
          method: "POST",
          body:JSON.stringify(this.dbinfo)
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            this.ddl_log_message = res.log_message
            if(res.code ===0){
                this.$Spin.hide();
                this.instance("success");
                this.$router.push({name:"submitsqlhistory"})
            }else{
                this.$Spin.hide();
                this.instance("error");
                this.$router.push({name:"submitsqlhistory"})
            }
        })
        // .then(this.$router.push({name:"submitsqlhistory"}))
      },
            confirm () {
                this.$Modal.confirm({
                    title: '上线窗口',
                    content: '<p>确认上线？</p>',
                    onOk: () => {
                        this.submit();
                        this.$Message.info('上线已提交');
                    },
                    onCancel: () => {
                        this.$Message.info('上线取消');
                    }
                })
            },

            ddl_Execute () {
                this.$Modal.confirm({
                    title: '上线窗口',
                    content: '<p>确认上线？</p>',
                    onOk: () => {
                        this.ddlExecute();
                        this.$Message.info('上线已提交');
                    },
                    onCancel: () => {
                        this.$Message.info('上线取消');
                    }
                })
            },

            success (nodesc) {
                this.$Notice.success({
                    title: 'DDL explain 完成',
                    desc: nodesc ? '' : '详情请看日志'
                });
            },
            error (nodesc) {
                this.$Notice.error({
                    title: 'DDL explain 失败',
                    desc: nodesc ? '' : '详情请看日志'
                });
            },
                instance (type) {
                const title = 'DDL操作结果';
                const content = this.ddl_log_message;
                switch (type) {
                  case 'success':
                        this.$Modal.success({
                            title: title,
                            content: content
                        });
                        break;
                    case 'error':
                        this.$Modal.error({
                            title: title,
                            content: content
                        });
                        break;
                }
            }
    },  
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可  
      '$route': 'getParams'
    }
  }
  </script>

  <style>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>