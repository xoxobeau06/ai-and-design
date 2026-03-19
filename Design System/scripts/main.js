const THEMES = {
  cozy: {
    primary:   ['#F7F2E9','#D4A5A0','#9DAF98','#92ADC1','#4A3728'],
    primaryNames: ['Field','Blush','Sage','Dusty Blue','Warm Brown'],
    secondary: ['#C9BFB0','#E8DDD0','#F4D281','#C5ABD2','#D4E4EE'],
    secondaryNames: ['Dust','Petal','Butter','Lavender','Sky'],
    typeIntro: 'Four typefaces, four registers. Script for the big emotional moments. Handwriting for personal labels. Typewriter for texture. Serif for everything that needs to be read comfortably.',
    pairing:   'All four share warmth and age. Script carries the voice. Shadows Into Light carries the personality. Special Elite carries the texture. Lora carries the story.',
    specimens: [
      { label:'Display — Big Headlines',    style:'font-family:"Pinyon Script",cursive;font-size:38px;',          sample:'A cozy morning in the studio',                              face:'Pinyon Script',      role:'Display headlines, key titles',      size:'36–72px — let it breathe'  },
      { label:'Accent — Personal Moments',  style:'font-family:"Shadows Into Light",cursive;font-size:24px;',    sample:'a note, a label, a small thought \u273f',                  face:'Shadows Into Light', role:'Labels, captions, ribbon text',      size:'11–18px — warm and casual' },
      { label:'Typewriter / Mid — Texture', style:'font-family:"Special Elite",monospace;font-size:17px;',       sample:'Section Title — Project Label — Caption',                   face:'Special Elite',      role:'Section headers, ribbon labels',     size:'14–20px — textured'        },
      { label:'Serif / Body — Readability', style:'font-family:"Lora",serif;font-size:14px;font-weight:400;',    sample:'The system supports long reading. Rhythm, breath, warmth.', face:'Lora',               role:'All body copy, descriptions',        size:'16–18px / 1.7 line height' },
    ],
    toneColors: ['#e8e4dc','#d4cfc6','#D4A5A0','#C5ABD2','#9DAF98','#92ADC1','#F4D281'],
    copy: {
      coverTitle:   'A Personal<br><em>Visual</em><br>System.',
      coverSub:     'Calm \u00b7 Thoughtful \u00b7 Warm \u00b7 Comforting \u2014 Personal Visual System, Graphic Design Final Project',
      coverDesc:    'This system is built around one atmosphere: golden morning light, a calm studio, a journal desk. Lace and ribbons hold it together. Ivory and dusty rose set the mood. Everything here is a creative decision \u2014 not a restriction, but a commitment to a feeling.',
      p2intro:      'This is a personal visual system for a graphic design portfolio \u2014 not a UI framework. It exists to support atmosphere and storytelling. Every decision here serves a feeling first, efficiency second.',
      p2feel:       'Like stepping into a calm, cozy creative space \u2014 a studio at golden morning light.',
      p2audience:   'Anyone encountering my portfolio \u2014 the system should feel personal, warm, and intentional.',
      p2never:      'Clinical, cold, generic, over-engineered, or like a UI framework. Never harsh, never purely efficient.',
      p2idea:       'A curated corkboard: clustered, layered, breathing \u2014 organized but flowy, structured but handmade.',
      p2goalsLabel: 'Emotional goals \u2014 the four words this system lives by',
      word1:'Calm', word2:'Thoughtful', word3:'Warm', word4:'Comforting',
      p3intro:      'Five colours, five moods. Nothing reaches full saturation \u2014 every colour stays soft enough to feel like morning.',
      p3primaryLabel:   'Primary palette \u2014 Cream and Pressed Flower',
      p3secondaryLabel: 'Secondary + accent palette',
      lbl_c1:'Field \u2014 dominant surface',    col1:'#F7F2E9 \u2014 warm ivory, old book paper.',
      lbl_c2:'Blush \u2014 primary accent',      col2:'#D4A5A0 \u2014 dusty rose. Borders, motifs, panel washes.',
      lbl_c3:'Sage \u2014 botanical contrast',   col3:'#9DAF98 \u2014 muted grey-green. Prevents blurring.',
      lbl_c4:'Warm Brown \u2014 ink',            col4:'#4A3728 \u2014 all text. Never pure black.',
      lbl_c5:'Dusty Blue \u2014 unexpected note',col5:'#92ADC1 \u2014 from your moodboard\'s night skies.',
      lbl_c6:'Colour rule',                      col6:'Nothing reaches full saturation. Every colour stays soft enough to feel like morning, not noon.',
      lbl_csrc:'Colour source',                  colsrc:'Pressed flowers in an old journal. Warm light through linen curtains. A studio desk at 8am.',
      p5intro:      'The layout system is built on clusters, not columns. Content groups into pinned moments. Breathing room is not wasted space. It is atmosphere.',
      p5base:       '8px base. Between clusters: always LG+. Breathing room is atmosphere.',
      p5layout:     'Cluster-based. Content groups as pinned moments. Elements mostly align to grid but can drift slightly for warmth.',
      p5rule:       'Every page has one moment of rest and one of focus. One quiet, one present. Never more than one focal point per page.',
      p6intro:      'Design should feel calm, thoughtful, and welcoming. This system supports atmosphere and storytelling \u2014 not just efficiency.',
      voice1:       'This system sounds like a handwritten note tucked inside a book you love.',
      voice2:       'It would never speak like a tech product, a corporate brand, or anything clinical or cold.',
      voice3:       'If this system were a person, they would be thoughtful, quiet, and surrounded by beautiful small things.',
      p7intro:      'Your mind is already a giant, messy moodboard. This page makes that thinking visible. Collect what moves you \u2014 but look for the feeling, not the specific element.',
      p7notesLabel: 'What these references share',
      p8intro:      'These are the commitments that make this system behave like itself \u2014 even when you\'re not in the room. Every rule here serves the feeling.',
      motifLabel:   'Motif hierarchy \u2014 the decorative grammar',
      motif1:'Lace \u2014 dominant. Borders, panel edges, background texture, page framing.',
      motif2:'Ribbons \u2014 structural. Horizontal dividers, section labels, connectors.',
      motif3:'Flowers \u2014 accent. Appear at meaningful moments, not repeated continuously.',
      motif4:'Teacups \u2014 signature. Recurring personal mark. Appears with intention.',
      motif5:'Stars \u2014 punctuation. Tiny inline markers, end-of-section signals.',
      alwaysLabel:  'Always \u2014 things this system does',
      always1:'Always use warm brown (#4A3728) for text \u2014 never pure black.',
      always2:'Always give content generous breathing room \u2014 LG spacing minimum between clusters.',
      always3:'Always keep one focal point per page. One quiet, one present.',
      neverLabel:   'Never \u2014 things this system refuses to do',
      never1:'Never use pure black, cool greys, or full-saturation colour.',
      never2:'Never scatter motifs without intention. Decoration without grammar becomes noise.',
      never3:'Never feel clinical, efficient, or like a UI framework.',
      coreLabel:    'The one rule that holds everything together',
      coreRule:     'Every decision serves the feeling first. The feeling is: calm, thoughtful, warm, comforting \u2014 a cozy creative space at golden morning light.',
      closingQuote: '\u201cAI generates structure, human generates reasoning.\u201d',
    }
  },

  minimal: {
    primary:   ['#1A1714','#3C3530','#6B6158','#A09890','#D0C8BE'],
    primaryNames: ['Ink','Near Black','Mid','Dust','Pale'],
    secondary: ['#E8E4DE','#F0EDE8','#FDFCFA','#C8C0B8','#B0A8A0'],
    secondaryNames: ['Warm White','Paper','Pure White','Cool Dust','Ash'],
    typeIntro: 'Two typefaces. That is all. DM Serif Display for the headlines \u2014 elegant, italic, a single weight. IBM Plex Serif for everything else \u2014 light, precise, unhurried.',
    pairing:   'One serif for expression. One serif for information. The tension between italic warmth and upright clarity is the whole system.',
    specimens: [
      { label:'Display / Headline',  style:'font-family:"DM Serif Display",Georgia,serif;font-size:42px;font-style:italic;font-weight:400;', sample:'A considered, quiet headline.',                                                          face:'DM Serif Display',   role:'All headings, cover title, section titles', size:'32\u201360px italic'        },
      { label:'Body / Running text', style:'font-family:"IBM Plex Serif",Georgia,serif;font-size:14px;font-weight:300;',                     sample:'The system supports long, careful reading. Nothing competes. Nothing decorates. Only the content.', face:'IBM Plex Serif Light', role:'All body copy, labels, captions, fields', size:'11\u201316px / 1.9 leading' },
    ],
    toneColors: ['#F0EDE8','#E0DDD8','#C8C0B8','#A09890','#786E68','#4A4440','#1A1714'],
    copy: {
      coverTitle:   'A Personal<br>Visual<br>System.',
      coverSub:     'A graphic design portfolio system. Restrained, precise, considered.',
      coverDesc:    'This system is built on restraint. Nothing added without purpose. Nothing removed without thought. The white space is not empty \u2014 it is the work.',
      p2intro:      'A visual system is a set of decisions made in advance. This one was made quietly, with care. Its purpose is legibility, not decoration.',
      p2feel:       'Like opening a very well-made book. Considered. Unhurried. Nothing out of place.',
      p2audience:   'Anyone encountering my portfolio \u2014 the system should signal precision and intentionality without announcing itself.',
      p2never:      'Busy, decorative, sentimental, or loud. Never more than necessary.',
      p2idea:       'The white space is not empty. It is where the eye rests. It is part of the composition.',
      p2goalsLabel: 'Four principles this system is built on',
      word1:'Restraint', word2:'Precision', word3:'Clarity', word4:'Silence',
      p3intro:      'Five tones of a single neutral. No colour for decoration \u2014 only for function. Contrast is the only accent.',
      p3primaryLabel:   'Primary scale \u2014 ink to paper',
      p3secondaryLabel: 'Surface scale \u2014 light values',
      lbl_c1:'Ink \u2014 primary text',      col1:'#1A1714 \u2014 near black. All body text and structure.',
      lbl_c2:'Dark \u2014 emphasis',          col2:'#3C3530 \u2014 headings, borders, strong elements.',
      lbl_c3:'Mid \u2014 secondary text',     col3:'#6B6158 \u2014 captions, labels, metadata.',
      lbl_c4:'Dust \u2014 receding elements', col4:'#A09890 \u2014 rules, quiet dividers, placeholders.',
      lbl_c5:'Pale \u2014 subtle surface',    col5:'#D0C8BE \u2014 tinted panels, alternate backgrounds.',
      lbl_c6:'Colour rule',                   col6:'One neutral scale only. If you need colour to communicate, redesign the layout.',
      lbl_csrc:'Colour source',               colsrc:'The inside of a new hardback. The margin of a typeset page. Linen, ash, bone.',
      p5intro:      'The grid is the system. Everything aligns. Margins are generous. The column is never wider than 65 characters. White space is a structural element, not a gap.',
      p5base:       '8px base unit. Never deviate. Magic numbers create maintenance problems.',
      p5layout:     'Column-based. Content aligns to the grid at all times. Nothing drifts. Nothing decorates.',
      p5rule:       'Every element has a reason to be where it is. If you cannot state the reason, remove the element.',
      p6intro:      'This system has no personality. It has a point of view. The difference: personality decorates. A point of view edits.',
      voice1:       'This system communicates through what it removes, not what it adds.',
      voice2:       'If a word is not necessary, it is not present. If a visual element is not functional, it does not exist.',
      voice3:       'If this system were a person, they would be a very good editor.',
      p7intro:      'References are collected for what they remove, not what they add. Look for systems that know when to stop.',
      p7notesLabel: 'What these references have in common',
      p8intro:      'These rules are the system. Follow them and the work will be consistent. Break them with a reason or do not break them at all.',
      motifLabel:   'Structural elements \u2014 the only decoration is function',
      motif1:'Hairline rule \u2014 0.5px. Used to separate, never to decorate.',
      motif2:'Negative space \u2014 the primary compositional tool. Use it deliberately.',
      motif3:'Italic \u2014 the only typographic emphasis permitted.',
      motif4:'Small caps \u2014 for labels and metadata only.',
      motif5:'Nothing else. Every addition requires a written justification.',
      alwaysLabel:  'Always',
      always1:'Always align to the 8px grid. Every margin, every padding, every gap.',
      always2:'Always use the type scale. No custom sizes.',
      always3:'Always ask: what can be removed?',
      neverLabel:   'Never',
      never1:'Never add a visual element for decoration alone.',
      never2:'Never use more than two type sizes on a single spread.',
      never3:'Never fill silence. Silence is the point.',
      coreLabel:    'The one rule',
      coreRule:     'If it does not need to be there, it is not there.',
      closingQuote: '\u201cPerfection is achieved not when there is nothing more to add, but when there is nothing left to take away.\u201d',
    }
  },

  abstract: {
    primary:   ['#1A1A1A','#D4A5A0','#9DAF98','#92ADC1','#F2EDE4'],
    primaryNames: ['Black','Blush','Sage','Blue','Off-White'],
    secondary: ['#E8E0D4','#F4D281','#C5ABD2','#4A4A4A','#D0D0D0'],
    secondaryNames: ['Sand','Butter','Lavender','Dark Grey','Mid Grey'],
    typeIntro: 'One typeface. Syne. Eight weights. Every hierarchy comes from weight and scale alone \u2014 no mixing, no decoration, no compromise.',
    pairing:   'Syne 800 for impact. Syne 400 for information. The only variable is size. The system is the grid, not the font.',
    specimens: [
      { label:'DISPLAY / IMPACT',    style:'font-family:"Syne",sans-serif;font-size:52px;font-weight:800;letter-spacing:-0.04em;line-height:0.9;text-transform:uppercase;', sample:'BOLD\nSYSTEM',                                                       face:'Syne 800', role:'Cover, section titles, all major headings', size:'40\u201380px uppercase' },
      { label:'HEADING / STRUCTURE', style:'font-family:"Syne",sans-serif;font-size:22px;font-weight:700;letter-spacing:-0.02em;text-transform:uppercase;',                sample:'SECTION TITLE \u2014 SUBHEADING',                                     face:'Syne 700', role:'Page subheadings, panel labels',           size:'18\u201328px uppercase' },
      { label:'Body / Information',  style:'font-family:"Syne",sans-serif;font-size:13px;font-weight:400;letter-spacing:0.01em;',                                          sample:'Running text, descriptions, captions. Compact, direct, no ornament.', face:'Syne 400', role:'All body copy, field labels',             size:'11\u201314px regular'   },
    ],
    toneColors: ['#F2EDE4','#D4A5A0','#9DAF98','#92ADC1','#F4D281','#C5ABD2','#1A1A1A'],
    copy: {
      coverTitle:   'A Personal<br><em>Visual</em><br>System.',
      coverSub:     'GRAPHIC DESIGN \u00b7 FINAL PROJECT \u00b7 PORTFOLIO SYSTEM',
      coverDesc:    'This system is built on contrast and collision. Colour blocks against negative space. Weight against lightness. The system does not whisper. It states.',
      p2intro:      'A visual system is a set of constraints that produces freedom. This one is structural, bold, and unambiguous. It does not ask to be liked. It asks to be understood.',
      p2feel:       'Like a poster that stops you. Immediate, unambiguous, impossible to miss.',
      p2audience:   'Anyone encountering my portfolio \u2014 the system should create immediate visual impact and communicate confidence.',
      p2never:      'Soft, apologetic, over-qualified, or decorative. Never timid. Never vague.',
      p2idea:       'The grid is the composition. The weight is the hierarchy. The colour is the mood. That is all.',
      p2goalsLabel: 'Four words this system is built from',
      word1:'BOLD', word2:'DIRECT', word3:'STRUCTURED', word4:'LOUD',
      p3intro:      'Five colours. Used in full. Black for structure, blush and sage and blue for accent, off-white for breath. No pastels, no tints \u2014 the colours are themselves.',
      p3primaryLabel:   'Primary palette \u2014 full and direct',
      p3secondaryLabel: 'Extended palette \u2014 accent and surface',
      lbl_c1:'Black \u2014 primary structure',   col1:'#1A1A1A \u2014 all type, all borders, all structure.',
      lbl_c2:'Blush \u2014 warm accent',         col2:'#D4A5A0 \u2014 primary colour block. Used at full coverage.',
      lbl_c3:'Sage \u2014 cool accent',          col3:'#9DAF98 \u2014 secondary colour block. Balances the blush.',
      lbl_c4:'Blue \u2014 third accent',         col4:'#92ADC1 \u2014 used for emphasis panels and key callouts.',
      lbl_c5:'Off-white \u2014 negative space',  col5:'#F2EDE4 \u2014 the background. The breath. The silence between blocks.',
      lbl_c6:'Colour rule',                       col6:'Every colour is used at 100%. No tints. No transparency. Colour means something here.',
      lbl_csrc:'Colour source',                   colsrc:'Risograph prints. Screen-printed posters. Swiss International Style. Bold palettes that commit.',
      p5intro:      'The grid is rigid and intentional. Content does not drift \u2014 it snaps. Every element is placed with purpose. The layout is the argument.',
      p5base:       '8px base. Hard alignments only. The grid is the system \u2014 honour it.',
      p5layout:     'Column-based, strict. Full-bleed colour blocks extend to the page edge. Content lives inside the grid. Colour blocks can break it.',
      p5rule:       'Every page has one dominant element. Everything else is subordinate. There is no ambiguity about what to look at first.',
      p6intro:      'This system has a strong voice. It does not negotiate its tone. It is direct, energetic, and deliberate. It knows what it wants to say.',
      voice1:       'This system speaks like a well-designed poster: you know exactly what it means the moment you see it.',
      voice2:       'It would never hedge, over-explain, or use five words when two will do.',
      voice3:       'If this system were a person, they would walk into a room and own it immediately.',
      p7intro:      'References are collected for their structural confidence. Look for systems that make a decision and hold it. No hedging. No softening.',
      p7notesLabel: 'What these references share',
      p8intro:      'These rules create the system\'s character. They are not suggestions. The constraints are the identity.',
      motifLabel:   'Structural grammar \u2014 how the system marks itself',
      motif1:'Colour block \u2014 full bleed, full coverage. The primary visual gesture.',
      motif2:'Heavy rule \u2014 3px minimum. Structure is visible.',
      motif3:'Uppercase \u2014 all section titles and labels. No exceptions.',
      motif4:'Offset shadow \u2014 6px black. Used on cards and panels for depth.',
      motif5:'Negative space \u2014 the fifth element. The system breathes in the white.',
      alwaysLabel:  'Always',
      always1:'Always use Syne. No other typeface exists in this system.',
      always2:'Always place the dominant element first. Hierarchy is non-negotiable.',
      always3:'Always use colour at 100% opacity. Tints are not permitted.',
      neverLabel:   'Never',
      never1:'Never use more than three colours on a single spread.',
      never2:'Never use a soft edge where a hard one is possible.',
      never3:'Never be tentative. Every decision should look like it was made on purpose.',
      coreLabel:    'The one rule',
      coreRule:     'Make the decision. Commit to it. Do not apologise for it.',
      closingQuote: '\u201cThe grid \u2014 it\'s an attitude, a conviction, a formal constraint that forces creativity.\u201d',
    }
  },

  dark: {
    primary:   ['#F0E8DC','#D4A5A0','#9DAF98','#92ADC1','#F4D281'],
    primaryNames: ['Ivory','Blush','Sage','Blue','Gold'],
    secondary: ['#141009','#2A2018','#4A3728','#8A7868','#C9BFB0'],
    secondaryNames: ['Near Black','Deep Brown','Warm Brown','Mid Brown','Dust'],
    typeIntro: 'Same fonts as Cozy Studio \u2014 but experienced at night. Pinyon Script glows warm against the dark. Lora settles into the shadow. The system becomes lamplight.',
    pairing:   'The same four typefaces read completely differently on dark paper. Warmth becomes luminosity. Texture becomes depth. The palette does the work.',
    specimens: [
      { label:'Display \u2014 Glowing Headlines',  style:'font-family:"Pinyon Script",cursive;font-size:38px;color:#F0E8DC;',      sample:'A warm light in the dark studio',                        face:'Pinyon Script',      role:'Display headlines, key titles', size:'36\u201372px \u2014 luminous'      },
      { label:'Accent \u2014 Handwritten Light',   style:'font-family:"Shadows Into Light",cursive;font-size:24px;color:#D4A5A0;', sample:'a quiet note in the lamplight \u2726',                   face:'Shadows Into Light', role:'Labels, captions, annotations', size:'11\u201318px \u2014 glowing'       },
      { label:'Typewriter \u2014 Worn Warmth',     style:'font-family:"Special Elite",monospace;font-size:17px;color:#C9BFB0;',    sample:'Section Title \u2014 Journal Entry \u2014 Note',         face:'Special Elite',      role:'Section headers, labels',       size:'14\u201320px \u2014 aged'          },
      { label:'Serif \u2014 Reading by Lamplight', style:'font-family:"Lora",serif;font-size:14px;font-weight:400;color:#E8DDD0;', sample:'The system supports long, quiet reading in low light.',  face:'Lora',               role:'All body copy, descriptions',   size:'16\u201318px / 1.7 leading' },
    ],
    toneColors: ['#2A2018','#3A3020','#4A3728','#D4A5A0','#9DAF98','#92ADC1','#F4D281'],
    copy: {
      coverTitle:   'A Personal<br><em>Visual</em><br>System.',
      coverSub:     'Calm \u00b7 Thoughtful \u00b7 Warm \u00b7 Comforting \u2014 Personal Visual System, Graphic Design Final Project',
      coverDesc:    'This system is built around one atmosphere: golden morning light, remembered at night. The same warmth. The same care. Seen now by lamplight.',
      p2intro:      'This is a personal visual system for a graphic design portfolio \u2014 built for atmosphere and storytelling. The same system as daylight, experienced in shadow.',
      p2feel:       'Like reading by lamplight. Warm, quiet, unhurried. The world outside has gone dark.',
      p2audience:   'Anyone encountering my portfolio \u2014 the system should feel intimate, considered, and gently luminous.',
      p2never:      'Harsh, cold, or clinical. Never a screen that demands attention. Always a page that invites it.',
      p2idea:       'Warmth against darkness. Every element glows slightly. Nothing is fully black. Nothing is fully silent.',
      p2goalsLabel: 'Emotional goals \u2014 the four words this system lives by',
      word1:'Calm', word2:'Thoughtful', word3:'Warm', word4:'Comforting',
      p3intro:      'The same palette \u2014 but inverted. Warm ivory becomes deep brown. The accent colours glow against the dark like candles in a window.',
      p3primaryLabel:   'Light palette \u2014 the glowing colours',
      p3secondaryLabel: 'Dark palette \u2014 the shadow and depth',
      lbl_c1:'Ivory \u2014 primary light text', col1:'#F0E8DC \u2014 all headings and body text. Warm, never stark white.',
      lbl_c2:'Blush \u2014 warm accent',        col2:'#D4A5A0 \u2014 glowing against the dark. Borders, labels, accents.',
      lbl_c3:'Sage \u2014 botanical glow',      col3:'#9DAF98 \u2014 soft botanical light. Quiet colour blocks.',
      lbl_c4:'Blue \u2014 cool night light',    col4:'#92ADC1 \u2014 moonlight and distance. Used sparingly.',
      lbl_c5:'Gold \u2014 lamplight',           col5:'#F4D281 \u2014 the warmest accent. Used for emphasis and warmth.',
      lbl_c6:'Colour rule',                     col6:'Every colour must glow. If it reads as flat or cold against the dark, it does not belong here.',
      lbl_csrc:'Colour source',                 colsrc:'Candlelight on old paper. A lamp in a dark studio. The last warmth before sleep.',
      p5intro:      'The same layout system \u2014 but space reads differently in the dark. Generous margins become breathing room between light and shadow.',
      p5base:       '8px base. The same grid, experienced differently. Dark space is not empty \u2014 it is context for everything that glows.',
      p5layout:     'Cluster-based, as in daylight. Content groups as islands of warm light against the dark.',
      p5rule:       'Every page has one moment of warmth and one moment of rest. The focal point glows. Everything else recedes.',
      p6intro:      'The same voice \u2014 but quieter. This system speaks in the register of late evenings: thoughtful, unhurried, a little more personal than in daylight.',
      voice1:       'This system sounds like a handwritten note read by lamplight.',
      voice2:       'It would never be bright or demanding. It asks you to lean in.',
      voice3:       'If this system were a person, they would be the last one still talking quietly at the end of the night.',
      p7intro:      'The same references \u2014 but look now for the ones that work in low light. What survives when the brightness is removed? What glows?',
      p7notesLabel: 'What these references share',
      p8intro:      'The same rules \u2014 held more gently. The dark is not a different system. It is the same one, experienced at a different hour.',
      motifLabel:   'Motif hierarchy \u2014 the same grammar, glowing',
      motif1:'Lace \u2014 dominant. Borders and framing elements. Glows faintly against the dark.',
      motif2:'Ribbons \u2014 structural. Dividers and labels. Carries warm accent colour.',
      motif3:'Flowers \u2014 accent. Appear at meaningful moments, luminous against the dark.',
      motif4:'Teacups \u2014 signature. The personal mark. Glows warmly when it appears.',
      motif5:'Stars \u2014 punctuation. Tiny points of light. End-of-section markers.',
      alwaysLabel:  'Always',
      always1:'Always use warm ivory for text \u2014 never pure white. Stark white breaks the warmth.',
      always2:'Always keep generous dark margins. The dark space is part of the atmosphere.',
      always3:'Always keep one glowing focal point per page. Let everything else recede.',
      neverLabel:   'Never',
      never1:'Never use pure white or pure black. This system lives in the space between.',
      never2:'Never let the dark feel cold or clinical. Warmth is non-negotiable.',
      never3:'Never add bright elements. Everything here glows, nothing shines.',
      coreLabel:    'The one rule',
      coreRule:     'Every decision serves the same feeling \u2014 now experienced by lamplight. Calm, warm, comforting. The same studio, after dark.',
      closingQuote: '\u201cThe dark is not the absence of light. It is the presence of depth.\u201d',
    }
  },

  blank: {
    primary:      ['#FFFFFF','#F0F0F0','#CCCCCC','#888888','#1C1C1C'],
    primaryNames: ['White','Light Grey','Mid Grey','Dark Grey','Black'],
    secondary:    ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF'],
    secondaryNames:['Colour 1','Colour 2','Colour 3','Colour 4','Colour 5'],
    toneColors:   ['#F5F5F5','#E0E0E0','#CCCCCC','#AAAAAA','#888888','#555555','#1C1C1C'],
    typeIntro: 'Add your typefaces here. Describe each one: what it is, where it comes from, and what role it plays in your system.',
    pairing: 'Explain why these typefaces belong together. What is the tension or harmony between them?',
    specimens: [
      { label:'Display / Headline',  style:'font-family:"Inter","Helvetica Neue",Arial,sans-serif;font-size:36px;font-weight:300;letter-spacing:-0.02em;', sample:'Your headline typeface here', face:'Typeface name', role:'Headlines, titles, display', size:'Size range' },
      { label:'Body / Running text', style:'font-family:"Inter","Helvetica Neue",Arial,sans-serif;font-size:14px;font-weight:400;',                      sample:'Your body typeface here. This is how your running text will look across all pages.', face:'Typeface name', role:'Body copy, descriptions', size:'Size / leading' },
      { label:'Accent / Label',      style:'font-family:"Inter","Helvetica Neue",Arial,sans-serif;font-size:11px;font-weight:500;letter-spacing:0.08em;', sample:'LABEL — CAPTION — ACCENT', face:'Typeface name', role:'Labels, captions, UI', size:'Size range' },
    ],
    copy: {
      coverTitle:   'Your<br>Visual<br>System.',
      coverSub:     'Your name \u00b7 Your course \u00b7 Your project',
      coverDesc:    'Describe your visual system here. What is it for? What atmosphere does it create? What feeling does it serve? This is your statement of intent.',
      p2intro:      'Use this page to define the identity of your system. What is it, who is it for, and what must it always feel like?',
      p2feel:       '',
      p2audience:   '',
      p2never:      '',
      p2idea:       '',
      p2goalsLabel: 'The four words this system lives by',
      word1:'', word2:'', word3:'', word4:'',
      p3intro:      'Define your colour palette here. Name each colour, describe its role, and explain the rule that governs how they work together.',
      p3primaryLabel:   'Primary palette',
      p3secondaryLabel: 'Secondary / accent palette',
      lbl_c1:'Colour 1 \u2014 role', col1:'',
      lbl_c2:'Colour 2 \u2014 role', col2:'',
      lbl_c3:'Colour 3 \u2014 role', col3:'',
      lbl_c4:'Colour 4 \u2014 role', col4:'',
      lbl_c5:'Colour 5 \u2014 role', col5:'',
      lbl_c6:'Colour rule',          col6:'',
      lbl_csrc:'Colour source',      colsrc:'',
      p5intro:      'Describe your layout approach. How does content sit on the page? What is the grid, and when can it be broken?',
      p5base:       '',
      p5layout:     '',
      p5rule:       '',
      p6intro:      'What is the personality of this system? How does it speak? What would it never say?',
      voice1:       '',
      voice2:       '',
      voice3:       '',
      p7intro:      'Collect the references that shaped this system. What are you borrowing, and what are you leaving behind?',
      p7notesLabel: 'What these references share',
      p8intro:      'Write the rules that make this system behave like itself \u2014 even when you\u2019re not in the room.',
      motifLabel:   'Visual motifs \u2014 the recurring elements of your system',
      motif1:'', motif2:'', motif3:'', motif4:'', motif5:'',
      alwaysLabel:  'Always \u2014 things this system does',
      always1:'', always2:'', always3:'',
      neverLabel:   'Never \u2014 things this system refuses to do',
      never1:'', never2:'', never3:'',
      coreLabel:    'The one rule that holds everything together',
      coreRule:     '',
      closingQuote: '',
    }
  }
};

