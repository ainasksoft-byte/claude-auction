import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_AUCTIONS, STATS, STEPS, formatMoney } from './mockData';

// Direction 01 — "Midnight Luxe"
// Dark auction-house luxury: serif display type, champagne-gold accents,
// hairline rules, slow shimmer. Positions Auction IO as a premium house.
export default function MidnightLuxe() {
    const gold = '#c9a24b';

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-[#ece7dc] font-serif">
            <style>{`
                @keyframes luxe-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                @keyframes luxe-rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
                .luxe-rise { animation: luxe-rise .9s ease both; }
                .luxe-rise-2 { animation: luxe-rise .9s .15s ease both; }
                .luxe-rise-3 { animation: luxe-rise .9s .3s ease both; }
                .luxe-gold-text {
                    background: linear-gradient(100deg, #c9a24b 20%, #f4e3b2 40%, #c9a24b 60%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    animation: luxe-shimmer 6s linear infinite;
                }
            `}</style>

            {/* Nav */}
            <header className="border-b border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <span className="text-xl tracking-[0.35em] uppercase">Auction&nbsp;IO</span>
                    <nav className="hidden md:flex gap-10 text-sm tracking-widest uppercase text-[#b7ae9c]">
                        <a href="#lots" className="hover:text-white transition">Lots</a>
                        <a href="#how" className="hover:text-white transition">How it works</a>
                        <a href="#sell" className="hover:text-white transition">Consign</a>
                    </nav>
                    <button className="text-xs tracking-[0.25em] uppercase border px-5 py-2.5 hover:bg-white hover:text-black transition" style={{ borderColor: gold }}>
                        Enter the room
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
                <p className="luxe-rise text-xs tracking-[0.5em] uppercase mb-8" style={{ color: gold }}>
                    Live now · Evening sale nº 214
                </p>
                <h1 className="luxe-rise-2 text-5xl md:text-7xl leading-[1.05] mb-8">
                    Rare things belong to
                    <br />
                    <em className="luxe-gold-text not-italic">the fastest hand.</em>
                </h1>
                <p className="luxe-rise-3 max-w-xl mx-auto text-lg text-[#b7ae9c] font-sans mb-12">
                    Real-time bidding on watches, art, and grails — every lot verified,
                    every bid streamed live to the second.
                </p>
                <div className="luxe-rise-3 flex justify-center gap-4 font-sans">
                    <button className="px-8 py-4 text-sm tracking-widest uppercase text-black font-semibold" style={{ background: gold }}>
                        Browse the lots
                    </button>
                    <button className="px-8 py-4 text-sm tracking-widest uppercase border border-white/20 hover:border-white/60 transition">
                        Watch live
                    </button>
                </div>
            </section>

            {/* Stats strip */}
            <section className="border-y border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-sans">
                    {STATS.map((s) => (
                        <div key={s.label}>
                            <div className="text-3xl mb-1" style={{ color: gold }}>{s.value}</div>
                            <div className="text-xs tracking-[0.25em] uppercase text-[#8f8674]">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lots */}
            <section id="lots" className="max-w-6xl mx-auto px-6 py-24">
                <div className="flex items-end justify-between mb-12">
                    <h2 className="text-4xl">Tonight's lots</h2>
                    <span className="text-xs tracking-[0.3em] uppercase text-[#8f8674] font-sans">06 of 2,340</span>
                </div>
                <div className="grid md:grid-cols-3 gap-px bg-white/10">
                    {MOCK_AUCTIONS.map((a, i) => (
                        <article key={a.id} className="bg-[#0a0a0c] p-8 group hover:bg-[#111114] transition">
                            <div className="text-5xl mb-6">{a.emoji}</div>
                            <p className="text-[10px] tracking-[0.3em] uppercase text-[#8f8674] font-sans mb-2">
                                Lot {String(i + 1).padStart(3, '0')} · {a.category}
                            </p>
                            <h3 className="text-xl mb-6 leading-snug">{a.title}</h3>
                            <div className="flex items-end justify-between font-sans">
                                <div>
                                    <p className="text-[10px] tracking-widest uppercase text-[#8f8674]">Current bid</p>
                                    <p className="text-2xl" style={{ color: gold }}>{formatMoney(a.currentBid)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] tracking-widest uppercase text-[#8f8674]">Closes in</p>
                                    <p className="text-sm tabular-nums">{a.endsIn}</p>
                                </div>
                            </div>
                            <button className="mt-6 w-full py-3 text-xs tracking-[0.3em] uppercase border border-white/15 font-sans opacity-0 group-hover:opacity-100 transition hover:bg-white hover:text-black">
                                Place a bid
                            </button>
                        </article>
                    ))}
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="border-t border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-14">
                    {STEPS.map((s, i) => (
                        <div key={s.title}>
                            <div className="text-6xl mb-6 text-white/10">0{i + 1}</div>
                            <h3 className="text-2xl mb-3" style={{ color: gold }}>{s.title}</h3>
                            <p className="text-[#b7ae9c] font-sans leading-relaxed">{s.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section id="sell" className="border-t border-white/10 text-center px-6 py-28">
                <h2 className="text-4xl md:text-5xl mb-6">
                    Have something <em className="luxe-gold-text not-italic">worth fighting over?</em>
                </h2>
                <p className="text-[#b7ae9c] font-sans mb-10 max-w-lg mx-auto">
                    Consign in minutes. Attach a TikTok, set a reserve, and let the room do the rest.
                </p>
                <button className="px-10 py-4 text-sm tracking-widest uppercase text-black font-semibold font-sans" style={{ background: gold }}>
                    Start selling
                </button>
            </section>

            <footer className="border-t border-white/10 px-6 py-8 text-center text-xs tracking-[0.3em] uppercase text-[#8f8674] font-sans">
                Auction IO · Design direction 01 — Midnight Luxe · <Link to="/designs" className="underline hover:text-white">All directions</Link>
            </footer>
        </div>
    );
}
