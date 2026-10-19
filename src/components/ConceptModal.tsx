import React from 'react';

interface ConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConceptModal: React.FC<ConceptModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">menu_book</span>
            <div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                미적분 핵심 개념서 • 다항함수의 접선의 방정식
              </h3>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                수능 및 내신 기출 빈출 유형 3대 패턴 총정리
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

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-surface text-on-surface">
          {/* Pattern 1 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-[15px] font-bold text-primary flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] flex items-center justify-center">1</span>
                유형 1: 곡선 위의 점 (a, f(a))가 주어질 때 (본 문항 유형)
              </span>
              <span className="text-[11px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded font-label-code font-bold">기본 필수</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-lg font-math-step text-math-step text-primary">
              y - f(a) = f'(a)(x - a)
            </div>
            <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              1) 함수를 미분하여 도함수 <span className="font-math-step">f'(x)</span>를 구합니다.<br/>
              2) 주어진 접점의 x좌표 <span className="font-math-step">x = a</span>를 대입하여 접선의 기울기 <span className="font-math-step">m = f'(a)</span>를 산출합니다.<br/>
              3) 직선의 방정식 공식을 적용합니다.
            </p>
          </div>

          {/* Pattern 2 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-[15px] font-bold text-secondary flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary text-[11px] flex items-center justify-center">2</span>
                유형 2: 접선의 기울기 m이 주어질 때
              </span>
              <span className="text-[11px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-label-code font-bold">자주 출제</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-lg font-math-step text-math-step text-secondary">
              f'(t) = m 을 만족하는 접점 t의 좌표 구하기
            </div>
            <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              접점의 좌표를 <span className="font-math-step">(t, f(t))</span>로 두고 방정식 <span className="font-math-step">f'(t) = m</span>을 풀어 접점 <span className="font-math-step">t</span>를 모두 구한 뒤 접선의 방정식을 각각 세웁니다.
            </p>
          </div>

          {/* Pattern 3 */}
          <div className="bg-surface-container-lowest p-5 rounded-xl border border-surface-container-high shadow-xs flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-[15px] font-bold text-tertiary flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-tertiary text-on-tertiary text-[11px] flex items-center justify-center">3</span>
                유형 3: 곡선 밖의 한 점 (x₁, y₁)에서 그은 접선
              </span>
              <span className="text-[11px] bg-error-container text-on-error-container px-2 py-0.5 rounded font-label-code font-bold">킬러/준킬러</span>
            </div>
            <div className="bg-surface-container-low p-3 rounded-lg font-math-step text-math-step text-tertiary">
              y₁ - f(t) = f'(t)(x₁ - t)
            </div>
            <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
              접점을 <span className="font-math-step">(t, f(t))</span>로 잡고 가상의 접선 식을 세운 뒤, 외부의 점 <span className="font-math-step">(x₁, y₁)</span>을 대입하여 <span className="font-math-step">t</span>에 대한 고차방정식을 풀어 해결합니다.
            </p>
          </div>

          {/* Speed Tip Box */}
          <div className="bg-gradient-to-r from-primary-fixed/30 to-secondary-fixed/30 p-4 rounded-xl border border-primary/20 flex flex-col gap-1.5">
            <span className="font-title-sm text-[14px] text-primary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              실전 수능 초스피드 암산 공식
            </span>
            <p className="font-body-sm text-[13px] text-on-surface">
              점 <span className="font-math-step">(x₀, y₀)</span>에서 그은 접선의 y절편: <span className="font-math-step font-bold text-primary">y_절편 = y₀ - x₀·f'(x₀)</span><br/>
              이를 활용하면 1차 전개 과정에서 발생하는 부호 반전 실수를 100% 방지할 수 있습니다!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container-high flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 bg-primary text-on-primary font-title-sm text-title-sm rounded-lg hover:bg-surface-tint transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
