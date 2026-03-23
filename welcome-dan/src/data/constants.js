// ========== ACT 1: BOOT SEQUENCE ==========
export const BOOT_LINES = [
  { text: '> STRUCTURECRAFT ONBOARDING PROTOCOL v2.6', delay: 50 },
  { text: '> INITIATING AGENT INTAKE...', delay: 60 },
  { text: '> SCANNING RESUME... LOADED', delay: 40 },
  { text: '> CROSS-REFERENCING EMPLOYER HISTORY... [3 DEFUNCT]', delay: 45 },
  { text: '> VERIFYING NAME SPELLING...', delay: 70 },
  { text: '> ...', delay: 300 },
  { text: '> ...14 VARIANTS DETECTED', delay: 50 },
  { text: '> DEPLOYING WELCOME SEQUENCE', delay: 55 },
  { text: '> ASSIGNING ONBOARDING CONTACT: BEN EPP \u2014 BD COORDINATOR', delay: 50 },
  { text: '> AGENT CODENAME: "DAN"', delay: 60 },
  { text: '> STATUS: ITCH \u2014 ABOUT TO BE SCRATCHED', delay: 50 },
];

// ========== ACT 2: AGENT DOSSIER ==========
export const DOSSIER_FIELDS = [
  { label: 'Designation', value: 'Deniel Kristiansen' },
  { label: 'Known Aliases', value: 'Daniel, Danielle, Daneel, Denial, D\'Niel, Den-yell, "Japanese at one point"' },
  { label: 'Preferred Alias', value: 'Dan' },
  { label: 'Origin', value: 'Ukraine \u2192 Seattle (age 6)' },
  { label: 'Languages', value: 'English, Russian, Ukrainian' },
  { label: 'Classification', value: 'BS Business Administration / AS Drafting & Design' },
  { label: 'Sibling Status', value: 'Two brothers. Both software engineers. Dan chose differently.' },
  { label: 'Self-Descriptors (Unverified)', value: 'Renaissance Man, Chameleon, Project Management Octopus' },
  { label: 'Previous Employer Status', value: '[REDACTED \u2014 SEE FILE KTR-2021]' },
  { label: 'Stress Response', value: 'Unflappable. Will be tested.' },
];

export const NAME_MISSPELLINGS = [
  'Dandiel Kristyansen',
  'Deneel Christianson',
  'Danial Kristeansen',
  'Daniel Christensen',
  'Denyel Kristiansenn',
  'Denniel Kristyanson',
  'Daneel Christyansen',
  'Deniell Kristaansen',
  'Dahnyel Kristinseen',
  'D\'Anyel Cristienson',
  'Danyelle Kristeensun',
  'Denyal Khristiansenn',
  'Danneel Kristoffersen',
  'Deniaal Christiaaansen',
  'Doniel Kristyinsun',
  'Dineel Christyannsen',
  'Denielle Kristianzen',
  'Danyiel Kristenssen',
  'Denielo Kristiansano',
  'Dan-Yell Kris-Tea-Anson',
];

export const CHARACTER_CLASSES = [
  {
    id: 'renaissance',
    name: 'Renaissance Man',
    icon: '\uD83C\uDFA8',
    description: 'Artistic. Editorial. Refined.',
  },
  {
    id: 'chameleon',
    name: 'Chameleon',
    icon: '\uD83E\uDD8E',
    description: 'Adaptive. Shifting. Versatile.',
  },
  {
    id: 'octopus',
    name: 'Octopus',
    icon: '\uD83D\uDC19',
    description: 'Multitasking. Systemic. Relentless.',
  },
];

