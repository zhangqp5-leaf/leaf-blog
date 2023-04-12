import React, {useState, useEffect, useRef} from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { Button, Input } from 'antd';
import {homeList} from '@/utils/constant';
import PlanModal from './planModal';

import styles from './index.module.less';

const RealHome = () => {

  const [mapAfter, setMapAfter] = useState(null);
  const [Map, setMap] = useState(null);
  const [visible, setVisible] = useState(false);

  /**
   * 初始化创建地图
   */
  const initMap = () => {
    AMapLoader.load({
      key: '88164ddab8a62e4951589a884a3c0c1d', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [''], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    }).then(AMap => {
      setMap(AMap);
      // 创建卫星图层
      // var satellite = new AMap.TileLayer.Satellite();
      // 创建路网图层
      // var roadNet = new AMap.TileLayer.RoadNet();
      // 创建路况图层
      const traffic = new AMap.TileLayer.Traffic({
        'autoRefresh': true,     //是否自动刷新，默认为false
        'interval': 180,         //刷新间隔，默认180s
      });
      const _mapAfter = new AMap.Map('parcelMap', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 13, // 初始化地图级别
        center: [120.644438, 31.421566], // 初始化地图中心点位置
        layers: [
          // satellite,
          // roadNet,
        ],
      });
      const _param = {
        _Map: AMap,
        _position: [120.644438, 31.421566],
        _map: _mapAfter,
        _content: '<div>苏州北站</div>',
        _icon: '//vdata.amap.com/icons/b18/1/2.png',
      }
      const marker = createMarker(_param);
      AMap.plugin(['AMap.AutoComplete','AMap.PlaceSearch'],function(){
        var autoOptions = {
          // 城市，默认全国 
          city: "苏州",
          // 使用联想输入的input的id
          input: "areaInput"
        }
        var autocomplete= new AMap.Autocomplete(autoOptions)
      
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "苏州市", // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          map: _mapAfter, // 展现结果的地图实例
          panel: "rightPanelContent", // 结果列表将在此容器中进行展示。
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        autocomplete.on('select', function(e){
          //TODO 针对选中的poi实现自己的功能
          placeSearch.search(e.poi.name)
        })
      })
      _mapAfter.add(marker);
      // _mapAfter.add(traffic);
      setMapAfter(_mapAfter);
    }).catch(e => {
      console.log(e);
    });
  };
  /**
   * 给地图添加点标记
   * @param {AMap, Array, Map, String} 地图对象 | 点经纬度 | 地图底图 | 窗体内容
   * @return marker
   */
  const createMarker = ({_Map=Map, _position, _map=mapAfter, _content, _icon=undefined}) => {
    const marker = new _Map.Marker({
      position: _position, //位置
      icon: _icon,
    });
    const infoWindow = new _Map.InfoWindow({ 
      // isCustom: true,  // 使用自定义窗体
      content: _content, // 信息窗体的内容可以是任意 html 片段
      offset: new _Map.Pixel(5, -45)
    });
    const onMarkerClick = function(e) {
      infoWindow.open(_map, e.target.getPosition()); // 打开信息窗体
      // e.target 就是被点击的 Marker
    }
    marker.on('click', onMarkerClick);
    return marker;
  };
  /**
   * 显示点击日期下看房的marker
   * @param {String} dayName 
   */
  const showHomeInfo = (dayName) => {
    const _dayHomeList = homeList.filter(i => i.date === dayName);
    const markerList = [];
    for (const homeInfo of _dayHomeList) {
      const _marker = createMarker({
        _position: homeInfo.position,
        _content: `<div>${homeInfo.name}</div>`,
      });
      markerList.push(_marker);
    }
    mapAfter.add(markerList);
  }
  const openPlanModal = () => {
    setVisible(!visible);
  }

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topPanel}>
        <Button onClick={() => openPlanModal()}>规划路线</Button>
      </div>
      <div className={styles.mapOperation}>
        {
          [...new Set(homeList.map(i => i.date))].map(dayName => <Button
            key={dayName}
            onClick={() => showHomeInfo(dayName)}
          >
            {dayName}
          </Button>)
        }
      </div>
      <div id='leftPanel' className={styles.leftPanel}></div>
      <div id='rightPanel' className={styles.rightPanel}>
        <Input id='areaInput' />
        <section id='rightPanelContent'></section>
      </div>
      <div id='parcelMap' className={styles.parcelMap}></div>
      {
        visible ? <PlanModal
          visible={visible}
          setVisible={setVisible}
        /> : ''
      }
    </div>
  );
};

export default RealHome;