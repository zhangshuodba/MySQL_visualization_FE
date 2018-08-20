import {otherRouter, appRouter} from '@/router/router';

const app = {
    state: {
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],

        showNum:10,
        currentPage:1,
        title:"数据库管理",
        keyword:'',
        modalAdd: false,
        dataColumns: [
        {
          id: 1,
          title: '实例名',
          key: 'instance_name',
          sortable: true
        },
        {
          id: 2,
          title: '域名',
          key: 'ip',
          sortable: true
        },
        // {
        //   id: 3,
        //   title: 'vip',
        //   key: 'vip',
        //   sortable: true
        // },
        {
          id: 4,
          title: '端口',
          key: 'port',
          sortable: true
        },
        {
          id: 5,
          title: '库名',
          key: 'dbname',
          sortable: true
        }
      ],
      
      SQLHistoryColumns: [
        {
          id: 0,
          title: '编号',
          key: 'id',
          sortable: true
        },
      
        {
          id: 1,
          title: '地址',
          key: 'ip',
          sortable: true
        },
        {
          id: 2,
          title: '库名',
          key: 'dbname',
          sortable: true
        },
        {
          id: 3,
          title: '上线时间',
          key: 'submint_time',
          sortable: true
        },
        {
          id: 4,
          title: '状态',
          key: 'status',
          sortable: true
        },
      
      ],
      
      ProcesslistColumns: [
      
      
        {
          type: 'selection',
          width: 60,
          align: 'center'
      },
      
      
      
      
        {
          id: 0,
          title: 'Id',
          key: 'Id',
          sortable: true
        },
      
        {
          id: 1,
          title: 'User',
          key: 'User',
          sortable: true
        },
        {
          id: 2,
          title: 'Host',
          key: 'Host',
          sortable: true
        },
        {
          id: 3,
          title: 'db',
          key: 'db',
          sortable: true
        },
        {
          id: 4,
          title: 'Command',
          key: 'Command',
          sortable: true
        },
        {
          id: 5,
          title: 'Time',
          key: 'Time',
          sortable: true
        },
        {
          id: 6,
          title: 'State',
          key: 'State',
          sortable: true
        },
        {
          id: 7,
          title: 'Info',
          key: 'Info',
          sortable: true
        },
      ],
      
      dataTable:[],
      HistoryValue:[],
      ProcesslistValue:[],
      currentUser: null,
      isLogin:false,
      localStorage:null,

    },


    getters:{
        showNum: state => state.showNum,
        currentPage: state => state.currentPage,
        title: state => state.title,
        columns: state => state.dataColumns,
        data: state => state.dataTable,
        keyword: state => state.keyword,
        modalAdd: state => state.modalAdd,
        SQLHistoryColumns: state => state.SQLHistoryColumns,
        history_data: state => state.HistoryValue,
        ProcesslistColumns: state => state.ProcesslistColumns,
        ProcesslistValue: state => state.ProcesslistValue,
        currentUser: state => state.currentUser,
        isLogin: state => state.isLogin,
        localStorage: state => state.localStorage,
    },

    mutations: {
        updateMenulist (state) {
            state.menuList = appRouter;
        },

        keyWordValue(state,keyword){
            if(keyword){
              state.keyword = keyword
            }else{
              state.keyword = null
            }
          },
          ModalAddValue(state,ModalAdd){
            if(ModalAdd){
              state.modalAdd = ModalAdd
            }else{
              state.modalAdd = null
            }
          },
          dataTableValue(state,dataTable){
            if(dataTable){
              state.dataTable = dataTable
            }else{
              state.dataTable = null
            }
          },
          appandDataTableValue(state,DBInfo){
            if(DBInfo){
              state.dataTable.unshift(DBInfo)
            }else{
              state.dataTable.unshift(null)
            }
          },
          setHistoryValue(state,dataTable){
            if(dataTable){
              state.HistoryValue = dataTable
            }else{
              alert("else")
              state.HistoryValue = null
            }
          },
          setProcesslist(state,data){
            if(data){
              state.ProcesslistValue = data
            }else{
              alert("else")
              state.ProcesslistValue = null
            }
          },
          userStatus(state,user){
            if(user!=''){
              state.currentUser = user
              state.isLogin = true
            }else{
              state.currentUser = ''
              state.isLogin = false
            }
          },
          localStorageValue(state,localStorage){
            if(localStorage){
              state.localStorage = localStorage
            }else{
              state.localStorage = null
            }
          }
    },

    actions:{
        setkeyWord({commit},keyword){
            commit("keyWordValue",keyword)
          },
          setModalAdd({commit},ModalAdd){
            commit("ModalAddValue",ModalAdd)
          },
          setdataTable({commit},dataTable){
            commit("dataTableValue",dataTable)
          },
          appandDataTable({commit},DBInfo){
            commit("appandDataTableValue",DBInfo)
          },
          setHistoryTable({commit},dataTable){
            commit("setHistoryValue",dataTable)
          },
          setProcesslistValue({commit},data){
            commit("setProcesslist",data)
          },
          setUser({commit},user){
            commit("userStatus",user)
          },
          setLocalStorage({commit},localStorage){
            commit("localStorageValue",localStorage)
          },
        
    }

};

export default app;
