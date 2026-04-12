import type { Dictionary } from "@/i18n/types";

const en: Dictionary = {
  navbar: {
    links: {
      services: "Services",
      portfolio: "Portfolio",
      testimonials: "Testimonials",
      contact: "Contact",
    },
    languageToggle: {
      label: "Language",
      switchTo: "Bahasa Indonesia",
    },
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileMenu: "Mobile navigation",
    skipToContent: "Skip to main content",
  },

  hero: {
    headline: "Turn Your Business Ideas into Digital Reality",
    subheadline:
      "From custom websites to mobile apps, we build digital products that create measurable growth for your business.",
    cta: {
      primary: "Get Started",
      secondary: "View Portfolio",
    },
    scrollHint: "Scroll",
    scrollAriaLabel: "Scroll to services",
  },

  services: {
    title: "Our Services",
    subtitle:
      "We provide a range of technology services to help your business thrive in the digital era.",
    items: {
      webDevelopment: {
        title: "Web Development",
        description:
          "Building modern, fast, and responsive websites using the latest technologies.",
      },
      mobileDevelopment: {
        title: "Mobile Applications",
        description:
          "Developing intuitive, high-performance iOS and Android applications.",
      },
      uiUxDesign: {
        title: "UI/UX Design",
        description:
          "Crafting visually appealing interfaces and delightful user experiences.",
      },
      digitalMarketing: {
        title: "Digital Marketing",
        description:
          "Effective digital marketing strategies to increase your business visibility and conversions.",
      },
      cloudInfrastructure: {
        title: "Cloud Infrastructure",
        description:
          "Scalable and secure cloud solutions to support your business growth.",
      },
      itConsulting: {
        title: "IT Consulting",
        description:
          "Comprehensive technology consulting for your business digital transformation.",
      },
    },
  },

  portfolio: {
    title: "Our Portfolio",
    subtitle:
      "Real projects, real results. Work that helped our clients grow their businesses.",
    viewProject: "View Project",
    viewAll: "View All Projects",
  },

  testimonials: {
    title: "What Our Clients Say",
    subtitle:
      "Client trust is our measure of success. Here is what it is like to work with Bratamedia.",
  },

  contact: {
    title: "Let's Work Together",
    subtitle:
      "Have a question or want to discuss your project? We are ready to help.",
    form: {
      name: {
        label: "Full Name",
        placeholder: "Enter your full name",
      },
      email: {
        label: "Email Address",
        placeholder: "Enter your email address",
      },
      phone: {
        label: "Phone Number",
        placeholder: "Enter your phone number (optional)",
      },
      subject: {
        label: "Subject",
        placeholder: "What would you like to discuss?",
      },
      message: {
        label: "Message",
        placeholder: "Tell us more about your needs...",
      },
      submit: "Send Message",
      submitting: "Sending...",
      successMessage:
        "Your message has been sent successfully. We will contact you shortly.",
      errorMessage:
        "An error occurred while sending your message. Please try again.",
    },
    info: {
      address: "Jakarta, Indonesia",
      email: "hello@bratamedia.id",
      phone: "+62 812 3456 7890",
    },
  },

  footer: {
    copyright: "© {year} Bratamedia Digital Solutions. All rights reserved.",
    tagline: "Building digital products that help your business grow.",
    links: {
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      sitemap: "Sitemap",
    },
    social: {
      followUs: "Follow Us",
    },
  },

  seo: {
    title: "Bratamedia Digital Solutions — Indonesian Software House",
    description:
      "Bratamedia Digital Solutions is a trusted Indonesian software house providing custom web development, mobile apps, UI/UX design, and IT consulting.",
    ogTitle: "Bratamedia — Trusted Software House in Indonesia",
    ogDescription:
      "Bratamedia is a trusted Indonesian software house. We build custom websites, mobile apps, and cloud solutions that drive real business growth — from concept to launch.",
  },
};

export default en;
