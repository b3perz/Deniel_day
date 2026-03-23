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
    body: 'Hey Dan \u2014 welcome to SC. I\'m Ben, BD Coordinator out of Abbotsford. We\'ll be working together a lot. I\'ve saved a few completed proposals in Notion for you to look at when you get a chance \u2014 one consulting, one engineer-build, one SOQ. Don\'t worry about understanding everything yet, just get a feel for how we present ourselves. Hit me up on Teams if you need anything. \u2014 Ben',
  },
  {
    id: 3, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'Quick one', time: 'Mon 9:47 AM', unread: true, priority: false,
    body: 'Hey Dan, good to have you in Seattle. I\'ve got a consulting proposal that just came in \u2014 nothing urgent yet but I\'ll loop you in tomorrow so you can see how we handle these. Welcome to the team.',
  },
  {
    id: 4, from: 'SC IT', email: 'it@structurecraft.com',
    subject: 'Account Setup Complete', time: 'Mon 10:00 AM', unread: true, priority: false, attachment: true,
    body: 'Welcome to StructureCraft! Your accounts have been created:\n\n\u2022 Email: dkristiansen@structurecraft.com\n\u2022 Teams: Active\n\u2022 Notion: Invite sent\n\u2022 HubSpot: Access granted\n\u2022 P: Drive VPN: Instructions attached (may require 2-3 attempts)\n\nPlease note your name may appear as \'Daniel\' in some systems. We are aware of the issue. A fix is scheduled for Q4 2027.',
  },
  {
    id: 5, from: 'Harrison & Associates Architects', email: 'proposals@harrisonarch.com',
    subject: 'RFP \u2014 Cascade Mixed-Use Development', time: 'Mon 2:30 PM', unread: true, priority: true, attachment: true,
    body: 'Please find attached the Request for Proposals for structural engineering services for the Cascade project in Portland, OR. Proposals are due April 4, 2026.\n\nEvaluation criteria:\n\u2022 Firm qualifications and relevant experience (30%)\n\u2022 Key personnel and team structure (25%)\n\u2022 Project approach and methodology (25%)\n\u2022 Fee proposal (20%)\n\nPlease confirm your intent to respond by Wednesday.',
  },
  {
    id: 6, from: 'Leif Johnson', email: 'ljohnson@structurecraft.com',
    subject: 'RE: RFP \u2014 Cascade Mixed-Use Development', time: 'Mon 3:12 PM', unread: true, priority: false,
    body: 'Dan \u2014 see the attached. What do you think? I have a call with the architect Thursday. Let\'s do a quick go/no-go before then. Can you do an initial read-through and flag the key requirements?\n\nI think this is a consulting play \u2014 they\'re not asking for build services. But read the scope carefully, sometimes they bury construction management language in the appendix.\n\n\u2014 Leif',
  },
  {
    id: 7, from: 'Ben Epp', email: 'bepp@structurecraft.com',
    subject: 'RE: RFP \u2014 Cascade Mixed-Use Development', time: 'Mon 3:25 PM', unread: true, priority: false,
    body: 'Saw Leif forwarded the Cascade RFP. Happy to walk through the compliance matrix with you if you want a second set of eyes. Good first one to learn on.',
  },
];

function EmailRow({ email, selected, onClick }) {
  return (
    <button onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-slate-800 flex gap-3 items-start transition-colors ${
        selected ? 'bg-slate-800' : 'hover:bg-slate-800/50'
      }`}>
      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${email.unread ? 'bg-teal-400' : 'bg-transparent'}`} />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <span className={`text-sm truncate ${email.unread ? 'text-white font-medium' : 'text-slate-400'}`}>
            {email.from}
          </span>
          <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">{email.time}</span>
        </div>
        <div className={`text-xs truncate ${email.unread ? 'text-slate-300' : 'text-slate-500'}`}>
          {email.subject}
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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2 text-center">INTERCEPTED TRANSMISSIONS</h2>
        <p className="text-center font-mono text-sm text-teal-400 mb-8">Preview of your inbox &mdash; Week 1</p>

        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden flex flex-col md:flex-row" style={{ minHeight: '500px' }}>
          {/* Email list */}
          <div className="md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-slate-700 overflow-y-auto">
            <div className="px-4 py-2 border-b border-slate-800 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Inbox ({EMAILS.filter(e => e.unread).length} unread)
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
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-teal-400 font-medium">{selected.from}</span>
                      <span className="text-slate-600">&lt;{selected.email}&gt;</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">{selected.time}</div>
                  </div>
                  <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                    {selected.body}
                  </div>
                  {selected.id === 5 && (
                    <div className="mt-4 p-3 bg-slate-800 border border-slate-700 rounded text-xs text-slate-500 font-mono">
                      <span className="text-teal-400">1 attachment:</span> Cascade_RFP_2026.pdf (2.4 MB)
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <p className="text-slate-600 text-sm font-mono">Select an email to read</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
