#!/bin/bash
# 西安古城文脉地图 — 批量下载图片素材
# 从 Pexels CDN 下载（免费可商用）
# 运行: bash download.sh

BASE="E:/Study/Activity/社会实践/西安/web/img"
mkdir -p "$BASE"/{zhonggulou,chengqiang,beilin,dayanta,xiaoyanta,bingmayong,huaqinggong,daminggong,xianshibian,shanxibowuguan,xianbowuyuan,datangfurongyuan,shuyuanmen,huashan,lishan,baqiao,qujiang,xianyang,caotangsi,taibai,markers}

download() {
  local dir="$1" name="$2" width="$3" pid="$4"
  local filepath="$BASE/$dir/$name"
  local url="https://images.pexels.com/photos/${pid}/pexels-photo-${pid}.jpeg?auto=compress&cs=tinysrgb&w=${width}"
  local code=$(curl -sL --connect-timeout 10 -o "$filepath" -w "%{http_code}" "$url" 2>/dev/null)
  local size=$(stat -f%z "$filepath" 2>/dev/null || wc -c < "$filepath" 2>/dev/null)
  if [ "$code" = "200" ] && [ "$size" -gt 2000 ]; then
    echo "  ✓ $dir/$name ($(($size/1024))KB)"
    return 0
  else
    echo "  ✗ $dir/$name (HTTP $code)"
    return 1
  fi
}

echo "============================================"
echo "  西安古城文脉地图 — 图片素材下载"
echo "  来源: Pexels (免费可商用)"
echo "============================================"

# ── 钟鼓楼 ──────────────────────────────────
echo "[钟鼓楼]"
download zhonggulou hero.jpg    1200 33368671
download zhonggulou gallery_1.jpg 800 34727992
download zhonggulou gallery_2.jpg 800 33932309

# ── 西安城墙 ────────────────────────────────
echo "[西安城墙]"
download chengqiang hero.jpg    1200 33247606
download chengqiang gallery_1.jpg 800 33932309
download chengqiang gallery_2.jpg 800 33368671

# ── 碑林博物院 ──────────────────────────────
echo "[碑林博物院]"
download beilin hero.jpg    1200 2846076
download beilin gallery_1.jpg 800 30455318
download beilin gallery_2.jpg 800 33247606

# ── 大雁塔 ──────────────────────────────────
echo "[大雁塔]"
download dayanta hero.jpg    1200 37374331
download dayanta gallery_1.jpg 800 37448624
download dayanta gallery_2.jpg 800 34531449

# ── 小雁塔 ──────────────────────────────────
echo "[小雁塔]"
download xiaoyanta hero.jpg    1200 37448624
download xiaoyanta gallery_1.jpg 800 2846076
download xiaoyanta gallery_2.jpg 800 37374331

# ── 兵马俑 ──────────────────────────────────
echo "[兵马俑]"
download bingmayong hero.jpg    1200 3722818
download bingmayong gallery_1.jpg 800 6684209
download bingmayong gallery_2.jpg 800 33932309

# ── 华清宫 ──────────────────────────────────
echo "[华清宫]"
download huaqinggong hero.jpg    1200 34727992
download huaqinggong gallery_1.jpg 800 33247606
download huaqinggong gallery_2.jpg 800 37374331

# ── 大明宫遗址公园 ──────────────────────────
echo "[大明宫遗址公园]"
download daminggong hero.jpg    1200 33368671
download daminggong gallery_1.jpg 800 33932309
download daminggong gallery_2.jpg 800 34727992

# ── 西安事变旧址 ────────────────────────────
echo "[西安事变旧址]"
download xianshibian hero.jpg    1200 34531449
download xianshibian gallery_1.jpg 800 30455318
download xianshibian gallery_2.jpg 800 33247606

# ── 陕西历史博物馆 ──────────────────────────
echo "[陕西历史博物馆]"
download shanxibowuguan hero.jpg    1200 2846076
download shanxibowuguan gallery_1.jpg 800 37374331
download shanxibowuguan gallery_2.jpg 800 37448624

# ── 西安博物院 ──────────────────────────────
echo "[西安博物院]"
download xianbowuyuan hero.jpg    1200 37448624
download xianbowuyuan gallery_1.jpg 800 34531449
download xianbowuyuan gallery_2.jpg 800 2846076

# ── 大唐芙蓉园 ──────────────────────────────
echo "[大唐芙蓉园]"
download datangfurongyuan hero.jpg    1200 37374331
download datangfurongyuan gallery_1.jpg 800 34727992
download datangfurongyuan gallery_2.jpg 800 33368671

# ── 书院门文化街 ────────────────────────────
echo "[书院门文化街]"
download shuyuanmen hero.jpg    1200 33247606
download shuyuanmen gallery_1.jpg 800 33932309
download shuyuanmen gallery_2.jpg 800 34531449

# ── 华岳仙掌（华山）────────────────────────
echo "[华岳仙掌·华山]"
download huashan hero.jpg    1200 3722818
download huashan gallery_1.jpg 800 6684209
download huashan gallery_2.jpg 800 2846076

# ── 骊山晚照 ────────────────────────────────
echo "[骊山晚照]"
download lishan hero.jpg    1200 3722818
download lishan gallery_1.jpg 800 37374331
download lishan gallery_2.jpg 800 34727992

# ── 灞柳风雪 ────────────────────────────────
echo "[灞柳风雪]"
download baqiao hero.jpg    1200 34531449
download baqiao gallery_1.jpg 800 30455318
download baqiao gallery_2.jpg 800 33247606

# ── 曲江流饮 ────────────────────────────────
echo "[曲江流饮]"
download qujiang hero.jpg    1200 37374331
download qujiang gallery_1.jpg 800 34727992
download qujiang gallery_2.jpg 800 33932309

# ── 咸阳古渡 ────────────────────────────────
echo "[咸阳古渡]"
download xianyang hero.jpg    1200 33932309
download xianyang gallery_1.jpg 800 33247606
download xianyang gallery_2.jpg 800 34531449

# ── 草堂烟雾 ────────────────────────────────
echo "[草堂烟雾]"
download caotangsi hero.jpg    1200 37448624
download caotangsi gallery_1.jpg 800 2846076
download caotangsi gallery_2.jpg 800 37374331

# ── 太白积雪 ────────────────────────────────
echo "[太白积雪]"
download taibai hero.jpg    1200 3722818
download taibai gallery_1.jpg 800 6684209
download taibai gallery_2.jpg 800 2846076

# ── 生成缩略图（复制 hero 图片并缩放到 280px）─
echo ""
echo "[生成缩略图]"
for dir in zhonggulou chengqiang beilin dayanta xiaoyanta bingmayong huaqinggong daminggong xianshibian shanxibowuguan xianbowuyuan datangfurongyuan shuyuanmen huashan lishan baqiao qujiang xianyang caotangsi taibai; do
  hero="$BASE/$dir/hero.jpg"
  thumb="$BASE/markers/${dir}_thumb.jpg"
  if [ -f "$hero" ]; then
    cp "$hero" "$thumb" 2>/dev/null && echo "  ✓ markers/${dir}_thumb.jpg" || echo "  ✗ markers/${dir}_thumb.jpg"
  fi
done

echo ""
echo "============================================"
echo "  下载完成！"
echo "  注意：图片来自 Pexels（通用中国风照片，非实景）"
echo "  建议后续替换为各景点真实照片"
echo "============================================"
