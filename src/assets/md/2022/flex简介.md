### 1、实现水平垂直居中
```less
.container {
  // 使用绝对定位
  .first {
    position: relative;
    background-color: #1890ff;
    height: 300px;
    .child {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  // flex
  .second {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: violet;
    height: 300px;
  }
}
```

### 2、简述flex布局

flex布局即弹性盒子布局，在设置flex布局后，其子元素的`float`、`clear`和`vertical-align`属性将失效。

采用flex布局的元素，称为一个flex容器，它的所有子元素是容器成员。容器默认存在两个轴：水平轴`（主轴）`和垂直轴`（交叉轴）`，成员默认是沿水平轴也就是主轴排列的。

容器可以设置6个属性：

- flex-direction：主轴方向
- flex-wrap：容器内是否可以换行
- flex-flow：是`flex-direction`和`flex-wrap`的简写形式
- justify-content：元素在主轴的对齐方式
- align-items：元素在交叉轴的对齐方式
- align-content：多根轴线上的对齐方式

#### 1、flex-direction

```less
.container {
  display: flex;
  flex-direction: row; // 默认值，沿主轴从左到右排列
  flex-direction: row-reverse; // 沿主轴从右到左排列
  flex-direction: column; // 沿交叉轴从上到下排列
  flex-direction: column-reverse; // 沿交叉轴从下到上排列
}
```

#### 2、flex-wrap

```less
.container {
  display: flex;
  flex-wrap: nowrap; // 默认值，不换行，当主轴长度固定并且空间不足时，成员尺寸会自动调整
  flex-wrap: wrap; // 换行，第一行在上面
  flex-wrap: wrap-reverse; // 换行，第一行在下面
}
```

#### 3、flex-flow

```less
.container {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

#### 4、justify-content

```less
.container {
  display: flex;
  justify-content: flex-start; // 默认值，在主轴上左对齐
  justify-content: flex-end; // 在主轴上右对齐
  justify-content: center; // 在主轴上居中对齐
  justify-content: space-between; // 在主轴上两端对齐，元素之间间隔相等
  justify-content: space-around; // 每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍
}
```

#### 5、align-items

```less
.container {
  display: flex;
  align-items: flex-start; // 交叉轴的起点对齐
  align-items: flex-end; // 交叉轴的终点对齐
  align-items: center; // 交叉轴的中点对齐
  align-items: stretch; // 默认值，如果元素未设置高度或设为auto，将占满整个容器的高度。假设容器高度设置为 100px，而项目没有设置高度，则项目的高度也为 100px
  align-items: baseline; // 以元素的第一行文字的基线对齐
}
```

#### 6、align-content

当`flex-wrap`设置为`wrap`时，容器可能会有多根轴线。`align-content`设置交叉轴的样式，参数和`align-items`一样

成员也可以设置6个属性：

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

#### 1、order：定义成员的排列顺序。数值越小，排列越靠前，默认是0。

```less
.item {
  order: <integer>;
}
```

#### 2、flex-grow：定义成员的放大比例，默认是0，即如果存在剩余空间也不放大。

当容器中所有的项目都设置了flex-basis属性时，如果仍有是剩余的空间，设置的 `flex-grow` 属性才能生效。

#### 3、flex-shrink：定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。不能设置负值

#### 4、flex-basis：定义了在分配多余空间之前，成员占据的主轴空间，浏览器会根据这个属性来计算主轴是否有多余空间。默认值是auto，即项目的本来大小。

#### 5、flex：是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，后两个属性可选。默认值为：`flex:0 1 auto。`

关于flex的另一个常用用法：

左侧固定宽度，右侧弹性填充，可方便实现类似下图的布局：

```less
&__row {
  display: flex;
  align-items: flex-start;
  margin: 6px 0px;
  text-align: right;
  &__left {
    // flex: 0 0 100px;
    flex: 0 0 auto;
    color: rgba(0, 0, 0, 0.45);
  }
  &__right {
    flex: 1;
    color: rgba(0, 0, 0, 0.85);
  }
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1abd63526394baa943dd4ea49c03dce~tplv-k3u1fbpfcp-watermark.image?)
