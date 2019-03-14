## Button按钮

**Plain 的按钮功能比较单一，主要是提供快速设置按钮样式的功能**

---

:::demo-start

:::title-start
按钮的基本用法
:::title-end

:::desc-start
默认情况下，可以通过label属性设置按钮文本，可以通过插槽设置文本内容，当设置插槽时，label属性将不可用
:::desc-end

:::min-height-start
250
:::min-height-end

```html
<link-button label="简单按钮1"/>
<link-button>
    <span>简单按钮2</span>
    <link-icon icon="pl-search"/>
</link-button>
```
:::demo-end

**按钮支持多种颜色**

:::demo-start
:::title-start
按钮的颜色:color
:::title-end
```html
<link-button v-for="(item,index) in colors" :label="item" :box-color="item" :key="index"/>
```
```js
export default{
    data(){
        return{
            colors:['primary','success','warn','error','info']
        }
    },
    methods: {
        _click() {
            console.log("color");
        },
    }
}
```
```css
.demo-test-block {
}
```
:::demo-end


| 一个普通标题 | 一个普通标题 | 一个普通标题 |
| ------ | ------ | ------ |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |

