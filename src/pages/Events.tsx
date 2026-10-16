import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Ship, 
  Users, 
  Lightbulb, 
  Anchor,
  Handshake,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// Payload CMS Live Hook & Media Resolver
import { useMtscTorontoEventsPageLive } from "@/hooks/usePayloadLive";
import { getMediaUrl } from "@/services/api";

// Fallback Image imports for Gallery & Events
import eventHeroImg from "@/assets/eventheroimg.avif";
import eventImg1 from "@/assets/GlipmsOfevents.avif";
import eventImg2 from "@/assets/GlipmsOfevents2.avif";
import eventImg3 from "@/assets/GlipmsOfevents3.avif";
import eventImg4 from "@/assets/GettingSupport.avif";
import eventImg5 from "@/assets/event6.jpeg";
import eventImg6 from "@/assets/event7.jpeg";
import eventImg7 from "@/assets/event8.jpeg";
import womenInMaritimeImg from "@/assets/newimg/Ho1Honouring Women in Maritime – From Policy to Practice.jpg";

const iconMap: Record<string, any> = {
  Lightbulb,
  Anchor,
  Users,
  Ship,
};

const defaultHighlights = [
  {
    iconKey: "Lightbulb",
    title: "Leadership Conversations",
    description: "Interactive discussions exploring: leadership, workplace culture, retention, mentorship, operational realities, and the future of maritime excellence in Canada."
  },
  {
    iconKey: "Anchor",
    title: "Toronto Station Reopening",
    description: "Celebrating the reopening of a dedicated support and hospitality space for seafarers visiting Toronto."
  },
  {
    iconKey: "Users",
    title: "Maritime Community Gathering",
    description: "An opportunity for maritime professionals, cadets, labour leaders, volunteers, and community partners to connect and collaborate."
  },
  {
    iconKey: "Ship",
    title: "Waterfront & Port Atmosphere",
    description: "A uniquely maritime setting at the Port of Toronto connecting public awareness directly to the realities of global movement and trade."
  }
];

const defaultCarouselImages = [
  eventImg1, eventImg2, eventImg3, eventImg4, eventImg5, eventImg6, eventImg7
];

