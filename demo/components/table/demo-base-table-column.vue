<template>
    <div class="demo-base-table-column">
        <!-- <demo-row title="基础列(order)排序">
             <link-base-table :data="getData()">
                 <link-column field="id" title="编号"/>
                 <link-column field="id" title="编号(order=-1)" :order="-1"/>
                 <link-column field="name" title="姓名(order=1)" :order="1"/>
                 <link-column field="name" title="姓名"/>
                 <link-column field="age" title="年龄"/>
                 <link-column field="age" title="年龄"/>
             </link-base-table>
         </demo-row>
         <demo-row title="多级表头列排序">
             <link-base-table :data="getData()">
                 <link-column-group title="用户信息">
                     <link-column field="id" title="编号(order=1,position=1)" :order="1"/>
                     <link-column field="name" title="姓名(order=2,position=2)" :order="2"/>
                     <link-column field="id" title="编号(order=1,position=3)" :order="1"/>
                     <link-column field="name" title="姓名(order=2,position=4)" :order="2"/>
                 </link-column-group>
                 <link-column field="age" title="年龄"/>
                 <link-column-group title="用户信息">
                     <link-column field="id" title="编号"/>
                     <link-column field="name" title="姓名"/>
                 </link-column-group>
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
         <demo-row title="数据格式化显示">
             <link-base-table :data="getData()">
                 <link-column field="id" title="编号"/>
                 <link-column field="name" title="姓名"/>
                 <link-column field="age" title="年龄"/>
                 <link-column field="id" title="id(dataType=tel)" dataType="tel"/>
                 <link-column field="id" title="id(dataType=cny)" dataType="cny"/>
                 <link-column field="id" title="id(dataType=money)" dataType="money"/>
                 <link-column field="id" title="id(dataType=percent)" dataType="percent"/>
             </link-base-table>
         </demo-row>-->
        <demo-row title="对其方式">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号(align=left)" align="left"/>
                <link-column field="name" title="姓名(align=center)" align="center"/>
                <link-column field="age" title="年龄(align=right)" align="right"/>
            </link-base-table>
        </demo-row>
        <demo-row title="浮动显示文本">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号(tooltip)" tooltip/>
                <link-column field="id" title="编号(tooltip)"/>
                <link-column field="id" title="编号(tooltip)" tooltip>
                    <template slot-scope="{row}">
                        <link-tooltip-text :content="row.id"/>
                    </template>
                </link-column>
                <link-column field="name" title="姓名(tooltip)"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <!--<demo-row title="超链接样式，并且监听点击事件">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名(link)" link @click="({row})=>$message.show(row.name)"/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="点击之后弹框显示文本">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名(showInDialog)" showInDialog link/>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="自定义列内容">
            <link-base-table :data="getData()">
                <link-column field="id" title="编号"/>
                <link-column field="name" title="姓名">
                    <template slot-scope="{row}">
                        <link-icon icon="pl-check-square"/>
                        <span>hello:{{row.name}}</span>
                    </template>
                </link-column>
                <link-column field="age" title="年龄"/>
            </link-base-table>
        </demo-row>
        <demo-row title="列隐藏以及显示(disabled-config为true的列无法配置)">
            <demo-row title="操作">
                <link-button-group>
                    <link-button label="refreshRender" @click="$refs.hideDemoTable.refreshRender()"/>
                    <link-button label="get columns" @click="columns = $refs.hideDemoTable.originalColumns"></link-button>
                </link-button-group>
                <link-button-group>
                    <link-button label="show name column" @click="hideNameCol = false"/>
                    <link-button label="hide name column" @click="hideNameCol = true"/>
                </link-button-group>
                <link-button-group>
                    <link-button label="add age column width" @click="ageColWidth += 10"/>
                    <link-button label="subtract age column width" @click="ageColWidth -= 10"/>
                </link-button-group>
                <link-button-group>
                    <link-button label="add name column order" @click="nameColumnOrder += 1"/>
                    <link-button label="subtract name column order" @click="nameColumnOrder -= 1"/>
                </link-button-group>
                <link-number v-model="checkNumber"/>
            </demo-row>
            <link-base-table :data="getData()" ref="hideDemoTable" :configColumnFunc="configColumnFunc" :beforeConfigColumnFunc="beforeConfigColumnFunc">
                <link-column-index/>
                <link-column field="id" title="编号"/>
                <link-column field="name" :title="`姓名(:hide=hideName,nameColumnOrder=${nameColumnOrder})`" :hide="hideNameCol" :order="nameColumnOrder"/>
                <link-column field="name2" title="姓名2(:hide=hideName,disabled-config)" :hide="hideNameCol" disabled-config/>
                <link-column field="age" :title="`年龄(width=${ageColWidth})`" :width.sync="ageColWidth"/>
            </link-base-table>
            <demo-row>
                <div v-for="(col,index) in columns" :key="index">
                    {{col}}
                </div>
            </demo-row>
        </demo-row>-->
    </div>
</template>

<script>
    export default {
        name: "demo-base-table-column",
        data() {
            return {
                hideNameCol: false,
                ageColWidth: 250,
                nameColumnOrder: 0,
                columns: [],
                checkNumber: 10,
            }
        },
        methods: {
            getData(num = 5) {
                const list = []
                const time = new Date().getTime()
                for (let i = 0; i < num; i++) {
                    list.push({
                        id: time + i,
                        name: '小明' + i,
                        name2: '小明' + i,
                        age: 20 + i,
                    })
                }
                list.push({
                    id: time + '' + time,
                    name: '小明',
                    name2: '小明',
                    age: 20,
                })
                return list
            },
            configColumnFunc(col, isGroup) {
                if (isGroup) return
                col.title = col.title + '<!!>'
                if (col.field === 'age' && this.checkNumber > 10) col.hide = true
            },
            beforeConfigColumnFunc(columns, colIterateFunc) {
                let id = ''
                colIterateFunc(columns, (col, isGroup) => {
                    !isGroup && (id = `${id}[${col.field}-${col.previousTitle}]`)
                })
                // console.log(id)
            },
        }
    }
</script>

<style lang="scss">

</style>