import { useState, useRef, useEffect } from 'react'
import { getBotReply } from '../data/chatResponses'
import useGameStore from '../store/useGameStore'

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: '16px 16px 16px 4px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.06)' }}>
      {[0, 1, 2].map(i => (<div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)', animation: `dotPulse 1.4s ease-in-out ${i * 0.2}s infinite` }} />))}
    </div>
  )
}

export default function Chat() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ id: 0, role: 'bot', text: "Hey Champion! 💪 I'm your FitSphere AI coach. Ask me about workouts, nutrition, recovery, or your progress!" }])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const phaseColor = useGameStore(s => s.getPhaseColor())

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])

  const handleSend = async () => {
    const text = input.trim()
    if (!text) return
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text }])
    setInput('')
    setIsTyping(true)
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
    setIsTyping(false)
    setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: getBotReply(text) }])
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }

  const quickPrompts = ['What should I eat today?', 'Give me a workout plan', 'How do I lose fat?', 'Tips for better sleep', 'How to build muscle?']

  return (
    <div className="page-bg" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ padding: '20px 0 12px' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700 }}>AI Wellness Coach 🤖</h1>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Ask me anything about fitness, nutrition, or recovery</p>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0', display: 'flex', flexDirection: 'column' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 12, animation: 'slideUp 0.3s ease-out' }}>
            {msg.role === 'bot' && <div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${phaseColor}33, ${phaseColor}11)`, border: `1px solid ${phaseColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0, marginRight: 8, marginTop: 4 }}>🤖</div>}
            <div style={{ maxWidth: '70%', padding: '12px 16px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.role === 'user' ? `${phaseColor}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${msg.role === 'user' ? phaseColor + '33' : 'rgba(255,255,255,0.08)'}`, fontSize: 14, lineHeight: 1.6, color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)' }}>{msg.text}</div>
          </div>
        ))}
        {isTyping && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}><div style={{ width: 32, height: 32, borderRadius: 10, background: `linear-gradient(135deg, ${phaseColor}33, ${phaseColor}11)`, border: `1px solid ${phaseColor}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🤖</div><TypingIndicator /></div>}
        <div ref={messagesEndRef} />
      </div>
      {messages.length <= 1 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 0' }}>{quickPrompts.map(p => (<button key={p} onClick={() => { setInput(p); inputRef.current?.focus() }} style={{ padding: '6px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontSize: 12, cursor: 'pointer', transition: 'all 0.2s ease' }}>{p}</button>))}</div>}
      <div style={{ padding: '12px 0 20px', display: 'flex', gap: 8 }}>
        <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask your AI coach..." aria-label="Chat message input" style={{ flex: 1, padding: '14px 18px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none' }} />
        <button onClick={handleSend} disabled={!input.trim()} aria-label="Send message" style={{ padding: '14px 20px', borderRadius: 14, background: input.trim() ? `linear-gradient(135deg, ${phaseColor}, ${phaseColor}cc)` : 'rgba(255,255,255,0.06)', border: 'none', color: input.trim() ? '#000' : 'rgba(255,255,255,0.3)', fontSize: 16, fontWeight: 700, cursor: input.trim() ? 'pointer' : 'default' }}>➤</button>
      </div>
    </div>
  )
}
