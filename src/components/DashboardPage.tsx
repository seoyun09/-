import React from 'react';
import { Problem } from '../types';
import { USER_PROFILE } from '../mockData';

interface DashboardPageProps {
  problems: Problem[];
  onSelectProblem: (id: string) => void;
  onNavigateToReview: () => void;
  onNavigateToTutor: () => void;
  onOpenRegister: () => void;
  weeklySolved: number;
  weeklyGoal: number;
  onOpenVideo: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  problems,
  onSelectProblem,
  onNavigateToReview,
  onNavigateToTutor,
  onOpenRegister,
  weeklySolved,
  weeklyGoal,
  onOpenVideo,
}) => {
  const solveRate = Math.round((weeklySolved / weeklyGoal) * 100);

  return (
    <div className="flex flex-col w-full select-none">
      <div className="px-margin-desktop py-space-lg flex flex-col gap-space-lg max-w-[1720px] mx-auto w-full">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-primary to-surface-tint rounded-2xl p-space-lg text-on-primary shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <img
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover ring-4 ring-white/20"
              src={USER_PROFILE.avatar}
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-[24px] font-bold">
                  {USER_PROFILE.name} 학생, 환영합니다!
                </span>
                <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-[11px] font-label-code font-bold">
                  {USER_PROFILE.grade}
                </span>
              </div>
              <p className="text-on-primary/80 font-body-sm text-[13px]">
                {USER_PROFILE.track} • 오늘의 추천 복습 문항을 해결하고 주간 목표를 달성하세요!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onOpenVideo}
              className="px-3.5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-title-sm text-title-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>사용법 영상 보기 (0:06)</span>
            </button>
            <button
              type="button"
              onClick={onOpenRegister}
              className="px-4 py-2.5 rounded-xl bg-surface-container-lowest text-primary hover:bg-white font-title-sm text-title-sm font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>새 오답 등록</span>
            </button>
            <button
              type="button"
              onClick={onNavigateToReview}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-title-sm text-title-sm font-semibold transition-colors"
            >
              오답노트 열기
            </button>
          </div>
        </div>

        {/* Featured App Tutorial Video Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs border border-surface-container-high/70 flex flex-col lg:flex-row items-center justify-between gap-5 relative overflow-hidden">
          <div className="flex items-center gap-4 flex-1">
            {/* Video Thumbnail with play icon */}
            <div
              onClick={onOpenVideo}
              className="relative w-44 sm:w-52 h-28 rounded-xl overflow-hidden bg-slate-900 shrink-0 cursor-pointer group shadow-md"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKQW5b31-3sRp_FZWT9v8GCKxTuuif92Jc8yDIqymkjDJfbz-xYYrhJc4zuNfZPq_8DdfjOrKD36_sPixV3Yhymvrz_ZwUDEf366ja3W_fT1D6XHFhW8ks62AKd1INhOMYxRpDbeerfETsQq_1rfxOaM4YDFL0_M-13XhmrE5cNg2poU-H2tBHKPVKLTzsUxWRmH5rCx1qjxfkHgUW0TEjT8j1OdXkco6IEkq_kbq-sxW7Wx4kUXBp"
                alt="App tutorial preview"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 justify-between">
                <span className="text-[10px] text-white font-label-code bg-black/60 px-1.5 py-0.5 rounded">
                  0:06 튜토리얼
                </span>
                <span className="text-[10px] text-secondary font-bold font-label-code">
                  HD
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-primary transition-all">
                  <span className="material-symbols-outlined text-[24px] ml-0.5">play_arrow</span>
                </div>
              </div>
            </div>

            {/* Video description & key points */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-label-bold text-[11px] text-primary bg-primary-fixed px-2 py-0.2 rounded-full uppercase">
                  공식 가이드 영상
                </span>
                <span className="text-[12px] font-bold text-on-surface">
                  Math Mate 스마트 오답 케어 1분 사용법
                </span>
              </div>
              <h3 className="font-headline-md text-[18px] text-on-surface font-bold">
                "기록하고, 분석하고, 다시 도전하라!"
              </h3>
              <p className="font-body-sm text-[13px] text-on-surface-variant max-w-xl leading-relaxed">
                노트 손글씨 수식 촬영 ➔ AI 레이저 OCR 스캔 ➔ 3단계 부호 반전 오류 검출 ➔ 소크라테스 힌트 로드맵 ➔ 5각 취약점 레이더 분석까지의 전체 루틴을 영상으로 확인하세요.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenVideo}
            className="px-5 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-surface-tint font-title-sm text-[13px] font-bold shadow-xs transition-all flex items-center gap-2 shrink-0 group active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
              play_circle
            </span>
            <span>사용법 영상 시청하기</span>
          </button>
        </div>

        {/* 4 Summary Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                이번 주 오답 해결률
              </span>
              <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center font-label-bold">
                <span className="material-symbols-outlined text-[18px]">trending_up</span>
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display-lg text-[32px] text-primary font-bold">{solveRate}%</span>
              <span className="font-body-sm text-secondary font-semibold text-[12px]">전주 대비 +12%p</span>
            </div>
            <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: `${solveRate}%` }} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                해결 / 목표 문항
              </span>
              <span className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-bold">
                <span className="material-symbols-outlined text-[18px]">task_alt</span>
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display-lg text-[32px] text-on-surface font-bold">{weeklySolved}</span>
              <span className="font-body-sm text-on-surface-variant text-[14px]">/ {weeklyGoal}건</span>
            </div>
            <span className="font-body-sm text-[12px] text-outline mt-3">
              목표까지 {Math.max(0, weeklyGoal - weeklySolved)}건 남음
            </span>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                최대 취약 오류 패턴
              </span>
              <span className="w-8 h-8 rounded-lg bg-error-container text-on-error-container flex items-center justify-center font-label-bold">
                <span className="material-symbols-outlined text-[18px]">error</span>
              </span>
            </div>
            <div className="mt-2 flex flex-col">
              <span className="font-headline-md text-[20px] text-error font-bold">부호 반전 실수</span>
              <span className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                전체 실수의 58% 차지
              </span>
            </div>
            <span className="font-label-code text-[11px] text-primary mt-2">
              집중 클리닉 훈련 세트 권장
            </span>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs border border-surface-container-high/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                AI 진단 정확도
              </span>
              <span className="w-8 h-8 rounded-lg bg-surface-container text-outline flex items-center justify-center font-label-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </span>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display-lg text-[32px] text-secondary font-bold">99.4%</span>
              <span className="font-body-sm text-outline text-[12px]">수능 DB 기반</span>
            </div>
            <span className="font-body-sm text-[12px] text-outline mt-3">
              OCR 수식 트리 정밀 파싱 중
            </span>
          </div>
        </div>

        {/* Problem Library / Today's Review List */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-surface-container-high/60 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">format_list_bulleted</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                오답 관리 목록 & 오늘 복습할 문제
              </h2>
            </div>
            <button
              type="button"
              onClick={onNavigateToReview}
              className="text-primary hover:underline font-body-sm text-body-sm flex items-center gap-1 font-semibold"
            >
              <span>전체 오답노트 보기</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="divide-y divide-surface-container-high/60">
            {problems.map((prob) => (
              <div
                key={prob.id}
                className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-surface-container-low/40 p-2 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 font-math-step font-bold text-[14px]">
                    {prob.id}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-label-code text-[11px] bg-primary-fixed text-on-primary-fixed px-2 py-0.2 rounded font-bold">
                        {prob.subjectName}
                      </span>
                      <span className="font-title-sm text-[14px] text-on-surface font-semibold">
                        {prob.chapter}
                      </span>
                      <span className="font-label-bold text-[11px] text-error bg-error-container/40 px-2 py-0.2 rounded">
                        {prob.errorCategory}
                      </span>
                      {prob.isSolved ? (
                        <span className="font-label-bold text-[11px] text-secondary bg-secondary-container/50 px-2 py-0.2 rounded flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[12px]">check</span> 해결됨
                        </span>
                      ) : (
                        <span className="font-label-bold text-[11px] text-outline bg-surface-container px-2 py-0.2 rounded">
                          {prob.reviewRound}
                        </span>
                      )}
                    </div>
                    <p className="font-body-sm text-[13px] text-on-surface-variant max-w-2xl line-clamp-1">
                      {prob.questionText}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProblem(prob.id);
                      onNavigateToTutor();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container font-title-sm text-[12px] flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    <span>AI 질문</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectProblem(prob.id);
                      onNavigateToReview();
                    }}
                    className="px-4 py-1.5 rounded-lg bg-primary text-on-primary hover:bg-surface-tint font-title-sm text-[12px] font-bold shadow-xs transition-colors"
                  >
                    풀이 검토 열기
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
