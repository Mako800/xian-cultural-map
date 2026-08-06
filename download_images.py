#!/usr/bin/env python3
"""
西安古城文脉地图 — 图片素材自动下载脚本
============================================
在你自己电脑上运行此脚本，自动从 Pexels、Unsplash 等免费图库
搜索并下载所有景点的图片素材。

用法：
  python3 download_images.py

依赖（先安装）：
  pip install requests

图片来源：Pexels（免费可商用，无需署名）
"""

import os
import sys
import time
import json
import hashlib
from pathlib import Path

try:
    import requests
except ImportError:
    print("请先安装 requests: pip install requests")
    sys.exit(1)

# ── 配置 ─────────────────────────────────────
BASE_DIR = Path(__file__).parent  # web/ 目录
IMG_DIR  = BASE_DIR / "img"

# 图片规格
THUMB_SIZE = 280   # 缩略图宽度
HERO_SIZE  = 1200  # 主图宽度
GALLERY_SIZE = 800 # 画廊图宽度

# ── 景点列表（搜索关键词 → 目标目录）─────────
SITES = [
    # [目录名, 英文搜索词, 备用中文搜索词]
    ["zhonggulou", "Xi'an Bell Tower China", "西安钟楼"],
    ["zhonggulou", "Xi'an Drum Tower China", "西安鼓楼"],
    ["chengqiang", "Xi'an City Wall China", "西安城墙"],
    ["beilin", "Xi'an Beilin Stone Museum", "西安碑林"],
    ["dayanta", "Big Wild Goose Pagoda Xi'an", "大雁塔"],
    ["xiaoyanta", "Small Wild Goose Pagoda Xi'an", "小雁塔"],
    ["bingmayong", "Terracotta Warriors China", "兵马俑"],
    ["huaqinggong", "Huaqing Palace Xi'an China", "华清宫"],
    ["daminggong", "Daming Palace Xi'an China", "大明宫遗址"],
    ["xianshibian", "Zhang Xueliang Former Residence Xi'an", "张学良公馆"],
    ["shanxibowuguan", "Shaanxi History Museum Xi'an", "陕西历史博物馆"],
    ["xianbowuyuan", "Xi'an Museum China", "西安博物院"],
    ["datangfurongyuan", "Tang Paradise Xi'an China", "大唐芙蓉园"],
    ["shuyuanmen", "Xi'an Shuyuanmen Cultural Street", "书院门"],
    ["huashan", "Mount Hua Huashan China", "华山"],
    ["lishan", "Mount Li Lishan Xi'an China", "骊山"],
    ["baqiao", "Baqiao Bridge Willow Xi'an", "灞桥"],
    ["qujiang", "Qujiang Pool Xi'an China", "曲江"],
    ["xianyang", "Xianyang Ancient Ferry Wei River", "咸阳古渡"],
    ["caotangsi", "Caotang Temple Xi'an China", "草堂寺"],
    ["taibai", "Mount Taibai Qinling China", "太白山"],
]


def search_unsplash(query, per_page=5):
    """
    通过 Unsplash 搜索（无需 API Key，使用 HTML 页面抓取）。
    Unsplash 的 source.unsplash.com 提供随机匹配图片。
    """
    results = []
    # Unsplash Source: 随机返回一张匹配的图片
    # 多次尝试获取不同图片
    for i in range(per_page):
        url = f"https://source.unsplash.com/featured/?{query}&sig={i}"
        try:
            r = requests.get(url, timeout=15, allow_redirects=True,
                           headers={"User-Agent": "Mozilla/5.0"})
            if r.status_code == 200 and 'image' in r.headers.get('Content-Type', ''):
                # 最终 URL 是实际的图片 URL
                final_url = r.url
                results.append(final_url)
                print(f"  ✓ Unsplash 找到: {final_url[:80]}...")
        except Exception as e:
            print(f"  ✗ Unsplash 尝试 {i} 失败: {e}")
        time.sleep(0.5)
    return results


