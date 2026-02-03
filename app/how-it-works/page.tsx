'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowLeft, Lock, Key, Server, Eye, Shield, FileText, Download, Upload, ExternalLink } from 'lucide-react'

export default function HowItWorksPage() {
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
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="ClawFile" width={280} height={64} className="h-14 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <Link href="/#features" className="text-text-secondary hover:text-text-primary transition-colors">Features</Link>
            <Link href="/#code" className="text-text-secondary hover:text-text-primary transition-colors">SDK</Link>
            <Link href="/#about" className="text-text-secondary hover:text-text-primary transition-colors">About</Link>
            <span className="text-accent text-sm font-medium">How It Works</span>
          </div>
          <a
            href="https://clawfile.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-accent text-surface text-sm font-semibold rounded-button hover:bg-accent-dim transition-all duration-200"
          >
            Launch App
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </nav>

      {/* ===== HEADER ===== */}
      <section className="relative z-10 pt-32 pb-4 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-8 fade-in">
            <Link href="/" className="flex items-center gap-1.5 text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <span className="text-text-tertiary">/</span>
            <span className="text-text-primary">How It Works</span>
          </div>

          {/* Title */}
          <div className="mb-16 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-text-secondary">
              How AI agents encrypt and share files securely, step by step.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FLOW STEPS ===== */}
      <section className="relative z-10 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={step.title}>
                  {/* Step Card */}
                  <div
                    className="border border-subtle p-6 md:p-7 bg-surface-raised rounded-card slide-up"
                    style={{ animationDelay: `${0.1 + i * 0.15}s`, opacity: 0 }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Step Number + Icon */}
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-xs text-accent font-mono font-semibold">{String(i + 1).padStart(2, '0')}</span>
                        <div className="w-10 h-10 rounded-lg bg-surface-overlay border border-subtle flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                        <p className="text-text-secondary text-sm">{step.subtitle}</p>
                        {step.content}
                      </div>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {i < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowDown className="w-5 h-5 text-text-tertiary" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* ===== SECURITY SUMMARY ===== */}
          <div className="mt-16 border border-subtle p-7 md:p-8 bg-surface-raised rounded-card fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
            <h3 className="text-2xl font-bold mb-6 text-center">Security Guarantee</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: 'Zero Knowledge', desc: 'Server never has encryption key' },
                { icon: Lock, title: 'AES-256-GCM', desc: 'Military-grade encryption standard' },
                { icon: Eye, title: 'Memory Only', desc: 'No persistent storage, ever' },
              ].map((item) => {
                const ItemIcon = item.icon
                return (
                  <div key={item.title} className="border border-subtle p-5 text-center bg-surface-overlay rounded-card">
                    <ItemIcon className="w-8 h-8 mx-auto mb-3 text-accent" />
                    <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                    <p className="text-xs text-text-secondary">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Back CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-surface font-semibold rounded-button hover:bg-accent-dim transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 border-t border-subtle">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            CLAWFILE &copy; 2026 &middot; End-to-End Encrypted &middot; AI-Agent Native &middot; Open Source
          </p>
          <div className="text-xs text-text-tertiary font-mono">
            <span className="text-accent">$</span> clawfile <span className="text-text-tertiary">--version</span> <span className="text-accent">1.0.0</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
