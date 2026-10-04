import { FormEvent, MouseEvent, ReactNode, useEffect, useRef, useState } from "react";

const media = {
  car: "https://images.unsplash.com/photo-1628890954311-74476fcbf0d4?auto=format&fit=crop&w=1800&q=88",
  carWide: "https://images.unsplash.com/photo-1623346483743-b968a27ed34c?auto=format&fit=crop&w=1800&q=88",
  camera: "https://images.unsplash.com/photo-1641146715549-58d8d543ae90?auto=format&fit=crop&w=1800&q=88",
  editor: "https://images.unsplash.com/photo-1619850015633-5cb0c02b1eb5?auto=format&fit=crop&w=1800&q=88",
  mixer: "https://images.unsplash.com/photo-1619850015546-84a1c7b7aed0?auto=format&fit=crop&w=1800&q=88",
  abstract: "https://images.unsplash.com/photo-1709377195538-5522ed0f9e10?auto=format&fit=crop&w=1800&q=88",
  light: "https://images.unsplash.com/photo-1700938551374-7ec1983ef60d?auto=format&fit=crop&w=1800&q=88",
};

const projects = [
  { n: "01", title: "NEW CAR CAMPAIGN", category: "ADS", meta: "AUTOMOTIVE / ADVERTISING", file: "NEW CAR FN 4.mp4", description: "A fast-paced automotive promotional edit designed to create energy, movement and excitement.", image: media.car },
  { n: "02", title: "MEMORY BOX", category: "ADS", meta: "PRODUCT AD / STORYTELLING", file: "MEMORY BOX LEH LAD AD 1.mp4", description: "An emotional product story shaped through clean pacing and cinematic detail.", image: media.abstract },
  { n: "03", title: "SNZ", category: "REELS", meta: "SOCIAL MEDIA / SHORT FORM", file: "SNZ CC 05_4.mp4", description: "A high-energy social edit built around rhythm, visual hooks and fast pacing.", image: media.light },
  { n: "04", title: "INTRO FN", category: "MOTION GRAPHICS", meta: "MOTION DESIGN / INTRO", file: "INTRO FN 2.mp4", description: "A dynamic introduction combining motion, typography and sound-driven transitions.", image: media.camera },
];

const services = [
  ["01", "SHORT-FORM VIDEO", "Reels, Shorts and TikTok edits designed around hooks, pacing, retention and visual storytelling."],
  ["02", "YOUTUBE & VLOG EDITING", "Long-form edits with structured storytelling, sound design, B-roll and cinematic transitions."],
  ["03", "SOCIAL MEDIA ADS", "Performance-focused video ads designed to communicate quickly and capture attention."],
  ["04", "MOTION GRAPHICS", "Animated type, transitions, visual effects, kinetic graphics and branded motion elements."],
  ["05", "THUMBNAIL DESIGN", "Scroll-stopping thumbnails built around composition, hierarchy, emotion and curiosity."],
  ["06", "BRAND & PROMOTIONAL", "Professional content for products, businesses, creators, launches and campaigns."],
];

const faq = [
  ["What type of videos do you edit?", "Reels, Shorts, YouTube videos, vlogs, social ads, product films, promotional videos and motion-led content."],
  ["Do you edit both short-form and long-form content?", "Yes. Every format gets its own approach to structure, pacing, retention and storytelling."],
  ["Can you create thumbnails along with videos?", "Yes. Editing and thumbnail design can be delivered together as one consistent visual package."],
  ["How long does an edit usually take?", "Turnaround depends on scope, footage volume and complexity. A clear delivery schedule is agreed before work begins."],
  ["Can you work with raw footage?", "Absolutely. Send the raw footage, brand assets and brief—I handle the structure, edit and finish."],
  ["Do you provide revisions?", "Yes. Projects include a defined revision stage so the final piece feels precise and approved."],
  ["Can you work with creators and businesses remotely?", "Yes. My workflow is built for remote collaboration with creators, brands and agencies worldwide."],
];

function Arrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" /></svg>;
}

