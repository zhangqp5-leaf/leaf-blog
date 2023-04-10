import React, {useState, useEffect, useRef} from 'react';
import { Map, View } from 'ol';
import * as olProj from 'ol/proj'
import { getWidth, getTopLeft } from 'ol/extent';
import { Tile as TileLayer } from 'ol/layer';
import { WMTS as WMTSource } from 'ol/source';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {mapOutLayers} from '@/utils/constant';

import styles from './index.module.less';

const RealHome = () => {

  const [mapAfter, setMapAfter] = useState(null);

  const initMap = () => {
    console.log(1);
    const mapLayer = baseTianDiTuLayerLayer('img', 'w', 1, 'EPSG:3857', 'satellite1');
    const ciaLayer = baseTianDiTuLayerLayer('cia', 'w', 1, 'EPSG:3857', 'satellite1');
    const _mapAfter = new Map({
      target: 'parcelMap',
      layers: [mapLayer, ciaLayer],
      view: new View({
        projection: 'EPSG:3857',
        center: olProj.transform([120.643127, 31.421701], 'EPSG:4326', 'EPSG:3857'),
        zoom: 15,
        minZoom: 1,
        maxZoom: 19,
      }),
    });
    setMapAfter(_mapAfter);
  }

  const baseTianDiTuLayerLayer = (type, projectionType, opacity, proj, name) => {
    const projection = olProj.get(proj)
    const projectionExtent = projection.getExtent()
    const size = getWidth(projectionExtent) / 256
    const resolutions = [];
    const matrixIds = [];
    for (let z = 1; z < 19; ++z) {
      resolutions.push(size / Math.pow(2, z));
      matrixIds.push(z);
    }
    const BaseLayer = new TileLayer({
      opacity: opacity,
      zIndex: 0,
      minZoom: 0,
      maxZoom: 20,
      className: 'base',
      preload: Infinity,
      source: new WMTSource({
        urls: mapOutLayers.map(item=>`${item}/${type}_${projectionType}/wmts?tk=e9a89afd712077204895c1afaff9de46`),
        layer: type,
        matrixSet: projectionType,
        format: 'tiles',
        projection: projection,
        tileGrid: new WMTSTileGrid({
          origin: getTopLeft(projectionExtent),
          resolutions: resolutions,
          matrixIds: matrixIds
        }),
        style: 'default',
        wrapX: true
      })
    })
    BaseLayer.set('baseMap', name)
    return BaseLayer
  }

  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      initMap();
      mapRef.current = true;
    }
  }, []);

  return (
    <div className={styles.container}>
      <div id='parcelMap' className={styles.parcelMap}></div>
    </div>
  );
};

export default RealHome;