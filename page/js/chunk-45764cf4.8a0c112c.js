(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45764cf4"],{9516:function(a,t,n){"use strict";n.r(t);var i=function(){var a=this,t=a.$createElement,n=a._self._c||t;return n("div",{staticClass:"demo-navigator-main"},[n("demo-row",{attrs:{title:"基本用法"}},[n("link-button-group",[n("link-button",{attrs:{"box-type":"line",label:"打开标签"}})],1),n("link-button-group",a._l(a.tabsData.slice(0,9),function(t,i){return n("link-button",{key:i,attrs:{label:t.title},on:{click:function(n){a.openTab(t)}}})}),1),n("link-button-group",a._l(a.tabsData.slice(9),function(t,i){return n("link-button",{key:i,attrs:{label:t.title},on:{click:function(n){a.openTab(t)}}})}),1),n("link-button-group",[n("link-button",{attrs:{label:"刷新Icon页签"},on:{click:function(t){a.$nav.refreshTab("ggg")}}}),n("link-button",{attrs:{label:"刷新页签三"},on:{click:function(t){a.$nav.refreshTab("ccc")}}}),n("link-button",{attrs:{label:"打开页签三同时更新数据并刷新页面"},on:{click:function(t){a.$nav.openTab({id:"ccc",title:"页面三",path:"/navigator/navigator-main/demo-navigator-main-3",param:{},security:{oauth:"III"},data:{}},!0)}}}),n("link-button",{attrs:{label:"更新页签三的数据信息"},on:{click:function(t){a.$nav.updateTab("ccc",{security:{oauth:"HELLO",title:"wahaha"}})}}}),n("link-button",{attrs:{label:"清除tab导航缓存"},on:{click:function(t){a.$nav.clearTab()}}})],1)],1),n("div",{staticClass:"demo-navigator-main-body"},[n("link-navigator-main-tab",{ref:"navigator",attrs:{beforeOpenTab:a.beforeOpenTab,afterOpenTab:a.afterOpenTab,beforePush:a.beforePush,afterPush:a.afterPush,pageRegistryErrorHandler:a.pageRegistryErrorHandler,page404:"/navigator/navigator-main/demo-navigator-main-error",storageKey:"test",idGenerator:a.idGenerator,defaultPage:{id:"111",title:"主页",path:"/navigator/navigator-main/demo-navigator-main-1",security:{oauth:"My"}}},on:{openTab:a.handleOpenTab,closeTab:a.handleCloseTab}},[n("div",{attrs:{slot:"tab"},slot:"tab"},[n("link-button-group",[n("link-button",{attrs:{label:"安全性菜单"}}),n("link-button",{attrs:{label:"安全性菜单"}}),n("link-button",{attrs:{label:"安全性菜单"}})],1)],1)])],1)],1)},e=[],r=(n("96cf"),n("1da1")),o=(n("cadf"),n("551c"),n("097d"),{name:"demo-navigator-main",mounted:function(){},data:function(){return{tabsData:[{id:"aaa",title:"页面一",path:"/navigator/navigator-main/demo-navigator-main-1",param:{},security:{oauth:"My"},data:{}},{id:"bbb",title:"页面二",path:"/navigator/navigator-main/demo-navigator-main-2",param:{},security:{oauth:"ORG"},data:{}},{id:"ccc",title:"页面三",path:"/navigator/navigator-main/demo-navigator-main-3",param:{},security:{oauth:"POSTN"},data:{}},{id:null,title:"页面四",path:"/navigator/navigator-main/demo-navigator-main-4",param:{},security:{oauth:"ALL"},data:{}},{id:"eee",title:"页面五",path:"/navigator/navigator-main/demo-navigator-main-5",param:{},security:{},data:{}},{id:"fff",title:"页面六",path:"/navigator/navigator-main/demo-navigator-main-6",param:{},security:{},data:{}},{id:"hhh",title:"页面七",path:"/navigator/navigator-main/demo-navigator-main-7",param:{},security:{},data:{}},{id:"iii",title:"页面八",path:"/navigator/navigator-main/demo-navigator-main-8",param:{},security:{},data:{}},{id:"nopage",title:"不存在的页面",path:"/navigator/navigator-main/demo-navigator-main-???",param:{},security:{},data:{}},{id:"ggg",title:"Icon图标",path:"/demo-icon",param:{},security:{},data:{}},{id:"kkk",title:"Button按钮",path:"/demo-button",param:{},security:{},data:{}},{id:"lll",title:"Input输入框Input输入框Input输入框",path:"/demo-input",param:{},security:{},data:{}},{id:"mmm",title:"Radio单选复选框Radio单选复选框",path:"/demo-radio",param:{},security:{},data:{}},{id:"nnn",title:"Rate评分",path:"/demo-rate",param:{},security:{},data:{}},{id:"nnn",title:"页签：VueCLI3",path:"https://cli.vuejs.org/zh/config/",param:{},security:{},data:{},iframe:!0}]}},methods:{openTab:function(a){var t=a.id,n=a.title,i=a.path,e=a.param,r=a.security,o=a.data,u=a.iframe;this.$nav.openTab({id:t,title:n,path:i,param:e,security:r,data:o,iframe:u})},openPage:function(){},beforeOpenTab:function(a){if(a.id||(a.id=this.$plain.$utils.uuid()),"页面二"===a.title)return Promise.reject("不能打开页面二")},afterOpenTab:function(a){},beforePush:function(a){},afterPush:function(a){},handleOpenTab:function(a){},handleCloseTab:function(a){},pageRegistryErrorHandler:function(){var a=Object(r["a"])(regeneratorRuntime.mark(function a(t){return regeneratorRuntime.wrap(function(a){while(1)switch(a.prev=a.next){case 0:console.log("自定义处理错误页面",t);case 1:case"end":return a.stop()}},a,this)}));return function(t){return a.apply(this,arguments)}}(),idGenerator:function(a){a.id;var t=a.title,n=a.path;a.param,a.security,a.data;return t+n}}}),u=o,l=(n("da05"),n("2877")),c=Object(l["a"])(u,i,e,!1,null,null,null);c.options.__file="demo-navigator-main.vue";t["default"]=c.exports},d4fd:function(a,t,n){},da05:function(a,t,n){"use strict";var i=n("d4fd"),e=n.n(i);e.a}}]);
//# sourceMappingURL=chunk-45764cf4.8a0c112c.js.map