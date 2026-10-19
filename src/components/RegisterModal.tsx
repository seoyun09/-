import React, { useState } from 'react';
import { Problem } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProblem: (newProb: Problem) => void;
  onOpenVideo?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onAddProblem,
  onOpenVideo,
}) => {
  const [activeStep, setActiveStep] = useState<'upload' | 'scanning' | 'success'>('upload');
  const [problemTitle, setProblemTitle] = useState('곡선 위의 접선과 y축 교점');
  const [subjectVal, setSubjectVal] = useState<'calc1' | 'calc2' | 'algebra' | 'prob'>('calc1');
  const [scanProgress, setScanProgress] = useState(0);

  if (!isOpen) return null;

  const handleStartScan = () => {
    setActiveStep('scanning');
    setScanProgress(15);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setActiveStep('success');
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  const handleFinish = () => {
    // Add sample problem to list
    const newProblem: Problem = {
      id: `Q${Math.floor(Math.random() * 80) + 20}`,
      title: problemTitle,
      subject: subjectVal,
      subjectName: subjectVal === 'calc1' ? '미적분Ⅰ' : subjectVal === 'calc2' ? '미적분Ⅱ' : '대수',
      chapter: '다항함수의 미분법과 활용',
      typeTag: '모의고사 신규 등록',
      points: 4,
      difficulty: '난이도 중상',
      questionText: `함수 f(x)에 대하여 x=1에서의 접선과 축의 교점 좌표를 계산하시오.`,
      submittedAnswer: '(0, 8)',
      correctAnswer: '(0, -8)',
      errorCategory: '계산 실수',
      reviewRound: '복습 1회차 (미해결)',
      isSolved: false,
      aiConfidence: '99.5%',
      rawScanImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKQW5b31-3sRp_FZWT9v8GCKxTuuif92Jc8yDIqymkjDJfbz-xYYrhJc4zuNfZPq_8DdfjOrKD36_sPixV3Yhymvrz_ZwUDEf366ja3W_fT1D6XHFhW8ks62AKd1INhOMYxRpDbeerfETsQq_1rfxOaM4YDFL0_M-13XhmrE5cNg2poU-H2tBHKPVKLTzsUxWRmH5rCx1qjxfkHgUW0TEjT8j1OdXkco6IEkq_kbq-sxW7Wx4kUXBp',
      ocrAccuracy: '98.9%',
      ocrSummary: '신규 오답 노트 손글씨 분석 완료',
      studentSteps: [
        {
          stepNum: 1,
          stepTitle: '1단계 • 도함수 미분',
          status: 'normal',
          statusLabel: '정상 연산',
          studentMath: "f'(1) = 6",
          explanation: '미분 연산 정상 완료',
        },
        {
          stepNum: 2,
          stepTitle: '2단계 • 직선식 정리 (오류 발생)',
          status: 'error',
          statusLabel: '부호 반전 오류',
          isErrorPoint: true,
          studentMath: 'y = 6x + 8 (오답)',
          correctMath: 'y = 6x - 8 (정답)',
          explanation: '절편 도출 과정에서 음수 부호 탈락',
          aiComment: '마지막 y절편 계산 시 음수 부호를 재점검하세요.',
        },
      ],
      errorPatternStats: {
        recentDays: 30,
        totalErrors: 13,
        breakdown: [
          { name: '부호 반전 실수', pct: 60, hint: '빈출 실수', isHigh: true },
          { name: '단순 계산', pct: 25, hint: '전개 착오' },
          { name: '조건 누락', pct: 15, hint: '정의역' },
        ],
      },
      optimalSolution: {
        recommendedTime: '권장 30초',
        targetAudience: '수능/내신',
        steps: [
          { stepNum: '01', text: "f'(1) = 6" },
          { stepNum: '02', text: '접선: y = 6x - 8, y절편 (0, -8)', highlight: true },
        ],
      },
      aiSpeedTip: {
        title: 'AI 꿀팁 • 다이렉트 y절편 공식',
        explanation: 'y_절편 = y₀ - x₀·f\'(x₀) 적용',
        formula: 'y_절편 = y₀ - x₀ · f\'(x₀)',
        appliedMath: 'y_절편 = -8',
        highlightText: '실전 즉시 적용 가능',
      },
      conceptReview: {
        title: '접선의 방정식 원리',
        points: ['접점 주어진 경우 공식 숙지', '기울기 양음 부호 체크'],
      },
    };

    onAddProblem(newProblem);
    onClose();
    setActiveStep('upload');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">add_circle</span>
            <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
              스마트 오답 등록 & AI 풀이 검토
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

        {/* Content */}
        <div className="p-6 flex flex-col gap-5 overflow-y-auto">
          {activeStep === 'upload' && (
            <>
              {/* Dropzone Simulation */}
              <div className="border-2 border-dashed border-primary/40 bg-surface-container-low rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 hover:border-primary transition-colors cursor-pointer group">
                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">photo_camera</span>
                </div>
                <div>
                  <p className="font-title-sm text-title-sm text-on-surface font-semibold">
                    손글씨 풀이 노트 사진 업로드 또는 카메라 촬영
                  </p>
                  <p className="font-body-sm text-[12px] text-on-surface-variant mt-1">
                    JPG, PNG, HEIC 지원 • AI가 손글씨 수식을 98%+ 정확도로 디지털화합니다.
                  </p>
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="px-2.5 py-1 bg-surface-container-lowest text-primary rounded-lg text-[11px] font-label-code font-bold shadow-xs">
                    노트 사진 샘플 자동 선택됨
                  </span>
                </div>
              </div>

              {onOpenVideo && (
                <div className="flex justify-end -mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenVideo();
                    }}
                    className="text-[12px] text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>촬영 및 실시간 OCR 스캔 영상 보기 (0:02)</span>
                  </button>
                </div>
              )}

              {/* Problem Metadata Inputs */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-label-bold text-on-surface-variant">
                    단원 과목
                  </label>
                  <select
                    value={subjectVal}
                    onChange={(e) => setSubjectVal(e.target.value as any)}
                    className="px-3 py-2 bg-surface-container-low border border-surface-container-high rounded-lg font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="calc1">미적분Ⅰ</option>
                    <option value="algebra">대수</option>
                    <option value="calc2">미적분Ⅱ</option>
                    <option value="prob">확률과 통계</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[12px] font-label-bold text-on-surface-variant">
                    문항 메모/제목
                  </label>
                  <input
                    type="text"
                    value={problemTitle}
                    onChange={(e) => setProblemTitle(e.target.value)}
                    placeholder="예: 3월 학평 14번 접선과 y절편"
                    className="px-3 py-2 bg-surface-container-low border border-surface-container-high rounded-lg font-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleStartScan}
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-title-sm text-title-sm hover:bg-surface-tint shadow-sm font-bold flex items-center justify-center gap-2 mt-2"
              >
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                <span>AI OCR 정밀 진단 분석 시작</span>
              </button>
            </>
          )}

          {activeStep === 'scanning' && (
            <div className="py-10 flex flex-col items-center justify-center text-center gap-4">
              <div className="relative w-20 h-20">
                <div className="w-20 h-20 rounded-full border-4 border-surface-container-high border-t-primary animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center font-label-code text-primary font-bold text-[14px]">
                  {scanProgress}%
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-title-sm text-title-sm text-on-surface font-bold">
                  {scanProgress < 40
                    ? '손글씨 획 및 수식 기호 인식 중...'
                    : scanProgress < 80
                    ? '단계별 연산 오류 및 부호 반전 지점 탐색 중...'
                    : 'AI 모범 풀이 및 10초 컷 꿀팁 생성 중...'}
                </span>
                <span className="font-body-sm text-[12px] text-outline">
                  수능/평가원 데이터베이스와 교차 검증을 진행합니다.
                </span>
              </div>
            </div>
          )}

          {activeStep === 'success' && (
            <div className="py-6 flex flex-col items-center text-center gap-4">
              <div className="w-14 h-14 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">check_circle</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-title-sm text-[18px] text-on-surface font-bold">
                  오답 등록 및 AI 진단 완료!
                </span>
                <p className="font-body-sm text-[13px] text-on-surface-variant max-w-sm">
                  손글씨 수식 100% 인식 완료. 3단계에서 발생한 부호 반전 오류를 감지하여 오답노트에 생성했습니다.
                </p>
              </div>
              <button
                type="button"
                onClick={handleFinish}
                className="w-full py-2.5 bg-primary text-on-primary rounded-xl font-title-sm text-title-sm hover:bg-surface-tint shadow-sm font-bold mt-2"
              >
                오답노트 및 풀이 검토로 이동하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
