// ========== MULTICLASS REVEAL ==========
export const MULTICLASS_SUBCLASSES = [
  { name: 'Operator', desc: 'manages the process' },
  { name: 'Translator', desc: 'turns engineer-speak into client-speak' },
  { name: 'Designer', desc: 'InDesign production' },
  { name: 'Nagger', desc: 'chases content from engineers' },
  { name: 'Therapist', desc: 'manages personalities under deadline pressure' },
  { name: 'Archaeologist', desc: 'finds things in Notion and the P: drive' },
];

// ========== CAREER EXPANDED ==========
export const KATERRA_EXPANDED = {
  whatItWas: 'Katerra was a construction technology startup founded in 2015 that tried to own the entire building lifecycle \u2014 design, manufacturing, construction. They raised $2 billion. They built a CLT factory in Spokane. They imploded in 2021 amid financial mismanagement. The factory was acquired by Mercer Mass Timber. SC sources from Mercer today.',
  dansRole: 'Product management for internal building products. Faucets, tile, casework, flooring, lighting. Created supplier partnerships with manufacturers in China. Managed product onboarding and specification into Katerra\'s own construction projects. Was being introduced to the CLT product when it all fell apart.',
  massTimberConnection: 'This is where the itch started. Dan got close enough to CLT to be fascinated, then got cut off from that world when Katerra collapsed. He spent the next 5 years in marketing roles that paid the bills but weren\'t the industry he wanted. SC is the way back.',
  incidentReport: {
    title: 'INCIDENT REPORT \u2014 CORPORATE DISSOLUTION',
    caseNumber: 'KTR-2021-FINAL',
    subject: 'Katerra, Inc.',
    date: 'June 1, 2021',
    classification: 'PUBLIC RECORD',
    summary: 'Entity raised approximately $2B in venture capital funding. Entity attempted vertical integration of design, manufacturing, and construction. Entity constructed CLT manufacturing facility in Spokane, WA. Entity experienced catastrophic financial mismanagement. Entity filed Chapter 11 bankruptcy. Assets dispersed. CLT factory acquired by Mercer International. Supply chain continues via Mercer Mass Timber.',
    impact: 'One (1) employee developed persistent interest in mass timber industry. Interest remained unresolved for approximately 5 years. Resolution pending via StructureCraft engagement.',
  },
};

export const KOVA_EXPANDED = {
  vcWeb: {
    top: 'Celesta Capital',
    middle: 'Onyx Homes (Katerra 2.0)',
    branches: ['KOVA', 'Modwall', 'AIIR'],
    center: 'Dan',
  },
  whatHeBuilt: [
    'Asana intake automation system \u2014 standardized project request workflow across three companies',
    'Smartsheets tracking infrastructure \u2014 multi-layer project and procurement tracking',
    'Agency management workflow \u2014 coordinated external creative and marketing agencies',
    'Brand systems \u2014 built brand guidelines and asset libraries for three distinct brands simultaneously',
  ],
  whyHeLeft: 'They\'re moving to Texas. Dan said no. He\'s been looking selectively \u2014 only roles in the AEC/mass timber space. Then he found SC.',
};

