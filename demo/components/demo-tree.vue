<template>
    <div class="demo-tree">
        <div class="demo-tree-wrapper">
            <link-tree :data="cities"
                       label-key="name"
                       children-key="children"
                       @open="val=>$message.show('open:'+val.name)"
                       @close="val=>$message.show('close:'+val.name)"
                       :auto-close="false"
                       :toggleOnClickContent="true"/>
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