### 基本用法
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
---
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

