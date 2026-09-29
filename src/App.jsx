import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, Clock, MapPin, Sparkles, Copy, Check, 
  Phone, Send, X, ChevronRight, CreditCard, 
  Info, ShieldAlert, Star, Palette, QrCode, UserPlus, 
  DownloadCloud, Smartphone
} from 'lucide-react';

function Instagram({ size = 24, className = '', ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

// URL обфусцирован (зашифрован в base64) для защиты от простых парсеров исходного кода.
// Функция atob() расшифрует его прямо в момент работы приложения.
const GOOGLE_APPS_SCRIPT_URL = atob('aHR0cHM6Ly9zY3JpcHQuZ29vZ2xlLmNvbS9tYWNyb3Mvcy9BS2Z5Y2J6ZHZ1dGptdENOTVpTdEZQX1FCMW1zQzh2THRxUlMwdzM1NUZzMmoxZ25UM19BUC10MFhTSXdzUXdGTnhQVDBDQ3ZYQS9leGVj'); 

const DICT = {
  hy: {
    spec: "Մատնահարդար և Էսթետիկայի Վարպետ",
    location: "Էջմիածին",
    status: "Ընդունումը գրանցումով",
    bookOnline: "Գրանցվել առցանց",
    availableSlots: "Ազատ պատուհաններ",
    priceList: "Գնացուցակ",
    select: "Ընտրել",
    paymentDetails: "Վճարման տվյալներ",
    rules: "Ընդունելության կանոններ",
    contactMe: "Կապվել ինձ հետ",
    rights: "Բոլոր իրավունքները պաշտպանված են:",
    addToContacts: "Պահպանել կոնտակտներում",
    showQr: "Ցույց տալ QR կոդը",
    installApp: "Տեղադրել հավելվածը (PWA)",
    scanQr: "Սկանավորեք արագ մուտքի համար",
    bookingTitle: "Գրանցման ձևակերպում",
    service: "Ծառայություն",
    time: "Ժամանակ",
    yourName: "Ձեր անունը",
    phoneNum: "Հեռախոսահամար",
    confirmBooking: "Հաստատել գրանցումը",
    sending: "Ուղարկվում է...",
    successTitle: "Հայտը ուղարկված է!",
    successText: "Շնորհակալություն: Ես կկապվեմ ձեզ հետ շուտով հաստատման համար:",
    byAgreement: "Ըստ համաձայնության",
    willChooseInChat: "Կընտրենք չաթում",
    namePlaceholder: "Օրինակ՝ Աննա",
    copied: "Պատճենված է",
    copyError: "Պատճենման սխալ",
    installHint: 'Սեղմեք "Կիսվել" և ընտրեք "Ավելացնել էկրանին"',
    // Mock Data
    s_manicure: "Մատնահարդարում",
    s_pedicure: "Պեդիկյուր",
    s_design: "Դիզայն և խնամք",
    today: "Այսօր",
    tomorrow: "Վաղը",
    sep29: "29 Սեպ",
    sep30: "30 Սեպ",
    oct1: "1 Հոկտ",
    oct2: "2 Հոկտ",
    discount: "Զեղչ 10%",
    pol1: "Կանխավճար 2000 AMD ժամանակը ֆիքսելու համար:",
    pol2: "Ավելի քան 15 րոպե ուշացում = գրանցման չեղարկում:",
    pol3: "Խնդրում ենք գալ առանց ուղեկցողների:",
    pol4: "Ծածկույթի երաշխիք — 5 օր:"
  },
  ru: {
    spec: "Nail & Aesthetic Master",
    location: "Эчмиадзин",
    status: "Прием по записи",
    bookOnline: "Записаться онлайн",
    availableSlots: "Свободные окна",
    priceList: "Прайс-лист",
    select: "Выбрать",
    paymentDetails: "Реквизиты для оплаты",
    rules: "Правила приема",
    contactMe: "Связаться со мной",
    rights: "Все права защищены.",
    addToContacts: "Добавить в контакты",
    showQr: "Показать QR-код",
    installApp: "Установить приложение (PWA)",
    scanQr: "Сканируйте для быстрого доступа",
    bookingTitle: "Оформление записи",
    service: "Услуга",
    time: "Время",
    yourName: "Ваше Имя",
    phoneNum: "Номер телефона",
    confirmBooking: "Подтвердить запись",
    sending: "Отправка...",
    successTitle: "Заявка отправлена!",
    successText: "Спасибо! Я свяжусь с вами в ближайшее время для подтверждения записи.",
    byAgreement: "По согласованию",
    willChooseInChat: "Выберем в чате",
    namePlaceholder: "Например, Анна",
    copied: "Скопировано в буфер!",
    copyError: "Ошибка копирования",
    installHint: 'Нажмите "Поделиться" -> "На экран Домой"',
    // Mock Data
    s_manicure: "Маникюр",
    s_pedicure: "Педикюр",
    s_design: "Дизайн & Уход",
    today: "Сегодня",
    tomorrow: "Завтра",
    sep29: "29 Сен",
    sep30: "30 Сен",
    oct1: "1 Окт",
    oct2: "2 Окт",
    discount: "Скидка 10%",
    pol1: "Предоплата 2000 AMD для фиксации времени.",
    pol2: "Опоздание более 15 минут = отмена записи (предоплата не возвращается).",
    pol3: "Приходите, пожалуйста, без сопровождающих.",
    pol4: "Гарантия на покрытие — 5 дней."
  }
};

const getMockData = (lang) => ({
  master: {
    name: lang === 'hy' ? "Անի Սարգսյան" : "Ани Саркисян",
    specialization: DICT[lang].spec,
    location: DICT[lang].location,
    avatar: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    status: DICT[lang].status
  },
  availableDates: [
    { id: 1, date: DICT[lang].sep29, label: DICT[lang].today, times: ["15:00", "17:30", "19:00"] },
    { id: 2, date: DICT[lang].sep30, label: DICT[lang].tomorrow, times: ["10:00", "12:00", "14:30", "16:00"] },
    { id: 3, date: DICT[lang].oct1, label: "", times: ["11:00", "13:30", "15:00", "18:00"] },
    { id: 4, date: DICT[lang].oct2, label: "", times: ["09:00", "11:00", "14:00", "17:00", "19:00"] }
  ],
  services: [
    {
      id: "s1",
      category: DICT[lang].s_manicure,
      name: lang === 'hy' ? "Ապարատային մատնահարդարում + Գել-լաք" : "Аппаратный маникюр + Гель-лак",
      duration: lang === 'hy' ? "1.5 - 2 ժամ" : "1.5 - 2 часа",
      price: 8000,
      description: lang === 'hy' ? "Հեռացում, համակցված մատնահարդարում, եղունգի թիթեղի հարթեցում և մեկ գույնով ծածկում:" : "Снятие, комбинированный маникюр, выравнивание ногтевой пластины и покрытие в один тон."
    },
    {
      id: "s2",
      category: DICT[lang].s_manicure,
      name: lang === 'hy' ? "Եղունգների երկարացում" : "Наращивание ногтей",
      duration: lang === 'hy' ? "2.5 - 3 ժամ" : "2.5 - 3 часа",
      price: 13000,
      description: lang === 'hy' ? "Եղունգների մոդելավորում պոլիգելով/գելով, ապարատային մատնահարդարում, գել-լաքի ծածկույթ:" : "Моделирование ногтей полигелем/гелем, аппаратный маникюр, покрытие гель-лаком."
    },
    {
      id: "s3",
      category: DICT[lang].s_pedicure,
      name: lang === 'hy' ? "Smart-պեդիկյուր ծածկույթով" : "Smart-педикюр с покрытием",
      duration: lang === 'hy' ? "1.5 ժամ" : "1.5 часа",
      price: 10000,
      description: lang === 'hy' ? "Ոտնաթաթի ամբողջական մշակում սկավառակներով, մատների մշակում և գել-լաքի ծածկույթ:" : "Полная обработка стопы дисками, обработка пальчиков и покрытие гель-лаком."
    },
    {
      id: "s4",
      category: DICT[lang].s_pedicure,
      name: lang === 'hy' ? "Էքսպրես պեդիկյուր" : "Экспресс-педикюр",
      duration: lang === 'hy' ? "1 ժամ" : "1 час",
      price: 7000,
      description: lang === 'hy' ? "Միայն մատների մշակում (առանց ոտնաթաթի) + գել-լաքի ծածկույթ:" : "Обработка только пальчиков (без стопы) + покрытие гель-лаком."
    },
    {
      id: "s5",
      category: DICT[lang].s_design,
      name: lang === 'hy' ? "Ֆրենչ / Լուսնային դիզայն" : "Френч / Лунный дизайн",
      duration: "+ 30 րոպե",
      price: 2000,
      description: lang === 'hy' ? "Դասական կամ գունավոր ֆրենչ բոլոր մատների վրա:" : "Классический или цветной френч на все пальцы."
    },
    {
      id: "s6",
      category: DICT[lang].s_design,
      name: lang === 'hy' ? "Ամրացում ակրիլային փոշով" : "Укрепление акриловой пудрой",
      duration: "+ 15 րոպե",
      price: 1000,
      description: lang === 'hy' ? "Լրացուցիչ ամրացում բարակ և փխրուն եղունգների համար:" : "Дополнительное укрепление для тонких и ломких ногтей."
    }
  ],
  payments: [
    { id: "p1", name: "IDram", number: "123 456 789", icon: WalletIcon },
    { id: "p2", name: "Telcell Wallet", number: "098 765 432", icon: Phone },
    { id: "p3", name: "ArCa / Visa", number: "4000 1234 5678 9010", icon: CreditCard }
  ],
  policies: [
    DICT[lang].pol1,
    DICT[lang].pol2,
    DICT[lang].pol3,
    DICT[lang].pol4
  ]
});

const THEMES = {
  nude: {
    appBg: "bg-[#FDFBF7]",
    appTextMain: "text-[#2D2A26]",
    appTextSub: "text-[#2D2A26]/70",
    headerBg: "bg-white",
    avatarBorder: "border-white",
    glow: "bg-[#D4A373]/20",
    cardBg: "bg-white",
    cardBorder: "border-stone-200/80",
    cardTextMain: "text-[#2D2A26]",
    cardTextSub: "text-[#2D2A26]/60",
    btnPrimary: "bg-[#D4A373] text-white shadow-[#D4A373]/20",
    accentText: "text-[#D4A373]",
    accentBg: "bg-[#D4A373]/10",
    badgeBg: "bg-black/5",
    badgeText: "text-[#2D2A26]",
    statusBadgeBg: "bg-[#D4A373]/10",
    statusBadgeText: "text-[#D4A373]",
    tabActive: "bg-[#2D2A26] text-white",
    tabInactive: "bg-white text-[#2D2A26]/70 border-stone-200/80",
    btnSecondary: "bg-[#FDFBF7] text-[#2D2A26] hover:bg-[#E8D5C8]/50",
    iconWrapper: "bg-[#FDFBF7] text-[#D4A373]",
    policyBg: "bg-[#D4A373]/5",
    bullet: "bg-[#D4A373]",
    footerBg: "bg-white",
    footerBorder: "border-[#E8D5C8]",
    modalBg: "bg-white",
    grabber: "bg-[#E8D5C8]",
    inputBg: "bg-stone-100/80 focus-within:bg-white",
    inputBorder: "border-transparent focus-within:border-[#D4A373]",
    inputFocusRing: "focus-within:ring-[#D4A373]/30",
    inputText: "text-[#2D2A26]",
    toastBg: "bg-[#2D2A26]",
    toastText: "text-white",
    successIcon: "text-emerald-500",
    successBg: "bg-emerald-100",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(28,25,23,0.08)]",
    pillBg: "bg-black/5",
  },
  obsidian: {
    appBg: "bg-[#0F0F11]",
    appTextMain: "text-[#F4E8C1]",
    appTextSub: "text-[#F4E8C1]/60",
    headerBg: "bg-[#18181C]",
    avatarBorder: "border-[#18181C]",
    glow: "bg-[#D4AF37]/15",
    cardBg: "bg-[#18181C]",
    cardBorder: "border-[#2A2A30]",
    cardTextMain: "text-[#F4E8C1]",
    cardTextSub: "text-[#F4E8C1]/50",
    btnPrimary: "bg-[#D4AF37] text-black font-semibold shadow-[#D4AF37]/10",
    accentText: "text-[#D4AF37]",
    accentBg: "bg-[#D4AF37]/10",
    badgeBg: "bg-[#2A2A30]",
    badgeText: "text-[#F4E8C1]",
    statusBadgeBg: "bg-[#D4AF37]/10",
    statusBadgeText: "text-[#D4AF37]",
    tabActive: "bg-[#D4AF37] text-black",
    tabInactive: "bg-[#18181C] text-[#F4E8C1]/60 border-[#2A2A30]",
    btnSecondary: "bg-[#2A2A30] text-[#F4E8C1] hover:bg-[#3A3A40]",
    iconWrapper: "bg-[#2A2A30] text-[#D4AF37]",
    policyBg: "bg-[#18181C]",
    bullet: "bg-[#D4AF37]",
    footerBg: "bg-[#18181C]",
    footerBorder: "border-[#2A2A30]",
    modalBg: "bg-[#18181C]",
    grabber: "bg-[#2A2A30]",
    inputBg: "bg-[#0F0F11] focus-within:bg-[#18181C]",
    inputBorder: "border-transparent focus-within:border-[#D4AF37]",
    inputFocusRing: "focus-within:ring-[#D4AF37]/30",
    inputText: "text-[#F4E8C1]",
    toastBg: "bg-[#2A2A30]",
    toastText: "text-[#F4E8C1]",
    successIcon: "text-emerald-400",
    successBg: "bg-emerald-400/10",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.4)]",
    pillBg: "bg-white/5",
  },
  emerald: {
    appBg: "bg-[#0B1D17]",
    appTextMain: "text-[#F1F5F9]",
    appTextSub: "text-[#F1F5F9]/60",
    headerBg: "bg-[#132E25]",
    avatarBorder: "border-[#132E25]",
    glow: "bg-[#5EEAD4]/10",
    cardBg: "bg-[#132E25]",
    cardBorder: "border-[#1F4538]",
    cardTextMain: "text-[#F1F5F9]",
    cardTextSub: "text-[#F1F5F9]/50",
    btnPrimary: "bg-[#5EEAD4] text-[#0B1D17] font-semibold shadow-[#5EEAD4]/10",
    accentText: "text-[#5EEAD4]",
    accentBg: "bg-[#5EEAD4]/10",
    badgeBg: "bg-[#1F4538]",
    badgeText: "text-[#F1F5F9]",
    statusBadgeBg: "bg-[#5EEAD4]/10",
    statusBadgeText: "text-[#5EEAD4]",
    tabActive: "bg-[#5EEAD4] text-[#0B1D17]",
    tabInactive: "bg-[#132E25] text-[#F1F5F9]/60 border-[#1F4538]",
    btnSecondary: "bg-[#1F4538] text-[#F1F5F9] hover:bg-[#2A5A4A]",
    iconWrapper: "bg-[#1F4538] text-[#5EEAD4]",
    policyBg: "bg-[#132E25]",
    bullet: "bg-[#5EEAD4]",
    footerBg: "bg-[#132E25]",
    footerBorder: "border-[#1F4538]",
    modalBg: "bg-[#132E25]",
    grabber: "bg-[#1F4538]",
    inputBg: "bg-[#0B1D17] focus-within:bg-[#132E25]",
    inputBorder: "border-transparent focus-within:border-[#5EEAD4]",
    inputFocusRing: "focus-within:ring-[#5EEAD4]/30",
    inputText: "text-[#F1F5F9]",
    toastBg: "bg-[#1F4538]",
    toastText: "text-[#F1F5F9]",
    successIcon: "text-[#5EEAD4]",
    successBg: "bg-[#5EEAD4]/10",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]",
    pillBg: "bg-white/5",
  },
  espresso: {
    appBg: "bg-[#F5F0EB]",
    appTextMain: "text-[#2C221E]",
    appTextSub: "text-[#2C221E]/70",
    headerBg: "bg-[#F5F0EB]",
    avatarBorder: "border-[#F5F0EB]",
    glow: "bg-[#C5A059]/15",
    cardBg: "bg-[#2C221E]",
    cardBorder: "border-[#4A3B32]",
    cardTextMain: "text-[#F5F0EB]",
    cardTextSub: "text-[#F5F0EB]/70",
    btnPrimary: "bg-[#C5A059] text-white shadow-[#C5A059]/20",
    accentText: "text-[#C5A059]",
    accentBg: "bg-[#C5A059]/15",
    badgeBg: "bg-[#2C221E]/10",
    badgeText: "text-[#2C221E]",
    statusBadgeBg: "bg-[#C5A059]/15",
    statusBadgeText: "text-[#C5A059]",
    tabActive: "bg-[#2C221E] text-white",
    tabInactive: "bg-transparent text-[#2C221E]/70 border-[#D9D1C7]",
    btnSecondary: "bg-[#4A3B32] text-[#F5F0EB] hover:bg-[#5C4A40]",
    iconWrapper: "bg-[#4A3B32] text-[#C5A059]",
    policyBg: "bg-[#2C221E]",
    bullet: "bg-[#C5A059]",
    footerBg: "bg-[#F5F0EB]",
    footerBorder: "border-[#D9D1C7]",
    modalBg: "bg-[#2C221E]",
    grabber: "bg-[#4A3B32]",
    inputBg: "bg-[#4A3B32] focus-within:bg-[#3D2E26]",
    inputBorder: "border-transparent focus-within:border-[#C5A059]",
    inputFocusRing: "focus-within:ring-[#C5A059]/30",
    inputText: "text-[#F5F0EB]",
    toastBg: "bg-[#2C221E]",
    toastText: "text-[#F5F0EB]",
    successIcon: "text-[#C5A059]",
    successBg: "bg-[#C5A059]/15",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(44,34,30,0.15)]",
    pillBg: "bg-black/5",
  }
};

