import React from 'react';
import { USER_PROFILE } from '../mockData';

interface AnalyticsPageProps {
  onNavigateToReview: () => void;
  onNavigateToTutor: () => void;
  onOpenVideo?: () => void;
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  onNavigateToReview,
  onNavigateToTutor,
  onOpenVideo,
}) => {
  return (
    <div className="flex flex-col w-full select-none">
      <div className="px-margin-desktop py-space-lg flex flex-col gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/60">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-label-bold text-[18px]">
              <span className="material-symbols-outlined text-[24px]">insights</span>
            </div>
            <div>
              <span className="font-label-bold text-label-bold text-primary tracking-wider uppercase">
                Learning Analytics & Vulnerability
              </span>
              <h1 className="font-headline-md text-headline-md text-on-surface">
                김수학 학생의 맞춤형 오답 통계 & 취약점 정밀 리포트
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenVideo && (
              <button
                type="button"
                onClick={onOpenVideo}
                className="px-3 py-1.5 rounded-lg bg-primary-container/15 text-primary hover:bg-primary-container/25 text-[12px] font-title-sm font-semibold flex items-center gap-1.5 transition-colors border border-primary/20"
              >
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                <span>사용법 영상 보기</span>
              </button>
            )}
            <span className="font-label-code text-label-code bg-surface-container px-3 py-1.5 rounded-lg text-outline">
              분석 기간: 최근 30일 (총 18개 문항)
            </span>
          </div>
        </div>

        {/* Top 3 Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
          {/* Diagnostic 1: Error Causes (Video Step 5 Matched) */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[20px]">warning</span>
                발생 오류 원인 (Cause of Error)
              </span>
              <span className="font-label-code text-[11px] text-error font-bold">집중 관리</span>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              <div>
                <div className="flex justify-between text-[13px] font-medium mb-1">
                  <span className="text-on-surface">Calculation Error (계산 실수)</span>
                  <span className="text-error font-bold font-math-step">45%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full w-[45%]" />
                </div>
                <span className="text-[11px] text-outline mt-0.5 block">
                  부호 반전 및 이항 연산 실수 빈출 (영상 Step 5 반영)
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[13px] font-medium mb-1">
                  <span className="text-on-surface">Conceptual (개념 오적용)</span>
                  <span className="text-primary font-bold font-math-step">35%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full w-[35%]" />
                </div>
                <span className="text-[11px] text-outline mt-0.5 block">
                  수열 일반항 유도 및 초월함수 극한 조건 미숙지
                </span>
              </div>

              <div>
                <div className="flex justify-between text-[13px] font-medium mb-1">
                  <span className="text-on-surface">Careless (부주의 / 조건 누락)</span>
                  <span className="text-outline font-bold font-math-step">20%</span>
                </div>
                <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                  <div className="bg-outline h-full rounded-full w-[20%]" />
                </div>
                <span className="text-[11px] text-outline mt-0.5 block">
                  x=0 대입 시 음수 부호 탈락 및 분수 역수 착오
                </span>
              </div>
            </div>
          </div>

          {/* Diagnostic 2: Skill Breakdown Radar Chart (Video Step 5 Matched) */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col gap-space-sm items-center justify-between text-center">
            <div className="flex items-center justify-between w-full">
              <span className="font-title-sm text-title-sm text-on-surface font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">radar</span>
                영역별 밸런스 (Skill Breakdown)
              </span>
              <span className="font-label-code text-[11px] text-primary font-bold">5각 다이어그램</span>
            </div>

            {/* Radar SVG matching video 00:05 */}
            <div className="relative w-56 h-56 flex items-center justify-center my-2">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 160 160">
                {/* Background Web Grids */}
                <polygon points="80,20 140,65 118,135 42,135 20,65" fill="none" stroke="#e2e7ff" strokeWidth="2" />
                <polygon points="80,45 120,75 105,120 55,120 40,75" fill="none" stroke="#e2e7ff" strokeWidth="1.5" />
                <polygon points="80,65 100,80 92,105 68,105 60,80" fill="none" stroke="#e2e7ff" strokeWidth="1" />
                
                {/* Spoke Axes */}
                <line x1="80" y1="80" x2="80" y2="20" stroke="#dae2fd" strokeWidth="1" />
                <line x1="80" y1="80" x2="140" y2="65" stroke="#dae2fd" strokeWidth="1" />
                <line x1="80" y1="80" x2="118" y2="135" stroke="#dae2fd" strokeWidth="1" />
                <line x1="80" y1="80" x2="42" y2="135" stroke="#dae2fd" strokeWidth="1" />
                <line x1="80" y1="80" x2="20" y2="65" stroke="#dae2fd" strokeWidth="1" />

                {/* Student Score Polygon */}
                <polygon
                  points="80,28 132,70 108,128 48,124 32,68"
                  fill="rgba(37, 99, 235, 0.22)"
                  stroke="#004ac6"
                  strokeWidth="2.5"
                  className="transition-all duration-500 hover:fill-primary/30"
                />

                {/* Node Circles */}
                <circle cx="80" cy="28" r="3.5" fill="#004ac6" />
                <circle cx="132" cy="70" r="3.5" fill="#004ac6" />
                <circle cx="108" cy="128" r="3.5" fill="#004ac6" />
                <circle cx="48" cy="124" r="3.5" fill="#004ac6" />
                <circle cx="32" cy="68" r="3.5" fill="#004ac6" />

                {/* Labels */}
                <text x="80" y="12" textAnchor="middle" className="text-[11px] font-bold fill-primary font-label-code">Algebra (88)</text>
                <text x="146" y="68" className="text-[11px] font-bold fill-on-surface font-label-code">Geometry (75)</text>
                <text x="110" y="152" className="text-[11px] font-bold fill-secondary font-label-code">Statistics (90)</text>
                <text x="5" y="152" className="text-[11px] font-bold fill-outline font-label-code">Calculus (68)</text>
                <text x="-5" y="68" className="text-[11px] font-bold fill-on-surface font-label-code">Trig (78)</text>
              </svg>
            </div>

            <span className="text-[12px] text-outline">
              미적분(Calculus) 접선 단원 집중 보완 시 상위 2% 진입 가능
            </span>
          </div>

          {/* Diagnostic 3: AI Prescription & Video Link */}
          <div className="bg-gradient-to-br from-surface-container-lowest to-primary-fixed/20 p-space-lg rounded-xl shadow-xs border border-primary/20 flex flex-col justify-between">
            <div className="flex flex-col gap-2">
              <span className="font-title-sm text-title-sm text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                AI 튜터 맞춤 처방전
              </span>
              <p className="font-body-sm text-[13px] text-on-surface leading-relaxed">
                김수학 학생은 개념 이해력은 최상위권이나, <strong>접선 및 다항식 전개 3단계</strong>에서 부호(-)를 떨어뜨리는 버릇이 12회 연속 감지되었습니다.
              </p>
              <div className="bg-surface-container-lowest p-3 rounded-lg border border-primary/20 text-[12px] text-primary font-medium mt-1">
                👉 해결책: "접선 y절편 공식 y₀ - x₀·f'(x₀)" 암산 훈련 및 풀이 3단계 부호 재확인 체크리스트 실천
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onNavigateToReview}
                  className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-title-sm text-[12px] font-bold hover:bg-surface-tint shadow-xs text-center"
                >
                  Q14 복습하러 가기
                </button>
                <button
                  type="button"
                  onClick={onNavigateToTutor}
                  className="flex-1 py-2 bg-surface-container-high text-on-surface rounded-lg font-title-sm text-[12px] font-medium hover:bg-surface-container-highest text-center"
                >
                  소크라테스 질문
                </button>
              </div>

              {onOpenVideo && (
                <button
                  type="button"
                  onClick={onOpenVideo}
                  className="w-full py-2 bg-white/70 hover:bg-white text-primary rounded-lg font-title-sm text-[12px] font-semibold text-center border border-primary/20 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">play_circle</span>
                  <span>사용법 영상에서 분석 루틴 보기</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
