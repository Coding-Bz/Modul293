# Projektdokumentation – KI-gestützte Webentwicklung

## Einleitung

Dieses Dossier soll das Potenzial von Künstlicher Intelligenz (KI) verdeutlichen und die damit verbundenen Möglichkeiten klarer darstellen.  
Das Projekt umfasst:

- eine schriftliche Dokumentation  
- ein YouTube-Video  
- die Evaluation von vier verschiedenen KIs (drei davon im Detail)  
- für jede dieser drei KIs wurden zwei Webseiten erstellt  
- vollständiger Sourcecode + README pro Projekt

**Meine persönlichen Ziele:**

1. Ein besseres Verständnis für die Nutzung von KI in der Webentwicklung gewinnen  
2. Nicht nur die KI nutzen, sondern auch eigene Skills verbessern  
3. Lernen, welche KI wofür am besten geeignet ist  
4. Meinung der Öffentlichkeit zur KI-Webentwicklung verstehen (Umfrage)

→ Das Repository & das begleitende YouTube-Video sind **öffentlich zugänglich**.

---

## Projektplanung

**Dauer:** 7 Tage  
**Aufteilung:**

- 2 Tage: Recherche & Planung  
- 3 Tage: KI-Auswahl & Umsetzung  
- 2 Tage: Umfragen, Auswertung, Optimierung

**Getestete Tools:**

- KI-Webentwickler: `Windsurf`, `Replit`, `Cursor`, `PearAI`
- Transkription: `TurboScribe`
- Korrekturhilfe: `ChatGPT`
- Planung: `Figma`, `Draw.io`, `Microsoft 365`

Viele KIs benötigten manuelle Nachbearbeitung (z. B. für Syntax, Design, Layout).

---

## KI-gestützte Entwicklung – Vorgehensweise

### Haupttools (für Webseiten)

- **Windsurf**
- **Replit**
- **Cursor**
- **PearAI**

➡️ Ziel: Kann die KI eine funktionierende, responsive Website erstellen?

**Zusätzliche Tools:**

- **TurboScribe**: Audio-Transkription  
- **ChatGPT (JGBT)**: Grammatik-/Rechtschreibkorrektur  

Ich habe **bewusst nicht alles der KI überlassen**, sondern gezielt nachgebessert.  
Beobachtungen:

- Wo hilft die KI wirklich?
- Wo sind typische Fehler?
- Wann braucht es manuelles Eingreifen?

---

# SAT App Landing Page – Mein kompletter Prompt

## 1. 🎯 Goal of the Website
Create a clean, professional, and highly usable landing page for a **mobile app** that helps students prepare for the **SAT** (Scholastic Assessment Test).  
The site should:
- Inform, convince, and guide visitors through app features, SAT insights, and relevant universities.
- Look trustworthy and fun to explore.
- Be fully responsive across all devices.
- Include **abstract sections** for a creative, modern touch.

---

## 2. 🖥️ Website Type
A **landing page** with structured subpages:

- `/features.html`: App Features Overview
- `/feature-detail.html`: Individual Feature Page (template)
- `/sat-info.html`: General SAT Info & Stats
- `/unis.html`: SAT-Required Universities Directory
- `/contact.html`: Contact & Feedback Form
- `/calculator.html`: SAT Score Calculator

---

## 3. 🧱 Pages & Layout

| Page                  | Description                                                                 | CSS File              |
|-----------------------|-----------------------------------------------------------------------------|------------------------|
| `/index.html`         | Main page: Welcome, updates, newsletter, CTA                                | `/css/index.css`      |
| `/features.html`      | Filterable grid of all app features                                         | `/css/features.css`   |
| `/feature-detail.html`| Template for individual feature details                                     | `/css/feature-detail.css` |
| `/sat-info.html`      | SAT overview, visuals, FAQ                                                  | `/css/sat-info.css`   |
| `/unis.html`          | Filterable/searchable SAT university list                                   | `/css/unis.css`       |
| `/contact.html`       | Contact form, dropdown logic, star-rating feedback                          | `/css/contact.css`    |
| `/calculator.html`    | Interactive SAT score calculator                                             | `/css/calculator.css` |

Each page includes:
- Sticky header navigation
- Grid-based main layout
- Footer with legal info, email, privacy, social links (optional)

---

## 4. 🎨 Design Style

A **hybrid of Swiss and California design**:

- **Swiss**: strong grids, whitespace, consistent alignment, Helvetica / Inter
- **California**: bold colors, abstract SVGs, subtle animations
- **Color Palette**: max. 2 primary colors (e.g., blue & gray) + 1 accent
- **Responsive**: 320px → 1440px+

Design accents:
- Curved dividers
- Floating SVGs
- Clean, minimal but expressive

---

## 5. ⚙️ Core Functionality

- [x] Real **SAT Score Calculator** (with logic and formula)
- [x] Newsletter sign-up
- [x] Feature grid with category filter
- [x] University directory with filter/search
- [x] Contact form (subject dropdown, file upload)
- [x] Feedback module (text + star rating)
- [ ] Optional: Dark mode toggle, interactive scroll animations

---

## 6. 💡 Tech Stack

- ❌ **No frameworks** (e.g. no Bootstrap, Tailwind)
- ✅ **Native HTML5 / CSS3**
  - CSS Grid, Flexbox, media queries
- ✅ **Vanilla JavaScript**
  - Calculator logic
  - Filtering
  - Form validation
  - Toggle UI states

**Folder structure must remain clean and scalable.**

---

## 7. 🔍 Design Inspirations

