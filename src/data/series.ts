import charAldous from "@/assets/char-aldous.jpg";
import charMercy from "@/assets/char-mercy.jpg";
import charSilas from "@/assets/char-silas.jpg";
import charBram from "@/assets/char-bram.jpg";
import charAda from "@/assets/char-ada.jpg";
import charIsolde from "@/assets/char-isolde.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Story", href: "#story" },
  { label: "Characters", href: "#characters" },
  { label: "Seasons", href: "#seasons" },
  { label: "Gallery", href: "#gallery" },
  { label: "Trailer", href: "#trailer" },
  { label: "Reviews", href: "#reviews" },
  { label: "Ratings", href: "#ratings" },
  { label: "Awards", href: "#awards" },
  { label: "Timeline", href: "#timeline" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export type Character = {
  id: string;
  name: string;
  actor: string;
  role: string;
  image: string;
  bio: string;
  quote: string;
  traits: string[];
};

export const CHARACTERS: Character[] = [
  {
    id: "aldous",
    name: "Aldous Vane",
    actor: "Callum Hardacre",
    role: "The Head of the Family",
    image: charAldous,
    quote: "I don't pay for suits. My suits are paid for by an understanding.",
    bio: "Decorated by the war and haunted by it, Aldous returned to Birmingham with a mind three moves ahead of every man in the room. He turns a back-street betting shop into a legitimate empire — one favour, one threat, one funeral at a time.",
    traits: ["Strategist", "War Veteran", "Chairman"],
  },
  {
    id: "mercy",
    name: "Mercy Vane",
    actor: "Fiona Bellamy",
    role: "The Matriarch",
    image: charMercy,
    quote: "This family runs on my word. Forget it, and you'll not run at all.",
    bio: "The still centre of the storm. Mercy holds the family's history, its secrets and its purse. She raised the Vane children on grief and grit, and no deal is done until she has weighed it with her cold, unerring eye.",
    traits: ["Matriarch", "Keeper of Secrets", "Power Broker"],
  },
  {
    id: "silas",
    name: "Silas Vane",
    actor: "Ewan Marsh",
    role: "The Wild One",
    image: charSilas,
    quote: "Rules are for men too frightened to be free.",
    bio: "Charming, reckless and quick with a razor, Silas is the spark the family both needs and fears. His hunger for the next thrill drags the Vanes into wars they never intended — and wins them some they never could.",
    traits: ["Firebrand", "Enforcer", "Gambler"],
  },
  {
    id: "bram",
    name: "Bram Vane",
    actor: "Declan Rourke",
    role: "The Fist",
    image: charBram,
    quote: "Talk finishes. I begin where talk finishes.",
    bio: "A mountain of a man with a soldier's discipline and a saint's patience — until it runs out. Bram is the family's shield and its final argument, loyal to Aldous beyond reason and beyond mercy.",
    traits: ["Muscle", "Loyalist", "Bare-knuckle Champion"],
  },
  {
    id: "ada",
    name: "Ada Vane",
    actor: "Nula Finch",
    role: "The Conscience",
    image: charAda,
    quote: "You built an empire on blood. I'll spend it on something better.",
    bio: "Sharp, well-read and quietly radical, Ada moves between the family's world and the salons of the reformers. She is the Vanes' link to a changing Britain — and the only one who dares tell Aldous the truth.",
    traits: ["Idealist", "Negotiator", "Reformer"],
  },
  {
    id: "isolde",
    name: "Isolde Kray",
    actor: "Vivienne Locke",
    role: "The Outsider",
    image: charIsolde,
    quote: "Everyone in Birmingham owes someone. Even the Vanes.",
    bio: "Landlady of The Anvil and keeper of every whispered confession in the city. Isolde sees everything and forgets nothing — which makes her the most dangerous ally, and the most tempting enemy, the family has ever known.",
    traits: ["Publican", "Informant", "Wildcard"],
  },
];

export type Season = {
  number: number;
  title: string;
  year: string;
  episodes: number;
  synopsis: string;
  episodeList: { no: number; title: string; summary: string }[];
};

export const SEASONS: Season[] = [
  {
    number: 1,
    title: "By Order",
    year: "1919",
    episodes: 6,
    synopsis:
      "Fresh from the trenches, Aldous seizes a crate of stolen guns and, with it, the attention of the Crown. The Vane name is spoken with fear for the first time.",
    episodeList: [
      { no: 1, title: "Cinders", summary: "A missing shipment forces the family's hand." },
      { no: 2, title: "The Anvil", summary: "Isolde's pub becomes neutral ground — and a trap." },
      { no: 3, title: "Chalk Lines", summary: "Aldous fixes the odds at the summer races." },
      { no: 4, title: "Iron & Ash", summary: "A rival foundry declares open war." },
      { no: 5, title: "The Widow's Cut", summary: "Mercy calls in a debt older than the family." },
      { no: 6, title: "By Order", summary: "The guns resurface. Everything changes." },
    ],
  },
  {
    number: 2,
    title: "London Calling",
    year: "1921",
    episodes: 6,
    synopsis:
      "The family's reach stretches to the capital, where southern crews and crooked politicians make the streets of Birmingham feel almost safe.",
    episodeList: [
      { no: 1, title: "South of the River", summary: "Silas opens a front the family can't afford." },
      { no: 2, title: "The Members' Club", summary: "Ada brokers an unlikely alliance." },
      { no: 3, title: "House Odds", summary: "A rigged fight goes catastrophically right." },
      { no: 4, title: "Salt", summary: "Bram is sent to settle an old score." },
      { no: 5, title: "The Long Con", summary: "Aldous gambles the whole empire on a lie." },
      { no: 6, title: "Curtain", summary: "A night at the theatre ends in gunfire." },
    ],
  },
  {
    number: 3,
    title: "Blood & Bronze",
    year: "1924",
    episodes: 6,
    synopsis:
      "Legitimacy comes at a price. As Aldous courts respectability, the old life refuses to let the Vanes go quietly.",
    episodeList: [
      { no: 1, title: "The Charity Ball", summary: "New money, old enemies, one ballroom." },
      { no: 2, title: "Confession", summary: "Isolde's ledger falls into the wrong hands." },
      { no: 3, title: "Sanctioned", summary: "The Crown offers a poisoned partnership." },
      { no: 4, title: "The Vault", summary: "Mercy hides the family's fortune in plain sight." },
      { no: 5, title: "Kin", summary: "A betrayal splits the family down the middle." },
      { no: 6, title: "Legacy", summary: "The Vanes decide what they are willing to become." },
    ],
  },
];

export type Rating = {
  label: string;
  value: number;
  suffix: string;
  detail: string;
};

export const RATINGS: Rating[] = [
  { label: "IMDb", value: 94, suffix: "/100", detail: "Top 50 Crime Dramas" },
  { label: "Rotten Tomatoes", value: 97, suffix: "%", detail: "Certified Fresh" },
  { label: "Google Users", value: 92, suffix: "%", detail: "Loved by Viewers" },
  { label: "Audience Score", value: 96, suffix: "%", detail: "Verified Viewers" },
];

export const RATING_DISTRIBUTION = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 14 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 1 },
];

