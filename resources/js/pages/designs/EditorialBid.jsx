import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_AUCTIONS, STATS, STEPS, formatMoney } from './mockData';

// Direction 03 — "The Editorial"
// Light magazine layout: oversized serif headlines, generous whitespace,
// numbered index rows instead of cards. Calm, credible, collector-focused.
export default function EditorialBid() {
    return (
        <div className="min-h-screen bg-[#faf8f4] text-[#1a1815]">
            <style>{`
                @keyframes ed-underline { from { width: 0; } to { width: 100%; } }
                .ed-row:hover .ed-line { animation: ed-underline .4s ease forwards; }
            `}</style>

            {/* Masthead */}
            <header className="border-b-2 border-[#1a1815]">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
                    <span>Issue nº 214 — The Live Sale</span>
                    <span className="hidden md:block uppercase tracking-[0.3em]">Auction IO Journal</span>
                    <button className="underline underline-offset-4 hover:no-underline">Sign in</button>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-5xl mx-auto px-6 pt-20 pb-16">
                <h1 className="font-serif text-6xl md:text-8xl leading-[0.95] mb-10">
                    Every object
                    <br />
                    has a <em>closing time.</em>
                </h1>
                <div className="grid md:grid-cols-2 gap-10 items-end">
                    <p className="text-xl leading-relaxed text-[#4a463f]">
                        Auction IO is a live marketplace for the things people actually
                        chase — watches, prints, cameras, grails — each lot paired with
                        video, each bid delivered in real time.
                    </p>
                    <div className="flex md:justify-end gap-4">
                        <button className="px-8 py-4 bg-[#1a1815] text-[#faf8f4] font-semibold hover:bg-[#c2410c] transition">
                            View today's index →
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats rule */}
            <section className="border-y border-[#1a1815]/20">
                <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {STATS.map((s) => (
                        <div key={s.label} className="flex items-baseline gap-2">
                            <span className="font-serif text-3xl">{s.value}</span>
                            <span className="text-sm text-[#7a7468]">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Index rows */}
            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="flex items-baseline justify-between mb-10">
                    <h2 className="font-serif text-4xl">Today's index</h2>
                    <span className="text-sm text-[#7a7468]">Updated live · 14:02 UTC</span>
                </div>
                <div>
                    {MOCK_AUCTIONS.map((a, i) => (
                        <div key={a.id} className="ed-row group border-t border-[#1a1815]/20 last:border-b py-6 grid grid-cols-12 gap-4 items-center cursor-pointer">
                            <span className="col-span-1 font-serif text-2xl text-[#7a7468]">{String(i + 1).padStart(2, '0')}</span>
                            <span className="col-span-1 text-3xl">{a.emoji}</span>
                            <div className="col-span-6 md:col-span-5">
                                <div className="relative inline-block">
                                    <h3 className="font-serif text-2xl leading-tight group-hover:text-[#c2410c] transition">{a.title}</h3>
                                    <span className="ed-line absolute -bottom-1 left-0 h-px bg-[#c2410c] w-0" />
                                </div>
                                <p className="text-sm text-[#7a7468] mt-1">{a.category} · {a.bids} bids placed</p>
                            </div>
                            <div className="col-span-2 hidden md:block text-sm text-[#7a7468] tabular-nums">closes {a.endsIn}</div>
                            <div className="col-span-4 md:col-span-3 text-right">
                                <span className="font-serif text-2xl">{formatMoney(a.currentBid)}</span>
                                <span className="block text-xs uppercase tracking-widest text-[#7a7468]">current bid</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Essay-style steps */}
            <section className="bg-[#1a1815] text-[#faf8f4]">
                <div className="max-w-5xl mx-auto px-6 py-20">
                    <h2 className="font-serif text-4xl mb-14">How a sale works here</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        {STEPS.map((s, i) => (
                            <div key={s.title}>
                                <div className="font-serif text-5xl text-[#c2410c] mb-4">{['I', 'II', 'III'][i]}</div>
                                <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
                                <p className="text-[#b5afa3] leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pull-quote CTA */}
            <section className="max-w-5xl mx-auto px-6 py-24 text-center">
                <p className="font-serif text-3xl md:text-5xl leading-tight mb-10 max-w-3xl mx-auto">
                    “The best price isn't set by a store.
                    <br />
                    It's <em className="text-[#c2410c]">discovered by a crowd.</em>”
                </p>
                <div className="flex justify-center gap-4">
                    <button className="px-8 py-4 bg-[#c2410c] text-white font-semibold hover:bg-[#1a1815] transition">
                        Start bidding
                    </button>
                    <button className="px-8 py-4 border border-[#1a1815] font-semibold hover:bg-[#1a1815] hover:text-[#faf8f4] transition">
                        Consign a lot
                    </button>
                </div>
            </section>

            <footer className="border-t-2 border-[#1a1815] px-6 py-6 text-center text-sm text-[#7a7468]">
                Auction IO · Design direction 03 — The Editorial · <Link to="/designs" className="underline hover:text-[#1a1815]">All directions</Link>
            </footer>
        </div>
    );
}
