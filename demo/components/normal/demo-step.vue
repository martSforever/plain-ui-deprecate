<template>
    <div class="demo-step">
        <demo-row>
            <link-button-group>
                <link-button :label="index" box-type="line"/>
                <link-button @click="index = index==null?0:index+1" label="add"/>
                <link-button @click="index = index==null?0:index-1" label="subtract"/>
            </link-button-group>
        </demo-row>
        <demo-row title="基本用法">
            <link-step :data="steps0" :value="index"/>
        </demo-row>
        <demo-row title="设置激活图标与未激活图标">
            <link-step :data="steps0" :value="index" active-icon="pad-star" inactive-icon="pad-star"/>
        </demo-row>
        <demo-row title="单独设置激活图标与未激活图标">
            <link-step :data="steps1" :value="index"/>
        </demo-row>
        <demo-row title="设置激活颜色与未激活颜色">
            <link-step :data="steps1" :value="index" active-color="#1076ca" inactive-color="#FF4702"/>
        </demo-row>
        <demo-row title="纵向步骤条">
            <link-step :data="verticalSteps" :value="index" vertical :size="50">
                <template slot-scope="{item,index}">
                    <div class="demo-step-item">
                        <div class="demo-step-item-date">{{item.date}}</div>
                        <div class="demo-step-item-time">{{item.time}}</div>
                        <div class="demo-step-item-message">{{item.message}}</div>
                    </div>
                </template>
            </link-step>
        </demo-row>
    </div>
</template>

<script>
    export default {
        name: "demo-step",
        data() {
            return {
                index: 0,
                steps0: [
                    {title: '买家下单'},
                    {title: '买家发货'},
                    {title: '确认收货'},
                    {title: '订单结束'},
                ],
                steps1: [
                    {
                        title: '买家下单',
                        activeIcon: 'pad-heart-fill',
                        inactiveIcon: 'pad-heart',
                    },
                    {
                        title: '买家发货',
                        activeIcon: 'pad-wechat-fill',
                        inactiveIcon: 'pad-alipay-circle-fill',
                    },
                    {
                        title: '确认收货',
                        activeIcon: 'pad-apple-fill',
                        inactiveIcon: 'pad-android-fill',
                    },
                    {
                        title: '订单结束',
                        activeIcon: 'pad-Gitlab-fill',
                        inactiveIcon: 'pad-github-fill',
                    },
                ],
                verticalSteps: [
                    {message: '您的订单已由本人签收（已在配送员处采用无纸化方式签收本订单）。感谢您在京东购物，欢迎再次光临。参加评价还能赢取京豆哟。', time: '18:52:03', date: '2018-11-25/周日',},
                    {message: '我是您的专属配送员李新球，您的订单已到达上海夏阳营业部，配送小哥会尽快为您配送，请您留意，如需要更改配送时间或者未如期到达，均可给我打电话15316580551，很高兴为您服务！', time: '17:09:50', date: '',},
                    {message: '您的订单已到达【上海夏阳营业部】', time: '15:17:49', date: '',},
                    {message: '您的订单在京东【昆山千灯亚一分拣中心】发货完成，准备送往京东【上海夏阳营业部】', time: '07:46:23', date: '',},
                    {message: '您的订单在京东【昆山千灯亚一分拣中心】分拣完成', time: '07:46:18', date: '',},
                    {message: '打包成功', time: '07:39:48', date: '',},
                    {message: '扫描员已经扫描', time: '07:39:48', date: '',},
                    {message: '您的订单已经拣货完成', time: '07:18:34', date: '',},
                    {message: '您的订单已经打印完毕', time: '07:07:27', date: '',},
                    {message: '您的订单预计11月25日送达您手中', time: '00:14:54', date: '',},
                    {message: '您的订单已经进入京东上海130号库准备出库', time: '00:14:53', date: '',},
                    {message: '订单预计2018-11-25 00:10开始处理，请您耐心等待', time: '23:58:41', date: '2018-11-24/周六',},
                    {message: '您提交了订单，请等待系统确认', time: '23:58:06', date: '',},
                ]
            }
        },
    }
</script>

<style lang="scss">
    .demo-step {
        .demo-step-item {
            display: flex;
            flex-direction: row;

            .demo-step-item-date {
                width: 120px;
            }
            .demo-step-item-time {
                width: 80px;
            }
            .demo-step-item-message {
                flex: 1;
            }
        }
    }
</style>