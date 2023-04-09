import React, {useState, useEffect} from 'react';
import * as olProj from 'ol/proj'

const RealHome = () => {

  const initMap = () => {

  }

  const baseTianDiTuLayerLayer = (type, projectionType, opacity, proj, name) => {
    const projection = olProj.get(proj)
    const projectionExtent = projection.getExtent()
    const size = getWidth(projectionExtent) / 256
    const resolutions = new Array(19)
    const matrixIds = new Array(19)
    for (let z = 1; z < 19; ++z) {
      resolutions[z] = size / Math.pow(2, z)
      matrixIds[z] = z
    }
    const BaseLayer = new TileLayer({
      opacity: opacity,
      zIndex: 0,
      minZoom: 0,
      maxZoom: 20,
      className: 'base',
      preload: Infinity,
      source: new WMTSource({
        urls:window.config.mapOutLayers.map(item=>`${item}/${type}_${projectionType}/wmts?tk=94a9ef43494c03ab32a38cba10671c05`),
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

  useEffect(() => {
    initMap();
  })

  return (
    <div>
      <div id='map'></div>
    </div>
  );
};

export default RealHome;