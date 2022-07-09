import VueRouter from "vue-router";
import BridgeOption from '../pages/BridgeOption.vue'
import SerchBridge from '../pages/SerchBridge.vue'
import addTemplate from '../pages/addTemplate.vue'
import addNewBridgeType from '../pages/addNewBridgeType.vue'
//import showTemplateDetail from '../pages/showTemplateDetail.vue'
import searchBridgeType from '../pages/searchBridgeType.vue'
import searchBridgeNameLike from '../pages/searchBridgeNameLike.vue'
import ShowBridges from '../pages/ShowBridges.vue'
import doScore from '../pages/doScore.vue'
import AddBridge from '../components/addBridge.vue'
import showBridgeDetail from '../pages/showBridgeDetail.vue'
import showBridgeScore from '../pages/showBridgeScore.vue'
import navMenu from '../components/navMenu.vue'
import showTemplateDetail from '../pages/showTemplateDetail.vue'
export default new VueRouter({
    routes:[
        {
            path: '/',
            redirect:'/ShowBridges'
        },
        {
            name:'navMenu',
            path:"/navMenu",
            component:navMenu,
        },
        {
           name:'BridgeOption',
           path:"/BridgeOption",
           component:BridgeOption
        },
        {
            name:'SerchBridge',
            path:'/SerchBridge',
            component:SerchBridge
        },
        {
            name:'addTemplate',
            path:'/addTemplate',
            component:addTemplate
        },
        {
            name:'addNewBridgeType',
            path:'/addNewBridgeType',
            component:addNewBridgeType
        },
        {
            name:'searchBridgeType',
            path:'/searchBridgeType',
            component:searchBridgeType
        },
        {
            name:'searchBridgeNameLike',
            path:'/searchBridgeNameLike',
            component:searchBridgeNameLike
        },
        {
            name:'ShowBridges',
            path:'/ShowBridges',
            component:ShowBridges
        },
        {
                  name:'doScore',
                  path: '/doScore',
                  component: doScore,
        },
        {
            name:'AddBridge',
            path: '/AddBridge',
            component: AddBridge,
        },
        {
            name:'showBridgeDetail',
            path: '/showBridgeDetail',
            component: showBridgeDetail,
        },
        {
            name:'showBridgeScore',
            path: '/showBridgeScore',
            component: showBridgeScore,
        },
        {
            name:'showTemplateDetail',
            path: '/showTemplateDetail',
            component: showTemplateDetail,
        }
    ]
})