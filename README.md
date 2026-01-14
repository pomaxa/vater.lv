# SIA VATER - Metal Processing Company Website

Multilingual website for SIA VATER, a Latvian metal processing company with over 20 years of experience.

## Features

- **Multilingual Support**: Latvian (LV), English (EN), Russian (RU)
- **8 Service Pages**: Detailed information about each service
- **Gallery**: 110 photos organized by category with filtering
- **Responsive Design**: Mobile-first approach
- **OpenStreetMap Integration**: Interactive map with two business locations
- **SEO Optimized**: Schema.org markup, hreflang tags, meta descriptions

## Services

| Service | LV | EN | RU |
|---------|----|----|-----|
| Laser Cutting | Lāzergriešana | Laser Cutting | Лазерная резка |
| CNC Turning | CNC Virpošana | CNC Turning | Токарная обработка |
| Welding | Metināšana | Welding | Сварка |
| Sheet Metal | Lokšņu apstrāde | Sheet Metal Processing | Обработка листов |
| Metal Constructions | Metālkonstrukcijas | Metal Constructions | Металлоконструкции |
| Kitchen Equipment | Virtuves iekārtas | Kitchen Equipment | Кухонное оборудование |
| Food Industry | Pārtikas iekārtas | Food Industry Equipment | Пищевое оборудование |
| Staircases | Kāpnes | Staircases | Лестницы |

## Project Structure

```
vater.lv_v2/
├── assets/
│   ├── css/
│   │   ├── main.css          # Main stylesheet (imports all)
│   │   ├── variables.css     # CSS custom properties
│   │   ├── base.css          # Reset and base styles
│   │   ├── components.css    # UI components
│   │   └── utilities.css     # Utility classes
│   ├── js/
│   │   ├── main.js           # Entry point
│   │   ├── navigation.js     # Header, mobile menu
│   │   ├── gallery.js        # Gallery filtering
│   │   ├── contact-form.js   # Form validation
│   │   └── animations.js     # Scroll animations
│   └── images/
│       ├── logo/             # Logo files
│       └── services/         # Service photos
│           ├── laser_cut/
│           ├── cnc_virposana/
│           └── metala_konstrukcijas/
├── lv/                        # Latvian pages
│   ├── index.html
│   ├── pakalpojumi.html
│   ├── pakalpojumi/          # Service detail pages
│   ├── galerija.html
│   ├── par-mums.html
│   └── kontakti.html
├── en/                        # English pages
│   ├── index.html
│   ├── services.html
│   ├── services/
│   ├── gallery.html
│   ├── about.html
│   └── contact.html
├── ru/                        # Russian pages
│   ├── index.html
│   ├── uslugi.html
│   ├── uslugi/
│   ├── galereya.html
│   ├── o-nas.html
│   └── kontakty.html
└── README.md
```

## Tech Stack

- **HTML5** with semantic markup
- **CSS3** with custom properties (no frameworks)
- **Vanilla JavaScript** (ES6 modules)
- **Leaflet.js** for OpenStreetMap integration

## Local Development

```bash
# Using npx serve
npx serve

# Or Python
python -m http.server 3000

# Open in browser
open http://localhost:3000/lv/
```

## Equipment Specifications

### Laser Cutting (6KW EAGLE Fiber)
- Work surface: 4000 × 2000 mm
- Max thickness: 20 mm
- Materials: Steel, Stainless Steel, Aluminum, Brass, Copper

### CNC Turning
- Precision: ±0.02 mm
- Max diameter: 300 mm
- Max length: 1600 mm

## Contact

**SIA VATER**

**Office:**
- Address: Tvaika iela 4D, Rīga, LV-1034
- Phone: +371 26 138 249
- Email: info@vater.lv

**Laser Workshop:**
- Address: Granīta iela 9, Rīga, LV-1057

## License

All rights reserved. © SIA VATER