// ========== CREW EXPANDED ==========
export const CREW_EXPANDED = {
  'Ben Epp': {
    communication: 'Teams or email, either works. Usually quick to respond.',
    howToWork: 'Ask questions early. He\'d rather walk you through something once than have you guess and redo it later.',
    overlap: 'You\'re both doing BD work across offices. Coordinate on content, templates, and proposal schedules so you\'re not duplicating effort.',
  },
  'Gerald Epp': {
    communication: 'Email for formal requests. Teams for quick questions. In person for anything strategic. Does not like surprises. If bad news exists, deliver it early with a plan.',
    cares: 'Quality. Reputation. Precision. He built this company by being better than everyone else, not by being cheaper. Proposals reflect that standard.',
    approval: 'Bring him a clean draft, not a work-in-progress. Include your recommendation. Don\'t hedge. If you\'re wrong, he\'ll tell you. That\'s fine.',
    funFact: 'Founded SC in 1998. The company predates Google Chrome, the iPhone, and your college degree.',
  },
  'Leif Johnson': {
    workingOn: 'Leif runs most of SC\'s US consulting pursuits. He\'s talking to architects, presenting at shortlists, and building relationships across the Pacific Northwest. He\'ll hand you the scope and fee. You make it look incredible.',
    howToWork: 'He\'s fast. He\'ll send you content at 4pm for something due tomorrow. This is not disrespect \u2014 it\'s his pace. Match it or get ahead of it by asking early.',
    seattleAlly: 'He\'s your closest collaborator by proximity. Use that. Walk over to his desk instead of sending a Teams message when it matters.',
  },
  'Scott Crawford': {
    visualStandard: 'Scott\'s background is in creative design. He sees layouts, typography, whitespace, and visual hierarchy before he reads a single word. If your proposal looks generic, he will know before he opens the file.',
    howToWork: 'Show him drafts early. Get his input on layout before you fill in content. His feedback is surgical \u2014 he\'ll point to the exact element that\'s off. Listen.',
    impresses: 'Tailored, project-specific visual content. Not template-fill proposals. He wants to see that you designed this proposal for this client.',
  },
  'Lucas Epp': {
    interviewTechnique: 'Lucas won\'t write you a paragraph. He\'ll talk for 20 minutes and give you 3 pages of content if you know how to listen. Bring specific questions: "What was the biggest structural challenge on this project?" not "Can you tell me about this project?"',
    linkedinVoice: 'If you ever ghostwrite for Lucas, his voice is: technically precise, quietly confident, zero corporate speak. He sounds like an engineer who happens to be good at explaining things to non-engineers.',
  },
  'Dina Yousif': {
    herScope: 'DowelLam social media and website. Marketing operations. Agency coordination (Studio Oker for brand, Resn for website). Media production. PR distribution.',
    yourScope: 'Proposals. Qualifications. Presentation production. BD support. Content writing.',
    overlap: 'Content, brand enforcement, and event support. Coordinate. Don\'t duplicate.',
  },
};

// ========== P: DRIVE GAME ==========
export const PDRIVE_GAME = {
  target: 'Find: Exterior photo of T3 Minneapolis at sunset',
  folders: {
    'Projects': {
      '2019': {
        'T3_Minneapolis': {
          'Photos': {
            'Site': Array.from({ length: 100 }, (_, i) => `IMG_${4582 + i}.jpg`),
          },
        },
      },
    },
  },
  wrongMessages: [
    'Wrong image. This is a photo of someone\'s lunch from the job site.',
    'Wrong image. This appears to be a blurry photo of rebar.',
    'Wrong image. This is a selfie from the holiday party.',
    'Wrong image. This is a photo of a parking lot.',
    'Wrong image. This is someone\'s desktop screenshot.',
    'Wrong image. This is a photo of a whiteboard with illegible handwriting.',
    'Wrong image. This is a sunset, but it\'s in Abbotsford.',
    'Wrong image. This is T3 Minneapolis, but it\'s raining.',
    'Wrong image. This is a very nice photo of a pigeon.',
    'Wrong image. This is the P: drive making you suffer.',
  ],
  failMessage: 'Time\'s up. Meanwhile, you could have just asked the engineer.',
  scottMessage: 'Scott: "Yeah here you go" [hero_shot_T3_sunset_final.jpg]',
  scottTime: '30 seconds',
};

