import React, { useState } from 'react';
import { Problem } from '../types';

interface AiChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  problem: Problem;
  onNavigateToFullTutor: () => void;
}

interface DrawerMessage {
  id: string;
  sender: 'ai' | 'student';
  text: string;
  time: string;
}

export const AiChatDrawer: React.FC<AiChatDrawerProps> = ({
  isOpen,
  onClose,
  problem,
  onNavigateToFullTutor,
}) => {
  const [messages, setMessages] = useState<DrawerMessage[]>([
    {
      id: 'd1',
      sender: 'ai',
      text: `안녕하세요 김수학 학생! ${problem.id} ${problem.chapter} 문제에서 부호 반전 실수가 있었군요. 어떤 부분이 더 궁금하신가요?`,
      time: '오후 4:32',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const samplePrompts = [
    '왜 접선의 y절편 공식이 y₀ - x₀·f\'(x₀) 가 되나요?',
    'x절편을 빠르게 구하는 공식도 있나요?',
    '실전 시험에서 부호 실수를 줄이는 실질적인 팁이 있나요?',
  ];

  const handleSendPrompt = (text: string) => {
    if (!text.trim()) return;

    const userMsg: DrawerMessage = {
      id: Date.now().toString(),
      sender: 'student',
      text,
      time: '방금',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Generate responsive AI response
    setTimeout(() => {
      let aiResponseText = '';
      if (text.includes('왜 접선의 y절편 공식')) {
        aiResponseText = `좋은 질문이에요! 직선의 방정식 y - y₀ = m(x - x₀) 에서 y절편은 x = 0일 때의 y값입니다.\n\nx=0을 대입하면:\ny - y₀ = m(0 - x₀) = -m·x₀\n양변에 y₀를 더하면:\ny = y₀ - m·x₀ 가 됩니다.\n\n여기서 기울기 m이 바로 도함수 값 f'(x₀)이므로 y_절편 = y₀ - x₀·f'(x₀) 가 정확히 성립합니다! 이 공식을 외워두면 괄호 전개 도중 부호 실수를 원천 방지할 수 있습니다.`;
      } else if (text.includes('x절편')) {
        aiResponseText = `x절편은 y = 0일 때의 x값이므로:\n0 - y₀ = m(x - x₀)\n-y₀ / m = x - x₀\n따라서 x_절편 = x₀ - y₀ / f'(x₀) (단, f'(x₀) ≠ 0) 입니다! 뉴턴-랩슨(Newton-Raphson) 근사법의 핵심 기본 원리이기도 합니다.`;
      } else if (text.includes('부호 실수')) {
        aiResponseText = `부호 실수를 줄이는 3대 실전 팁:\n1. 이항할 때 부호를 즉시 동그라미 치는 습관 들이기\n2. 괄호 앞에 마이너스(-)가 있을 때 분배법칙을 한 번에 암산하지 말고 1줄 더 적기\n3. 답안지에 적기 직전 그래프 개형(기울기가 양수인지 음수인지, 절편이 x축 위인지 아래인지)을 1초 눈으로 대조하기!`;
      } else {
        aiResponseText = `질문하신 "${text}"에 대해 분석했습니다.\n이 문제에서는 접선의 기울기 m=9와 점 (2,2)를 사용해 y=9x-16을 구한 후, x=0을 대입할 때 y=-16이 되는 음수 부호 처리가 핵심입니다. 추가 질문이 있으시면 언제든 물어보세요!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiResponseText,
          time: '방금',
        },
      ]);
    }, 450);
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-50 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-surface-container-lowest shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-space-md bg-surface-container flex items-center justify-between border-b border-surface-container-high/60">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">psychology</span>
            </div>
            <div>
              <span className="font-title-sm text-title-sm text-on-surface font-bold block leading-none">
                Math Mate AI 튜터
              </span>
              <span className="text-[11px] text-primary font-label-code">
                실시간 1:1 오류 클리닉
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onNavigateToFullTutor}
              title="전체 튜터 페이지로 이동"
              className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">open_in_full</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-space-md overflow-y-auto space-y-space-md bg-surface">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'student' ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-outline px-1 mb-1 font-label-code">
                {m.sender === 'student' ? '김수학 학생' : 'Math Mate AI'} · {m.time}
              </span>
              <div
                className={`p-space-md rounded-xl max-w-[90%] whitespace-pre-line text-[13px] leading-relaxed ${
                  m.sender === 'student'
                    ? 'bg-primary text-on-primary rounded-tr-xs shadow-xs'
                    : 'bg-surface-container-low text-on-surface rounded-tl-xs shadow-xs border border-surface-container-high/50'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Quick Prompt Suggestions */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] font-label-bold text-on-surface-variant">
              추천 빠른 질문:
            </span>
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendPrompt(p)}
                className="w-full text-left p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container-low text-primary font-body-sm text-body-sm transition-colors shadow-xs border border-surface-container-high/70"
              >
                💬 "{p}"
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Input Area */}
        <div className="p-space-md bg-surface-container-low flex flex-col gap-2 border-t border-surface-container-high/60">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(inputValue);
            }}
            className="flex items-center gap-space-xs"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="AI 튜터에게 수식이나 질문을 입력하세요..."
              className="flex-1 px-3 py-2 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-high/50"
            />
            <button
              type="submit"
              className="p-2 bg-primary text-on-primary rounded-lg hover:bg-surface-tint shadow-xs transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>

          <button
            type="button"
            onClick={onNavigateToFullTutor}
            className="text-[12px] text-primary hover:underline text-center font-medium"
          >
            소크라테스식 전체 질문 탭으로 가기 →
          </button>
        </div>
      </div>
    </>
  );
};
