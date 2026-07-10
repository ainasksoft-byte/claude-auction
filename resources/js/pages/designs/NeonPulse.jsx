import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_AUCTIONS, STATS, STEPS, formatMoney } from './mockData';

// Direction 02 — "Neon Pulse"
// TikTok-native energy: neon red/cyan on near-black, scrolling ticker,
// tilted cards, loud CTAs. The closest evolution of the current brand.
export default function NeonPulse() {
    return (
        <div className="min-h-screen bg-[#08080a] text-white overflow-hidden">
            <style>{`
                @keyframes np-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
                @keyframes np-glow { 0%,100% { box-shadow: 0 0 24px rgba(255,0,80,.45); } 50% { box-shadow: 0 0 48px rgba(0,212,255,.45); } }
                @keyframes np-blink { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
                .np-marquee { animation: np-marquee 22s linear infinite; }
                .np-glow { animation: np-glow 3s ease-in-out infinite; }
                .np-blink { animation: np-blink 1.2s ease-in-out infinite; }
            `}</style>

            {/* Ticker */}
            <div className="bg-[#ff0050] text-black text-sm font-black uppercase whitespace-nowrap overflow-hidden py-2">
                <div className="np-marquee inline-block">
                    {[0, 1].map((k) => (
                        <span key={k}>
                            {MOCK_AUCTIONS.map((a) => (
                                <span key={a.id} className="mx-6">
                                    {a.emoji} {a.title} — {formatMoney(a.currentBid)} · {a.bids} bids
                                </span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            {/* Nav */}
            <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                <span className="text-2xl font-black italic">
                    AUCTION<span className="text-[#ff0050]">.IO</span>
                </span>
                <button className="px-5 py-2.5 rounded-full font-bold bg-gradient-to-r from-[#ff0050] to-[#ff6b9d] hover:scale-105 transition">
                    Start bidding
                </button>
            </header>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-14 pb-20 grid md:grid-cols-2 gap-14 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                        <span className="np-blink w-2 h-2 rounded-full bg-[#ff0050]" />
                        184,209 bids in the last 24h
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black leading-[0.95] mb-6">
                        BID LIKE
                        <br />
                        <span className="bg-gradient-to-r from-[#ff0050] via-[#ff6b9d] to-[#00d4ff] bg-clip-text text-transparent">
                            YOU MEAN IT.
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-md">
                        The auction feed that moves like your For You page. Live video,
                        live prices, one tap to jump in.
                    </p>
                    <div className="flex gap-3">
                        <button className="np-glow px-7 py-4 rounded-2xl font-black text-lg bg-[#ff0050] hover:bg-[#e60048] transition">
                            EXPLORE LIVE ⚡
                        </button>
                        <button className="px-7 py-4 rounded-2xl font-bold text-lg border-2 border-white/20 hover:border-[#00d4ff] hover:text-[#00d4ff] transition">
                            Sell something
                        </button>
                    </div>
                </div>

                {/* Tilted card stack */}
                <div className="relative h-[420px] hidden md:block">
                    {MOCK_AUCTIONS.slice(0, 3).map((a, i) => (
                        <div
                            key={a.id}
                            className="absolute w-72 rounded-3xl p-6 bg-[#141418] border border-white/10 shadow-2xl transition hover:z-20 hover:scale-105"
                            style={{ top: i * 90, left: i * 70, transform: `rotate(${(i - 1) * 6}deg)`, zIndex: 3 - i }}
                        >
                            <div className="text-5xl mb-4">{a.emoji}</div>
                            <p className="font-bold leading-tight mb-3">{a.title}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-[#00d4ff] font-black text-xl">{formatMoney(a.currentBid)}</span>
                                <span className="text-xs bg-[#ff0050]/20 text-[#ff6b9d] font-bold px-2.5 py-1 rounded-full">
                                    ⏱ {a.endsIn}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATS.map((s, i) => (
                        <div key={s.label} className={`rounded-2xl p-6 text-center ${i % 2 ? 'bg-[#00d4ff]/10' : 'bg-[#ff0050]/10'}`}>
                            <div className="text-3xl font-black">{s.value}</div>
                            <div className="text-sm text-gray-400 font-semibold">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Hot right now */}
            <section className="max-w-6xl mx-auto px-6 pb-20">
                <h2 className="text-3xl font-black mb-8">
                    🔥 HOT RIGHT <span className="text-[#ff0050]">NOW</span>
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {MOCK_AUCTIONS.map((a) => (
                        <article key={a.id} className="rounded-3xl bg-[#141418] border border-white/10 p-6 hover:border-[#ff0050] hover:-translate-y-1 transition group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="text-4xl">{a.emoji}</div>
                                {a.hot && <span className="text-xs font-black bg-[#ff0050] px-2.5 py-1 rounded-full">HOT</span>}
                            </div>
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">{a.category} · {a.bids} bids</p>
                            <h3 className="font-bold text-lg leading-snug mb-4">{a.title}</h3>
                            <div className="flex items-center justify-between">
                                <span className="text-xl font-black text-[#00d4ff]">{formatMoney(a.currentBid)}</span>
                                <button className="px-4 py-2 rounded-xl font-bold text-sm bg-white/10 group-hover:bg-[#ff0050] transition">
                                    Bid now
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Steps */}
            <section className="max-w-6xl mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-3 gap-5">
                    {STEPS.map((s, i) => (
                        <div key={s.title} className="rounded-3xl p-8 bg-gradient-to-b from-white/[0.06] to-transparent border border-white/10">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ff0050] to-[#00d4ff] flex items-center justify-center font-black mb-5">
                                {i + 1}
                            </div>
                            <h3 className="text-xl font-black mb-2">{s.title}</h3>
                            <p className="text-gray-400">{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center px-6 pb-24">
                <h2 className="text-4xl md:text-6xl font-black mb-8">
                    DON'T WATCH.<br />
                    <span className="bg-gradient-to-r from-[#ff0050] to-[#00d4ff] bg-clip-text text-transparent">WIN.</span>
                </h2>
                <button className="np-glow px-10 py-5 rounded-2xl font-black text-xl bg-[#ff0050]">
                    CREATE FREE ACCOUNT
                </button>
            </section>

            <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-500 font-semibold">
                Auction IO · Design direction 02 — Neon Pulse · <Link to="/designs" className="underline hover:text-white">All directions</Link>
            </footer>
        </div>
    );
}
