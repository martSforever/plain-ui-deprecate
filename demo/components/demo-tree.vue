<template>
    <div class="demo-tree">
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
                       ref="tree"/>
        </div>
        <div>
            <link-button @click="openSpecific">open specific</link-button>
            <link-button @click="closeSpecific">close specific</link-button>
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