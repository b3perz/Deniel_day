import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EMAILS = [
  {
    id: 1, from: 'Gerald Epp', email: 'gepp@structurecraft.com',
    subject: 'Welcome', time: 'Mon 8:02 AM', unread: false, priority: false,
    body: 'Dan \u2014 welcome aboard. Looking forward to working together. Ben will get you set up this week. If you need anything, my door is open (literally \u2014 I\'m in Abbotsford, so it\'s a video call, but the sentiment stands). \u2014 Gerald',
  },
  {
    id: 2, from: 'Ben Epp', email: 'bepp@structurecraft.com',
    subject: 'Hey \u2014 welcome', time: 'Mon 8:30 AM', unread: true, priority: false,
    body: 'Hey Dan \u2014 welcome to SC. I\'m Ben, BD Coordinator out of Abbotsford. We\'ll be working together a lot on proposals. I saved a few completed ones in Notion for you \u2014 one consulting, one engineer-build, one SOQ. Don\'t worry about understanding everything yet. Just absorb the vibes. Hit me up on Teams if you need anything. \u2014 Ben',
  },
  {
    id: 3, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'Quick one', time: 'Mon 9:47 AM', unread: true, priority: false,
    body: 'Hey Dan, good to have you in Seattle. I\'ve got a consulting proposal that just came in \u2014 nothing urgent yet but I\'ll loop you in tomorrow so you can see how we handle these.\n\nAlso, Scott will give you The Look at some point this week. It\'s not personal. It means your margins are off. Welcome to the team.',
  },
  {
    id: 4, from: 'SC IT', email: 'it@structurecraft.com',
    subject: 'Account Setup Complete', time: 'Mon 10:00 AM', unread: true, priority: false, attachment: true,
    body: 'Welcome to StructureCraft! Your accounts have been created:\n\n\u2022 Email: dkristiansen@structurecraft.com\n\u2022 Teams: Active\n\u2022 Notion: Invite sent\n\u2022 HubSpot: Access granted\n\u2022 P: Drive VPN: Instructions attached (may require 2\u20133 attempts... or 7)\n\nPlease note your name appears as \'Daniel\' in Teams, \'Deniel\' in HubSpot, and \'D. Christiansen\' in the building access system. We are aware. A fix is scheduled for Q4 2027.\n\nRegards,\nIT\n\nP.S. If the VPN asks for a "legacy token," ignore it. Nobody knows what that is.',
  },
  {
    id: 5, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'FW: P: Drive Access', time: 'Mon 11:15 AM', unread: true, priority: false,
    body: 'Dan \u2014 IT should have given you P: drive access. Fair warning: it\'s 80,000 photos with zero tagging. If you need a specific project photo, do NOT browse. Ask the project engineer. They find it in 30 seconds. The P: drive will cost you your afternoon and your will to live.\n\nI speak from experience.\n\n\u2014 Leif',
  },
  {
    id: 6, from: 'printer@structurecraft.com', email: 'printer@structurecraft.com',
    subject: 'Print Job Failed', time: 'Mon 11:42 AM', unread: true, priority: false,
    body: 'Your print job "test_page.pdf" has failed.\n\nReason: Tray 2 paper jam.\n\nThis is your first interaction with the printer. It will not be your last. It will not get better. The printer can sense fear and deadlines.\n\nTo clear the jam, open Panel B and remove the crumpled remains of what was once your document. Then try again. And again.\n\n\u2014 HP LaserJet Pro MFP M428 (the machine that SC has a complicated relationship with)',
  },
  {
    id: 7, from: 'Harrison & Associates Architects', email: 'proposals@harrisonarch.com',
    subject: 'RFP \u2014 Cascade Mixed-Use Development', time: 'Mon 2:30 PM', unread: true, priority: true, attachment: true,
    body: 'Please find attached the Request for Proposals for structural engineering services for the Cascade project in Portland, OR. Proposals are due April 4, 2026.\n\nEvaluation criteria:\n\u2022 Firm qualifications and relevant experience (30%)\n\u2022 Key personnel and team structure (25%)\n\u2022 Project approach and methodology (25%)\n\u2022 Fee proposal (20%)\n\nPage limit: 15 pages. Appendices do not count toward the page limit except for Appendix C which does. We apologize for the inconsistency but will not be changing it.\n\nPlease confirm your intent to respond by Wednesday.',
  },
  {
    id: 8, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'RE: RFP \u2014 Cascade Mixed-Use Development', time: 'Mon 3:12 PM', unread: true, priority: false,
    body: 'Dan \u2014 see the attached. What do you think? I have a call with the architect Thursday. Let\'s do a quick go/no-go before then.\n\nI think this is a consulting play \u2014 they\'re not asking for build services. But read the scope carefully, sometimes they bury construction management language in the appendix like it\'s an Easter egg.\n\nAlso, the page limit thing is real. They all do that.\n\n\u2014 Leif',
  },
  {
    id: 9, from: 'Scott Crawford', email: 'scrawford@structurecraft.com',
    subject: 'Templates', time: 'Mon 4:15 PM', unread: true, priority: false,
    body: 'Dan,\n\nBen mentioned you\'re getting set up. The InDesign templates are in the shared drive under SC_Templates > Proposals > 2026.\n\nUse the 2026 versions. Not the 2025. Not the "2026_v2_FINAL." Not the "2026_v2_FINAL_actualFINAL." The one that says "2026_SC2.0" is correct.\n\nI know. I\'m sorry.\n\nIf a layout looks off, show me before it goes to Gerald. I\'d rather catch it early than watch Gerald find it on page 14 at 4:55 PM on submission day.\n\n\u2014 Scott',
  },
  {
    id: 10, from: 'no-reply@asana.com', email: 'no-reply@asana.com',
    subject: 'You\'ve been removed from Workspace: KOVA Marketing', time: 'Mon 5:01 PM', unread: true, priority: false,
    body: 'Hi Deniel,\n\nYou have been removed from the Asana workspace "KOVA Marketing."\n\nWe hope you enjoyed your time managing 47 concurrent workstreams across three companies with overlapping brand guidelines and a single shared Canva account.\n\nYour Smartsheets infrastructure will be maintained by... actually, we\'re not sure. Someone will figure it out. Probably.\n\nBest,\nAsana\n\n(Just kidding. This is a fake email. But the 47 workstreams were real. You\'re free now.)',
  },
];

