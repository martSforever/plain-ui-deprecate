<template>
    <div class="demo-base-table-column">
        <demo-row title="基础列(order)排序">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="id" title="编号(order=-1)" :order="-1"/>
                <link-column field="name" title="姓名(order=1)" :order="1"/>
                <link-column field="name" title="姓名"/>
                <link-column field="age" title="年龄"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="基础列：宽度">
            <demo-row title="列宽不足">
                <link-base-table :data="getData()">
                    <link-column field="id" title="编号(width=300)" :width="300"/>
                    <link-column field="name" title="姓名(width=200)" :width="200"/>
                    <link-column field="age" title="年龄(width=100)" :width="100"/>
                </link-base-table>
            </demo-row>
            <demo-row title="列宽足够">
                <link-base-table :data="getData()">
                    <link-column field="id" title="编号(width=300)" :width="300"/>
                    <link-column field="name" title="姓名(width=200)" :width="200"/>
                    <link-column field="age" title="年龄(width=100)" :width="100"/>
                    <link-column field="id" title="编号(width=300)" :width="300"/>
                    <link-column field="name" title="姓名(width=200)" :width="200"/>
                    <link-column field="age" title="年龄(width=100)" :width="100"/>
                    <link-column field="id" title="编号(width=300)" :width="300"/>
                    <link-column field="name" title="姓名(width=200)" :width="200"/>
                    <link-column field="age" title="年龄(width=100)" :width="100"/>
                    <link-column field="id" title="编号(width=300)" :width="300"/>
                    <link-column field="name" title="姓名(width=200)" :width="200"/>
                    <link-column field="age" title="年龄(width=100)" :width="100"/>
                </link-base-table>
            </demo-row>
        </demo-row>
        <demo-row title="左右固定列">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号" fixed="left"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
                <link-column field="name" title="姓名"/>
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
        <demo-row title="对其方式">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号(align=left)" align="left"/>
                <link-column field="name" title="姓名(align=center)" align="center"/>
                <link-column field="age" title="年龄(align=right)" align="right"/>
            </link-base-table>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-base-table-column",
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
        }
    }
</script>

<style lang="scss">

</style>