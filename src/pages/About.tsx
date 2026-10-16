import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Payload CMS Hook & Media Resolver
import { useMtscTorontoAboutPageLive } from "@/hooks/usePayloadLive";
import { getMediaUrl } from "@/services/api";

// Hero / About Image Fallback
import aboutImg from "@/assets/About.jpg";

// Images - History Timeline Fallbacks
import historyImg1 from "@/assets/image (5).png";
import historyImg2 from "@/assets/image (3).png";
import historyImg3 from "@/assets/image (4).png";

// Images - Team Fallbacks
import judithMainImg from "@/assets/Toronto Station Chaplin And manager-Rev.Judith Alltree.png";
import aliciaImg from "@/assets/Alicia Hamming Navarrete.jpg";
import danImg from "@/assets/Pastor Dan Phannenhour- Hamilton Station Chapalin-.jpg";

// Images - Board Fallbacks
import walterImg from "@/assets/Board Of Directors/Walter Stewart- Director.jpg";
import kellyMcImg from "@/assets/Board Of Directors/Kelly McDonald.jpg";
import judithBoardImg from "@/assets/Rev Judith Alltree.jpg";
import jenniferImg from "@/assets/Jennifer Carruthers.jpg";
import allwynImg from "@/assets/Board Of Directors/Allwyn Phillips.jpg";
import noahImg from "@/assets/Board Of Directors/Noah Bonis Charancle-Director.jpg";
import kellyNoseworthyImg from "@/assets/Board Of Directors/Kelly Noseworthy-Director.jpg";
import jimPoundImg from "@/assets/Board Of Directors/Captain Jim Poound Director.jpg";
import seanReidImg from "@/assets/Board Of Directors/Sean Reid-Director.jpg";
import seanSlaterImg from "@/assets/Board Of Directors/Sean Slater-Director.jpg";
import isabelleImg from "@/assets/Board Of Directors/Isabelle Therrien-Director.jpg";

const boardImageMap: Record<string, string> = {
  "Walter Stewart": walterImg,
  "Kelly McDonald": kellyMcImg,
  "Rev. Judith Alltree": judithBoardImg,
  "Jennifer Carruthers": jenniferImg,
  "Allwyn Phillips": allwynImg,
  "Noah Bonis Charancle": noahImg,
  "Kelly Noseworthy": kellyNoseworthyImg,
  "Captain Jim Pound": jimPoundImg,
  "Sean Reid": seanReidImg,
  "Sean Slater": seanSlaterImg,
  "Isabelle Therrien": isabelleImg,
};

const defaultHistoryBlocks = [
  {
    era: "1960s - 1970s",
    title: "The Beginning & A Permanent Home",
    paragraphs: [
      "The Toronto Station of The Mission to Seafarers has been serving seafarers in the Port of Toronto since the early 1960s. It is believed the Mission first began around 1961 and, in its earliest years, operated in connection with the Lutheran Church in Toronto.",
      "Before the Mission had a permanent building, there was an industrial trailer located in or near the Port. At that time, there was very little security between the harbour and Cherry Street, allowing seafarers to simply walk from their ships to the Mission.",
      "In the early 1970s, Viceroy Homes donated an Alpine-style cottage to become the Toronto Mission’s first and only permanent building. This building served as the home of the Mission until January 2019. It included both an upstairs and downstairs, and over time a large commercial kitchen and a spacious back patio were added. The station became known as a place of hospitality, fellowship, and practical support, especially during the summer months when donated barbecues were often used to host seafarers."
    ],
    img: historyImg3,
  },
  {
    era: "Decades of Service - 2019",
    title: "A Home Away From Home & A Devastating Loss",
    paragraphs: [
      "For decades, the Toronto Station provided far more than a building. It became a “home away from home” for seafarers arriving in Toronto, many of whom were far from family, short on money, and facing long periods at sea. One memorable story recalls a crew arriving from Kyiv with nowhere to stay before joining their ship. The Mission welcomed them, provided a meal, shelter, and transportation to their vessel. During their week in Toronto, they returned each evening to use the Mission’s Wi-Fi to connect with their families across the world.",
      "The Toronto Mission remained the last active harbour mission presence after the Lutheran and Catholic churches had left the waterfront many years earlier, with the Anglicans continuing the ministry. Until 2019, the station maintained a physical location in the port, while also focusing heavily on ship visiting and pastoral care.",
      "In January 2019, the historic station was lost following a devastating flood, at the same time the Port was preparing to demolish the building to make way for road expansion. The loss meant that many historical items and records connected to the Mission could not be preserved."
    ],
    img: historyImg2,
  },
  {
    era: "Today",
    title: "A New Chapter",
    paragraphs: [
      "Now, after seven years, the Toronto Station is beginning a new chapter. With the support of the Toronto Port Authority, The Mission to Seafarers is reopening a new station space within the Port of Toronto. The new location is being designed to once again provide seafarers with a welcoming place to rest, connect with loved ones, receive support, and experience the care and community that has defined the Toronto Mission since the early 1960s.",
      "Whether it is offering Wi-Fi, a haircut, transportation, a warm drink, a listening ear, or simply a place to rest, each act of support is part of something much larger: a connected network of care reaching from Toronto to ports across Canada and around the world."
    ],
    img: historyImg1,
  }
];

