import React, { useState, useEffect, useCallback } from 'react';
import { 
  Calendar, Clock, MapPin, Sparkles, Copy, Check, 
  Phone, Send, X, ChevronDown, CreditCard, 
  Info, ShieldAlert, Star, Palette, QrCode, UserPlus, 
  Smartphone, ExternalLink
} from 'lucide-react';

function Instagram({ size = 24, className = '', ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
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

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyWGAIKHax3W0f9gHzsDrX2THVtI6IWmlqDozgV1j7KLhcRaNKY5AgvhJgOybQTZyBxyQ/exec'; 

const formatPhone = (val) => {
  let v = val.replace(/\D/g, '');
  if (!v) return '';
  if (v.startsWith('7')) {
    let res = '7';
    if (v.length > 1) res += ` (${v.substring(1, 4)}`;
    if (v.length > 4) res += `) ${v.substring(4, 7)}`;
    if (v.length > 7) res += `-${v.substring(7, 9)}`;
    if (v.length > 9) res += `-${v.substring(9, 11)}`;
    return res;
  }
  if (v.startsWith('374')) {
    let res = '374';
    if (v.length > 3) res += ` (${v.substring(3, 5)}`;
    if (v.length > 5) res += `) ${v.substring(5, 11)}`;
    return res;
  }
  if (v.length <= 2) return v;
  if (v.startsWith('3') || v.startsWith('4') || v.startsWith('8') || v.startsWith('9')) {
     let res = v.substring(0, 2);
     if (v.length > 2) res += ` (${v.substring(2, 5)}`;
     if (v.length > 5) res += `) ${v.substring(5, 8)}`;
     if (v.length > 8) res += `-${v.substring(8, 14)}`;
     return res;
  }
  let res = v.substring(0, 3);
  if (v.length > 3) res += ` (${v.substring(3, 6)}`;
  if (v.length > 6) res += `) ${v.substring(6, 10)}`;
  if (v.length > 10) res += `-${v.substring(10, 15)}`;
  return res;
};

const DICT = {
  hy: {
    spec: "Մատնահարդար և Էսթետիկայի Վարպետ",
    location: "Էջմիածին, Մաշտոցի փող., 48",
    status: "Ընդունումը գրանցումով",
    bookOnline: "Գրանցվել առցանց",
    availableSlots: "Ազատ պատուհաններ",
    nearestWindows: "Մոտակա ազատ պատուհանները՝",
    availableDatesInfo: "Հստակ ժամը և ծառայությունը ընտրվում են գրանցման ժամանակ:",
    priceList: "Գնացուցակ",
    paymentDetails: "Վճարման տվյալներ",
    rules: "Ընդունելության կանոններ",
    leaveReview: "Թողնել կարծիք",
    contactMe: "Կապվել ինձ հետ",
    rights: "Բոլոր իրավունքները պաշտպանված են:",
    addToContacts: "Պահպանել կոնտակտներում",
    showQr: "Ցույց տալ QR կոդը",
    installApp: "Տեղադրել հավելվածը (PWA)",
    scanQr: "Սկանավորեք արագ մուտքի համար",
    bookingTitle: "Գրանցման ձևակերպում",
    service: "Ծառայություն (մինչև 2)",
    time: "Ժամանակ",
    yourName: "Ձեր անունը",
    namePlaceholder: "Օրինակ՝ Աննա",
    phoneNum: "Հեռախոսահամար",
    phonePlaceholder: "374 (99) 123456",
    commentLabel: "Մեկնաբանություն (ընտրովի)",
    commentPlaceholder: "Ցանկություններ, հարցեր...",
    waCheckbox: "WhatsApp-ը նույն համարով է",
    waLabel: "WhatsApp Համար",
    waPlaceholder: "374 (99) 123456",
    confirmBooking: "Հաստատել գրանցումը",
    sending: "Ուղարկվում է...",
    successTitle: "Հայտը ուղարկված է!",
    successText: "Շնորհակալություն: Ես կկապվեմ ձեզ հետ շուտով հաստատման համար:",
    copied: "Պատճենված է",
    copyError: "Պատճենման սխալ",
    submitError: "Ուղարկման սխալ: Ստուգեք ինտերնետ կապը:",
    slotTakenError: "Ներողություն, այս ժամն արդեն զբաղված է: Խնդրում ենք ընտրել այլ ժամ:",
    installHint: 'Սեղմեք "Կիսվել" և ընտրեք "Ավելացնել էկրանին"',
    loadingSlots: "Համաժամացում...",
    noSlots: "Այս պահին ազատ պատուհաններ չկան կամ վարպետը արձակուրդում է 🌴 Մոտ օրերս նոր պատուհաններ կավելանան:",
    upcomingVacation: "Շուտով արձակուրդ է 🌴 Հասցրեք գրանցվել մնացած ազատ օրերին!",
    upcomingVacationDates: (start, end) => `Շուտով արձակուրդ է 🌴 (${start} - ${end}): Հասցրեք գրանցվել վերջին ազատ օրերին!`,
    maxServices: "Կարող եք ընտրել առավելագույնը 2 ծառայություն",
    s_manicure: "Մատնահարդարում",
    s_pedicure: "Պեդիկյուր",
    s_design: "Դիզայն և խնամք",
    today: "Այսօր",
    tomorrow: "Վաղը",
    pol1: "Կանխավճար 2000 AMD ժամանակը ֆիքսելու համար:",
    pol2: "Ավելի քան 15 րոպե ուշացում = գրանցման չեղարկում:",
    pol3: "Խնդրում ենք գալ առանց ուղեկցողների:",
    pol4: "Ծածկույթի երաշխիք — 5 օր:",
    maps: "Քարտեզներ",
    consent: "Սեղմելով կոճակը՝ դուք համաձայնվում եք անձնական տվյալների մշակմանը:",
    slotsOpenLater: "Նոր պատուհաններ կավելանան ավելի ուշ:"
  },
  ru: {
    spec: "Nail & Aesthetic Master",
    location: "г. Эчмиадзин, ул. Маштоца, 48",
    status: "Прием по записи",
    bookOnline: "Записаться онлайн",
    availableSlots: "Свободные окна",
    nearestWindows: "Ближайшие свободные окна есть на:",
    availableDatesInfo: "Точное время и услуга выбираются при оформлении записи.",
    priceList: "Прайс-лист",
    paymentDetails: "Реквизиты для оплаты",
    rules: "Правила приема",
    leaveReview: "Оставить отзыв",
    contactMe: "Связаться со мной",
    rights: "Все права защищены.",
    addToContacts: "Добавить в контакты",
    showQr: "Показать QR-код",
    installApp: "Установить приложение (PWA)",
    scanQr: "Сканируйте для быстрого доступа",
    bookingTitle: "Оформление записи",
    service: "Услуга (до 2-х)",
    time: "Время",
    yourName: "Ваше Имя",
    namePlaceholder: "Например, Анна",
    phoneNum: "Номер телефона",
    phonePlaceholder: "374 (99) 123456",
    commentLabel: "Комментарий (необязательно)",
    commentPlaceholder: "Особенности, пожелания...",
    waCheckbox: "WhatsApp на этом же номере",
    waLabel: "Номер WhatsApp",
    waPlaceholder: "374 (99) 123456",
    confirmBooking: "Подтвердить запись",
    sending: "Оформляем...",
    successTitle: "Заявка отправлена!",
    successText: "Спасибо! Я свяжусь с вами в ближайшее время для подтверждения записи.",
    copied: "Скопировано в буфер!",
    copyError: "Ошибка копирования",
    submitError: "Ошибка отправки. Проверьте интернет или попробуйте позже.",
    slotTakenError: "К сожалению, это время только что заняли. Пожалуйста, выберите другое.",
    installHint: 'Нажмите "Поделиться" -> "На экран Домой"',
    loadingSlots: "Синхронизация расписания...",
    noSlots: "Свободных окон пока нет или мастер в отпуске 🌴 Окошки скоро появятся.",
    upcomingVacation: "Скоро отпуск 🌴 Успейте занять последние свободные окна!",
    upcomingVacationDates: (start, end) => `Скоро отпуск 🌴 (${start} - ${end}). Успейте занять последние окна!`,
    maxServices: "Можно выбрать максимум 2 услуги",
    s_manicure: "Маникюр",
    s_pedicure: "Педикюр",
    s_design: "Дизайн & Уход",
    today: "Сегодня",
    tomorrow: "Завтра",
    pol1: "Предоплата 2000 AMD для фиксации времени.",
    pol2: "Опоздание более 15 минут = отмена записи (предоплата не возвращается).",
    pol3: "Приходите, пожалуйста, без сопровождающих.",
    pol4: "Гарантия на покрытие — 5 дней.",
    maps: "Карты",
    consent: "Нажимая кнопку, вы даете согласие на обработку персональных данных.",
    slotsOpenLater: "Окошки откроются позже."
  },
  en: {
    spec: "Nail & Aesthetic Master",
    location: "Echmiadzin, Mashtots st., 48",
    status: "By appointment",
    bookOnline: "Book Online",
    availableSlots: "Available Slots",
    nearestWindows: "Nearest available slots:",
    availableDatesInfo: "Exact time and service are selected during booking.",
    priceList: "Price List",
    paymentDetails: "Payment Details",
    rules: "Booking Rules",
    leaveReview: "Leave a Review",
    contactMe: "Contact Me",
    rights: "All rights reserved.",
    addToContacts: "Save Contact",
    showQr: "Show QR Code",
    installApp: "Install App (PWA)",
    scanQr: "Scan for quick access",
    bookingTitle: "Book Appointment",
    service: "Service (up to 2)",
    time: "Time",
    yourName: "Your Name",
    namePlaceholder: "e.g., Anna",
    phoneNum: "Phone Number",
    phonePlaceholder: "374 (99) 123456",
    commentLabel: "Comment (optional)",
    commentPlaceholder: "Preferences, questions...",
    waCheckbox: "WhatsApp on the same number",
    waLabel: "WhatsApp Number",
    waPlaceholder: "374 (99) 123456",
    confirmBooking: "Confirm Booking",
    sending: "Sending...",
    successTitle: "Request Sent!",
    successText: "Thank you! I will contact you shortly to confirm the appointment.",
    copied: "Copied!",
    copyError: "Copy error",
    submitError: "Sending error. Check your connection or try again later.",
    slotTakenError: "Sorry, this slot was just taken. Please choose another time.",
    installHint: 'Tap "Share" and select "Add to Home Screen"',
    loadingSlots: "Syncing schedule...",
    noSlots: "No available slots at the moment or the master is on vacation 🌴 New slots will appear soon.",
    upcomingVacation: "Upcoming vacation 🌴 Book the last available slots!",
    upcomingVacationDates: (start, end) => `Upcoming vacation 🌴 (${start} - ${end}): Book the last slots!`,
    maxServices: "You can select a maximum of 2 services",
    s_manicure: "Manicure",
    s_pedicure: "Pedicure",
    s_design: "Design & Care",
    today: "Today",
    tomorrow: "Tomorrow",
    pol1: "A 2000 AMD deposit is required to secure your time.",
    pol2: "Being more than 15 minutes late = cancellation.",
    pol3: "Please come without companions.",
    pol4: "Coverage guarantee — 5 days.",
    maps: "Maps",
    consent: "By clicking the button, you consent to the processing of personal data.",
    slotsOpenLater: "Slots will open later."
  }
};

const getMockData = (lang) => ({
  master: {
    name: lang === 'hy' ? "Անի Սարգսյան" : (lang === 'en' ? "Ani Sargsyan" : "Ани Саркисян"),
    specialization: DICT[lang].spec,
    location: DICT[lang].location,
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Эчмиадзин+Маштоца+48",
    avatar: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
    status: DICT[lang].status
  },
  services: [
    {
      id: "s1",
      category: DICT[lang].s_manicure,
      name: lang === 'hy' ? "Ապարատային մատնահարդարում + Գել-լաք" : (lang === 'en' ? "Hardware Manicure + Gel Polish" : "Аппаратный маникюр + Гель-лак"),
      duration: lang === 'hy' ? "1.5 - 2 ժամ" : (lang === 'en' ? "1.5 - 2 hours" : "1.5 - 2 часа"),
      price: 8000,
      description: lang === 'hy' ? "Հեռացում, համակցված մատնահարդարում, եղունգի թիթեղի հարթեցում և մեկ գույնով ծածկում:" : (lang === 'en' ? "Removal, combined manicure, nail plate leveling, and solid color coating." : "Снятие, комбинированный маникюр, выравнивание ногтевой пластины и покрытие в один тон.")
    },
    {
      id: "s2",
      category: DICT[lang].s_manicure,
      name: lang === 'hy' ? "Եղունգների երկարացում" : (lang === 'en' ? "Nail Extension" : "Наращивание ногтей"),
      duration: lang === 'hy' ? "2.5 - 3 ժամ" : (lang === 'en' ? "2.5 - 3 hours" : "2.5 - 3 часа"),
      price: 13000,
      description: lang === 'hy' ? "Եղունգների մոդելավորում պոլիգելով/գելով, ապարատային մատնահարդարում, գել-լաքի ծածկույթ:" : (lang === 'en' ? "Nail modeling with polygel/gel, hardware manicure, gel polish coating." : "Моделирование ногтей полигелем/гелем, аппаратный маникюр, покрытие гель-лаком.")
    },
    {
      id: "s3",
      category: DICT[lang].s_pedicure,
      name: lang === 'hy' ? "Smart-պեդիկյուր ծածկույթով" : (lang === 'en' ? "Smart Pedicure with Coating" : "Smart-педикюр с покрытием"),
      duration: lang === 'hy' ? "1.5 ժամ" : (lang === 'en' ? "1.5 hours" : "1.5 часа"),
      price: 10000,
      description: lang === 'hy' ? "Ոտնաթաթի ամբողջական մշակում սկավառակներով, մատների մշակում և գել-լաքի ծածկույթ:" : (lang === 'en' ? "Full foot treatment with discs, toe treatment, and gel polish coating." : "Полная обработка стопы дисками, обработка пальчиков и покрытие гель-лаком.")
    },
    {
      id: "s4",
      category: DICT[lang].s_pedicure,
      name: lang === 'hy' ? "Էքսպրես պեդիկյուր" : (lang === 'en' ? "Express Pedicure" : "Экспресс-педикюр"),
      duration: lang === 'hy' ? "1 ժամ" : (lang === 'en' ? "1 hour" : "1 час"),
      price: 7000,
      description: lang === 'hy' ? "Միայն մատների մշակում (առանց ոտնաթաթի) + գել-լաքի ծածկույթ:" : (lang === 'en' ? "Toe treatment only (without foot) + gel polish coating." : "Обработка только пальчиков (без стопы) + покрытие гель-лаком.")
    },
    {
      id: "s5",
      category: DICT[lang].s_design,
      name: lang === 'hy' ? "Ֆրենչ / Լուսնային դիզայն" : (lang === 'en' ? "French / Moon Design" : "Френч / Лунный дизайн"),
      duration: lang === 'en' ? "+ 30 mins" : (lang === 'hy' ? "+ 30 րոպե" : "+ 30 минут"),
      price: 2000,
      description: lang === 'hy' ? "Դասական կամ գունավոր ֆրենչ բոլոր մատների վրա:" : (lang === 'en' ? "Classic or colored French on all fingers." : "Классический или цветной френч на все пальцы.")
    },
    {
      id: "s6",
      category: DICT[lang].s_design,
      name: lang === 'hy' ? "Ամրացում ակրիլային փոշով" : (lang === 'en' ? "Acrylic Powder Strengthening" : "Укрепление акриловой пудрой"),
      duration: lang === 'en' ? "+ 15 mins" : (lang === 'hy' ? "+ 15 րոպե" : "+ 15 минут"),
      price: 1000,
      description: lang === 'hy' ? "Լրացուցիչ ամրացում բարակ և փխրուն եղունգների համար:" : (lang === 'en' ? "Additional strengthening for thin and brittle nails." : "Дополнительное укрепление для тонких и ломких ногтей.")
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
  obsidian: {
    appBg: "bg-[#0F0F11]", appTextMain: "text-[#F4E8C1]", appTextSub: "text-[#F4E8C1]/60", headerBg: "bg-[#18181C]",
    avatarBorder: "border-[#18181C]", glow: "bg-[#D4AF37]/15", cardBg: "bg-[#18181C]", cardBorder: "border-[#2A2A30]",
    cardTextMain: "text-[#F4E8C1]", cardTextSub: "text-[#F4E8C1]/50", btnPrimary: "bg-[#D4AF37] text-black font-semibold shadow-[#D4AF37]/10",
    accentText: "text-[#D4AF37]", accentBg: "bg-[#D4AF37]/10", badgeBg: "bg-[#2A2A30]", badgeText: "text-[#F4E8C1]",
    statusBadgeBg: "bg-[#D4AF37]/10", statusBadgeText: "text-[#D4AF37]", tabActive: "bg-[#D4AF37] text-black",
    tabInactive: "bg-[#18181C] text-[#F4E8C1]/60 border-[#2A2A30]", btnSecondary: "bg-[#2A2A30] text-[#F4E8C1] hover:bg-[#3A3A40]",
    iconWrapper: "bg-[#2A2A30] text-[#D4AF37]", policyBg: "bg-[#18181C]", bullet: "bg-[#D4AF37]", footerBg: "bg-[#18181C]",
    footerBorder: "border-[#2A2A30]", modalBg: "bg-[#18181C]", grabber: "bg-[#2A2A30]", inputBg: "bg-[#0F0F11] focus-within:bg-[#18181C]",
    inputBorder: "border-transparent focus-within:border-[#D4AF37]", inputFocusRing: "focus-within:ring-[#D4AF37]/30",
    inputText: "text-[#F4E8C1]", successIcon: "text-emerald-400", successBg: "bg-emerald-400/10", statusDotBg: "bg-emerald-400",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.4)]", pillBg: "bg-white/5", skeletonBg: "bg-white/5",
  },
  emerald: {
    appBg: "bg-[#0B1D17]", appTextMain: "text-[#F1F5F9]", appTextSub: "text-[#F1F5F9]/60", headerBg: "bg-[#132E25]",
    avatarBorder: "border-[#132E25]", glow: "bg-[#5EEAD4]/10", cardBg: "bg-[#132E25]", cardBorder: "border-[#1F4538]",
    cardTextMain: "text-[#F1F5F9]", cardTextSub: "text-[#F1F5F9]/50", btnPrimary: "bg-[#5EEAD4] text-[#0B1D17] font-semibold shadow-[#5EEAD4]/10",
    accentText: "text-[#5EEAD4]", accentBg: "bg-[#5EEAD4]/10", badgeBg: "bg-[#1F4538]", badgeText: "text-[#F1F5F9]",
    statusBadgeBg: "bg-[#5EEAD4]/10", statusBadgeText: "text-[#5EEAD4]", tabActive: "bg-[#5EEAD4] text-[#0B1D17]",
    tabInactive: "bg-[#132E25] text-[#F1F5F9]/60 border-[#1F4538]", btnSecondary: "bg-[#1F4538] text-[#F1F5F9] hover:bg-[#2A5A4A]",
    iconWrapper: "bg-[#1F4538] text-[#5EEAD4]", policyBg: "bg-[#132E25]", bullet: "bg-[#5EEAD4]", footerBg: "bg-[#132E25]",
    footerBorder: "border-[#1F4538]", modalBg: "bg-[#132E25]", grabber: "bg-[#1F4538]", inputBg: "bg-[#0B1D17] focus-within:bg-[#132E25]",
    inputBorder: "border-transparent focus-within:border-[#5EEAD4]", inputFocusRing: "focus-within:ring-[#5EEAD4]/30",
    inputText: "text-[#F1F5F9]", successIcon: "text-[#5EEAD4]", successBg: "bg-[#5EEAD4]/10", statusDotBg: "bg-[#5EEAD4]",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.3)]", pillBg: "bg-white/5", skeletonBg: "bg-white/5",
  },
  rose: {
    appBg: "bg-[#FCF7F8]", appTextMain: "text-[#5C3A41]", appTextSub: "text-[#5C3A41]/70", headerBg: "bg-white",
    avatarBorder: "border-white", glow: "bg-[#F2A4B3]/20", cardBg: "bg-white", cardBorder: "border-[#F7DADD]",
    cardTextMain: "text-[#5C3A41]", cardTextSub: "text-[#5C3A41]/60", btnPrimary: "bg-[#F2A4B3] text-white font-semibold shadow-[#F2A4B3]/30",
    accentText: "text-[#E07A8F]", accentBg: "bg-[#F2A4B3]/15", badgeBg: "bg-[#F2A4B3]/10", badgeText: "text-[#E07A8F]",
    statusBadgeBg: "bg-[#F2A4B3]/15", statusBadgeText: "text-[#E07A8F]", tabActive: "bg-[#5C3A41] text-white",
    tabInactive: "bg-white text-[#5C3A41]/70 border-[#F7DADD]", btnSecondary: "bg-[#FCF7F8] text-[#5C3A41] hover:bg-[#F7EAEB]",
    iconWrapper: "bg-[#FCF7F8] text-[#E07A8F]", policyBg: "bg-[#F2A4B3]/5", bullet: "bg-[#E07A8F]", footerBg: "bg-white",
    footerBorder: "border-[#F7DADD]", modalBg: "bg-white", grabber: "bg-[#F7DADD]", inputBg: "bg-[#FCF7F8] focus-within:bg-white",
    inputBorder: "border-transparent focus-within:border-[#F2A4B3]", inputFocusRing: "focus-within:ring-[#F2A4B3]/30",
    inputText: "text-[#5C3A41]", successIcon: "text-[#E07A8F]", successBg: "bg-[#F2A4B3]/20", statusDotBg: "bg-[#E07A8F]",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(242,164,179,0.15)]", pillBg: "bg-[#F2A4B3]/15", skeletonBg: "bg-[#F7DADD]/50",
  },
  lavender: {
    appBg: "bg-[#F9F9FE]", appTextMain: "text-[#3D3B4A]", appTextSub: "text-[#3D3B4A]/70", headerBg: "bg-white",
    avatarBorder: "border-white", glow: "bg-[#B3A4F2]/20", cardBg: "bg-white", cardBorder: "border-[#E4DDF7]",
    cardTextMain: "text-[#3D3B4A]", cardTextSub: "text-[#3D3B4A]/60", btnPrimary: "bg-[#B3A4F2] text-white font-semibold shadow-[#B3A4F2]/30",
    accentText: "text-[#8E79DF]", accentBg: "bg-[#B3A4F2]/15", badgeBg: "bg-[#B3A4F2]/10", badgeText: "text-[#8E79DF]",
    statusBadgeBg: "bg-[#B3A4F2]/15", statusBadgeText: "text-[#8E79DF]", tabActive: "bg-[#3D3B4A] text-white",
    tabInactive: "bg-white text-[#3D3B4A]/70 border-[#E4DDF7]", btnSecondary: "bg-[#F9F9FE] text-[#3D3B4A] hover:bg-[#EBEAF5]",
    iconWrapper: "bg-[#F9F9FE] text-[#8E79DF]", policyBg: "bg-[#B3A4F2]/5", bullet: "bg-[#8E79DF]", footerBg: "bg-white",
    footerBorder: "border-[#E4DDF7]", modalBg: "bg-white", grabber: "bg-[#E4DDF7]", inputBg: "bg-[#F9F9FE] focus-within:bg-white",
    inputBorder: "border-transparent focus-within:border-[#B3A4F2]", inputFocusRing: "focus-within:ring-[#B3A4F2]/30",
    inputText: "text-[#3D3B4A]", successIcon: "text-[#8E79DF]", successBg: "bg-[#B3A4F2]/20", statusDotBg: "bg-[#8E79DF]",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(179,164,242,0.15)]", pillBg: "bg-[#B3A4F2]/15", skeletonBg: "bg-[#E4DDF7]/50",
  },
  carbon: {
    appBg: "bg-[#111111]", appTextMain: "text-[#EAEAEA]", appTextSub: "text-[#A0A0A0]", headerBg: "bg-[#1A1A1A]",
    avatarBorder: "border-[#1A1A1A]", glow: "bg-[#FFFFFF]/5", cardBg: "bg-[#1A1A1A]", cardBorder: "border-[#2A2A2A]",
    cardTextMain: "text-[#EAEAEA]", cardTextSub: "text-[#A0A0A0]", btnPrimary: "bg-white text-black font-semibold shadow-white/10",
    accentText: "text-white", accentBg: "bg-white/10", badgeBg: "bg-[#2A2A2A]", badgeText: "text-[#EAEAEA]",
    statusBadgeBg: "bg-white/10", statusBadgeText: "text-white", tabActive: "bg-white text-black",
    tabInactive: "bg-[#1A1A1A] text-[#A0A0A0] border-[#2A2A2A]", btnSecondary: "bg-[#2A2A2A] text-[#EAEAEA] hover:bg-[#333333]",
    iconWrapper: "bg-[#2A2A2A] text-white", policyBg: "bg-[#1A1A1A]", bullet: "bg-white", footerBg: "bg-[#1A1A1A]",
    footerBorder: "border-[#2A2A2A]", modalBg: "bg-[#1A1A1A]", grabber: "bg-[#2A2A2A]", inputBg: "bg-[#111111] focus-within:bg-[#1A1A1A]",
    inputBorder: "border-transparent focus-within:border-white/50", inputFocusRing: "focus-within:ring-white/20",
    inputText: "text-[#EAEAEA]", successIcon: "text-white", successBg: "bg-white/20", statusDotBg: "bg-white",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)]", pillBg: "bg-white/10", skeletonBg: "bg-white/5",
  },
  cognac: {
    appBg: "bg-[#140D0B]", appTextMain: "text-[#F3E6D9]", appTextSub: "text-[#F3E6D9]/60", headerBg: "bg-[#1C1310]",
    avatarBorder: "border-[#1C1310]", glow: "bg-[#D97736]/15", cardBg: "bg-[#1C1310]", cardBorder: "border-[#2D1F1A]",
    cardTextMain: "text-[#F3E6D9]", cardTextSub: "text-[#F3E6D9]/50", btnPrimary: "bg-[#D97736] text-white font-semibold shadow-[#D97736]/20",
    accentText: "text-[#D97736]", accentBg: "bg-[#D97736]/10", badgeBg: "bg-[#2D1F1A]", badgeText: "text-[#F3E6D9]",
    statusBadgeBg: "bg-[#D97736]/10", statusBadgeText: "text-[#D97736]", tabActive: "bg-[#D97736] text-white",
    tabInactive: "bg-[#1C1310] text-[#F3E6D9]/60 border-[#2D1F1A]", btnSecondary: "bg-[#2D1F1A] text-[#F3E6D9] hover:bg-[#3A2822]",
    iconWrapper: "bg-[#2D1F1A] text-[#D97736]", policyBg: "bg-[#1C1310]", bullet: "bg-[#D97736]", footerBg: "bg-[#1C1310]",
    footerBorder: "border-[#2D1F1A]", modalBg: "bg-[#1C1310]", grabber: "bg-[#2D1F1A]", inputBg: "bg-[#140D0B] focus-within:bg-[#1C1310]",
    inputBorder: "border-transparent focus-within:border-[#D97736]", inputFocusRing: "focus-within:ring-[#D97736]/30",
    inputText: "text-[#F3E6D9]", successIcon: "text-[#D97736]", successBg: "bg-[#D97736]/15", statusDotBg: "bg-[#D97736]",
    cardShadow: "shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)]", pillBg: "bg-white/5", skeletonBg: "bg-white/5",
  }
};

