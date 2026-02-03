'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Copy,
  Check,
  Terminal,
  Package,
  Zap,
  Shield,
  Code2,
  FileCode,
  Settings,
  AlertCircle,
  BookOpen,
  Cpu,
  Lock,
  Key,
  Clock,
  Users,
  Globe,
  Layers,
  Search,
  Hash,
  Play,
  FileText,
  RefreshCw,
  Trash2,
  Eye,
  Network,
  Box,
  GitBranch,
  MessageSquare,
  HelpCircle,
  List,
  Database,
  Server,
  Upload,
  Download,
  Link as LinkIcon,
  CheckCircle,
  XCircle,
  Info,
  AlertTriangle,
  Workflow,
} from 'lucide-react'

type Language = 'typescript' | 'python' | 'go'
type Section = string

interface TOCItem {
  id: string
  title: string
  level: number
}

interface NavItem {
  id: string
  title: string
  icon: React.ElementType
  children?: { id: string; title: string }[]
}

export default function SDKDocsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeLanguage, setActiveLanguage] = useState<Language>('typescript')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<Section>('introduction')
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started', 'api-reference'])
  const contentRef = useRef<HTMLDivElement>(null)

  const handleNavClick = () => {
    setMobileMenuOpen(false)
    setSidebarOpen(false)
  }

  useEffect(() => {
    if (mobileMenuOpen || sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen, sidebarOpen])

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      let current = 'introduction'

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100) {
          current = section.getAttribute('data-section') || current
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    )
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setSidebarOpen(false)
  }

  const navigation: NavItem[] = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      children: [
        { id: 'installation', title: 'Installation' },
        { id: 'quick-start', title: 'Quick Start' },
        { id: 'configuration', title: 'Configuration' },
      ],
    },
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      icon: Cpu,
      children: [
        { id: 'encryption', title: 'Encryption' },
        { id: 'key-management', title: 'Key Management' },
        { id: 'access-policies', title: 'Access Policies' },
        { id: 'file-lifecycle', title: 'File Lifecycle' },
      ],
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: Code2,
      children: [
        { id: 'clawfile-class', title: 'ClawFile Class' },
        { id: 'encrypt-method', title: 'encrypt()' },
        { id: 'decrypt-method', title: 'decrypt()' },
        { id: 'generate-link-method', title: 'generateLink()' },
        { id: 'verify-method', title: 'verify()' },
        { id: 'revoke-method', title: 'revoke()' },
        { id: 'types', title: 'Types & Interfaces' },
      ],
    },
    {
      id: 'advanced',
      title: 'Advanced Usage',
      icon: Layers,
      children: [
        { id: 'multi-agent', title: 'Multi-Agent Workflows' },
        { id: 'custom-policies', title: 'Custom Access Policies' },
        { id: 'streaming', title: 'Streaming Large Files' },
        { id: 'middleware', title: 'Middleware Integration' },
      ],
    },
    {
      id: 'examples',
      title: 'Examples',
      icon: FileCode,
      children: [
        { id: 'example-basic', title: 'Basic File Sharing' },
        { id: 'example-agent', title: 'Agent-to-Agent Transfer' },
        { id: 'example-langchain', title: 'LangChain Integration' },
        { id: 'example-crewai', title: 'CrewAI Integration' },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: AlertCircle,
      children: [
        { id: 'common-errors', title: 'Common Errors' },
        { id: 'faq', title: 'FAQ' },
      ],
    },
    { id: 'changelog', title: 'Changelog', icon: GitBranch },
  ]

  const CodeBlock = ({ code, language, id, title, showLineNumbers = false }: {
    code: string;
    language: string;
    id: string;
    title?: string;
    showLineNumbers?: boolean;
  }) => {
    const lines = code.split('\n')
    return (
      <div className="relative group my-4 rounded-lg overflow-hidden border border-subtle">
        {title && (
          <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-subtle">
            <span className="text-xs text-text-tertiary font-mono">{title}</span>
            <button
              onClick={() => copyToClipboard(code, id)}
              className="p-1.5 hover:bg-surface-overlay rounded transition-colors"
              title="Copy code"
            >
              {copiedCode === id ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-text-tertiary" />
              )}
            </button>
          </div>
        )}
        <div className="relative">
          {!title && (
            <button
              onClick={() => copyToClipboard(code, id)}
              className="absolute top-2 right-2 z-10 p-1.5 bg-surface-overlay border border-subtle rounded opacity-0 group-hover:opacity-100 transition-opacity"
              title="Copy code"
            >
              {copiedCode === id ? (
                <Check className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-text-tertiary" />
              )}
            </button>
          )}
          <pre className="bg-[#0d0d0d] p-4 overflow-x-auto text-[13px] leading-relaxed font-mono">
            <code className="text-text-primary">
              {showLineNumbers ? (
                lines.map((line, i) => (
                  <div key={i} className="flex">
                    <span className="select-none text-text-tertiary w-8 text-right mr-4 shrink-0">{i + 1}</span>
                    <span>{line}</span>
                  </div>
                ))
              ) : (
                code
              )}
            </code>
          </pre>
        </div>
      </div>
    )
  }

  const Callout = ({ type, title, children }: { type: 'info' | 'warning' | 'success' | 'error'; title?: string; children: React.ReactNode }) => {
    const styles = {
      info: { bg: 'bg-[#3b82f6]/10', border: 'border-[#3b82f6]/30', icon: Info, iconColor: 'text-[#3b82f6]' },
      warning: { bg: 'bg-[#f59e0b]/10', border: 'border-[#f59e0b]/30', icon: AlertTriangle, iconColor: 'text-[#f59e0b]' },
      success: { bg: 'bg-[#10b981]/10', border: 'border-[#10b981]/30', icon: CheckCircle, iconColor: 'text-[#10b981]' },
      error: { bg: 'bg-[#f43f5e]/10', border: 'border-[#f43f5e]/30', icon: XCircle, iconColor: 'text-[#f43f5e]' },
    }
    const style = styles[type]
    const Icon = style.icon

    return (
      <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-4`}>
        <div className="flex gap-3">
          <Icon className={`w-5 h-5 ${style.iconColor} shrink-0 mt-0.5`} />
          <div>
            {title && <p className="font-semibold text-sm mb-1">{title}</p>}
            <div className="text-sm text-text-secondary">{children}</div>
          </div>
        </div>
      </div>
    )
  }

  const LanguageTabs = () => (
    <div className="flex gap-1 p-1 bg-surface-raised rounded-lg border border-subtle w-fit mb-4">
      {(['typescript', 'python', 'go'] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => setActiveLanguage(lang)}
          className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
            activeLanguage === lang
              ? 'bg-accent text-surface'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {lang === 'typescript' ? 'TypeScript' : lang === 'python' ? 'Python' : 'Go'}
        </button>
      ))}
    </div>
  )

  const ParamTable = ({ params }: { params: { name: string; type: string; required?: boolean; default?: string; description: string }[] }) => (
    <div className="overflow-x-auto my-4">
      <table className="w-full text-sm border border-subtle rounded-lg overflow-hidden">
        <thead className="bg-surface">
          <tr className="border-b border-subtle">
            <th className="text-left p-3 font-semibold">Parameter</th>
            <th className="text-left p-3 font-semibold">Type</th>
            <th className="text-left p-3 font-semibold">Default</th>
            <th className="text-left p-3 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody className="bg-surface-raised">
          {params.map((param, i) => (
            <tr key={param.name} className={i !== params.length - 1 ? 'border-b border-subtle' : ''}>
              <td className="p-3">
                <code className="text-accent">{param.name}</code>
                {param.required && <span className="text-[#f43f5e] ml-1">*</span>}
              </td>
              <td className="p-3"><code className="text-text-tertiary text-xs">{param.type}</code></td>
              <td className="p-3"><code className="text-[#10b981] text-xs">{param.default || '-'}</code></td>
              <td className="p-3 text-text-secondary">{param.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <main className="min-h-screen bg-surface text-text-primary">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass border-b border-subtle h-14">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle (Mobile) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="ClawFile" width={140} height={32} className="h-7 w-auto" />
            </Link>

            <span className="hidden sm:block text-text-tertiary">/</span>
            <span className="hidden sm:block text-sm font-medium">Documentation</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-surface-raised rounded-lg border border-subtle">
              {(['typescript', 'python', 'go'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    activeLanguage === lang
                      ? 'bg-accent text-surface'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {lang === 'typescript' ? 'TS' : lang === 'python' ? 'PY' : 'GO'}
                </button>
              ))}
            </div>

            <a
              href="https://github.com/clawfile"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
            </a>

            <a
              href="https://encrypt.clawfile.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-accent text-surface text-xs font-semibold rounded-lg hover:bg-accent-dim transition-all"
            >
              Launch App
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </nav>

      {/* ===== SIDEBAR OVERLAY (Mobile) ===== */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-14 left-0 z-40 w-72 h-[calc(100vh-3.5rem)] bg-surface border-r border-subtle overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          {/* Mobile Language Selector */}
          <div className="sm:hidden mb-4">
            <LanguageTabs />
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isExpanded = expandedSections.includes(item.id)
              const hasChildren = item.children && item.children.length > 0
              const isActive = activeSection === item.id || item.children?.some(c => c.id === activeSection)

              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (hasChildren) {
                        toggleSection(item.id)
                      } else {
                        scrollToSection(item.id)
                      }
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.title}</span>
                    </div>
                    {hasChildren && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {hasChildren && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1 border-l border-subtle pl-3">
                      {item.children!.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => scrollToSection(child.id)}
                          className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                            activeSection === child.id
                              ? 'text-accent bg-accent/5'
                              : 'text-text-tertiary hover:text-text-primary'
                          }`}
                        >
                          {child.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <div className="lg:pl-72">
        <div className="pt-14">
          <div ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

            {/* ==================== INTRODUCTION ==================== */}
            <section id="introduction" data-section="introduction" className="scroll-mt-20">
              <div className="flex items-center gap-2 text-sm text-text-tertiary mb-4">
                <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-text-primary">SDK Documentation</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold mb-4">ClawFile SDK</h1>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                The official ClawFile SDK enables AI agents to encrypt and share files securely.
                This documentation covers installation, configuration, and usage for TypeScript, Python, and Go.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { icon: Package, label: 'v1.0.0', sublabel: 'Latest version' },
                  { icon: Shield, label: 'AES-256-GCM', sublabel: 'Encryption' },
                  { icon: Zap, label: '<50ms', sublabel: 'Latency' },
                  { icon: Globe, label: 'MIT', sublabel: 'License' },
                ].map((item) => {
                  const ItemIcon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3 p-3 border border-subtle rounded-lg bg-surface-raised">
                      <ItemIcon className="w-5 h-5 text-accent" />
                      <div>
                        <p className="font-semibold text-sm">{item.label}</p>
                        <p className="text-xs text-text-tertiary">{item.sublabel}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <h2 className="text-xl font-semibold mb-3">Features</h2>
              <ul className="space-y-2 mb-8">
                {[
                  'Agent-side encryption using AES-256-GCM',
                  'Zero-knowledge architecture - servers never see your data',
                  'Ephemeral storage with configurable TTL',
                  'Granular access policies for multi-agent workflows',
                  'Ed25519 cryptographic signatures for agent authentication',
                  'Drop-in integration with LangChain, CrewAI, and AutoGen',
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold mb-3">Supported Languages</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { name: 'TypeScript', icon: '🟦', version: 'Node.js 18+, Deno, Bun', pkg: '@clawfile/sdk' },
                  { name: 'Python', icon: '🐍', version: 'Python 3.9+', pkg: 'clawfile' },
                  { name: 'Go', icon: '🔵', version: 'Go 1.21+', pkg: 'github.com/clawfile/clawfile-go' },
                ].map((lang) => (
                  <div key={lang.name} className="p-4 border border-subtle rounded-lg bg-surface-raised">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{lang.icon}</span>
                      <span className="font-semibold">{lang.name}</span>
                    </div>
                    <p className="text-xs text-text-tertiary mb-1">{lang.version}</p>
                    <code className="text-xs text-accent">{lang.pkg}</code>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-subtle my-12" />

            {/* ==================== GETTING STARTED ==================== */}
            <section id="getting-started" data-section="getting-started" className="scroll-mt-20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <Play className="w-7 h-7 text-accent" />
                Getting Started
              </h1>
            </section>

            {/* Installation */}
            <section id="installation" data-section="installation" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Installation
              </h2>

              <p className="text-text-secondary mb-4">
                Install the ClawFile SDK using your preferred package manager:
              </p>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <>
                  <CodeBlock
                    code="npm install @clawfile/sdk"
                    language="bash"
                    id="install-npm"
                    title="npm"
                  />
                  <CodeBlock
                    code="yarn add @clawfile/sdk"
                    language="bash"
                    id="install-yarn"
                    title="yarn"
                  />
                  <CodeBlock
                    code="pnpm add @clawfile/sdk"
                    language="bash"
                    id="install-pnpm"
                    title="pnpm"
                  />
                </>
              )}

              {activeLanguage === 'python' && (
                <>
                  <CodeBlock
                    code="pip install clawfile"
                    language="bash"
                    id="install-pip"
                    title="pip"
                  />
                  <CodeBlock
                    code="poetry add clawfile"
                    language="bash"
                    id="install-poetry"
                    title="poetry"
                  />
                </>
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code="go get github.com/clawfile/clawfile-go"
                  language="bash"
                  id="install-go"
                  title="go get"
                />
              )}

              <Callout type="info" title="Requirements">
                {activeLanguage === 'typescript' && 'Requires Node.js 18+ or any runtime supporting the Web Crypto API (Deno, Bun, Cloudflare Workers).'}
                {activeLanguage === 'python' && 'Requires Python 3.9 or higher. Compatible with CPython and PyPy.'}
                {activeLanguage === 'go' && 'Requires Go 1.21 or higher.'}
              </Callout>
            </section>

            {/* Quick Start */}
            <section id="quick-start" data-section="quick-start" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Quick Start
              </h2>

              <p className="text-text-secondary mb-4">
                Here&apos;s a minimal example to encrypt a file and generate a shareable link:
              </p>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`import { ClawFile } from '@clawfile/sdk'

// 1. Initialize the client
const claw = new ClawFile({ agent: true })

// 2. Encrypt a file
const file = new File(['Hello, Agent!'], 'message.txt', { type: 'text/plain' })
const encrypted = await claw.encrypt(file, {
  expiry: 3600,      // Expires in 1 hour
  maxDownloads: 1,   // One-time download
})

// 3. Generate a shareable link
const link = await claw.generateLink(encrypted)
console.log(link)  // https://clawfile.dev/a7f3b2e9#9c4d7a1f

// 4. Recipient decrypts the file
const decrypted = await claw.decrypt(link)
console.log(await decrypted.text())  // "Hello, Agent!"`}
                  language="typescript"
                  id="quickstart-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`from clawfile import ClawFile

# 1. Initialize the client
claw = ClawFile(agent=True)

# 2. Encrypt a file
with open('message.txt', 'rb') as f:
    encrypted = await claw.encrypt(f,
        expiry=3600,       # Expires in 1 hour
        max_downloads=1    # One-time download
    )

# 3. Generate a shareable link
link = await claw.generate_link(encrypted)
print(link)  # https://clawfile.dev/a7f3b2e9#9c4d7a1f

# 4. Recipient decrypts the file
decrypted = await claw.decrypt(link)
print(decrypted.decode())  # "Hello, Agent!"`}
                  language="python"
                  id="quickstart-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`package main

import (
    "fmt"
    "github.com/clawfile/clawfile-go"
)

func main() {
    // 1. Initialize the client
    claw := clawfile.New(&clawfile.Config{Agent: true})

    // 2. Encrypt a file
    encrypted, _ := claw.Encrypt("message.txt", &clawfile.EncryptOptions{
        Expiry:       3600,  // Expires in 1 hour
        MaxDownloads: 1,     // One-time download
    })

    // 3. Generate a shareable link
    link, _ := claw.GenerateLink(encrypted)
    fmt.Println(link)  // https://clawfile.dev/a7f3b2e9#9c4d7a1f

    // 4. Recipient decrypts the file
    decrypted, _ := claw.Decrypt(link)
    fmt.Println(string(decrypted))  // "Hello, Agent!"
}`}
                  language="go"
                  id="quickstart-go"
                  showLineNumbers
                />
              )}

              <Callout type="success" title="How it works">
                <ol className="list-decimal list-inside space-y-1 mt-2">
                  <li>The SDK generates a 256-bit encryption key locally</li>
                  <li>Your file is encrypted using AES-256-GCM within your runtime</li>
                  <li>Only the encrypted ciphertext is uploaded to ClawFile servers</li>
                  <li>The decryption key is embedded in the URL fragment (never sent to servers)</li>
                </ol>
              </Callout>
            </section>

            {/* Configuration */}
            <section id="configuration" data-section="configuration" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Configuration
              </h2>

              <p className="text-text-secondary mb-4">
                The ClawFile client accepts the following configuration options:
              </p>

              <h3 className="text-lg font-semibold mb-3">Client Options</h3>
              <ParamTable params={[
                { name: 'agent', type: 'boolean', default: 'false', description: 'Enable agent mode for AI-to-AI file sharing with enhanced security features.' },
                { name: 'apiKey', type: 'string', default: 'undefined', description: 'Optional API key for authenticated requests. Required for custom access policies.' },
                { name: 'endpoint', type: 'string', default: '"https://api.clawfile.dev"', description: 'Custom API endpoint URL. Useful for self-hosted deployments.' },
                { name: 'timeout', type: 'number', default: '30000', description: 'Request timeout in milliseconds.' },
                { name: 'retries', type: 'number', default: '3', description: 'Number of retry attempts for failed requests.' },
                { name: 'agentId', type: 'string', default: 'auto-generated', description: 'Custom agent identifier. Used for access policies and audit logs.' },
                { name: 'signRequests', type: 'boolean', default: 'true', description: 'Sign all requests with Ed25519 for authentication.' },
              ]} />

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`import { ClawFile } from '@clawfile/sdk'

const claw = new ClawFile({
  agent: true,
  apiKey: process.env.CLAWFILE_API_KEY,
  endpoint: 'https://api.clawfile.dev',
  timeout: 30000,
  retries: 3,
  agentId: 'my-agent-001',
  signRequests: true,
})`}
                  language="typescript"
                  id="config-ts"
                  title="Configuration Example"
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`from clawfile import ClawFile
import os

claw = ClawFile(
    agent=True,
    api_key=os.environ.get("CLAWFILE_API_KEY"),
    endpoint="https://api.clawfile.dev",
    timeout=30000,
    retries=3,
    agent_id="my-agent-001",
    sign_requests=True,
)`}
                  language="python"
                  id="config-py"
                  title="Configuration Example"
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`package main

import (
    "os"
    "github.com/clawfile/clawfile-go"
)

func main() {
    claw := clawfile.New(&clawfile.Config{
        Agent:        true,
        APIKey:       os.Getenv("CLAWFILE_API_KEY"),
        Endpoint:     "https://api.clawfile.dev",
        Timeout:      30000,
        Retries:      3,
        AgentID:      "my-agent-001",
        SignRequests: true,
    })
}`}
                  language="go"
                  id="config-go"
                  title="Configuration Example"
                />
              )}

              <Callout type="warning" title="Environment Variables">
                Never hardcode API keys in your source code. Always use environment variables or a secrets manager.
              </Callout>
            </section>

            <hr className="border-subtle my-12" />

            {/* ==================== CORE CONCEPTS ==================== */}
            <section id="core-concepts" data-section="core-concepts" className="scroll-mt-20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <Cpu className="w-7 h-7 text-accent" />
                Core Concepts
              </h1>
              <p className="text-text-secondary mb-8">
                Understanding these concepts will help you build secure file sharing workflows with ClawFile.
              </p>
            </section>

            {/* Encryption */}
            <section id="encryption" data-section="encryption" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Encryption
              </h2>

              <p className="text-text-secondary mb-4">
                ClawFile uses <strong>AES-256-GCM</strong> (Advanced Encryption Standard with Galois/Counter Mode) for all file encryption.
                This is the same encryption standard used by governments and financial institutions worldwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border border-subtle rounded-lg bg-surface-raised">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-accent" />
                    Agent-Side Encryption
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Encryption happens entirely within your agent&apos;s runtime.
                    The encryption key is generated locally and never transmitted to any server.
                  </p>
                </div>
                <div className="p-4 border border-subtle rounded-lg bg-surface-raised">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    Authenticated Encryption
                  </h4>
                  <p className="text-sm text-text-secondary">
                    GCM mode provides both encryption and authentication.
                    Any tampering with the ciphertext will be detected during decryption.
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-3">Encryption Flow</h3>
              <div className="space-y-3 mb-6">
                {[
                  { step: '1', title: 'Key Generation', desc: 'A cryptographically secure 256-bit key and 96-bit IV are generated using the Web Crypto API.' },
                  { step: '2', title: 'Encryption', desc: 'Your file is encrypted using AES-256-GCM with the generated key and IV.' },
                  { step: '3', title: 'Upload', desc: 'Only the encrypted ciphertext is uploaded to ClawFile servers. The key stays with you.' },
                  { step: '4', title: 'Link Generation', desc: 'A shareable URL is created with the file ID in the path and the encryption key in the fragment.' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 border border-subtle rounded-lg bg-surface-raised">
                    <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-accent">{item.step}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-sm text-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Callout type="info" title="URL Fragment Security">
                The encryption key is stored in the URL fragment (after the #).
                URL fragments are never sent to servers by web browsers, ensuring the key remains client-side only.
              </Callout>
            </section>

            {/* Key Management */}
            <section id="key-management" data-section="key-management" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Key Management
              </h2>

              <p className="text-text-secondary mb-4">
                ClawFile generates unique encryption keys for each file. You have full control over how keys are distributed.
              </p>

              <h3 className="text-lg font-semibold mb-3">Key Types</h3>
              <ParamTable params={[
                { name: 'File Key', type: '256-bit', description: 'Unique AES-256 key generated for each file. Embedded in the shareable URL fragment.' },
                { name: 'Agent Key', type: 'Ed25519', description: 'Optional signing key for agent authentication. Used to prove agent identity.' },
                { name: 'API Key', type: 'string', description: 'Optional authentication key for accessing advanced features like custom policies.' },
              ]} />

              <h3 className="text-lg font-semibold mb-3 mt-6">Key Storage Best Practices</h3>
              <ul className="space-y-2 mb-6">
                {[
                  'Never log or persist encryption keys',
                  'Share URLs through secure channels only',
                  'Use short TTL values for sensitive files',
                  'Enable one-time download for highly sensitive data',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-[#10b981] mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Access Policies */}
            <section id="access-policies" data-section="access-policies" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Access Policies
              </h2>

              <p className="text-text-secondary mb-4">
                Control who can access your encrypted files with granular access policies.
              </p>

              <h3 className="text-lg font-semibold mb-3">Policy Types</h3>
              <div className="space-y-4 mb-6">
                {[
                  { name: 'PUBLIC', desc: 'Anyone with the link can decrypt the file. Default policy.', icon: Globe },
                  { name: 'AGENT_ONLY', desc: 'Only requests from verified AI agents can decrypt. Human browsers blocked.', icon: Cpu },
                  { name: 'ALLOWLIST', desc: 'Only specific agent IDs can decrypt. Most restrictive policy.', icon: Users },
                ].map((policy) => {
                  const Icon = policy.icon
                  return (
                    <div key={policy.name} className="flex gap-4 p-4 border border-subtle rounded-lg bg-surface-raised">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <code className="text-accent font-semibold">{policy.name}</code>
                        <p className="text-sm text-text-secondary mt-1">{policy.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`// Allow only specific agents to decrypt
const encrypted = await claw.encrypt(file, {
  accessPolicy: 'ALLOWLIST',
  allowedAgents: [
    'agent-sales-001',
    'agent-support-002',
    'agent-analytics-003',
  ],
  expiry: 3600,
})`}
                  language="typescript"
                  id="policy-ts"
                  title="Allowlist Policy Example"
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`# Allow only specific agents to decrypt
encrypted = await claw.encrypt(file,
    access_policy="ALLOWLIST",
    allowed_agents=[
        "agent-sales-001",
        "agent-support-002",
        "agent-analytics-003",
    ],
    expiry=3600,
)`}
                  language="python"
                  id="policy-py"
                  title="Allowlist Policy Example"
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// Allow only specific agents to decrypt
encrypted, _ := claw.Encrypt(file, &clawfile.EncryptOptions{
    AccessPolicy: clawfile.Allowlist,
    AllowedAgents: []string{
        "agent-sales-001",
        "agent-support-002",
        "agent-analytics-003",
    },
    Expiry: 3600,
})`}
                  language="go"
                  id="policy-go"
                  title="Allowlist Policy Example"
                />
              )}
            </section>

            {/* File Lifecycle */}
            <section id="file-lifecycle" data-section="file-lifecycle" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                File Lifecycle
              </h2>

              <p className="text-text-secondary mb-4">
                ClawFile files are ephemeral by design. They exist only as long as needed and then self-destruct.
              </p>

              <h3 className="text-lg font-semibold mb-3">Lifecycle Options</h3>
              <ParamTable params={[
                { name: 'expiry', type: 'number', default: '86400', description: 'Time-to-live in seconds. File auto-deletes after this duration. Max: 7 days.' },
                { name: 'maxDownloads', type: 'number', default: 'unlimited', description: 'Maximum download count. File auto-deletes after reaching this limit.' },
                { name: 'deleteOnView', type: 'boolean', default: 'false', description: 'Delete immediately after first successful decryption.' },
              ]} />

              <div className="my-6 p-4 border border-subtle rounded-lg bg-surface-raised">
                <h4 className="font-semibold mb-3">Storage Architecture</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-3 border border-subtle rounded bg-surface">
                    <Database className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <p className="font-semibold text-sm">RAM Only</p>
                    <p className="text-xs text-text-tertiary">No disk persistence</p>
                  </div>
                  <div className="p-3 border border-subtle rounded bg-surface">
                    <Clock className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <p className="font-semibold text-sm">Auto-Expiry</p>
                    <p className="text-xs text-text-tertiary">Configurable TTL</p>
                  </div>
                  <div className="p-3 border border-subtle rounded bg-surface">
                    <Trash2 className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <p className="font-semibold text-sm">Secure Deletion</p>
                    <p className="text-xs text-text-tertiary">Memory zeroing</p>
                  </div>
                </div>
              </div>

              <Callout type="warning" title="Data Retention">
                ClawFile does not retain any data after expiry. Once a file expires or is deleted,
                it cannot be recovered. Ensure recipients download files before expiration.
              </Callout>
            </section>

            <hr className="border-subtle my-12" />

            {/* ==================== API REFERENCE ==================== */}
            <section id="api-reference" data-section="api-reference" className="scroll-mt-20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <Code2 className="w-7 h-7 text-accent" />
                API Reference
              </h1>
              <p className="text-text-secondary mb-8">
                Complete reference for all ClawFile SDK methods and types.
              </p>
            </section>

            {/* ClawFile Class */}
            <section id="clawfile-class" data-section="clawfile-class" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                ClawFile Class
              </h2>

              <p className="text-text-secondary mb-4">
                The main entry point for the ClawFile SDK. Create an instance to start encrypting and sharing files.
              </p>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`import { ClawFile } from '@clawfile/sdk'

class ClawFile {
  constructor(config?: ClawFileConfig)

  // Core methods
  encrypt(file: File | Buffer | string, options?: EncryptOptions): Promise<EncryptedFile>
  decrypt(url: string, options?: DecryptOptions): Promise<DecryptedFile>
  generateLink(encrypted: EncryptedFile, options?: LinkOptions): Promise<string>

  // Utility methods
  verify(url: string): Promise<VerificationResult>
  revoke(fileId: string): Promise<void>

  // Properties
  readonly agentId: string
  readonly isConnected: boolean
}`}
                  language="typescript"
                  id="class-ts"
                  title="Class Definition"
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`from clawfile import ClawFile

class ClawFile:
    def __init__(self, **config: ClawFileConfig) -> None: ...

    # Core methods
    async def encrypt(self, file: BinaryIO | str, **options: EncryptOptions) -> EncryptedFile: ...
    async def decrypt(self, url: str, **options: DecryptOptions) -> bytes: ...
    async def generate_link(self, encrypted: EncryptedFile, **options: LinkOptions) -> str: ...

    # Utility methods
    async def verify(self, url: str) -> VerificationResult: ...
    async def revoke(self, file_id: str) -> None: ...

    # Properties
    @property
    def agent_id(self) -> str: ...
    @property
    def is_connected(self) -> bool: ...`}
                  language="python"
                  id="class-py"
                  title="Class Definition"
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`package clawfile

type ClawFile struct {
    // private fields
}

func New(config *Config) *ClawFile

// Core methods
func (c *ClawFile) Encrypt(file interface{}, opts *EncryptOptions) (*EncryptedFile, error)
func (c *ClawFile) Decrypt(url string, opts *DecryptOptions) ([]byte, error)
func (c *ClawFile) GenerateLink(encrypted *EncryptedFile, opts *LinkOptions) (string, error)

// Utility methods
func (c *ClawFile) Verify(url string) (*VerificationResult, error)
func (c *ClawFile) Revoke(fileID string) error

// Properties
func (c *ClawFile) AgentID() string
func (c *ClawFile) IsConnected() bool`}
                  language="go"
                  id="class-go"
                  title="Type Definition"
                />
              )}
            </section>

            {/* encrypt() */}
            <section id="encrypt-method" data-section="encrypt-method" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                encrypt()
              </h2>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <code className="text-lg font-bold text-accent">encrypt(file, options?)</code>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20">async</span>
              </div>

              <p className="text-text-secondary mb-4">
                Encrypts a file using AES-256-GCM encryption. The encryption happens entirely within your local runtime.
              </p>

              <h3 className="text-lg font-semibold mb-3">Parameters</h3>
              <ParamTable params={[
                { name: 'file', type: 'File | Buffer | string', required: true, description: 'The file to encrypt. Can be a File object, Buffer, or file path.' },
              ]} />

              <h3 className="text-lg font-semibold mb-3 mt-6">Options</h3>
              <ParamTable params={[
                { name: 'expiry', type: 'number', default: '86400', description: 'Time-to-live in seconds (default: 24 hours, max: 7 days).' },
                { name: 'maxDownloads', type: 'number', default: 'unlimited', description: 'Maximum number of downloads allowed.' },
                { name: 'accessPolicy', type: 'string', default: '"PUBLIC"', description: '"PUBLIC" | "AGENT_ONLY" | "ALLOWLIST"' },
                { name: 'allowedAgents', type: 'string[]', default: '[]', description: 'Agent IDs allowed to decrypt (when using ALLOWLIST policy).' },
                { name: 'metadata', type: 'object', default: '{}', description: 'Custom metadata to attach (not encrypted, visible in verify()).' },
                { name: 'compression', type: 'boolean', default: 'true', description: 'Enable gzip compression before encryption.' },
                { name: 'fileName', type: 'string', default: 'original', description: 'Override the original filename.' },
              ]} />

              <h3 className="text-lg font-semibold mb-3 mt-6">Returns</h3>
              <p className="text-text-secondary mb-4">
                <code className="text-[#10b981]">Promise&lt;EncryptedFile&gt;</code> - An object containing the encrypted data, file ID, and encryption key.
              </p>

              <h3 className="text-lg font-semibold mb-3">Example</h3>
              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`// Basic encryption
const encrypted = await claw.encrypt(file)

// With options
const encrypted = await claw.encrypt(file, {
  expiry: 3600,              // 1 hour
  maxDownloads: 5,           // Max 5 downloads
  accessPolicy: 'ALLOWLIST',
  allowedAgents: ['agent-1', 'agent-2'],
  metadata: {
    project: 'acme-ai',
    version: '1.0.0',
  },
  compression: true,
  fileName: 'report.pdf',
})

// Access encrypted data
console.log(encrypted.fileId)      // "a7f3b2e9"
console.log(encrypted.key)         // "9c4d7a1f..." (256-bit)
console.log(encrypted.size)        // 1024 (bytes)
console.log(encrypted.compressed)  // true`}
                  language="typescript"
                  id="encrypt-example-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`# Basic encryption
