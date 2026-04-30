export interface CityKnowledge {
  id: string;
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  identity: {
    region: {
      en: string;
      kn: string;
      hi: string;
    };
    river: {
      en: string;
      kn: string;
      hi: string;
    };
    era: {
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
  spiritual: {
    en: string;
    kn: string;
    hi: string;
  };
  living: {
    en: string;
    kn: string;
    hi: string;
  };
}

export const cityKnowledge: Record<string, CityKnowledge> = {
  ayodhya: {
    id: "ayodhya",

    title: {
      en: "Ayodhya",
      kn: "ಅಯೋಧ್ಯಾ",
      hi: "अयोध्या"
    },

    identity: {
      region: {
        en: "Uttar Pradesh",
        kn: "ಉತ್ತರ ಪ್ರದೇಶ",
        hi: "उत्तर प्रदेश"
      },
      river: {
        en: "Sarayu River",
        kn: "ಸರಯು ನದಿ",
        hi: "ಸರಯು ನದಿ"
      },
      era: {
        en: "Ancient Epic Period",
        kn: "ಪ್ರಾಚೀನ ಇತಿಹಾಸ ಕಾಲ",
        hi: "प्राचीन महाकाव्य काल"
      }
    },

    description: {
      en: `Ayodhya is one of the oldest continuously inhabited cities in Bharat, located on the banks of the Sarayu River. It is described extensively in ancient texts such as the Ramayana as the capital of the Kosala kingdom. The city has been a center of political, cultural, and religious life for thousands of years.`,

      kn: `ಅಯೋಧ್ಯಾ ಭಾರತದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ನಗರಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ ಮತ್ತು ಸರಯು ನದಿಯ ತೀರದಲ್ಲಿ ಇದೆ. ರಾಮಾಯಣದಲ್ಲಿ ಇದು ಕೋಸಲ ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿ ವಿವರಿಸಲಾಗಿದೆ.`,

      hi: `अयोध्या भारत के सबसे प्राचीन नगरों में से एक है और सरयू नदी के तट पर स्थित है। रामायण में इसे कोसल राज्य की राजधानी के रूप में वर्णित किया गया है।`
    },

    spiritual: {
      en: `Ayodhya holds supreme importance in Hindu tradition as the birthplace of Lord Rama, one of the most revered deities. It is one of the Sapta Puri — the seven sacred cities believed to grant liberation (moksha). The city is deeply embedded in devotional practices, temple traditions, and pilgrimage routes across Bharat.`,

      kn: `ಅಯೋಧ್ಯಾ ಹಿಂದು ಧರ್ಮದಲ್ಲಿ ಅತ್ಯಂತ ಪವಿತ್ರ ನಗರವಾಗಿದ್ದು ಶ್ರೀರಾಮನ ಜನ್ಮಸ್ಥಳವಾಗಿದೆ. ಇದು ಮೋಕ್ಷವನ್ನು ನೀಡುವ ಸಪ್ತಪುರಿಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ.`,

      hi: `अयोध्या हिंदू धर्म में अत्यंत पवित्र मानी जाती है और भगवान राम की जन्मभूमि है। यह सप्तपुरी में से एक है, जिन्हें मोक्ष प्रदान करने वाला माना जाता है।`
    },

    living: {
      en: `Ayodhya continues to be a major center of pilgrimage and religious gatherings. Festivals like Ram Navami and Deepotsav attract thousands of devotees every year. The city remains vibrant with temples, rituals, and continuous spiritual activity, preserving its ancient legacy in modern times.`,

      kn: `ಅಯೋಧ್ಯಾ ಇಂದು ಸಹ ಪ್ರಮುಖ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದೆ. ರಾಮನವಮಿ ಮತ್ತು ದೀಪೋತ್ಸವದಂತಹ ಹಬ್ಬಗಳು ಸಾವಿರಾರು ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತವೆ.`,

      hi: `अयोध्या आज भी एक प्रमुख तीर्थ स्थल है। राम नवमी और दीपोत्सव जैसे त्योहार हजारों श्रद्धालुओं को आकर्षित करते हैं।`
    }
  },

  takshashila: {
    id: "takshashila",
  
    title: {
      en: "Takshashila",
      kn: "ತಕ್ಷಶಿಲಾ",
      hi: "तक्षशिला"
    },
  
    identity: {
      region: {
        en: "Gandhara (Modern Pakistan)",
        kn: "ಗಾಂಧಾರ (ಇಂದಿನ ಪಾಕಿಸ್ತಾನ)",
        hi: "गंधार (वर्तमान पाकिस्तान)"
      },
      river: {
        en: "Indus Region",
        kn: "ಸಿಂಧು ಪ್ರದೇಶ",
        hi: "ಸಿಂಧು ಪ್ರದೇಶ"
      },
      era: {
        en: "Ancient (c. 5th century BCE)",
        kn: "ಪ್ರಾಚೀನ ಕಾಲ",
        hi: "प्राचीन काल"
      }
    },
  
    description: {
      en: `Takshashila was one of the world's earliest centers of higher learning, located in the ancient region of Gandhara. It attracted students from across Asia and served as a hub of knowledge, philosophy, and political thought. The city flourished as a center of education, trade, and cultural exchange for centuries.`,
  
      kn: `ತಕ್ಷಶಿಲಾ ಪ್ರಪಂಚದ ಅತ್ಯಂತ ಹಳೆಯ ವಿದ್ಯಾ ಕೇಂದ್ರಗಳಲ್ಲಿ ಒಂದಾಗಿತ್ತು. ಇದು ಗಾಂಧಾರ ಪ್ರದೇಶದಲ್ಲಿ ಸ್ಥಿತವಾಗಿದ್ದು, ಏಷ್ಯಾದ ವಿವಿಧಭಾಗಗಳಿಂದ ವಿದ್ಯಾರ್ಥಿಗಳನ್ನು ಆಕರ್ಷಿಸಿತು.`,
  
      hi: `तक्षशिला विश्व के सबसे प्राचीन शिक्षा केंद्रों में से एक था। यह गंधार क्षेत्र में स्थित था और एशिया के विभिन्न भागों से छात्रों को आकर्षित करता था।`
    },
  
    spiritual: {
      en: `Takshashila was not only a center of learning but also a place of philosophical and spiritual exploration. It was associated with Buddhist traditions and played a role in the spread of knowledge across regions. The city reflects the intellectual depth and openness of ancient Indian civilization.`,
  
      kn: `ತಕ್ಷಶಿಲಾ ಬೌದ್ಧ ಧರ್ಮ ಮತ್ತು ತತ್ವಶಾಸ್ತ್ರದ ಅಧ್ಯಯನ ಕೇಂದ್ರವಾಗಿತ್ತು ಮತ್ತು ಜ್ಞಾನ ಪ್ರಸಾರದಲ್ಲಿ ಮಹತ್ವದ ಪಾತ್ರವಹಿಸಿತು.`,
  
      hi: `तक्षशिला बौद्ध परंपरा और दर्शन का प्रमुख केंद्र था और ज्ञान के प्रसार में महत्वपूर्ण भूमिका निभाता था।`
    },
  
    living: {
      en: `Today, Takshashila exists as an archaeological site, preserving the remains of ancient universities, monasteries, and urban structures. It stands as a symbol of the intellectual heritage of Bharat and continues to be studied by historians and scholars worldwide.`,
  
      kn: `ಇಂದು ತಕ್ಷಶಿಲಾ ಪುರಾತತ್ವ ಸ್ಥಳವಾಗಿ ಉಳಿದಿದ್ದು, ಪ್ರಾಚೀನ ವಿಶ್ವವಿದ್ಯಾಲಯಗಳ ಅವಶೇಷಗಳನ್ನು ಸಂರಕ್ಷಿಸುತ್ತದೆ.`,
  
      hi: `आज तक्षशिला एक पुरातात्विक स्थल के रूप में विद्यमान है, जहाँ प्राचीन विश्वविद्यालयों के अवशेष संरक्षित हैं।`
    }
  },

  amritsar: {
    id: "amritsar",
  
    title: {
      en: "Amritsar",
      kn: "ಅಮೃತಸರ",
      hi: "अमृतसर"
    },
  
    identity: {
      region: {
        en: "Punjab",
        kn: "ಪಂಜಾಬ್",
        hi: "पंजाब"
      },
      river: {
        en: "Beas River Region",
        kn: "ಬಿಯಾಸ್ ನದಿ ಪ್ರದೇಶ",
        hi: "ಬಿಯಾಸ್ ನದಿ ಪ್ರದೇಶ"
      },
      era: {
        en: "Medieval (16th century CE)",
        kn: "ಮಧ್ಯಯುಗ",
        hi: "मध्यकाल"
      }
    },
  
    description: {
      en: `Amritsar is a major city in Punjab and the spiritual center of Sikhism. It was founded in the 16th century and has since developed into a major cultural and religious hub. The city is known for its historical significance and vibrant community life.`,
  
      kn: `ಅಮೃತಸರ ಪಂಜಾಬ್ನ ಪ್ರಮುಖ ನಗರವಾಗಿದ್ದು ಸಿಖ್ ಧರ್ಮದ ಆಧ್ಯಾತ್ಮಿಕ ಕೇಂದ್ರವಾಗಿದೆ. ಇದು 16ನೇ ಶತಮಾನದಲ್ಲಿ ಸ್ಥಾಪಿತವಾಯಿತು.`,
  
      hi: `अमृतसर पंजाब का एक प्रमुख शहर है और सिख धर्म का आध्यात्मिक केंद्र है। इसकी स्थापना 16वीं शताब्दी में हुई थी।`
    },
  
    spiritual: {
      en: `Amritsar is home to the Golden Temple (Harmandir Sahib), the holiest shrine of Sikhism. The temple represents equality, service (seva), and devotion. It attracts millions of pilgrims every year and stands as a symbol of faith, humility, and unity.`,
  
      kn: `ಅಮೃತಸರದಲ್ಲಿರುವ ಹರಮಂದಿರ ಸಾಹಿಬ್ (ಸುವರ್ಣ ಮಂದಿರ) ಸಿಖ್ ಧರ್ಮದ ಅತ್ಯಂತ ಪವಿತ್ರ ಸ್ಥಳವಾಗಿದೆ.`,
  
      hi: `अमृतसर में स्थित हरमंदिर साहिब (स्वर्ण मंदिर) सिख धर्म का सबसे पवित्र स्थल है।`
    },
  
    living: {
      en: `Amritsar remains an active center of worship, community service, and cultural identity. The tradition of langar (community kitchen) serves thousands of people daily, reflecting the core values of Sikhism. The city continues to thrive as a place of faith and collective harmony.`,
  
      kn: `ಅಮೃತಸರದಲ್ಲಿ ಲಂಗರ್ ಪರಂಪರೆ ಸಾವಿರಾರು ಜನರಿಗೆ ಪ್ರತಿದಿನ ಉಚಿತ ಆಹಾರವನ್ನು ಒದಗಿಸುತ್ತದೆ, ಇದು ಸಮಾನತೆ ಮತ್ತು ಸೇವೆಯ ಸಂಕೇತವಾಗಿದೆ.`,
  
      hi: `अमृतसर में लंगर की परंपरा प्रतिदिन हजारों लोगों को भोजन प्रदान करती है, जो सेवा और समानता का प्रतीक है।`
    }
  },

  mathura: {
    id: "mathura",
  
    title: {
      en: "Mathura",
      kn: "ಮಥುರಾ",
      hi: "मथुरा"
    },
  
    identity: {
      region: {
        en: "Uttar Pradesh",
        kn: "ಉತ್ತರ ಪ್ರದೇಶ",
        hi: "उत्तर प्रदेश"
      },
      river: {
        en: "Yamuna River",
        kn: "ಯಮುನಾ ನದಿ",
        hi: "यमुना नदी"
      },
      era: {
        en: "Ancient Epic Period",
        kn: "ಪ್ರಾಚೀನ ಕಾಲ",
        hi: "प्राचीन काल"
      }
    },
  
    description: {
      en: `Mathura is one of the most ancient cities of Bharat, located on the banks of the Yamuna River. It has been a major center of culture, trade, and religion since ancient times. The city is closely associated with the early life of Lord Krishna and has remained a continuous center of settlement and devotion.`,
  
      kn: `ಮಥುರಾ ಯಮುನಾ ನದಿಯ ತೀರದಲ್ಲಿರುವ ಭಾರತದ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ನಗರಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಇದು ಶ್ರೀಕೃಷ್ಣನ ಬಾಲ್ಯದೊಂದಿಗೆ ಸಂಬಂಧ ಹೊಂದಿದೆ.`,
  
      hi: `मथुरा यमुना नदी के तट पर स्थित भारत के सबसे प्राचीन नगरों में से एक है। यह भगवान कृष्ण के बाल्यकाल से जुड़ी हुई है।`
    },
  
    spiritual: {
      en: `Mathura holds immense spiritual significance as the birthplace of Lord Krishna. It is one of the most important pilgrimage centers in Hindu tradition and forms part of the Braj region, which includes Vrindavan and Govardhan. The city represents divine love, devotion (bhakti), and the leelas of Krishna.`,
  
      kn: `ಮಥುರಾ ಶ್ರೀಕೃಷ್ಣನ ಜನ್ಮಸ್ಥಳವಾಗಿದ್ದು ಭಕ್ತಿಯ ಪ್ರಮುಖ ಕೇಂದ್ರವಾಗಿದೆ. ಇದು ಬ್ರಜ ಪ್ರದೇಶದ ಭಾಗವಾಗಿದೆ.`,
  
      hi: `मथुरा भगवान कृष्ण की जन्मभूमि है और भक्ति परंपरा का प्रमुख केंद्र है। यह ब्रज क्षेत्र का हिस्सा है।`
    },
  
    living: {
      en: `Mathura continues to thrive as a vibrant center of devotion. Festivals like Janmashtami and Holi are celebrated with great enthusiasm, attracting devotees from across the world. Temples, rituals, and continuous worship keep the spiritual atmosphere of the city alive.`,
  
      kn: `ಮಥುರಾದಲ್ಲಿ ಜನ್ಮಾಷ್ಟಮಿ ಮತ್ತು ಹೋಳಿ ಹಬ್ಬಗಳನ್ನು ಭವ್ಯವಾಗಿ ಆಚರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಸಾವಿರಾರು ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.`,
  
      hi: `मथुरा में जन्माष्टमी और होली जैसे त्योहार अत्यंत उत्साह के साथ मनाये जाते हैं और हजारों श्रद्धालुओं को आकर्षित करते हैं।`
    }
  },

  indraprastha: {
    id: "indraprastha",
  
    title: {
      en: "Indraprastha",
      kn: "ಇಂದ್ರಪ್ರಸ್ಥ",
      hi: "इंद्रप्रस्थ"
    },
  
    identity: {
      region: {
        en: "Delhi Region",
        kn: "ದೆಹಲಿ ಪ್ರದೇಶ",
        hi: "दिल्ली क्षेत्र"
      },
      river: {
        en: "Yamuna River",
        kn: "ಯಮುನಾ ನದಿ",
        hi: "ಯಮುನಾ ನದಿ"
      },
      era: {
        en: "Mahabharata Period",
        kn: "ಮಹಾಭಾರತ ಕಾಲ",
        hi: "महाभारत काल"
      }
    },
  
    description: {
      en: `Indraprastha is described in the Mahabharata as the magnificent capital established by the Pandavas. Located in the region of present-day Delhi, it was known for its planned layout, grand architecture, and political importance. The city represents one of the earliest examples of organized urban development in ancient Indian narratives.`,
  
      kn: `ಇಂದ್ರಪ್ರಸ್ಥ ಮಹಾಭಾರತದಲ್ಲಿ ಪಾಂಡವರ ರಾಜಧಾನಿಯಾಗಿ ವಿವರಿಸಲ್ಪಟ್ಟಿದೆ ಮತ್ತು ಇಂದಿನ ದೆಹಲಿ ಪ್ರದೇಶದಲ್ಲಿ ಇದ್ದದ್ದು ಎಂದು ಪರಿಗಣಿಸಲಾಗಿದೆ.`,
  
      hi: `इंद्रप्रस्थ महाभारत में पांडवों की राजधानी के रूप में वर्णित है और इसे वर्तमान दिल्ली क्षेत्र से जोड़ा जाता है।`
    },
  
    spiritual: {
      en: `Indraprastha holds significance within the Mahabharata as a symbol of dharma, governance, and righteous rule. It is associated with key events leading to the Kurukshetra war and represents the ideals of just leadership and moral responsibility.`,
  
      kn: `ಇಂದ್ರಪ್ರಸ್ಥ ಧರ್ಮ ಮತ್ತು ನ್ಯಾಯದ ಆಡಳಿತದ ಸಂಕೇತವಾಗಿದ್ದು ಮಹಾಭಾರತದ ಪ್ರಮುಖ ಘಟನೆಗಳಿಗೆ ಸಂಬಂಧಿಸಿದೆ.`,
  
      hi: `इंद्रप्रस्थ धर्म और न्यायपूर्ण शासन का प्रतीक है और महाभारत की प्रमुख घटनाओं से जुड़ा हुआ है।`
    },
  
    living: {
      en: `While Indraprastha does not exist as a visible ancient city today, its legacy continues through the historical and cultural identity of Delhi. Archaeological findings and traditions keep its memory alive as part of India's epic heritage.`,
  
      kn: `ಇಂದ್ರಪ್ರಸ್ಥ ಇಂದು ದೃಶ್ಯವಾಗಿ ಇಲ್ಲದಿದ್ದರೂ, ಅದರ ಪರಂಪರೆ ದೆಹಲಿ ನಗರದ ಇತಿಹಾಸದಲ್ಲಿ ಜೀವಂತವಾಗಿದೆ.`,
  
      hi: `इंद्रप्रस्थ आज भौतिक रूप में मौजूद नहीं है, लेकिन इसकी परंपरा दिल्ली की ऐतिहासिक पहचान में जीवित है।`
    }
  },

  prayag: {
    id: "prayag",
  
    title: {
      en: "Prayag",
      kn: "ಪ್ರಯಾಗ",
      hi: "प्रयाग"
    },
  
    identity: {
      region: {
        en: "Uttar Pradesh",
        kn: "ಉತ್ತರ ಪ್ರದೇಶ",
        hi: "उत्तर प्रदेश"
      },
      river: {
        en: "Ganga • Yamuna • Saraswati (confluence)",
        kn: "ಗಂಗಾ • ಯಮುನಾ • ಸರಸ್ವತಿ",
        hi: "गंगा • यमुना • सरस्वती"
      },
      era: {
        en: "Ancient Vedic Period",
        kn: "ವೇದ ಕಾಲ",
        hi: "वैदिक काल"
      }
    },
  
    description: {
      en: `Prayag, located at the confluence of the Ganga and Yamuna rivers, with the mythical Saraswati believed to join underground, has been a center of spiritual significance since ancient times. It is one of the most important pilgrimage sites in Bharat and has been mentioned in Vedic and Puranic texts.`,
  
      kn: `ಪ್ರಯಾಗ ಗಂಗಾ ಮತ್ತು ಯಮುನಾ ನದಿಗಳ ಸಂಗಮ ಸ್ಥಳವಾಗಿದ್ದು, ಸರಸ್ವತಿ ನದಿಯೂ ಅಡಿಯಲ್ಲಿ ಸೇರುತ್ತದೆ ಎಂದು ನಂಬಲಾಗಿದೆ. ಇದು ಪವಿತ್ರ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದೆ.`,
  
      hi: `प्रयाग गंगा और यमुना नदियों के संगम पर स्थित है, जहाँ सरस्वती के भी मिलने का विश्वास है। यह प्राचीन काल से एक प्रमुख तीर्थ स्थल रहा है।`
    },
  
    spiritual: {
      en: `Prayag is considered the holiest of all pilgrimage sites, often referred to as "Tirtharaj" (King of Pilgrimage Sites). The Triveni Sangam represents the union of physical and spiritual elements, symbolizing purification and liberation. The Kumbh Mela held here is one of the largest religious gatherings in the world.`,
  
      kn: `ಪ್ರಯಾಗವನ್ನು "ತೀರ್ಥರಾಜ" ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ ಮತ್ತು ಇದು ಅತ್ಯಂತ ಪವಿತ್ರ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದೆ. ಕುಂಭಮೇಳ ಇಲ್ಲಿ ನಡೆಯುತ್ತದೆ.`,
  
      hi: `प्रयाग को "तीर्थराज" कहा जाता है और यह सबसे पवित्र तीर्थ स्थलों में से एक है। यहाँ कुंभ मेला आयोजित होता है।`
    },
  
    living: {
      en: `Prayag continues to be a vibrant center of pilgrimage and ritual activity. Millions of devotees visit the Sangam for ritual bathing, especially during festivals like Kumbh Mela and Magh Mela. The city remains deeply connected to spiritual practices and traditions.`,
  
      kn: `ಪ್ರಯಾಗದಲ್ಲಿ ಲಕ್ಷಾಂತರ ಭಕ್ತರು ಸಂಗಮದಲ್ಲಿ ಸ್ನಾನ ಮಾಡಲು ಬರುತ್ತಾರೆ, ವಿಶೇಷವಾಗಿ ಕುಂಭಮೇಳದ ಸಮಯದಲ್ಲಿ.`,
  
      hi: `प्रयाग में लाखों श्रद्धालु संगम में स्नान करने आते हैं, विशेषकर कुंभ मेले के दौरान।`
    }
  },

  vaishali: {
    id: "vaishali",
  
    title: {
      en: "Vaishali",
      kn: "ವೈಶಾಲಿ",
      hi: "वैशाली"
    },
  
    identity: {
      region: {
        en: "Bihar",
        kn: "ಬಿಹಾರ",
        hi: "बिहार"
      },
      river: {
        en: "Ganga Basin Region",
        kn: "ಗಂಗಾ ಕಣಿವೆ ಪ್ರದೇಶ",
        hi: "गंगा घाटी क्षेत्र"
      },
      era: {
        en: "Ancient (c. 6th century BCE)",
        kn: "ಪ್ರಾಚೀನ ಕಾಲ",
        hi: "प्राचीन काल"
      }
    },
  
    description: {
      en: `Vaishali was one of the world's earliest known republics, governed by a system of elected representatives. Located in present-day Bihar, it was a prosperous and well-organized city during ancient times, playing a crucial role in political and social development in early Indian civilization.`,
  
      kn: `ವೈಶಾಲಿ ಪ್ರಪಂಚದ ಮೊದಲ ಗಣರಾಜ್ಯಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು, ಪ್ರಜಾಪ್ರಭುತ್ವ ವ್ಯವಸ್ಥೆಯನ್ನು ಅನುಸರಿಸಿತು.`,
  
      hi: `वैशाली विश्व के सबसे प्राचीन गणराज्यों में से एक था और यह लोकतांत्रिक व्यवस्था के लिए जाना जाता है।`
    },
  
    spiritual: {
      en: `Vaishali holds deep spiritual significance in both Buddhism and Jainism. It is associated with Lord Mahavira, who was born nearby, and with Gautama Buddha, who delivered his last sermon here. The city represents a major center of spiritual transformation and philosophical development.`,
  
      kn: `ವೈಶಾಲಿ ಬೌದ್ಧ ಮತ್ತು ಜೈನ ಧರ್ಮಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ಪವಿತ್ರ ಸ್ಥಳವಾಗಿದೆ. ಮಹಾವೀರ ಮತ್ತು ಬುದ್ಧರೊಂದಿಗೆ ಇದರ ಸಂಬಂಧ ಇದೆ.`,
  
      hi: `वैशाली बौद्ध और जैन धर्म दोनों के लिए महत्वपूर्ण है। यह भगवान महावीर और गौतम बुद्ध से जुड़ा हुआ है।`
    },
  
    living: {
      en: `Today, Vaishali exists as an important archaeological and pilgrimage site. It attracts scholars, historians, and spiritual seekers interested in early republican governance and religious traditions. The remains of ancient stupas and structures continue to reflect its historical legacy.`,
  
      kn: `ವೈಶಾಲಿ ಇಂದು ಪುರಾತತ್ವ ಮತ್ತು ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿ ಉಳಿದಿದ್ದು, ಅದರ ಇತಿಹಾಸವನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.`,
  
      hi: `आज वैशाली एक महत्वपूर्ण पुरातात्विक और तीर्थ स्थल है, जो अपने ऐतिहासिक महत्व को दर्शाता है।`
    }
  },

  pataliputra: {
    id: "pataliputra",
  
    title: {
      en: "Pataliputra",
      kn: "ಪಾಟಲಿಪುತ್ರ",
      hi: "पाटलिपुत्र"
    },
  
    identity: {
      region: {
        en: "Bihar",
        kn: "ಬಿಹಾರ",
        hi: "बिहार"
      },
      river: {
        en: "Ganga River Basin",
        kn: "ಗಂಗಾ ಕಣಿವೆ",
        hi: "गंगा घाटी"
      },
      era: {
        en: "Ancient (Mauryan & Gupta Period)",
        kn: "ಮೌರ್ಯ ಮತ್ತು ಗುಪ್ತ ಕಾಲ",
        hi: "मौर्य और गुप्त काल"
      }
    },
  
    description: {
      en: `Pataliputra, located near present-day Patna, was one of the greatest cities of ancient Bharat. It served as the capital of powerful empires such as the Maurya and Gupta dynasties. The city was strategically located along the Ganga, enabling trade, administration, and expansion of political power.`,
  
      kn: `ಪಾಟಲಿಪುತ್ರವು ಇಂದಿನ ಪಾಟ್ನಾ ಸಮೀಪದಲ್ಲಿದ್ದು, ಮೌರ್ಯ ಮತ್ತು ಗುಪ್ತ ಸಾಮ್ರಾಜ್ಯಗಳ ರಾಜಧಾನಿಯಾಗಿತ್ತು. ಇದು ಗಂಗಾ ನದಿಯ ತೀರದಲ್ಲಿ ಇರುವುದರಿಂದ ವ್ಯಾಪಾರ ಮತ್ತು ಆಡಳಿತಕ್ಕೆ ಸಹಾಯಕವಾಗಿತ್ತು.`,
  
      hi: `पाटलिपुत्र वर्तमान पटना के पास स्थित था और मौर्य तथा गुप्त साम्राज्यों की राजधानी रहा। यह गंगा के किनारे स्थित होने के कारण व्यापार और प्रशासन का प्रमुख केंद्र था।`
    },
  
    spiritual: {
      en: `Although primarily known as a political center, Pataliputra was also a hub of intellectual and spiritual activity. It played a significant role in the spread of Buddhism under Emperor Ashoka and supported philosophical discourse and learning across traditions.`,
  
      kn: `ಪಾಟಲಿಪುತ್ರವು ರಾಜಕೀಯ ಕೇಂದ್ರವಾಗಿದ್ದರೂ, ಬೌದ್ಧ ಧರ್ಮದ ಪ್ರಸಾರ ಮತ್ತು ಜ್ಞಾನ ಚರ್ಚೆಗಳ ಕೇಂದ್ರವಾಗಿತ್ತು.`,
  
      hi: `पाटलिपुत्र राजनीतिक केंद्र होने के साथ-साथ बौद्ध धर्म के प्रसार और ज्ञान के विकास का भी केंद्र था।`
    },
  
    living: {
      en: `Today, the legacy of Pataliputra continues through the modern city of Patna. Archaeological findings and historical studies preserve its memory as one of the greatest administrative and urban centers of ancient India.`,
  
      kn: `ಇಂದು ಪಾಟಲಿಪುತ್ರದ ಪರಂಪರೆ ಪಾಟ್ನಾ ನಗರದಲ್ಲಿ ಮುಂದುವರಿಯುತ್ತದೆ.`,
  
      hi: `आज पाटलिपुत्र की विरासत पटना शहर के माध्यम से जीवित है।`
    }
  },

  gaya: {
    id: "gaya",
  
    title: {
      en: "Gaya",
      kn: "ಗಯಾ",
      hi: "गया"
    },
  
    identity: {
      region: {
        en: "Bihar",
        kn: "ಬಿಹಾರ",
        hi: "बिहार"
      },
      river: {
        en: "Phalgu River",
        kn: "ಫಲ್ಗು ನದಿ",
        hi: "ಫಲ್ಗು ನದಿ"
      },
      era: {
        en: "Ancient",
        kn: "ಪ್ರಾಚೀನ ಕಾಲ",
        hi: "प्राचीन काल"
      }
    },
  
    description: {
      en: `Gaya is one of the most important pilgrimage sites in Bharat, located in the state of Bihar. It has been a center of spiritual practices for thousands of years and is associated with rituals for ancestors and liberation (moksha). The city holds significance across multiple religious traditions.`,
  
      kn: `ಗಯಾ ಭಾರತದಲ್ಲಿ ಪ್ರಮುಖ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದ್ದು, ಪೂರ್ವಜರಿಗಾಗಿ ನಡೆಯುವ ವಿಧಿವಿಧಾನಗಳಿಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.`,
  
      hi: `गया भारत का एक प्रमुख तीर्थ स्थल है, जो पितरों के श्राद्ध और मोक्ष से संबंधित अनुष्ठानो के लिए प्रसिद्ध है।`
    },
  
    spiritual: {
      en: `Gaya is considered one of the most sacred places for performing rituals for ancestors (Pind Daan), believed to grant peace and liberation to departed souls. It is also closely associated with Buddhism, as Bodh Gaya nearby is the place where Gautama Buddha attained enlightenment. The city represents a deep connection between life, death, and spiritual liberation.`,
  
      kn: `ಗಯಾ ಪಿಂಡ ದಾನಕ್ಕಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದ್ದು, ಇದು ಆತ್ಮಗಳಿಗೆ ಶಾಂತಿ ನೀಡುತ್ತದೆ ಎಂದು ನಂಬಲಾಗಿದೆ. ಬೌದ್ಧ ಧರ್ಮಕ್ಕೂ ಇದು ಸಂಬಂಧಿಸಿದೆ.`,
  
      hi: `गया पिंड दान के लिए प्रसिद्ध है, जहाँ पूर्वजों की आत्मा की शांति के लिए अनुष्ठान किए जाते हैं। यह बौद्ध धर्म से भी जुड़ा हुआ है।`
    },
  
    living: {
      en: `Gaya continues to attract pilgrims from across Bharat and beyond. Rituals, temples, and spiritual practices are actively performed, making it a living center of faith and tradition. The city remains deeply rooted in its ancient spiritual identity.`,
  
      kn: `ಗಯಾ ಇಂದು ಸಹ ಸಾವಿರಾರು ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ ಮತ್ತು ಧಾರ್ಮಿಕ ಆಚರಣೆಗಳು ನಿರಂತರವಾಗಿ ನಡೆಯುತ್ತವೆ.`,
  
      hi: `गया आज भी एक जीवंत तीर्थ स्थल है, जहाँ श्रद्धालु निरंतर आते हैं और धार्मिक अनुष्ठान करते हैं।`
    }
  },

  dwarka: {
    id: "dwarka",
  
    title: {
      en: "Dwarka",
      kn: "ದ್ವಾರಕಾ",
      hi: "द्वारका"
    },
  
    identity: {
      region: {
        en: "Gujarat",
        kn: "ಗುಜರಾತ್",
        hi: "गुजरात"
      },
      river: {
        en: "Arabian Sea Coast",
        kn: "ಅರಬ್ಬಿ ಸಮುದ್ರ ತೀರ",
        hi: "अरब सागर तट"
      },
      era: {
        en: "Mahabharata Period",
        kn: "ಮಹಾಭಾರತ ಕಾಲ",
        hi: "महाभारत काल"
      }
    },
  
    description: {
      en: `Dwarka is an ancient coastal city located on the western edge of Bharat, believed to be the kingdom established by Lord Krishna after leaving Mathura. It is described in the Mahabharata and other texts as a grand and prosperous city built along the sea. Archaeological findings suggest the presence of submerged structures near the coast, adding depth to its historical and mythological significance.`,
  
      kn: `ದ್ವಾರಕಾ ಪಶ್ಚಿಮ ಭಾರತದ ಸಮುದ್ರ ತೀರದಲ್ಲಿರುವ ಪುರಾತನ ನಗರವಾಗಿದ್ದು, ಶ್ರೀಕೃಷ್ಣನ ರಾಜ್ಯವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. ಸಮುದ್ರದ ಅಡಿಯಲ್ಲಿ ಪುರಾತನ ನಿರ್ಮಾಣಗಳ ಗುರುತುಗಳು ಕಂಡುಬಂದಿವೆ.`,
  
      hi: `द्वारका भारत के पश्चिमी तट पर स्थित एक प्राचीन नगर है, जिसे भगवान कृष्ण का राज्य माना जाता है। समुद्र के नीचे संरचनाओं के प्रमाण इसके ऐतिहासिक महत्व को दर्शाते हैं।`
    },
  
    spiritual: {
      en: `Dwarka is one of the Char Dham pilgrimage sites and holds immense significance in Hindu tradition. It represents Krishna’s role as a king, strategist, and guide. The Dwarkadhish Temple remains a major center of devotion, attracting pilgrims from across the country.`,
  
      kn: `ದ್ವಾರಕಾ ಚಾರಧಾಮಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು, ಶ್ರೀಕೃಷ್ಣನ ಭಕ್ತಿಯ ಪ್ರಮುಖ ಕೇಂದ್ರವಾಗಿದೆ.`,
  
      hi: `द्वारका चार धामों में से एक है और भगवान कृष्ण की भक्ति का प्रमुख केंद्र है।`
    },
  
    living: {
      en: `Dwarka continues to be an active pilgrimage city, with temples, rituals, and coastal traditions shaping daily life. The city's connection to the sea and its mythological roots create a unique blend of devotion and history.`,
  
      kn: `ದ್ವಾರಕಾ ಇಂದು ಸಹ ಪ್ರಮುಖ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದ್ದು, ಭಕ್ತರು ನಿರಂತರವಾಗಿ ಭೇಟಿ ನೀಡುತ್ತಾರೆ.`,
  
      hi: `द्वारका आज भी एक प्रमुख तीर्थ स्थल है, जहाँ श्रद्धालु निरंतर आते हैं।`
    }
  },

  somnath: {
    id: "somnath",
  
    title: {
      en: "Somnath",
      kn: "ಸೋಮನಾಥ",
      hi: "सोमनाथ"
    },
  
    identity: {
      region: {
        en: "Gujarat",
        kn: "ಗುಜರಾತ್",
        hi: "गुजरात"
      },
      river: {
        en: "Arabian Sea Coast",
        kn: "ಅರಬ್ಬಿ ಸಮುದ್ರ ತೀರ",
        hi: "अरब सागर तट"
      },
      era: {
        en: "Ancient to Medieval",
        kn: "ಪ್ರಾಚೀನದಿಂದ ಮಧ್ಯಯುಗ",
        hi: "प्राचीन से मध्यकाल"
      }
    },
  
    description: {
      en: `Somnath is one of the most revered temple sites in Bharat, located on the western coast of Gujarat. The temple has been destroyed and rebuilt multiple times throughout history, symbolizing resilience and continuity of faith. It stands today as a powerful representation of cultural endurance.`,
  
      kn: `ಸೋಮನಾಥ ದೇವಾಲಯವು ಹಲವು ಬಾರಿ ಧ್ವಂಸಗೊಂಡು ಪುನರ್ ನಿರ್ಮಾಣಗೊಂಡಿದ್ದು, ನಂಬಿಕೆಯ ಶಾಶ್ವತತೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತದೆ.`,
  
      hi: `सोमनाथ मंदिर कई बार नष्ट और पुनर्निर्मित हुआ है, जो आस्था की निरंतरता का प्रतीक है।`
    },
  
    spiritual: {
      en: `Somnath is considered the first of the twelve Jyotirlingas of Lord Shiva, making it one of the most sacred Shaiva pilgrimage sites. It represents the eternal nature of Shiva and the continuity of spiritual traditions across time.`,
  
      kn: `ಸೋಮನಾಥ ಶಿವನ ಹನ್ನೆರಡು ಜ್ಯೋತಿರ್ಲಿಂಗಗಳಲ್ಲಿ ಮೊದಲನೆಯದು ಮತ್ತು ಅತ್ಯಂತ ಪವಿತ್ರ ಸ್ಥಳವಾಗಿದೆ.`,
  
      hi: `सोमनाथ भगवान शिव के बारह ज्योतिर्लिंगों में पहला माना जाता है और अत्यंत पवित्र स्थल है।`
    },
  
    living: {
      en: `Somnath continues to be an active pilgrimage destination, drawing devotees from across the country. The temple rituals, coastal setting, and historical significance create a powerful spiritual atmosphere.`,
  
      kn: `ಸೋಮನಾಥ ಇಂದು ಸಹ ಪ್ರಮುಖ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದ್ದು, ಸಾವಿರಾರು ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.`,
  
      hi: `सोमनाथ आज भी एक प्रमुख तीर्थ स्थल है, जहाँ हजारों श्रद्धालु आते हैं।`
    }
  },

  ujjain: {
    id: "ujjain",
  
    title: {
      en: "Avanthika",
      kn: "ಅವಂತಿಕಾ",
      hi: "अवन्तिका"
    },
  
    identity: {
      region: {
        en: "Madhya Pradesh",
        kn: "ಮಧ್ಯ ಪ್ರದೇಶ",
        hi: "मध्य प्रदेश"
      },
      river: {
        en: "Shipra River",
        kn: "ಶಿಪ್ರಾ ನದಿ",
        hi: "ಶಿಪ್ರಾ ನದಿ"
      },
      era: {
        en: "Ancient",
        kn: "ಪ್ರಾಚೀನ ಕಾಲ",
        hi: "प्राचीन काल"
      }
    },
  
    description: {
      en: `Avanthika, known today as Ujjain, is one of the most ancient cities of Bharat and has been a major center of trade, astronomy, and culture. It was historically an important city in central India and served as a hub for learning and governance.`,
  
      kn: `ಅವಂತಿಕಾ ಅಥವಾ ಉಜ್ಜಯಿನಿ ಪ್ರಾಚೀನ ಭಾರತದಲ್ಲಿ ವ್ಯಾಪಾರ ಮತ್ತು ಜ್ಞಾನ ಕೇಂದ್ರವಾಗಿತ್ತು.`,
  
      hi: `अवन्तिका, जिसे आज उज्जैन कहा जाता है, प्राचीन भारत का एक प्रमुख नगर था और व्यापार व ज्ञान का केंद्र रहा।`
    },
  
    spiritual: {
      en: `Avanthika is one of the seven sacred cities (Sapta Puri) believed to grant liberation. It is home to the Mahakaleshwar Jyotirlinga, one of the most revered shrines of Lord Shiva. The city is deeply connected with time (Kala) and cosmic cycles, making it spiritually and symbolically significant.`,
  
      kn: `ಅವಂತಿಕಾ ಸಪ್ತಪುರಿಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು ಮಹಾಕಾಳೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗವನ್ನು ಹೊಂದಿದೆ.`,
  
      hi: `अवन्तिका सप्तपुरी में से एक है और यहाँ महाकालेश्वर ज्योतिर्लिंग स्थित है।`
    },
  
    living: {
      en: `Ujjain continues to be a vibrant pilgrimage center, especially during the Kumbh Mela held on the banks of the Shipra River. The city remains active with temple rituals, festivals, and spiritual practices.`,
  
      kn: `ಉಜ್ಜಯಿನಿಯಲ್ಲಿ ಕುಂಭಮೇಳ ಮತ್ತು ಇತರ ಹಬ್ಬಗಳು ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತವೆ.`,
  
      hi: `उज्जैन में कुंभ मेला और अन्य धार्मिक उत्सव बड़ी संख्या में श्रद्धालुओं को आकर्षित करते हैं।`
    }
  },

  nagpur: {
    id: "nagpur",
  
    title: {
      en: "Nagpur",
      kn: "ನಾಗಪುರ",
      hi: "नागपुर"
    },
  
    identity: {
      region: {
        en: "Maharashtra",
        kn: "ಮಹಾರಾಷ್ಟ್ರ",
        hi: "महाराष्ट्र"
      },
      river: {
        en: "Nag River",
        kn: "ನಾಗ ನದಿ",
        hi: "ನಾಗ ನದಿ"
      },
      era: {
        en: "Modern Nationalist Era",
        kn: "ಆಧುನಿಕ ರಾಷ್ಟ್ರೀಯ ಯುಗ",
        hi: "आधुनिक राष्ट्रवादी काल"
      }
    },
  
    description: {
      en: `Nagpur holds a defining place in modern Indian history as the birthplace of Dr. Keshav Baliram Hedgewar (born in 1889 in Nagpur), who later founded the Rashtriya Swayamsevak Sangh (RSS) in 1925. The city emerged as a nucleus for ideological organization and disciplined social mobilization during the early 20th century.`,

      kn: `ನಾಗಪುರವು 1889ರಲ್ಲಿ ಇಲ್ಲಿ ಜನಿಸಿದ ಡಾ. ಕೆಶವ ಬಾಲಿರಾಮ ಹೆಡ್ಗೇವಾರ್ ಅವರ ಜನ್ಮಸ್ಥಳವಾಗಿದೆ. ಅವರು 1925ರಲ್ಲಿ ರಾಷ್ಟ್ರೀಯ ಸ್ವಯಂಸೇವಕ ಸಂಘ (ಆರ್ಎಸ್ಎಸ್)ವನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಈ ನಗರವು ಆಧುನಿಕ ಭಾರತದ ಚಿಂತನಾ ಚಳವಳಿಗಳ ಕೇಂದ್ರವಾಗಿತ್ತು.`,

      hi: `नागपुर 1889 में जन्मे डॉ. केशव बलिराम हेडगेवार का जन्मस्थान है, जिन्होंने 1925 में राष्ट्रीय स्वयंसेवक संघ (आरएसएस) की स्थापना की। यह शहर आधुनिक भारत में वैचारिक संगठन और सामाजिक संरचना का केंद्र बना।`
    },
  
    spiritual: {
      en: `Nagpur’s significance lies in its role as the origin point of the Rashtriya Swayamsevak Sangh. The first RSS branch (Shakha) was established in Mohitewadi, Nagpur, marking the beginning of a structured volunteer-based cultural organization. This transformed the city into a center of disciplined societal thought and nationalist ideology.`,

      kn: `ನಾಗಪುರವು ರಾಷ್ಟ್ರೀಯ ಸ್ವಯಂಸೇವಕ ಸಂಘದ ಉದ್ಭವ ಸ್ಥಳವಾಗಿದ್ದು, ಮೊದಲ ಶಾಖೆ (ಶಾಖೆ) ಮೊಹಿತೇವಾಡಿ, ನಾಗಪುರದಲ್ಲಿ ಆರಂಭವಾಯಿತು. ಇದರಿಂದ ಈ ನಗರವು ಶಿಸ್ತುಬದ್ಧ ಸಾಮಾಜಿಕ ಚಿಂತನೆಯ ಕೇಂದ್ರವಾಯಿತು.`,

      hi: `नागपुर राष्ट्रीय स्वयंसेवक संघ की उत्पत्ति का केंद्र है, जहाँ पहली शाखा (शाखा) मोहिटेवाड़ी, नागपुर में शुरू हुई। इससे यह शहर संगठित सामाजिक विचार और अनुशासन का केंद्र बना।`
    },
  
    living: {
      en: `Today, Nagpur continues to function as an important organizational and cultural hub, with historical sites such as Mohitewadi preserving its legacy. The city represents the continuity of ideas from early 20th-century movements into present-day institutional frameworks.`,

      kn: `ಇಂದು ನಾಗಪುರವು ಮಹತ್ವದ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ಸಂಘಟನಾ ಕೇಂದ್ರವಾಗಿದ್ದು, ಮೊಹಿತೇವಾಡಿ ಮೊದಲ ಶಾಖೆಯ ಸ್ಮರಣೆಯನ್ನು ಉಳಿಸಿಕೊಂಡಿದೆ. ಈ ನಗರವು ಇತಿಹಾಸ ಮತ್ತು ವರ್ತಮಾನವನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ.`,

      hi: `आज नागपुर एक महत्वपूर्ण सांस्कृतिक और संगठनात्मक केंद्र बना हुआ है, जहाँ मोहिटेवाड़ी जैसे स्थान इस विरासत को संरक्षित रखते हैं। यह शहर अतीत और वर्तमान के बीच एक सेतु है।`
    }
  },

  kanchi: {
    id: "kanchi",
  
    title: {
      en: "Kanchi",
      kn: "ಕಾಂಚಿ",
      hi: "कांची"
    },
  
    identity: {
      region: {
        en: "Tamil Nadu",
        kn: "ತಮಿಳುನಾಡು",
        hi: "तमिलनाडु"
      },
      river: {
        en: "Palar River Region",
        kn: "ಪಾಲಾರ್ ನದಿ ಪ್ರದೇಶ",
        hi: "ಪಾಲಾರ್ ನದಿ ಪ್ರದೇಶ"
      },
      era: {
        en: "Ancient to Medieval",
        kn: "ಪ್ರಾಚೀನದಿಂದ ಮಧ್ಯಯುಗ",
        hi: "प्राचीन से मध्यकाल"
      }
    },
  
    description: {
      en: `Kanchi, known as Kanchipuram, is one of the oldest cities in southern Bharat and has been a major center of religion, education, and culture. It flourished under various dynasties and became renowned for its temples and learning institutions.`,
  
      kn: `ಕಾಂಚಿ ಪ್ರಾಚೀನ ದಕ್ಷಿಣ ಭಾರತದ ಪ್ರಮುಖ ಧಾರ್ಮಿಕ ಮತ್ತು ವಿದ್ಯಾ ಕೇಂದ್ರವಾಗಿತ್ತು.`,
  
      hi: `कांची दक्षिण भारत का एक प्राचीन धार्मिक और शैक्षिक केंद्र था।`
    },
  
    spiritual: {
      en: `Kanchi is one of the Sapta Puri cities and is sacred to both Shaiva and Vaishnava traditions. It houses numerous temples, including the Kamakshi Amman Temple and Ekambareswarar Temple, representing deep spiritual diversity.`,
  
      kn: `ಕಾಂಚಿ ಸಪ್ತಪುರಿಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು ಶಿವ ಮತ್ತು ವಿಷ್ಣು ಪರಂಪರೆಗಳಿಗೆ ಪವಿತ್ರವಾಗಿದೆ.`,
  
      hi: `कांची सप्तपुरी में से एक है और शिव तथा विष्णु दोनों परंपराओं के लिए पवित्र है।`
    },
  
    living: {
      en: `Kanchipuram continues to be a vibrant center of pilgrimage, temple traditions, and classical arts. It is also famous for its silk weaving traditions, connecting spirituality with cultural craftsmanship.`,
  
      kn: `ಕಾಂಚಿ ದೇವಾಲಯಗಳು ಮತ್ತು ರೇಷ್ಮೆ ನೆಯುವಿಕೆಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.`,
  
      hi: `कांची मंदिरों और रेशम बुनाई के लिए प्रसिद्ध है।`
    }
  },

  puri: {
    id: "puri",
  
    title: {
      en: "Puri",
      kn: "ಪುರಿ",
      hi: "पुरी"
    },
  
    identity: {
      region: {
        en: "Odisha",
        kn: "ಒಡಿಶಾ",
        hi: "ओडिशा"
      },
      river: {
        en: "Bay of Bengal Coast",
        kn: "ಬೆಂಗಾಳ ಕೊಲ್ಲಿ ತೀರ",
        hi: "बंगाल की खाड़ी तट"
      },
      era: {
        en: "Ancient to Medieval",
        kn: "ಪ್ರಾಚೀನದಿಂದ ಮಧ್ಯಯುಗ",
        hi: "प्राचीन से मध्यकाल"
      }
    },
  
    description: {
      en: `Puri is a major coastal city in eastern Bharat and one of the most important pilgrimage destinations. It has been a center of religious and cultural activity for centuries.`,
  
      kn: `ಪುರಿ ಪೂರ್ವ ಭಾರತದ ಪ್ರಮುಖ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದೆ.`,
  
      hi: `पुरी पूर्वी भारत का एक प्रमुख तीर्थ स्थल है।`
    },
  
    spiritual: {
      en: `Puri is one of the Char Dham pilgrimage sites and is home to the Jagannath Temple. The temple tradition is unique, with rituals and practices that reflect inclusivity and devotion. The annual Rath Yatra is one of the largest religious festivals in the world.`,
  
      kn: `ಪುರಿ ಚಾರಧಾಮಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು ರಥಯಾತ್ರೆಗೆ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.`,
  
      hi: `पुरी चार धामों में से एक है और रथ यात्रा के लिए प्रसिद्ध है।`
    },
  
    living: {
      en: `Puri remains a vibrant spiritual center, attracting millions of devotees. The traditions of temple worship, festivals, and coastal culture continue to define its identity.`,
  
      kn: `ಪುರಿ ಇಂದು ಸಹ ಪ್ರಮುಖ ತೀರ್ಥಕ್ಷೇತ್ರವಾಗಿದ್ದು ಲಕ್ಷಾಂತರ ಭಕ್ತರನ್ನು ಆಕರ್ಷಿಸುತ್ತದೆ.`,
  
      hi: `पुरी आज भी एक जीवंत तीर्थ स्थल है।`
    }
  },

  "vijaya-nagar": {
    id: "vijaya-nagar",
  
    title: {
      en: "Vijayanagar",
      kn: "ವಿಜಯನಗರ",
      hi: "विजयनगर"
    },
  
    identity: {
      region: {
        en: "Karnataka",
        kn: "ಕರ್ನಾಟಕ",
        hi: "ಕರ್ನಾಟಕ"
      },
      river: {
        en: "Tungabhadra River",
        kn: "ತುಂಗಭದ್ರಾ ನದಿ",
        hi: "ತುಂಗಭದ್ರಾ ನದಿ"
      },
      era: {
        en: "Medieval (14th–16th century)",
        kn: "ಮಧ್ಯಯುಗ",
        hi: "मध्यकाल"
      }
    },
  
    description: {
      en: `Vijayanagar, located at present-day Hampi, was the capital of one of the greatest empires in southern Bharat. It was known for its advanced urban planning, architecture, and economic prosperity.`,
  
      kn: `ವಿಜಯನಗರವು ದಕ್ಷಿಣ ಭಾರತದ ಮಹಾಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು.`,
  
      hi: `विजयनगर दक्षिण भारत के महान साम्राज्य की राजधानी था।`
    },
  
    spiritual: {
      en: `The city was deeply connected with temple culture, especially the Virupaksha Temple, which continues to be active even today. It reflects a blend of political power and spiritual tradition.`,
  
      kn: `ವಿಜಯನಗರ ದೇವಾಲಯ ಸಂಸ್ಕೃತಿಗೆ ಸಂಬಂಧಿಸಿದ್ದು ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.`,
  
      hi: `विजयनगर मंदिर संस्कृति से जुड़ा हुआ है और विरुपाक्ष मंदिर प्रमुख है।`
    },
  
    living: {
      en: `Today, Vijayanagar exists as the ruins of Hampi, a UNESCO World Heritage Site. It attracts historians, tourists, and spiritual seekers, preserving the grandeur of a once-thriving empire.`,
  
      kn: `ಹಂಪಿ ಇಂದು ಪುರಾತನ ಅವಶೇಷಗಳಾಗಿ ಉಳಿದಿದ್ದು ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿದೆ.`,
  
      hi: `हम्पी आज एक विश्व धरोहर स्थल है और प्राचीन साम्राज्य की याद दिलाता है।`
    }
  }
};