// ── COLOUR SWATCHES ──
function buildSwatchGrid(containerId, colors) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';
  colors.forEach(col => {
    const sw = document.createElement('div');
    sw.className = 'color-swatch';
    sw.style.position = 'relative';
    sw.innerHTML = '<div class="color-swatch-inner" style="background:' + col + '"></div><div class="color-swatch-info"><span class="color-hex">' + col + '</span><input class="color-name-input" type="text" placeholder="name"></div>';
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = col.match(/^#[0-9a-f]{6}$/i) ? col : '#cccccc';
    picker.style.cssText = 'position:absolute;opacity:0;width:100%;height:65%;top:0;left:0;cursor:pointer;';
    picker.addEventListener('input', function() {
      sw.querySelector('.color-swatch-inner').style.background = this.value;
      sw.querySelector('.color-hex').textContent = this.value;
    });
    sw.appendChild(picker);
    grid.appendChild(sw);
  });
  const empty = document.createElement('div');
  empty.className = 'color-swatch';
  empty.style.position = 'relative';
  empty.innerHTML = '<div class="color-swatch-inner" style="background:repeating-linear-gradient(45deg,rgba(128,128,128,0.1) 0,rgba(128,128,128,0.1) 2px,transparent 2px,transparent 8px)"><input type="color" value="#ffffff" style="opacity:0;width:100%;height:100%;cursor:pointer;" onchange="this.parentElement.style.background=this.value;this.closest(\'.color-swatch\').querySelector(\'.color-hex\').textContent=this.value;"></div><div class="color-swatch-info"><span class="color-hex">+ add</span><input class="color-name-input" type="text" placeholder="name"></div>';
  grid.appendChild(empty);
}