// ========== NOTION SIMULATOR ==========
export const NOTION_PAGES = {
  'Project Sheets': [
    { name: 'T3 Minneapolis', status: 'Complete', lastEdited: 'Mar 2024' },
    { name: 'Assembly Atlanta', status: 'In Progress', lastEdited: 'Feb 2026' },
    { name: 'Bloomberg Center', status: 'Complete', lastEdited: 'Jan 2024' },
    { name: 'Peel Police HQ', status: 'Complete', lastEdited: 'Oct 2023' },
    { name: 'Apple Raleigh', status: '[NEEDS UPDATE]', lastEdited: 'Oct 2023' },
    { name: 'T3 Atlanta (Stonemont)', status: 'Complete', lastEdited: 'Nov 2024' },
    { name: 'Gaylord Pool', status: 'Complete', lastEdited: 'Sep 2024' },
    { name: 'IMTC 2026 Pavilion', status: 'In Progress', lastEdited: 'Mar 2026' },
    { name: 'Taiyuan Botanical Garden', status: 'Complete', lastEdited: 'Jun 2023' },
    { name: 'Barbados NPAC', status: 'In Progress', lastEdited: 'Jan 2026' },
  ],
  'Resumes': [
    { name: 'Gerald Epp, P.Eng', note: null },
    { name: 'Leif Johnson, PE, SE', note: 'Note: Does not reflect work on Assembly Atlanta (completed Feb 2026). Update before next proposal.' },
    { name: 'Scott Crawford', note: null },
    { name: 'Lucas Epp, P.Eng', note: null },
    { name: 'Patrick Falkner, PE', note: 'Last updated: 2023. Needs review.' },
  ],
  'Boilerplate': {
    text: 'StructureCraft is a structural engineering and design-build firm specializing in innovative timber, steel, glass, and hybrid structures. Founded in 1998, SC has delivered award-winning projects across North America and internationally.',
    note: 'Three versions exist. Nobody knows which is current.',
    tracked: [
      { original: 'specializing in innovative timber', replacement: 'with deep expertise in mass timber' },
      { original: 'award-winning projects', replacement: 'landmark structures' },
    ],
  },
  'Pursuit Tracker': [
    { pursuit: 'Denver Airport Terminal Expansion', client: 'DEN/Gensler', status: 'Shortlisted', dueDate: 'Apr 2026', lead: 'Leif' },
    { pursuit: 'Microsoft Campus Pavilion', client: 'Microsoft/LMN', status: 'Proposal Submitted', dueDate: 'Mar 2026', lead: 'Gerald' },
    { pursuit: 'Portland CLT Office Tower', client: 'Hacker Architects', status: 'Go/No-Go', dueDate: 'TBD', lead: 'Leif' },
    { pursuit: 'University of Washington Fieldhouse', client: 'UW/Mahlum', status: '???', dueDate: '', lead: '' },
    { pursuit: 'IMTC 2026 Pavilion (Design-Build)', client: 'SC/Lake Flato', status: 'In Production', dueDate: 'N/A', lead: 'Gerald' },
  ],
};

// ========== TOOLKIT COMPARISON ==========
export const TOOLKIT_COMPARISON = [
  { tool: 'InDesign', danKnows: 'yes', danLabel: 'Daily', scUses: 'yes', scLabel: 'Primary', verdict: 'You\'re home' },
  { tool: 'Asana', danKnows: 'yes', danLabel: 'Expert', scUses: 'no', scLabel: 'Not used', verdict: 'Withdrawal symptoms expected' },
  { tool: 'Smartsheet', danKnows: 'yes', danLabel: 'Expert', scUses: 'no', scLabel: 'Not used', verdict: 'See above' },
  { tool: 'HubSpot', danKnows: 'yes', danLabel: 'Experienced', scUses: 'yes', scLabel: 'Underused', verdict: 'You\'re the most qualified person here' },
  { tool: 'Notion', danKnows: 'no', danLabel: '"A notion?"', scUses: 'yes', scLabel: 'Daily', verdict: 'This will be fine. Probably.' },
  { tool: 'Canva', danKnows: 'yes', danLabel: 'Listed', scUses: 'yes', scLabel: 'Used', verdict: 'Common ground' },
  { tool: 'Figma', danKnows: 'yes', danLabel: 'Listed', scUses: 'no', scLabel: 'Not primary', verdict: 'Nice to have' },
  { tool: 'Bluebeam', danKnows: 'warn', danLabel: '"Been a while"', scUses: 'yes', scLabel: 'Used for markups', verdict: 'Relearn curve: 1 day' },
  { tool: 'Claude', danKnows: 'warn', danLabel: 'Basic', scUses: 'yes', scLabel: 'Heavy use', verdict: 'Adopt or get left behind' },
  { tool: 'Deltek', danKnows: 'no', danLabel: 'But knows what it is', scUses: 'no', scLabel: '', verdict: 'Irrelevant but impressive that he knows' },
];

