export const locales = ["en", "ja"] as const;
export type Locale = (typeof locales)[number];

export type Artwork = {
  slug: string;
  title: string;
  year: number;
  technique: string;
  description: Record<Locale, string>;
  image: string;
  width?: number;
  height?: number;
  download: {
    jpg: string;
    png: string;
  };
};

export type CommunityPost = {
  slug: string;
  artworkSlug: string;
  name: string;
  handle: string;
  image: string;
  message: Record<Locale, string>;
};

export const works: Artwork[] = [
  {
    slug: "devilish-face",
    title: "Devilish Face",
    year: 2025,
    technique: "Ink and graphite",
    description: {
      en: "A study in tension and ambiguity: the face is half-recognizable, half-ruptured, inviting the viewer to complete what the work refuses to settle.",
      ja: "緊張と曖昧さの研究。顔は半分だけ見えて、半分は裂けていて、作品が決めてくれない余白を観る人が埋めるように誘います。",
    },
    image: "/works/devilish-face.svg",
    download: {
      jpg: "/works/devilish-face.svg",
      png: "/works/devilish-face.svg",
    },
  },
  {
    slug: "back-fashion",
    title: "Back Fashion",
    year: 2025,
    technique: "Pencil and collage",
    description: {
      en: "Layered silhouettes and folded fragments create a portrait that feels both intimate and emotionally distant.",
      ja: "重ねたシルエットと折り畳まれた断片が、親密さと距離感を同時に持つ肖像を生み出します。",
    },
    image: "/works/back-fashion.svg",
    download: {
      jpg: "/works/back-fashion.svg",
      png: "/works/back-fashion.svg",
    },
  },
  {
    slug: "dancing-ii",
    title: "Dancing II",
    year: 2025,
    technique: "Marker and ink",
    description: {
      en: "Gesture and motion live in the negative space; the figure redistributes itself as a pattern of rhythm and blur.",
      ja: "動きは負の空間に宿り、人物はリズムとボカしのパターンとして自分自身を再配置していきます。",
    },
    image: "/works/dancing-ii.svg",
    download: {
      jpg: "/works/dancing-ii.svg",
      png: "/works/dancing-ii.svg",
    },
  },
  {
    slug: "pop-per-cap",
    title: "Pop per Cap",
    year: 2025,
    technique: "Ballpoint and contour",
    description: {
      en: "A tension between the decorative and the raw, where repeated gestures become a structure of memory.",
      ja: "装飾的なものと生々しいものの間に揺れる作品で、繰り返しの筆跡が記憶の構造になっています。",
    },
    image: "/works/pop-per-cap.svg",
    download: {
      jpg: "/works/pop-per-cap.svg",
      png: "/works/pop-per-cap.svg",
    },
  },
  {
    slug: "champion",
    title: "Champion",
    year: 2025,
    technique: "Charcoal and linework",
    description: {
      en: "One persistent form is pushed into a frictional field of repetition, turning certainty into a moving edge.",
      ja: "一つの持続する形が反復の摩擦場へと押し出され、確信が動く縁へと変わっていきます。",
    },
    image: "/works/champion.svg",
    download: {
      jpg: "/works/champion.svg",
      png: "/works/champion.svg",
    },
  },
  {
    slug: "right-hand",
    title: "Right Hand",
    year: 2025,
    technique: "Pen and ink",
    description: {
      en: "An anatomical fragment becomes a symbol of intention: the hand becomes an action, a tool, and a witness.",
      ja: "解剖学的な断片が意志のシンボルへと変わり、手は動作であり道具であり証人になります。",
    },
    image: "/works/right-hand.svg",
    download: {
      jpg: "/works/right-hand.svg",
      png: "/works/right-hand.svg",
    },
  },
  {
    slug: "goridog",
    title: "Goridog",
    year: 2025,
    technique: "Gouache and pencil",
    description: {
      en: "The figure turns into a rhythmic notation that feels both animal and synthetic, grounded in instinct.",
      ja: "姿は動物的でも人工的でもあるリズム記号へと変わり、本能に根ざした形を作り出します。",
    },
    image: "/works/goridog.svg",
    download: {
      jpg: "/works/goridog.svg",
      png: "/works/goridog.svg",
    },
  },
  {
    slug: "euglena",
    title: "Euglena",
    year: 2025,
    technique: "Ink wash and marker",
    description: {
      en: "A minimal organism rendered as a tension between buoyancy and gravity, movement and stillness.",
      ja: "最小限の生物として描かれたこの作品は、浮遊と重力、動きと静けさの緊張を表しています。",
    },
    image: "/works/euglena.svg",
    download: {
      jpg: "/works/euglena.svg",
      png: "/works/euglena.svg",
    },
  },
  {
    slug: "cross-legs",
    title: "Cross Legs",
    year: 2025,
    technique: "Graphite and cut paper",
    description: {
      en: "A seated posture becomes a compressed map of time, rest, and bodily memory.",
      ja: "座った姿勢は、時間と休息と身体の記憶が圧縮された地図へと変わります。",
    },
    image: "/works/cross-legs.svg",
    download: {
      jpg: "/works/cross-legs.svg",
      png: "/works/cross-legs.svg",
    },
  },
  {
    slug: "pee-dog",
    title: "Pee Dog",
    year: 2025,
    technique: "Marker and collage",
    description: {
      en: "This work builds a rough emotional portrait out of repetition, corners, and abrupt rhetorical gestures.",
      ja: "反復と角、唐突な比喩の動きから、荒々しい感情の肖像が組み立てられています。",
    },
    image: "/works/pee-dog.svg",
    download: {
      jpg: "/works/pee-dog.svg",
      png: "/works/pee-dog.svg",
    },
  },
  {
    slug: "beetle-front-ii",
    title: "Beetle Front II",
    year: 2025,
    technique: "Ink and digital trace",
    description: {
      en: "The insect-like form is reduced to an index of motion: an edge that keeps returning to itself.",
      ja: "昆虫に似た形が動きの指標へと還元され、自己へと戻る縁だけが残ります。",
    },
    image: "/works/beetle-front-ii.svg",
    download: {
      jpg: "/works/beetle-front-ii.svg",
      png: "/works/beetle-front-ii.svg",
    },
  },
  {
    slug: "throwing",
    title: "Throwing",
    year: 2025,
    technique: "Charcoal and acrylic",
    description: {
      en: "The action of hurling becomes a visual language of radius, force, and suspended aftermath.",
      ja: "投げる行為は、半径と力と一瞬の余韻の視覚言語になります。",
    },
    image: "/works/throwing.svg",
    download: {
      jpg: "/works/throwing.svg",
      png: "/works/throwing.svg",
    },
  },
];

