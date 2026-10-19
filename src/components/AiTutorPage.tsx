import React, { useState, useRef, useEffect } from 'react';
import { Problem, ChatMessage } from '../types';
import { TwinPracticeModal } from './TwinPracticeModal';
import { ScanModal } from './ScanModal';

interface AiTutorPageProps {
  problem: Problem;
  onNavigateToReview: () => void;
}

export const AiTutorPage: React.FC<AiTutorPageProps> = ({
  problem,
}) => {
  const socratic = problem.socraticData;

  // Diagnostic mode ('step-by-step' vs 'concept-buildup')
  const [diagnosticMode, setDiagnosticMode] = useState<'step-by-step' | 'concept-buildup'>('step-by-step');
  
  // Hint unlock state
  const [hints, setHints] = useState(
    socratic?.hints || [
      { id: 1, title: 'Hint 1: 합과 일반항의 관계식', subtitle: '언락됨', math: 'S_n = ∑ a_k 이므로 a_n = S_n - S_{n-1} (n ≥ 2)', isUnlocked: true },
      { id: 2, title: 'Hint 2: a₁₀ 대입 직접 계산 힌트', subtitle: 'S₁₀ - S₉ 전개 팁', math: 'S₁₀ = 10² + 2(10) = 120, S₉ = 9² + 2(9) = 99', isUnlocked: false },
      { id: 3, title: 'Hint 3: 첫째항 a₁ 검증 조건', subtitle: '상수항이 0인 경우의 성질', math: 'S₀ = 0 이므로 첫째항부터 완전한 등차수열!', isUnlocked: false },
      { id: 4, title: 'Hint 4: 최종 정답 및 전체 해설지', subtitle: '암산 전개 완료', math: 'a₁₀ = 120 - 99 = 21', isUnlocked: false },
    ]
  );

  // Chat messages state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(socratic?.initialChat || []);
  const [chatInput, setChatInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Modals
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isTwinOpen, setIsTwinOpen] = useState(false);
  const [twinActiveIndex, setTwinActiveIndex] = useState(0);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const unlockedCount = hints.filter((h) => h.isUnlocked).length;
  const progressPct = Math.round((unlockedCount / hints.length) * 100);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiTyping]);

  const unlockHint = (hintId: number) => {
    setHints((prev) =>
      prev.map((h) => (h.id === hintId ? { ...h, isUnlocked: true } : h))
    );
  };

  const insertSymbol = (symbol: string) => {
    if (!inputRef.current) return;
    const input = inputRef.current;
    const start = input.selectionStart || input.value.length;
    const end = input.selectionEnd || input.value.length;
    const nextVal = chatInput.substring(0, start) + symbol + chatInput.substring(end);
    setChatInput(nextVal);
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + symbol.length, start + symbol.length);
    }, 10);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || chatInput).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'student',
      senderName: '김수학 학생 (나)',
      time: '방금',
      content: text,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setIsAiTyping(true);

    // AI responsive answer simulation
    setTimeout(() => {
      setIsAiTyping(false);
      let replyContent = '';
      let badge = '소크라테스 코칭';

      const clean = text.replace(/\s+/g, '');

      if (clean.includes('21') || clean.includes('21입니다')) {
        badge = '정답 도출 성공';
        replyContent = `정답입니다! 🎉\na₁₀ = S₁₀ - S₉ = 120 - 99 = 21 입니다.\n\n이렇게 Sₙ - S_{n-1} 관계식을 정확히 인지하고 나니 복잡해 보였던 수열 문제도 10초 만에 스스로 해결해낼 수 있었어요! 이 기세를 몰아 아래 3단계 쌍둥이 문제도 연속으로 정복해볼까요?`;
        // Also unlock all hints
        setHints((prev) => prev.map((h) => ({ ...h, isUnlocked: true })));
      } else if (clean.includes('n=1') || clean.includes('상수항')) {
        badge = '개념 심화';
        replyContent = `핵심을 정확히 짚었습니다! Sₙ = An² + Bn + C 에서:\n1) C = 0 일 때: 첫째항 a₁부터 바로 등차수열을 이룹니다.\n2) C ≠ 0 일 때: 둘째항 a₂부터 등차수열을 이루고, a₁은 반드시 S₁으로 따로 적어야 합니다.\n이 문제에서는 C = 0 (상수항 없음)이므로 첫째항부터 완벽한 등차수열이었던 것이죠!`;
      } else if (clean.includes('등차수열') || clean.includes('공차')) {
        badge = '암산 꿀팁';
        replyContent = `맞습니다! 2차항 계수가 1이므로 공차 d = 2 × 1 = 2 입니다. 첫째항 a₁ = S₁ = 3 이므로 일반항은 aₙ = 2n + 1 이 됩니다. 따라서 a₁₀ = 2(10) + 1 = 21 이 바로 계산됩니다!`;
      } else {
        replyContent = `좋은 생각이에요! "${text}"에 대해 함께 단계별로 접근해볼게요.\n\n현재 식에서 가장 중요한 포인트는 S₁₀ = 10² + 2(10) = 120 과 S₉ = 9² + 2(9) = 99의 차이를 구하는 것입니다. 혹시 계산 도중 헷갈리는 특정 항이 있나요?`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          senderName: 'Math Mate AI',
          time: '방금',
          badge,
          content: replyContent,
        },
      ]);
    }, 450);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setChatInput('S10에서 S9를 빼면 왜 21이 나오나요?');
      setIsListening(false);
    }, 1200);
  };

  const handleOpenTwinAtIndex = (index: number) => {
    setTwinActiveIndex(index);
    setIsTwinOpen(true);
  };

  return (
    <div className="flex flex-col w-full select-none">
      <div className="px-margin-desktop py-space-lg flex flex-col gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header Context Tracker & Diagnostic Intent Bar */}
        <div className="flex flex-wrap items-center justify-between gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/60">
          <div className="flex items-center gap-space-md">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-label-bold text-[18px]">
              <span className="material-symbols-outlined text-[24px]">psychology</span>
            </div>
            <div>
              <div className="flex items-center gap-space-xs font-label-bold text-label-bold text-primary tracking-wider uppercase">
                <span>AI Interactive Socratic Tutor</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                <span>{socratic?.unitTag || '수학 I · 수열의 합과 일반항'}</span>
              </div>
              <h1 className="font-headline-md text-headline-md text-on-surface">
                맞춤형 실시간 단계별 질문 & 피드백
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-1.5 rounded-lg border border-surface-container-high/60">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
              </span>
              <span className="font-body-sm text-body-sm text-on-surface font-medium">
                소크라테스 코칭 모드 활성
              </span>
            </div>
            <span className="text-outline-variant">|</span>
            <span className="font-label-code text-label-code text-on-surface-variant">
              답변 지연: {socratic?.delay || '~0.4s'}
            </span>
          </div>
        </div>

        {/* Main Dual Panel Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
          {/* LEFT COLUMN: Problem Card, Diagnostic Mode Switcher & Hint Stepper (5 Cols) */}
          <section className="lg:col-span-5 flex flex-col gap-space-md">
            {/* Problem Card */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col gap-space-md relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-code text-label-code font-bold">
                    {problem.typeTag}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-bold text-label-bold">
                    {problem.difficulty}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsScanOpen(true)}
                  className="text-outline hover:text-on-surface transition-colors"
                  title="문제 확대"
                >
                  <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                </button>
              </div>

              {/* Problem Expression */}
              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm border border-surface-container-high/50">
                <div className="flex items-center justify-between text-on-surface-variant font-label-bold text-label-bold">
                  <span>QUESTION #M-2024-0418</span>
                  <span className="font-label-code text-label-code text-primary font-bold">
                    단원 코드: {socratic?.questionCode || '22-SEQ-04'}
                  </span>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                  수열 <span className="font-math-step text-math-step bg-surface-container-high px-1.5 py-0.5 rounded">{'aₙ'}</span>에 대하여{' '}
                  <span className="font-math-step text-math-step font-semibold text-primary">
                    ∑<sub>k=1</sub><sup>n</sup> a<sub>k</sub> = n<sup>2</sup> + 2n
                  </span> 일 때,{' '}
                  <span className="font-math-step text-math-step font-semibold text-on-surface">
                    a<sub>10</sub>
                  </span>의 값을 구하시오.
                </p>
              </div>

              {/* Student Solution Snippet (Visual OCR Thumbnail) */}
              <div
                onClick={() => setIsScanOpen(true)}
                className="flex items-center gap-space-md p-space-sm bg-surface-container rounded-lg border border-surface-container-high/60 cursor-pointer hover:bg-surface-container-high transition-colors"
              >
                <div className="w-16 h-16 rounded-md overflow-hidden bg-surface-container-highest shrink-0 relative">
                  <img
                    className="w-full h-full object-cover"
                    alt="Handwriting math note"
                    src={problem.rawScanImage}
                  />
                  <div className="absolute inset-0 bg-primary/15 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-[20px] drop-shadow">
                      photo_camera
                    </span>
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">
                    제출된 손글씨 풀이 OCR
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface truncate font-math-step">
                    {socratic?.handwritingOcrQuote || '"S_n = n^2 + 2n → a_n 식 전개 도중 멈춤..."'}
                  </p>
                  <span className="font-label-code text-label-code text-secondary flex items-center gap-1 mt-0.5 font-bold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span>
                    텍스트 인식 완료 (신뢰도 {problem.ocrAccuracy})
                  </span>
                </div>
              </div>
            </div>

            {/* Diagnostic Cause Switcher (Reason for Asking) */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-title-sm text-title-sm text-on-surface font-semibold">
                    어떤 부분이 가장 막히시나요?
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    선택한 이유에 맞춰 AI 튜터의 답변 방식이 바뀝니다.
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-[22px]">tune</span>
              </div>

              {/* Radio Selection Cards */}
              <div className="flex flex-col gap-space-sm" id="diagnostic-mode-group">
                {/* Option A (Recommended) */}
                <label
                  onClick={() => setDiagnosticMode('step-by-step')}
                  className="cursor-pointer group"
                >
                  <input
                    checked={diagnosticMode === 'step-by-step'}
                    onChange={() => setDiagnosticMode('step-by-step')}
                    className="sr-only"
                    name="stuck-reason"
                    type="radio"
                    value="step-by-step"
                  />
                  <div
                    className={`p-space-md rounded-xl transition-all flex items-start gap-space-md border-2 ${
                      diagnosticMode === 'step-by-step'
                        ? 'bg-primary-container/10 border-primary shadow-xs'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm ${
                        diagnosticMode === 'step-by-step'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">psychology</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-title-sm text-title-sm font-semibold text-primary">
                          유형은 알지만 풀이 중간이 막혀요
                        </span>
                        <span className="font-label-bold text-label-bold text-primary bg-primary-container/20 px-2 py-0.5 rounded-full font-bold">
                          추천
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        정답을 바로 주지 않고, 스스로 식을 유도할 수 있도록{' '}
                        <strong>소크라테스식 단계적 질문</strong>으로 가이드합니다.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Option B */}
                <label
                  onClick={() => setDiagnosticMode('concept-buildup')}
                  className="cursor-pointer group"
                >
                  <input
                    checked={diagnosticMode === 'concept-buildup'}
                    onChange={() => setDiagnosticMode('concept-buildup')}
                    className="sr-only"
                    name="stuck-reason"
                    type="radio"
                    value="concept-buildup"
                  />
                  <div
                    className={`p-space-md rounded-xl transition-all flex items-start gap-space-md border-2 ${
                      diagnosticMode === 'concept-buildup'
                        ? 'bg-primary-container/10 border-primary shadow-xs'
                        : 'bg-surface-container-low border-transparent hover:bg-surface-container'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        diagnosticMode === 'concept-buildup'
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                    </div>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                          처음 보는 생소한 유형이라 감이 안 와요
                        </span>
                        <span className="font-label-bold text-label-bold text-outline">
                          개념 부족
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        핵심 원리 1분 압축 요약과 함께 바로 풀 수 있는{' '}
                        <strong>기초 쌍둥이 문제</strong>부터 차근차근 빌드업합니다.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Step-by-Step Hint Gauge Progression */}
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[20px]">
                    lightbulb
                  </span>
                  <h2 className="font-title-sm text-title-sm text-on-surface font-semibold">
                    단계별 힌트 로드맵
                  </h2>
                </div>
                <span className="font-label-code text-label-code text-secondary font-bold">
                  {unlockedCount} / {hints.length} 단계 해금
                </span>
              </div>

              {/* Progress Bar Track */}
              <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Sequential Hint Nodes */}
              <div className="flex flex-col gap-space-sm pt-space-xs">
                {hints.map((hint, idx) => {
                  if (hint.isUnlocked) {
                    return (
                      <div
                        key={hint.id}
                        className="p-space-sm rounded-lg bg-secondary-container/30 border border-secondary/20 flex items-start gap-space-sm animate-in fade-in duration-200"
                      >
                        <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 font-label-bold text-[11px]">
                          <span className="material-symbols-outlined text-[14px]">check</span>
                        </div>
                        <div className="flex flex-col flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-body-sm text-body-sm font-semibold text-on-surface">
                              {hint.title}
                            </span>
                            <span className="font-label-bold text-[10px] text-secondary uppercase font-bold tracking-wider">
                              언락됨
                            </span>
                          </div>
                          <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                            <span className="font-math-step text-math-step text-[13px] text-primary">
                              {hint.math}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // Available to reveal if previous is unlocked
                  const canUnlock = idx === 0 || hints[idx - 1].isUnlocked;

                  if (canUnlock) {
                    return (
                      <div
                        key={hint.id}
                        className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between hover:bg-surface-container transition-colors border border-surface-container-high/50"
                      >
                        <div className="flex items-center gap-space-sm">
                          <div className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center shrink-0 font-label-bold text-[11px]">
                            {hint.id}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-body-sm text-body-sm font-medium text-on-surface">
                              {hint.title}
                            </span>
                            <span className="font-label-code text-label-code text-outline text-[11px]">
                              {hint.subtitle}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => unlockHint(hint.id)}
                          className="px-2.5 py-1 rounded bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary transition-colors font-label-bold text-[11px] flex items-center gap-1 font-bold"
                        >
                          <span className="material-symbols-outlined text-[14px]">lock_open</span>
                          <span>보기</span>
                        </button>
                      </div>
                    );
                  }

                  // Locked
                  return (
                    <div
                      key={hint.id}
                      className="p-space-sm rounded-lg bg-surface-container-low opacity-60 flex items-center justify-between border border-transparent"
                    >
                      <div className="flex items-center gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-surface-container text-outline flex items-center justify-center shrink-0 font-label-bold text-[11px]">
                          {hint.id}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-body-sm text-body-sm text-outline">
                            {hint.title}
                          </span>
                          <span className="font-label-code text-label-code text-outline text-[11px]">
                            {hint.subtitle}
                          </span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-outline text-[16px]">lock</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Interactive AI Socratic Tutor Coaching Dialog (7 Cols) */}
          <section className="lg:col-span-7 flex flex-col bg-surface-container-lowest rounded-xl shadow-xs border border-surface-container-high/60 min-h-[740px] h-[calc(100vh-130px)] sticky top-20 overflow-hidden">
            {/* Chat Header */}
            <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between shadow-xs border-b border-surface-container-high/60">
              <div className="flex items-center gap-space-sm">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-white"></span>
                </div>
                <div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                      Math Mate AI 튜터
                    </span>
                    <span className="font-label-code text-[11px] bg-primary-container text-on-primary-container px-1.5 py-0.2 rounded font-medium">
                      GPT-4o Math Engine
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    질문 의도:{' '}
                    <span className="text-primary font-medium">
                      {diagnosticMode === 'step-by-step' ? '소크라테스 유도 풀이 중' : '기초 원리 빌드업 모드'}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={() => setChatMessages(socratic?.initialChat || [])}
                  className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                  title="대화 지우기 및 초기화"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
              </div>
            </div>

            {/* Chat Scroll Area */}
            <div className="flex-1 overflow-y-auto p-space-lg flex flex-col gap-space-lg bg-gradient-to-b from-surface-container-lowest via-surface-container-low/20 to-surface-container-lowest">
              {/* System Context Timestamp */}
              <div className="flex justify-center">
                <span className="font-label-code text-[11px] text-outline px-3 py-1 rounded-full bg-surface-container-low border border-surface-container-high/50">
                  오늘 오후 4:28 · 실시간 튜터링 세션 시작
                </span>
              </div>

              {/* Chat Messages */}
              {chatMessages.map((msg) => {
                if (msg.sender === 'student') {
                  return (
                    <div key={msg.id} className="flex items-start justify-end gap-space-sm max-w-[85%] self-end">
                      <div className="flex flex-col items-end gap-space-xs">
                        <span className="font-label-bold text-label-bold text-primary font-bold">
                          {msg.senderName}
                        </span>
                        <div className="bg-primary text-on-primary p-space-md rounded-2xl rounded-tr-xs shadow-xs flex flex-col gap-space-xs">
                          <p className="font-body-md text-body-md leading-relaxed text-on-primary">
                            {msg.content}
                          </p>
                        </div>
                        <span className="font-label-code text-[11px] text-outline">
                          {msg.time}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed flex items-center justify-center shrink-0 mt-1 font-title-sm text-[13px] font-bold">
                        수학
                      </div>
                    </div>
                  );
                }

                // AI Message
                return (
                  <div key={msg.id} className="flex items-start gap-space-sm max-w-[92%]">
                    <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                    </div>
                    <div className="flex flex-col gap-space-xs">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-label-bold text-label-bold text-outline">
                          {msg.senderName}
                        </span>
                        {msg.badge && (
                          <span className="bg-secondary-container text-on-secondary-container px-1.5 py-0.2 rounded-full font-label-code text-[10px] font-semibold">
                            {msg.badge}
                          </span>
                        )}
                      </div>

                      <div className="bg-surface-container-low text-on-surface p-space-md rounded-2xl rounded-tl-xs shadow-xs flex flex-col gap-space-sm border border-surface-container-high/60">
                        <p className="font-body-md text-body-md leading-relaxed whitespace-pre-line">
                          {msg.content}
                        </p>

                        {/* Optional Math formula box */}
                        {msg.mathBox && (
                          <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-center text-center border border-surface-container-high/50">
                            <span className="font-math-step text-math-step text-primary font-bold">
                              {msg.mathBox}
                            </span>
                          </div>
                        )}

                        {/* Optional interactive challenge card */}
                        {msg.challenge && (
                          <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col gap-space-sm shadow-xs border border-surface-container-high/60">
                            <div className="flex items-center gap-1.5 text-primary font-title-sm text-title-sm font-semibold">
                              <span className="material-symbols-outlined text-[18px]">calculate</span>
                              <span>{msg.challenge.title}</span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {msg.challenge.desc}
                            </p>
                            <div className="bg-surface-container-low p-space-sm rounded-lg font-math-step text-math-step text-[14px] text-on-surface flex flex-col gap-1">
                              {msg.challenge.steps.map((st, i) => (
                                <div key={i}>{st}</div>
                              ))}
                            </div>
                            <div className="flex items-center justify-between pt-1">
                              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                                {msg.challenge.question}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleSendMessage(msg.challenge?.suggestedAnswer)}
                                className="px-3 py-1 bg-primary text-on-primary rounded font-label-bold text-label-bold hover:bg-surface-tint transition-all shadow-xs"
                              >
                                {msg.challenge.suggestedAnswer}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Optional Expandable Bonus Tip */}
                        {msg.bonusTip && (
                          <details className="group cursor-pointer">
                            <summary className="font-body-sm text-body-sm text-primary font-semibold flex items-center gap-1 group-open:text-on-surface">
                              <span className="material-symbols-outlined text-[16px] group-open:rotate-90 transition-transform">
                                chevron_right
                              </span>
                              <span>{msg.bonusTip.summary}</span>
                            </summary>
                            <div className="p-space-sm mt-space-xs rounded bg-surface-container font-body-sm text-body-sm text-on-surface-variant border border-surface-container-high/60">
                              {msg.bonusTip.detail}
                            </div>
                          </details>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* AI Typing Indicator */}
              {isAiTyping && (
                <div className="flex items-center gap-2 text-on-surface-variant text-[12px] pl-10 font-label-code">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100"></span>
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200"></span>
                  <span>AI 튜터가 수식을 검토 중입니다...</span>
                </div>
              )}

              {/* Twin Problem Practice Recommendation Module (Screen 2 Requirement) */}
              <div className="p-space-md rounded-xl bg-surface-container-high/40 flex flex-col gap-space-sm border border-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      recommend
                    </span>
                    <span className="font-title-sm text-title-sm font-semibold text-on-surface">
                      이 유형이 쉬워지는 유사 쌍둥이 문제 (난이도 하 → 중)
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-code text-[11px] font-bold">
                    3문항 세트
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm pt-space-xs">
                  {/* Twin 1 */}
                  <div
                    onClick={() => handleOpenTwinAtIndex(0)}
                    className="p-space-sm bg-surface-container-lowest rounded-lg hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between border border-surface-container-high/60 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-bold text-[10px] text-secondary font-bold uppercase">
                          쌍둥이 1단계 (기초)
                        </span>
                        <span className="font-label-code text-[11px] text-outline">정답률 88%</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-math-step line-clamp-2">
                        S<sub>n</sub> = n<sup>2</sup> + 4n 일 때, a<sub>5</sub> 의 값?
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-left font-label-bold text-[11px] text-primary group-hover:underline flex items-center gap-0.5"
                    >
                      <span>풀어보기</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* Twin 2 */}
                  <div
                    onClick={() => handleOpenTwinAtIndex(1)}
                    className="p-space-sm bg-surface-container-lowest rounded-lg hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between border border-surface-container-high/60 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-bold text-[10px] text-primary font-bold uppercase">
                          쌍둥이 2단계 (유사)
                        </span>
                        <span className="font-label-code text-[11px] text-outline">정답률 74%</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-math-step line-clamp-2">
                        S<sub>n</sub> = 2n<sup>2</sup> - n 일 때, a<sub>k</sub> = 35를 만족하는 k?
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-left font-label-bold text-[11px] text-primary group-hover:underline flex items-center gap-0.5"
                    >
                      <span>풀어보기</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>

                  {/* Twin 3 */}
                  <div
                    onClick={() => handleOpenTwinAtIndex(2)}
                    className="p-space-sm bg-surface-container-lowest rounded-lg hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between border border-surface-container-high/60 group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-label-bold text-[10px] text-tertiary font-bold uppercase">
                          쌍둥이 3단계 (함정주의)
                        </span>
                        <span className="font-label-code text-[11px] text-outline">정답률 52%</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface font-math-step line-clamp-2">
                        S<sub>n</sub> = n<sup>2</sup> + 2n + 1 (상수항 존재) 일 때, a<sub>1</sub> + a<sub>3</sub>?
                      </p>
                    </div>
                    <button
                      type="button"
                      className="mt-2 text-left font-label-bold text-[11px] text-primary group-hover:underline flex items-center gap-0.5"
                    >
                      <span>풀어보기</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              <div ref={chatBottomRef} />
            </div>

            {/* Math Symbol Palette Quick Bar (PRD & Screen 2 Requirement) */}
            <div className="px-space-md py-1.5 bg-surface-container-low flex items-center gap-space-xs overflow-x-auto border-t border-surface-container-high/60">
              <span className="font-label-bold text-label-bold text-outline uppercase shrink-0 mr-1">
                수식 기호:
              </span>
              <button
                type="button"
                onClick={() => insertSymbol('∑')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                ∑
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('∫')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                ∫
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('lim_{n→∞}')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                lim
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('√()')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                √x
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('x^2')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                x²
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('a_n')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                a<sub>n</sub>
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('S_n')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                S<sub>n</sub>
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('≠')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                ≠
              </button>
              <button
                type="button"
                onClick={() => insertSymbol('≥')}
                className="px-2 py-0.5 rounded bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container text-on-surface font-math-step text-math-step shadow-xs transition-colors"
              >
                ≥
              </button>
            </div>

            {/* Bottom Input Console: Photos, Audio Mic, Formula input */}
            <div className="p-space-md bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs border-t border-surface-container-high/60">
              <form
                className="flex items-center gap-space-sm"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                {/* Camera / Photo Attachment Button */}
                <button
                  type="button"
                  onClick={() => setIsScanOpen(true)}
                  className="p-2.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors shrink-0"
                  title="수식이나 풀이 사진 첨부"
                >
                  <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                </button>

                {/* Voice Mic Button */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                    isListening
                      ? 'bg-error text-on-error animate-pulse'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }`}
                  title="말로 수학 질문하기 (STT)"
                >
                  <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>

                {/* Main Input Textarea/Input */}
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    id="math-chat-input"
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="w-full bg-surface-container-low px-space-md py-2.5 rounded-xl font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all pr-10 border border-surface-container-high/60"
                    placeholder={
                      isListening
                        ? '음성을 듣고 있습니다...'
                        : '답변을 입력하거나 다음 궁금한 단계에 대해 질문해보세요...'
                    }
                  />
                  <button
                    type="button"
                    onClick={() => insertSymbol('√()')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
                    title="수식 키보드 토글"
                  >
                    <span className="material-symbols-outlined text-[18px]">functions</span>
                  </button>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  className="px-space-md py-2.5 rounded-xl bg-primary text-on-primary hover:bg-surface-tint font-title-sm text-title-sm transition-all shadow-xs flex items-center gap-1.5 shrink-0 font-bold"
                >
                  <span>전송</span>
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </form>

              <div className="flex items-center justify-between px-space-xs">
                <span className="font-body-sm text-[11px] text-outline">
                  팁: 수학 기호는 수식 팔레트를 클릭하거나 <code className="font-label-code">LaTeX</code> 문법($...$)으로도 직접 쓸 수 있어요.
                </span>
                <div className="flex items-center gap-space-xs text-[11px] text-outline font-label-code">
                  <span>Enter 전송</span>
                  <span>·</span>
                  <span>Shift+Enter 줄바꿈</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      <ScanModal
        isOpen={isScanOpen}
        onClose={() => setIsScanOpen(false)}
        imageUrl={problem.rawScanImage}
        ocrAccuracy={problem.ocrAccuracy}
        problemId={problem.id}
      />

      <TwinPracticeModal
        isOpen={isTwinOpen}
        onClose={() => setIsTwinOpen(false)}
        twinProblems={socratic?.twinProblems}
        parentTitle={problem.chapter}
      />
    </div>
  );
};