export default function Events() {
  const { data } = useMtscTorontoEventsPageLive();
  const [isHighlightsModalOpen, setIsHighlightsModalOpen] = useState(false);

  // Hero Data
  const heroTitle = data?.hero_title || "Events & Community Gatherings";
  const heroSubtitle = data?.hero_subtitle || "Mission to Seafarers Toronto hosts events, conversations, awareness initiatives, and waterfront gatherings that help connect people to maritime life and the seafarers who help keep global trade moving.";
  const heroBtnLabel = data?.hero_btn_label || "View Upcoming Events";
  const heroResolvedBg = getMediaUrl(data?.hero_bg_image, eventHeroImg) || eventHeroImg;

  // Featured Event Data
  const featuredBadge = data?.featured_badge || "Featured Event";
  const featuredTitle = data?.featured_title || "Women in Maritime 2026";
  const featuredImg = getMediaUrl(data?.featured_image, womenInMaritimeImg) || womenInMaritimeImg;
  const featuredTheme = data?.featured_theme || "Theme: From Policy to Practice: Advancing Gender Equality for Maritime Excellence";
  const featuredSubtheme = data?.featured_subtheme || "International Day for Women in Maritime & Reopening of the Mission to Seafarers Toronto Station";
  const featuredDate = data?.featured_date || "Wednesday, May 20, 2026";
  const featuredLocation = data?.featured_location || "Port of Toronto Cruise Ship Terminal";
  const featuredDescP1 = data?.featured_desc_p1 || "This gathering brings together maritime leaders, cadets, labour voices, educators, seafarers, and community partners for a day of conversation, reflection, and collaboration focused on the realities shaping women's experiences across the maritime sector.";
  const featuredDescP2 = data?.featured_desc_p2 || "The event also marks the reopening of the Mission to Seafarers Toronto Station, helping restore a welcoming place of care and connection for seafarers arriving at the Port of Toronto.";
  const featuredBtnLabel = data?.featured_btn_label || "View Event Highlights";

  // Modal Data
  const modalTitle = data?.modal_title || "What the Day Includes";
  const modalCloseLabel = data?.modal_close_label || "Close Details";
  const highlightsList = (data?.highlights_list && data.highlights_list.length > 0)
    ? data.highlights_list
    : defaultHighlights;

  // Carousel Data
  const carouselTitle = data?.carousel_title || "Stories From Our Events";
  const carouselImages = (data?.carousel_gallery && data.carousel_gallery.length > 0)
    ? data.carousel_gallery.map((item: any, idx: number) => 
        getMediaUrl(item.image, defaultCarouselImages[idx % defaultCarouselImages.length]) || defaultCarouselImages[idx % defaultCarouselImages.length]
      )
    : defaultCarouselImages;

  // CTA Data
  const ctaTitle = data?.cta_title || "Be Part of the Conversation";
  const ctaDesc = data?.cta_description || "Whether through attending an event, volunteering, donating, partnering with us, or supporting the station, every act of involvement helps strengthen care and visibility for seafarers visiting Toronto.";
  const ctaBtn1Label = data?.cta_btn1_label || "Partner With Us";
  const ctaBtn1Link = data?.cta_btn1_link || "/contact";
  const ctaBtn2Label = data?.cta_btn2_label || "Volunteer";
  const ctaBtn2Link = data?.cta_btn2_link || "/get-involved";
  const ctaBtn3Label = data?.cta_btn3_label || "Support the Toronto Station";
  const ctaBtn3Link = data?.cta_btn3_link || "/support";

  const scrollToUpcoming = () => {
    document.getElementById("upcoming-events")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-navy text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={heroResolvedBg} 
            alt="Documentary style maritime event" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/60 mix-blend-multiply"></div>
        </div>

        <div className="container relative z-10 max-w-5xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl text-gray-200 md:text-5xl lg:text-6xl font-extrabold mb-6">
            {heroTitle}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mb-10 text-gray-200 leading-relaxed">
            {heroSubtitle}
          </p>
          <Button 
            onClick={scrollToUpcoming}
            size="lg" 
            className="bg-coral hover:bg-coral-light text-white font-bold text-base md:text-lg px-8 h-14"
          >
            {heroBtnLabel}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* 2. FEATURED EVENT SECTION */}
      <section id="upcoming-events" className="py-20 lg:py-28 bg-warm-gray/30">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          
          <div className="bg-white rounded-2xl shadow-soft border border-border overflow-hidden flex flex-col lg:flex-row">
            {/* Event Image / Visual side */}
            <div className="lg:w-2/5 bg-navy relative min-h-[300px]">
              <img 
                src={featuredImg} 
                alt={featuredTitle} 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <span className="inline-block bg-coral text-white font-bold px-3 py-1 text-sm uppercase tracking-wider w-max mb-4 rounded-sm">
                  {featuredBadge}
                </span>
                <h2 className="text-3xl font-extrabold text-white">{featuredTitle}</h2>
              </div>
            </div>

            {/* Event Details side */}
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
              <div className="mb-6 space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-navy">
                  {featuredTheme}
                </h3>
                <p className="text-coral font-semibold text-lg">
                  {featuredSubtheme}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <Calendar className="w-6 h-6 text-coral shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy">When</p>
                    <p className="text-gray-600">{featuredDate}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-coral shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-navy">Where</p>
                    <p className="text-gray-600">{featuredLocation}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed mb-8">
                <p>{featuredDescP1}</p>
                <p>{featuredDescP2}</p>
              </div>

              {/* Trigger for Popup */}
              <div>
                <Button 
                  onClick={() => setIsHighlightsModalOpen(true)}
                  size="lg" 
                  variant="outline"
                  className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-bold"
                >
                  {featuredBtnLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STORIES FROM OUR EVENTS (CAROUSEL SECTION) */}
      <section className="pb-20 md:pb-24 pt-10 bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
              {carouselTitle}
            </h2>
            <div className="w-24 h-1 bg-coral mx-auto"></div>
          </div>
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-4">
              {carouselImages.map((img: string, i: number) => (
                <CarouselItem key={i} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="overflow-hidden rounded-2xl shadow-sm group">
                    <img src={img} alt={`Event moment ${i + 1}`} className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 md:-left-6" />
            <CarouselNext className="-right-4 md:-right-6" />
          </Carousel>
        </div> 
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-20 lg:py-28 bg-navy text-white text-center">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-5xl text-gray-200 font-extrabold mb-6">
            {ctaTitle}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-3xl mx-auto">
            {ctaDesc}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button asChild size="lg" className="bg-coral hover:bg-coral-light text-white font-bold w-full sm:w-auto h-14 px-8">
              <Link to={ctaBtn1Link}>
                <Handshake className="w-5 h-5 mr-2" />
                {ctaBtn1Label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-navy font-bold w-full sm:w-auto h-14 px-8">
              <Link to={ctaBtn2Link}>
                <Users className="w-5 h-5 mr-2" />
                {ctaBtn2Label}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white/20 bg-transparent text-white hover:bg-white hover:text-navy font-bold w-full sm:w-auto h-14 px-8">
              <Link to={ctaBtn3Link}>
                <Heart className="w-5 h-5 mr-2" />
                {ctaBtn3Label}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* --- POPUP (DIALOG) FOR EVENT HIGHLIGHTS --- */}
      <Dialog open={isHighlightsModalOpen} onOpenChange={setIsHighlightsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogHeader className="p-6 md:p-8 border-b bg-warm-gray/30 sticky top-0 z-10 backdrop-blur-md">
            <DialogTitle className="text-2xl md:text-3xl font-extrabold text-navy">
              {modalTitle}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlightsList.map((item: any, idx: number) => {
              const IconComp = iconMap[item.iconKey] || Lightbulb;
              return (
                <div key={idx} className="flex gap-4">
                  <div className="bg-coral/10 p-3 h-fit rounded-lg shrink-0">
                    <IconComp className="w-7 h-7 text-coral" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Popup Footer */}
          <div className="p-6 md:p-8 border-t bg-gray-50 flex justify-end">
            <Button 
              onClick={() => setIsHighlightsModalOpen(false)}
              className="bg-navy hover:bg-navy/90 text-white font-bold"
            >
              {modalCloseLabel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}