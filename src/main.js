import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false
window.tableData=[
  {
    name:'西游记',
    author:'吴承恩',
    publisher:'人民教育出版社',
    price:118
},
{
    name:'水浒传',
    author:'施耐庵',
    publisher:'南方教育出版社',
    price:98
},
{
    name:'三国演义',
    author:'罗贯中',
    publisher:'北方教育出版社',
    price:135
},
{
    name:'红楼梦',
    author:'曹雪芹',
    publisher:'机械教育出版社',
    price:124
},
]
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router:router,
  beforeCreate(){
    Vue.prototype.$bus=this
  }
}).$mount('#app')
