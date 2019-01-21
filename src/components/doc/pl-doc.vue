<template>
    <div class="pl-doc">
        <div class="pl-doc-item" v-if="!!lvProps&&lvProps.length>0">
            <h2 class="pl-doc-item-head">Props</h2>
            <table>
                <thead>
                <tr>
                    <th>参数</th>
                    <th>类型</th>
                    <th>可选值</th>
                    <th>默认值</th>
                    <th>说明</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in lvProps" :key="index">
                    <td>{{item.name || '---'}}</td>
                    <td>{{item.type || '---'}}</td>
                    <td>{{item.type === 'Boolean'?'true|false':item.select || '---'}}</td>
                    <td>{{item.type === 'Boolean'&&item.default == null?'false':item.default || '---'}}</td>
                    <td>{{item.desc || '---'}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pl-doc-item" v-if="!!lvEvents&&lvEvents.length>0">
            <h2 class="pl-doc-item-head">Events</h2>
            <table>
                <thead>
                <tr>
                    <th>事件名</th>
                    <th>说明</th>
                    <th>参数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in lvEvents" :key="index">
                    <td>{{item.name || '---'}}</td>
                    <td>{{item.desc || '---'}}</td>
                    <td>{{item.param || '---'}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pl-doc-item" v-if="!!lvMethods&&lvMethods.length>0">
            <h2 class="pl-doc-item-head">Methods</h2>
            <table>
                <thead>
                <tr>
                    <th>方法名</th>
                    <th>说明</th>
                    <th>参数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in lvMethods" :key="index">
                    <td>{{item.name || '---'}}</td>
                    <td>{{item.desc || '---'}}</td>
                    <td>{{item.param || '---'}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="pl-doc-item" v-if="!!lvSlots&&lvSlots.length>0">
            <h2 class="pl-doc-item-head">Slots</h2>
            <table>
                <thead>
                <tr>
                    <th>插槽名称</th>
                    <th>说明</th>
                    <th>作用域参数</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,index) in lvSlots" :key="index">
                    <td>{{item.name || '---'}}</td>
                    <td>{{item.desc || '---'}}</td>
                    <td>{{item.param || '---'}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pl-doc",
        props: {
            lvProps: {type: Array},
            lvEvents: {type: Array},
            lvMethods: {type: Array},
            lvSlots: {type: Array},
        },
    }
</script>

<style lang="scss">
    .pl-doc {
        padding: 0 20px;
        .pl-doc-item {
            .pl-doc-item-head {
                color: $color-primary;
            }
            table {
                width: 100%;
                thead, tbody {
                    tr th, tr td {
                        border-bottom: solid 1px #f2f2f2;
                        text-align: left;
                        padding: 12px 0;
                    }
                }
                thead {
                    th:not(:last-child) {
                        width: 250px;
                    }
                }
            }

        }
    }
</style>