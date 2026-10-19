import React, { useState } from 'react';

interface TwinItem {
  id: string;
  stage: string;
  badgeColor: string;
  badgeBg: string;
  badgeText: string;
  question: string;
  answer: string;
  explanation: string;
}

interface TwinPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  twinProblems?: TwinItem[];
  parentTitle?: string;
}

const DEFAULT_TWIN_PROBLEMS: TwinItem[] = [
  {
    id: 'twin-1',
    stage: '쌍둥이 1단계 (기초)',
    badgeColor: 'text-secondary',
    badgeBg: 'bg-secondary-container',
    badgeText: '정답률 91%',
    question: '곡선 y = x² - 2x 위의 점 (3, 3)에서의 접선이 y축과 만나는 점의 좌표를 구하시오.',
    answer: '(0, -9)',
    explanation: "1) f'(x) = 2x - 2\n2) x = 3 대입: m = f'(3) = 6 - 2 = 4\n3) 접선의 방정식: y - 3 = 4(x - 3) ⇒ y = 4x - 9\n4) y축 교점: x = 0 일 때 y = -9이므로 (0, -9)",
  },
  {
    id: 'twin-2',
    stage: '쌍둥이 2단계 (유사)',
    badgeColor: 'text-primary',
    badgeBg: 'bg-primary-container/20',
    badgeText: '정답률 79%',
    question: '곡선 y = 2x³ - 5x + 1 위의 점 (1, -2)에서의 접선의 y절편 값을 구하시오.',
    answer: '-3',
    explanation: "1) f'(x) = 6x² - 5\n2) f'(1) = 1 (기울기 m = 1)\n3) 접선: y - (-2) = 1(x - 1) ⇒ y = x - 3\n4) 빠른 y절편 공식: y₀ - x₀·f'(x₀) = -2 - (1 × 1) = -3",
  },
  {
    id: 'twin-3',
    stage: '쌍둥이 3단계 (함정주의)',
    badgeColor: 'text-tertiary',
    badgeBg: 'bg-tertiary-fixed',
    badgeText: '정답률 61%',
    question: '곡선 y = x³ - x 위의 점 (2, 6)에서의 접선이 x축과 만나는 점의 x좌표를 구하시오.',
    answer: '16/11',
    explanation: "1) f'(x) = 3x² - 1, f'(2) = 11\n2) 접선: y - 6 = 11(x - 2) ⇒ y = 11x - 16\n3) x축과의 교점이므로 y = 0 대입!\n4) 0 = 11x - 16 ⇒ 11x = 16 ⇒ x = 16/11",
  },
];

