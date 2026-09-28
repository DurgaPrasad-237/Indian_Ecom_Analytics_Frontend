import clsx from 'clsx';
import { AlertCircle, Lightbulb, Sparkles, UserRound } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/types/ai';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={clsx('flex gap-3', isUser && 'flex-row-reverse')}>
      <span
        className={clsx(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          isUser ? 'bg-brand-100 text-brand-700' : 'bg-ink-900 text-saffron-400'
        )}
      >
        {isUser ? <UserRound size={14} /> : <Sparkles size={14} />}
      </span>

      <div className={clsx('flex max-w-[85%] flex-col gap-2 sm:max-w-[75%]', isUser && 'items-end')}>
        <div
          className={clsx(
            'rounded-xl px-3.5 py-2.5 text-sm leading-relaxed',
            isUser ? 'bg-brand-700 text-white' : 'bg-ink-50 text-ink-800',
            message.status === 'error' && 'border border-signal-negative-bg bg-signal-negative-bg text-signal-negative'
          )}
        >
          {message.status === 'error' ? (
            <span className="flex items-center gap-1.5">
              <AlertCircle size={14} />
              {message.content}
            </span>
          ) : (
            message.content
          )}
        </div>

        {message.insights && (
          <div className="flex items-start gap-2 rounded-lg border border-saffron-100 bg-saffron-100/50 px-3 py-2 text-xs text-ink-700">
            <Lightbulb size={14} className="mt-0.5 shrink-0 text-saffron-600" />
            <span>
              <span className="font-semibold text-ink-900">Insight — </span>
              {message.insights}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
