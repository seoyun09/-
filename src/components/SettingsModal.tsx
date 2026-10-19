import React, { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  weeklyGoal: number;
  onUpdateGoal: (newGoal: number) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  weeklyGoal,
  onUpdateGoal,
}) => {
  const [goal, setGoal] = useState(weeklyGoal);
  const [aiSpeedMode, setAiSpeedMode] = useState(true);
  const [autoOcr, setAutoOcr] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">settings</span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">환경 설정</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="p-6 flex flex-col gap-4 text-on-surface">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-semibold">주간 오답 해결 목표 (문항 수)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="5"
                max="50"
                value={goal}
                onChange={(e) => setGoal(Number(e.target.value))}
                className="w-24 px-3 py-1.5 bg-surface-container-low border border-surface-container-high rounded-lg font-math-step text-math-step focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <span className="text-[13px] text-outline">문항 / 주</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-surface-container-high/60">
            <div>
              <span className="text-[13px] font-semibold block">초고속 소크라테스 코칭 (~0.4s)</span>
              <span className="text-[11px] text-outline">초저지연 수학 엔진 추론 활성화</span>
            </div>
            <input
              type="checkbox"
              checked={aiSpeedMode}
              onChange={(e) => setAiSpeedMode(e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-t border-surface-container-high/60">
            <div>
              <span className="text-[13px] font-semibold block">손글씨 수식 자동 OCR 인식</span>
              <span className="text-[11px] text-outline">사진 업로드 즉시 디지털 수식 변환</span>
            </div>
            <input
              type="checkbox"
              checked={autoOcr}
              onChange={(e) => setAutoOcr(e.target.checked)}
              className="w-4 h-4 text-primary rounded"
            />
          </div>
        </div>

        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container-high flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-container text-on-surface rounded-lg text-[13px]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={() => {
              onUpdateGoal(goal);
              onClose();
            }}
            className="px-4 py-1.5 bg-primary text-on-primary rounded-lg text-[13px] font-bold"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};