// ========== ACT 3: CAREER DOSSIER ==========
export const CAREER_TIMELINE = [
  {
    id: 'jga',
    years: '2017\u20132018',
    title: 'Jon Graves Architects',
    icon: '\u270F\uFE0F',
    short: 'Drew things. Did RFQs. The only period where the job title matched the work.',
    expanded: 'Worked with architects on RFQ/RFP responses. Produced technical drawings. Collaborated with estimators, engineers, interior designers. Started in the AEC world and never fully left.',
  },
  {
    id: 'katerra',
    years: '2018\u20132020',
    title: 'Katerra',
    icon: '\uD83C\uDFED',
    short: 'Faucets, tile, casework. Also, a CLT factory nearby. Then: everything caught fire.',
    expanded: 'Product management for internal building products. Managed supplier relationships with manufacturers in China. Adjacent to the CLT factory in Spokane \u2014 close enough to catch the mass timber bug, not close enough to scratch it. One of the last let go when it all collapsed.',
    easterEgg: 'KTR-2021',
  },
  {
    id: 'eveek',
    years: '2020\u20132024',
    title: 'Eveek',
    icon: '\uD83D\uDCBB',
    short: 'The tech sabbatical. He played fine. Nobody asked for an encore.',
    expanded: 'Marketing operations for a tech company. Content, campaigns, workflows. "Let me see how well I can play in this field." Completely unrelated to every other job on this timeline.',
  },
  {
    id: 'kova',
    years: '2021\u2013Present',
    title: 'KOVA / Modwall / AIIR',
    icon: '\uD83D\uDD17',
    short: 'Three companies, one VC, one Dan. Built systems with duct tape and willpower.',
    expanded: 'In-house marketing/brand/sales enablement across three companies under one investment group (same investors from Katerra). Built Asana intake automations, Smartsheets tracking infrastructure, managed agencies. Companies sold. Texas relocation proposed. Dan declined.',
    subtext: 'Companies outlasted: 4. Companies voluntarily left: 1 (for StructureCraft).',
  },
  {
    id: 'structurecraft',
    years: '2026',
    title: 'StructureCraft',
    icon: '\u2728',
    short: null,
    expanded: null,
    centerLine: 'The itch gets scratched.',
  },
];

// ========== ACT 4: LOADOUT ==========
export const LOADOUT_CARDS = [
  {
    name: 'Notion',
    rarity: 'LEGENDARY',
    rarityColor: 'from-purple-500 to-amber-400',
    rarityBg: 'bg-purple-500/20',
    rarityText: 'text-purple-400',
    oneLiner: 'Your daily workspace. Project sheets, resumes, boilerplate, pursuit tracking.',
    stats: [
      { label: 'Usefulness', value: 10 },
      { label: 'Content Freshness', value: 6 },
      { label: 'Your Familiarity', value: 1 },
    ],
    detail: 'You didn\'t know what this was three weeks ago. You compared it to Deltek. You will be living in it daily. Check "last edited" dates before trusting anything.',
  },
  {
    name: 'HubSpot',
    rarity: 'RARE',
    rarityColor: 'from-blue-400 to-blue-600',
    rarityBg: 'bg-blue-500/20',
    rarityText: 'text-blue-400',
    oneLiner: 'SC\'s CRM. Contacts, companies, pursuit pipeline.',
    stats: [
      { label: 'Potential', value: 10 },
      { label: 'Current Utilization', value: 4 },
      { label: 'Your Experience', value: 8 },
    ],
    detail: 'Exists. Is set up. Is underused. You have more HubSpot experience than anyone at SC. Congratulations on your involuntary promotion to CRM owner.',
  },
  {
    name: 'P: Drive',
    rarity: 'CURSED',
    rarityColor: 'from-red-500 to-red-700',
    rarityBg: 'bg-red-500/20',
    rarityText: 'text-red-400',
    oneLiner: '80,000 project photos. Zero tagging.',
    stats: [
      { label: 'Photo Quantity', value: 10 },
      { label: 'Findability', value: 1 },
      { label: 'Will to Live', value: 2 },
    ],
    detail: 'Never enter alone. Ask the project engineer. They find it in 30 seconds. The P: drive costs you an hour.',
    hasSearch: true,
    cursed: true,
  },
  {
    name: 'InDesign',
    rarity: 'LEGENDARY',
    rarityColor: 'from-purple-500 to-amber-400',
    rarityBg: 'bg-purple-500/20',
    rarityText: 'text-purple-400',
    oneLiner: 'Where proposals are born. Your primary production tool.',
    stats: [
      { label: 'Importance', value: 10 },
      { label: 'Your Proficiency', value: 9 },
      { label: 'SC Template Familiarity', value: 0 },
    ],
    detail: 'You love this. You use it daily. This is your day-one comfort zone. The learning curve is SC\'s templates and brand conventions, not the tool.',
    shimmer: true,
  },
  {
    name: 'Microsoft Teams',
    rarity: 'COMMON',
    rarityColor: 'from-slate-400 to-slate-500',
    rarityBg: 'bg-slate-500/20',
    rarityText: 'text-slate-400',
    oneLiner: 'How SC communicates internally.',
    stats: [
      { label: 'Response Speed (Engineers)', value: 5 },
      { label: 'Response Speed (Leadership)', value: 8 },
      { label: 'Emoji Usage', value: 2 },
    ],
    detail: 'Best for quick asks. Message Teams first for resume requests. Email only if ghosted. They will ghost you sometimes. Not personal.',
  },
  {
    name: 'Claude',
    rarity: 'RARE',
    rarityColor: 'from-blue-400 to-blue-600',
    rarityBg: 'bg-blue-500/20',
    rarityText: 'text-blue-400',
    oneLiner: 'SC\'s AI tool of choice. Max account provided.',
    stats: [
      { label: 'Potential', value: 10 },
      { label: 'Your Current Usage', value: 4 },
      { label: 'Thanksgiving Credibility Boost', value: 7 },
    ],
    detail: 'You said "adopt or get left behind" four times. Your brothers are both software engineers. Here\'s your shot at closing the gap.',
  },
];

