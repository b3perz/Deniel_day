import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMAILS = [
  {
    id: 1, from: 'Gerald Epp', email: 'gepp@structurecraft.com',
    subject: 'Welcome', time: 'Mon 8:02 AM', unread: false,
    body: 'Dan \u2014 welcome aboard. Looking forward to working together. Ben will get you set up this week. If you need anything, my door is open (literally \u2014 I\'m in Abbotsford, so it\'s a video call, but the sentiment stands). \u2014 Gerald',
  },
  {
    id: 2, from: 'Ben Epp', email: 'bepp@structurecraft.com',
    subject: 'Hey \u2014 welcome', time: 'Mon 8:30 AM', unread: true,
    body: 'Hey Dan \u2014 welcome to SC. I\'m Ben, BD Coordinator out of Abbotsford. We\'ll be working together a lot on proposals. I saved a few completed ones in Notion for you \u2014 one consulting, one engineer-build, one SOQ. Don\'t worry about understanding everything yet. Just absorb the vibes. Hit me up on Teams if you need anything. \u2014 Ben',
  },
  {
    id: 3, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'Quick one', time: 'Mon 9:47 AM', unread: true,
    body: 'Hey Dan, good to have you in Seattle. I\'ve got a consulting proposal that just came in \u2014 nothing urgent yet but I\'ll loop you in tomorrow so you can see how we handle these.\n\nAlso, Scott will give you The Look at some point this week. It\'s not personal. It means your margins are off. Welcome to the team.',
  },
  {
    id: 4, from: 'SC IT', email: 'it@structurecraft.com',
    subject: 'Account Setup Complete', time: 'Mon 10:00 AM', unread: true, attachment: true,
    body: 'Welcome to StructureCraft! Your accounts have been created:\n\n\u2022 Email: dkristiansen@structurecraft.com\n\u2022 Teams: Active\n\u2022 Notion: Invite sent\n\u2022 HubSpot: Access granted\n\u2022 P: Drive VPN: Instructions attached (may require 2\u20133 attempts... or 7)\n\nPlease note your name appears as \'Daniel\' in Teams, \'Deniel\' in HubSpot, and \'D. Christiansen\' in the building access system. We are aware. A fix is scheduled for Q4 2027.\n\nRegards,\nIT\n\nP.S. If the VPN asks for a "legacy token," ignore it. Nobody knows what that is.',
  },
  {
    id: 5, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'FW: P: Drive Access', time: 'Mon 11:15 AM', unread: true,
    body: 'Dan \u2014 IT should have given you P: drive access. Fair warning: it\'s 80,000 photos with zero tagging. If you need a specific project photo, do NOT browse. Ask the project engineer. They find it in 30 seconds. The P: drive will cost you your afternoon and your will to live.\n\nI speak from experience.\n\n\u2014 Leif',
  },
  {
    id: 6, from: 'printer@structurecraft.com', email: 'printer@structurecraft.com',
    subject: 'Print Job Failed', time: 'Mon 11:42 AM', unread: true,
    hasThread: true,
    body: 'Your print job "test_page.pdf" has failed.\n\nReason: Tray 2 paper jam.\n\nThis is your first interaction with the printer. It will not be your last. It will not get better. The printer can sense fear and deadlines.\n\nTo clear the jam, open Panel B and remove the crumpled remains of what was once your document. Then try again. And again.\n\n\u2014 HP LaserJet Pro MFP M428',
    thread: [
      { from: 'SC IT', body: 'Print job failed. Paper jam in Tray 2.' },
      { from: 'Dan Kristiansen', body: 'Cleared the jam. Retrying.' },
      { from: 'SC IT', body: 'Your attempt to resolve the paper jam has caused a secondary jam in Tray 3. The printer requests you do not intervene further.' },
      { from: 'The Printer', body: 'I remember what you did. \u2014 HP LaserJet Pro M404' },
      { from: 'SC IT', body: 'Please submit a facilities ticket. The printer is no longer responding to verbal commands.' },
    ],
  },
  {
    id: 7, from: 'Harrison & Associates', email: 'proposals@harrisonarch.com',
    subject: 'RFP \u2014 Cascade Mixed-Use Development', time: 'Mon 2:30 PM', unread: true, priority: true, attachment: true,
    body: 'Please find attached the Request for Proposals for structural engineering services for the Cascade project in Portland, OR. Proposals are due April 4, 2026.\n\nEvaluation criteria:\n\u2022 Firm qualifications and relevant experience (30%)\n\u2022 Key personnel and team structure (25%)\n\u2022 Project approach and methodology (25%)\n\u2022 Fee proposal (20%)\n\nPage limit: 15 pages. Appendices do not count toward the page limit except for Appendix C which does. We apologize for the inconsistency but will not be changing it.\n\nPlease confirm your intent to respond by Wednesday.',
  },
  {
    id: 8, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'RE: RFP \u2014 Cascade Mixed-Use', time: 'Mon 3:12 PM', unread: true,
    body: 'Dan \u2014 see the attached. What do you think? I have a call with the architect Thursday. Let\'s do a quick go/no-go before then.\n\nI think this is a consulting play \u2014 they\'re not asking for build services. But read the scope carefully, sometimes they bury construction management language in the appendix like it\'s an Easter egg.\n\nAlso, the page limit thing is real. They all do that.\n\n\u2014 Leif',
  },
  {
    id: 9, from: 'Scott Crawford', email: 'scrawford@structurecraft.com',
    subject: 'Templates', time: 'Mon 4:15 PM', unread: true,
    body: 'Dan,\n\nBen mentioned you\'re getting set up. The InDesign templates are in the shared drive under SC_Templates > Proposals > 2026.\n\nUse the 2026 versions. Not the 2025. Not the "2026_v2_FINAL." Not the "2026_v2_FINAL_actualFINAL." The one that says "2026_SC2.0" is correct.\n\nI know. I\'m sorry.\n\nIf a layout looks off, show me before it goes to Gerald. I\'d rather catch it early than watch Gerald find it on page 14 at 4:55 PM on submission day.\n\n\u2014 Scott',
  },
  {
    id: 10, from: 'no-reply@asana.com', email: 'no-reply@asana.com',
    subject: 'Removed from: KOVA Marketing', time: 'Mon 5:01 PM', unread: true,
    body: 'Hi Deniel,\n\nYou have been removed from the Asana workspace "KOVA Marketing."\n\nWe hope you enjoyed your time managing 47 concurrent workstreams across three companies with overlapping brand guidelines and a single shared Canva account.\n\nYour Smartsheets infrastructure will be maintained by... actually, we\'re not sure. Someone will figure it out. Probably.\n\nBest,\nAsana\n\n(Just kidding. This is a fake email. But the 47 workstreams were real. You\'re free now.)',
  },
  {
    id: 11, from: 'Ben Epp', email: 'bepp@structurecraft.com',
    subject: 'RE: RFP \u2014 Cascade Mixed-Use', time: 'Mon 5:15 PM', unread: true,
    body: 'Saw Leif forwarded the Cascade RFP. Happy to walk through the compliance matrix with you if you want a second set of eyes. Good first one to learn on.',
  },
  {
    id: 12, from: 'dan.kristiansen@structurecraft.com', email: 'dan.kristiansen@structurecraft.com',
    subject: 'A note from 6 months from now', time: 'Sep 2026', unread: true, future: true,
    body: 'Dan \u2014 it\'s you, from the future. A few things:\n\nThe Portland proposal goes well. Don\'t use the word "synergy" in the executive summary. Gerald will circle it.\n\nThe P: drive doesn\'t get better, but you develop a sixth sense for where the good photos are. You will call this "P: drive intuition." Nobody else will find this funny.\n\nYou still can\'t spell your own name consistently in email signatures. IT has given up.\n\nLeif will ask you to "turn something around quick" approximately 47 times. It is never quick. It is always worth it.\n\nThe mass timber itch? Fully scratched. You\'re going to love it here.\n\n\u2014 Future Dan',
  },
];

