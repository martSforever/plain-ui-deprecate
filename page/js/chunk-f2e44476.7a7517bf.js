(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f2e44476"],{"50c9":function(a,e,l){"use strict";var t=l("e578"),n=l.n(t);n.a},e50d:function(a,e,l){"use strict";l.r(e);var t=function(){var a=this,e=a.$createElement,l=a._self._c||e;return l("div",{staticClass:"demo-cascade"},[l("demo-row",{attrs:{title:"基本用法"}},[l("link-cascade",{attrs:{data:a.cascadeData,"label-key":"label","children-key":"children","value-key":"value"}})],1),l("demo-row",{attrs:{title:"只显示最后一级数据"}},[l("link-cascade",{attrs:{data:a.cascadeData,"label-key":"label","children-key":"children","value-key":"value","show-all-levels":!1}})],1),l("demo-row",{attrs:{title:"禁用选项"}},[l("link-cascade",{attrs:{data:a.cascadeData,"label-key":"label","children-key":"children","value-key":"value","disabled-key":"disabled"}})],1),l("demo-row",{attrs:{title:"选中的时候就改变数据，而不是选择最后一级数据的时候才改变数据"}},[l("link-cascade",{attrs:{data:a.cascadeData,"label-key":"label","children-key":"children","value-key":"value",changeOnSelect:""}})],1),l("demo-row",{attrs:{title:"动态加载数据"}},[l("link-cascade",{attrs:{data:a.cascadeData,"label-key":"label","children-key":"children","value-key":"value",loadDataFunc:a.loadDataFunc}})],1)],1)},n=[],c={name:"demo-cascade",data:function(){return{count:0,cascadeData:[{value:"beijing",label:"北京",children:[{value:"gugong",disabled:!0,label:"故宫"},{value:"tiantan",label:"天坛"},{value:"wangfujing",label:"王府井"},{value:"gugong",label:"故宫"},{value:"tiantan",label:"天坛"},{value:"wangfujing",label:"王府井"},{value:"gugong",label:"故宫"},{value:"tiantan",label:"天坛"},{value:"wangfujing",label:"王府井"},{value:"gugong",label:"故宫"},{value:"tiantan",label:"天坛"},{value:"wangfujing",label:"王府井"}]},{value:"jiangsu",label:"江苏",children:[{value:"nanjing",label:"南京",children:[{value:"fuzimiao",label:"夫子庙"}]},{value:"suzhou",label:"苏州",children:[{value:"zhuozhengyuan",label:"拙政园"},{value:"shizilin",label:"狮子林"}]}]}]}},methods:{loadDataFunc:function(a){return console.log("loadDataFunc--\x3e>",this.count),[{value:"zone-".concat(this.count++),label:"".concat(a.label,"-").concat(this.count++)},{value:"zone-".concat(this.count++),label:"".concat(a.label,"-").concat(this.count++)},{value:"zone-".concat(this.count++),label:"".concat(a.label,"-").concat(this.count++)}]}}},u=c,i=(l("50c9"),l("2877")),o=Object(i["a"])(u,t,n,!1,null,null,null);o.options.__file="demo-cascade.vue";e["default"]=o.exports},e578:function(a,e,l){}}]);
//# sourceMappingURL=chunk-f2e44476.7a7517bf.js.map