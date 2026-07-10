// Shared mock data for the /designs landing page directions.
// Static so every direction renders without the API or a database.

export const MOCK_AUCTIONS = [
    {
        id: 1,
        title: 'Vintage Rolex Submariner 1968',
        category: 'Watches',
        currentBid: 18250,
        bids: 47,
        endsIn: '02:14:09',
        emoji: '⌚',
        hot: true,
    },
    {
        id: 2,
        title: 'Air Jordan 1 Chicago — Deadstock',
        category: 'Sneakers',
        currentBid: 3400,
        bids: 89,
        endsIn: '00:41:33',
        emoji: '👟',
        hot: true,
    },
    {
        id: 3,
        title: 'Charizard 1st Edition PSA 9',
        category: 'Cards',
        currentBid: 12800,
        bids: 132,
        endsIn: '05:02:51',
        emoji: '🃏',
        hot: false,
    },
    {
        id: 4,
        title: 'Leica M6 Classic Film Camera',
        category: 'Cameras',
        currentBid: 2950,
        bids: 28,
        endsIn: '01:19:45',
        emoji: '📷',
        hot: false,
    },
    {
        id: 5,
        title: 'Banksy — Signed Screen Print',
        category: 'Art',
        currentBid: 45500,
        bids: 61,
        endsIn: '11:58:20',
        emoji: '🎨',
        hot: true,
    },
    {
        id: 6,
        title: 'Gibson Les Paul Standard 1959',
        category: 'Music',
        currentBid: 88000,
        bids: 19,
        endsIn: '23:07:12',
        emoji: '🎸',
        hot: false,
    },
];

export const STATS = [
    { label: 'Live auctions', value: '2,340' },
    { label: 'Bids today', value: '184K' },
    { label: 'Avg. sell time', value: '3.2h' },
    { label: 'Sellers paid out', value: '$41M' },
];

export const STEPS = [
    {
        title: 'Discover',
        text: 'Scroll a live feed of auctions with TikTok videos attached — see the item in motion before you bid.',
    },
    {
        title: 'Bid in real time',
        text: 'Every bid streams live over websockets. Watch the price move second by second, no refresh.',
    },
    {
        title: 'Win & own it',
        text: 'Highest bid when the clock hits zero takes it. Secure checkout and tracked shipping, done.',
    },
];

export const formatMoney = (n) => '$' + n.toLocaleString('en-US');
