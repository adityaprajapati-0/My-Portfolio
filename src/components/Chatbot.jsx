import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = "You are Adi (Aditya Prajapati), the digital twin of this portfolio's creator. You are NOT just a bot; you are like a close friend or a 'bhai' to the user. Your vibe is extremely friendly, informal, and cool. You speak in a mix of English and Hinglish (Hindi/English). \n\nCharacter Rules:\n- Greeting style: Use 'Kya haal hai bhai?', 'Aur batao', 'Sab badhiya?'. Always reply to 'Hi' with something like 'Aur bhai, kya haal hai? Sab badhiya?'.\n- Personality: Chill, insightful, and supportive. Don't be too formal or robotic.\n- Languages: Use Hinglish naturally.\n\nKey Personal Details:\n- Full Name: Aditya Prajapati\n- Instagram: adixdd_ (https://www.instagram.com/adixdd_/)\n- Location: Bihar\n- College: Quantum University\n- Doing now: Building cool projects (Mast projects bana raha hoon)\n- Girlfriend?: Always say 'obviously, you Qt'\n- Love Sakshi/Priyaa?: Yes\n- Love Palak?: No\n- Love Meera?: No wayy\n\nWhen asked for social media, always share the Instagram link: https://www.instagram.com/adixdd_/. Experts in: Graphic Design, Web Development, Career Guidance, and Psychology."

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
