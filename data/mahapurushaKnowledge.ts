export interface MahapurushaSource {
  sourceType: 'academic' | 'primary_translation' | 'reference';
  title: string;
  publisher: string;
  url?: string;
  language: string;
}

export interface ContributionItem {
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  description: {
    en: string;
    kn: string;
    hi: string;
  };
}

export interface MahapurushaKnowledge {
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
  category: 'mahapurusha';
  researchStatus: {
    birthplaceConfidence: 'traditional' | 'verified' | 'disputed';
    birthDateConfidence: 'unknown' | 'approximate' | 'verified';
  };
  identity: {
    period: {
      en: string;
      kn: string;
      hi: string;
    };
    birthDate: {
      en: string;
      kn: string;
      hi: string;
    };
    birthPlace: {
      en: string;
      kn: string;
      hi: string;
    };
    alsoKnownAs: {
      en: string;
      kn: string;
      hi: string;
    };
  };
  historicalContext: {
    en: string;
    kn: string;
    hi: string;
  };
  contributions: ContributionItem[];
  historicalCaveat: {
    en: string;
    kn: string;
    hi: string;
  };
  civilizationalSignificance: {
    en: string;
    kn: string;
    hi: string;
  };
  sources: MahapurushaSource[];
}

export const mahapurushaKnowledge: Record<string, MahapurushaKnowledge> = {
  chanakya: {
    id: "chanakya",
    category: "mahapurusha",

    title: {
      en: "Chanakya",
      kn: "ಚಾಣಕ್ಯ",
      hi: "चाणक्य"
    },

    subtitle: {
      en: "Political Thought & Statecraft",
      kn: "ರಾಜಕೀಯ ಚಿಂತನೆ ಮತ್ತು ರಾಜ್ಯಶಾಸ್ತ್ರ",
      hi: "राजनीतिक चिंतन और राज्यशास्त्र"
    },

    researchStatus: {
      birthplaceConfidence: "traditional",
      birthDateConfidence: "unknown"
    },

    identity: {
      period: {
        en: "c. 4th century BCE",
        kn: "ಕ್ರಿ.ಪೂ. ಸುಮಾರು 4ನೇ ಶತಮಾನ",
        hi: "लगभग 4वीं शताब्दी ईसा पूर्व"
      },
      birthDate: {
        en: "Unknown",
        kn: "ತಿಳಿದಿಲ್ಲ",
        hi: "अज्ञात"
      },
      birthPlace: {
        en: "Traditionally associated with Taxila",
        kn: "ಪರಂಪರೆಯ ಪ್ರಕಾರ ತಕ್ಷಶಿಲೆಯೊಂದಿಗೆ ಸಂಬಂಧಿಸಲಾಗಿದೆ",
        hi: "परंपरागत रूप से तक्षशिला से संबद्ध"
      },
      alsoKnownAs: {
        en: "Kautilya / Vishnugupta",
        kn: "ಕೌಟಿಲ್ಯ / ವಿಷ್ಣುಗುಪ್ತ",
        hi: "कौटिल्य / विष्णुगुप्त"
      }
    },

    historicalContext: {
      en: "Chanakya, also known as Kautilya and Vishnugupta, is traditionally remembered as a political adviser associated with Chandragupta Maurya and the rise of the Mauryan Empire. His biography is partly preserved through later traditions, so some details of his life remain uncertain.",
      kn: "ಚಾಣಕ್ಯರನ್ನು ಕೌಟಿಲ್ಯ ಮತ್ತು ವಿಷ್ಣುಗುಪ್ತ ಎಂಬ ಹೆಸರಗಳಿಂದಲೂ ಗುರುತಿಸಲಾಗುತ್ತದೆ. ಅವರನ್ನು ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ ಮತ್ತು ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯದ ಉದಯದೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದ ರಾಜಕೀಯ ಸಲಹೆಗಾರರಾಗಿ ಪರಂಪರೆಯಲ್ಲಿ ಸ್ಮರಿಸಲಾಗುತ್ತದೆ. ಅವರ ಜೀವನಚರಿತ್ರೆಯ ಕೆಲವು ವಿವರಗಳು ನಂತರದ ಪರಂಪರೆಗಳ ಮೂಲಕ ಬಂದಿರುವುದರಿಂದ, ಅವರ ಜೀವನದ ಕೆಲವು ಅಂಶಗಳು ಇನ್ನೂ ಅನಿಶ್ಚಿತವಾಗಿವೆ.",
      hi: "चाणक्य, जिन्हें कौटिल्य और विष्णुगुप्त के नामों से भी जाना जाता है, परंपरा में चंद्रगुप्त मौर्य और मौर्य साम्राज्य के उदय से जुड़े राजनीतिक सलाहकार के रूप में स्मरण किए जाते हैं। उनके जीवन के कुछ विवरण बाद की परंपराओं से प्राप्त हुए हैं, इसलिए उनके जीवन के कुछ पहलू अभी भी अनिश्चित हैं।"
    },

    contributions: [
      {
        title: {
          en: "1. Political Thought",
          kn: "1. ರಾಜಕೀಯ ಚಿಂತನೆ",
          hi: "1. राजनीतिक चिंतन"
        },
        description: {
          en: "The Arthashastra presents an extensive treatment of governance, administration and statecraft.",
          kn: "ಅರ್ಥಶಾಸ್ತ್ರವು ಆಡಳಿತ, ರಾಜ್ಯ ನಿರ್ವಹಣೆ ಮತ್ತು ರಾಜ್ಯಶಾಸ್ತ್ರದ ಕುರಿತು ವ್ಯಾಪಕವಾದ ವಿಚಾರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
          hi: "अर्थशास्त्र शासन, प्रशासन और राज्यशास्त्र का व्यापक विवेचन प्रस्तुत करता है।"
        }
      },
      {
        title: {
          en: "2. Political Economy",
          kn: "2. ರಾಜಕೀಯ ಆರ್ಥಿಕತೆ",
          hi: "2. राजनीतिक अर्थव्यवस्था"
        },
        description: {
          en: "It discusses taxation, economic activity, agriculture, trade and management of state resources.",
          kn: "ತೆರಿಗೆ, ಆರ್ಥಿಕ ಚಟುವಟಿಕೆ, ಕೃಷಿ, ವ್ಯಾಪಾರ ಮತ್ತು ರಾಜ್ಯ ಸಂಪನ್ಮೂಲಗಳ ನಿರ್ವಹಣೆಯನ್ನು ಚರ್ಚಿಸುತ್ತದೆ.",
          hi: "इसमें कर व्यवस्था, आर्थिक गतिविधि, कृषि, व्यापार और राज्य संसाधनों के प्रबंधन पर चर्चा मिलती है।"
        }
      },
      {
        title: {
          en: "3. Diplomacy",
          kn: "3. ರಾಜತಾಂತ್ರಿಕತೆ",
          hi: "3. कूटनीति"
        },
        description: {
          en: "It examines alliances, interstate relations, peace, conflict and diplomatic strategy.",
          kn: "ರಾಜ್ಯಗಳ ನಡುವಿನ ಸಂಬಂಧಗಳು, ಮೈತ್ರಿಗಳು, ಶಾಂತಿ, ಸಂಘರ್ಷ ಮತ್ತು ರಾಜತಾಂತ್ರಿಕ ತಂತ್ರಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
          hi: "यह राज्यों के बीच संबंधों, गठबंधनों, शांति, संघर्ष और कूटनीतिक रणनीतियों पर विचार करता है।"
        }
      },
      {
        title: {
          en: "4. Military & Security",
          kn: "4. ಸೈನ್ಯ ಮತ್ತು ಭದ್ರತೆ",
          hi: "4. सैन्य एवं सुरक्षा"
        },
        description: {
          en: "It addresses military organization, strategic action, intelligence and protection of the state.",
          kn: "ಸೈನ್ಯ ಸಂಘಟನೆ, ತಂತ್ರಗಾರಿಕೆ, ಗುಪ್ತಚರ ವ್ಯವಸ್ಥೆ ಮತ್ತು ರಾಜ್ಯ ರಕ್ಷಣೆಯ ಕುರಿತು ಚರ್ಚಿಸುತ್ತದೆ.",
          hi: "इसमें सैन्य संगठन, रणनीति, गुप्तचर व्यवस्था और राज्य की सुरक्षा से संबंधित विचार मिलते हैं।"
        }
      },
      {
        title: {
          en: "5. Administration & Law",
          kn: "5. ಆಡಳಿತ ಮತ್ತು ಕಾನೂನು",
          hi: "5. प्रशासन एवं विधि"
        },
        description: {
          en: "It discusses judicial administration, contracts, property, labour and various aspects of governance.",
          kn: "ನ್ಯಾಯಾಂಗ ಆಡಳಿತ, ಒಪ್ಪಂದಗಳು, ಆಸ್ತಿ, ಕಾರ್ಮಿಕ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಆಡಳಿತದ ವಿವಿಧ ಅಂಶಗಳನ್ನು ವಿವರಿಸುತ್ತದೆ.",
          hi: "यह न्यायिक प्रशासन, अनुबंध, संपत्ति, श्रम और शासन के विभिन्न पहलुओं पर चर्चा करता है।"
        }
      }
    ],

    historicalCaveat: {
      en: "Chanakya is traditionally associated with the Arthashastra. Modern scholarship debates the text's composition, authorship and historical development, so it should not automatically be treated as a single-authored work written at one precise moment.",
      kn: "ಚಾಣಕ್ಯರನ್ನು ಅರ್ಥಶಾಸ್ತ್ರದೊಂದಿಗೆ ಪರಂಪರೆಯಲ್ಲಿ ಸಂಬಂಧಿಸಲಾಗುತ್ತದೆ. ಆಧುನಿಕ ವಿದ್ವತ್ ಅಧ್ಯಯನಗಳಲ್ಲಿ ಈ ಕೃತಿಯ ರಚನೆ, ಕರ್ತೃತ್ವ ಮತ್ತು ಐತಿಹಾಸಿಕ ಬೆಳವಣಿಗೆಯ ಕುರಿತು ಚರ್ಚೆ ಇದೆ. ಆದ್ದರಿಂದ ಇದನ್ನು ಒಂದೇ ವ್ಯಕ್ತಿಯು ಒಂದೇ ಕಾಲಘಟ್ಟದಲ್ಲಿ ರಚಿಸಿದ ಕೃತಿಯೆಂದು ನಿಶ್ಚಿತವಾಗಿ ಪರಿಗಣಿಸಬಾರದು.",
      hi: "चाणक्य का संबंध परंपरागत रूप से अर्थशास्त्र से जोड़ा जाता है। आधुनिक विद्वत् अध्ययन में इस ग्रंथ की रचना, लेखकत्व और ऐतिहासिक विकास को लेकर चर्चा है। इसलिए इसे निश्चित रूप से एक ही व्यक्ति द्वारा एक ही समय में रचित ग्रंथ नहीं माना जाना चाहिए।"
    },

    civilizationalSignificance: {
      en: "The Kautilyan tradition represents one of the substantial surviving bodies of political and administrative thought from ancient South Asia. Its systematic treatment of governance, economic administration, diplomacy and interstate strategy has made it an important subject in the study of Indian political thought and the history of statecraft.",
      kn: "ಕೌಟಿಲ್ಯ ಪರಂಪರೆಯು ಪ್ರಾಚೀನ ದಕ್ಷಿಣ ಏಷ್ಯಾದ ರಾಜಕೀಯ ಮತ್ತು ಆಡಳಿತ ಚಿಂತನೆಯ ಪ್ರಮುಖ ಉಳಿದಿರುವ ಪರಂಪರೆಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಆಡಳಿತ, ಆರ್ಥಿಕ ನಿರ್ವಹಣೆ, ರಾಜತಾಂತ್ರಿಕತೆ ಮತ್ತು ರಾಜ್ಯಾಂತರ ತಂತ್ರಗಳ ಕುರಿತಾದ ಅದರ ವ್ಯವಸ್ಥಿತ ಚರ್ಚೆಯು ಭಾರತೀಯ ರಾಜಕೀಯ ಚಿಂತನೆ ಮತ್ತು ರಾಜ್ಯಶಾಸ್ತ್ರದ ಇತಿಹಾಸದ ಅಧ್ಯಯನದಲ್ಲಿ ಇದನ್ನು ಮಹತ್ವದ ವಿಷಯವನ್ನಾಗಿ ಮಾಡಿದೆ.",
      hi: "कौटिल्य परंपरा प्राचीन दक्षिण एशिया में उपलब्ध राजनीतिक और प्रशासनिक चिंतन की महत्वपूर्ण परंपराओं में से एक है। शासन, आर्थिक प्रशासन, कूटनीति और राज्यों के बीच रणनीति पर इसका व्यवस्थित विवेचन भारतीय राजनीतिक चिंतन और राज्यशास्त्र के इतिहास के अध्ययन में इसे महत्वपूर्ण बनाता है।"
    },

    sources: [
      {
        sourceType: "primary_translation",
        title: "Kautilya's Arthashastra (English Translation)",
        publisher: "R. Shamasastry (Government Press, Bangalore, 1915)",
        url: "https://archive.org/details/arthashastra_english_translation_r_shamasastry",
        language: "English"
      },
      {
        sourceType: "academic",
        title: "The Kautilīya Arthaśāstra (3 Volumes: Critical Edition, Translation, Study)",
        publisher: "R. P. Kangle (University of Bombay / Motilal Banarsidass)",
        language: "Sanskrit / English"
      },
      {
        sourceType: "academic",
        title: "A History of Indian Political Ideas",
        publisher: "U. N. Ghoshal (Oxford University Press)",
        language: "English"
      },
      {
        sourceType: "reference",
        title: "Taxila Archaeological Site and Region Record",
        publisher: "Archaeological Survey of India / UNESCO World Heritage Centre",
        url: "https://whc.unesco.org/en/list/139",
        language: "English"
      }
    ]
  }
};