// ── TYPE SPECIMENS ──
function renderSpecimens(theme) {
  const t = THEMES[theme];
  const container = document.getElementById('typeSpecimens');
  if (!container) return;
  container.innerHTML = '';
  t.specimens.forEach(sp => {
    const div = document.createElement('div');
    div.className = 'type-specimen';
    const lines = sp.sample.split('\n').join('<br>');
    // scale down very large display fonts so they fit
    var displayStyle = sp.style.replace(/font-size:\s*(\d+)px/g, function(m, n) {
      var sz = parseInt(n); return 'font-size:' + (sz > 30 ? Math.round(sz * 0.72) : sz) + 'px';
    });
    div.innerHTML = '<div class="type-specimen-label">' + sp.label + '</div><div class="type-abc" style="' + displayStyle + 'line-height:1.05;margin-bottom:1.5mm;">' + lines + '</div><div class="type-sample-text" style="margin-bottom:1.5mm;">' + sp.face + ' \u2014 ' + sp.role + '</div><div class="type-fields"><div><label class="field-label">Typeface</label><input class="field" type="text" value="' + sp.face + '"></div><div><label class="field-label">Role</label><input class="field" type="text" value="' + sp.role + '"></div><div><label class="field-label">Size range</label><input class="field" type="text" value="' + sp.size + '"></div></div>';
    container.appendChild(div);
  });
  const intro = document.getElementById('typeIntro');
  if (intro) intro.textContent = t.typeIntro;
  const pairing = document.getElementById('pairingRationale');
  if (pairing) pairing.value = t.pairing;
}

