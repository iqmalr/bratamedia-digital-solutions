/**
 * TypeScript types for the translation dictionary.
 * All sections of the landing page are represented here.
 */

export interface NavbarDictionary {
  links: {
    services: string;
    portfolio: string;
    testimonials: string;
    contact: string;
  };
  languageToggle: {
    label: string;
    switchTo: string;
  };
  /** Accessible label for the hamburger button when the menu is closed */
  openMenu: string;
  /** Accessible label for the hamburger button when the menu is open */
  closeMenu: string;
  /** Accessible label for the mobile navigation panel */
  mobileMenu: string;
  /** Accessible label for the skip navigation link */
  skipToContent: string;
}

export interface HeroDictionary {
  headline: string;
  subheadline: string;
  cta: {
    primary: string;
    secondary: string;
  };
  scrollHint: string;
  scrollAriaLabel: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface ServicesDictionary {
  title: string;
  subtitle: string;
  items: {
    webDevelopment: ServiceItem;
    mobileDevelopment: ServiceItem;
    uiUxDesign: ServiceItem;
    digitalMarketing: ServiceItem;
    cloudInfrastructure: ServiceItem;
    itConsulting: ServiceItem;
  };
}

export interface PortfolioDictionary {
  title: string;
  subtitle: string;
  viewProject: string;
  viewAll: string;
}

export interface TestimonialsDictionary {
  title: string;
  subtitle: string;
}

export interface ContactDictionary {
  title: string;
  subtitle: string;
  form: {
    name: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    phone: {
      label: string;
      placeholder: string;
    };
    subject: {
      label: string;
      placeholder: string;
    };
    message: {
      label: string;
      placeholder: string;
    };
    submit: string;
    submitting: string;
    successMessage: string;
    errorMessage: string;
  };
  info: {
    address: string;
    email: string;
    phone: string;
  };
}

export interface FooterDictionary {
  copyright: string;
  tagline: string;
  links: {
    privacy: string;
    terms: string;
    sitemap: string;
  };
  social: {
    followUs: string;
  };
}

export interface SeoMetadataDictionary {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface Dictionary {
  navbar: NavbarDictionary;
  hero: HeroDictionary;
  services: ServicesDictionary;
  portfolio: PortfolioDictionary;
  testimonials: TestimonialsDictionary;
  contact: ContactDictionary;
  footer: FooterDictionary;
  seo: SeoMetadataDictionary;
}
