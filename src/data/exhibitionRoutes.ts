import type { ExhibitionRoute } from '@/types';

export const exhibitionRoutes: ExhibitionRoute[] = [
  {
    id: 'film-into-museum',
    title: '电影如何进入博物馆',
    subtitle: '从银幕到展柜——电影的博物馆化之路',
    summary:
      '电影从诞生之初的街头杂耍，到成为艺术殿堂的组成部分，再到进入博物馆成为文化遗产，经历了一个多世纪的变迁。本条展线沿着中国电影博物馆的发展轨迹，追溯电影如何从光影流动的银幕走向静态陈列的展柜，以及这种空间转换如何重新定义了我们对电影的认知。',
    museums: ['cn-film-museum', 'sh-film-museum', 'cc-film-museum', 'hk-film-archive', 'china-film-archive'],
    chapters: [
      {
        title: '从银幕到展柜',
        subtitle: '电影作品如何被转化为可陈列、可观看、可叙述的博物馆对象。',
        researchQuestion: '当电影从流动影像变成展厅中的物、图文和装置时，哪些内容被保留下来，哪些观看经验被改变？',
        museumIds: ['cn-film-museum', 'sh-film-museum'],
        keywords: ['博物馆化', '电影史叙事', '展柜', '观影经验'],
      },
      {
        title: '从胶片到档案',
        subtitle: '电影保存机构如何把胶片、海报、剧本和修复流程转化为公共知识。',
        researchQuestion: '档案空间如何在“保存”与“展示”之间建立新的公众入口？',
        museumIds: ['china-film-archive', 'hk-film-archive', 'tfai'],
        keywords: ['电影档案', '胶片保存', '数字修复', '学术放映'],
      },
      {
        title: '从片场到遗址',
        subtitle: '制片厂旧址和生产现场如何进入遗产保护与文化消费。',
        researchQuestion: '原址空间是否比普通展厅更能呈现电影生产的劳动、技术和制度痕迹？',
        museumIds: ['cc-film-museum', 'xi-film-museum', 'zhu-film-museum', 'emei-film-studio'],
        keywords: ['制片厂旧址', '工业遗产', '摄影棚', '生产现场'],
      },
      {
        title: '从器物到技术遗产',
        subtitle: '摄影机、放映机、剪辑台等技术物如何成为电影史证据。',
        researchQuestion: '当技术设备脱离使用环境进入展览，它们是作为工具、文物，还是作为技术谱系中的节点被观看？',
        museumIds: ['china-projector-museum', 'yancheng-film-projector-hall', 'daqi-radio-film-museum', 'xi-film-museum'],
        keywords: ['放映机', '摄影机', '技术物', '电影技术遗产'],
      },
      {
        title: '从地方记忆到公共叙事',
        subtitle: '地方电影展示空间如何把城市经验、影人记忆和乡土故事纳入电影史。',
        researchQuestion: '地方性电影记忆如何补充国家电影史和产业史叙事？',
        museumIds: ['xie-jin-rural-film-museum', 'dali-rural-film-history-museum', 'shantou-film-culture-hall'],
        keywords: ['地方记忆', '影人故里', '乡村电影', '公共文化'],
      },
    ],
    content: `电影最初并非作为"文化遗产"而存在。在卢米埃尔兄弟的《火车进站》首次公映后的很长一段时间里，电影被视为廉价的娱乐形式，与杂耍、马戏为伍。直到20世纪中期，电影才开始被承认为一门独立的艺术形式，电影保存和展示的问题也随之浮出水面。

中国的电影博物馆化进程始于20世纪80年代。1982年，中国电影资料馆成立，标志着电影档案意识的觉醒。2005年，中国电影博物馆——这座当时世界上最大的国家级电影专业博物馆在北京落成，标志着中国电影展示空间进入了一个全新的阶段。

从空间类型来看，中国电影展示空间大致经历了三个阶段：

**第一阶段：档案仓库（1980年代）**。以中国电影资料馆为代表，其核心职能是保存而非展示。胶片被存放在恒温恒湿的库房中，仅供学术研究使用。此时的"展示"是功能性的、封闭的。

**第二阶段：博物馆化（2000年代至今）**。以中国电影博物馆、上海电影博物馆为代表，电影作品从库房走向展厅，从胶片变为展品。博物馆通过场景复原、互动装置、多媒体影像等方式，将电影这一时间艺术转化为空间体验。

**第三阶段：遗产化与活化（正在进行中）**。以长影旧址博物馆、西影电影博物馆为代表，将电影生产场所本身（摄影棚、洗印车间、厂区）整体保护并开放展示。观众不再只是观看电影，而是进入电影生产的历史现场。

这条展线串联了五个具有代表性的空间，分别对应于不同的博物馆化阶段和类型：从档案保存（中国电影资料馆）到国家叙事（中国电影博物馆），从城市记忆（上海电影博物馆）到工业遗产（长影旧址博物馆），再到文化档案（香港电影资料馆）。`,
  },
  {
    id: 'geographic-distribution',
    title: '中国电影展示空间的地理分布',
    subtitle: '从北京到香港——电影展示空间的城市图谱',
    summary:
      '中国电影展示空间的地理分布并非随机的，而是深刻地反映了中国电影工业的历史地理格局。从北京的国家级机构，到上海的产业重镇，再到长春、西安等老牌电影基地，本条展线在地图上绘制出一幅中国电影文化的空间版图。',
    museums: [
      'cn-film-museum',
      'sh-film-museum',
      'cc-film-museum',
      'xi-film-museum',
      'qd-film-museum',
      'zhu-film-museum',
      'hk-film-archive',
      'cq-film-museum',
    ],
    chapters: [
      {
        title: '北京：国家电影记忆与档案中心',
        subtitle: '国家级电影博物馆、电影资料馆和高校电影教育空间的集中。',
        researchQuestion: '首都的电影展示空间如何组织国家电影史、档案保存和电影教育三种叙事？',
        museumIds: ['cn-film-museum', 'china-film-archive', 'bfa-film-museum', 'daqi-radio-film-museum'],
        keywords: ['北京', '国家叙事', '电影档案', '电影教育'],
      },
      {
        title: '上海：都市电影文化与海派影像记忆',
        subtitle: '从制片厂、城市电影史到影视基地，上海呈现电影与都市现代性的关系。',
        researchQuestion: '上海的电影展示空间如何把城市记忆、明星文化和制片厂历史转化为展览经验？',
        museumIds: ['sh-film-museum', 'sh-film-park'],
        keywords: ['上海', '海派文化', '都市影像', '影视基地'],
      },
      {
        title: '长春/西安：电影工业基地的遗产转型',
        subtitle: '老牌电影制片基地通过旧址保护与产业园改造进入公共文化空间。',
        researchQuestion: '电影工业基地如何在遗产保护、文旅开发和电影史书写之间取得平衡？',
        museumIds: ['cc-film-museum', 'xi-film-museum'],
        keywords: ['长春', '西安', '工业遗产', '制片厂'],
      },
      {
        title: '青岛/横店等：影视生产空间的展示消费化',
        subtitle: '影视生产基地和电影科技展示逐渐与旅游、体验和城市品牌结合。',
        researchQuestion: '当影视生产空间面向游客开放时，电影工业被转译成怎样的消费景观？',
        museumIds: ['qd-film-museum', 'china-projector-museum', 'sh-film-park'],
        keywords: ['影视基地', '电影科技', '文旅', '展示消费'],
      },
      {
        title: '民间收藏空间：被制度化博物馆忽略的技术线索',
        subtitle: '民间收藏馆保存了大量放映机、收音机、胶片和地方放映记忆。',
        researchQuestion: '民间收藏如何补足正式电影博物馆对基层放映技术和日常观影经验的缺席？',
        museumIds: ['daqi-radio-film-museum', 'shanxi-media-museum', 'changshu-ruidian-film-archive', 'jiujin-film-collection', 'old-time-av-exhibition'],
        keywords: ['民间收藏', '基层放映', '地方技术史', '非国有博物馆'],
      },
    ],
    content: `将中国电影展示空间标注在地图上，一幅有趣的文化地理图景便浮现出来。

**北京——政治与文化中心**。北京集中了中国电影博物馆和中国电影资料馆两个国家级机构，体现了首都作为文化中心的集聚效应。这两个空间分别代表了电影展示的两种取向：面向公众的科普教育与面向学术的档案研究。

**上海——产业重镇与海派文化**。作为中国电影的发祥地，上海的电影展示空间呈现出多元化的特征。上海电影博物馆侧重于城市电影史的叙述，而上海影视乐园则通过空间复原的方式让人们"进入"电影场景。

**长春与西安——工业遗产的转型**。长影和西影是中国电影工业的两大老基地，它们的博物馆化转型代表了工业遗产保护与文化产业开发的结合。两个空间都充分利用了原有的厂区建筑和生产设备，创造出独特的"原址博物馆"体验。

**香港与广州——粤港澳大湾区的电影文化**。香港电影资料馆和珠影电影博物馆分别代表了粤语电影文化的两个面向：国际化的香港电影和本土化的珠江电影。两者在地理上的接近也暗示了粤港澳大湾区电影文化融合的可能性。

**青岛与重庆——新兴电影城市**。作为联合国教科文组织授予的"电影之都"，青岛的电影博物馆聚焦于电影科技。而重庆则凭借其独特的城市景观成为新兴的"电影取景地"，其博物馆展示的正是城市与电影的互动关系。

总的来看，中国电影展示空间的地理分布呈现出一线城市集中、老工业基地转型、新兴城市跟进的特点，反映了中国电影产业从中心化向多极化发展的趋势。`,
  },
  {
    id: 'film-tech-exhibition',
    title: '电影技术遗产的展陈方式',
    subtitle: '从手摇放映机到虚拟制片——技术物如何讲述电影史',
    summary:
      '电影本质上是一门技术驱动的艺术。从手摇放映机到数字摄影机，从胶片洗印到虚拟制片，技术物不仅是电影生产的工具，更是电影史的物质见证。本条展线考察不同博物馆如何展示电影技术遗产，以及技术物在其中扮演的叙事角色。',
    museums: [
      'cn-film-museum',
      'xi-film-museum',
      'qd-film-museum',
      'china-film-archive',
      'sh-film-park',
      'bfa-film-museum',
    ],
    chapters: [
      {
        title: '器物陈列：摄影机、放映机与胶片',
        subtitle: '以技术设备作为电影史的物质证据。',
        researchQuestion: '摄影机、放映机和胶片在展厅中如何从工具转化为可被解释的遗产？',
        museumIds: ['cn-film-museum', 'xi-film-museum', 'china-projector-museum', 'yancheng-film-projector-hall'],
        keywords: ['摄影机', '放映机', '胶片', '器物陈列'],
      },
      {
        title: '场景复原：片场、影院与工作间',
        subtitle: '通过空间复原让观众进入电影生产与观看的历史现场。',
        researchQuestion: '场景复原是在还原历史，还是在制造一种可体验的电影记忆？',
        museumIds: ['cc-film-museum', 'sh-film-park', 'cn-film-museum', 'sh-film-museum'],
        keywords: ['场景复原', '摄影棚', '影院空间', '工作间'],
      },
      {
        title: '互动体验：配音、绿幕与虚拟拍摄',
        subtitle: '观众通过操作界面进入电影技术过程。',
        researchQuestion: '互动体验能否帮助观众理解电影技术，还是仅仅强化娱乐化参与？',
        museumIds: ['cn-film-museum', 'qd-film-museum', 'xi-film-museum', 'bfa-film-museum'],
        keywords: ['互动装置', '配音', '绿幕', '虚拟拍摄'],
      },
      {
        title: '技术谱系：从机械电影到数字影像',
        subtitle: '用时间轴和设备序列解释电影技术的连续演进。',
        researchQuestion: '技术谱系式展陈如何处理“进步叙事”和被遗忘技术之间的关系？',
        museumIds: ['cn-film-museum', 'qd-film-museum', 'hk-film-archive', 'tfai'],
        keywords: ['技术谱系', '机械电影', '数字影像', '修复'],
      },
      {
        title: '幕后工艺：声音、剪辑、洗印与特效',
        subtitle: '把电影生产中不可见的劳动和工艺带入展厅。',
        researchQuestion: '幕后工艺展示如何改变观众对电影作者、技术劳动和工业流程的理解？',
        museumIds: ['cc-film-museum', 'zhu-film-museum', 'emei-film-studio', 'sh-film-park'],
        keywords: ['剪辑', '录音', '洗印', '幕后工艺'],
      },
    ],
    content: `技术物在电影博物馆中占据着特殊的地位。它们既是展品，又是工具；既是历史的见证，也是叙事的媒介。不同的博物馆对技术遗产的展陈方式各有侧重，反映了不同的策展理念和资源条件。

**类型一：技术谱系式陈列**。以中国电影博物馆和西影电影博物馆为代表，将摄影机、放映机、镜头等设备按照技术演进的时间序列排列，形成清晰的技术谱系。这种陈列方式强调技术进步的逻辑，让观众直观地感受到电影技术从机械到电子、从模拟到数字的演变轨迹。西影的"摄影机矩阵"便是这一类型的极致表达——上百台设备排列成墙，视觉震撼的同时也传达出技术累积的历史厚度。

**类型二：原址工作场景展示**。以长影旧址博物馆为代表，将技术物放置在原来的工作环境中展示。剪辑台放在剪辑车间里，摄影机架在摄影棚中，录音设备放在录音棚内——技术物不是孤立的展品，而是整体工作场景的一部分。这种展陈方式让观众理解技术物在实际生产中的功能和语境。

**类型三：互动体验式展示**。以青岛电影博物馆为代表，强调观众的操作和参与。早期的光学玩具（如走马盘、活动视镜）可以让观众动手操作，当代的VR和虚拟制片设备则提供了沉浸式的体验。互动展示将技术从"观看的对象"转变为"体验的媒介"，极大地缩短了观众与技术物之间的距离。

**类型四：幕后揭秘式展示**。以上海影视乐园为代表，通过展示特效化妆、特技制作、声效拟音等幕后工艺，揭示电影技术的神秘面纱。这种展陈方式满足了观众对"电影魔法"背后机制的好奇心，具有极强的娱乐性和教育性。

不同类型的展陈方式并非互相排斥，优秀的博物馆往往综合运用多种策略，根据展品特性和叙事需要灵活切换。`,
  },
];

export function getExhibitionRouteById(id: string): ExhibitionRoute | undefined {
  return exhibitionRoutes.find((r) => r.id === id);
}

export function getAllExhibitionRoutes(): ExhibitionRoute[] {
  return exhibitionRoutes;
}