// ========== ACT 5: THE CREW ==========
export const CREW_CARDS = [
  {
    name: 'Ben Epp',
    title: 'BD COORDINATOR',
    ability: 'Knows where the templates are',
    briefing: 'Business Development Coordinator based in Abbotsford. Been doing proposals and BD support at SC for a while now, so he can show you the ropes \u2014 where things live in Notion, how the InDesign templates work, who to bug for content. You two will be working in parallel across offices. If you\'re stuck on something, he\'s a good first call.',
  },
  {
    name: 'Gerald Epp',
    title: 'THE FOUNDER',
    ability: 'Finds the typo on page 14',
    briefing: 'President & Chief Engineer. Founded SC in 1998. Final decision-maker on all significant pursuits. Reads every word \u2014 technical and marketing. Will edit your semicolons. Do not bring problems without recommendations. Do not bring drafts you haven\'t proofread.',
  },
  {
    name: 'Leif Johnson',
    title: 'THE OPERATOR',
    ability: '"Can you turn this around by tomorrow?"',
    briefing: 'Structural Engineering Director \u2014 Seattle. Spends the majority of his time on BD pursuits and client relationships. Your closest collaborator. Leads consulting proposals and major US pursuits. Technical, client-savvy, great presenter. Primary source of scope input and last-minute requests.',
  },
  {
    name: 'Scott Crawford',
    title: 'THE EYE',
    ability: 'Detects misaligned margins from across the room',
    briefing: 'Director of Design Strategy, Seattle. If your layout has one spacing inconsistency, Scott sees it. Show him work before it goes to Gerald. He is your quality gate.',
  },
  {
    name: 'Lucas Epp',
    title: 'THE BRAIN',
    ability: 'Contains more structural engineering knowledge than your LinkedIn network',
    briefing: 'Vice President & Head of Engineering. Technical thought leader. Best content comes from conversation, not email. Sit with him, ask questions, take notes, write it yourself.',
  },
  {
    name: 'Dina Yousif',
    title: 'THE PARALLEL',
    ability: 'Separate scope',
    briefing: 'Marketing Manager. Owns marketing ops, DowelLam social/website, agency coordination. You own proposals, qualifications, BD production. Parallel roles. Collaborate on content and brand. Swim in your lane.',
  },
];

// ========== ACT 6: FIELD MANUAL ==========

