import { cityKnowledge } from "./cityKnowledge";
import { mountainKnowledge } from "./mountainKnowledge";
import { riverKnowledge } from "./riverKnowledge";
import { regionKnowledge } from "./regionKnowledge";
import { mahapurushaKnowledge } from "./mahapurushaKnowledge";
import { COUNTRY_LABELS } from "./regionsGeometry";

export type SearchItem = {
  id: string;
  type: "mountain" | "river" | "city" | "region" | "mahapurusha";
  title: {
    en: string;
    kn: string;
    hi: string;
  };
  keywords: string[];
  importance: number;
};

const cities: SearchItem[] = Object.values(cityKnowledge).map((city) => ({
  id: city.id,
  type: "city",
  title: city.title,
  keywords: [
    city.id,
    ...city.title.en.toLowerCase().split(" "),
    ...city.identity.era.en.toLowerCase().split(" "),
    ...city.identity.river.en.toLowerCase().split(" "),
    ...city.identity.region.en.toLowerCase().split(" "),
    ...(city.id === "ayodhya" ? ["ram janmabhoomi", "saryu", "rama", "birthplace"] : []),
    ...(city.id === "takshashila" ? ["university", "learning", "gandhara", "taxila"] : []),
    ...(city.id === "amritsar" ? ["golden temple", "sikhism", "punjab", "harmandir"] : []),
    ...(city.id === "mathura" ? ["krishna", "birthplace", "yamuna", "vrindavan", "braj"] : []),
    ...(city.id === "indraprastha" ? ["pandavas", "delhi", "mahabharata", "epic"] : []),
    ...(city.id === "prayag" ? ["sangam", "confluence", "triveni", "kumbh", "allahabad"] : []),
    ...(city.id === "vaishali" ? ["republic", "buddha", "mahavira", "jainism"] : []),
    ...(city.id === "pataliputra" ? ["patna", "magadha", "maurya", "gupta", "empire"] : []),
    ...(city.id === "gaya" ? ["moksha", "pind daan", "ancestors", "phalgu", "shradh"] : []),
    ...(city.id === "dwarka" ? ["krishna", "submerged", "coastal", "char dham", "gujarat"] : []),
    ...(city.id === "somnath" ? ["jyotirlinga", "shiva", "shrine", "prabhas patan"] : []),
    ...(city.id === "ujjain" ? ["mahakal", "jyotirlinga", "shipra", "vikramaditya"] : []),
    ...(city.id === "nagpur" ? ["vidarbha", "center", "maharashtra"] : []),
    ...(city.id === "puri" ? ["jagannath", "chariot", "odisha", "east", "char dham"] : []),
    ...(city.id === "vijaya-nagar" ? ["hampi", "ruins", "tunga", "empire", "karnataka"] : []),
    ...(city.id === "kanchi" ? ["kanchipuram", "silk", "pallava", "temple city", "tamil nadu"] : []),
  ],
  importance: city.id === "prayag" || city.id === "ayodhya" || city.id === "ujjain" || city.id === "mathura" ? 10 : 8,
}));

const mountains: SearchItem[] = Object.values(mountainKnowledge).map((m) => ({
  id: m.id,
  type: "mountain",
  title: m.title,
  keywords: [
    m.id,
    ...m.title.en.toLowerCase().split(" "),
    ...(m.id === "himalaya" ? ["snow", "shiva", "everest", "highest", "range", "north", "himavat"] : []),
    ...(m.id === "sahyadri" ? ["western ghats", "coastal", "monsoon", "shivaji", "maratha"] : []),
    ...(m.id === "aravalli" ? ["ancient", "rajasthan", "desert", "hills", "guru shikhar"] : []),
    ...(m.id === "vindhya" ? ["central", "divide", "barrier", "forest", "agastya"] : []),
    ...(m.id === "malaya" ? ["south", "sandalwood", "hills", "fragrant", "breeze"] : []),
    ...(m.id === "mahendra" ? ["eastern ghats", "parashurama", "odisha", "mahendragiri"] : []),
    ...(m.id === "raivataka" ? ["girnar", "gujarat", "junagadh", "sacred", "krishna", "yadava", "jain", "nath"] : []),
  ],
  importance: m.id === "himalaya" ? 10 : 7,
}));

