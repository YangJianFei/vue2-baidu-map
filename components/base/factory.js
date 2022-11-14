/**
 * Author: yang jian fei
 * Email: 1294485765@qq.com
 * Created Date: Friday, November 4th 2022, 2:57:01 pm
 * Modified By: yang jian fei
 * Desc: desc
 * Copyright (c) 2022 黑发
 */



import { deleteEmptyKey } from './util.js'

export function createPoint(BMap, options = {}) {
  const { lng, lat } = options
  return new BMap.Point(lng, lat)
}

export function createPixel(BMap, options = {}) {
  const { x, y } = options
  return new BMap.Pixel(x, y)
}

export function createBounds(BMap, options = {}) {
  const { sw, ne } = options
  return new BMap.Bounds(createPoint(BMap, sw), createPoint(BMap, ne))
}

export function createSize(BMap, options = {}) {
  const { width, height } = options
  return new BMap.Size(width, height)
}

export function createIcon(BMap, options = {}) {
  const { url, size, opts = {} } = options
  let iconOption = {
    anchor: opts.anchor && createSize(BMap, opts.anchor),
    imageSize: opts.imageSize && createSize(BMap, opts.imageSize),
    imageOffset: opts.imageOffset && createSize(BMap, opts.imageOffset),
    infoWindowAnchor: opts.infoWindowAnchor && createSize(BMap, opts.infoWindowAnchor),
    printImageUrl: opts.printImageUrl
  };
  deleteEmptyKey(iconOption);
  return new BMap.Icon(url, createSize(BMap, size), iconOption)
}

export function createLabel(BMap, options = {}) {
  const { content, opts } = options
  let labelOption = {
    offset: opts.offset && createSize(BMap, opts.offset),
    position: opts.position && createPoint(BMap, opts.position),
    enableMassClear: opts.enableMassClear
  };
  deleteEmptyKey(labelOption);
  return new BMap.Label(content, labelOption)
}

export function createSymbol(BMap, options = {}) {
  const { path, opts } = options
  let symbolOption = {
    anchor: opts.anchor && createSize(BMap, opts.anchor),
    fillColor: opts.fillColor,
    fillOpacity: opts.fillOpacity,
    scale: opts.scale,
    rotation: opts.rotation,
    strokeColor: opts.strokeColor,
    strokeOpacity: opts.strokeOpacity,
    strokeWeight: opts.strokeWeight
  };
  deleteEmptyKey(symbolOption);
  return new BMap.Symbol(window[path] || path, symbolOption)
}

export function createIconSequence(BMap, options = {}) {
  const { symbol, offset, repeat, fixedRotation } = options
  return new BMap.IconSequence(
    symbol && createSymbol(BMap, symbol),
    offset,
    repeat,
    fixedRotation
  )
}
