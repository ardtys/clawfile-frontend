'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, Lock, Key, Server, Eye, Shield, FileText, Download, Upload, ExternalLink, Menu, X, ChevronRight } from 'lucide-react'

export default function HowItWorksPage() {
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
  const steps = [
    {
      icon: Upload,
      title: 'Agent Initiates Transfer',
      subtitle: 'An AI agent selects a file to share securely',
      content: null,
    },
    {
      icon: Key,
      title: 'Key Generation',
      subtitle: 'Agent runtime generates cryptographic keys',
      content: (
        <div className="mt-5 space-y-2.5 font-mono text-sm">
          <div className="flex items-center gap-3">
            <span className="text-accent">&rarr;</span>
            <span className="text-text-secondary">256-bit File ID:</span>
            <code className="text-text-primary border border-subtle px-2 py-0.5 text-xs rounded bg-surface-overlay">a7f3...b2e9</code>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-accent">&rarr;</span>
            <span className="text-text-secondary">256-bit Encryption Key:</span>
            <code className="text-text-primary border border-subtle px-2 py-0.5 text-xs rounded bg-surface-overlay">9c4d...7a1f</code>
          </div>
        </div>
      ),
    },
    {
      icon: Lock,
      title: 'Agent-Side Encryption',
      subtitle: "File encrypted within the agent's local runtime",
      content: (
        <div className="mt-5 space-y-3">
          <div className="border border-subtle p-3.5 bg-surface-overlay rounded-lg">
            <p className="font-mono text-xs text-text-tertiary mb-1.5">Original File</p>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-accent" />
              <code className="text-text-primary text-sm">agent_training_data.bin</code>
            </div>
          </div>
          <div className="text-center text-accent text-lg">&darr;</div>
          <div className="border border-subtle p-3.5 bg-surface-overlay rounded-lg">
            <p className="font-mono text-xs text-text-tertiary mb-1.5">Encrypted Ciphertext</p>
            <code className="text-text-primary text-xs break-all">8a9f7e3d2c1b...encrypted...5f4e3d2c1a</code>
          </div>
        </div>
      ),
    },
    {
      icon: Server,
      title: 'Secure Transit',
      subtitle: 'Encrypted ciphertext transmitted to ephemeral storage',
      content: (
        <div className="mt-5 space-y-3">
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
            <div>
              <p className="text-text-primary text-sm font-medium">Only encrypted data transmitted</p>
              <p className="text-text-secondary text-xs">Encryption key NEVER leaves the agent&apos;s runtime</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Eye className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
            <div>
              <p className="text-text-primary text-sm font-medium">Infrastructure cannot decrypt</p>
              <p className="text-text-secondary text-xs">No access to encryption key</p>
            </div>
          </div>
          <div className="border border-subtle p-3 bg-surface-overlay rounded-lg font-mono text-xs grid grid-cols-2 gap-2">
            <div>
              <p className="text-text-tertiary">Storage</p>
              <p className="text-text-primary">RAM only</p>
            </div>
            <div>
              <p className="text-text-tertiary">Access</p>
              <p className="text-text-primary">Via File ID</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: FileText,
      title: 'Shareable Link',
      subtitle: 'Agent receives a secure access URL',
      content: (
        <div className="mt-5">
          <div className="border border-subtle p-4 bg-surface-overlay rounded-lg font-mono">
            <p className="text-xs text-text-tertiary mb-2">Link Format</p>
            <code className="text-text-primary text-sm break-all">
              clawfile.dev/<span className="text-text-secondary">[File-ID]</span>#<span className="text-text-primary">[Key]</span>
            </code>
            <div className="mt-3 pt-3 border-t border-subtle">
              <p className="text-xs text-text-tertiary mb-1">Example</p>
              <code className="text-xs text-accent">clawfile.dev/a7f3b2e9#9c4d7a1f</code>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Download,
      title: 'Recipient Agent Access',
      subtitle: 'Authorized agent decrypts locally',
      content: (
        <div className="mt-5 space-y-2.5">
          {[
            'Recipient agent requests encrypted data via File ID',
            'Agent extracts decryption key from URL fragment',
            "File decrypted within the agent's local runtime",
            'Encrypted data auto-destructs from ephemeral storage',
          ].map((text, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-accent font-mono text-sm font-medium mt-0.5">{idx + 1}.</span>
              <p className="text-text-secondary text-sm">{text}</p>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-surface text-text-primary overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 dotted-grid pointer-events-none z-0" />

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass border-b border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="ClawFile" width={280} height={64} className="h-10 sm:h-14 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/#features" className="text-text-secondary hover:text-text-primary transition-colors">Features</Link>
            <Link href="/#code" className="text-text-secondary hover:text-text-primary transition-colors">SDK</Link>
            <Link href="/#about" className="text-text-secondary hover:text-text-primary transition-colors">About</Link>
            <span className="text-accent text-sm font-medium">How It Works</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Launch App Button */}
            <a
              href="https://clawfile.dev/"
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
                { href: '/', label: 'Home' },
                { href: '/#features', label: 'Features' },
                { href: '/#code', label: 'SDK' },
                { href: '/#about', label: 'About' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-surface-raised rounded-lg transition-all"
                >
                  <ChevronRight className="w-4 h-4 text-accent" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              <div className="flex items-center gap-3 px-4 py-3 text-accent bg-accent/5 rounded-lg">
                <ChevronRight className="w-4 h-4" />
                <span className="font-medium">How It Works</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-subtle">
            <a
              href="https://clawfile.dev/"
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

      {/* ===== HEADER ===== */}
      <section className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm mb-6 sm:mb-8 fade-in">
            <Link href="/" className="flex items-center gap-1 sm:gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Home
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary">How It Works</span>
          </div>

          {/* Title */}
          <div className="mb-10 sm:mb-12 md:mb-16 fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">How It Works</h1>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary">
              How AI agents encrypt and share files securely, step by step.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FLOW STEPS ===== */}
      <section className="relative z-10 px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-3 sm:space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.title}>
                  {/* Step Card */}
                  <div
                    className="border border-subtle p-4 sm:p-6 md:p-7 bg-surface-raised rounded-card slide-up"
                    style={{ animationDelay: `${0.1 + i * 0.15}s`, opacity: 0 }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      {/* Step Number + Icon */}
                      <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] sm:text-xs text-accent font-mono font-semibold">{String(i + 1).padStart(2, '0')}</span>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-surface-overlay border border-subtle flex items-center justify-center">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold mb-1">{step.title}</h3>
                        <p className="text-text-secondary text-xs sm:text-sm">{step.subtitle}</p>
                        {step.content}
                      </div>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-1.5 sm:py-2">
                      <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 text-text-tertiary" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ===== SECURITY SUMMARY ===== */}
          <div className="mt-10 sm:mt-12 md:mt-16 border border-subtle p-5 sm:p-7 md:p-8 bg-surface-raised rounded-card fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-center">Security Guarantee</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Shield, title: 'Zero Knowledge', desc: 'Server never has encryption key' },
                { icon: Lock, title: 'AES-256-GCM', desc: 'Military-grade encryption standard' },
                { icon: Eye, title: 'Memory Only', desc: 'No persistent storage, ever' },
              ].map((item) => {
                const ItemIcon = item.icon
                return (
                  <div key={item.title} className="border border-subtle p-4 sm:p-5 text-center bg-surface-overlay rounded-card">
                    <ItemIcon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-accent" />
                    <h4 className="font-semibold text-xs sm:text-sm mb-1">{item.title}</h4>
                    <p className="text-[10px] sm:text-xs text-text-secondary">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Back CTA */}
          <div className="mt-8 sm:mt-10 md:mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-accent text-surface font-semibold rounded-button hover:bg-accent-dim transition-all text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-text-tertiary text-center sm:text-left">
            CLAWFILE &copy; 2026 &middot; AI-Agent Encryption &middot; Zero Knowledge
          </p>
          <div className="text-[10px] sm:text-xs text-text-tertiary font-mono">
            <span className="text-accent">$</span> clawfile <span className="text-text-tertiary">--version</span> <span className="text-accent">1.0.0</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
