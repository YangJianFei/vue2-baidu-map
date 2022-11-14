<!-- vue 3 引入百度api -->
<template>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="8" @ready="handleAnimationed">
    <bm-marker :position="{lng: 116.404, lat: 39.915}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <bm-label content="我爱北京天安门" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}" />
    </bm-marker>
  </baidu-map>
</template>

<script>
// 当边界点数量大于这个值时才会进行挑拣
const PICK_LIMIT = 100;
// 边界点挑选倍率，这个值越大，边界就越“锯齿”，越小就越精细，最小为 0（完整边界）
const PICK_MAGNIFICATION = 25;

export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleAnimationed({ BMap, map }) {
      // AreaData.forEach(item => {
      const dist = new BMap.DistrictLayer({
        name: `(福建省)`,
        kind: 1,
        fillColor: '#f0f3fa',
        fillOpacity: 1,
        strokeColor: '#618bf8',
        viewport: true
      });
      map.addDistrictLayer(dist);
      this.show = true;
    }
  }
};
</script>
