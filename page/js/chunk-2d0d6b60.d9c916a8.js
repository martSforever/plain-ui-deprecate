(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d6b60"],{"745b":function(t,o,n){"use strict";n.r(o);var r=function(){var t=this,o=t.$createElement,n=t._self._c||o;return n("div",{staticClass:"demo-navigator-tab"},[n("demo-row",[n("demo-row-item",{attrs:{title:"操作按钮"}},[n("link-button",{attrs:{label:"打开【Color推荐】"},on:{click:function(o){return t.$refs.tabs1.push("/normal/demo-color","Color推荐")}}}),n("link-button",{attrs:{label:"打开【Icon图标设置】"},on:{click:function(o){return t.$refs.tabs1.push("/normal/demo-icon","Icon图标设置")}}}),n("link-button",{attrs:{label:"打开【Radio单选复选】"},on:{click:function(o){return t.$refs.tabs1.push("/normal/demo-radio","Radio单选复选")}}})],1),n("link-navigator-tab",{ref:"tabs1",attrs:{height:"300px"}})],1),n("demo-row",{attrs:{title:"初始化的时候就显示可以打开的页面"}},[n("link-navigator-tab",{attrs:{height:"300px","init-pages":[{title:"Color推荐",path:"/normal/demo-color"},{title:"Icon图标设置",path:"/normal/demo-icon"},{title:"Radio单选复选",path:"/normal/demo-radio"}]}})],1),n("demo-row",{attrs:{title:"同一個页面是否可以打开多次"}},[n("demo-row-item",{attrs:{title:"操作按钮"}},[n("link-button",{attrs:{label:"打开【Color推荐】"},on:{click:function(o){return t.$refs.tabs2.push("/normal/demo-color","Color推荐")}}}),n("link-button",{attrs:{label:"打开【Icon图标设置】"},on:{click:function(o){return t.$refs.tabs2.push("/normal/demo-icon","Icon图标设置")}}}),n("link-button",{attrs:{label:"打开【Radio单选复选】"},on:{click:function(o){return t.$refs.tabs2.push("/normal/demo-radio","Radio单选复选",t.count++)}}}),n("link-button",{attrs:{label:"打开【Test测试页面】"},on:{click:function(o){return t.$refs.tabs2.push("/normal/demo-test-page","Test测试页面",t.count++)}}})],1),n("link-navigator-tab",{ref:"tabs2",attrs:{height:"300px",multiple:""}})],1),n("demo-row",{attrs:{title:"设置id，缓存页面，刷新之后打开原来正在查看的页面"}},[n("demo-row-item",{attrs:{title:"操作按钮"}},[n("link-button",{attrs:{label:"打开【Color推荐】"},on:{click:function(o){return t.$refs.tabs3.push("/normal/demo-color","Color推荐")}}}),n("link-button",{attrs:{label:"打开【Icon图标设置】"},on:{click:function(o){return t.$refs.tabs3.push("/normal/demo-icon","Icon图标设置")}}}),n("link-button",{attrs:{label:"打开【Radio单选复选】"},on:{click:function(o){return t.$refs.tabs3.push("/normal/demo-radio","Radio单选复选")}}})],1),n("link-navigator-tab",{ref:"tabs3",attrs:{height:"300px",id:"1545826196135"}})],1),n("demo-row",{attrs:{title:"双向绑定控制页面切换"}},[n("demo-row-item",{attrs:{title:"操作按钮"}},[n("link-button-group",[n("link-button",{attrs:{label:"打开【Color推荐】"},on:{click:function(o){return t.$refs.tabs4.push("/normal/demo-color","Color推荐")}}}),n("link-button",{attrs:{label:"打开【Icon图标设置】"},on:{click:function(o){return t.$refs.tabs4.push("/normal/demo-icon","Icon图标设置")}}}),n("link-button",{attrs:{label:"打开【Radio单选复选】"},on:{click:function(o){return t.$refs.tabs4.push("/normal/demo-radio","Radio单选复选")}}})],1),n("link-button-group",[n("link-button",{attrs:{label:"前一页"},on:{click:function(o){t.index--}}}),n("link-button",{attrs:{label:"后一页"},on:{click:function(o){t.index++}}}),n("link-button",{attrs:{label:"index:"+t.index}})],1)],1),n("link-navigator-tab",{ref:"tabs4",attrs:{height:"300px"},model:{value:t.index,callback:function(o){t.index=o},expression:"index"}})],1)],1)},a=[],l={name:"demo-navigator-tab",data:function(){return{count:1,index:0}}},e=l,i=n("17cc"),s=Object(i["a"])(e,r,a,!1,null,null,null);o["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0d6b60.d9c916a8.js.map