<template>
    <div class="demo-tab-header">
        <demo-row :title="`基本用法,当前位置：${val[0]}`">
            <link-tab-header :data="['Color颜色','Icon图标','Button按钮']" v-model="val[0]"/>
        </demo-row>
        <demo-row title="删除图标">
            <link-tab-header :data="['Color颜色','Icon图标','Button按钮']" v-model="val[0]" clear-icon/>
        </demo-row>
        <demo-row title="监听删除事件以及右击删除">
            <link-tab-header :data="data" clear-icon @close="p_remove" @contextmenu="p_remove"/>
            <demo-row>
                <link-button-group>
                    <link-button label="add" @click="p_add"/>
                    <link-button label="substract" @click="p_substract"/>
                </link-button-group>
            </demo-row>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-tab-header",
        data() {
            return {
                val: {
                    0: 0,
                },
                data: ['Color颜色', 'Icon图标', 'Button按钮']
            }
        },
        methods: {
            p_remove({item}) {
                this.data.splice(this.data.indexOf(item), 1)
            },
            p_add() {
                this.data.push(new Date().getTime())
            },
            p_substract() {
                this.data.pop()
            },
        }
    }
</script>

<style lang="scss">

</style>