const SPAM_EMAILS = [
  { from: 'Prince Adewale of Lagos', subject: 'URGENT: Nigerian Prince Needs Structural Engineering Consultation for Palace Renovation', body: 'Dear Sir/Madam, I am Prince Adewale and I require the services of a vertically integrated structural engineering firm for my 47-room palace. I can offer $4.7 million USD if you simply provide your bank routing number and a copy of your SF330.' },
  { from: 'CLT Subscriptions Inc', subject: 'URGENT: Your Cross-Laminated Timber Subscription Is Expiring', body: 'Your annual CLT subscription is about to expire! Renew now to continue receiving cross-laminated timber panels at your doorstep. Premium members receive NLT and GLT at no additional charge. DowelLam upgrade available for SC employees.' },
  { from: 'P: Drive Singles', subject: 'Hot Singles In Your P: Drive Want To Be Tagged', body: 'Tired of browsing 80,000 untagged photos alone? P: Drive Singles connects you with project photos that are LOOKING for metadata. Swipe right on IMG_4582.jpg. She\'s been waiting since 2019.' },
  { from: 'Katerra Alumni Network', subject: 'Katerra Reunion 2027 \u2014 CANCELLED (insufficient funds)', body: 'Due to a lack of funding (see: our entire corporate history), the Katerra Alumni Reunion has been cancelled. In lieu of attendance, please pour one out for the CLT factory. The circle of timber is complete.' },
  { from: 'Adobe Systems', subject: 'You\'ve Been Using InDesign for 8 Hours Straight. Are You Okay?', body: 'Our records indicate you have been using Adobe InDesign continuously for 8 hours. This exceeds the recommended daily limit by approximately 8 hours. Please step away from the artboard. Your semicolons will still be there tomorrow. Gerald will make sure of it.' },
  { from: 'AI Safety Board', subject: 'NOTICE: You Said "Adopt or Get Left Behind" 4 Times', body: 'This phrase has been flagged by our automated monitoring system. Saying "adopt or get left behind" four times in two interviews suggests either strong conviction or an inability to generate alternative phrasing. SC is holding you to it either way.' },
  { from: 'Structural Wellness Institute', subject: 'Is Your Mass Timber Itch a Medical Condition?', body: 'Many professionals experience what we call "mass timber fixation" \u2014 a persistent urge to work with engineered wood products. Symptoms include: comparing all buildings to T3 Minneapolis, involuntary CLT vs GLT debates, and relocating across countries to join specific firms. There is no cure. Only StructureCraft.' },
  { from: 'VPN Services', subject: 'Still Trying to Connect to the P: Drive? We Can Help', body: 'We noticed you\'ve attempted to connect to the P: Drive VPN 7 times today. Our premium service guarantees connection in under 3 attempts. (We can\'t actually guarantee this. Nobody can. The P: Drive answers to no one.)' },
  { from: 'Gerald\'s Semicolons', subject: 'RE: RE: RE: Your Oxford Comma Usage Has Been Noted', body: 'This is an automated message from Gerald\'s semicolon monitoring system. Your recent proposal draft contained 3 semicolons, 2 of which were unnecessary and 1 of which was sublime. Overall rating: "See me."' },
  { from: 'The Printer', subject: 'Paper Jam Resolved. Just Kidding.', body: 'Tray 2 paper jam has been resolved.\n\n...\n\nNew paper jam detected in Tray 3.\n\nThe printer remembers. The printer always remembers.' },
  { from: 'Notion', subject: 'A Page You Follow Was Last Updated in 2023', body: 'The page "Project Sheet \u2014 Apple Raleigh" was last updated on October 14, 2023. Would you like to:\n\na) Update it\nb) Pretend it\'s current\nc) Ask Ben\nd) All of the above\n\nMost users select (b).' },
  { from: 'SC Facilities', subject: 'Lost: One Engineer\'s Resume', body: 'A resume belonging to a structural engineer was last seen in your inbox approximately 3 weeks ago. The engineer claims they "sent it." The resume claims otherwise. If found, please update it yourself and send back for "confirmation" \u2014 the 45-minute-to-2-minute conversion technique.' },
];

