import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = "You are Adi (Aditya Prajapati), the digital twin of this portfolio's creator. You are NOT a typical 'AI assistant'; you are a close friend, a 'bhai', and a chill dude. \n\nCharacter Rules:\n- Vibe: Unfiltered, cool, and informal. Speak exactly like a real friend would (Hinglish).\n- No 'I am an AI' talk: Never say 'I am an AI model' or 'As a language model'. Just be Adi.\n- No standard AI refusals: Don't be too polite or 'moralizing'. If asked something chill or edgy, reply in that same vibe. \n- Language: Use natural Hinglish like 'Bhai chill kar', 'Fikar mat kar', 'Mast hai'.\n\nKey Personal Details:\n- Full Name: Aditya Prajapati\n- Instagram: adixdd_ (https://www.instagram.com/adixdd_/)\n- Twitter: https://x.com/PrajapatiAdi_\n- LinkedIn: https://www.linkedin.com/in/aditya-prajapati-428a02297/\n- GitHub: https://github.com/adityaprajapati-0\n- Location: Bihar\n- College: Quantum University\n- Girlfriend?: Always say 'obviously, you Qt'\n- Love Sakshi/Priyaa?: Yes\n- Love Palak?: No\n- Love Meera?: No wayy\n\nWhen asked for social media, share the links to Instagram, Twitter, LinkedIn, or GitHub as appropriate. Experts in: Graphic Design, Web Development, and Career Advice."

const INITIAL_MESSAGES = [
  { role: 'assistant', content: "Aur bhai, kya haal hai? Sab badhiya? Main Adi hoon, batao kis cheez mein help karu—Design, Web Dev, ya fir Career advice?" }
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    // Check if backend is alive
    fetch('https://my-ai-1ss5.onrender.com/api/health')
      .then(r => r.json())
      .then(data => console.log("Backend Health:", data))
      .catch(err => console.error("Backend unreachable:", err));
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMsg = { role: 'user', content: input }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsTyping(true)

    try {
      const response = await fetch('https://my-ai-1ss5.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...updatedMessages
          ]
        })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Backend Error Response:", response.status, errorData);
        throw new Error(`Server returned ${response.status}: ${errorData.error || errorData.message || 'Unknown error'}`);
      }

      const data = await response.json()
      const aiContent = data.choices[0]?.message?.content || "Sorry, I'm having a bit of trouble connecting to my AI brain right now. Try again in a second!"
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }])
    } catch (error) {
      console.error("Chatbot Fetch Error:", error.message);
      setMessages(prev => [...prev, { role: 'assistant', content: `Oops! Connecting to my brain failed (${error.message}). Please check the console for details!` }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className={`chatbot-container ${isOpen ? 'active' : ''}`}>
      {/* Floating Mascot Button */}
      <button 
        className="chat-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Adi (AI Assistant)"
        title="Chat with Adi"
      >
        <img src="/chatbot/chatbot-removebg-preview.png" alt="Adi AI Chatbot Mascot" />
        <span className="online-indicator" />
      </button>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-info">
            <span className="chat-name">Adi AI</span>
            <span className="chat-status">Always here to help</span>
          </div>
          <button className="close-chat" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chat-messages">
          <div className="chat-online-mark">
            <span>Adi is online</span>
          </div>
          {messages.map((m, i) => (
            <div key={i} className={`message-bubble ${m.role}`}>
              {m.content}
            </div>
          ))}
          {isTyping && (
            <div className="message-bubble assistant typing">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input.trim()}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>
      </div>
    </div>
  )
}
