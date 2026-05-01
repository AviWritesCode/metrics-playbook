import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Settings, 
  LifeBuoy, 
  MessageSquare, 
  Smile, 
  Coffee, 
  UserMinus, 
  Briefcase, 
  PhoneCall, 
  Clock, 
  PauseCircle, 
  ClipboardCheck,
  X,
  Target,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const metricsData = [
  {
    id: 'compliance',
    title: 'Compliance %',
    goal: '> 98%',
    category: 'Quality & Risk',
    icon: ShieldCheck,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    definition: 'Measures your adherence to regulatory guidelines, legal disclosures, and strict internal authentication policies (like KYC, Reg E, and CDD).',
    whyItMatters: 'It protects our members from fraud and financial harm, while protecting the organization from legal and reputational damage. Compliance is non-negotiable.',
    tips: [
      'Always read required disclosures verbatim—do not paraphrase.',
      'Never skip steps in the authentication process, even if you feel rushed.',
      'Regularly review Knowledge Center (KC) articles for updates on procedures.'
    ]
  },
  {
    id: 'operational',
    title: 'Operational %',
    goal: '> 92%',
    category: 'Quality & Risk',
    icon: Settings,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    definition: 'Evaluates your adherence to standard operating procedures, correct tool usage, and overall transaction accuracy.',
    whyItMatters: 'Ensures members receive consistent, accurate service and prevents downstream errors that require members to call back.',
    tips: [
      'Take the time to thoroughly examine your resources rather than relying on memory.',
      'Document interactions clearly and accurately.',
      'Double-check your inputs before finalizing any transaction.'
    ]
  },
  {
    id: 'resq',
    title: 'RES-Q %',
    goal: '< 90%',
    category: 'Quality & Risk',
    icon: LifeBuoy,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    definition: "Measures the percentage of calls where we mark 'No' in the resolution questionnaire. Submitting 'No' more than 90% of the time indicates we are likely failing to properly track and escalate member complaints.",
    whyItMatters: "Missing complaints has massive downstream effects: USAA pays regulatory fines to the CFPB, our members go without a proper resolution, and our site pays financial penalties on our contract with USAA—which directly drains the budget we use to do fun events like cookouts and catering for our agents.",
    tips: [
      'Take your time on the resolution questionnaire to ensure every "No" is accurately justified.',
      'Understand the specific criteria that define a CFPB complaint to identify them instantly.',
      'Prioritize member protection by logging all concerns, ensuring they reach the proper escalation path.'
    ]
  },
  {
    id: 'surveys',
    title: 'Surveys Collected',
    goal: '> 1 Per Day',
    category: 'Member Experience',
    icon: ClipboardCheck,
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    definition: 'The volume of post-call surveys successfully collected from members you interact with.',
    whyItMatters: 'We need adequate data to accurately measure Member Satisfaction (MSAT). More surveys mean a fairer representation of your actual performance.',
    tips: [
      'Educate the member about the post-call survey at the end of the interaction.',
      'Provide exceptional service so members feel compelled to leave feedback.',
      'Use a confident, polite call-closing statement.'
    ]
  },
  {
    id: 'msat',
    title: 'MSAT %',
    goal: '> 92%',
    category: 'Member Experience',
    icon: Smile,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    definition: 'Member Satisfaction score. The percentage of members who rated your interaction positively.',
    whyItMatters: 'It is the ultimate indicator of how well we are living up to our mission to serve. High MSAT means happy, loyal members.',
    tips: [
      'Build rapport early in the call.',
      'Always respond with value and clear explanations.',
      'Acknowledge delays and thank the member for their patience.'
    ]
  },
  {
    id: 'aht',
    title: 'AHT (Average Handle Time)',
    goal: '< 391s',
    category: 'Efficiency',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    definition: 'The average total duration of a single interaction, including talk time, hold time, and after-call work (ACW).',
    whyItMatters: 'It helps us manage queue volumes and ensures members aren\'t waiting a long time to reach an agent. Efficiency is key to staffing appropriately.',
    tips: [
      'Guide the conversation actively to keep it on track.',
      'Use system shortcuts and have KC articles ready to go.',
      'Multitask by typing your notes while the member is speaking.'
    ]
  },
  {
    id: 'hold',
    title: 'Hold Time',
    goal: '< 30s',
    category: 'Efficiency',
    icon: PauseCircle,
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
    definition: 'The average amount of time a member spends placed on hold during your interactions.',
    whyItMatters: 'Long hold times drive dissatisfaction (DSATs) and increase the overall AHT.',
    tips: [
      'Ask for permission before placing a member on hold and explain why.',
      'Check back in every 2 minutes if the hold needs to be extended.',
      'Use "dead air" effectively instead of hold if you are just reading a quick article.'
    ]
  },
  {
    id: 'acw',
    title: 'ACW (After Call Work)',
    goal: '< 30s',
    category: 'Efficiency',
    icon: PhoneCall,
    color: 'text-pink-600',
    bgColor: 'bg-pink-100',
    definition: 'The time spent completing notes, documentation, and system updates immediately after the member disconnects.',
    whyItMatters: 'Keeping ACW low ensures you are back in the queue quickly to help the next member.',
    tips: [
      'Notate directly during the call—don\'t wait until the end.',
      'Use pre-approved templates or shorthand for common interaction types.',
      'Finalize your wrap-up codes as you deliver your closing statement.'
    ]
  },
  {
    id: 'break',
    title: 'Break %',
    goal: '< 6.25%',
    category: 'Adherence',
    icon: Coffee,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    definition: 'The percentage of your scheduled time that is spent in a "Break" status.',
    whyItMatters: 'We schedule breaks carefully to ensure there are always enough agents to handle call volume. Going over break limits causes stress on your teammates.',
    tips: [
      'Keep an eye on the clock during your 15-minute breaks.',
      'Return to your desk 1-2 minutes early to log back in.',
      'Communicate with leadership if you experience system issues returning from break.'
    ]
  },
  {
    id: 'unplannedabs',
    title: 'Unplanned Abs %',
    goal: '< 10%',
    category: 'Adherence',
    icon: UserMinus,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    definition: 'Your rate of unplanned absences (e.g., calling out sick, emergencies, arriving late).',
    whyItMatters: 'Unplanned absences directly impact service levels. When you aren\'t here, wait times go up for members and workload goes up for the team.',
    tips: [
      'Communicate any scheduling needs with your manager as early as possible.',
      'Keep a healthy work-life balance to avoid burnout.',
      'Log into the systems 5 minutes before your shift starts.'
    ]
  },
  {
    id: 'btp',
    title: 'BTP %',
    goal: '> 89%',
    category: 'Adherence',
    icon: Briefcase,
    color: 'text-violet-600',
    bgColor: 'bg-violet-100',
    definition: 'Behavioral Time Performance / Billed To Pay. Measures how much of your paid time is spent in productive, scheduled states (like being on phones or in scheduled coaching).',
    whyItMatters: 'It is the primary measure of schedule adherence. High BTP means you are doing what you are scheduled to do, when you are scheduled to do it.',
    tips: [
      'Follow your schedule strictly in the workforce management tool.',
      'Avoid unauthorized auxiliary (AUX) states.',
      'Transition smoothly between calls, training, and meetings.'
    ]
  }
];