const defaultBoardMembers = [
  { name: "Walter Stewart", role: "Director", img: walterImg },
  { name: "Kelly McDonald", role: "Board President", img: kellyMcImg },
  { name: "Rev. Judith Alltree", role: "Vice-President", img: judithBoardImg },
  { name: "Jennifer Carruthers", role: "Treasurer", img: jenniferImg },
  { name: "Allwyn Phillips", role: "Secretary", img: allwynImg },
  { name: "Noah Bonis Charancle", role: "Director", img: noahImg },
  { name: "Kelly Noseworthy", role: "Director", img: kellyNoseworthyImg },
  { name: "Captain Jim Pound", role: "Director", img: jimPoundImg },
  { name: "Sean Reid", role: "Director", img: seanReidImg },
  { name: "Sean Slater", role: "Director", img: seanSlaterImg },
  { name: "Isabelle Therrien", role: "Director", img: isabelleImg },
];

const About = () => {
  const { data } = useMtscTorontoAboutPageLive();

  // Hero Data
  const heroTitle = data?.hero_title || "Toronto Station History";
  const heroResolvedBg = getMediaUrl(data?.hero_bg_image, aboutImg) || aboutImg;

  // History Section Data
  const historyEyebrow = data?.history_eyebrow || "Our Story";
  const historyTitle = data?.history_title || "Decades of Care at the Port of Toronto";
  const historyBlocks = (data?.history_blocks && data.history_blocks.length > 0)
    ? data.history_blocks.map((block: any, idx: number) => ({
        era: block.era,
        title: block.title,
        paragraphs: Array.isArray(block.paragraphs)
          ? block.paragraphs.map((p: any) => (typeof p === 'object' ? p.text : p))
          : [block.paragraphs || ""],
        img: getMediaUrl(block.image, defaultHistoryBlocks[idx % defaultHistoryBlocks.length]?.img) || defaultHistoryBlocks[idx % defaultHistoryBlocks.length]?.img,
      }))
    : defaultHistoryBlocks;

  // Leadership Section Data
  const teamEyebrow = data?.team_eyebrow || "Leadership";
  const teamTitle = data?.team_title || "Toronto & MTSSO team";
  const leaderHeading = data?.leader_heading || "Toronto Station Chaplin and Manager-Rev. Judith Alltree";
  const leaderName = data?.leader_name || "REV. JUDITH ALLTREE";
  const leaderImg = getMediaUrl(data?.leader_image, judithMainImg) || judithMainImg;
  const leaderParagraphs = (data?.leader_paragraphs && data.leader_paragraphs.length > 0)
    ? data.leader_paragraphs.map((p: any) => (typeof p === 'object' ? p.text : p))
    : [
        "Rev. Judith Alltree has dedicated her career to serving people across cultures, from the travel and music industries to parish ministry and maritime chaplaincy. She joined the Mission to Seafarers in 2012 as Executive Director for Toronto and later led the Mission to Seafarers Southern Ontario (MTSSO), expanding services across multiple ports.",
        "She went on to serve as Regional Director for Mission to Seafarers Canada, supporting stations nationwide through the COVID-19 pandemic and contributing to the formation of the Canadian National Seafarers Welfare Board. She also played a key role in advancing seafarer welfare in Newfoundland and Labrador, helping to establish a Port Welfare Committee in St. John’s.",
        "Now serving as Vice-President of the MTSSO Board, Rev. Alltree continues her lifelong commitment as a volunteer ship visitor and Port Chaplain in Toronto. In 2024, she received the North American Maritime Ministry Association Distinguished Service Award."
      ];

  const teamMembers = (data?.team_members && data.team_members.length > 0)
    ? data.team_members.map((m: any, idx: number) => ({
        name: m.name,
        role: m.role,
        img: getMediaUrl(m.image, idx === 0 ? aliciaImg : danImg) || (idx === 0 ? aliciaImg : danImg),
      }))
    : [
        { name: "Alicia Hamming Navarrete", role: "Program Manager -MTSSO", img: aliciaImg },
        { name: "Pastor Dan Phannenhour", role: "Hamilton Station Chapalin-", img: danImg },
      ];

  // Board of Directors Data
  const boardTitle = data?.board_title || "Our Board of Directors";
  const boardMembers = (data?.board_members && data.board_members.length > 0)
    ? data.board_members.map((member: any) => ({
        name: member.name,
        role: member.role,
        img: getMediaUrl(member.image, boardImageMap[member.name] || walterImg) || (boardImageMap[member.name] || walterImg),
      }))
    : defaultBoardMembers;

  // Structure Section Data
  const structureEyebrow = data?.structure_eyebrow || "How the Structure Works";
  const structureTitle = data?.structure_title || "One Mission. Many Hands. Shared Care.";
  const structureCards = (data?.structure_cards && data.structure_cards.length > 0)
    ? data.structure_cards
    : [
        { org_title: "Mission to Seafarers Canada", description: "provides the national foundation, leadership, and support." },
        { org_title: "Mission to Seafarers Southern Ontario", description: "guides and supports the ministry across Southern Ontario ports." },
        { org_title: "Mission to Seafarers Toronto", description: "brings that mission to life locally at the Port of Toronto." },
      ];
  const structureBottomQuote = data?.structure_bottom_quote || "Together, ensure that every seafarer who comes through Toronto is not only seen, but cared for.";

  // CTA Section Data
  const ctaTitle = data?.cta_title || "Be part of the welcome.";
  const ctaDesc = data?.cta_description || "Visit, volunteer, or give. Every contribution helps a seafarer feel seen.";
  const ctaBtn1Label = data?.cta_btn1_label || "Get Involved";
  const ctaBtn1Link = data?.cta_btn1_link || "/get-involved";
  const ctaBtn2Label = data?.cta_btn2_label || "Donate Now";
  const ctaBtn2Link = data?.cta_btn2_link || "/get-involved#donate";

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-navy min-h-[45vh] flex items-center justify-center border-b border-navy-dark">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroResolvedBg} 
            alt="About Mission to Seafarers" 
            className="w-full h-full object-cover object-center opacity-40 mix-blend-overlay" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/60 to-transparent" />
        </div>
        
        {/* Hero Content */}
        <div className="container-page relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            {heroTitle}
          </h1>
        </div>
      </section>

      {/* Visually Engaging History Timeline Section */}
      <section className="py-24 bg-warm-gray overflow-hidden">
        <div className="container-page">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-coral font-bold tracking-widest uppercase text-sm">{historyEyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-navy leading-tight">
              {historyTitle}
            </h2>
          </div>

          <div className="space-y-20 md:space-y-32 relative max-w-6xl mx-auto">
            {/* Vertical connecting line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-coral/20 -translate-x-1/2"></div>

            {historyBlocks.map((block: any, idx: number) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-16 lg:gap-24 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Timeline Center Dot */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white border-4 border-coral items-center justify-center z-10 shadow-md">
                  <div className="w-3 h-3 bg-coral rounded-full"></div>
                </div>

                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card group-hover:shadow-card-hover transition-all duration-500 border-4 border-white">
                    <img 
                      src={block.img} 
                      alt={block.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  {/* Year Badge overlay on desktop */}
                  <div className={`absolute top-8 ${idx % 2 !== 0 ? '-left-8' : '-right-8'} bg-navy text-white px-8 py-3 rounded-xl shadow-xl z-20 hidden md:block transform transition-transform group-hover:-translate-y-2`}>
                    <span className="text-xl font-bold tracking-wider">{block.era}</span>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 space-y-6 bg-white md:bg-transparent p-8 md:p-0 rounded-3xl shadow-sm md:shadow-none border md:border-none border-border relative z-10">
                  {/* Year Badge for mobile */}
                  <div className="md:hidden inline-block bg-coral text-white px-4 py-2 rounded-lg text-sm font-bold mb-2">
                    {block.era}
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-extrabold text-navy">{block.title}</h3>
                  
                  <div className="text-text-mid text-lg leading-relaxed space-y-4 font-medium">
                    {block.paragraphs.map((p: string, pIdx: number) => (
                      <p key={pIdx} className={pIdx > 0 ? "mt-4" : ""}>
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-page max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="eyebrow">{teamEyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-navy leading-tight">
              {teamTitle}
            </h2>
          </div>

          {/* Featured Leader - Rev. Judith */}
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-20 bg-warm-gray p-8 md:p-12 rounded-3xl">
            <div className="lg:col-span-5">
              <img 
                src={leaderImg} 
                alt={leaderName} 
                className="w-full rounded-2xl shadow-soft object-cover aspect-[4/5]"
              />
            </div>
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-extrabold text-navy leading-tight">
                {leaderHeading}
              </h2>
              <h3 className="mt-4 text-lg font-bold text-coral uppercase tracking-wider">
                {leaderName}
              </h3>
              <div className="mt-6 space-y-4 text-base md:text-lg text-text-mid leading-relaxed">
                {leaderParagraphs.map((para: string, idx: number) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Team Members */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center bg-white border border-warm-gray rounded-2xl p-8 shadow-card">
                <img src={member.img} alt={member.name} className="w-40 h-40 object-cover rounded-full shadow-soft mb-6" />
                <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                <p className="text-text-mid font-medium mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 md:py-28 bg-warm-gray">
        <div className="container-page max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
              {boardTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {boardMembers.map((member: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-32 h-32 md:w-40 md:h-40 mb-5 overflow-hidden rounded-full shadow-soft ring-4 ring-white transition-transform duration-300 group-hover:scale-105">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-navy">{member.name}</h4>
                <p className="text-sm text-text-mid font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How the structure works */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-page max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <span className="eyebrow">{structureEyebrow}</span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy leading-tight">
              {structureTitle}
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6 relative">
            {structureCards.map((card: any, idx: number) => (
              <div key={idx} className="rounded-2xl bg-warm-gray p-8 shadow-sm hover:shadow-card-hover transition-all">
                <p className="text-text-mid leading-relaxed">
                  <strong className="text-navy block text-lg mb-2">{card.org_title}</strong> 
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-3xl mx-auto text-center text-xl font-bold text-navy leading-relaxed">
            {structureBottomQuote}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-page">
          <div className="rounded-3xl bg-gradient-hero text-white p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-coral/30 blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold !text-white">{ctaTitle}</h2>
              <p className="mt-4 text-white/85 max-w-xl mx-auto">
                {ctaDesc}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-coral hover:bg-coral-light text-white font-bold shadow-warm h-12 px-7">
                  <Link to={ctaBtn1Link}>{ctaBtn1Label}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-navy font-bold h-12 px-7 bg-transparent">
                  <Link to={ctaBtn2Link}>{ctaBtn2Label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;