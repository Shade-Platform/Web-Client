This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, clone the repository:
```bash
git clone https://github.com/Shade-Platform/Web-Client.git
```

Install required packages:
```bash
npm i
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

This project uses [Shadcn/ui](https://ui.shadcn.com/docs/) as a component platform.

This project uses NextThemes for managing dark and light mode.
```
/app -> main app entry point
  /about
    page.tsx
    /_components -> components uses in the "about" route
      About.tsx
      Statistics.tsx
  /dashboard
    page.tsx
    /_components 
      Chart.tsx
      Card.tsx
/components -> components used in multiple locations
  ui/
    Button.tsx
    Card.tsx
```