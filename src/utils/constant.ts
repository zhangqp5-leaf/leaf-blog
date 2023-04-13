import mdnImg from '@/assets/img/mdn.png';
import reactImg from '@/assets/svg/react.svg';
import vueImg from '@/assets/svg/vue.svg';
import flutterImg from '@/assets/img/flutter.png';
import typescriptImg from '@/assets/svg/typescript.svg';
import antDesignImg from '@/assets/svg/ant-design.svg';
import elementPlusImg from '@/assets/img/elementPlus.png';
import sassImg from '@/assets/svg/sass.svg';
import iconfontImg from '@/assets/img/iconfont.png';
import reactRouterImg from '@/assets/img/react-router.png';
import piniaImg from '@/assets/img/pinia.png';
import reduxImg from '@/assets/svg/redux.svg';
import githubImg from '@/assets/svg/github.svg';
import apifoxImg from '@/assets/img/apifox.png';
import golangImg from '@/assets/img/golang.png';
import giteeImg from '@/assets/svg/gitee.svg';
import jueJinImg from '@/assets/img/juejin.png';
import umiImg from '@/assets/img/umi.png';
import devDocsImg from '@/assets/svg/devdocs.svg';
import vercelImg from '@/assets/svg/vercel.svg';

import md1 from '@/assets/md/flex简介.md';
import md2 from '@/assets/md/react生命周期.md';
import md3 from '@/assets/md/节流和防抖.md';
import md4 from '@/assets/md/关于Git.md';

interface CodeNavData {
  [key: string]: CodeNavDataItem[],
};
interface CodeNavDataItem {
  imgUrl: String,
  title: String,
  des: String,
  url: String,
}
/** 编程导航数据源 */
export const codeNavData: CodeNavData = {
  frontEndCommon: [
    {
      imgUrl: mdnImg,
      title: 'mdn',
      des: 'Documenting web technologies, including CSS, HTML, and JavaScript, since 2005',
      url: 'https://developer.mozilla.org/zh-CN/',
    },
    {
      imgUrl: typescriptImg,
      title: 'TypeScript',
      des: 'JypeScript 的上位替代，进阶必学',
      url: 'https://www.typescriptlang.org/zh/',
    },
    {
      imgUrl: sassImg,
      title: 'Sass 中文网',
      des: '世界上最成熟、最稳定、最强大的专业级CSS扩展语言！',
      url: 'https://www.sass.hk/',
    },
    {
      imgUrl: iconfontImg,
      title: 'Iconfont 矢量图标库',
      des: '国内功能强大且图标丰富的矢量图标库，提供矢量图标下载、在线存储、格式转换等功能',
      url: 'https://www.iconfont.cn/',
    },
    {
      imgUrl: umiImg,
      title: 'umijs',
      des: '企业级前端开发框架',
      url: 'https://umijs.org/',
    },
  ],
  react: [
    {
      imgUrl: reactImg,
      title: 'React',
      des: '主流的用于构建用户界面的 JavaScript 库',
      url: 'https://react.docschina.org/',
    },
    {
      imgUrl: antDesignImg,
      title: 'Ant Design of React',
      des: 'Antd 是基于 Ant Design 设计体系的 React UI 组件库',
      url: 'https://ant.design/index-cn',
    },
    {
      imgUrl: antDesignImg,
      title: 'Ant Design Pro',
      des: '开箱即用的中台前端/设计解决方案',
      url: 'https://pro.ant.design/',
    },
    {
      imgUrl: reactRouterImg,
      title: 'React Router',
      des: 'React-router最新路由',
      url: 'https://reactrouter.com/',
    },
    {
      imgUrl: reduxImg,
      title: 'Redux',
      des: '优秀的状态管理工具',
      url: 'https://cn.redux.js.org/',
    },
    {
      imgUrl: reduxImg,
      title: 'React Redux',
      des: 'Official React bindings for Redux',
      url: 'https://react-redux.js.org/',
    },
    {
      imgUrl: reduxImg,
      title: 'Redux Toolkit',
      des: 'Redux 官方强烈推荐，开箱即用的一个高效的 Redux 开发工具集',
      url: 'https://redux-toolkit.js.org/',
    },
  ],
  vue: [
    {
      imgUrl: vueImg,
      title: 'Vue',
      des: '易学易用，性能出色，适用场景丰富的 Web 前端框架',
      url: 'https://cn.vuejs.org/',
    },
    {
      imgUrl: vueImg,
      title: 'Element UI',
      des: '为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库',
      url: 'https://element.eleme.cn',
    },
    {
      imgUrl: elementPlusImg,
      title: 'element Plus',
      des: '为开发者、设计师和产品经理准备的基于 Vue 3.0 的桌面端组件库',
      url: 'https://element-plus.org/zh-CN/',
    },
    {
      imgUrl: vueImg,
      title: 'Vue Router',
      des: 'Vue.js 官方的路由管理器',
      url: 'https://router.vuejs.org/zh/',
    },
    {
      imgUrl: piniaImg,
      title: 'pinia',
      des: 'Vue 的存储库，vuex的替代品',
      url: 'https://pinia.web3doc.top/',
    },
    {
      imgUrl: vueImg,
      title: 'Vuex',
      des: 'Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。',
      url: 'https://vuex.vuejs.org/zh/',
    },
  ],
  mobileDevelopment: [
    {
      imgUrl: flutterImg,
      title: 'Flutter',
      des: '谷歌的移动UI框架，可以快速在iOS和Android上构建高质量的原生用户界面',
      url: 'https://flutterchina.club/',
    },
  ],
  backend: [
    {
      imgUrl: golangImg,
      title: 'GO',
      des: 'GO API 文档',
      url: 'https://studygolang.com/pkgdoc',
    },
  ],
  test: [
    {
      imgUrl: apifoxImg,
      title: 'Apifox',
      des: '接口文档、调试、Mock、自动化测试，提升 10 倍效率！',
      url: 'https://www.apifox.cn/',
    },
  ],
  platform: [
    {
      imgUrl: githubImg,
      title: 'Github',
      des: '全球最大的软件项目托管平台，发现优质开源项目',
      url: 'https://github.com/',
    },
    {
      imgUrl: giteeImg,
      title: 'Gitee',
      des: '国内代码开源托管平台',
      url: 'https://gitee.com/',
    },
    {
      imgUrl: jueJinImg,
      title: '掘金',
      des: '开发者社区',
      url: 'https://juejin.cn/',
    },
    {
      imgUrl: vercelImg,
      title: 'vercel',
      des: '开箱即用的免费网站部署服务',
      url: 'https://vercel.com/dashboard',
    },
  ],
  tool: [
    {
      imgUrl: devDocsImg,
      title: 'DevDocs',
      des: '便捷查询api的工具',
      url: 'https://devdocs.io/',
    }
  ],
};
export const codeNavTypeMap: Map<String, String> = new Map([
  ['frontEndCommon', '前端通用'],
  ['react', 'react 框架'],
  ['vue', 'vue 框架'],
  ['mobileDevelopment', '移动端开发'],
  ['backend', '后端'],
  ['test', '测试'],
  ['platform', '平台'],
  ['tool', '工具'],
]);

