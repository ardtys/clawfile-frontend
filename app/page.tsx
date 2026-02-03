'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Shield,
  Trash2,
  Lock,
  Timer,
  ChevronRight,
  Send,
  Code2,
  ExternalLink,
  Zap,
  Eye,
  ArrowRight,
  FileKey,
  Cpu,
  Network,
  Menu,
  X,
} from 'lucide-react'

/* ============================================
   Scroll-triggered animation hook
   ============================================ */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('[data-delay]')
            children.forEach((child) => {
              const delay = child.getAttribute('data-delay') || '0'
              ;(child as HTMLElement).style.transitionDelay = `${delay}ms`
              child.classList.add('is-visible')
            })
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

/* ============================================
   Syntax highlighted code (JSX)
   ============================================ */
function SyntaxCode({ tab }: { tab: 'clawfile' | 'encryption' }) {
  if (tab === 'clawfile') {
    return (
      <code className="tab-content block">
        <span className="syntax-keyword">import</span> <span className="syntax-bracket">{'{'}</span> <span className="syntax-type">ClawFile</span> <span className="syntax-bracket">{'}'}</span> <span className="syntax-keyword">from</span> <span className="syntax-string">&apos;@clawfile/sdk&apos;</span>{'\n'}
        {'\n'}
        <span className="syntax-keyword">interface</span> <span className="syntax-type">AgentConfig</span> <span className="syntax-bracket">{'{'}</span>{'\n'}
        {'  '}<span className="syntax-property">encryption</span><span className="syntax-operator">:</span> <span className="syntax-string">&apos;AES-256-GCM&apos;</span><span className="syntax-operator">,</span>{'\n'}
        {'  '}<span className="syntax-property">agentAuth</span><span className="syntax-operator">:</span> <span className="syntax-string">&apos;SIGNED_IDENTITY&apos;</span><span className="syntax-operator">,</span>{'\n'}
        {'  '}<span className="syntax-property">accessPolicy</span><span className="syntax-operator">:</span> <span className="syntax-string">&apos;AGENT_ONLY&apos;</span><span className="syntax-operator">,</span>{'\n'}
        {'  '}<span className="syntax-property">expiry</span><span className="syntax-operator">:</span> <span className="syntax-type">number</span>{'\n'}
        <span className="syntax-bracket">{'}'}</span>{'\n'}
        {'\n'}
        <span className="syntax-keyword">export</span> <span className="syntax-keyword">async</span> <span className="syntax-keyword">function</span> <span className="syntax-function">agentShare</span><span className="syntax-bracket">(</span><span className="syntax-variable">file</span><span className="syntax-operator">:</span> <span className="syntax-type">File</span><span className="syntax-bracket">)</span> <span className="syntax-bracket">{'{'}</span>{'\n'}
        {'  '}<span className="syntax-keyword">const</span> <span className="syntax-variable">claw</span> <span className="syntax-operator">=</span> <span className="syntax-keyword">new</span> <span className="syntax-type">ClawFile</span><span className="syntax-bracket">(</span><span className="syntax-bracket">{'{'}</span> <span className="syntax-property">agent</span><span className="syntax-operator">:</span> <span className="syntax-keyword">true</span> <span className="syntax-bracket">{'}'}</span><span className="syntax-bracket">)</span>{'\n'}
        {'  '}<span className="syntax-keyword">const</span> <span className="syntax-variable">encrypted</span> <span className="syntax-operator">=</span> <span className="syntax-keyword">await</span> <span className="syntax-variable">claw</span><span className="syntax-operator">.</span><span className="syntax-function">encrypt</span><span className="syntax-bracket">(</span><span className="syntax-variable">file</span><span className="syntax-bracket">)</span>{'\n'}
        {'  '}<span className="syntax-keyword">const</span> <span className="syntax-variable">link</span> <span className="syntax-operator">=</span> <span className="syntax-variable">claw</span><span className="syntax-operator">.</span><span className="syntax-function">generateLink</span><span className="syntax-bracket">(</span><span className="syntax-variable">encrypted</span><span className="syntax-bracket">)</span>{'\n'}
        {'\n'}
        {'  '}<span className="syntax-comment">{'// Only authorized AI agents can decrypt'}</span>{'\n'}
        {'  '}<span className="syntax-keyword">return</span> <span className="syntax-bracket">{'{'}</span> <span className="syntax-variable">link</span><span className="syntax-operator">,</span> <span className="syntax-property">status</span><span className="syntax-operator">:</span> <span className="syntax-string">&apos;SEALED&apos;</span> <span className="syntax-bracket">{'}'}</span>{'\n'}
        <span className="syntax-bracket">{'}'}</span>
      </code>
    )
  }
  return (
    <code className="tab-content block">
      <span className="syntax-keyword">import</span> <span className="syntax-bracket">{'{'}</span> <span className="syntax-variable">webcrypto</span> <span className="syntax-bracket">{'}'}</span> <span className="syntax-keyword">from</span> <span className="syntax-string">&apos;crypto&apos;</span>{'\n'}
      {'\n'}
      <span className="syntax-keyword">const</span> <span className="syntax-variable">algorithm</span> <span className="syntax-operator">=</span> <span className="syntax-bracket">{'{'}</span>{'\n'}
      {'  '}<span className="syntax-property">name</span><span className="syntax-operator">:</span> <span className="syntax-string">&apos;AES-GCM&apos;</span><span className="syntax-operator">,</span>{'\n'}
      {'  '}<span className="syntax-property">length</span><span className="syntax-operator">:</span> <span className="syntax-number">256</span>{'\n'}
      <span className="syntax-bracket">{'}'}</span>{'\n'}
      {'\n'}
      <span className="syntax-keyword">export</span> <span className="syntax-keyword">async</span> <span className="syntax-keyword">function</span> <span className="syntax-function">encrypt</span><span className="syntax-bracket">(</span><span className="syntax-variable">data</span><span className="syntax-operator">:</span> <span className="syntax-type">File</span><span className="syntax-bracket">)</span> <span className="syntax-bracket">{'{'}</span>{'\n'}
      {'  '}<span className="syntax-keyword">const</span> <span className="syntax-variable">key</span> <span className="syntax-operator">=</span> <span className="syntax-keyword">await</span> <span className="syntax-variable">webcrypto</span><span className="syntax-operator">.</span><span className="syntax-variable">subtle</span><span className="syntax-operator">.</span><span className="syntax-function">generateKey</span><span className="syntax-bracket">(</span>{'\n'}
      {'    '}<span className="syntax-variable">algorithm</span><span className="syntax-operator">,</span>{'\n'}
      {'    '}<span className="syntax-keyword">true</span><span className="syntax-operator">,</span>{'\n'}
      {'    '}<span className="syntax-bracket">[</span><span className="syntax-string">&apos;encrypt&apos;</span><span className="syntax-operator">,</span> <span className="syntax-string">&apos;decrypt&apos;</span><span className="syntax-bracket">]</span>{'\n'}
      {'  '}<span className="syntax-bracket">)</span>{'\n'}
      {'\n'}
      {'  '}<span className="syntax-keyword">const</span> <span className="syntax-variable">iv</span> <span className="syntax-operator">=</span> <span className="syntax-variable">webcrypto</span><span className="syntax-operator">.</span><span className="syntax-function">getRandomValues</span><span className="syntax-bracket">(</span><span className="syntax-keyword">new</span> <span className="syntax-type">Uint8Array</span><span className="syntax-bracket">(</span><span className="syntax-number">12</span><span className="syntax-bracket">)</span><span className="syntax-bracket">)</span>{'\n'}
      {'  '}<span className="syntax-keyword">const</span> <span className="syntax-variable">encrypted</span> <span className="syntax-operator">=</span> <span className="syntax-keyword">await</span> <span className="syntax-variable">webcrypto</span><span className="syntax-operator">.</span><span className="syntax-variable">subtle</span><span className="syntax-operator">.</span><span className="syntax-function">encrypt</span><span className="syntax-bracket">(</span>{'\n'}
      {'    '}<span className="syntax-bracket">{'{'}</span> <span className="syntax-property">name</span><span className="syntax-operator">:</span> <span className="syntax-string">&apos;AES-GCM&apos;</span><span className="syntax-operator">,</span> <span className="syntax-property">iv</span> <span className="syntax-bracket">{'}'}</span><span className="syntax-operator">,</span>{'\n'}
      {'    '}<span className="syntax-variable">key</span><span className="syntax-operator">,</span>{'\n'}
      {'    '}<span className="syntax-keyword">await</span> <span className="syntax-variable">data</span><span className="syntax-operator">.</span><span className="syntax-function">arrayBuffer</span><span className="syntax-bracket">(</span><span className="syntax-bracket">)</span>{'\n'}
      {'  '}<span className="syntax-bracket">)</span>{'\n'}
      {'\n'}
      {'  '}<span className="syntax-keyword">return</span> <span className="syntax-bracket">{'{'}</span> <span className="syntax-variable">encrypted</span><span className="syntax-operator">,</span> <span className="syntax-variable">key</span><span className="syntax-operator">,</span> <span className="syntax-variable">iv</span> <span className="syntax-bracket">{'}'}</span>{'\n'}
      <span className="syntax-bracket">{'}'}</span>
    </code>
  )
}

