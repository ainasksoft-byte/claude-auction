import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_AUCTIONS, STATS, STEPS, formatMoney } from './mockData';

// Direction 04 — "Brutal Bid"
// Neo-brutalist: mono type, thick borders, hard shadows, acid yellow accent.
// Loud, honest, terminal-of-the-bazaar energy for a younger audience.
export default function BrutalBid() {
    return (
        <div className="min-h-screen bg-[#f2f0e9] text-black font-mono">
            <style>{`
                @keyframes bb-tick { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
                .bb-cursor { animation: bb-tick 1s steps(1) infinite; }
                .bb-shadow { box-shadow: 6px 6px 0 #000; }
                .bb-shadow-hover:hover { transform: translate(-2px,-2px); box-shadow: 8px 8px 0 #000; }
            `}</style>

            {/* Nav */}
            <header className="border-b-4 border-black bg-[#e8ff32]">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="text-xl font-bold">[AUCTION_IO]</span>
                    <nav className="hidden md:flex gap-8 text-sm font-bold">
                        <a href="#live" className="hover:bg-black hover:text-[#e8ff32] px-2 py-1">./live</a>
                        <a href="#how" className="hover:bg-black hover:text-[#e8ff32] px-2 py-1">./how</a>
                        <a href="#sell" className="hover:bg-black hover:text-[#e8ff32] px-2 py-1">./sell</a>
                    </nav>
                    <button className="bb-shadow bb-shadow-hover transition bg-white border-4 border-black px-5 py-2 font-bold">
                        LOG_IN →
                    </button>
                </div>
            </header>

            {/* Hero */}
            <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
                <p className="text-sm mb-6 bg-black text-[#e8ff32] inline-block px-3 py-1.5">
                    ~/auctions/live $ tail -f bids.log<span className="bb-cursor">▮</span>
                </p>
                <h1 className="text-5xl md:text-8xl font-bold leading-[0.95] uppercase mb-8">
                    Highest bid
                    <br />
                    <span className="bg-[#e8ff32] px-3 inline-block -rotate-1 border-4 border-black">wins.</span>
                    <br />
                    No mercy.
                </h1>
                <p className="max-w-lg text-lg mb-10">
                    Live auctions. Real-time prices. TikTok videos on every lot.
                    Zero fluff — the clock decides.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bb-shadow bb-shadow-hover transition bg-[#ff4911] text-white border-4 border-black px-8 py-4 text-lg font-bold uppercase">
                        Enter live floor
                    </button>
                    <button className="bb-shadow bb-shadow-hover transition bg-white border-4 border-black px-8 py-4 text-lg font-bold uppercase">
                        List an item
                    </button>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y-4 border-black bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x-4 divide-black border-black">
                    {STATS.map((s) => (
                        <div key={s.label} className="px-6 py-8 text-center">
                            <div className="text-3xl font-bold">{s.value}</div>
                            <div className="text-xs uppercase mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Live grid */}
            <section id="live" className="max-w-6xl mx-auto px-6 py-20">
                <h2 className="text-4xl font-bold uppercase mb-10">
                    <span className="bg-[#ff4911] text-white px-2">LIVE</span> right now
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {MOCK_AUCTIONS.map((a, i) => (
                        <article key={a.id} className={`bb-shadow bb-shadow-hover transition border-4 border-black p-6 ${i % 3 === 0 ? 'bg-[#e8ff32]' : i % 3 === 1 ? 'bg-white' : 'bg-[#b8e1ff]'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-5xl">{a.emoji}</span>
                                <span className="text-xs font-bold bg-black text-white px-2 py-1">T-{a.endsIn}</span>
                            </div>
                            <p className="text-xs font-bold uppercase mb-1">{a.category} // {a.bids}_bids</p>
                            <h3 className="text-lg font-bold leading-tight mb-4 uppercase">{a.title}</h3>
                            <div className="border-t-4 border-black pt-4 flex items-center justify-between">
                                <span className="text-2xl font-bold">{formatMoney(a.currentBid)}</span>
                                <button className="border-4 border-black bg-black text-white px-3 py-1.5 text-sm font-bold hover:bg-[#ff4911] transition">
                                    BID++
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* How */}
            <section id="how" className="bg-black text-white border-y-4 border-black">
                <div className="max-w-6xl mx-auto px-6 py-20">
                    <h2 className="text-4xl font-bold uppercase mb-12 text-[#e8ff32]">system.how_it_works()</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {STEPS.map((s, i) => (
                            <div key={s.title} className="border-4 border-[#e8ff32] p-6">
                                <div className="text-sm text-[#e8ff32] mb-3">STEP_{i + 1}.exe</div>
                                <h3 className="text-2xl font-bold uppercase mb-3">{s.title}</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">{s.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section id="sell" className="max-w-6xl mx-auto px-6 py-24 text-center">
                <h2 className="text-4xl md:text-6xl font-bold uppercase mb-8 leading-tight">
                    Stop scrolling.
                    <br />
                    <span className="bg-[#e8ff32] border-4 border-black px-3 inline-block rotate-1">Start winning.</span>
                </h2>
                <button className="bb-shadow bb-shadow-hover transition bg-[#ff4911] text-white border-4 border-black px-10 py-5 text-xl font-bold uppercase">
                    Create account — free
                </button>
            </section>

            <footer className="border-t-4 border-black bg-[#e8ff32] px-6 py-6 text-center text-sm font-bold">
                AUCTION_IO · DESIGN_DIRECTION_04 — BRUTAL_BID · <Link to="/designs" className="underline">cd ../all_directions</Link>
            </footer>
        </div>
    );
}
