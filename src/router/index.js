import VueRouter from "vue-router";
import navMenu from '../pages/navMenu.vue'
import bookList from '../pages/bookList.vue'
import findBook from '../pages/findBook.vue'
import addBook from '../pages/addBook.vue'
import updateBook from '../pages/updateBook.vue'
import showReport from '../pages/showReport.vue'
export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect:'/bookList'
        },
        {
            name:'navMenu',
            path:"/navMenu",
            component:navMenu,
        },
        {
            name:'bookList',
            path: '/bookList',
            component: bookList,
        },
        {
            name:'findBook',
            path: '/findBook',
            component: findBook,
        },
        {
            name:'addBook',
            path: '/addBook',
            component: addBook,
        },
        {
            name:'updateBook',
            path: '/updateBook',
            component: updateBook
        },
        {
            name:'showReport',
            path: '/showReport',
            component: showReport
        }
    ]
})