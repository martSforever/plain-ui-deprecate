(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e19c1"],{"7abc":function(t,l,e){"use strict";e.r(l);var i=function(){var t=this,l=t.$createElement,e=t._self._c||l;return e("div",{staticClass:"demo-base-table-column-prop"},[e("demo-row",{attrs:{title:"基础列(order)排序"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"id",title:"编号(order=-1)",order:-1}}),e("link-column",{attrs:{field:"name",title:"姓名(order=1)",order:1}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"多级表头列排序"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column-group",{attrs:{title:"用户信息",fixed:"right"}},[e("link-column",{attrs:{field:"id",title:"编号(order=1,position=1)",order:1}}),e("link-column",{attrs:{field:"name",title:"姓名(order=2,position=2)",order:2}}),e("link-column",{attrs:{field:"id",title:"编号(order=1,position=3)",order:1}}),e("link-column",{attrs:{field:"name",title:"姓名(order=2,position=4)",order:2}})],1),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column-group",{attrs:{title:"用户信息",fixed:"left"}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}})],1)],1)],1),e("demo-row",{attrs:{title:"基础列：宽度"}},[e("demo-row",{attrs:{title:"列宽不足"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号(width=300)",width:300}}),e("link-column",{attrs:{field:"name",title:"姓名(width=200)",width:200}}),e("link-column",{attrs:{field:"age",title:"年龄(width=100)",width:100}})],1)],1),e("demo-row",{attrs:{title:"列宽足够"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号(width=300)",width:300}}),e("link-column",{attrs:{field:"name",title:"姓名(width=200)",width:200}}),e("link-column",{attrs:{field:"age",title:"年龄(width=100)",width:100}}),e("link-column",{attrs:{field:"id",title:"编号(width=300)",width:300}}),e("link-column",{attrs:{field:"name",title:"姓名(width=200)",width:200}}),e("link-column",{attrs:{field:"age",title:"年龄(width=100)",width:100}}),e("link-column",{attrs:{field:"id",title:"编号(width=300)",width:300}}),e("link-column",{attrs:{field:"name",title:"姓名(width=200)",width:200}}),e("link-column",{attrs:{field:"age",title:"年龄(width=100)",width:100}}),e("link-column",{attrs:{field:"id",title:"编号(width=300)",width:300}}),e("link-column",{attrs:{field:"name",title:"姓名(width=200)",width:200}}),e("link-column",{attrs:{field:"age",title:"年龄(width=100)",width:100}})],1)],1)],1),e("demo-row",{attrs:{title:"左右固定列"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号",fixed:"left"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄",fixed:"right"}})],1)],1),e("demo-row",{attrs:{title:"对其方式"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号(align=left)",align:"left"}}),e("link-column",{attrs:{field:"name",title:"姓名(align=center)",align:"center"}}),e("link-column",{attrs:{field:"age",title:"年龄(align=right)",align:"right"}})],1)],1),e("demo-row",{attrs:{title:"数据格式化显示"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"id",title:"id(dataType=tel)",dataType:"tel"}}),e("link-column",{attrs:{field:"id",title:"id(dataType=cny)",dataType:"cny"}}),e("link-column",{attrs:{field:"id",title:"id(dataType=money)",dataType:"money"}}),e("link-column",{attrs:{field:"id",title:"id(dataType=percent)",dataType:"percent"}})],1)],1),e("demo-row",{attrs:{title:"对其方式"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号(align=left)",align:"left"}}),e("link-column",{attrs:{field:"name",title:"姓名(align=center)",align:"center"}}),e("link-column",{attrs:{field:"age",title:"年龄(align=right)",align:"right"}})],1)],1),e("demo-row",{attrs:{title:"浮动显示文本"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号(tooltip)",tooltip:""}}),e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"id",title:"编号(tooltip)",tooltip:""},scopedSlots:t._u([{key:"default",fn:function(t){var l=t.row;return[e("link-tooltip-text",{attrs:{content:l.id}})]}}])}),e("link-column",{attrs:{field:"name",title:"姓名(tooltip)"}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"超链接样式，并且监听点击事件"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名(link)",link:""},on:{click:function(l){var e=l.row;return t.$message.show(e.name)}}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"点击之后弹框显示文本"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名(showInDialog)",showInDialog:"",link:""}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"自定义列内容"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"},scopedSlots:t._u([{key:"default",fn:function(l){var i=l.row;return[e("link-icon",{attrs:{icon:"pad-check-square-fill"}}),e("span",[t._v("hello:"+t._s(i.name))])]}}])}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"列隐藏以及显示(disabled-config为true的列无法配置)"}},[e("demo-row",{attrs:{title:"操作"}},[e("link-button-group",[e("link-button",{attrs:{label:"refreshRender"},on:{click:function(l){return t.$refs.hideDemoTable.refreshRender()}}}),e("link-button",{attrs:{label:"get columns"},on:{click:function(l){t.columns=t.$refs.hideDemoTable.originalColumns}}})],1),e("link-button-group",[e("link-button",{attrs:{label:"show name column"},on:{click:function(l){t.hideNameCol=!1}}}),e("link-button",{attrs:{label:"hide name column"},on:{click:function(l){t.hideNameCol=!0}}})],1),e("link-button-group",[e("link-button",{attrs:{label:"add age column width"},on:{click:function(l){t.ageColWidth+=10}}}),e("link-button",{attrs:{label:"subtract age column width"},on:{click:function(l){t.ageColWidth-=10}}})],1),e("link-button-group",[e("link-button",{attrs:{label:"add name column order"},on:{click:function(l){t.nameColumnOrder+=1}}}),e("link-button",{attrs:{label:"subtract name column order"},on:{click:function(l){t.nameColumnOrder-=1}}})],1),e("link-number",{model:{value:t.checkNumber,callback:function(l){t.checkNumber=l},expression:"checkNumber"}})],1),e("link-base-table",{ref:"hideDemoTable",attrs:{data:t.getData(),configColumnFunc:t.configColumnFunc,beforeConfigColumnFunc:t.beforeConfigColumnFunc}},[e("link-column-index"),e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名(:hide=hideName,nameColumnOrder="+t.nameColumnOrder+")",hide:t.hideNameCol,order:t.nameColumnOrder}}),e("link-column",{attrs:{field:"name2",title:"姓名2(:hide=hideName,disabled-config)",hide:t.hideNameCol,"disabled-config":""}}),e("link-column",{attrs:{field:"age",title:"年龄(width="+t.ageColWidth+")",width:t.ageColWidth},on:{"update:width":function(l){t.ageColWidth=l}}})],1),e("demo-row",t._l(t.columns,function(l,i){return e("div",{key:i},[t._v("\n                "+t._s(l)+"\n            ")])}),0)],1)],1)},n=[],a={name:"demo-base-table-column-prop",data:function(){return{hideNameCol:!1,ageColWidth:250,nameColumnOrder:0,columns:[],checkNumber:10}},methods:{getData:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,l=[],e=(new Date).getTime(),i=0;i<t;i++)l.push({id:e+i,name:"小明"+i,name2:"小明"+i,age:20+i});return l.push({id:e+""+e,name:"小明",name2:"小明",age:20}),l},configColumnFunc:function(t,l){l||(t.title=t.title+"<!!>","age"===t.field&&this.checkNumber>10&&(t.hide=!0))},beforeConfigColumnFunc:function(t,l){var e="";l(t,function(t,l){!l&&(e="".concat(e,"[").concat(t.field,"-").concat(t.previousTitle,"]"))})}}},o=a,d=e("17cc"),r=Object(d["a"])(o,i,n,!1,null,null,null);l["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0e19c1.ec44261e.js.map