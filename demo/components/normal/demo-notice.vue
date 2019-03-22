<template>
    <div class="demo-notice">
        <demo-row title="基本用法">
            <link-button label="basically" @click="$notice.show('您有新的消息！')"/>
        </demo-row>
        <demo-row title="提示类型">
            <link-button @click="$notice.show('操作成功！',{type:'info'})" label="info" box-color="primary"/>
            <link-button @click="$notice.show('操作成功！',{type:'success'})" label="success" box-color="success"/>
            <link-button @click="$notice.show('操作成功！',{type:'warn'})" label="warn" box-color="warn"/>
            <link-button @click="$notice.show('操作成功！',{type:'error'})" label="error" box-color="error"/>
            <link-button @click="$notice.show('操作成功！',{type:'help'})" label="help" box-color="info"/>
        </demo-row>
        <demo-row title="位置">
            <link-button @click="$notice.show('操作成功！',{horizontal:'start',vertical:'start'})" label="左上"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'center',vertical:'start'})" label="中上"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'end',vertical:'start'})" label="右上"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'start',vertical:'center'})" label="左中"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'center',vertical:'center'})" label="中中"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'end',vertical:'center'})" label="右中"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'start',vertical:'end'})" label="左下"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'center',vertical:'end'})" label="中下"/>
            <link-button @click="$notice.show('操作成功！',{horizontal:'end',vertical:'end'})" label="右下"/>
        </demo-row>
        <demo-row title="关闭时间与不自动关闭">
            <link-button @click="$notice.show('操作成功！',{time:1000,done:()=>log('done')})" label="一秒后自动关闭"/>
            <link-button @click="dontAutoClose" label="不自动关闭"/>
        </demo-row>
        <demo-row title="标题">
            <link-button label="标题" @click="$notice.show('您有新的消息！',{title:'你有一份新的邮件信息'})"/>
        </demo-row>
        <demo-row title="不要标题栏">
            <link-button label="noHeader" @click="$notice.show('您有新的消息！',{noHeader:true})"/>
        </demo-row>
        <demo-row title="自定义渲染内容">
            <link-button label="renderFunc" @click="costumeRender"/>
            <link-input v-model="val"/>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-notice",
        data() {
            return {
                val: null,
            }
        },
        methods: {
            dontAutoClose() {
                this.msg = this.$notice.show('操作成功！', {
                    time: null,
                    click: () => {
                        console.log('click');
                    }
                })
            },
            costumeRender() {
                const that = this
                this.$notice.show(null, {
                    renderFunc(h) {
                        return (<link-input value={that.val} onInput={e => that.val = e}/>)
                    },
                    time: null,
                })
            },
        }
    }
</script>

<style lang="scss">

</style>