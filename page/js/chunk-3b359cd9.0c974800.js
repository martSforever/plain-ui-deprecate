(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3b359cd9"],{"82a5":function(t,l,e){"use strict";e.r(l);var i=function(){var t=this,l=t.$createElement,e=t._self._c||l;return e("div",{staticClass:"demo-base-table"},[e("demo-row",{attrs:{title:"基本用法"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"个人感觉斑马纹表格不好看，就不加这个功能了"}}),e("demo-row",{attrs:{title:"自动横向以及纵向滚动"}},[e("link-base-table",{attrs:{data:t.getData(15)}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"左右固定列"}},[e("link-base-table",{attrs:{data:t.getData(15)}},[e("link-column",{attrs:{field:"id",title:"编号",fixed:"left"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄",fixed:"right"}})],1)],1),e("demo-row",{attrs:{title:"通过显示的行数，设置表格高度（如果要表格高度自动填满页面，参考Table组件【不是BaseTable】的fill属性实现）"}},[e("link-base-table",{attrs:{data:t.getData(10),"row-num":5}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"多级表头"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("link-column-group",{attrs:{title:"用户信息"}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}})],1),e("link-column",{attrs:{field:"age",title:"年龄"}}),e("link-column-group",{attrs:{title:"用户信息"}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}})],1)],1)],1),e("demo-row",{attrs:{title:"设置标题行高以及表体行高"}},[e("link-base-table",{attrs:{data:t.getData(),rowHeight:50,headRowHeight:50}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"不显示标题"}},[e("link-base-table",{attrs:{data:t.getData(),"no-header":""}},[e("link-column",{attrs:{field:"id",title:"编号"}}),e("link-column",{attrs:{field:"name",title:"姓名"}}),e("link-column",{attrs:{field:"age",title:"年龄"}})],1)],1),e("demo-row",{attrs:{title:"使用渲染【渲染函数】组件渲染列内容"}},[e("link-base-table",{attrs:{data:t.getData()}},[e("pl-render-func",{attrs:{"render-func":t.renderFunc}})],1)],1)],1)},a=[],n=e("c404"),r={name:"demo-base-table",components:{PlRenderFunc:n["a"]},data:function(){return{}},methods:{getData:function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,l=[],e=(new Date).getTime(),i=0;i<t;i++)l.push({id:e+i,name:"小明"+i,age:20+i});return l},renderFunc:function(){var t=this.$createElement;return t("div",[t("link-column",{attrs:{field:"id",title:"编号"}}),t("link-column",{attrs:{field:"name",title:"姓名"}}),t("link-column",{attrs:{field:"age",title:"年龄"}})])}}},d=r,s=(e("9943"),e("2877")),o=Object(s["a"])(d,i,a,!1,null,null,null);o.options.__file="demo-base-table.vue";l["default"]=o.exports},9943:function(t,l,e){"use strict";var i=e("cc74"),a=e.n(i);a.a},cc74:function(t,l,e){}}]);
//# sourceMappingURL=chunk-3b359cd9.0c974800.js.map