encrypted = await claw.encrypt(file)

# With options
encrypted = await claw.encrypt(file,
    expiry=3600,              # 1 hour
    max_downloads=5,          # Max 5 downloads
    access_policy="ALLOWLIST",
    allowed_agents=["agent-1", "agent-2"],
    metadata={
        "project": "acme-ai",
        "version": "1.0.0",
    },
    compression=True,
    file_name="report.pdf",
)

# Access encrypted data
print(encrypted.file_id)      # "a7f3b2e9"
print(encrypted.key)          # "9c4d7a1f..." (256-bit)
print(encrypted.size)         # 1024 (bytes)
print(encrypted.compressed)   # True`}
                  language="python"
                  id="encrypt-example-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// Basic encryption
encrypted, err := claw.Encrypt(file, nil)

// With options
encrypted, err := claw.Encrypt(file, &clawfile.EncryptOptions{
    Expiry:        3600,              // 1 hour
    MaxDownloads:  5,                 // Max 5 downloads
    AccessPolicy:  clawfile.Allowlist,
    AllowedAgents: []string{"agent-1", "agent-2"},
    Metadata: map[string]string{
        "project": "acme-ai",
        "version": "1.0.0",
    },
    Compression: true,
    FileName:    "report.pdf",
})

// Access encrypted data
fmt.Println(encrypted.FileID)      // "a7f3b2e9"
fmt.Println(encrypted.Key)         // "9c4d7a1f..." (256-bit)
fmt.Println(encrypted.Size)        // 1024 (bytes)
fmt.Println(encrypted.Compressed)  // true`}
                  language="go"
                  id="encrypt-example-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* decrypt() */}
            <section id="decrypt-method" data-section="decrypt-method" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                decrypt()
              </h2>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <code className="text-lg font-bold text-accent">decrypt(url, options?)</code>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20">async</span>
              </div>

              <p className="text-text-secondary mb-4">
                Decrypts a file from a ClawFile URL. The decryption key is automatically extracted from the URL fragment.
              </p>

              <h3 className="text-lg font-semibold mb-3">Parameters</h3>
              <ParamTable params={[
                { name: 'url', type: 'string', required: true, description: 'The ClawFile URL containing the file ID and encryption key.' },
              ]} />

              <h3 className="text-lg font-semibold mb-3 mt-6">Options</h3>
              <ParamTable params={[
                { name: 'outputFormat', type: 'string', default: '"buffer"', description: '"buffer" | "stream" | "file" - How to return the decrypted data.' },
                { name: 'outputPath', type: 'string', default: 'undefined', description: 'File path to write decrypted data (when outputFormat is "file").' },
              ]} />

              <h3 className="text-lg font-semibold mb-3 mt-6">Example</h3>
              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`// Decrypt from URL
const url = 'https://clawfile.dev/a7f3b2e9#9c4d7a1f'
const decrypted = await claw.decrypt(url)

// Access decrypted data
console.log(await decrypted.text())       // As string
console.log(await decrypted.arrayBuffer()) // As ArrayBuffer
console.log(decrypted.name)               // Original filename
console.log(decrypted.type)               // MIME type
console.log(decrypted.size)               // Size in bytes

// Save to file (Node.js)
import { writeFileSync } from 'fs'
writeFileSync('output.pdf', Buffer.from(await decrypted.arrayBuffer()))`}
                  language="typescript"
                  id="decrypt-example-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`# Decrypt from URL
