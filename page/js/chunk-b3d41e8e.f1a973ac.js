(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b3d41e8e"],{"0a3e":function(t,e,i){"use strict";var n=i("8802"),a=i.n(n);a.a},"4d76":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"demo-tabs"},[i("demo-row",{attrs:{title:"基本用法"}},[i("link-tabs",{attrs:{height:"200px"}},[i("link-tab",{attrs:{title:"用户管理1"}},[t._v("\n                demo-tabs 1111\n            ")]),i("link-tab",{attrs:{title:"用户管理2"}},[t._v("\n                demo-tabs 2222\n            ")])],1)],1),i("demo-row",{attrs:{title:"初始化的时候就初始化所有子页签，否则默认为懒初始化，第一次显示的时候才会初始化"}},[i("link-tabs",{attrs:{height:"200px"}},[i("link-tab",{attrs:{title:"懒初始化：用户管理1"}},[t._v("\n                demo-tabs 1111\n                "),i("demo-child",{attrs:{title:"-懒初始化：子组件1-"}})],1),i("link-tab",{attrs:{title:"懒初始化：用户管理2"}},[t._v("\n                demo-tabs 2222\n                "),i("demo-child",{attrs:{title:"-懒初始化：子组件2-"}})],1),i("link-tab",{attrs:{title:"懒初始化：用户管理3"}},[t._v("\n                demo-tabs 3333\n                "),i("demo-child",{attrs:{title:"-懒初始化：子组件3-"}})],1)],1),i("link-tabs",{attrs:{initialized:"",height:"200px"}},[i("link-tab",{attrs:{title:"全初始化：用户管理4"}},[t._v("\n                demo-tabs 444\n                "),i("demo-child",{attrs:{title:"-全初始化：子组件4-"}})],1),i("link-tab",{attrs:{title:"全初始化：用户管理5"}},[t._v("\n                demo-tabs 555\n                "),i("demo-child",{attrs:{title:"-全初始化：子组件5-"}})],1),i("link-tab",{attrs:{title:"全初始化：用户管理6"}},[t._v("\n                demo-tabs 666\n                "),i("demo-child",{attrs:{title:"-全初始化：子组件6-"}})],1)],1)],1),i("demo-row",{attrs:{title:"双向绑定移动页面"}},[i("demo-row",[i("link-button",{attrs:{label:"后退"},on:{click:function(e){t.index=t.index-1<0?0:t.index-1}}}),i("link-button",{attrs:{label:"前进"},on:{click:function(e){t.index=t.index+1>2?2:t.index+1}}})],1),i("link-tabs",{attrs:{height:"200px"},model:{value:t.index,callback:function(e){t.index=e},expression:"index"}},[i("link-tab",{attrs:{title:"用户管理1"}},[t._v("\n                demo-tabs 1111\n            ")]),i("link-tab",{attrs:{title:"用户管理2"}},[t._v("\n                demo-tabs 2222\n            ")]),i("link-tab",{attrs:{title:"用户管理3"}},[t._v("\n                demo-tabs 3333\n            ")])],1)],1),i("demo-row",{attrs:{title:"特殊页面立即初始化"}},[i("link-tabs",{attrs:{height:"200px"}},[i("link-tab",{attrs:{title:"用户管理1"}},[t._v("\n                demo-tabs 1111\n            ")]),i("link-tab",{attrs:{title:"用户管理2"}},[t._v("\n                demo-tabs 2222\n            ")]),i("link-tab",{attrs:{title:"该页立即初始化",initialized:""}},[t._v("\n                demo-tabs 333\n                "),i("demo-child",{attrs:{title:"立即初始化"}})],1)],1)],1),i("demo-row",{attrs:{title:"特殊页面隐藏时销毁内容"}},[i("link-tabs",{attrs:{height:"200px"}},[i("link-tab",{attrs:{title:"用户管理1"}},[t._v("\n                demo-tabs 1111\n            ")]),i("link-tab",{attrs:{title:"用户管理2"}},[t._v("\n                demo-tabs 2222\n            ")]),i("link-tab",{attrs:{title:"该页面隐藏时销毁","destroyed-on-hide":""}},[t._v("\n                demo-tabs 333\n                "),i("demo-child",{attrs:{title:"隐藏时销毁"}})],1)],1)],1)],1)},a=[],l={name:"demo-tabs",data:function(){return{index:0}}},s=l,d=(i("0a3e"),i("2877")),o=Object(d["a"])(s,n,a,!1,null,null,null);o.options.__file="demo-tabs.vue";e["default"]=o.exports},8802:function(t,e,i){}}]);
//# sourceMappingURL=chunk-b3d41e8e.f1a973ac.js.map