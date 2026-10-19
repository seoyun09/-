import React, { useState } from 'react';
import { SubjectType } from '../types';
import { USER_PROFILE } from '../mockData';

interface HeaderProps {
  currentSubject: SubjectType;
  onSelectSubject: (subject: SubjectType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenRegisterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSubject,
  onSelectSubject,
  searchQuery,
  onSearchChange,
  onOpenRegisterModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const subjects: Array<{ id: SubjectType; label: string }> = [
    { id: 'all', label: '전체' },
    { id: 'algebra', label: '대수' },
    { id: 'calc1', label: '미적분Ⅰ' },
    { id: 'calc2', label: '미적분Ⅱ' },
    { id: 'prob', label: '확률과 통계' },
  ];

  const notifications = [
    {
      id: 1,
      title: 'Q14 접선의 방정식 복습 권장',
      desc: '부호 반전 실수 취약점 극복을 위한 2회차 복습 알림입니다.',
      time: '10분 전',
      unread: true,
    },
    {
      id: 2,
      title: '새로운 유사 쌍둥이 문제 3문항 도착',
      desc: '수열의 합과 일반항 단원의 난이도별 쌍둥이 문제가 생성되었습니다.',
      time: '1시간 전',
      unread: true,
    },
    {
      id: 3,
      title: '주간 오답 분석 리포트 발행',
      desc: '이번 주 계산 실수율이 12% 감소했습니다. 통계를 확인하세요.',
      time: '어제',
      unread: true,
    },
  ];

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      <div className="h-16 w-full px-margin-desktop flex items-center justify-between gap-space-md">
        {/* Left Search & Subject Filter Bar */}
        <div className="flex items-center gap-space-md flex-1">
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-space-md py-1.5 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary transition-all"
              placeholder="문제 키워드, 단원, 유형 검색..."
              type="text"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-[14px]"
              >
                ✕
              </button>
            )}
          </div>

          <nav className="hidden xl:flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
            {subjects.map((s) => {
              const active = currentSubject === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelectSubject(s.id)}
                  className={`px-space-sm py-1 rounded-md font-body-sm text-body-sm transition-colors ${
                    active
                      ? 'bg-primary text-on-primary font-medium shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right CTA, Notification & Profile */}
        <div className="flex items-center gap-space-md">
          <button
            type="button"
            onClick={onOpenRegisterModal}
            className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-lg bg-primary text-on-primary hover:bg-surface-tint font-title-sm text-title-sm transition-colors shadow-sm active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>오답 등록하기</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative flex items-center">
            <button
              aria-label="오답 복습 알림"
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (unreadCount > 0) setUnreadCount(0);
              }}
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-tertiary text-on-tertiary font-label-bold text-[10px] rounded-full flex items-center justify-center leading-none">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-high py-2 z-50">
                <div className="px-4 py-2 border-b border-surface-container-high flex items-center justify-between">
                  <span className="font-title-sm text-title-sm text-on-surface">알림</span>
                  <span className="text-[11px] text-primary font-label-code">모두 읽음</span>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-surface-container-high/60">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 hover:bg-surface-container-low transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="font-title-sm text-[13px] text-on-surface font-semibold">{n.title}</span>
                        <span className="font-label-code text-[10px] text-outline">{n.time}</span>
                      </div>
                      <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Header Profile Pill */}
          <div className="flex items-center gap-space-sm pl-space-xs border-l border-surface-container-high/70">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              src={USER_PROFILE.avatar}
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="font-title-sm text-title-sm text-on-surface leading-tight font-semibold">
                {USER_PROFILE.name}
              </span>
              <span className="font-label-bold text-label-bold text-outline">온라인 학습중</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