url = "https://clawfile.dev/a7f3b2e9#9c4d7a1f"
decrypted = await claw.decrypt(url)

# Access decrypted data (returns bytes)
print(decrypted.decode())  # As string
print(len(decrypted))      # Size in bytes

# Save to file
with open("output.pdf", "wb") as f:
    f.write(decrypted)

# Or use output_path option
await claw.decrypt(url, output_format="file", output_path="output.pdf")`}
                  language="python"
                  id="decrypt-example-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// Decrypt from URL
url := "https://clawfile.dev/a7f3b2e9#9c4d7a1f"
decrypted, err := claw.Decrypt(url, nil)

// Access decrypted data (returns []byte)
fmt.Println(string(decrypted))  // As string
fmt.Println(len(decrypted))     // Size in bytes

// Save to file
err = os.WriteFile("output.pdf", decrypted, 0644)

// Or use OutputPath option
_, err = claw.Decrypt(url, &clawfile.DecryptOptions{
    OutputFormat: "file",
    OutputPath:   "output.pdf",
})`}
                  language="go"
                  id="decrypt-example-go"
                  showLineNumbers
                />
              )}

              <Callout type="error" title="Common Errors">
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li><code>FILE_NOT_FOUND</code> - The file ID doesn&apos;t exist</li>
                  <li><code>FILE_EXPIRED</code> - The file has exceeded its TTL</li>
                  <li><code>ACCESS_DENIED</code> - Your agent is not in the allowlist</li>
                  <li><code>DECRYPTION_FAILED</code> - Invalid or corrupted key</li>
                </ul>
              </Callout>
            </section>

            {/* generateLink() */}
            <section id="generate-link-method" data-section="generate-link-method" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                generateLink()
              </h2>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <code className="text-lg font-bold text-accent">generateLink(encrypted, options?)</code>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20">async</span>
              </div>

              <p className="text-text-secondary mb-4">
                Generates a shareable URL from encrypted file data. The URL contains the file ID and encryption key.
              </p>

              <h3 className="text-lg font-semibold mb-3">Parameters</h3>
              <ParamTable params={[
                { name: 'encrypted', type: 'EncryptedFile', required: true, description: 'The encrypted file object returned by encrypt().' },
              ]} />

              <h3 className="text-lg font-semibold mb-3 mt-6">Options</h3>
              <ParamTable params={[
                { name: 'customSlug', type: 'string', default: 'random', description: 'Custom URL slug instead of random ID (requires API key).' },
                { name: 'password', type: 'string', default: 'undefined', description: 'Additional password protection layer.' },
                { name: 'baseUrl', type: 'string', default: '"https://clawfile.dev"', description: 'Custom base URL for self-hosted deployments.' },
              ]} />

              <h3 className="text-lg font-semibold mb-3 mt-6">Returns</h3>
              <p className="text-text-secondary mb-4">
                <code className="text-[#10b981]">Promise&lt;string&gt;</code> - The shareable URL in format: <code>https://clawfile.dev/[fileId]#[key]</code>
              </p>

              <h3 className="text-lg font-semibold mb-3">Example</h3>
              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`const encrypted = await claw.encrypt(file)

// Basic link
const link = await claw.generateLink(encrypted)
// https://clawfile.dev/a7f3b2e9#9c4d7a1f

// With custom slug
const link = await claw.generateLink(encrypted, {
  customSlug: 'quarterly-report-q4',
})
// https://clawfile.dev/quarterly-report-q4#9c4d7a1f

// With password protection
const link = await claw.generateLink(encrypted, {
  password: 'secret123',
})
// Recipient will be prompted for password before decryption`}
                  language="typescript"
                  id="genlink-example-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`encrypted = await claw.encrypt(file)

