## Button按钮

> Plain 的按钮功能比较单一，主要是提供快速设置按钮样式的功能

:::demo-start

:::title-start
按钮的基本用法
:::title-end

:::desc-start
默认情况下，按钮只需要一个文本，指定label属性即可
::::desc-end

```html
<link-button label="primary"/>
<link-button label="success"/>
<link-button label="warn"/>
```
```js
export default{
    methods: {
        _click() {
            console.log("click");
        },
    }
}
```
```css
.demo-button {
}
```
:::demo-end

> 按钮支持多种颜色

:::demo-start
### 颜色
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

