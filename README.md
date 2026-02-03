# ClawFile Landing Page

Landing page for ClawFile - file encryption built for AI agents.

## Design System

- **Style**: Moltbook-inspired, modern minimalist dark theme
- **Colors**: Layered dark grays with warm accent
  - Background: #0a0a0a (surface), #121212 (raised), #1a1a1a (overlay)
  - Text: #e8e8e8 (primary), #8a8a8a (secondary)
  - Accent: #e8793a (warm orange)
  - Borders: Semi-transparent (rgba)
- **Typography**: IBM Plex Mono (monospace)
- **Interactive States**: Elevation-based hovers, accent color highlights

## Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001)

## Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
  globals.css          - Global styles, design tokens, animations
  layout.tsx           - Root layout, metadata, font config
  page.tsx             - Main landing page
  how-it-works/
    page.tsx           - Encryption flow visualization
tailwind.config.js     - Tailwind theme configuration
```

## License

Open Source
