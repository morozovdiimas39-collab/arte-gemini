import { useState, useEffect } from 'react';
import {
  Phone, Menu, X, ArrowDown, Shield, Award, Clock, Settings, Sparkles, Paintbrush,
  ArrowRight, ChevronRight, ChevronLeft, CheckCircle2, Home, Ruler, Calendar, Calculator,
  ArrowRightLeft, Eye, Droplets, Layers, XCircle, Send,
  Contact2, MapPin, Mail, Users, Wrench, ThumbsUp, Leaf, BadgeCheck, Zap, Star, Heart,
  HelpCircle, ChevronDown, ChevronUp, MessageCircleQuestion, MessageSquare,
  Calendar as CalIcon, MapPin as MapPinIcon, TrendingUp, Images, Maximize2,
  FileCheck, Stamp, Quote, Rocket,
} from 'lucide-react';

const PHONE = '+7 (495) 005-01-45';
const EMAIL = 'info@artemadera.ru';
const ADDRESS = 'Москва, ВДНХ, ул. Ярославская';
const API_LEAD_URL = import.meta.env.VITE_API_LEAD_URL ?? '/api/lead';

/** Маска телефона: +7 (999) 999-99-99. Возвращает отформатированную строку для инпута. */
function formatPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, '');
  const d = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits;
  const s = d.slice(0, 10);
  if (s.length === 0) return '';
  if (s.length <= 3) return `+7 (${s}`;
  if (s.length <= 6) return `+7 (${s.slice(0, 3)}) ${s.slice(3)}`;
  return `+7 (${s.slice(0, 3)}) ${s.slice(3, 6)}-${s.slice(6, 8)}-${s.slice(8, 10)}`;
}

/** Из маски в цифры для API: 79991234567 */
function getPhoneDigits(masked: string): string {
  const digits = masked.replace(/\D/g, '');
  if (digits.startsWith('8')) return '7' + digits.slice(1, 11);
  if (digits.startsWith('7')) return digits.slice(0, 11);
  return '7' + digits.slice(0, 10);
}

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Калькулятор', href: '#quiz' },
  { label: 'Этапы', href: '#process' },
  { label: 'До/После', href: '#comparison' },
  { label: 'Почему мы', href: '#whyus' },
  { label: 'Работы', href: '#recent-projects' },
  { label: 'Гарантии', href: '#certificates' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
];

const services = [
  { icon: Settings, title: 'Шлифовка срубов', description: 'Профессиональная шлифовка бревенчатых и брусовых домов.', price: 'от 1 200 ₽/м²', img: '/service-1.jpg' },
  { icon: Sparkles, title: 'Консьержная шлифовка', description: 'Тонкая шлифовка для финишной обработки древесины.', price: 'от 800 ₽/м²', img: '/service-2.jpg' },
  { icon: Paintbrush, title: 'Покраска и пропитка', description: 'Нанесение масел, лаков и антисептиков.', price: 'от 600 ₽/м²', img: '/service-3.jpg' },
  { icon: Shield, title: 'Антисептирование', description: 'Защита от гнили, плесени и насекомых.', price: 'от 400 ₽/м²', img: '/portfolio-1.jpg' },
  { icon: Layers, title: 'Ремонт швов', description: 'Конопатка и герметизация швов.', price: 'от 350 ₽/м.п.', img: '/portfolio-2.jpg' },
  { icon: Droplets, title: 'Мытьё фасада', description: 'Очистка деревянных стен.', price: 'от 200 ₽/м²', img: '/portfolio-3.jpg' },
];

const quizSteps = [
  { id: 1, question: 'Какой тип дома у вас?', icon: Home, multiple: false, options: [
    { value: 'srub', label: 'Сруб (бревенчатый)', price: 1200, img: '/quiz/quiz-srub.jpg', fallback: '/before.jpg' },
    { value: 'brus', label: 'Дом из бруса', price: 1000, img: '/quiz/quiz-brus.jpg', fallback: '/after.jpg' },
    { value: 'kleyeny', label: 'Клееный брус', price: 900, img: '/quiz/quiz-kleyeny.jpg', fallback: '/portfolio-1.jpg' },
    { value: 'banja', label: 'Баня/сауна', price: 1100, img: '/quiz/quiz-banja.jpg', fallback: '/portfolio-2.jpg' },
  ]},
  { id: 2, question: 'Какая примерная площадь?', icon: Ruler, multiple: false, stepImg: '/portfolio-1.jpg', options: [
    { value: 'small', label: 'До 50 м²', multiplier: 1 },
    { value: 'medium', label: '50-100 м²', multiplier: 1 },
    { value: 'large', label: '100-150 м²', multiplier: 0.95 },
    { value: 'xlarge', label: 'Более 150 м²', multiplier: 0.9 },
  ]},
  { id: 3, question: 'Какие работы нужны?', icon: Paintbrush, multiple: true, options: [
    { value: 'shlifovka', label: 'Шлифовка', price: 0, img: '/quiz/quiz-shlifovka.jpg', fallback: '/service-1.jpg' },
    { value: 'pokraska', label: 'Покраска/пропитка', price: 600, img: '/quiz/quiz-pokraska.jpg', fallback: '/service-3.jpg' },
    { value: 'antiseptik', label: 'Антисептирование', price: 400, img: '/quiz/quiz-antiseptik.jpg', fallback: '/portfolio-1.jpg' },
    { value: 'konopatka', label: 'Конопатка швов', price: 350, img: '/quiz/quiz-konopatka.jpg', fallback: '/portfolio-2.jpg' },
  ]},
  { id: 4, question: 'Когда планируете начать?', icon: Calendar, multiple: false, stepImg: '/after.jpg', options: [
    { value: 'asap', label: 'Как можно скорее' },
    { value: 'week', label: 'В течение недели' },
    { value: 'month', label: 'В течение месяца' },
    { value: 'later', label: 'Пока присматриваюсь' },
  ]},
];

const processSteps = [
  { num: '01', title: 'Замер и выкрас', description: 'Приезжаем на объект, считаем точный метраж и делаем бесплатные пробные выкрасы прямо на вашем доме.' },
  { num: '02', title: 'Без проживания', description: 'Работаем мобильными бригадами. Вам не нужно организовывать быт и спальные места — мы полностью автономны и мобильны.' },
  { num: '03', title: 'Честная цена', description: 'Работаем по фиксированной смете. Стоимость прописывается в договоре до начала работ и не меняется ни на рубль в процессе сотрудничества.' },
  { num: '04', title: 'Многоуровневый контроль', description: 'Проверяем качество на каждом этапе работ. Это исключает брак и гарантирует результат.' },
];

const comparisons = [
  { aspect: 'Внешний вид', before: 'Потемневшая древесина с мхом', after: 'Яркая, золотистая древесина', icon: Eye },
  { aspect: 'Защита', before: 'Нет защиты', after: 'Защита на 5-10 лет', icon: Shield },
  { aspect: 'Долговечность', before: 'Трещины и разрушение', after: 'Срок службы +15-20 лет', icon: Clock },
  { aspect: 'Уход', before: 'Постоянный ремонт', after: 'Минимальный уход', icon: Sparkles },
];

