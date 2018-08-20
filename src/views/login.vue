<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
// import Cookies from 'js-cookie';
export default {
    data () {
        return {
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },


    methods: {
      handleSubmit(){
            fetch("http://100.73.20.3:8888/login",{
            method:"post",
              headers:{
               'Content-type':'application/x-www-form-urlencoded'
             },
              body:"username="+this.form.userName+"&"+"password="+this.form.password
        })
          .then(progress => progress.json())
            .then(data => {
                if(data.message == 401){
                    alert("账号密码错误")
                }else{
                    this.$store.dispatch("setUser",this.form.userName)
                    this.$store.dispatch("setLocalStorage",data.token)
                    // console.log(this.$store.getters.currentUser)
                    // console.log(this.$store.getters.isLogin)
                     this.$router.push({name:"instances"})
                }
            })
      }
    }
};
</script>

<style>

</style>
