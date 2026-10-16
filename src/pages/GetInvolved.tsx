import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Heart, Package, Briefcase, Users, DollarSign, HandHeart, CheckCircle2, X, Gift
} from "lucide-react";

// Payload CMS Live Hook & Media Resolver
import { useMtscTorontoGetInvolvedPageLive } from "@/hooks/usePayloadLive";
import { getMediaUrl } from "@/services/api";

// Image import for the Hero Background & Maritime Design Fallbacks
import getInvolvedBg from "@/assets/GetInvoled.avif";
import maritimeImage from "@/assets/GTimagemaritime.jpg";

// ==========================================
// FORM COMPONENTS
// ==========================================

interface FormProps {
  onClose: () => void;
}

const DonateGoodsForm = ({ onClose }: FormProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", category: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new URLSearchParams();
    data.append('entry.2024881369', form.name);
    data.append('entry.1615868162', form.email);
    data.append('entry.1036482662', form.phone);
    data.append('entry.1718377264', form.category);
    data.append('entry.539556088', form.description);

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfGPI5we6W2xvnTfbG8yx0AA-d5JiReQrT-YGr0cZmv2aK1Lw/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      toast({ title: "Offer Received", description: "Thank you! Your donation offer has been received. Our team will contact you shortly." });
      setForm({ name: "", email: "", phone: "", category: "", description: "" });
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Submission Failed", description: "There was an issue sending your request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl bg-white p-6 md:p-8 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-4">
      <button type="button" onClick={onClose} className="absolute top-6 right-6 text-text-mid hover:text-navy transition-colors"><X size={24} /></button>

      <div className="flex items-center gap-2 mb-2 pr-8">
        <Package className="h-6 w-6 text-coral" />
        <h3 className="text-2xl font-extrabold text-navy">Donate Goods or Services</h3>
      </div>
      <p className="text-sm text-text-mid mb-4">
        Thank you for your interest in supporting the Toronto Station through in-kind gifts. Please fill out the form below so we can coordinate your donation.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Full Name *</Label><Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>
        <div><Label>Email Address *</Label><Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>
        <div><Label>Phone Number</Label><Input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>
        <div>
          <Label>Donation Type *</Label>
          <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-warm-gray px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mt-1.5">
            <option value="" disabled>Select a category...</option>
            <option value="Snacks and refreshments">Snacks and refreshments</option>
            <option value="Gift cards">Gift cards</option>
            <option value="Technology and Wi-Fi support">Technology and Wi-Fi support</option>
            <option value="Haircut supplies and personal care items">Haircut supplies and personal care items</option>
            <option value="Furniture and lounge items for the station">Furniture and lounge items for the station</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="sm:col-span-2"><Label>Description of Items / Services *</Label><Textarea rows={4} required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1.5 bg-warm-gray" placeholder="Please describe what you would like to donate..." /></div>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-coral hover:bg-coral-light text-white font-bold h-12">
        {isSubmitting ? "Submitting..." : "Submit Donation Offer"}
      </Button>
    </form>
  );
};

