import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  desc: string;
  weight: string;
  price: number;
  img: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface User {
  email: string;
  password: string;
  orders: Order[];
}

interface Order {
  id: number;
  date: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
}

const products: Product[] = [
  { id: 1, name: "РњРµРґРѕРІРёРє РЅРµР¶РЅС‹Р№", desc: "РљР»Р°СЃСЃРёС‡РµСЃРєРёР№ РјРЅРѕРіРѕСЃР»РѕР№РЅС‹Р№ С‚РѕСЂС‚", weight: "900 Рі", price: 1350, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 2, name: "Р§РёР·РєРµР№Рє РќСЊСЋ-Р™РѕСЂРє", desc: "РљСЂРµРјРѕРІР°СЏ С‚РµРєСЃС‚СѓСЂР°", weight: "1000 Рі", price: 1600, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 3, name: "РљР°РїРєРµР№Рє РЎРѕР»С‘РЅР°СЏ РєР°СЂР°РјРµР»СЊ", desc: "РќРµР¶РЅС‹Р№ Р±РёСЃРєРІРёС‚", weight: "110 Рі", price: 220, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 4, name: "РџРµС‡РµРЅСЊРµ СЃ С€РѕРєРѕР»Р°РґРѕРј", desc: "РҐСЂСѓСЃС‚СЏС‰РµРµ, СЃ РєСѓСЃРѕС‡РєР°РјРё С€РѕРєРѕР»Р°РґР°", weight: "250 Рі", price: 390, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 5, name: "РњР°РєР°СЂСѓРЅСЃ Р°СЃСЃРѕСЂС‚Рё", desc: "6 С€С‚, С„СЂР°РЅС†СѓР·СЃРєРёРµ", weight: "150 Рі", price: 540, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 6, name: "Р­РєР»РµСЂ СЃ Р·Р°РІР°СЂРЅС‹Рј РєСЂРµРјРѕРј", desc: "4 С€С‚, РІРѕР·РґСѓС€РЅРѕРµ С‚РµСЃС‚Рѕ", weight: "200 Рі", price: 450, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 7, name: "РўРѕСЂС‚ РЇРіРѕРґРЅС‹Р№ СЂР°Р№", desc: "РЎРІРµР¶РёРµ С„СЂСѓРєС‚С‹ Рё СЏРіРѕРґС‹", weight: "1200 Рі", price: 1850, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 8, name: "РљР°РїРєРµР№РєРё Р§РµСЂРЅРёС‡РЅС‹Рµ", desc: "РЎ С‡РµСЂРЅРёС‡РЅС‹Рј РєСЂРµРјРѕРј", weight: "110 Рі", price: 240, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 9, name: "РЁРѕРєРѕР»Р°РґРЅС‹Р№ С‚РѕСЂС‚", desc: "Р‘РµР»СЊРіРёР№СЃРєРёР№ С€РѕРєРѕР»Р°Рґ", weight: "950 Рі", price: 1750, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 10, name: "РњРёРЅРё-РїРёСЂРѕР¶РЅС‹Рµ", desc: "РђСЃСЃРѕСЂС‚Рё 8 С€С‚", weight: "400 Рі", price: 890, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 11, name: "РќР°РїРѕР»РµРѕРЅ", desc: "РўСЂР°РґРёС†РёРѕРЅРЅС‹Р№ СЂРµС†РµРїС‚", weight: "850 Рі", price: 1450, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 12, name: "РўРёСЂР°РјРёСЃСѓ", desc: "РС‚Р°Р»СЊСЏРЅСЃРєР°СЏ РєР»Р°СЃСЃРёРєР°", weight: "700 Рі", price: 1550, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 13, name: "РўРѕСЂС‚ РљСЂР°СЃРЅС‹Р№ Р±Р°СЂС…Р°С‚", desc: "РЎ РєСЂРµРјС‡РёР·РѕРј", weight: "1100 Рі", price: 1950, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 14, name: "Р§РёР·РєРµР№Рє СЃ СЏРіРѕРґР°РјРё", desc: "РљР»СѓР±РЅРёРєР° Рё РјР°Р»РёРЅР°", weight: "950 Рі", price: 1700, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 15, name: "Р¤СЂСѓРєС‚РѕРІС‹Р№ С‚РѕСЂС‚", desc: "РЎРІРµР¶РёРµ С„СЂСѓРєС‚С‹", weight: "1300 Рі", price: 2100, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 16, name: "РЁРѕРєРѕР»Р°РґРЅС‹Р№ РєР°РїРєРµР№Рє", desc: "РЎ С‚РµРјРЅС‹Рј С€РѕРєРѕР»Р°РґРѕРј", weight: "120 Рі", price: 250, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 17, name: "РљР°РїРєРµР№РєРё РџСЂР°Р·РґРЅРёС‡РЅС‹Рµ", desc: "РЎ РґРµРєРѕСЂРѕРј", weight: "110 Рі", price: 280, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 18, name: "РњР°РєР°СЂРѕРЅ РђСЃСЃРѕСЂС‚Рё XL", desc: "12 С€С‚ СЂР°Р·РЅС‹С… РІРєСѓСЃРѕРІ", weight: "300 Рі", price: 980, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 19, name: "Р‘СЂР°СѓРЅРё С€РѕРєРѕР»Р°РґРЅС‹Рµ", desc: "Р’Р»Р°Р¶РЅС‹Рµ СЃ РѕСЂРµС…Р°РјРё", weight: "300 Рі", price: 650, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 20, name: "Р‘СЂР°СѓРЅРё РїСЂРµРјРёСѓРј", desc: "РЎ Р±РµР»С‹Рј С€РѕРєРѕР»Р°РґРѕРј", weight: "350 Рі", price: 720, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 21, name: "РџРѕРЅС‡РёРєРё РіР»Р°Р·РёСЂРѕРІР°РЅРЅС‹Рµ", desc: "6 С€С‚ СЃ СЂР°Р·РЅРѕР№ РіР»Р°Р·СѓСЂСЊСЋ", weight: "350 Рі", price: 480, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 22, name: "РџРѕРЅС‡РёРє СЂРѕР·РѕРІС‹Р№", desc: "РЎ РєР»СѓР±РЅРёС‡РЅРѕР№ РіР»Р°Р·СѓСЂСЊСЋ", weight: "80 Рі", price: 120, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 23, name: "РџРѕРЅС‡РёРєРё СЃ РїРѕСЃС‹РїРєРѕР№", desc: "РЇСЂРєРёРµ Рё РІРєСѓСЃРЅС‹Рµ", weight: "320 Рі", price: 450, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 24, name: "РџРёСЂРѕРі С‡РµСЂРЅРёС‡РЅС‹Р№", desc: "РљР»Р°СЃСЃРёС‡РµСЃРєРёР№ РґРѕРјР°С€РЅРёР№", weight: "800 Рі", price: 1350, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 25, name: "РўР°СЂС‚ СЏРіРѕРґРЅС‹Р№", desc: "РЎ Р·Р°РІР°СЂРЅС‹Рј РєСЂРµРјРѕРј", weight: "600 Рі", price: 1250, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 26, name: "РўР°СЂС‚ С„СЂСѓРєС‚РѕРІС‹Р№", desc: "РњРёРєСЃ СЏРіРѕРґ Рё С„СЂСѓРєС‚РѕРІ", weight: "650 Рі", price: 1400, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 27, name: "РљСЂРµРј-Р±СЂСЋР»Рµ", desc: "Р¤СЂР°РЅС†СѓР·СЃРєРёР№ РґРµСЃРµСЂС‚", weight: "180 Рі", price: 380, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 28, name: "РљСЂРµРј-Р±СЂСЋР»Рµ РїСЂРµРјРёСѓРј", desc: "РЎ РІР°РЅРёР»СЊСЋ РњР°РґР°РіР°СЃРєР°СЂР°", weight: "200 Рі", price: 450, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 29, name: "РњР°С„С„РёРЅС‹ С€РѕРєРѕР»Р°РґРЅС‹Рµ", desc: "6 С€С‚ СЃ С€РѕРєРѕР»Р°РґРЅРѕР№ РєСЂРѕС€РєРѕР№", weight: "320 Рі", price: 520, img: "https://picsum.photos/seed/sweet/300/208" },
  { id: 30, name: "РњР°С„С„РёРЅС‹ С‡РµСЂРЅРёС‡РЅС‹Рµ", desc: "РЎРѕ СЃРІРµР¶РµР№ С‡РµСЂРЅРёРєРѕР№", weight: "300 Рі", price: 550, img: "https://picsum.photos/seed/sweet/300/208" },
];