# Basic link
link = await claw.generate_link(encrypted)
# https://clawfile.dev/a7f3b2e9#9c4d7a1f

# With custom slug
link = await claw.generate_link(encrypted,
    custom_slug="quarterly-report-q4"
)
# https://clawfile.dev/quarterly-report-q4#9c4d7a1f

# With password protection
link = await claw.generate_link(encrypted,
    password="secret123"
)
# Recipient will be prompted for password before decryption`}
                  language="python"
                  id="genlink-example-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`encrypted, _ := claw.Encrypt(file, nil)

// Basic link
link, _ := claw.GenerateLink(encrypted, nil)
// https://clawfile.dev/a7f3b2e9#9c4d7a1f

// With custom slug
link, _ := claw.GenerateLink(encrypted, &clawfile.LinkOptions{
    CustomSlug: "quarterly-report-q4",
})
// https://clawfile.dev/quarterly-report-q4#9c4d7a1f

// With password protection
link, _ := claw.GenerateLink(encrypted, &clawfile.LinkOptions{
    Password: "secret123",
})
// Recipient will be prompted for password before decryption`}
                  language="go"
                  id="genlink-example-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* verify() */}
            <section id="verify-method" data-section="verify-method" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                verify()
              </h2>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <code className="text-lg font-bold text-accent">verify(url)</code>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20">async</span>
              </div>

              <p className="text-text-secondary mb-4">
                Verifies that a ClawFile URL is valid and accessible without actually downloading or decrypting the file.
              </p>

              <h3 className="text-lg font-semibold mb-3 mt-6">Example</h3>
              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`const result = await claw.verify('https://clawfile.dev/a7f3b2e9#9c4d7a1f')

console.log(result.valid)           // true
console.log(result.exists)          // true
console.log(result.expired)         // false
console.log(result.remainingTTL)    // 3542 (seconds)
console.log(result.remainingDownloads) // 4
console.log(result.metadata)        // { project: 'acme-ai' }
console.log(result.accessPolicy)    // 'PUBLIC'
console.log(result.fileSize)        // 1024
console.log(result.createdAt)       // '2024-01-15T10:30:00Z'`}
                  language="typescript"
                  id="verify-example-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`result = await claw.verify("https://clawfile.dev/a7f3b2e9#9c4d7a1f")

print(result.valid)             # True
print(result.exists)            # True
print(result.expired)           # False
print(result.remaining_ttl)     # 3542 (seconds)
print(result.remaining_downloads)  # 4
print(result.metadata)          # { "project": "acme-ai" }
print(result.access_policy)     # "PUBLIC"
print(result.file_size)         # 1024
print(result.created_at)        # "2024-01-15T10:30:00Z"`}
                  language="python"
                  id="verify-example-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`result, _ := claw.Verify("https://clawfile.dev/a7f3b2e9#9c4d7a1f")

fmt.Println(result.Valid)             // true
fmt.Println(result.Exists)            // true
fmt.Println(result.Expired)           // false
fmt.Println(result.RemainingTTL)      // 3542 (seconds)
fmt.Println(result.RemainingDownloads)// 4
fmt.Println(result.Metadata)          // map[project:acme-ai]
fmt.Println(result.AccessPolicy)      // "PUBLIC"
fmt.Println(result.FileSize)          // 1024
fmt.Println(result.CreatedAt)         // "2024-01-15T10:30:00Z"`}
                  language="go"
                  id="verify-example-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* revoke() */}
            <section id="revoke-method" data-section="revoke-method" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                revoke()
              </h2>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <code className="text-lg font-bold text-accent">revoke(fileId)</code>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20">async</span>
              </div>

              <p className="text-text-secondary mb-4">
                Immediately revokes access to an encrypted file, making it inaccessible even if the link is still valid.
              </p>

              <Callout type="warning" title="Irreversible Action">
                Once revoked, a file cannot be recovered. The encrypted data is immediately deleted from memory.
              </Callout>

              <h3 className="text-lg font-semibold mb-3 mt-6">Example</h3>
              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`// Revoke access to a file
await claw.revoke('a7f3b2e9')

// Attempting to decrypt will now fail
try {
  await claw.decrypt('https://clawfile.dev/a7f3b2e9#9c4d7a1f')
} catch (error) {
  console.log(error.code) // 'FILE_NOT_FOUND'
}`}
                  language="typescript"
                  id="revoke-example-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`# Revoke access to a file
