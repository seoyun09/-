import React, { useState } from 'react';
import { Problem } from '../types';

interface RetryModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
  onMarkSolved: () => void;
}

export const RetryModal: React.FC<RetryModalProps> = ({
  isOpen,
  onClose,
  problem,
  onMarkSolved,
}) => {
  const [answerInput, setAnswerInput] = useState('');
  const [step1Input, setStep1Input] = useState('');
  const [step2Input, setStep2Input] = useState('');
  const [resultMessage, setResultMessage] = useState<{
    status: 'correct' | 'wrong' | 'sign_error';
    text: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = answerInput.replace(/\s+/g, '');

    // Check specific sign mistake
    if (clean === '(0,16)' || clean === '16' || clean === '0,16') {
      setResultMessage({
        status: 'sign_error',
        text: '⚠️ 조심하세요! 이전과 동일하게 음수 부호(-)를 누락했습니다. y = 9x - 16 식에서 x=0일 때 y = -16 입니다.',
      });
      return;
    }

    // Correct
    if (
      clean === '(0,-16)' ||
      clean === '-16' ||
      clean === '0,-16' ||
      clean.includes('-16')
    ) {
      setResultMessage({
        status: 'correct',
        text: '🎉 정답입니다! 부호 실수를 극복하고 올바른 정답 (0, -16)을 완벽하게 맞혔습니다! 오답 해결로 기록됩니다.',
      });
      onMarkSolved();
      return;
    }

    setResultMessage({
      status: 'wrong',
      text: '다시 확인해보세요. 접선의 기울기 m = 9, 접선의 방정식 y = 9x - 16을 대입하여 y절편을 계산하세요.',
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">replay</span>
            <div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                이 문제 다시 풀기 (자가 진단 테스트)
              </h3>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                {problem.id} • {problem.chapter}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-surface">
          {/* Question Box */}
          <div className="bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
            <span className="font-label-bold text-label-bold text-primary uppercase">문항 내용</span>
            <p className="font-title-sm text-[15px] text-on-surface mt-1 leading-relaxed">
              {problem.questionText}
            </p>
          </div>

          {/* Stepper Inputs */}
          <div className="flex flex-col gap-3">
            <span className="font-label-bold text-label-bold text-on-surface-variant uppercase">
              단계별 셀프 풀이 전개
            </span>

            <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container-high flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-on-surface">
                1단계: 도함수 f'(x) 와 x=2 대입한 기울기 m은?
              </label>
              <input
                type="text"
                placeholder="예: f'(x) = 3x² - 3, m = 9"
                value={step1Input}
                onChange={(e) => setStep1Input(e.target.value)}
                className="px-3 py-1.5 bg-surface-container-low border border-surface-container-high rounded font-math-step text-[13px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-lg border border-surface-container-high flex flex-col gap-1">
              <label className="text-[12px] font-semibold text-on-surface">
                2단계: 점 (2, 2)를 지나는 접선의 방정식은?
              </label>
              <input
                type="text"
                placeholder="예: y - 2 = 9(x - 2) ⇒ y = 9x - 16"
                value={step2Input}
                onChange={(e) => setStep2Input(e.target.value)}
                className="px-3 py-1.5 bg-surface-container-low border border-surface-container-high rounded font-math-step text-[13px] text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="bg-surface-container-lowest p-3.5 rounded-lg border-2 border-primary/40 flex flex-col gap-1">
              <label className="text-[13px] font-bold text-primary flex items-center justify-between">
                <span>3단계: 최종 y축과의 교점 좌표 (y절편)</span>
                <span className="text-[11px] text-error font-medium">부호 주의!</span>
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  required
                  placeholder="예: (0, -16)"
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-surface-container-low border border-surface-container-high rounded-lg font-math-step text-math-step text-on-surface font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-on-primary rounded-lg font-title-sm text-[13px] hover:bg-surface-tint font-bold shadow-sm"
                >
                  제출 및 채점
                </button>
              </div>
            </div>
          </div>

          {/* Result Alert */}
          {resultMessage && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in duration-200 ${
                resultMessage.status === 'correct'
                  ? 'bg-secondary-container/40 border-secondary/40 text-on-surface'
                  : resultMessage.status === 'sign_error'
                  ? 'bg-error-container/50 border-error/50 text-error'
                  : 'bg-surface-container-high border-outline-variant text-on-surface'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] shrink-0 ${
                  resultMessage.status === 'correct'
                    ? 'text-secondary'
                    : resultMessage.status === 'sign_error'
                    ? 'text-error animate-bounce'
                    : 'text-outline'
                }`}
              >
                {resultMessage.status === 'correct'
                  ? 'verified'
                  : resultMessage.status === 'sign_error'
                  ? 'warning'
                  : 'info'}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-title-sm text-[14px] font-bold">
                  {resultMessage.status === 'correct'
                    ? '채점 결과: 정답 (100점)'
                    : resultMessage.status === 'sign_error'
                    ? '치명적 부호 반전 감지!'
                    : '채점 결과: 오답'}
                </span>
                <p className="font-body-sm text-[13px] leading-relaxed">
                  {resultMessage.text}
                </p>
              </div>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <span className="font-body-sm text-[12px] text-on-surface-variant">
            💡 재시험 통과 시 주간 오답 해결 통계에 즉시 반영됩니다.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-container-high text-on-surface font-title-sm text-title-sm rounded-lg hover:bg-surface-container-highest transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
