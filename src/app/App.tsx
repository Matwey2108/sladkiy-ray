import { useState, useEffect } from 'react';

const gr = (c1: string, c2: string) => `linear-gradient(135deg, ${c1}, ${c2})`;

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
  { id: 1,  name: "Медовик нежный",          desc: "Классический многослойный торт",   weight: "900 г",  price: 1350, img: gr('#fff4ea','#f0c070') },
  { id: 2,  name: "Чизкейк Нью-Йорк",        desc: "Кремовая текстура",               weight: "1000 г", price: 1600, img: gr('#fffde7','#ffe082') },
  { id: 3,  name: "Капкейк Солёная карамель", desc: "Нежный бисквит",                  weight: "110 г",  price: 220,  img: gr('#ffe4ef','#f5a7c0') },
  { id: 4,  name: "Печенье с шоколадом",      desc: "Хрустящее, с кусочками шоколада", weight: "250 г",  price: 390,  img: gr('#fff8e1','#e8a855') },
  { id: 5,  name: "Макарунс ассорти",         desc: "6 шт, французские",               weight: "150 г",  price: 540,  img: gr('#f3e5f5','#ce93d8') },
  { id: 6,  name: "Эклер с заварным кремом",  desc: "4 шт, воздушное тесто",           weight: "200 г",  price: 450,  img: gr('#fbe9e7','#d4a882') },
  { id: 7,  name: "Торт Ягодный рай",         desc: "Свежие фрукты и ягоды",           weight: "1200 г", price: 1850, img: gr('#fce4ec','#f48fb1') },
  { id: 8,  name: "Капкейки Черничные",       desc: "С черничным кремом",              weight: "110 г",  price: 240,  img: gr('#ede7f6','#9575cd') },
  { id: 9,  name: "Шоколадный торт",          desc: "Бельгийский шоколад",             weight: "950 г",  price: 1750, img: gr('#efebe9','#8d6e63') },
  { id: 10, name: "Мини-пирожные",            desc: "Ассорти 8 шт",                    weight: "400 г",  price: 890,  img: gr('#fff9f2','#f7c9a0') },
  { id: 11, name: "Наполеон",                 desc: "Традиционный рецепт",             weight: "850 г",  price: 1450, img: gr('#fffde7','#f9d276') },
  { id: 12, name: "Тирамису",                 desc: "Итальянская классика",            weight: "700 г",  price: 1550, img: gr('#efebe9','#a1887f') },
  { id: 13, name: "Торт Красный бархат",      desc: "С кремчизом",                     weight: "1100 г", price: 1950, img: gr('#fce4ec','#e57373') },
  { id: 14, name: "Чизкейк с ягодами",        desc: "Клубника и малина",               weight: "950 г",  price: 1700, img: gr('#fce4ec','#ef9a9a') },
  { id: 15, name: "Фруктовый торт",           desc: "Свежие фрукты",                   weight: "1300 г", price: 2100, img: gr('#f1f8e9','#aed581') },
  { id: 16, name: "Шоколадный капкейк",       desc: "С темным шоколадом",              weight: "120 г",  price: 250,  img: gr('#fbe9e7','#ce8965') },
  { id: 17, name: "Капкейки Праздничные",     desc: "С декором",                       weight: "110 г",  price: 280,  img: gr('#fff8e1','#ffe57f') },
  { id: 18, name: "Макарон Ассорти XL",       desc: "12 шт разных вкусов",             weight: "300 г",  price: 980,  img: gr('#f3e5f5','#b39ddb') },
  { id: 19, name: "Брауни шоколадные",        desc: "Влажные с орехами",               weight: "300 г",  price: 650,  img: gr('#efebe9','#9e8070') },
  { id: 20, name: "Брауни премиум",           desc: "С белым шоколадом",               weight: "350 г",  price: 720,  img: gr('#fafafa','#e0d0c8') },
  { id: 21, name: "Пончики глазированные",    desc: "6 шт с разной глазурью",          weight: "350 г",  price: 480,  img: gr('#fce4ec','#f06292') },
  { id: 22, name: "Пончик розовый",           desc: "С клубничной глазурью",           weight: "80 г",   price: 120,  img: gr('#ffe4ef','#ec407a') },
  { id: 23, name: "Пончики с посыпкой",       desc: "Яркие и вкусные",                 weight: "320 г",  price: 450,  img: gr('#e8f5e9','#81c784') },
  { id: 24, name: "Пирог черничный",          desc: "Классический домашний",           weight: "800 г",  price: 1350, img: gr('#ede7f6','#7986cb') },
  { id: 25, name: "Тарт ягодный",             desc: "С заварным кремом",               weight: "600 г",  price: 1250, img: gr('#fce4ec','#ef9a9a') },
  { id: 26, name: "Тарт фруктовый",           desc: "Микс ягод и фруктов",             weight: "650 г",  price: 1400, img: gr('#f9fbe7','#c5e1a5') },
  { id: 27, name: "Крем-брюле",               desc: "Французский десерт",              weight: "180 г",  price: 380,  img: gr('#fff8e1','#ffcc80') },
  { id: 28, name: "Крем-брюле премиум",       desc: "С ванилью Мадагаскара",           weight: "200 г",  price: 450,  img: gr('#fff3e0','#ffb74d') },
  { id: 29, name: "Маффины шоколадные",       desc: "6 шт с шоколадной крошкой",       weight: "320 г",  price: 520,  img: gr('#efebe9','#bcaaa4') },
  { id: 30, name: "Маффины черничные",        desc: "Со свежей черникой",              weight: "300 г",  price: 550,  img: gr('#ede7f6','#b39ddb') },
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

  const getUsers = (): User[] => JSON.parse(localStorage.getItem('users') || '[]');
  const saveUsers = (users: User[]) => localStorage.setItem('users', JSON.stringify(users));

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
    alert('Вы вышли');
  };

  const addToCart = (product: Product) => {
    if (!currentUser) {
      alert('Добавление товаров доступно только после входа!');
      setShowAuthModal(true);
      return;
    }
    const exist = cart.find(i => i.id === product.id);
    if (exist) {
      setCart(cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    alert(`${product.name} добавлен в корзину`);
  };

  const removeFromCart = (index: number) => setCart(cart.filter((_, i) => i !== index));

  const handleAuth = () => {
    if (!authEmail || !authPassword) { alert('Заполните поля'); return; }
    if (isLoginMode) {
      if (loginUser(authEmail, authPassword)) {
        setShowAuthModal(false);
        alert('Добро пожаловать!');
        setAuthEmail(''); setAuthPassword('');
      } else { alert('Неверный email или пароль'); }
    } else {
      if (registerUser(authEmail, authPassword)) {
        alert('Регистрация успешна! Войдите.');
        setIsLoginMode(true);
      } else { alert('Email уже используется'); }
    }
  };

  const checkout = () => {
    if (cart.length === 0) { alert('Корзина пуста'); return; }
    if (!currentUser) { alert('Войдите в аккаунт для оформления'); setShowAuthModal(true); return; }
    const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderItems = cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price }));
    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      const newOrder: Order = { id: Date.now(), date: new Date().toLocaleString('ru-RU'), items: orderItems, total, status: 'Принят' };
      users[userIndex].orders.push(newOrder);
      saveUsers(users);
      const updatedUser = { email: currentUser.email, orders: users[userIndex].orders };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    }
    setCart([]);
    setShowCartModal(false);
    alert('Заказ оформлен! Спасибо. История в личном кабинете.');
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fffaf5] text-[#3e2a2a]">
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[rgba(212,140,84,0.15)] backdrop-blur-sm">
        <div className="max-w-[1280px] mx-auto px-6">
          <nav className="flex justify-between items-center py-4 flex-wrap gap-4">
            <div className="text-3xl font-extrabold bg-gradient-to-r from-[#d48c54] to-[#5a3a2e] bg-clip-text text-transparent">
              Сладкий<span className="text-[#5a3a2e] font-medium">Рай</span>
            </div>
            <ul className="flex gap-7 items-center flex-wrap">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'catalog', label: 'Каталог' },
                { id: 'advantages', label: 'Преимущества' },
                { id: 'about', label: 'О нас' },
                { id: 'contacts', label: 'Контакты' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentSection(item.id)}
                    className={`font-semibold text-[#4b2e24] transition-all pb-1.5 ${currentSection === item.id ? 'text-[#d48c54] border-b-2 border-[#d48c54]' : 'hover:text-[#d48c54]'}`}
                  >{item.label}</button>
                </li>
              ))}
              {currentUser && (
                <li>
                  <button onClick={() => setCurrentSection('profile')}
                    className={`font-semibold text-[#4b2e24] transition-all pb-1.5 ${currentSection === 'profile' ? 'text-[#d48c54] border-b-2 border-[#d48c54]' : 'hover:text-[#d48c54]'}`}
                  >Мои заказы</button>
                </li>
              )}
            </ul>
            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <span className="font-semibold text-[#b36b3c] bg-[#f7e2cf] px-3 py-1.5 rounded-full text-sm">{currentUser.email.split('@')[0]}</span>
                  <button onClick={logout} className="border-2 border-[#d48c54] px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-[#d48c54] hover:text-white transition-all">Выйти</button>
                </>
              ) : (
                <button onClick={() => { setShowAuthModal(true); setIsLoginMode(true); }} className="border-2 border-[#d48c54] px-4 py-1.5 rounded-full font-semibold text-sm hover:bg-[#d48c54] hover:text-white transition-all">Вход</button>
              )}
              <button onClick={() => setShowCartModal(true)} className="relative text-[#5a3a2e] hover:text-[#d48c54] transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-[#d48c54] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>
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
                <h1 className="text-5xl font-bold text-[#5a3a2e] mb-4 leading-tight">Сладость, которую хочется дарить</h1>
                <p className="text-xl mb-7 text-[#6b4c3b]">Торты, капкейки, печенье ручной работы из натуральных ингредиентов. Создаём праздник с любовью!</p>
                <button onClick={() => setCurrentSection('catalog')} className="bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white px-6 py-3 rounded-full font-bold hover:scale-95 transition-transform shadow-md">
                  Смотреть каталог
                </button>
              </div>
              <div className="w-[300px] h-[300px] rounded-[32px] shadow-lg flex-shrink-0" style={{background: gr('#fff4ea','#d48c54')}} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
              <div className="rounded-2xl w-full h-48 shadow-md hover:scale-105 transition-transform" style={{background: gr('#fff4ea','#f5c98e')}} />
              <div className="rounded-2xl w-full h-48 shadow-md hover:scale-105 transition-transform" style={{background: gr('#ffe4ef','#f5a7c0')}} />
              <div className="rounded-2xl w-full h-48 shadow-md hover:scale-105 transition-transform" style={{background: gr('#f3e5f5','#ce93d8')}} />
              <div className="rounded-2xl w-full h-48 shadow-md hover:scale-105 transition-transform" style={{background: gr('#fbe9e7','#d4a882')}} />
            </div>

            <div className="text-center my-5">
              <p className="text-[#b36b3c] font-medium">⭐ Узнайте, почему нас выбирают — перейдите в раздел «Преимущества»</p>
            </div>
          </section>
        )}

        {currentSection === 'advantages' && (
          <section>
            <div className="bg-gradient-to-br from-white to-[#fff9f2] rounded-[3rem] p-16 my-12 shadow-lg text-center relative overflow-hidden">
              <div className="absolute bottom-[-40px] right-[-40px] text-[200px] opacity-[0.04] pointer-events-none">✨</div>
              <h2 className="text-4xl font-bold text-[#5a3a2e] mb-3">✨ Идеальные десерты начинаются здесь</h2>
              <div className="text-[#8a6a58] max-w-[600px] mx-auto mb-12 text-lg">Почему «Сладкий Рай» — выбор ценителей handmade-сладостей</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { icon: '🌱', title: '100% Натурально', text: 'Масло высшего сорта, фермерские яйца, бельгийский шоколад. Никаких заменителей.' },
                  { icon: '✨', title: 'Ручная работа', text: 'Каждый торт и капкейк создаются вручную с трепетом и вниманием к деталям.' },
                  { icon: '👑', title: 'Авторский подход', text: 'Эксклюзивные рецепты и дизайн под ваш праздник. Мы воплотим любую идею.' },
                  { icon: '📅', title: 'Срочность 24ч', text: 'Сладкий сюрприз даже если остался всего день. Оперативно и свежо.' },
                  { icon: '🚚', title: 'Доставка свежести', text: 'Собственная курьерская служба или самовывоз в день приготовления.' },
                  { icon: '💖', title: 'Любовь к клиентам', text: 'Индивидуальные скидки именинникам, подарки и персональные предложения.' },
                ].map((adv, idx) => (
                  <div key={idx} className="bg-white/90 backdrop-blur-sm p-8 rounded-[2rem] transition-all hover:-translate-y-2 hover:shadow-xl border border-[rgba(212,140,84,0.2)] hover:border-[#d48c54] hover:bg-white">
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
            <h2 className="text-4xl font-bold text-center my-8 text-[#5a3a2e]">Наши десерты</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-10">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-[2rem] p-5 transition-all hover:-translate-y-1.5 hover:shadow-xl border border-[#f5e4d8]">
                  <div className="w-full h-52 rounded-[1.5rem] mb-3" style={{background: product.img}} />
                  <div className="text-xl font-semibold my-2.5">{product.name}</div>
                  <div className="text-[#6b4c3b] text-sm">{product.desc}</div>
                  <div className="text-xs text-[#8a6a58] mt-1">{product.weight}</div>
                  <div className="text-2xl font-bold text-[#d48c54] my-3">{product.price} ₽</div>
                  <button onClick={() => addToCart(product)} className="bg-[#5a3a2e] text-white w-full py-3 rounded-full font-bold hover:bg-[#b36b3c] transition-colors">
                    Заказать
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
                  <h2 className="text-3xl font-bold mb-4 text-[#5a3a2e]">О нашей кондитерской</h2>
                  <p className="mb-4 text-lg leading-relaxed"><strong>«Сладкий Рай»</strong> — семейная кондитерская, где мы создаём десерты с душой. Используем только натуральные масла, свежие яйца, премиальный шоколад.</p>
                  <p className="mb-6 text-lg leading-relaxed">Шеф-кондитер с международными стажировками. Каждый торт — произведение искусства. Индивидуальный заказ — наша специалитетность: от веганских десертов до безглютеновых шедевров.</p>
                  <button onClick={() => setCurrentSection('catalog')} className="bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white px-6 py-3 rounded-full font-bold hover:scale-95 transition-transform">
                    Заказать десерт
                  </button>
                </div>
                <div className="flex-1 text-center">
                  <div className="rounded-[28px] w-full max-w-[400px] h-64 mx-auto shadow-md" style={{background: gr('#fff9f2','#e8b888')}} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <div className="w-full h-64" style={{background: gr('#fff4ea','#d48c54')}} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">Процесс с любовью</h3>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <div className="w-full h-64" style={{background: gr('#fbe9e7','#d4a882')}} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">Свежая выпечка</h3>
                  </div>
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <div className="w-full h-64" style={{background: gr('#fff4ea','#f5c98e')}} />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">Ручное декорирование</h3>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {currentSection === 'contacts' && (
          <section>
            <div className="bg-white rounded-[3rem] p-12 my-12 shadow-lg">
              <h2 className="text-4xl font-bold text-center mb-12 text-[#5a3a2e]">Свяжитесь с нами</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-gradient-to-br from-[#fff9f2] to-[#ffe9db] rounded-[2rem] p-8 space-y-6">
                  <h3 className="text-2xl font-bold text-[#5a3a2e] mb-6">Контактная информация</h3>
                  {[
                    { icon: '📍', label: 'Адрес', value: 'г. Ленинградская, ул. Сладкая, 15' },
                    { icon: '📞', label: 'Телефон', value: '+7 (999) 123-45-67' },
                    { icon: '✉️', label: 'Email', value: 'sweet@cakes.ru' },
                    { icon: '📸', label: 'Instagram', value: '@sweet_ray_cakes' },
                    { icon: '⏰', label: 'Время работы', value: 'Пн-Вс: 9:00 - 21:00' },
                  ].map((c, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="text-[#d48c54] text-2xl mt-1">{c.icon}</div>
                      <div><div className="font-semibold text-lg">{c.label}</div><div className="text-[#6b4c3b]">{c.value}</div></div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-br from-[#f7e2cf] to-white rounded-[2rem] p-8">
                  <h3 className="text-2xl font-bold text-[#5a3a2e] mb-6">Напишите нам</h3>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Сообщение отправлено! Менеджер свяжется с вами.'); e.currentTarget.reset(); }} className="space-y-4">
                    <input type="text" placeholder="Ваше имя" required className="w-full px-5 py-3 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]" />
                    <input type="tel" placeholder="Телефон" required className="w-full px-5 py-3 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]" />
                    <textarea rows={4} placeholder="Ваш вопрос или заказ" className="w-full px-5 py-3 border border-[#e2cfbf] rounded-3xl bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54] resize-none" />
                    <button type="submit" className="w-full bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white py-3 rounded-full font-bold hover:scale-98 transition-transform shadow-md">Отправить</button>
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
                <span className="text-4xl">👤</span> Личный кабинет
              </h2>
              <p className="text-lg mb-6"><strong>{currentUser?.email}</strong></p>
              <div className="bg-[#fff9f3] p-6 rounded-[28px]">
                <h3 className="text-2xl font-bold mb-4 text-[#5a3a2e]">История заказов</h3>
                {!currentUser?.orders || currentUser.orders.length === 0 ? (
                  <p className="text-[#6b4c3b]">У вас пока нет заказов. Авторизуйтесь и добавьте товары!</p>
                ) : (
                  <ul className="space-y-3">
                    {[...currentUser.orders].reverse().map(order => (
                      <li key={order.id} className="bg-white p-4 rounded-[20px] shadow-sm">
                        <div className="font-bold text-lg">Заказ #{order.id}</div>
                        <div className="text-sm text-[#8a6a58] mb-2">{order.date}</div>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-[#6b4c3b]">{item.name} x{item.quantity} — {item.price * item.quantity}₽</div>
                        ))}
                        <div className="mt-2 font-semibold text-[#d48c54]">Итого: {order.total}₽ | Статус: {order.status}</div>
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
        <p>© 2025 Кондитерская «Сладкий Рай» — Торты и десерты на заказ. С любовью к сладкому.</p>
      </footer>

      {showCartModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4" onClick={() => setShowCartModal(false)}>
          <div className="bg-white w-full max-w-[450px] rounded-[40px] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6 text-[#5a3a2e]">Ваша корзина</h3>
            {cart.length === 0 ? (
              <p className="text-center text-[#6b4c3b] py-8">Корзина пуста</p>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-[#fff9f3] p-3 rounded-2xl">
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-sm text-[#8a6a58]">x{item.quantity} × {item.price}₽</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#d48c54]">{item.price * item.quantity}₽</span>
                        <button onClick={() => removeFromCart(idx)} className="text-xl hover:scale-110 transition-transform">🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="font-bold text-xl mb-6 text-center text-[#5a3a2e]">Итого: {cartTotal} ₽</div>
              </>
            )}
            <button onClick={checkout} className="w-full bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white py-3 rounded-full font-bold hover:scale-98 transition-transform mb-3">Оформить заказ</button>
            <button onClick={() => setShowCartModal(false)} className="w-full text-[#d48c54] py-2 font-semibold hover:underline">Закрыть</button>
          </div>
        </div>
      )}

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4" onClick={() => setShowAuthModal(false)}>
          <div className="bg-white w-full max-w-[450px] rounded-[40px] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6 text-[#5a3a2e]">{isLoginMode ? 'Вход' : 'Регистрация'}</h3>
            <input type="text" placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full px-5 py-3 mb-4 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]" />
            <input type="password" placeholder="Пароль" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full px-5 py-3 mb-6 border border-[#e2cfbf] rounded-full bg-[#fffdfb] focus:outline-none focus:ring-2 focus:ring-[#d48c54]" />
            <button onClick={handleAuth} className="w-full bg-gradient-to-r from-[#d48c54] to-[#b36b3c] text-white py-3 rounded-full font-bold hover:scale-98 transition-transform mb-4">
              {isLoginMode ? 'Войти' : 'Создать аккаунт'}
            </button>
            <div className="text-center text-sm mb-4">
              {isLoginMode ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
              <span className="text-[#d48c54] font-bold cursor-pointer hover:underline" onClick={() => setIsLoginMode(!isLoginMode)}>
                {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
              </span>
            </div>
            <button onClick={() => setShowAuthModal(false)} className="w-full text-[#8a6a58] py-2 font-semibold hover:underline">Отмена</button>
          </div>
        </div>
      )}
    </div>
  );
}