// Hazards
export const HAZARD_CARDS = [
  {
    title: 'The Friday 4pm RFP',
    front: 'An RFP arrives Friday afternoon, due Monday.',
    back: 'Read Friday night. Compliance matrix Saturday. Content requests Monday 7am. Produce and submit Monday.',
  },
  {
    title: 'The Resume Ghost',
    front: 'You ask an engineer for their resume. They say "I\'ll get to it."',
    back: 'Update it yourself from Notion. Send: "Does this look right? Need confirmation by [date]." 45 minutes becomes 2 minutes.',
  },
  {
    title: 'The Gerald Edit',
    front: 'Gerald\'s review edits arrive 45 minutes before submission.',
    back: 'Set internal deadline one day early. His edits always improve the proposal. Build the buffer into your process.',
  },
  {
    title: 'The P: Drive Expedition',
    front: 'You need a specific photo of a specific detail.',
    back: 'Ask the engineer. 30 seconds. Do not browse the P: drive. Repeat: do not browse.',
  },
  {
    title: 'The Model Mixup',
    front: 'You write a consulting proposal that mentions fabrication.',
    back: 'Consulting = engineering only. Engineer-build = design + build. Value engineer-build = redesign + build. Every sentence must match.',
  },
  {
    id: 'mass-timber',
    title: 'The Mass Timber Reflex',
    front: 'You call SC a "mass timber company."',
    back: 'SC is a structural engineering and engineer-build firm. Gerald chose "Structure" not "Timber." Override your Katerra wiring.',
    hasMassTimberEasterEgg: true,
  },
];

// Quiz
export const QUIZ_QUESTIONS = [
  {
    question: 'A New York architect needs structural engineering for a 12-story mass timber tower. No construction scope.',
    options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'],
    correct: 0,
    wrongFeedback: 'Engineering only. No shop, no site.',
    rightFeedback: 'Correct. Pure design services.',
  },
  {
    question: 'An Atlanta GC has a steel canopy design but wants timber, cheaper and faster. They want SC to redesign and build.',
    options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'],
    correct: 2,
    wrongFeedback: 'Someone else designed it. SC makes it better and builds it.',
    rightFeedback: 'Correct. This is where the money is.',
  },
  {
    question: 'A Vancouver architect wants SC to engineer a timber structure and fabricate and install from Abbotsford.',
    options: ['Consulting', 'Engineer-Build', 'Value Engineer-Build'],
    correct: 1,
    wrongFeedback: 'Design AND build. Full package.',
    rightFeedback: 'Correct. Brain and muscle.',
  },
];

export const QUIZ_RESULTS = [
  'Report to the shop for remedial training.',
  'The faucet catalogue didn\'t cover this.',
  'Two out of three. You\'ll have it by Friday.',
  'Gerald is cautiously optimistic.',
];

// RFP Generator
export const RFP_PAGE_LIMITS = [
  'Maximum 10 pages',
  'Maximum 6 pages',
  'No page limit (but be concise)',
  'Maximum 20 pages including appendices that don\'t count toward page limit except when they do',
];

export const RFP_REQUIREMENTS = [
  'Include 37 mandatory forms',
  'SF330 Parts I and II required, plus supplemental but no additional pages',
  'Provide firm history since founding',
  'Three project examples, none older than five years',
];

export const RFP_DEADLINES = [
  'Due by noon tomorrow',
  'Submit via portal (requires 48hr registration)',
  'Hard copies, 6 sets, delivered to Juneau, Alaska',
  'Email to an address that will auto-bounce your first attempt',
];

// Bingo
export const BINGO_GRID = [
  ['Someone calls SC a mass timber company', 'Engineer says EOD, means next Wednesday', 'FREE: You open InDesign and feel at home', 'Gerald edits your semicolons', 'You discover the P: drive'],
  ['Someone misspells your name', 'Leif: "quick turnaround"', 'A project you\'ve never heard of', 'Teams message at 4:55pm', 'Scott gives The Look'],
  ['Notion page from 2023', 'Wrong delivery model', 'FREE: Coffee', 'Someone mentions Katerra', 'Contradictory RFP requirements'],
  ['P: drive photo hunt fails', 'Engineer is "on site"', 'You say "adopt or get left behind"', 'Gerald rewrites exec summary', 'A project blows your mind'],
  ['Sub ghosts your email', 'You say "timber company"', 'DowelLam explained again', 'HubSpot data incomplete', 'The itch gets scratched'],
];