// ========== INTEL: DELIVERY MODELS ==========
export const DELIVERY_MODELS = [
  {
    name: 'Consulting',
    lead: 'Leif',
    fee: 'Hourly or lump sum by phase',
    client: 'Architect or owner',
    emphasis: 'Engineering expertise, team qualifications, relevant experience',
    note: 'Start here. These are the simplest proposals. Good training ground.',
    detail: 'Pure structural engineering services. SC provides design, analysis, and construction documents. No fabrication, no installation. The client\'s contractor builds it. SC\'s value proposition is technical excellence and experience with complex structures.',
  },
  {
    name: 'Engineer-Build',
    lead: 'Gerald',
    fee: 'Design fees + construction contract',
    client: 'Architect, owner, or GC',
    emphasis: 'Integrated capability, fabrication expertise, schedule advantages, cost certainty',
    note: 'The most complex proposals and the most important to get right. This is what makes SC different from every other structural engineering firm.',
    detail: 'SC engineers the structure AND fabricates and installs it from their own shop in Abbotsford. Full vertical integration. This is SC\'s differentiator \u2014 very few firms in the world can offer this. Proposals must demonstrate both engineering excellence and construction capability.',
  },
  {
    name: 'Value Engineer-Build',
    lead: 'Varies',
    fee: 'Redesign fee + construction contract',
    client: 'GC/CM looking for better price/schedule',
    emphasis: 'Cost savings, schedule compression, material efficiency',
    note: 'The hidden workhorse. SC shows beauty but doesn\'t always show efficiency. This model is where contractors engage, and contractors are SC\'s primary revenue source.',
    detail: 'Someone else designed it. SC redesigns it better and builds it. Key proof points:',
    projects: [
      { name: 'Gaylord Pool', stat: '$5M redesign in 2 weeks' },
      { name: 'Peel Police', stat: '40% cost savings' },
      { name: 'Apple Raleigh', stat: 'Efficiency at scale' },
    ],
  },
];

// ========== INTEL: PORTFOLIO ==========
export const PORTFOLIO_PROJECTS = [
  { name: 'T3 Minneapolis', location: 'Minneapolis, MN', desc: 'First modern mass timber office building in the US', why: 'The project that put mass timber office buildings on the map in North America', proposalNote: 'Reference for any US office/commercial mass timber project', bonusFact: 'The timber was sourced from Structurlam (now Mercer). The same supply chain Katerra was trying to build.' },
  { name: 'T3 Atlanta (Stonemont)', location: 'Atlanta, GA', desc: 'Largest mass timber building in the Southeast US', why: 'Proves SC can deliver at massive scale in new markets', proposalNote: 'Reference for Southeast US projects or large-scale timber', bonusFact: null },
  { name: 'T3 Sterling Road', location: 'Toronto, ON', desc: 'Major Canadian mass timber project', why: 'Shows SC\'s Canadian roots and cross-border capability', proposalNote: 'Reference for Canadian projects', bonusFact: null },
  { name: 'T3 Nashville', location: 'Nashville, TN', desc: 'Continuing the T3 series', why: 'Demonstrates repeat client relationships', proposalNote: 'Reference for multi-project developer relationships', bonusFact: null },
  { name: 'Bloomberg Center (Cornell Tech)', location: 'New York, NY', desc: 'BIG/Shepley Bulfinch collaboration', why: 'High-profile architect collaboration at an Ivy League campus', proposalNote: 'Reference for high-design, high-profile institutional projects', bonusFact: null },
  { name: 'Taiyuan Botanical Garden Domes', location: 'Taiyuan, China', desc: 'Delugan Meissl. Gridshell domes', why: 'International showcase of structural innovation', proposalNote: 'Reference for international projects, complex geometry, gridshells', bonusFact: null },
  { name: 'Barbados National Performing Arts Centre', location: 'Barbados', desc: 'Caribbean performing arts venue', why: 'Shows SC\'s global reach', proposalNote: 'Reference for international and cultural projects', bonusFact: null },
  { name: 'Assembly Atlanta (FIFA Bandshell)', location: 'Atlanta, GA', desc: 'DLT bending-active timber shell for FIFA World Cup', why: 'Currently in production. Cutting-edge DLT technology', proposalNote: 'Reference for innovation, DowelLam, bending-active structures', bonusFact: 'The bandshell is a bending-active DLT shell for the FIFA World Cup. Dan\'s first SC proposal might involve this.' },
  { name: 'IMTC 2026 Pavilion', location: 'Portland, OR', desc: 'Lake Flato collaboration. Bending-active DLT shell', why: 'SC\'s own design showcase at a major industry event', proposalNote: 'Reference for SC\'s design leadership and DowelLam capability', bonusFact: null },
  { name: 'Apple Raleigh', location: 'Raleigh, NC', desc: 'Efficiency at scale', why: 'Proof of value engineering capability', proposalNote: 'Reference for value engineer-build and corporate campuses', bonusFact: null },
  { name: 'Peel Police HQ', location: 'Mississauga, ON', desc: '40% savings over original design', why: 'Value engineer-build poster child', proposalNote: 'Reference for cost savings, value engineering, institutional', bonusFact: '40% savings over the original design. This is what value engineer-build looks like in the real world.' },
  { name: 'Gaylord Pool', location: 'Various', desc: '$5M redesign in 2 weeks', why: 'Speed and ingenuity showcase', proposalNote: 'Reference for fast-turnaround value engineering', bonusFact: null },
];