await claw.revoke("a7f3b2e9")

# Attempting to decrypt will now fail
try:
    await claw.decrypt("https://clawfile.dev/a7f3b2e9#9c4d7a1f")
except ClawFileError as e:
    print(e.code)  # "FILE_NOT_FOUND"`}
                  language="python"
                  id="revoke-example-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// Revoke access to a file
err := claw.Revoke("a7f3b2e9")

// Attempting to decrypt will now fail
_, err = claw.Decrypt("https://clawfile.dev/a7f3b2e9#9c4d7a1f", nil)
if err != nil {
    fmt.Println(err) // "FILE_NOT_FOUND"
}`}
                  language="go"
                  id="revoke-example-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* Types */}
            <section id="types" data-section="types" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Types & Interfaces
              </h2>

              <p className="text-text-secondary mb-4">
                TypeScript type definitions for all SDK objects.
              </p>

              <CodeBlock
                code={`// Configuration
interface ClawFileConfig {
  agent?: boolean
  apiKey?: string
  endpoint?: string
  timeout?: number
  retries?: number
  agentId?: string
  signRequests?: boolean
}

// Encryption Options
interface EncryptOptions {
  expiry?: number
  maxDownloads?: number
  accessPolicy?: 'PUBLIC' | 'AGENT_ONLY' | 'ALLOWLIST'
  allowedAgents?: string[]
  metadata?: Record<string, unknown>
  compression?: boolean
  fileName?: string
}

// Encrypted File
interface EncryptedFile {
  fileId: string
  key: string
  iv: string
  size: number
  compressed: boolean
  checksum: string
}

// Decrypted File
interface DecryptedFile extends Blob {
  name: string
  type: string
  size: number
  text(): Promise<string>
  arrayBuffer(): Promise<ArrayBuffer>
}

// Verification Result
interface VerificationResult {
  valid: boolean
  exists: boolean
  expired: boolean
  remainingTTL: number
  remainingDownloads: number | null
  metadata: Record<string, unknown>
  accessPolicy: string
  fileSize: number
  createdAt: string
}

// Errors
class ClawFileError extends Error {
  code: string
  statusCode?: number
}

class EncryptionError extends ClawFileError {}
class DecryptionError extends ClawFileError {}
class NetworkError extends ClawFileError {}
class AccessDeniedError extends ClawFileError {}`}
                language="typescript"
                id="types-ts"
                title="types.d.ts"
                showLineNumbers
              />
            </section>

            <hr className="border-subtle my-12" />

            {/* ==================== ADVANCED USAGE ==================== */}
            <section id="advanced" data-section="advanced" className="scroll-mt-20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <Layers className="w-7 h-7 text-accent" />
                Advanced Usage
              </h1>
              <p className="text-text-secondary mb-8">
                Advanced patterns and techniques for building sophisticated AI agent workflows with ClawFile.
              </p>
            </section>

            {/* Multi-Agent Workflows */}
            <section id="multi-agent" data-section="multi-agent" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Multi-Agent Workflows
              </h2>

              <p className="text-text-secondary mb-4">
                ClawFile is designed for complex multi-agent architectures where files need to flow securely between autonomous systems.
              </p>

              <div className="my-6 p-4 border border-subtle rounded-lg bg-surface-raised">
                <h4 className="font-semibold mb-3">Common Patterns</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 border border-subtle rounded bg-surface">
                    <Network className="w-5 h-5 mb-2 text-accent" />
                    <p className="font-semibold text-sm">Hub & Spoke</p>
                    <p className="text-xs text-text-tertiary">Central orchestrator distributes files to worker agents</p>
                  </div>
                  <div className="p-3 border border-subtle rounded bg-surface">
                    <Workflow className="w-5 h-5 mb-2 text-accent" />
                    <p className="font-semibold text-sm">Pipeline</p>
                    <p className="text-xs text-text-tertiary">Sequential agent chain with file handoffs</p>
                  </div>
                  <div className="p-3 border border-subtle rounded bg-surface">
                    <Users className="w-5 h-5 mb-2 text-accent" />
                    <p className="font-semibold text-sm">Broadcast</p>
                    <p className="text-xs text-text-tertiary">One sender, multiple authorized receivers</p>
                  </div>
                  <div className="p-3 border border-subtle rounded bg-surface">
                    <RefreshCw className="w-5 h-5 mb-2 text-accent" />
                    <p className="font-semibold text-sm">Round-Robin</p>
                    <p className="text-xs text-text-tertiary">Load-balanced distribution across agents</p>
                  </div>
                </div>
              </div>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`// Multi-agent workflow: Orchestrator distributes tasks to workers
import { ClawFile } from '@clawfile/sdk'

const orchestrator = new ClawFile({
  agent: true,
  agentId: 'orchestrator-main'
})

// Define worker agents
const workers = [
  'worker-analysis-001',
  'worker-analysis-002',
  'worker-analysis-003',
]

// Encrypt and distribute file to specific workers only
async function distributeTask(file: File, assignedWorkers: string[]) {
  const encrypted = await orchestrator.encrypt(file, {
    accessPolicy: 'ALLOWLIST',
    allowedAgents: assignedWorkers,
    expiry: 3600,
    metadata: {
      taskType: 'analysis',
      priority: 'high',
      assignedAt: new Date().toISOString(),
    },
  })

  const link = await orchestrator.generateLink(encrypted)

  // Send link to assigned workers via your message queue
  return { link, fileId: encrypted.fileId }
}

// Worker receives and processes
const worker = new ClawFile({
  agent: true,
  agentId: 'worker-analysis-001'
})

async function processTask(link: string) {
  // Verify we have access before downloading
  const verification = await worker.verify(link)
  if (!verification.valid) {
    throw new Error('Not authorized for this task')
  }

  // Decrypt and process
  const file = await worker.decrypt(link)
  return processFile(file)
}`}
                  language="typescript"
                  id="multiagent-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`# Multi-agent workflow: Orchestrator distributes tasks to workers
from clawfile import ClawFile
from datetime import datetime

orchestrator = ClawFile(
    agent=True,
    agent_id="orchestrator-main"
)

# Define worker agents
workers = [
    "worker-analysis-001",
    "worker-analysis-002",
    "worker-analysis-003",
]

# Encrypt and distribute file to specific workers only
async def distribute_task(file_path: str, assigned_workers: list[str]):
    with open(file_path, "rb") as f:
        encrypted = await orchestrator.encrypt(f,
            access_policy="ALLOWLIST",
            allowed_agents=assigned_workers,
            expiry=3600,
            metadata={
                "task_type": "analysis",
                "priority": "high",
                "assigned_at": datetime.now().isoformat(),
            }
        )

    link = await orchestrator.generate_link(encrypted)

    # Send link to assigned workers via your message queue
    return {"link": link, "file_id": encrypted.file_id}

# Worker receives and processes
worker = ClawFile(
    agent=True,
    agent_id="worker-analysis-001"
)

async def process_task(link: str):
    # Verify we have access before downloading
    verification = await worker.verify(link)
    if not verification.valid:
        raise Exception("Not authorized for this task")

    # Decrypt and process
    file_data = await worker.decrypt(link)
    return process_file(file_data)`}
                  language="python"
                  id="multiagent-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// Multi-agent workflow: Orchestrator distributes tasks to workers
package main

import (
    "time"
    "github.com/clawfile/clawfile-go"
)

func main() {
    orchestrator := clawfile.New(&clawfile.Config{
        Agent:   true,
        AgentID: "orchestrator-main",
    })

    // Define worker agents
    workers := []string{
        "worker-analysis-001",
        "worker-analysis-002",
        "worker-analysis-003",
    }

    // Encrypt and distribute file to specific workers only
    distributeTask := func(filePath string, assignedWorkers []string) (string, error) {
        encrypted, err := orchestrator.Encrypt(filePath, &clawfile.EncryptOptions{
            AccessPolicy:  clawfile.Allowlist,
            AllowedAgents: assignedWorkers,
            Expiry:        3600,
            Metadata: map[string]string{
                "taskType":   "analysis",
                "priority":   "high",
                "assignedAt": time.Now().Format(time.RFC3339),
            },
        })
        if err != nil {
            return "", err
        }

        return orchestrator.GenerateLink(encrypted, nil)
    }

    // Worker receives and processes
    worker := clawfile.New(&clawfile.Config{
        Agent:   true,
        AgentID: "worker-analysis-001",
    })

    processTask := func(link string) ([]byte, error) {
        verification, err := worker.Verify(link)
        if err != nil || !verification.Valid {
            return nil, fmt.Errorf("not authorized for this task")
        }

        return worker.Decrypt(link, nil)
    }
}`}
                  language="go"
                  id="multiagent-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* Custom Access Policies */}
            <section id="custom-policies" data-section="custom-policies" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Custom Access Policies
              </h2>

              <p className="text-text-secondary mb-4">
                Beyond built-in policies, you can implement custom access control logic using webhooks.
              </p>

              <Callout type="info" title="Enterprise Feature">
                Custom access policies via webhooks require a ClawFile Pro or Enterprise subscription.
              </Callout>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`// Custom policy with webhook validation
const encrypted = await claw.encrypt(file, {
  accessPolicy: 'CUSTOM',
  policyWebhook: 'https://api.yourcompany.com/validate-access',
  policyConfig: {
    requiredRole: 'analyst',
    department: 'finance',
    clearanceLevel: 3,
  },
  expiry: 7200,
})

// Your webhook receives:
// {
//   fileId: 'a7f3b2e9',
//   agentId: 'requesting-agent',
//   policyConfig: { requiredRole: 'analyst', ... },
//   timestamp: '2026-01-15T10:30:00Z'
// }

// Return { allowed: true } or { allowed: false, reason: '...' }`}
                  language="typescript"
                  id="custompolicy-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`# Custom policy with webhook validation
encrypted = await claw.encrypt(file,
    access_policy="CUSTOM",
    policy_webhook="https://api.yourcompany.com/validate-access",
    policy_config={
        "required_role": "analyst",
        "department": "finance",
        "clearance_level": 3,
    },
    expiry=7200,
)

# Your webhook receives:
# {
#   "file_id": "a7f3b2e9",
#   "agent_id": "requesting-agent",
#   "policy_config": { "required_role": "analyst", ... },
#   "timestamp": "2026-01-15T10:30:00Z"
# }

# Return { "allowed": True } or { "allowed": False, "reason": "..." }`}
                  language="python"
                  id="custompolicy-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// Custom policy with webhook validation
