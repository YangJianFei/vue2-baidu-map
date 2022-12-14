<template>
  <div>
    <div v-if="!hasBmView" ref="view" style="width: 100%; height: 100%">
    </div>
    <slot></slot>
  </div>
</template>

<script>
import bindEvents from '../base/bindEvent.js'
import { checkType, getConfig, setConfig } from '../base/util.js'
import getMapMethod from '../base/methodMap.js';

export default {
  name: 'bm-map',
  props: {
    ak: {
      type: String
    },
    center: {
      type: [Object, String]
    },
    zoom: {
      type: Number
    },
    minZoom: {
      type: Number
    },
    maxZoom: {
      type: Number
    },
    highResolution: {
      type: Boolean,
      default: true
    },
    mapClick: {
      type: Boolean,
      default: true
    },
    mapType: {
      type: String
    },
    dragging: {
      type: Boolean,
      default: true
    },
    scrollWheelZoom: {
      type: Boolean,
      default: false
    },
    doubleClickZoom: {
      type: Boolean,
      default: true
    },
    keyboard: {
      type: Boolean,
      default: true
    },
    inertialDragging: {
      type: Boolean,
      default: true
    },
    continuousZoom: {
      type: Boolean,
      default: true
    },
    pinchToZoom: {
      type: Boolean,
      default: true
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    theme: {
      type: Array
    },
    mapStyle: {
      type: Object
    },
    hasAnimation: {
      type: Boolean,
      default: true
    },
    defaultAnimation: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    center(val, oldVal) {
      const { map, zoom } = this
      if (checkType(val) === 'String' && val !== oldVal) {
        this.setCenterZoom(map, val, zoom);
      }
    },
    'center.lng'(val, oldVal) {
      const { BMap, map, zoom, center } = this
      if (val !== oldVal && val >= -180 && val <= 180) {
        this.setCenterZoom(map, new BMap.Point(val, center.lat), zoom);
      }
    },
    'center.lat'(val, oldVal) {
      const { BMap, map, zoom, center } = this
      if (val !== oldVal && val >= -74 && val <= 74) {
        this.setCenterZoom(map, new BMap.Point(center.lng, val), zoom);
      }
    },
    zoom(val, oldVal) {
      const { map } = this
      if (val !== oldVal && val >= 3 && val <= 19) {
        map.setZoom(val)
      }
    },
    minZoom(val) {
      const { map } = this
      map.setMinZoom(val)
    },
    maxZoom(val) {
      const { map } = this
      map.setMaxZoom(val)
    },
    highResolution() {
      this.reset()
    },
    mapClick() {
      this.reset()
    },
    mapType(val) {
      const { map } = this
      map.setMapType(global[val])
    },
    dragging(val) {
      const { map } = this
      val ? map.enableDragging() : map.disableDragging()
    },
    scrollWheelZoom(val) {
      const { map } = this
      val ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
    },
    doubleClickZoom(val) {
      const { map } = this
      val ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
    },
    keyboard(val) {
      const { map } = this
      val ? map.enableKeyboard() : map.disableKeyboard()
    },
    inertialDragging(val) {
      const { map } = this
      val ? map.enableInertialDragging() : map.disableInertialDragging()
    },
    continuousZoom(val) {
      const { map } = this
      val ? map.enableContinuousZoom() : map.disableContinuousZoom()
    },
    pinchToZoom(val) {
      const { map } = this
      val ? map.enablePinchToZoom() : map.disablePinchToZoom()
    },
    autoResize(val) {
      const { map } = this
      val ? map.enableAutoResize() : map.disableAutoResize()
    },
    theme(val) {
      const { map } = this
      map[getMapMethod('setMapStyle')]({ styleJson: val })
    },
    mapStyle: {
      handler(val) {
        const { map, theme } = this
        !theme && map[getMapMethod('setMapStyle')](val)
      },
      deep: true
    }
  },
  methods: {
    setMapOptions() {
      const { map, minZoom, maxZoom, mapType, dragging, scrollWheelZoom, doubleClickZoom, keyboard, inertialDragging, continuousZoom, pinchToZoom, autoResize } = this
      minZoom && map.setMinZoom(minZoom)
      maxZoom && map.setMaxZoom(maxZoom)
      mapType && map.setMapType(global[mapType])
      dragging ? map.enableDragging() : map.disableDragging()
      scrollWheelZoom ? map.enableScrollWheelZoom() : map.disableScrollWheelZoom()
      doubleClickZoom ? map.enableDoubleClickZoom() : map.disableDoubleClickZoom()
      keyboard ? map.enableKeyboard() : map.disableKeyboard()
      inertialDragging ? map.enableInertialDragging() : map.disableInertialDragging()
      continuousZoom ? map.enableContinuousZoom() : map.disableContinuousZoom()
      pinchToZoom ? map.enablePinchToZoom() : map.disablePinchToZoom()
      autoResize ? map.enableAutoResize() : map.disableAutoResize()
    },
    init(BMap) {
      if (this.map) {
        return
      }
      let $el = this.$refs.view
      for (let $node of this.$slots.default || []) {
        if ($node.componentOptions && $node.componentOptions.tag === 'bm-view') {
          this.hasBmView = true
          $el = $node.elm
        }
      }
      const map = new BMap.Map($el, { enableHighResolution: this.highResolution, enableMapClick: this.mapClick })
      this.map = map
      const { setMapOptions, zoom, getCenterPoint, theme, mapStyle } = this
      theme ? map[getMapMethod('setMapStyle')]({ styleJson: theme }) : (mapStyle && map[getMapMethod('setMapStyle')](mapStyle))
      setMapOptions()
      bindEvents.call(this, map)
      // ????????????????????????????????? ??????????????????????????? center ?????????????????????????????????????????????
      map.reset()
      let loadNum = 0;
      map.addEventListener('tilesloaded', () => {
        if (!loadNum) {
          loadNum++;
          this.$emit('ready', { BMap, map })
        }
      });
      map.addEventListener('loaded', () => {
        this.$emit('loaded', { BMap, map });
      });
      this.setCenterZoom(map, getCenterPoint(), zoom);
    },
    setCenterZoom(map, center, zoom) {
      if (getConfig().type === 'WebGL') {
        if (!this.hasAnimation || !this.defaultAnimation) {
          map.setCenter(center, {
            noAnimation: !this.hasAnimation,
            callback: () => {
              map.setZoom(zoom, {
                noAnimation: !this.hasAnimation,
                zoomCenter: center,
                callback: () => {
                  this.$emit('animationed', { BMap: this.BMap, map });
                }
              });
            }
          });
        } else {
          map.centerAndZoom(center, zoom);
        }
      } else {
        map.centerAndZoom(center, zoom);
      }
    },
    getCenterPoint() {
      const { center, BMap } = this
      switch (checkType(center)) {
        case 'String': return center
        case 'Object': return new BMap.Point(center.lng, center.lat)
        default: return new BMap.Point()
      }
    },
    initMap(BMap) {
      this.BMap = BMap
      this.init(BMap)
    },
    getMapScript() {
      if (!global.BMap) {
        global.BMap = {}
        global.BMap._preloader = new Promise((resolve, reject) => {
          global._initBaiduMap = function () {
            global.BMap = getConfig().type == 'WebGL' ? global.BMapGL : global.BMap;
            resolve(global.BMap)
            global.document.body.removeChild($script)
            global.BMap._preloader = null
            global._initBaiduMap = null
          }
          const $script = document.createElement('script')
          global.document.body.appendChild($script)
          switch (getConfig().type) {
            case 'WebGL':
              $script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${getConfig().ak}&callback=_initBaiduMap`
              break;
            default:
              $script.src = `https://api.map.baidu.com/api?v=${getConfig().v}&ak=${getConfig().ak}&callback=_initBaiduMap`
          }
        })
        return global.BMap._preloader
      } else if (!global.BMap._preloader) {
        return Promise.resolve(global.BMap)
      } else {
        return global.BMap._preloader
      }
    },
    reset() {
      const { getMapScript, initMap } = this
      getMapScript()
        .then(initMap)
    }
  },
  created() {
    const options = {};
    this.ak && (options.ak = this.ak);
    this.v && (options.v = this.v);
    this.type && (options.type = this.type);
    setConfig(options);
  },
  mounted() {
    this.reset()
  },
  data() {
    return {
      hasBmView: false
    }
  }
}
</script>
