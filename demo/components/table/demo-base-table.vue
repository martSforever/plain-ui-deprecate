<template>
    <div class="demo-base-table">
        <link-base-table :data="list">
            <link-column field="id" title="编号"/>
            <link-column field="name" title="姓名"/>
            <link-column field="age" title="年龄"/>
        </link-base-table>
    </div>
</template>

<script>
    export default {
        name: "demo-base-table",
        data() {
            const list = []
            const time = new Date().getTime()
            for (let i = 0; i < 15; i++) {
                list.push({
                    id: time + i,
                    name: '小明' + i,
                    age: 20 + i
                })

            }
            return {
                list
            }
        },

    }
</script>

<style lang="scss">

</style>