// ========== INTEL: BRAND RULES ==========
export const BRAND_RULES = [
  'SC is a structural engineering and design-build firm',
  'Timber is a core competency, not the identity',
  'SC works across timber, steel, glass, concrete, stone, and hybrid systems',
  '"Mass timber" never appears in taglines, hero text, or identity lines',
  'DowelLam is SC\'s proprietary DLT product \u2014 distinct from the firm identity',
  'Gerald chose "Structure" over "Timber" in the company name',
  'The SC 2.0 rebrand (Studio Oker) spent months on this distinction',
  'If you write "mass timber company" in a proposal, Gerald will find it. It will be edited. Save yourself the round trip.',
];

// ========== INTEL: PROPOSAL LIFECYCLE ==========
export const PROPOSAL_LIFECYCLE = [
  { step: 1, title: 'Opportunity Lands', detail: 'Email, portal notification, or relationship-driven lead. Can come from architects, owners, GCs, or internal business development.', who: 'Leif, Gerald, or inbound', pitfall: 'Missing the initial notice in a buried email', time: 'Day 0' },
  { step: 2, title: 'Initial RFP Read-Through', detail: 'Read the entire document. Understand scope, evaluation criteria, page limits, required forms, submission method. Build a compliance checklist.', who: 'You', pitfall: 'Skimming and missing a mandatory form or requirement', time: 'Day 0\u20131' },
  { step: 3, title: 'Go/No-Go Brief to Gerald', detail: 'Brief summary: who\'s the client, what\'s the project, what\'s the fee potential, do we have relevant experience, what\'s the competition, is it worth pursuing?', who: 'You \u2192 Gerald', pitfall: 'Recommending a go without understanding the delivery model', time: 'Day 1' },
  { step: 4, title: 'Pursuit Kickoff', detail: 'Team identified. Content needs assigned. Timeline set. Internal deadline established (always before actual deadline).', who: 'You + Leif', pitfall: 'Not setting the internal deadline early enough for Gerald\'s review', time: 'Day 1\u20132' },
  { step: 5, title: 'Content Development', detail: 'Narratives, project descriptions, team bios, resumes. Pull from Notion, update as needed. Interview engineers for project-specific content.', who: 'You + engineers', pitfall: 'Trusting Notion content without checking "last edited" dates', time: 'Day 2\u20135' },
  { step: 6, title: 'Sub-Consultant Coordination', detail: 'If the proposal requires sub-consultants, coordinate their content, resumes, and project sheets. Chase them.', who: 'You', pitfall: 'Subs ghosting you. Follow up early and often.', time: 'Day 2\u20135' },
  { step: 7, title: 'InDesign Production', detail: 'Layout, typesetting, image selection, graphic elements. This is your wheelhouse.', who: 'You', pitfall: 'Generic templates when the client expects tailored', time: 'Day 4\u20137' },
  { step: 8, title: 'Internal Review', detail: 'Gerald, Leif, and/or Scott review the draft. Expect edits. Expect them to be right.', who: 'Gerald, Leif, Scott', pitfall: 'Sending a draft you haven\'t proofread yourself first', time: 'Day 7\u20138' },
  { step: 9, title: 'Revisions', detail: 'Implement review edits. Re-check compliance. Final proofread. Gerald may do another pass.', who: 'You', pitfall: 'Rushing this step. Gerald\'s edits always improve the proposal.', time: 'Day 8\u20139' },
  { step: 10, title: 'Final Submission', detail: 'Submit via the required method (portal, email, hard copy). Confirm receipt. Archive the submission.', who: 'You', pitfall: 'Portal registration requirements you didn\'t see earlier', time: 'Day 9\u201310' },
  { step: 11, title: 'Post-Submission', detail: 'If shortlisted: prepare presentation materials, practice sessions. If not: request debrief from client, document lessons learned.', who: 'You + team', pitfall: 'Not following up on losses \u2014 debriefs are gold', time: 'Day 10+' },
];

