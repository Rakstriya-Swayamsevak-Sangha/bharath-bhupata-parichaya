export interface MountainKnowledge {
  id: string;
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  subtitle: {
    en: string;
    kn: string;
    hi: string;
  };
  facts: {
    length?: string;
    highest_peak?: string;
    elevation?: string;
    extent?: string;
    // legacy support
    highestPeak?: string;
    altitude?: string;
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
  image?: string;
}

export const mountainKnowledge: Record<string, MountainKnowledge> = {
  himalaya: {
    id: "himalaya",

    title: {
      en: "Himalaya",
      kn: "ಹಿಮಾಲಯ",
      hi: "हिमालय"
    },

    subtitle: {
      en: "Abode of Snow",
      kn: "ಹಿಮದ ನಿವಾಸ",
      hi: "हिम का निवास"
    },

    facts: {
      length: "2,400 km",
      highest_peak: "Mount Everest",
      elevation: "8,848 m",
      extent: "India • Nepal • Bhutan • Tibet"
    },

    description: {
      en: `The Himalaya is the youngest and highest mountain range in the world, stretching across northern Bharat as a natural boundary. Formed by the collision of the Indian and Eurasian tectonic plates, it extends from the Indus valley in the west to the Brahmaputra valley in the east. This vast range is the source of many major rivers including the Ganga, Yamuna, and Brahmaputra, sustaining millions of lives across the subcontinent.`,

      kn: `ಹಿಮಾಲಯವು ವಿಶ್ವದ ಅತ್ಯಂತ ಎತ್ತರವಾದ ಮತ್ತು ಅತ್ಯಂತ ಯುವ ಪರ್ವತ ಶ್ರೇಣಿಯಾಗಿದೆ. ಇದು ಉತ್ತರ ಭಾರತದ ಸಹಜ ಗಡಿಯನ್ನು ರೂಪಿಸುತ್ತದೆ. ಭಾರತೀಯ ಮತ್ತು ಯುರೇಷಿಯನ್ ಫಲಕಗಳ ಘರ್ಷಣೆಯಿಂದ ನಿರ್ಮಾಣಗೊಂಡ ಈ ಶ್ರೇಣಿ ಪಶ್ಚಿಮದಲ್ಲಿ ಸಿಂಧು ನದಿ ಕಣಿವೆಯಿಂದ ಪೂರ್ವದಲ್ಲಿ ಬ್ರಹ್ಮಪುತ್ರ ಕಣಿವೆಯವರೆಗೆ ಹರಡಿದೆ. ಗಂಗಾ, ಯಮುನಾ ಮತ್ತು ಬ್ರಹ್ಮಪುತ್ರ ಸೇರಿದಂತೆ ಅನೇಕ ಮಹತ್ವದ ನದಿಗಳ ಉಗಮ ಸ್ಥಳವೂ ಇದೇ.`,

      hi: `हिमालय विश्व की सबसे ऊँची और सबसे युवा पर्वतमाला है, जो भारत के उत्तर में प्राकृतिक सीमा बनाती है। यह भारतीय और यूरेशियन प्लेटों की टक्कर से बनी है और पश्चिम में सिंधु घाटी से लेकर पूर्व में ब्रह्मपुत्र घाटी तक फैली हुई है। गंगा, यमुना और ब्रह्मपुत्र जैसी प्रमुख नदियाँ यहीं से निकलती हैं और करोड़ों लोगों का जीवन पोषित करती हैं।`
    },

    cultural: {
      en: `In the civilizational memory of Bharat, the Himalaya is not merely a mountain range but a sacred entity. It is revered as the abode of Lord Shiva and the origin of spiritual consciousness. Ancient texts describe it as the "Devabhumi" — the land of the gods. The Himalaya has been a center for meditation, तपस्या (austerity), and knowledge for sages and seekers for thousands of years, shaping the spiritual foundation of Indian civilization.`,

      kn: `ಭಾರತದ ಸಾಂಸ್ಕೃತಿಕ ಸ್ಮೃತಿಯಲ್ಲಿ ಹಿಮಾಲಯವು ಕೇವಲ ಪರ್ವತ ಶ್ರೇಣಿಯಲ್ಲ, ಅದು ಪವಿತ್ರ ತತ್ವವಾಗಿದೆ. ಇದನ್ನು ಶಿವನ ನಿವಾಸವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಆತ್ಮಸಾಕ್ಷಾತ್ಕಾರದ ಮೂಲವೆಂದು ನೋಡಲಾಗುತ್ತದೆ. ಪ್ರಾಚೀನ ಗ್ರಂಥಗಳಲ್ಲಿ ಇದನ್ನು "ದೇವಭೂಮಿ" ಎಂದು ವರ್ಣಿಸಲಾಗಿದೆ. ಸಾವಿರಾರು ವರ್ಷಗಳಿಂದ ಇದು ಋಷಿಗಳ ತಪಸ್ಸಿನ ಮತ್ತು ಜ್ಞಾನಸಾಧನೆಯ ಕೇಂದ್ರವಾಗಿದೆ.`,

      hi: `भारत की सभ्यता में हिमालय केवल एक पर्वतमाला नहीं बल्कि एक पवित्र सत्ता है। इसे भगवान शिव का निवास और आध्यात्मिक चेतना का स्रोत माना जाता है। प्राचीन ग्रंथों में इसे "देवभूमि" कहा गया है। हजारों वर्षों से यह ऋषियों की तपस्या और ज्ञान का केंद्र रहा है और भारतीय संस्कृति की आध्यात्मिक नींव को आकार देता है।`
    },

    image: "/place-images/himalaya.avif"
  },
  sahyadri: {
    id: "sahyadri",
    title: {
      en: "Sahyadri",
      kn: "ಸಹ್ಯಾದ್ರಿ",
      hi: "सह्याद्रि"
    },
    subtitle: {
      en: "The Western Ghats",
      kn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು",
      hi: "पश्चिमी घाट"
    },
    facts: {
      length: "1,600 km",
      highestPeak: "Anamudi (2,695 m)",
      extent: "Maharashtra • Goa • Karnataka • Kerala • Tamil Nadu"
    },
    description: {
      en: "The Sahyadri, also known as the Western Ghats, forms the western boundary of the Deccan Plateau. This ancient mountain range runs parallel to the Arabian Sea coast, creating a dramatic landscape of steep cliffs, deep valleys, and mist-covered forests. It is one of the world's eight \"hottest hotspots\" of biodiversity.",
      kn: "ಸಹ್ಯಾದ್ರಿ, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳೆಂದೂ ಕರೆಯಲ್ಪಡುವ, ದಕ್ಷಿಣ ಪ್ರಸ್ಥಭೂಮಿಯ ಪಶ್ಚಿಮ ಗಡಿಯನ್ನು ರೂಪಿಸುತ್ತದೆ. ಈ ಪ್ರಾಚೀನ ಪರ್ವತ ಶ್ರೇಣಿಯು ಅರಬ್ಬೀ ಸಮುದ್ರ ತೀರದ ಸಮಾನಾಂತರದಲ್ಲಿ ಓಡುತ್ತದೆ, ಕಡಿದಾದ ಬಂಡೆಗಳು, ಆಳವಾದ ಕಣಿವೆಗಳು ಮತ್ತು ಮಂಜಿನಿಂದ ಆವೃತ ಕಾಡುಗಳ ನಾಟಕೀಯ ಭೂದೃಶ್ಯವನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ.",
      hi: "सह्याद्रि, जिसे पश्चिमी घाट भी कहते हैं, दक्कन पठार की पश्चिमी सीमा बनाती है। यह प्राचीन पर्वत श्रृंखला अरब सागर के तट के समानांतर चलती है, जो खड़ी चट्टानों, गहरी घाटियों और धुंध से ढके जंगलों का एक भव्य परिदृश्य बनाती है."
    },
    cultural: {
      en: "The Sahyadri is intimately woven into the spiritual geography of Maharashtra and the Deccan. It is home to countless ancient temples, cave monasteries of Buddhist and Jain traditions, and sacred groves. The range shelters the sources of Godavari, Krishna, and Kaveri — the great rivers that sustained the Satavahana, Chalukya, and Vijayanagara civilizations.",
      kn: "ಸಹ್ಯಾದ್ರಿಯು ಮಹಾರಾಷ್ಟ್ರ ಮತ್ತು ದಕ್ಷಿಣದ ಆಧ್ಯಾತ್ಮಿಕ ಭೂಗೋಳದೊಂದಿಗೆ ಅವಿಭಾಜ್ಯವಾಗಿ ಹೆಣೆದುಕೊಂಡಿದೆ. ಇದು ಅಸಂಖ್ಯಾತ ಪ್ರಾಚೀನ ದೇವಾಲಯಗಳಿಗೆ, ಬೌದ್ಧ ಮತ್ತು ಜೈನ ಸಂಪ್ರದಾಯಗಳ ಗುಹೆ ಮಠಗಳಿಗೆ ಮತ್ತು ಪವಿತ್ರ ಅರಣ್ಯಗಳಿಗೆ ನೆಲೆಯಾಗಿದೆ.",
      hi: "सह्याद्रि महाराष्ट्र और दक्कन की आध्यात्मिक भूगोल में अविभाज्य रूप से बुनी है। यह अनगिनत प्राचीन मंदिरों, बौद्ध और जैन परंपराओं की गुफा मठवास और पवित्र वनों का घर है।"
    },
    image: "/images/mountains/sahyadri.jpg"
  },
  aravalli: {
    id: "aravalli",
    title: {
      en: "Aravalli",
      kn: "ಅರಾವಳಿ",
      hi: "अरावली"
    },
    subtitle: {
      en: "The Ancient Guard",
      kn: "ಪ್ರಾಚೀನ ಕಾವಲು ಪರ್ವತ",
      hi: "प्राचीन रक्षक"
    },
    facts: {
      length: "692 km",
      highestPeak: "Guru Shikhar (1,722 m)",
      extent: "Rajasthan • Haryana • Delhi"
    },
    description: {
      en: "The Aravalli is one of the oldest mountain ranges on Earth, dating back approximately 2.5 billion years. This ancient fold mountain system forms a barrier across Rajasthan, historically dividing the fertile lands to its east from the Thar Desert to its west. Despite millennia of erosion, its remnants still stand as silent witnesses to deep geological time.",
      kn: "ಅರಾವಳ್ಳಿಯು ಭೂಮಿಯ ಅತ್ಯಂತ ಹಳೆಯ ಪರ್ವತ ಶ್ರೇಣಿಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು, ಸುಮಾರು 2.5 ಶತಕೋಟಿ ವರ್ಷಗಳ ಹಿಂದೆ ರೂಪುಗೊಂಡಿದೆ. ಈ ಪ್ರಾಚೀನ ಕಿವಿರು ಪರ್ವತ ವ್ಯವಸ್ಥೆಯು ರಾಜಸ್ಥಾನನ್ನು ದಾಟುವ ಅಡೆತಡೆಯನ್ನು ರೂಪಿಸುತ್ತದೆ.",
      hi: "अरावली पृथ्वी की सबसे पुरानी पर्वत श्रृंखलाओं में से एक है, जो लगभग 2.5 अरब वर्ष पुरानी है। यह प्राचीन वलित पर्वत प्रणाली राजस्थान में एक बाधा बनाती है."
    },
    cultural: {
      en: "The Aravalli guards the sacred region of Mewar and the ancient city of Udaipur, known as the Venice of the East. The range is associated with the legendary Matsya avatar of Vishnu and the sage Vyasa, who is said to have divided the Vedas on its peaks. Its ancient mines supplied precious minerals and gems to civilizations across the subcontinent.",
      kn: "ಅರಾವಳ್ಳಿಯು ಪವಿತ್ರ ಮೇವಾರ್ ಪ್ರದೇಶವನ್ನು ಮತ್ತು ಪೂರ್ವದ ವೆನಿಸ್ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಪ್ರಾಚೀನ ನಗರವಾದ ಉದಯಪುರವನ್ನು ಕಾಯುತ್ತದೆ. ಈ ಶ್ರೇಣಿಯು ದಾವಾ ಅವತಾರದೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದೆ.",
      hi: "अरावली पवित्र मेवाड़ क्षेत्र और पूरब के वेनिस के नाम से जाने वाले प्राचीन शहर उदयपुर की रक्षा करती है।"
    },
    image: "/images/mountains/aravalli.jpg"
  },
  vindhya: {
    id: "vindhya",
    title: {
      en: "Vindhya",
      kn: "ವಿಂಧ್ಯ",
      hi: "विंध्य"
    },
    subtitle: {
      en: "Barrier of the South",
      kn: "ದಕ್ಷಿಣದ ತಡೆಗೋಡೆ",
      hi: "दक्षिण की बाधा"
    },
    facts: {
      length: "1,050 km",
      highestPeak: "Vindhya Range (~1,200 m)",
      extent: "Madhya Pradesh • Uttar Pradesh • Bihar"
    },
    description: {
      en: "The Vindhya range forms a rugged mountainous boundary separating the Indo-Gangetic plain from the Deccan Peninsula. More of a series of eroded plateau escarpments than a true mountain chain, it stretches across central India as a natural barrier between the northern plains and the southern peninsula.",
      kn: "ವಿಂಧ್ಯ ಶ್ರೇಣಿಯು ಇಂಡೋ-ಗಂಗಾ ಮೈದಾನವನ್ನು ದಕ್ಷಿಣ ಪರ್ಯಾಯ ದ್ವೀಪದಿಂದ ಬೇರ್ಪಡಿಸುವ ಕಠಿಣ ಪರ್ವತ ಗಡಿಯನ್ನು ರೂಪಿಸುತ್ತದೆ.",
      hi: "विंध्य पर्वत श्रृंखला इंडो-गंगे के मैदान को दक्कन प्रायद्वीप से अलग करने वाली एक पुरानी पर्वत सीमा बनाती है."
    },
    cultural: {
      en: "In ancient texts, the Vindhya is described as the boundary between the holy land of Bharatavarsha and the demonic territories of the south. It is personified as a demon king who was propitiated by Vashishtha and whose obstruction of the sun was pacified by the sage Agastya. The forests of Vindhya are associated with the Dandaka forest of the Ramayana.",
      kn: "ಪ್ರಾಚೀನ ಗ್ರಂಥಗಳಲ್ಲಿ, ವಿಂಧ್ಯವನ್ನು ಪವಿತ್ರ ಭಾರತವರ್ಷ ಮತ್ತು ದಕ್ಷಿಣದ ರಾಕ್ಷಸ ಪ್ರದೇಶಗಳ ನಡುವಿನ ಗಡಿಯಾಗಿ ವರ್ಣಿಸಲಾಗಿದೆ.",
      hi: "प्राचीन ग्रंथों में, विंध्य को पवित्र भारतवर्ष और दक्षिण के राक्षसी क्षेत्रों के बीच की सीमा के रूप में वर्णित किया गया है।"
    },
    image: "/images/mountains/vindhya.jpg"
  },
  malaya: {
    id: "malaya",
    title: {
      en: "Malaya",
      kn: "ಮಲಯ",
      hi: "मलय"
    },
    subtitle: {
      en: "Fragrant Mountains",
      kn: "ಸುಗಂಧ ಪರ್ವತಗಳು",
      hi: "सुगंधित पर्वत"
    },
    facts: {
      length: "~400 km",
      highestPeak: "Anamudi (2,695 m)",
      extent: "Kerala • Tamil Nadu"
    },
    description: {
      en: "The Malaya mountains form the southern extension of the Western Ghats, terminating at the junction of Kerala and Tamil Nadu near Kanyakumari. These rugged forested slopes capture the southwest monsoon, feeding the legendary rivers of the far south.",
      kn: "ಮಲಯ ಪರ್ವತಗಳು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ದಕ್ಷಿಣ ವಿಸ್ತರಣೆಯನ್ನು ರೂಪಿಸುತ್ತವೆ, ಕೇರಳ ಮತ್ತು ತಮಿಳ್ನಾಡು ಸಂಧಿಸುವ ಕುಂದಾಣದ ಬಳಿ ಕೊನೆಗೊಳ್ಳುತ್ತವೆ.",
      hi: "मलय पर्वत पश्चिमी घाट की दक्षिणी विस्तार बनाते हैं, जो केरल और तमिलनाडु के संगम पर कन्याकुमारी के पास समाप्त होते हैं."
    },
    cultural: {
      en: "The Malaya region is traditionally identified with the ancient Tamil region of Pandya and the legendary capital of Kumarakom. The forests are associated with ancient Shaivaite temples and the birthplace of the river Tamiraparni, referred to in the Sangam literature.",
      kn: "ಮಲಯ ಪ್ರದೇಶವನ್ನು ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಪಂಡ್ಯ ಪ್ರಾಚೀನ ತಮಿಳು ಪ್ರದೇಶದೊಂದಿಗೆ ಗುರುತಿಸಲಾಗಿದೆ.",
      hi: "मलय क्षेत्र को पारंपरिक रूप से प्राचीन तमिल क्षेत्र पांड्या और पौराणिक राजधानी कुमारकोम के साथ जोड़ा जाता है."
    },
    image: "/images/mountains/malaya.jpg"
  },
  mahendra: {
    id: "mahendra",
    title: {
      en: "Mahendra",
      kn: "ಮಹೇಂದ್ರ",
      hi: "महेंद्र"
    },
    subtitle: {
      en: "Eastern Custodian",
      kn: "ಪೂರ್ವದ ರಕ್ಷಕ",
      hi: "पूर्वी संरक्षक"
    },
    facts: {
      length: "~500 km",
      highestPeak: "Mahendra Parvat (~1,500 m)",
      extent: "Odisha • Andhra Pradesh"
    },
    description: {
      en: "The Mahendra mountains form a series of low, elongated hill ranges along the eastern coastal plain of India, stretching from Odisha to Andhra Pradesh. Also known as the Eastern Ghats, these ancient hills are deeply weathered and covered with dense deciduous forests.",
      kn: "ಮಹೇಂದ್ರ ಪರ್ವತಗಳು ಒರಿಸ್ಸಾದಿಂದ ಆಂಧ್ರ ಪ್ರದೇಶದವರೆಗೆ ಭಾರತದ ಪೂರ್ವ ಕರಾವಳಿ ಸಮತಟ್ಟಿನ ಉದ್ದಕ್ಕೂ ಕಡಿಮೆ, ಉದ್ದನೆಯ ಬೆಟ್ಟಗಳ ಶ್ರೇಣಿಗಳನ್ನು ರೂಪಿಸುತ್ವೆ.",
      hi: "महेंद्र पर्वत भारत के पूर्वी तटीय मैदान के साथ ओडिशा से आंध्र प्रदेश तक फैली कम ऊंची, लंबी पहाड़ियों की श्रृंखला बनाते हैं."
    },
    cultural: {
      en: "The Eastern Ghats are closely associated with the ancient Kalinga kingdom and the region where Emperor Ashoka's transformation from conqueror to pacifist occurred after the Battle of Kalinga. The hills shelter ancient Jagannath temples and are mentioned in the Mahabharata as the realm of the mountain god Mainaka.",
      kn: "ಪೂರ್ವ ಘಟ್ಟಗಳು ಪ್ರಾಚೀನ ಕಲಿಂಗ ರಾಜ್ಯದೊಂದಿಗೆ ನಿಕಟವಾಗಿ ಸಂಬಂಧಿಸಿವೆ.",
      hi: "पूर्वी घाट प्राचीन कलिंग राज्य और सम्राट अशोक के कलिंग की लड़ाई के बाद शांतिवादी में उनके परिवर्तन के स्थान से गहराई से जुड़े हैं."
    },
    image: "/images/mountains/mahendra.jpg"
  }
};

export const himalayaContent = mountainKnowledge.himalaya;
