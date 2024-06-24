本片内容主要是总结回顾四月初个人进行的一次团队项目 `Ant Design` V3-V4 的升级过程，以及遇到的一些问题，以期给面对该问题的开发者一些帮助。

### 为什么要升级

- 团队原本的项目使用的是较低版本的 `antd 3.x` ，对于一些更复杂的业务需求不能很好的满足，从开发成本上考虑，升级 `antd 4` 可以更好的缩短开发时间（同时可以引入 `ProTable` 以及 `ProForm` 等），并且体验上会有改善

- 新版本的 `antd` 的 form 组件不论在使用体验上还是复杂度上，都有了很大的改善

- V4版本开始使用`React Hooks`来重写部分组件，这与项目目前的代码风格趋势一致

### 升级前准备

- 首先我在公司负责的项目里，只有订单（oms）和仓配（wms）的项目引入了 antd 3.x ，属于相对较老的项目

- 对项目做一个总体上的概览，`oms` ：antd: `3.10.0`，react: `16.4.1`，共 83 个路由；`wms` ：antd: `3.18.0`，react:`16.6.0`，共 63 个路由

- 相比较之下，oms 比 wms 的页面更多，需求迭代速度也更快，属于核心项目，对稳定性要求也更高，因此选择了先升级 wms 的 antd，方案稳定后再进行 oms 的升级

### 开始升级

**本次升级主要参考：[官方文档](https://ant.design/docs/react/migration-v4-cn)**

1、先升级到 3.x 的最新版本，按照控制台 warning 信息移除/修改相关的 API。

2、官方建议 react 版本需要升级到 `16.12.0` 及以上，但考虑到 antd 仍能够支持 `16.9.0`，为了稳定性及工作量考虑，react 暂时只升级到 `16.9.0`

**下面开始升级 antd**

我们主要使用的是官方提供的工具 codemod cli 工具 [@ant-design/codemod-v4](https://github.com/ant-design/codemod-v4) 来帮助我们升级

```bash
# 通过 npx 直接运行 
npx -p @ant-design/codemod-v4 antd4-codemod src 
# 或者全局安装 
# 使用 
npm npm i -g @ant-design/codemod-v4 
# 或者使用 
yarn yarn global add @ant-design/codemod-v4 
# 运行 
antd4-codemod src

# 使用完该工具后，需要安装@ant-design/compatible来兼容废弃的组件
yarn add @ant-design/compatible
```

对于无法自动修改的部分，`codemod` 会在命令行进行提示，建议按提示手动修改。修改后可以反复运行上述命令进行检查。

该工具只能帮我们 `Icon` 和 `Form` 等大部分改动，还有很多改动需要我们手动去改。

1、样式变化，在使用 antd 组件时，为满足需求，或多或少的使用 `:global()` 对样式进行了重写，在升级后要检查下这部分重写的样式有没有崩，需要再次重写一遍样式或者去掉重写，和 antd 的默认样式保持一致，有利于后续的维护

2、在升级后检查代码的过程中，发现了项目中有引入不规范的情况，比如 `import FormItem from 'antd/lib/form/FormItem'` ，按这种方式引入的 FormItem，工具不会自动修改，需要手动修改为 `import FormItem from '@ant-design/compatible/lib/form/FormItem'`

3、另一种书写不规范的情况，在 `antd 3` 里 `Row` 下可以不加 `Col`，也可以视作一整行，但是 `antd 4` 不能这样使用；需要手动挑选出这类使用不规范的情况来修改

4、对于 `Tree` `Select` `TreeSelect` `AutoComplete` 等组件的变化

- `onBlur` 时不再修改选中值，且返回 React 原生的 event 对象。如果你在使用兼容包的 Form 且配置了 `validateTrigger` 为 `onBlur`，请改至 `onChange` 以做兼容。

- `AutoComplete` 不再支持 `optionLabelProp`，请直接设置 Option value 属性。

- `AutoComplete` 选项与 `Select` 对齐，请使用 `options` 代替 `dataSource`

- `Select` 移除 `dropdownMenuStyle` 属性。

- 如果你需要设置弹窗高度请使用 `listHeight` 来代替 `dropdownStyle` 的高度样式。（`TreeSelect`使用`dropdownStyle`一般是为了设置下拉菜单高度，此属性没有移除可不修改）

- `filterOption` 第二个参数直接返回原数据，不在需要通过 `option.props.children` 来进行匹配。（4.x版本可以直接使用option.children来过滤，实测option.props仍保留，可不修改）

- `Tree`、`TreeSelect` 同时指定 title 和 label 的时候，会选择显示 label。

- `Tree` 传入内容采用 `treeData` 属性，来代替 `TreeNode` 方式，`TreeNode` 依然可用，但是会在控制台抛出警告。

- `Input`、`Select` 的 value 为 undefined 时改为非受控状态。

5、`Table` 重写，在没有 columns 时仍然会保留一列。嵌套 dataIndex 支持从 'xxx.yyy' 改成 ['xxx', 'yyy']。

6、 `Pagination` 组件：`onShowSizeChange`和`onChange`同时存在，去掉`onShowSizeChange`方法，使用`onChange`

7、项目中对 `Table` 的不规范的写法，没有指定 `rowKey`，导致升级后 `checkbox` 选项混乱，最好找到表格数据的键值，设定 `rowKey={record => record.id}`