// ========== INTEL: GLOSSARY ==========
export const GLOSSARY_TERMS = [
  { term: 'Engineer-Build', category: 'Delivery Model', definition: 'SC engineers the structure and fabricates/installs it from their shop in Abbotsford. Full vertical integration.' },
  { term: 'Value Engineer-Build', category: 'Delivery Model', definition: 'Someone else designed it. SC redesigns it better (usually in timber) and builds it. Key revenue driver.' },
  { term: 'Consulting', category: 'Delivery Model', definition: 'Pure structural engineering services. No fabrication, no installation.' },
  { term: 'DowelLam (DLT)', category: 'Timber Product', definition: 'SC\'s proprietary dowel-laminated timber product. Panels connected with hardwood dowels instead of glue or nails. SC\'s signature product.' },
  { term: 'CLT', category: 'Timber Product', definition: 'Cross-laminated timber. Layers of lumber glued at right angles. SC sources CLT from Mercer (formerly Katerra\'s factory).' },
  { term: 'GLT / Glulam', category: 'Timber Product', definition: 'Glue-laminated timber. Layers of lumber glued together. Used for beams and columns.' },
  { term: 'NLT', category: 'Timber Product', definition: 'Nail-laminated timber. Lumber stacked and nailed together. Simpler, lower-cost panel system.' },
  { term: 'Mass Timber', category: 'Structural Term', definition: 'Large-format engineered wood products (CLT, DLT, GLT, NLT). Not SC\'s identity \u2014 a material SC works with.' },
  { term: 'Hybrid Structure', category: 'Structural Term', definition: 'Combines timber with steel, concrete, glass, or other materials. Most SC projects are hybrid.' },
  { term: 'SF330', category: 'Submission Type', definition: 'Standard Form 330. Federal government qualification form for architecture/engineering services. Two parts.' },
  { term: 'SOQ', category: 'Submission Type', definition: 'Statement of Qualifications. General firm capability document, not project-specific.' },
  { term: 'RFP', category: 'Submission Type', definition: 'Request for Proposal. Client wants a specific proposal with scope, fee, and approach.' },
  { term: 'RFQ', category: 'Submission Type', definition: 'Request for Qualifications. Client wants to know if you\'re capable before inviting a proposal.' },
  { term: 'RFI', category: 'Submission Type', definition: 'Request for Information. General inquiry. Less formal.' },
  { term: 'P: Drive', category: 'System', definition: '80,000+ project photos. Zero tagging. Ask the engineer, don\'t browse.' },
  { term: 'Notion', category: 'System', definition: 'SC\'s content management workspace. Project sheets, resumes, boilerplate. Check "last edited" dates.' },
  { term: 'HubSpot', category: 'System', definition: 'SC\'s CRM. Contacts, companies, pursuit pipeline. Underused. Dan is now the most qualified operator.' },
  { term: 'Gerald\'s Edit', category: 'SC-ism', definition: 'The review edits that arrive 45 minutes before submission. They are always better. Build buffer.' },
  { term: 'The Friday 4pm RFP', category: 'SC-ism', definition: 'An RFP that arrives Friday afternoon, due Monday. This is not hypothetical.' },
  { term: 'The Resume Ghost', category: 'SC-ism', definition: 'An engineer who says "I\'ll get to it" when asked for their resume. Update it yourself.' },
  { term: 'SC 2.0', category: 'Reference', definition: 'SC\'s recent rebrand. New visual identity developed with Studio Oker.' },
  { term: 'Studio Oker', category: 'Reference', definition: 'Brand agency that led SC\'s rebrand. Established the "Structure not Timber" positioning.' },
  { term: 'Resn', category: 'Reference', definition: 'Web agency building SC\'s new website.' },
  { term: 'Mercer Mass Timber', category: 'Reference', definition: 'CLT supplier. Acquired Katerra\'s Spokane factory. SC\'s CLT source. The circle of timber is complete.' },
  { term: 'IMTC', category: 'Industry Event', definition: 'International Mass Timber Conference. Major annual event. SC is building the 2026 pavilion.' },
  { term: 'WoodWorks', category: 'Industry Event', definition: 'Wood products council that promotes wood building in the US. Education and advocacy.' },
  { term: 'Adopt or get left behind', category: 'Dan-ism', definition: 'Dan\'s personal motto regarding technology and AI. Used four times across two interviews. SC is holding him to it.' },
];