export default function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentUser, setCurrentUser] = useState<{ email: string; orders: Order[] } | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('sweetCart');
    if (savedCart) setCart(JSON.parse(savedCart));

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('sweetCart', JSON.stringify(cart));
  }, [cart]);

  const getUsers = (): User[] => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const registerUser = (email: string, password: string): boolean => {
    const users = getUsers();
    if (users.find(u => u.email === email)) return false;
    users.push({ email, password, orders: [] });
    saveUsers(users);
    return true;
  };

  const loginUser = (email: string, password: string): boolean => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const userData = { email: user.email, orders: user.orders || [] };
      setCurrentUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCart([]);
    setCurrentSection('home');
    alert('Р’С‹ РІС‹С€Р»Рё');
  };

  const addToCart = (product: Product) => {
    if (!currentUser) {
      alert('Р”РѕР±Р°РІР»РµРЅРёРµ С‚РѕРІР°СЂРѕРІ РґРѕСЃС‚СѓРїРЅРѕ С‚РѕР»СЊРєРѕ РїРѕСЃР»Рµ РІС…РѕРґР°!');
      setShowAuthModal(true);
      return;
    }
    const exist = cart.find(i => i.id === product.id);
    if (exist) {
      setCart(cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} РґРѕР±Р°РІР»РµРЅ РІ РєРѕСЂР·РёРЅСѓ`);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleAuth = () => {
    if (!authEmail || !authPassword) {
      alert('Р—Р°РїРѕР»РЅРёС‚Рµ РїРѕР»СЏ');
      return;
    }
    if (isLoginMode) {
      if (loginUser(authEmail, authPassword)) {
        setShowAuthModal(false);
        alert('Р”РѕР±СЂРѕ РїРѕР¶Р°Р»РѕРІР°С‚СЊ!');
        setAuthEmail('');
        setAuthPassword('');
      } else {
        alert('РќРµРІРµСЂРЅС‹Р№ email РёР»Рё РїР°СЂРѕР»СЊ');
      }
    } else {
      if (registerUser(authEmail, authPassword)) {
        alert('Р РµРіРёСЃС‚СЂР°С†РёСЏ СѓСЃРїРµС€РЅР°! Р’РѕР№РґРёС‚Рµ.');
        setIsLoginMode(true);
      } else {
        alert('Email СѓР¶Рµ РёСЃРїРѕР»СЊР·СѓРµС‚СЃСЏ');
      }
    }
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('РљРѕСЂР·РёРЅР° РїСѓСЃС‚Р°');
      return;
    }
    if (!currentUser) {
      alert('Р’РѕР№РґРёС‚Рµ РІ Р°РєРєР°СѓРЅС‚ РґР»СЏ РѕС„РѕСЂРјР»РµРЅРёСЏ');
      setShowAuthModal(true);
      return;
    }
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderItems = cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price }));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      const newOrder: Order = {
        id: Date.now(),
        date: new Date().toLocaleString('ru-RU'),
        items: orderItems,
        total: total,
        status: 'РџСЂРёРЅСЏС‚'
      };
      users[userIndex].orders.push(newOrder);
      saveUsers(users);

      const updatedUser = { email: currentUser.email, orders: users[userIndex].orders };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }

    setCart([]);
    setShowCartModal(false);
    alert('Р—Р°РєР°Р· РѕС„РѕСЂРјР»РµРЅ! РЎРїР°СЃРёР±Рѕ. РСЃС‚РѕСЂРёСЏ РІ Р»РёС‡РЅРѕРј РєР°Р±РёРЅРµС‚Рµ.');
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#3e2a2a]">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[rgba(212,140,84,0.15)] backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-6">
          <nav className="flex justify-between items-center py-4 flex-wrap gap-4">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-[#d48c54] to-[#5a3a2e] bg-clip-text text-transparent">
              РЎР»Р°РґРєРёР№<span className="text-[#5a3a2e] font-medium">Р Р°Р№</span>
            </div>

            <ul className="flex gap-7 items-center flex-wrap">
              {[
                { id: 'home', label: 'Р“Р»Р°РІРЅР°СЏ' },
                { id: 'catalog', label: 'РљР°С‚Р°Р»РѕРі' },
                { id: 'advantages', label: 'РџСЂРµРёРјСѓС‰РµСЃС‚РІР°' },
                { id: 'about', label: 'Рћ РЅР°СЃ' },
                { id: 'contacts', label: 'РљРѕРЅС‚Р°РєС‚С‹' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentSection(item.id)}
                    className={`font-semibold text-[#4b2e24] transition-all pb-1.5 ${
                      currentSection === item.id ? 'text-[#d48c54] border-b-2 border-[#d48c54]' : 'hover:text-[#d48c54]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              {currentUser && (
                <li>
                  <button
                    onClick={() => setCurrentSection('profile')}
                    className={`font-semibold text-[#4b2e24] transition-all pb-1.5 ${
                      currentSection === 'profile' ? 'text-[#d48c54] border-b-2 border-[#d48c54]' : 'hover:text-[#d48c54]'
                    }`}
                  >
                    РњРѕРё Р·Р°РєР°Р·С‹
                  </button>
                </li>
              )}
            </ul>

            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <span className="font-semibold text-[#b36b3c] bg-[#f7e2cf] px-3 py-1.5 rounded-full text-sm">
                    {currentUser.email.split('@')[0]}
                  </span>
                  <button
                    onClick={logout}
                    className="border-2 border-[#d48c54] px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-[#d48c54] hover:text-white transition-all"
                  >
                    Р’С‹Р№С‚Рё
                  </button>
                </>
              ) : (
                <button
                  onClick={() => { setShowAuthModal(true); setIsLoginMode(true); }}
                  className="border-2 border-[#d48c54] px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-[#d48c54] hover:text-white transition-all"
                >
                  Р’С…РѕРґ
                </button>
              )}
              <button onClick={() => setShowCartModal(true)} className="relative text-[#5a3a2e] hover:text-[#d48c54] transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#d48c54] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6">
        {currentSection === 'home' && (
          <section>
            <div className="bg-gradient-to-br from-[#fff4ea] to-[#ffe9db] rounded-[2.5rem] p-12 flex flex-wrap items-center justify-between gap-8 my-8 shadow-sm">
              <div className="flex-1 min-w-[300px]">
                <h1 className="text-5xl font-bold text-[#5a3a2e] mb-4 leading-tight">РЎР»Р°РґРѕСЃС‚СЊ, РєРѕС‚РѕСЂСѓСЋ С…РѕС‡РµС‚СЃСЏ РґР°СЂРёС‚СЊ</h1>
                <p className="text-xl mb-7 text-[#6b4c3b]">РўРѕСЂС‚С‹, РєР°РїРєРµР№РєРё, РїРµС‡РµРЅСЊРµ СЂСѓС‡РЅРѕР№ СЂР°Р±РѕС‚С‹ РёР· РЅР°С‚СѓСЂР°Р»СЊРЅС‹С… РёРЅРіСЂРµРґРёРµРЅС‚РѕРІ. РЎРѕР·РґР°С‘Рј РїСЂР°Р·РґРЅРёРє СЃ Р»СЋР±РѕРІСЊСЋ!</p>
                <button
                  onClick={() => setCurrentSection('catalog')}
                  className="bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white px-6 py-3 rounded-full font-bold hover:scale-95 transition-transform shadow-md"
                >
                  РЎРјРѕС‚СЂРµС‚СЊ РєР°С‚Р°Р»РѕРі
                </button>
              </div>
              <div>
                <img src="https://picsum.photos/seed/ray//" className="rounded-[32px] max-w-full shadow-lg" alt="РєСЂР°СЃРёРІС‹Р№ С‚РѕСЂС‚" />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
              <img src="https://picsum.photos/seed/ray//" className="rounded-2xl w-full h-48 object-cover shadow-md hover:scale-105 transition-transform" alt="С‚РѕСЂС‚ СЃ С„СЂСѓРєС‚Р°РјРё" />
              <img src="https://picsum.photos/seed/ray//" className="rounded-2xl w-full h-48 object-cover shadow-md hover:scale-105 transition-transform" alt="РєР°РїРєРµР№Рє" />
              <img src="https://picsum.photos/seed/ray//" className="rounded-2xl w-full h-48 object-cover shadow-md hover:scale-105 transition-transform" alt="РјР°РєР°СЂРѕРЅС‹" />
              <img src="https://picsum.photos/seed/ray//" className="rounded-2xl w-full h-48 object-cover shadow-md hover:scale-105 transition-transform" alt="РґРµРєРѕСЂР°С‚РёРІРЅС‹Р№ С‚РѕСЂС‚" />
            </div>

            <div className="text-center my-5">
              <p className="text-[#b36b3c] font-medium">в­ђ РЈР·РЅР°Р№С‚Рµ, РїРѕС‡РµРјСѓ РЅР°СЃ РІС‹Р±РёСЂР°СЋС‚ вЂ” РїРµСЂРµР№РґРёС‚Рµ РІ СЂР°Р·РґРµР» В«РџСЂРµРёРјСѓС‰РµСЃС‚РІР°В»</p>
            </div>
          </section>
        )}

        {currentSection === 'advantages' && (
          <section>
            <div className="bg-gradient-to-br from-white to-[#fff9f2] rounded-[3rem] p-16 my-12 shadow-lg text-center relative overflow-hidden">
              <div className="absolute bottom-[-40px] right-[-40px] text-[200px] opacity-[0.04] pointer-events-none">вњЁ</div>
              <h2 className="text-4xl font-bold text-[#5a3a2e] mb-3">вњЁ РРґРµР°Р»СЊРЅС‹Рµ РґРµСЃРµСЂС‚С‹ РЅР°С‡РёРЅР°СЋС‚СЃСЏ Р·РґРµСЃСЊ</h2>
              <div className="text-[#8a6a58] max-w-[600px] mx-auto mb-12 text-lg">РџРѕС‡РµРјСѓ В«РЎР»Р°РґРєРёР№ Р Р°Р№В» вЂ” РІС‹Р±РѕСЂ С†РµРЅРёС‚РµР»РµР№ handmade-СЃР»Р°РґРѕСЃС‚РµР№</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: 'рџЊ±', title: '100% РќР°С‚СѓСЂР°Р»СЊРЅРѕ', text: 'РњР°СЃР»Рѕ РІС‹СЃС€РµРіРѕ СЃРѕСЂС‚Р°, С„РµСЂРјРµСЂСЃРєРёРµ СЏР№С†Р°, Р±РµР»СЊРіРёР№СЃРєРёР№ С€РѕРєРѕР»Р°Рґ. РќРёРєР°РєРёС… Р·Р°РјРµРЅРёС‚РµР»РµР№.' },
                  { icon: 'вњЁ', title: 'Р СѓС‡РЅР°СЏ СЂР°Р±РѕС‚Р°', text: 'РљР°Р¶РґС‹Р№ С‚РѕСЂС‚ Рё РєР°РїРєРµР№Рє СЃРѕР·РґР°СЋС‚СЃСЏ РІСЂСѓС‡РЅСѓСЋ СЃ С‚СЂРµРїРµС‚РѕРј Рё РІРЅРёРјР°РЅРёРµРј Рє РґРµС‚Р°Р»СЏРј.' },
                  { icon: 'рџ‘‘', title: 'РђРІС‚РѕСЂСЃРєРёР№ РїРѕРґС…РѕРґ', text: 'Р­РєСЃРєР»СЋР·РёРІРЅС‹Рµ СЂРµС†РµРїС‚С‹ Рё РґРёР·Р°Р№РЅ РїРѕРґ РІР°С€ РїСЂР°Р·РґРЅРёРє. РњС‹ РІРѕРїР»РѕС‚РёРј Р»СЋР±СѓСЋ РёРґРµСЋ.' },
                  { icon: 'рџ“…', title: 'РЎСЂРѕС‡РЅРѕСЃС‚СЊ 24С‡', text: 'РЎР»Р°РґРєРёР№ СЃСЋСЂРїСЂРёР· РґР°Р¶Рµ РµСЃР»Рё РѕСЃС‚Р°Р»СЃСЏ РІСЃРµРіРѕ РґРµРЅСЊ. РћРїРµСЂР°С‚РёРІРЅРѕ Рё СЃРІРµР¶Рѕ.' },
                  { icon: 'рџљљ', title: 'Р”РѕСЃС‚Р°РІРєР° СЃРІРµР¶РµСЃС‚Рё', text: 'РЎРѕР±СЃС‚РІРµРЅРЅР°СЏ РєСѓСЂСЊРµСЂСЃРєР°СЏ СЃР»СѓР¶Р±Р° РёР»Рё СЃР°РјРѕРІС‹РІРѕР· РІ РґРµРЅСЊ РїСЂРёРіРѕС‚РѕРІР»РµРЅРёСЏ.' },
                  { icon: 'рџ’–', title: 'Р›СЋР±РѕРІСЊ Рє РєР»РёРµРЅС‚Р°Рј', text: 'РРЅРґРёРІРёРґСѓР°Р»СЊРЅС‹Рµ СЃРєРёРґРєРё РёРјРµРЅРёРЅРЅРёРєР°Рј, РїРѕРґР°СЂРєРё Рё РїРµСЂСЃРѕРЅР°Р»СЊРЅС‹Рµ РїСЂРµРґР»РѕР¶РµРЅРёСЏ.' },
                ].map((adv, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] transition-all hover:-translate-y-2 hover:shadow-xl border border-[rgba(212,140,84,0.2)] hover:border-[#d48c54] hover:bg-white"
                  >
                    <div className="text-5xl mb-5">{adv.icon}</div>
                    <h3 className="text-2xl font-bold mb-3 text-[#5a3a2e]">{adv.title}</h3>
                    <p className="text-[#6f5342] leading-relaxed">{adv.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {currentSection === 'catalog' && (
          <section>
            <h2 className="text-4xl font-bold text-center my-8 text-[#5a3a2e]">РќР°С€Рё РґРµСЃРµСЂС‚С‹</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-10">
              {products.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-[2rem] p-5 transition-all hover:-translate-y-1.5 hover:shadow-xl border border-[#f5e4d8]"
                >
                  <img src={product.img} alt={product.name} className="w-full h-52 object-cover rounded-[1.5rem] bg-[#f7e6da] mb-3" />
                  <div className="text-xl font-semibold my-2.5">{product.name}</div>
                  <div className="text-[#6b4c3b] text-sm">{product.desc}</div>
                  <div className="text-xs text-[#8a6a58] mt-1">{product.weight}</div>
                  <div className="text-2xl font-bold text-[#d48c54] my-3">{product.price} в‚Ѕ</div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-[#5a3a2e] text-white w-full py-3 rounded-full font-bold hover:bg-[#b36b3c] transition-colors"
                  >
                    Р—Р°РєР°Р·Р°С‚СЊ
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {currentSection === 'about' && (
          <section>
            <div className="bg-[#fef5ec] rounded-[2rem] p-12 my-12">
              <div className="flex flex-wrap gap-10 items-center mb-8">
                <div className="flex-1 min-w-[300px]">
                  <h2 className="text-3xl font-bold mb-4 text-[#5a3a2e]">Рћ РЅР°С€РµР№ РєРѕРЅРґРёС‚РµСЂСЃРєРѕР№</h2>
                  <p className="mb-4 text-lg leading-relaxed"><strong>В«РЎР»Р°РґРєРёР№ Р Р°Р№В»</strong> вЂ” СЃРµРјРµР№РЅР°СЏ РєРѕРЅРґРёС‚РµСЂСЃРєР°СЏ, РіРґРµ РјС‹ СЃРѕР·РґР°С‘Рј РґРµСЃРµСЂС‚С‹ СЃ РґСѓС€РѕР№. РСЃРїРѕР»СЊР·СѓРµРј С‚РѕР»СЊРєРѕ РЅР°С‚СѓСЂР°Р»СЊРЅС‹Рµ РјР°СЃР»Р°, СЃРІРµР¶РёРµ СЏР№С†Р°, РїСЂРµРјРёР°Р»СЊРЅС‹Р№ С€РѕРєРѕР»Р°Рґ.</p>
                  <p className="mb-6 text-lg leading-relaxed">РЁРµС„-РєРѕРЅРґРёС‚РµСЂ СЃ РјРµР¶РґСѓРЅР°СЂРѕРґРЅС‹РјРё СЃС‚Р°Р¶РёСЂРѕРІРєР°РјРё. РљР°Р¶РґС‹Р№ С‚РѕСЂС‚ вЂ” РїСЂРѕРёР·РІРµРґРµРЅРёРµ РёСЃРєСѓСЃСЃС‚РІР°. РРЅРґРёРІРёРґСѓР°Р»СЊРЅС‹Р№ Р·Р°РєР°Р· вЂ” РЅР°С€Р° СЃРїРµС†РёР°Р»РёС‚РµС‚РЅРѕСЃС‚СЊ: РѕС‚ РІРµРіР°РЅСЃРєРёС… РґРµСЃРµСЂС‚РѕРІ РґРѕ Р±РµР·РіР»СЋС‚РµРЅРѕРІС‹С… С€РµРґРµРІСЂРѕРІ.</p>
                  <button
                    onClick={() => setCurrentSection('catalog')}
                    className="bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white px-6 py-3 rounded-full font-bold hover:scale-95 transition-transform"
                  >
                    Р—Р°РєР°Р·Р°С‚СЊ РґРµСЃРµСЂС‚
                  </button>
                </div>
                <div className="flex-1 text-center">
                  <img src="https://picsum.photos/seed/ray//" className="rounded-[28px] w-full max-w-[400px] mx-auto shadow-md" alt="РІРёС‚СЂРёРЅР° РєРѕРЅРґРёС‚РµСЂСЃРєРѕР№" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img src="https://picsum.photos/seed/ray//" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" alt="РїСЂРѕС†РµСЃСЃ РїСЂРёРіРѕС‚РѕРІР»РµРЅРёСЏ" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">РџСЂРѕС†РµСЃСЃ СЃ Р»СЋР±РѕРІСЊСЋ</h3>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img src="https://picsum.photos/seed/ray//" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" alt="СЃРІРµР¶Р°СЏ РІС‹РїРµС‡РєР°" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">РЎРІРµР¶Р°СЏ РІС‹РїРµС‡РєР°</h3>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                  <img src="https://picsum.photos/seed/ray//" className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" alt="РґРµРєРѕСЂРёСЂРѕРІР°РЅРёРµ" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">Р СѓС‡РЅРѕРµ РґРµРєРѕСЂРёСЂРѕРІР°РЅРёРµ</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'contacts' && (
          <section>
            <div className="bg-white rounded-[3rem] p-12 my-12 shadow-lg">
              <h2 className="text-4xl font-bold text-center mb-12 text-[#5a3a2e]">РЎРІСЏР¶РёС‚РµСЃСЊ СЃ РЅР°РјРё</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-gradient-to-br from-[#fff9f2] to-[#ffe9db] rounded-[2rem] p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-[#5a3a2e] mb-6">РљРѕРЅС‚Р°РєС‚РЅР°СЏ РёРЅС„РѕСЂРјР°С†РёСЏ</h3>
                  <div className="flex items-start gap-4">
                    <div className="text-[#d48c54] text-2xl mt-1">рџ“Ќ</div>
                    <div>
                      <div className="font-semibold text-lg">РђРґСЂРµСЃ</div>
                      <div className="text-[#6b4c3b]">Рі. Р›РµРЅРёРЅРіСЂР°РґСЃРєР°СЏ, СѓР». РЎР»Р°РґРєР°СЏ, 15</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-[#d48c54] text-2xl mt-1">рџ“ћ</div>
                    <div>
                      <div className="font-semibold text-lg">РўРµР»РµС„РѕРЅ</div>
                      <div className="text-[#6b4c3b]">+7 (999) 123-45-67</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-[#d48c54] text-2xl mt-1">вњ‰пёЏ</div>
                    <div>
                      <div className="font-semibold text-lg">Email</div>
                      <div className="text-[#6b4c3b]">sweet@cakes.ru</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-[#d48c54] text-2xl mt-1">рџ“ё</div>
                    <div>
                      <div className="font-semibold text-lg">Instagram</div>
                      <div className="text-[#6b4c3b]">@sweet_ray_cakes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="text-[#d48c54] text-2xl mt-1">вЏ°</div>
                    <div>
                      <div className="font-semibold text-lg">Р’СЂРµРјСЏ СЂР°Р±РѕС‚С‹</div>
                      <div className="text-[#6b4c3b]">РџРЅ-Р’СЃ: 9:00 - 21:00</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#f7e2cf] to-white rounded-[2rem] p-8">
                  <h3 className="text-2xl font-bold text-[#5a3a2e] mb-6">РќР°РїРёС€РёС‚Рµ РЅР°Рј</h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      alert('РЎРѕРѕР±С‰РµРЅРёРµ РѕС‚РїСЂР°РІР»РµРЅРѕ! РњРµРЅРµРґР¶РµСЂ СЃРІСЏР¶РµС‚СЃСЏ СЃ РІР°РјРё.');
                      e.currentTarget.reset();
                    }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder="Р’Р°С€Рµ РёРјСЏ"
                      required
                      className="w-full px-5 py-3 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]"
                    />
                    <input
                      type="tel"
                      placeholder="РўРµР»РµС„РѕРЅ"
                      required
                      className="w-full px-5 py-3 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]"
                    />
                    <textarea
                      rows={4}
                      placeholder="Р’Р°С€ РІРѕРїСЂРѕСЃ РёР»Рё Р·Р°РєР°Р·"
                      className="w-full px-5 py-3 border border-[#e2cfbf] rounded-3xl bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54] resize-none"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white py-3 rounded-full font-bold hover:scale-98 transition-transform shadow-md"
                    >
                      РћС‚РїСЂР°РІРёС‚СЊ
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'profile' && (
          <section>
            <div className="bg-[#fff6ed] rounded-[2rem] p-12 my-12">
              <h2 className="text-3xl font-bold mb-4 text-[#5a3a2e] flex items-center gap-3">
                <span className="text-4xl">рџ‘¤</span>
                Р›РёС‡РЅС‹Р№ РєР°Р±РёРЅРµС‚
              </h2>
              <p className="text-lg mb-6"><strong>{currentUser?.email}</strong></p>
              <div className="bg-[#fff9f3] p-6 rounded-[28px]">
                <h3 className="text-2xl font-bold mb-4 text-[#5a3a2e]">РСЃС‚РѕСЂРёСЏ Р·Р°РєР°Р·РѕРІ</h3>
                {!currentUser?.orders || currentUser.orders.length === 0 ? (
                  <p className="text-[#6b4c3b]">РЈ РІР°СЃ РїРѕРєР° РЅРµС‚ Р·Р°РєР°Р·РѕРІ. РђРІС‚РѕСЂРёР·СѓР№С‚РµСЃСЊ Рё РґРѕР±Р°РІСЊС‚Рµ С‚РѕРІР°СЂС‹!</p>
                ) : (
                  <ul className="space-y-3">
                    {[...currentUser.orders].reverse().map(order => (
                      <li key={order.id} className="bg-white p-4 rounded-[20px] shadow-sm">
                        <div className="font-bold text-lg">Р—Р°РєР°Р· #{order.id}</div>
                        <div className="text-sm text-[#8a6a58] mb-2">{order.date}</div>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-[#6b4c3b]">
                            {item.name} x{item.quantity} вЂ” {item.price * item.quantity}в‚Ѕ
                          </div>
                        ))}
                        <div className="mt-2 font-semibold text-[#d48c54]">
                          РС‚РѕРіРѕ: {order.total}в‚Ѕ | РЎС‚Р°С‚СѓСЃ: {order.status}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-[#2d1f19] text-[#e2cfbf] text-center p-8 rounded-t-[2rem] mt-12">
        <p>В© 2025 РљРѕРЅРґРёС‚РµСЂСЃРєР°СЏ В«РЎР»Р°РґРєРёР№ Р Р°Р№В» вЂ” РўРѕСЂС‚С‹ Рё РґРµСЃРµСЂС‚С‹ РЅР° Р·Р°РєР°Р·. РЎ Р»СЋР±РѕРІСЊСЋ Рє СЃР»Р°РґРєРѕРјСѓ.</p>
      </footer>

      {showCartModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4" onClick={() => setShowCartModal(false)}>
          <div className="bg-white w-full max-w-[450px] rounded-[40px] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6 text-[#5a3a2e]">Р’Р°С€Р° РєРѕСЂР·РёРЅР°</h3>
            {cart.length === 0 ? (
              <p className="text-center text-[#6b4c3b] py-8">РљРѕСЂР·РёРЅР° РїСѓСЃС‚Р°</p>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#fff9f3] p-3 rounded-2xl">
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-[#8a6a58]">x{item.quantity} Г— {item.price}в‚Ѕ</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#d48c54]">{item.price * item.quantity}в‚Ѕ</span>
                        <button onClick={() => removeFromCart(idx)} className="text-xl hover:scale-110 transition-transform">
                          рџ—‘пёЏ
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="font-bold text-xl mb-6 text-center text-[#5a3a2e]">РС‚РѕРіРѕ: {cartTotal} в‚Ѕ</div>
              </>
            )}
            <button
              onClick={checkout}
              className="w-full bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white py-3 rounded-full font-bold hover:scale-98 transition-transform mb-3"
            >
              РћС„РѕСЂРјРёС‚СЊ Р·Р°РєР°Р·
            </button>
            <button
              onClick={() => setShowCartModal(false)}
              className="w-full text-[#d48c54] py-2 font-semibold hover:underline"
            >
              Р—Р°РєСЂС‹С‚СЊ
            </button>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4" onClick={() => setShowAuthModal(false)}>
          <div className="bg-white w-full max-w-[450px] rounded-[40px] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6 text-[#5a3a2e]">{isLoginMode ? 'Р’С…РѕРґ' : 'Р РµРіРёСЃС‚СЂР°С†РёСЏ'}</h3>
            <input
              type="text"
              placeholder="Email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              className="w-full px-5 py-3 mb-4 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]"
            />
            <input
              type="password"
              placeholder="РџР°СЂРѕР»СЊ"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              className="w-full px-5 py-3 mb-6 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]"
            />
            <button
              onClick={handleAuth}
              className="w-full bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white py-3 rounded-full font-bold hover:scale-98 transition-transform mb-4"
            >
              {isLoginMode ? 'Р’РѕР№С‚Рё' : 'РЎРѕР·РґР°С‚СЊ Р°РєРєР°СѓРЅС‚'}
            </button>
            <div className="text-center text-sm mb-4">
              {isLoginMode ? 'РќРµС‚ Р°РєРєР°СѓРЅС‚Р°? ' : 'РЈР¶Рµ РµСЃС‚СЊ Р°РєРєР°СѓРЅС‚? '}
              <span className="text-[#d48c54] font-bold cursor-pointer hover:underline" onClick={() => setIsLoginMode(!isLoginMode)}>
                {isLoginMode ? 'Р—Р°СЂРµРіРёСЃС‚СЂРёСЂРѕРІР°С‚СЊСЃСЏ' : 'Р’РѕР№С‚Рё'}
              </span>
            </div>
            <button
              onClick={() => setShowAuthModal(false)}
              className="w-full text-[#8a6a58] py-2 font-semibold hover:underline"
            >
              РћС‚РјРµРЅР°
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
