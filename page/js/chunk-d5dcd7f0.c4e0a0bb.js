(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d5dcd7f0"],{"017f":function(n,a,t){"use strict";t.r(a);var i=function(){var n=this,a=n.$createElement,t=n._self._c||a;return t("div",{staticClass:"demo-navigator-main-5"},[t("div",[n._v("\n        页面五:\n        "),t("div",[n._v("\n            tabData:"+n._s(n.pageTabData)+"\n        ")]),t("div",[n._v("\n            security:"+n._s(n.pageSecurity)+"\n        ")])]),t("link-button",{attrs:{label:"回退页面"},on:{click:n.back}}),n._v("\n     \n    "),t("link-button",{attrs:{label:"监听事件"},on:{click:n.listenEvent}}),t("link-button",{attrs:{label:"派发页签内事件"},on:{click:function(a){n.$nav.$emit("hello","页面五数据1")}}}),t("link-button",{attrs:{label:"派发全局事件"},on:{click:function(a){n.$nav.$emit("hello","页面五数据2",!0)}}}),t("div",[n._v("\n        页面六传递参数：\n        "),t("link-input",{model:{value:n.msg,callback:function(a){n.msg=a},expression:"msg"}}),t("link-button",{attrs:{label:"打开页面六","box-color":"info"},on:{click:function(a){n.$nav.push("/navigator/navigator-main/demo-navigator-main-6",{msg:n.msg})}}})],1)],1)},o=[],l={name:"demo-navigator-main-5",props:{},data:function(){return console.log(this.pageTabData),{msg:null}},methods:{back:function(){this.pageParam.callback&&this.pageParam.callback(),this.$nav.back()},listenEvent:function(){this.$nav.$on("hello",function(){for(var n,a=arguments.length,t=new Array(a),i=0;i<a;i++)t[i]=arguments[i];(n=console).log.apply(n,["页面五接受页签内事件：hello"].concat(t))})}}},e=l,c=(t("35a9"),t("2877")),s=Object(c["a"])(e,i,o,!1,null,null,null);s.options.__file="demo-navigator-main-5.vue";a["default"]=s.exports},"35a9":function(n,a,t){"use strict";var i=t("668a"),o=t.n(i);o.a},"668a":function(n,a,t){}}]);
//# sourceMappingURL=chunk-d5dcd7f0.c4e0a0bb.js.map