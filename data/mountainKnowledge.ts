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

    image: "/place-images/mountains/himalaya.avif"
  },

  sahyadri: {
    id: "sahyadri",

    title: {
      en: "Sahyadri",
      kn: "ಸಹ್ಯಾದ್ರಿ",
      hi: "सह्याद्रि"
    },

    subtitle: {
      en: "Western Ghats",
      kn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು",
      hi: "पश्चिमी घाट"
    },

    facts: {
      length: "1,600 km",
      highest_peak: "Anamudi",
      elevation: "2,695 m",
      extent: "Gujarat • Maharashtra • Goa • Karnataka • Kerala • Tamil Nadu"
    },

    description: {
      en: `The Sahyadri, known as the Western Ghats, is a continuous mountain range running parallel to the western coast of Bharat. It forms a steep escarpment that separates the coastal plains from the Deccan Plateau. Recognized as one of the world's biodiversity hotspots, it is the origin of many major rivers such as the Godavari, Krishna, and Kaveri. Its unique climate and terrain support dense forests, diverse wildlife, and monsoon systems.`,

      kn: `ಸಹ್ಯಾದ್ರಿ ಅಥವಾ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ಭಾರತದ ಪಶ್ಚಿಮ ಕರಾವಳಿಯ ಸಮಾಂತರವಾಗಿ ಹರಡುವ ನಿರಂತರ ಪರ್ವತ ಶ್ರೇಣಿಯಾಗಿದೆ. ಇದು ಕರಾವಳಿ ಸಮತಟ್ಟು ಮತ್ತು ದಕ್ಕನ್ ಪೀಠಭೂಮಿಯ ನಡುವೆ ತೀವ್ರ ಏರಿಳಿತವನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ. ಇದು ವಿಶ್ವದ ಪ್ರಮುಖ ಜೀವವೈವಿಧ್ಯ ಪ್ರದೇಶಗಳಲ್ಲಿ ಒಂದಾಗಿದ್ದು, ಗೋದಾವರಿ, ಕೃಷ್ಣಾ ಮತ್ತು ಕಾವೇರಿ ನದಿಗಳ ಉಗಮ ಸ್ಥಳವಾಗಿದೆ.`,

      hi: `सह्याद्रि या पश्चिमी घाट भारत के पश्चिमी तट के समानांतर फैली एक सतत पर्वतमाला है। यह ततीय मैदान और दक्कन के पठार के बीच एक तीव्र ढाल बनाती है। यह विश्व के प्रमुख जैव विविधता क्षेत्रों में से एक है और गोदावरी, कृष्णा और कावेरी जैसी नदियों का उद्गम स्थल है।`
    },

    cultural: {
      en: `The Sahyadri holds immense cultural and historical significance, especially in the western regions of Bharat. It was the stronghold of the Maratha empire under Chhatrapati Shivaji Maharaj, where numerous forts were built atop its rugged terrain. The range is also dotted with ancient temples, sacred groves, and pilgrimage routes, reflecting a deep connection between nature and spiritual practices.`,

      kn: `ಸಹ್ಯಾದ್ರಿ ಪರ್ವತ ಶ್ರೇಣಿಯು ಭಾರತದ ಪಶ್ಚಿವ ಭಾಗದಲ್ಲಿ ಮಹತ್ವದ ಸಾಂಸ್ಕೃತಿಕ ಮತ್ತು ಐತಿಹಾಸಿಕ ಸ್ಥಾನವನ್ನು ಹೊಂದಿದೆ. ಛತ್ರಪತಿ ಶಿವಾಜಿ ಮಹಾರಾಜರ ಕಾಲದಲ್ಲಿ ಇದು ಮರಾಠ ಸಾಮ್ರಾಜ್ಯದ ಕೋಟೆಗಳ ಕೇಂದ್ರವಾಗಿತ್ತು. ಇಲ್ಲಿ ಅನೇಕ ಪುರಾತನ ದೇವಾಲಯಗಳು ಮತ್ತು ತೀರ್ಥಕ್ಷೇತ್ರಗಳು ಕಂಡುಬರುತ್ತವೆ.`,

      hi: `सह्याद्रि पर्वतमाला भारत के पश्चिमी भाग में अत्यंत ऐतिहासिक और सांस्कृतिक महत्व रखती है। यह छत्रपति शिवाजी महाराज के मराठा साम्राज्य का प्रमुख दुर्ग क्षेत्र था, जहाँ अनेक किले बनाए गए। यह क्षेत्र प्राचीन मंदिरों और तीर्थ स्थलों से समृद्ध है।`
    },

    image: "/place-images/mountains/sahyadri.jpg"
  },

  aravalli: {
    id: "aravalli",

    title: {
      en: "Aravalli",
      kn: "ಅರವಳ್ಳಿ",
      hi: "अरावली"
    },

    subtitle: {
      en: "Ancient Fold Mountains",
      kn: "ಪ್ರಾಚೀನ ಪರ್ವತ ಶ್ರೇಣಿ",
      hi: "प्राचीन पर्वतमाला"
    },

    facts: {
      length: "800 km",
      highest_peak: "Guru Shikhar",
      elevation: "1,722 m",
      extent: "Gujarat • Rajasthan • Haryana • Delhi"
    },

    description: {
      en: `The Aravalli Range is one of the oldest mountain systems in the world, dating back over a billion years. Stretching from Gujarat to Delhi, it forms a discontinuous chain of hills that has been heavily eroded over time. Unlike the Himalaya, it is not a result of recent tectonic activity but belongs to ancient geological formations. The range plays a crucial role in preventing desert expansion from the Thar region and supports diverse ecosystems in western India.`,

      kn: `ಅರವಳ್ಳಿ ಪರ್ವತ ಶ್ರೇಣಿಯು ವಿಶ್ವದ ಅತ್ಯಂತ ಹಳೆಯ ಪರ್ವತ ವ್ಯವಸ್ಥೆಗಳಲ್ಲಿ ಒಂದಾಗಿದೆ. ಇದು ಗುಜರಾತಿನಿಂದ ದೆಹಲಿವರೆಗೆ ಹರಡಿಕೊಂಡಿದ್ದು, ಬಹುಶಃ ಬಿಲಿಯನ್ ವರ್ಷಗಳ ಹಿಂದಿನ ಭೂವೈಜ್ಞಾನಿಕ ನಿರ್ಮಾಣವಾಗಿದೆ. ಹಿಮಾಲಯದಂತಲ್ಲದೆ ಇದು ಇತ್ತೀಚಿನ ಭೂಕಂಪ ಚಟುವಟಿಕೆಗಳಿಂದ ನಿರ್ಮಿತವಾಗಿಲ್ಲ. ಈ ಪರ್ವತ ಶ್ರೇಣಿಯು ಥಾರ್ ಮರಳುಭೂಮಿಯ ವಿಸ್ತರಣೆಯನ್ನು ತಡೆಯುವಲ್ಲಿ ಪ್ರಮುಖ ಪಾತ್ರವಹಿಸುತ್ತದೆ.`,

      hi: `अरावली पर्वतमाला विश्व की सबसे प्राचीन पर्वत श्रृंखलाओं में से एक है, जिसकी आयु एक अरब वर्ष से अधिक मानी जाती है। यह गुजरात से दिल्ली तक फैली हुई है और समय के साथ अत्यधिक क्षरण का शिकार हुई है। यह हिमालय की तरह नवीन नहीं बल्कि प्राचीन भूवैज्ञानिक संरचना का भाग है। यह श्रृंखला थार मरुस्थल के विस्तार को रोकने में महत्वपूर्ण भूमिका निभाती है।`
    },

    cultural: {
      en: `In the historical landscape of Bharat, the Aravalli region has been a cradle of early civilizations and warrior kingdoms. It served as a natural stronghold for Rajputana, witnessing numerous battles and acts of valor. The forests and hills of Aravalli are also associated with ancient tribal cultures and sacred groves, reflecting a deep connection between land and indigenous traditions.`,

      kn: `ಭಾರತದ ಇತಿಹಾಸದಲ್ಲಿ ಅರವಳ್ಳಿ ಪ್ರದೇಶವು ಪ್ರಾಚೀನ ನಾಗರಿಕತೆಗಳ ಮತ್ತು ಯೋಧರ ರಾಜ್ಯಗಳ ಕೇಂದ್ರವಾಗಿತ್ತು. ಇದು ರಾಜಪೂತಾನ ಪ್ರದೇಶಕ್ಕೆ ಸಹಜ ರಕ್ಷಣೆಯಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸಿತು. ಅರಣ್ಯಗಳು ಮತ್ತು ಪರ್ವತಗಳು ಆದಿವಾಸಿ ಸಂಸ್ಕೃತಿಯೊಂದಿಗೆ ಆಳವಾದ ಸಂಬಂಧ ಹೊಂದಿವೆ ಮತ್ತು ಪವಿತ್ರ ಅರಣ್ಯಗಳ ಪರಂಪರೆಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸುತ್ತವೆ.`,

      hi: `भारत के ऐतिहासिक परिप्रेक्ष्य में अरावली क्षेत्र प्राचीन सभ्यताओं और वीर राजपूत राज्यों का केंद्र रहा है। यह राजपूताना के लिए प्राकृतिक दुर्ग के रूप में कार्य करता था और अनेक युद्धों का साक्षी रहा है। इसके वन और पर्वत आदिवासी परंपराओं और पवित्र उपवनों से जुड़े हुए हैं।`
    },

    image: "/place-images/mountains/aravalli.webp"
  },

  vindhya: {
    id: "vindhya",

    title: {
      en: "Vindhya",
      kn: "ವಿಂದ್ಯ",
      hi: "विन्ध्य"
    },

    subtitle: {
      en: "Central Divide of Bharat",
      kn: "ಭಾರತದ ಮಧ್ಯ ವಿಭಾಗ",
      hi: "भारत का मध्य विभाजन"
    },

    facts: {
      length: "1,050 km",
      highest_peak: "Kalumar Peak",
      elevation: "752 m",
      extent: "Gujarat • Madhya Pradesh • Uttar Pradesh"
    },

    description: {
      en: `The Vindhya Range is a complex system of hills, plateaus, and escarpments that stretches across central India. Unlike continuous mountain chains, it consists of discontinuous ridges that form a natural division between northern and southern India. The region is rich in mineral resources and has historically influenced settlement patterns, agriculture, and trade routes across the subcontinent.`,

      kn: `ವಿಂದ್ಯ ಪರ್ವತ ಶ್ರೇಣಿಯು ಮಧ್ಯ ಭಾರತದಲ್ಲಿ ಹರಡಿರುವ ಬೆಟ್ಟಗಳು, ಪೀಠಭೂಮಿಗಳು ಮತ್ತು ಎಸ್ಕಾರ್ಪ್ಮೆಂಟ್ಗಳ ಸಮೂಹವಾಗಿದೆ. ಇದು ನಿರಂತರ ಪರ್ವತ ಶ್ರೇಣಿಯಲ್ಲದೆ ವಿಭಜಿತ ರಿಡ್ಜ್ಗಳಿಂದ ಕೂಡಿದೆ. ಈ ಶ್ರೇಣಿಯು ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ನಡುವೆ ಸಹಜ ವಿಭಾಗವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.`,

      hi: `विन्ध्य पर्वतमाला मध्य भारत में फैली हुई पहाड़ियों, पठारों और ढालों का समूह है। यह निरंतर श्रृंखला नहीं है बल्कि खंडित पर्वतीय संरचना है। यह उत्तर और दक्षिण भारत के बीच एक प्राकृतिक विभाजन का कार्य करती है और ऐतिहासिक रूप से व्यापार तथा बसावट को प्रभावित करती रही है।`
    },

    cultural: {
      en: `In ancient Indian texts, the Vindhya Range is often depicted as a symbolic boundary between the Aryavarta (north) and Dakshinapatha (south). It holds mythological significance in various Puranic stories, including legends where the Vindhya mountains are said to have grown in pride and were humbled by sage Agastya. The region represents not just a physical divide but a cultural transition within Bharat.`,

      kn: `ಪ್ರಾಚೀನ ಭಾರತೀಯ ಗ್ರಂಥಗಳಲ್ಲಿ ವಿಂದ್ಯ ಪರ್ವತವನ್ನು ಆರ್ಯವೃತ್ತ ಮತ್ತು ದಕ್ಷಿಣಪಥದ ನಡುವಿನ ಗಡಿಭಾಗವಾಗಿ ವರ್ಣಿಸಲಾಗಿದೆ. ಪುರಾಣಗಳಲ್ಲಿ ವಿಂದ್ಯ ಪರ್ವತವು ಅಹಂಕಾರದಿಂದ ಬೆಳೆದಿತು ಮತ್ತು ಋಷಿ ಅಗಸ್ತ್ಯರಿಂದ ತಗ್ಗಿಸಲ್ಪಟ್ಟಿತು ಎಂಬ ಕಥೆಗಳು ಪ್ರಸಿದ್ಧವಾಗಿವೆ. ಇದು ಕೇವಲ ಭೌಗೋಳಿಕ ಗಡಿಯಲ್ಲ, ಸಾಂಸ್ಕೃತಿಕ ಪರಿವರ್ತನೆಯ ಸಂಕೇತವಾಗಿದೆ.`,

      hi: `प्राचीन भारतीय ग्रंथों में विन्ध्य पर्वत को आर्यावर्त और दक्षिणापथ के बीच की सीमा माना गया है। पुराणों में इसकी अनेक कथाएँ मिलती हैं, जिनमें विन्ध्य पर्वत के अहंकार और ऋषि अगस्त्य द्वारा उसे शांत करने की कथा प्रमुख है। यह केवल भौगोलिक विभाजन नहीं बल्कि सांस्कृतिक परिवर्तन का प्रतीक भी है।`
    },

    image: "/place-images/mountains/vindhya.webp"
  },

  malaya: {
    id: "malaya",

    title: {
      en: "Malaya",
      kn: "ಮಲಯ",
      hi: "मलय"
    },

    subtitle: {
      en: "Southern Sacred Hills",
      kn: "ದಕ್ಷಿಣ ಪವಿತ್ರ ಪರ್ವತಗಳು",
      hi: "दक्षिण के पवित्र पर्वत"
    },

    facts: {
      length: "Part of Western Ghats",
      highest_peak: "Anamudi (regionally associated)",
      elevation: "2,695 m",
      extent: "Kerala • Tamil Nadu"
    },

    description: {
      en: `The Malaya mountains are referenced in ancient Indian texts as the southern extension of the great mountain systems of Bharat. Geographically, they correspond to the southern parts of the Western Ghats, particularly in present-day Kerala and Tamil Nadu. These hills are characterized by dense forests, high rainfall, and rich biodiversity, forming one of the most ecologically significant regions of the subcontinent.`,

      kn: `ಮಲಯ ಪರ್ವತಗಳು ಪ್ರಾಚೀನ ಭಾರತೀಯ ಗ್ರಂಥಗಳಲ್ಲಿ ದಕ್ಷಿಣ ಭಾರತದ ಪರ್ವತ ಶ್ರೇಣಿಗಳಾಗಿ ಉಲ್ಲೇಖಿಸಲ್ಪಟ್ಟಿವೆ. ಇವು ಇಂದಿನ ಕೇರಳ ಮತ್ತು ತಮಿಳುನಾಡಿನ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ದಕ್ಷಿಣ ಭಾಗಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತವೆ. ಈ ಪ್ರದೇಶವು ದಟ್ಟ ಅರಣ್ಯಗಳು, ಹೆಚ್ಚು ಮಳೆಯ ಪ್ರಮಾಣ ಮತ್ತು ಸಮೃದ್ಧ ಜೀವವೈವಿಧ್ಯಕ್ಕಾಗಿ ಪ್ರಸಿದ್ಧವಾಗಿದೆ.`,

      hi: `मलय पर्वतों का उल्लेख प्राचीन भारतीय ग्रंथों में दक्षिण भारत की पर्वत श्रृंखलाओं के रूप में मिलता है। भौगोलिक रूप से यह वर्तमान केरल और तमिलनाडु के पश्चिमी घाटों के दक्षिणी भाग से मेल खाते हैं। यह क्षेत्र घने वन, अधिक वर्षा और समृद्ध जैव विविधता के लिए प्रसिद्ध है।`
    },

    cultural: {
      en: `In classical literature and Puranic texts, the Malaya mountains are associated with fragrance, sandalwood forests, and divine beauty. They are often described as the land of cool breezes and spiritual retreat. The region is linked to ancient trade routes, temple traditions, and early cultural exchanges across southern Bharat, symbolizing abundance and natural richness.`,

      kn: `ಮಲಯ ಪರ್ವತಗಳು ಪ್ರಾಚೀನ ಸಾಹಿತ್ಯದಲ್ಲಿ ಸುಗಂಧ, ಚಂದನ ಕಾಡುಗಳು ಮತ್ತು ದೈವಿಕ ಸೌಂದರ್ಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದಂತೆ ವರ್ಣಿಸಲ್ಪಟ್ಟಿವೆ. ಇವು ಶಾಂತ ವಾತಾವರಣ ಮತ್ತು ಆತ್ಮಸಾಧನೆಯ ಸ್ಥಳವೆಂದು ಪರಿಗಣಿಸಲ್ಪಟ್ಟಿವೆ. ದಕ್ಷಿಣ ಭಾರತದ ವ್ಯಾಪಾರ ಮಾರ್ಗಗಳು ಮತ್ತು ದೇವಾಲಯ ಸಂಸ್ಕೃತಿಯೊಂದಿಗೆ ಈ ಪ್ರದೇಶ ಸಂಬಂಧಿಸಿದೆ.`,

      hi: `मलय पर्वतों का वर्णन प्राचीन साहित्य में सुगंध, चंदन के वन और दिव्य सौंदर्य के प्रतीक के रूप में किया गया है। यह क्षेत्र शीतल वायु और आध्यात्मिक साधना का स्थल माना जाता था। यह दक्षिण भारत के प्राचीन व्यापार मार्गों और मंदिर परंपराओं से भी जुड़ा हुआ है।`
    },

    image: "/place-images/mountains/malaya.jpg"
  },

  mahendra: {
    id: "mahendra",

    title: {
      en: "Mahendra",
      kn: "ಮಹೇಂದ್ರ",
      hi: "महेंद्र"
    },

    subtitle: {
      en: "Eastern Ghats",
      kn: "ಪೂರ್ವ ಘಟ್ಟಗಳು",
      hi: "पूर्वी घाट"
    },

    facts: {
      length: "1,750 km",
      highest_peak: "Mahendragiri",
      elevation: "1,501 m",
      extent: "Odisha • Andhra Pradesh • Tamil Nadu"
    },

    description: {
      en: `The Mahendra range, forming part of the Eastern Ghats, is a discontinuous chain of hills running along the eastern coast of Bharat. Unlike the Western Ghats, it is broken and scattered due to erosion and river systems such as the Mahanadi and Godavari cutting through it. The terrain is less steep but historically significant, supporting ancient settlements and trade routes along the eastern coast.`,

      kn: `ಮಹೇಂದ್ರ ಪರ್ವತ ಶ್ರೇಣಿಯು ಪೂರ್ವ ಘಟ್ಟಗಳ ಭಾಗವಾಗಿದ್ದು, ಭಾರತದ ಪೂರ್ವ ಕರಾವಳಿಯ ಬಳಿ ಹರಡುವ ವಿಭಜಿತ ಪರ್ವತ ಶ್ರೇಣಿಯಾಗಿದೆ. ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಂತೆ ನಿರಂತರವಾಗಿರದೆ, ನದಿಗಳ ಕಾರಣದಿಂದ ಇದು ತುಂಡಾಗಿರುವ ಶ್ರೇಣಿಯಾಗಿದೆ. ಮಹಾನದಿ ಮತ್ತು ಗೋದಾವರಿ ನದಿಗಳು ಇದನ್ನು ಕತ್ತರಿಸುತ್ತವೆ.`,

      hi: `महेंद्र पर्वत, जो पूर्वी घाट का भाग है, भारत के पूर्वी तट के साथ फैली एक खंडित पर्वतमाला है। यह पश्चिमी घाट की तरह सतत नहीं है, बल्कि नदियों के कारण विभाजित है। महानदी और गोदावरी जैसी नदियाँ इसे काटती हैं।`
    },

    cultural: {
      en: `The Mahendra region holds deep mythological and spiritual significance. It is associated with Sage Parashurama, who is believed to have meditated in these hills. The Mahendragiri peak is considered sacred and finds mention in ancient texts like the Ramayana and Mahabharata. The region reflects a blend of tribal traditions and classical Hindu spiritual heritage.`,

      kn: `ಮಹೇಂದ್ರ ಪರ್ವತ ಪ್ರದೇಶವು ಪೌರಾಣಿಕ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಮಹತ್ವವನ್ನು ಹೊಂದಿದೆ. ಇದನ್ನು ಪರಶುರಾಮ ಋಷಿಯ ತಪಸ್ಸಿನ ಸ್ಥಳವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ. ಮಹೇಂದ್ರಗಿರಿ ಪರ್ವತವು ರಾಮಾಯಣ ಮತ್ತು ಮಹಾಭಾರತದಲ್ಲಿ ಉಲ್ಲೇಖಿತವಾಗಿದೆ.`,

      hi: `महेंद्र पर्वत क्षेत्र का गहरा पौराणिक और आध्यात्मिक महत्व है। इसे भगवान परशुराम की तपोभूमि माना जाता है। महेंद्रगिरि का उल्लेख रामायण और महाभारत में भी मिलता है और यह एक पवित्र स्थल माना जाता है।`
    },

    image: "/place-images/mountains/mahendra.jpg"
  }
};

export const himalayaContent = mountainKnowledge.himalaya;