// ── TONE BAND ──
function renderToneBand(theme) {
  const colors = THEMES[theme].toneColors;
  document.querySelectorAll('.tone-cell').forEach((cell, i) => {
    if (colors[i]) cell.style.background = colors[i];
  });
}

// ── PAGE COPY ──
function renderCopy(theme) {
  const c = THEMES[theme].copy;
  Object.entries(c).forEach(function(entry) {
    const id = entry[0], val = entry[1];
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.value = val;
    } else {
      el.innerHTML = val;
    }
  });
}

// ── REFERENCE SLOTS ──
const refLabels = ['Typographic reference','Colour / texture','Layout / structure','Image / photograph','Motion / time','Wildcard \u2014 anything'];
const refGrid = document.getElementById('refGrid');

function buildRefSlot(index, savedData) {
  const label = refLabels[index] || 'Reference ' + (index + 1);
  const slot = document.createElement('div');
  slot.className = 'ref-slot';
  slot.dataset.index = index;

  if (savedData && savedData.src) {
    slot.innerHTML = '<img src="' + savedData.src + '" alt="' + (savedData.caption || label) + '"><div class="ref-slot-caption"><input class="ref-caption-input" type="text" value="' + (savedData.caption || label) + '"></div><button class="ref-clear-btn" type="button">\u00d7</button>';

    const captionInput = slot.querySelector('.ref-caption-input');
    if (captionInput) {
      captionInput.addEventListener('change', function() {
        saveRefCaption(index, this.value);
      });
    }

    const clearButton = slot.querySelector('.ref-clear-btn');
    if (clearButton) {
      clearButton.addEventListener('click', function(e) {
        e.stopPropagation();
        clearRef(index, slot);
      });
    }
  } else {
    slot.innerHTML = '<div class="ref-slot-icon">\u2295</div><div class="ref-slot-label">' + label + '</div>';
    const fi = document.createElement('input');
    fi.type = 'file'; fi.accept = 'image/*'; fi.style.display = 'none';
    fi.addEventListener('change', function() {
      const file = this.files[0]; if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        const refs = getSaved('refs') || {};
        refs[index] = { src: e.target.result, caption: label };
        doSave('refs', refs);
        const newSlot = buildRefSlot(index, refs[index]);
        slot.replaceWith(newSlot);
      };
      reader.readAsDataURL(file);
    });
    slot.appendChild(fi);
    slot.addEventListener('click', function() { fi.click(); });
  }
  return slot;
}