const SIDEBAR_FOLDERS = [
  { name: 'Inbox', count: EMAILS.filter(e => e.unread).length, active: true },
  { name: 'Sent', count: 0 },
  { name: 'Drafts', count: 1 },
  { name: 'Proposals', count: 0 },
  { name: 'SC Internal', count: 0 },
  { name: 'Spam', count: 847 },
];

function EmailRow({ email, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-slate-800 flex gap-3 items-start transition-colors ${
        selected ? 'bg-slate-800' : 'hover:bg-slate-800/50'
      }`}>
      <div className="flex flex-col items-center gap-1 mt-1 shrink-0 w-3">
        {email.priority && <span className="text-red-400 text-[8px]">!</span>}
        <div className={`w-2 h-2 rounded-full ${email.unread ? 'bg-teal-400' : 'bg-transparent'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className={`text-sm truncate ${email.unread ? 'text-white font-medium' : 'text-slate-400'}`}>
            {email.from}
          </span>
          <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{email.time}</span>
        </div>
        <div className={`text-xs truncate ${email.unread ? 'text-slate-300' : 'text-slate-500'}`}>
          {email.subject}
          {email.attachment && <span className="ml-1 text-slate-600">\uD83D\uDCCE</span>}
        </div>
      </div>
    </button>
  );
}

export default function FakeInbox() {
  const [selected, setSelected] = useState(null);

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
              <div key={f.name} className={`flex justify-between px-2 py-1.5 rounded text-xs ${
                f.active ? 'bg-teal-400/10 text-teal-400' : 'text-slate-500'
              }`}>
                <span>{f.name}</span>
                {f.count > 0 && <span className={`font-mono text-[10px] ${f.name === 'Spam' ? 'text-slate-600' : ''}`}>{f.count}</span>}
              </div>
            ))}
          </div>

          {/* Email list */}
          <div className="md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-slate-700 overflow-y-auto">
            <div className="px-4 py-2 border-b border-slate-800 flex justify-between items-center">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Inbox ({EMAILS.filter(e => e.unread).length} unread)
              </span>
              <span className="text-[9px] text-slate-600 font-mono">dkristiansen@structurecraft.com</span>
            </div>
            {EMAILS.map(email => (
              <EmailRow key={email.id} email={email} selected={selected?.id === email.id}
                onClick={() => setSelected(email)} />
            ))}
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
                      <span className="text-slate-600">&lt;{selected.email}&gt;</span>
                      {selected.priority && <span className="text-red-400 text-[9px] font-mono border border-red-400/30 px-1 rounded">HIGH PRIORITY</span>}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{selected.time}</div>
                  </div>
                  <div className="text-slate-300 text-sm leading-[1.7] whitespace-pre-line">
                    {selected.body}
                  </div>
                  {selected.attachment && (
                    <div className="mt-4 p-3 bg-slate-800 border border-slate-700 rounded text-xs text-slate-500 font-mono">
                      <span className="text-teal-400">\uD83D\uDCCE 1 attachment:</span>{' '}
                      {selected.id === 7 ? 'Cascade_RFP_2026.pdf (2.4 MB)' : 'P_Drive_VPN_Instructions_v3_UPDATED.pdf (14 KB)'}
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 gap-3">
                  <div className="text-4xl opacity-20">\uD83D\uDCE8</div>
                  <p className="text-slate-600 text-sm font-mono">Select an email to read</p>
                  <p className="text-slate-700 text-[10px] font-mono">10 messages. 1 from a printer. This is your life now.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
