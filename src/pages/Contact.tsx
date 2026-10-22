import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

// Payload CMS Live Hook & Media Resolver
import { useMtscTorontoContactPageLive } from "@/hooks/usePayloadLive";
import { getMediaUrl } from "@/services/api";

// Banner Placeholder Image Fallback
import contactBg from "@/assets/contact-banner.jpg"; 

const defaultInterests = [
  "Seafarer support",
  "Volunteering",
  "Donating goods or services",
  "Local partnership",
  "Media inquiry",
  "Other",
];

const defaultInfoParagraphs = [
  "Mission to Seafarers Toronto operates as part of Mission to Seafarers Canada.",
  "Local volunteer opportunities, station engagement, community support, and monthly and one-time donations are coordinated through the Toronto station.",
  "Major gifts and national corporate partnerships are managed through the National Office, Mission to Seafarers Canada."
];

const Contact = () => {
  const { data } = useMtscTorontoContactPageLive();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Dynamic values with complete original fallbacks
  const heroBadge = data?.hero_badge_text || "Contact";
  const heroTitle = data?.hero_title || "Contact Mission to Seafarers Toronto";
  const heroSubtitle = data?.hero_subtitle || "We would love to hear from you.";
  const heroResolvedBg = getMediaUrl(data?.hero_bg_image, contactBg) || contactBg;

  const stationTitle = data?.station_title || "Toronto Station";
  const stationSubtitle = data?.station_subtitle || "Local support at the Port of Toronto.";
  const stationLocation = data?.station_location_text || "Cruise Ship Terminal, 8 Unwin Ave, Toronto, ON M5A 1A1, Canada";
  const stationEmail = data?.station_email || "glutenfreepriest@gmail.com";
  const stationPhoneDisplay = data?.station_phone_display || "+1 416-469-5391";
  const stationPhoneTel = data?.station_phone_tel || "+14164695391";
  const stationHours = data?.station_hours_text || "By appointment and during ship visits";

  const infoParagraphs = (data?.info_paragraphs && data.info_paragraphs.length > 0)
    ? data.info_paragraphs.map((p: any) => (typeof p === 'object' ? p.text : p))
    : defaultInfoParagraphs;

  const formTitle = data?.form_title || "Send Us a Message";
  const formSubtitle = data?.form_subtitle || "Whether you are a seafarer, volunteer, supporter, or community partner, we welcome your questions and inquiries.";
  const formActionUrl = data?.form_action_url || "https://docs.google.com/forms/d/e/1FAIpQLSdDRLf8Fjde4Y-q1oUmoa_5JAbmAFp5TeG0RV3qjyVL3Aabhg/formResponse";
  const formSubmitLabel = data?.form_submit_label || "Submit Inquiry";

  const interestsList = (data?.form_interests && data.form_interests.length > 0)
    ? data.form_interests.map((i: any) => (typeof i === 'object' ? i.label : i))
    : defaultInterests;

  // Handles iframe finish load (meaning Google received the data)
  const handleIframeLoad = () => {
    if (isSubmitting) {
      toast({
        title: "Thank You",
        description: "Your inquiry has been successfully sent. We will be in touch with you shortly.",
      });
      setIsSubmitting(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-navy min-h-[45vh] flex items-center justify-center border-b border-navy-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroResolvedBg} 
            alt="Contact Background Placeholder" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/60 to-transparent" />
        </div>
        
        <div className="container-page relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-coral/20 text-coral-light text-xs font-extrabold uppercase tracking-widest border border-coral/30">
              <Mail className="w-4 h-4 text-coral-light" /> {heroBadge}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-page grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Contact info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-2xl bg-gradient-hero text-white p-7 md:p-8 shadow-soft">
              <h2 className="text-2xl font-extrabold !text-white">{stationTitle}</h2>
              <p className="mt-2 text-white/85 text-sm">{stationSubtitle}</p>

              <ul className="mt-7 space-y-4 text-sm">
                <li className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                    <MapPin className="h-4 w-4 text-coral-light" />
                  </span>
                  <span>
                    <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Location</span>
                    {stationLocation}
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                    <Mail className="h-4 w-4 text-coral-light" />
                  </span>
                  <span>
                    <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Email</span>
                    <a href={`mailto:${stationEmail}`} className="text-white hover:text-coral-light transition-colors underline">
                      {stationEmail}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                    <Phone className="h-4 w-4 text-coral-light" />
                  </span>
                  <span>
                    <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Phone</span>
                    <a href={`tel:${stationPhoneTel}`} className="text-white hover:text-coral-light transition-colors underline">
                      {stationPhoneDisplay}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                    <Clock className="h-4 w-4 text-coral-light" />
                  </span>
                  <span>
                    <span className="block text-white/60 text-[11px] uppercase font-bold tracking-widest">Hours</span>
                    {stationHours}
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-warm-gray p-6 text-sm text-text-mid leading-relaxed">
              {infoParagraphs.map((para: string, idx: number) => (
                <p key={idx} className={idx < infoParagraphs.length - 1 ? "mb-3" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Form wrapper */}
          <div className="lg:col-span-7 rounded-2xl bg-warm-gray p-6 md:p-8 shadow-card space-y-5">
            <div className="flex items-center gap-2 mb-2">
              <Send className="h-6 w-6 text-coral" />
              <h2 className="text-xl md:text-3xl font-extrabold text-navy">{formTitle}</h2>
            </div>
            
            <p className="text-gray-600 font-medium leading-relaxed pb-4 border-b border-gray-200">
              {formSubtitle}
            </p>

            {/* Hidden iframe triggers handleIframeLoad when Google Form finishes processing */}
            <iframe 
              name="hidden_iframe" 
              id="hidden_iframe" 
              style={{ display: 'none' }}
              onLoad={handleIframeLoad}
            ></iframe>

            <form 
              ref={formRef}
              className="space-y-5" 
              action={formActionUrl} 
              method="POST" 
              target="hidden_iframe"
              onSubmit={() => setIsSubmitting(true)}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cname">Name *</Label>
                  <Input 
                    id="cname" 
                    name="entry.2050372848" 
                    required 
                    className="mt-1.5 bg-white text-navy font-medium" 
                  />
                </div>
                <div>
                  <Label htmlFor="cemail">Email *</Label>
                  <Input 
                    id="cemail" 
                    type="email" 
                    name="entry.608487628" 
                    required 
                    className="mt-1.5 bg-white text-navy font-medium" 
                  />
                </div>
                <div>
                  <Label htmlFor="cphone">Phone</Label>
                  <Input 
                    id="cphone" 
                    type="tel" 
                    name="entry.278774456" 
                    className="mt-1.5 bg-white text-navy font-medium" 
                  />
                </div>
                <div>
                  <Label htmlFor="cinterest">I am interested in... *</Label>
                  <select
                    id="cinterest"
                    name="entry.1990273286"
                    required
                    defaultValue=""
                    className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm font-medium text-navy"
                  >
                    <option value="" disabled>Select an option...</option>
                    {interestsList.map((i: string) => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="cmessage">Message *</Label>
                  <Textarea 
                    id="cmessage" 
                    name="entry.1454859148" 
                    required 
                    rows={5} 
                    className="mt-1.5 bg-white text-navy font-medium resize-none" 
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-12"
              >
                {isSubmitting ? "Sending..." : formSubmitLabel} <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Contact;