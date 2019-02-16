<template>
    <div class="demo-tree">
        <link-button-group>
            <link-button @click="openSpecific">打开特定节点</link-button>
            <link-button @click="closeSpecific">关闭特定节点</link-button>
            <link-button @click="checkSpecific">选中特定节点</link-button>
            <link-button @click="uncheckSpecific">取消选中特定节点</link-button>
            <link-button @click="getCheckData">获取选中的节点（默认：格式化为一维数组结构数据）</link-button>
            <link-button @click="getCheckDataToTree">获取选中的节点（格式化为树形结构数据）</link-button>
        </link-button-group>
        <div class="demo-tree-wrapper">
            <link-tree :data="cities"
                       label-key="name"
                       children-key="children"
                       @open="val=>$message.show('open:'+val.name)"
                       @close="val=>$message.show('close:'+val.name)"
                       :auto-close="false"
                       :toggleOnClickContent="true"
                       checkbox
                       check-key="_check"
                       ref="tree">
                <template slot-scope="{data}">
                    hello, {{data.name}}
                </template>
            </link-tree>
        </div>
    </div>
</template>

<script>
    export default {
        name: "demo-tree",
        data() {
            return {
                cities: [
                    {
                        name: '广东省', children: [
                            {
                                name: '广州市', children: [
                                    {name: '番禺区',},
                                    {name: '天河区',},
                                    {name: '越秀区',},
                                ]
                            },
                            {name: '深圳市'},
                            {name: '佛山市'},
                        ]
                    },
                    {
                        name: '广西省', children: [
                            {
                                name: '南宁市', children: [
                                    {name: '兴宁区',},
                                    {name: '青秀区',},
                                    {name: '江南区',},
                                ]
                            },
                            {name: '柳州市'},
                            {name: '桂林市'},
                        ]
                    },
                ]
            }
        },
        methods: {
            async openSpecific() {
                this.$refs.tree.open(this.cities[0].children[0].children[2])
            },
            async closeSpecific() {
                this.$refs.tree.close(this.cities[0].children[0].children[2])
            },
            checkSpecific() {
                this.$refs.tree.check(this.cities[0].children[0].children[2])
            },
            uncheckSpecific() {
                this.$refs.tree.uncheck(this.cities[0])
            },
            getCheckData() {
                const result = this.$refs.tree.getCheckData()
                console.log(result)
            },
            getCheckDataToTree() {
                const result = this.$refs.tree.getCheckData(false)
                console.log(result)
            },
        }
    }
</script>

<style lang="scss">
    .demo-tree {
        .demo-tree-wrapper {
            height: 500px;
            width: 300px;
            background-color: #f2f2f2;
        }
    }
</style>