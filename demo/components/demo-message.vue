<template>
    <div class="demo-message">
        <demo-row title="基本用法">
            <link-button @click="$message.show('操作成功！')" label="basically"/>
        </demo-row>
        <demo-row title="提示类型">
            <link-button @click="$message.show('操作成功！',{type:'info'})" label="info" box-color="primary"/>
            <link-button @click="$message.show('操作成功！',{type:'success'})" label="success" box-color="success"/>
            <link-button @click="$message.show('操作成功！',{type:'warn'})" label="warn" box-color="warn"/>
            <link-button @click="$message.show('操作成功！',{type:'error'})" label="error" box-color="error"/>
            <link-button @click="$message.show('操作成功！',{type:'help'})" label="help" box-color="info"/>
        </demo-row>
        <demo-row title="位置">
            <link-button @click="$message.show('操作成功！',{horizontal:'start',vertical:'start'})" label="左上"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'center',vertical:'start'})" label="中上"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'end',vertical:'start'})" label="右上"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'start',vertical:'center'})" label="左中"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'center',vertical:'center'})" label="中中"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'end',vertical:'center'})" label="右中"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'start',vertical:'end'})" label="左下"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'center',vertical:'end'})" label="中下"/>
            <link-button @click="$message.show('操作成功！',{horizontal:'end',vertical:'end'})" label="右下"/>
        </demo-row>
        <demo-row>
            <link-button @click="$message.show('操作成功！',{time:1000,done:()=>log('done')})" label="一秒后自动关闭"/>
            <link-button @click="dontAutoClose" label="不自动关闭"/>
        </demo-row>
    </div>
</template>

<script>
    import LvMessageContainer from "../../src/components/message/pl-message-container";

    export default {
        name: "demo-message",
        components: {LvMessageContainer},
        methods: {
            dontAutoClose() {
                this.msg = this.$message.show('操作成功！', {
                    time: null,
                    click: () => {
                        console.log('click');
                        this.$message.close(this.msg)
                    }
                })
            },
        }
    }
</script>

<style lang="scss">

</style>