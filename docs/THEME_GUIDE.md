# StaySphere Brand Theme & CSS Design System Guide

Official styling and token specifications for StaySphere applications and packages.

---

## 🎨 1. Color Palette & CSS Variables

```css
:root {
  /* Brand Primary Colors */
  --color-deep-ocean: #0B3D91;
  --color-teal: #00A9A5;
  
  /* Brand Accent Colors */
  --color-sunset-orange: #FF8A3D;
  --color-warm-yellow: #FFC857;
  --color-nature-green: #3CCF91;
  --color-sky-gray: #E9EEF3;

  /* Typography / Core Messaging Colors */
  --color-text-dark: #0B3D91;
  --color-text-muted: #666666;
  --color-bg-dark: #001A33; /* For Dark Mode backgrounds matching the dark logo option */

  /* Component & Icon Pillar Styles */
  --color-stay: #0B3D91;
  --color-move: #00A9A5;
  --color-explore: #FF8A3D;
  --color-support: #FFC857;
  --color-together: #3CCF91;
}
```

---

## 🏛️ 2. Typography & Brand Messaging

| Message Level | Copy | Usage Context |
| :--- | :--- | :--- |
| **Primary Tagline** | `"Stay. Move. Experience."` | Main Hero Headline & Splash screens |
| **Sub-tagline** | `"Your Journey. Our Priority."` | Subheaders & Navigation Pill Badges |
| **Secondary Message** | `"More than a booking. A better journey."` | Value proposition & feature intros |
| **Footer Tagline** | `"People. Places. Possibilities. / A BRIGHTER JOURNEY AHEAD"` | Global Application Footers |

### Text Styling Guidelines
- **Headings / Brand Name**: Sans-serif, bold weight (`font-black`), using `--color-deep-ocean` (`#0B3D91`) or crisp white for the first half (**"Stay"**) and `--color-teal` (`#00A9A5`) for the second half (**"Sphere"**).
- **Actionable Keywords**: Highlighted in accent colors (e.g., `"Experience."` in `--color-sunset-orange` `#FF8A3D`).

---

## 🎯 3. Logo Assets & Usage

The brand kit outlines four primary layouts depending on the UI context:

1. **Primary Logo (Stacked)**: Central branding, splash screens, or main landing hero areas.
2. **Horizontal Logo**: Website navigation bars, headers, and document letterheads where vertical space is constrained.
3. **Logo on Dark**: Reversed-out layout for dark mode applications or deep blue footers (`#001A33`).
4. **App Icon / Brand Icon**: A squared, rounded container (`rx="16"`) housing the dynamic "S" sphere graphic for mobile icons, favicons, or social profile pictures.

---

## 🛠️ 4. Component & Icon Pillar Styles

When designing UI features, align them with the specific brand elements:

| Pillar | Icon | Color Code | Hex Value | Target Area |
| :--- | :---: | :--- | :---: | :--- |
| **Stay** | 🛏️ | Deep Ocean | `#0B3D91` | Accommodations, hotels, villas, and luxury bookings |
| **Move** | 🚗 | Teal | `#00A9A5` | Airport transfers, car rentals, flights, transit desk |
| **Explore** | 📍 | Sunset Orange | `#FF8A3D` | Activities, dining, locations, and trip planners |
| **Support** | 🎧 | Warm Yellow | `#FFC857` | Customer service, 10-minute P0 SLA resolution desk |
| **Together** | 👥 | Nature Green | `#3CCF91` | Community features, group bookings, loyalty rewards |

---

## 📦 5. Package Structure & Consumption

- **UI Kit**: `@staysphere/ui-kit`
  - Tokens: `BRAND_COLORS`, `PILLAR_COLORS`, `STAYSPHERE_COLORS`
  - Constants: `PRIMARY_TAGLINE`, `SUB_TAGLINE`, `SECONDARY_MESSAGE`, `FOOTER_TAGLINE`, `BRAND_PILLARS`
  - Components: `<HorizontalLogo />`, `<StackedLogo />`, `<LogoOnDark />`, `<AppIcon />`
- **Guest Web App**: `apps/web-guest`
- **Operations Control Tower**: `apps/web-control-tower`
