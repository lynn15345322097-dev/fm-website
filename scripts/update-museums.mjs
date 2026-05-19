import fs from 'node:fs';

const existing = JSON.parse(fs.readFileSync('data/museums.json', 'utf8'));
const byName = new Map(existing.map((museum) => [museum.name, museum]));

const PHOTO_CATEGORIES = ['建筑外观', '展厅空间', '技术器物', '场景复原', '互动装置'];

const points = [
  ['inner-mongolia-film-museum', '内蒙古电影博物馆', 'Inner Mongolia Film Museum', '华北地区', '内蒙古', '呼和浩特', '内蒙古呼和浩特市新华东路', '国家', true, [40.8426, 111.7485]],
  ['cn-film-museum', '中国电影博物馆', 'China National Film Museum', '华北地区', '北京', '北京', '北京市朝阳区南影路9号', '国家', true, [40.0031, 116.55]],
  ['daqi-radio-film-museum', '北京大戚收音机电影机博物馆', 'Beijing Daqi Radio and Film Projector Museum', '华北地区', '北京', '北京', '北京市通州区宋庄镇小堡村', '非国有', false, [39.9605, 116.7205]],
  ['shanxi-media-museum', '山西流金岁月传媒博物馆', 'Shanxi Liujin Suiyue Media Museum', '华北地区', '山西', '晋中', '山西省晋中市榆次老城内', '非国有', false, [37.6826, 112.7411]],
  ['xi-film-museum', '西影电影博物馆', "Xi'an Film Studio Museum", '西北地区', '陕西', '西安', '陕西省西安市西影路508号', '国家', true, [34.236, 108.9902]],
  ['cc-film-museum', '长影旧址博物馆', 'Changchun Film Studio Museum', '东北地区', '吉林', '长春', '吉林省长春市红旗街1118号', '国家', true, [43.8595, 125.2914]],
  ['qd-film-museum', '青岛电影博物馆', 'Qingdao Film Museum', '华东地区', '山东', '青岛', '山东省青岛市黄岛区灵山湾', '国家', true, [35.9075, 120.1399]],
  ['linyi-red-film-museum', '山东临沂百年红色电影博物馆', 'Linyi Century Red Film Museum', '华东地区', '山东', '临沂', '山东省临沂市罗庄区', '非国有', false, [34.9985, 118.2866]],
  ['xiaoguanghan-museum', '小广寒博物馆', 'Xiaoguanghan Museum', '华东地区', '山东', '济南', '山东省济南市经三路48号', '非国有', false, [36.668, 116.997]],
  ['henan-film-museum', '河南电影博物馆', 'Henan Film Museum', '华东地区', '河南', '郑州', '河南省郑州市', '待补充', false, [34.7466, 113.6254]],
  ['sh-film-museum', '上海电影博物馆', 'Shanghai Film Museum', '华东地区', '上海', '上海', '上海市徐汇区漕溪北路595号', '国家', true, [31.1855, 121.4389]],
  ['changshu-ruidian-film-archive', '常熟瑞电电影资料收藏馆', 'Changshu Ruidian Film Archive Collection', '华东地区', '江苏', '常熟', '江苏省苏州市常熟市', '非国有', true, [31.6462, 120.7421]],
  ['huaxia-film-cultural-center', '华夏电影展示馆 / 华夏电影文化中心', 'Huaxia Film Exhibition Hall', '华东地区', '江苏', '如皋', '江苏如皋软件园二期1号楼', '国家', false, [32.3716, 120.573]],
  ['yancheng-film-projector-hall', '盐城“邂逅光影”电影机馆', 'Yancheng Encounter Light and Shadow Film Projector Hall', '华东地区', '江苏', '盐城', '江苏省盐城市机电高职校内', '校企共建', false, [33.382, 120.139]],
  ['china-projector-museum', '中国电影放映机博物馆', 'China Film Projector Museum', '华东地区', '浙江', '东阳', '浙江省东阳市横店影视城', '非国有', false, [29.1549, 120.3212]],
  ['old-time-av-exhibition', '旧时光影音展览馆', 'Old Time Audiovisual Exhibition Hall', '华东地区', '浙江', '杭州', '浙江省杭州市余杭区瓶窑老街', '非国有', true, [30.3975, 119.9608]],
  ['jiaxing-film-museum', '嘉兴电影博物馆（银河影城新文化广场店）', 'Jiaxing Film Museum', '华东地区', '浙江', '嘉兴', '嘉兴新文化广场', '影城融合', false, [30.7522, 120.7555]],
  ['jiujin-film-collection', '九斤电影珍藏馆', 'Jiujin Film Collection Hall', '华东地区', '浙江', '海宁', '浙江省嘉兴海宁市许村镇', '非国有', true, [30.464, 120.46]],
  ['xie-jin-rural-film-museum', '谢晋故里乡村电影博物馆', 'Xie Jin Hometown Rural Film Museum', '华东地区', '浙江', '绍兴', '绍兴市上虞区谢塘灵惠街与026乡道交叉口西北260米', '公立', true, [30.046, 120.847]],
  ['ningbo-minguang-cinema-display', '宁波民光影城（展示区）', 'Ningbo Minguang Cinema Display Area', '华东地区', '浙江', '宁波', '浙江省宁波市海曙区开明街', '国家', false, [29.8725, 121.5518]],
  ['xiaoxiang-film-museum', '潇湘电影博物馆（潇湘电影制片厂）', 'Xiaoxiang Film Museum', '华中地区', '湖南', '长沙', '中国湖南省长沙市雨花区韶山中路63号', '待补充', false, [28.168, 112.992]],
  ['zhu-film-museum', '珠影星光城（珠江电影制片厂）', 'Zhujiang Film Studio Star City', '华南地区', '广东', '广州', '广东省广州市海珠区新港中路', '国家', true, [23.1006, 113.3245]],
  ['huadu-film-culture-museum', '花都区电影文化博物馆', 'Huadu Film Culture Museum', '华南地区', '广东', '广州', '广东省广州市花都区花山镇平山村', '待定', true, [23.4615, 113.3105]],
  ['shantou-film-culture-hall', '汕头埠电影文化展示馆 / 潮汕影人馆', 'Shantou Film Culture Exhibition Hall', '华南地区', '广东', '汕头', '广东省汕头市金平区永平路', '国家', true, [23.3607, 116.6849]],
  ['film-class-museum', '电影课博物馆', 'Film Class Museum', '华南地区', '广东', '深圳', '广东省深圳市南山区西丽小学', '公立', false, [22.587, 113.95]],
  ['xichang-jianchuan-film-cluster', '西昌建川电影博物馆聚落', 'Xichang Jianchuan Film Museum Cluster', '西南地区', '四川', '西昌', '四川省凉山州西昌市高铁新城', '非国有', true, [27.872, 102.263]],
  ['emei-film-studio', '峨眉电影制片厂', 'Emei Film Studio', '西南地区', '四川', '成都', '中国四川省成都市青羊区清江东路360号', '待补充', true, [30.6763, 104.0291]],
  ['sicnu-media-museum', '四川传媒学院传媒博物馆', 'Sichuan University of Media and Communications Media Museum', '西南地区', '四川', '成都', '四川省成都市郫都区', '非国有', false, [30.8209, 103.9229]],
  ['dali-rural-film-history-museum', '大理农村电影历史博物馆', 'Dali Rural Film History Museum', '西南地区', '云南', '大理', '云南省大理古城复兴路459号', '国家', true, [25.6969, 100.1629]],
  ['hk-film-archive', '香港电影资料馆', 'Hong Kong Film Archive', '港澳台地区', '香港', '香港', '香港西湾河鲤景道50号', '公立', true, [22.2827, 114.223]],
  ['cinematheque-passion-macau', '恋爱・电影馆', 'Cinematheque Passion', '港澳台地区', '澳门', '澳门', '澳门大三巴街（恋爱巷）', '公立', false, [22.1977, 113.5416]],
  ['tfai', '国家影视听中心（TFAI）', 'Taiwan Film and Audiovisual Institute', '港澳台地区', '台湾', '新北', '台湾新北市新庄区文艺路2号', '行政法人', false, [25.0526, 121.4462]],
  ['china-film-archive', '中国电影资料馆', 'China Film Archive', '华北地区', '北京', '北京', '北京市海淀区文慧园路3号', '档案与学术机构', false, [39.9648, 116.3615]],
  ['sh-film-park', '上海影视乐园', 'Shanghai Film Park', '华东地区', '上海', '上海', '上海市松江区车墩镇北松公路4915号', '影视基地与主题公园', false, [31.0325, 121.4228]],
  ['cq-film-museum', '重庆电影博物馆', 'Chongqing Film Museum', '西南地区', '重庆', '重庆', '重庆市南岸区', '城市专题博物馆', false, [29.5418, 106.5456]],
  ['bfa-film-museum', '北京电影学院电影文化博物馆', 'BFA Film Culture Museum', '华北地区', '北京', '北京', '北京市海淀区西土城路4号', '高校博物馆', false, [39.9745, 116.3515]],
];

