import React from 'react';
import { USER_PROFILE } from '../mockData';

export type NavTab = 'dashboard' | 'error-register' | 'error-review' | 'ai-tutor' | 'learning-analytics';

interface SidebarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  weeklySolved: number;
  weeklyGoal: number;
  onOpenSettings: () => void;
  onOpenGuide: () => void;
  onOpenVideo: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  weeklySolved,
  weeklyGoal,
  onOpenSettings,
  onOpenGuide,
  onOpenVideo,
}) => {
  const solveRate = Math.round((weeklySolved / weeklyGoal) * 100);

  const navItems = [
    { id: 'dashboard' as NavTab, label: '홈 (대시보드)', icon: 'dashboard' },
    { id: 'error-register' as NavTab, label: '오답 등록', icon: 'add_circle' },
    { id: 'error-review' as NavTab, label: '오답노트 & 풀이 검토', icon: 'menu_book' },
    { id: 'ai-tutor' as NavTab, label: 'AI 문제 질문', icon: 'psychology' },
    { id: 'learning-analytics' as NavTab, label: '학습 분석 & 취약점', icon: 'insights' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div 
          className="h-16 px-space-lg flex items-center gap-space-sm bg-surface-container-lowest cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => onTabChange('error-review')}
        >
          <img
            alt="Math Mate Logo"
            className="h-8 w-auto object-contain"
            src={USER_PROFILE.logo}
          />
          <div className="flex flex-col">
            <span className="font-title-sm text-title-sm text-primary tracking-tight font-bold">
              Math Mate
            </span>
            <span className="font-label-bold text-label-bold text-outline uppercase tracking-wider">
              AI Math Tutor
            </span>
          </div>
        </div>

        {/* User Card */}
        <div className="px-space-md py-space-sm">
          <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center gap-space-sm">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20"
              src={USER_PROFILE.avatar}
            />
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-title-sm text-on-surface truncate font-semibold">
                  {USER_PROFILE.name}
                </span>
                <span className="font-label-code text-label-code bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded-full font-bold">
                  {USER_PROFILE.grade}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                {USER_PROFILE.track}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-space-md py-space-xs space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-lg transition-colors font-body-md text-body-md text-left ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Progress & Quick Links */}
      <div className="p-space-md flex flex-col gap-space-sm bg-surface-container-lowest border-t border-surface-container-high/60">
        <div className="bg-surface-container p-space-md rounded-xl flex flex-col gap-space-xs">
          <div className="flex items-center justify-between text-on-surface">
            <span className="font-label-bold text-label-bold text-on-surface-variant">
              이번 주 오답 해결
            </span>
            <span className="font-label-code text-label-code text-primary font-bold">
              {solveRate}%
            </span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, solveRate)}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span>해결 완료</span>
            <span className="font-math-step text-math-step text-primary font-semibold">
              {weeklySolved} / {weeklyGoal}건
            </span>
          </div>
        </div>

        {/* Quick App Tutorial Video Button */}
        <button
          type="button"
          onClick={onOpenVideo}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-primary-container/10 border border-primary/25 text-primary hover:bg-primary-container/20 transition-all text-left shadow-2xs group"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform">
              play_circle
            </span>
            <span className="font-title-sm text-[12px] font-bold">어플 사용법 영상</span>
          </div>
          <span className="text-[10px] font-label-code bg-primary text-on-primary px-1.5 py-0.2 rounded font-bold">
            0:06
          </span>
        </button>

        <div className="flex items-center justify-between px-space-sm pt-space-xs">
          <button
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface transition-colors font-body-sm text-body-sm"
          >
            <span className="material-symbols-outlined text-[18px]">settings</span>
            <span>설정</span>
          </button>
          <button
            type="button"
            onClick={onOpenGuide}
            className="flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface transition-colors font-body-sm text-body-sm"
          >
            <span className="material-symbols-outlined text-[18px]">help</span>
            <span>가이드</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