function saveRefCaption(index, val) {
  const refs = getSaved('refs') || {};
  if (refs[index]) { refs[index].caption = val; doSave('refs', refs); }
}

function clearRef(index, slot) {
  const refs = getSaved('refs') || {};
  delete refs[index];
  doSave('refs', refs);
  const newSlot = buildRefSlot(index, null);
  slot.replaceWith(newSlot);
}

function renderRefGrid() {
  refGrid.innerHTML = '';
  const refs = getSaved('refs') || {};
  const count = Math.max(6, Object.keys(refs).length + 1);
  for (let i = 0; i < count; i++) {
    refGrid.appendChild(buildRefSlot(i, refs[i]));
  }
  // add new slot button
  const addBtn = document.createElement('div');
  addBtn.className = 'ref-slot ref-slot-add';
  addBtn.innerHTML = '<div class="ref-slot-icon">+</div><div class="ref-slot-label">add slot</div>';
  addBtn.addEventListener('click', function() {
    const refs2 = getSaved('refs') || {};
    const nextIdx = Object.keys(refs2).length > 0 ? Math.max(...Object.keys(refs2).map(Number)) + 1 : count;
    refLabels[nextIdx] = 'Reference ' + (nextIdx + 1);
    renderRefGrid();
    // trigger file pick on new slot
    const newSlot = refGrid.children[nextIdx];
    if (newSlot) { const fi = newSlot.querySelector('input[type=file]'); if (fi) fi.click(); }
  });
  refGrid.appendChild(addBtn);
}

