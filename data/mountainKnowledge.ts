export interface MountainKnowledge {
  id: string;
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  facts: {
    height: string;
    range: string;
    significance: {
      en: string;
      kn: string;
      hi: string;
    };
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
}

export const mountainKnowledge: Record<string, MountainKnowledge> = {
  himalaya: {
    id: "himalaya",

    title: {
      en: "Himavan",
      kn: "ಹಿಮವಂತ",
      hi: "हिमवान"
    },

    facts: {
      height: "8,848.86 m (Everest)",
      range: "Trans-Himalayan / Greater Himalayas",
      significance: {
        en: "The Abode of Gods (Devabhumi)",
        kn: "ದೇವಭೂಮಿ - ದೇವತೆಗಳ ವಾಸಸ್ಥಾನ",
        hi: "देवभूमि - देवताओं का निवास स्थान"
      }
    },

    description: {
      en: `The Himalayas, known in ancient texts as Himavan or Himavat, form the northern boundary of Bharat. They are not just mountains but represent the spiritual and physical crown of the civilization. Spanning across multiple nations, they influence the climate, rivers, and cultural identity of the entire subcontinent. They are the source of the most sacred rivers like the Ganga, Yamuna, and Brahmaputra.`,

      kn: `ಹಿಮವಂತ ಅಥವ ಹಿಮಾಲಯ ಭಾರತದ ಸಾಂಸ್ಕೃತಿಕ ಕಿರೀಟವಿದ್ದಂತೆ. ಇದು ಅನೇಕ ಪವಿತ್ರ ನದಿಗಳ ಮೂಲವಾಗಿದ್ದು, ದೇಶದ ಹವಾಮಾನ ಮತ್ತು ಭದ್ರತೆಯ ದೃಷ್ಟಿಯಿಂದ ಮಹತ್ವದ್ದಾಗಿದೆ.`,

      hi: `हिमालय, जिसे प्राचीन ग्रंथों में हिमवान कहा गया है, भारत की उत्तर दिशा का रक्षक और सांस्कृतिक मुकुट है। यह गंगा, यमुना और ब्रह्मपुत्र जैसी पवित्र नदियों का उद्गम स्थल है।`
    },

    cultural: {
      en: `Himavan is personified in the Puranas as the father of Goddess Parvati (Shailaputri). The range is dotted with countless sacred sites like Kailash, Amarnath, Kedarnath, and Badrinath. It is considered the ultimate destination for seekers, sages, and yogis for millennia, symbolizing the ascent towards higher consciousness.`,

      kn: `ಪುರಾಣಗಳ ಪ್ರಕಾರ ಹಿಮವಂತನು ಪಾರ್ವತಿ ದೇವಿಯ ತಂದೆ. ಈ ಪರ್ವತ ಶ್ರೇಣಿಯಲ್ಲಿ ಕೈಲಾಸ, ಕೇದಾರನಾಥ ಮತ್ತು ಬದರಿನಾಥದಂತಹ ಅನೇಕ ಪುಣ್ಯಕ್ಷೇತ್ರಗಳಿವೆ.`,

      hi: `पौराणिक कथाओं के अनुसार हिमवान माता पार्वती के पिता हैं। यहाँ कैलाश, केदारनाथ और बद्रीनाथ जैसे असंख्य पावन तीर्थ स्थल स्थित हैं।`
    }
  },

  sahyadri: {
    id: "sahyadri",

    title: {
      en: "Sahyadri",
      kn: "ಸಹ್ಯಾದ್ರಿ",
      hi: "सह्याद्रि"
    },

    facts: {
      height: "2,695 m (Anamudi)",
      range: "Western Ghats",
      significance: {
        en: "A Global Biodiversity Hotspot",
        kn: "ಜಾಗತಿಕ ಜೀವವೈವಿಧ್ಯದ ಕೇಂದ್ರ",
        hi: "वैश्विक जैव विविधता हॉटस्पॉट"
      }
    },

    description: {
      en: `The Sahyadri range, stretching along the western coast of Bharat, is one of the oldest mountain ranges in the world. It is known for its lush green forests, high rainfall, and unique ecosystems. Sahyadri acts as a barrier to monsoon winds, providing water to the entire peninsular India through rivers like Godavari, Krishna, and Kaveri.`,

      kn: `ಸಹ್ಯಾದ್ರಿ ಶ್ರೇಣಿಯು ಭಾರತದ ಪಶ್ಚಿಮ ಕರಾವಳಿಯುದ್ದಕ್ಕೂ ಹರಡಿಕೊಂಡಿದೆ. ಇದು ವಿಶ್ವದ ಅತ್ಯಂತ ಹಳೆಯ ಪರ್ವತ ಶ್ರೇಣಿಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು, ಗೋದಾವರಿ, ಕೃಷ್ಣ ಮತ್ತು ಕಾವೇರಿ ನದಿಗಳ ಜನ್ಮಸ್ಥಳವಾಗಿದೆ.`,

      hi: `सह्याद्रि पर्वत श्रृंखला भारत के पश्चिमी तट पर स्थित है। यह विश्व की प्राचीनतम श्रृंखलाओं में से एक है और गोदावरी, कृष्णा व कावेरी जैसी नदियों का उद्गम स्थल है।`
    },

    cultural: {
      en: `Sahyadri is rich in historical and spiritual heritage. It is home to numerous hill forts, ancient rock-cut caves like Ajanta and Ellora, and sacred sites including Trimbakeshwar and Mahabaleshwar. The mountains have shaped the martial traditions and cultural identity of the Maratha and Southern regions.`,

      kn: `ಸಹ್ಯಾದ್ರಿಯು ಅನೇಕ ಐತಿಹಾಸಿಕ ಕೋಟೆಗಳು ಮತ್ತು ಅಜಂತಾ-ಎಲ್ಲೋರದಂತಹ ಗುಹೆಗಳಿಗೆ ನೆಲೆಯಾಗಿದೆ. ಇದು ತ್ರಯಂಬಕೇಶ್ವರ ಮತ್ತು ಮಹಾಬಲೇಶ್ವರದಂತಹ ಪುಣ್ಯಕ್ಷೇತ್ರಗಳನ್ನು ಹೊಂದಿದೆ.`,

      hi: `सह्याद्रि कई ऐतिहासिक किलों और अजंता-एलोरा जैसी प्राचीन गुफाओं का घर है। यहाँ त्र्यंबकेश्वर और महाबलेश्वर जैसे पवित्र स्थल स्थित हैं।`
    }
  },

  vindhya: {
    id: "vindhya",

    title: {
      en: "Vindhya",
      kn: "ವಿಂದ್ಯ",
      hi: "विन्ध्य"
    },

    facts: {
      height: "752 m (Sad-bhawna Shikhar)",
      range: "Central Indian Highlands",
      significance: {
        en: "Traditional boundary between North and South India",
        kn: "ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ನಡುವಿನ ನೈಸರ್ಗಿಕ ಗಡಿ",
        hi: "उत्तर और दक्षिण भारत के बीच की पारंपरिक सीमा"
      }
    },

    description: {
      en: `The Vindhya range is a series of hills and plateaus in central Bharat. It has historically served as a geographical divider between the Indo-Gangetic plains and the Deccan Plateau. The range is composed of ancient sandstone and has been central to the ancient routes connecting different parts of the subcontinent.`,

      kn: `ವಿಂದ್ಯ ಪರ್ವತ ಶ್ರೇಣಿಯು ಮಧ್ಯ ಭಾರತದಲ್ಲಿ ಹರಡಿಕೊಂಡಿದ್ದು, ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ನಡುವೆ ಒಂದು ಪ್ರಮುಖ ಭೂವೈಜ್ಞಾನಿಕ ವಿಭಾಗವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.`,

      hi: `विन्ध्याचल पर्वत श्रृंखला भारत के मध्य भाग में स्थित है। यह ऐतिहासिक रूप से उत्तर और दक्षिण भारत के बीच एक भौगोलिक विभाजक रही है।`
    },

    cultural: {
      en: `Vindhya is mentioned extensively in Sanskrit literature and epics. It is associated with the legends of Sage Agastya and is considered the abode of Goddess Vindhyavasini. The range is home to many ancient rock art sites, reflecting its long history of human settlement and spiritual significance.`,

      kn: `ಸಂಸ್ಕೃತ ಸಾಹಿತ್ಯದಲ್ಲಿ ವಿಂದ್ಯ ಪರ್ವತದ ಅನೇಕ ಉಲ್ಲೇಖಗಳಿವೆ. ಇದು ಅಗಸ್ತ್ಯ ಮುನಿಗಳ ಕಥೆಗಳಿಗೆ ಮತ್ತು ವಿಂಧ್ಯವಾಸಿನಿ ದೇವಿಯ ಆರಾಧನೆಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.`,

      hi: `विन्ध्याचल का संस्कृत साहित्य और महाकाव्यों में व्यापक वर्णन है। यह ऋषि अगस्त्य की कथाओं और विन्ध्यवासिनी देवी के निवास के रूप में प्रसिद्ध है।`
    }
  },

  aravalli: {
    id: "aravalli",

    title: {
      en: "Aravalli",
      kn: "ಅರಾವಳಿ",
      hi: "अरावली"
    },

    facts: {
      height: "1,722 m (Guru Shikhar)",
      range: "West India Shield",
      significance: {
        en: "One of the oldest folded mountain ranges in the world",
        kn: "ವಿಶ್ವದ ಅತ್ಯಂತ ಹಳೆಯ ಮಡಿಕೆ ಪರ್ವತ ಶ್ರೇಣಿ",
        hi: "विश्व की प्राचीनतम पर्वत श्रृंखलाओं में से एक"
      }
    },

    description: {
      en: `The Aravalli range is a heavily eroded mountain chain in northwestern Bharat. It is one of the oldest geological features on Earth. It acts as a natural barrier preventing the eastward expansion of the Thar Desert and influences the groundwater levels and ecology of Rajasthan and neighboring regions.`,

      kn: `ಅರಾವಳಿ ಶ್ರೇಣಿಯು ವಾಯುವ್ಯ ಭಾರತದಲ್ಲಿದೆ ಮತ್ತು ಇದು ವಿಶ್ವದ ಅತ್ಯಂತ ಹಳೆಯ ಪರ್ವತಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಇದು ಥಾರ್ ಮರುಭೂಮಿಯನ್ನು ಹರಡದಂತೆ ತಡೆಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.`,

      hi: `अरावली पर्वत श्रृंखला उत्तर-पश्चिमी भारत में स्थित है और यह पृथ्वी की सबसे पुरानी भौगोलिक संरचनाओं में से एक है।`
    },

    cultural: {
      en: `Aravalli has been a witness to the rise and fall of many civilizations. It is home to the stunning Dilwara Jain temples at Mount Abu and several majestic forts like Chittorgarh and Kumbhalgarh. The range has provided mineral resources and protection to the kingdoms of Rajasthan for centuries.`,

      kn: `ಅರಾವಳಿಯು ಮೌಂಟ್ ಅಬುದಲ್ಲಿರುವ ದಿಲ್ವಾರಾ ಜೈನ ಮಂದಿರಗಳು ಮತ್ತು ಅನೇಕ ಭವ್ಯ ಕೋಟೆಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.`,

      hi: `अरावली माउंट आबू के दिलवाड़ा जैन मंदिरों और चित्तौड़गढ़ जैसे कई राजसी किलों का घर है।`
    }
  },

  malaya: {
    id: "malaya",

    title: {
      en: "Malaya",
      kn: "ಮಲಯ",
      hi: "मलयाचल"
    },

    facts: {
      height: "Varies; high peaks ~1,800 m",
      range: "Southern Western Ghats",
      significance: {
        en: "Famed source of Sandalwood (Chandan)",
        kn: "ಗಂಧದ ಮರಗಳ ಉಗಮಸ್ಥಾನ",
        hi: "चंदन के वृक्षों का स्रोत"
      }
    },

    description: {
      en: `Malaya, referred to in ancient texts, corresponds to the southern portion of the Western Ghats (Kerala and Tamil Nadu). It is a region of dense tropical forests and exceptional biodiversity. It is traditionally known for its cool breezes and the presence of rare medicinal herbs and aromatic trees.`,

      kn: `ಮಲಯ ಪರ್ವತವು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ದಕ್ಷಿಣ ಭಾಗವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ. ಇದು ತನ್ನ ದಟ್ಟವಾದ ಅರಣ್ಯಗಳು ಮತ್ತು ಅಮೂಲ್ಯವಾದ ಗಂಧದ ಮರಗಳಿಗೆ ಹೆಸರುವಾಸಿಯಾಗಿದೆ.`,

      hi: `मलय पर्वत पश्चिमी घाट के दक्षिणी भाग (केरल और तमिलनाडु) को संदर्भित करता है। यह अपने घने वनों और सुगंधित चंदन के वृक्षों के लिए प्रसिद्ध है।`
    },

    cultural: {
      en: `Malaya is celebrated in classical Sanskrit literature as the source of "Malaya-maruta" (the fragrant southern breeze). It is associated with the birth of Siddha medicine and the legends of various sages. The range symbolizes the union of natural beauty and spiritual essence in the southern landscape of Bharat.`,

      kn: `ಮಲಯ ಪರ್ವತದ ಮಲಯ-ಮಾರುತ (ತಂಪಾದ ಗಾಳಿ) ಸಾಹಿತ್ಯದಲ್ಲಿ ಬಹಳ ಪ್ರಸಿದ್ಧವಾಗಿದೆ. ಇದು ಪುರಾತನ ವೈದ್ಯಕೀಯ ಪದ್ಧತಿಗಳಿಗೂ ಸಂಬಂಧಿಸಿದೆ.`,

      hi: `मलयांचल का संस्कृत साहित्य में 'मलय-मारुत' (सुगंधित दक्षिण हवा) के रूप में वर्णन है। यह प्राचीन चिकित्सा पद्धतियों और ऋषि परंपराओं से जुड़ा है।`
    }
  },

  mahendra: {
    id: "mahendra",

    title: {
      en: "Mahendra",
      kn: "ಮಹೇಂದ್ರ",
      hi: "महेन्द्र"
    },

    facts: {
      height: "1,501 m (Mahendragiri)",
      range: "Eastern Ghats",
      significance: {
        en: "Sacred mountain mentioned in Ramayana and Mahabharata",
        kn: "ರಾಮಾಯಣ ಮತ್ತು ಮಹಾಭಾರತದಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾದ ಪವಿತ್ರ ಪರ್ವತ",
        hi: "रामायण और महाभारत में वर्णित पवित्र पर्वत"
      }
    },

    description: {
      en: `Mahendra Giri is a prominent mountain peak in the Eastern Ghats, located in the Gajapati district of Odisha. It forms part of the ancient landscape of eastern Bharat. The region is known for its rugged terrain, rich biodiversity, and proximity to the Bay of Bengal coast.`,

      kn: `ಮಹೇಂದ್ರ ಗಿರಿ ಪೂರ್ವ ಘಟ್ಟಗಳ ಒಂದು ಪ್ರಮುಖ ಶಿಖರವಾಗಿದ್ದು, ಒಡಿಶಾದ ಗಜಪತಿ ಜಿಲ್ಲೆಯಲ್ಲಿ ನೆಲೆಸಿದೆ. ಇದು ಇತಿಹಾಸಪೂರ್ವದ ಭೂಗುಣಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿದೆ.`,

      hi: `महेन्द्र गिरी पूर्वी घाट का एक प्रमुख पर्वत शिखर है, जो ओडिशा के गजपति जिले में स्थित है।`
    },

    cultural: {
      en: `The Mahendra mountain holds a special place in Bharatiya epics as a site for severe penance (tapasya) by various sages, notably Parashurama. It is believed to be the place where Lord Hanuman took his leap across the ocean. The hill is dotted with ancient temples and is a center of regional pilgrimage and legends.`,

      kn: `ಮಹೇಂದ್ರ ಪರ್ವತವು ಪರಶುರಾಮನ ತಪಸ್ಸು ಮಾಡಿದ ಸ್ಥಳವೆಂದು ಮತ್ತು ಹನುಮಂತನು ಸಮುದ್ರ ಹಾರಿದ ಸ್ಥಳವೆಂದು ಪುರಾಣಗಳಲ್ಲಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.`,

      hi: `महेन्द्र पर्वत को भगवान परशुराम की तपोस्थली और हनुमान जी की समुद्र की ओर छलांग लगाने के स्थान के रूप में माना जाता है।`
    }
  },

  raivataka: {
    id: "raivataka",

    title: {
      en: "Raivataka",
      kn: "ರೈವತಕ",
      hi: "रैवतक"
    },

    facts: {
      height: "1,031 m",
      range: "Girnar Massif (Gujarat)",
      significance: {
        en: "Ancient sacred mountain associated with the Yadava clan",
        kn: "ಯಾದವ ವಂಶದೊಂದಿಗೆ ನಂಟು ಹೊಂದಿರುವ ಪ್ರಾಚೀನ ಪವಿತ್ರ ಬೆಟ್ಟ",
        hi: "यादव वंश से जुड़ा प्राचीन पवित्र पर्वत"
      }
    },

    description: {
      en: `Raivataka, known today as Girnar Hills in Junagadh, Gujarat, is a group of ancient volcanic hills. It has been a sacred landscape for over two millennia. The mountain is known for its steep trails and numerous temples and caves that span across various historical periods. It offers a panoramic view of the surrounding plains of Saurashtra.`,

      kn: `ರೈವತಕ ಅಥವ ಗಿರ್ನಾರ್ ಬೆಟ್ಟಗಳು ಗುಜರಾತ್ನ್ ಜುನಾಗಡದಲ್ಲಿವೆ. ಇವು ಹಳೆಯ ಜ್ವಾಲಾಮುಖಿ ಬೆಟ್ಟಗಳಾಗಿದ್ದು, ಸಾವಿರಾರು ವರ್ಷಗಳಿಂದ ಪವಿತ್ರವೆಂದು ಪರಿಗಣಿಸಲ್ಪಟ್ಟಿವೆ.`,

      hi: `रैवतक, जिसे आज गिरनार की पहाड़ियाँ कहा जाता है, गुजरात के जूनागढ़ में स्थित है। यह सदियों से एक पवित्र स्थल रहा है।`
    },

    cultural: {
      en: `Raivataka is prominently mentioned in ancient texts such as the Mahabharata, where it is associated with the Yadava kingdom and the life of Lord Krishna. The mountain served as a sacred site for festivals and royal gatherings. In later traditions, Girnar (Raivataka) became an important center for Hindu, Jain, and Nath traditions, symbolizing spiritual ascent and endurance. Its layered history reflects the continuity of sacred geography in Bharat.`,

      kn: `ರೈವತಕ ಪರ್ವತವು ಮಹಾಭಾರತದಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾಗಿದ್ದು, ಯಾದವ ವಂಶ ಮತ್ತು ಶ್ರೀಕೃಷ್ಣನೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದೆ. ಇದು ಯಾತ್ರೆಗಳು ಮತ್ತು ರಾಜಕೀಯ ಸಮಾರಂಭಗಳ ಕೇಂದ್ರವಾಗಿತ್ತು. ನಂತರ ಗಿರ್ನಾರ್ (ರೈವತಕ) ಹಿಂದು, ಜೈನ ಮತ್ತು ನಾಥ ಪರಂಪರೆಗಳ ಪ್ರಮುಖ ಧಾರ್ಮಿಕ ಕೇಂದ್ರವಾಯಿತು.`,

      hi: `रैवतक पर्वत का उल्लेख महाभारत में मिलता है और यह यादवों तथा भगवान कृष्ण से जुड़ा हुआ है। यह प्राचीन काल में धार्मिक और राजकीय आयोजनों का केंद्र था। आगे चलकर गिरनार (रैवतक) हिन्दू, जैन और नाथ परंपराओं का प्रमुख तीर्थ बन गया।`
    }
  }
};