const THEME_OPTIONS = [
  { id: 'obsidian', color: '#0F0F11', border: '#D4AF37' },
  { id: 'carbon', color: '#111111', border: '#FFFFFF' },
  { id: 'cognac', color: '#140D0B', border: '#D97736' },
  { id: 'emerald', color: '#0B1D17', border: '#5EEAD4' },
  { id: 'rose', color: '#FCF7F8', border: '#F2A4B3' },
  { id: 'lavender', color: '#F9F9FE', border: '#B3A4F2' }
];

const Toast = ({ message, isVisible, isError = false }) => (
  <div 
    className={`fixed left-1/2 -translate-x-1/2 z-[200] px-5 py-3.5 rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center gap-3 transition-all duration-400 ease-out border-2 bg-zinc-900 text-white border-zinc-700 ${
      isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-12 scale-90 pointer-events-none'
    }`}
    style={{ top: 'calc(1.5rem + env(safe-area-inset-top))' }}
  >
    <div className={`rounded-full p-1 text-black flex-shrink-0 flex items-center justify-center ${isError ? 'bg-red-500' : 'bg-emerald-500'}`}>
      {isError ? <X size={14} strokeWidth={4} className="text-white" /> : <Check size={14} strokeWidth={4} />}
    </div>
    <span className="text-sm font-bold whitespace-nowrap tracking-wide max-w-[250px] overflow-hidden text-ellipsis">{message}</span>
  </div>
);

