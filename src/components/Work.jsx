import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import Shuffle from './Shuffle';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "E-commerce Growth Analytics & Automation Platform",
    tags: ["AI Services", "Workflow Automation"],
    description: "Integrated e-commerce intelligence platform that consolidates sales data, monitors listing health, and tracks ad efficiency across multiple marketplaces.",
    client: "E-commerce Growth Accelerator",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/ecommerce-automation.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 2,
    title: "Logistics Firm: Travel Cost Optimization",
    tags: ["Data Science Services", "Data Analysis"],
    description: "Data integration and analytics system for optimizing corporate travel expenses across multiple data sources.",
    client: "Global Logistics Player",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/travel-analytics.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 3,
    title: "AI-Powered Procurement Agent",
    tags: ["AI Services", "Workflow Automation"],
    description: "Intelligent agent for automating procurement decisions for a luxury goods wholesaler.",
    client: "Luxury Goods Wholesaler",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/perfume-agent.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 4,
    title: "FMCG Quick Commerce Market Intelligence",
    tags: ["Web Scraping", "Data Analysis"],
    description: "Nationwide web scraping solution to track product visibility and availability across all major quick commerce platforms in India.",
    client: "Indian FMCG Conglomerate",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/quick-commerce-intelligence.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 5,
    title: "Social Media Listening and Sentiment Analysis",
    tags: ["AI Services", "Data Analysis"],
    description: "AI-powered social listening engine to track and analyze consumer sentiment across social media platforms for a flagship FMCG brand.",
    client: "Indian FMCG Conglomerate",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/social-sentiment-analysis.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 6,
    title: "Home Health Agency: Operational Workflow Automation",
    tags: ["Workflow Automation", "AI Services"],
    description: "End-to-end automation ecosystem for streamlining claims authorization, referral management, and patient onboarding for a growing home health agency.",
    client: "Texas-based Home Health Agency",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/healthcare-automation.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 7,
    title: "Industrial Conglomerate: Invoice Processing Automation",
    tags: ["AI Services", "Workflow Automation"],
    description: "End-to-end AI-driven invoice processing system with seamless ERP integration for a large industrial conglomerate.",
    client: "Indian Industrial Conglomerate",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/invoice-automation.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 8,
    title: "Expense Management Workflow Automation",
    tags: ["Workflow Automation", "Data Analysis"],
    description: "Google Workspace-based automation system for streamlining expense management and approval workflows for a fast-growing digital media company.",
    client: "Digital Media Company",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/expense-workflow-automation.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 9,
    title: "AI Agent to Handle Customer Support at Scale",
    tags: ["AI Services", "Chatbot Development"],
    description: "Purple Block built an AI-powered customer support agent for a US-based e-commerce brand — replacing a manual, human-run support operation with an intelligent agent that handles customer queries instantly, at any scale.",
    client: "US-based E-commerce Business",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/chile-based-ecommerce.jpg?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 10,
    title: "Field Marketing Verification Automation",
    tags: ["AI Services", "Workflow Automation"],
    description: "Purple Block built an intelligent field marketing verification system for one of India's largest FMCG conglomerates — replacing manual oversight with automated image validation, quality tagging, and duplicate detection to ensure accurate and fraud-proof salesman compensation.",
    client: "Leading Indian FMCG Conglomerate",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/Automating-Field-Marketing-Verification.jpg?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  },
  {
    id: 11,
    title: "Streaming & Broadcasting Platform",
    tags: ["Software Development", "Streaming Service"],
    description: "A fully home-grown streaming, broadcasting, and video collaboration platform — rivalling global products like YouTube and Google Meet, with zero foreign infrastructure dependency.",
    client: "Indian SaaS Company",
    link: "#",
    image: "https://www.purpleblock.ai/images/case-studies/made-in-india-streaming%20V2.png?dpl=dpl_9mvwsGHHCLmf1RintFaATsgT1528"
  }
];

