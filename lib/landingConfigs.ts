import { LandingConfig } from "@/components/LandingTemplate";

export const landingConfigs: Record<string, LandingConfig> = {
  "outscraper-csv-cleaner": {
    slug: "outscraper-csv-cleaner",
    eyebrow: "Outscraper CSV cleaner",
    headline: "Clean Outscraper CSV exports",
    headlineAccent: "before outreach.",
    subhead:
      "Outscraper and Google Maps exports often contain duplicate companies, directory URLs, missing websites, generic emails, and rows that should not go directly into Instantly, Smartlead, Clay, Apollo, or your CRM.",
    metaTitle: "Outscraper CSV Cleaner for Lead Lists | SiteEnrich",
    metaDescription:
      "Clean Outscraper and Google Maps CSV exports before outreach. Detect duplicate companies, directory URLs, bad websites, missing/risky emails, and send/review/skip rows before importing into Instantly, Smartlead, Clay, Apollo, or your CRM.",
    body: [
      // Section 1
      {
        type: "heading",
        text: "Why raw Outscraper CSVs need cleanup",
      },
      {
        type: "paragraph",
        text: "Raw scraped lead exports can look usable at first, but many rows are not ready for outreach. The problems usually show up after you try to import the file into an outreach tool or enrichment workflow.",
      },
      {
        type: "list",
        items: [
          "Duplicate companies across different searches, cities, and categories",
          "Directory or social URLs in the website column",
          "Google Maps, Yelp, Facebook, LinkedIn, or local directory pages instead of real business websites",
          "Missing or dead websites",
          "Missing emails or generic inboxes",
          "Phone-only rows with no clear website",
          "Email domains that do not match the business website",
          "Rows that should be reviewed or skipped before sending",
        ],
      },

      // Section 2
      {
        type: "heading",
        text: "Email verification does not fix bad rows",
      },
      {
        type: "paragraph",
        text: "Email verification can help check whether an email domain looks deliverable, but it does not clean the whole lead row. It will not reliably catch duplicate businesses, directory URLs, bad website fields, irrelevant companies, or rows with no real business website.",
      },
      {
        type: "compare",
        leftTitle: "Email verification checks",
        leftItems: [
          "Email format",
          "MX / domain status",
          "Invalid or risky email signals",
        ],
        rightTitle: "Lead-list cleanup checks",
        rightItems: [
          "Duplicate companies",
          "Directory / social URLs",
          "Dead or missing websites",
          "Bad source URLs",
          "Missing contact signals",
          "Send / review / skip recommendation",
        ],
      },

      // Section 3
      {
        type: "heading",
        text: "A better cleanup order before outreach",
      },
      {
        type: "steps",
        steps: [
          { title: "Normalize columns", body: "Get every row into a consistent shape so the fields line up before anything else runs." },
          { title: "Clean website and domain fields", body: "Strip tracking params, decode encoded URLs, add missing schemes, and extract a clean root domain." },
          { title: "Detect directory, social, and source URLs", body: "Separate real business websites from Yelp, Facebook, LinkedIn, and directory links." },
          { title: "Dedupe by clean domain, phone, and email", body: "The same business can appear under multiple searches or map listings — some sharing a domain, others only a phone. Check all three." },
          { title: "Check website status", body: "Fetch each real site and record whether it's live, redirects, times out, or is dead." },
          { title: "Extract emails and phones where possible", body: "Crawl contact and about pages on live sites to pull contact info the export missed." },
          { title: "Run basic email/MX quality checks", body: "Validate syntax, check MX records, and flag role, free, placeholder, and mismatched emails." },
          { title: "Mark each row as send, review, or skip", body: "Give every row a clear recommendation and a human-readable reason." },
        ],
      },
      {
        type: "paragraph",
        text: "The goal is to avoid sending bad rows into enrichment, sequencing, or CRM import. Clean the row first, then verify and enrich the subset that is actually worth using.",
      },

      // Section 4
      {
        type: "heading",
        text: "Example cleaned Outscraper rows",
      },
      {
        type: "recTableFull",
        caption: "Before / after — sample rows",
        rows: [
          { business: "Smith HVAC", website: "smithhvac.com", email: "info@smithhvac.com", rec: "send", reason: "Real website; MX valid; not duplicate" },
          { business: "Modern Bath NJ", website: "callmodernbath.com", email: "—", rec: "review", reason: "Website live; phone found; no email" },
          { business: "Green Home Installations", website: "greenhomeinstallations.org", email: "info@greenhouse.org", rec: "review", reason: "Email domain mismatch" },
          { business: "Geyer Construction Inc", website: "localsearch.com/profile/geyer", email: "—", rec: "skip", reason: "Directory profile URL; no real website" },
          { business: "Gateway Construction Co", website: "gatewayconstructionco.com", email: "—", rec: "skip", reason: "Duplicate phone" },
          { business: "Smith HVAC LLC", website: "smithhvac.com/contact", email: "sales@smithhvac.com", rec: "skip", reason: "Duplicate domain" },
        ],
      },

      // Section 5
      {
        type: "heading",
        text: "Real sample result from a scraped local-business file",
      },
      {
        type: "table",
        caption: "First 100 rows",
        headers: ["Metric", "Count"],
        rows: [
          ["Rows processed", "100"],
          ["Sendable", "13"],
          ["Review", "22"],
          ["Skipped", "65"],
          ["Duplicates", "60"],
          ["Emails found", "60"],
        ],
      },
      {
        type: "callout",
        text: "In one scraped local-business sample, only 13 of 100 rows were immediately sendable. SiteEnrich detected 60 duplicate rows before the file reached outreach.",
      },
      {
        type: "paragraph",
        text: "This is why the cleanup step matters. The file looked like a lead list, but most rows needed review or skipping before import.",
      },

      // Section 6
      {
        type: "heading",
        text: "What you get back",
      },
      {
        type: "columns",
        intro: "Every row comes back with a clear send, review, or skip recommendation and a human-readable reason. Output columns include:",
        items: [
          "cleanedDomain",
          "websiteStatus",
          "sourceType",
          "email",
          "emailStatus",
          "phone",
          "recommendation",
          "reason",
          "warnings",
          "duplicateOf",
          "duplicateReason",
        ],
      },

      // Section 7
      {
        type: "cta",
        heading: "Clean your Outscraper CSV before outreach",
        lines: [
          "Upload an old or redacted Outscraper, Google Maps, Apify, Apollo, or Clay export and run 100 rows free. No signup required.",
          "Company name plus website/domain and email or phone is enough for a useful test.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does this work with any Outscraper export?",
        a: "Yes — Google Maps, Google search, and local business exports all work. Upload the CSV directly; SiteEnrich auto-detects the website column and processes the first 100 rows free.",
      },
      {
        q: "Why is domain and phone deduplication important for Outscraper?",
        a: "Outscraper can return the same business across multiple searches, cities, categories, or map listings. Some duplicates share the same website domain, while others only share a phone number. SiteEnrich checks duplicates across clean domain, phone, and email so the same business is not imported into outreach multiple times.",
      },
      {
        q: "Is this email verification?",
        a: "No. SiteEnrich runs basic email and MX quality checks and flags risky rows — it is not full mailbox-level verification. It catches the data-quality problems verifiers miss: duplicates, directory URLs, dead websites, and irrelevant rows.",
      },
      {
        q: "What does it cost?",
        a: "The first 100 rows are free with no signup. Full-file cleanup starts at $49 and is processed personally.",
      },
    ],
  },
};