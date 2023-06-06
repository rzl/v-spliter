## v-spliter 一个基于VUE指令让相邻的两个元素可以拖动改变大小的工具

## 支持Vue2,Vue3,和普通的html开发

## [demo示例](https://rzl.github.io/v-spliter/)
### 使用方式很简单 

### ems引入
#### 1.安装
```bash
npm install 'v-spliter' -S

```
#### 2引入使用
vue3使用
```javascript
import  vSpliter from 'v-spliter'


import { createApp, h } from 'vue'
const app = createApp(App)   
app.use(vSpliter)
app.mount('#app')


```


### vue3 umd引入使用示例
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src='../lib/v-spliter.umd.js'></script>

</head>

<body>

    <div id="app">
        <div style="background: greenyellow; height: 200px;">

        </div>
        <div v-spliter style="height: 20px;">

        </div>
        <div style="background: burlywood; height: calc(100% - 220px); display: flex;">
            <div style="background: yellowgreen; height: 100%; width: 200px;"></div>
            <div v-spliter style="width: 20px; "></div>
            <div></div>
        </div>
    </div>

    <script>
        const { createApp } = Vue

        var app = createApp({
            data() {
                return {
                    message: 'Hello Vue!'
                }
            }
        }).use(VUE_V_SPLITER).mount('#app')
    </script>
</body>

<style>
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
    }
</style>

</html>
```


### vue2 umd引入使用示例
```HTML
<!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src="https://unpkg.com/vue@2.7.14/dist/vue.min.js"></script>
    <script src='../lib/v-spliter.umd.js'></script>

</head>

<body>

    <div id="app">
        <div style="background: greenyellow; height: 200px;">

        </div>
        <div v-spliter style="height: 20px;">

        </div>
        <div style="background: burlywood; height: calc(100% - 220px); display: flex;">
            <div style="background: yellowgreen; height: 100%; width: 200px;"></div>
            <div v-spliter style="width: 20px; "></div>
            <div></div>
        </div>
    </div>

    <script>
        Vue.use(VUE_V_SPLITER)
        var app = new Vue({
            
            data() {
                return {
                    message: 'Hello Vue!'
                }
            }
        }).$mount('#app')
    </script>
</body>

<style>
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
    }
</style>

</html>
```

### 普通的html使用
```html
    <!DOCTYPE html>
<html>

<head>
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Page Title</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <script src='../lib/v-spliter.umd.js'></script>

</head>

<body>

    <div id="app">
        <div style="background: greenyellow; height: 200px;">

        </div>
        <div class="v-spliter" style="height: 20px;">

        </div>
        <div style="background: burlywood; height: calc(100% - 220px); display: flex;">
            <div style="background: yellowgreen; height: 100%; width: 200px;"></div>
            <div class="v-spliter" style="width: 20px; "></div>
            <div></div>
        </div>
    </div>

    <script>
        [...document.querySelectorAll('.v-spliter')].forEach((el) => {
            VUE_V_SPLITER.directive(el, {
                value: {

                }
            })
        })
    </script>
</body>

<style>
    html,
    body,
    #app {
        width: 100%;
        height: 100%;
        padding: 0px;
        margin: 0px;
    }
</style>

</html>
```