export const RATING_SUMMARY =
  "Across 12,400+ verified reviews, VANE & CO holds universal acclaim — praised for atmosphere, ensemble performances and its uncompromising vision of post-war Birmingham.";

export type Review = {
  quote: string;
  author: string;
  source: string;
  stars: number;
  full: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  location: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "I've watched every episode twice. The atmosphere is unlike anything on television.",
    author: "Eleanor W.",
    location: "Birmingham",
  },
  {
    quote: "Callum Hardacre owns every scene. This is prestige TV at its finest.",
    author: "Marcus D.",
    location: "London",
  },
  {
    quote: "The soundtrack alone is worth it. Dark, beautiful, and completely addictive.",
    author: "Priya S.",
    location: "Leeds",
  },
  {
    quote: "Best crime drama since Boardwalk Empire. The family dynamics are electric.",
    author: "Tom H.",
    location: "Glasgow",
  },
];

export const REVIEWS: Review[] = [
  {
    quote: "A masterclass in atmosphere — every frame looks like an oil painting soaked in gunsmoke.",
    author: "Harriet Vale",
    source: "The Evening Chronicle",
    stars: 5,
    full: "VANE & CO does what few crime dramas dare: it slows down. It lets you breathe the coal-thick air of Birmingham, lets you sit in the silence before the violence. Callum Hardacre delivers a performance of glacial control, and the result is the most quietly menacing television in years. A masterclass in atmosphere — every frame looks like an oil painting soaked in gunsmoke.",
  },
  {
    quote: "Fiona Bellamy is monumental. The matriarch you'll follow into any war.",
    author: "Desmond Clarke",
    source: "Screen & Stage",
    stars: 5,
    full: "If there is any justice, awards season belongs to Fiona Bellamy. Her Mercy Vane is monumental — a woman who wields silence like a blade and grief like currency. The writing is razor-sharp, the direction impeccable, and the ensemble around her is flawless. This is the matriarch you'll follow into any war.",
  },
  {
    quote: "Gorgeous, brutal, and impossible to switch off. Prestige television at its peak.",
    author: "Priya Anand",
    source: "The Metropolitan",
    stars: 5,
    full: "Gorgeous, brutal, and impossible to switch off. VANE & CO marries the swagger of a gangster epic with the intimacy of a family tragedy. The soundtrack alone deserves its own review — a thunderous, anachronistic blend that shouldn't work and absolutely does. Prestige television at its peak.",
  },
  {
    quote: "The best-dressed show on television, and the most dangerous.",
    author: "Marcus Reeve",
    source: "Culture Weekly",
    stars: 4,
    full: "From the tailoring to the tommy guns, VANE & CO is the best-dressed show on television — and the most dangerous. It occasionally revels a little too much in its own style, but when the drama lands, it lands like a hammer. Ewan Marsh is a revelation as the family's loose cannon.",
  },
];