const rivers: SearchItem[] = Object.values(riverKnowledge).map((r) => ({
  id: r.id,
  type: "river",
  title: r.title,
  keywords: [
    r.id,
    ...r.title.en.toLowerCase().split(" "),
    ...(r.id === "sindhu" ? ["indus", "origin", "civilization", "north", "sapta sindhu"] : []),
    ...(r.id === "ganga" ? ["ganges", "holy", "purity", "mother", "shiva", "bhagirathi"] : []),
    ...(r.id === "saraswati" ? ["lost", "vedic", "invisible", "knowledge", "ghaggar"] : []),
    ...(r.id === "yamuna" ? ["jamuna", "krishna", "tributary", "kalindi"] : []),
    ...(r.id === "narmada" ? ["rewa", "central", "parikrama", "shiva", "mekala"] : []),
    ...(r.id === "brahmaputra" ? ["tsangpo", "east", "assam", "massive"] : []),
    ...(r.id === "godavari" ? ["dakshin ganga", "south", "nasik", "trimbak"] : []),
    ...(r.id === "krishna" ? ["deccan", "vijayawada", "south", "venna"] : []),
    ...(r.id === "kaveri" ? ["cauvery", "south", "holy", "karnataka", "tamil nadu", "ponni"] : []),
    ...(r.id === "gandaki" ? ["shaligram", "nepal", "tributary", "narayani"] : []),
    ...(r.id === "mahanadi" ? ["chhattisgarh", "odisha", "delta"] : []),
  ],
  importance: r.id === "ganga" || r.id === "saraswati" || r.id === "sindhu" ? 10 : 8,
}));

const regions: SearchItem[] = Object.values(regionKnowledge).map((reg) => ({
  id: reg.id,
  type: "region",
  title: reg.title,
  keywords: [
    reg.id,
    ...reg.title.en.toLowerCase().split(" "),
    ...(reg.id === "gandhara" ? ["pakistan", "afghanistan", "taxila", "buddhism", "sculpture"] : []),
    ...(reg.id === "sindhu_desha" ? ["pakistan", "sindh", "lowland", "sapta sindhu"] : []),
    ...(reg.id === "sinhala" ? ["sri lanka", "ceylon", "island", "ravana", "ramayana"] : []),
    ...(reg.id === "vanga_desha" ? ["bangladesh", "bengal", "pala", "maritime"] : []),
    ...(reg.id === "brahma_desha" ? ["myanmar", "burma", "pagoda", "east"] : []),
    ...(reg.id === "nepal" ? ["himalaya", "kathmandu", "licchavi", "malla"] : []),
    ...(reg.id === "bhutan" ? ["himalaya", "vajrayana", "monastery", "thimphu"] : []),
    ...(reg.id === "trivishtapa" ? ["china", "tibet", "plateau", "heavenly", "celestial"] : []),
  ],
  importance: 9,
}));

