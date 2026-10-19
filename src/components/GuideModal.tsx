import React from 'react';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenVideo?: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose, onOpenVideo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">help</span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
              Math Mate 사용 가이드
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Video Tutorial Card in Guide */}
        {onOpenVideo && (
          <div className="px-6 pt-5">
            <div
              onClick={() => {
                onClose();
                onOpenVideo();
              }}
              className="p-4 rounded-xl bg-gradient-to-r from-primary to-surface-tint text-white flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">play_arrow</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold block">
                    어플 사용법 영상 보기 (0:06)
                  </span>
                  <span className="text-[11px] text-white/80">
                    "기록하고, 분석하고, 다시 도전하라" 6초 마스터 영상
                  </span>
                </div>
              </div>
              <span className="text-[11px] bg-white text-primary px-2.5 py-1 rounded-lg font-bold font-label-code shrink-0">
                영상 재생 →
              </span>
            </div>
          </div>
        )}

        <div className="p-6 flex flex-col gap-4 text-on-surface">
          <div className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[12px] shrink-0">
              1
            </span>
            <div>
              <span className="font-title-sm text-[14px] font-bold block">
                손글씨 풀이 OCR 자동 분석
              </span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                수학 노트를 사진으로 찍어 올리면 AI가 수식을 디지털 기호로 변환하고 1단계, 2단계, 3단계 중 정확한 오류 위치를 짚어냅니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-[12px] shrink-0">
              2
            </span>
            <div>
              <span className="font-title-sm text-[14px] font-bold block">
                소크라테스식 단계별 AI 코칭
              </span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                정답을 바로 알려주는 대신, "왜 그렇게 풀었는지" 질문하여 학생 스스로 개념과 수식을 도출하도록 돕습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="w-7 h-7 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-[12px] shrink-0">
              3
            </span>
            <div>
              <span className="font-title-sm text-[14px] font-bold block">
                유사 쌍둥이 문항 & 다시 풀기
              </span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                오답 원인을 파악한 직후 동일 유형 쌍둥이 문제를 풀고, 본 문제를 다시 채점하여 완벽히 극복했는지 검증합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container-high flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-primary text-on-primary rounded-lg text-[13px] font-bold hover:bg-surface-tint"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
};