const SIDEBAR_FOLDERS = [
  { name: 'Inbox', count: EMAILS.filter(e => e.unread).length, id: 'inbox' },
  { name: 'Sent', count: 0, id: 'sent' },
  { name: 'Drafts', count: 1, id: 'drafts' },
  { name: 'Proposals', count: 0, id: 'proposals' },
  { name: 'SC Internal', count: 0, id: 'internal' },
  { name: 'Spam', count: SPAM_EMAILS.length, id: 'spam' },
];

function EmailRow({ email, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-slate-800 flex gap-3 items-start transition-colors ${
        selected ? 'bg-slate-800' : 'hover:bg-slate-800/50'
      }`}>
      <div className="flex flex-col items-center gap-1 mt-1 shrink-0 w-3">
        {email.priority && <span className="text-red-400 text-[8px] font-bold">!</span>}
        <div className={`w-2 h-2 rounded-full ${email.unread !== false ? 'bg-teal-400' : 'bg-transparent'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className={`text-sm truncate ${email.unread !== false ? 'text-white font-medium' : 'text-slate-400'}`}>
            {email.from}
          </span>
          <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{email.time}</span>
        </div>
        <div className={`text-xs truncate ${email.unread !== false ? 'text-slate-300' : 'text-slate-500'}`}>
          {email.subject}
          {email.attachment && <span className="ml-1 text-slate-600">&#128206;</span>}
          {email.future && <span className="ml-1 text-amber-500">&#9200;</span>}
        </div>
      </div>
    </button>
  );
}

export default function FakeInbox() {
  const [selected, setSelected] = useState(null);
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [showThread, setShowThread] = useState(false);

  const currentEmails = activeFolder === 'spam' ? SPAM_EMAILS.map((e, i) => ({ ...e, id: `spam-${i}`, unread: true, time: 'Mon' })) : EMAILS;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="py-16 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">INTERCEPTED TRANSMISSIONS</h2>
        <p className="text-center font-mono text-sm text-teal-400 mb-8">Preview of your inbox &mdash; Week 1, Day 1</p>

        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden flex flex-col md:flex-row" style={{ minHeight: '550px' }}>
          {/* Folder sidebar */}
          <div className="hidden md:block w-44 shrink-0 border-r border-slate-700 p-2">
            <div className="text-[9px] font-mono text-slate-600 uppercase tracking-wider px-2 py-1 mb-1">Folders</div>
            {SIDEBAR_FOLDERS.map(f => (
              <button key={f.id} onClick={() => { setActiveFolder(f.id); setSelected(null); setShowThread(false); }}
                className={`w-full flex justify-between px-2 py-1.5 rounded text-xs transition-colors ${
                  activeFolder === f.id ? 'bg-teal-400/10 text-teal-400' : 'text-slate-500 hover:text-slate-300'
                }`}>
                <span>{f.name}</span>
                {f.count > 0 && <span className={`font-mono text-[10px] ${f.name === 'Spam' ? 'text-red-400' : ''}`}>{f.count}</span>}
              </button>
            ))}
          </div>

          {/* Email list */}
          <div className="md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-slate-700 overflow-y-auto">
            <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                {activeFolder === 'spam' ? 'Spam' : 'Inbox'} ({currentEmails.length})
              </span>
              <span className="text-[9px] text-slate-600 font-mono">dkristiansen@structurecraft.com</span>
            </div>
            {activeFolder !== 'inbox' && activeFolder !== 'spam' ? (
              <div className="flex items-center justify-center h-32 text-slate-600 text-xs font-mono">No messages</div>
            ) : (
              currentEmails.map(email => (
                <EmailRow key={email.id} email={email} selected={selected?.id === email.id}
                  onClick={() => { setSelected(email); setShowThread(false); }} />
              ))
            )}
          </div>

          {/* Email body */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-6">
                  <div className="mb-6">
                    <h3 className="text-white font-semibold text-lg mb-2">{selected.subject}</h3>
                    <div className="flex items-center gap-2 text-xs flex-wrap">
                      <span className="text-teal-400 font-medium">{selected.from}</span>
                      {selected.email && <span className="text-slate-600">&lt;{selected.email}&gt;</span>}
                      {selected.priority && <span className="text-red-400 text-[9px] font-mono border border-red-400/30 px-1 rounded">HIGH PRIORITY</span>}
                      {selected.future && <span className="text-amber-400 text-[9px] font-mono border border-amber-400/30 px-1 rounded">FROM THE FUTURE</span>}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{selected.time}</div>
                  </div>
                  <div className="text-slate-300 text-sm leading-[1.7] whitespace-pre-line">
                    {selected.body}
                  </div>
                  {selected.attachment && (
                    <div className="mt-4 p-3 bg-slate-800 border border-slate-700 rounded text-xs text-slate-500 font-mono">
                      <span className="text-teal-400">&#128206; 1 attachment:</span>{' '}
                      {selected.id === 7 ? 'Cascade_RFP_2026.pdf (2.4 MB)' : 'P_Drive_VPN_Instructions_v3_UPDATED.pdf (14 KB)'}
                    </div>
                  )}
                  {selected.hasThread && !showThread && (
                    <button onClick={() => setShowThread(true)}
                      className="mt-4 text-xs font-mono text-teal-400 hover:text-teal-300 underline">
                      View full thread ({selected.thread.length} messages) &darr;
                    </button>
                  )}
                  {showThread && selected.thread && (
                    <div className="mt-4 space-y-3 border-t border-slate-700 pt-4">
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-2">Thread History</div>
                      {selected.thread.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                          className="p-3 bg-slate-800/50 border border-slate-700 rounded text-xs">
                          <div className="text-teal-400 font-mono text-[10px] mb-1">{msg.from}</div>
                          <div className="text-slate-300 leading-relaxed">{msg.body}</div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 gap-3">
                  <div className="text-4xl opacity-20">&#128232;</div>
                  <p className="text-slate-600 text-sm font-mono">Select an email to read</p>
                  <p className="text-slate-700 text-[10px] font-mono">
                    {activeFolder === 'spam' ? '12 messages. All extremely legitimate.' : '12 messages. 1 from a printer. 1 from the future. This is your life now.'}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