export const TwinPracticeModal: React.FC<TwinPracticeModalProps> = ({
  isOpen,
  onClose,
  twinProblems = DEFAULT_TWIN_PROBLEMS,
  parentTitle = '접선의 방정식',
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [scratchpad, setScratchpad] = useState('');
  const [checkedState, setCheckedState] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    feedback: string;
  } | null>(null);

  if (!isOpen) return null;

  const currentProb = twinProblems[activeIdx] || DEFAULT_TWIN_PROBLEMS[0];

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) return;
    const cleanUser = userAnswer.replace(/\s+/g, '').toLowerCase();
    const cleanAns = currentProb.answer.replace(/\s+/g, '').toLowerCase();
    
    // Check if matches or includes key coordinate
    const isCorrect = cleanUser === cleanAns || 
      (cleanAns.includes(cleanUser) && cleanUser.length >= 2) ||
      cleanUser.includes(cleanAns);

    setCheckedState({
      submitted: true,
      isCorrect,
      feedback: isCorrect
        ? '정답입니다! 부호 실수 없이 완벽하게 접선의 절편을 도출했습니다.'
        : `오답입니다. 올바른 정답은 ${currentProb.answer} 입니다. 아래 풀이를 확인하세요.`,
    });
  };

  const handleNextProblem = () => {
    setUserAnswer('');
    setCheckedState(null);
    setScratchpad('');
    if (activeIdx < twinProblems.length - 1) {
      setActiveIdx(activeIdx + 1);
    } else {
      setActiveIdx(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[24px]">content_copy</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                  유사 쌍둥이 맞춤 훈련
                </h3>
                <span className="text-[11px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-code font-bold">
                  AI 자동 생성 완료
                </span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                [{parentTitle}] 동일 핵심 원리 & 단계별 난이도 상승 문항
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Tabs for 3 stages */}
        <div className="px-6 pt-3 bg-surface-container-lowest border-b border-surface-container-high flex gap-2">
          {twinProblems.map((prob, idx) => (
            <button
              key={prob.id}
              type="button"
              onClick={() => {
                setActiveIdx(idx);
                setUserAnswer('');
                setCheckedState(null);
              }}
              className={`pb-2.5 px-3 font-title-sm text-[13px] border-b-2 transition-all flex items-center gap-1.5 ${
                activeIdx === idx
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>{prob.stage}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-label-code ${prob.badgeBg} ${prob.badgeColor} font-bold`}>
                {prob.badgeText}
              </span>
            </button>
          ))}
        </div>

        {/* Problem Body */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-surface">
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-label-bold text-label-bold text-primary uppercase">
                문항 {activeIdx + 1} / {twinProblems.length}
              </span>
              <span className="font-body-sm text-outline">배점 3~4점 예상</span>
            </div>

            <p className="font-body-lg text-headline-md text-on-surface font-semibold leading-relaxed">
              {currentProb.question}
            </p>
          </div>

          {/* Interactive Scratchpad & Answer Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Scratchpad */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-label-bold text-label-bold text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">edit_note</span> 풀이 연습장 (메모)
                </span>
                <button
                  type="button"
                  onClick={() => setScratchpad('')}
                  className="text-[11px] text-outline hover:text-error"
                >
                  지우기
                </button>
              </div>
              <textarea
                value={scratchpad}
                onChange={(e) => setScratchpad(e.target.value)}
                placeholder="f'(x) 미분 과정이나 좌표 계산을 자유롭게 적어보세요..."
                className="w-full h-32 p-3 bg-surface-container-lowest border border-surface-container-high rounded-xl font-math-step text-[13px] text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            {/* Right: Answer Submission */}
            <div className="flex flex-col gap-2 justify-between bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high">
              <div className="flex flex-col gap-2">
                <label className="font-label-bold text-label-bold text-on-surface-variant">
                  최종 답안 입력
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                    placeholder="예: (0, -9) 또는 -3"
                    className="flex-1 px-3 py-2 bg-surface-container-low border border-surface-container-high rounded-lg font-math-step text-math-step text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    className="px-4 py-2 bg-primary text-on-primary rounded-lg font-title-sm text-[13px] hover:bg-surface-tint font-bold"
                  >
                    채점하기
                  </button>
                </div>
                <span className="text-[11px] text-outline">
                  좌표 형태는 (0, -9) 또는 수치 -9 로 입력하세요.
                </span>
              </div>

              {/* Feedback State */}
              {checkedState && (
                <div
                  className={`p-3 rounded-lg flex flex-col gap-1 ${
                    checkedState.isCorrect
                      ? 'bg-secondary-container/40 border border-secondary/30'
                      : 'bg-error-container/40 border border-error/30'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        checkedState.isCorrect ? 'text-secondary' : 'text-error'
                      }`}
                    >
                      {checkedState.isCorrect ? 'check_circle' : 'cancel'}
                    </span>
                    <span
                      className={`font-title-sm text-[13px] font-bold ${
                        checkedState.isCorrect ? 'text-secondary' : 'text-error'
                      }`}
                    >
                      {checkedState.isCorrect ? '정답입니다!' : '오답입니다'}
                    </span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface leading-relaxed">
                    {checkedState.feedback}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Accordion (Always available or revealed) */}
          <details className="group bg-surface-container-lowest rounded-xl border border-surface-container-high p-4" open={Boolean(checkedState)}>
            <summary className="font-title-sm text-[13px] text-primary font-semibold flex items-center justify-between cursor-pointer">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
                단계별 표준 모범 해설 확인하기
              </span>
              <span className="material-symbols-outlined text-[18px] group-open:rotate-180 transition-transform">
                expand_more
              </span>
            </summary>
            <div className="pt-3 mt-3 border-t border-surface-container-high/60 whitespace-pre-line font-math-step text-[13px] text-on-surface leading-relaxed bg-surface-container-low/50 p-3 rounded-lg">
              {currentProb.explanation}
            </div>
          </details>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <span className="font-body-sm text-[12px] text-on-surface-variant">
            💡 동일 유형을 3문제 연속 성공하면 오답 극복 뱃지가 부여됩니다.
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNextProblem}
              className="px-4 py-1.5 bg-surface-container-highest text-primary hover:bg-primary hover:text-on-primary font-title-sm text-title-sm rounded-lg transition-colors flex items-center gap-1"
            >
              <span>다음 문제</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 bg-primary text-on-primary font-title-sm text-title-sm rounded-lg hover:bg-surface-tint transition-colors"
            >
              학습 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