// ── TONE SELECTOR ──
const toneMap = { 'Clinical':'Precise, unambiguous, structured.', 'Refined':'Careful restraint. Nothing wasted.', 'Warm':'Approachable, human, inviting.', 'Playful':'Energetic, unexpected, a little delightful.', 'Botanical':'Quiet, natural, patient.', 'Dreamy':'Soft, blurred, suspended in time.', 'Cozy':'Warm, safe, unhurried.' };
function selectTone(el) {
  document.querySelectorAll('.tone-cell').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  const lbl = el.getAttribute('data-label');
  document.getElementById('toneLabel').textContent = lbl + ' \u2014 ' + (toneMap[lbl] || '');
  doSave('tone', lbl);
}

// ── COLOUR ADD/REMOVE ──
function renderEditableSwatches(containerId, colors, defaultNames) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';

  colors.forEach(function(col, i) {
    const sw = document.createElement('div');
    sw.className = 'color-swatch';
    sw.style.position = 'relative';

    const swatchTheme = document.documentElement.getAttribute('data-theme') || 'cozy';
    const savedNames = getSaved('swatchNames_' + swatchTheme) || {};
    const savedName = savedNames[containerId + '_' + i];
    const name = (savedName !== undefined) ? savedName : ((defaultNames && defaultNames[i]) || '');

    const inner = document.createElement('div');
    inner.className = 'color-swatch-inner';
    inner.style.background = col;
    sw.appendChild(inner);

    const info = document.createElement('div');
    info.className = 'color-swatch-info';
    info.innerHTML = '<span class="color-hex">' + col + '</span><input class="color-name-input" type="text" placeholder="name" value="' + name.replace(/"/g,'&quot;') + '">';
    sw.appendChild(info);

    const picker = document.createElement('input');
    picker.type = 'color';
    picker.value = col.match(/^#[0-9a-f]{6}$/i) ? col : '#cccccc';
    picker.style.cssText = 'position:absolute;opacity:0;width:100%;height:65%;top:0;left:0;cursor:pointer;z-index:1;';
    picker.addEventListener('input', function() {
      inner.style.background = this.value;
      info.querySelector('.color-hex').textContent = this.value;
    });
    picker.addEventListener('change', function() {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'cozy';
      const key = activeTheme + '_swatches_' + containerId;
      const saved = getSaved(key) || colors.slice();
      saved[i] = this.value;
      doSave(key, saved);
    });
    sw.appendChild(picker);

    const removeBtn = document.createElement('button');
    removeBtn.title = 'Remove colour';
    removeBtn.textContent = '\u00d7';
    removeBtn.style.cssText = 'position:absolute;top:3px;right:3px;z-index:10;background:rgba(0,0,0,0.45);border:none;border-radius:50%;width:15px;height:15px;font-size:10px;cursor:pointer;color:#fff;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;';
    removeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      removeSwatch(containerId, i, defaultNames);
    });
    sw.appendChild(removeBtn);

    info.querySelector('.color-name-input').addEventListener('change', function() {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'cozy';
      const names = getSaved('swatchNames_' + activeTheme) || {};
      names[containerId + '_' + i] = this.value;
      doSave('swatchNames_' + activeTheme, names);
    });

    grid.appendChild(sw);
  });

  const addSw = document.createElement('div');
  addSw.className = 'color-swatch';
  addSw.style.cssText = 'position:relative;cursor:pointer;';
  addSw.innerHTML = '<div class="color-swatch-inner" style="background:repeating-linear-gradient(45deg,rgba(128,128,128,0.1) 0,rgba(128,128,128,0.1) 2px,transparent 2px,transparent 8px);display:flex;align-items:center;justify-content:center;font-size:18px;opacity:0.4;">+</div><div class="color-swatch-info"><span class="color-hex">add</span><input class="color-name-input" type="text" placeholder="name"></div>';
  const addPicker = document.createElement('input');
  addPicker.type = 'color'; addPicker.value = '#D4A5A0';
  addPicker.style.cssText = 'position:absolute;opacity:0;width:100%;height:65%;top:0;left:0;cursor:pointer;z-index:1;';
  addPicker.addEventListener('change', function() {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'cozy';
    const key = activeTheme + '_swatches_' + containerId;
    const saved = getSaved(key) || colors.slice();
    saved.push(this.value);
    doSave(key, saved);
    renderEditableSwatches(containerId, saved, defaultNames);
  });
  addSw.appendChild(addPicker);
  grid.appendChild(addSw);
}

