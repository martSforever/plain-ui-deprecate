<template>
    <div class="demo-base-table">
        <demo-row title="基本用法">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="个人感觉斑马纹表格不好看，就不加这个功能了"/>
        <demo-row title="自动横向以及纵向滚动">
            <link-base-table :data="getData(15)">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="左右固定列">
            <link-base-table :data="getData(15)">
                <link-column field="id" title="编号" fixed="left"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄" fixed="right"/>
            </link-base-table>
        </demo-row>
        <demo-row title="通过显示的行数，设置表格高度（如果要表格高度自动填满页面，参考Table组件【不是BaseTable】的fill属性实现）">
            <link-base-table :data="getData(10)" :row-num="5">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="多级表头">
            <link-base-table :data="getData()">
                <link-column-group title="用户信息">
                    <link-column field="id" title="编号"/>
                    <link-column field="name" title="姓名"/>
                </link-column-group>
                <link-column field="age" title="年龄"/>
                <link-column-group title="用户信息">
                    <link-column field="id" title="编号"/>
                    <link-column field="name" title="姓名"/>
                </link-column-group>
            </link-base-table>
        </demo-row>
        <demo-row title="设置标题行高以及表体行高">
            <link-base-table :data="getData()" :rowHeight="50" :headRowHeight="50">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="不显示标题">
            <link-base-table :data="getData()" no-header>
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>

        <demo-row title="列权重">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名,fit=1" :fit="1"/>
                <link-column field="age" title="年龄fit=1" :fit="1"/>
            </link-base-table>
        </demo-row>
        <demo-row title="默认列权重，没有固定列">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="默认列权重，有固定列">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名" fixed="left"/>
                <link-column field="age" title="年龄"/>
                <link-column field="age" title="年龄" fixed="right"/>
            </link-base-table>
        </demo-row>

        <demo-row title="使用渲染【渲染函数】组件渲染列内容">
            <link-base-table :data="getData()">
                <pl-render-func :render-func="renderFunc"/>
            </link-base-table>
        </demo-row>
    </div>
</template>

<script>
    import PlRenderFunc from "../../../src/components/render/pl-render-func";

    export default {
        name: "demo-base-table",
        components: {PlRenderFunc},
        data() {
            return {}
        },
        methods: {
            getData(num = 5) {
                const list = []
                const time = new Date().getTime()
                for (let i = 0; i < num; i++) {
                    list.push({
                        id: time + i,
                        name: '小明' + i,
                        age: 20 + i
                    })
                }
                return list
            },
            renderFunc() {
                return (
                    <div>
                        <link-column field="id" title="编号"/>
                        <link-column field="name" title="姓名"/>
                        <link-column field="age" title="年龄"/>
                    </div>
                )
            },
        }
    }
</script>

<style lang="scss">

</style>