# Лав Кафé — Frontend

## Overview

Лав Кафé is a luxury Russian restaurant scan-and-order web application frontend. This project provides a complete customer-facing interface for browsing menus, placing orders, and tracking order status through QR code table identification. Built with pure HTML5, CSS3, and vanilla JavaScript, it features a dark, atmospheric design inspired by Russian elegance with an Autumn Harvest color palette.

## Tech Stack

- **Pure HTML5, CSS3, JavaScript (ES6+)** — No frameworks or build tools required
- **Google Fonts:** Playfair Display (display) + Lato (body)
- **jsQR** (CDN) — QR code scanning library
- **SessionStorage** — Client-side state management
- **No dependencies** — Runs directly in the browser

## Project Structure

```
lav-cafe/
├── static/
│   ├── css/
│   │   ├── base.css              # Global variables, resets, typography, shared components
│   │   ├── landing.css           # Landing page specific styles (hero, about, steps)
│   │   ├── auth.css              # Authentication pages styles (login, register, guest)
│   │   ├── menu.css              # Menu page styles (grid, sidebar, cart panel)
│   │   ├── payment.css           # Payment page styles (two-column layout, payment cards)
│   │   └── order-status.css      # Order status styles (checkmark animation, stepper)
│   ├── js/
│   │   ├── main.js               # Global utilities (particles, transitions, ripple, cursor glow)
│   │   ├── auth.js               # Authentication logic (form validation, password strength)
│   │   ├── qr-scanner.js         # QR code scanner with camera access and jsQR integration
│   │   ├── menu.js               # Menu rendering, search, category navigation
│   │   ├── cart.js               # Shopping cart state management and persistence
│   │   ├── payment.js            # Payment form handling and order creation
│   │   └── order-status.js       # Order tracking, status progression, countdown timer
│   └── images/
│       └── .gitkeep              # Placeholder for future images
└── templates/
    ├── base.html                 # Django-compatible base template with block placeholders
    ├── index.html                # Landing page with hero, about, how it works sections
    ├── login.html                # Login page with email/password form
    ├── register.html             # Registration page with extended form and password strength
    ├── guest.html                # Guest mode page with feature comparison
    ├── qr-scan.html              # QR code scanner page with camera and manual fallback
    ├── menu.html                 # Main menu page with categories, items, and cart
    ├── payment.html              # Payment page with order review and payment methods
    └── order-status.html         # Order confirmation and live status tracking
```

## Pages & User Flow

The complete customer journey follows this sequence:

1. **Landing Page** (`index.html`)
   - Atmospheric hero section with floating particles
   - Restaurant introduction and about section
   - "How it works" 3-step guide
   - CTAs to login/register or view menu

2. **Authentication** (`login.html`, `register.html`, `guest.html`)
   - Login with email/password
   - Register with full form and password strength indicator
   - Guest mode with feature comparison (no account needed)
   - All forms include validation and floating labels

3. **QR Code Scan** (`qr-scan.html`)
   - Live camera scanner using getUserMedia API
   - jsQR library for QR code detection
   - Animated scanner box with pulsing border and sweep line
   - Manual table number fallback (1-20)
   - Saves table number to sessionStorage

4. **Menu & Cart** (`menu.html`)
   - 28 authentic Russian dishes across 7 categories
   - Category sidebar navigation with smooth scroll
   - Real-time search filtering
   - Add to cart with animations
   - Persistent cart in sessionStorage
   - Responsive cart panel (desktop) / bottom drawer (mobile)

5. **Payment** (`payment.html`)
   - Order review with items, totals, and special instructions
   - Three payment methods: Card, MonCash (Haitian mobile money), Cash
   - Dynamic forms based on selected method
   - Card number formatting and type detection
   - Form validation and loading states
   - Creates order with 6-digit ID

6. **Order Status** (`order-status.html`)
   - Animated checkmark confirmation with sparkle burst
   - Order details card with items and total
   - 4-step status tracker with live progression
   - Countdown timer (15:00 → 0:00)
   - Call server button with toast notification
   - Simulated status updates (demo mode)

## SessionStorage Schema

The application uses the following sessionStorage keys:

### `tableNumber`
- **Type:** String
- **Example:** `"7"`
- **Set by:** qr-scan.html
- **Used by:** menu.html, payment.html, order-status.html
- **Description:** Table number scanned from QR code or entered manually

### `cart`
- **Type:** JSON string
- **Structure:**
  ```json
  {
    "items": [
      {
        "id": "p1",
        "name": "Bœuf Stroganov",
        "price": 280,
        "quantity": 2
      }
    ],
    "tableNumber": "7"
  }
  ```
- **Set by:** menu.html (cart.js)
- **Used by:** menu.html, payment.html
- **Cleared by:** payment.js (after order creation)

### `orderData`
- **Type:** JSON string
- **Structure:**
  ```json
  {
    "orderId": 123456,
    "tableNumber": "7",
    "items": [...],
    "subtotal": 560,
    "service": 56,
    "total": 616,
    "paymentMethod": "card",
    "instructions": "Sans oignons",
    "timestamp": "2024-03-15T14:30:00.000Z",
    "status": "confirmed"
  }
  ```
- **Set by:** payment.js
- **Used by:** order-status.html
- **Description:** Complete order details after payment

## Django Integration Notes

This frontend is designed for seamless Django integration:

### Template Compatibility
- All HTML files are in `/templates/` — compatible with Django's template loader
- All static files in `/static/` — compatible with Django's staticfiles app
- HTML comments mark Django template block locations: `<!-- {% block content %} -->`

### Path Updates Required
Replace relative static paths with Django template tags:
```html
<!-- Current (standalone) -->
<link rel="stylesheet" href="../static/css/base.css">

<!-- Django -->
<link rel="stylesheet" href="{% static 'css/base.css' %}">
```