function removeSwatch(containerId, index, defaultNames) {
  const theme = document.documentElement.getAttribute('data-theme') || 'cozy';
  const key = theme + '_swatches_' + containerId;
  const base = THEMES[theme][containerId === 'primaryColors' ? 'primary' : 'secondary'];
  const saved = getSaved(key) || base.slice();
  saved.splice(index, 1);
  doSave(key, saved);
  renderEditableSwatches(containerId, saved, defaultNames);
}

function renderSwatches(theme) {
  const t = THEMES[theme];
  const primSaved = getSaved(theme + '_swatches_primaryColors')   || t.primary;
  const secSaved  = getSaved(theme + '_swatches_secondaryColors') || t.secondary;
  renderEditableSwatches('primaryColors',   primSaved,  t.primaryNames);
  renderEditableSwatches('secondaryColors', secSaved,   t.secondaryNames);
}

// ── PERSIST ALL FIELDS ──
function collectAndSave() {
  const state = {};
  document.querySelectorAll('input.field[id], textarea.field[id]').forEach(function(el) {
    state[el.id] = el.value;
  });
  // also capture note-fields and non-.field inputs with ids
  document.querySelectorAll('input.note-field[id]').forEach(function(el) {
    state[el.id] = el.value;
  });
  doSave('fieldValues', state);
}

