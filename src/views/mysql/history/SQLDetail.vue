<template>
  <p>{{info}}</p>
</template>

<script>
export default {  
    name: '',  
    data () {
      return {
        sqlinfo:null,
        info:null
      }
    },

    computed:{

    },

    methods: {  
      getParams () { 
        // 取到路由带过来的参数   
        let routerParams = this.$route.params.sqlinfo  
        // 将数据放在当前组件的数据内  
        this.sqlinfo = routerParams  
        // console.log(this.sqlinfo)
      },

      fetchSQLInfo(){
        let myHeaders = new Headers();
        myHeaders.append('Authorizssation','bearer ' + this.$store.getters.localStorage)
        fetch("http://100.73.20.3:8888/server/submitedsqldetail",{
          method: "POST",
          body: JSON.stringify(this.sqlinfo),
          headers:myHeaders
        })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          // data.forEach(element => {
          //   element.forEach(element => {
          //     console.log(element)
          //   })
          // });
          this.info = data
        })
      },

    },  
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可  
      '$route': 'getParams'
    },
    created(){
       this.getParams()  
       this.fetchSQLInfo()
    },  
  }
  </script>

