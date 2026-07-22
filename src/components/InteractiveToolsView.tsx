import { Calculator, ShieldCheck, Zap, HelpCircle, RefreshCw, BarChart2, Star, Download, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState, useMemo } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../data';

interface InteractiveToolsProps {
  onLinkToContact: (data: { score: number; level: string; details: string }) => void;
}

export default function InteractiveToolsView({ onLinkToContact }: InteractiveToolsProps) {
  const [activeTool, setActiveTool] = useState<'roi' | 'readiness'>('roi');

  // ROI Calculator States
  const [teamSize, setTeamSize] = useState<number>(5);
  const [hoursPerMonth, setHoursPerMonth] = useState<number>(40);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [automationPercent, setAutomationPercent] = useState<number>(70);
  const [devBudget, setDevBudget] = useState<number>(25000);

  // Diagnostic states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [auditSubmitted, setAuditSubmitted] = useState<boolean>(false);

  // ROI Computations
  const roiCalculations = useMemo(() => {
    const currentMonthlyCost = teamSize * hoursPerMonth * hourlyRate;
    const monthlySavings = currentMonthlyCost * (automationPercent / 100);
    const annualSavings = monthlySavings * 12;
    const netYear1Savings = annualSavings - devBudget;
    const netROI = devBudget > 0 ? (netYear1Savings / devBudget) * 100 : 0;
    const paybackPeriodMonths = monthlySavings > 0 ? devBudget / monthlySavings : 0;

    // Projected Cash Flow over 3 Years (Cumulative Net)
    const cumulativeYear1 = netYear1Savings;
    const cumulativeYear2 = netYear1Savings + annualSavings;
    const cumulativeYear3 = netYear1Savings + (annualSavings * 2);

    return {
      currentMonthlyCost,
      monthlySavings,
      annualSavings,
      netYear1Savings,
      netROI,
      paybackPeriodMonths,
      cashFlows: [
        { label: 'Initial (Budget)', value: -devBudget },
        { label: 'Year 1 Net', value: cumulativeYear1 },
        { label: 'Year 2 Net', value: cumulativeYear2 },
        { label: 'Year 3 Net', value: cumulativeYear3 }
      ]
    };
  }, [teamSize, hoursPerMonth, hourlyRate, automationPercent, devBudget]);

  // Diagnostic Computations
  const activeQuestion = DIAGNOSTIC_QUESTIONS[currentQuestionIndex];

  const handleSelectAnswer = (optionIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: optionIdx
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setAuditSubmitted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const resetDiagnostic = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setAuditSubmitted(false);
  };

  const auditResults = useMemo(() => {
    if (!auditSubmitted) return null;

    let totalScore = 0;
    const categoryScores: Record<string, number> = {};
    const detailsList: string[] = [];

    DIAGNOSTIC_QUESTIONS.forEach((q) => {
      const selectedOptIdx = answers[q.id];
      const selectedOption = selectedOptIdx !== undefined ? q.options[selectedOptIdx] : q.options[0];
      const score = selectedOption ? selectedOption.score : 3;
      totalScore += score;
      categoryScores[q.category] = score;
      detailsList.push(`${q.category}: ${selectedOption ? selectedOption.text : ''}`);
    });

    // Score out of 25 max
    const maxScore = 25;
    const pct = (totalScore / maxScore) * 100;

    let level = 'Explore';
    let summaryText = '';
    let recommendation = '';

    if (totalScore <= 10) {
      level = 'Explore (AI Novice)';
      summaryText = 'Your systems and processes are heavily manual and decentralized. Integrating AI at this stage requires basic data organization first.';
      recommendation = 'Initiate a Discovery Workshop to map files, draft centralized schemas, and introduce lightweight SaaS assistants to prove immediate value.';
    } else if (totalScore <= 17) {
      level = 'Pilot (AI Competent)';
      summaryText = 'You have unified data databases and competent developers, but lack specialized model pipelines or clear AI strategies.';
      recommendation = 'Recommend an AI Feasibility & Technical Prototype phase. We can quickly build a secure working mockup with your mock data to prove viability.';
    } else if (totalScore <= 22) {
      level = 'Scale (AI Champion)';
      summaryText = 'High maturity. Your data resides in cloud warehouses and your engineers understand APIs, but you need scalable MLOps and advanced safety guardrails.';
      recommendation = 'Excellent fit for direct Production Build. We can deploy secure vector indexes, construct custom fine-tuned model orchestrations, and launch pilots.';
    } else {
      level = 'Lead (Elite AI Pioneer)';
      summaryText = 'Superb. Real-time data lakes, advanced internal ML models, and high leadership alignment. You are leading the market.';
      recommendation = 'Ideal candidate for Fractional CAIO advisory. I will audit your model prompt parameters, minimize monthly API overhead, and advise your board on AI Moats.';
    }

    return {
      totalScore,
      pct,
      level,
      summaryText,
      recommendation,
      categoryScores,
      details: detailsList.join(' | ')
    };
  }, [answers, auditSubmitted]);

  return (
    <div className="space-y-12 animate-in fade-in duration-300" id="interactive-tools-view-root">
      
      {/* Tool Navigation Tabs */}
      <section className="flex flex-col items-center space-y-4 max-w-2xl mx-auto text-center">
        <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold bg-indigo-50 px-2.5 py-0.5 rounded">
          Interactive ROI & Strategy Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-slate-900 leading-tight">
          Quantify Your <span className="text-indigo-600">AI Advantage</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-sans leading-relaxed">
          Before writing a single line of code, estimate your projected operational savings with my ROI calculator, or self-audit your organization’s technical AI readiness.
        </p>

        <div className="flex border border-slate-200 p-1 bg-white rounded-lg shadow-sm" id="tool-switcher">
          <button
            onClick={() => setActiveTool('roi')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center space-x-2 ${
              activeTool === 'roi'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>AI Project ROI Calculator</span>
          </button>
          <button
            onClick={() => setActiveTool('readiness')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all flex items-center space-x-2 ${
              activeTool === 'readiness'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>5-Min AI Readiness Diagnostic</span>
          </button>
        </div>
      </section>

      {/* TOOL 1: ROI CALCULATOR */}
      {activeTool === 'roi' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="roi-calculator-container">
          
          {/* Sliders Input Panel */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-display font-extrabold text-slate-900 text-lg sm:text-xl flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-indigo-600" />
                <span>Workflow Baseline Inputs</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calibrate the parameters below based on your current manual business process workflows.
              </p>
            </div>

            <div className="space-y-5 py-4">
              {/* Slider 1: Team Size */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">Team Size (Executing Manual Task)</span>
                  <span className="font-mono text-indigo-600 font-bold">{teamSize} employees</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  id="slider-team-size"
                />
                <span className="text-[10px] text-slate-400 block font-light">Number of operators actively burdened by this specific process.</span>
              </div>

              {/* Slider 2: Hours Per Month */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">Manual Hours / Employee / Month</span>
                  <span className="font-mono text-indigo-600 font-bold">{hoursPerMonth} hours</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="160"
                  step="5"
                  value={hoursPerMonth}
                  onChange={(e) => setHoursPerMonth(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  id="slider-hours-per-month"
                />
                <span className="text-[10px] text-slate-400 block font-light">Time spent by each operator per month on manual verification/entry.</span>
              </div>

              {/* Slider 3: Hourly Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">Burdened Hourly Labor Rate</span>
                  <span className="font-mono text-indigo-600 font-bold">${hourlyRate} / hr</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="150"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  id="slider-hourly-rate"
                />
                <span className="text-[10px] text-slate-400 block font-light">Includes base salary, benefits, cloud tools, and overhead.</span>
              </div>

              {/* Slider 4: Automation Percent */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">Target AI Automation Success Rate</span>
                  <span className="font-mono text-indigo-600 font-bold">{automationPercent}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  step="5"
                  value={automationPercent}
                  onChange={(e) => setAutomationPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  id="slider-automation-pct"
                />
                <span className="text-[10px] text-slate-400 block font-light">The target portion of manual hours successfully automated by AI.</span>
              </div>

              {/* Slider 5: Deployment Budget */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">Projected System Development Budget</span>
                  <span className="font-mono text-indigo-600 font-bold">${devBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={devBudget}
                  onChange={(e) => setDevBudget(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  id="slider-dev-budget"
                />
                <span className="text-[10px] text-slate-400 block font-light">One-time fixed allocation for architecture design, prototype, and deployment.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SLA models include a 30-day warranty against software bugs.</span>
            </div>
          </div>

          {/* Outputs & ROI Projections Panel */}
          <div className="lg:col-span-7 bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                Projected Return Metrics
              </span>

              {/* Core numbers Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Annual Gross Savings</span>
                  <div className="text-2xl sm:text-3xl font-display font-black text-emerald-400 leading-none">
                    ${Math.round(roiCalculations.annualSavings).toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500 block">At {automationPercent}% automation rate.</span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Payback Period</span>
                  <div className="text-2xl sm:text-3xl font-display font-black text-indigo-400 leading-none">
                    {roiCalculations.paybackPeriodMonths > 0 
                      ? roiCalculations.paybackPeriodMonths.toFixed(1) 
                      : '0'} 
                    <span className="text-xs font-sans font-normal text-slate-300"> mo.</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Months until development cost is fully recovered.</span>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-xl p-4 col-span-2 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider block">Net Year-1 ROI %</span>
                    <span className="text-xs text-slate-500 font-sans">Profitability ratio of investment.</span>
                  </div>
                  <div className="text-3xl font-display font-black text-emerald-400 text-right leading-none">
                    {roiCalculations.netROI > 0 ? `+${Math.round(roiCalculations.netROI)}%` : '0%'}
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Cumulative Net Return Bar-chart */}
            <div className="space-y-3 relative z-10 py-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono font-bold text-slate-300">Cumulative Net Return over 3 Years</span>
                <span className="text-[10px] text-slate-400">(Savings minus Development Cost)</span>
              </div>

              {/* Chart grid */}
              <div className="bg-white/5 border border-white/5 rounded-lg p-4 space-y-4" id="roi-chart-widget">
                <div className="grid grid-cols-4 gap-4 items-end h-28 pt-2">
                  {roiCalculations.cashFlows.map((flow, idx) => {
                    const isPositive = flow.value >= 0;
                    // Max height mapping
                    const maxVal = Math.max(...roiCalculations.cashFlows.map(f => Math.abs(f.value)));
                    const heightPercent = maxVal > 0 ? (Math.abs(flow.value) / maxVal) * 80 : 0;

                    return (
                      <div key={idx} className="flex flex-col items-center space-y-1 h-full justify-end">
                        <div 
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-sm transition-all duration-300 ${
                            idx === 0 
                              ? 'bg-red-500/80 hover:bg-red-500' 
                              : isPositive 
                                ? 'bg-emerald-500/80 hover:bg-emerald-500' 
                                : 'bg-slate-500'
                          }`}
                        />
                        <span className="text-[9px] font-mono text-slate-400">{flow.label}</span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Chart labels */}
                <div className="flex justify-between text-[10px] border-t border-white/5 pt-2 text-slate-400 font-mono">
                  <span>Start: -${devBudget.toLocaleString()}</span>
                  <span className="text-emerald-400">Y3 Cumulative: +${Math.round(roiCalculations.cashFlows[3].value).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10 text-xs">
              <span className="text-slate-400 font-light max-w-sm text-center sm:text-left">
                This projection is based on standard operational parameters. Real values will vary based on exact model architecture.
              </span>
              <button
                onClick={() => onLinkToContact({ 
                  score: 0, 
                  level: 'ROI Evaluated', 
                  details: `Team Size: ${teamSize} | Annual Savings Est: $${Math.round(roiCalculations.annualSavings).toLocaleString()}` 
                })}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-lg transition-colors w-full sm:w-auto"
                id="roi-link-contact-btn"
              >
                Book Blueprint Scoping
              </button>
            </div>

          </div>
        </div>
      )}

      {/* TOOL 2: 5-MIN AI READINESS DIAGNOSTIC */}
      {activeTool === 'readiness' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-sm" id="readiness-diagnostic-container">
          
          {!auditSubmitted ? (
            <div className="space-y-6">
              {/* Question Wizard Progress Header */}
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-600 font-bold">
                    Question {currentQuestionIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
                  </span>
                  <h4 className="font-display font-bold text-slate-900 text-sm sm:text-base leading-none">
                    Category: <span className="text-slate-700 font-normal">{activeQuestion.category}</span>
                  </h4>
                </div>

                <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${((currentQuestionIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
                    className="bg-indigo-600 h-full rounded-full transition-all duration-300" 
                  />
                </div>
              </div>

              {/* Active Question Title */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                  {activeQuestion.question}
                </h3>
              </div>

              {/* Multi-Choice Option Cards */}
              <div className="grid grid-cols-1 gap-3 py-2">
                {activeQuestion.options.map((opt, oIdx) => {
                  const isSelected = answers[activeQuestion.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      id={`diagnostic-q-${activeQuestion.id}-opt-${oIdx}`}
                      onClick={() => handleSelectAnswer(oIdx)}
                      className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start space-x-3 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/20 shadow-xs text-indigo-900 font-semibold ring-1 ring-indigo-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50/50'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center font-mono font-bold text-xs border ${
                        isSelected 
                          ? 'bg-indigo-600 text-white border-indigo-600' 
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Wizard Nav Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 text-xs font-semibold rounded ${
                    currentQuestionIndex === 0 
                      ? 'text-slate-300 bg-slate-50 cursor-not-allowed' 
                      : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  Back
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={answers[activeQuestion.id] === undefined}
                  className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg text-white transition-colors ${
                    answers[activeQuestion.id] === undefined 
                      ? 'bg-slate-200 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                  id="diagnostic-next-btn"
                >
                  {currentQuestionIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? 'Analyze & Score' : 'Next Question'}
                </button>
              </div>

            </div>
          ) : (
            /* DIAGNOSTIC RESULTS DISPLAY */
            <div className="space-y-8 animate-in fade-in duration-500" id="diagnostic-results-view">
              
              <div className="text-center space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-full text-xs font-mono font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Audit Diagnostics Complete</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  Your AI Maturity Classification:
                </h3>
                <p className="text-3xl sm:text-4xl font-display font-black text-indigo-600 mt-1 leading-none">
                  {auditResults?.level}
                </p>
                <p className="text-sm text-slate-500 max-w-xl mx-auto">
                  {auditResults?.summaryText}
                </p>
              </div>

              {/* Progress Radar/Bars Mapping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-t border-b border-slate-100">
                
                {/* Left Side: Score metrics */}
                <div className="space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Category Breakdown
                  </h4>

                  <div className="space-y-3.5" id="diagnostic-bars-list">
                    {DIAGNOSTIC_QUESTIONS.map((q) => {
                      const ansIdx = answers[q.id];
                      const opt = q.options[ansIdx !== undefined ? ansIdx : 0];
                      const scoreVal = opt ? opt.score : 3;
                      const scorePercent = (scoreVal / 5) * 100;

                      return (
                        <div key={q.id} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-slate-700">{q.category}</span>
                            <span className="font-mono text-slate-500">Score: {scoreVal} / 5</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                              style={{ width: `${scorePercent}%` }}
                              className="bg-indigo-600 h-full rounded-full transition-all" 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Detailed analysis description */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 space-y-4">
                  <h4 className="font-display font-bold text-slate-900 text-sm uppercase tracking-wide">
                    Tailored Strategic Directive
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light">
                    {auditResults?.recommendation}
                  </p>

                  <div className="bg-white border border-slate-150 rounded p-4 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                      Identified Risk Mitigation checklist:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {DIAGNOSTIC_QUESTIONS.map((q) => {
                        const ansIdx = answers[q.id];
                        const opt = q.options[ansIdx !== undefined ? ansIdx : 0];
                        return (
                          <li key={q.id} className="flex items-start space-x-1.5 leading-tight">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{opt ? opt.explanation : ''}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Actions & Report Setup */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="font-display font-bold text-slate-900 text-sm">
                    Link diagnostic findings to Consultation Request
                  </h4>
                  <p className="text-xs text-slate-500 font-sans">
                    I will pre-populate this diagnostic breakdown inside your Consultation contact form so we can immediately dive into engineering parameters.
                  </p>
                </div>

                <div className="flex space-x-3 w-full sm:w-auto">
                  <button
                    onClick={resetDiagnostic}
                    className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    Reset Audit
                  </button>
                  <button
                    onClick={() => {
                      if (auditResults) {
                        onLinkToContact({
                          score: auditResults.totalScore,
                          level: auditResults.level,
                          details: auditResults.details
                        });
                      }
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest py-3 px-5 rounded-lg transition-colors inline-flex items-center space-x-1.5 flex-1 sm:flex-none"
                    id="link-audit-contact-btn"
                  >
                    <span>Request NDA & Book Call</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