function restoreFields() {
  const state = getSaved('fieldValues') || {};
  Object.entries(state).forEach(function(entry) {
    const el = document.getElementById(entry[0]);
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) el.value = entry[1];
  });
}

// ── STORAGE HELPERS ──
function doSave(key, val) {
  try { localStorage.setItem('vst_' + key, JSON.stringify(val)); } catch(e) {}
}
function getSaved(key) {
  try { const v = localStorage.getItem('vst_' + key); return v ? JSON.parse(v) : null; } catch(e) { return null; }
}

// ── SAVE INDICATOR ──
function showSaved() {
  const bar = document.getElementById('saveIndicator');
  if (!bar) return;
  bar.style.opacity = '1';
  clearTimeout(window._saveTimer);
  window._saveTimer = setTimeout(function() { bar.style.opacity = '0'; }, 1800);
}

// ── WIRE UP AUTO-SAVE ──
function wireAutoSave() {
  document.querySelectorAll('input.field, textarea.field, input.note-field').forEach(function(el) {
    el.addEventListener('change', function() { collectAndSave(); showSaved(); });
  });
}

function wireUiEvents() {
  document.querySelectorAll('.theme-btn[data-theme-btn]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const theme = btn.getAttribute('data-theme-btn');
      if (theme) setTheme(theme, btn);
    });
  });

  const printBtn = document.getElementById('printBtn');
  if (printBtn) {
    printBtn.addEventListener('click', function() { window.print(); });
  }

  document.querySelectorAll('.tone-cell').forEach(function(cell) {
    cell.addEventListener('click', function() { selectTone(cell); });
  });
}

// ── THEME SWITCH WITH SAVE ──
function setTheme(theme, btn) {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelectorAll('.theme-btn').forEach(function(b) { b.classList.remove('active'); });
  if (btn) btn.classList.add('active');
  doSave('theme', theme);
  renderSwatches(theme);
  renderSpecimens(theme);
  renderToneBand(theme);
  renderCopy(theme);
  renderRefGrid();
  wireAutoSave();
  restoreFields();
}

// ── INIT ──
(function init() {
  const savedTheme = getSaved('theme') || 'cozy';

  // activate the right button
  document.querySelectorAll('.theme-btn').forEach(function(b) {
    const theme = b.getAttribute('data-theme-btn');
    if (theme === savedTheme) b.classList.add('active');
    else b.classList.remove('active');
  });

  document.documentElement.setAttribute('data-theme', savedTheme);
  wireUiEvents();
  renderSwatches(savedTheme);
  renderSpecimens(savedTheme);
  renderToneBand(savedTheme);
  renderCopy(savedTheme);
  renderRefGrid();
  restoreFields();
  wireAutoSave();

  // restore tone selection
  const savedTone = getSaved('tone');
  if (savedTone) {
    const cell = document.querySelector('.tone-cell[data-label="' + savedTone + '"]');
    if (cell) selectTone(cell);
  }
})();