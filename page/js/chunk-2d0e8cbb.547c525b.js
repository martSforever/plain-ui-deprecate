(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e8cbb"],{"8b94":function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"demo-tab-header"},[e("demo-row",{attrs:{title:"基本用法,当前位置："+t.val[0]}},[e("link-tab-header",{attrs:{data:["Color颜色","Icon图标","Button按钮"]},model:{value:t.val[0],callback:function(a){t.$set(t.val,0,a)},expression:"val[0]"}})],1),e("demo-row",{attrs:{title:"删除图标"}},[e("link-tab-header",{attrs:{data:["Color颜色","Icon图标","Button按钮"],"clear-icon":""},model:{value:t.val[0],callback:function(a){t.$set(t.val,0,a)},expression:"val[0]"}})],1),e("demo-row",{attrs:{title:"监听删除事件以及右击删除"}},[e("link-tab-header",{attrs:{data:t.data,"clear-icon":""},on:{close:t.p_remove,contextmenu:t.p_remove}}),e("demo-row",[e("link-button-group",[e("link-button",{attrs:{label:"add"},on:{click:t.p_add}}),e("link-button",{attrs:{label:"substract"},on:{click:t.p_substract}})],1)],1)],1)],1)},n=[],l={name:"demo-tab-header",data:function(){return{val:{0:0},data:["Color颜色","Icon图标","Button按钮"]}},methods:{p_remove:function(t){var a=t.item;this.data.splice(this.data.indexOf(a),1)},p_add:function(){this.data.push((new Date).getTime())},p_substract:function(){this.data.pop()}}},r=l,c=e("17cc"),s=Object(c["a"])(r,o,n,!1,null,null,null);a["default"]=s.exports}}]);
//# sourceMappingURL=chunk-2d0e8cbb.547c525b.js.map