// ========== ACT 7: WHY YOU ==========
export const WHY_YOU_PARAGRAPHS = [
  'You\'ve spent years building systems out of Asana, Smartsheets, and sheer willpower for companies that kept selling, pivoting, or moving to Texas. SC isn\'t going anywhere.',
  'You walked into your interview and called our delivery model "straightforward." Most people need it explained three times. You got it immediately.',
  'You\'ve had the mass timber itch since Katerra. We\'ve got the shop, the engineers, and the projects. Let\'s go.',
];

export const WHY_YOU_CLOSER = 'Also, you willingly chose a job where you\'ll be hounding engineers for resume updates. That takes a specific kind of person. Welcome.';

// ========== TICKER ==========
export const TICKER_ITEMS = [
  'Self-described renaissance man, chameleon, AND project management octopus \u2014 commit to one, Dan...',
  'Described SC\'s delivery model as "straightforward" on first exposure \u2014 respect...',
  'Said "adopt or get left behind" four times across two interviews \u2014 we\'re counting...',
  'Built Asana automations and Smartsheets infrastructure with no fancy back-end software \u2014 resourceful...',
  'Has been in AEC since 2017 \u2014 the long way around to mass timber, but he made it...',
  'Speaks English, Russian, and Ukrainian \u2014 SC\'s most linguistically versatile BD hire...',
  'Started career as a drafter \u2014 can actually read drawings, unlike most marketing people...',
  'InDesign daily user \u2014 finally, someone who won\'t suggest doing the proposal in PowerPoint...',
  'Survived Katerra \u2014 if he can survive that, he can survive a Friday 4pm RFP...',
  'Someone on the BD team built this website instead of finishing a real proposal \u2014 priorities...',
  'The P: drive has 80,000 photos waiting. None are tagged. The adventure begins...',
  'The engineer said "it\'s just a quick markup"... that was 3 hours ago...',
  'If you\'re reading this, the P: drive search is still running...',
  'Somewhere in Abbotsford, Gerald is editing a semicolon right now...',
  'Fun fact: SC has completed projects on every continent except Antarctica. Give it time...',
  'Current status: the itch is being scratched...',
];

// ========== EASTER EGGS ==========
export const KATERRA_MEMORIAL = {
  text: 'In Memory of Katerra, Inc. | 2015\u20132021 | You gave Dan his mass timber interest and a very thorough faucet catalogue. The CLT factory was acquired by Mercer. SC sources from Mercer today. The circle of timber is complete.',
  button: 'Pour one out',
};

export const REDLINE_ANNOTATIONS = [
  'tighten',
  'delivery model unclear',
  'source photo?',
  'Gerald has questions.',
  'semicolon',
  'margins?',
  'rewrite',
  'check date',
];

export const SC_ACRONYMS = [
  'StructureCraft',
  'Scope Creep',
  'Semicolon Court',
  'Shop Chaos',
  'Standard Clarification',
];

// Section subtitle variants for Renaissance Man class
export const RENAISSANCE_SUBTITLES = {
  career: 'A Curated Exhibition of Professional Wandering',
  loadout: 'The Instruments of Your Craft',
  crew: 'The Ensemble Cast',
  fieldManual: 'A Primer for the Uninitiated',
};

export const DEFAULT_SUBTITLES = {
  career: 'FIELD RECORD',
  loadout: 'Hover to inspect. Click to equip. Pray for the P: Drive.',
  crew: 'Know your team. Do not bring Gerald a problem without a solution.',
  fieldManual: 'Everything you need to survive month one.',
};

// Chameleon accent colors per section
export const CHAMELEON_COLORS = [
  '#2dd4bf', // teal
  '#22d3ee', // cyan
  '#34d399', // emerald
  '#2dd4bf', // teal again
];