- **Notion** – layout clarity  
- **Apple** – storytelling  
- **Superlist** – abstract animations  
- **Swissdesign.org** – space & typography

---

## 8. 📌 Summary

Build a **modern SAT App Landing Page** with:
- Swiss-inspired minimalism
- California-style creativity
- Multiple responsive pages
- Real SAT calculator
- Filtered content views
- Clean HTML, CSS & JS only
- Elegant UX & creative visuals




## Benutzerumfrage zur KI-Nutzung

### ❓ Frage 1: Haben Sie jemals KI benutzt?

_Antwortauswahl_  
- Ja  
- Nein  

![Diagramm: KI-Benutzung](https://raw.githubusercontent.com/Coding-Bz/Modul293/main/Diagramme/KIBenutzung.jpg)

---

### ❓ Frage 2: Würden Sie eine von einer KI erstellte Website nutzen, wenn Ihnen das bekannt ist?

_Antwortauswahl:_  
- Ja  
- Nein  

![Diagramm: Beliebtheit von KI-Webseiten](https://github.com/Coding-Bz/Modul293/blob/main/Diagramme/KIWebsiteBeliebtheit.png?raw=true)

---

### ❓ Frage 3: Welcher Website vertrauen Sie mehr?

> Einer von einer **KI** erstellten  
> oder einer von einem **Menschen** erstellten?

_Antwortauswahl:_  
- KI-Website  
- Menschliche Website  
- Kein Unterschied  

![Diagramm: Vertrauen in KI-Webseiten](https://github.com/Coding-Bz/Modul293/blob/main/Diagramme/VertrauenAnKI.png?raw=true)

---

## Erkenntnisse der Umfrage

### 🧠 Frage 1: Haben Sie jemals KI benutzt?

Diese Frage diente als Einstieg ins Thema. 20 % der Befragten gaben an, noch nie KI benutzt zu haben.  
Interessanterweise kam eine ähnliche Studie zum selben Ergebnis: Auch bei Sekundarschülerinnen und -schülern zeigte sich, dass rund 80 % bereits Erfahrung mit KI gemacht haben.

Für ein Thema, das noch nicht sehr lange präsent ist, ist das ein beachtlicher Wert – und zeigt, wie schnell sich nicht nur die IT, sondern die Gesellschaft insgesamt an neue Technologien anpasst. Auch Menschen, die im Alltag wenig mit IT zu tun haben, scheinen sich zunehmend mit KI auseinanderzusetzen.  
Dass bereits so viele in der Schweiz KI nutzen, freut mich persönlich – es ist für mich ein Zeichen von Modernität.

---

### 🌐 Frage 2: Würden Sie eine von einer KI erstellte Website nutzen, wenn Ihnen das bekannt ist?

Vor dieser Frage fragte ich auch, was den Leuten an einer Website grundsätzlich wichtig ist. Die häufigste Antwort war Übersichtlichkeit, dicht gefolgt von Benutzerfreundlichkeit.  
Design wurde zwar kaum direkt erwähnt, aber Übersichtlichkeit hängt meiner Meinung nach stark mit Design zusammen.

**86 % sagten „Ja“, sie würden eine KI-erstellte Website nutzen, wenn sie das wissen.**  
Nur 14 % lehnten das ab. Die Begründung der Ablehnenden war meist, dass sie nicht möchten, dass Menschen in der IT ihren Job an KI verlieren – also weniger technisches Misstrauen als ethische Bedenken.

Aber 86 % Zustimmung ist deutlich – das zeigt, dass KI in der Schweiz inzwischen weit akzeptiert ist, gerade im Webbereich.

---

### 🔐 Frage 3: Welcher Website vertrauen Sie mehr – einer von einer KI oder einem Menschen erstellten?

Diese Frage fand ich persönlich am spannendsten.  
**53 % sagten: „Kein Unterschied.“**  
Auf den ersten Blick wirkt das vielleicht gleichgültig oder neutral – aber ich denke, bei vielen zeigt das eher eine gewisse Offenheit und Pragmatismus. Viele dieser 53 % hatten allgemein wenig emotionale Meinung zum Thema und reagierten eher rational.

**7 % sagten sogar, dass sie einer KI-Webseite mehr vertrauen würden.**  
Eine mögliche Erklärung: Sie erwarten von großen KI-Systemen mehr Sicherheit als von kleinen, menschlich erstellten Seiten – vielleicht aus Angst vor Betrug bei Privatpersonen.

**40 % bevorzugten aber eine von einem Menschen erstellte Website.**  
Das zeigt: Viele vertrauen weiterhin lieber menschlicher Arbeit. Ganz so weit, dass wir die Kontrolle komplett der KI überlassen wollen, sind wir also noch nicht.

---

### 🎯 Persönliches Fazit

Diese Umfrage hat mir sehr geholfen, auch meine eigene Meinung weiterzuentwickeln. Die verschiedenen Antworten – egal ob pro, kontra oder neutral – haben mir neue Perspektiven gegeben.

Ich bin überzeugt: **KI wird eine immer größere Rolle spielen – ob wir es wollen oder nicht.**  
Deshalb bringt es nichts, sich pauschal dagegenzustellen. Stattdessen sollten wir versuchen, KI so mitzugestalten, dass sie die Gesellschaft **nicht negativ beeinflusst**, sondern **uns produktiver und effizienter macht**.

Solange das der Fall ist, kann KI ein echter Vorteil für uns alle sein.

---

## 🔗 Links

- [📺 Mein YouTube-Video ansehen](https://www.youtube.com/watch?v=wInEG9HPNbU)