### Form Integration
- Form actions should point to Django URL patterns
- Add CSRF tokens: `{% csrf_token %}`
- Replace JavaScript redirects with Django form submissions

### Data Persistence
- SessionStorage can be replaced with Django sessions or database models
- Cart → Django session or database Cart model
- Order → Django Order model with foreign keys to User and MenuItem

### QR Code Generation
- QR codes should encode table-specific URLs: `/table/7/menu/`
- Generate QR codes server-side using `qrcode` Python library
- Print and place QR codes on table stands

### Authentication
- Replace frontend auth with Django's authentication system
- Use `django.contrib.auth` for user management
- Guest mode can use anonymous sessions

## Color Palette

**Autumn Harvest Theme** — Warm, luxurious, Russian-inspired

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Crimson** | `#6F1D1B` | Primary actions, badges, active states |
| **Gold** | `#BB9457` | Headings, highlights, borders, links |
| **Dark Brown** | `#432818` | Borders, dividers, secondary elements |
| **Amber** | `#99582A` | Accents, "nouveau" badges, active indicators |
| **Cream** | `#FFE6A7` | Body text, light elements, button text |
| **Background** | `#1a0e0a` | Page background (very dark brown) |
| **Surface** | `#2a1510` | Card backgrounds, panels |

## Features

### Animations & Interactions
- **Page transitions** — Smooth fade + slide between all pages
- **Button ripple effect** — Material Design-inspired click feedback
- **Floating particles** — Golden sparkles in hero and auth pages
- **Cursor glow** — Subtle golden glow follows cursor (desktop only)
- **Scroll reveal** — Elements fade in as they enter viewport
- **Checkmark animation** — SVG stroke-dashoffset drawing effect
- **Status stepper** — Animated progression with pulsing active state
- **Countdown timer** — Live MM:SS countdown with completion bell

### Responsive Design
- **Mobile-first** approach with breakpoints at 768px and 1024px
- **Desktop:** 3-column layout (sidebar + content + cart)
- **Tablet:** 2-column layout, cart becomes drawer
- **Mobile:** Single column, hamburger menu, bottom cart bar
- **Touch-friendly** — Minimum 44px touch targets

### Accessibility
- **ARIA labels** on all interactive elements
- **Keyboard navigation** — Full site navigable via keyboard
- **Focus states** — Visible golden outline on `:focus-visible`
- **Skip links** — "Aller au contenu" for screen readers
- **Semantic HTML** — Proper heading hierarchy and landmarks
- **Color contrast** — WCAG AA compliant text/background ratios

### Performance
- **No build tools** — Instant load, no compilation
- **Lazy particles** — Reduced count on mobile (10 vs 30)
- **Efficient animations** — CSS transforms and opacity only
- **Minimal dependencies** — Only jsQR for QR scanning
- **SessionStorage** — Fast client-side state management

## Running Locally

### Option 1: Direct File Open
Simply open `templates/index.html` in a modern web browser. Note: Camera/QR scanning will not work due to browser security restrictions (requires HTTPS).

### Option 2: Live Server (Recommended)
1. Install [VS Code](https://code.visualstudio.com/)
2. Install the "Live Server" extension
3. Right-click `templates/index.html` → "Open with Live Server"
4. Navigate to `http://localhost:5500/templates/index.html`

This enables camera access for QR scanning and provides a better development experience.

### Option 3: Python HTTP Server
```bash
cd lav-cafe
python -m http.server 8000
# Navigate to http://localhost:8000/templates/index.html
```

## Browser Support

- **Chrome/Edge:** 80+ ✅
- **Firefox:** 75+ ✅
- **Safari:** 13+ ✅
- **Mobile Safari:** 13+ ✅
- **Mobile Chrome:** 80+ ✅

### Required Features
- ES6+ JavaScript (arrow functions, template literals, async/await)
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
- IntersectionObserver API
- getUserMedia API (for camera/QR scanning — requires HTTPS in production)

## Development Notes

### File Organization
- **base.css** — Always loaded first, contains all CSS variables
- **Page-specific CSS** — Loaded after base.css
- **main.js** — Global utilities, loaded with `defer`
- **Page-specific JS** — Loaded after main.js with `defer`

### Code Style
- **Indentation:** 2 spaces
- **Naming:** kebab-case for CSS classes, camelCase for JavaScript
- **Comments:** Minimal, code should be self-documenting
- **No emojis** in code (except in UI where specified)

### Testing Checklist
- [ ] All pages load without console errors
- [ ] Page transitions work smoothly
- [ ] Cart persists from menu → payment
- [ ] Table number persists through entire flow
- [ ] Order data saves and displays correctly
- [ ] QR scanner works (with HTTPS/localhost)
- [ ] All forms validate properly
- [ ] Responsive on mobile/tablet/desktop
- [ ] No horizontal scroll on any page
- [ ] Keyboard navigation works
- [ ] Focus states visible

## Future Enhancements

- Real-time order updates via WebSocket
- Backend integration with Django REST API
- User account dashboard with order history
- Loyalty program and rewards
- Multi-language support (French/Russian/Creole)
- Push notifications for order status
- Payment gateway integration (Stripe, MonCash API)
- Admin panel for menu management
- Analytics and reporting
- Table reservation system

## License

This project is a demonstration frontend for educational purposes.

## Credits

**Design & Development:** Лав Кафé Frontend Team  
**Fonts:** Google Fonts (Playfair Display, Lato)  
**QR Library:** jsQR by cozmo  
**Inspiration:** Russian culinary tradition meets modern web design

---

**Bon appétit! 🍽️**