export default function App() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Quality & Risk', 'Member Experience', 'Efficiency', 'Adherence'];

  const filteredMetrics = activeCategory === 'All' 
    ? metricsData 
    : metricsData.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-4 sm:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Team Metrics Playbook
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Welcome to the team! Understanding how your performance is measured is the first step to success. 
            This playbook outlines your core metrics, the goals we strive for, and pro-tips to help you hit the ground running.
          </p>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div 
              key={metric.id}
              onClick={() => setSelectedMetric(metric)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${metric.bgColor} ${metric.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-semibold">
                  <Target size={12} />
                  {metric.goal}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1">{metric.title}</h3>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                {metric.category}
              </p>
              
              <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
                {metric.definition}
              </p>

              <div className="text-blue-600 text-sm font-medium flex items-center mt-auto group-hover:translate-x-1 transition-transform">
                Read More &rarr;
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Details View */}
      {selectedMetric && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedMetric(null)}
        >
          <div 
            className="bg-white rounded-3xl w-full max-w-2xl overflow-y-auto max-h-[90vh] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`p-6 sm:p-8 flex items-start justify-between ${selectedMetric.bgColor}`}>
              <div className="flex items-center gap-4">
                <div className={`p-4 bg-white rounded-2xl shadow-sm ${selectedMetric.color}`}>
                  <selectedMetric.icon size={32} strokeWidth={2} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{selectedMetric.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-white/60 text-slate-800 px-2.5 py-0.5 rounded text-sm font-semibold border border-white/40 shadow-sm">
                      Target: {selectedMetric.goal}
                    </span>
                    <span className="text-slate-600 text-sm font-medium">{selectedMetric.category}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMetric(null)}
                className="p-2 bg-white/50 hover:bg-white text-slate-600 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-2">
                    <AlertCircle size={20} className="text-blue-600" />
                    What is it?
                  </h4>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedMetric.definition}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-2">
                    <Target size={20} className="text-blue-600" />
                    Why it matters
                  </h4>
                  <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedMetric.whyItMatters}
                  </p>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-3">
                    <TrendingUp size={20} className="text-blue-600" />
                    Pro-Tips for Success
                  </h4>
                  <ul className="space-y-3">
                    {selectedMetric.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-slate-700">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
              <button 
                onClick={() => setSelectedMetric(null)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
