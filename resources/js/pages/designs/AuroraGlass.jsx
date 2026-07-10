import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_AUCTIONS, STATS, STEPS, formatMoney } from './mockData';

// Direction 05 — "Aurora Glass"
// Soft-gradient glassmorphism: floating aurora blobs, frosted cards,
// rounded modern-SaaS polish. Friendly and premium at the same time.
export default function AuroraGlass() {
    return (
        <div className="min-h-screen bg-[#0b0e1a] text-white relative overflow-hidden">
            <style>{`
                @keyframes ag-float1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,-40px) scale(1.15); } }
                @keyframes ag-float2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,50px) scale(1.1); } }
                @keyframes ag-float3 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(40px,60px) scale(0.9); } }
                .ag-blob1 { animation: ag-float1 14s ease-in-out infinite; }
                .ag-blob2 { animation: ag-float2 18s ease-in-out infinite; }
                .ag-blob3 { animation: ag-float3 16s ease-in-out infinite; }
                .ag-glass { background: rgba(255,255,255,0.06); backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.12); }
            `}</style>

            {/* Aurora background */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="ag-blob1 absolute -top-32 -left-24 w-[34rem] h-[34rem] rounded-full bg-violet-600/30 blur-[110px]" />
                <div className="ag-blob2 absolute top-1/3 -right-32 w-[30rem] h-[30rem] rounded-full bg-cyan-500/25 blur-[110px]" />
                <div className="ag-blob3 absolute bottom-0 left-1/3 w-[28rem] h-[28rem] rounded-full bg-fuchsia-500/20 blur-[110px]" />
            </div>

            <div className="relative">
                {/* Nav */}
                <header className="max-w-6xl mx-auto px-6 pt-6">
                    <div className="ag-glass rounded-2xl px-6 py-4 flex items-center justify-between">
                        <span className="font-bold text-lg tracking-tight">◈ Auction IO</span>
                        <nav className="hidden md:flex gap-8 text-sm text-white/70">
                            <a href="#live" className="hover:text-white transition">Live</a>
                            <a href="#how" className="hover:text-white transition">How it works</a>
                            <a href="#sell" className="hover:text-white transition">Sell</a>
                        </nav>
                        <button className="rounded-xl px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-violet-500 to-cyan-400 hover:opacity-90 transition">
                            Get started
                        </button>
                    </div>
                </header>

                {/* Hero */}
                <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
                    <div className="ag-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-white/80 mb-8">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        2,340 auctions live right now
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.02] mb-6">
                        Bidding,
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent"> beautifully </span>
                        live.
                    </h1>
                    <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
                        Watch prices move in real time, bid in one tap, and see every item
                        on video before you commit. Auctions that feel effortless.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="rounded-2xl px-8 py-4 font-semibold bg-gradient-to-r from-violet-500 to-cyan-400 hover:scale-[1.03] transition shadow-lg shadow-violet-500/30">
                            Explore auctions
                        </button>
                        <button className="ag-glass rounded-2xl px-8 py-4 font-semibold hover:bg-white/10 transition">
                            Watch a live sale
                        </button>
                    </div>
                </section>

                {/* Floating stat pills */}
                <section className="max-w-5xl mx-auto px-6 pb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {STATS.map((s) => (
                            <div key={s.label} className="ag-glass rounded-2xl p-6 text-center">
                                <div className="text-2xl font-bold bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">{s.value}</div>
                                <div className="text-sm text-white/50 mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Live cards */}
                <section id="live" className="max-w-6xl mx-auto px-6 pb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold tracking-tight">Trending lots</h2>
                        <button className="text-sm text-white/60 hover:text-white transition">View all →</button>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {MOCK_AUCTIONS.map((a) => (
                            <article key={a.id} className="ag-glass rounded-3xl p-6 hover:bg-white/10 hover:-translate-y-1 transition">
                                <div className="flex items-start justify-between mb-5">
                                    <span className="text-4xl">{a.emoji}</span>
                                    <span className="ag-glass rounded-full px-3 py-1 text-xs font-medium text-white/80">⏱ {a.endsIn}</span>
                                </div>
                                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{a.category}</p>
                                <h3 className="font-semibold text-lg leading-snug mb-5">{a.title}</h3>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs text-white/40">Current bid</p>
                                        <p className="text-xl font-bold">{formatMoney(a.currentBid)}</p>
                                    </div>
                                    <button className="rounded-xl px-4 py-2 text-sm font-semibold bg-gradient-to-r from-violet-500 to-cyan-400 hover:opacity-90 transition">
                                        Bid
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Steps */}
                <section id="how" className="max-w-6xl mx-auto px-6 pb-24">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Three taps to your first win</h2>
                    <div className="grid md:grid-cols-3 gap-5">
                        {STEPS.map((s, i) => (
                            <div key={s.title} className="ag-glass rounded-3xl p-8 relative">
                                <div className="absolute -top-4 left-8 w-9 h-9 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 flex items-center justify-center font-bold text-sm">
                                    {i + 1}
                                </div>
                                <h3 className="font-bold text-xl mt-3 mb-2">{s.title}</h3>
                                <p className="text-white/60 leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section id="sell" className="max-w-4xl mx-auto px-6 pb-24">
                    <div className="ag-glass rounded-[2.5rem] px-8 py-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Your stuff is worth more live.</h2>
                        <p className="text-white/60 mb-10 max-w-md mx-auto">
                            List in under two minutes, attach a TikTok, and let the crowd find your price.
                        </p>
                        <button className="rounded-2xl px-10 py-4 font-semibold text-lg bg-gradient-to-r from-violet-500 to-cyan-400 hover:scale-[1.03] transition shadow-lg shadow-cyan-500/30">
                            Start selling free
                        </button>
                    </div>
                </section>

                <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
                    Auction IO · Design direction 05 — Aurora Glass · <Link to="/designs" className="underline hover:text-white">All directions</Link>
                </footer>
            </div>
        </div>
    );
}