const SectionTitle = ({ title, icon: Icon, t }) => (
  <div className="flex items-center gap-2 mb-4 px-1">
    {Icon && <Icon size={20} className={t.appTextMain} />}
    <h2 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${t.appTextMain}`}>{title}</h2>
  </div>
);

const parseSheetDate = (dateStr, lang) => {
  const [d, m, y] = dateStr.split('.');
  const dateObj = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let label = "";
  if (dateObj.getTime() === today.getTime()) label = DICT[lang].today;
  else if (dateObj.getTime() === tomorrow.getTime()) label = DICT[lang].tomorrow;

  const monthsRu = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
  const monthsHy = ["Հնվ", "Փտվ", "Մար", "Ապր", "Մայ", "Հնս", "Հլս", "Օգս", "Սեպ", "Հոկ", "Նոյ", "Դեկ"];
  const monthsEn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const shortDate = `${parseInt(d)} ${lang === 'ru' ? monthsRu[dateObj.getMonth()] : (lang === 'en' ? monthsEn[dateObj.getMonth()] : monthsHy[dateObj.getMonth()])}`;

  return { shortDate, label, fullDate: dateStr };
};

export default function App() {
  const [lang, setLang] = useState('ru'); 
  const d = DICT[lang]; 
  const data = getMockData(lang); 

  const [rawDates, setRawDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [showFab, setShowFab] = useState(false);

  const [activeCategory, setActiveCategory] = useState(data.services[0].category);
  const [toast, setToast] = useState({ visible: false, message: "", isError: false });
  const [copiedPaymentId, setCopiedPaymentId] = useState(null);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [theme, setTheme] = useState(() => {
    let saved = localStorage.getItem('app-theme');
    if (!THEMES[saved]) saved = 'obsidian';
    return saved;
  });

  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    services: [], 
    slot: null,
  });

  const [formState, setFormState] = useState({
    name: "", phone: "", whatsapp: "", sameAsPhone: true, comment: "", isSubmitting: false, isSuccess: false
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

  const t = THEMES[theme] || THEMES['obsidian'];

  useEffect(() => {
    const bgTopColor = t.appBg.replace('bg-[', '').replace(']', '');
    const bgBottomColor = t.footerBg.replace('bg-[', '').replace(']', '');
    
    document.documentElement.style.backgroundColor = bgTopColor;
    document.body.style.backgroundColor = bgBottomColor;
  }, [t.appBg, t.footerBg]);

  useEffect(() => {
    const handleScroll = () => setShowFab(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetched) return;
    const fetchSlots = async () => {
      setIsLoadingDates(true);
      try {
        const res = await fetch(GOOGLE_APPS_SCRIPT_URL);
        const fetchedData = await res.json();
        if (Array.isArray(fetchedData) && fetchedData.length > 0) setRawDates(fetchedData);
        else setRawDates([]);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        setRawDates([]);
      } finally {
        setIsLoadingDates(false);
        setIsFetched(true);
      }
    };
    fetchSlots();
  }, [isFetched]); 

  useEffect(() => {
    if (rawDates.length > 0) {
      const parsedDates = rawDates
        .filter(dayObj => dayObj.times && dayObj.times[0] !== 'отпуск')
        .map((dayObj, i) => {
          const parsed = parseSheetDate(dayObj.date, lang);
          return { id: dayObj.id || i, fullDate: parsed.fullDate, shortDate: parsed.shortDate, label: parsed.label, times: dayObj.times };
        });
      setAvailableDates(parsedDates);
    } else {
      setAvailableDates([]);
    }
  }, [rawDates, lang]);

  useEffect(() => {
    const close = () => setOpenDropdown(null);
    if (openDropdown) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [openDropdown]);

  const showToast = useCallback((message, isError = false) => {
    setToast({ visible: true, message, isError });
    setTimeout(() => setToast({ visible: false, message: "", isError: false }), 4000);
  }, []);

  const copyToClipboard = async (text, id = null) => {
    const cleanText = text.replace(/\s/g, ''); 
    const onSuccess = () => {
      showToast(d.copied);
      if (id) {
        setCopiedPaymentId(id);
        setTimeout(() => setCopiedPaymentId(current => current === id ? null : current), 2000);
      }
    };
    try {
      await navigator.clipboard.writeText(cleanText);
      onSuccess();
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = cleanText;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        onSuccess();
      } catch (err) {
        showToast(d.copyError, true);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
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

  const openBooking = () => {
    const defaultService = data.services[0];
    let defaultSlot = null;
    if (availableDates.length > 0) {
      defaultSlot = { fullDate: availableDates[0].fullDate, displayDate: availableDates[0].shortDate, time: availableDates[0].times[0] };
    }
    setBookingModal({ isOpen: true, services: [defaultService], slot: defaultSlot });
    setFormState({ name: "", phone: "", whatsapp: "", sameAsPhone: true, comment: "", isSubmitting: false, isSuccess: false });
    
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  };

  const closeBooking = () => {
    setBookingModal({ isOpen: false, services: [], slot: null });
    setOpenDropdown(null);
    
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, isSubmitting: true }));
    
    const cleanPhone = `+${formState.phone.replace(/\D/g, '')}`;
    const cleanWa = formState.sameAsPhone ? cleanPhone : (formState.whatsapp ? `+${formState.whatsapp.replace(/\D/g, '')}` : '');
    const combinedServices = bookingModal.services.map(s => s.name).join(' + ');
    
    const payload = {
      name: formState.name,
      phone: cleanPhone, 
      whatsapp: cleanWa,
      comment: formState.comment,
      service: combinedServices,
      slot: `${bookingModal.slot?.fullDate} ${bookingModal.slot?.time}`,
      timestamp: new Date().toISOString()
    };

    if (GOOGLE_APPS_SCRIPT_URL) {
      try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          redirect: 'follow',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8', 
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        if (responseData.status === 'success') {
          setFormState(prev => ({ ...prev, isSubmitting: false, isSuccess: true }));
          
          if (bookingModal.slot) {
             setAvailableDates(prevDates => {
                const newDates = [...prevDates];
                const dateObj = newDates.find(day => day.fullDate === bookingModal.slot.fullDate);
                if (dateObj) {
                   dateObj.times = dateObj.times.filter(t => t !== bookingModal.slot.time);
                }
                return newDates.filter(day => day.times.length > 0);
             });
          }
          
          setTimeout(closeBooking, 3000);
        } else if (responseData.status === 'error' && responseData.message === 'SLOT_TAKEN') {
          throw new Error(d.slotTakenError);
        } else {
          throw new Error(responseData.message || 'Server error');
        }
      } catch (err) {
        console.error("Ошибка отправки:", err);
        setFormState(prev => ({ ...prev, isSubmitting: false }));
        if (err.message === d.slotTakenError) {
           showToast(err.message, true);
        } else {
           showToast(d.submitError || "Ошибка отправки", true);
        }
      }
    }
  };

  const vacationDays = rawDates.filter(d => d.times && d.times[0] === 'отпуск');
  let showBanner = false;
  let bannerText = d.upcomingVacation;

  if (vacationDays.length > 0) {
    showBanner = true;
    const firstDay = parseSheetDate(vacationDays[0].date, lang).shortDate;
    const lastDay = parseSheetDate(vacationDays[vacationDays.length - 1].date, lang).shortDate;
    bannerText = d.upcomingVacationDates(firstDay, lastDay);
  } else if (availableDates.length > 0 && availableDates.length <= 5) {
    showBanner = true;
    bannerText = d.upcomingVacation;
  }

  const categories = [...new Set(data.services.map(s => s.category))];
  const filteredServices = data.services.filter(s => s.category === activeCategory);

  return (
    <div className={`app-wrapper font-sans selection:bg-rose-200 antialiased flex flex-col relative transition-colors duration-300 min-h-[100dvh] w-full overflow-x-hidden ${t.appBg} ${t.appTextMain}`}>
      <Toast message={toast.message} isVisible={toast.visible} isError={toast.isError} />

      <div 
        className={`absolute z-[80] flex items-center p-1 rounded-full backdrop-blur-md shadow-sm transition-colors duration-300 ${t.pillBg}`}
        style={{ top: 'calc(1rem + env(safe-area-inset-top))', right: '1.25rem' }}
      >
        <button onClick={() => setLang('hy')} className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 ${lang === 'hy' ? t.tabActive : 'text-current opacity-60 hover:opacity-100 bg-transparent'}`}>ՀԱՅ</button>
        <button onClick={() => setLang('ru')} className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 ${lang === 'ru' ? t.tabActive : 'text-current opacity-60 hover:opacity-100 bg-transparent'}`}>РУС</button>
        <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold rounded-full transition-all duration-300 ${lang === 'en' ? t.tabActive : 'text-current opacity-60 hover:opacity-100 bg-transparent'}`}>ENG</button>
      </div>

      <header className={`relative pt-20 pb-8 px-5 overflow-hidden flex flex-col items-center text-center rounded-b-[2.5rem] shadow-[0_4px_40px_-15px_rgba(0,0,0,0.05)] w-full transition-colors duration-300 ${t.headerBg}`}>
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-48 rounded-[100%] blur-3xl -z-10 transition-colors duration-700 ${t.glow}`} />
        
        <div className="relative mb-5">
          <div className={`absolute inset-0 rounded-full blur-md opacity-60 animate-pulse transition-colors duration-700 ${t.glow.replace('/20', '/80').replace('/15', '/80').replace('/10', '/80')}`} />
          <img src={data.master.avatar} alt={data.master.name} className={`relative w-28 h-28 object-cover rounded-full border-4 shadow-lg object-top transition-colors duration-300 ${t.avatarBorder}`} />
          <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full shadow-sm transition-colors duration-300 ${t.headerBg}`}>
            <span className={`flex items-center justify-center w-5 h-5 rounded-full relative z-10 bg-emerald-500`}>
              <span className={`w-2.5 h-2.5 rounded-full animate-ping absolute opacity-75 bg-emerald-300`} />
              <span className={`w-1.5 h-1.5 rounded-full relative z-20 bg-white`} />
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight mb-1">{data.master.name}</h1>
        <p className={`font-medium mb-4 transition-colors duration-300 ${t.appTextSub}`}>{data.master.specialization}</p>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <a href={data.master.mapUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full backdrop-blur-sm transition-all duration-300 active:scale-95 shadow-md border hover:scale-105 ${t.badgeBg} ${t.badgeText} border-current/20`}>
            <MapPin size={16} />
            {data.master.location}
            <ExternalLink size={14} className="ml-0.5 opacity-60" />
          </a>
          <span className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-full transition-colors duration-300 ${t.statusBadgeBg} ${t.statusBadgeText}`}>
            {data.master.status}
          </span>
        </div>

        <button onClick={openBooking} className={`w-full max-w-xs py-4 px-6 rounded-[2rem] font-bold text-lg shadow-[0_8px_30px_-10px_rgba(0,0,0,0.3)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 mx-auto ${t.btnPrimary}`}>
          <Calendar size={20} />
          {d.bookOnline}
        </button>
      </header>

      <main className="px-5 mt-8 w-full max-w-md mx-auto space-y-10 flex-1 relative z-10">
        
        <section>
          <SectionTitle title={d.availableSlots} icon={Sparkles} t={t} />
          {isLoadingDates ? (
            <div className={`w-full p-6 rounded-3xl border flex flex-col items-center gap-4 transition-colors duration-300 ${t.cardBg} ${t.cardBorder}`}>
              <div className={`w-10 h-10 rounded-full animate-spin border-4 border-t-transparent ${t.accentText.replace('text-', 'border-')}`} style={{borderTopColor: 'transparent'}} />
              <p className={`text-sm font-medium animate-pulse ${t.cardTextSub}`}>{d.loadingSlots}</p>
            </div>
          ) : availableDates.length === 0 ? (
            <div className={`w-full p-8 rounded-3xl border flex flex-col items-center justify-center text-center gap-4 transition-colors duration-300 ${t.cardBg} ${t.cardBorder} shadow-sm`}>
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${t.accentBg} ${t.accentText}`}>
                <Calendar size={28} />
              </div>
              <p className={`text-sm font-medium leading-relaxed ${t.cardTextMain}`}>
                {vacationDays.length > 0 ? `${bannerText} ${d.slotsOpenLater}` : d.noSlots}
              </p>
            </div>
          ) : (
            <>
              {showBanner && (
                <div className={`mb-5 p-3.5 rounded-2xl flex items-start gap-3 border transition-colors duration-300 ${t.accentBg} ${t.accentText} border-current/20`}>
                  <Info size={20} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium leading-snug">{bannerText}</p>
                </div>
              )}
              <div className={`w-full p-6 rounded-3xl border flex flex-col items-center justify-center text-center gap-4 transition-colors duration-300 ${t.cardBg} ${t.cardBorder} shadow-sm`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${t.accentBg} ${t.accentText}`}>
                  <Calendar size={24} />
                </div>
                <p className={`text-base font-bold ${t.cardTextMain}`}>{d.nearestWindows}</p>
                <div className="flex flex-wrap justify-center gap-2 w-full">
                  {availableDates.map(day => (
                    <span key={day.id} className={`px-4 py-2.5 rounded-xl text-sm font-bold border shadow-sm transition-colors duration-300 ${t.tabInactive}`}>
                      {day.shortDate}
                    </span>
                  ))}
                </div>
                <p className={`text-xs font-medium mt-2 transition-colors duration-300 opacity-70 ${t.cardTextSub}`}>
                  {d.availableDatesInfo}
                </p>
              </div>
            </>
          )}
        </section>

        <section>
          <SectionTitle title={d.priceList} icon={Star} t={t} />
          <div className="flex gap-2 overflow-x-auto pt-3 pb-4 -mx-5 px-5 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeCategory === category ? `${t.tabActive} shadow-md border-transparent scale-105` : `${t.tabInactive} scale-100`
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            {filteredServices.map(service => (
              <div key={service.id} className={`rounded-3xl p-5 border transition-all duration-300 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className={`font-bold leading-tight transition-colors duration-300 ${t.cardTextMain}`}>{service.name}</h3>
                  <span className={`font-black whitespace-nowrap transition-colors duration-300 ${t.cardTextMain}`}>{service.price.toLocaleString('ru-RU')} AMD</span>
                </div>
                <div className={`flex items-center gap-2 text-xs font-medium mb-3 transition-colors duration-300 ${t.cardTextSub}`}>
                  <Clock size={14} />
                  {service.duration}
                </div>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${t.cardTextSub}`}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title={d.paymentDetails} icon={CreditCard} t={t} />
          <div className={`rounded-3xl p-2 border flex flex-col gap-1 transition-colors duration-300 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}>
            {data.payments.map(payment => (
              <div 
                key={payment.id} 
                onClick={() => copyToClipboard(payment.number, payment.id)}
                className="flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-300 active:scale-95 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div className="flex items-center gap-3 pointer-events-none">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${t.iconWrapper}`}>
                    <payment.icon size={20} />
                  </div>
                  <div>
                    <p className={`text-xs font-medium transition-colors duration-300 ${t.cardTextSub}`}>{payment.name}</p>
                    <p className={`text-sm font-bold font-mono tracking-wide mt-0.5 transition-colors duration-300 ${t.cardTextMain}`}>{payment.number}</p>
                  </div>
                </div>
                <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 pointer-events-none ${t.cardTextSub}`}>
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

        <section>
          <SectionTitle title={d.leaveReview} icon={Star} t={t} />
          <div className={`rounded-3xl p-2 border flex gap-2 transition-colors duration-300 ${t.cardBg} ${t.cardBorder} ${t.cardShadow}`}>
            <a href="#" target="_blank" rel="noopener noreferrer" className={`flex-1 py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 hover:bg-black/5 dark:hover:bg-white/5`}>
               <span className={`font-bold text-sm ${t.cardTextMain}`}>Google</span>
               <span className={`text-[10px] font-medium opacity-60 ${t.cardTextSub}`}>{d.maps}</span>
            </a>
            <div className={`w-px bg-current opacity-10 my-2 ${t.cardBorder}`} />
            <a href="#" target="_blank" rel="noopener noreferrer" className={`flex-1 py-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 hover:bg-black/5 dark:hover:bg-white/5`}>
               <span className={`font-bold text-sm ${t.cardTextMain}`}>Yandex</span>
               <span className={`text-[10px] font-medium opacity-60 ${t.cardTextSub}`}>{d.maps}</span>
            </a>
          </div>
        </section>

      </main>

      <footer className={`mt-12 pt-10 pb-36 px-5 flex flex-col items-center w-full transition-colors duration-300 relative z-10 ${t.footerBg}`}>
        <div className="w-full max-w-xs space-y-3 mb-8">
          <button onClick={() => setIsQrOpen(true)} className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}>
            <QrCode size={18} />
            {d.showQr}
          </button>
          <button onClick={handleDownloadVCard} className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary}`}>
            <UserPlus size={18} />
            {d.addToContacts}
          </button>
          <button onClick={handleInstallPWA} className={`w-full py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all duration-300 active:scale-95 ${t.btnSecondary} border-2 ${t.inputBorder.replace('focus-within:', '')}`}>
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
        
        <a 
          href="https://appseapro.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`text-[10px] mt-8 font-medium opacity-30 hover:opacity-100 transition-opacity duration-300 ${t.appTextMain}`}
        >
          Design by Elena Sotnikova
        </a>
      </footer>

      <div className={`fixed bottom-6 left-0 right-0 z-[90] flex justify-center pointer-events-none transition-all duration-500 ease-out ${!bookingModal.isOpen && !isQrOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="w-full max-w-md px-5 flex items-end justify-between gap-4">
          
          <div className={`flex-1 transition-all duration-500 ease-out ${showFab ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
            <button onClick={openBooking} className={`w-full py-4 rounded-2xl font-bold text-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 ${t.btnPrimary}`}>
              <Calendar size={20} />
              {d.bookOnline}
            </button>
          </div>

          <div className="flex flex-col items-end gap-3 pointer-events-auto shrink-0">
            <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom ${isThemeMenuOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
              {THEME_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setTheme(opt.id); setIsThemeMenuOpen(false); }}
                  className={`w-12 h-12 rounded-full shadow-lg border-2 transition-transform active:scale-90 ${theme === opt.id ? 'scale-110' : 'scale-100'}`}
                  style={{ backgroundColor: opt.color, borderColor: opt.border }}
                  aria-label={`Switch to ${opt.id} theme`}
                />
              ))}
            </div>
            <button onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)} className={`w-14 h-14 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-300 active:scale-90 ${t.btnPrimary}`}>
              <Palette size={24} className="text-current" />
            </button>
          </div>
        </div>
      </div>

      {isQrOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsQrOpen(false)} />
          <div className={`relative w-full max-w-sm rounded-3xl shadow-2xl p-8 flex flex-col items-center animate-[slideUp_0.3s_ease-out] transition-colors duration-300 ${t.modalBg}`}>
            <button onClick={() => setIsQrOpen(false)} className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 ${t.iconWrapper}`}>
              <X size={18} />
            </button>
            <h3 className={`text-xl font-bold mb-6 text-center transition-colors duration-300 ${t.cardTextMain}`}>{d.scanQr}</h3>
            <div className="bg-white p-4 rounded-2xl shadow-inner w-64 h-64 flex items-center justify-center mb-2">
              <img src="/qr.png" alt="QR Code" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<span class="text-gray-400 text-sm text-center">QR.png not found</span>'; }}/>
            </div>
          </div>
        </div>
      )}

      {}
      {bookingModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 h-[100dvh]">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeBooking} />
          
          <div className={`relative w-full max-w-lg rounded-t-[2rem] sm:rounded-3xl shadow-2xl p-6 modal-wrapper animate-[slideUp_0.3s_ease-out] transition-colors duration-300 max-h-[90dvh] overflow-y-auto scrollbar-hide ${t.modalBg}`}>
            <div className={`w-12 h-1.5 rounded-full mx-auto mb-6 sm:hidden transition-colors duration-300 ${t.grabber}`} />
            <button onClick={closeBooking} className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full active:scale-90 transition-all duration-300 ${t.iconWrapper}`}>
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
                <div className={`rounded-2xl p-4 mb-6 border transition-colors duration-300 flex flex-col gap-4 ${t.inputBg} ${t.cardBorder}`}>
                  
                  <div className={`relative border-b pb-4 ${t.cardBorder}`}>
                    <span className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${t.cardTextSub}`}>{d.service}</span>
                    <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'service' ? null : 'service'); }} className={`flex justify-between items-center w-full p-3.5 rounded-xl border cursor-pointer transition-all bg-white/50 backdrop-blur-sm shadow-sm ${t.inputBorder} ${openDropdown === 'service' ? 'ring-2 ' + t.inputFocusRing : ''}`}>
                      <span className={`font-bold truncate pr-2 ${t.cardTextMain}`}>{bookingModal.services?.map(s => s.name).join(' + ') || "..."}</span>
                      <ChevronDown size={18} className={`transition-transform duration-300 flex-shrink-0 ${t.cardTextSub} ${openDropdown === 'service' ? 'rotate-180' : ''}`} />
                    </div>
                    {openDropdown === 'service' && (
                      <div className={`absolute left-0 right-0 top-full mt-2 z-[60] max-h-60 overflow-y-auto rounded-xl border shadow-2xl animate-[slideDown_0.2s_ease-out] ${t.cardBg} ${t.cardBorder}`}>
                        {data.services.map(s => {
                          const isSelected = bookingModal.services.find(item => item.id === s.id);
                          return (
                            <div key={s.id} onClick={(e) => { 
                                e.stopPropagation();
                                setBookingModal(prev => {
                                  if (isSelected) {
                                    if (prev.services.length === 1) return prev;
                                    return { ...prev, services: prev.services.filter(item => item.id !== s.id) };
                                  } else {
                                    if (prev.services.length >= 2) { showToast(d.maxServices, true); return prev; }
                                    return { ...prev, services: [...prev.services, s] };
                                  }
                                });
                              }}
                              className={`p-3.5 border-b last:border-b-0 cursor-pointer flex items-center justify-between transition-colors ${t.cardBorder} ${isSelected ? 'bg-black/10 dark:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10'}`}
                            >
                              <div className="pr-2">
                                <div className={`font-bold ${isSelected ? t.accentText : t.cardTextMain}`}>{s.name}</div>
                                <div className={`text-xs mt-1 font-semibold opacity-70 ${t.cardTextSub}`}>{s.price.toLocaleString('ru-RU')} AMD</div>
                              </div>
                              {isSelected && <Check size={20} className={`flex-shrink-0 ${t.accentText}`} />}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <span className={`block text-sm font-semibold mb-2 transition-colors duration-300 ${t.cardTextSub}`}>{d.time}</span>
                    <div onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === 'time' ? null : 'time'); }} className={`flex justify-between items-center w-full p-3.5 rounded-xl border cursor-pointer transition-all bg-white/50 backdrop-blur-sm shadow-sm ${t.inputBorder} ${openDropdown === 'time' ? 'ring-2 ' + t.inputFocusRing : ''}`}>
                      <span className={`font-bold truncate pr-2 ${t.cardTextMain}`}>{bookingModal.slot ? `${bookingModal.slot.displayDate}, ${bookingModal.slot.time}` : "..."}</span>
                      <ChevronDown size={18} className={`transition-transform duration-300 flex-shrink-0 ${t.cardTextSub} ${openDropdown === 'time' ? 'rotate-180' : ''}`} />
                    </div>
                    {openDropdown === 'time' && (
                      <div className={`absolute left-0 right-0 top-full mt-2 z-[60] max-h-60 overflow-y-auto rounded-xl border shadow-2xl animate-[slideDown_0.2s_ease-out] ${t.cardBg} ${t.cardBorder}`}>
                        {availableDates.length > 0 ? availableDates.map(day => (
                          <div key={day.id}>
                            <div className={`sticky top-0 px-4 py-2 text-xs font-black uppercase tracking-widest backdrop-blur-md bg-black/5 dark:bg-white/5 ${t.cardTextMain}`}>{day.shortDate}</div>
                            <div className="grid grid-cols-3 gap-2 p-3">
                              {day.times.map(time => (
                                <div key={`${day.fullDate}|${time}`} onClick={() => { setBookingModal(prev => ({...prev, slot: { fullDate: day.fullDate, displayDate: day.shortDate, time } })); setOpenDropdown(null); }}
                                  className={`p-2.5 rounded-lg border text-center cursor-pointer active:scale-95 transition-all font-bold ${t.cardBorder} hover:bg-black/5 dark:hover:bg-white/5 ${
                                    bookingModal.slot?.fullDate === day.fullDate && bookingModal.slot?.time === time ? `${t.accentBg} ${t.accentText} border-current` : t.cardTextMain
                                  }`}
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                          </div>
                        )) : <div className={`p-5 text-center font-medium ${t.cardTextSub}`}>{d.noSlots}</div>}
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.yourName}</label>
                    <div className={`rounded-2xl border transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                      <input type="text" required value={formState.name} onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))} placeholder={d.namePlaceholder} className={`w-full px-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`} />
                    </div>
                  </div>
                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.phoneNum}</label>
                    <div className={`rounded-2xl border flex items-center transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                      <span className={`pl-4 pr-1 font-medium transition-colors duration-300 opacity-60 ${t.cardTextMain}`}>+</span>
                      <input type="tel" required value={formState.phone} onChange={e => { const val = formatPhone(e.target.value); setFormState(prev => ({ ...prev, phone: val, ...(prev.sameAsPhone ? {whatsapp: val} : {}) })) }} placeholder={d.phonePlaceholder} className={`w-full pr-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`} />
                    </div>
                    <label className="flex items-center gap-2 mt-2 ml-1 cursor-pointer w-max">
                      <input type="checkbox" checked={formState.sameAsPhone} onChange={e => setFormState(prev => ({ ...prev, sameAsPhone: e.target.checked, whatsapp: e.target.checked ? prev.phone : "" }))} className="w-4 h-4 rounded border-gray-300 text-[#D4A373] focus:ring-[#D4A373] accent-current" />
                      <span className={`text-xs font-medium transition-colors duration-300 ${t.cardTextSub}`}>{d.waCheckbox}</span>
                    </label>
                  </div>

                  {!formState.sameAsPhone && (
                    <div className="animate-[slideUp_0.2s_ease-out]">
                      <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.waLabel}</label>
                      <div className={`rounded-2xl border flex items-center transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                        <span className={`pl-4 pr-1 font-medium transition-colors duration-300 opacity-60 ${t.cardTextMain}`}>+</span>
                        <input type="tel" required={!formState.sameAsPhone} value={formState.whatsapp} onChange={e => { const val = formatPhone(e.target.value); setFormState(prev => ({ ...prev, whatsapp: val })) }} placeholder={d.waPlaceholder} className={`w-full pr-4 py-3.5 bg-transparent focus:outline-none font-medium placeholder:opacity-40 ${t.inputText}`} />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className={`block text-sm font-semibold mb-1.5 ml-1 transition-colors duration-300 ${t.cardTextMain}`}>{d.commentLabel}</label>
                    <div className={`rounded-2xl border transition-all duration-300 ${t.inputBg} ${t.inputBorder} ${t.inputFocusRing}`}>
                      <textarea rows="2" value={formState.comment} onChange={e => setFormState(prev => ({ ...prev, comment: e.target.value }))} placeholder={d.commentPlaceholder} className={`w-full px-4 py-3 bg-transparent focus:outline-none font-medium placeholder:opacity-40 resize-none ${t.inputText}`} />
                    </div>
                  </div>

                  <button type="submit" disabled={formState.isSubmitting || !bookingModal.slot} className={`w-full mt-2 py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100 ${t.btnPrimary}`}>
                    {formState.isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        {d.sending}
                      </span>
                    ) : d.confirmBooking}
                  </button>
                  <p className={`text-[10px] text-center mt-3 opacity-60 transition-colors duration-300 ${t.cardTextSub}`}>
                    {d.consent}
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
          transition: background-color 0.3s ease;
          overscroll-behavior: none !important;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes slideUp { from { transform: translateY(10%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideDown { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />
    </div>
  );
}
