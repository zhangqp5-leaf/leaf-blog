import React, {useState, useEffect, useRef} from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import { Button } from 'antd';
import {homeList} from '@/utils/constant';

import styles from './index.module.less';

const RealHome = () => {

  const [mapAfter, setMapAfter] = useState(null);
  const [Map, setMap] = useState(null);

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
      var satellite = new AMap.TileLayer.Satellite();
      // 创建路网图层
      var roadNet = new AMap.TileLayer.RoadNet();
      const _mapAfter = new AMap.Map('parcelMap', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 13, // 初始化地图级别
        center: [120.644438, 31.421566], // 初始化地图中心点位置
        // layers: [
        //   satellite,
        //   roadNet,
        // ],
      });
      const _param = {
        _Map: AMap,
        _position: [120.644438, 31.421566],
        _map: _mapAfter,
        _content: '<div>苏州北站</div>',
      }
      addMarker(_param);
      setMapAfter(_mapAfter);
    }).catch(e => {
      console.log(e);
    });
  };
  /**
   * 给地图添加点标记
   * @param {AMap, Array, Map, String} 地图对象 | 点经纬度 | 地图底图 | 窗体内容
   */
  const addMarker = ({_Map=Map, _position, _map=mapAfter, _content}) => {
    const marker = new _Map.Marker({
      position: _position, //位置
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
    _map.add(marker);
    setMapAfter(_map);
  };
  /**
   * 显示点击日期下看房的marker
   * @param {String} dayName 
   */
  const showHomeInfo = (dayName) => {
    const _dayHomeList = homeList.filter(i => i.date === dayName);
    for (const homeInfo of _dayHomeList) {
      addMarker({
        _position: homeInfo.position,
        _content: `<div>${homeInfo.name}</div>`,
      });
    }
  }

  useEffect(() => {
    initMap();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        {
          [...new Set(homeList.map(i => i.date))].map(dayName => <Button
            key={dayName}
            onClick={() => showHomeInfo(dayName)}
          >
            {dayName}
          </Button>)
        }
      </div>
      <div id='parcelMap' className={styles.parcelMap}></div>
    </div>
  );
};

export default RealHome;