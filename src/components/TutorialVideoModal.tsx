import React, { useState, useEffect } from 'react';

interface TutorialVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Scene {
  time: number; // in seconds
  title: string;
  badge: string;
  description: string;
  tagline: string;
}

const SCENES: Scene[] = [
  {
    time: 0,
    title: '수학 문제 앞에서 막막할 때',
    badge: 'STEP 0 • 고민 해소',
    description: '풀리지 않는 고난도 수학 문제, 혼자 끙끙 앓지 말고 Math Mate를 켜보세요.',
    tagline: '언제 어디서나 든든한 1:1 AI 수학 과외 선생님',
  },
  {
    time: 1,
    title: '손글씨 수식 촬영 & 고민 유형 선택',
    badge: 'STEP 1 • 문항 스캔 & 의도 파악',
    description: '노트에 푼 문제 영역을 지정하고, 어떤 도움이 필요한지 선택합니다.',
    tagline: 'Understanding Concepts • Calculation Errors • Advanced Types',
  },
  {
    time: 2,
    title: '초정밀 OCR 수식 레이저 스캔',
    badge: 'STEP 2 • 실시간 OCR 인식',
    description: '스마트폰 카메라가 손글씨 풀이 과정을 획 단위로 분석하여 디지털 수식으로 변환합니다.',
    tagline: '인식 정확도 98.7% • 적분/미분/수열 완벽 판독',
  },
  {
    time: 3,
    title: '오류 지점 포착 & 더 나은 풀이 제안',
    badge: 'STEP 3 • AI 맞춤 처방',
    description: '어느 단계에서 계산 실수가 났는지 짚어주고, 10초 컷 다이렉트 공식을 제공합니다.',
    tagline: '아이디어가 떠오르지 않는 시험시간에 꼭 필요한 꿀팁',
  },
  {
    time: 4,
    title: '풀이 중 막힐 땐 단계별 힌트 로드맵',
    badge: 'STEP 4 • 소크라테스 힌트',
    description: '정답만 알려주는 대신, 힌트 1, 2, 3을 스스로 열어가며 논리를 완성합니다.',
    tagline: '힌트 1 (관계식) → 힌트 2 (대입 팁) → 힌트 3 (검증 조건)',
  },
  {
    time: 5,
    title: '학습 취약점 5각 레이더 분석 리포트',
    badge: 'STEP 5 • 정밀 분석',
    description: 'Algebra, Geometry, Statistics 등 과목 밸런스와 오답 원인을 시각화합니다.',
    tagline: '계산 실수(45%), 개념 부족(35%), 부주의(20%) 완벽 추적',
  },
  {
    time: 6,
    title: '기록하고, 분석하고, 다시 도전하라!',
    badge: 'STEP 6 • 오답 극복 완료',
    description: '체계적인 복습 루틴으로 반복되는 계산 실수를 100% 극복하고 1등급으로 도약하세요.',
    tagline: 'Math Mate • AI Math Tutor',
  },
];

