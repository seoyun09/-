import React, { useState } from 'react';
import { Problem } from '../types';
import { ScanModal } from './ScanModal';
import { TwinPracticeModal } from './TwinPracticeModal';
import { RetryModal } from './RetryModal';
import { ConceptModal } from './ConceptModal';
import { AiChatDrawer } from './AiChatDrawer';

interface ReviewPageProps {
  problem: Problem;
  onToggleSolved: (id: string) => void;
  onNavigateToAiTutor: () => void;
  onSelectProblem?: (id: string) => void;
  allProblems?: Problem[];
}

export const ReviewPage: React.FC<ReviewPageProps> = ({
  problem,
  onToggleSolved,
  onNavigateToAiTutor,
  onSelectProblem,
  allProblems = [],
}) => {
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isTwinOpen, setIsTwinOpen] = useState(false);
  const [isRetryOpen, setIsRetryOpen] = useState(false);
  const [isConceptOpen, setIsConceptOpen] = useState(false);
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleTwinGenerate = () => {
    setIsTwinOpen(true);
    showToast('접선의 방정식 단원의 동일 난이도 쌍둥이 문항 3개가 자동 생성되어 오답 훈련함에 추가되었습니다.');
  };

  const handleResolveComplete = () => {
    onToggleSolved(problem.id);
    if (!problem.isSolved) {
      showToast('오답 해결 완료로 기록되었습니다! 주간 오답 해결률이 상승했습니다.');
    } else {
      showToast('오답 검토 미해결 상태로 변경되었습니다.');
    }
  };

  return (
    <div className="flex flex-col w-full select-none">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
          <span className="font-body-sm text-[13px] font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Context Header Area */}
      <div className="px-margin-desktop py-space-lg bg-surface-container-lowest shadow-xs flex flex-col gap-space-md border-b border-surface-container-high/60">
        {/* Breadcrumb & Status Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant flex-wrap">
            <span className="font-title-sm text-title-sm text-primary font-bold">오답노트</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span>{problem.subjectName}</span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="text-on-surface font-semibold">{problem.chapter}</span>

            {/* Quick Switcher if multiple problems exist */}
            {allProblems.length > 1 && onSelectProblem && (
              <div className="ml-3 hidden md:flex items-center gap-1">
                <span className="text-[11px] text-outline">다른 문항:</span>
                {allProblems.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectProblem(p.id)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-label-code ${
                      p.id === problem.id
                        ? 'bg-primary text-on-primary font-bold'
                        : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {p.id}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-space-xs flex-wrap">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-bold text-label-bold">
              <span className="material-symbols-outlined text-[14px]">error</span>
              {problem.errorCategory}
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-bold text-label-bold ${
              problem.isSolved 
                ? 'bg-secondary-container text-on-secondary-container' 
                : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              <span className="material-symbols-outlined text-[14px]">
                {problem.isSolved ? 'task_alt' : 'history'}
              </span>
              {problem.isSolved ? '해결 완료' : problem.reviewRound}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-bold text-label-bold">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              AI 진단 신뢰도 {problem.aiConfidence}
            </span>
          </div>
        </div>

        {/* Question Prompt Summary Card */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 font-math-step text-math-step font-bold">
              {problem.id}
            </div>
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="font-label-bold text-label-bold text-primary uppercase tracking-wider">
                  {problem.typeTag}
                </span>
                <span className="font-body-sm text-body-sm text-outline">
                  • 배점 {problem.points}점 • {problem.difficulty}
                </span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface">
                {problem.id === 'Q14' ? (
                  <>
                    곡선 <span className="font-math-step text-primary font-semibold">y = x³ - 3x</span> 위의 점{' '}
                    <span className="font-math-step font-semibold">(2, 2)</span>에서의 접선이{' '}
                    <span className="font-math-step text-primary font-semibold">y</span>축과 만나는 점의 좌표를 구하시오.
                  </>
                ) : (
                  problem.questionText
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-sm shrink-0 self-end lg:self-center bg-surface-container-lowest/80 px-3 py-1.5 rounded-lg border border-surface-container-high/60">
            <div className="text-right">
              <span className="font-body-sm text-body-sm text-on-surface-variant block">제출 답안</span>
              <span className="font-math-step text-math-step text-error font-bold line-through">
                {problem.submittedAnswer}
              </span>
            </div>
            <div className="w-px h-8 bg-surface-container-high"></div>
            <div className="text-left">
              <span className="font-body-sm text-body-sm text-on-surface-variant block">실제 정답</span>
              <span className="font-math-step text-math-step text-secondary font-bold">
                {problem.correctAnswer}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Comparison (Split-View) Workspace */}
      <div className="px-margin-desktop py-space-lg grid grid-cols-1 xl:grid-cols-12 gap-gutter-desktop">
        {/* LEFT PANEL: Student Submission & AI Diagnostic Breakdown (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-space-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">
                assignment_turned_in
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                학생 풀이 및 오류 분석
              </h2>
            </div>
            <span className="font-label-bold text-label-bold text-error bg-error-container/40 px-2.5 py-1 rounded-md border border-error/20">
              3단계 부호 반전 치명적 오류 발견
            </span>
          </div>

          {/* Handwriting Capture / OCR Preview Snippet */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-sm border border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                제출된 손글씨 풀이 (OCR 인식 완료)
              </span>
              <button
                id="toggle-raw-scan"
                type="button"
                onClick={() => setIsScanOpen(true)}
                className="font-body-sm text-body-sm text-primary hover:underline flex items-center gap-0.5"
              >
                <span>원본 스캔 이미지 보기</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </button>
            </div>
            <div
              onClick={() => setIsScanOpen(true)}
              className="relative rounded-lg overflow-hidden bg-surface-container-low h-32 flex items-center justify-center cursor-pointer group"
            >
              <img
                className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-300"
                alt="Student's handwritten math notebook"
                src={problem.rawScanImage}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest/90 via-surface-container-lowest/60 to-transparent flex items-center px-space-md">
                <div className="bg-surface-container-lowest/95 backdrop-blur-sm p-space-sm rounded-lg shadow-sm border border-surface-container-high/50">
                  <span className="font-label-code text-label-code text-primary font-bold">
                    OCR 감지 정확도 {problem.ocrAccuracy}
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {problem.ocrSummary}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Diagnostic Breakdown (Domain Component) */}
          <div className="flex flex-col gap-space-sm relative">
            {/* Vertical connector track */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-surface-container-highest"></div>

            {/* Step 1 (Correct) */}
            <div className="relative bg-surface-container-lowest rounded-xl p-space-md shadow-xs pl-16 transition-all hover:shadow-md border border-surface-container-high/60">
              <div className="absolute left-3.5 top-5 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-bold text-[11px] shadow-sm">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">
                    1단계 • 미분 및 접선의 기울기 계산
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-code text-label-code text-secondary bg-secondary-container/50 px-2 py-0.5 rounded font-semibold">
                    정상 연산
                  </span>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg font-math-step text-math-step text-on-surface whitespace-pre-line leading-relaxed">
                  f'(x) = 3x² - 3 <br />
                  m = f'(2) = 3(2)² - 3 = 12 - 3 = <span className="text-primary font-bold">9</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  함수 $f(x)$를 올바르게 미분하고, $x = 2$를 대입하여 접선의 기울기 $m = 9$를 완벽하게 도출했습니다.
                </p>
              </div>
            </div>

            {/* Step 2 (Correct) */}
            <div className="relative bg-surface-container-lowest rounded-xl p-space-md shadow-xs pl-16 transition-all hover:shadow-md border border-surface-container-high/60">
              <div className="absolute left-3.5 top-5 w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-bold text-[11px] shadow-sm">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-bold text-label-bold text-secondary uppercase tracking-wider">
                    2단계 • 접선의 방정식 수식 전개
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-code text-label-code text-secondary bg-secondary-container/50 px-2 py-0.5 rounded font-semibold">
                    정상 수립
                  </span>
                </div>
                <div className="bg-surface-container-low p-space-sm rounded-lg font-math-step text-math-step text-on-surface whitespace-pre-line leading-relaxed">
                  y - y₁ = m(x - x₁) <br />
                  y - 2 = 9(x - 2) <br />
                  y = 9x - 18 + 2 <span className="text-outline">→</span>{' '}
                  <span className="text-primary font-bold">y = 9x - 16</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  지나는 점 $(2, 2)$와 기울기 $9$를 이용해 직선의 방정식을 올바른 형태로 정리했습니다.
                </p>
              </div>
            </div>

            {/* Step 3 (Crucial Error Highlighted) */}
            <div className="relative bg-error-container/20 rounded-xl p-space-md shadow-xs pl-16 transition-all border border-error/30">
              <div className="absolute left-3.5 top-5 w-6 h-6 rounded-full bg-error text-on-error flex items-center justify-center font-label-bold text-[11px] shadow-sm animate-pulse">
                <span className="material-symbols-outlined text-[15px]">priority_high</span>
              </div>
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-bold text-label-bold text-error uppercase tracking-wider">
                    3단계 • y축과의 교점 구하기 (오류 발생 지점)
                  </span>
                  <span className="inline-flex items-center gap-1 font-label-code text-label-code text-error bg-error-container px-2 py-0.5 rounded font-bold">
                    부호 반전 오류 (Sign Flub)
                  </span>
                </div>

                {/* Side-by-side error comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
                  <div className="bg-surface-container-lowest p-space-sm rounded-lg border border-error/30">
                    <span className="font-label-bold text-label-bold text-error flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px]">cancel</span> 학생 기재 풀이
                    </span>
                    <div className="font-math-step text-math-step text-error">
                      x = 0 일 때, <br />
                      y = 9(0) <span className="bg-error-container px-1 py-0.5 rounded font-bold">+ 16</span> <br />
                      ∴ <span className="font-bold underline decoration-wavy decoration-error">(0, 16)</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-lowest p-space-sm rounded-lg border border-secondary/30">
                    <span className="font-label-bold text-label-bold text-secondary flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[14px]">check_circle</span> 올바른 풀이
                    </span>
                    <div className="font-math-step text-math-step text-secondary">
                      x = 0 일 때, <br />
                      y = 9(0) <span className="bg-secondary-container/60 px-1 py-0.5 rounded font-bold">- 16</span> <br />
                      ∴ <span className="font-bold">(0, -16)</span>
                    </div>
                  </div>
                </div>

                {/* AI Diagnostic Comment Box */}
                <div className="mt-space-xs bg-surface-container-lowest p-space-sm rounded-lg flex items-start gap-space-sm border border-surface-container-high/60">
                  <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">psychology</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-title-sm text-title-sm text-tertiary font-bold">
                      AI 튜터 진단 코멘트
                    </span>
                    <p className="font-body-md text-body-md text-on-surface">
                      2단계에서 <span className="font-math-step font-semibold">y = 9x - 16</span>까지 정확히 도출했으나, 마지막에 <span className="font-math-step font-semibold">x = 0</span>을 대입하거나 y절편을 적는 과정에서 음수 부호(-)를 떨어뜨려 <span className="font-math-step text-error font-semibold">+16</span>으로 적었습니다. 마지막 답 표기 직전 부호를 다시 점검하는 습관이 필요합니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Frequency & Pattern Chart */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-sm border border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-outline text-[20px]">analytics</span>
                <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                  김수학 학생의 계산 실수 빈도 패턴
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                최근 30일간 12회 발생
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border-l-4 border-error">
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">부호 반전 실수</span>
                <span className="font-headline-md text-headline-md text-error font-bold">58%</span>
                <span className="font-label-code text-label-code text-outline mt-1">이항 및 0 대입 시 빈출</span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border-l-4 border-outline">
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">단순 덧셈/곱셈 실수</span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">25%</span>
                <span className="font-label-code text-label-code text-outline mt-1">다항식 전개 과정</span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col border-l-4 border-outline">
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">조건 누락 (범위 오류)</span>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">17%</span>
                <span className="font-label-code text-label-code text-outline mt-1">극값 및 정의역 판별</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AI Proposed Optimal Solution & High-Speed Shortcut (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-space-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">auto_awesome</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                AI 추천 최적 풀이
              </h2>
            </div>
            <span className="font-label-code text-label-code text-primary bg-primary-fixed px-2.5 py-1 rounded-full font-bold">
              {problem.optimalSolution.recommendedTime}
            </span>
          </div>

          {/* Recommended Standard LaTeX Solution Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-md border border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-bold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                표준 모범 풀이 (Standard Solution)
              </span>
              <span className="font-body-sm text-body-sm text-outline">
                {problem.optimalSolution.targetAudience}
              </span>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm">
              <div className="flex items-start gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-bold mt-1">01</span>
                <div className="font-math-step text-math-step text-on-surface">
                  f(x) = x³ - 3x라 하면 <br />
                  f'(x) = 3x² - 3
                </div>
              </div>
              <div className="w-full h-px bg-surface-container-high my-1"></div>

              <div className="flex items-start gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-bold mt-1">02</span>
                <div className="font-math-step text-math-step text-on-surface">
                  점 (2, 2)에서의 접선의 기울기 m은 <br />
                  m = f'(2) = 3·4 - 3 = 9
                </div>
              </div>
              <div className="w-full h-px bg-surface-container-high my-1"></div>

              <div className="flex items-start gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-bold mt-1">03</span>
                <div className="font-math-step text-math-step text-on-surface">
                  접선의 방정식은 <br />
                  y - 2 = 9(x - 2) ⇒ y = 9x - 16
                </div>
              </div>
              <div className="w-full h-px bg-surface-container-high my-1"></div>

              <div className="flex items-start gap-space-sm">
                <span className="font-label-code text-label-code text-outline font-bold mt-1">04</span>
                <div className="font-math-step text-math-step text-secondary font-bold">
                  y축과의 교점은 x = 0일 때의 점이므로 <br />
                  정답: (0, -16)
                </div>
              </div>
            </div>
          </div>

          {/* AI Shortcut Tip Card (10s Speed Formula) */}
          <div className="bg-gradient-to-br from-primary-fixed/40 via-surface-container-lowest to-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-sm relative overflow-hidden border border-primary/20">
            <div className="flex items-center gap-space-sm text-primary">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
              <span className="font-title-sm text-title-sm font-bold">
                {problem.aiSpeedTip.title}
              </span>
            </div>

            <p className="font-body-md text-body-md text-on-surface">
              곡선 위의 점 <span className="font-math-step font-semibold">(x₀, y₀)</span>에서 그은 접선의{' '}
              <span className="font-semibold text-primary">y절편 공식</span>을 암기해두면 직선 방정식을 모두 전개할 필요가 없습니다.
            </p>

            {/* Formula Highlight Box */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col items-center justify-center text-center gap-1 shadow-inner border border-surface-container-high/60">
              <span className="font-label-bold text-label-bold text-outline">접선의 y절편 다이렉트 공식</span>
              <span className="font-math-step text-[18px] text-primary font-bold tracking-wide">
                {problem.aiSpeedTip.formula}
              </span>
            </div>

            <div className="bg-surface-container-lowest p-space-sm rounded-lg flex flex-col gap-1 border border-surface-container-high/60">
              <span className="font-label-bold text-label-bold text-on-surface-variant">본 문제 즉시 적용:</span>
              <div className="font-math-step text-math-step text-on-surface">
                {problem.aiSpeedTip.appliedMath}
              </div>
              <span className="font-body-sm text-body-sm text-secondary font-semibold">
                {problem.aiSpeedTip.highlightText}
              </span>
            </div>
          </div>

          {/* Core Concept & Formula Quick Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-sm border border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline text-[18px]">menu_book</span>
                관련 핵심 개념 복습
              </span>
              <button
                type="button"
                onClick={() => setIsConceptOpen(true)}
                className="font-body-sm text-body-sm text-primary hover:underline flex items-center"
              >
                <span>개념서 보기</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
            <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                {problem.conceptReview.title}
              </span>
              <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1 list-disc list-inside">
                {problem.conceptReview.points.map((pt, idx) => (
                  <li key={idx}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visual Graph Vector Card (Interactive SVG) */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col gap-space-sm border border-surface-container-high/60">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-1.5">
                <span className="material-symbols-outlined text-outline text-[18px]">show_chart</span>
                함수 및 접선 그래프 시각화
              </span>
              <span className="font-label-code text-label-code text-outline">실시간 인터랙티브 뷰</span>
            </div>

            <div className="w-full bg-surface-container-low rounded-lg p-space-sm flex flex-col items-center justify-center relative">
              {hoveredPoint && (
                <div className="absolute top-2 right-2 bg-surface-container-lowest border border-surface-container-high px-2 py-0.5 rounded text-[11px] font-label-code text-primary shadow-xs">
                  {hoveredPoint}
                </div>
              )}

              {/* Minimal Mathematical Graph SVG */}
              <svg className="w-full max-w-sm h-36 overflow-visible" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
                {/* Grid lines */}
                <line className="text-outline-variant" stroke="currentColor" strokeWidth="1.5" x1="20" x2="300" y1="90" y2="90" />
                <line className="text-outline-variant" stroke="currentColor" strokeWidth="1.5" x1="160" x2="160" y1="10" y2="170" />
                
                {/* Axis Labels */}
                <text x="295" y="85" className="fill-outline text-[10px] font-label-code">x</text>
                <text x="165" y="20" className="fill-outline text-[10px] font-label-code">y</text>
                <text x="163" y="102" className="fill-outline text-[9px] font-label-code">O</text>

                {/* Curve y = x^3 - 3x (scaled and mapped) */}
                <path
                  className="text-primary hover:stroke-[3.5] transition-all cursor-pointer"
                  d="M 50,170 C 90,165 110,30 160,90 C 210,150 230,15 270,10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  onMouseEnter={() => setHoveredPoint('곡선: y = x³ - 3x')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Tangent Line at x=2 */}
                <line
                  className="text-secondary hover:stroke-[3] transition-all cursor-pointer"
                  stroke="currentColor"
                  strokeDasharray="4 2"
                  strokeWidth="2"
                  x1="180"
                  x2="250"
                  y1="160"
                  y2="20"
                  onMouseEnter={() => setHoveredPoint('접선: y = 9x - 16')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Tangent Point (2, 2) */}
                <circle
                  className="fill-primary cursor-pointer hover:r-6 transition-all"
                  cx="218"
                  cy="80"
                  r="4.5"
                  onMouseEnter={() => setHoveredPoint('접점: (2, 2), 기울기 m = 9')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text className="fill-on-surface font-label-code text-[10px]" x="226" y="80">
                  접점 (2, 2)
                </text>

                {/* Real Y-intercept (0, -16) */}
                <circle
                  className="fill-secondary cursor-pointer hover:r-6 transition-all"
                  cx="160"
                  cy="155"
                  r="4"
                  onMouseEnter={() => setHoveredPoint('정답 y절편: (0, -16) [4사분면 아래]')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text className="fill-secondary font-label-code text-[10px] font-bold" x="96" y="158">
                  정답 y절편 (0, -16)
                </text>

                {/* Wrong Y-intercept (0, 16) marked as error */}
                <circle
                  className="fill-error cursor-pointer hover:r-6 transition-all"
                  cx="160"
                  cy="30"
                  r="4"
                  onMouseEnter={() => setHoveredPoint('오답: (0, 16) [기울기 양수 시 모순]')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                <text className="fill-error font-label-code text-[10px] font-bold line-through" x="96" y="32">
                  오답 (0, 16)
                </text>
              </svg>
              <span className="font-body-sm text-body-sm text-outline mt-1 text-center">
                기울기가 양수인 접선은 4사분면 아래쪽 y축과 만납니다.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interaction Action Bar (Persistent Action Dock) */}
      <div className="sticky bottom-0 left-0 right-0 bg-surface-container-lowest/95 backdrop-blur-md shadow-lg px-margin-desktop py-space-md z-30 flex flex-wrap items-center justify-between gap-space-md border-t border-surface-container-high/60">
        {/* Left status & prompt */}
        <div className="flex items-center gap-space-sm">
          <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">check</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-sm text-title-sm text-on-surface leading-tight font-semibold">
              오답 원인 파악을 완료했나요?
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              반복 계산 실수 방지를 위해 유사 문제를 즉시 풀어보세요.
            </span>
          </div>
        </div>

        {/* Right Interaction Action Buttons */}
        <div className="flex flex-wrap items-center gap-space-xs">
          {/* AI Tutor Prompt Button */}
          <button
            id="btn-ask-ai"
            type="button"
            onClick={() => setIsAiDrawerOpen(true)}
            className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors font-title-sm text-title-sm font-medium"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">forum</span>
            <span>AI에게 추가 질문</span>
          </button>

          {/* Twin Practice Problem Generator */}
          <button
            id="btn-gen-twin"
            type="button"
            onClick={handleTwinGenerate}
            className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container transition-all font-title-sm text-title-sm font-medium active:scale-95"
          >
            <span className="material-symbols-outlined text-secondary text-[18px]">content_copy</span>
            <span>유사 쌍둥이 문제 생성</span>
          </button>

          {/* Retest Current Problem */}
          <button
            id="btn-retry-problem"
            type="button"
            onClick={() => setIsRetryOpen(true)}
            className="inline-flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim transition-colors font-title-sm text-title-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">replay</span>
            <span>이 문제 다시 풀기</span>
          </button>

          {/* Mark as Solved / Complete Review */}
          <button
            id="btn-resolve-complete"
            type="button"
            onClick={handleResolveComplete}
            className={`inline-flex items-center gap-1.5 px-space-lg py-2.5 rounded-lg shadow-sm transition-all font-title-sm text-title-sm font-bold ${
              problem.isSolved
                ? 'bg-secondary text-on-secondary hover:bg-secondary/90'
                : 'bg-primary text-on-primary hover:bg-surface-tint'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {problem.isSolved ? 'check_circle' : 'task_alt'}
            </span>
            <span>{problem.isSolved ? '해결 완료됨' : '오답 해결 완료 체크'}</span>
          </button>
        </div>
      </div>

      {/* Slide-Over Drawer for "AI에게 추가 질문" */}
      <AiChatDrawer
        isOpen={isAiDrawerOpen}
        onClose={() => setIsAiDrawerOpen(false)}
        problem={problem}
        onNavigateToFullTutor={() => {
          setIsAiDrawerOpen(false);
          onNavigateToAiTutor();
        }}
      />

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
        twinProblems={problem.socraticData?.twinProblems}
        parentTitle={problem.chapter}
      />

      <RetryModal
        isOpen={isRetryOpen}
        onClose={() => setIsRetryOpen(false)}
        problem={problem}
        onMarkSolved={() => {
          if (!problem.isSolved) {
            onToggleSolved(problem.id);
          }
          showToast('오답 해결 완료로 등록되었습니다!');
        }}
      />

      <ConceptModal
        isOpen={isConceptOpen}
        onClose={() => setIsConceptOpen(false)}
      />
    </div>
  );
};
