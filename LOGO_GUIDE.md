# ClawFile - Logo Implementation Guide

## Current Logo Location

Logo ditampilkan di **Hero Section** (center, file: `app/page.tsx`)

---

## Current Logo Design

**Komponen:**
- Image: `public/logo.png` (displayed with brightness-invert filter)
- Style: Floating animation, centered, responsive

**Kode saat ini:**
```tsx
<div className="flex justify-center mb-16 w-full scale-in">
  <div className="relative w-full max-w-2xl px-4 float">
    <Image
      src="/logo.png"
      alt="ClawFile"
      width={800}
      height={400}
      className="w-full h-auto brightness-0 invert opacity-90"
      style={{ filter: 'brightness(0) invert(1)' }}
      priority
    />
  </div>
</div>
```

---

## Cara Mengganti Logo

### Opsi 1: Ganti dengan Logo Image (SVG/PNG)

1. **Simpan file logo** di folder `public/`:
   ```
   public/
   └── logo.svg  (atau logo.png)
   ```

2. **Update kode di `app/page.tsx`**:
   ```tsx
   import Image from 'next/image'

   <Image
     src="/logo.svg"
     alt="ClawFile Logo"
     width={800}
     height={400}
     className="w-full h-auto opacity-90"
   />
   ```

### Opsi 2: Text Logo Only

```tsx
<div className="flex items-center gap-3 cursor-pointer">
  <span className="font-black text-2xl tracking-wider border border-subtle px-3 py-2 rounded-card">
    [CF]
  </span>
  <span className="font-bold text-xl tracking-wider">
    CLAWFILE
  </span>
</div>
```

---

## Tips

1. **Untuk logo SVG**: Gunakan `className="invert"` agar logo hitam jadi putih
2. **Untuk logo PNG**: Pastikan background transparent
3. **Ukuran optimal**: 40x40px untuk navbar, 60x60px untuk hero
4. **Format terbaik**: SVG (scalable, tetap tajam di semua ukuran)

---

## Test Responsiveness

Setelah ganti logo, test di:
- Desktop (1920px+)
- Tablet (768px)
- Mobile (375px)

Logo otomatis responsive karena menggunakan Tailwind CSS.