export type Award = {
  year: string;
  title: string;
  category: string;
  result: "Won" | "Nominated";
};

export const AWARDS: Award[] = [
  { year: "2024", title: "Golden Screen Awards", category: "Best Drama Series", result: "Won" },
  { year: "2024", title: "Critics' Circle", category: "Best Lead Actor — Callum Hardacre", result: "Won" },
  { year: "2024", title: "International Film & TV", category: "Best Cinematography", result: "Won" },
  { year: "2023", title: "National Television Honours", category: "Best Supporting Actress — Fiona Bellamy", result: "Won" },
  { year: "2023", title: "Golden Screen Awards", category: "Best Ensemble Cast", result: "Nominated" },
  { year: "2023", title: "Sound & Score Guild", category: "Outstanding Original Score", result: "Won" },
  { year: "2022", title: "Emerging Talent Prize", category: "Breakthrough — Ewan Marsh", result: "Nominated" },
];

export type TimelineEvent = { year: string; title: string; text: string };

export const TIMELINE: TimelineEvent[] = [
  { year: "1919", title: "The Return", text: "Aldous returns from the front and takes control of the family's back-street trade." },
  { year: "1920", title: "First Blood", text: "The Vanes win their first turf war, seizing the canals of Digbeth." },
  { year: "1921", title: "Going South", text: "The family opens operations in London, drawing the eye of the Crown." },
  { year: "1922", title: "The Anvil Pact", text: "Isolde Kray's pub becomes the neutral heart of Birmingham's underworld." },
  { year: "1924", title: "Bronze & Ballrooms", text: "The Vanes buy their way into legitimate society — and inherit new enemies." },
];

export type BtsCard = { title: string; text: string; stat: string };

export const BTS: BtsCard[] = [
  { title: "Practical Sets", stat: "3.2 acres", text: "A full 1920s Birmingham back-street was built on a decommissioned foundry, complete with working gas lamps and real coal smoke." },
  { title: "Costume Design", stat: "1,400+ pieces", text: "Every suit was hand-tailored in period-correct wool herringbone; even the razor caps were reconstructed from museum patterns." },
  { title: "Filming Locations", stat: "27 sites", text: "From Black Country canals to grand Victorian ballrooms, the production shot across the industrial North on 35mm film." },
  { title: "Director's Vision", stat: "1 unbroken take", text: "The season three finale features a six-minute single-take sequence choreographed across four rooms and sixty extras." },
];

export type Track = { title: string; artist: string; duration: string };

export const TRACKS: Track[] = [
  { title: "By Order (Main Theme)", artist: "The Foundry Orchestra", duration: "3:42" },
  { title: "Smoke Over Digbeth", artist: "Mara Vale", duration: "4:18" },
  { title: "Razor & Chalk", artist: "Cobalt Room", duration: "3:05" },
  { title: "The Widow's Cut", artist: "The Foundry Orchestra", duration: "5:11" },
  { title: "Iron in the Rain", artist: "Halcyon Vane", duration: "3:57" },
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  { q: "Is VANE & CO based on a true story?", a: "No. VANE & CO is an original work of fiction. While it draws on the atmosphere and history of 1920s industrial Birmingham, every character, family and event is invented for this portfolio showcase." },
  { q: "How many seasons are there?", a: "Three seasons of six episodes each are currently available, with a fourth in development. Every season is a self-contained chapter in the rise of the Vane family." },
  { q: "Where can I watch the series?", a: "This is a concept campaign built as a design portfolio piece. The trailer and imagery are illustrative placeholders and the series is not available to stream." },
  { q: "Who composed the soundtrack?", a: "The score is credited to the fictional Foundry Orchestra, blending sweeping strings with modern, driving percussion to capture the collision of old and new Birmingham." },
  { q: "Is the content suitable for all ages?", a: "The series depicts crime, violence and mature themes in the tradition of prestige crime drama, and would be classified for adult audiences." },
];

export const GALLERY = [
  { src: gallery5, w: 768, h: 1024, caption: "The Foundry" },
  { src: gallery2, w: 1024, h: 768, caption: "A Gentleman's Business" },
  { src: gallery1, w: 768, h: 1024, caption: "The Anvil" },
  { src: gallery4, w: 1024, h: 768, caption: "Race Day" },
  { src: gallery3, w: 768, h: 1024, caption: "Midnight Arrival" },
  { src: gallery6, w: 1024, h: 768, caption: "The Long Walk Home" },
];