const problems = ['Потемнение древесины', 'Мох и плесень', 'Трещины', 'Вредители', 'Потеря теплоизоляции', 'Непрезентабельный вид'];
const solutions = ['Глубокая шлифовка', 'Антисептирование', 'Конопатка и герметизация', 'Защитное покрытие', 'Восстановление теплоизоляции', 'Гладкая поверхность'];

const houseTypes = [
  { value: 'srub', label: 'Сруб (бревенчатый)', price: 1200, icon: Home },
  { value: 'brus', label: 'Дом из бруса', price: 1000, icon: Home },
  { value: 'kleyeny', label: 'Клееный брус', price: 900, icon: Home },
  { value: 'banja', label: 'Баня/сауна', price: 1100, icon: Droplets },
];

const additionalServices = [
  { id: 'pokraska', label: 'Покраска/пропитка', price: 600, icon: Paintbrush },
  { id: 'antiseptik', label: 'Антисептирование', price: 400, icon: Droplets },
  { id: 'konopatka', label: 'Конопатка швов', price: 350, icon: Layers },
  { id: 'gruntovka', label: 'Грунтовка', price: 200, icon: Layers },
];

const reasons = [
  { icon: Users, title: 'Опытная команда', stat: '15+', statLabel: 'специалистов', description: 'Мастера с опытом от 7 лет.', features: ['Сертифицированные', 'Обучение', 'Отбор'], img: '/service-1.jpg' },
  { icon: Wrench, title: 'Оборудование', stat: '50+', statLabel: 'единиц', description: 'Профессиональная техника.', features: ['Festool', 'Hilti', 'Bosch'], img: '/service-2.jpg' },
  { icon: Clock, title: 'Точные сроки', stat: '99%', statLabel: 'в срок', description: 'Работаем по графику.', features: ['План работ', 'Без выходных'], img: '/portfolio-1.jpg' },
  { icon: Shield, title: 'Гарантия', stat: '3', statLabel: 'года', description: 'Письменная гарантия.', features: ['Гарантия', 'Ремонт', 'Страхование'], img: '/portfolio-2.jpg' },
  { icon: ThumbsUp, title: 'Честные цены', stat: '0', statLabel: 'скрытых платежей', description: 'Цена в договоре.', features: ['Смета', 'Фикс цена'], img: '/after.jpg' },
  { icon: Leaf, title: 'Экологичность', stat: '100%', statLabel: 'безопасность', description: 'Экологичные материалы.', features: ['Сертификаты', 'Безопасно'], img: '/portfolio-3.jpg' },
];

const achievements = [
  { value: '500+', label: 'Проектов' },
  { value: '10+', label: 'Лет на рынке' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '4.9', label: 'Рейтинг' },
];

const projects = [
  { id: 1, title: 'Реставрация сруба', location: 'Новая Рига', date: 'Декабрь 2024', area: 120, duration: '5 дней', services: ['Шлифовка', 'Конопатка', 'Покраска'], beforeState: 'Потемневший сруб', afterState: 'Золотистый цвет', testimonial: 'Дом преобразился!', client: 'Александр П.', featured: true, img: '/before.jpg' },
  { id: 2, title: 'Дом из бруса', location: 'Рублёвка', date: 'Ноябрь 2024', area: 200, duration: '4 дня', services: ['Консьержная шлифовка', 'Масло'], beforeState: 'Финишная обработка', afterState: 'Идеально гладко', testimonial: 'Профессионалы!', client: 'Дмитрий В.', featured: false, img: '/after.jpg' },
];

const advantages = [
  { icon: Zap, title: 'Современное оборудование', description: 'Hilti, Festool, Bosch.' },
  { icon: Users, title: 'Опытные мастера', description: 'Специалисты с опытом от 7 лет.' },
  { icon: Wrench, title: 'Материалы', description: 'Tikkurila, Teknos, Belinka, Osmo.' },
  { icon: Leaf, title: 'Экологичность', description: 'Безопасные материалы.' },
  { icon: BadgeCheck, title: 'Гарантия', description: '3 года на все работы.' },
  { icon: CheckCircle2, title: 'Чистота', description: 'Убираем после работ.' },
];

const stats = [{ value: '500+', label: 'Проектов' }, { value: '10+', label: 'Лет' }, { value: '50+', label: 'Клиентов' }, { value: '98%', label: 'Отзывов' }];

const guarantees = [
  { title: 'Гарантия на работы', period: '3 года', description: 'Устранение дефектов бесплатно.', features: ['Шлифовка', 'Покраска', 'Конопатка'] },
  { title: 'Гарантия на материалы', period: '5 лет', description: 'От производителей.', features: ['Tikkurila', 'Teknos', 'Belinka'] },
  { title: 'Сервис', period: '10 лет', description: 'Скидки на повторные работы.', features: ['Скидка 15%', 'Приоритет'] },
];

const certificates = [
  { icon: FileCheck, title: 'Сертификаты', description: 'Материалы с сертификатами.' },
  { icon: Shield, title: 'Страхование', description: 'Имущество под защитой.' },
  { icon: BadgeCheck, title: 'СРО', description: 'Член СРО.' },
  { icon: Award, title: 'Награды', description: 'Лауреат премий.' },
];

const partners = ['Tikkurila', 'Teknos', 'Belinka', 'Osmo', 'Pinotex', 'Dulux'];

const portfolioItems = [
  { image: '/before.jpg', title: 'До и после', location: 'Новая Рига', year: '2024', description: 'Реставрация сруба.' },
  { image: '/after.jpg', title: 'Деревянный дом', location: 'Рублёвка', year: '2024', description: 'Финишная шлифовка и масло.' },
  { image: '/portfolio-1.jpg', title: 'Углы', location: 'Истра', year: '2023', description: 'Обработка углов.' },
  { image: '/portfolio-2.jpg', title: 'Фасад с террасой', location: 'Одинцово', year: '2023', description: 'Фасад и терраса.' },
];

const faqItems = [
  { question: 'Сколько времени занимает шлифовка?', answer: 'Небольшой дом 2-3 дня, средний 3-5 дней, большой 5-7 дней. Точные сроки после осмотра.', category: 'Сроки' },
  { question: 'Какая гарантия?', answer: '3 года на все работы. Устранение дефектов бесплатно.', category: 'Гарантия' },
  { question: 'Нужно ли выезжать из дома?', answer: 'Нет. Используем пылесосы с HEPA. Работаем поэтапно.', category: 'Процесс' },
  { question: 'Масло, лак или антисептик?', answer: 'Масло — текстура, лак — прочность, антисептик — базовая защита.', category: 'Материалы' },
  { question: 'Как часто шлифовать?', answer: 'Полная шлифовка раз в 10-15 лет. Освежение каждые 3-5 лет.', category: 'Уход' },
  { question: 'Работаете зимой?', answer: 'Да. Зимой при температуре выше -10°C.', category: 'Сезонность' },
];