// ========== INTERVIEW QUOTES (random popups) ==========
export const INTERVIEW_QUOTES = [
  { text: 'I kind of would isolate myself and be the master of everything.', attr: 'Dan, describing proposal workflow' },
  { text: 'I\'m not trying to be the expert or be the engineer, but I need to know enough to be functional.', attr: 'Dan to Gerald' },
  { text: 'Object is to win them, not just hand them in.', attr: 'SC AXIOM' },
  { text: 'An itch that never got scratched.', attr: 'Dan, making mass timber sound like a medical condition' },
  { text: 'Adopt or get left behind.', attr: 'Dan, x4' },
];

// ========== CLASSIFIED: UNLOCK DEFINITIONS ==========
export const CLASSIFIED_UNLOCKS = [
  { id: 'logo-click', name: 'THE REAL WELCOME', trigger: 'Click the logo 5 times', icon: '\uD83D\uDD13' },
  { id: 'redline', name: 'GERALD\'S REVIEW', trigger: 'Press Ctrl+Shift+R', icon: '\uD83D\uDD34' },
  { id: 'katerra', name: 'POUR ONE OUT', trigger: 'Click KTR-2021', icon: '\uD83D\uDD6F\uFE0F' },
  { id: 'acronym', name: 'SCOPE CREEP', trigger: 'Hover SC in footer', icon: '\uD83D\uDD00' },
  { id: 'mass-timber', name: 'IDENTITY ENFORCEMENT', trigger: 'Hover "mass timber" on hazard card', icon: '\uD83C\uDFF7\uFE0F' },
  { id: 'pdrive-game', name: 'SPELUNKER', trigger: 'Complete the P: Drive game', icon: '\uD83D\uDCC2' },
  { id: 'notion-2023', name: 'ARCHAEOLOGIST', trigger: 'Find the 2023 page in Notion simulator', icon: '\uD83D\uDD0D' },
  { id: 'rfp-x5', name: 'MASOCHIST', trigger: 'Generate 5 contradictory RFPs', icon: '\uD83C\uDFB0' },
  { id: 'bingo-win', name: 'SURVIVOR', trigger: 'Complete first week bingo', icon: '\uD83C\uDFC6' },
  { id: 'quiz-perfect', name: 'GERALD IS CAUTIOUSLY OPTIMISTIC', trigger: 'Get 3/3 on delivery model quiz', icon: '\uD83C\uDF93' },
];

// ========== NAV ITEMS ==========
export const NAV_ITEMS = [
  { id: 'dossier', label: 'DOSSIER' },
  { id: 'career', label: 'CAREER' },
  { id: 'arsenal', label: 'ARSENAL' },
  { id: 'crew', label: 'CREW' },
  { id: 'field-manual', label: 'FIELD MANUAL' },
  { id: 'inbox', label: 'INBOX' },
  { id: 'intel', label: 'INTEL' },
  { id: 'classified', label: 'CLASSIFIED' },
];

// ========== FOOTER VARIATIONS ==========
export const FOOTER_VARIATIONS = {
  'dossier': 'Welcome to StructureCraft, Dan.',
  'career': 'Welcome to StructureCraft, Dan. The best chapter starts now.',
  'arsenal': 'Welcome to StructureCraft, Dan. Your tools are ready.',
  'crew': 'Welcome to StructureCraft, Dan. Your team is ready.',
  'field-manual': 'Welcome to StructureCraft, Dan. Training complete.',
  'inbox': 'Welcome to StructureCraft, Dan. Your inbox awaits.',
  'intel': 'Welcome to StructureCraft, Dan. You\'ve done your homework.',
  'classified': 'Welcome to StructureCraft, Dan. You found everything.',
};
