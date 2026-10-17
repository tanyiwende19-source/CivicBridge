
CivicBridge 🌉
Turning emergency warnings into clear, multilingual community action
CivicBridge is a web-based disaster communication and community-support prototype focused on culturally and linguistically diverse (CALD) communities in Brisbane, Australia.
The concept addresses a practical gap in emergency communication: receiving a warning does not necessarily mean understanding its local impact, knowing what to do next, or being able to access help.
CivicBridge demonstrates how a flood warning can be translated into understandable guidance, connected to residents' practical needs, and surfaced to community responders.
Prototype notice: This is a demonstration, not an operational emergency warning, navigation, or evacuation service. Maps, incidents, statistics, locations, and support workflows shown in the demo are illustrative and must not be used for real-world safety decisions.

Key Features
1. Resident View — Risk-to-Action Translator
- Presents a complex flood warning as a plain-language explanation.
- Illustrates English and Mandarin action guidance, with a multilingual voice-guidance interface.
- Highlights practical next steps such as preparing essentials, avoiding flooded roads, and requesting transport.
- Uses a sample Sunnybank household scenario to show how language and mobility barriers affect disaster response.
- Displays an illustrative local flood-risk and road-closure map.
- Includes a resident feedback interface for communicating support needs.
2. Community Dashboard
- Visualises sample community-response metrics, including warning comprehension and transport needs.
- Shows suburb-level examples across Sunnybank, Runcorn, South Brisbane, and West End.
- Presents a help-request queue organised around resident needs, language, urgency, and status.
- Demonstrates how responders could prioritise bilingual outreach and transport coordination.
3. Recovery Guide
- Illustrates a four-stage support pathway: Contact → Transport → Settle → Follow up.
- Highlights immediate needs and post-flood recovery support.
- Displays a structured resident-request example to explain how feedback can inform follow-up actions.
Example User Journey
1. A Mandarin-speaking household in Sunnybank receives a flood warning.
2. CivicBridge explains what the warning could mean for the household and provides practical steps.
3. The household identifies a transport need through the resident interface.
4. The community dashboard illustrates how that request could be organised for responders.
5. The recovery guide shows the intended follow-up process.
Project Structure
text2sql-demo/
├── index.html     # CivicBridge demo interface
├── styles.css     # Page styling (required by index.html)
├── script.js      # Interactive behaviour (required by index.html)
└── README.md      # Project documentation
Note: The uploaded HTML references styles.css and script.js. Ensure both files are present in the repository before deploying. This README does not claim that a live AI model, official alert feed, real-time mapping service, or responder backend is connected.
Run Locally
1. Download or clone the repository.
2. Keep index.html, styles.css, and script.js in the same directory.
3. Open index.html in a browser to view the prototype.
Publish with GitHub Pages
1. Upload the website files to the repository's main branch.
2. Open Settings → Pages.
3. Under Build and deployment, select Deploy from a branch.
4. Select main and /(root), then click Save.
5. Wait for GitHub Pages to provide the published site URL.
GitHub Pages hosts static websites. Any future server-side AI integration or private API credentials must be hosted and secured separately; never expose API keys in public client-side code.
Product Perspective
The prototype explores three connected design questions:
- Accessibility: How can emergency information be understandable across language barriers?
- Actionability: How can a warning help residents identify the next practical step?
- Community coordination: How can individual support needs become structured information for responders?
Current Scope and Future Opportunities
This version is a front-end demonstration. Potential future development includes verified official alert integrations, accessible multilingual content review, real geospatial data, authenticated community-response workflows, and privacy-conscious request management.
Safety Disclaimer
CivicBridge is an educational and portfolio prototype. Do not rely on its example warnings, maps, road closures, evacuation locations, or assistance requests during an actual emergency. Follow official local emergency authorities and emergency services instead.