export const TutorialVideoModal: React.FC<TutorialVideoModalProps> = ({ isOpen, onClose }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scanLaserPos, setScanLaserPos] = useState(15);

  const duration = 6;

  // Auto-playing scene loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          return 0;
        }
        return prev + 1;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying]);

  // Animated scan line in Step 2
  useEffect(() => {
    if (currentTime !== 2) return;
    const interval = setInterval(() => {
      setScanLaserPos((p) => (p >= 85 ? 15 : p + 4));
    }, 50);
    return () => clearInterval(interval);
  }, [currentTime]);

  if (!isOpen) return null;

  const currentScene = SCENES[currentTime] || SCENES[0];

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-4xl w-full max-h-[94vh] flex flex-col overflow-hidden border border-surface-container-high/80">
        {/* Header */}
        <div className="px-5 py-3.5 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">smart_display</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                  Math Mate 어플 사용법 가이드 영상
                </h3>
                <span className="text-[10px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-label-code font-bold">
                  공식 튜토리얼
                </span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant">
                기록하고, 분석하고, 다시 도전하는 6단계 스마트 오답 케어 루틴
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

        {/* Video Canvas / Screen Simulation Workspace */}
        <div className="flex-1 bg-surface-dim/40 p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-3xl items-center">
            
            {/* Left: Smartphone Display Simulation matching video frames (5 cols) */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-[240px] sm:w-[260px] h-[480px] bg-black rounded-[36px] p-2.5 shadow-2xl border-4 border-slate-700/80 ring-1 ring-white/10 flex flex-col overflow-hidden">
                {/* Phone Speaker & Camera Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
                </div>

                {/* Inner Screen Content */}
                <div className="relative w-full h-full bg-surface-container-lowest rounded-[28px] overflow-hidden flex flex-col justify-between pt-6 pb-3 px-3">
                  
                  {/* Top Phone Status Bar */}
                  <div className="flex items-center justify-between text-[10px] text-on-surface-variant px-1 mb-1 font-label-code">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">signal_cellular_alt</span>
                      <span className="material-symbols-outlined text-[12px]">wifi</span>
                      <span className="material-symbols-outlined text-[12px]">battery_full</span>
                    </div>
                  </div>

                  {/* FRAME 0 (00:00): Math Mate Logo & Intro Screen */}
                  {currentTime === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-3 animate-in zoom-in-95 duration-300">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-3 shadow-inner">
                        <span className="text-[32px] font-bold text-primary">√x</span>
                      </div>
                      <h4 className="font-headline-md text-[20px] font-bold text-primary">Math Mate</h4>
                      <p className="font-label-bold text-[10px] text-outline uppercase tracking-wider mt-0.5">
                        AI Math Tutor
                      </p>
                      <div className="mt-6 p-2 rounded-xl bg-error-container/40 text-on-error-container text-[11px] leading-tight font-medium">
                        "아... 또 계산 실수로 틀렸네..." 😥
                      </div>
                      <span className="text-[10px] text-primary mt-4 font-semibold animate-pulse">
                        카메라를 켜서 노트를 찍어보세요!
                      </span>
                    </div>
                  )}

                  {/* FRAME 1 (00:01): Handwritten Calculus Capture & Needs Options */}
                  {currentTime === 1 && (
                    <div className="flex-1 flex flex-col justify-between p-1 animate-in fade-in duration-300">
                      <div className="text-center pb-1 border-b border-surface-container-high">
                        <span className="text-[11px] font-bold text-primary">풀이 진단</span>
                      </div>
                      <div className="bg-surface-container-low p-2 rounded-xl my-1 relative border border-dashed border-primary">
                        <span className="text-[10px] text-outline block">1) Calculus I</span>
                        <div className="font-math-step text-[11px] text-on-surface leading-tight mt-1">
                          ∫ (dx - 1/2)² + 2 dx <br/>
                          = (3x² - 5x + 2) dx
                        </div>
                        <div className="absolute top-1 right-1 bg-primary text-white text-[9px] px-1.5 py-0.2 rounded font-bold">
                          선택 영역
                        </div>
                      </div>
                      <div className="bg-surface-container p-2.5 rounded-xl flex flex-col gap-1.5 shadow-sm">
                        <span className="text-[10px] font-bold text-on-surface">What do you need help with?</span>
                        <div className="py-1 px-2 rounded-lg bg-surface-container-lowest text-[10px] text-on-surface-variant font-medium">
                          Understanding Concepts
                        </div>
                        <div className="py-1 px-2 rounded-lg bg-primary text-on-primary text-[10px] font-bold flex items-center justify-between">
                          <span>Calculation Errors</span>
                          <span className="material-symbols-outlined text-[12px]">check</span>
                        </div>
                        <div className="py-1 px-2 rounded-lg bg-surface-container-lowest text-[10px] text-on-surface-variant font-medium">
                          Advanced Types
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FRAME 2 (00:02): Live Laser OCR Scanning */}
                  {currentTime === 2 && (
                    <div className="flex-1 relative rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-container-high flex flex-col p-2 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between text-[10px] text-outline pb-1 border-b">
                        <span>실시간 OCR 스캔 중...</span>
                        <span className="text-primary font-bold">98.7%</span>
                      </div>
                      <div className="font-math-step text-[12px] text-on-surface mt-2 space-y-1">
                        <div>Calculus I</div>
                        <div>∫ (dx - 1/2) + 2 dx</div>
                        <div className="text-secondary font-bold">x = 2(x-2)² / (x-1)²</div>
                        <div className="text-error font-bold bg-error-container/40 px-1 rounded">
                          = 4(3x - 12)  [부호 오류]
                        </div>
                        <div>= (3x - 33) / 0 = 0</div>
                      </div>

                      {/* Moving Laser Scanner Line */}
                      <div
                        className="absolute left-0 right-0 h-1 bg-secondary shadow-[0_0_12px_#006c49] transition-all duration-75 flex items-center justify-end px-2"
                        style={{ top: `${scanLaserPos}%` }}
                      >
                        <span className="text-[8px] bg-secondary text-white px-1 rounded-full uppercase tracking-tighter">
                          Scanning
                        </span>
                      </div>

                      <div className="mt-auto bg-surface-container-low p-1.5 rounded-lg text-center">
                        <span className="text-[10px] text-primary font-bold">
                          부호 반전 오류 위치 감지 완료!
                        </span>
                      </div>
                    </div>
                  )}

                  {/* FRAME 3 (00:03): "더 나은 풀이" Lightbulb Card */}
                  {currentTime === 3 && (
                    <div className="flex-1 flex flex-col justify-center items-center p-2 text-center animate-in zoom-in-95 duration-300">
                      <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-2 shadow-sm animate-bounce">
                        <span className="material-symbols-outlined text-[24px]">lightbulb</span>
                      </div>
                      <span className="font-title-sm text-[15px] font-bold text-on-surface">
                        더 나은 풀이
                      </span>
                      <p className="text-[11px] text-on-surface-variant mt-1.5 leading-snug px-1">
                        아이디어가 떠오르지 않는 시험시간에, <strong>대입과 도함수를 활용하는 다이렉트 팁</strong>을 알려드립니다.
                      </p>
                      <div className="w-full bg-primary-fixed/40 p-2 rounded-xl mt-3 text-left">
                        <span className="text-[10px] font-bold text-primary block">AI 꿀팁 공식:</span>
                        <span className="font-math-step text-[11px] text-primary font-bold">
                          y_절편 = y₀ - x₀ · f'(x₀)
                        </span>
                      </div>
                      <span className="text-[10px] text-secondary font-semibold mt-2">
                        ⇒ 1단계 후 단 1줄 암산으로 부호 실수 방지!
                      </span>
                    </div>
                  )}

                  {/* FRAME 4 (00:04): Step-by-step Hints (풀이 중 막힘) */}
                  {currentTime === 4 && (
                    <div className="flex-1 flex flex-col justify-between p-1 animate-in fade-in duration-300">
                      <div className="text-center pb-1 border-b border-surface-container-high flex items-center justify-between">
                        <span className="text-[11px] font-bold text-on-surface">풀이 중 막힘</span>
                        <span className="text-[10px] text-secondary font-bold">3단계 힌트</span>
                      </div>
                      <div className="flex flex-col gap-1.5 my-1">
                        <div className="p-1.5 rounded-lg bg-secondary-container/40 border border-secondary/20 text-left">
                          <span className="text-[10px] font-bold text-secondary block">힌트 1</span>
                          <span className="text-[10px] text-on-surface">기울기 m = f'(a) 먼저 계산</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-primary-container/20 border border-primary/20 text-left">
                          <span className="text-[10px] font-bold text-primary block">힌트 2</span>
                          <span className="text-[10px] text-on-surface">지나는 점 (x₁, y₁) 대입 전개</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-surface-container text-left">
                          <span className="text-[10px] font-bold text-outline block">힌트 3</span>
                          <span className="text-[10px] text-on-surface-variant">x=0 대입 시 음수 부호 주의</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-xl bg-surface-container-high text-center">
                        <button type="button" className="text-[11px] font-bold text-primary">
                          스스로 풀기 재도전 →
                        </button>
                      </div>
                    </div>
                  )}

                  {/* FRAME 5 (00:05): Learning Analysis Radar & Cause of Error */}
                  {currentTime === 5 && (
                    <div className="flex-1 flex flex-col justify-between p-1 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between pb-1 border-b text-[10px] font-bold">
                        <span>Learning Analysis</span>
                        <span className="text-primary">Step 5 of 5</span>
                      </div>

                      {/* Radar polygon graphic */}
                      <div className="flex flex-col items-center py-1">
                        <span className="text-[10px] font-bold text-on-surface">Skill Breakdown</span>
                        <svg className="w-24 h-24 my-0.5" viewBox="0 0 100 100">
                          {/* Background web polygon */}
                          <polygon points="50,10 90,38 75,85 25,85 10,38" fill="none" stroke="#dae2fd" strokeWidth="1.5" />
                          <polygon points="50,25 78,44 68,76 32,76 22,44" fill="none" stroke="#dae2fd" strokeWidth="1" />
                          {/* Student skill score */}
                          <polygon points="50,15 82,42 70,82 28,78 18,40" fill="rgba(37,99,235,0.25)" stroke="#004ac6" strokeWidth="2" />
                          <text x="50" y="8" textAnchor="middle" className="text-[7px] fill-on-surface-variant font-bold">Algebra</text>
                          <text x="92" y="38" className="text-[7px] fill-on-surface-variant font-bold">Geometry</text>
                          <text x="65" y="95" className="text-[7px] fill-on-surface-variant font-bold">Statistics</text>
                          <text x="5" y="40" className="text-[7px] fill-on-surface-variant font-bold">Trig</text>
                        </svg>
                      </div>

                      {/* Cause of Error breakdown */}
                      <div className="bg-surface-container-low p-1.5 rounded-lg flex flex-col gap-1 text-[9px]">
                        <div className="flex justify-between">
                          <span className="text-on-surface font-semibold">Calculation Error</span>
                          <span className="text-error font-bold">45%</span>
                        </div>
                        <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                          <div className="bg-error h-full rounded-full w-[45%]" />
                        </div>

                        <div className="flex justify-between">
                          <span className="text-on-surface font-semibold">Conceptual</span>
                          <span className="text-primary font-bold">35%</span>
                        </div>
                        <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                          <div className="bg-primary h-full rounded-full w-[35%]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* FRAME 6 (00:06): Final Brand Slogan Screen */}
                  {currentTime === 6 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-3 animate-in zoom-in-95 duration-300">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center mb-2 shadow-md">
                        <span className="material-symbols-outlined text-[28px]">school</span>
                      </div>
                      <span className="text-[11px] font-bold text-outline">Math Mate</span>
                      <h4 className="font-headline-md text-[16px] font-bold text-on-surface mt-1 leading-snug">
                        기록하고, 분석하고, <br/>다시 도전하라!
                      </h4>
                      <p className="text-[10px] text-on-surface-variant mt-2">
                        오답 원인 정밀 분석으로 <br/>수학 1등급을 완성하세요.
                      </p>
                      <div className="mt-4 px-3 py-1 bg-primary text-on-primary rounded-full text-[10px] font-bold shadow-xs">
                        지금 바로 시작하기
                      </div>
                    </div>
                  )}

                  {/* Bottom Phone Bar */}
                  <div className="w-16 h-1 bg-slate-300 rounded-full mx-auto mt-1"></div>
                </div>
              </div>
            </div>

            {/* Right: Detailed Context & Interactive Scene Stepper (7 cols) */}
            <div className="md:col-span-7 flex flex-col gap-4">
              {/* Scene Information Card */}
              <div className="bg-surface-container-lowest p-5 rounded-2xl border border-surface-container-high shadow-xs flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-label-bold text-[11px] text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full font-bold">
                    {currentScene.badge}
                  </span>
                  <span className="font-label-code text-[12px] text-outline font-bold">
                    00:0{currentTime} / 00:0{duration}
                  </span>
                </div>

                <h3 className="font-headline-md text-[20px] text-on-surface font-bold mt-1">
                  {currentScene.title}
                </h3>

                <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                  {currentScene.description}
                </p>

                <div className="mt-2 p-3 bg-surface-container-low rounded-xl border border-surface-container-high/60 flex items-center gap-2 text-primary font-medium text-[13px]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>{currentScene.tagline}</span>
                </div>
              </div>

              {/* Timeline Scrubber */}
              <div className="flex flex-col gap-2 bg-surface-container-lowest p-4 rounded-xl border border-surface-container-high shadow-xs">
                <div className="flex items-center justify-between text-[12px] font-semibold text-on-surface">
                  <span>단계별 장면 이동</span>
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex items-center gap-1 text-primary hover:underline text-[12px]"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                    <span>{isPlaying ? '자동 재생 중' : '재생'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1.5 pt-1">
                  {SCENES.map((sc, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSeek(idx)}
                      className={`py-1.5 px-1 rounded-lg text-center font-label-code text-[11px] transition-all flex flex-col items-center ${
                        currentTime === idx
                          ? 'bg-primary text-on-primary font-bold shadow-xs scale-102'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      <span>0{idx}s</span>
                      <span className="text-[9px] opacity-80 truncate w-full">
                        {idx === 0 ? '고민' : idx === 1 ? '촬영' : idx === 2 ? '스캔' : idx === 3 ? '진단' : idx === 4 ? '힌트' : idx === 5 ? '분석' : '극복'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSeek(Math.max(0, currentTime - 1))}
                  className="px-3 py-2 bg-surface-container text-on-surface rounded-xl hover:bg-surface-container-high font-body-sm text-[13px] flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">skip_previous</span>
                  <span>이전 단계</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSeek(Math.min(duration, currentTime + 1))}
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl hover:bg-surface-tint font-title-sm text-[13px] font-bold flex items-center gap-1 shadow-xs transition-colors flex-1 justify-center"
                >
                  <span>다음 단계 보기</span>
                  <span className="material-symbols-outlined text-[16px]">skip_next</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-surface-container-high text-on-surface rounded-xl hover:bg-surface-container-highest font-title-sm text-[13px]"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-[12px] text-on-surface-variant">
          <span>💡 팁: 번호 버튼을 눌러 원하는 단계(촬영, OCR 스캔, 힌트 로드맵, 학습 분석)로 즉시 이동할 수 있습니다.</span>
          <span className="font-label-code text-primary font-bold">Math Mate Studio</span>
        </div>
      </div>
    </div>
  );
};
