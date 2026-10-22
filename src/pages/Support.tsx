import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Ship, Wifi, Coffee, Heart, Scissors, MapPin, HeartHandshake,
  MessageCircle, Sparkles, Calendar, Package, Phone, Clock, Globe, Users, X, Smartphone, ExternalLink
} from "lucide-react";

// Payload CMS Live Hook & Media Resolver
import { useMtscTorontoSupportPageLive } from "@/hooks/usePayloadLive";
import { getMediaUrl } from "@/services/api";

import lounge from "@/assets/Algoma-Bear-Visit-21.avif";
import judithImg from "@/assets/Toronto Station Chaplin And manager-Rev.Judith Alltree.png";
import heroBg from "@/assets/SeasurferSupport.avif"; 

// App Assets
import happyAtSeaLogo from "@/assets/happy-sea-app.svg";
import appStoreBtn from "@/assets/btn-appstore.png";
import googlePlayBtn from "@/assets/btnapp-google-play.png.webp";

// ==========================================
// FORM COMPONENTS
// ==========================================

const VisitForm = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({ name: "", ship: "", contact: "", location: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("entry.1868319619", form.name);
    formData.append("entry.2061211079", form.ship);
    if (form.location) formData.append("entry.2068264623", form.location);
    formData.append("entry.419020187", form.contact);

    try {
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLScUb1Gf7WIkQ1VNhSMV9qMjLcSX1LLfxjA3im4MOcCMsla3pQ/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
      });
      toast({ title: "Visit Request received", description: "Our team will schedule a visit to your ship." });
      setForm({ name: "", ship: "", contact: "", location: "" });
      onClose();
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit request. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-warm-gray p-6 md:p-8 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ship className="h-6 w-6 text-coral" />
          <h3 className="text-xl font-extrabold text-navy">Request a Ship Visit</h3>
        </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-coral transition-colors" aria-label="Close form">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Name *</Label><Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-white" /></div>
        <div><Label>Ship Name *</Label><Input required value={form.ship} onChange={e => setForm({ ...form, ship: e.target.value })} className="mt-1.5 bg-white" /></div>
        <div><Label>Port Location / Pier</Label><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="mt-1.5 bg-white" /></div>
        <div><Label>WhatsApp or Email *</Label><Input required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} className="mt-1.5 bg-white" /></div>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-coral hover:bg-coral-light text-white font-bold h-12">
        {isSubmitting ? "Scheduling..." : "Schedule Visit"}
      </Button>
    </form>
  );
};

const ChaplainForm = ({ onClose, directWhatsAppUrl }: { onClose: () => void; directWhatsAppUrl: string }) => {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    if (form.name) formData.append("entry.1930479521", form.name);
    formData.append("entry.1472187123", form.contact);
    formData.append("entry.2131322220", form.message);

    try {
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSc3APd6y_AOFHMRbEE-H_q5viU0Hum6BZl3WwcA_L1jHdjF6g/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
      });
      toast({ title: "Message sent", description: "The Chaplain will reach out to you privately." });
      setForm({ name: "", contact: "", message: "" });
      onClose();
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-warm-gray p-6 md:p-8 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-6 w-6 text-coral" />
          <h3 className="text-xl font-extrabold text-navy">Message the Chaplain</h3>
        </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-coral transition-colors" aria-label="Close form">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Name (Optional)</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-white" /></div>
        <div><Label>WhatsApp or Email *</Label><Input required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} className="mt-1.5 bg-white" /></div>
        <div className="sm:col-span-2"><Label>Private Message</Label><Textarea rows={4} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-1.5 bg-white" /></div>
      </div>
      
      <div className="flex flex-col gap-3 mt-2">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-coral hover:bg-coral-light text-white font-bold h-12 flex gap-2 items-center justify-center">
          {isSubmitting ? "Sending Message..." : "Send Private Message"}
        </Button>
        
        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink-0 px-4 text-text-mid text-sm font-medium uppercase tracking-wider">OR CONNECT DIRECTLY</span>
          <div className="flex-grow border-t border-border"></div>
        </div>
        
        <a 
          href={directWhatsAppUrl} 
          target="_blank" 
          rel="noreferrer" 
          className="w-full bg-[#25D366] hover:bg-[#20b858] text-white font-bold h-12 flex gap-2 items-center justify-center rounded-md transition-colors"
        >
          <MessageCircle className="h-5 w-5" /> Message on WhatsApp
        </a>
      </div>
    </form>
  );
};

