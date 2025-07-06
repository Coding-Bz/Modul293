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

##Mein exakter Prompt an alle KI's

**Prompt: Build a SAT App Landing Page**

--Full Specification – Please follow precisely

1. What’s the goal of the website?
We want to create a clean, professional, and highly usable landing page for a mobile app that helps students prepare for the SAT (Scholastic Assessment Test). The goal is to inform, convince, and guide visitors through the app’s features, SAT insights, and relevant universities. It should look trustworthy, be fun to explore, and work perfectly on all devices. The page should also include some abstract sections to give it a creative and modern feel.

2. What type of website is it?
A landing page with additional structured subpages for:

Features

SAT information

University directory

Contact & feedback

a dedicated SAT Score Calculator

3. What’s the structure?
📂 Pages & Layout – With Matching CSS Files
HTML File	Beschreibung	CSS File
/index.html	Main landing page with welcome section, latest updates, newsletter & CTA	/css/index.css
/features.html	Overview of all app features in a filterable grid + links to detail pages	/css/features.css
/feature-detail.html	Template page for individual features (reused for each feature)	/css/feature-detail.css
/sat-info.html	General SAT information, visual stats, preparation insights, FAQ	/css/sat-info.css
/unis.html	Searchable/filterable list of SAT-required universities with detail pages	/css/unis.css
/contact.html	Team section, contact form, dropdown logic, feedback module	/css/contact.css
/calculator.html	Interactive SAT Score Calculator with real logic and result rendering	/css/calculator.css
Each page includes:

Sticky header navigation

Grid-based layout in main content

Footer with legal info, email, privacy policy, optional social links

4. What design style do we want?
A hybrid of Swiss and California design with abstract accents:

Swiss: strong grids, whitespace, consistent alignment, readable typography

California: bold colors, expressive animations, playful abstract shapes

Design balance: clean & minimal, but with small creative sections (e.g. curved dividers, subtle floating SVGs)

Typography: Helvetica / Inter / Noto Sans

Colors: max. 2 primary (e.g. blue & gray) + 1 accent color

Responsive: From 320px (mobile) to 1440px+ (desktop)

5. What functionality do we need?

SAT Score Calculator with real formulas and score logic

Newsletter sign-up form (email input)

Kategoriefilter on the Features page

Individual feature detail pages (text, image, optional video embed)

University directory with filters (e.g. country, SAT score, study area)

Contact form with dropdown subject and file upload

Feedback form (text + star rating 1–5)

Optional: map integration (for university page), dark mode toggle, animated scroll interactions

6. What technologies or frameworks should (or shouldn't) be used?

❌ No frontend frameworks (no Bootstrap, Tailwind, etc.)

✅ Only native HTML5 & CSS3 (use Grid, Flexbox, media queries)

✅ JavaScript allowed for dynamic features: filters, calculator logic, form validation, toggle states

Keep the file and folder structure clean and scalable

7. Are there any example sites that we want to use as inspiration?

Notion – for layout clarity

Apple – for product storytelling

Superlist – for animation and abstract sections

Swissdesign.org – for type, space, and precision

8. And finally — a summary of everything we just defined.

Build a modern SAT App Landing Page with Swiss-inspired minimalism and abstract California-style creativity. It should be structured across multiple responsive pages, feature a real SAT score calculator, and include filtered lists for features and SAT universities. The site is clean-coded using only HTML, CSS, and vanilla JS. Functionality includes forms, interactive filters, and animated visuals — all presented with a beautiful, professional, and engaging UX.



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
