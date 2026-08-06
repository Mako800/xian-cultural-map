/**
 * 西安古城文脉地图 — 地图初始化与标记管理
 * 依赖：Leaflet.js（CDN 加载）、data.js
 * 瓦片源：天地图（GCJ-02 坐标系）
 */

document.addEventListener('DOMContentLoaded', function () {
  // ── Leaflet 加载检查 ─────────────────────────
  if (typeof L === 'undefined') {
    document.getElementById('map').innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#C41E3A;font-size:16px;">' +
      '⚠ 地图库加载失败，请检查网络连接后刷新页面</div>';
    return;
  }

  // ── WGS-84 → GCJ-02 坐标转换 ─────────────────
  function wgs84ToGcj02(lng, lat) {
    var PI = Math.PI;
    var a = 6378245.0;
    var ee = 0.00669342162296594323;

    function transformLat(x, y) {
      var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0;
      return ret;
    }

    function transformLng(x, y) {
      var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
      ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0;
      return ret;
    }

    if (lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271) {
      return [lng, lat];
    }

    var dLat = transformLat(lng - 105.0, lat - 35.0);
    var dLng = transformLng(lng - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * PI;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI);
    dLng = (dLng * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI);

    return [lng + dLng, lat + dLat];
  }

  // ── 天地图 Key ──────────────────────────────
  var TDT_KEY = '057eb2c5c000c132a3773c326aa58fdf';

  // ── 地图初始化 ──────────────────────────────
  var map = L.map('map', {
    center: [34.20, 108.90],
    zoom: 10,
    minZoom: 8,
    maxZoom: 18
  });

  // 天地图底图（vec_w）
  L.tileLayer(
    'https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TDT_KEY,
    { subdomains: ['0','1','2','3','4','5','6','7'], maxZoom: 18, attribution: '&copy; 天地图' }
  ).addTo(map);

  // 天地图中文标注叠加层（cva_w）
  L.tileLayer(
    'https://t{s}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=' + TDT_KEY,
    { subdomains: ['0','1','2','3','4','5','6','7'], maxZoom: 18 }
  ).addTo(map);

  // ── 自定义红色圆点图标 ──────────────────────
  var redDotIcon = L.divIcon({
    className: 'custom-marker',
    html: '<div class="marker-dot"></div>',
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -12]
  });

  // ── 渲染景点标记（转为 GCJ-02 对齐天地图） ────
  var markerMap = {};

  sites.forEach(function (site) {
    var gcj = wgs84ToGcj02(site.lng, site.lat);

    var marker = L.marker([gcj[1], gcj[0]], { icon: redDotIcon })
      .addTo(map)
      .bindPopup(
        '<div class="popup-content">' +
          '<h3>' + site.name + '</h3>' +
          '<p>' + site.summary + '</p>' +
          '<span class="popup-tag">' + site.dynasty + '</span>' +
          '<a href="' + site.page + '" class="popup-link">查看详情 →</a>' +
        '</div>',
        { maxWidth: 280 }
      );

    marker.on('click', function () {
      window.location.href = site.page;
    });

    markerMap[site.id] = marker;
  });

  // ── 渲染侧边栏景点列表 ──────────────────────
  var listContainer = document.getElementById('site-list');
  if (listContainer) {
    sites.forEach(function (site) {
      var gcj = wgs84ToGcj02(site.lng, site.lat);

      var card = document.createElement('div');
      card.className = 'site-card';
      card.setAttribute('data-id', site.id);
      card.innerHTML =
        '<img class="site-card-thumb" src="' + site.thumbnail + '" alt="' + site.name + '" onerror="this.src=\'img/placeholder.svg\'">' +
        '<div class="site-card-body">' +
          '<h4 class="site-card-name">' + site.name + '</h4>' +
          '<div class="site-card-tags">' +
            '<span class="tag tag-dynasty">' + site.dynasty + '</span>' +
            '<span class="tag tag-type">' + site.type + '</span>' +
          '</div>' +
          '<p class="site-card-summary">' + site.summary + '</p>' +
        '</div>';

      card.addEventListener('click', function () {
        map.setView([gcj[1], gcj[0]], 16, { animate: true });
        setTimeout(function () {
          markerMap[site.id].openPopup();
        }, 400);
      });

      card.addEventListener('dblclick', function () {
        window.location.href = site.page;
      });

      listContainer.appendChild(card);
    });
  }

  // ── 移动端菜单切换 ──────────────────────────
  var toggleBtn = document.getElementById('toggle-sidebar');
  var sidebar = document.getElementById('sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('collapsed');
    });
  }
});