const THEME_OPTIONS = [
  { id: 'nude', color: '#FDFBF7', border: '#D4A373' },
  { id: 'obsidian', color: '#0F0F11', border: '#D4AF37' },
  { id: 'emerald', color: '#0B1D17', border: '#5EEAD4' },
  { id: 'espresso', color: '#F5F0EB', border: '#C5A059' }
];

const Toast = ({ message, isVisible, t }) => (
  <div 
    className={`fixed left-1/2 -translate-x-1/2 z-[110] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 transition-all duration-300 ${t.toastBg} ${t.toastText} ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
    }`}
    style={{ top: 'calc(1.5rem + env(safe-area-inset-top))' }}
  >
    <Check size={18} className={t.successIcon} />
    <span className="text-sm font-medium whitespace-nowrap">{message}</span>
  </div>
);

const SectionTitle = ({ title, icon: Icon, t }) => (
  <div className="flex items-center gap-2 mb-4 px-1">
    {Icon && <Icon size={20} className={t.appTextMain} />}
    <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${t.appTextMain}`}>{title}</h2>
  </div>
);

export default function App() {
  const [lang, setLang] = useState('hy'); 
  const d = DICT[lang]; 
  const data = getMockData(lang); 

  const [activeCategory, setActiveCategory] = useState(data.services[0].category);
  const [selectedDateIdx, setSelectedDateIdx] = useState(0); 
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [copiedPaymentId, setCopiedPaymentId] = useState(null);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'nude';
  });

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    service: null,
    slot: null,
  });

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    isSubmitting: false,
    isSuccess: false
  });

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  useEffect(() => {
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  useEffect(() => {
    setActiveCategory(data.services[0].category);
  }, [lang]);

  const t = THEMES[theme];

  const showToast = useCallback((message) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  }, []);

  const copyToClipboard = async (text, id = null) => {
    const onSuccess = () => {
      showToast(d.copied);
      if (id) {
        setCopiedPaymentId(id);
        setTimeout(() => setCopiedPaymentId(null), 2000);
      }
    };

    try {
      await navigator.clipboard.writeText(text);
      onSuccess();
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        onSuccess();
      } catch (err) {
        showToast(d.copyError);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      showToast(d.installHint);
    }
  };

  const handleDownloadVCard = () => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.master.name}\nTEL;TYPE=CELL:+37400000000\nTITLE:${d.spec}\nURL:${window.location.href}\nEND:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Contact_${data.master.name}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const openBooking = (service = null, slot = null) => {
    setBookingModal({ isOpen: true, service, slot });
    setFormState({ name: "", phone: "", isSubmitting: false, isSuccess: false });
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  const closeBooking = () => {
    setBookingModal({ isOpen: false, service: null, slot: null });
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));

    const payload = {
      name: formState.name,
      phone: `+374 ${formState.phone.replace(/^\+?374\s*/, '')}`, 
      service: bookingModal.service?.name || d.byAgreement,
      slot: bookingModal.slot ? `${bookingModal.slot.date} ${bookingModal.slot.time}` : d.willChooseInChat,
      timestamp: new Date().toISOString()
    };

    try {
      if (GOOGLE_APPS_SCRIPT_URL) {
        await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      
      setFormState(prev => ({ ...prev, isSubmitting: false, isSuccess: true }));
      setTimeout(closeBooking, 3000);
    } catch (error) {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
      showToast("Error. Please try again.");
    }
  };

  const categories = [...new Set(data.services.map(s => s.category))];
  const filteredServices = data.services.filter(s => s.category === activeCategory);

  return (
    <div className={`app-wrapper font-sans selection:bg-rose-200 antialiased flex flex-col relative transition-colors duration-300 ${t.appBg} ${t.appTextMain}`}>
      
      <Toast message={toast.message} isVisible={toast.visible} t={t} />

      {/* LANGUAGE SWITCHER */}
      <div 
        className={`absolute z-[90] flex items-center p-1 rounded-full backdrop-blur-md shadow-sm transition-colors duration-300 ${t.pillBg}`}
        style={{ top: 'calc(1rem + env(safe-area-inset-top))', left: '50%', transform: 'translateX(-50%)' }}
      >
        <button 
          onClick={() => setLang('hy')} 
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${lang === 'hy' ? t.tabActive : 'text-current opacity-60 hover:opacity-100 bg-transparent'}`}
        >
          ՀԱՅ
        </button>
        <button 
          onClick={() => setLang('ru')} 
          className={`px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-300 ${lang === 'ru' ? t.tabActive : 'text-current opacity-60 hover:opacity-100 bg-transparent'}`}
        >
          РУС
        </button>
      </div>

      {/* THEME SWITCHER */}
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
        <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom ${isThemeMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
          {THEME_OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => { setTheme(opt.id); setIsThemeMenuOpen(false); }}
              className={`w-10 h-10 rounded-full shadow-lg border-2 transition-transform active:scale-90 ${theme === opt.id ? 'scale-110' : 'scale-100'}`}
              style={{ backgroundColor: opt.color, borderColor: opt.border }}
              aria-label={`Switch to ${opt.id} theme`}
            />
          ))}
        </div>
        <button
          onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
          className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 active:scale-90 ${t.btnPrimary}`}
        >
          <Palette size={22} className="text-current" />
        </button>
      </div>

      {/* HERO SECTION */}
      <header className={`relative pt-20 pb-8 px-5 overflow-hidden flex flex-col items-center text-center rounded-b-[2.5rem] shadow-[0_4px_40px_-15px_rgba(0,0,0,0.05)] w-full transition-colors duration-300 ${t.headerBg}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-48 rounded-[100%] blur-3xl -z-10 transition-colors duration-700 ${t.glow}`} />
        
        <div className="relative mb-5">
          <div className={`absolute inset-0 rounded-full blur-md opacity-60 animate-pulse transition-colors duration-700 ${t.glow.replace('/20', '/80').replace('/15', '/80').replace('/10', '/80')}`} />
          <img 
            src={data.master.avatar} 
            alt={data.master.name} 
            className={`relative w-28 h-28 object-cover rounded-full border-4 shadow-lg object-top transition-colors duration-300 ${t.avatarBorder}`}
          />
          <div className={`absolute -bottom-1 -right-1 p-1 rounded-full shadow-sm transition-colors duration-300 ${t.headerBg}`}>
            <span className={`flex items-center justify-center w-6 h-6 rounded-full ${t.successBg}`}>
              <span className={`w-2.5 h-2.5 rounded-full animate-ping absolute opacity-75 ${t.successIcon.replace('text-', 'bg-')}`} />
              <span className={`w-2 h-2 rounded-full ${t.successIcon.replace('text-', 'bg-')}`} />
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-1">{data.master.name}</h1>
        <p className={`font-medium mb-4 transition-colors duration-300 ${t.appTextSub}`}>{data.master.specialization}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full backdrop-blur-sm transition-colors duration-300 ${t.badgeBg} ${t.badgeText}`}>
            <MapPin size={14} className="opacity-70" />
            {data.master.location}
          </span>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-300 ${t.statusBadgeBg} ${t.statusBadgeText}`}>
            {data.master.status}
          </span>
        </div>

        <button 
          onClick={() => openBooking()}
          className={`w-full max-w-xs py-4 px-6 rounded-2xl font-bold text-lg shadow-[0_8px_30px_-10px_rgba(0,0,0,0.2)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 mx-auto ${t.btnPrimary}`}
        >
          <Calendar size={20} />
          {d.bookOnline}
        </button>
      </header>

      <main className="px-5 mt-8 w-full max-w-md mx-auto space-y-10 flex-1 relative z-10">
        
        <section>
          <SectionTitle title={d.availableSlots} icon={Sparkles} t={t} />
          
          <div className="flex gap-3 overflow-x-auto pb-4 pt-1 -mx-5 px-5 snap-x scrollbar-hide">
            {data.availableDates.map((day, idx) => (
              <button
                key={day.id}
                onClick={() => setSelectedDateIdx(idx)}
                className={`snap-start flex-shrink-0 min-w-[85px] py-3.5 px-4 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
                  selectedDateIdx === idx
                    ? `${t.tabActive} shadow-lg border-transparent scale-105`
                    : `${t.tabInactive} hover:opacity-80 scale-100`
                }`}
              >
                {day.label && <span className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">{day.label}</span>}
                <span className={`text-sm font-bold whitespace-nowrap ${!day.label && 'mt-1'}`}>{day.date}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-1 animate-[slideUp_0.3s_ease-out]">
            {data.availableDates[selectedDateIdx].times.map((time, idx) => (
              <button
                key={idx}
                onClick={() => openBooking(null, { date: data.availableDates[selectedDateIdx].date, time: time })}
                className={`py-3 rounded-xl font-bold text-base transition-all duration-300 active:scale-95 border ${t.cardBg} ${t.cardBorder} ${t.cardTextMain} hover:border-[currentColor] shadow-sm`}
              >
                {time}
              </button>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title={d.priceList} icon={Star} t={t} />
          
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-5 px-5 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === category 
                    ? `${t.tabActive} shadow-md border-transparent` 
                    : t.tabInactive
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredServices.map(service => (
              <div 
                key={service.id} 
                className={`rounded-3xl p-5 border transition-all duration-300 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className={`font-bold leading-tight transition-colors duration-300 ${t.cardTextMain}`}>{service.name}</h3>
                  <span className={`font-black whitespace-nowrap transition-colors duration-300 ${t.cardTextMain}`}>{service.price.toLocaleString('ru-RU')} AMD</span>
                </div>
                
                <div className={`flex items-center gap-2 text-xs font-medium mb-3 transition-colors duration-300 ${t.cardTextSub}`}>
                  <Clock size={14} />
                  {service.duration}
                </div>
                
                <p className={`text-sm leading-relaxed mb-4 transition-colors duration-300 ${t.cardTextSub}`}>
                  {service.description}
                </p>
                
                <button 
                  onClick={() => openBooking(service)}
                  className={`w-full py-3 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 ${t.btnSecondary}`}
                >
                  {d.select}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title={d.paymentDetails} icon={CreditCard} t={t} />
          <div className={`rounded-3xl p-2 border flex flex-col gap-1 transition-colors duration-300 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}>
            {data.payments.map(payment => (
              <div key={payment.id} className="flex items-center justify-between p-3 rounded-2xl transition-colors hover:opacity-80">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${t.iconWrapper}`}>
                    <payment.icon size={20} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium transition-colors duration-300 ${t.cardTextSub}`}>{payment.name}</p>
                    <p className={`text-sm font-bold font-mono tracking-wide mt-0.5 transition-colors duration-300 ${t.cardTextMain}`}>{payment.number}</p>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(payment.number, payment.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-all duration-300 ${t.cardTextSub} hover:${t.cardTextMain.split(' ')[0]}`}
                >
                  {copiedPaymentId === payment.id ? (
                    <Check size={18} className={`${t.successIcon} scale-110 transition-transform`} />
                  ) : (
                    <Copy size={18} className="transition-transform" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title={d.rules} icon={ShieldAlert} t={t} />
          <div className={`rounded-3xl p-5 border transition-colors duration-300 ${t.policyBg} ${t.cardBorder}`}>
            <ul className="space-y-3">
              {data.policies.map((policy, idx) => (
                <li key={idx} className="flex gap-3 text-sm leading-snug">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-colors duration-300 ${t.bullet}`} />
                  <span className={`transition-colors duration-300 ${t.cardTextMain}`}>{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className={`mt-12 border-t py-10 px-5 flex flex-col items-center w-full transition-colors duration-300 relative z-10 pb-28 ${t.footerBg} ${t.footerBorder}`}>
        
        <div className="w-full max-w-xs space-y-3 mb-8">
          <button 
            onClick={() => setIsQrOpen(true)}
            className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}
          >
            <QrCode size={18} />
            {d.showQr}
          </button>
          
          <button 
            onClick={handleDownloadVCard}
            className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}
          >
            <UserPlus size={18} />
            {d.addToContacts}
          </button>
          
          <button 
            onClick={handleInstallPWA}
            className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary} border-2 ${t.inputBorder.replace('focus-within:', '')}`}
          >
            <Smartphone size={18} />
            {d.installApp}
          </button>
        </div>

        <h3 className={`font-bold mb-6 transition-colors duration-300 ${t.appTextMain}`}>{d.contactMe}</h3>
        
        <div className="flex justify-center gap-4 mb-8">
          <a href="#" className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${t.iconWrapper}`}>
            <Instagram size={22} />
          </a>
          <a href="#" className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${t.iconWrapper}`}>
            <Send size={22} className="-ml-1" />
          </a>
          <a href="#" className={`w-12 h-12 rounded-full flex items-center justify-center active:scale-90 transition-all duration-300 shadow-sm ${t.iconWrapper}`}>
            <Phone size={22} />
          </a>
        </div>
        <p className={`text-xs font-medium transition-colors duration-300 ${t.appTextSub}`}>© {new Date().getFullYear()} {data.master.name}. {d.rights}</p>
      </footer>

      {isQrOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsQrOpen(false)}
          />
          <div className={`relative w-full max-w-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-[slideUp_0.3s_ease-out] transition-colors duration-300 ${t.modalBg}`}>
            <button 
              onClick={() => setIsQrOpen(false)}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 ${t.iconWrapper}`}
            >
              <X size={18} />
            </button>
            <h3 className={`text-xl font-bold mb-6 text-center transition-colors duration-300 ${t.cardTextMain}`}>
              {d.scanQr}
            </h3>
            <div className="bg-white p-4 rounded-2xl shadow-inner w-64 h-64 flex items-center justify-center mb-2">
              <img src="/qr.png" alt="QR Code" className="w-full h-full object-contain" onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm text-center">QR.png not found</span>';
              }}/>
            </div>
          </div>
        </div>
      )}

      {bookingModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 h-[100dvh]">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeBooking}
          />
          
          <div className={`relative w-full max-w-lg rounded-t-[2rem] sm:rounded-3xl shadow-2xl p-6 modal-wrapper animate-[slideUp_0.3s_ease-out] transition-colors duration-300 ${t.modalBg}`}>
            <div className={`w-12 h-1.5 rounded-full mx-auto mb-6 sm:hidden transition-colors duration-300 ${t.grabber}`} />
            
            <button 
              onClick={closeBooking}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 ${t.iconWrapper}`}
            >
              <X size={18} />
            </button>

            {formState.isSuccess ? (
              <div className="py-10 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 ${t.successBg} ${t.successIcon}`}>
                  <Check size={32} />
                </div>
                <h3 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${t.cardTextMain}`}>{d.successTitle}</h3>
                <p className={`transition-colors duration-300 ${t.cardTextSub}`}>{d.successText}</p>
              </div>
            ) : (
              <>
                <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${t.cardTextMain}`}>{d.bookingTitle}</h2>
                
                <div className={`rounded-2xl p-4 mb-6 border transition-colors duration-300 ${t.inputBg} ${t.cardBorder}`}>
                  <div className={`flex justify-between items-center border-b pb-3 mb-3 ${t.cardBorder}`}>
                    <span className={`text-sm transition-colors duration-300 ${t.cardTextSub}`}>{d.service}</span>
                    <span className={`font-semibold text-right max-w-[60%] truncate transition-colors duration-300 ${t.cardTextMain}`}>
                      {bookingModal.service?.name || d.byAgreement}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm transition-colors duration-300 ${t.cardTextSub}`}>{d.time}</span>
                    <span className={`font-semibold text-right transition-colors duration-300 ${t.cardTextMain}`}>
                      {bookingModal.slot ? `${bookingModal.slot.date}, ${bookingModal.slot.time}` : d.willChooseInChat}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.yourName}</label>
                    <div className={`rounded-2xl border transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                      <input 
                        type="text" 
                        required
                        value={formState.name}
                        onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                        placeholder={d.namePlaceholder} 
                        className={`w-full px-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.phoneNum}</label>
                    <div className={`relative flex items-center rounded-2xl border transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                      <span className={`absolute left-4 font-semibold pointer-events-none select-none transition-colors duration-300 ${t.cardTextSub}`}>
                        +374
                      </span>
                      <input 
                        type="tel" 
                        required
                        value={formState.phone}
                        onChange={e => setFormState(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(__) ___-___" 
                        className={`w-full pl-16 pr-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={formState.isSubmitting}
                    className={`w-full mt-2 py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100 ${t.btnPrimary}`}
                  >
                    {formState.isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {d.sending}
                      </span>
                    ) : (
                      d.confirmBooking
                    )}
                  </button>
                  <p className={`text-[10px] text-center mt-3 opacity-60 transition-colors duration-300 ${t.cardTextSub}`}>
                    Нажимая кнопку, вы даете согласие на обработку персональных данных.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          -webkit-tap-highlight-color: transparent;
          background-color: ${t.appBg.replace('bg-[', '').replace(']', '')};
          transition: background-color 0.3s ease;
        }

        body {
          overscroll-behavior-y: none; 
        }

        .app-wrapper {
          min-height: 100dvh;
          width: 100%;
          overflow-x: hidden;
        }

        .modal-wrapper {
          padding-bottom: calc(1.5rem + env(safe-area-inset-bottom));
        }

        @keyframes slideUp {
          from { transform: translateY(10%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}