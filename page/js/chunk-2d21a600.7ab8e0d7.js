(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a600"],{baf1:function(n,t,l){"use strict";l.r(t);var e=function(){var n=this,t=n.$createElement,l=n._self._c||t;return l("div",{staticClass:"demo-navigator-main-4"},[l("div",[n._v("\n        页面四,"+n._s(n.pageSecurity)+"\n    ")]),l("link-button",{attrs:{label:"打开","box-color":"error"}}),l("link-button",{attrs:{label:"监听事件"},on:{click:n.listenEvent}}),l("link-button",{attrs:{label:"派发页签内事件"},on:{click:function(t){return n.$nav.$emit("hello","页面四数据1")}}}),l("link-button",{attrs:{label:"派发全局事件事件"},on:{click:function(t){return n.$nav.$emit("hello","页面四数据2",!0)}}})],1)},o=[],a={name:"demo-navigator-main-4",data:function(){return{}},methods:{listenEvent:function(){var n=this;this.$nav.$on("hello",function(){for(var t,l=arguments.length,e=new Array(l),o=0;o<l;o++)e[o]=arguments[o];(t=console).log.apply(t,["页面四接受全局事件：hello"].concat(e,[n]))},!0)}}},i=a,r=l("17cc"),c=Object(r["a"])(i,e,o,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d21a600.7ab8e0d7.js.map