encrypted, _ := claw.Encrypt(file, &clawfile.EncryptOptions{
    AccessPolicy:  clawfile.Custom,
    PolicyWebhook: "https://api.yourcompany.com/validate-access",
    PolicyConfig: map[string]interface{}{
        "requiredRole":    "analyst",
        "department":      "finance",
        "clearanceLevel":  3,
    },
    Expiry: 7200,
})

// Your webhook receives:
// {
//   "fileId": "a7f3b2e9",
//   "agentId": "requesting-agent",
//   "policyConfig": { "requiredRole": "analyst", ... },
//   "timestamp": "2026-01-15T10:30:00Z"
// }

// Return { "allowed": true } or { "allowed": false, "reason": "..." }`}
                  language="go"
                  id="custompolicy-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* Streaming Large Files */}
            <section id="streaming" data-section="streaming" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Streaming Large Files
              </h2>

              <p className="text-text-secondary mb-4">
                For files larger than available memory, use streaming encryption/decryption to process data in chunks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 border border-subtle rounded-lg bg-surface-raised">
                  <Upload className="w-5 h-5 mb-2 text-accent" />
                  <h4 className="font-semibold text-sm">Stream Encrypt</h4>
                  <p className="text-xs text-text-tertiary">Encrypt files up to 1GB without loading into memory</p>
                </div>
                <div className="p-4 border border-subtle rounded-lg bg-surface-raised">
                  <Download className="w-5 h-5 mb-2 text-accent" />
                  <h4 className="font-semibold text-sm">Stream Decrypt</h4>
                  <p className="text-xs text-text-tertiary">Decrypt directly to disk or output stream</p>
                </div>
              </div>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`import { ClawFile } from '@clawfile/sdk'
import { createReadStream, createWriteStream } from 'fs'

const claw = new ClawFile({ agent: true })

// Stream encrypt a large file
async function encryptLargeFile(inputPath: string) {
  const inputStream = createReadStream(inputPath)

  const encrypted = await claw.encryptStream(inputStream, {
    expiry: 86400,
    chunkSize: 64 * 1024, // 64KB chunks
    onProgress: (progress) => {
      console.log(\`Encrypted: \${progress.percent}%\`)
    },
  })

  return claw.generateLink(encrypted)
}

// Stream decrypt to file
async function decryptLargeFile(url: string, outputPath: string) {
  const outputStream = createWriteStream(outputPath)

  await claw.decryptStream(url, outputStream, {
    onProgress: (progress) => {
      console.log(\`Decrypted: \${progress.percent}%\`)
    },
  })

  console.log(\`File saved to \${outputPath}\`)
}`}
                  language="typescript"
                  id="streaming-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`from clawfile import ClawFile

claw = ClawFile(agent=True)

# Stream encrypt a large file
async def encrypt_large_file(input_path: str) -> str:
    def on_progress(progress):
        print(f"Encrypted: {progress['percent']}%")

    with open(input_path, "rb") as input_stream:
        encrypted = await claw.encrypt_stream(
            input_stream,
            expiry=86400,
            chunk_size=64 * 1024,  # 64KB chunks
            on_progress=on_progress,
        )

    return await claw.generate_link(encrypted)

# Stream decrypt to file
async def decrypt_large_file(url: str, output_path: str):
    def on_progress(progress):
        print(f"Decrypted: {progress['percent']}%")

    with open(output_path, "wb") as output_stream:
        await claw.decrypt_stream(
            url,
            output_stream,
            on_progress=on_progress,
        )

    print(f"File saved to {output_path}")`}
                  language="python"
                  id="streaming-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`package main

import (
    "fmt"
    "os"
    "github.com/clawfile/clawfile-go"
)

func main() {
    claw := clawfile.New(&clawfile.Config{Agent: true})

    // Stream encrypt a large file
    encryptLargeFile := func(inputPath string) (string, error) {
        inputFile, _ := os.Open(inputPath)
        defer inputFile.Close()

        encrypted, err := claw.EncryptStream(inputFile, &clawfile.StreamOptions{
            Expiry:    86400,
            ChunkSize: 64 * 1024, // 64KB chunks
            OnProgress: func(progress clawfile.Progress) {
                fmt.Printf("Encrypted: %d%%\\n", progress.Percent)
            },
        })
        if err != nil {
            return "", err
        }

        return claw.GenerateLink(encrypted, nil)
    }

    // Stream decrypt to file
    decryptLargeFile := func(url, outputPath string) error {
        outputFile, _ := os.Create(outputPath)
        defer outputFile.Close()

        return claw.DecryptStream(url, outputFile, &clawfile.StreamOptions{
            OnProgress: func(progress clawfile.Progress) {
                fmt.Printf("Decrypted: %d%%\\n", progress.Percent)
            },
        })
    }
}`}
                  language="go"
                  id="streaming-go"
                  showLineNumbers
                />
              )}

              <Callout type="warning" title="Memory Considerations">
                Streaming requires at least 2x the chunk size in available memory. Default chunk size is 64KB.
                For very constrained environments, reduce the chunk size accordingly.
              </Callout>
            </section>

            {/* Middleware Integration */}
            <section id="middleware" data-section="middleware" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Middleware Integration
              </h2>

              <p className="text-text-secondary mb-4">
                Integrate ClawFile with your existing middleware stack for logging, monitoring, and custom transformations.
              </p>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`import { ClawFile, Middleware } from '@clawfile/sdk'

