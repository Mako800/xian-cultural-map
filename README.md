# 西安古城文脉地图

Author: Mako800

**本项目已经正式上线公网，访问 [https://mako800.github.io/xian-cultural-map/](https://mako800.github.io/xian-cultural-map/) 即可看到网页。**

Xi'an Ancient City Cultural Map — 一个交互式 Web 地图，在西安市地图上标记具有历史文化价值的景点，点击即可浏览图文并茂的历史文化知识讲解。

**一图览古城 · 一点知千年**

---

## 效果预览

打开 `index.html`，左侧为景点列表，右侧为交互式地图（天地图瓦片）：

- 红色圆点标记各景点位置
- 点击标记 → 跳转详情页
- 侧边栏卡片 → 单击定位 / 双击跳转
- 移动端响应式适配

---

## 已收录景点（22 个）

### 古城核心（6 个）
| 景点 | 朝代 | 详情页 |
|------|------|--------|
| 钟楼 | 明 | `pages/zhonggulou.html` |
| 鼓楼 | 明 | `pages/zhonggulou.html` |
| 西安城墙 | 明 | `pages/chengqiang.html` |
| 碑林博物院 | 唐—清 | `pages/beilin.html` |
| 大雁塔 | 唐 | `pages/dayanta.html` |
| 小雁塔 | 唐 | `pages/xiaoyanta.html` |

### 周边名胜（8 个）
兵马俑 · 华清宫 · 大明宫遗址公园 · 西安事变旧址 · 陕西历史博物馆 · 西安博物院 · 大唐芙蓉园 · 书院门文化街

### 关中八景（8 个）
华岳仙掌（华山）· 骊山晚照 · 灞柳风雪 · 曲江流饮 · 雁塔晨钟 · 咸阳古渡 · 草堂烟雾 · 太白积雪

---

## 项目结构

```
web/
├── index.html                  # 主页面（侧边栏 + 地图）
├── css/
│   ├── style.css               # 全局样式
│   └── detail.css              # 详情页样式
├── js/
│   ├── data.js                 # 景点数据（坐标、名称、简介）
│   └── map.js                  # 地图初始化 + 标记管理
├── pages/                      # 详情页（每个景点一个 HTML）
│   ├── zhonggulou.html
│   ├── chengqiang.html
│   ├── beilin.html
│   ├── dayanta.html
│   ├── xiaoyanta.html
│   ├── bingmayong.html
│   ├── ...（共 21 个详情页）
│   └── taibai.html
├── img/                        # 图片素材
│   ├── markers/                # 侧边栏缩略图
│   ├── zhonggulou/             # 各景点图片目录
│   ├── chengqiang/
│   └── ...（共 21 个景点目录）
├── download_images.py          # 自动下载图片脚本（需在本机运行）
├── download.sh                 # 同上（Shell 版本）
├── README.md                   # 本文件
└── 项目方案.md                  # 原始项目方案
```

---

## 快速开始

1. 克隆仓库
2. 直接用浏览器打开 `web/index.html` 即可预览
3. 无需安装依赖、无需启动服务器、无需 API Key（地图使用天地图免费瓦片）


**（注：本项目已经正式上线公网，访问 [https://mako800.github.io/xian-cultural-map/](https://mako800.github.io/xian-cultural-map/) 即可看到网页。）**

---

## 关于图片素材

### 当前状态：图片是乱的

由于网络环境限制，目前项目中的图片素材**并非各景点的真实照片**，而是从 Pexels 下载的通用中国风占位图片。**每个景点的图片需要替换为对应的真实照片**。

### 需要替换的图片

每个景点目录下需要替换的文件（以钟鼓楼为例）：

```
img/zhonggulou/
├── hero.jpg        # 主图 → 替换为钟鼓楼真实照片
├── gallery_1.jpg   # 画廊图 → 替换为钟鼓楼真实照片
└── gallery_2.jpg   # 画廊图 → 替换为钟鼓楼真实照片
```

所有 21 个景点目录（`img/*/`）中的图片都需要替换。缩略图目录（`img/markers/`）也需同步更新。

### 在哪找免费图片

| 来源 | 地址 | 协议 |
|------|------|------|
| **Wikimedia Commons** | commons.wikimedia.org | CC0 / CC-BY / CC-BY-SA |
| **Pixabay** | pixabay.com | 免费可商用 |
| **Unsplash** | unsplash.com | 免费可商用 |
| **Pexels** | pexels.com | 免费可商用 |
| **自己拍摄** | — | 你的版权 |

> 建议优先使用 Wikimedia Commons 搜索景点名称，通常能找到该景点的 CC0 高质量照片。

---

## 如何贡献

### 添加新景点

欢迎补充更多西安及周边的历史文化景点！添加一个新景点只需两步：

#### 步骤 1：在 `js/data.js` 中添加数据

在 `sites` 数组末尾添加一条记录：

```javascript
{
  id: 'qinglongsi',             // 唯一 ID（拼音，小写，不含空格）
  name: '青龙寺',                // 景点名称
  lat: 34.2338, lng: 108.9897,  // WGS-84 坐标（可从 Google Maps 或天地图拾取）
  dynasty: '唐',                 // 朝代（秦汉/隋唐/宋元/明清/近现代/现代/自然景观 等）
  type: '宗教',                  // 类型（建筑/宗教/军事/博物馆/陵墓/园林/街区 等）
  thumbnail: 'img/markers/qinglongsi_thumb.jpg',  // 缩略图路径
  page: 'pages/qinglongsi.html',                  // 详情页路径
  summary: '青龙寺是唐代佛教密宗祖庭……'              // 一句话简介（≤50字）
}
```

#### 步骤 2：创建详情页

在 `pages/` 目录下新建 `qinglongsi.html`，参考已有页面的模板结构：

- **顶部导航栏** — 复制粘贴，修改标题
- **主图** — `<img class="hero-image">`
- **基本信息卡** — `.info-card` 中的四格信息
- **正文内容** — 按"历史沿革 / 建筑特色 / 文化意义"三大板块组织
- **图片画廊** — `.gallery` 中的缩略图
- **参观信息表** — 地址、开放时间、门票、交通、小贴士

模板可直接复制 `pages/dayanta.html` 并替换内容。

#### 步骤 3：放入图片

在 `img/` 下新建对应目录（如上例的 `img/qinglongsi/`），放入 `hero.jpg` 和若干画廊图片。同时在 `img/markers/` 下放入 `qinglongsi_thumb.jpg` 缩略图。

### 修复/改进文字内容

直接编辑 `pages/` 下的 HTML 文件即可。所有历史文字均来自公开资料整理，欢迎大家补充更准确的内容、纠正错误。

### 提交 PR

1. Fork 本仓库
2. 创建你的特性分支：`git checkout -b feature/add-qinglongsi`
3. 提交更改：`git commit -m '添加青龙寺景点'`
4. 推送到分支：`git push origin feature/add-qinglongsi`
5. 提交 Pull Request

---

## 技术栈

| 层次 | 技术 |
|------|------|
| 地图 | Leaflet.js 1.9.4 |
| 瓦片 | 天地图（GCJ-02 坐标系） |
| 前端 | 原生 HTML + CSS + JS（无框架依赖） |
| 部署 | 纯静态文件，任何 HTTP 服务器均可 |

---

## 许可证

本项目代码采用 [MIT License](https://opensource.org/licenses/MIT) 开源。

详情页中的历史文字内容欢迎自由引用、修改。图片素材请遵循各自原始来源的授权协议。

---

## 致谢

- [Leaflet](https://leafletjs.com/) — 开源地图库
- [天地图](https://www.tianditu.gov.cn/) — 国家地理信息公共服务平台
- 所有为这个项目贡献景点内容和照片的朋友

---

*如果你正在西安旅行或生活，欢迎将你拍摄的景点照片贡献给本项目！*