def search_pexels(query, per_page=5, api_key=None):
    """
    通过 Pexels API 搜索。
    免费注册获取 API Key: https://www.pexels.com/api/
    """
    if not api_key:
        print("  ⚠ 未提供 Pexels API Key，跳过 Pexels 搜索")
        print("    免费获取: https://www.pexels.com/api/")
        return []

    results = []
    url = "https://api.pexels.com/v1/search"
    headers = {"Authorization": api_key}
    params = {"query": query, "per_page": per_page}

    try:
        r = requests.get(url, headers=headers, params=params, timeout=15)
        if r.status_code == 200:
            data = r.json()
            for photo in data.get("photos", []):
                results.append(photo["src"]["large"])
                print(f"  ✓ Pexels 找到: {photo['id']}")
    except Exception as e:
        print(f"  ✗ Pexels 搜索失败: {e}")

    return results


def download_image(url, filepath, max_size_mb=10):
    """下载单张图片"""
    try:
        r = requests.get(url, timeout=30, stream=True,
                        headers={"User-Agent": "Mozilla/5.0"})
        if r.status_code == 200:
            content_type = r.headers.get('Content-Type', '')
            if 'image' not in content_type:
                return False

            # 检查大小
            content_length = int(r.headers.get('Content-Length', 0))
            if content_length > max_size_mb * 1024 * 1024:
                print(f"    ⚠ 图片过大 ({content_length/1024/1024:.1f}MB)，跳过")
                return False

            with open(filepath, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)
            return True
    except Exception as e:
        print(f"    ✗ 下载失败: {e}")
    return False


def main():
    pexels_key = os.environ.get("PEXELS_API_KEY", "")
    if not pexels_key:
        print("💡 提示: 设置 PEXELS_API_KEY 环境变量可使用 Pexels 搜索")
        print("   免费注册: https://www.pexels.com/api/")
        print("   export PEXELS_API_KEY=你的密钥")
        print()

    for site_dir, query_en, query_cn in SITES:
        target_dir = IMG_DIR / site_dir
        target_dir.mkdir(parents=True, exist_ok=True)

        print(f"\n{'='*50}")
        print(f"📷 {site_dir} — 搜索: {query_en}")
        print(f"{'='*50}")

        # 收集图片 URL
        image_urls = []

        # 1. Unsplash（无需 API Key）
        print("  搜索 Unsplash...")
        image_urls += search_unsplash(query_en, per_page=5)

        # 2. Pexels（需要 API Key）
        if pexels_key:
            print("  搜索 Pexels...")
            image_urls += search_pexels(query_en, per_page=5, api_key=pexels_key)

        if not image_urls:
            print(f"  ❌ 未找到任何图片，请手动补充 {site_dir}/")
            continue

        # 去重
        image_urls = list(dict.fromkeys(image_urls))

        # 下载：第一张→hero, 前4张→gallery
        for i, url in enumerate(image_urls):
            if i == 0:
                fname = "hero.jpg"
            elif i <= 4:
                fname = f"gallery_{i}.jpg"
            else:
                break

            filepath = target_dir / fname
            # 添加尺寸参数到 URL
            width = HERO_SIZE if i == 0 else GALLERY_SIZE
            dl_url = url
            if "unsplash" in url:
                dl_url = f"{url.split('?')[0]}?w={width}&fit=crop"
            elif "pexels" in url:
                dl_url = f"{url.split('?')[0]}?auto=compress&cs=tinysrgb&w={width}"

            print(f"  下载 {fname}...")
            if download_image(dl_url, filepath):
                size_kb = filepath.stat().st_size / 1024
                print(f"    ✓ 保存 {fname} ({size_kb:.1f} KB)")
            else:
                print(f"    ✗ {fname} 下载失败")

            if i == 0:
                # 同时生成缩略图（复制一份到 markers/ 目录）
                markers_dir = IMG_DIR / "markers"
                markers_dir.mkdir(parents=True, exist_ok=True)
                thumb_path = markers_dir / f"{site_dir}_thumb.jpg"
                # 下载缩略图尺寸版本
                thumb_url = dl_url
                thumb_dl = target_dir / "_thumb_temp.jpg"
                if download_image(dl_url.replace(f"w={width}", f"w={THUMB_SIZE}"), thumb_dl):
                    import shutil
                    shutil.copy(thumb_dl, thumb_path)
                    thumb_dl.unlink()
                    print(f"    ✓ 缩略图 → markers/{site_dir}_thumb.jpg")

            time.sleep(0.3)  # 避免请求过快

    print(f"\n{'='*50}")
    print("✅ 全部下载完成！")
    print(f"   目录: {IMG_DIR}")
    print(f"{'='*50}")


if __name__ == "__main__":
    main()
