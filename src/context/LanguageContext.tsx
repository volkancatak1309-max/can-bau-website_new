import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'de' | 'en' | 'tr';

interface Translations {
  [key: string]: string;
}

const translations: Record<Lang, Translations> = {
  de: {
    nav_agency: 'Unternehmen',
    nav_projects: 'Projekte',
    nav_immersion: 'Leistungen',
    nav_contact: 'Kontakt',
    nav_news: 'News',
    nav_socials: 'Netzwerk',
    hero_text: 'Unser Bauunternehmen realisiert Projekte von außergewöhnlicher Qualität — in Vorarlberg und darüber hinaus.',
    agency_title: 'Unser Unternehmen',
    agency_subtitle: 'Das Unternehmen schafft zeitgenössische Räume, die außergewöhnlich sind und perfekt in einzigartige Orte eingebettet sind.',
    agency_text1: 'CAN BAU denkt Räume, die uns tief mit dem verbinden, was uns erhebt. Die Schönheit, die wir zelebrieren, ist nicht unkörperlich: Sie geht auf die Gefühle ein und ehrt die reinen Emotionen. Manchmal spektakulär, niemals protzig – sie bietet ein seltenes und unendlich persönliches Erlebnis.',
    agency_text2: 'Zwei Temperamente, eine Vision. Seit über 25 Jahren bauen wir mit Präzision, Verantwortung und kompromissloser Qualität. Jedes Projekt ist ein Versprechen: an unsere Kunden, an unser Team und an die Region, die uns geprägt hat.',
    projects_title: 'Projekte',
    project_btn: 'PROJEKT ANSEHEN',
    all_projects: 'ALLE PROJEKTE',
    immersion_title: 'Leistungen',
    immersion_subtitle: 'Hochbau, Tiefbau, Abbruch — Meisterhafte Bauleistungen für anspruchsvolle Kunden.',
    contact_title: 'Kontakt',
    contact_address: 'Adresse',
    contact_phone: 'Telefon',
    contact_email: 'E-Mail',
    contact_btn: 'KONTAKT AUFNEHMEN',
    news_title: 'Aktuelles',
    footer_tagline: 'Für uns ist keine Baustelle zu klein oder zu groß.',
    footer_rights: 'Alle Rechte vorbehalten.',
    agency_label: 'Unternehmen',
    agency_cta: 'Unser Unternehmen entdecken',
    inspiration_caption: 'Hier werden unsere Ideen geboren, inspiriert von der Majestät der Berge und der Ruhe des Sees.',
    inspiration_btn: 'Unternehmen',
    inspiration_statement: 'Realität ist keine Begrenzung,',
    inspiration_statement2: 'Möglichkeiten zu...',
    gallery_architecture: 'Architektur',
    gallery_architecture_desc: 'Wenn Linien Raum formen und Charakter feiern',
    gallery_outdoor: 'Pools & Außenbereiche',
    gallery_outdoor_desc: 'Pools und Gärten verschmelzen mit dem Horizont und greifen nach der Weite der Welt wie nie zuvor',
    sketch_title: 'Von der Vision zur Realität',
    sketch_subtitle: 'Skizze &',
    sketch_subtitle_italic: 'Wirklichkeit',
    sketch_label_1: 'Skizze — Wohnanlage Sonnenhof',
    sketch_label_2: 'Realität — Wohnanlage Sonnenhof',
    projects_overview: 'Projektübersicht',
    projects_overview_desc: 'Eine Auswahl unserer realisierten Projekte aus über 25 Jahren Baugeschichte in Vorarlberg.',
    partner_title: 'Partner & Marken',
    partner_subtitle: 'Unsere',
    partner_subtitle_italic: 'Partner',
    team_title: 'Das Team',
    team_subtitle: 'Die Köpfe hinter',
    team_quote: 'Zwei Temperamente, eine Vision.',
    opening_hours: 'Öffnungszeiten',
    weekdays: 'Montag – Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag',
    closed: 'Geschlossen',
    read_more: 'Weiterlesen',
  },
  en: {
    nav_agency: 'Agency',
    nav_projects: 'Projects',
    nav_immersion: 'Services',
    nav_contact: 'Contact',
    nav_news: 'News',
    nav_socials: 'Network',
    hero_text: 'Our construction company delivers projects of exceptional quality — in Vorarlberg and beyond.',
    agency_title: 'Our Agency',
    agency_subtitle: 'The studio creates extraordinary contemporary spaces, perfectly rooted in unique settings.',
    agency_text1: 'CAN BAU imagines spaces that deeply connect us to what uplifts us. The beauty we celebrate is not abstract: it engages with sensations and honors pure emotions. Sometimes spectacular, never ostentatious — it offers a rare and infinitely personal experience.',
    agency_text2: 'Two temperaments, one vision. For over 25 years we have been building with precision, responsibility and uncompromising quality. Every project is a promise: to our clients, to our team and to the region that shaped us.',
    projects_title: 'Projects',
    project_btn: 'SEE PROJECT',
    all_projects: 'ALL PROJECTS',
    immersion_title: 'Services',
    immersion_subtitle: 'Building construction, civil engineering, demolition — Masterful construction services for discerning clients.',
    contact_title: 'Contact',
    contact_address: 'Address',
    contact_phone: 'Phone',
    contact_email: 'Email',
    contact_btn: 'GET IN TOUCH',
    news_title: 'News',
    footer_tagline: 'No construction site is too small or too large for us.',
    footer_rights: 'All rights reserved.',
    agency_label: 'Agency',
    agency_cta: 'Discover Our Agency',
    inspiration_caption: 'Here our ideas are born, inspired by the majesty of the mountains and the serenity of the lake.',
    inspiration_btn: 'Agency',
    inspiration_statement: 'Reality is not a limitation,',
    inspiration_statement2: 'possibilities to...',
    gallery_architecture: 'Architecture',
    gallery_architecture_desc: 'When lines shape space and celebrate character',
    gallery_outdoor: 'Pools & Outdoor Spaces',
    gallery_outdoor_desc: 'Pools and gardens merge with the horizon, reaching out to the vastness of the world like never before',
    sketch_title: 'From Vision to Reality',
    sketch_subtitle: 'Sketch &',
    sketch_subtitle_italic: 'Reality',
    sketch_label_1: 'Sketch — Villa Sonnenhof',
    sketch_label_2: 'Reality — Villa Sonnenhof',
    projects_overview: 'Project Overview',
    projects_overview_desc: 'A selection of our completed projects from over 25 years of construction history in Vorarlberg.',
    partner_title: 'Partners & Brands',
    partner_subtitle: 'Our',
    partner_subtitle_italic: 'Partners',
    team_title: 'The Team',
    team_subtitle: 'The minds behind',
    team_quote: 'Two temperaments, one vision.',
    opening_hours: 'Opening Hours',
    weekdays: 'Monday – Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    closed: 'Closed',
    read_more: 'Read more',
  },
  tr: {
    nav_agency: 'Şirket',
    nav_projects: 'Projeler',
    nav_immersion: 'Hizmetler',
    nav_contact: 'İletişim',
    nav_news: 'Haberler',
    nav_socials: 'Ağ',
    hero_text: 'İnşaat şirketimiz olağanüstü kalitede projeler üretiyor — Vorarlberg\'de ve ötesinde.',
    agency_title: 'Şirketimiz',
    agency_subtitle: 'Şirket, benzersiz mekanlara mükemmel şekilde kök salmış, olağanüstü çağdaş mekanlar yaratır.',
    agency_text1: 'CAN BAU, bizi yükselen şeylerle derinden bağlayan mekanlar tasarlar. Kutladığımız güzellik soyut değildir: duyularla etkileşime girer ve saf duyguları onurlandırır. Bazen görkemli, asla gösterişli değil — nadir ve sonsuz kişisel bir deneyim sunar.',
    agency_text2: 'İki mizaç, bir vizyon. 25 yılı aşkın süredir hassasiyet, sorumluluk ve ödün vermeyen kaliteyle inşa ediyoruz. Her proje bir sözdir: müşterilerimize, ekibimize ve bizi şekillendiren bölgeye.',
    projects_title: 'Projeler',
    project_btn: 'PROJEYİ GÖR',
    all_projects: 'TÜM PROJELER',
    immersion_title: 'Hizmetler',
    immersion_subtitle: 'Yüksek yapı, altyapı, yıkım — Seçkin müşteriler için usta işi inşaat hizmetleri.',
    contact_title: 'İletişim',
    contact_address: 'Adres',
    contact_phone: 'Telefon',
    contact_email: 'E-posta',
    contact_btn: 'BİZE ULAŞIN',
    news_title: 'Haberler',
    footer_tagline: 'Bizim için hiçbir inşaat alanı küçük veya büyük değildir.',
    footer_rights: 'Tüm hakları saklıdır.',
    agency_label: 'Şirket',
    agency_cta: 'Şirketimizi Keşfedin',
    inspiration_caption: 'Fikirlerimiz burada doğar, dağların ihtişamından ve gölün huzurundan ilham alır.',
    inspiration_btn: 'Şirket',
    inspiration_statement: 'Gerçeklik bir sınırlama değildir,',
    inspiration_statement2: 'olasılıklar...',
    gallery_architecture: 'Mimari',
    gallery_architecture_desc: 'Çizgiler mekanı şekillendirdiğinde ve karakteri kutladığında',
    gallery_outdoor: 'Havuzlar & Açık Alanlar',
    gallery_outdoor_desc: 'Havuzlar ve bahçeler ufukla bütünleşir, dünyanın genişliğine hiç olmadığı kadar uzanır',
    sketch_title: 'Vizyondan Gerçeğe',
    sketch_subtitle: 'Eskiz &',
    sketch_subtitle_italic: 'Gerçeklik',
    sketch_label_1: 'Eskiz — Villa Sonnenhof',
    sketch_label_2: 'Gerçek — Villa Sonnenhof',
    projects_overview: 'Proje Genel Bakış',
    projects_overview_desc: 'Vorarlberg\'de 25 yılı aşkın inşaat tarihimizden tamamlanan projelerimizden bir seçki.',
    partner_title: 'Ortaklar & Markalar',
    partner_subtitle: 'Bizim',
    partner_subtitle_italic: 'Ortaklarımız',
    team_title: 'Ekip',
    team_subtitle: 'Ardında duran zihinler',
    team_quote: 'İki mizaç, bir vizyon.',
    opening_hours: 'Çalışma Saatleri',
    weekdays: 'Pazartesi – Cuma',
    saturday: 'Cumartesi',
    sunday: 'Pazar',
    closed: 'Kapalı',
    read_more: 'Devamını oku',
  },
};

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'de',
  setLang: () => {},
  t: (k) => k,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('de');

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
  }, []);

  const t = useCallback(
    (key: string) => {
      return translations[lang][key] || key;
    },
    [lang]
  );

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
