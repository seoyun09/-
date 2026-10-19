import React, { useState } from 'react';

interface ScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  ocrAccuracy: string;
  problemId: string;
}

export const ScanModal: React.FC<ScanModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  ocrAccuracy,
  problemId,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showOcrBoxes, setShowOcrBoxes] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[22px]">photo_camera</span>
            <div>
              <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                제출된 학생 손글씨 원본 스캔 ({problemId})
              </h3>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                고해상도 광학 문자 인식(OCR) 분석 및 디지털 수식 매핑
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* OCR Toggle */}
            <button
              type="button"
              onClick={() => setShowOcrBoxes(!showOcrBoxes)}
              className={`px-3 py-1.5 rounded-lg font-label-code text-[12px] flex items-center gap-1.5 transition-colors ${
                showOcrBoxes
                  ? 'bg-primary text-on-primary font-semibold'
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">crop_free</span>
              OCR 영역 {showOcrBoxes ? 'ON' : 'OFF'}
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center bg-surface-container rounded-lg p-0.5">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.2))}
                className="p-1 text-on-surface-variant hover:text-on-surface rounded"
                title="축소"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <span className="font-label-code text-[11px] px-2 text-outline">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
                className="p-1 text-on-surface-variant hover:text-on-surface rounded"
                title="확대"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1 text-outline hover:text-on-surface rounded ml-1"
                title="배율 초기화"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors ml-2"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Modal Body / Image Viewer */}
        <div className="flex-1 p-6 overflow-auto bg-surface flex items-center justify-center min-h-[380px] relative">
          <div
            className="relative transition-transform duration-200 ease-out max-w-full rounded-xl overflow-hidden shadow-md"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={imageUrl}
              alt="Handwriting raw scan"
              className="max-h-[55vh] object-contain w-auto block select-none pointer-events-none"
            />

            {/* Simulated OCR Bounding Overlays */}
            {showOcrBoxes && (
              <>
                <div className="absolute top-[18%] left-[8%] border-2 border-secondary bg-secondary/15 rounded px-2 py-1 flex items-center gap-1 shadow-sm animate-pulse">
                  <span className="bg-secondary text-on-secondary text-[10px] font-label-code px-1 rounded">정상 연산 99.2%</span>
                  <span className="font-math-step text-[12px] text-on-surface font-bold bg-white/80 px-1 rounded">f'(x) = 3x² - 3</span>
                </div>

                <div className="absolute top-[45%] left-[12%] border-2 border-secondary bg-secondary/15 rounded px-2 py-1 flex items-center gap-1 shadow-sm">
                  <span className="bg-secondary text-on-secondary text-[10px] font-label-code px-1 rounded">정상 수립 98.8%</span>
                  <span className="font-math-step text-[12px] text-on-surface font-bold bg-white/80 px-1 rounded">y - 2 = 9(x - 2)</span>
                </div>

                <div className="absolute top-[70%] left-[18%] border-2 border-error bg-error/20 rounded px-2 py-1.5 flex items-center gap-1 shadow-md">
                  <span className="bg-error text-on-error text-[10px] font-label-bold px-1.5 rounded uppercase">부호 반전 오류 감지</span>
                  <span className="font-math-step text-[13px] text-error font-bold bg-white px-1.5 rounded underline decoration-wavy">y = 9(0) + 16</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-label-code text-label-code bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              OCR 감지 정확도 {ocrAccuracy}
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              손글씨 파서가 수식 기호, 등호(=), 음수 부호(-)를 노드 단위로 분해 검증했습니다.
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-on-primary font-title-sm text-title-sm rounded-lg hover:bg-surface-tint transition-colors"
          >
            확인 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
