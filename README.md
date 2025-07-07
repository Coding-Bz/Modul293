# Projektdokumentation – KI-gestützte Webentwicklung

## Inhaltsverzeichnis

1. [Einleitung](#einleitung)  
2. [Projektplanung](#projektplanung)  
3. [KI-gestützte Entwicklung – Vorgehensweise](#ki-gestützte-entwicklung--vorgehensweise)  
4. [SAT App Landing Page – Mein kompletter Prompt](#sat-app-landing-page--mein-kompletter-prompt)  
5. [Stile & Design der abgeschlossenen Website](#stile--design-der-abgeschlossenen-website)  
6. [Benutzerumfrage zur KI-Nutzung](#benutzerumfrage-zur-ki-nutzung)  
7. [Erkenntnisse der Umfrage](#erkenntnisse-der-umfrage)  
8. [Problemlösungen](#problemlösungen)  
9. [Fazit](#fazit)  
10. [🔗 Links](#-links)

---

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

Ziel: Kann die KI eine funktionierende, responsive Website erstellen?

**Zusätzliche Tools:**

- **TurboScribe**: Audio-Transkription  
- **ChatGPT (JGBT)**: Grammatik-/Rechtschreibkorrektur  

Ich habe **bewusst nicht alles der KI überlassen**, sondern gezielt nachgebessert.  
Beobachtungen:

- Wo hilft die KI wirklich?
- Wo sind typische Fehler?
- Wann braucht es manuelles Eingreifen?

---

## SAT App Landing Page – Mein kompletter Prompt

### 1. Goal of the Website

Create a clean, professional, and highly usable landing page for a **mobile app** that helps students prepare for the **SAT** (Scholastic Assessment Test).  
The site should:
- Inform, convince, and guide visitors through app features, SAT insights, and relevant universities.
- Look trustworthy and fun to explore.
- Be fully responsive across all devices.
- Include **abstract sections** for a creative, modern touch.

### 2. Website Type

A **landing page** with structured subpages:

- `/features.html`: App Features Overview
- `/feature-detail.html`: Individual Feature Page (template)
- `/sat-info.html`: General SAT Info & Stats
- `/unis.html`: SAT-Required Universities Directory
- `/contact.html`: Contact & Feedback Form
- `/calculator.html`: SAT Score Calculator

### 3. Pages & Layout

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

### 4. Design Style

A **hybrid of Swiss and California design**:

- **Swiss**: strong grids, whitespace, consistent alignment, Helvetica / Inter
- **California**: bold colors, abstract SVGs, subtle animations
- **Color Palette**: max. 2 primary colors (e.g., blue & gray) + 1 accent
- **Responsive**: 320px → 1440px+

Design accents:
- Curved dividers
- Floating SVGs
- Clean, minimal but expressive

### 5. ⚙️ Core Functionality

- [x] Real **SAT Score Calculator** (with logic and formula)
- [x] Newsletter sign-up
- [x] Feature grid with category filter
- [x] University directory with filter/search
- [x] Contact form (subject dropdown, file upload)
- [x] Feedback module (text + star rating)
- [ ] Optional: Dark mode toggle, interactive scroll animations

### 6. Tech Stack

  - **No frameworks** (e.g. no Bootstrap, Tailwind)
  - **Native HTML5 / CSS3**
  - CSS Grid, Flexbox, media queries
  - **Vanilla JavaScript**
  - Calculator logic
  - Filtering
  - Form validation
  - Toggle UI states

**Folder structure must remain clean and scalable.**

### 7. Design Inspirations

- **Notion** – layout clarity  
- **Apple** – storytelling  
- **Superlist** – abstract animations  
- **Swissdesign.org** – space & typography

### 8. Summary

Build a **modern SAT App Landing Page** with:
- Swiss-inspired minimalism  
- California-style creativity  
- Multiple responsive pages  
- Real SAT calculator  
- Filtered content views  
- Clean HTML, CSS & JS only  
- Elegant UX & creative visuals  

---
## Stile & Design der abgeschlossenen Website

### Farbpalette

| Zweck                       | Variable / Hex                      | Beschreibung                                                   |
|----------------------------|-------------------------------------|----------------------------------------------------------------|
| **Primärfarbe**            | `--primary-blue` / `#1e90ff`        | Sat-blau (DodgerBlue), verwendet für Headlines, Buttons, Links |
| **Akzentfarbe**            | `--accent-orange` / `#ffa500`       | Für Highlights wie Verbesserungen, Hover, etc.                 |
| **Hintergrund hell**       | `--light-gray` / `#f8fafc`          | Sanfte Verläufe, Section-Hintergründe                          |
| **Hintergrund dunkel**     | `--dark-gray` / `#2d3748`           | Footer / CTA-Verläufe                                          |
| **Text Standard**          | `--medium-gray` / `#4a5568`         | Für Absätze, Labels, Infotexte                                 |
| **Weiss**                  | `--white` / `#ffffff`               | Karten, Hintergrundkontraste                                   |

### Typografie

| Element             | CSS                                                                                     |
|---------------------|------------------------------------------------------------------------------------------|
| **H1 (Hero-Heading)** | `font-size: var(--font-size-5xl)`<br>`font-weight: 700`                                 |
| **H2 (Sections)**     | `font-size: var(--font-size-3xl)`<br>`font-weight: 700`                                 |
| **H3 (Cards etc.)**   | `font-size: var(--font-size-xl)`<br>`font-weight: 600`                                  |
| **Paragraph (Text)**  | `font-size: var(--font-size-base)`<br>`color: var(--medium-gray)`                       |
| **Stat-Zahlen**       | `font-size: var(--font-size-4xl)`<br>`font-weight: 700`<br>`color: var(--primary-blue)` |
| **Buttons**           | `font-weight: 600`<br>`text-transform: uppercase`                                       |
| **Small Text**        | `font-size: var(--font-size-sm)`                                                        |

### Auswertung der KI's, welche ich benutzt habe

![image](https://github.com/user-attachments/assets/eab4ccb3-f5c9-44d1-a52c-797586c03a73](https://github.com/Coding-Bz/Modul293/blob/main/Auswertung%20der%20KI's%20Matrix.png)

Die Seite, für die ich mich letztlich entschieden habe, ist jene von Replit.  
Ein Link zur Seite und zum zugehörigen Repository befindet sich bei den [🔗 Verlinkungen](#-links).  
**Für mehr Informationen kann ich höchstens empfehlen, mein YouTube-Video anzuschauen, weil ich dort alles gezeigt habe , je eine Seite pro AI und auch meine Auswertung detailliert begründet habe. Ich habe ausserdem mein Prompt-Layout erklärt und warum dieses Thema wichtig ist.**

---

## Benutzerumfrage zur KI-Nutzung

### Frage 1: Haben Sie jemals KI benutzt?

![Diagramm: KI-Benutzung](https://raw.githubusercontent.com/Coding-Bz/Modul293/main/Diagramme/KIBenutzung.jpg)

---

### Frage 2: Würden Sie eine von einer KI erstellte Website nutzen, wenn Ihnen das bekannt ist?

![Diagramm: Beliebtheit von KI-Webseiten](https://github.com/Coding-Bz/Modul293/blob/main/Diagramme/KIWebsiteBeliebtheit.png?raw=true)

---

### Frage 3: Welcher Website vertrauen Sie mehr?

![Diagramm: Vertrauen in KI-Webseiten](https://github.com/Coding-Bz/Modul293/blob/main/Diagramme/VertrauenAnKI.png?raw=true)

---

## Erkenntnisse der Umfrage

### Frage 1: Haben Sie jemals KI benutzt?

Diese Frage diente als Einstieg ins Thema. 20 % der Befragten gaben an, noch nie KI benutzt zu haben.  
Interessanterweise kam eine ähnliche Studie zum selben Ergebnis: Auch bei Sekundarschülerinnen und -schülern zeigte sich, dass rund 80 % bereits Erfahrung mit KI gemacht haben.

Für ein Thema, das noch nicht sehr lange präsent ist, ist das ein beachtlicher Wert – und zeigt, wie schnell sich nicht nur die IT, sondern die Gesellschaft insgesamt an neue Technologien anpasst. Auch Menschen, die im Alltag wenig mit IT zu tun haben, scheinen sich zunehmend mit KI auseinanderzusetzen.  
Dass bereits so viele in der Schweiz KI nutzen, freut mich persönlich – es ist für mich ein Zeichen von Modernität.

---

### Frage 2: Würden Sie eine von einer KI erstellte Website nutzen, wenn Ihnen das bekannt ist?

Vor dieser Frage fragte ich auch, was den Leuten an einer Website grundsätzlich wichtig ist. Die häufigste Antwort war Übersichtlichkeit, dicht gefolgt von Benutzerfreundlichkeit.  
Design wurde zwar kaum direkt erwähnt, aber Übersichtlichkeit hängt meiner Meinung nach stark mit Design zusammen.

**86 % sagten „Ja“, sie würden eine KI-erstellte Website nutzen, wenn sie das wissen.**  
Nur 14 % lehnten das ab. Die Begründung der Ablehnenden war meist, dass sie nicht möchten, dass Menschen in der IT ihren Job an KI verlieren – also weniger technisches Misstrauen als ethische Bedenken.

Aber 86 % Zustimmung ist deutlich – das zeigt, dass KI in der Schweiz inzwischen weit akzeptiert ist, gerade im Webbereich.

---

### Frage 3: Welcher Website vertrauen Sie mehr – einer von einer KI oder einem Menschen erstellten?

Diese Frage fand ich persönlich am spannendsten.  
**53 % sagten: „Kein Unterschied.“**  
Auf den ersten Blick wirkt das vielleicht gleichgültig oder neutral – aber ich denke, bei vielen zeigt das eher eine gewisse Offenheit und Pragmatismus. Viele dieser 53 % hatten allgemein wenig emotionale Meinung zum Thema und reagierten eher rational.

**7 % sagten sogar, dass sie einer KI-Webseite mehr vertrauen würden.**  
Eine mögliche Erklärung: Sie erwarten von großen KI-Systemen mehr Sicherheit als von kleinen, menschlich erstellten Seiten – vielleicht aus Angst vor Betrug bei Privatpersonen.

**40 % bevorzugten aber eine von einem Menschen erstellte Website.**  
Das zeigt: Viele vertrauen weiterhin lieber menschlicher Arbeit. Ganz so weit, dass wir die Kontrolle komplett der KI überlassen wollen, sind wir also noch nicht.


---

## Problemlösungen

Wenn man neue Tools benutzt, die man noch nie verwendet hat, steht man natürlich erst mal vor einer Herausforderung. Ich musste mich einarbeiten und wollte gleichzeitig alle Features ausprobieren, die diese Tools anbieten. Das war zwar keine technische Hürde, aber definitiv etwas, das ich zeitlich unterschätzt habe.

Eine echte Herausforderung für mich war es, alles unter einen Hut zu bringen. Ich wollte zusätzlich Dinge machen, die nicht verlangt wurden, zum Beispiel die Umfrage, die ich selbst geführt habe, und das YouTube Video, das ich gedreht habe. Und da merkt man schnell: Ohne gutes Zeitmanagement geht gar nichts. Wenn man viele Ideen hat, braucht man entweder eine perfekte oder zumindest keine schlechte Planung. Und bei mir war das Zeitmanagement meiner Meinung nach definitiv ein Punkt, an dem ich am Anfang Schwierigkeiten hatte.

Ein weiterer Punkt war die Objektivität. Vor allem bei der Auswertung, zum Beispiel beim Thema Design. Ich wollte fair bleiben. Ich habe dann oft andere Leute gefragt, wie sie die Seiten finden. Meinst du, diese ist schöner oder eher die andere. Ich habe probiert, so neutral wie möglich zu sein, aber ich glaube, bei so subjektiven Dingen wie Design ist echte Objektivität fast unmöglich. Trotzdem habe ich mein Bestes gegeben, um alles so datenbasiert wie möglich zu bewerten und die Meinungen anderer Leute mit einzubeziehen.

Bei der Umfrage war es auch schwierig, Leute zu finden, die mir überhaupt ihre Meinung mitteilen wollten. Ich habe schon früher Umfragen gemacht, in Wirtschaft und IT, und auch gelernt, wie man Menschen anspricht. Aber gerade in Zürich habe ich gemerkt, viele sind skeptisch, vor allem bei solchen Themen. Und ich durfte auch nicht im Bahnhof selbst Leute ansprechen, weil das SBB Gelände ist. Also habe ich alles rund um die Europaallee gemacht, was aber im Nachhinein gar kein schlechter Ort war.

Das Video habe ich auf Englisch gemacht, obwohl das nicht meine Muttersprache ist. Ich war anfangs unsicher, aber alle in meinem Umfeld haben gesagt, ich soll es machen. Erstens, um meine Englischkenntnisse zu trainieren. Zweitens, weil ich bei Google arbeite und wir da sowieso alles auf Englisch machen. Und drittens, weil ich so eine größere Zielgruppe ansprechen kann. Ich habe das Video zuerst auf Deutsch aufgenommen, dann übersetzt und beide Versionen bereitgestellt, welches mir auch viel Zeit gekostet hat.

---

## Fazit

Insgesamt bin ich ziemlich stolz auf mein Projekt. Ich habe mehr gemacht als verlangt und das mit echtem Einsatz. Ich habe sechs verschiedene Webseiten gebaut. Für jede KI, die ich getestet habe, zwei Seiten, um fair zu bleiben. Denn es kann sein, dass die erste super läuft, die zweite aber gar nicht funktioniert. Deshalb wollte ich einen direkten Vergleich machen. Es gab auch eine KI, die gar nicht funktioniert hat, trotzdem habe ich mich über sie informiert und dazugelernt.

Ich habe eine Umfrage gemacht, um die Meinung der Gesellschaft zur KI in der Webentwicklung zu verstehen. Ich habe ein Video produziert, in dem ich live die Tools analysiere, Webseiten teste, zeige ob sie responsive sind und erkläre, wie man richtige Prompts schreibt. Ich habe das Thema wirklich breit behandelt.

Was das Zeitmanagement betrifft, ja, ich hätte vielleicht noch intelligenter planen können. Aber ich konnte die meisten meiner Ideen umsetzen. Mit mehr Zeit hätte ich sicher noch mehr geschafft, da bin ich überzeugt.

Die Umfrage hat riesiges Potenzial. Das Thema ist wichtig, jetzt und in Zukunft. Ich würde gerne eine grössere Version davon durchführen. Das wäre mein nächster Schritt.

Für mich war das Modul 293 eine Chance, eigene Interessen zu verfolgen und dabei trotzdem beim Thema zu bleiben. Es gibt bei allem noch Verbesserungspotenzial, aber für die gegebene Zeit habe ich meiner Meinung nach das Beste draus gemacht.

---

## 🔗 Links

- [📺 Mein YouTube-Video ansehen](https://www.youtube.com/watch?v=wInEG9HPNbU)
- [🌐 Projektwebsite](https://coding-bz.github.io/SATPrep-Pro/)
- [📂 Projekt-Repository auf GitHub](https://github.com/Coding-Bz/SATPrep-Pro)
