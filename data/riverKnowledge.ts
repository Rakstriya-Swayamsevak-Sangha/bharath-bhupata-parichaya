export interface RiverKnowledge {
  id: string;
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  facts: {
    length: string;
    origin: string;
    mouth?: string;
    confluence?: string;
    tributaries: string;
  };
  flow: {
    en: string;
    kn: string;
    hi: string;
  };
  description: {
    en: string;
    kn: string;
    hi: string;
  };
  cultural: {
    en: string;
    kn: string;
    hi: string;
  };
  image: string;
}

export const riverKnowledge: Record<string, RiverKnowledge> = {
  sindhu: {
    id: "sindhu",
    title: { en: "Sindhu", kn: "ಸಿಂಧು", hi: "सिंधु" },
    facts: {
      length: "3,180 km",
      origin: "Tibetan Plateau",
      mouth: "Arabian Sea",
      tributaries: "Jhelum • Chenab • Ravi • Beas • Sutlej"
    },
    flow: {
      en: "Tibet → Ladakh → Punjab → Arabian Sea",
      kn: "ತಿಬೆಟ್ → ಲಡಾಖ್ → ಪಂಜಾಬ್ → ಅರಬ್ಬಿ ಸಮುದ್ರ",
      hi: "तिब्बत → लद्दाख → पंजाब → अरब सागर"
    },
    description: {
      en: "The Sindhu River originates in the Tibetan Plateau and flows through Ladakh into the plains of Punjab before emptying into the Arabian Sea. It is one of the longest rivers in Asia and has shaped the geography of northwestern Bharat for thousands of years.",
      kn: "ಸಿಂಧು ನದಿ ತಿಬೆಟ್ ಪೀಠಭೂಮಿಯಲ್ಲಿ ಉಗಮವಾಗಿ ಲಡಾಖ್ ಮೂಲಕ ಹರಿದು ಪಂಜಾಬ್ ಸಮತಟ್ಟು ಪ್ರದೇಶದಲ್ಲಿ ಹರಿದು ಕೊನೆಗೆ ಅರಬ್ಬಿ ಸಮುದ್ರದಲ್ಲಿ ಸೇರುತ್ತದೆ. ಇದು ಏಷ್ಯಾದ ಪ್ರಮುಖ ನದಿಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು, ವಾಯುವ್ಯ ಭಾರತದ ಭೂಗೋಳವನ್ನು ರೂಪಿಸಿದೆ.",
      hi: "सिंधु नदी तिब्बती पठार से निकलकर लद्दाख और पंजाब के मैदानों से होकर अरब सागर में मिलती है। यह एशिया की प्रमुख नदियों में से एक है और हजारों वर्षों से उत्तर-पश्चिमी भारत के भूगोल को आकार दे रही है।"
    },
    cultural: {
      en: "The Sindhu River is the foundation of the Indus Valley Civilization, one of the oldest urban cultures in the world. It gave rise to early cities, trade systems, and cultural identity. The very name \"India\" is derived from Sindhu, reflecting its deep historical significance.",
      kn: "ಸಿಂಧು ನದಿ ಪ್ರಪಂಚದ ಅತ್ಯಂತ ಹಳೆಯ ನಾಗರಿಕತೆಯಾದ ಸಿಂಧು ನಾಗರಿಕತೆಯ ಮೂಲವಾಗಿದೆ. ಇದು ಆರಂಭಿಕ ನಗರಗಳು, ವ್ಯಾಪಾರ ವ್ಯವಸ್ಥೆಗಳು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಗುರುತನ್ನು ನೀಡಿದೆ. \"ಇಂಡಿಯಾ\" ಎಂಬ ಹೆಸರು ಕೂಡ ಸಿಂಧು ಎಂಬ ಪದದಿಂದಲೇ ಬಂದದ್ದಾಗಿದೆ.",
      hi: "सिंधु नदी विश्व की प्राचीनतम सभ्यताओं में से एक, सिंधु घाटी सभ्यता का आधार रही है। इसने प्रारंभिक नगरों, व्यापार प्रणालियों और सांस्कृतिक पहचान को जन्म दिया। \"इंडिया\" नाम भी सिंधु से ही निकला है, जो इसके गहरे ऐतिहासिक महत्व को दर्शाता है।"
    },
    image: "/place-images/rivers/sindhu.jpg"
  },
  ganga: {
    id: "ganga",
    title: { en: "Ganga", kn: "ಗಂಗಾ", hi: "गंगा" },
    facts: {
      length: "2,525 km",
      origin: "Gangotri Glacier",
      mouth: "Bay of Bengal",
      tributaries: "Yamuna • Gandaki • Kosi • Son"
    },
    flow: {
      en: "Himalaya → North Plains → Bay of Bengal",
      kn: "ಹಿಮಾಲಯ → ಉತ್ತರ ಸಮತಟ್ಟು → ಬೆಂಗಾಳ ಕೊಲ್ಲಿ",
      hi: "हिमालय → उत्तरी मैदान → बंगाल की खाड़ी"
    },
    description: {
      en: "The Ganga originates from the Gangotri Glacier in the Himalaya and flows across the fertile plains of northern Bharat before emptying into the Bay of Bengal. It is one of the most important river systems in the world, supporting agriculture, ecosystems, and dense populations across its basin.",
      kn: "ಗಂಗಾ ನದಿ ಹಿಮಾಲಯದ ಗಂಗೋತ್ರಿ ಹಿಮನದಿಯಿಂದ ಉಗಮವಾಗಿ ಉತ್ತರ ಭಾರತದ ಸಮತಟ್ಟು ಪ್ರದೇಶಗಳಲ್ಲಿ ಹರಿದು ಕೊನೆಗೆ ಬೆಂಗಾಳ ಕೊಲ್ಲಿಯನ್ನು ಸೇರುತ್ತದೆ. ಇದು ಕೃಷಿ ಮತ್ತು ಭೂಚಕ್ರದ ಸಮತೋಲನಕ್ಕೆ ಅತ್ಯಂತ ಪ್ರಮುಖವಾಗಿದೆ.",
      hi: "गंगा नदी हिमालय के गंगोत्री हिमनद से निकलकर उत्तर भारत के मैदानों से होकर बंगाल की खाड़ी में मिलती है। यह विश्व की सबसे महत्वपूर्ण नदी प्रणालियों में से एक है, जो अपने बेसिन में कृषि और पारिस्थितिकी तंत्र का पोषण करती है।"
    },
    cultural: {
      en: "The Ganga is revered as a sacred river in Indian civilization and is personified as the goddess Ganga. It is central to rituals, pilgrimages, and spiritual practices. Cities like Varanasi and Prayag have flourished along its banks for millennia. The river represents purity, life, and liberation (moksha) in Hindu philosophy.",
      kn: "ಗಂಗಾ ನದಿಯನ್ನು ಭಾರತೀಯ ನಾಗರಿಕತೆಯಲ್ಲಿ ಪವಿತ್ರ ನದಿಯಾಗಿ ಪೂಜಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಗಂಗಾ ದೇವಿಯ ರೂಪವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. ಕಾಶಿ ಮತ್ತು ಪ್ರಯಾಗದಂತಹ ನಗರಗಳು ಇದರ ದಡದಲ್ಲಿ ಸಾವಿರಾರು ವರ್ಷಗಳಿಂದ ಅಭಿವೃದ್ಧಿ ಹೊಂದಿವೆ. ಈ ನದಿಯು ಶುದ್ಧತೆ ಮತ್ತು ಮೋಕ್ಷದ ಸಂಕೇತವಾಗಿದೆ.",
      hi: "गंगा नदी को भारतीय सभ्यता में एक अत्यंत पवित्र नदी के रूप में पूजा जाता है और इसे देवी गंगा के रूप में माना जाता है। यह अनुष्ठानों, तीर्थयात्राओं और आध्यात्मिक अभ्यासों का केंद्र है। वाराणसी और प्रयाग जैसे शहर सदियों से इसके तट पर फले-फूले हैं।"
    },
    image: "/place-images/rivers/ganga.jpg"
  },
  saraswati: {
    id: "saraswati",
    title: { en: "Saraswati", kn: "ಸರಸ್ವತಿ", hi: "सरस्वती" },
    facts: {
      length: "Estimated ~1,500 km",
      origin: "Himalayan region (theoretical)",
      mouth: "Rann of Kutch (hypothesized)",
      tributaries: "Drishadvati (ancient reference)"
    },
    flow: {
      en: "Himalaya → Haryana → Rajasthan → Rann of Kutch",
      kn: "ಹಿಮಾಲಯ → ಹರಿಯಾಣ → ರಾಜಸ್ಥಾನ → ಕಚ್ ಪ್ರದೇಶ",
      hi: "हिमालय → हरियाणा → राजस्थान → कच्छ"
    },
    description: {
      en: "The Saraswati River is described extensively in the Vedas as a mighty and sacred river. While it is not visible today as a flowing river, geological and satellite studies suggest the existence of an ancient river system flowing through northwestern Bharat. Many dried riverbeds and paleo-channels are believed to correspond to its course.",
      kn: "ಸರಸ್ವತಿ ನದಿ ವೇದಗಳಲ್ಲಿ ಒಂದು ಶಕ್ತಿಯುತ ಮತ್ತು ಪವಿತ್ರ ನದಿಯಾಗಿ ವರ್ಣಿಸಲ್ಪಟ್ಟಿದೆ. ಇಂದು ಇದು ಕಣ್ಣಿಗೆ ಕಾಣಿಸುವ ನದಿಯಾಗಿ ಹರಿಯದಿದ್ದರೂ, ಭೂವೈಜ್ಞಾನಿಕ ಮತ್ತು ಉಪಗ್ರಹ ಸಂಶೋಧನೆಗಳು ವಾಯುವ್ಯ ಭಾರತದಲ್ಲಿ ಹರಿಯುತ್ತಿದ್ದ ಪ್ರಾಚೀನ ನದಿಯ ಅಸ್ತಿತ್ವವನ್ನು ಖಚಿತಪಡಿಸಿವೆ.",
      hi: "सरस्वती नदी का वेदों में एक विशाल और पवित्र नदी के रूप में व्यापक वर्णन मिलता है। यद्यपि आज यह प्रवाहित नदी के रूप में दिखाई नहीं देती, लेकिन भूवैज्ञानिक और उपग्रह अध्ययन उत्तर-पश्चिमी भारत में एक प्राचीन नदी प्रणाली के अस्तित्व का सुझाव देते हैं।"
    },
    cultural: {
      en: "The Saraswati holds immense significance in Vedic literature as a symbol of knowledge, purity, and wisdom. It is associated with the goddess Saraswati, the deity of learning and arts. Many early Vedic settlements are believed to have developed along its banks, making it central to the earliest phases of Indian civilization.",
      kn: "ವೇದ ಸಾಹಿತ್ಯದಲ್ಲಿ ಸರಸ್ವತಿಯು ಜ್ಞಾನ ಮತ್ತು ಬುದ್ಧಿವಂತಿಕೆಯ ಸಂಕೇತವಾಗಿದೆ. ಇದನ್ನು ಕಲೆ ಮತ್ತು ವಿದ್ಯೆಯ ದೇವತೆ ಸರಸ್ವತಿಯೊಂದಿಗೆ ಸಂಯೋಜಿಸಲಾಗಿದೆ. ಆರಂಭಿಕ ವೈದಿಕ ವಸಾಹತುಗಳು ಇದರ ದಡದಲ್ಲಿಯೇ ಬೆಳೆದವೆಂದು ನಂಬಲಾಗಿದ್ದು, ಇದು ಭಾರತೀಯ ನಾಗರಿಕತೆಯ ಅಡಿಪಾಯವಾಗಿದೆ.",
      hi: "वैदिक साहित्य में सरस्वती का ज्ञान, पवित्रता और बुद्धिमत्ता के प्रतीक के रूप में अत्यधिक महत्व है। यह शिक्षा और कला की देवी सरस्वती से जुड़ी हुई है। माना जाता है कि कई प्रारंभिक वैदिक बस्तियाँ इसके तट पर विकसित हुई थीं।"
    },
    image: "/place-images/rivers/saraswati.jpg"
  },
  yamuna: {
    id: "yamuna",
    title: { en: "Yamuna", kn: "ಯಮುನಾ", hi: "यमुना" },
    facts: {
      length: "1,376 km",
      origin: "Yamunotri Glacier",
      confluence: "Prayag (Allahabad)",
      tributaries: "Chambal • Betwa • Ken"
    },
    flow: {
      en: "Himalaya → Delhi → Mathura → Prayag",
      kn: "ಹಿಮಾಲಯ → ದೆಹಲಿ → ಮಥುರಾ → ಪ್ರಯಾಗ",
      hi: "हिमालय → दिल्ली → मथुरा → प्रयाग"
    },
    description: {
      en: "The Yamuna originates from the Yamunotri Glacier in the Himalaya and flows through northern plains, passing major urban and historical centers like Delhi and Mathura. It eventually merges with the Ganga at Prayag, forming one of the most sacred confluences in India. As a major tributary, it significantly contributes to the Ganga river system.",
      kn: "ಯಮುನಾ ನದಿ ಹಿಮಾಲಯದ ಯಮುನೋತ್ರಿ ಹಿಮನದಿಯಿಂದ ಉಗಮವಾಗಿ ದೆಹಲಿ ಮತ್ತು ಮಥುರಾ ಮೂಲಕ ಹರಿದು ಪ್ರಯಾಗದಲ್ಲಿ ಗಂಗೆಯೊಂದಿಗೆ ಸೇರುತ್ತದೆ. ಇದು ಗಂಗೆಯ ಪ್ರಮುಖ ಉಪನದಿಯಾಗಿದೆ.",
      hi: "यमुना नदी हिमालय के यमुनोत्री हिमनद से निकलकर दिल्ली और मथुरा से होकर प्रयाग में गंगा से मिलती है। यह गंगा की प्रमुख सहायक नदी है।"
    },
    cultural: {
      en: "The Yamuna holds deep spiritual significance, especially in relation to Lord Krishna, whose life and legends are closely associated with Mathura and Vrindavan along its banks. The river is also central to the Triveni Sangam at Prayag, where it meets the Ganga and the mythical Saraswati, forming one of the holiest pilgrimage sites in India.",
      kn: "ಯಮುನಾ ನದಿ ಶ್ರೀಕೃಷ್ಣನ ಜೀವನ ಮತ್ತು ಕಥೆಗಳೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿದೆ, ವಿಶೇಷವಾಗಿ ಮಥುರಾ ಮತ್ತು ವೃಂದಾವನ ಪ್ರದೇಶಗಳಲ್ಲಿ. ಪ್ರಯಾಗದಲ್ಲಿ ಗಂಗಾ ಮತ್ತು ಸರಸ್ವತಿಯೊಂದಿಗೆ ಸೇರುವ ತ್ರಿವೇಣಿ ಸಂಗಮವು ಅತ್ಯಂತ ಪವಿತ್ರ ತೀರ್ಥವಾಗಿದೆ.",
      hi: "यमुना नदी भगवान कृष्ण की कथाओं से जुड़ी हुई है, विशेषकर मथुरा और वृंदावन में। प्रयाग में गंगा और सरस्वती के साथ इसका संगम त्रिवेणी संगम कहलाता है, जो अत्यंत पवित्र स्थल है।"
    },
    image: "/place-images/rivers/yamuna.jpg"
  },
  brahmaputra: {
    id: "brahmaputra",
    title: { en: "Brahmaputra", kn: "ಬ್ರಹ್ಮಪುತ್ರ", hi: "ब्रह्मपुत्र" },
    facts: {
      length: "2,900 km",
      origin: "Tibetan Plateau (Yarlung Tsangpo)",
      mouth: "Bay of Bengal",
      tributaries: "Subansiri • Lohit • Dibang"
    },
    flow: {
      en: "Tibet → Arunachal → Assam → Bangladesh",
      kn: "ತಿಬೆಟ್ → ಅರುಣಾಚಲ → ಅಸ್ಸಾಂ → ಬಾಂಗ್ಲಾದೇಶ",
      hi: "तिब्बत → अरुणाचल → असम → बांग्लादेश"
    },
    description: {
      en: "The Brahmaputra originates as the Yarlung Tsangpo in the Tibetan Plateau and enters India through Arunachal Pradesh before flowing across the Assam valley. It is one of the largest and most dynamic rivers in the world, known for its wide braided channels and high sediment load. It eventually merges with the Ganga in Bangladesh before reaching the Bay of Bengal.",
      kn: "ಬ್ರಹ್ಮಪುತ್ರ ನದಿ ತಿಬೆಟ್ನಲ್ಲಿ ಯಾರ್ಲುಂಗ್ ತ್ಸಾಂಗ್ಪೋ ಎಂಬ ಹೆಸರಿನಲ್ಲಿ ಉಗಮವಾಗಿ ಅರುಣಾಚಲ ಪ್ರದೇಶದ ಮೂಲಕ ಭಾರತಕ್ಕೆ ಪ್ರವೇಶಿಸುತ್ತದೆ. ಇದು ಅಸ್ಸಾಂ ಕಣಿವೆಯಲ್ಲಿ ಹರಿದು ನಂತರ ಬಾಂಗ್ಲಾದೇಶದಲ್ಲಿ ಗಂಗೆಯೊಂದಿಗೆ ಸೇರುತ್ತದೆ.",
      hi: "ब्रह्मपुत्र नदी तिब्बत में यारलुंग त्सांगपो के रूप में उत्पन्न होकर अरुणाचल प्रदेश से भारत में प्रवेश करती है। यह असम घाटी से होकर बहती है और बांग्लादेश में गंगा से मिलती है।"
    },
    cultural: {
      en: "The Brahmaputra is deeply embedded in the cultural life of northeastern Bharat. It is associated with fertility, seasonal cycles, and local traditions. Unlike many rivers, it is often referred to in masculine form, symbolizing strength and power. The river also shapes festivals, agriculture, and livelihoods in Assam and surrounding regions.",
      kn: "ಬ್ರಹ್ಮಪುತ್ರ ನದಿ ಉತ್ತರ ಪೂರ್ವ ಭಾರತದ ಸಂಸ್ಕೃತಿಯ ಭಾಗವಾಗಿದೆ. ಇದು ಫಲವತ್ತತೆ ಮತ್ತು ಜೀವನ ಚಕ್ರಗಳೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿದೆ. ಅಸ್ಸಾಂ ಪ್ರದೇಶದಲ್ಲಿ ಇದು ಕೃಷಿ ಮತ್ತು ಜೀವನೋಪಾಯದ ಪ್ರಮುಖ ಮೂಲವಾಗಿದೆ.",
      hi: "ब्रह्मपुत्र नदी उत्तर-पूर्व भारत की संस्कृति में गहराई से जुड़ी हुई है। यह उर्वरता और जीवन चक्र का प्रतीक है। असम में यह कृषि और जीवन का आधार है।"
    },
    image: "/place-images/rivers/brahmaputra.webp"
  },
  gandaki: {
    id: "gandaki",
    title: { en: "Gandaki", kn: "ಗಂಡಕಿ", hi: "गंडकी" },
    facts: {
      length: "630 km (approx)",
      origin: "Nepal Himalaya",
      confluence: "Ganga (Bihar)",
      tributaries: "Kali Gandaki • Trishuli"
    },
    flow: {
      en: "Himalaya (Nepal) → Bihar → Ganga",
      kn: "ಹಿಮಾಲಯ → ಬಿಹಾರ → ಗಂಗಾ",
      hi: "हिमालय → बिहार → गंगा"
    },
    description: {
      en: "The Gandaki River originates in the high Himalayas of Nepal and flows southward into the plains of Bihar, where it joins the Ganga. It is a major tributary of the Ganga system and carries significant sediment from the Himalayan region. The river is known for its deep valleys and dynamic flow patterns in its upper course.",
      kn: "ಗಂಡಕಿ ನದಿ ನೇಪಾಳದ ಹಿಮಾಲಯ ಪ್ರದೇಶದಲ್ಲಿ ಉಗಮವಾಗಿ ದಕ್ಷಿಣಕ್ಕೆ ಹರಿದು ಬಿಹಾರದಲ್ಲಿ ಗಂಗೆಯೊಂದಿಗೆ ಸೇರುತ್ತದೆ. ಇದು ಗಂಗೆಯ ಪ್ರಮುಖ ಉಪನದಿಯಾಗಿದೆ ಮತ್ತು ಹಿಮಾಲಯದಿಂದ ಹೆಚ್ಚಿನ ಅವಶೇಷಗಳನ್ನು ಹೊರುತ್ತದೆ.",
      hi: "गंडकी नदी नेपाल के हिमालय क्षेत्र से निकलकर दक्षिण की ओर बहती है और बिहार में गंगा से मिलती है। यह गंगा की प्रमुख सहायक नदियों में से एक है।"
    },
    cultural: {
      en: "The Gandaki River holds deep religious importance, especially in Hindu traditions. It is associated with the sacred Shaligram stones, which are found in its riverbed and worshipped as manifestations of Lord Vishnu. The river is considered spiritually pure and plays a role in pilgrimage traditions across Nepal and northern India.",
      kn: "ಗಂಡಕಿ ನದಿ ಧಾರ್ಮಿಕವಾಗಿ ಮಹತ್ವದ್ದಾಗಿದೆ, ವಿಶೇಷವಾಗಿ ಶಾಲಿಗ್ರಾಮ ಶಿಲೆಗಳಿಗಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಈ ಕಲ್ಲುಗಳನ್ನು ವಿಷ್ಣುವಿನ ರೂಪವೆಂದು ಪೂಜಿಸಲಾಗುತ್ತದೆ.",
      hi: "गंडकी नदी धार्मिक दृष्टि से अत्यंत महत्वपूर्ण है। इसके तट पर पाए जाने वाले शालिग्राम पत्थर भगवान विष्णु के रूप में पूजे जाते हैं।"
    },
    image: "/place-images/rivers/gandaki.webp"
  },
  narmada: {
    id: "narmada",
    title: { en: "Narmada", kn: "ನರ್ಮದಾ", hi: "नर्मदा" },
    facts: {
      length: "1,312 km",
      origin: "Amarkantak Plateau",
      mouth: "Arabian Sea",
      tributaries: "Tawa • Hiran • Orsang"
    },
    flow: {
      en: "Central Highlands → Gujarat → Arabian Sea",
      kn: "ಮಧ್ಯ ಭಾರತ → ಗುಜರಾತ್ → ಅರಬ್ಬಿ ಸಮುದ್ರ",
      hi: "मध्य भारत → गुजरात → अरब सागर"
    },
    description: {
      en: "The Narmada River originates from the Amarkantak Plateau in central India and flows westward into the Arabian Sea. Unlike most major rivers of Bharat that flow east, the Narmada follows a unique westward course between the Vindhya and Satpura ranges. It forms a natural boundary between northern and southern India in geographical terms.",
      kn: "ನರ್ಮದಾ ನದಿ ಮಧ್ಯ ಭಾರತದ ಅಮರಕಂಟಕ ಪೀಠಭೂಮಿಯಲ್ಲಿ ಉಗಮವಾಗಿ ಪಶ್ಚಿಮಕ್ಕೆ ಹರಿದು ಅರಬ್ಬಿ ಸಮುದ್ರದಲ್ಲಿ ಸೇರುತ್ತದೆ. ಬಹುತೇಕ ನದಿಗಳಿಗಿಂತ ವಿಭಿನ್ನವಾಗಿ ಇದು ಪಶ್ಚಿಮ ದಿಕ್ಕಿನಲ್ಲಿ ಹರಿಯುತ್ತದೆ.",
      hi: "नर्मदा नदी मध्य भारत के अमरकंटक पठार से निकलकर पश्चिम की ओर बहती हुई अरब सागर में मिलती है। यह भारत की उन प्रमुख नदियों में से है जो पूर्व की बजाय पश्चिम की ओर बहती हैं।"
    },
    cultural: {
      en: "The Narmada is considered one of the holiest rivers in India, often regarded as equal in sanctity to the Ganga. The tradition of Narmada Parikrama, where devotees walk along the entire river course, reflects its deep spiritual significance. The river is believed to have the power to purify without the need for ritual immersion.",
      kn: "ನರ್ಮದಾ ನದಿ ಭಾರತದಲ್ಲಿ ಅತ್ಯಂತ ಪವಿತ್ರ ನದಿಗಳಲ್ಲೊಂದು ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. ನರ್ಮದಾ ಪರಿಕ್ರಮೆಯಂತಹ ಆಚರಣೆಗಳು ಇದರ ಆಧ್ಯಾತ್ಮಿಕ ಮಹತ್ವವನ್ನು ತೋರಿಸುತ್ತವೆ.",
      hi: "नर्मदा नदी को भारत की सबसे पवित्र नदियों में से एक माना जाता है। नर्मदा परिक्रमा इसकी आध्यात्मिक महत्ता को दर्शाती है।"
    },
    image: "/place-images/rivers/Narmada.jpg"
  },
  godavari: {
    id: "godavari",
    title: { en: "Godavari", kn: "ಗೋದಾವರಿ", hi: "गोदावरी" },
    facts: {
      length: "1,465 km",
      origin: "Trimbakeshwar (Maharashtra)",
      mouth: "Bay of Bengal",
      tributaries: "Pravara • Indravati • Sabari"
    },
    flow: {
      en: "Western Ghats → Deccan Plateau → Bay of Bengal",
      kn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು → ದಕ್ಕನ್ ಪೀಠಭೂಮಿ → ಬೆಂಗಾಳ ಕೊಲ್ಲಿ",
      hi: "पश्चिमी घाट → दक्कन पठार → बंगाल की खाड़ी"
    },
    description: {
      en: "The Godavari is the largest river in peninsular Bharat, originating in the Western Ghats and flowing eastward across the Deccan Plateau before draining into the Bay of Bengal. It traverses multiple states and forms an extensive river basin that supports agriculture, settlements, and ecosystems across central and southern India.",
      kn: "ಗೋದಾವರಿ ನದಿ ದಕ್ಷಿಣ ಭಾರತದ ಅತ್ಯಂತ ದೊಡ್ಡ ನದಿಯಾಗಿದ್ದು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಿಂದ ಉಗಮವಾಗಿ ಪೂರ್ವಕ್ಕೆ ಹರಿದು ಬೆಂಗಾಳ ಕೊಲ್ಲಿಯಲ್ಲಿ ಸೇರುತ್ತದೆ. ಇದು ದಕ್ಕನ್ ಪೀಠಭೂಮಿಯ ಮೂಲಕ ಹರಿದು ಹಲವು ರಾಜ್ಯಗಳನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.",
      hi: "गोदावरी नदी प्रायद्वीपीय भारत की सबसे बड़ी नदी है, जो पश्चिमी घाट से निकलकर पूर्व की ओर बहती हुई बंगाल की खाड़ी में मिलती है। यह दक्कन के पठार से होकर गुजरती है।"
    },
    cultural: {
      en: "The Godavari is often referred to as the \"Dakshin Ganga\" due to its cultural and spiritual significance in southern India. It is associated with numerous pilgrimage sites and festivals, including the Kumbh Mela held at Nashik. The river has played a vital role in shaping the cultural and agricultural life of the Deccan region.",
      kn: "ಗೋದಾವರಿಯನ್ನು ದಕ್ಷಿಣ ಭಾರತದ \"ದಕ್ಷಿಣ ಗಂಗಾ\" ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ. ನಾಸಿಕ್ನಲ್ಲಿ ನಡೆಯುವ ಕುಂಭಮೇಳ ಸೇರಿದಂತೆ ಅನೇಕ ಧಾರ್ಮಿಕ ಆಚರಣೆಗಳಿಗೆ ಇದು ಸಂಬಂಧಿಸಿದೆ.",
      hi: "गोदावरी को दक्षिण भारत में \"दक्षिण गंगा\" कहा जाता है। यह नासिक के कुंभ मेले सहित कई धार्मिक परंपराओं से जुड़ी हुई है।"
    },
    image: "/place-images/rivers/Godavari.jpg"
  },
  mahanadi: {
    id: "mahanadi",
    title: { en: "Mahanadi", kn: "ಮಹಾನದಿ", hi: "महानदी" },
    facts: {
      length: "858 km",
      origin: "Chhattisgarh Highlands",
      mouth: "Bay of Bengal",
      tributaries: "Seonath • Hasdeo • Mand"
    },
    flow: {
      en: "Central India → Odisha → Bay of Bengal",
      kn: "ಮಧ್ಯ ಭಾರತ → ಒಡಿಶಾ → ಬೆಂಗಾಳ ಕೊಲ್ಲಿ",
      hi: "मध्य भारत → ओडिशा → बंगाल की खाड़ी"
    },
    description: {
      en: "The Mahanadi originates in the highlands of central India and flows eastward through Odisha before forming a large delta as it enters the Bay of Bengal. It is known for its seasonal variations and has historically been both a source of fertile soil and devastating floods, shaping the agricultural patterns of eastern India.",
      kn: "ಮಹಾನದಿ ಮಧ್ಯ ಭಾರತದ ಪೀಠಭೂಮಿಯಲ್ಲಿ ಉಗಮವಾಗಿ ಒಡಿಶಾದ ಮೂಲಕ ಹರಿದು ಬೆಂಗಾಳ ಕೊಲ್ಲಿಯಲ್ಲಿ ದೊಡ್ಡ ಡೆಲ್ಟಾವನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ. ಇದು ಕೃಷಿಗೆ ಅನುಕೂಲಕರವಾದ ಮಣ್ಣು ಮತ್ತು ಪ್ರವಾಹಗಳಿಗಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.",
      hi: "महानदी मध्य भारत के उच्च भूभाग से निकलकर ओडिशा से होकर बहती है और बंगाल की खाड़ी में एक बड़ा डेल्टा बनाती है। यह उर्वरता और बाढ़ दोनों के लिए जानी जाती है।"
    },
    cultural: {
      en: "The Mahanadi has supported ancient settlements and agricultural communities for centuries. Its delta region is one of the most fertile areas in eastern India, sustaining rice cultivation and local economies. The river is deeply connected with regional traditions, festivals, and livelihoods in Odisha.",
      kn: "ಮಹಾನದಿ ನದಿ ಶತಮಾನಗಳಿಂದ ಕೃಷಿ ಮತ್ತು ವಸತಿಗಳನ್ನು ಬೆಂಬಲಿಸಿದೆ. ಇದರ ಡೆಲ್ಟಾ ಪ್ರದೇಶವು ಅತ್ಯಂತ ಫಲವತ್ತಾದ ಪ್ರದೇಶಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.",
      hi: "महानदी ने सदियों से कृषि और बस्तियों को समर्थन दिया है। इसका डेल्टा क्षेत्र अत्यंत उपजाऊ है और ओडिशा की अर्थव्यवस्था का आधार है।"
    },
    image: "/place-images/rivers/Mahanadi.jpg"
  },
  krishna: {
    id: "krishna",
    title: { en: "Krishna", kn: "ಕೃಷ್ಣಾ", hi: "कृष्णा" },
    facts: {
      length: "1,400 km",
      origin: "Mahabaleshwar (Western Ghats)",
      mouth: "Bay of Bengal",
      tributaries: "Bhima • Tungabhadra • Ghataprabha"
    },
    flow: {
      en: "Western Ghats → Deccan Plateau → Bay of Bengal",
      kn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು → ದಕ್ಕನ್ ಪೀಠಭೂಮಿ → ಬೆಂಗಾಳ ಕೊಲ್ಲಿ",
      hi: "पश्चिमी घाट → दक्कन पठार → बंगाल की खाड़ी"
    },
    description: {
      en: "The Krishna River originates in the Western Ghats near Mahabaleshwar and flows eastward across the Deccan Plateau before emptying into the Bay of Bengal. It traverses several states and supports extensive irrigation systems, making it one of the most important rivers for agriculture in southern India.",
      kn: "ಕೃಷ್ಣಾ ನದಿ ಮಹಾಬಲೇಶ್ವರದ ಬಳಿ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ಉಗಮವಾಗಿ ದಕ್ಕನ್ ಪೀಠಭೂಮಿಯ ಮೂಲಕ ಪೂರ್ವಕ್ಕೆ ಹರಿದು ಬೆಂಗಾಳ ಕೊಲ್ಲಿಯಲ್ಲಿ ಸೇರುತ್ತದೆ. ಇದು ಕೃಷಿಗೆ ಅತ್ಯಂತ ಮುಖ್ಯವಾದ ನದಿಯಾಗಿದೆ.",
      hi: "कृष्णा नदी पश्चिमी घाट के महाबलेश्वर से निकलकर दक्कन के पठार से होकर पूर्व की ओर बहती है और बंगाल की खाड़ी में मिलती है। यह दक्षिण भारत की प्रमुख कृषि नदियों में से एक है।"
    },
    cultural: {
      en: "The Krishna River has been central to the development of civilizations in the Deccan region. Its basin is dotted with ancient temples, historical cities, and cultural centers. The river supports livelihoods, irrigation, and regional traditions, making it a vital part of southern India's socio-economic fabric.",
      kn: "ಕೃಷ್ಣಾ ನದಿ ದಕ್ಕನ್ ಪ್ರದೇಶದ ಸಂಸ್ಕೃತಿ ಮತ್ತು ನಾಗರಿಕತೆಯ ಬೆಳವಣಿಗೆಯಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರವಹಿಸಿದೆ. ಇದರ ತೀರದಲ್ಲಿ ಅನೇಕ ದೇವಾಲಯಗಳು ಮತ್ತು ಇತಿಹಾಸ ಪ್ರಸಿದ್ಧ ಸ್ಥಳಗಳು ಇವೆ.",
      hi: "कृष्णा नदी दक्कन क्षेत्र की सभ्यता और संस्कृति के विकास में महत्वपूर्ण रही है। इसके तट पर अनेक मंदिर और ऐतिहासिक नगर स्थित हैं।"
    },
    image: "/place-images/rivers/krishna.jpg"
  },
  kaveri: {
    id: "kaveri",
    title: { en: "Kaveri", kn: "ಕಾವೇರಿ", hi: "कावेरी" },
    facts: {
      length: "800 km",
      origin: "Talakaveri (Western Ghats)",
      mouth: "Bay of Bengal",
      tributaries: "Hemavati • Kabini • Bhavani"
    },
    flow: {
      en: "Western Ghats → Karnataka → Tamil Nadu → Bay of Bengal",
      kn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು → ಕರ್ನಾಟಕ → ತಮಿಳುನಾಡು → ಬೆಂಗಾಳ ಕೊಲ್ಲಿ",
      hi: "पश्चिमी घाट → कर्नाटक → तमिलनाडु → बंगाल की खाड़ी"
    },
    description: {
      en: "The Kaveri River originates at Talakaveri in the Western Ghats and flows southeast through Karnataka and Tamil Nadu before reaching the Bay of Bengal. Though shorter than other major rivers, it forms one of the most fertile river basins in southern India, supporting agriculture and dense settlements.",
      kn: "ಕಾವೇರಿ ನದಿ ತಲಕಾವೇರಿಯಲ್ಲಿ ಉಗಮವಾಗಿ ಕರ್ನಾಟಕ ಮತ್ತು ತಮಿಳುನಾಡಿನ ಮೂಲಕ ಹರಿದು ಬೆಂಗಾಳ ಕೊಲ್ಲಿಯಲ್ಲಿ ಸೇರುತ್ತದೆ. ಇದು ದಕ್ಷಿಣ ಭಾರತದ ಅತ್ಯಂತ ಫಲವತ್ತಾದ ನದಿ ತಟಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.",
      hi: "कावेरी नदी तलकावेरी से निकलकर कर्नाटक और तमिलनाडु से होकर बहती है और बंगाल की खाड़ी में मिलती है। यह दक्षिण भारत की सबसे उपजाऊ नदी घाटियों में से एक है।"
    },
    cultural: {
      en: "The Kaveri is one of the most sacred rivers of southern Bharat and is deeply intertwined with temple culture and traditions. The river basin is home to numerous ancient temples, pilgrimage routes, and cultural centers, especially in Tamil Nadu. It represents prosperity, devotion, and continuity of southern Indian civilization.",
      kn: "ಕಾವೇರಿ ನದಿ ದಕ್ಷಿಣ ಭಾರತದ ಅತ್ಯಂತ ಪವಿತ್ರ ನದಿಗಳಲ್ಲೊಂದು. ಇದರ ತೀರದಲ್ಲಿ ಅನೇಕ ಪುರಾತನ ದೇವಾಲಯಗಳು ಮತ್ತು ತೀರ್ಥಕ್ಷೇತ್ರಗಳು ಇವೆ.",
      hi: "कावेरी नदी दक्षिण भारत की सबसे पवित्र नदियों में से एक है। इसके तट पर अनेक प्राचीन मंदिर and तीर्थ स्थल स्थित हैं।"
    },
    image: "/place-images/rivers/kaveri.jpg"
  }
};

export const sindhuContent = riverKnowledge.sindhu;
export const gangaContent = riverKnowledge.ganga;
export const saraswatiContent = riverKnowledge.saraswati;
export const yamunaContent = riverKnowledge.yamuna;
export const brahmaputraContent = riverKnowledge.brahmaputra;
export const gandakiContent = riverKnowledge.gandaki;
export const narmadaContent = riverKnowledge.narmada;
export const godavariContent = riverKnowledge.godavari;
export const mahanadiContent = riverKnowledge.mahanadi;
export const krishnaContent = riverKnowledge.krishna;
export const kaveriContent = riverKnowledge.kaveri;
