(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0feca333"],{6863:function(n,a,t){"use strict";var o=t("dc02"),i=t.n(o);i.a},a625:function(n,a,t){"use strict";t.r(a);var o=function(){var n=this,a=n.$createElement,t=n._self._c||a;return t("div",{staticClass:"demo-navigator-main-1"},[t("div",[n._v("\n        页面一\n        "),t("span",[n._v(n._s(n.pageSecurity))])]),t("link-button",{attrs:{label:"回退页面"},on:{click:function(a){n.$nav.back()}}}),t("link-button",{attrs:{label:"打开页签四"},on:{click:n.openTab}}),t("link-button",{attrs:{label:"打开页面五"},on:{click:n.openPage}}),t("link-button",{attrs:{label:"不存在的页面"},on:{click:n.openErrorPage}}),t("link-button",{attrs:{label:"打开页面：VueCLI3"},on:{click:n.openVueCli3}}),t("link-button",{attrs:{label:"打印日志"},on:{click:n.log}})],1)},i=[],e={name:"demo-navigator-main-1",props:{tabData:{}},data:function(){return{}},methods:{log:function(){console.log(this.$nav.getCurrentTab())},openTab:function(){this.$nav.openTab({id:"123",title:"页面四",path:"/navigator/navigator-main/demo-navigator-main-4",param:{hello:111},security:this.pageSecurity})},openPage:function(){this.$nav.push("/navigator/navigator-main/demo-navigator-main-5",{hello:111,callback:function(){console.log("页面一刷新")}},{oauth:"页面新安全性"})},openErrorPage:function(){this.$nav.push("/navigator/navigator-main/demo-navigator-main-iii")},openVueCli3:function(){this.$nav.push("https://cli.vuejs.org/zh/config/",null,null,!0)}}},l=e,c=(t("6863"),t("2877")),r=Object(c["a"])(l,o,i,!1,null,null,null);r.options.__file="demo-navigator-main-1.vue";a["default"]=r.exports},dc02:function(n,a,t){}}]);
//# sourceMappingURL=chunk-0feca333.23bbc1b8.js.map