const GeneralSupportForm = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState({ name: "", contact: "", details: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("entry.381520461", form.name);
    formData.append("entry.1277424146", form.contact);
    formData.append("entry.1910115958", form.details);

    try {
      await fetch("https://docs.google.com/forms/d/e/1FAIpQLSf2m9sNiF8rxlPfEWcAjPSQayvHTBSKjnjcaGYQQaaoNmWkIQ/formResponse", {
        method: "POST",
        mode: "no-cors",
        body: formData
      });
      toast({ title: "Support Request received", description: "We are here for you and will connect shortly." });
      setForm({ name: "", contact: "", details: "" });
      onClose();
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit request. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl bg-warm-gray p-6 md:p-8 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-coral" />
          <h3 className="text-xl font-extrabold text-navy">Request Support</h3>
        </div>
        <button type="button" onClick={onClose} className="text-gray-400 hover:text-coral transition-colors" aria-label="Close form">
          <X className="h-6 w-6" />
        </button>
      </div>
      <p className="text-sm text-text-mid mt-1">For general help (mental, practical, or urgent needs).</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Name *</Label><Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-white" /></div>
        <div><Label>WhatsApp or Email *</Label><Input required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} className="mt-1.5 bg-white" /></div>
        <div className="sm:col-span-2"><Label>How can we help? *</Label><Textarea rows={4} required value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} className="mt-1.5 bg-white" /></div>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-coral hover:bg-coral-light text-white font-bold h-12">
        {isSubmitting ? "Submitting Request..." : "Get Help"}
      </Button>
    </form>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const Support = () => {
  const { data } = useMtscTorontoSupportPageLive();

  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [isHaircutOpen, setIsHaircutOpen] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic values with complete fallbacks
  const heroBadge = data?.hero_badge_text || "Seafarer Support";
  const heroTitle = data?.hero_title || "Support While You’re at Port";
  const heroSubtitle = data?.hero_subtitle || "Wherever you’re from, you are welcome here.\nWe’re here to support you with practical help, connection, and care while you’re in Toronto.";
  const heroResolvedBg = getMediaUrl(data?.hero_bg_image, heroBg) || heroBg;

  const quickAccessTitle = data?.quick_access_title || "How Can We Help You Today?";
  const barberWhatsApp = data?.barber_whatsapp_url || "https://wa.me/14272588449";
  const parcelPortalUrl = data?.parcel_portal_url || "https://parcelservice.mtsc.ca";
  const haircutIframeUrl = data?.haircut_iframe_url || "https://fadekingzmobilebarber.square.site/";
  const chaplainDirectWhatsApp = data?.chaplain_whatsapp_url || "https://wa.me/16472953219";

  const reassuranceTitle = data?.reassurance_title || "You Are Not Alone";
  const reassuranceIntro = data?.reassurance_intro || "We support seafarers from around the world with:";
  const reassuranceImg = getMediaUrl(data?.reassurance_image, lounge) || lounge;
  const reassurancePoints = (data?.reassurance_points && data.reassurance_points.length > 0)
    ? data.reassurance_points.map((p: any) => (typeof p === 'object' ? p.text : p))
    : [
        "Free Wi-Fi access",
        "Transportation assistance",
        "Friendly conversation and a place to relax",
        "Emotional and spiritual support",
        "Help with practical needs while in port",
      ];

  const howItWorksTitle = data?.how_it_works_title || "Getting Support is Easy";
  const step1 = data?.step1_title || "Choose the service you need";
  const step2 = data?.step2_title || "Fill out a quick request form";
  const step3 = data?.step3_title || "Our team will contact you shortly";
  const urgentNote = data?.urgent_contact_note || "If urgent, contact us directly below.";

  const immediateHelpTitle = data?.immediate_help_title || "Need Immediate Help?";
  const phoneLabel = data?.phone_label || "Phone: +1 647-295-3219";
  const phoneTel = data?.phone_tel || "+16472953219";
  const contactWhatsApp = data?.contact_whatsapp_url || "https://wa.me/16472953219";
  const contactEmail = data?.contact_email || "glutenfreepriest@gmail.com";

  const findStationLink = data?.find_station_link || "https://mtsc.ca/contact/#find-station";
  const welfareEmail = data?.welfare_email || "crewhelp@mtsmail.org";
  const happySeaTitle = data?.happy_sea_title || "Happy at Sea App";
  const happySeaDesc = data?.happy_sea_desc || "Connect instantly with a chaplain via our 24hr chat service.";
  const appStoreUrl = data?.app_store_url || "https://apps.apple.com/us/app/happy-at-sea/id6447320913";
  const playStoreUrl = data?.play_store_url || "https://play.google.com/store/apps/details?id=org.missiontoseafarers.app&hl=en_IN";

  const visitTitle = data?.visit_title || "Visit Us at the Port of Toronto";
  const addressLine1 = data?.address_line1 || "Cruise Ship Terminal";
  const addressLine2 = data?.address_line2 || "8 Unwin Avenue, Toronto";
  const openingHours = data?.opening_hours_text || "Check with our team for daily operating hours.";
  const mapEmbedUrl = data?.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.497161490382!2d-79.347566!3d43.63782369999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb1d39382c3d%3A0x48c47df25b0c53d3!2s8%20Unwin%20Ave%2C%20Toronto%2C%20ON%20M5A%203L1%2C%20Canada!5e0!3m2!1sen!2sin!4v1777293037926!5m2!1sen!2sin";

  const teamTitle = data?.team_title || "Meet Your Support Team";
  const teamSubtitle = data?.team_subtitle || "Our team is here to welcome you, listen, and support you during your time in port.";
  const chaplainName = data?.chaplain_name || "Rev. Judith Alltree";
  const chaplainRole = data?.chaplain_role || "Station Chaplain";
  const chaplainImage = getMediaUrl(data?.chaplain_image, judithImg) || judithImg;

  const languageTitle = data?.language_title || "We Welcome Seafarers from Around the World";
  const languageSubtitle = data?.language_subtitle || "If English is not your first language, we will do our best to support you.";

  const quickAccessCards = [
    { id: 'haircut', icon: Scissors, title: "Book a Haircut", desc: "Book Online" },
    { id: 'barber', icon: MessageCircle, title: "Chat with Barber", desc: "Message on WhatsApp" },
    { id: 'parcel', icon: Package, title: "Send or Receive a Parcel", desc: "Direct to Parcel Portal" },
    { id: 'visit', icon: Ship, title: "Request a Ship Visit", desc: "Schedule a visit" },
    { id: 'chaplain', icon: MessageCircle, title: "Message the Chaplain", desc: "Private message/support via Form or WhatsApp" }, 
    { id: 'support', icon: Heart, title: "Request Support", desc: "General help (mental, practical, urgent)" }
  ];

  const handleCloseForm = () => setActiveForm(null);

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'visit': return <VisitForm onClose={handleCloseForm} />;
      case 'chaplain': return <ChaplainForm onClose={handleCloseForm} directWhatsAppUrl={chaplainDirectWhatsApp} />;
      case 'support': return <GeneralSupportForm onClose={handleCloseForm} />;
      default: return null;
    }
  };

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-navy min-h-[45vh] flex items-center justify-center border-b border-navy-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroResolvedBg} 
            alt="Seafarer Support Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/60 to-transparent" />
        </div>
        
        <div className="container-page relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/20 text-coral-light text-xs font-extrabold uppercase tracking-widest border border-coral/30">
              <Heart className="w-4 h-4 text-coral-light" /> {heroBadge}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium whitespace-pre-line">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Quick Access */}
      <section id="quick-access" className="py-20 bg-white scroll-mt-10">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">{quickAccessTitle}</h2>
          </div>

          {/* ON-PAGE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {quickAccessCards.map((card) => {
              if (card.id === 'parcel') {
                return (
                  <a
                    key={card.id}
                    href={parcelPortalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-6 rounded-2xl border text-left transition-all hover:shadow-card hover:-translate-y-1 flex flex-col items-start border-border bg-white cursor-pointer group"
                  >
                    <div className="flex w-full items-start justify-between">
                      <card.icon className="h-10 w-10 mb-4 text-navy" />
                      <ExternalLink className="h-5 w-5 text-text-mid opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                    <p className="text-sm text-text-mid font-medium">{card.desc}</p>
                  </a>
                );
              }

              if (card.id === 'haircut') {
                return (
                  <button
                    key={card.id}
                    onClick={() => setIsHaircutOpen(true)}
                    className="p-6 rounded-2xl border text-left transition-all hover:shadow-card hover:-translate-y-1 flex flex-col items-start border-border bg-white cursor-pointer"
                  >
                    <card.icon className="h-10 w-10 mb-4 text-navy" />
                    <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                    <p className="text-sm text-text-mid font-medium">{card.desc}</p>
                  </button>
                );
              }

              if (card.id === 'barber') {
                return (
                  <a
                    key={card.id}
                    href={barberWhatsApp}
                    target="_blank"
                    rel="noreferrer"
                    className="p-6 rounded-2xl border text-left transition-all hover:shadow-card hover:-translate-y-1 flex flex-col items-start border-border bg-white cursor-pointer group"
                  >
                    <div className="flex w-full items-start justify-between">
                      <card.icon className="h-10 w-10 mb-4 text-navy" />
                      <ExternalLink className="h-5 w-5 text-text-mid opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                    <p className="text-sm text-text-mid font-medium">{card.desc}</p>
                  </a>
                );
              }
              
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setActiveForm(card.id);
                    setTimeout(() => {
                      formContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }}
                  className={`p-6 rounded-2xl border text-left transition-all hover:shadow-card hover:-translate-y-1 flex flex-col items-start ${activeForm === card.id ? "border-coral bg-coral-pale ring-1 ring-coral" : "border-border bg-white"
                    }`}
                >
                  <card.icon className={`h-10 w-10 mb-4 ${activeForm === card.id ? "text-coral" : "text-navy"}`} />
                  <h3 className="font-bold text-navy text-lg mb-2">{card.title}</h3>
                  <p className="text-sm text-text-mid font-medium">{card.desc}</p>
                </button>
              );
            })}
          </div>

          <div ref={formContainerRef} className="max-w-3xl mx-auto scroll-mt-20">
            {renderActiveForm()}
          </div>
        </div>
      </section>

      {/* 3. Simple Reassurance Section */}
      <section className="py-20 bg-warm-gray">
        <div className="container-page grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="rounded-3xl overflow-hidden shadow-soft aspect-[5/4]">
            <img src={reassuranceImg} alt="Seafarers lounge" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
              {reassuranceTitle}
            </h2>
            <p className="mt-5 text-lg text-text-mid font-medium leading-relaxed">
              {reassuranceIntro}
            </p>
            <ul className="mt-6 space-y-4">
              {reassurancePoints.map((t: string) => (
                <li key={t} className="flex gap-4 items-center">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral/10 text-coral">
                    <HeartHandshake className="h-5 w-5" />
                  </span>
                  <span className="text-navy font-bold text-lg">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-20 bg-white text-center border-b border-warm-gray">
        <div className="container-page">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy">{howItWorksTitle}</h2>
          <div className="mt-14 grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-navy text-white flex items-center justify-center font-black text-2xl mb-6 shadow-md">1</div>
              <h3 className="font-bold text-navy text-xl">{step1}</h3>
            </div>
            <div className="flex flex-col items-center relative">
              <div className="hidden sm:block absolute top-8 -left-[50%] w-full h-[2px] bg-warm-gray -z-10"></div>
              <div className="h-16 w-16 rounded-full bg-coral text-white flex items-center justify-center font-black text-2xl mb-6 shadow-md">2</div>
              <h3 className="font-bold text-navy text-xl">{step2}</h3>
            </div>
            <div className="flex flex-col items-center relative">
               <div className="hidden sm:block absolute top-8 -left-[50%] w-full h-[2px] bg-warm-gray -z-10"></div>
              <div className="h-16 w-16 rounded-full bg-coral-light text-white flex items-center justify-center font-black text-2xl mb-6 shadow-md">3</div>
              <h3 className="font-bold text-navy text-xl">{step3}</h3>
            </div>
          </div>
          <p className="mt-12 text-lg font-bold text-coral flex items-center justify-center gap-2 bg-coral/10 py-4 px-6 rounded-full inline-flex">
            {urgentNote}
          </p>
        </div>
      </section>

      {/* 5. Contact / Emergency Support */}
      <section className="py-20 bg-navy text-white">
        <div className="container-page text-center">
          <h2 className="text-3xl text-white md:text-4xl font-extrabold mb-10">{immediateHelpTitle}</h2>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mb-16">
            <a href={`tel:${phoneTel}`} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full transition-colors font-bold text-lg w-full sm:w-auto">
              <Phone className="h-6 w-6" /> {phoneLabel}
            </a>
            <a href={contactWhatsApp} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20b858] px-8 py-4 rounded-full transition-colors font-bold text-white text-lg w-full sm:w-auto">
              <MessageCircle className="h-6 w-6" /> WhatsApp
            </a>
            <a href={`mailto:${contactEmail}`} className="flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full transition-colors font-bold text-lg w-full sm:w-auto">
              Email: {contactEmail}
            </a>
          </div>

          {/* Need Help / National & App Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-left max-w-4xl mx-auto shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <HeartHandshake className="w-48 h-48" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-extrabold mb-8 text-white relative z-10">Need Help?</h3>
            <ul className="space-y-6 text-lg font-medium text-white/90 relative z-10 mb-10">
              <li className="flex items-start gap-4">
                <MapPin className="h-7 w-7 text-coral shrink-0" />
                <a href={findStationLink} target="_blank" rel="noreferrer" className="hover:text-coral transition-colors underline underline-offset-4 decoration-white/30">
                  Find a Mission to Seafarers station at a Canadian port
                </a>
              </li>
              <li className="flex items-start gap-4">
                <HeartHandshake className="h-7 w-7 text-coral shrink-0" />
                <span>
                  Get help and support on a welfare or justice issue: <a href={`mailto:${welfareEmail}`} className="font-bold text-white hover:text-coral transition-colors underline underline-offset-4 decoration-white/30">{welfareEmail}</a>
                </span>
              </li>
            </ul>

            {/* Happy at Sea App Section */}
            <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative z-10 shadow-lg">
              <div className="shrink-0">
                <img src={happyAtSeaLogo} alt="Happy at Sea App Logo" className="w-28 h-28 md:w-32 md:h-32 object-contain" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-navy mb-2 flex items-center justify-center md:justify-start gap-2">
                  <Smartphone className="h-6 w-6 text-coral" /> {happySeaTitle}
                </h4>
                <p className="text-text-mid mb-6 text-lg font-medium">{happySeaDesc}</p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a href={appStoreUrl} target="_blank" rel="noreferrer" className="inline-block transition-transform hover:scale-105">
                    <img src={appStoreBtn} alt="Download on the App Store" className="h-12 w-auto object-contain" />
                  </a>
                  <a href={playStoreUrl} target="_blank" rel="noreferrer" className="inline-block transition-transform hover:scale-105">
                    <img src={googlePlayBtn} alt="Get it on Google Play" className="h-12 w-auto object-contain" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Location & Visiting Info */}
      <section className="py-20 bg-white">
        <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy">{visitTitle}</h2>
            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4 p-6 bg-warm-gray rounded-2xl">
                <MapPin className="h-8 w-8 text-coral shrink-0" />
                <div>
                  <strong className="block text-navy text-lg mb-1">Address:</strong>
                  <span className="text-text-mid font-medium block">{addressLine1}</span>
                  <span className="text-text-mid font-medium">{addressLine2}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-warm-gray rounded-2xl">
                <Clock className="h-8 w-8 text-coral shrink-0" />
                <div>
                  <strong className="block text-navy text-lg mb-1">Opening Hours:</strong>
                  <span className="text-text-mid font-medium">{openingHours}</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="aspect-square md:aspect-video lg:aspect-square bg-warm-gray rounded-3xl shadow-soft flex items-center justify-center overflow-hidden border-4 border-white">
            <iframe
              src={mapEmbedUrl}
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 7 & 8. Language Accessibility & Support Team */}
      <section className="py-24 bg-warm-gray">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Trust / Human Touch */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6">{teamTitle}</h2>
              <p className="text-xl text-text-mid max-w-lg mx-auto lg:mx-0 mb-14 font-medium leading-relaxed">
                {teamSubtitle}
              </p>
              
              <div className="flex flex-col items-center lg:items-start group">
                <div className="w-48 h-48 mb-6 overflow-hidden rounded-full shadow-lg ring-8 ring-white transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={chaplainImage} 
                    alt={chaplainName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-extrabold text-navy">{chaplainName}</h3>
                <p className="text-coral font-bold mt-1 text-lg mb-5">{chaplainRole}</p>
                
                <a 
                  href={chaplainDirectWhatsApp} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-full font-bold transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" /> Chat with Judith
                </a>
              </div>
            </div>

            {/* Language Accessibility */}
            <div className="bg-coral text-white rounded-3xl p-10 md:p-14 shadow-soft text-center lg:text-left h-full flex flex-col justify-center">
              <Globe className="h-16 w-16 mb-6 text-white mx-auto lg:mx-0" />
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">{languageTitle}</h2>
              <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
                {languageSubtitle}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────── MODAL: HAIRCUT BOOKING ─────────── */}
      <Dialog open={isHaircutOpen} onOpenChange={setIsHaircutOpen}>
        <DialogContent className="max-w-5xl h-[95vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="p-4 pb-3 shrink-0 border-b">
            <DialogTitle className="flex items-center gap-3 text-xl font-extrabold text-navy">
              <Scissors className="h-5 w-5 text-coral" />
              Book a Haircut Appointment
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-2">
            <div className="w-full h-full bg-white rounded-lg border border-border overflow-hidden">
              <iframe
                src={haircutIframeUrl}
                title="Toronto Haircut Service Booking"
                className="w-full h-full border-none block bg-transparent"
                allow="payment"
              ></iframe>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Support;