(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10961e44"],{"4cac":function(t,i,a){"use strict";var n=a("eae5"),o=a.n(n);o.a},8509:function(t,i,a){"use strict";a.r(i);var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"demo-dialog"},[a("demo-row",{attrs:{title:"基本用法"}},[a("link-button",{attrs:{label:"open",active:t.val1},on:{click:function(i){t.val1=!t.val1}}}),a("link-dialog",{model:{value:t.val1,callback:function(i){t.val1=i},expression:"val1"}},[t._v("\n            一二三四五六七\n            "),a("link-button",{attrs:{label:"关闭",full:""},on:{click:function(i){t.val1=!1}}}),a("demo-child",{attrs:{title:"i am child"}}),a("link-button",{attrs:{label:"hello world"},on:{click:function(i){return t.$dialog.show("Hello world")}}})],1)],1),a("demo-row",{attrs:{title:"形状"}},[a("link-button",{attrs:{label:"fillet"},on:{click:function(i){return t.$refs.filletDialog.show()}}}),a("link-dialog",{ref:"filletDialog",attrs:{shape:"fillet"}},[t._v("fillet")]),a("link-button",{attrs:{label:"none"},on:{click:function(i){return t.$refs.noneDialog.show()}}}),a("link-dialog",{ref:"noneDialog",attrs:{shape:"none"}},[t._v("none")])],1),a("demo-row",{attrs:{title:"类型"}},[t._l(t.types,function(i,n){return a("link-button",{key:n,attrs:{label:i},on:{click:function(i){return t.showDialog(n)}}})}),t._l(t.types,function(i,n){return a("link-dialog",{key:n+10,ref:"typeDialogs",refInFor:!0,attrs:{type:i}},[t._v(t._s(i))])})],2),a("demo-row",{attrs:{title:"遮罩色"}},[a("link-button",{attrs:{label:"shadowColor"},on:{click:function(i){return t.$refs.shadowColorDialog.show()}}}),a("link-dialog",{ref:"shadowColorDialog",attrs:{"shadow-color":"transparent"}},[t._v("shadowColor")])],1),a("demo-row",{attrs:{title:"禁用点击遮罩之后关闭动作"}},[a("link-button",{attrs:{label:"disabledHideOnClickShadow"},on:{click:function(i){return t.$refs.disabledHideOnClickShadowDialog.show()}}}),a("link-dialog",{ref:"disabledHideOnClickShadowDialog",attrs:{"disabled-hide-on-click-shadow":""}},[t._v("disabledHideOnClickShadow")])],1),a("demo-row",{attrs:{title:"弹出动画"}},[a("link-button",{attrs:{label:"transition"},on:{click:function(i){return t.$refs.transitionDialog.show()}}}),a("link-dialog",{ref:"transitionDialog",attrs:{transition:"pl-dialog-scale"}},[t._v("transition")])],1),a("demo-row",{attrs:{title:"设定宽度以及高度"}},[a("link-button",{attrs:{label:"size"},on:{click:function(i){return t.$refs.sizeDialog.show()}}}),a("link-dialog",{ref:"sizeDialog",attrs:{width:"500px",height:"250px"}},[t._v("width and height")])],1),a("demo-row",{attrs:{title:"设定最小宽度以及最小高度"}},[a("link-button",{attrs:{label:"size"},on:{click:function(i){return t.$refs.minSizeDialog.show()}}}),a("link-dialog",{ref:"minSizeDialog",attrs:{"min-width":"500px","min-height":"250px"}},[t._v("minWidth and minHeight")])],1),a("demo-row",{attrs:{title:"设定最大宽度以及最大高度"}},[a("link-button",{attrs:{label:"size"},on:{click:function(i){return t.$refs.maxSizeDialog.show()}}}),a("link-dialog",{ref:"maxSizeDialog",attrs:{"max-width":"500px","max-height":"250px"}},[t._v("\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n            maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,maxWidth and maxHeight,\n        ")])],1),a("demo-row",{attrs:{title:"满屏"}},[a("link-button",{attrs:{label:"full"},on:{click:function(i){return t.$refs.fullDialog.show()}}}),a("link-dialog",{ref:"fullDialog",attrs:{full:""}},[t._v("full")])],1),a("demo-row",{attrs:{title:"确认以及取消按钮"}},[a("link-button",{attrs:{label:"button"},on:{click:function(i){return t.$refs.buttonDialog.show()}}}),a("link-dialog",{ref:"buttonDialog",attrs:{"confirm-button":"","cancel-button":""},on:{confirm:function(i){return t.log("confrm")},cancel:function(i){return t.log("cancel")}}},[t._v("button")])],1),a("demo-row",{attrs:{title:"无关闭按钮"}},[a("link-button",{attrs:{label:"noClose"},on:{click:function(i){return t.$refs.noCloseDialog.show()}}}),a("link-dialog",{ref:"noCloseDialog",attrs:{"no-close":""}},[t._v("noClose")])],1),a("demo-row",{attrs:{title:"给对话框添加class"}},[a("link-button",{attrs:{label:"dialogClass"},on:{click:function(i){return t.$refs.dialogClassDialog.show()}}}),a("link-dialog",{ref:"dialogClassDialog",attrs:{"dialog-class":"demo-class"}},[t._v("dialogClass")])],1),a("demo-row",{attrs:{title:"横向以及纵向位置"}},[a("link-button-group",[a("link-button",{attrs:{"box-type":"line",label:"vertical"}}),a("link-button",{attrs:{label:"start",active:"start"===t.vertical},on:{click:function(i){t.vertical="start"}}}),a("link-button",{attrs:{label:"center",active:"center"===t.vertical},on:{click:function(i){t.vertical="center"}}}),a("link-button",{attrs:{label:"end",active:"end"===t.vertical},on:{click:function(i){t.vertical="end"}}})],1),a("link-button-group",[a("link-button",{attrs:{"box-type":"line",label:"horizontal"}}),a("link-button",{attrs:{label:"start",active:"start"===t.horizontal},on:{click:function(i){t.horizontal="start"}}}),a("link-button",{attrs:{label:"center",active:"center"===t.horizontal},on:{click:function(i){t.horizontal="center"}}}),a("link-button",{attrs:{label:"end",active:"end"===t.horizontal},on:{click:function(i){t.horizontal="end"}}})],1),a("link-button",{attrs:{label:"position"},on:{click:function(i){return t.$refs.positionDialog.show()}}}),a("link-dialog",{ref:"positionDialog",attrs:{vertical:t.vertical,horizontal:t.horizontal}},[t._v("positionDialog")])],1),a("demo-row",{attrs:{title:"初始化的时候就初始化内容"}},[a("link-button",{attrs:{label:"initialized"},on:{click:function(i){return t.$refs.initializedDialog.show()}}}),a("link-dialog",{ref:"initializedDialog",attrs:{initialized:""}},[t._v("\n            一二三四五六七\n            "),a("link-button",{attrs:{label:"关闭",full:""},on:{click:function(i){return t.$refs.initializedDialog.hide()}}}),a("demo-child")],1)],1),a("demo-row",{attrs:{title:"关闭的时候销毁内容"}},[a("link-button",{attrs:{label:"destroyOnHide"},on:{click:function(i){return t.$refs.destroyOnHideDialog.show()}}}),a("link-dialog",{ref:"destroyOnHideDialog",attrs:{"destroy-on-hide":""}},[t._v("\n            一二三四五六七\n            "),a("link-button",{attrs:{label:"关闭"},on:{click:function(i){return t.$refs.destroyOnHideDialog.hide()}}}),a("demo-child",{attrs:{title:"destroyOnHideDialog"}})],1)],1),a("demo-row",{attrs:{title:"将dom移动到body下面"}},[a("link-button",{attrs:{label:"transfer-dom"},on:{click:function(i){return t.$refs.transferDomDialog.show()}}}),a("link-dialog",{ref:"transferDomDialog",attrs:{"transfer-dom":"","dialog-class":"transferDomDialog"}},[t._v("transfer-dom")])],1),a("demo-row",{attrs:{title:"可最大化"}},[a("link-button",{attrs:{label:"max"},on:{click:function(i){return t.$refs.maxDialog.show()}}}),a("link-dialog",{ref:"maxDialog",attrs:{max:""}},[t._v("max")])],1),a("demo-row",{attrs:{title:"去掉默认的内容padding"}},[a("link-button",{attrs:{label:"no-padding"},on:{click:function(i){return t.$refs.noPaddingDialog.show()}}}),a("link-dialog",{ref:"noPaddingDialog",attrs:{"no-padding":""}},[t._v("no-padding")])],1),a("demo-row",{attrs:{title:"调整上下左右位置"}},[a("link-button",{attrs:{label:"left top right bottom"},on:{click:function(i){return t.$refs.positionAdjustDialog.show()}}}),a("link-dialog",{ref:"positionAdjustDialog",attrs:{top:"100px",left:"100px",bottom:"0",right:"0"}},[a("link-button-group",[a("link-button",[t._v("top:100px")]),a("link-button",[t._v("left:100px")]),a("link-button",[t._v("bottom:0")]),a("link-button",[t._v("right:0")])],1)],1)],1),a("demo-row",{attrs:{title:"没有顶部标题以及底部栏"}},[a("link-button",{attrs:{label:"no head and not foot"},on:{click:function(i){return t.$refs.noHeadAndFootDialog.show()}}}),a("link-dialog",{ref:"noHeadAndFootDialog",attrs:{"no-header":"","no-footer":""}},[t._v("no head and not foot")])],1),a("demo-row",{attrs:{title:"底部栏对其方式"}},[a("link-button",{attrs:{label:"foot align"},on:{click:function(i){return t.$refs.footAlignDialog.show()}}}),a("link-dialog",{ref:"footAlignDialog",attrs:{"foot-align":"right","confirm-button":"","cancel-button":""}},[t._v("foot align right")])],1)],1)},o=[],l={name:"demo-dialog",data:function(){return{val1:!1,val2:!1,types:["info","success","warn","error","help"],vertical:"center",horizontal:"center"}},methods:{showDialog:function(t){console.log(t),this.$refs.typeDialogs[t].show()}}},e=l,r=(a("4cac"),a("17cc")),d=Object(r["a"])(e,n,o,!1,null,null,null);i["default"]=d.exports},eae5:function(t,i,a){}}]);
//# sourceMappingURL=chunk-10961e44.f2d9a7dd.js.map