const testimonials = [
  { name: 'Александр Петров', role: 'Владелец дома в Новой Риге', content: 'Дом преобразился, как заново построили. Чистота после работы — отдельный плюс. Рекомендую!', rating: 5, date: 'декабрь 2024' },
  { name: 'Елена Смирнова', role: 'Истра', content: 'Второй раз обращаемся. Первый раз 5 лет назад — дом до сих пор отлично выглядит.', rating: 5, date: 'ноябрь 2024' },
  { name: 'Дмитрий Волков', role: 'Рублёвка', content: 'Профессионалы. Быстро, качественно, без сюрпризов. Буду рекомендовать.', rating: 5, date: 'октябрь 2024' },
];

const footerServices = [
  { label: 'Шлифовка срубов', href: '#services' },
  { label: 'Консьержная шлифовка', href: '#services' },
  { label: 'Покраска и пропитка', href: '#services' },
  { label: 'Антисептирование', href: '#services' },
  { label: 'Ремонт швов', href: '#services' },
];

const footerCompany = [
  { label: 'О нас', href: '#advantages' },
  { label: 'Работы', href: '#portfolio' },
  { label: 'Отзывы', href: '#testimonials' },
  { label: 'Контакты', href: '#contact' },
];

function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Quiz
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string | string[]>>({});
  const [quizDone, setQuizDone] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  // Comparison
  const [sliderPos, setSliderPos] = useState(50);
  // Calculator
  const [calcHouseType, setCalcHouseType] = useState('srub');
  const [calcArea, setCalcArea] = useState(75);
  const [calcServices, setCalcServices] = useState<string[]>([]);
  // Portfolio lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  // FAQ
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [faqCategory, setFaqCategory] = useState('Все');
  // Contact
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);
  // Модалка «Перезвоните мне»
  const [callbackOpen, setCallbackOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navScrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border/30 py-3' : 'bg-transparent py-5'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button onClick={() => scrollToSection('#hero')} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <span className="text-xl font-bold text-amber-400">A</span>
              </div>
              <div className={`hidden sm:block transition-opacity duration-300 ${navScrolled ? 'opacity-100' : 'opacity-0'}`}>
                <div className="text-lg font-bold text-white">ArteMadera</div>
              </div>
            </button>
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.slice(0, 7).map((link, i) => (
                <button key={i} onClick={() => { scrollToSection(link.href); setMobileMenuOpen(false); }} className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/5">{link.label}</button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => setCallbackOpen(true)} className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm">
                <Phone className="w-4 h-4" /> Позвонить
              </button>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden w-10 h-10 rounded-lg bg-card/50 border border-border/30 flex items-center justify-center">
                {mobileMenuOpen ? <X className="w-5 h-5 text-gray-400" /> : <Menu className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute top-20 left-4 right-4 max-h-[80vh] overflow-y-auto bg-card border border-border/30 rounded-2xl p-6 transition-all ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
          {navLinks.map((link, i) => (
            <button key={i} onClick={() => { scrollToSection(link.href); setMobileMenuOpen(false); }} className="w-full px-4 py-3 text-left text-gray-300 hover:text-white hover:bg-white/5 rounded-lg">{link.label}</button>
          ))}
          <div className="mt-6 pt-6 border-t border-border/30">
            <button type="button" onClick={() => { setCallbackOpen(true); setMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white">
              <Phone className="w-4 h-4" /> Позвонить
            </button>
          </div>
        </div>
      </div>

      {/* Модалка «Перезвоните мне» */}
      <CallbackModal open={callbackOpen} onClose={() => setCallbackOpen(false)} />

      {/* Hero — фон: положи hero-bg.jpg в public/ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/hero-bg.jpg)' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 mb-8">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-200">Более 10 лет опыта в Москве и области</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Профессиональная</span>
              <br />
              <span className="text-gradient">шлифовка деревянных домов</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Восстановим красоту и долговечность вашего деревянного дома. Гарантия на все виды работ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button type="button" onClick={() => setCallbackOpen(true)} className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-xl text-lg font-medium">
                <Phone className="w-5 h-5" /> Бесплатная консультация
              </button>
              <button onClick={() => scrollToSection('#portfolio')} className="inline-flex items-center justify-center border border-amber-500/50 text-amber-200 hover:bg-amber-500/10 px-8 py-4 rounded-xl text-lg">
                Посмотреть работы
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center"><Shield className="w-6 h-6 text-amber-400" /></div>
                <div className="text-left"><div className="font-semibold text-white">Гарантия 3 года</div><div className="text-sm text-gray-400">На все работы</div></div>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center"><Clock className="w-6 h-6 text-amber-400" /></div>
                <div className="text-left"><div className="font-semibold text-white">Работаем быстро</div><div className="text-sm text-gray-400">От 3 дней</div></div>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center"><Award className="w-6 h-6 text-amber-400" /></div>
                <div className="text-left"><div className="font-semibold text-white">500+ домов</div><div className="text-sm text-gray-400">Отреставрировано</div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-amber-400" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Settings className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Наши услуги</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Комплексная </span>
              <span className="text-gradient">реставрация деревянных домов</span>
            </h2>
            <p className="text-gray-400 text-lg">Полный спектр услуг от шлифовки до финишного покрытия.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <div key={i} className="group bg-card/50 border border-border/50 hover:border-amber-500/30 rounded-2xl overflow-hidden transition-all">
                <div className="relative h-48">
                  <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-white text-sm font-semibold">{s.price}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{s.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-6">{s.description}</p>
                  <button type="button" onClick={() => setCallbackOpen(true)} className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-medium">
                    Подробнее <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Форма: Узнать точную стоимость */}
          <div className="mt-20">
          <InlineLeadForm
            title="Узнать точную стоимость"
            benefit="Оставьте номер — перезвоним и рассчитаем смету бесплатно"
            leadType="cost"
            buttonText="Получить расчёт"
            icon={<Calculator className="w-6 h-6 text-amber-400" />}
            benefits={[
              { icon: FileCheck, title: 'Бесплатный расчёт сметы', description: 'Рассчитаем стоимость работ под ваш объект' },
              { icon: Clock, title: 'Перезвон за 30 минут', description: 'Свяжемся в течение получаса в удобное время' },
              { icon: Shield, title: 'Консультация специалиста', description: 'Ответим на вопросы по материалам и срокам' },
            ]}
          />
          </div>
        </div>
      </section>

      {/* Quiz */}
      <QuizSection
        quizStep={quizStep}
        setQuizStep={setQuizStep}
        quizAnswers={quizAnswers}
        setQuizAnswers={setQuizAnswers}
        quizDone={quizDone}
        setQuizDone={setQuizDone}
        estimatedPrice={estimatedPrice}
        setEstimatedPrice={setEstimatedPrice}
        onRequestCallback={() => setCallbackOpen(true)}
      />

      {/* Этапы работ — 4 карточки + CTA */}
      <section id="process" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Как мы работаем</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Этапы </span>
              <span className="text-gradient">нашей работы</span>
            </h2>
            <p className="text-gray-400 text-lg">Прозрачный процесс от заявки до результата.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-6">
            {processSteps.map((step) => (
              <div key={step.num} className="rounded-2xl border border-border/30 bg-card/50 p-6 sm:p-8 shadow-lg shadow-black/10 hover:border-amber-500/20 transition-colors">
                <span className="text-4xl sm:text-5xl font-bold text-amber-500 tabular-nums">{step.num}</span>
                <h3 className="text-xl font-bold text-white mt-3 mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto">
            <button
              type="button"
              onClick={() => setCallbackOpen(true)}
              className="w-full rounded-2xl bg-amber-600 hover:bg-amber-700 border border-amber-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-left transition-colors shadow-lg shadow-amber-900/20 min-h-[240px]"
            >
              <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-white mb-2">Готово!</h3>
                <p className="text-amber-100/90 text-sm sm:text-base leading-relaxed">
                  Ваш дом защищён на десятилетия. Шлифовка, покраска и антисептирование продлят срок службы древесины и сохранят её красоту. Оставьте заявку — приедем на объект, сделаем замер и рассчитаем точную смету бесплатно.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 text-white font-medium text-sm">
                  Вызвать мастера <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <ArrowRightLeft className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">До и после</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Как меняется дом </span>
              <span className="text-gradient">после шлифовки</span>
            </h2>
            <p className="text-gray-400 text-lg">Профессиональная шлифовка преображает деревянные дома.</p>
          </div>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-card/30 border border-border/30">
              <div className="absolute inset-0 bg-gray-800" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-sm">До</div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-white text-sm">После</div>
              <input type="range" min="0" max="100" value={sliderPos} onChange={(e) => setSliderPos(Number(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10" />
              <div className="absolute top-0 bottom-0 w-1 bg-white z-0" style={{ left: `${sliderPos}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {comparisons.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card/30 border border-border/30">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{item.aspect}</h4>
                <div className="flex items-start gap-2 text-sm">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-500">{item.before}</span>
                </div>
                <div className="flex items-start gap-2 text-sm mt-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item.after}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2"><XCircle className="w-6 h-6" /> Проблемы</h3>
              <ul className="space-y-2">
                {problems.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-400 text-sm"><XCircle className="w-4 h-4 text-red-400/50 flex-shrink-0" /> {p}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /> Решения</h3>
              <ul className="space-y-2">
                {solutions.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 text-green-400/50 flex-shrink-0" /> {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <CalculatorSection
        calcHouseType={calcHouseType}
        setCalcHouseType={setCalcHouseType}
        calcArea={calcArea}
        setCalcArea={setCalcArea}
        calcServices={calcServices}
        setCalcServices={setCalcServices}
        onRequestCallback={() => setCallbackOpen(true)}
      />

      {/* WhyUs */}
      <section id="whyus" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Heart className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Почему мы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Почему клиенты </span>
              <span className="text-gradient">выбирают нас</span>
            </h2>
            <p className="text-gray-400 text-lg">Мы делаем всё для вашего доверия и рекомендаций.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {achievements.map((a, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-500/15 to-amber-600/5 border border-amber-500/20 shadow-lg shadow-amber-900/5">
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-1">{a.value}</div>
                <div className="text-sm text-gray-400">{a.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-border/30 hover:border-amber-500/40 transition-all shadow-xl shadow-black/10 hover:shadow-amber-900/10">
                <div className="relative h-40 overflow-hidden">
                  <img src={r.img || '/service-1.jpg'} alt={r.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30">
                    <span className="text-2xl font-bold text-amber-400">{r.stat}</span>
                    <span className="text-xs text-amber-200/80">{r.statLabel}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-amber-500/30 flex items-center justify-center backdrop-blur-sm">
                    <r.icon className="w-6 h-6 text-amber-400" />
                  </div>
                </div>
                <div className="p-6 bg-card/50">
                  <h3 className="text-xl font-bold text-white mb-2">{r.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{r.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {r.features.map((f, j) => (
                      <span key={j} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">
                        <BadgeCheck className="w-3 h-3" /> {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section id="recent-projects" className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Недавние проекты</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Последние </span>
              <span className="text-gradient">выполненные работы</span>
            </h2>
            <p className="text-gray-400 text-lg">Примеры наших недавних проектов.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((p) => (
              <div key={p.id} className={`rounded-2xl border border-border/30 bg-card/30 overflow-hidden ${p.featured ? 'lg:col-span-2' : ''}`}>
                <div className={`grid ${p.featured ? 'lg:grid-cols-2' : ''}`}>
                  <div className="relative h-64 lg:min-h-[280px] w-full">
                    <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex gap-4 text-sm text-white/80">
                      <span className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" /> {p.location}</span>
                      <span className="flex items-center gap-1"><CalIcon className="w-4 h-4" /> {p.date}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                      <span>{p.area} м²</span>
                      <span>{p.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.services.map((s, i) => (
                        <span key={i} className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">{s}</span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">Было: {p.beforeState}</p>
                    <p className="text-sm text-amber-400 mb-4">Стало: {p.afterState}</p>
                    <p className="text-gray-400 text-sm italic mb-2">&quot;{p.testimonial}&quot;</p>
                    <p className="text-gray-500 text-xs mb-4">— {p.client}</p>
                    <button type="button" onClick={() => setCallbackOpen(true)} className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-2">
                      Хочу так же <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={() => scrollToSection('#portfolio')} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-amber-500/50 text-amber-400 hover:bg-amber-500/10">
              Смотреть все работы
            </button>
          </div>

          {/* Форма: Заказать выезд замерщика */}
          <div className="mt-24">
            <InlineLeadForm
              title="Заказать выезд замерщика"
              benefit="Оставьте номер — согласуем дату и приедем на объект бесплатно"
              leadType="measure"
              buttonText="Заказать выезд"
              icon={<MapPin className="w-6 h-6 text-amber-400" />}
              benefits={[
                { icon: MapPin, title: 'Бесплатный выезд', description: 'Приедем в Москве и области в удобное время' },
                { icon: CalIcon, title: 'Замеры на объекте', description: 'Точный метраж и оценка состояния древесины' },
                { icon: FileCheck, title: 'Смета на месте', description: 'Рассчитаем стоимость сразу после осмотра' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="advantages" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Почему выбирают нас</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Преимущества </span>
              <span className="text-gradient">работы с нами</span>
            </h2>
            <p className="text-gray-400 text-lg">Качество, профессионализм и долгосрочные отношения.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((s, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-card/30 border border-border/30">
                <div className="text-3xl font-bold text-gradient mb-2">{s.value}</div>
                <div className="text-sm text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((a, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-amber-500/30 transition-all flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <a.icon className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{a.title}</h3>
                  <p className="text-gray-400 text-sm">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section id="certificates" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Stamp className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Гарантии и сертификаты</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Наши </span>
              <span className="text-gradient">гарантии и достижения</span>
            </h2>
            <p className="text-gray-400 text-lg">Официально, сертифицированные материалы, реальные гарантии.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {guarantees.map((g, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card/30 border border-border/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center">
                    <Shield className="w-7 h-7 text-amber-400" />
                  </div>
                  <div className="text-3xl font-bold text-gradient">{g.period}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{g.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{g.description}</p>
                <div className="flex flex-wrap gap-2">
                  {g.features.map((f, j) => (
                    <span key={j} className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {certificates.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card/20 border border-border/30 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                  <c.icon className="w-8 h-8 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{c.title}</h4>
                <p className="text-gray-400 text-sm">{c.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mb-6">Работаем с лучшими производителями</p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((p, i) => (
              <div key={i} className="px-6 py-3 rounded-xl bg-card/20 border border-border/30 text-gray-400 font-medium hover:border-amber-500/30 hover:text-amber-400 transition-all">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Images className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Наши работы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Примеры </span>
              <span className="text-gradient">выполненных проектов</span>
            </h2>
            <p className="text-gray-400 text-lg">Результаты нашей работы.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <div key={i} onClick={() => setLightboxIndex(i)} className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer">
                <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.location}, {item.year}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <Maximize2 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={() => setLightboxIndex(null)}>
            <button className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}>
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1 flex items-center justify-center p-8" onClick={(e) => e.stopPropagation()}>
              <img src={portfolioItems[lightboxIndex].image} alt={portfolioItems[lightboxIndex].title} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="p-6 bg-black/50 text-center">
              <h3 className="text-xl font-bold text-white">{portfolioItems[lightboxIndex].title}</h3>
              <p className="text-gray-400 text-sm">{portfolioItems[lightboxIndex].location}, {portfolioItems[lightboxIndex].year}</p>
            </div>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <MessageCircleQuestion className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Вопросы и ответы</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Часто задаваемые </span>
              <span className="text-gradient">вопросы</span>
            </h2>
            <p className="text-gray-400 text-lg">Ответы о шлифовке и реставрации деревянных домов.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['Все', ...Array.from(new Set(faqItems.map((f) => f.category)))].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${faqCategory === cat ? 'bg-amber-500 text-white' : 'bg-card/30 border border-border/30 text-gray-400 hover:text-white hover:border-amber-500/30'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {(faqCategory === 'Все' ? faqItems : faqItems.filter((f) => f.category === faqCategory)).map((item, i) => (
              <div key={i} className={`rounded-2xl border border-border/30 overflow-hidden transition-all ${faqOpen === i ? 'border-amber-500/30' : ''}`}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full p-5 flex items-start gap-4 text-left">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${faqOpen === i ? 'bg-amber-500/20' : 'bg-card/50'}`}>
                    <HelpCircle className={`w-5 h-5 ${faqOpen === i ? 'text-amber-400' : 'text-gray-500'}`} />
                  </div>
                  <div className="flex-1">
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs mr-2">{item.category}</span>
                    <h3 className="text-lg font-semibold text-white mt-1">{item.question}</h3>
                  </div>
                  {faqOpen === i ? <ChevronUp className="w-5 h-5 text-amber-400" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 pl-[4.5rem]">
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Не нашли ответ?</p>
            <button type="button" onClick={() => setCallbackOpen(true)} className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-2">
              Задайте вопрос <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 lg:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Отзывы клиентов</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Что говорят </span>
              <span className="text-gradient">наши клиенты</span>
            </h2>
            <p className="text-gray-400 text-lg">Мы гордимся положительными отзывами.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-amber-500/20 transition-all">
                <Quote className="w-10 h-10 text-amber-500/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">&quot;{t.content}&quot;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{t.name}</div>
                    <div className="text-sm text-gray-500">{t.role}</div>
                  </div>
                  <div className="text-sm text-gray-600">{t.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactSection formData={formData} setFormData={setFormData} formSent={formSent} setFormSent={setFormSent} onRequestCallback={() => setCallbackOpen(true)} />

      {/* Footer */}
      <footer className="py-16 border-t border-border/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-400">A</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">ArteMadera</div>
                  <div className="text-xs text-gray-500">Шлифовка деревянных домов</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6">Профессиональная шлифовка и реставрация деревянных домов в Москве и области.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Услуги</h4>
              <ul className="space-y-3">
                {footerServices.map((l, i) => (
                  <li key={i}>
                    <button onClick={() => scrollToSection(l.href)} className="text-gray-400 hover:text-amber-400 text-sm">{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Компания</h4>
              <ul className="space-y-3">
                {footerCompany.map((l, i) => (
                  <li key={i}>
                    <button onClick={() => scrollToSection(l.href)} className="text-gray-400 hover:text-amber-400 text-sm">{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-6">Контакты</h4>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-gray-400 hover:text-amber-400">{PHONE}</a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${EMAIL}`} className="text-gray-400 hover:text-amber-400">{EMAIL}</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-400">{ADDRESS}</span>
                </li>
              </ul>
              <div className="mt-8">
              <InlineLeadForm
                title="Перезвоните мне"
                benefit="Оставьте номер — перезвоним и ответим на вопросы"
                leadType="footer"
                buttonText="Жду звонка"
                compact
                icon={<Phone className="w-6 h-6 text-amber-400" />}
                benefits={[
                  { icon: Clock, title: 'Перезвон за 30 минут', description: 'Свяжемся в ближайшее время' },
                  { icon: MessageCircleQuestion, title: 'Ответы на вопросы', description: 'Расскажем про сроки и материалы' },
                  { icon: CheckCircle2, title: 'Без обязательств', description: 'Консультация бесплатно' },
                ]}
              />
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ArteMadera. Все права защищены.</p>
            <div className="flex gap-6">
              <button className="text-gray-500 hover:text-amber-400 text-sm">Политика конфиденциальности</button>
              <button className="text-gray-500 hover:text-amber-400 text-sm">Договор оферты</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuizSideImage({ step, quizAnswers }: { step: (typeof quizSteps)[0]; quizAnswers: Record<number, string | string[]> }) {
  const stepWithImg = step as { stepImg?: string; options?: { value: string; img?: string; fallback?: string }[] };
  let imgSrc = stepWithImg.stepImg ?? '/service-1.jpg';
  const answer = quizAnswers[step.id];
  if (stepWithImg.options?.some((o) => (o as { img?: string }).img)) {
    if (step.multiple && Array.isArray(answer) && answer.length > 0) {
      const first = stepWithImg.options.find((o) => answer.includes(o.value));
      imgSrc = (first as { img?: string; fallback?: string })?.img ?? (first as { img?: string; fallback?: string })?.fallback ?? stepWithImg.stepImg ?? '/service-1.jpg';
    } else if (!step.multiple && typeof answer === 'string') {
      const opt = stepWithImg.options.find((o) => o.value === answer);
      imgSrc = (opt as { img?: string; fallback?: string })?.img ?? (opt as { img?: string; fallback?: string })?.fallback ?? (stepWithImg.options[0] as { img?: string; fallback?: string })?.img ?? stepWithImg.stepImg ?? '/service-1.jpg';
    } else {
      imgSrc = (stepWithImg.options[0] as { img?: string; fallback?: string })?.img ?? (stepWithImg.options[0] as { img?: string; fallback?: string })?.fallback ?? stepWithImg.stepImg ?? '/service-1.jpg';
    }
  }
  const [src, setSrc] = useState(imgSrc);
  const fallback = imgSrc?.startsWith('/quiz/') ? '/service-1.jpg' : undefined;
  useEffect(() => { setSrc(imgSrc); }, [imgSrc]);
  return (
    <div className="absolute inset-0 bg-card/30 flex items-center justify-center">
      <img src={src} alt="" className="absolute inset-0 w-full h-full object-contain object-center" onError={() => fallback && setSrc(fallback)} />
    </div>
  );
}

function QuizSection(props: {
  quizStep: number;
  setQuizStep: (n: number) => void;
  quizAnswers: Record<number, string | string[]>;
  setQuizAnswers: (a: Record<number, string | string[]>) => void;
  quizDone: boolean;
  setQuizDone: (v: boolean) => void;
  estimatedPrice: number;
  setEstimatedPrice: (n: number) => void;
  onRequestCallback: () => void;
}) {
  const { quizStep, setQuizStep, quizAnswers, setQuizAnswers, quizDone, setQuizDone, estimatedPrice, setEstimatedPrice, onRequestCallback } = props;
  const step = quizSteps[quizStep];
  const progress = ((quizStep + 1) / quizSteps.length) * 100;

  const handleAnswer = (value: string) => {
    if (step.multiple) {
      const current = (quizAnswers[step.id] as string[] | undefined) || [];
      const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      setQuizAnswers({ ...quizAnswers, [step.id]: updated });
    } else {
      setQuizAnswers({ ...quizAnswers, [step.id]: value });
    }
  };

  const isSelected = (value: string) => {
    const a = quizAnswers[step.id];
    if (step.multiple) return (a as string[] || []).includes(value);
    return a === value;
  };

  const canNext = () => {
    const a = quizAnswers[step.id];
    if (step.multiple) return (a as string[] || []).length > 0;
    return a !== undefined;
  };

  const next = () => {
    if (quizStep < quizSteps.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const house = quizSteps[0].options.find((o) => o.value === quizAnswers[1]);
      const sizeOpt = quizSteps[1].options.find((o) => o.value === quizAnswers[2]);
      const services = (quizAnswers[3] as string[]) || [];
      let base = house?.price ?? 1000;
      let mult = (sizeOpt as { multiplier?: number })?.multiplier ?? 1;
      let add = 0;
      quizSteps[2].options.forEach((o) => {
        if (services.includes(o.value) && typeof o.price === 'number') add += o.price;
      });
      const area = quizAnswers[2] === 'small' ? 40 : quizAnswers[2] === 'medium' ? 75 : quizAnswers[2] === 'large' ? 125 : 200;
      setEstimatedPrice(Math.round((base + add) * area * mult));
      setQuizDone(true);
    }
  };

  const reset = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizDone(false);
    setEstimatedPrice(0);
  };

  if (!step) return null;

  return (
    <section id="quiz" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Калькулятор стоимости</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Рассчитайте </span>
              <span className="text-gradient">стоимость работ</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Ответьте на 4 вопроса и получите предварительную оценку.</p>
          </div>
          <div className="rounded-2xl bg-card/50 border border-border/50 overflow-hidden">
            {!quizDone ? (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_380px] gap-0 min-h-[400px] lg:min-h-[480px]">
                <div className="p-6 sm:p-8 flex flex-col">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-400 mb-2">
                      <span>Вопрос {quizStep + 1} из {quizSteps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-border/50 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <div className="mb-6 flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{step.question}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {step.options.map((opt, i) => {
                        const optWithImg = opt as { value: string; label: string; img?: string; fallback?: string };
                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(opt.value)}
                            className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${isSelected(opt.value) ? 'border-amber-500 bg-amber-500/20' : 'border-border/50 hover:border-amber-500/50'}`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected(opt.value) ? 'border-amber-500 bg-amber-500' : 'border-gray-500'}`}>
                              {isSelected(opt.value) && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-white font-medium">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button onClick={() => setQuizStep(Math.max(0, quizStep - 1))} disabled={quizStep === 0} className="px-4 py-2 rounded-lg border border-border/50 text-gray-400 hover:text-white disabled:opacity-30">
                      <ChevronLeft className="w-4 h-4 inline mr-2" /> Назад
                    </button>
                    <button onClick={next} disabled={!canNext()} className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white disabled:opacity-50">
                      {quizStep === quizSteps.length - 1 ? 'Рассчитать' : 'Далее'} <ChevronRight className="w-4 h-4 inline ml-2" />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block w-px self-stretch bg-amber-500/50 shrink-0" aria-hidden />
                <div className="hidden lg:block relative w-[380px] shrink-0 self-stretch">
                  <QuizSideImage step={step} quizAnswers={quizAnswers} />
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Предварительная оценка</h3>
                <div className="text-5xl font-bold text-gradient mb-4">от {estimatedPrice.toLocaleString()} ₽</div>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Точная стоимость после осмотра. Оставьте заявку для консультации.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button type="button" onClick={onRequestCallback} className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl">
                    <Phone className="w-5 h-5" /> Получить точный расчёт
                  </button>
                  <button type="button" onClick={reset} className="inline-flex items-center justify-center border border-border/50 text-gray-400 hover:text-white px-6 py-3 rounded-xl">
                    Пройти заново
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CalculatorSection(props: {
  calcHouseType: string;
  setCalcHouseType: (s: string) => void;
  calcArea: number;
  setCalcArea: (n: number) => void;
  calcServices: string[];
  setCalcServices: (s: string[]) => void;
  onRequestCallback: () => void;
}) {
  const { calcHouseType, setCalcHouseType, calcArea, setCalcArea, calcServices, setCalcServices, onRequestCallback } = props;
  const house = houseTypes.find((h) => h.value === calcHouseType);
  const basePrice = house?.price ?? 1200;
  const addPrice = calcServices.reduce((sum, id) => {
    const s = additionalServices.find((x) => x.id === id);
    return sum + (s?.price ?? 0);
  }, 0);
  const totalPerM2 = basePrice + addPrice;
  const total = totalPerM2 * calcArea;
  const discount = calcArea > 150 ? 0.1 : calcArea > 100 ? 0.05 : 0;
  const final = Math.round(total * (1 - discount));

  const toggle = (id: string) => {
    setCalcServices(calcServices.includes(id) ? calcServices.filter((x) => x !== id) : [...calcServices, id]);
  };

  return (
    <section id="calculator" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
              <Calculator className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300">Калькулятор</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Точный расчёт </span>
              <span className="text-gradient">стоимости работ</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Выберите параметры и получите расчёт.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-card/50 border border-border/50 space-y-6">
              <div>
                <label className="text-white font-medium mb-3 block">Тип дома</label>
                <div className="grid grid-cols-2 gap-3">
                  {houseTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setCalcHouseType(t.value)}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${calcHouseType === t.value ? 'border-amber-500 bg-amber-500/20' : 'border-border/50 hover:border-amber-500/50'}`}
                    >
                      <t.icon className={`w-5 h-5 mb-2 ${calcHouseType === t.value ? 'text-amber-400' : 'text-gray-500'}`} />
                      <div className="text-sm text-white">{t.label}</div>
                      <div className="text-xs text-gray-400">от {t.price} ₽/м²</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-white font-medium">Площадь</label>
                  <span className="text-amber-400 font-bold">{calcArea} м²</span>
                </div>
                <input type="range" min={20} max={300} step={5} value={calcArea} onChange={(e) => setCalcArea(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none bg-border/50 accent-amber-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1"><span>20 м²</span><span>300 м²</span></div>
              </div>
              <div>
                <label className="text-white font-medium mb-3 block">Дополнительные услуги</label>
                <div className="space-y-2">
                  {additionalServices.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => toggle(s.id)}
                      className={`w-full p-3 rounded-xl border-2 flex items-center gap-3 transition-all ${calcServices.includes(s.id) ? 'border-amber-500 bg-amber-500/20' : 'border-border/50 hover:border-amber-500/50'}`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${calcServices.includes(s.id) ? 'bg-amber-500' : 'bg-card/50'}`}>
                        <s.icon className={`w-5 h-5 ${calcServices.includes(s.id) ? 'text-white' : 'text-gray-500'}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm text-white">{s.label}</div>
                        <div className="text-xs text-gray-400">+{s.price} ₽/м²</div>
                      </div>
                      {calcServices.includes(s.id) && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30">
              <h3 className="text-xl font-bold text-white mb-6">Расчёт стоимости</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm"><span className="text-gray-400">Базовая шлифовка</span><span className="text-white">{basePrice} ₽/м²</span></div>
                {calcServices.map((id) => {
                  const s = additionalServices.find((x) => x.id === id);
                  return <div key={id} className="flex justify-between text-sm"><span className="text-gray-400">{s?.label}</span><span className="text-white">+{s?.price} ₽/м²</span></div>;
                })}
                <div className="flex justify-between text-sm"><span className="text-gray-400">Площадь</span><span className="text-white">{calcArea} м²</span></div>
                {discount > 0 && <div className="flex justify-between text-sm"><span className="text-amber-400">Скидка за объём</span><span className="text-amber-400">-{Math.round(discount * 100)}%</span></div>}
              </div>
              <div className="border-t border-amber-500/30 pt-4 mb-6">
                <div className="flex justify-between items-end">
                  <span className="text-gray-400">Итого:</span>
                  <div className="text-right">
                    {discount > 0 && <div className="text-sm text-gray-500 line-through">{total.toLocaleString()} ₽</div>}
                    <div className="text-4xl font-bold text-gradient">{final.toLocaleString()} ₽</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mb-6">* Точная стоимость после осмотра</p>
              <button type="button" onClick={onRequestCallback} className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl mb-6">
                <Phone className="w-5 h-5" /> Получить точный расчёт
              </button>
              <ul className="text-sm text-gray-400 space-y-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Шлифовка всей площади</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Работа и материалы</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Бесплатный замер на объекте</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500/70 flex-shrink-0" /> Гарантия 3 года</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection(props: {
  formData: { name: string; phone: string; email: string; message: string };
  setFormData: (d: { name: string; phone: string; email: string; message: string }) => void;
  formSent: boolean;
  setFormSent: (v: boolean) => void;
  onRequestCallback: () => void;
}) {
  const { formData, setFormData, formSent, setFormSent, onRequestCallback } = props;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const phoneDigits = getPhoneDigits(formData.phone);
    if (phoneDigits.length < 11) return;
    try {
      const res = await fetch(API_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneDigits, type: 'contact' }),
      });
      if (res.ok) {
        setFormSent(true);
        setFormData({ ...formData, phone: '' });
        setTimeout(() => setFormSent(false), 3000);
      }
    } catch {
      setFormSent(true);
      setTimeout(() => setFormSent(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Contact2 className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300">Свяжитесь с нами</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Получите </span>
            <span className="text-gradient">бесплатную консультацию</span>
          </h2>
          <p className="text-gray-400 text-lg">Оставьте заявку — свяжемся в течение 30 минут.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-card/30 border border-border/30">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4"><Phone className="w-6 h-6 text-amber-400" /></div>
                <h3 className="text-lg font-bold text-white mb-2">Телефон</h3>
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-gray-400 hover:text-amber-400">{PHONE}</a>
              </div>
              <div className="p-6 rounded-2xl bg-card/30 border border-border/30">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4"><Mail className="w-6 h-6 text-amber-400" /></div>
                <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                <a href={`mailto:${EMAIL}`} className="text-gray-400 hover:text-amber-400">{EMAIL}</a>
              </div>
              <div className="p-6 rounded-2xl bg-card/30 border border-border/30">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4"><MapPin className="w-6 h-6 text-amber-400" /></div>
                <h3 className="text-lg font-bold text-white mb-2">Адрес</h3>
                <p className="text-gray-400">{ADDRESS}</p>
              </div>
              <div className="p-6 rounded-2xl bg-card/30 border border-border/30">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4"><Clock className="w-6 h-6 text-amber-400" /></div>
                <h3 className="text-lg font-bold text-white mb-2">Режим работы</h3>
                <p className="text-gray-400">Пн-Вс: 8:00 - 20:00</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border/30 h-64 bg-card/30 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <p className="text-gray-400">Работаем по всей Москве и Московской области</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-amber-500/30 bg-amber-500/10 p-6 sm:p-8 shadow-lg shadow-amber-900/10 max-w-4xl mx-auto">
            {formSent ? (
              <div className="py-10 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-green-400" /></div>
                <h4 className="text-xl font-bold text-white mb-2">Спасибо за заявку!</h4>
                <p className="text-amber-200/90">Мы перезвоним в ближайшее время.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 lg:gap-6 items-stretch">
                <div className="flex flex-col items-center text-center max-w-[300px] w-full mx-auto lg:pr-3">
                  <div className="flex flex-col items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">Оставить заявку</h3>
                      <p className="text-amber-200/90 text-base mt-1.5 font-medium">Оставьте номер — перезвоним и ответим на вопросы</p>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    <div>
                      <label htmlFor="contact-phone" className="block text-gray-300 text-sm mb-1.5">Номер телефона</label>
                      <input id="contact-phone" name="phone" type="tel" placeholder="+7 (999) 999-99-99" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: formatPhoneMask(e.target.value) })} className="w-full px-4 py-3 rounded-xl bg-background/80 border border-amber-500/30 focus:border-amber-500 focus:outline-none text-white placeholder:text-gray-500 text-base" />
                    </div>
                    <button type="submit" disabled={getPhoneDigits(formData.phone).length < 11} className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:pointer-events-none text-white py-3.5 rounded-xl font-bold transition-colors">
                      <Send className="w-5 h-5" /> Отправить заявку
                    </button>
                    <p className="text-xs text-amber-200/70 mt-3">Ваши данные защищены и не передаются третьим лицам</p>
                  </form>
                </div>
                <div className="hidden lg:block w-px self-stretch bg-amber-500/50 shrink-0" aria-hidden />
                <div className="border-t lg:border-t-0 pt-6 lg:pt-0 lg:pl-8 lg:pr-8 lg:py-8 flex flex-col justify-center">
                  <p className="text-white font-bold text-2xl sm:text-3xl leading-tight mb-5">Что вы получите:</p>
                  <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Phone className="w-5 h-5 text-amber-400" /></div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-white text-base leading-tight">Бесплатная консультация</h4>
                        <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">Расскажем про сроки, материалы и стоимость</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Calculator className="w-5 h-5 text-amber-400" /></div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-white text-base leading-tight">Расчёт сметы</h4>
                        <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">Рассчитаем стоимость под ваш объект</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start">
                      <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"><MapPin className="w-5 h-5 text-amber-400" /></div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-white text-base leading-tight">Выезд замерщика</h4>
                        <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">Бесплатный выезд на объект в удобное время</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function InlineLeadForm(props: {
  title: string;
  benefit: string;
  leadType: string;
  buttonText: string;
  icon: React.ReactNode;
  compact?: boolean;
  benefits?: { icon: React.ElementType; title: string; description: string }[];
}) {
  const { title, benefit, leadType, buttonText, icon, compact, benefits = [] } = props;
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = getPhoneDigits(phone);
    if (digits.length < 11) return;
    setLoading(true);
    try {
      const res = await fetch(API_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: digits, type: leadType }),
      });
      if (res.ok) {
        setSent(true);
        setPhone('');
      }
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-background/80 border border-amber-500/30 focus:border-amber-500 focus:outline-none text-white placeholder:text-gray-500 text-base';

  if (sent) {
    return (
      <div className="rounded-2xl border-2 border-amber-500/30 bg-amber-500/10 p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-14 h-14 rounded-full bg-green-500/30 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-7 h-7 text-green-400" />
          </div>
          <h4 className="text-xl font-bold text-white mb-1">Заявка отправлена</h4>
          <p className="text-amber-200/90 text-sm">Мы перезвоним в ближайшее время.</p>
        </div>
      </div>
    );
  }

  const formBlock = (
    <div className={`flex flex-col items-center text-center ${compact ? 'max-w-[240px]' : 'max-w-[280px] lg:max-w-[300px]'}`}>
      <div className="flex flex-col items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">{icon}</div>
        <div>
          <h3 className={`font-bold text-white leading-tight ${compact ? 'text-xl' : 'text-2xl sm:text-3xl'}`}>{title}</h3>
          <p className={`text-amber-200/90 mt-1.5 font-medium ${compact ? 'text-sm' : 'text-base'}`}>{benefit}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          <label htmlFor={`inline-phone-${leadType}`} className="block text-gray-300 text-sm mb-1.5">Номер телефона</label>
          <input id={`inline-phone-${leadType}`} type="tel" placeholder="+7 (999) 999-99-99" value={phone} onChange={(e) => setPhone(formatPhoneMask(e.target.value))} className={inputClass} />
        </div>
        <button type="submit" disabled={loading || getPhoneDigits(phone).length < 11} className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:pointer-events-none text-white py-3.5 rounded-xl font-bold transition-colors shadow-lg shadow-amber-900/20">
          {icon}
          {loading ? 'Отправка...' : buttonText}
        </button>
        <p className="text-xs text-amber-200/70">Ваши данные защищены и не передаются третьим лицам</p>
      </form>
    </div>
  );

  const benefitsBlock = benefits.length > 0 && (
    <div className={compact ? 'space-y-4' : 'space-y-6'}>
      <p className="text-white font-bold text-2xl sm:text-3xl leading-tight mb-5">Что вы получите:</p>
      {benefits.map((b, i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-11 h-11 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <b.icon className="w-5 h-5 text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-white text-base leading-tight">{b.title}</h4>
            <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">{b.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`rounded-2xl border-2 border-amber-500/30 bg-amber-500/10 shadow-lg shadow-amber-900/10 mx-auto ${compact ? 'max-w-md p-5' : 'max-w-4xl p-6 sm:p-8'}`}>
      {benefits.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-0 lg:gap-6 items-stretch">
          <div className="flex justify-center lg:pr-3">{formBlock}</div>
          <div className="hidden lg:block w-px self-stretch bg-amber-500/50 shrink-0" aria-hidden />
          <div className="border-t lg:border-t-0 pt-6 lg:pt-0 lg:pl-8 lg:pr-8 lg:py-8 flex flex-col justify-center">{benefitsBlock}</div>
        </div>
      ) : (
        <div className="flex justify-center">{formBlock}</div>
      )}
    </div>
  );
}

function CallbackModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = getPhoneDigits(phone);
    if (digits.length < 11) return;
    setLoading(true);
    try {
      const res = await fetch(API_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: digits, type: 'callback' }),
      });
      if (res.ok) {
        setSent(true);
        setPhone('');
        setTimeout(() => { setSent(false); onClose(); }, 2500);
      }
    } catch {
      setSent(true);
      setTimeout(() => { setSent(false); }, 2500);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 sm:items-center sm:p-0">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full max-w-md rounded-2xl border-2 border-amber-500/40 bg-amber-500/10 shadow-xl shadow-amber-900/20" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 border border-amber-500/30 flex items-center justify-center text-gray-300 hover:text-white hover:border-amber-500/50 transition-colors" aria-label="Закрыть">
          <X className="w-5 h-5" />
        </button>
        <div className="p-6 pt-12 sm:p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Phone className="w-7 h-7 text-amber-400" />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Позвоните сейчас</h3>
              <p className="text-amber-200/90 text-base font-medium mt-1">Бесплатный замер и расчёт за 30 минут. Оставьте номер — перезвоним.</p>
            </div>
          </div>
          {sent ? (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Заявка принята</h4>
              <p className="text-amber-200/90">Мы перезвоним в ближайшее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <label htmlFor="callback-phone" className="sr-only">Телефон</label>
              <input id="callback-phone" type="tel" placeholder="+7 (999) 999-99-99" value={phone} onChange={(e) => setPhone(formatPhoneMask(e.target.value))} className="w-full px-4 py-4 rounded-xl bg-background/80 border-2 border-amber-500/30 focus:border-amber-500 focus:outline-none text-white placeholder:text-gray-500 text-base" />
              <button type="submit" disabled={loading || getPhoneDigits(phone).length < 11} className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:pointer-events-none text-white py-4 rounded-xl font-bold text-lg transition-colors">
                <Phone className="w-5 h-5" /> {loading ? 'Отправка...' : 'Жду звонка'}
              </button>
              <p className="text-xs text-amber-200/70 text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
