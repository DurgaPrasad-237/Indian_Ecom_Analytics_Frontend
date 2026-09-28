import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Eraser, Send, Sparkles } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import aiService from '@/services/aiService';
import type { ChatMessage as ChatMessageType } from '@/types/ai';

let messageIdCounter = 0;
const nextId = () => `msg-${Date.now()}-${messageIdCounter++}`;

interface AnalyticsAssistantProps {
  type: 'customer' | 'product';
}

export function AnalyticsAssistant({ type }: AnalyticsAssistantProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    });
  };

  const handleSend = async (event: FormEvent) => {
    event.preventDefault();

    const question = input.trim();

    if (!question || isSending) return;

    const userMessage: ChatMessageType = {
      id: nextId(),
      role: 'user',
      content: question,
    };

    const historyForApi = messages
      .filter((message) => message.status !== 'error')
      .map((message) => ({
        role: message.role,
        content: message.content,
      }));

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);
    scrollToBottom();

    try {
      const response =
        type === 'customer'
          ? await aiService.askCustomerAnalyticsQuestion({
              question,
              chatHistory: historyForApi,
            })
          : await aiService.askProductAnalyticsQuestion({
              question,
              chatHistory: historyForApi,
            });

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: response.answer,
          insights: response.insights ?? null,
          status: 'sent',
        },
      ]);
    } catch (err) {
      const message =
        (err as { message?: string })?.message ??
        'Something went wrong. Please try again.';

      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: 'assistant',
          content: message,
          status: 'error',
        },
      ]);
    } finally {
      setIsSending(false);
      scrollToBottom();
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend(event);
    }
  };

  const handleClear = () => setMessages([]);

  const analyticsName =
    type === 'customer' ? 'customer' : 'product';

  return (
    <section className="card flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink-900 text-saffron-400">
            <Sparkles size={16} />
          </span>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">
              Analytics Assistant
            </h3>

            <p className="text-xs text-ink-500">
              Ask questions about {analyticsName} analytics.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClear}
          disabled={messages.length === 0}
          className="flex items-center gap-1.5 rounded-md border border-ink-200 px-2.5 py-1.5 text-xs font-medium text-ink-600 transition-colors hover:border-ink-300 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Eraser size={13} />
          Clear chat
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto px-5 py-5 scrollbar-thin"
        style={{
          minHeight: 260,
          maxHeight: 420,
        }}
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-50 text-ink-400">
              <Sparkles size={18} />
            </span>

            <p className="text-sm font-medium text-ink-700">
              Ask about your {analyticsName} analytics
            </p>

            <p className="max-w-xs text-xs text-ink-500">
              Ask questions about your {analyticsName} data and get
              answers from your analytics assistant.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))
        )}

        {/* Loading */}
        {isSending && (
          <div className="flex items-center gap-2 pl-10 text-xs text-ink-400">
            <span className="flex gap-1">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300 [animation-delay:-0.2s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300 [animation-delay:-0.1s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-300" />
            </span>

            Thinking…
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-end gap-2 border-t border-ink-100 px-4 py-3"
      >
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Ask a question about ${analyticsName} analytics…`}
          rows={1}
          className="max-h-28 flex-1 resize-none rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-400"
        />

        <button
          type="submit"
          disabled={!input.trim() || isSending}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-700 text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send question"
        >
          <Send size={16} />
        </button>
      </form>
    </section>
  );
}