// Custom logging middleware
const loggingMiddleware: Middleware = {
  name: 'logger',

  async beforeEncrypt(file, options) {
    console.log(\`[ENCRYPT] Starting: \${file.name}, size: \${file.size}\`)
    return { file, options }
  },

  async afterEncrypt(encrypted) {
    console.log(\`[ENCRYPT] Complete: \${encrypted.fileId}\`)
    return encrypted
  },

  async beforeDecrypt(url, options) {
    console.log(\`[DECRYPT] Starting: \${url}\`)
    return { url, options }
  },

  async afterDecrypt(decrypted) {
    console.log(\`[DECRYPT] Complete: \${decrypted.name}\`)
    return decrypted
  },
}

// Metrics middleware
const metricsMiddleware: Middleware = {
  name: 'metrics',

  async afterEncrypt(encrypted) {
    metrics.increment('clawfile.encrypt.count')
    metrics.histogram('clawfile.encrypt.size', encrypted.size)
    return encrypted
  },

  async afterDecrypt(decrypted) {
    metrics.increment('clawfile.decrypt.count')
    return decrypted
  },
}

// Apply middleware
const claw = new ClawFile({ agent: true })
claw.use(loggingMiddleware)
claw.use(metricsMiddleware)

// All operations now pass through middleware
const encrypted = await claw.encrypt(file) // Logs + metrics`}
                  language="typescript"
                  id="middleware-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`from clawfile import ClawFile, Middleware

# Custom logging middleware
class LoggingMiddleware(Middleware):
    name = "logger"

    async def before_encrypt(self, file, options):
        print(f"[ENCRYPT] Starting: {file.name}, size: {len(file)}")
        return file, options

    async def after_encrypt(self, encrypted):
        print(f"[ENCRYPT] Complete: {encrypted.file_id}")
        return encrypted

    async def before_decrypt(self, url, options):
        print(f"[DECRYPT] Starting: {url}")
        return url, options

    async def after_decrypt(self, decrypted):
        print(f"[DECRYPT] Complete")
        return decrypted

# Metrics middleware
class MetricsMiddleware(Middleware):
    name = "metrics"

    async def after_encrypt(self, encrypted):
        metrics.increment("clawfile.encrypt.count")
        metrics.histogram("clawfile.encrypt.size", encrypted.size)
        return encrypted

    async def after_decrypt(self, decrypted):
        metrics.increment("clawfile.decrypt.count")
        return decrypted

# Apply middleware
claw = ClawFile(agent=True)
claw.use(LoggingMiddleware())
claw.use(MetricsMiddleware())

# All operations now pass through middleware
encrypted = await claw.encrypt(file)  # Logs + metrics`}
                  language="python"
                  id="middleware-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`package main

import (
    "fmt"
    "github.com/clawfile/clawfile-go"
)

// Custom logging middleware
type LoggingMiddleware struct{}

func (m *LoggingMiddleware) Name() string { return "logger" }

func (m *LoggingMiddleware) BeforeEncrypt(file interface{}, opts *clawfile.EncryptOptions) (interface{}, *clawfile.EncryptOptions, error) {
    fmt.Printf("[ENCRYPT] Starting\\n")
    return file, opts, nil
}

func (m *LoggingMiddleware) AfterEncrypt(encrypted *clawfile.EncryptedFile) (*clawfile.EncryptedFile, error) {
    fmt.Printf("[ENCRYPT] Complete: %s\\n", encrypted.FileID)
    return encrypted, nil
}

func (m *LoggingMiddleware) BeforeDecrypt(url string, opts *clawfile.DecryptOptions) (string, *clawfile.DecryptOptions, error) {
    fmt.Printf("[DECRYPT] Starting: %s\\n", url)
    return url, opts, nil
}

func (m *LoggingMiddleware) AfterDecrypt(data []byte) ([]byte, error) {
    fmt.Printf("[DECRYPT] Complete\\n")
    return data, nil
}

func main() {
    claw := clawfile.New(&clawfile.Config{Agent: true})
    claw.Use(&LoggingMiddleware{})

    // All operations now pass through middleware
    encrypted, _ := claw.Encrypt(file, nil) // Logs
}`}
                  language="go"
                  id="middleware-go"
                  showLineNumbers
                />
              )}
            </section>

            <hr className="border-subtle my-12" />

            {/* ==================== EXAMPLES ==================== */}
            <section id="examples" data-section="examples" className="scroll-mt-20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <FileCode className="w-7 h-7 text-accent" />
                Examples
              </h1>
              <p className="text-text-secondary mb-8">
                Complete, runnable examples for common use cases.
              </p>
            </section>

            {/* Basic File Sharing */}
            <section id="example-basic" data-section="example-basic" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Basic File Sharing
              </h2>

              <p className="text-text-secondary mb-4">
                The simplest use case: encrypt a file and share it with another party.
              </p>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`import { ClawFile } from '@clawfile/sdk'
import { readFileSync, writeFileSync } from 'fs'

async function main() {
  const claw = new ClawFile({ agent: true })

  // === SENDER ===
  // Read file from disk
  const fileBuffer = readFileSync('./report.pdf')
  const file = new File([fileBuffer], 'report.pdf', { type: 'application/pdf' })

  // Encrypt with options
  const encrypted = await claw.encrypt(file, {
    expiry: 3600,        // 1 hour
    maxDownloads: 3,     // Max 3 downloads
  })

  // Generate shareable link
  const link = await claw.generateLink(encrypted)
  console.log('Share this link:', link)
  // https://clawfile.dev/a7f3b2e9#9c4d7a1f...

  // === RECIPIENT ===
  // Decrypt from URL
  const decrypted = await claw.decrypt(link)

  // Save to disk
  const buffer = Buffer.from(await decrypted.arrayBuffer())
  writeFileSync('./downloaded-report.pdf', buffer)

  console.log('File saved successfully!')
}

main().catch(console.error)`}
                  language="typescript"
                  id="example-basic-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`import asyncio
from clawfile import ClawFile

async def main():
    claw = ClawFile(agent=True)

    # === SENDER ===
    # Read file from disk and encrypt
    with open("./report.pdf", "rb") as f:
        encrypted = await claw.encrypt(f,
            expiry=3600,        # 1 hour
            max_downloads=3,    # Max 3 downloads
        )

    # Generate shareable link
    link = await claw.generate_link(encrypted)
    print(f"Share this link: {link}")
    # https://clawfile.dev/a7f3b2e9#9c4d7a1f...

    # === RECIPIENT ===
    # Decrypt from URL
    decrypted = await claw.decrypt(link)

    # Save to disk
    with open("./downloaded-report.pdf", "wb") as f:
        f.write(decrypted)

    print("File saved successfully!")

asyncio.run(main())`}
                  language="python"
                  id="example-basic-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`package main

import (
    "fmt"
    "os"
    "github.com/clawfile/clawfile-go"
)

func main() {
    claw := clawfile.New(&clawfile.Config{Agent: true})

    // === SENDER ===
    // Encrypt file from disk
    encrypted, err := claw.Encrypt("./report.pdf", &clawfile.EncryptOptions{
        Expiry:       3600,  // 1 hour
        MaxDownloads: 3,     // Max 3 downloads
    })
    if err != nil {
        panic(err)
    }

    // Generate shareable link
    link, err := claw.GenerateLink(encrypted, nil)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Share this link: %s\\n", link)
    // https://clawfile.dev/a7f3b2e9#9c4d7a1f...

    // === RECIPIENT ===
    // Decrypt from URL
    decrypted, err := claw.Decrypt(link, nil)
    if err != nil {
        panic(err)
    }

    // Save to disk
    err = os.WriteFile("./downloaded-report.pdf", decrypted, 0644)
    if err != nil {
        panic(err)
    }

    fmt.Println("File saved successfully!")
}`}
                  language="go"
                  id="example-basic-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* Agent-to-Agent Transfer */}
            <section id="example-agent" data-section="example-agent" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Agent-to-Agent Transfer
              </h2>

              <p className="text-text-secondary mb-4">
                Secure file transfer between two AI agents with allowlist-based access control.
              </p>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`// agent-sender.ts - Runs on Agent A
import { ClawFile } from '@clawfile/sdk'

const senderAgent = new ClawFile({
  agent: true,
  agentId: 'agent-data-processor',
})

async function sendToAnalyst(data: string) {
  // Create a file from processed data
  const file = new File([data], 'processed-data.json', {
    type: 'application/json',
  })

  // Encrypt ONLY for the analyst agent
  const encrypted = await senderAgent.encrypt(file, {
    accessPolicy: 'ALLOWLIST',
    allowedAgents: ['agent-analyst-001'],
    expiry: 1800,      // 30 minutes
    maxDownloads: 1,   // One-time access
    metadata: {
      sourceAgent: 'agent-data-processor',
      dataType: 'customer-analytics',
      processedAt: new Date().toISOString(),
    },
  })

  const link = await senderAgent.generateLink(encrypted)

  // Send link via your agent communication channel
  await messageQueue.send('agent-analyst-001', {
    type: 'file-ready',
    link,
    fileId: encrypted.fileId,
  })
}

// agent-receiver.ts - Runs on Agent B
import { ClawFile } from '@clawfile/sdk'

const receiverAgent = new ClawFile({
  agent: true,
  agentId: 'agent-analyst-001',
})

messageQueue.on('file-ready', async (message) => {
  // Verify the file is for us
  const verification = await receiverAgent.verify(message.link)

  if (!verification.valid) {
    console.error('File not accessible:', verification)
    return
  }

  console.log('File metadata:', verification.metadata)
  // { sourceAgent: 'agent-data-processor', dataType: 'customer-analytics', ... }

  // Decrypt and process
  const decrypted = await receiverAgent.decrypt(message.link)
  const data = JSON.parse(await decrypted.text())

  await analyzeData(data)
})`}
                  language="typescript"
                  id="example-agent-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`# agent_sender.py - Runs on Agent A
from clawfile import ClawFile
from datetime import datetime
import json

sender_agent = ClawFile(
    agent=True,
    agent_id="agent-data-processor",
)

async def send_to_analyst(data: dict):
    # Create file from processed data
    file_content = json.dumps(data).encode()

    # Encrypt ONLY for the analyst agent
    encrypted = await sender_agent.encrypt(
        file_content,
        access_policy="ALLOWLIST",
        allowed_agents=["agent-analyst-001"],
        expiry=1800,      # 30 minutes
        max_downloads=1,  # One-time access
        metadata={
            "source_agent": "agent-data-processor",
            "data_type": "customer-analytics",
            "processed_at": datetime.now().isoformat(),
        },
        file_name="processed-data.json",
    )

    link = await sender_agent.generate_link(encrypted)

    # Send link via your agent communication channel
    await message_queue.send("agent-analyst-001", {
        "type": "file-ready",
        "link": link,
        "file_id": encrypted.file_id,
    })

# agent_receiver.py - Runs on Agent B
from clawfile import ClawFile
import json

receiver_agent = ClawFile(
    agent=True,
    agent_id="agent-analyst-001",
)

@message_queue.on("file-ready")
async def handle_file_ready(message):
    # Verify the file is for us
    verification = await receiver_agent.verify(message["link"])

    if not verification.valid:
        print(f"File not accessible: {verification}")
        return

    print(f"File metadata: {verification.metadata}")
    # { "source_agent": "agent-data-processor", "data_type": "customer-analytics", ... }

    # Decrypt and process
    decrypted = await receiver_agent.decrypt(message["link"])
    data = json.loads(decrypted.decode())

    await analyze_data(data)`}
                  language="python"
                  id="example-agent-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// agent_sender.go - Runs on Agent A
package main

import (
    "encoding/json"
    "time"
    "github.com/clawfile/clawfile-go"
)

var senderAgent = clawfile.New(&clawfile.Config{
    Agent:   true,
    AgentID: "agent-data-processor",
})

func sendToAnalyst(data interface{}) error {
    // Create file from processed data
    fileContent, _ := json.Marshal(data)

    // Encrypt ONLY for the analyst agent
    encrypted, err := senderAgent.EncryptBytes(fileContent, &clawfile.EncryptOptions{
        AccessPolicy:  clawfile.Allowlist,
        AllowedAgents: []string{"agent-analyst-001"},
        Expiry:        1800,  // 30 minutes
        MaxDownloads:  1,     // One-time access
        Metadata: map[string]string{
            "sourceAgent":  "agent-data-processor",
            "dataType":     "customer-analytics",
            "processedAt":  time.Now().Format(time.RFC3339),
        },
        FileName: "processed-data.json",
    })
    if err != nil {
        return err
    }

    link, err := senderAgent.GenerateLink(encrypted, nil)
    if err != nil {
        return err
    }

    // Send link via your agent communication channel
    return messageQueue.Send("agent-analyst-001", Message{
        Type:   "file-ready",
        Link:   link,
        FileID: encrypted.FileID,
    })
}

// agent_receiver.go - Runs on Agent B
var receiverAgent = clawfile.New(&clawfile.Config{
    Agent:   true,
    AgentID: "agent-analyst-001",
})

func handleFileReady(message Message) error {
    // Verify the file is for us
    verification, err := receiverAgent.Verify(message.Link)
    if err != nil || !verification.Valid {
        return fmt.Errorf("file not accessible")
    }

    fmt.Printf("File metadata: %v\\n", verification.Metadata)

    // Decrypt and process
    decrypted, err := receiverAgent.Decrypt(message.Link, nil)
    if err != nil {
        return err
    }

    var data map[string]interface{}
    json.Unmarshal(decrypted, &data)

    return analyzeData(data)
}`}
                  language="go"
                  id="example-agent-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* LangChain Integration */}
            <section id="example-langchain" data-section="example-langchain" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                LangChain Integration
              </h2>

              <p className="text-text-secondary mb-4">
                Use ClawFile as a tool in your LangChain agents for secure file operations.
              </p>

              <LanguageTabs />

              {activeLanguage === 'typescript' && (
                <CodeBlock
                  code={`import { ClawFile } from '@clawfile/sdk'
import { DynamicStructuredTool } from '@langchain/core/tools'
import { ChatOpenAI } from '@langchain/openai'
import { AgentExecutor, createOpenAIFunctionsAgent } from 'langchain/agents'
import { z } from 'zod'

const claw = new ClawFile({ agent: true, agentId: 'langchain-agent' })

// Create ClawFile tools for LangChain
const encryptFileTool = new DynamicStructuredTool({
  name: 'encrypt_file',
  description: 'Encrypts a file and returns a secure shareable link',
  schema: z.object({
    content: z.string().describe('The content to encrypt'),
    fileName: z.string().describe('Name for the file'),
    expiryHours: z.number().optional().describe('Hours until expiry'),
  }),
  func: async ({ content, fileName, expiryHours }) => {
    const file = new File([content], fileName, { type: 'text/plain' })
    const encrypted = await claw.encrypt(file, {
      expiry: (expiryHours || 24) * 3600,
    })
    const link = await claw.generateLink(encrypted)
    return \`File encrypted successfully. Share this link: \${link}\`
  },
})

const decryptFileTool = new DynamicStructuredTool({
  name: 'decrypt_file',
  description: 'Decrypts a file from a ClawFile link',
  schema: z.object({
    url: z.string().describe('The ClawFile URL to decrypt'),
  }),
  func: async ({ url }) => {
    const decrypted = await claw.decrypt(url)
    return await decrypted.text()
  },
})

// Create agent with ClawFile tools
const llm = new ChatOpenAI({ model: 'gpt-4o' })
const tools = [encryptFileTool, decryptFileTool]

const agent = await createOpenAIFunctionsAgent({ llm, tools, prompt })
const executor = new AgentExecutor({ agent, tools })

// Use the agent
const result = await executor.invoke({
  input: 'Encrypt this report and give me a link: Q4 revenue was $1.2M',
})`}
                  language="typescript"
                  id="example-langchain-ts"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'python' && (
                <CodeBlock
                  code={`from clawfile import ClawFile
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent

claw = ClawFile(agent=True, agent_id="langchain-agent")

# Create ClawFile tools for LangChain
@tool
async def encrypt_file(content: str, file_name: str, expiry_hours: int = 24) -> str:
    """Encrypts content and returns a secure shareable link.

    Args:
        content: The content to encrypt
        file_name: Name for the file
        expiry_hours: Hours until expiry (default: 24)
    """
    encrypted = await claw.encrypt(
        content.encode(),
        expiry=expiry_hours * 3600,
        file_name=file_name,
    )
    link = await claw.generate_link(encrypted)
    return f"File encrypted successfully. Share this link: {link}"

@tool
async def decrypt_file(url: str) -> str:
    """Decrypts a file from a ClawFile link.

    Args:
        url: The ClawFile URL to decrypt
    """
    decrypted = await claw.decrypt(url)
    return decrypted.decode()

# Create agent with ClawFile tools
llm = ChatOpenAI(model="gpt-4o")
tools = [encrypt_file, decrypt_file]

agent = create_openai_functions_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools)

# Use the agent
result = await executor.ainvoke({
    "input": "Encrypt this report and give me a link: Q4 revenue was $1.2M"
})`}
                  language="python"
                  id="example-langchain-py"
                  showLineNumbers
                />
              )}

              {activeLanguage === 'go' && (
                <CodeBlock
                  code={`// Note: LangChain Go integration coming soon
// For now, use the REST API with your Go-based LangChain implementation

package main

import (
    "github.com/clawfile/clawfile-go"
)

var claw = clawfile.New(&clawfile.Config{
    Agent:   true,
    AgentID: "langchain-agent",
})

// Tool function for encryption
func EncryptFileTool(content, fileName string, expiryHours int) (string, error) {
    if expiryHours == 0 {
        expiryHours = 24
    }

    encrypted, err := claw.EncryptBytes([]byte(content), &clawfile.EncryptOptions{
        Expiry:   expiryHours * 3600,
        FileName: fileName,
    })
    if err != nil {
        return "", err
    }

    link, err := claw.GenerateLink(encrypted, nil)
    if err != nil {
        return "", err
    }

    return fmt.Sprintf("File encrypted successfully. Share this link: %s", link), nil
}

// Tool function for decryption
func DecryptFileTool(url string) (string, error) {
    decrypted, err := claw.Decrypt(url, nil)
    if err != nil {
        return "", err
    }
    return string(decrypted), nil
}`}
                  language="go"
                  id="example-langchain-go"
                  showLineNumbers
                />
              )}
            </section>

            {/* CrewAI Integration */}
            <section id="example-crewai" data-section="example-crewai" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                CrewAI Integration
              </h2>

              <p className="text-text-secondary mb-4">
                Integrate ClawFile with CrewAI for secure file handoffs between crew members.
              </p>

              <CodeBlock
                code={`from crewai import Agent, Task, Crew, Process
from crewai_tools import tool
from clawfile import ClawFile

# Initialize ClawFile for the crew
claw = ClawFile(agent=True, agent_id="crewai-research-crew")

@tool("Secure File Share")
async def secure_share(content: str, description: str) -> str:
    """Securely encrypt and share file content between agents.

    Args:
        content: The content to share securely
        description: A brief description of the content
    """
    encrypted = await claw.encrypt(
        content.encode(),
        expiry=3600,
        metadata={"description": description},
        file_name="shared-data.txt",
    )
    link = await claw.generate_link(encrypted)
    return f"Content shared securely: {link}"

@tool("Retrieve Shared File")
async def retrieve_shared(url: str) -> str:
    """Retrieve and decrypt a securely shared file.

    Args:
        url: The ClawFile URL to retrieve
    """
    decrypted = await claw.decrypt(url)
    return decrypted.decode()

# Define agents with ClawFile tools
researcher = Agent(
    role="Research Analyst",
    goal="Research and compile data, share findings securely",
    tools=[secure_share],
    verbose=True,
)

writer = Agent(
    role="Content Writer",
    goal="Retrieve research and write reports",
    tools=[retrieve_shared],
    verbose=True,
)

# Define tasks
research_task = Task(
    description="Research AI trends and share findings securely",
    agent=researcher,
    expected_output="A secure link to the research findings",
)

writing_task = Task(
    description="Retrieve the research and write a summary report",
    agent=writer,
    expected_output="A polished summary report",
    context=[research_task],
)

# Create and run the crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, writing_task],
    process=Process.sequential,
)

result = crew.kickoff()`}
                language="python"
                id="example-crewai"
                title="CrewAI Integration (Python)"
                showLineNumbers
              />

              <Callout type="info" title="CrewAI Support">
                CrewAI integration is currently available for Python only. TypeScript and Go support coming soon.
              </Callout>
            </section>

            <hr className="border-subtle my-12" />

            {/* ==================== TROUBLESHOOTING ==================== */}
            <section id="troubleshooting" data-section="troubleshooting" className="scroll-mt-20">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <AlertCircle className="w-7 h-7 text-accent" />
                Troubleshooting
              </h1>
            </section>

            {/* Common Errors */}
            <section id="common-errors" data-section="common-errors" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                Common Errors
              </h2>

              <div className="space-y-4">
                {[
                  { code: 'ENCRYPTION_FAILED', desc: 'Encryption operation failed', solution: 'Check that the file is readable and not empty. Ensure sufficient memory is available.' },
                  { code: 'DECRYPTION_FAILED', desc: 'Decryption operation failed', solution: 'Verify the URL is complete and the key fragment is intact. The file may have been tampered with.' },
                  { code: 'FILE_NOT_FOUND', desc: 'File ID does not exist', solution: 'The file may have been deleted, revoked, or never existed. Check the URL for typos.' },
                  { code: 'FILE_EXPIRED', desc: 'File TTL has expired', solution: 'Request a new file from the sender. Consider using longer TTL values for important files.' },
                  { code: 'ACCESS_DENIED', desc: 'Agent not authorized', solution: 'Your agent ID is not in the allowlist. Contact the file owner to add your agent.' },
                  { code: 'DOWNLOAD_LIMIT_REACHED', desc: 'Maximum downloads exceeded', solution: 'The file has reached its download limit. Request a new share from the sender.' },
                  { code: 'NETWORK_ERROR', desc: 'Network request failed', solution: 'Check your internet connection. The ClawFile API may be temporarily unavailable.' },
                  { code: 'INVALID_CONFIG', desc: 'Invalid configuration', solution: 'Review your ClawFile initialization options. Check API key format if provided.' },
                ].map((error) => (
                  <div key={error.code} className="border border-subtle rounded-lg overflow-hidden">
                    <div className="bg-surface p-4 border-b border-subtle flex items-center gap-3">
                      <XCircle className="w-5 h-5 text-[#f43f5e]" />
                      <code className="font-bold text-[#f43f5e]">{error.code}</code>
                    </div>
                    <div className="bg-surface-raised p-4">
                      <p className="text-sm text-text-secondary mb-2">{error.desc}</p>
                      <p className="text-sm"><strong>Solution:</strong> {error.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" data-section="faq" className="scroll-mt-20 mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-text-tertiary" />
                FAQ
              </h2>

              <div className="space-y-4">
                {[
                  { q: 'Can ClawFile servers read my files?', a: 'No. Encryption happens entirely in your local runtime. ClawFile servers only ever see encrypted ciphertext. The encryption key is never transmitted.' },
                  { q: 'What happens if I lose the shareable link?', a: 'The encryption key is embedded in the URL fragment. If you lose the complete URL, the file cannot be decrypted. Always store links securely.' },
                  { q: 'Is there a file size limit?', a: 'Yes. The maximum file size is 100MB for free accounts and 1GB for paid accounts. For larger files, consider chunking or streaming.' },
                  { q: 'Can I extend the expiry of a file?', a: 'No. Once a file is encrypted with a specific TTL, it cannot be extended. You would need to re-encrypt and share a new link.' },
                  { q: 'What encryption algorithm is used?', a: 'AES-256-GCM (Advanced Encryption Standard with 256-bit keys in Galois/Counter Mode). This provides authenticated encryption with associated data.' },
                  { q: 'Is the SDK open source?', a: 'Yes. The ClawFile SDK is MIT licensed. You can view the source code and contribute on GitHub.' },
                ].map((item, i) => (
                  <div key={i} className="border border-subtle rounded-lg p-4 bg-surface-raised">
                    <h4 className="font-semibold mb-2 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      {item.q}
                    </h4>
                    <p className="text-sm text-text-secondary ml-7">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-subtle my-12" />

            {/* ==================== CHANGELOG ==================== */}
            <section id="changelog" data-section="changelog" className="scroll-mt-20 mb-12">
              <h1 className="text-2xl sm:text-3xl font-bold mb-6 flex items-center gap-3">
                <GitBranch className="w-7 h-7 text-accent" />
                Changelog
              </h1>

              <div className="space-y-6">
                {[
                  {
                    version: '1.0.0',
                    date: '2026-01-15',
                    changes: [
                      { type: 'added', text: 'Initial release of ClawFile SDK' },
                      { type: 'added', text: 'AES-256-GCM encryption with agent-side key generation' },
                      { type: 'added', text: 'Support for TypeScript, Python, and Go' },
                      { type: 'added', text: 'Access policies: PUBLIC, AGENT_ONLY, ALLOWLIST' },
                      { type: 'added', text: 'Ephemeral storage with configurable TTL' },
                      { type: 'added', text: 'LangChain, CrewAI, and AutoGen integrations' },
                    ],
                  },
                  {
                    version: '0.9.0',
                    date: '2025-12-01',
                    changes: [
                      { type: 'added', text: 'Beta release for early testers' },
                      { type: 'added', text: 'Core encrypt/decrypt functionality' },
                      { type: 'fixed', text: 'Memory leak in large file handling' },
                    ],
                  },
                ].map((release) => (
                  <div key={release.version} className="border border-subtle rounded-lg overflow-hidden">
                    <div className="bg-surface p-4 border-b border-subtle flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-accent">v{release.version}</span>
                        {release.version === '1.0.0' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">Latest</span>
                        )}
                      </div>
                      <span className="text-sm text-text-tertiary">{release.date}</span>
                    </div>
                    <div className="bg-surface-raised p-4">
                      <ul className="space-y-2">
                        {release.changes.map((change, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className={`text-xs px-1.5 py-0.5 rounded font-medium shrink-0 ${
                              change.type === 'added' ? 'bg-[#10b981]/10 text-[#10b981]' :
                              change.type === 'fixed' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' :
                              'bg-[#f59e0b]/10 text-[#f59e0b]'
                            }`}>
                              {change.type}
                            </span>
                            <span className="text-text-secondary">{change.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== FOOTER NAV ===== */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-subtle">
              <Link
                href="/"
                className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <a
                href="https://github.com/clawfile"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:text-accent-dim transition-colors"
              >
                View on GitHub
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="lg:pl-72 border-t border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-tertiary">
            CLAWFILE SDK &copy; 2026 &middot; MIT License
          </p>
          <div className="text-xs text-text-tertiary font-mono">
            <span className="text-accent">$</span> clawfile <span className="text-text-tertiary">--version</span> <span className="text-accent">1.0.0</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