const filters = [
  "All",
  "AI Services",
  "Data Science Services",
  "Workflow Automation",
  "Chatbot Development",
  "Web Scraping",
  "Data Analysis",
  "Software Development",
  "Streaming Service",
  "Hardware Manufacturing"
];

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Filter projects based on selected tag
  const filteredProjects = projectsData.filter(p => 
    activeFilter === "All" ? true : p.tags.includes(activeFilter)
  );

  // Safely get the active project, defaulting to first in filtered list if index is out of bounds
  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  // Reset active index when filter changes to avoid out-of-bounds errors
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    // Crossfade effect when active project changes
    if (cardRef.current && activeProject) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [activeIndex, activeFilter, activeProject]);

  return (
    <section ref={containerRef} id="work" className="relative w-full z-20 bg-transparent text-white pt-20 pb-32 px-4 md:px-16">
      
      {/* Section Header & Filters */}
      <div className="mb-12 flex flex-col gap-8">
        <div className="work-title overflow-hidden">
          <Shuffle text="OUR WORK" className="text-[2.5rem] md:text-[4rem] font-black tracking-tighter uppercase leading-none text-white/90" />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeFilter === filter 
                  ? 'bg-purple-500 text-white border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                  : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative items-start">
        
        {/* Left Side: Detail Card */}
        <div className="lg:col-span-5 relative hidden lg:block sticky top-32">
          
          {activeProject ? (
            <div 
              ref={cardRef}
              className="w-full bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Image Section - Properly positioned at top instead of background overlay */}
              {activeProject.image ? (
                <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden shrink-0 border border-white/5">
                  <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              ) : (
                <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden shrink-0 border border-white/5 bg-white/5 flex items-center justify-center">
                  <span className="text-white/20 text-xs font-bold tracking-widest uppercase">No Image</span>
                </div>
              )}

              {/* Text Content */}
              <div className="flex flex-col gap-5">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[0.65rem] font-medium tracking-wide uppercase text-purple-300/80">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-bold leading-snug text-white">
                  {activeProject.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed font-light">
                  {activeProject.description}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-[0.65rem] uppercase tracking-widest text-white/30 font-semibold">Client / Industry</span>
                  <span className="text-sm font-medium text-white/80">{activeProject.client}</span>
                </div>

                <a href={activeProject.link} className="mt-2 inline-flex items-center justify-center gap-3 px-6 py-3 border border-purple-500/30 bg-purple-500/10 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-300 group/btn cursor-none w-fit">
                  <span className="text-xs uppercase tracking-widest font-bold">View Project</span>
                  <span className="text-sm leading-none transition-transform duration-300 group-hover/btn:translate-x-1">↗</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 border border-white/10 rounded-2xl flex items-center justify-center text-white/30 text-sm font-bold uppercase tracking-widest">
              No projects found.
            </div>
          )}
        </div>

        {/* Right Side: Compact Hoverable List */}
        <div className="lg:col-span-7 flex flex-col gap-0 border-t border-white/10">
          {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className={`group hoverable relative overflow-hidden flex items-center justify-between py-4 px-0 hover:px-2 border-b border-white/10 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {/* Hover Fill Effect */}
              <div className="absolute left-0 right-0 z-0 bg-purple-600/80 transition-[height] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] top-0 group-hover:top-auto group-hover:bottom-0 h-0 group-hover:h-full pointer-events-none"></div>

              {/* Left: Project Name & Arrow */}
              <div className="relative z-10 flex items-center gap-3 w-2/3">
                <h4 className={`text-xs md:text-sm font-normal tracking-wide transition-colors duration-200 ${activeIndex === index ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
                  {project.title}
                </h4>
                {/* Arrow perfectly snug against the title */}
                <span className={`text-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeIndex === index ? 'opacity-100 text-white translate-x-0' : 'opacity-0 -translate-x-3'}`}>
                  ↗
                </span>
              </div>
              
              {/* Right: Client Name */}
              <div className="relative z-10 text-right">
                <span className={`text-[0.65rem] md:text-xs font-bold transition-colors duration-200 ${activeIndex === index ? 'text-white' : 'text-white/30 group-hover:text-white/90'}`}>
                  {project.client}
                </span>
              </div>
            </div>
          )) : (
            <div className="py-12 text-center text-white/30 text-sm font-bold uppercase tracking-widest">
              No projects match this filter.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Work;