export const communityPosts: CommunityPost[] = [
  {
    slug: "rin-drawing",
    artworkSlug: "devilish-face",
    name: "Rin",
    handle: "@rin_drawing",
    image: "/community/community-1.svg",
    message: { en: "I followed the original contour and added a quiet second rhythm around the face.", ja: "元の輪郭に沿いながら、顔のまわりに静かな二つ目のリズムを加えました。" },
  },
  {
    slug: "mika-marks",
    artworkSlug: "back-fashion",
    name: "Mika",
    handle: "@mika.marks",
    image: "/community/community-2.svg",
    message: { en: "The empty space felt like an invitation, so I answered it with soft blocks of color.", ja: "余白が招待状のように感じられたので、やわらかな色のかたまりで応えました。" },
  },
  {
    slug: "taro-lines",
    artworkSlug: "dancing-ii",
    name: "Taro",
    handle: "@taro.lines",
    image: "/community/community-3.svg",
    message: { en: "I kept the unfinished edge visible and let the new lines move away from it.", ja: "未完成の縁を残し、そこから新しい線が離れていくように描きました。" },
  },
  {
    slug: "noa-surface",
    artworkSlug: "pop-per-cap",
    name: "Noa",
    handle: "@noa_surface",
    image: "/community/community-4.svg",
    message: { en: "This version is about the moment a simple mark starts to become a character.", ja: "単純な印がキャラクターになり始める瞬間を表現したバージョンです。" },
  },
];

export type Dictionary = {
  home: {
    heroTitle: string;
    heroBody: string;
  };
};

export function getDictionary(locale: Locale): Dictionary {
  if (locale === "ja") {
    return {
      home: {
        heroTitle: "未完成の作品を、手で完成させる。",
        heroBody: "DYC PAPER は、未完成の絵や記号を触れ、描き足し、共有するためのコミュニティです。見る人が手を動かすことで、作品は新しい意味を持ち始めます。",
      },
    };
  }

  return {
    home: {
      heroTitle: "Unfinished works are completed by hand.",
      heroBody: "DYC PAPER is a community for unfinished drawings and marks that invite people to touch, draw on, and share. Each gesture transforms the work into a new interpretation.",
    },
  };
}

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}