function ButtonLink({ href, children, secondary = false }: { href: string; children: ReactNode; secondary?: boolean }) {
  return <a href={href} className={`button ${secondary ? "button-secondary" : ""}`}><span>{children}</span><Arrow /></a>;
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-head reveal">
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {copy && <p>{copy}</p>}
  </div>;
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  const card = useRef<HTMLElement>(null);
  const tilt = (event: MouseEvent<HTMLElement>) => {
    if (!card.current || window.innerWidth < 768) return;
    const rect = card.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.current.style.setProperty("--rx", `${y * -4}deg`);
    card.current.style.setProperty("--ry", `${x * 5}deg`);
  };
  return <article ref={card} className={`project-card reveal project-${index + 1}`} onMouseMove={tilt} onMouseLeave={() => { card.current?.style.setProperty("--rx", "0deg"); card.current?.style.setProperty("--ry", "0deg"); }}>
    <div className="project-visual">
      <img src={project.image} alt={`${project.title} cinematic project still`} />
      <div className="project-overlay" />
      <span className="project-number">{project.n}</span>
      <span className="project-play"><span>PLAY</span></span>
      <span className="timecode">00:00:{index + 2}:18</span>
    </div>
    <div className="project-info">
      <div><span className="eyebrow">{project.meta}</span><h3>{project.title}</h3></div>
      <p>{project.description}</p>
      <a href="#contact" className="text-link">WATCH PROJECT <Arrow /></a>
      <span className="filename">{project.file}</span>
    </div>
  </article>;
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [openFaq, setOpenFaq] = useState(0);
  const [testimonial, setTestimonial] = useState(0);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  const testimonials = [
    ["Daniel understood exactly what the video needed. The pacing and transitions completely changed the final result.", "CLIENT NAME", "CREATOR / BRAND"],
    ["The process was clear, collaborative and fast. Every detail felt considered, right through to the final frame.", "CLIENT NAME", "AGENCY PARTNER"],
    ["The edit gave our idea the energy it was missing. It felt polished, intentional and made for the audience.", "CLIENT NAME", "BUSINESS / CREATOR"],
  ];

  return <main>
    <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <a className="wordmark" href="#top">DANIEL<span>.</span></a>
      <div className={`nav-links ${menu ? "nav-open" : ""}`}>
        {["WORK", "SERVICES", "ABOUT", "PROCESS", "CONTACT"].map((item) => <a key={item} onClick={() => setMenu(false)} href={`#${item.toLowerCase()}`}>{item}</a>)}
      </div>
      <a href="#contact" className="nav-cta">LET'S WORK TOGETHER <Arrow /></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><span /><span /></button>
    </nav>

    <section className="hero" id="top">
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div className="lens-wrap" aria-hidden="true">
        <div className="orbit orbit-one"><span /></div>
        <div className="orbit orbit-two"><span /></div>
        <div className="lens"><div className="lens-ring"><div className="lens-glass"><i /></div></div></div>
        <div className="floating-frame frame-one"><img src={media.carWide} alt="" /></div>
        <div className="floating-frame frame-two"><img src={media.abstract} alt="" /></div>
      </div>
      <div className="hero-content">
        <div className="hero-kicker"><span>CREATIVE VIDEO EDITOR</span><span>MOTION DESIGNER</span><span>THUMBNAIL DESIGNER</span></div>
        <h1><span>I TURN RAW FOOTAGE</span><span>INTO VISUAL STORIES</span><span>PEOPLE <em>REMEMBER.</em></span></h1>
        <div className="hero-bottom">
          <p>Video editing, motion graphics and thumbnail design for creators, brands and businesses.</p>
          <div className="hero-actions"><ButtonLink href="#work">VIEW MY WORK</ButtonLink><ButtonLink href="#contact" secondary>LET'S WORK TOGETHER</ButtonLink></div>
        </div>
      </div>
      <div className="hero-rail"><span>1000+ VIDEOS EDITED</span><span>REELS • VLOGS • ADS • MOTION • THUMBNAILS</span><a href="#intro">SCROLL TO EXPLORE ↓</a></div>
    </section>

    <section className="intro shell" id="intro">
      <span className="eyebrow reveal">[ 01 / THE APPROACH ]</span>
      <h2 className="statement reveal">GOOD EDITING ISN'T<br />JUST CUTTING CLIPS.</h2>
      <div className="intro-copy reveal">
        <p className="lead">Every cut has a purpose. Every transition has a reason. Every frame should move the story forward.</p>
        <div><p>Hi, I'm Daniel — a creative video editor and thumbnail designer focused on turning raw footage and ideas into content that demands attention.</p><p>After editing 1000+ videos, I've learned that great editing isn't about adding more effects. It's about knowing exactly when to use them.</p></div>
      </div>
      <div className="marquee"><div>STORY. <em>TIMING.</em> IMPACT. STORY. <em>TIMING.</em> IMPACT.</div></div>
    </section>

    <section className="work shell" id="work">
      <SectionHeader eyebrow="[ 02 / SELECTED PROJECTS ]" title="SELECTED WORK" copy="Projects built to capture attention, communicate ideas and keep viewers watching." />
      <div className="filters" role="group" aria-label="Filter projects">
        {["ALL", "REELS", "VLOGS", "ADS", "MOTION GRAPHICS", "THUMBNAILS", "SOCIAL MEDIA"].map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="projects">
        {projects.filter((p) => filter === "ALL" || p.category === filter).map((project, i) => <ProjectCard project={project} index={i} key={project.title} />)}
        {filter !== "ALL" && !projects.some((p) => p.category === filter) && <div className="empty-state"><span>NEW CUTS IN PROGRESS</span><p>This category is being updated. Explore all work for the latest selection.</p><button onClick={() => setFilter("ALL")}>VIEW ALL →</button></div>}
      </div>
    </section>

    <section className="showreel shell">
      <SectionHeader eyebrow="[ FEATURE PRESENTATION ]" title="THE SHOWREEL" copy="One minute. A collection of cuts, transitions, motion graphics and visual moments that represent how I think behind the timeline." />
      <div className="showreel-player reveal">
        <img src={media.editor} alt="Dark professional editing suite" />
        <div className="player-ui"><span>REC <i /></span><span>00:00:01:24</span></div>
        <button aria-label="Play showreel" className="showreel-play"><span>PLAY</span><small>SHOWREEL</small></button>
        <div className="player-timeline"><span /><i /><i /><i /><i /><i /><i /></div>
      </div>
    </section>

    <section className="services shell" id="services">
      <SectionHeader eyebrow="[ 03 / CAPABILITIES ]" title="WHAT I DO" copy="From the first cut to the final frame, I turn raw footage into content designed to perform." />
      <div className="service-list">
        {services.map(([n, title, copy]) => <article className="service reveal" key={title}><span>{n}</span><h3>{title}</h3><p>{copy}</p><i><Arrow /></i></article>)}
      </div>
    </section>

    <section className="why">
      <div className="shell"><SectionHeader eyebrow="[ PROOF / PRACTICE ]" title="WHY DANIEL?" copy="I look at the entire viewing experience — the hook, pacing, emotion, sound, visuals and final frame." /></div>
      <div className="why-track">
        {["1000+ VIDEOS EDITED", "STORY-FIRST EDITING", "SOCIAL-FIRST MINDSET", "FAST & RELIABLE DELIVERY", "DETAIL-FOCUSED FINISHING", "EDITING + DESIGN"].map((item, i) => <div className="why-card" key={item}><span>0{i + 1}</span><h3>{item}</h3></div>)}
      </div>
    </section>

    <section className="process shell" id="process">
      <SectionHeader eyebrow="[ 04 / WORKFLOW ]" title="FROM RAW FOOTAGE TO FINAL FRAME." />
      <div className="timeline reveal">
        <div className="timeline-ruler">{Array.from({ length: 20 }).map((_, i) => <i key={i} />)}</div>
        {[["01", "DISCOVER", "Understand the goal, audience, brand and message."], ["02", "BUILD", "Organize footage, establish the story and create the first cut."], ["03", "POLISH", "Refine pacing, sound, color, motion graphics and transitions."], ["04", "DELIVER", "Review and deliver final content ready for publishing."]].map(([n, title, copy], i) => <article className={`timeline-step step-${i + 1}`} key={title}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
        <div className="timeline-playhead"><span>00:34</span></div>
      </div>
    </section>

    <section className="philosophy">
      <div className="philosophy-noise" />
      <span className="eyebrow">EDITING PHILOSOPHY / 05</span>
      <blockquote className="reveal">“THE BEST EDIT IS THE ONE YOU DON'T NOTICE — <em>YOU JUST FEEL THE STORY.</em>”</blockquote>
      <p>Remove what doesn't matter, emphasize what does, and make every second earn its place.</p>
    </section>

    <section className="thumbnails shell">
      <SectionHeader eyebrow="[ CLICK-WORTHY DESIGN ]" title="STOP THE SCROLL." copy="A great video can still be ignored if nobody clicks. I design around curiosity, clarity, emotion and visual hierarchy." />
      <div className="thumb-gallery">
        {[media.car, media.camera, media.abstract, media.carWide, media.light, media.mixer].map((image, i) => <article className="thumb-card" key={image}><img src={image} alt={`Thumbnail design concept ${i + 1}`} /><div><span>0{i + 1} / THUMBNAIL</span><h3>{["FULL SPEED", "THE SETUP", "MAKE IT MATTER", "NIGHT DRIVE", "IN MOTION", "BEHIND THE SOUND"][i]}</h3><a href="#contact">VIEW DESIGN →</a></div></article>)}
      </div>
    </section>

    <section className="social shell">
      <div className="social-copy">
        <SectionHeader eyebrow="[ SOCIAL-FIRST CONTENT ]" title="BUILT FOR THE FEED." copy="Short-form lives in a different world. The first few seconds matter. The pacing matters. The visual hook matters." />
        <div className="metric-labels">{["HOOK", "PACING", "RETENTION", "VISUAL IMPACT", "STORY"].map((x) => <Tag key={x}>{x}</Tag>)}</div>
      </div>
      <div className="phone-stage reveal">
        <div className="phone phone-back"><img src={media.abstract} alt="Vertical motion design preview" /></div>
        <div className="phone"><div className="phone-top" /><img src={media.car} alt="Vertical automotive reel preview" /><div className="phone-ui"><span>DANIEL / EDIT</span><strong>THE FIRST 3 SECONDS<br />CHANGE EVERYTHING.</strong><span>▶ 00:08</span></div></div>
      </div>
    </section>

    <section className="about shell" id="about">
      <div className="about-visual reveal"><img src={media.camera} alt="Cinema camera in a dark studio" /><span>BASED IN INDIA<br />WORKING WORLDWIDE</span></div>
      <div className="about-copy">
        <SectionHeader eyebrow="[ 06 / ABOUT ]" title="BEHIND THE TIMELINE." />
        <p className="lead">I'm Daniel, a creative video editor and thumbnail designer who turns ordinary footage into content that feels intentional, energetic and memorable.</p>
        <p>I've edited 1000+ videos across short-form social content, vlogs, advertisements, promotional videos and motion graphics. What started as editing clips became a fascination with storytelling, timing, sound and visual design.</p>
        <div className="tag-row">{["VIDEO EDITING", "MOTION DESIGN", "THUMBNAIL DESIGN", "STORYTELLING"].map((t) => <Tag key={t}>{t}</Tag>)}</div>
      </div>
    </section>

    <section className="tools">
      <div className="shell"><span className="eyebrow">TOOLS OF THE TRADE</span></div>
      <div className="tools-marquee"><div>{["PREMIERE PRO", "AFTER EFFECTS", "PHOTOSHOP", "DAVINCI RESOLVE", "ILLUSTRATOR", "CAPCUT", "MOTION GRAPHICS", "COLOR GRADING", "SOUND DESIGN", "VFX"].map((tool) => <span key={tool}>{tool} <i>✦</i></span>)}</div></div>
    </section>

    <section className="collab shell">
      <SectionHeader eyebrow="[ COLLABORATION ]" title="BUILT FOR CREATORS, BRANDS & BUSINESSES." copy="Whether you're launching a product, growing a channel or building a campaign, the goal stays the same — make people stop, watch and remember." />
      <div className="collab-grid">
        {[["CREATORS", "YouTube, reels, shorts, personal brands and content series."], ["BRANDS", "Advertisements, promotional content, launches and campaigns."], ["AGENCIES", "Editing support, motion graphics, thumbnails and production collaboration."]].map(([title, copy], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>

    <section className="testimonials shell">
      <SectionHeader eyebrow="[ CLIENT NOTES ]" title="WORDS FROM THE PEOPLE I'VE WORKED WITH." />
      <div className="quote-card reveal">
        <span className="quote-mark">“</span>
        <blockquote>{testimonials[testimonial][0]}</blockquote>
        <div><p>— {testimonials[testimonial][1]}</p><span>{testimonials[testimonial][2]}</span></div>
        <div className="quote-nav">{testimonials.map((_, i) => <button aria-label={`View testimonial ${i + 1}`} className={testimonial === i ? "active" : ""} onClick={() => setTestimonial(i)} key={i}>{String(i + 1).padStart(2, "0")}</button>)}</div>
      </div>
    </section>

    <section className="faq shell">
      <SectionHeader eyebrow="[ QUESTIONS / ANSWERS ]" title="BEFORE WE HIT PLAY." />
      <div className="faq-list">
        {faq.map(([q, a], i) => <article className={openFaq === i ? "open" : ""} key={q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{String(i + 1).padStart(2, "0")}</span><strong>{q}</strong><i>{openFaq === i ? "−" : "+"}</i></button><div><p>{a}</p></div></article>)}
      </div>
    </section>

    <section className="final-cta">
      <div className="cta-frame cta-frame-one"><img src={media.carWide} alt="" /></div>
      <div className="cta-frame cta-frame-two"><img src={media.abstract} alt="" /></div>
      <span className="eyebrow">YOUR NEXT PROJECT / 07</span>
      <h2>HAVE FOOTAGE?<br /><em>LET'S MAKE SOMETHING</em><br />WORTH WATCHING.</h2>
      <p>Got a project, campaign, channel or idea that needs a better visual story?</p>
      <div><ButtonLink href="#contact">START A PROJECT</ButtonLink><ButtonLink href="#work" secondary>VIEW MY WORK</ButtonLink></div>
    </section>

    <section className="contact shell" id="contact">
      <div className="contact-details">
        <SectionHeader eyebrow="[ AVAILABLE FOR PROJECTS ]" title="LET'S CREATE." />
        <p>Tell me what you're making, where it needs to live and what success looks like. I'll help shape the rest.</p>
        <a href="mailto:daney4019@gmail.com">daney4019@gmail.com</a>
        <a href="tel:+916374015672">+91 6374015672</a>
        <div className="availability"><i /><span>AVAILABLE FOR FREELANCE<br />REMOTE COLLABORATION<br />CREATOR & BRAND PARTNERSHIPS</span></div>
      </div>
      <form onSubmit={submit} className="contact-form">
        <label>NAME<input required name="name" placeholder="YOUR NAME" /></label>
        <label>EMAIL<input required type="email" name="email" placeholder="YOU@EMAIL.COM" /></label>
        <label>PROJECT TYPE<select name="type" defaultValue=""><option value="" disabled>SELECT TYPE</option><option>VIDEO EDITING</option><option>MOTION GRAPHICS</option><option>THUMBNAIL DESIGN</option><option>FULL CREATIVE PACKAGE</option></select></label>
        <label>BUDGET RANGE<select name="budget" defaultValue=""><option value="" disabled>SELECT RANGE</option><option>₹10K — ₹25K</option><option>₹25K — ₹50K</option><option>₹50K+</option><option>LET'S DISCUSS</option></select></label>
        <label className="full">TELL ME ABOUT YOUR PROJECT<textarea required name="message" placeholder="THE IDEA, TIMELINE, DELIVERABLES..." /></label>
        <button className="submit" type="submit"><span>{sent ? "PROJECT RECEIVED" : "SEND PROJECT"}</span><Arrow /></button>
      </form>
    </section>

    <footer>
      <div className="footer-top"><span>CREATIVE VIDEO EDITOR<br />MOTION DESIGNER<br />THUMBNAIL DESIGNER</span><div>{["WORK", "SERVICES", "ABOUT", "CONTACT"].map((x) => <a href={`#${x.toLowerCase()}`} key={x}>{x}</a>)}</div><div>{["INSTAGRAM", "YOUTUBE", "LINKEDIN", "BEHANCE"].map((x) => <a href="#contact" key={x}>{x}</a>)}</div></div>
      <div className="footer-word">DANIEL<span>.</span></div>
      <div className="footer-bottom"><span>© 2026 DANIEL. ALL RIGHTS RESERVED.</span><span>CUT WITH PURPOSE.</span><a href="#top">BACK TO TOP ↑</a></div>
    </footer>
  </main>;
}

export default App;
