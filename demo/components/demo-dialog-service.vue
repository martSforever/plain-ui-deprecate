<template>
    <div class="demo-dialog-service">
        <demo-row title="基本用法">
            <link-button label="basically" @click="$dialog.show('Hello world')"/>
        </demo-row>
        <demo-row title="消息类型">
            <link-button label="info" @click="$dialog.show('Hello world',{type:'info'})"/>
            <link-button label="success" @click="$dialog.show('Hello world',{type:'success'})"/>
            <link-button label="warn" @click="$dialog.show('Hello world',{type:'warn'})"/>
            <link-button label="error" @click="$dialog.show('Hello world',{type:'error'})"/>
            <link-button label="help" @click="$dialog.show('Hello world',{type:'help'})"/>
        </demo-row>
        <demo-row title="标题">
            <link-button label="basically" @click="$dialog.show('Hello world',{title:'this is title'})"/>
        </demo-row>
        <demo-row title="形状">
            <link-button label="fillet" @click="$dialog.show('Hello world',{shape:'fillet'})"/>
            <link-button label="none" @click="$dialog.show('Hello world',{shape:'none'})"/>
        </demo-row>
        <demo-row title="遮罩色">
            <link-button label="shadowColor" @click="$dialog.show('Hello world',{shadowColor:'transparent'})"/>
        </demo-row>
        <demo-row title="禁用在点击遮罩时关闭对话框">
            <link-button label="disabledHideOnClickShadow" @click="$dialog.show('Hello world',{disabledHideOnClickShadow:true})"/>
        </demo-row>
        <demo-row title="显隐动画">
            <link-button label="transition" @click="$dialog.show('Hello world',{transition:'lv-dialog-scale'})"/>
        </demo-row>
        <demo-row title="高度以及宽度">
            <link-button label="宽高" @click="$dialog.show('Hello world',{height:100,width:400})"/>
        </demo-row>
        <demo-row title="最大化">
            <link-button label="最大化" @click="$dialog.show('Hello world',{full:true})"/>
        </demo-row>
        <demo-row title="确认以及取消按钮">
            <link-button label="确认以及取消按钮" @click="$dialog.show('Hello world',{confirmButton:true,cancelButton:true,onConfirm:()=>log('confirm'),onCancel:()=>log('cancel')})"/>
        </demo-row>
        <demo-row title="无关闭按钮">
            <link-button label="无关闭按钮" @click="$dialog.show('Hello world',{noClose:true})"/>
        </demo-row>
        <demo-row title="给对话框添加class，以控制样式">
            <link-button label="dialogClass" @click="$dialog.show('Hello world',{dialogClass:'dialogClass'})"/>
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
            <link-button label="position" @click="$dialog.show('Hello world',{top:0,horizontal,vertical})"/>
        </demo-row>
        <demo-row title="可最大化">
            <link-button label="max" @click="$dialog.show('Hello world',{max:true})"/>
        </demo-row>
        <demo-row title="调整位置">
            <link-button label="max" @click="$dialog.show('Hello world',{top:200,left:200,})"/>
        </demo-row>
        <demo-row title="隐藏头部栏以及底部栏">
            <link-button label="hide head and foot" @click="$dialog.show('Hello world',{noHeader:true,noFooter:true})"/>
        </demo-row>
        <demo-row title="使用渲染函数自定义渲染内容">
            <link-button label="hide head and foot" @click="customeRender"/>
            <link-input v-model="input"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-dialog-service",
        data() {
            return {
                vertical: 'center',
                horizontal: 'center',
                input: '自定义渲染内容???',
            }
        },
        methods: {
            customeRender() {
                this.$dialog.show(null, {
                    render: () => {
                        return (
                            <div>
                                <link-input value={this.input} onInput={e => this.input = e} long/>
                            </div>
                        )
                    },
                })
            },
        }
    }
</script>

<style lang="scss">

</style>