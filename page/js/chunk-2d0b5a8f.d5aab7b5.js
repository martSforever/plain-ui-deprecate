(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b5a8f"],{"1a9b":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"demo-base-table-test"},[i("demo-row",{attrs:{title:"操作按钮"}},[i("link-button-group",[i("link-button",{attrs:{label:"查看columns"},on:{click:t.checkColumns}}),i("link-button",{attrs:{label:"添加数据"},on:{click:t.push}}),i("link-button",{attrs:{label:"删除数据"},on:{click:t.pop}}),i("link-button",{attrs:{label:"查看配置信息"},on:{click:t.logContent}})],1),i("link-button-group",[i("link-button",{on:{click:t.enableEdit}},[t._v("开启编辑状态")]),i("link-button",{on:{click:t.disableEdit}},[t._v("关闭编辑状态")]),i("link-button",{on:{click:t.startEdit}},[t._v("开始编辑")]),i("link-button",{on:{click:t.cancelEdit}},[t._v("取消编辑")])],1),i("link-number",{attrs:{placeholder:"目标行索引"},model:{value:t.targetIndex,callback:function(e){t.targetIndex=e},expression:"targetIndex"}}),i("link-button-group",[i("link-button",{attrs:{label:"添加"},on:{click:t.add}}),i("link-button",{attrs:{label:"取消"},on:{click:t.cancel}}),i("link-button",{attrs:{label:"保存"},on:{click:t.save}})],1),i("link-button-group",[i("link-button",{attrs:{label:"状态：","box-type":"line"}}),t._l(Object.keys(t.EDIT_STATUS),function(e,n){return i("link-button",{key:n,attrs:{label:e,active:t.EDIT_STATUS[e]===t.status}})})],2),i("link-radio",{attrs:{label:"批量新建"},model:{value:t.multiInsert,callback:function(e){t.multiInsert=e},expression:"multiInsert"}}),i("link-radio",{attrs:{label:"批量更新"},model:{value:t.multiUpdate,callback:function(e){t.multiUpdate=e},expression:"multiUpdate"}}),i("link-button-group",[i("link-button",{attrs:{label:"sortField:"+t.sortField,"box-type":"line"}}),i("link-button",{attrs:{label:"sortDesc:"+t.sortDesc,active:t.sortDesc}})],1),i("link-radio",{attrs:{label:"多选"},model:{value:t.multiSelect,callback:function(e){t.multiSelect=e},expression:"multiSelect"}})],1),i("demo-row",{attrs:{title:"测试固定列位置"}},[i("link-base-table",{ref:"baseTable",attrs:{data:t.list,"row-num":5,"sort-field":"left1","sort-desc":!0,"multi-select":t.multiSelect},on:{rowClick:t.rowClick,rowDblClick:t.rowDblClick,sortChange:t.sortChange}},[t.indexing?i("link-column-index"):t._e(),i("link-column-group",{attrs:{title:"右大组",fixed:"right"}},[i("link-column",{attrs:{field:"right",title:"右",fixed:"right",showInDialog:""}}),i("link-column-group",{attrs:{title:"右组",fixed:"right"}},[i("link-column-input",{attrs:{field:"right1",title:"右1"}}),i("link-column-input",{attrs:{field:"right2",title:"右2"}})],1)],1),i("link-column-group",{attrs:{title:"左大组",fixed:"left"}},[i("link-column-group",{attrs:{title:"左组",fixed:"left"}},[i("link-column-input",{attrs:{field:"left1",title:"左1",align:"right","data-type":"tel",tooltip:"",requiredFunc:t.requiredFunc}}),i("link-column",{attrs:{field:"left1",title:"左1"},on:{click:t.log},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row,n=e.rowIndex;return[t._v("\n                            普同行自定义内容:"+t._s(n)+"、"+t._s(i.left1)+"\n                        ")]}}],null,!1,3884454724)}),i("link-column-input",{attrs:{field:"left2",title:"左2"},on:{click:t.log},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.row,n=e.rowIndex;return[t._v("\n                            输入航自定义内容:"+t._s(n)+"、"+t._s(i.left1)+"\n                        ")]}}],null,!1,2276863062)})],1),i("link-column-input",{attrs:{field:"left",title:"左",fixed:"left"}})],1),i("link-column-group",{attrs:{title:"中组"}},[i("link-column-input",{attrs:{field:"center1",title:"中1"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}}),i("link-column-input",{attrs:{field:"center2",title:"中2"}})],1),i("link-column-input",{attrs:{field:"center",title:"中"}})],1)],1)],1)},l=[],r={name:"demo-base-table-test",data:function(){return{EDIT_STATUS:{INSERT:"insert",UPDATE:"update",NORMAL:"normal"},status:"normal",indexing:!0,multiInsert:!0,multiUpdate:!0,multiSelect:!1,sortDesc:!0,sortField:"left1",newData:[],targetIndex:null,list:[{right:1,right1:2,right2:3,left:"444start",left1:.1,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:13924569321,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:213.132,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:2333.3333,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:"444middle",left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9},{right:1,right1:2,right2:3,left:"444end",left1:21321312,left2:6,center:7,center1:8,center2:9}]}},mounted:function(){this.baseTable=this.$refs.baseTable},methods:{checkColumns:function(){},push:function(){this.list.unshift({right:1,right1:2,right2:3,left:4,left1:21321312,left2:6,center:7,center1:8,center2:9})},pop:function(){this.list.shift()},logContent:function(){console.log(this.baseTable.content)},enableEdit:function(){this.baseTable.enableEdit(this.targetIndex)},disableEdit:function(){this.baseTable.disableEdit(this.targetIndex)},startEdit:function(){this.baseTable.startEdit(this.targetIndex)},cancelEdit:function(){this.baseTable.cancelEdit(this.targetIndex)},sortChange:function(t){var e=t.field,i=t.desc;this.sortField=e||"created",this.sortDesc=!e||i},checkStatus:function(t){var e=t.insert,i=t.update,n=t.normal,l=t.final;switch(this.status){case this.EDIT_STATUS.NORMAL:n&&n.apply(this);break;case this.EDIT_STATUS.INSERT:e&&e.apply(this);break;case this.EDIT_STATUS.UPDATE:i&&i.apply(this);break}l&&l.apply(this)},rowClick:function(t){t.row;var e=t.rowIndex;t.position;console.log("rowClick",e)},rowDblClick:function(t){var e=t.row,i=t.rowIndex;t.position;this.checkStatus({update:function(){this.multiUpdate&&!e.p_editing&&this.baseTable.enableEdit(i)},normal:function(){this.baseTable.enableEdit(i),this.status=this.EDIT_STATUS.UPDATE}})},add:function(){var t=this,e=function(){var e={right:1,right1:2,right2:3,left:t.$plain.$utils.uuid(),left1:5,left2:6,center:7,center1:8,center2:9};t.newData.push(e),t.list.unshift(e),t.$nextTick(function(){return t.baseTable.enableEdit(0)}),t.status=t.EDIT_STATUS.INSERT};this.checkStatus({insert:function(){this.multiInsert&&e()},normal:function(){e()}})},cancel:function(){this.checkStatus({insert:function(){this.list.splice(0,this.newData.length),this.newData.splice(0,this.newData.length)},update:function(){this.baseTable.cancelEdit()},final:function(){this.status=this.EDIT_STATUS.NORMAL}})},save:function(){var t=this.baseTable.getEdit();this.checkStatus({insert:function(){this.multiInsert?this.saveRows({editData:t}):this.saveRow({editData:t}),this.newData.splice(0,this.newData.length),this.baseTable.disableEdit()},update:function(){this.multiUpdate?this.saveRows({editData:t}):this.saveRow({editData:t}),this.baseTable.disableEdit()},final:function(){this.status=this.EDIT_STATUS.NORMAL}})},saveRow:function(t){var e=t.editData,i=e[0],n=i.row,l=i.editRow,r=this.requestSaveRow(l);this.baseTable.saveEdit([{row:n,editRow:l,newRow:r}])},saveRows:function(t){var e=t.editData,i=e.map(function(t){return t.editRow}),n=this.requestSaveRows(i);this.baseTable.saveEdit(e.map(function(t,e){var i=t.row,l=t.editRow;return{row:i,editRow:l,newRow:n[e]}}))},requestSaveRow:function(t){var e=this.$plain.$utils.deepCopy(t);return e.left1=this.$plain.$utils.uuid(),e},requestSaveRows:function(t){var e=this;return t.reduce(function(t,i){var n=e.$plain.$utils.deepCopy(i);return n.left1=e.$plain.$utils.uuid(),t.push(n),t},[])},requiredFunc:function(t){t.row,t.rowIndex;var e=t.editRow;return console.log("valid","4"==e.left),"4"==e.left2}}},a=r,s=i("17cc"),c=Object(s["a"])(a,n,l,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0b5a8f.d5aab7b5.js.map