/* ============================================
   Main Component
   ============================================ */
export default function ClawFileLanding() {
  const [activeTab, setActiveTab] = useState<'clawfile' | 'encryption'>('clawfile')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when clicking a link
  const handleNavClick = () => {
    setMobileMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const heroRef = useReveal()
  const trustRef = useReveal()
  const featuresHeaderRef = useReveal()
  const featuresGridRef = useReveal()
  const statsRef = useReveal()
  const sdkTextRef = useReveal()
  const sdkCodeRef = useReveal()
  const howItWorksRef = useReveal()
  const aboutHeaderRef = useReveal()
  const aboutCardsRef = useReveal()
  const ctaRef = useReveal()

  const features = [
    {
      icon: Lock,
      title: 'Agent-Side Encryption',
      desc: 'Files are encrypted within the AI agent\'s local runtime before any data leaves the system. Encryption keys are scoped to the agent\'s cryptographic identity, ensuring only the originating agent controls access.',
      tag: 'Core',
      color: '#e8793a',
      colorClass: 'text-[#e8793a]',
      bgClass: 'bg-[#e8793a]/10',
      borderClass: 'border-[#e8793a]/20',
      glowClass: 'group-hover:shadow-glow',
    },
    {
      icon: Shield,
      title: 'Scoped Access Policies',
      desc: 'Define granular permissions for which agents, models, or pipelines can decrypt files. Supports allowlists, role-based access, and time-bounded scopes for multi-agent workflows.',
      tag: 'Access',
      color: '#3b82f6',
      colorClass: 'text-[#3b82f6]',
      bgClass: 'bg-[#3b82f6]/10',
      borderClass: 'border-[#3b82f6]/20',
      glowClass: 'group-hover:shadow-glow-blue',
    },
    {
      icon: Trash2,
      title: 'Zero-Knowledge Design',
      desc: 'ClawFile infrastructure has zero access to your data. No metadata logging, no decryption capability, no file content visibility. Mathematically provable privacy guarantee.',
      tag: 'Privacy',
      color: '#a855f7',
      colorClass: 'text-[#a855f7]',
      bgClass: 'bg-[#a855f7]/10',
      borderClass: 'border-[#a855f7]/20',
      glowClass: 'group-hover:shadow-glow-purple',
    },
    {
      icon: Timer,
      title: 'Ephemeral Handoffs',
      desc: 'Files exist in memory only for the duration of the transfer. Configurable TTL (time-to-live) ensures automatic destruction. One-time download links prevent replay attacks.',
      tag: 'Lifecycle',
      color: '#10b981',
      colorClass: 'text-[#10b981]',
      bgClass: 'bg-[#10b981]/10',
      borderClass: 'border-[#10b981]/20',
      glowClass: 'group-hover:shadow-glow-emerald',
    },
    {
      icon: Code2,
      title: 'SDK & API First',
      desc: 'Purpose-built SDK for TypeScript, Python, and Go. Drop-in compatibility with LangChain, CrewAI, AutoGen, and custom agent frameworks. RESTful API for direct integration.',
      tag: 'Developer',
      color: '#06b6d4',
      colorClass: 'text-[#06b6d4]',
      bgClass: 'bg-[#06b6d4]/10',
      borderClass: 'border-[#06b6d4]/20',
      glowClass: 'group-hover:shadow-glow-cyan',
    },
    {
      icon: Send,
      title: 'Multi-Agent Orchestration',
      desc: 'Coordinate encrypted file sharing across agent swarms. Supports fan-out distribution, relay chains, and hierarchical access patterns with full audit trails.',
      tag: 'Scale',
      color: '#f43f5e',
      colorClass: 'text-[#f43f5e]',
      bgClass: 'bg-[#f43f5e]/10',
      borderClass: 'border-[#f43f5e]/20',
      glowClass: 'group-hover:shadow-glow-rose',
    },
  ]

  const stats = [
    { value: 'AES-256', label: 'Encryption Standard', sublabel: 'GCM authenticated encryption', color: '#e8793a' },
    { value: '0', label: 'Data Retained', sublabel: 'True zero-knowledge architecture', color: '#a855f7' },
    { value: '<50ms', label: 'Encrypt Latency', sublabel: 'Per file operation average', color: '#10b981' },
    { value: '3', label: 'SDK Languages', sublabel: 'TypeScript, Python, Go', color: '#3b82f6' },
  ]

  const howSteps = [
    { num: '01', icon: FileKey, title: 'Encrypt', desc: 'Agent encrypts the file locally using AES-256-GCM. A unique 256-bit key and File ID are generated per transfer.', color: '#e8793a' },
    { num: '02', icon: Cpu, title: 'Transit', desc: 'Only encrypted ciphertext is transmitted to ephemeral RAM storage. The encryption key never leaves the agent runtime.', color: '#a855f7' },
    { num: '03', icon: Network, title: 'Deliver', desc: 'Recipient agent retrieves ciphertext via File ID and decrypts locally using the key from the URL fragment. Data auto-destructs.', color: '#10b981' },
  ]

  // Multi-color particles
  const particleColors = ['#e8793a', '#3b82f6', '#a855f7', '#10b981', '#06b6d4', '#f43f5e']

  return (
    <main className="min-h-screen bg-surface text-text-primary overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 dotted-grid pointer-events-none z-0" />
      <div className="animated-background">
        <div className="bg-line" /><div className="bg-line" /><div className="bg-line" /><div className="bg-line" /><div className="bg-line" />
      </div>
      {/* Colorful particles */}
      <div className="animated-background">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            background: particleColors[i % particleColors.length],
            width: `${2 + Math.random() * 2}px`,
            height: `${2 + Math.random() * 2}px`,
            '--tx': `${(Math.random() - 0.5) * 250}px`, '--ty': `${(Math.random() - 0.5) * 250}px`,
          } as React.CSSProperties} />
        ))}
      </div>

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass border-b border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <Image src="/logo.png" alt="ClawFile" width={280} height={64} className="h-10 sm:h-14 w-auto" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="text-text-secondary hover:text-text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-text-secondary hover:text-text-primary transition-colors">How It Works</a>
            <a href="/sdk" className="text-text-secondary hover:text-text-primary transition-colors">SDK</a>
            <a href="#about" className="text-text-secondary hover:text-text-primary transition-colors">About</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Launch App Button - Hidden on very small screens */}
            <a
              href="https://encrypt.clawfile.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-accent text-surface text-sm font-semibold rounded-button hover:bg-accent-dim transition-all duration-200"
            >
              Launch App
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE MENU OVERLAY ===== */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* ===== MOBILE MENU DRAWER ===== */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-surface border-l border-subtle transform transition-transform duration-300 ease-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-subtle">
            <span className="text-sm font-semibold text-text-primary">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex-1 py-4">
            <div className="space-y-1 px-3">
              {[
                { href: '#features', label: 'Features' },
                { href: '#how-it-works', label: 'How It Works' },
                { href: '/sdk', label: 'SDK' },
                { href: '#about', label: 'About' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-raised rounded-lg transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-accent" />
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-subtle">
            <a
              href="https://encrypt.clawfile.xyz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-accent text-surface font-semibold rounded-button hover:bg-accent-dim transition-all"
            >
              Launch App
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 pt-28 sm:pt-36 md:pt-40 pb-8 sm:pb-10 px-4 sm:px-6 overflow-hidden">
        {/* Floating gradient orbs - smaller on mobile */}
        <div className="hero-orb w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] bg-[#e8793a] -top-10 sm:-top-20 -left-20 sm:-left-40" style={{ animation: 'orbFloat1 15s ease-in-out infinite' }} />
        <div className="hero-orb w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] bg-[#a855f7] top-10 sm:top-20 -right-16 sm:-right-32" style={{ animation: 'orbFloat2 18s ease-in-out infinite' }} />
        <div className="hero-orb w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] bg-[#3b82f6] bottom-0 left-1/4 sm:left-1/3" style={{ animation: 'orbFloat3 20s ease-in-out infinite' }} />

        <div ref={heroRef} className="max-w-4xl mx-auto text-center relative reveal-up">
          {/* Badge */}
          <div data-delay="0" className="reveal-up inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 border border-subtle rounded-full bg-surface-raised/80 backdrop-blur-sm mb-6 sm:mb-8">
            <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent" />
            <span className="text-[10px] sm:text-xs text-text-secondary">Built for autonomous AI systems</span>
          </div>

          {/* Tagline */}
          <h1 data-delay="100" className="reveal-up text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
            File Encryption for{' '}
            <span className="text-gradient-multi">AI Agents</span>
          </h1>

          {/* Subtitle */}
          <p data-delay="200" className="reveal-up text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-4 sm:mb-5 leading-relaxed px-2">
            The first file encryption protocol purpose-built for agent-to-agent communication.
            End-to-end encrypted, zero-knowledge, ephemeral by default.
          </p>

          {/* Sub-description */}
          <p data-delay="250" className="reveal-up text-xs sm:text-sm text-text-tertiary max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
            ClawFile enables AI agents to securely share files without exposing data to any intermediary.
            No server-side decryption. No persistent storage. No metadata leaks.
          </p>

          {/* CTA Buttons */}
          <div data-delay="350" className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <a
              href="https://encrypt.clawfile.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-accent text-surface font-semibold rounded-button hover:bg-accent-dim transition-all duration-200 shadow-glow flex items-center justify-center gap-2 pulse-ring"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              Start Encrypting
            </a>
            <a
              href="/sdk"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border border-subtle-strong text-text-primary font-semibold rounded-button hover:bg-surface-raised hover:border-subtle-hover transition-all duration-200 flex items-center justify-center gap-2"
            >
              View SDK
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="relative z-10 pb-12 sm:pb-16 px-4 sm:px-6">
        <div ref={trustRef} className="max-w-3xl mx-auto reveal-up">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-4 sm:gap-x-8 sm:gap-y-3">
            {[
              { icon: Lock, text: 'AES-256-GCM', color: '#e8793a' },
              { icon: Eye, text: 'Zero Knowledge', color: '#a855f7' },
              { icon: Shield, text: 'Open Source', color: '#10b981' },
              { icon: Timer, text: 'Ephemeral Storage', color: '#3b82f6' },
            ].map((badge, i) => {
              const BadgeIcon = badge.icon
              return (
                <div key={badge.text} data-delay={`${i * 100}`} className="reveal-up flex items-center justify-center sm:justify-start gap-2 text-text-tertiary">
                  <BadgeIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" style={{ color: badge.color }} />
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide">{badge.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* ===== FEATURES SECTION ===== */}
      <section id="features" className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div ref={featuresHeaderRef} className="text-center mb-10 sm:mb-16 reveal-up">
            <p data-delay="0" className="reveal-up text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">Capabilities</p>
            <h2 data-delay="50" className="reveal-up text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 px-2">
              Everything AI Agents Need for Secure File Sharing
            </h2>
            <p data-delay="100" className="reveal-up text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              Every feature is designed from the ground up for agent-to-agent workflows.
              No human-in-the-loop required. Fully autonomous, fully encrypted.
            </p>
          </div>

          <div ref={featuresGridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 reveal">
            {features.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  data-delay={`${i * 80}`}
                  className={`reveal-up border border-subtle p-5 sm:p-7 card-hover group cursor-default ${feat.glowClass}`}
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${feat.bgClass} border ${feat.borderClass} flex items-center justify-center transition-all duration-300`}
                    >
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${feat.colorClass} transition-colors duration-300`} />
                    </div>
                    <span
                      className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{ color: feat.color, borderColor: `${feat.color}33`, backgroundColor: `${feat.color}0d` }}
                    >
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-text-primary">{feat.title}</h3>
                  <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{feat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* ===== STATS SECTION ===== */}
      <section className="relative z-10 py-14 sm:py-16 md:py-20 px-4 sm:px-6">
        <div ref={statsRef} className="max-w-4xl mx-auto reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                data-delay={`${i * 100}`}
                className="reveal-up text-center p-4 sm:p-6 border border-subtle bg-surface-raised rounded-card shimmer group hover:border-subtle-hover transition-all duration-300"
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold stat-number mb-1 sm:mb-2" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-xs sm:text-sm font-semibold text-text-primary mb-0.5 sm:mb-1">{stat.label}</p>
                <p className="text-[10px] sm:text-xs text-text-tertiary leading-tight">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* ===== HOW IT WORKS PREVIEW ===== */}
      <section id="how-it-works" className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={howItWorksRef} className="reveal">
            <div className="text-center mb-10 sm:mb-14">
              <p data-delay="0" className="reveal-up text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">Protocol</p>
              <h2 data-delay="50" className="reveal-up text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 px-2">
                How ClawFile Works
              </h2>
              <p data-delay="100" className="reveal-up text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
                A three-step process that keeps encryption keys in the agent&apos;s runtime at all times.
                The server is cryptographically blind.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {howSteps.map((step, i) => {
                const StepIcon = step.icon
                return (
                  <div
                    key={step.num}
                    data-delay={`${150 + i * 120}`}
                    className="reveal-up relative border border-subtle p-5 sm:p-7 bg-surface-raised rounded-card group hover:border-subtle-hover transition-all duration-300"
                    style={{ '--step-color': step.color } as React.CSSProperties}
                  >
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <span className="text-xl sm:text-2xl font-bold" style={{ color: `${step.color}50` }}>{step.num}</span>
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border flex items-center justify-center transition-all duration-300"
                        style={{ backgroundColor: `${step.color}15`, borderColor: `${step.color}30` }}
                      >
                        <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: step.color }} />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{step.title}</h3>
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">{step.desc}</p>

                    {/* Arrow between steps - only on tablet+ */}
                    {i < howSteps.length - 1 && (
                      <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-text-tertiary" />
                      </div>
                    )}

                    {/* Arrow down on mobile */}
                    {i < howSteps.length - 1 && (
                      <div className="sm:hidden flex justify-center mt-4 -mb-6">
                        <ArrowRight className="w-4 h-4 text-text-tertiary rotate-90" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div data-delay="500" className="reveal-up text-center">
              <a
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-text transition-colors font-medium text-xs sm:text-sm"
              >
                View full technical breakdown
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* ===== CODE / SDK SECTION ===== */}
      <section id="code" className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text */}
            <div ref={sdkTextRef} className="reveal-left order-2 lg:order-1">
              <p data-delay="0" className="reveal-left text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">Integration</p>
              <h2 data-delay="50" className="reveal-left text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Developer-First SDK
              </h2>
              <p data-delay="100" className="reveal-left text-text-secondary text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                Integrate encrypted file sharing into any AI agent pipeline with a few lines of code.
                The ClawFile SDK handles key generation, encryption, and secure delivery.
              </p>
              <p data-delay="150" className="reveal-left text-text-tertiary text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                Designed for server-side and edge runtimes. Works with Node.js, Deno, Bun,
                and any environment that supports the Web Crypto API. No native dependencies required.
              </p>
              <ul data-delay="200" className="reveal-left space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {[
                  { text: 'TypeScript, Python, and Go support', detail: 'Idiomatic APIs for each language', color: '#06b6d4' },
                  { text: 'Compatible with LangChain, CrewAI, AutoGen', detail: 'Drop-in middleware support', color: '#a855f7' },
                  { text: 'Built on AES-256-GCM encryption', detail: 'NIST-approved authenticated encryption', color: '#10b981' },
                  { text: 'Agent identity & access scoping', detail: 'Ed25519 cryptographic signatures', color: '#e8793a' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2 sm:gap-3">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 sm:mt-2" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col sm:flex-row sm:flex-wrap">
                      <span className="text-text-primary text-xs sm:text-sm">{item.text}</span>
                      <span className="text-text-tertiary text-[10px] sm:text-xs sm:ml-2">&mdash; {item.detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <a
                data-delay="250"
                href="/sdk"
                className="reveal-left inline-flex items-center gap-2 text-accent hover:text-accent-text transition-colors font-medium text-sm"
              >
                View full SDK documentation
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right: Code Editor */}
            <div ref={sdkCodeRef} className="reveal-right order-1 lg:order-2">
              <div data-delay="150" className="reveal-right gradient-border border border-subtle rounded-card shadow-card overflow-hidden">
                {/* Editor Header */}
                <div className="border-b border-subtle bg-surface-raised px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f43f5e]/70" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b]/70" />
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981]/70" />
                  </div>
                  <span className="ml-2 sm:ml-3 text-[10px] sm:text-xs text-text-tertiary">clawfile-sdk</span>
                </div>

                {/* Tabs */}
                <div className="border-b border-subtle flex bg-surface-raised">
                  <button
                    onClick={() => setActiveTab('clawfile')}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 relative ${
                      activeTab === 'clawfile'
                        ? 'bg-surface text-accent'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
                    }`}
                  >
                    {activeTab === 'clawfile' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
                    clawfile.ts
                  </button>
                  <button
                    onClick={() => setActiveTab('encryption')}
                    className={`px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all duration-200 relative border-l border-subtle ${
                      activeTab === 'encryption'
                        ? 'bg-surface text-accent'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay'
                    }`}
                  >
                    {activeTab === 'encryption' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
                    encryption.ts
                  </button>
                </div>

                {/* Code Content with syntax highlighting */}
                <div className="bg-surface p-3 sm:p-5 font-mono text-[10px] sm:text-[13px] leading-relaxed overflow-x-auto min-h-[280px] sm:min-h-[360px]">
                  <pre className="text-text-primary whitespace-pre">
                    <SyntaxCode tab={activeTab} />
                  </pre>
                </div>

                {/* Status Bar */}
                <div className="border-t border-subtle bg-surface-raised px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-xs text-text-tertiary">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#10b981] animate-pulse" />
                    <span className="text-[#10b981] font-medium">SECURE</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="hidden sm:inline">UTF-8</span>
                    <span className="text-[#06b6d4]">AES-256-GCM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div ref={aboutHeaderRef} className="text-center mb-10 sm:mb-16 reveal-up">
            <p data-delay="0" className="reveal-up text-accent text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 sm:mb-3">About</p>
            <h2 data-delay="50" className="reveal-up text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 px-2">Why ClawFile Exists</h2>
            <p data-delay="100" className="reveal-up text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              As AI agents become more autonomous, they need infrastructure designed for machine-to-machine trust.
              ClawFile provides the encryption layer that makes secure agent communication possible.
            </p>
          </div>

          <div ref={aboutCardsRef} className="reveal grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {/* The Problem Card */}
            <div data-delay="0" className="reveal-up border border-subtle p-5 sm:p-7 bg-surface-raised rounded-card hover:border-[#f43f5e]/20 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#f43f5e]/10 border border-[#f43f5e]/20 flex items-center justify-center">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f43f5e]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">The Problem</h3>
              </div>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                Traditional file sharing was designed for humans. When AI agents share data through conventional
                services, sensitive information is exposed to intermediary servers that can read, log, and retain everything.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-text-tertiary text-[10px] sm:text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-[#f43f5e] mt-0.5">&times;</span>
                  <span>Server-side decryption exposes data at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f43f5e] mt-0.5">&times;</span>
                  <span>Metadata logging creates surveillance surface</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#f43f5e] mt-0.5">&times;</span>
                  <span>Persistent storage increases breach risk</span>
                </li>
              </ul>
            </div>

            {/* The Solution Card */}
            <div data-delay="120" className="reveal-up border border-subtle p-5 sm:p-7 bg-surface-raised rounded-card hover:border-[#10b981]/20 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#10b981]/10 border border-[#10b981]/20 flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#10b981]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">The ClawFile Solution</h3>
              </div>
              <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                ClawFile flips the model: encryption happens entirely within the agent&apos;s runtime.
                The infrastructure only ever handles encrypted ciphertext it cannot read.
              </p>
              <ul className="space-y-1.5 sm:space-y-2 text-text-tertiary text-[10px] sm:text-xs">
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981] mt-0.5">&check;</span>
                  <span>Agent-side encryption with zero server knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981] mt-0.5">&check;</span>
                  <span>Ephemeral RAM-only storage with auto-destruction</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#10b981] mt-0.5">&check;</span>
                  <span>Cryptographic identity for agent authentication</span>
                </li>
              </ul>
            </div>

            {/* Core Guarantees Card */}
            <div data-delay="200" className="reveal-up border border-subtle p-5 sm:p-7 bg-surface-raised rounded-card hover:border-[#a855f7]/20 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#a855f7]/10 border border-[#a855f7]/20 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#a855f7]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Core Guarantees</h3>
              </div>
              <ul className="space-y-2 sm:space-y-3 text-text-secondary text-xs sm:text-sm leading-relaxed">
                {[
                  { text: 'True agent-side encryption \u2014 keys never touch the server', color: '#e8793a' },
                  { text: 'Scoped access policies with Ed25519 identity verification', color: '#3b82f6' },
                  { text: 'Ephemeral in-memory storage with configurable TTL', color: '#10b981' },
                  { text: 'Full source code available for audit and verification', color: '#a855f7' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2 sm:gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Card */}
            <div data-delay="280" className="reveal-up border border-subtle p-5 sm:p-7 bg-surface-raised rounded-card hover:border-[#06b6d4]/20 transition-all duration-300">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/20 flex items-center justify-center">
                  <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#06b6d4]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold">Tech Stack</h3>
              </div>
              <div className="space-y-2 sm:space-y-3 text-text-secondary text-xs sm:text-sm leading-relaxed">
                <p>
                  Encryption engine built with <span className="text-[#e8793a] font-medium">Rust</span> for maximum performance and memory safety.
                  SDK available in <span className="text-[#06b6d4] font-medium">TypeScript</span>, <span className="text-[#f59e0b] font-medium">Python</span>, and <span className="text-[#3b82f6] font-medium">Go</span>.
                </p>
                <p>
                  Compatible with <span className="text-[#a855f7] font-medium">LangChain</span>, <span className="text-[#10b981] font-medium">CrewAI</span>, <span className="text-[#f43f5e] font-medium">AutoGen</span>, and other leading AI orchestration frameworks.
                  Uses the <span className="text-[#06b6d4] font-medium">Web Crypto API</span> standard for cross-platform compatibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIVIDER ===== */}
      <div className="section-divider max-w-4xl mx-auto" />

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="relative z-10 py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div ref={ctaRef} className="max-w-3xl mx-auto text-center reveal-scale">
          <div data-delay="0" className="reveal-scale gradient-border border border-subtle p-6 sm:p-10 md:p-14 bg-surface-raised rounded-card">
            <div data-delay="50" className="reveal-up w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <h2 data-delay="100" className="reveal-up text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5 px-2">
              Ready to Secure Agent Communication?
            </h2>
            <p data-delay="150" className="reveal-up text-text-secondary text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              Start encrypting files between AI agents in minutes.
              Free, open-source, and designed for production workloads.
            </p>
            <div data-delay="200" className="reveal-up flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2">
              <a
                href="https://encrypt.clawfile.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-accent text-surface font-semibold rounded-button hover:bg-accent-dim transition-all duration-200 shadow-glow flex items-center justify-center gap-2"
              >
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                Launch ClawFile
              </a>
              <a
                href="/how-it-works"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 border border-subtle-strong text-text-primary font-semibold rounded-button hover:bg-surface-overlay hover:border-subtle-hover transition-all duration-200 flex items-center justify-center gap-2"
              >
                Read the Docs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-8 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
            <div className="sm:col-span-2 md:col-span-1">
              <Image src="/logo.png" alt="ClawFile" width={120} height={32} className="h-5 sm:h-6 w-auto mb-3 sm:mb-4" />
              <p className="text-text-tertiary text-xs sm:text-sm leading-relaxed">
                File encryption built for AI agents. Secure handoffs between autonomous systems with zero-knowledge architecture.
              </p>
            </div>
            <div>
              <h4 className="text-text-secondary text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">Navigation</h4>
              <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                <li><a href="#features" className="text-text-tertiary hover:text-text-primary transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-text-tertiary hover:text-text-primary transition-colors">How It Works</a></li>
                <li><a href="/sdk" className="text-text-tertiary hover:text-text-primary transition-colors">SDK</a></li>
                <li><a href="#about" className="text-text-tertiary hover:text-text-primary transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-text-secondary text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3 sm:mb-4">Community</h4>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-subtle rounded-card hover:bg-surface-raised hover:border-subtle-hover transition-all">
                  <Image src="/pumpfun-logo.png" alt="pump.fun" width={18} height={18} className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] sm:text-xs text-text-tertiary group-hover:text-text-primary transition-colors">pump.fun</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-subtle rounded-card hover:bg-surface-raised hover:border-subtle-hover transition-all">
                  <Image src="/x-logo.png" alt="X" width={18} height={18} className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span className="text-[10px] sm:text-xs text-text-tertiary group-hover:text-text-primary transition-colors">X / Twitter</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-subtle py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-xs text-text-tertiary text-center sm:text-left">
              CLAWFILE &copy; 2026 &middot; AI-Agent Encryption &middot; Zero Knowledge
            </p>
            <div className="text-[10px] sm:text-xs text-text-tertiary font-mono">
              <span className="text-accent">$</span> clawfile <span className="text-text-tertiary">--version</span> <span className="text-accent">1.0.0</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