const PartnershipForm = ({ onClose }: FormProps) => {
  const [form, setForm] = useState({ orgName: "", contactName: "", email: "", message: "", interests: [] as string[] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    'Sponsoring Local Events', 'Group Volunteer Activities', 'Hospitality & Seafarer Care',
    'Providing Station Furnishings/Supplies', 'Offering Wellness/Haircut Services', 'Community Awareness Initiatives'
  ];

  const handleCheckboxChange = (interest: string) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new URLSearchParams();
    data.append('entry.1983651488', form.orgName);
    data.append('entry.618742944', form.contactName);
    data.append('entry.840255252', form.email);
    data.append('entry.1042455936', form.message);

    form.interests.forEach(interest => {
      const formattedInterest = interest === 'Sponsoring Local Events' ? 'Sponsoring Local Event' : interest;
      data.append('entry.1594178085', formattedInterest);
    });

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSdseijLt3xYC3A_fKa6bQZ7WdoUYH2UQxJB0UruXT_VMtX_0Q/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      toast({ title: "Inquiry Submitted", description: "Thank you for reaching out! Our partnerships team will be in touch soon." });
      setForm({ orgName: "", contactName: "", email: "", message: "", interests: [] });
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Submission Failed", description: "There was an issue sending your request." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl bg-white p-6 md:p-8 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-4">
      <button type="button" onClick={onClose} className="absolute top-6 right-6 text-text-mid hover:text-navy transition-colors"><X size={24} /></button>

      <div className="flex items-center gap-2 mb-2 pr-8">
        <Briefcase className="h-6 w-6 text-coral" />
        <h3 className="text-2xl font-extrabold text-navy">Partner With Us</h3>
      </div>
      <p className="text-sm text-text-mid mb-4">
        We welcome support from local businesses, organizations, schools, and faith communities. Fill out the inquiry form below.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2"><Label>Organization / Business Name *</Label><Input required value={form.orgName} onChange={e => setForm({ ...form, orgName: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>
        <div><Label>Primary Contact Name *</Label><Input required value={form.contactName} onChange={e => setForm({ ...form, contactName: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>
        <div><Label>Email Address *</Label><Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>

        <div className="sm:col-span-2 mt-2">
          <Label className="mb-3 block">Areas of Interest (Select all that apply)</Label>
          <div className="grid sm:grid-cols-2 gap-3">
            {interestOptions.map((interest) => (
              <label key={interest} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-warm-gray transition-colors border border-transparent hover:border-border">
                <input type="checkbox" checked={form.interests.includes(interest)} onChange={() => handleCheckboxChange(interest)} className="w-4 h-4 text-coral border-gray-300 rounded focus:ring-coral" />
                <span className="text-sm text-navy font-medium">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2"><Label>Message / Partnership Proposal *</Label><Textarea rows={4} required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="mt-1.5 bg-warm-gray" placeholder="Tell us how you'd like to partner..." /></div>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-coral hover:bg-coral-light text-white font-bold h-12">
        {isSubmitting ? "Submitting..." : "Submit Partnership Inquiry"}
      </Button>
    </form>
  );
};

const VolunteerForm = ({ onClose }: FormProps) => {
  const [form, setForm] = useState({ name: "", email: "", details: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new URLSearchParams();
    data.append('entry.234123052', form.name);
    data.append('entry.176043329', form.email);
    data.append('entry.464588374', form.details);

    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLScbMdkRgXcG9TS9bv74f7wkbo3ZStTsQlcuAZk77I41tidsjw/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: data,
      });
      toast({ title: "Volunteer Request Sent", description: "Thank you for your interest! We will contact you soon." });
      setForm({ name: "", email: "", details: "" });
      onClose();
    } catch (error) {
      toast({ variant: "destructive", title: "Submission Failed", description: "There was an issue sending your request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative rounded-2xl bg-white p-6 md:p-8 shadow-card space-y-5 animate-in fade-in slide-in-from-bottom-4">
      <button type="button" onClick={onClose} className="absolute top-6 right-6 text-text-mid hover:text-navy transition-colors"><X size={24} /></button>

      <div className="flex items-center gap-2 mb-2 pr-8">
        <Users className="h-6 w-6 text-coral" />
        <h3 className="text-2xl font-extrabold text-navy">Volunteer with Us</h3>
      </div>
      <p className="text-sm text-text-mid mb-4">
        By sharing your time and skills, you can help ensure that seafarers are welcomed with kindness and practical support.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div><Label>Name *</Label><Input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>
        <div><Label>Email *</Label><Input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="mt-1.5 bg-warm-gray" /></div>
        <div className="sm:col-span-2"><Label>How would you like to help? *</Label><Textarea rows={4} required value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} className="mt-1.5 bg-warm-gray" placeholder="Tell us about your interests and availability..." /></div>
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-coral hover:bg-coral-light text-white font-bold h-12">
        {isSubmitting ? "Submitting..." : "Become a Volunteer"}
      </Button>
    </form>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const GetInvolved = () => {
  const { data } = useMtscTorontoGetInvolvedPageLive();

  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [isDonateActive, setIsDonateActive] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic values with complete fallbacks
  const heroBadge = data?.hero_badge_text || "Get Involved";
  const heroTitle = data?.hero_title || "Get Involved with Mission to Seafarers Toronto";
  const heroSubtitle = data?.hero_subtitle || "There are many ways to support and help create a welcoming place for seafarers arriving at the Port of Toronto. Whether you choose to volunteer, donate, provide in-kind support, or partner with us, your support helps ensure that seafarers feel cared for.";
  const heroResolvedBg = getMediaUrl(data?.hero_bg_image, getInvolvedBg) || getInvolvedBg;

  const donateEyebrow = data?.donate_eyebrow || "Donate";
  const donateTitle = data?.donate_title || "Help Care for Seafarers";
  const donateDesc = data?.donate_description || "Every gift helps us provide hospitality, practical support, transportation, Wi-Fi, refreshments, haircuts, and a welcoming place for seafarers visiting Toronto.";

  const monthlyTitle = data?.monthly_card_title || "Monthly Giving";
  const monthlyDesc = data?.monthly_card_desc || "Become a monthly donor and help provide ongoing care and support throughout the year. Monthly gifts help us plan ahead.";
  const monthlyBullets = (data?.monthly_bullets && data.monthly_bullets.length > 0)
    ? data.monthly_bullets.map((b: any) => (typeof b === 'object' ? b.text : b))
    : [
        "$15/mo provides refreshments & hospitality",
        "$25/mo supports transportation & Wi-Fi",
        "$50/mo provides practical assistance & care",
      ];
  const monthlyBtnLabel = data?.monthly_btn_label || "Become a Monthly Donor";

  const onetimeTitle = data?.onetime_card_title || "One-Time Gift";
  const onetimeDesc = data?.onetime_card_desc || "Make a one-time donation to support Mission to Seafarers Toronto. Your gift helps create a welcoming space and care for seafarers right when they arrive.";
  const onetimeBtnLabel = data?.onetime_btn_label || "Make a One-Time Gift";

  const donateFooterNote = data?.donate_footer_note || "All donations are securely processed via CanadaHelps in support of the Toronto station and the national mission to care for seafarers across Canada.";
  const canadahelpsIframeUrl = data?.canadahelps_iframe_url || "https://www.canadahelps.org/en/dn/145961";

  const waysEyebrow = data?.ways_eyebrow || "Other Ways to Help";
  const waysTitle = data?.ways_title || "Choose How You Would Like to Support";
  const waysResolvedBg = getMediaUrl(data?.ways_bg_image, maritimeImage) || maritimeImage;

  const inkindTitle = data?.inkind_title || "In-Kind Gifts";
  const inkindDesc = data?.inkind_desc || "We are always grateful for donations that help us create a welcoming space. Examples include:";
  const inkindBullets = (data?.inkind_bullets && data.inkind_bullets.length > 0)
    ? data.inkind_bullets.map((b: any) => (typeof b === 'object' ? b.text : b))
    : [
        "Snacks and refreshments",
        "Gift cards",
        "Technology and Wi-Fi support",
        "Haircut supplies and personal care items",
        "Furniture and lounge items for the station",
      ];
  const amazonWishlistUrl = data?.amazon_wishlist_url || "https://www.amazon.ca/hz/wishlist/ls/3C9KTQNHTZ0NM?ref_=wl_fv_le.";
  const amazonWishlistLabel = data?.amazon_wishlist_label || "Order from our wishlist";

  const partnershipTitle = data?.partnership_title || "Partnership Options";
  const partnershipDesc = data?.partnership_desc || "We welcome support from local businesses, schools, and groups. You can support:";
  const partnershipBullets = (data?.partnership_bullets && data.partnership_bullets.length > 0)
    ? data.partnership_bullets.map((b: any) => (typeof b === 'object' ? b.text : b))
    : [
        "Local events & Volunteer activities",
        "Hospitality and care for seafarers",
        "Station furnishings and supplies",
        "Haircut and wellness services",
      ];
  const partnershipNote = data?.partnership_note || "For larger corporate partnerships and national giving opportunities, please visit Mission to Seafarers Canada.";

  const ctaTitle = data?.cta_title || "Every Act of Kindness Makes a Difference";
  const ctaDesc = data?.cta_description || "From a warm drink and a haircut to a monthly donation or a few hours of volunteering, every act of support helps remind seafarers that they are not alone.";
  const ctaDonateLabel = data?.cta_donate_label || "Donate Now";
  const ctaVolunteerLabel = data?.cta_volunteer_label || "Become a Volunteer";
  const ctaContactLabel = data?.cta_contact_label || "Contact the Station";

  // Helper to trigger donation form and scroll
  const handleDonateClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsDonateActive(true);
    setTimeout(() => scrollToSection('donation-form'), 100);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeForm && formContainerRef.current && !formContainerRef.current.contains(event.target as Node)) {
        if (!(event.target as Element).closest('.form-trigger-btn')) {
          setActiveForm(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeForm]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const actionCards = [
    { id: 'goods', icon: Package, title: "Donate Goods", desc: "Wish list & in-kind gifts" },
    { id: 'partner', icon: Briefcase, title: "Partner With Us", desc: "Corporate & community support" },
    { id: 'volunteer', icon: Users, title: "Volunteer", desc: "Share your time & skills" },
  ];

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'goods': return <DonateGoodsForm onClose={() => setActiveForm(null)} />;
      case 'partner': return <PartnershipForm onClose={() => setActiveForm(null)} />;
      case 'volunteer': return <VolunteerForm onClose={() => setActiveForm(null)} />;
      default: return null;
    }
  };

  return (
    <>
      {/* ─────────── HERO SECTION ─────────── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-navy min-h-[45vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroResolvedBg} 
            alt="Get Involved Background" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/60 to-transparent" />
        </div>
        
        <div className="container-page relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/20 text-coral-light text-xs font-extrabold uppercase tracking-widest mb-6 border border-coral/30">
            {heroBadge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Financial Donations Section */}
      <section id="donate" className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="container-page">
          <div className={`grid gap-12 items-start transition-all duration-500 ${isDonateActive ? 'lg:grid-cols-12 lg:gap-16' : 'max-w-4xl mx-auto'}`}>

            {/* Left Content Context */}
            <div className={`${isDonateActive ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-8`}>
              <div className={`${!isDonateActive && 'text-center max-w-2xl mx-auto'}`}>
                <span className={`eyebrow flex items-center gap-2 mb-3 ${!isDonateActive && 'justify-center'}`}><DollarSign className="w-5 h-5" /> {donateEyebrow}</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">{donateTitle}</h2>
                <p className="text-lg text-text-mid leading-relaxed">
                  {donateDesc}
                </p>
              </div>

              <div className={`grid gap-6 ${!isDonateActive ? 'sm:grid-cols-2' : 'grid-cols-1'}`}>
                {/* Monthly Giving Details */}
                <div className="bg-warm-gray rounded-2xl p-6 md:p-8 border border-border relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><Heart size={80} /></div>
                  <h3 className="text-xl font-extrabold text-navy mb-3">{monthlyTitle}</h3>
                  <p className="text-sm text-text-mid mb-5 flex-grow">
                    {monthlyDesc}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {monthlyBullets.map((pt: string, idx: number) => (
                      <li key={idx} className="flex gap-2">
                        <CheckCircle2 className="text-coral w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-navy">{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleDonateClick} className="w-full bg-navy hover:bg-navy-light text-white font-bold mt-auto">
                    {monthlyBtnLabel}
                  </Button>
                </div>

                {/* One Time Gift Details */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-soft relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none"><HandHeart size={80} /></div>
                  <h3 className="text-xl font-extrabold text-navy mb-3">{onetimeTitle}</h3>
                  <p className="text-sm text-text-mid mb-6 flex-grow">
                    {onetimeDesc}
                  </p>
                  <Button onClick={handleDonateClick} className="w-full bg-coral hover:bg-coral-light text-white font-bold mt-auto">
                    {onetimeBtnLabel}
                  </Button>
                </div>
              </div>

              <p className={`text-xs text-text-mid italic px-2 ${!isDonateActive && 'text-center'}`}>
                {donateFooterNote}
              </p>
            </div>

            {/* Right Side - CanadaHelps Iframe Form */}
            {isDonateActive && (
              <div id="donation-form" className="lg:col-span-7 bg-warm-gray p-4 md:p-6 rounded-2xl border border-border shadow-card lg:sticky lg:top-24 animate-in slide-in-from-right-8 fade-in duration-500 scroll-mt-24">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <Gift className="text-coral h-6 w-6" />
                    <h3 className="font-extrabold text-navy text-xl sm:text-2xl">Secure Donation Form</h3>
                  </div>
                  <button onClick={() => setIsDonateActive(false)} className="text-text-mid hover:text-navy transition-colors p-2" aria-label="Close Donation Form">
                    <X size={24} />
                  </button>
                </div>
                <div className="w-full bg-white rounded-xl border border-border overflow-hidden shadow-inner h-[750px] sm:h-[750px] md:h-[740px]">
                  <iframe
                    src={canadahelpsIframeUrl}
                    title="CanadaHelps Secure Donation Form"
                    className="w-full h-full border-none block bg-transparent"
                    scrolling="auto"
                    allow="payment"
                  ></iframe>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Interactive Forms / Ways to Help Section */}
      <section id="ways-to-help" className="relative py-20 md:py-28 scroll-mt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={waysResolvedBg} 
            alt="Ways to help background" 
            className="w-full h-full object-cover object-center" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
        </div>

        <div className="container-page relative z-10">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-coral-light text-xs font-extrabold uppercase tracking-widest mb-4 border border-coral/30">
              {waysEyebrow}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">{waysTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            {actionCards.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => {
                  setActiveForm(activeForm === card.id ? null : card.id);
                  if (activeForm !== card.id) {
                    setTimeout(() => scrollToSection('ways-to-help-forms'), 100);
                  }
                }}
                className={`form-trigger-btn p-6 rounded-xl border text-center transition-all hover:shadow-card hover:-translate-y-1 ${
                  activeForm === card.id 
                    ? "border-coral bg-coral-pale shadow-md" 
                    : "border-coral/90 bg-coral text-white"
                }`}
              >
                <card.icon className={`h-10 w-10 mx-auto mb-4 ${activeForm === card.id ? "text-coral" : "text-white"}`} />
                <h3 className={`font-bold mb-2 text-lg ${activeForm === card.id ? "text-navy" : "text-white"}`}>{card.title}</h3>
                <p className={`text-sm ${activeForm === card.id ? "text-text-mid" : "text-white/90"}`}>{card.desc}</p>
              </button>
            ))}
          </div>

          <div id="ways-to-help-forms" className="max-w-3xl mx-auto scroll-mt-32" ref={formContainerRef}>
            {renderActiveForm()}
          </div>
        </div>
      </section>

      {/* In-Kind & Partnership Context */}
      <section className={`py-16 bg-white border-t border-border transition-all duration-300 ${activeForm ? 'opacity-50 pointer-events-none hidden' : 'opacity-100 block'}`}>
        <div className="container-page grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-extrabold text-navy mb-4 flex items-center gap-2"><Package className="text-coral" /> {inkindTitle}</h3>
            <p className="text-text-mid mb-4">{inkindDesc}</p>
            <ul className="list-disc list-inside text-sm text-navy font-medium space-y-2 mb-6">
              {inkindBullets.map((pt: string, idx: number) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button type="button" onClick={() => { setActiveForm('goods'); scrollToSection('ways-to-help'); }} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white form-trigger-btn">
                Donate Goods Form
              </Button>
              <Button asChild variant="outline" className="border-coral text-coral hover:bg-coral hover:text-white">
                <a href={amazonWishlistUrl} target="_blank" rel="noopener noreferrer">{amazonWishlistLabel}</a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-navy mb-4 flex items-center gap-2"><Briefcase className="text-coral" /> {partnershipTitle}</h3>
            <p className="text-text-mid mb-4">{partnershipDesc}</p>
            <ul className="list-disc list-inside text-sm text-navy font-medium space-y-2 mb-6">
              {partnershipBullets.map((pt: string, idx: number) => (
                <li key={idx}>{pt}</li>
              ))}
            </ul>
            <Button type="button" onClick={() => { setActiveForm('partner'); scrollToSection('ways-to-help'); }} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white form-trigger-btn">Partner with the Toronto Station</Button>
            <p className="text-xs text-text-mid mt-4 italic">{partnershipNote}</p>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-coral text-white text-center">
        <div className="container-page max-w-4xl mx-auto">
          <Heart className="mx-auto h-12 w-12 text-white/90 mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold !text-white mb-6">{ctaTitle}</h2>
          <p className="text-lg text-white/90 mb-10 max-w-3xl mx-auto">
            {ctaDesc}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Button size="lg" onClick={handleDonateClick} className="w-full sm:w-auto bg-white hover:bg-gray-100 text-coral font-bold h-14 px-8">
              {ctaDonateLabel}
            </Button>

            <Button size="lg" variant="outline" type="button" onClick={() => { setActiveForm('volunteer'); scrollToSection('ways-to-help'); }} className="w-full sm:w-auto form-trigger-btn border-2 border-white text-white hover:bg-white hover:text-navy bg-transparent font-bold h-14 px-6">
              {ctaVolunteerLabel}
            </Button>

            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-navy bg-transparent font-bold h-14 px-6">
              <Link to="/contact">{ctaContactLabel}</Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-navy bg-transparent font-bold h-14 px-6">
              <a href={amazonWishlistUrl} target="_blank" rel="noopener noreferrer">{amazonWishlistLabel}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetInvolved;