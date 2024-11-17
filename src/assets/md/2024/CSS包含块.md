## CSS包含块

包含块英语全称为**containing block**，在 CSS 规范中的解释如下：

*https://drafts.csswg.org/css2/#containing-block-details*

![image-20220814222458695](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-142459.png)

包含块的意义，简单来说，**就是元素的尺寸和位置，会受它的包含块所影响。对于一些属性，例如 width, height, padding, margin，绝对定位元素的偏移值（比如 position 被设置为 absolute 或 fixed），当我们对其赋予百分比值时，这些值的计算值，就是通过元素的包含块计算得来。**

### 1、一个简单的例子

```html
<body>
  <div class="container">
    <div class="item"></div>
  </div>
</body>
```

```css
.container{
  width: 500px;
  height: 300px;
  background-color: skyblue;
}
.item{
  width: 50%;
  height: 50%;
  background-color: red;
}
```

容易得出：div.item 盒子的 width 为 250px，height 为 150px。

![image-20220814223451349](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-143451.png)

原因是：**div.item 的宽高是根据它的包含块来计算的**，而这里包含块的大小，正是这个元素最近的祖先块元素的内容区。

包含块分为两种，一种是根元素（HTML 元素）所在的包含块，被称之为初始包含块（**initial containing block**）。对于浏览器而言，初始包含块的的大小等于视口 viewport 的大小，基点在画布的原点（视口左上角）。它是作为元素绝对定位和固定定位的参照物。

另外一种是对于非根元素，对于非根元素的包含块判定就有几种不同的情况了。大致可以分为如下几种：

- 如果元素的 positiion 是 relative 或 static ，那么包含块由离它最近的块容器（block container）的内容区域（content area）的边缘建立。
- 如果 position 属性是 fixed，那么包含块由视口建立。
- 如果元素使用了 absolute 定位，则包含块由它的最近的 position 的值不是 static （也就是值为fixed、absolute、relative 或 sticky）的祖先元素的内边距区的边缘组成。

**对于第三条，用一个例子来说明**

```html
<body>
    <div class="container">
      <div class="item">
        <div class="item2"></div>
      </div>
    </div>
  </body>
```

```css
.container {
  width: 500px;
  height: 300px;
  background-color: skyblue;
  position: relative;
}
.item {
  width: 300px;
  height: 150px;
  border: 5px solid;
  margin-left: 100px;
}
.item2 {
  width: 100px;
  height: 100px;
  background-color: red;
  position: absolute;
  left: 10px;
  top: 10px;
}
```

根据上面的第三条规则，对于 div.item2 来讲，它的包含块应该是 div.container，而非 div.item。

![image-20220814233548188](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-153548.png)

实际上对于非根元素来讲，包含块还有一种可能，那就是如果 position 属性是 absolute 或 fixed，包含块也可能是由满足以下条件的最近父级元素的内边距区的边缘组成的：

- transform 或 perspective 的值不是 none
- will-change 的值是 transform 或 perspective 
- filter 的值不是 none 或 will-change 的值是 filter(只在 Firefox 下生效). 
- contain 的值是 paint (例如: contain: paint;)

来看一个示例：

```html
<body>
  <div class="container">
    <div class="item">
      <div class="item2"></div>
    </div>
  </div>
</body>
```

```css
.container {
  width: 500px;
  height: 300px;
  background-color: skyblue;
  position: relative;
}
.item {
  width: 300px;
  height: 150px;
  border: 5px solid;
  margin-left: 100px;
  transform: rotate(0deg); /* 新增代码 */
}
.item2 {
  width: 100px;
  height: 100px;
  background-color: red;
  position: absolute;
  left: 10px;
  top: 10px;
}
```

对于上面的代码只新增了一条声明 transform: rotate(0deg)，此时的渲染效果却发生了改变：

![image-20220814234347149](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2022-08-14-154347.png)

此时对于 div.item2 来讲，包含块就变成了 div.item。

### 3、CSS 规范中的例子

```html
<html>
  <head>
    <title>Illustration of containing blocks</title>
  </head>
  <body id="body">
    <div id="div1">
      <p id="p1">This is text in the first paragraph...</p>
      <p id="p2">
        This is text
        <em id="em1">
          in the
          <strong id="strong1">second</strong>
          paragraph.
        </em>
      </p>
    </div>
  </body>
</html>
```

上面是一段简单的 HTML 代码，在没有添加任何 CSS 代码的情况下，你能说出各自的包含块么？

对应的结果如下：

| 元素      | 包含块                         |
| ------- | --------------------------- |
| html    | initial C.B. (UA-dependent) |
| body    | html                        |
| div1    | body                        |
| p1      | div1                        |
| p2      | div1                        |
| em1     | p2                          |
| strong1 | p2                          |

首先 HTML 作为根元素，对应的包含块就是前面我们所说的初始包含块，而对于 body 而言，这是一个 static 定位的元素，因此该元素的包含块参照第一条为 html，以此类推 div1、p1、p2 以及 em1 的包含块也都是它们的父元素。

strong1包含块是 p2，是因为包含块是**离它最近的块容器**的内容区域，所以是 p2。

接下来添加如下的 CSS：

```css
#div1 { 
  position: absolute; 
  left: 50px; top: 50px 
}
```

结果如下：

| 元素      | 包含块                         |
| ------- | --------------------------- |
| html    | initial C.B. (UA-dependent) |
| body    | html                        |
| div1    | initial C.B. (UA-dependent) |
| p1      | div1                        |
| p2      | div1                        |
| em1     | p2                          |
| strong1 | p2                          |

继续修改我们的 CSS：

```css
#div1 { 
  position: absolute; 
  left: 50px; 
  top: 50px 
}
#em1  { 
  position: absolute; 
  left: 100px; 
  top: 100px 
}
```

结果如下：

| 元素      | 包含块                                  |
| ------- | ------------------------------------ |
| html    | initial C.B. (UA-dependent)          |
| body    | html                                 |
| div1    | initial C.B. (UA-dependent)          |
| p1      | div1                                 |
| p2      | div1                                 |
| em1     | div1（因为定位了，参阅非根元素包含块确定规则的第三条）        |
| strong1 | em1（因为 em1 变为了块容器，参阅非根元素包含块确定规则的第一条） |

更多例子移步到：*https://developer.mozilla.org/zh-CN/docs/Web/CSS/Containing_block*