/**blog数据源 */
interface BlogData {
  [key: string]: BlogDataItem[]
}
interface BlogDataItem {
  title: String,
  date: String,
  id: string,
}
export const blogData: BlogData = {
  'a2022': [
    {
      title: '关于 Git',
      date: '2022-06-07',
      id: '4',
    },
    {
      title: '节流和防抖',
      date: '2022-06-07',
      id: '3',
    },
    {
      title: 'flex简介',
      date: '2022-03-01',
      id: '1',
    },
  ],
  'a2021': [
    {
      title: 'react生命周期',
      date: '2021-09-24',
      id: '2',
    },
  ],
}
interface BlogMap {
  [key: string]: String,
}
export const blogMap: BlogMap = {
  '1': md1,
  '2': md2,
  '3': md3,
  '4': md4,
}

export const demoUrl = 'https://leaf-demos.vercel.app/';

export const demoList = [
  {
    title: '日历卡片翻动效果',
    content: 'content1',
    url: `${demoUrl}countdown`, 
  },
  {
    title: '拖拽排序',
    content: 'content1',
    url: `${demoUrl}dragDrop`, 
  },
];

export const homeList = [
  {
    name: '嘉致峰',
    date: '2023-04-08',
    position: [120.646743, 31.415401],
  },
  {
    name: '花语-熙园',
    date: '2023-04-08',
    position: [120.691679, 31.42529],
  },
  {
    name: '紫郡兰园',
    date: '2023-04-08',
    position: [120.627068, 31.402178],
  },
  {
    name: '雅樾澜庭',
    date: '2023-04-08',
    position: [120.617621, 31.452998],
  },
  {
    name: '天境上辰',
    date: '2023-04-08',
    position: [120.661965, 31.395077],
  },
  {
    name: '保利栖月雅园',
    date: '2023-04-09',
    position: [120.59385, 31.397933],
  },
  {
    name: '江月时光',
    date: '2023-04-09',
    position: [120.557061, 31.258005],
  },
  {
    name: '境雅四季',
    date: '2023-04-09',
    position: [120.544489, 31.263214],
  },
];

export const destinationList = [
  {
    name: '苏州中心',
    position: [120.677614, 31.318664],
  },
  {
    name: '三星电子',
    position: [120.776951, 31.329649],
  },
];