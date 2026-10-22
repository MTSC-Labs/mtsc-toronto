import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";

// Payload CMS Live Hook & Media Resolver
import { useMtscTorontoFooterLive } from "@/hooks/usePayloadLive";
import { getMediaUrl } from "@/services/api";

import logo from "@/assets/logo.jpeg";

export const SiteFooter = () => {
  const { data } = useMtscTorontoFooterLive();

  // Dynamic values with complete fallbacks
  const resolvedLogo = getMediaUrl(data?.footer_logo, logo) || logo;
  const brandTitle = data?.brand_title || "Mission to Seafarers";
  const brandSubtitle = data?.brand_subtitle || "Toronto";
  const aboutText = data?.about_text || "A local presence at the Port of Toronto. Part of Mission to Seafarers Canada and the global network in 200+ ports.";

  const exploreTitle = data?.explore_title || "Explore";
  const navLinks = (data?.nav_links && data.nav_links.length > 0)
    ? data.nav_links
    : [
        { label: "About", href: "/about" },
        { label: "Seafarer Support", href: "/support" },
        { label: "Get Involved", href: "/get-involved" },
        { label: "Contact", href: "/contact" },
      ];

  const stationTitle = data?.station_col_title || "Toronto Station";
  const locationText = data?.location_text || "Port of Toronto, ON";
  const emailText = data?.email || "glutenfreepriest@gmail.com";

  const nationalTitle = data?.national_col_title || "National Office";
  const nationalText = data?.national_text || "Major gifts, corporate partnerships are managed through Mission to Seafarers Canada.";

  const copyrightText = data?.copyright_text || "Mission to Seafarers Toronto. All rights reserved.";
  const bottomSubtext = data?.bottom_subtext || "Toronto station of Mission to Seafarers Southern Ontario · Part of Mission to Seafarers Canada";

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <footer className="bg-navy-dark text-white/90">
      <div className="container-page py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Column 1: Brand & About */}
        <div>
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group"
            onClick={handleScrollToTop}
          >
            <img 
              src={resolvedLogo} 
              alt={`${brandTitle} Logo`} 
              className="h-16 md:h-20 w-auto shrink-0 object-contain rounded-md group-hover:scale-105 transition-transform" 
            />
            <span className="flex flex-col leading-none justify-center">
              <span className="text-[16px] md:text-[18px] font-extrabold text-white whitespace-nowrap">{brandTitle}</span>
              <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.18em] text-coral-light mt-0.5 whitespace-nowrap">{brandSubtitle}</span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            {aboutText}
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">{exploreTitle}</h4>
          <ul className="space-y-2.5 text-sm">
            {navLinks.map((link: any, idx: number) => (
              <li key={link.href || idx}>
                <Link 
                  to={link.href} 
                  className="hover:text-coral-light transition-colors"
                  onClick={handleScrollToTop}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Toronto Station Info */}
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">{stationTitle}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2.5"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" />{locationText}</li>
            <li className="flex gap-2.5">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-coral-light" />
              <a href={`mailto:${emailText}`} className="hover:text-coral-light transition-colors">
                {emailText}
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: National Office Info */}
        <div>
          <h4 className="text-sm font-extrabold uppercase tracking-wider text-coral-light mb-4">{nationalTitle}</h4>
          <p className="text-sm text-white/70 leading-relaxed">
            {nationalText.includes("Mission to Seafarers Canada") ? (
              <>
                {nationalText.split("Mission to Seafarers Canada")[0]}
                <span className="text-white font-semibold">Mission to Seafarers Canada</span>
                {nationalText.split("Mission to Seafarers Canada")[1]}
              </>
            ) : (
              nationalText
            )}
          </p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <p>© {new Date().getFullYear()} {copyrightText}</p>
          <p>{bottomSubtext}</p>
        </div>
      </div>
    </footer>
  );
};