function fallbackText(point) {
  const [, name, , region, province, city, address, nature, visited] = point;
  return {
    description: `${name}位于${address}，属于“中国电影展示空间”研究中的${nature}类型样本。该点位用于观察电影博物馆、影像档案、制片厂旧址、影城融合空间与地方文化展示之间的关系。`,
    spaceObservation: `该空间位于${region}${province}${city}，可从城市位置、建筑入口、展厅动线、公共服务设施与周边文化街区关系等方面展开实地观察。当前资料以地点名录和地址信息为基础，后续可补充现场照片、平面动线和访问记录。`,
    exhibitionAnalysis: `从展陈角度看，${name}可以作为理解电影如何被转化为空间经验的案例：其性质为${nature}，可重点分析电影技术器物、影片史叙事、地方电影记忆、制片工业遗产或互动体验装置在展览中的组织方式。${visited ? '该点位已标记为实地考察对象，可优先补充现场材料。' : '该点位仍需进一步核实开放状态与展陈内容。'}`,
  };
}

function makePhotos(name) {
  return PHOTO_CATEGORIES.map((category) => ({
    url: '',
    caption: `${name}：${category}`,
    category,
  }));
}

const merged = points.map((point) => {
  const [id, name, nameEn, region, province, city, address, nature, visited, coordinates] = point;
  const current = byName.get(name) || existing.find((museum) => museum.id === id);
  const fallback = fallbackText(point);
  const type = current?.type || nature;
  const tags = Array.from(new Set([
    ...(current?.tags || []),
    region,
    province,
    nature,
    visited ? '已实地考察' : '',
    '电影博物馆',
    '视听展陈空间',
  ].filter(Boolean)));

  return {
    id,
    name,
    nameEn: current?.nameEn || nameEn,
    region,
    province,
    city,
    address,
    type,
    nature,
    visited,
    tags,
    categories: Array.from(new Set(['电影博物馆', '视听展陈空间', nature].filter(Boolean))),
    coordinates,
    description: current?.description || fallback.description,
    spaceObservation: current?.spaceObservation || fallback.spaceObservation,
    exhibitionAnalysis: current?.exhibitionAnalysis || fallback.exhibitionAnalysis,
    photos: current?.photos?.length ? current.photos : makePhotos(name),
  };
});

fs.writeFileSync('data/museums.json', `${JSON.stringify(merged, null, 2)}\n`);
console.log(`Updated data/museums.json with ${merged.length} records.`);
