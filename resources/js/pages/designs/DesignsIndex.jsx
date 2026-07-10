import React from 'react';
import { Link } from 'react-router-dom';

// Gallery of landing page design directions for Auction IO.
// Pattern from Nick Saraev's "website factory" workflow: generate many
// distinct directions, review them live, pick a winner, productionize it.
const DIRECTIONS = [
    {
        path: '/designs/midnight-luxe',
        n: '01',
        name: 'Midnight Luxe',
        vibe: 'Dark auction-house luxury',
        desc: 'Serif display type, champagne-gold shimmer, hairline rules. Positions Auction IO as a premium house for serious collectors.',
        swatches: ['#0a0a0c', '#c9a24b', '#ece7dc'],
        bg: 'bg-[#0a0a0c]',
        text: 'text-[#c9a24b]',
        preview: 'Rare things belong to the fastest hand.',
        serif: true,
    },
    {
        path: '/designs/neon-pulse',
        n: '02',
        name: 'Neon Pulse',
        vibe: 'TikTok-native energy',
        desc: 'Neon red/cyan on near-black, scrolling bid ticker, tilted card stack, loud CTAs. The closest evolution of the current brand.',
        swatches: ['#08080a', '#ff0050', '#00d4ff'],
        bg: 'bg-[#08080a]',
        text: 'text-[#ff0050]',
        preview: 'BID LIKE YOU MEAN IT.',
        serif: false,
    },
    {
        path: '/designs/editorial',
        n: '03',
        name: 'The Editorial',
        vibe: 'Magazine calm & credibility',
        desc: 'Oversized serif headlines on warm paper, numbered index rows instead of cards. Calm, credible, collector-focused.',
        swatches: ['#faf8f4', '#1a1815', '#c2410c'],
        bg: 'bg-[#faf8f4]',
        text: 'text-[#c2410c]',
        preview: 'Every object has a closing time.',
        serif: true,
    },
    {
        path: '/designs/brutal',
        n: '04',
        name: 'Brutal Bid',
        vibe: 'Neo-brutalist loudness',
        desc: 'Mono type, thick borders, hard shadows, acid yellow. Terminal-of-the-bazaar energy aimed at a younger crowd.',
        swatches: ['#f2f0e9', '#e8ff32', '#ff4911'],
        bg: 'bg-[#f2f0e9]',
        text: 'text-black',
        preview: 'HIGHEST BID WINS. NO MERCY.',
        serif: false,
    },
    {
        path: '/designs/aurora',
        n: '05',
        name: 'Aurora Glass',
        vibe: 'Soft-gradient glassmorphism',
        desc: 'Floating aurora blobs, frosted glass cards, rounded SaaS polish. Friendly and premium at the same time.',
        swatches: ['#0b0e1a', '#8b5cf6', '#22d3ee'],
        bg: 'bg-[#0b0e1a]',
        text: 'text-violet-400',
        preview: 'Bidding, beautifully live.',
        serif: false,
    },
];

export default function DesignsIndex() {
    return (
        <div className="min-h-screen bg-[#101014] text-white">
            <header className="max-w-5xl mx-auto px-6 pt-16 pb-12">
                <p className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4">
                    Design factory · 5 directions
                </p>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">
                    Auction IO — landing page directions
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl">
                    Five deliberately different takes on the same product. Open each one
                    full screen, feel the difference, pick a winner — then we
                    productionize that direction into the real Home page.
                </p>
            </header>

            <main className="max-w-5xl mx-auto px-6 pb-24 space-y-6">
                {DIRECTIONS.map((d) => (
                    <Link
                        key={d.path}
                        to={d.path}
                        className="block rounded-3xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 transition group overflow-hidden"
                    >
                        <div className="grid md:grid-cols-5">
                            {/* Mini preview panel */}
                            <div className={`md:col-span-2 ${d.bg} p-8 flex flex-col justify-center min-h-[180px]`}>
                                <span className={`text-xl md:text-2xl font-bold leading-snug ${d.text} ${d.serif ? 'font-serif' : ''}`}>
                                    {d.preview}
                                </span>
                            </div>
                            {/* Meta */}
                            <div className="md:col-span-3 p-8">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-sm font-mono text-gray-500">{d.n}</span>
                                    <h2 className="text-2xl font-bold group-hover:text-emerald-400 transition">{d.name}</h2>
                                </div>
                                <p className="text-sm font-semibold text-gray-400 mb-3">{d.vibe}</p>
                                <p className="text-gray-400 leading-relaxed mb-5">{d.desc}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        {d.swatches.map((c) => (
                                            <span key={c} className="w-6 h-6 rounded-full border border-white/20" style={{ background: c }} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-500 group-hover:text-white transition">
                                        View direction →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </main>

            <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500">
                Generated with the multi-direction design workflow · <Link to="/" className="underline hover:text-white">Back to app</Link>
            </footer>
        </div>
    );
}
