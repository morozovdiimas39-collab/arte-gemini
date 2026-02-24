import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Phone, 
  Menu, 
  X, 
  Hammer, 
  PaintBucket, 
  Thermometer, 
  Home, 
  CheckCircle2, 
  Award, 
  Clock, 
  Users,
  MapPin,
  Mail,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Услуги', href: '#services' },
    { name: 'О нас', href: '#about' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm py-4 border-b border-gray-100' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="text-2xl font-display font-bold tracking-tight uppercase text-wood-900">
          ArteMadera
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium tracking-wide hover:text-accent transition-colors text-wood-900"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="tel:+74950050145" 
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 bg-wood-900 text-white hover:bg-wood-800"
          >
            <Phone className="w-4 h-4" />
            <span>+7 (495) 005-01-45</span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-wood-900" />
          ) : (
            <Menu className="w-6 h-6 text-wood-900" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t border-gray-100 p-8 md:hidden h-screen"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-wood-900 font-display font-bold text-2xl"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="tel:+74950050145" 
                className="flex items-center justify-center gap-2 w-full bg-wood-900 text-white py-4 rounded-xl font-bold mt-8 text-lg"
              >
                <Phone className="w-5 h-5" />
                <span>Позвонить</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-[0.03]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wood-100/50 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-accent"></div>
              <span className="text-accent font-bold tracking-widest uppercase text-sm">
                Premium Wood Finishing
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 leading-[1.1] tracking-tight text-wood-900">
              Искусство <br/>
              <span className="text-wood-400">деревянного</span> <br/>
              домостроения
            </h1>
            
            <p className="text-lg text-wood-600 max-w-xl mb-10 font-light leading-relaxed border-l-2 border-wood-200 pl-6">
              Профессиональная шлифовка, покраска и реставрация премиум-класса. 
              Мы создаем долговечную красоту вашего дома, используя лучшие мировые технологии.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a 
                href="#contact" 
                className="group px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-bold transition-all shadow-xl shadow-accent/20 flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                <span>Рассчитать проект</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#portfolio" 
                className="px-8 py-4 bg-wood-50 hover:bg-wood-100 text-wood-900 border border-wood-200 rounded-full font-bold transition-all w-full sm:w-auto justify-center text-center"
              >
                Смотреть портфолио
              </a>
            </div>

            {/* Stats (Optional addition to match layout balance if needed, but keeping simple for now) */}
          </motion.div>

          {/* Right Image Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 h-[600px]"
          >
            <div className="space-y-4 flex flex-col h-full">
              <div className="relative flex-1 rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" 
                  alt="Exterior" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="relative h-48 rounded-3xl overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop" 
                  alt="Detail" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                 <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
            <div className="relative h-full rounded-3xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                alt="Interior" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
               <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      number: "01",
      title: "Комплексный подход",
      description: "Все работы от одного исполнителя: от шлифовки до финишной отделки и декора."
    },
    {
      number: "02",
      title: "Премиум материалы",
      description: "Используем только сертифицированные масла и краски Biofa, Renner, Osmo."
    },
    {
      number: "03",
      title: "Гарантия 5 лет",
      description: "Официальная гарантия на все виды работ. Постгарантийное обслуживание."
    },
    {
      number: "04",
      title: "Свое производство",
      description: "Изготавливаем уникальные столярные изделия: беседки, мебель, декор."
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="text-6xl font-display font-bold text-wood-100 mb-6 group-hover:text-accent/20 transition-colors duration-500">
                {feature.number}
              </div>
              <h3 className="text-2xl font-display font-bold text-wood-900 mb-4">{feature.title}</h3>
              <p className="text-wood-600 leading-relaxed border-t border-wood-100 pt-6 group-hover:border-accent/50 transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Шлифовка сруба",
      description: "Идеальная гладкость стен. Подготовка к покраске.",
      image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?q=80&w=2070&auto=format&fit=crop",
      colSpan: "md:col-span-2"
    },
    {
      title: "Покраска дома",
      description: "Защита и эстетика. Масла Biofa, Renner.",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
      colSpan: "md:col-span-1"
    },
    {
      title: "Теплый шов",
      description: "Герметизация швов. Энергоэффективность.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      colSpan: "md:col-span-1"
    },
    {
      title: "Конопатка и Обсада",
      description: "Традиционное утепление и защита проемов.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
      colSpan: "md:col-span-2"
    }
  ];

  return (
    <section id="services" className="py-32 bg-wood-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Наши услуги</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-wood-900 leading-tight">
              Комплексные решения <br/> для вашего дома
            </h2>
          </div>
          <a href="#" className="group flex items-center gap-2 text-wood-900 font-bold border-b-2 border-wood-900 pb-1 hover:text-accent hover:border-accent transition-all">
            <span>Все услуги</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer ${service.colSpan}`}
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-10 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/70 text-lg font-light">
                      {service.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-accent transition-colors">
                    <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-wood-900 text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-6 block">О компании</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 leading-tight">
              ArteMadera — <br/>
              <span className="text-white/50">стандарт качества</span>
            </h2>
            
            <div className="space-y-8 text-lg font-light text-white/80 leading-relaxed">
              <p>
                Мы не просто строим и отделываем дома — мы создаем наследие. Каждый проект для нас — это возможность продемонстрировать мастерство работы с деревом, накопленное годами.
              </p>
              <p>
                Наша команда реализовала сотни проектов, включая масштабные базы отдыха стоимостью более 100 миллионов рублей. Мы гордимся тем, что используем только экологичные материалы премиум-класса.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-16 border-t border-white/10 pt-10">
              <div>
                <div className="text-5xl font-display font-bold text-accent mb-2">10+</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Лет опыта</div>
              </div>
              <div>
                <div className="text-5xl font-display font-bold text-accent mb-2">500+</div>
                <div className="text-sm text-white/60 uppercase tracking-wider">Проектов</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1595846519845-68e298c2edd8?q=80&w=1974&auto=format&fit=crop" 
                alt="About ArteMadera" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-2xl max-w-xs hidden md:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-wood-900 text-lg">Сертификаты</h4>
                  <p className="text-sm text-wood-500">Official Partner</p>
                </div>
              </div>
              <p className="text-wood-600 text-sm leading-relaxed">
                Официальные партнеры Biofa, Renner и Osmo. Гарантия подлинности материалов.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop",
      title: "Вилла в Барвихе",
      category: "Полная отделка"
    },
    {
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop",
      title: "Усадьба «Лесная»",
      category: "Реставрация"
    },
    {
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
      title: "Коттедж Modern",
      category: "Покраска фасада"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Портфолио</span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-wood-900">
              Реализованные <br/> проекты
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="w-14 h-14 rounded-full border border-wood-200 flex items-center justify-center hover:bg-wood-900 hover:text-white hover:border-wood-900 transition-all">
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>
            <button className="w-14 h-14 rounded-full border border-wood-200 flex items-center justify-center hover:bg-wood-900 hover:text-white hover:border-wood-900 transition-all">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-full text-sm font-bold">
                    Смотреть кейс
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-wood-900 mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-wood-500 font-medium uppercase tracking-wider text-sm">
                {project.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-wood-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-wood-900 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          <div className="lg:w-1/2 p-12 lg:p-20 relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5"></div>
            
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-6 block relative z-10">Контакты</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 relative z-10">
              Готовы обсудить <br/> ваш проект?
            </h2>

            <div className="space-y-10 relative z-10">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-2 uppercase tracking-wider">Телефон</p>
                  <a href="tel:+74950050145" className="text-2xl font-display font-bold text-white hover:text-accent transition-colors">
                    +7 (495) 005-01-45
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-2 uppercase tracking-wider">Email</p>
                  <a href="mailto:info@artemadera.ru" className="text-2xl font-display font-bold text-white hover:text-accent transition-colors">
                    info@artemadera.ru
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-white/40 text-sm mb-2 uppercase tracking-wider">Офис</p>
                  <p className="text-xl font-medium text-white leading-relaxed">
                    г. Москва, Метро ВДНХ,<br/> Ярославская улица, д. 8, корп. 6, Офис 220
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-12 lg:p-20">
            <h3 className="text-3xl font-display font-bold text-wood-900 mb-8">Оставить заявку</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-wood-900 uppercase tracking-wide">Имя</label>
                  <input 
                    type="text" 
                    className="w-full px-0 py-4 bg-transparent border-b border-wood-200 focus:border-accent outline-none transition-all text-lg placeholder:text-wood-300"
                    placeholder="Иван"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-wood-900 uppercase tracking-wide">Телефон</label>
                  <input 
                    type="tel" 
                    className="w-full px-0 py-4 bg-transparent border-b border-wood-200 focus:border-accent outline-none transition-all text-lg placeholder:text-wood-300"
                    placeholder="+7 (999) ..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-wood-900 uppercase tracking-wide">Сообщение</label>
                <textarea 
                  rows={3}
                  className="w-full px-0 py-4 bg-transparent border-b border-wood-200 focus:border-accent outline-none transition-all text-lg placeholder:text-wood-300 resize-none"
                  placeholder="Расскажите о вашем проекте..."
                />
              </div>
              <button className="w-full py-5 bg-accent hover:bg-accent-hover text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-accent/20 mt-4">
                Отправить заявку
              </button>
              <p className="text-xs text-wood-400 text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-wood-950 text-wood-400 py-20 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <a href="#" className="text-3xl font-display font-bold text-white mb-8 block">
              ArteMadera
            </a>
            <p className="text-lg leading-relaxed mb-8 max-w-sm">
              Премиальная отделка деревянных домов. Мы создаем пространство, в котором хочется жить.
            </p>
            <div className="flex gap-4">
              {['Vk', 'Tg', 'Wa'].map((social) => (
                <a key={social} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                  <span className="font-bold">{social}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">Услуги</h4>
            <ul className="space-y-4">
              {['Шлифовка', 'Покраска', 'Теплый шов', 'Конопатка', 'Обсада'].map((item) => (
                <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">Компания</h4>
            <ul className="space-y-4">
              {['О нас', 'Портфолио', 'Отзывы', 'Блог', 'Контакты'].map((item) => (
                <li key={item}><a href="#" className="hover:text-accent transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-bold mb-8 uppercase tracking-wider text-sm">Подписка</h4>
            <p className="mb-6 text-sm">Получайте полезные советы по уходу за деревянным домом.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 outline-none focus:border-accent w-full"
              />
              <button className="bg-accent px-6 rounded-r-lg font-bold text-white hover:bg-accent-hover transition-colors">
                OK
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2025 ArteMadera. Все права защищены.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent selection:text-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