const mahapurushas: SearchItem[] = Object.values(mahapurushaKnowledge).map((p) => ({
  id: p.id,
  type: "mahapurusha",
  title: p.title,
  keywords: [
    p.id,
    ...p.title.en.toLowerCase().split(" "),
    ...p.title.kn.toLowerCase().split(" "),
    ...p.title.hi.toLowerCase().split(" "),
    ...(p.identity.alsoKnownAs.en.toLowerCase().split(/[ /]+/)),
    ...(p.id === "chanakya" ? ["kautilya", "vishnugupta", "arthashastra", "taxila", "takshashila", "maurya", "statecraft", "advisor", "minister", "chankya", "chanky"] : []),
    ...(p.id === "chandragupta_maurya" ? [
      "chandragupta", "chandragupta maurya", "chandra gupta", "maurya", "maurya empire",
      "maurya empire founder", "pataliputra", "magadha", "bindusara", "seleucus", "seleucus i",
      "ಚಂದ್ರಗುಪ್ತ", "ಚಂದ್ರಗುಪ್ತ ಮೌರ್ಯ", "ಮೌರ್ಯ", "ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯ", "ಪಾಟಲಿಪುತ್ರ", "ಮಗಧ",
      "चंद्रगुप्त", "चंद्रगुप्त मौर्य", "मौर्य", "मौर्य साम्राज्य", "पाटलिपुत्र", "मगध"
    ] : []),
    ...(p.id === "vikramaditya" ? [
      "vikramaditya", "king vikramaditya", "raja vikramaditya", "vikrama", "vikram",
      "vikram samvat", "samvat", "ujjain", "avanti", "malwa", "navaratna", "shakari",
      "chandragupta ii", "chandragupta vikramaditya", "gupta", "betal", "vetala",
      "baital pachisi", "singhasan battisi", "simhasana", "nyaya", "kavya", "kalidasa",
      "varahamihira",
      "ವಿಕ್ರಮಾದಿತ್ಯ", "ರಾಜಾ ವಿಕ್ರಮಾದಿತ್ಯ", "ವಿಕ್ರಮ", "ವಿಕ್ರಮ ಸಂವತ್ಸರ", "ಉಜ್ಜಯಿನಿ", "ಅವಂತಿ", "ನವರತ್ನ", "ಬೇತಾಳ", "ಸಿಂಹಾಸನ",
      "विक्रमादित्य", "राजा विक्रमादित्य", "विक्रम", "विक्रम संवत", "उज्जैन", "अवंती", "मालवा", "नवरत्न", "शकारि", "वेताल", "सिंहासन बत्तीसी"
    ] : []),
    ...(p.id === "shalivahana" ? [
      "shalivahana", "salivahana", "shalivahan", "salivahan", "shaka", "shaka era",
      "shaka samvat", "shalivahana shaka", "pratishthana", "paithan",
      "ಶಾಲಿವಾಹನ", "ಸಾಲಿವಾಹನ", "ಶಾಲಿವಾಹನ ಶಕ", "ಶಕ", "ಶಕ ಸಂವತ್ಸರ", "ಪ್ರತಿಷ್ಠಾನ", "ಪೈಠಣ",
      "शालिवाहन", "सालिवाहन", "शालिवाहन शक", "शक", "शक संवत", "शक युग", "प्रतिष्ठान", "पैठन"
    ] : []),
    ...(p.id === "samudragupta" ? [
      "samudragupta", "samudra gupta", "samudragupta maharaj", "gupta", "gupta empire",
      "gupta emperor", "gupta dynasty", "prayaga prashasti", "allahabad pillar",
      "prayagraj pillar", "harishena", "pataliputra",
      "ಸಮುದ್ರಗುಪ್ತ", "ಸಮುದ್ರ ಗುಪ್ತ", "ಗುಪ್ತ", "ಗುಪ್ತ ಸಾಮ್ರಾಜ್ಯ", "ಗುಪ್ತ ಸಾಮ್ರಾಟ",
      "ಗುಪ್ತ ವಂಶ", "ಪ್ರಯಾಗ ಪ್ರಶಸ್ತಿ", "ಅಲಹಾಬಾದ್ ಸ್ತಂಭ", "ಪ್ರಯಾಗರಾಜ ಸ್ತಂಭ", "ಹರಿಷೇಣ", "ಪಾಟಲಿಪುತ್ರ",
      "समुद्रगुप्त", "समुद्र गुप्त", "गुप्त", "गुप्त साम्राज्य", "गुप्त सम्राट",
      "गुप्त वंश", "प्रयाग प्रशस्ति", "इलाहाबाद स्तंभ", "प्रयागराज स्तंभ", "हरिषेण", "पाटलिपुत्र"
    ] : []),
  ],
  importance: 10,
}));

export const SEARCH_INDEX: SearchItem[] = [...cities, ...mountains, ...rivers, ...regions, ...mahapurushas];
