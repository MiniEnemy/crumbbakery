import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'lemon-drizzle',
    name: 'Lemon Drizzle Loaf',
    description: 'Zesty, moist sponge baked with organic Amalfi lemons, free-range local eggs and glistening sugar glaze with zest.',
    price: 2.80,
    category: 'favourites',
    tags: ['Zesty', 'Ellie\'s Pick', 'Best Seller'],
    isFav: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdVlBiiJZDzWUMpRGGVRQG4LQ4Gdce2SkljF5NkWP7EXLLcSP33A-D4ueRwsk49BkXPodGoNbOGD2wjBZV0i6UKnDqmMCkHQWRTFTr-BygtElXT2BFjDfLYRJDW7DzKUJVNqGMcq7OZepyOcHplDr1n4x26bcrAUo54EnclYu0wIbamc6E-uVIme5xiZJW5ShHV1ij-5rtP_UohlnBudWVBIZYgbQU17YoACsahLAQMYbVrsJj_rgGn8L2GiA93RfRRZzLV0lsC-0',
    altText: 'A macro photography shot of a moist lemon drizzle loaf cake on an artisanal ceramic plate.'
  },
  {
    id: 'cinnamon-bun',
    name: 'Cinnamon Chelsea Bun',
    description: 'Soft, pillowy dough swirled with spicy cinnamon, brown sugar, and topped with our signature thick vanilla frosting.',
    price: 3.20,
    category: 'favourites',
    tags: ['Soft & Gooey', 'Rosie\'s Favourite'],
    isFav: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmqH2jH1ZETIUnOrgrQKhSBFa48R0GV5LXhI8nP90rWl7pZrroQFN07kW59h7gC3trgVWPEVpUUWza-ZeoZ7a0gCTJvKHVfSa_mDzNyuV-gRplYuwLwsBFG1ZJk1Q66Sethca3AiTAYpNz0YQH09GTIMNpaZifOSIjjKQIXrZov1zYkgACfiz9S6-thjj35MkuHKI4ibDv4bRNOhoRZnQdPHDGhce6RxZAnohKPe34OGQEwwQvIZkyF8Cay9I4WEGi3yL8Wfi-KhQ',
    altText: 'Close-up of a golden-brown Cinnamon Chelsea Bun topped with thick, creamy vanilla frosting.'
  },
  {
    id: 'raspberry-muffin',
    name: 'Raspberry & Chocolate Muffin',
    description: 'Fresh local raspberries and chunks of premium Belgian white chocolate baked inside a golden-top fluffy muffin.',
    price: 3.00,
    category: 'favourites',
    tags: ['Fruity', 'Belgian Chocolate'],
    isFav: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzFy9S-Uh6ZoSX4sfWt0IoPH5M6CCe8uzhAEMWw5VSj-HHXGj9DX9DH4-AJHiq332UL3SFpHA0dDZ4PLpGsOf7LeeYBc5gIyt97l1d_EAD9_Mopelagc4osNmazYzGXbu8fA8ZTPhGQKGlVauLHLduLzYAzzF_DhfhmGjWoebOT_xbFePJC3C9VOA9J8lliRf4iK1aI5XikTFInWUxqUV6gKddtiKhVR6CE7Izs4EB77G-TiRNEVLOkFGL1mZj2nyC3ibiDWDin68',
    altText: 'A stack of raspberry and white chocolate muffins.'
  },
  {
    id: 'sourdough-country',
    name: 'Sourdough Country Loaf',
    description: 'Slow-fermented for 36 hours. Open crumb, crisp blisters, and a classic robust artisan sour flavor.',
    price: 4.20,
    category: 'loaves',
    tags: ['Vegan', 'Slow Ferment', 'Local Grains'],
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
    altText: 'Fresh sourdough boule with a flour-dusted cross score.'
  },
  {
    id: 'rosemary-sourdough',
    name: 'Rosemary & Sea Salt Sourdough',
    description: 'Infused with fragrant organic garden rosemary and sprinkled with coarse flakes of premium sea salt.',
    price: 4.50,
    category: 'loaves',
    tags: ['Vegan', 'Herbaceous', 'Crowd Pleaser'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    altText: 'Rustic loaf surrounded by fresh rosemary stalks.'
  },
  {
    id: 'heritage-tea-loaf',
    name: 'Heritage Tea Loaf',
    description: 'Heritage bakery cake loaded with dried sultanas and raisins, pre-soaked overnight in strong premium gold tea.',
    price: 3.80,
    category: 'loaves',
    tags: ['Nostalgic', 'Perfect with Tea'],
    image: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?auto=format&fit=crop&q=80&w=600',
    altText: 'Traditional fruit bread sliced and buttered.'
  },
  {
    id: 'cardamom-orange',
    name: 'Cardamom & Orange Bun',
    description: 'Nordic-style twisted wheat bun, subtly sweetened with ground cardamom and glazed with blood orange syrup.',
    price: 3.40,
    category: 'buns',
    tags: ['Spiced', 'Aromatic'],
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&q=80&w=600',
    altText: 'Cardamom buns twisted with pearl sugar coating.'
  },
  {
    id: 'pain-chocolat',
    name: 'Pain au Chocolat',
    description: 'Layer upon layer of rich cultured Normandy butter pastry wrapped around dark chocolate baton centers.',
    price: 2.90,
    category: 'buns',
    tags: ['Flaky', 'Free-Range'],
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&q=80&w=600',
    altText: 'Golden-brown French Pain au Chocolat.'
  },
  {
    id: 'custard-tartlet',
    name: 'Vanilla Bean Custard Tart',
    description: 'Rich, smooth pastry cream infused with real Madagascar vanilla beans inside a crisp shortcrust shell.',
    price: 3.50,
    category: 'muffins',
    tags: ['Velvety', 'Sweet Treat'],
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
    altText: 'Pastry cream tartlet decorated with a fresh blueberry.'
  },
  {
    id: 'victoria-sponge',
    name: 'Classic Victoria Celebration Sponge',
    description: 'Two layers of golden sponge sandwiched with organic strawberry jam and smooth vanilla buttercream.',
    price: 28.00,
    category: 'celebration',
    tags: ['Signature', 'Serves 8-10', 'Celebration'],
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    altText: 'Victoria sponge cake dusted with confectioners sugar and topped with strawberries.'
  },
  {
    id: 'triple-chocolate-cake',
    name: 'Decadent Triple Chocolate Layer',
    description: 'Moist dark chocolate sponge coated with white, milk, and dark chocolate ganache drip. Topped with hand-rolled truffles.',
    price: 35.00,
    category: 'celebration',
    tags: ['Fudge', 'Serves 12-14', 'Dark & Rich'],
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600',
    altText: 'Tall chocolate drip cake sliced open to display fudge layers.'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah J. (Dubai)',
    text: 'The best scones and pastries in all of Dubai! I drive across town every Saturday just for their cinnamon bun special!',
    rating: 5,
    date: '3 days ago'
  },
  {
    id: 'rev-2',
    author: 'Mark & Emily (Wedded Couple)',
    text: 'Crumb & Co. made our wedding cake and it was stunning. Minimalist design, beautifully layered organic strawberry sponge, and tasted absolutely divine.',
    rating: 5,
    date: '1 week ago'
  },
  {
    id: 'rev-3',
    author: 'David L. (Local Food Critic)',
    text: 'Their lemon drizzle loaf is completely unrivaled—magically moist. Ellie and Rosie maintain a majestic standard of flour craft here.',
    rating: 5,
    date: '2 weeks ago'
  }
];
