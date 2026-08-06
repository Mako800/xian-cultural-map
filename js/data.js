/**
 * 西安古城文脉地图 — 景点数据
 * 坐标系：WGS-84（数据层统一存储），展示时由 map.js 转为 GCJ-02
 */

var sites = [
  {
    id: 'zhonglou',
    name: '钟楼',
    lat: 34.2610, lng: 108.9423,
    dynasty: '明', type: '建筑',
    thumbnail: 'img/markers/zhonglou_thumb.jpg',
    page: 'pages/zhonggulou.html',
    summary: '西安钟楼建于明洪武十七年（1384年），是中国现存钟楼中形制最大、保存最完整的一座。'
  },
  {
    id: 'gulou',
    name: '鼓楼',
    lat: 34.2618, lng: 108.9390,
    dynasty: '明', type: '建筑',
    thumbnail: 'img/markers/gulou_thumb.jpg',
    page: 'pages/zhonggulou.html',
    summary: '西安鼓楼建于明洪武十三年（1380年），与钟楼遥相呼应，"晨钟暮鼓"由此而来。'
  },
  {
    id: 'chengqiang',
    name: '西安城墙',
    lat: 34.2565, lng: 108.9430,
    dynasty: '明', type: '军事防御',
    thumbnail: 'img/markers/chengqiang_thumb.jpg',
    page: 'pages/chengqiang.html',
    summary: '中国现存规模最大、保存最完整的古代城垣，周长13.74公里，是西安最鲜明的城市标志。'
  },
  {
    id: 'beilin',
    name: '碑林博物院',
    lat: 34.2552, lng: 108.9482,
    dynasty: '唐—清', type: '石刻艺术',
    thumbnail: 'img/markers/beilin_thumb.jpg',
    page: 'pages/beilin.html',
    summary: '收藏中国古代碑石时间最早、数量最多的文化艺术宝库，被誉为"书法艺术的殿堂"。'
  },
  {
    id: 'dayanta',
    name: '大雁塔',
    lat: 34.2196, lng: 108.9594,
    dynasty: '唐', type: '宗教',
    thumbnail: 'img/markers/dayanta_thumb.jpg',
    page: 'pages/dayanta.html',
    summary: '唐代玄奘法师为保存经卷而建，七层方塔高64米，是古都西安最著名的文化地标。'
  },
  {
    id: 'xiaoyanta',
    name: '小雁塔',
    lat: 34.2413, lng: 108.9374,
    dynasty: '唐', type: '宗教',
    thumbnail: 'img/markers/xiaoyanta_thumb.jpg',
    page: 'pages/xiaoyanta.html',
    summary: '唐代密檐式砖塔，历经多次地震三裂三合而不倒，堪称中国古代建筑奇迹。'
  },
  {
    id: 'bingmayong',
    name: '兵马俑',
    lat: 34.3850, lng: 109.2730,
    dynasty: '秦', type: '陵墓遗址',
    thumbnail: 'img/markers/bingmayong_thumb.jpg',
    page: 'pages/bingmayong.html',
    summary: '秦始皇陵陪葬坑，八千余件陶俑陶马，被誉为"世界第八大奇迹"。'
  },
  {
    id: 'huaqinggong',
    name: '华清宫',
    lat: 34.3610, lng: 109.2085,
    dynasty: '唐', type: '宫殿园林',
    thumbnail: 'img/markers/huaqinggong_thumb.jpg',
    page: 'pages/huaqinggong.html',
    summary: '唐代皇家温泉行宫，唐玄宗与杨贵妃的爱情故事在此上演，亦是西安事变发生地。'
  },
  {
    id: 'daminggong',
    name: '大明宫遗址公园',
    lat: 34.2930, lng: 108.9600,
    dynasty: '唐', type: '宫殿遗址',
    thumbnail: 'img/markers/daminggong_thumb.jpg',
    page: 'pages/daminggong.html',
    summary: '唐代最宏伟的皇家宫殿群，面积相当于北京故宫的4.5倍，丝绸之路的东方起点。'
  },
  {
    id: 'xianshibian',
    name: '西安事变旧址',
    lat: 34.2690, lng: 108.9520,
    dynasty: '近现代', type: '革命遗址',
    thumbnail: 'img/markers/xianshibian_thumb.jpg',
    page: 'pages/xianshibian.html',
    summary: '张学良公馆所在地，1936年西安事变改变中国抗战格局的历史见证。'
  },
  {
    id: 'shanxibowuguan',
    name: '陕西历史博物馆',
    lat: 34.2240, lng: 108.9520,
    dynasty: '现代', type: '博物馆',
    thumbnail: 'img/markers/shanxibowuguan_thumb.jpg',
    page: 'pages/shanxibowuguan.html',
    summary: '中国第一座大型现代化国家级博物馆，馆藏文物171万余件，周秦汉唐文明荟萃。'
  },
  {
    id: 'xianbowuyuan',
    name: '西安博物院',
    lat: 34.2415, lng: 108.9375,
    dynasty: '现代', type: '博物馆',
    thumbnail: 'img/markers/xianbowuyuan_thumb.jpg',
    page: 'pages/xianbowuyuan.html',
    summary: '以小雁塔为核心，集博物馆、古建筑、园林于一体的城市文化地标。'
  },
  {
    id: 'datangfurongyuan',
    name: '大唐芙蓉园',
    lat: 34.2140, lng: 108.9720,
    dynasty: '现代', type: '主题公园',
    thumbnail: 'img/markers/datangfurongyuan_thumb.jpg',
    page: 'pages/datangfurongyuan.html',
    summary: '仿唐皇家园林，全面展示盛唐风貌的大型文化主题公园，夜景尤为绚丽。'
  },
  {
    id: 'shuyuanmen',
    name: '书院门文化街',
    lat: 34.2545, lng: 108.9465,
    dynasty: '明清', type: '历史街区',
    thumbnail: 'img/markers/shuyuanmen_thumb.jpg',
    page: 'pages/shuyuanmen.html',
    summary: '明清时期关中书院所在地，如今是文房四宝、古玩字画的传统文化街区。'
  },
  {
    id: 'huashan',
    name: '华岳仙掌',
    lat: 34.481, lng: 110.087,
    dynasty: '自然景观', type: '关中八景',
    thumbnail: 'img/markers/huashan_thumb.jpg',
    page: 'pages/huashan.html',
    summary: '西岳华山以险峻冠绝天下，旭日映照东峰石壁如巨人掌印，"华岳仙掌"居关中八景之首。'
  },
  {
    id: 'lishan',
    name: '骊山晚照',
    lat: 34.356, lng: 109.216,
    dynasty: '自然景观', type: '关中八景',
    thumbnail: 'img/markers/lishan_thumb.jpg',
    page: 'pages/lishan.html',
    summary: '骊山横亘临潼城南，夕阳西下时层林尽染、山峦如绣，"骊山晚照"为关中八景之一。'
  },
  {
    id: 'baqiao',
    name: '灞柳风雪',
    lat: 34.315, lng: 109.070,
    dynasty: '自然人文', type: '关中八景',
    thumbnail: 'img/markers/baqiao_thumb.jpg',
    page: 'pages/baqiao.html',
    summary: '灞桥两岸古柳成行，春日柳絮漫天如雪，"灞柳风雪"是长安千年送别文化的诗意写照。'
  },
  {
    id: 'qujiang',
    name: '曲江流饮',
    lat: 34.209, lng: 108.975,
    dynasty: '唐', type: '关中八景',
    thumbnail: 'img/markers/qujiang_thumb.jpg',
    page: 'pages/qujiang.html',
    summary: '唐代新科进士曲江赐宴，置杯曲水之上随流而饮，"曲江流饮"尽显盛唐文人的风雅豪情。'
  },
  {
    id: 'yantachenzhong',
    name: '雁塔晨钟',
    lat: 34.2418, lng: 108.9369,
    dynasty: '唐—今', type: '关中八景',
    thumbnail: 'img/markers/yantachenzhong_thumb.jpg',
    page: 'pages/xiaoyanta.html',
    summary: '荐福寺钟声每日清晨悠远响起，与千年古塔朝霞交相辉映，是关中八景中最富禅意的一景。'
  },
  {
    id: 'xianyang',
    name: '咸阳古渡',
    lat: 34.331, lng: 108.720,
    dynasty: '秦汉—明清', type: '关中八景',
    thumbnail: 'img/markers/xianyang_thumb.jpg',
    page: 'pages/xianyang.html',
    summary: '渭河咸阳段古渡口，自秦汉以来即为"丝绸之路第一渡"，千年舟楫往来不绝。'
  },
  {
    id: 'caotangsi',
    name: '草堂烟雾',
    lat: 34.010, lng: 108.751,
    dynasty: '东晋—唐', type: '关中八景',
    thumbnail: 'img/markers/caotangsi_thumb.jpg',
    page: 'pages/caotangsi.html',
    summary: '草堂寺为鸠摩罗什译经圣地，寺内古井终年升腾白色雾气，"草堂烟雾"恍若仙境。'
  },
  {
    id: 'taibai',
    name: '太白积雪',
    lat: 34.029, lng: 107.789,
    dynasty: '自然景观', type: '关中八景',
    thumbnail: 'img/markers/taibai_thumb.jpg',
    page: 'pages/taibai.html',
    summary: '太白山为秦岭第一高峰（3767米），山顶积雪终年不化，"太白积雪六月天"为关中奇观。'
  }
];
