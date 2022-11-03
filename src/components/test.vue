<!-- vue 3 引入百度api -->
<template>
  <baidu-map class="map" :center="{lat:26.0804470249902, lng:119.30293817080704}" :zoom="6" :scroll-wheel-zoom="true">
    <bm-marker class="marker-wrap" :position="{lat:26.0804470249902, lng:119.30293817080704}">
      <bm-label content="史蒂夫" :labelStyle="{color: 'white', fontSize : '18px'}" />
    </bm-marker>
  </baidu-map>
</template>

<script>
export default {
  methods: {
    handleAnimationed(data) {
      console.log(data);
    }
  }
};
</script>
