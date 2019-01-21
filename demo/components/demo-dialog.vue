<template>
    <div class="demo-dialog">
        <demo-row title="基本用法">
            <link-button label="open" @click="val1=!val1" :active="val1"/>
            <link-dialog v-model="val1">
                一二三四五六七
                <link-button label="关闭" @click="val1 = false" full/>
                <demo-child/>
            </link-dialog>
        </demo-row>
        <demo-row title="形状">
            <link-button label="fillet" @click="$refs.filletDialog.show()"/>
            <link-dialog ref="filletDialog" shape="fillet">fillet</link-dialog>
            <link-button label="none" @click="$refs.noneDialog.show()"/>
            <link-dialog ref="noneDialog" shape="none">none</link-dialog>
        </demo-row>
        <demo-row title="类型">
            <link-button v-for="(type,index) in  types" :key="index" :label="type" @click="showDialog(index)"/>
            <link-dialog ref="typeDialogs" v-for="(type,index) in types" :type="type" :key="index+10">{{type}}</link-dialog>
        </demo-row>
        <demo-row title="遮罩色">
            <link-button label="shadowColor" @click="$refs.shadowColorDialog.show()"/>
            <link-dialog ref="shadowColorDialog" shadow-color="transparent">shadowColor</link-dialog>
        </demo-row>
        <demo-row title="禁用点击遮罩之后关闭动作">
            <link-button label="disabledHideOnClickShadow" @click="$refs.disabledHideOnClickShadowDialog.show()"/>
            <link-dialog ref="disabledHideOnClickShadowDialog" disabled-hide-on-click-shadow>disabledHideOnClickShadow</link-dialog>
        </demo-row>

        <demo-row title="弹出动画">
            <link-button label="transition" @click="$refs.transitionDialog.show()"/>
            <link-dialog ref="transitionDialog" transition="lv-dialog-scale">transition</link-dialog>
        </demo-row>

        <demo-row title="设定宽度以及高度">
            <link-button label="size" @click="$refs.sizeDialog.show()"/>
            <link-dialog ref="sizeDialog" width="500px" height="250px">width and height</link-dialog>
        </demo-row>
        <demo-row title="满屏">
            <link-button label="full" @click="$refs.fullDialog.show()"/>
            <link-dialog ref="fullDialog" full>full</link-dialog>
        </demo-row>

        <demo-row title="确认以及取消按钮">
            <link-button label="button" @click="$refs.buttonDialog.show()"/>
            <link-dialog ref="buttonDialog" confirm-button cancel-button @confirm="log('confrm')" @cancel="log('cancel')">button</link-dialog>
        </demo-row>
        <demo-row title="无关闭按钮">
            <link-button label="noClose" @click="$refs.noCloseDialog.show()"/>
            <link-dialog ref="noCloseDialog" no-close>noClose</link-dialog>
        </demo-row>
        <demo-row title="给对话框添加class">
            <link-button label="dialogClass" @click="$refs.dialogClassDialog.show()"/>
            <link-dialog ref="dialogClassDialog" dialog-class="demo-class">dialogClass</link-dialog>
        </demo-row>
        <demo-row title="横向以及纵向位置">
            <link-button-group>
                <link-button box-type="line" label="vertical"/>
                <link-button label="start" @click="vertical = 'start'" :active="vertical === 'start'"/>
                <link-button label="center" @click="vertical = 'center'" :active="vertical === 'center'"/>
                <link-button label="end" @click="vertical = 'end'" :active="vertical === 'end'"/>
            </link-button-group>
            <link-button-group>
                <link-button box-type="line" label="horizontal"/>
                <link-button label="start" @click="horizontal = 'start'" :active="horizontal === 'start'"/>
                <link-button label="center" @click="horizontal = 'center'" :active="horizontal === 'center'"/>
                <link-button label="end" @click="horizontal = 'end'" :active="horizontal === 'end'"/>
            </link-button-group>
            <link-button label="position" @click="$refs.positionDialog.show()"/>
            <link-dialog ref="positionDialog" :vertical="vertical" :horizontal="horizontal">positionDialog</link-dialog>
        </demo-row>

        <demo-row title="初始化的时候就初始化内容">
            <link-button label="initialized" @click="$refs.initializedDialog.show()"/>
            <link-dialog ref="initializedDialog" initialized>
                一二三四五六七
                <link-button label="关闭" @click="$refs.initializedDialog.hide()" full/>
                <demo-child/>
            </link-dialog>
        </demo-row>

        <demo-row title="关闭的时候销毁内容">
            <link-button label="destroyOnHide" @click="$refs.destroyOnHideDialog.show()"/>
            <link-dialog ref="destroyOnHideDialog" destroy-on-hide>
                一二三四五六七
                <link-button label="关闭" @click="$refs.destroyOnHideDialog.hide()"/>
                <demo-child title="destroyOnHideDialog"/>
            </link-dialog>
        </demo-row>

        <demo-row title="将dom移动到body下面">
            <link-button label="transfer-dom" @click="$refs.transferDomDialog.show()"/>
            <link-dialog ref="transferDomDialog" transfer-dom dialog-class="transferDomDialog">transfer-dom</link-dialog>
        </demo-row>
        <demo-row title="可最大化">
            <link-button label="max" @click="$refs.maxDialog.show()"/>
            <link-dialog ref="maxDialog" max>max</link-dialog>
        </demo-row>
        <demo-row title="去掉默认的内容padding">
            <link-button label="no-padding" @click="$refs.noPaddingDialog.show()"/>
            <link-dialog ref="noPaddingDialog" no-padding>no-padding</link-dialog>
        </demo-row>
        <demo-row title="调整上下左右位置">
            <link-button label="left top right bottom" @click="$refs.positionAdjustDialog.show()"/>
            <link-dialog ref="positionAdjustDialog" top="100px" left="100px" bottom="0" right="0">
                <link-button-group>
                    <link-button>top:100px</link-button>
                    <link-button>left:100px</link-button>
                    <link-button>bottom:0</link-button>
                    <link-button>right:0</link-button>
                </link-button-group>
            </link-dialog>
        </demo-row>
        <demo-row title="没有顶部标题以及底部栏">
            <link-button label="no head and not foot" @click="$refs.noHeadAndFootDialog.show()"/>
            <link-dialog ref="noHeadAndFootDialog" no-header no-footer>no head and not foot</link-dialog>
        </demo-row>
        <!--<link-button label="open" @click="val1=!val1" :active="val1"/>
        <link-dialog v-model="val1" title="基本对话框" @confirm="log('confirm')" @cancel="log('cancel')">
            <div>
                demo-dialog1111
            </div>
            <link-button label="open" @click="val2=!val2" :active="val2"/>
            <link-dialog v-model="val2" :width="300" :height="156">
                demo-dialog2222
            </link-dialog>
        </link-dialog>-->
    </div>
</template>

<script>
    export default {
        name: "demo-dialog",
        data() {
            return {
                val1: false,
                val2: false,
                types: ['info', 'success', 'warn', 'error', 'help'],
                vertical: 'center',
                horizontal: 'center',
            }
        },
        methods: {
            showDialog(index) {
                console.log(index);
                this.$refs.typeDialogs[index].show()
            },
        }
    }
</script>

<style lang="scss">
    .test-box {
        height: 200px;
        width: 100%;
        background-color: #1076ca
    }

    .demo-class {
        background-color: black !important;
    }
</style>