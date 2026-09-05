export interface MahapurushaPdfDocument {
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  url: string;
  fileName: string;
  fileSize?: string;
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
  pdfDocument?: MahapurushaPdfDocument;
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

    pdfDocument: {
      title: {
        en: "Chanakya's History & Thought",
        kn: "ಚಾಣಕ್ಯನ ಇತಿಹಾಸ ಮತ್ತು ಚಿಂತನೆ",
        hi: "चाणक्य का इतिहास एवं चिंतन"
      },
      url: "/data/mahapurushas-pdfs/chanakya/Chanakya's History.pdf",
      fileName: "Chanakya's History.pdf",
      fileSize: "476 KB"
    }
  },
  chandragupta_maurya: {
    id: "chandragupta_maurya",
    category: "mahapurusha",

    title: {
      en: "Chandragupta Maurya",
      kn: "ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ",
      hi: "चंद्रगुप्त मौर्य"
    },

    subtitle: {
      en: "Founder of the Mauryan Empire",
      kn: "ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯದ ಸ್ಥಾಪಕ",
      hi: "मौर्य साम्राज्य के संस्थापक"
    },

    researchStatus: {
      birthplaceConfidence: "disputed",
      birthDateConfidence: "unknown"
    },

    identity: {
      period: {
        en: "c. 4th–3rd century BCE",
        kn: "ಕ್ರಿ.ಪೂ. ಸುಮಾರು 4ನೇ–3ನೇ ಶತಮಾನ",
        hi: "लगभग 4वीं–3वीं शताब्दी ईसा पूर्व"
      },
      birthDate: {
        en: "Unknown",
        kn: "ತಿಳಿದಿಲ್ಲ",
        hi: "अज्ञात"
      },
      birthPlace: {
        en: "Uncertain; later traditions give different accounts",
        kn: "ನಿಶ್ಚಿತವಲ್ಲ; ನಂತರದ ಪರಂಪರೆಗಳಲ್ಲಿ ವಿಭಿನ್ನ ವಿವರಗಳಿವೆ",
        hi: "अनिश्चित; बाद की परंपराओं में विभिन्न विवरण मिलते हैं"
      },
      alsoKnownAs: {
        en: "Chandragupta Maurya",
        kn: "ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ",
        hi: "चंद्रगुप्त मौर्य"
      }
    },

    historicalContext: {
      en: "Chandragupta Maurya founded the Mauryan Empire in the late fourth century BCE and established Pataliputra as the centre of his expanding kingdom. He overthrew the Nanda dynasty in Magadha and subsequently expanded Mauryan power across substantial parts of northern and north-western South Asia. His conflict and later settlement with Seleucus I Nicator further extended Mauryan influence toward the north-west.",
      kn: "ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯರು ಕ್ರಿ.ಪೂ. ನಾಲ್ಕನೇ ಶತಮಾನದ ಅಂತ್ಯಭಾಗದಲ್ಲಿ ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿ, ಪಾಟಲಿಪುತ್ರವನ್ನು ವಿಸ್ತರಿಸುತ್ತಿದ್ದ ತಮ್ಮ ರಾಜ್ಯದ ಪ್ರಮುಖ ಕೇಂದ್ರವನ್ನಾಗಿ ಮಾಡಿದರು. ಅವರು ಮಗಧದಲ್ಲಿನ ನಂದ ವಂಶವನ್ನು ಸೋಲಿಸಿ, ನಂತರ ಉತ್ತರ ಮತ್ತು ವಾಯವ್ಯ ದಕ್ಷಿಣ ಏಷ್ಯಾದ ವಿಶಾಲ ಪ್ರದೇಶಗಳಿಗೆ ಮೌರ್ಯರ ಪ್ರಭಾವವನ್ನು ವಿಸ್ತರಿಸಿದರು. ಸೆಲ್ಯೂಕಸ್ ಪ್ರಥಮ ನಿಕೇಟರ್ ಅವರೊಂದಿಗೆ ನಡೆದ ಸಂಘರ್ಷ ಮತ್ತು ನಂತರದ ಒಪ್ಪಂದದ ಮೂಲಕ ವಾಯವ್ಯ ಭಾಗದಲ್ಲಿಯೂ ಮೌರ್ಯ ಪ್ರಭಾವ ಮತ್ತಷ್ಟು ವಿಸ್ತರಿಸಿತು.",
      hi: "चंद्रगुप्त मौर्य ने चौथी शताब्दी ईसा पूर्व के उत्तरार्ध में मौर्य साम्राज्य की स्थापना की और पाटलिपुत्र को अपने विस्तृत राज्य का प्रमुख केंद्र बनाया। उन्होंने मगध के नंद वंश को पराजित किया और बाद में उत्तर तथा उत्तर-पश्चिमी दक्षिण एशिया के बड़े हिस्सों तक मौर्य शक्ति का विस्तार किया। सेल्युकस प्रथम निकेटर के साथ संघर्ष और उसके बाद हुए समझौते ने उत्तर-पश्चिम में भी मौर्य प्रभाव को विस्तारित किया।"
    },

    contributions: [
      {
        title: {
          en: "1. Foundation of the Mauryan Empire",
          kn: "1. ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯದ ಸ್ಥಾಪನೆ",
          hi: "1. मौर्य साम्राज्य की स्थापना"
        },
        description: {
          en: "Chandragupta established the Mauryan dynasty and created a large imperial state centred on Magadha and Pataliputra.",
          kn: "ಚಂದ್ರಗುಪ್ತರು ಮೌರ್ಯ ವಂಶವನ್ನು ಸ್ಥಾಪಿಸಿ, ಮಗಧ ಮತ್ತು ಪಾಟಲಿಪುತ್ರವನ್ನು ಕೇಂದ್ರವಾಗಿಸಿಕೊಂಡ ವಿಶಾಲ ಸಾಮ್ರಾಜ್ಯವನ್ನು ನಿರ್ಮಿಸಿದರು.",
          hi: "चंद्रगुप्त ने मौर्य वंश की स्थापना की और मगध तथा पाटलिपुत्र को केंद्र बनाकर एक विशाल साम्राज्य का निर्माण किया।"
        }
      },
      {
        title: {
          en: "2. Consolidation of Magadha",
          kn: "2. ಮಗಧದ ಏಕೀಕರಣ",
          hi: "2. मगध का सुदृढ़ीकरण"
        },
        description: {
          en: "His victory over the Nanda dynasty established Mauryan control over Magadha, providing the political and economic base for subsequent imperial expansion.",
          kn: "ನಂದ ವಂಶದ ಮೇಲಿನ ವಿಜಯದ ಮೂಲಕ ಚಂದ್ರಗುಪ್ತರು ಮಗಧದ ಮೇಲಿನ ಮೌರ್ಯ ನಿಯಂತ್ರಣವನ್ನು ಸ್ಥಾಪಿಸಿದರು. ಇದು ಮುಂದಿನ ಸಾಮ್ರಾಜ್ಯ ವಿಸ್ತರಣೆಗೆ ರಾಜಕೀಯ ಮತ್ತು ಆರ್ಥಿಕ ಆಧಾರವಾಯಿತು.",
          hi: "नंद वंश पर विजय के माध्यम से चंद्रगुप्त ने मगध पर मौर्य नियंत्रण स्थापित किया। इससे आगे के साम्राज्य विस्तार के लिए राजनीतिक और आर्थिक आधार तैयार हुआ।"
        }
      },
      {
        title: {
          en: "3. Expansion toward the North-West",
          kn: "3. ವಾಯವ್ಯದತ್ತ ಸಾಮ್ರಾಜ್ಯ ವಿಸ್ತರಣೆ",
          hi: "3. उत्तर-पश्चिम की ओर विस्तार"
        },
        description: {
          en: "Chandragupta expanded Mauryan authority into territories of the north-west following the political upheaval that followed Alexander's campaigns in the region.",
          kn: "ಅಲೆಕ್ಸಾಂಡರ್ನ ಅಭಿಯಾನಗಳ ನಂತರ ವಾಯವ್ಯ ಭಾಗದಲ್ಲಿ ಉಂಟಾದ ರಾಜಕೀಯ ಬದಲಾವಣೆಗಳ ಸಂದರ್ಭದಲ್ಲಿ ಚಂದ್ರಗುಪ್ತರು ಮೌರ್ಯರ ಅಧಿಕಾರವನ್ನು ಆ ಪ್ರದೇಶಗಳತ್ತ ವಿಸ್ತರಿಸಿದರು.",
          hi: "अलेक्ज़ेंडर के अभियानों के बाद उत्तर-पश्चिम में उत्पन्न राजनीतिक परिस्थितियों के बीच चंद्रगुप्त ने मौर्य सत्ता का विस्तार उन क्षेत्रों की ओर किया।"
        }
      },
      {
        title: {
          en: "4. Settlement with Seleucus I",
          kn: "4. ಸೆಲ್ಯೂಕಸ್ ಪ್ರಥಮನೊಂದಿಗೆ ಒಪ್ಪಂದ",
          hi: "4. सेल्युकस प्रथम के साथ समझौता"
        },
        description: {
          en: "After conflict with Seleucus I Nicator, Chandragupta reached a settlement that strengthened Mauryan control in the north-west and established diplomatic relations with the Seleucid state.",
          kn: "ಸೆಲ್ಯೂಕಸ್ ಪ್ರಥಮ ನಿಕೇಟರ್ ಅವರೊಂದಿಗೆ ನಡೆದ ಸಂಘರ್ಷದ ನಂತರ ಚಂದ್ರಗುಪ್ತರು ಒಪ್ಪಂದಕ್ಕೆ ಬಂದರು. ಇದರಿಂದ ವಾಯವ್ಯದಲ್ಲಿ ಮೌರ್ಯ ನಿಯಂತ್ರಣ ಬಲಗೊಂಡಿತು ಮತ್ತು ಸೆಲ್ಯೂಕಿಡ್ ರಾಜ್ಯದೊಂದಿಗೆ ರಾಜತಾಂತ್ರಿಕ ಸಂಬಂಧಗಳು ಸ್ಥಾಪಿತವಾದವು.",
          hi: "सेल्युकस प्रथम निकेटर के साथ संघर्ष के बाद चंद्रगुप्त ने एक समझौता किया, जिससे उत्तर-पश्चिम में मौर्य नियंत्रण मजबूत हुआ और सेल्युकिड राज्य के साथ राजनयिक संबंध स्थापित हुए।"
        }
      },
      {
        title: {
          en: "5. Imperial Administration",
          kn: "5. ಸಾಮ್ರಾಜ್ಯ ಆಡಳಿತ",
          hi: "5. साम्राज्य प्रशासन"
        },
        description: {
          en: "The Mauryan state developed a substantial administrative structure centred on Pataliputra. Evidence from later textual traditions and Greek accounts provides insight into the organization of the Mauryan state and its capital.",
          kn: "ಮೌರ್ಯ ರಾಜ್ಯವು ಪಾಟಲಿಪುತ್ರವನ್ನು ಕೇಂದ್ರವಾಗಿಸಿಕೊಂಡ ಗಮನಾರ್ಹ ಆಡಳಿತ ವ್ಯವಸ್ಥೆಯನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿತು. ನಂತರದ ಗ್ರಂಥ ಪರಂಪರೆಗಳು ಮತ್ತು ಗ್ರೀಕ್ ವಿವರಣೆಗಳು ಮೌರ್ಯ ರಾಜ್ಯ ಮತ್ತು ಅದರ ರಾಜಧಾನಿಯ ಸಂಘಟನೆಯ ಕುರಿತು ಮಾಹಿತಿಯನ್ನು ನೀಡುತ್ತವೆ.",
          hi: "मौर्य राज्य ने पाटलिपुत्र को केंद्र बनाकर एक महत्वपूर्ण प्रशासनिक व्यवस्था विकसित की। बाद की ग्रंथ परंपराएँ और यूनानी विवरण मौर्य शासन तथा उसकी राजधानी की संरचना के बारे में जानकारी प्रदान करते हैं।"
        }
      }
    ],

    historicalCaveat: {
      en: "The broad historical importance of Chandragupta Maurya is well established, but details of his early life and exact birthplace are uncertain. Much of the surviving biographical tradition was recorded after his lifetime and comes from different Greek, Buddhist, Jain and later Indian sources. These traditions do not always agree.",
      kn: "ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯರ ಐತಿಹಾಸಿಕ ಮಹತ್ವವು ಸ್ಪಷ್ಟವಾಗಿದ್ದರೂ, ಅವರ ಆರಂಭಿಕ ಜೀವನ ಮತ್ತು ನಿಖರ ಜನ್ಮಸ್ಥಳದ ವಿವರಗಳು ಅನಿಶ್ಚಿತವಾಗಿವೆ. ಅವರ ಜೀವನದ ಕುರಿತು ಉಳಿದಿರುವ ಬಹುಪಾಲು ಪರಂಪರೆಗಳು ಅವರ ಕಾಲದ ನಂತರ ದಾಖಲಿಸಲ್ಪಟ್ಟಿದ್ದು, ಗ್ರೀಕ್, ಬೌದ್ಧ, ಜೈನ ಮತ್ತು ನಂತರದ ಭಾರತೀಯ ಮೂಲಗಳಿಂದ ಬಂದಿವೆ. ಈ ಪರಂಪರೆಗಳು ಎಲ್ಲ ವಿಷಯಗಳಲ್ಲೂ ಪರಸ್ಪರ ಹೊಂದಿಕೆಯಾಗುವುದಿಲ್ಲ.",
      hi: "चंद्रगुप्त मौर्य का व्यापक ऐतिहासिक महत्व स्पष्ट है, लेकिन उनके प्रारंभिक जीवन और सटीक जन्मस्थान के विवरण अनिश्चित हैं। उनके जीवन से संबंधित उपलब्ध परंपराओं का बड़ा हिस्सा उनके समय के बाद दर्ज हुआ और विभिन्न यूनानी, बौद्ध, जैन तथा बाद के भारतीय स्रोतों से प्राप्त हुआ है। इन परंपराओं में सभी विवरण एक जैसे नहीं हैं।"
    },

    civilizationalSignificance: {
      en: "Chandragupta Maurya's establishment of the Mauryan Empire marked a major transformation in the political history of South Asia. The state centred on Pataliputra became one of the largest political formations of ancient South Asia and created an imperial framework that was subsequently expanded under Bindusara and Ashoka.",
      kn: "ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯರಿಂದ ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯದ ಸ್ಥಾಪನೆಯು ದಕ್ಷಿಣ ಏಷ್ಯಾದ ರಾಜಕೀಯ ಇತಿಹಾಸದಲ್ಲಿ ಮಹತ್ವದ ಪರಿವರ್ತನೆಯನ್ನು ಸೂಚಿಸುತ್ತದೆ. ಪಾಟಲಿಪುತ್ರವನ್ನು ಕೇಂದ್ರವಾಗಿಸಿಕೊಂಡ ಈ ರಾಜ್ಯವು ಪ್ರಾಚೀನ ದಕ್ಷಿಣ ಏಷ್ಯಾದ ಅತಿದೊಡ್ಡ ರಾಜಕೀಯ ವ್ಯವಸ್ಥೆಗಳಲ್ಲಿ ಒಂದಾಗಿ ಬೆಳೆದು, ನಂತರ ಬಿಂದುಸಾರ ಮತ್ತು ಅಶೋಕರ ಕಾಲದಲ್ಲಿ ಮತ್ತಷ್ಟು ವಿಸ್ತರಿಸಲ್ಪಟ್ಟ ಸಾಮ್ರಾಜ್ಯಿಕ ವ್ಯವಸ್ಥೆಗೆ ಅಡಿಪಾಯವಾಯಿತು.",
      hi: "चंद्रगुप्त मौर्य द्वारा मौर्य साम्राज्य की स्थापना ने दक्षिण एशिया के राजनीतिक इतिहास में एक महत्वपूर्ण परिवर्तन किया। पाटलिपुत्र केंद्रित यह राज्य प्राचीन दक्षिण एशिया की सबसे बड़ी राजनीतिक संरचनाओं में से एक बना और आगे चलकर बिंदुसार तथा अशोक के शासन में विस्तारित साम्राज्य के लिए आधार बना।"
    },

    pdfDocument: {
      title: {
        en: "Samrat Chandragupta Maurya",
        kn: "ಸಾಮ್ರಾಟ್ ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ",
        hi: "सम्राट चंद्रगुप्त मौर्य"
      },
      url: "/data/mahapurushas-pdfs/chandragupta-maurya/Samrat Chandragupta.pdf",
      fileName: "Samrat Chandragupta.pdf",
      fileSize: "10.5 MB"
    }
  },
  vikramaditya: {
    id: "vikramaditya",
    category: "mahapurusha",

    title: {
      en: "Vikramaditya",
      kn: "ವಿಕ್ರಮಾದಿತ್ಯ",
      hi: "विक्रमादित्य"
    },

    subtitle: {
      en: "Legendary and historical tradition of kingship centred on Ujjain",
      kn: "ಉಜ್ಜಯಿನಿಯನ್ನು ಕೇಂದ್ರವಾಗಿಸಿಕೊಂಡ ರಾಜತ್ವದ ಐತಿಹಾಸಿಕ ಮತ್ತು ಪರಂಪರೆಯ ಸ್ಮರಣೆ",
      hi: "उज्जयिनी केंद्रित राजपरंपरा की ऐतिहासिक और पारंपरिक स्मृति"
    },

    researchStatus: {
      birthplaceConfidence: "disputed",
      birthDateConfidence: "unknown"
    },

    identity: {
      period: {
        en: "Historically uncertain; the Vikramaditya tradition spans different periods and sources",
        kn: "ಐತಿಹಾಸಿಕವಾಗಿ ಅನಿಶ್ಚಿತ; ವಿಕ್ರಮಾದಿತ್ಯ ಪರಂಪರೆ ವಿಭಿನ್ನ ಕಾಲಘಟ್ಟಗಳು ಮತ್ತು ಮೂಲಗಳಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ",
        hi: "ऐतिहासिक रूप से अनिश्चित; विक्रमादित्य की परंपरा विभिन्न कालों और स्रोतों में मिलती है"
      },
      birthDate: {
        en: "Unknown",
        kn: "ತಿಳಿದಿಲ್ಲ",
        hi: "अज्ञात"
      },
      birthPlace: {
        en: "Uncertain; Ujjain is a major traditional association",
        kn: "ನಿಶ್ಚಿತವಲ್ಲ; ಉಜ್ಜಯಿನಿ ಪ್ರಮುಖ ಪರಂಪರೆಯ ಸಂಬಂಧಿತ ಸ್ಥಳವಾಗಿದೆ",
        hi: "अनिश्चित; उज्जयिनी एक प्रमुख पारंपरिक संबद्ध स्थान है"
      },
      alsoKnownAs: {
        en: "Vikramaditya; Vikrama",
        kn: "ವಿಕ್ರಮಾದಿತ್ಯ; ವಿಕ್ರಮ",
        hi: "विक्रमादित्य; विक्रम"
      }
    },

    historicalContext: {
      en: "Vikramaditya is one of the most prominent royal names in Indian historical and literary tradition. The name is associated particularly with Ujjain and with the Vikrama era tradition. However, historians distinguish between historically attested rulers who used the title Vikramaditya and the later literary and legendary Vikramaditya tradition. The identity of the Vikramaditya remembered in the Ekatmata Stotra should therefore be presented with appropriate historical caution rather than being treated as an unquestionably identified single ruler.",
      kn: "ವಿಕ್ರಮಾದಿತ್ಯ ಎಂಬುದು ಭಾರತೀಯ ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ಪರಂಪರೆಯಲ್ಲಿ ಅತ್ಯಂತ ಪ್ರಸಿದ್ಧವಾದ ರಾಜನಾಮಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಈ ಹೆಸರು ವಿಶೇಷವಾಗಿ ಉಜ್ಜಯಿನಿ ಮತ್ತು ವಿಕ್ರಮ ಸಂವತ್ಸರದ ಪರಂಪರೆಯೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದೆ. ಆದರೆ ಇತಿಹಾಸಕಾರರು ವಿಕ್ರಮಾದಿತ್ಯ ಎಂಬ ಬಿರುದನ್ನು ಬಳಸಿದ ಐತಿಹಾಸಿಕವಾಗಿ ದೃಢೀಕೃತ ರಾಜರು ಮತ್ತು ನಂತರದ ಸಾಹಿತ್ಯಿಕ ಹಾಗೂ ಪೌರಾಣಿಕ ವಿಕ್ರಮಾದಿತ್ಯ ಪರಂಪರೆಯ ನಡುವೆ ವ್ಯತ್ಯಾಸ ಮಾಡುತ್ತಾರೆ. ಆದ್ದರಿಂದ ಏಕಾತ್ಮತಾ ಸ್ತೋತ್ರದಲ್ಲಿ ಸ್ಮರಿಸಲ್ಪಡುವ ವಿಕ್ರಮಾದಿತ್ಯರನ್ನು ಒಂದೇ ನಿರ್ವಿವಾದ ಐತಿಹಾಸಿಕ ರಾಜನಾಗಿ ಪರಿಗಣಿಸದೆ, ಸೂಕ್ತ ಐತಿಹಾಸಿಕ ಎಚ್ಚರಿಕೆಯಿಂದ ಪ್ರಸ್ತುತಪಡಿಸಬೇಕು.",
      hi: "विक्रमादित्य भारतीय ऐतिहासिक और साहित्यिक परंपरा में सबसे प्रसिद्ध राजकीय नामों में से एक है। यह नाम विशेष रूप से उज्जयिनी और विक्रम संवत् की परंपरा से जुड़ा है। हालांकि इतिहासकार विक्रमादित्य की उपाधि धारण करने वाले ऐतिहासिक रूप से प्रमाणित शासकों और बाद की साहित्यिक तथा पौराणिक विक्रमादित्य परंपरा के बीच अंतर करते हैं। इसलिए एकात्मता स्तोत्र में स्मरण किए गए विक्रमादित्य को बिना पर्याप्त प्रमाण के एक ही निश्चित ऐतिहासिक शासक के रूप में प्रस्तुत नहीं किया जाना चाहिए।"
    },

    contributions: [
      {
        title: {
          en: "1. Enduring Royal Tradition of Ujjain",
          kn: "1. ಉಜ್ಜಯಿನಿಯ ಶಾಶ್ವತ ರಾಜಪರಂಪರೆ",
          hi: "1. उज्जयिनी की स्थायी राजपरंपरा"
        },
        description: {
          en: "The Vikramaditya tradition became deeply associated with Ujjain and contributed to the city's enduring place in Indian historical and literary memory.",
          kn: "ವಿಕ್ರಮಾದಿತ್ಯ ಪರಂಪರೆಯು ಉಜ್ಜಯಿನಿಯೊಂದಿಗೆ ಆಳವಾಗಿ ಸಂಬಂಧಿಸಿಕೊಂಡು, ಭಾರತೀಯ ಐತಿಹಾಸಿಕ ಮತ್ತು ಸಾಹಿತ್ಯಿಕ ಸ್ಮೃತಿಯಲ್ಲಿ ಈ ನಗರದ ಶಾಶ್ವತ ಸ್ಥಾನಕ್ಕೆ ಕೊಡುಗೆ ನೀಡಿತು.",
          hi: "विक्रमादित्य की परंपरा उज्जयिनी से गहराई से जुड़ी और भारतीय ऐतिहासिक तथा साहित्यिक स्मृति में इस नगर के स्थायी महत्व को मजबूत किया।"
        }
      },
      {
        title: {
          en: "2. Association with the Vikrama Era",
          kn: "2. ವಿಕ್ರಮ ಸಂವತ್ಸರದೊಂದಿಗೆ ಸಂಬಂಧ",
          hi: "2. विक्रम संवत् से संबंध"
        },
        description: {
          en: "The name Vikramaditya became closely connected in later tradition with the Vikrama era, an important calendrical tradition that continues to be used in South Asia.",
          kn: "ವಿಕ್ರಮಾದಿತ್ಯ ಎಂಬ ಹೆಸರು ನಂತರದ ಪರಂಪರೆಯಲ್ಲಿ ವಿಕ್ರಮ ಸಂವತ್ಸರದೊಂದಿಗೆ ಆಪ್ತವಾಗಿ ಸಂಬಂಧಿಸಲಾಯಿತು. ಇದು ದಕ್ಷಿಣ ಏಷ್ಯಾದಲ್ಲಿ ಇಂದಿಗೂ ಬಳಕೆಯಲ್ಲಿರುವ ಪ್ರಮುಖ ಕಾಲಗಣನಾ ಪರಂಪರೆಯಾಗಿದೆ.",
          hi: "बाद की परंपरा में विक्रमादित्य का नाम विक्रम संवत् से निकटता से जोड़ा गया, जो दक्षिण एशिया की एक महत्वपूर्ण कालगणना परंपरा है और आज भी विभिन्न क्षेत्रों में प्रचलित है।"
        }
      },
      {
        title: {
          en: "3. Symbol of Ideal Kingship",
          kn: "3. ಆದರ್ಶ ರಾಜತ್ವದ ಪ್ರತೀಕ",
          hi: "3. आदर्श राजत्व का प्रतीक"
        },
        description: {
          en: "In later Sanskrit and regional literary traditions, Vikramaditya became a model of courageous, generous and just kingship. These qualities belong primarily to the literary tradition and should not be presented as independently verified biographical facts.",
          kn: "ನಂತರದ ಸಂಸ್ಕೃತ ಮತ್ತು ಪ್ರಾದೇಶಿಕ ಸಾಹಿತ್ಯ ಪರಂಪರೆಗಳಲ್ಲಿ ವಿಕ್ರಮಾದಿತ್ಯರು ಧೈರ್ಯಶಾಲಿ, ಉದಾರ ಮತ್ತು ನ್ಯಾಯಪರ ರಾಜತ್ವದ ಮಾದರಿಯಾಗಿ ರೂಪುಗೊಂಡರು. ಈ ಗುಣಗಳು ಮುಖ್ಯವಾಗಿ ಸಾಹಿತ್ಯ ಪರಂಪರೆಗೆ ಸೇರಿವೆ; ಅವುಗಳನ್ನು ಸ್ವತಂತ್ರವಾಗಿ ದೃಢೀಕರಿಸಲಾದ ಜೀವನಚರಿತ್ರೆಯ ಸಂಗತಿಗಳಾಗಿ ಪ್ರಸ್ತುತಪಡಿಸಬಾರದು.",
          hi: "बाद की संस्कृत और क्षेत्रीय साहित्यिक परंपराओं में विक्रमादित्य को साहसी, उदार और न्यायप्रिय राजत्व के आदर्श के रूप में प्रस्तुत किया गया। ये विशेषताएँ मुख्यतः साहित्यिक परंपरा से संबंधित हैं और इन्हें स्वतंत्र रूप से प्रमाणित जीवनी संबंधी तथ्य के रूप में प्रस्तुत नहीं किया जाना चाहिए।"
        }
      },
      {
        title: {
          en: "4. Influence on Indian Literary Memory",
          kn: "4. ಭಾರತೀಯ ಸಾಹಿತ್ಯಿಕ ಸ್ಮೃತಿಯ ಮೇಲೆ ಪ್ರಭಾವ",
          hi: "4. भारतीय साहित्यिक स्मृति पर प्रभाव"
        },
        description: {
          en: "Stories associated with Vikramaditya became an enduring part of Indian narrative literature, especially through traditions surrounding Vikram and the Vetala and other collections of royal legends.",
          kn: "ವಿಕ್ರಮಾದಿತ್ಯರಿಗೆ ಸಂಬಂಧಿಸಿದ ಕಥೆಗಳು ಭಾರತೀಯ ಕಥನ ಸಾಹಿತ್ಯದ ಶಾಶ್ವತ ಭಾಗವಾಗಿ ಬೆಳೆದವು. ವಿಶೇಷವಾಗಿ ವಿಕ್ರಮ–ವೇತಾಳ ಪರಂಪರೆ ಮತ್ತು ಇತರ ರಾಜಕಥಾ ಸಂಕಲನಗಳ ಮೂಲಕ ಈ ಸ್ಮರಣೆ ವ್ಯಾಪಕವಾಯಿತು.",
          hi: "विक्रमादित्य से जुड़ी कथाएँ भारतीय आख्यान साहित्य का स्थायी हिस्सा बन गईं, विशेषकर विक्रम-वेताल परंपरा और राजकीय आख्यानों के अन्य संग्रहों के माध्यम से।"
        }
      },
      {
        title: {
          en: "5. Ujjain in Civilizational Memory",
          kn: "5. ನಾಗರಿಕತಾ ಸ್ಮೃತಿಯಲ್ಲಿ ಉಜ್ಜಯಿನಿ",
          hi: "5. सभ्यतागत स्मृति में उज्जयिनी"
        },
        description: {
          en: "The association of Vikramaditya with Ujjain reinforced the city's significance as a centre of political, cultural, literary and calendrical traditions in the Indian civilizational imagination.",
          kn: "ವಿಕ್ರಮಾದಿತ್ಯರೊಂದಿಗೆ ಉಜ್ಜಯಿನಿಯ ಸಂಬಂಧವು ಭಾರತೀಯ ನಾಗರಿಕತಾ ಸ್ಮೃತಿಯಲ್ಲಿ ರಾಜಕೀಯ, ಸಾಂಸ್ಕೃತಿಕ, ಸಾಹಿತ್ಯಿಕ ಮತ್ತು ಕಾಲಗಣನಾ ಪರಂಪರೆಗಳ ಕೇಂದ್ರವಾಗಿ ನಗರದ ಮಹತ್ವವನ್ನು ಮತ್ತಷ್ಟು ಬಲಪಡಿಸಿತು.",
          hi: "विक्रमादित्य के साथ उज्जयिनी के संबंध ने भारतीय सभ्यतागत स्मृति में राजनीतिक, सांस्कृतिक, साहित्यिक और कालगणना परंपराओं के केंद्र के रूप में इस नगर के महत्व को मजबूत किया।"
        }
      }
    ],

    historicalCaveat: {
      en: "The name Vikramaditya represents a complex historical tradition rather than an unquestionably identifiable single individual. Several historical rulers used Vikramaditya as a title, while later literature developed a powerful legendary king associated with Ujjain, heroic virtues and the Vikrama era. The historical identity intended by the Ekatmata Stotra should therefore be treated as a traditional and historically layered reference rather than as a simple biographical identification.",
      kn: "ವಿಕ್ರಮಾದಿತ್ಯ ಎಂಬ ಹೆಸರು ಒಂದೇ ನಿರ್ವಿವಾದ ವ್ಯಕ್ತಿಯನ್ನು ಸೂಚಿಸುವುದಕ್ಕಿಂತ ಸಂಕೀರ್ಣವಾದ ಐತಿಹಾಸಿಕ ಪರಂಪರೆಯನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ. ಹಲವು ಐತಿಹಾಸಿಕ ರಾಜರು ವಿಕ್ರಮಾದಿತ್ಯ ಎಂಬ ಬಿರುದನ್ನು ಬಳಸಿದ್ದಾರೆ; ನಂತರದ ಸಾಹಿತ್ಯವು ಉಜ್ಜಯಿನಿ, ವೀರಗುಣಗಳು ಮತ್ತು ವಿಕ್ರಮ ಸಂವತ್ಸರದೊಂದಿಗೆ ಸಂಬಂಧಿಸಿದ ಪ್ರಭಾವಶಾಲಿ ಪೌರಾಣಿಕ ರಾಜನ ರೂಪವನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸಿದೆ. ಆದ್ದರಿಂದ ಏಕಾತ್ಮತಾ ಸ್ತೋತ್ರದಲ್ಲಿ ಉದ್ದೇಶಿಸಲಾದ ವಿಕ್ರಮಾದಿತ್ಯರನ್ನು ಸರಳ ಜೀವನಚರಿತ್ರೆಯ ಗುರುತಾಗಿ ಪರಿಗಣಿಸದೆ, ಪರಂಪರೆ ಮತ್ತು ಇತಿಹಾಸದ ಹಲವು ಪದರಗಳನ್ನು ಹೊಂದಿರುವ ಉಲ್ಲೇಖವಾಗಿ ಪ್ರಸ್ತುತಪಡಿಸಬೇಕು.",
      hi: "विक्रमादित्य नाम किसी एक निर्विवाद रूप से पहचाने गए व्यक्ति के बजाय एक जटिल ऐतिहासिक परंपरा का प्रतिनिधित्व करता है। कई ऐतिहासिक शासकों ने विक्रमादित्य की उपाधि धारण की, जबकि बाद के साहित्य में उज्जयिनी, वीरता और विक्रम संवत् से जुड़ा एक प्रभावशाली आदर्श राजा विकसित हुआ। इसलिए एकात्मता स्तोत्र में उल्लिखित विक्रमादित्य को सरल जीवनी संबंधी पहचान के बजाय इतिहास और परंपरा की अनेक परतों वाले संदर्भ के रूप में प्रस्तुत किया जाना चाहिए।"
    },

    civilizationalSignificance: {
      en: "Vikramaditya occupies an unusual place in Indian civilizational memory because the name connects historical kingship, Ujjain, calendrical tradition and a large body of literary storytelling. His importance within the Ekatmata Stotra is therefore best represented as the enduring memory of a celebrated model of kingship rather than through unsupported claims about a single ruler's precise historical biography.",
      kn: "ವಿಕ್ರಮಾದಿತ್ಯ ಎಂಬ ಹೆಸರು ಐತಿಹಾಸಿಕ ರಾಜತ್ವ, ಉಜ್ಜಯಿನಿ, ಕಾಲಗಣನಾ ಪರಂಪರೆ ಮತ್ತು ವಿಶಾಲ ಸಾಹಿತ್ಯಿಕ ಕಥನ ಪರಂಪರೆಯನ್ನು ಸಂಪರ್ಕಿಸುವುದರಿಂದ ಭಾರತೀಯ ನಾಗರಿಕತಾ ಸ್ಮೃತಿಯಲ್ಲಿ ವಿಶಿಷ್ಟ ಸ್ಥಾನ ಹೊಂದಿದೆ. ಆದ್ದರಿಂದ ಏಕಾತ್ಮತಾ ಸ್ತೋತ್ರದಲ್ಲಿನ ಅವರ ಮಹತ್ವವನ್ನು ಒಂದೇ ರಾಜನ ನಿಖರ ಜೀವನಚರಿತ್ರೆಯ ಕುರಿತು ಆಧಾರರಹಿತ ಹೇಳಿಕೆಗಳ ಮೂಲಕವಲ್ಲ, ಪ್ರಸಿದ್ಧ ರಾಜತ್ವದ ಆದರ್ಶದ ಶಾಶ್ವತ ಸ್ಮರಣೆಯಾಗಿ ಪ್ರಸ್ತುತಪಡಿಸುವುದು ಸೂಕ್ತವಾಗಿದೆ.",
      hi: "विक्रमादित्य भारतीय सभ्यतागत स्मृति में एक विशिष्ट स्थान रखते हैं क्योंकि यह नाम ऐतिहासिक राजत्व, उज्जयिनी, कालगणना परंपरा और विशाल साहित्यिक आख्यान परंपरा को जोड़ता है। इसलिए एकात्मता स्तोत्र में उनका महत्व किसी एक शासक की सटीक जीवनी के बारे में अप्रमाणित दावों के बजाय आदर्श राजत्व की दीर्घकालीन सांस्कृतिक स्मृति के रूप में प्रस्तुत करना अधिक उचित है।"
    },

    pdfDocument: {
      title: {
        en: "Samrat Vikramaditya",
        kn: "ಸಾಮ್ರಾಟ್ ವಿಕ್ರಮಾದಿತ್ಯ",
        hi: "सम्राट विक्रमादित्य"
      },
      url: "/data/mahapurushas-pdfs/vikramaditya/Samrat Vikramaditya.pdf",
      fileName: "Samrat Vikramaditya.pdf",
      fileSize: "7.4 MB"
    }
  }
};
