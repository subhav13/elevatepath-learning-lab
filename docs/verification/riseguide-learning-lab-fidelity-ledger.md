# RiseGuide Learning Lab fidelity ledger

Reference: [`docs/visuals/riseguide-learning-lab-concept.png`](../visuals/riseguide-learning-lab-concept.png)

Verification date: 2026-09-15

## Reference comparison

| Reference evidence | Rendered evidence | Decision |
| --- | --- | --- |
| Deep ink/navy foundation with indigo-blue content surfaces | Chrome desktop and in-app browser screenshots show the same dark ink shell, blue cards, and high-contrast white type | Kept |
| Lime progress/active-state signal with coral warmth for streak cues | Goal selection, active navigation, progress bars, completion states, and streak icon use lime/coral accents | Kept |
| Desktop experience uses a left rail and compact navigation | Desktop browser check showed the rail, brand, nav, progress note, and unobstructed content; the nav alignment was corrected during QA | Fixed and kept |
| Mobile experience uses a bottom navigation bar and stacked cards | In-app browser check showed the five-item bottom nav and stacked responsive card layout at the narrower viewport | Kept |
| Above-the-fold promise is short, practical, and time-bounded | The rendered home heading is “Your next 15 minutes” with supporting copy about a focused communication lesson | Kept |
| The concept presents a daily learning loop rather than a content-heavy dashboard | Home opens into one next lesson, the journey reveals sequential lessons, Practice provides one prompt, and Profile shows local progress | Kept |

## Interaction evidence

- Goal selection moved onboarding to Home and persisted the selected goal in local storage.
- The first lesson opened from Home, accepted the correct quiz answer, revealed feedback, and enabled completion.
- Practice accepted a response and returned deterministic “Strong foundation” feedback.
- SEEK changed to “You are on the list” and explicitly stated that interest remains local until expert search is connected.
- Profile displayed the selected goal and local completion count.

## Intentional deviations

- Account creation, cloud sync, live AI coaching, speech analysis, audio playback, expert retrieval, and external notifications remain deferred. The MVP labels those boundaries instead of simulating unavailable services.
- The concept is an original visual direction for RiseGuide Learning Lab; no proprietary RiseGuide assets or copied interface text were used.

