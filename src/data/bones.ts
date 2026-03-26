export interface Root {
  root: string;
  meaning: string;
  suffix?: string;
}

export interface BoneVocabulary {
  id: string;
  english: string;
  chinese: string;
  pronunciation: string;
  roots: Root[];
  relatedTerms: { english: string; chinese: string }[];
  region: 'skull' | 'spine' | 'thorax' | 'upper_limb' | 'lower_limb' | 'pelvis';
  position: [number, number, number];
}

export const bonesData: BoneVocabulary[] = [
  // ========== SKULL (颅骨) ==========
  {
    id: 'cranium',
    english: 'Cranium',
    chinese: '颅盖',
    pronunciation: '/ˈkreɪniəm/',
    roots: [
      { root: 'crani-', meaning: '颅、头' },
      { root: '-um', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Craniotomy', chinese: '颅骨切开术' },
      { english: 'Craniosynostosis', chinese: '颅缝早闭' },
    ],
    region: 'skull',
    position: [0, 2.25, 0],
  },
  {
    id: 'frontal-bone',
    english: 'Frontal Bone',
    chinese: '额骨',
    pronunciation: '/ˈfrʌntl buːn/',
    roots: [
      { root: 'front-', meaning: '前、前部' },
      { root: '-al', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Frontal lobe', chinese: '额叶' },
      { english: 'Frontal sinus', chinese: '额窦' },
    ],
    region: 'skull',
    position: [0, 2.35, 0.08],
  },
  {
    id: 'parietal-bone',
    english: 'Parietal Bone',
    chinese: '顶骨',
    pronunciation: '/pəˈraɪətl buːn/',
    roots: [
      { root: 'pariet-', meaning: '墙、顶' },
      { root: '-al', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Parietal lobe', chinese: '顶叶' },
      { english: 'Parietal bone fracture', chinese: '顶骨骨折' },
    ],
    region: 'skull',
    position: [0.12, 2.3, 0],
  },
  {
    id: 'temporal-bone',
    english: 'Temporal Bone',
    chinese: '颞骨',
    pronunciation: '/ˈtempərəl buːn/',
    roots: [
      { root: 'tempor-', meaning: '时间、颞部' },
      { root: '-al', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Temporal fossa', chinese: '颞窝' },
      { english: 'Temporal bone fracture', chinese: '颞骨骨折' },
    ],
    region: 'skull',
    position: [0.15, 2.1, 0.08],
  },
  {
    id: 'occipital-bone',
    english: 'Occipital Bone',
    chinese: '枕骨',
    pronunciation: '/ɒkˈsɪpɪtl buːn/',
    roots: [
      { root: 'occipit-', meaning: '枕部' },
      { root: '-al', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Occipital lobe', chinese: '枕叶' },
      { english: 'Foramen magnum', chinese: '枕骨大孔' },
    ],
    region: 'skull',
    position: [0, 2.05, -0.1],
  },
  {
    id: 'sphenoid-bone',
    english: 'Sphenoid Bone',
    chinese: '蝶骨',
    pronunciation: '/ˈsfiːnɔɪd buːn/',
    roots: [
      { root: 'sphen-', meaning: '楔形' },
      { root: '-oid', meaning: '似...的' },
    ],
    relatedTerms: [
      { english: 'Sella turcica', chinese: '蝶鞍' },
      { english: 'Sphenoid sinus', chinese: '蝶窦' },
    ],
    region: 'skull',
    position: [0, 2.15, 0],
  },
  {
    id: 'ethmoid-bone',
    english: 'Ethmoid Bone',
    chinese: '筛骨',
    pronunciation: '/ˈeθmɔɪd buːn/',
    roots: [
      { root: 'ethm-', meaning: '筛子' },
      { root: '-oid', meaning: '似...的' },
    ],
    relatedTerms: [
      { english: 'Ethmoid sinus', chinese: '筛窦' },
      { english: 'Cribriform plate', chinese: '筛板' },
    ],
    region: 'skull',
    position: [0, 2.2, 0.1],
  },
  {
    id: 'mandible',
    english: 'Mandible',
    chinese: '下颌骨',
    pronunciation: '/ˈmændɪbl/',
    roots: [
      { root: 'mand-', meaning: '下颌' },
      { root: '-ible', meaning: '可...的' },
    ],
    relatedTerms: [
      { english: 'Mandibular nerve', chinese: '下颌神经' },
      { english: 'Mandibular angle', chinese: '下颌角' },
    ],
    region: 'skull',
    position: [0, 1.85, 0.1],
  },
  {
    id: 'maxilla',
    english: 'Maxilla',
    chinese: '上颌骨',
    pronunciation: '/mækˈsɪlə/',
    roots: [
      { root: 'maxill-', meaning: '上颌' },
      { root: '-a', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Maxillary sinus', chinese: '上颌窦' },
      { english: 'Alveolar process', chinese: '牙槽突' },
    ],
    region: 'skull',
    position: [0.08, 1.95, 0.12],
  },
  {
    id: 'nasal-bone',
    english: 'Nasal Bone',
    chinese: '鼻骨',
    pronunciation: '/ˈneɪzl buːn/',
    roots: [
      { root: 'nas-', meaning: '鼻' },
      { root: '-al', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Nasal septum', chinese: '鼻中隔' },
      { english: 'Rhinoplasty', chinese: '鼻整形术' },
    ],
    region: 'skull',
    position: [0.03, 2.15, 0.15],
  },
  {
    id: 'zygomatic-bone',
    english: 'Zygomatic Bone',
    chinese: '颧骨',
    pronunciation: '/zaɪɡəˈmætɪk buːn/',
    roots: [
      { root: 'zygomat-', meaning: '颧骨' },
      { root: '-ic', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Zygomatic arch', chinese: '颧弓' },
      { english: 'Cheekbone', chinese: '颧骨' },
    ],
    region: 'skull',
    position: [0.12, 2.0, 0.12],
  },
  {
    id: 'hyoid',
    english: 'Hyoid Bone',
    chinese: '舌骨',
    pronunciation: '/ˈhaɪɔɪd buːn/',
    roots: [
      { root: 'hy-', meaning: '舌骨' },
      { root: '-oid', meaning: '似...的' },
    ],
    relatedTerms: [
      { english: 'Hyoid bone fracture', chinese: '舌骨骨折' },
      { english: 'Thyrohyoid membrane', chinese: '甲状舌骨膜' },
    ],
    region: 'skull',
    position: [0, 1.75, 0.08],
  },

  // ========== SPINE (脊柱) ==========
  {
    id: 'cervical-vertebra-c1',
    english: 'Atlas (C1)',
    chinese: '寰椎',
    pronunciation: '/ˈætləs/',
    roots: [
      { root: 'atlas', meaning: '寰椎（希腊神话）' },
    ],
    relatedTerms: [
      { english: 'Atlantoaxial joint', chinese: '寰枢关节' },
      { english: 'Cervical vertebrae', chinese: '颈椎' },
    ],
    region: 'spine',
    position: [0, 1.75, -0.08],
  },
  {
    id: 'cervical-vertebra-c2',
    english: 'Axis (C2)',
    chinese: '枢椎',
    pronunciation: '/ˈæksɪs/',
    roots: [
      { root: 'ax-', meaning: '轴' },
      { root: '-is', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Dens', chinese: '齿突' },
      { english: 'Atlantoaxial dislocation', chinese: '寰枢椎脱位' },
    ],
    region: 'spine',
    position: [0, 1.7, -0.08],
  },
  {
    id: 'cervical-vertebrae',
    english: 'Cervical Vertebrae (C3-C7)',
    chinese: '颈椎（C3-C7）',
    pronunciation: '/ˈsɜːvɪkl ˈvɜːtɪbriː/',
    roots: [
      { root: 'cervic-', meaning: '颈' },
      { root: 'vertebr-', meaning: '椎骨' },
    ],
    relatedTerms: [
      { english: 'Cervical spine', chinese: '颈椎' },
      { english: 'Cervical spondylosis', chinese: '颈椎病' },
    ],
    region: 'spine',
    position: [0, 1.55, -0.1],
  },
  {
    id: 'thoracic-vertebrae',
    english: 'Thoracic Vertebrae (T1-T12)',
    chinese: '胸椎（T1-T12）',
    pronunciation: '/θəˈræsɪk ˈvɜːtɪbriː/',
    roots: [
      { root: 'thorac-', meaning: '胸' },
      { root: '-ic', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Thoracic spine', chinese: '胸椎' },
      { english: 'Thoracic vertebrae T1-T12', chinese: '胸1-胸12椎' },
    ],
    region: 'spine',
    position: [0, 1.15, -0.1],
  },
  {
    id: 'lumbar-vertebrae',
    english: 'Lumbar Vertebrae (L1-L5)',
    chinese: '腰椎（L1-L5）',
    pronunciation: '/ˈlʌmbər ˈvɜːtɪbriː/',
    roots: [
      { root: 'lumb-', meaning: '腰' },
      { root: '-ar', meaning: '形容词后缀' },
    ],
    relatedTerms: [
      { english: 'Lumbar spine', chinese: '腰椎' },
      { english: 'Lumbar disc herniation', chinese: '腰椎间盘突出' },
    ],
    region: 'spine',
    position: [0, 0.6, -0.1],
  },
  {
    id: 'sacrum',
    english: 'Sacrum',
    chinese: '骶骨',
    pronunciation: '/ˈseɪkrəm/',
    roots: [
      { root: 'sacr-', meaning: '骶骨' },
      { root: '-um', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Sacral vertebrae', chinese: '骶椎' },
      { english: 'Sacrum fracture', chinese: '骶骨骨折' },
    ],
    region: 'spine',
    position: [0, 0.25, -0.08],
  },

  // ========== THORAX (胸廓) ==========
  {
    id: 'sternum-manubrium',
    english: 'Manubrium',
    chinese: '胸骨柄',
    pronunciation: '/məˈnjuːbriəm/',
    roots: [
      { root: 'manubri-', meaning: '柄、手柄' },
      { root: '-um', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Sternal angle', chinese: '胸骨角' },
      { english: 'Manubriosternal joint', chinese: '胸柄关节' },
    ],
    region: 'thorax',
    position: [0, 1.15, 0.18],
  },
  {
    id: 'sternum-body',
    english: 'Sternum Body',
    chinese: '胸骨体',
    pronunciation: '/ˈstɜːnəm ˈbɒdi/',
    roots: [
      { root: 'stern-', meaning: '胸骨' },
    ],
    relatedTerms: [
      { english: 'Sternal body', chinese: '胸骨体' },
      { english: 'Sternal fracture', chinese: '胸骨骨折' },
    ],
    region: 'thorax',
    position: [0, 1.0, 0.18],
  },
  {
    id: 'xiphoid-process',
    english: 'Xiphoid Process',
    chinese: '剑突',
    pronunciation: '/ˈzɪfɔɪd ˈprəʊses/',
    roots: [
      { root: 'xiph-', meaning: '剑' },
      { root: '-oid', meaning: '似...的' },
    ],
    relatedTerms: [
      { english: 'Xiphoid cartilage', chinese: '剑突软骨' },
      { english: 'Epigastric region', chinese: '上腹部' },
    ],
    region: 'thorax',
    position: [0, 0.85, 0.16],
  },
  {
    id: 'ribs-true',
    english: 'True Ribs (1-7)',
    chinese: '真肋（1-7）',
    pronunciation: '/truː rɪbz/',
    roots: [
      { root: 'cost-', meaning: '肋骨' },
    ],
    relatedTerms: [
      { english: 'True ribs', chinese: '真肋' },
      { english: 'Costal cartilage', chinese: '肋软骨' },
    ],
    region: 'thorax',
    position: [0.2, 1.1, 0.1],
  },
  {
    id: 'ribs-false',
    english: 'False Ribs (8-10)',
    chinese: '假肋（8-10）',
    pronunciation: '/fɔːls rɪbz/',
    roots: [
      { root: 'cost-', meaning: '肋骨' },
    ],
    relatedTerms: [
      { english: 'False ribs', chinese: '假肋' },
      { english: 'Costal margin', chinese: '肋弓' },
    ],
    region: 'thorax',
    position: [0.28, 0.85, 0.08],
  },
  {
    id: 'ribs-floating',
    english: 'Floating Ribs (11-12)',
    chinese: '浮肋（11-12）',
    pronunciation: '/ˈfləʊɪŋ rɪbz/',
    roots: [
      { root: 'cost-', meaning: '肋骨' },
    ],
    relatedTerms: [
      { english: 'Floating ribs', chinese: '浮肋' },
      { english: 'Rib fracture', chinese: '肋骨骨折' },
    ],
    region: 'thorax',
    position: [0.32, 0.65, 0.05],
  },

  // ========== PELVIS (骨盆) ==========
  {
    id: 'ilium',
    english: 'Ilium',
    chinese: '髂骨',
    pronunciation: '/ˈɪliəm/',
    roots: [
      { root: 'ili-', meaning: '髂骨' },
      { root: '-um', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Iliac crest', chinese: '髂嵴' },
      { english: 'Iliac fossa', chinese: '髂窝' },
    ],
    region: 'pelvis',
    position: [0.2, 0.4, 0],
  },
  {
    id: 'ischium',
    english: 'Ischium',
    chinese: '坐骨',
    pronunciation: '/ˈɪskiəm/',
    roots: [
      { root: 'isch-', meaning: '坐骨' },
      { root: '-ium', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Ischial tuberosity', chinese: '坐骨结节' },
      { english: 'Ischiopubic ramus', chinese: '坐骨耻骨支' },
    ],
    region: 'pelvis',
    position: [0.18, 0.2, 0.02],
  },
  {
    id: 'pubis',
    english: 'Pubis',
    chinese: '耻骨',
    pronunciation: '/ˈpjuːbɪs/',
    roots: [
      { root: 'pub-', meaning: '耻骨' },
      { root: '-is', meaning: '名词后缀' },
    ],
    relatedTerms: [
      { english: 'Pubic symphysis', chinese: '耻骨联合' },
      { english: 'Pubic bone', chinese: '耻骨' },
    ],
    region: 'pelvis',
    position: [0.12, 0.22, 0.05],
  },

  // ========== UPPER LIMB (上肢) ==========
  {
    id: 'clavicle',
    english: 'Clavicle',
    chinese: '锁骨',
    pronunciation: '/ˈklævɪkl/',
    roots: [
      { root: 'clavicul-', meaning: '锁骨' },
    ],
    relatedTerms: [
      { english: 'Acromioclavicular joint', chinese: '肩锁关节' },
      { english: 'Clavicle fracture', chinese: '锁骨骨折' },
    ],
    region: 'upper_limb',
    position: [0.35, 1.35, 0.1],
  },
  {
    id: 'scapula',
    english: 'Scapula',
    chinese: '肩胛骨',
    pronunciation: '/ˈskæpjʊlə/',
    roots: [
      { root: 'scapul-', meaning: '肩胛' },
    ],
    relatedTerms: [
      { english: 'Spine of scapula', chinese: '肩胛冈' },
      { english: 'Acromion', chinese: '肩峰' },
    ],
    region: 'upper_limb',
    position: [0.4, 1.25, -0.05],
  },
  {
    id: 'humerus',
    english: 'Humerus',
    chinese: '肱骨',
    pronunciation: '/ˈhjuːmərəs/',
    roots: [
      { root: 'humer-', meaning: '肱骨' },
    ],
    relatedTerms: [
      { english: 'Humeral head', chinese: '肱骨头' },
      { english: 'Humeral shaft', chinese: '肱骨体' },
    ],
    region: 'upper_limb',
    position: [0.55, 1.05, 0],
  },
  {
    id: 'radius',
    english: 'Radius',
    chinese: '桡骨',
    pronunciation: '/ˈreɪdiəs/',
    roots: [
      { root: 'radi-', meaning: '桡骨、辐射' },
    ],
    relatedTerms: [
      { english: 'Radial head', chinese: '桡骨头' },
      { english: 'Radial styloid process', chinese: '桡骨茎突' },
    ],
    region: 'upper_limb',
    position: [0.65, 0.65, 0.04],
  },
  {
    id: 'ulna',
    english: 'Ulna',
    chinese: '尺骨',
    pronunciation: '/ˈʌlnə/',
    roots: [
      { root: 'uln-', meaning: '尺骨' },
    ],
    relatedTerms: [
      { english: 'Olecranon', chinese: '鹰嘴' },
      { english: 'Ulnar notch', chinese: '尺切迹' },
    ],
    region: 'upper_limb',
    position: [0.6, 0.65, -0.04],
  },
  {
    id: 'carpals',
    english: 'Carpal Bones',
    chinese: '腕骨',
    pronunciation: '/ˈkɑːpəl buːnz/',
    roots: [
      { root: 'carp-', meaning: '腕' },
    ],
    relatedTerms: [
      { english: 'Scaphoid', chinese: '舟骨' },
      { english: 'Lunate', chinese: '月骨' },
      { english: 'Triquetrum', chinese: '三角骨' },
      { english: 'Pisiform', chinese: '豌豆骨' },
      { english: 'Trapezium', chinese: '大多角骨' },
      { english: 'Trapezoid', chinese: '小多角骨' },
      { english: 'Capitate', chinese: '头状骨' },
      { english: 'Hamate', chinese: '钩骨' },
    ],
    region: 'upper_limb',
    position: [0.68, 0.35, 0],
  },
  {
    id: 'metacarpals',
    english: 'Metacarpal Bones',
    chinese: '掌骨',
    pronunciation: '/ˌmetəˈkɑːpəl buːnz/',
    roots: [
      { root: 'meta-', meaning: '变化、超过' },
      { root: 'carp-', meaning: '腕' },
    ],
    relatedTerms: [
      { english: 'Metacarpal bones', chinese: '掌骨' },
      { english: 'Metacarpal fracture', chinese: '掌骨骨折' },
    ],
    region: 'upper_limb',
    position: [0.7, 0.22, 0],
  },
  {
    id: 'phalanges-hand',
    english: 'Phalanges (Hand)',
    chinese: '指骨（手）',
    pronunciation: '/fəˈlændʒiːz/',
    roots: [
      { root: 'phalang-', meaning: '指（趾）骨' },
    ],
    relatedTerms: [
      { english: 'Proximal phalanx', chinese: '近节指骨' },
      { english: 'Middle phalanx', chinese: '中节指骨' },
      { english: 'Distal phalanx', chinese: '远节指骨' },
    ],
    region: 'upper_limb',
    position: [0.72, 0.1, 0],
  },

  // ========== LOWER LIMB (下肢) ==========
  {
    id: 'femur',
    english: 'Femur',
    chinese: '股骨',
    pronunciation: '/ˈfiːmə/',
    roots: [
      { root: 'femor-', meaning: '股骨' },
    ],
    relatedTerms: [
      { english: 'Femoral head', chinese: '股骨头' },
      { english: 'Femoral neck', chinese: '股骨颈' },
      { english: 'Femoral shaft', chinese: '股骨干' },
    ],
    region: 'lower_limb',
    position: [0.2, -0.05, 0],
  },
  {
    id: 'patella',
    english: 'Patella',
    chinese: '髌骨',
    pronunciation: '/pəˈtelə/',
    roots: [
      { root: 'patell-', meaning: '髌骨' },
    ],
    relatedTerms: [
      { english: 'Patellar ligament', chinese: '髌韧带' },
      { english: 'Patellar fracture', chinese: '髌骨骨折' },
    ],
    region: 'lower_limb',
    position: [0.2, -0.38, 0.08],
  },
  {
    id: 'tibia',
    english: 'Tibia',
    chinese: '胫骨',
    pronunciation: '/ˈtɪbiə/',
    roots: [
      { root: 'tibi-', meaning: '胫骨' },
    ],
    relatedTerms: [
      { english: 'Tibial plateau', chinese: '胫骨平台' },
      { english: 'Tibial shaft', chinese: '胫骨体' },
      { english: 'Medial malleolus', chinese: '内踝' },
    ],
    region: 'lower_limb',
    position: [0.2, -0.68, 0.04],
  },
  {
    id: 'fibula',
    english: 'Fibula',
    chinese: '腓骨',
    pronunciation: '/ˈfɪbjʊlə/',
    roots: [
      { root: 'fibul-', meaning: '腓骨' },
    ],
    relatedTerms: [
      { english: 'Lateral malleolus', chinese: '外踝' },
      { english: 'Fibular head', chinese: '腓骨头' },
    ],
    region: 'lower_limb',
    position: [0.28, -0.68, -0.04],
  },
  {
    id: 'tarsals',
    english: 'Tarsal Bones',
    chinese: '跗骨',
    pronunciation: '/ˈtɑːsəl buːnz/',
    roots: [
      { root: 'tars-', meaning: '跗' },
    ],
    relatedTerms: [
      { english: 'Calcaneus', chinese: '跟骨' },
      { english: 'Talus', chinese: '距骨' },
      { english: 'Navicular', chinese: '舟骨' },
      { english: 'Cuboid', chinese: '骰骨' },
      { english: 'Cuneiforms', chinese: '楔骨' },
    ],
    region: 'lower_limb',
    position: [0.2, -1.1, 0],
  },
  {
    id: 'metatarsals',
    english: 'Metatarsal Bones',
    chinese: '跖骨',
    pronunciation: '/ˌmetəˈtɑːsəl buːnz/',
    roots: [
      { root: 'meta-', meaning: '变化、超过' },
      { root: 'tars-', meaning: '跗' },
    ],
    relatedTerms: [
      { english: 'Metatarsal bones', chinese: '跖骨' },
      { english: 'Metatarsal fracture', chinese: '跖骨骨折' },
    ],
    region: 'lower_limb',
    position: [0.2, -1.35, 0],
  },
  {
    id: 'phalanges-foot',
    english: 'Phalanges (Foot)',
    chinese: '趾骨（足）',
    pronunciation: '/fəˈlændʒiːz/',
    roots: [
      { root: 'phalang-', meaning: '指（趾）骨' },
    ],
    relatedTerms: [
      { english: 'Hallux', chinese: '拇趾' },
      { english: 'Phalanges of foot', chinese: '足趾骨' },
    ],
    region: 'lower_limb',
    position: [0.2, -1.55, 0],
  },
];

export const bodySystems = [
  { id: 'skeletal', name: '骨骼系统', english: 'Skeletal System', icon: '🦴' },
  { id: 'muscular', name: '肌肉系统', english: 'Muscular System', icon: '💪' },
  { id: 'nervous', name: '神经系统', english: 'Nervous System', icon: '🧠' },
  { id: 'cardiovascular', name: '心血管系统', english: 'Cardiovascular System', icon: '❤️' },
  { id: 'respiratory', name: '呼吸系统', english: 'Respiratory System', icon: '🫁' },
  { id: 'digestive', name: '消化系统', english: 'Digestive System', icon: '🍽️' },
];
