/* =============================================
   AUTOLAVAGGIO LA PALMA — booking.js
   Multi-step booking wizard logic
   ============================================= */

const N8N_WEBHOOK_URL = "https://glokararehman.app.n8n.cloud/webhook-test/book-appointment";

// ===== CAR DATABASE =====
const CAR_DATA = {
  sedan: {
    // ── Most popular first ──────────────────────────
    'Toyota':        ['Aygo', 'Aygo X', 'Yaris', 'GR Yaris', 'Corolla', 'Corolla Touring Sports', 'Camry', 'Camry Hybrid', 'Prius', 'Prius Plug-in', 'Crown', 'GR86', 'GR Supra', 'Mirai', 'Celica', 'MR2', 'Paseo', 'Auris', 'Avensis', 'Avensis Wagon', 'Echo', 'Vios', 'Carina', 'Corona'],
    'Volkswagen':    ['Up!', 'e-Up!', 'Polo', 'Polo GTI', 'Golf', 'Golf GTI', 'Golf GTE', 'Golf R', 'Golf Plus', 'Golf Variant', 'Golf Alltrack', 'e-Golf', 'ID.3', 'ID.7', 'ID.7 Tourer', 'Passat', 'Passat Variant', 'Passat GTE', 'Arteon', 'Arteon Shooting Brake', 'Phaeton', 'Jetta', 'CC', 'Eos', 'Beetle', 'Scirocco', 'Corrado'],
    'Renault':       ['Twingo', 'Twingo Electric', 'Clio', 'Clio RS', 'Clio E-Tech', 'Megane', 'Megane RS', 'Megane E-Tech', 'Arkana', 'Talisman', 'Talisman SW', 'Laguna', 'Laguna Coupe', 'Vel Satis', 'Zoe', 'Fluence', 'Symbol', 'Latitude', 'Safrane', '19', '21', '25'],
    'Peugeot':       ['104', '106', '107', '108', '205', '206', '206 CC', '207', '207 CC', '208', '208 GT', '306', '307', '307 CC', '308', '308 CC', '308 GT', '408', '508', '508 SW', 'e-208', 'e-308', 'RCZ'],
    'Ford':          ['Ka', 'Ka+', 'Fiesta', 'Fiesta ST', 'Focus', 'Focus ST', 'Focus RS', 'Focus Active', 'Focus Wagon', 'Mondeo', 'Mondeo Hybrid', 'Mondeo Estate', 'Mustang', 'Mustang Mach 1', 'Mustang Dark Horse', 'Puma', 'Fusion', 'Taurus', 'Escort', 'Sierra', 'Cortina', 'Galaxy'],
    'BMW':           ['116i', '118i', '118d', '120i', '120d', '125i', '128ti', 'M135i', '218i', '220i', '220d', '230i', 'M235i', '316i', '318i', '318d', '320i', '320d', '320e', '325i', '330i', '330d', '330e', 'M340i', 'M3', 'M3 CS', '420i', '420d', '430i', '430d', 'M440i', 'M4', 'M4 CSL', '520i', '520d', '525i', '525d', '530i', '530d', '530e', '535i', 'M550i', 'M5', 'M5 CS', '630i', '640i', 'M6', '730i', '730d', '740i', '740d', '750i', '760i', 'M760i', '840i', 'M850i', 'M8', 'i3', 'i4 eDrive40', 'i4 M50', 'i5 eDrive40', 'i5 M60', 'i7 xDrive60', 'i7 M70', 'i8', 'Z3', 'Z3 M', 'Z4', 'Z8'],
    'Mercedes-Benz': ['A 160', 'A 180', 'A 200', 'A 220', 'A 250', 'A 35 AMG', 'A 45 AMG', 'A 45 S AMG', 'B 160', 'B 180', 'B 200', 'B 220', 'C 160', 'C 180', 'C 200', 'C 220d', 'C 250', 'C 300', 'C 350e', 'C 43 AMG', 'C 63 AMG', 'C 63 S AMG', 'CLA 180', 'CLA 200', 'CLA 220', 'CLA 250', 'CLA 35 AMG', 'CLA 45 AMG', 'CLS 220d', 'CLS 300d', 'CLS 350', 'CLS 450', 'CLS 53 AMG', 'E 180', 'E 200', 'E 220d', 'E 250', 'E 300', 'E 350', 'E 400', 'E 43 AMG', 'E 63 AMG', 'E 63 S AMG', 'EQE 300', 'EQE 350', 'EQS 350', 'EQS 450', 'EQS 580', 'S 350d', 'S 400', 'S 450', 'S 500', 'S 580', 'S 63 AMG', 'S 65 AMG', 'SL 43', 'SL 55', 'SL 63', 'AMG GT', 'AMG GT S', 'AMG GT R', 'AMG GT 63 S'],
    'Audi':          ['A1', 'A1 Sportback', 'A2', 'A3', 'A3 Sportback', 'A3 Sedan', 'A3 Cabriolet', 'A4', 'A4 Avant', 'A4 Allroad', 'A4 Cabriolet', 'A5', 'A5 Sportback', 'A5 Cabriolet', 'A6', 'A6 Avant', 'A6 Allroad', 'A7', 'A7 Sportback', 'A8', 'A8 L', 'e-tron GT', 'RS e-tron GT', 'R8', 'R8 Spyder', 'R8 GT', 'RS3', 'RS3 Sportback', 'RS4 Avant', 'RS5', 'RS5 Sportback', 'RS6 Avant', 'RS7', 'S3', 'S3 Sportback', 'S4', 'S4 Avant', 'S5', 'S5 Sportback', 'S6', 'S7', 'S8', 'TT', 'TT Roadster', 'TTS', 'TT RS', 'TT RS Roadster'],
    'Fiat':          ['Seicento', '500', '500C', '500e', 'Panda', 'Panda Cross', 'Punto', 'Punto Evo', 'Grande Punto', 'Tipo', 'Tipo SW', 'Tipo Cross', 'Stilo', 'Bravo', 'Brava', 'Marea', 'Marea Weekend', 'Croma', 'Tempra', 'Ritmo', 'Regata', 'Uno', '128', '131', '132', '600e', '124 Spider', 'Multipla'],
    'Honda':         ['Jazz', 'Jazz e:HEV', 'Jazz Crosstar', 'Civic', 'Civic Type R', 'Civic e:HEV', 'Accord', 'Accord Tourer', 'Legend', 'City', 'Fit', 'Insight', 'Integra', 'Integra Type S', 'NSX', 'NSX Type S', 'e', 'e:Ny1', 'Prelude', 'S2000', 'CRX', 'Logo', 'FR-V', 'Stream'],
    'Hyundai':       ['Atos', 'i10', 'Getz', 'i20', 'i20 N', 'i20 Active', 'i30', 'i30 N', 'i30 N Performance', 'i30 Fastback', 'i30 Fastback N', 'i30 Wagon', 'i40', 'i40 CW', 'Ioniq', 'Ioniq 6', 'Elantra', 'Elantra N', 'Sonata', 'Sonata N Line', 'Accent', 'Grandeur', 'Veloster', 'Veloster N'],
    'Kia':           ['Picanto', 'Picanto X-Line', 'Rio', 'Rio GT-Line', 'Ceed', 'Ceed GT', 'Ceed Sportswagon', 'ProCeed', 'ProCeed GT', 'Xceed', 'Stinger', 'Stinger GT', 'K5', 'EV3', 'EV6', 'EV6 GT', 'Niro', 'Niro HEV', 'Optima', 'Optima SW', 'Shuma', 'Cerato', 'Spectra', 'Magentis', 'Cadenza'],
    'Nissan':        ['Micra', 'Micra RS', 'Note', 'Note e-Power', 'Leaf', 'Leaf e+', 'Leaf 40kWh', 'Pulsar', 'Almera', 'Primera', 'Primera Estate', 'Maxima', 'Tiida', 'Sentra', 'Versa', 'GT-R', 'GT-R NISMO', '370Z', '370Z Roadster', '370Z NISMO', '350Z', '350Z Roadster', '240SX', '180SX', 'Silvia', 'Skyline', 'Bluebird', 'Sunny', 'March'],
    'Opel':          ['Adam', 'Adam Rocks', 'Karl', 'Karl Rocks', 'Corsa', 'Corsa OPC', 'Corsa-e', 'Astra', 'Astra GTC', 'Astra OPC', 'Astra Sports Tourer', 'Astra Electric', 'Cascada', 'Insignia', 'Insignia Grand Sport', 'Insignia Sports Tourer', 'Vectra', 'Vectra Caravan', 'Omega', 'Calibra', 'Manta', 'Kadett'],
    'Citroen':       ['Ami', 'C1', 'C2', 'C3', 'C3 Pluriel', 'e-C3', 'C4', 'C4 Coupe', 'e-C4', 'C5', 'C5 X', 'C6', 'Xsara', 'ZX', 'Saxo', 'AX', 'BX', 'CX', 'Visa', '2CV', 'DS3', 'DS4', 'DS5'],
    'Mazda':         ['2', '2 Hybrid', '3', '3 Fastback', '6', '6 Wagon', 'MX-5', 'MX-5 RF', 'MX-30', 'RX-7', 'RX-8', '323', '626', '121', 'Xedos 6', 'Xedos 9', '929', '323F', '323C'],
    'Subaru':        ['Impreza', 'Impreza WRX', 'WRX', 'WRX STI', 'WRX STI S209', 'Legacy', 'Legacy Wagon', 'BRZ', 'BRZ tS', 'Levorg', 'Trezia', 'Alcyone SVX', 'Vivio', 'Stella'],
    'Skoda':         ['Citigo', 'Citigo-e', 'Fabia', 'Fabia Combi', 'Fabia RS', 'Rapid', 'Rapid Spaceback', 'Scala', 'Octavia', 'Octavia Combi', 'Octavia RS', 'Octavia RS 245', 'Octavia Scout', 'Superb', 'Superb Combi', 'Superb L&K', 'Felicia', 'Favorit'],
    'SEAT':          ['Mii', 'Mii electric', 'Ibiza', 'Ibiza FR', 'Ibiza Cupra', 'Toledo', 'Cordoba', 'Leon', 'Leon FR', 'Leon Cupra', 'Leon e-Hybrid', 'Leon Sportstourer', 'Altea', 'Altea XL', 'Exeo', 'Exeo ST'],
    'Cupra':         ['Born', 'Born VZ', 'Leon', 'Leon VZ', 'Leon Sportstourer', 'Formentor'],
    'Alfa Romeo':    ['33', '75', '90', '145', '146', '147', '147 GTA', '155', '156', '156 Sportwagon', '159', '159 Sportwagon', '164', '166', '4C', '4C Spider', 'Brera', 'Spider', 'GTV', 'GT', 'MiTo', 'Giulietta', 'Giulietta Sprint', 'Giulia', 'Giulia Quadrifoglio', 'Junior'],
    'Lancia':        ['Y', 'Ypsilon', 'Ypsilon Hybrid', 'Delta', 'Delta Integrale', 'Delta HF Turbo', 'Musa', 'Thesis', 'Lybra', 'Lybra SW', 'Kappa', 'Kappa SW', 'Dedra', 'Dedra Estate', 'Prisma', 'Fulvia', 'Stratos'],
    'DS':            ['DS 3', 'DS 3 E-Tense', 'DS 4', 'DS 4 E-Tense', 'DS 4 Crossback', 'DS 5', 'DS 7', 'DS 9', 'DS 9 E-Tense'],
    'Suzuki':        ['Alto', 'Celerio', 'Ignis', 'Splash', 'Swift', 'Swift Sport', 'Baleno', 'Baleno SW', 'Swace', 'SX4', 'SX4 Sedan', 'Kizashi', 'Liana', 'Liana SW', 'Aerio', 'Cultus', 'Esteem'],
    'Mitsubishi':    ['i-MiEV', 'Space Star', 'Colt', 'Colt Ralliart', 'Colt CZC', 'Lancer', 'Lancer Evolution', 'Lancer Evolution X', 'Eclipse', 'Galant', 'Galant Estate', 'Sigma', 'Carisma', 'Carisma SW', 'FTO', '3000 GT', 'GTO'],
    'Volvo':         ['C30', 'C70', 'C70 Convertible', 'S40', 'S60', 'S60 Cross Country', 'S60 Polestar', 'S70', 'S80', 'S90', 'S90 Recharge', 'V40', 'V40 Cross Country', 'V50', 'V60', 'V60 Cross Country', 'V60 Recharge', 'V70', 'V90', 'V90 Cross Country', 'V90 Recharge'],
    'Dacia':         ['Spring', 'Sandero', 'Sandero Stepway', 'Logan', 'Logan MCV', 'Logan Express'],
    'Jaguar':        ['X-Type', 'X-Type Estate', 'S-Type', 'XJ', 'XJR', 'XF', 'XF Sportbrake', 'XE', 'F-Type', 'F-Type R', 'F-Type SVR', 'F-Type Convertible', 'XK', 'XKR', 'XK120'],
    'Lexus':         ['CT 200h', 'IS 200', 'IS 220d', 'IS 250', 'IS 300', 'IS 300h', 'IS 350', 'IS 500 F Sport', 'ES 300h', 'ES 350', 'GS 200t', 'GS 300', 'GS 350', 'GS 450h', 'GS F', 'LS 400', 'LS 430', 'LS 460', 'LS 500', 'LS 500h', 'LC 500', 'LC 500h', 'LC Convertible', 'RC 200t', 'RC 300', 'RC 350', 'RC F'],
    'Tesla':         ['Model 3', 'Model 3 Long Range', 'Model 3 Performance', 'Model 3 Highland', 'Model S', 'Model S Long Range', 'Model S Plaid', 'Roadster'],
    'MINI':          ['Hatch 3-door', 'Hatch 5-door', 'Hatch JCW', 'Convertible', 'Convertible JCW', 'Clubman', 'Clubman JCW', 'Coupe', 'Roadster', 'Paceman', 'Electric', 'Electric JCW'],
    'Smart':         ['fortwo', 'fortwo Cabrio', 'fortwo ED', 'forfour', 'EQ fortwo', 'EQ fortwo Cabrio', 'EQ forfour', '#1', '#1 Brabus', '#3', '#3 Brabus'],
    'Porsche':       ['718 Boxster', '718 Boxster GTS', '718 Boxster Spyder', '718 Cayman', '718 Cayman GT4', '718 Cayman GT4 RS', '718 Cayman GTS', '718 Spyder', '911 Carrera', '911 Carrera S', '911 Carrera 4', '911 Carrera 4S', '911 Carrera GTS', '911 Targa 4', '911 Targa 4S', '911 Targa 4 GTS', '911 Turbo', '911 Turbo S', '911 GT3', '911 GT3 RS', '911 GT3 Touring', '911 GT2 RS', '911 R', '911 Dakar', '911 Sport Classic', 'Taycan', 'Taycan 4S', 'Taycan GTS', 'Taycan Turbo', 'Taycan Turbo GT', 'Taycan Turbo S', 'Taycan Sport Turismo', 'Taycan Cross Turismo', 'Panamera', 'Panamera 4', 'Panamera 4S', 'Panamera Turbo', 'Panamera Turbo S', 'Panamera GTS', 'Panamera Sport Turismo', 'Panamera Executive'],
    'Maserati':      ['Ghibli', 'Ghibli Hybrid', 'Ghibli Trofeo', 'Quattroporte', 'Quattroporte GTS', 'Quattroporte Trofeo', 'GranTurismo', 'GranTurismo Folgore', 'GranCabrio', 'GranCabrio Folgore', 'MC20', 'MC20 Cielo', 'MC20 Icona'],
    'Ferrari':       ['296 GTB', '296 GTS', '296 Speciale', '296 Speciale A', '458 Italia', '458 Spider', '458 Speciale', '488 GTB', '488 Spider', '488 Pista', '488 Pista Spider', '812 Superfast', '812 GTS', '812 Competizione', '812 Competizione A', 'California', 'California T', 'F8 Tributo', 'F8 Spider', 'GTC4Lusso', 'GTC4Lusso T', 'LaFerrari', 'LaFerrari Aperta', 'Portofino', 'Portofino M', 'Roma', 'Roma Spider', 'SF90 Stradale', 'SF90 Spider', 'SF90 XX Stradale', 'SF90 XX Spider', 'F12berlinetta', 'F12tdf', '599 GTB Fiorano', '599 GTO', '612 Scaglietti', 'Enzo', '550 Maranello', '575M Maranello', 'Testarossa', '348 tb', '348 ts', 'F355', '360 Modena', '360 Spider', 'F430', 'F430 Scuderia', 'F40', 'F50', '308', '328', 'Mondial'],
    'Lamborghini':   ['Countach', 'Countach LPI 800-4', 'Diablo', 'Diablo VT', 'Diablo SV', 'Murcielago', 'Murcielago LP 640', 'Murcielago LP 670-4 SV', 'Gallardo', 'Gallardo LP 560-4', 'Gallardo LP 570-4 Superleggera', 'Gallardo Spyder', 'Aventador', 'Aventador S', 'Aventador SVJ', 'Aventador Ultimae', 'Huracan', 'Huracan LP 580-2', 'Huracan EVO', 'Huracan EVO RWD', 'Huracan Tecnica', 'Huracan STO', 'Huracan Spyder', 'Revuelto', 'Sian', 'Sian Roadster'],
    'Abarth':        ['500', '500C', '595', '595 Turismo', '595 Competizione', '595C', '695', '695 Biposto', '695 Rivale', '695 Yamaha XSR', '124 Spider', 'Punto Evo', 'Grande Punto', 'Ritmo'],
    'Pagani':        ['Zonda', 'Zonda F', 'Zonda F Roadster', 'Zonda Cinque', 'Zonda R', 'Zonda Tricolore', 'Huayra', 'Huayra BC', 'Huayra Roadster', 'Huayra Roadster BC', 'Huayra R', 'Huayra Codalunga', 'Imola', 'Utopia'],
    'Bugatti':       ['Veyron', 'Veyron Grand Sport', 'Veyron Super Sport', 'Chiron', 'Chiron Pur Sport', 'Chiron Super Sport', 'Chiron Super Sport 300+', 'Chiron Profilee', 'Divo', 'La Voiture Noire', 'Centodieci', 'Bolide', 'Mistral', 'Tourbillon'],
    'Aston Martin':  ['DB7', 'DB9', 'DB9 Volante', 'DB11', 'DB11 V8', 'DB11 Volante', 'DB12', 'DB12 Volante', 'DBS', 'DBS Superleggera', 'DBS Volante', 'Rapide', 'Rapide S', 'Vanquish', 'Vanquish S', 'Vantage', 'Vantage V12', 'Vantage Roadster', 'Valkyrie', 'Valhalla'],
    'McLaren':       ['540C', '570S', '570S Spider', '570GT', '600LT', '600LT Spider', '620R', '650S', '650S Spider', '675LT', '675LT Spider', '720S', '720S Spider', '750S', '750S Spider', '765LT', '765LT Spider', 'Artura', 'Artura Spider', 'Elva', 'GT', 'P1', 'P1 GTR', 'Senna', 'Senna GTR', 'Speedtail'],
    'Bentley':       ['Continental GT', 'Continental GT V8', 'Continental GT Speed', 'Continental GT Convertible', 'Continental GT Convertible V8', 'Continental GT Speed Convertible', 'Continental GT Azure', 'Flying Spur', 'Flying Spur V8', 'Flying Spur Speed', 'Flying Spur Hybrid', 'Flying Spur Azure', 'Bacalar', 'Batur'],
    'Rolls-Royce':   ['Ghost', 'Ghost Extended', 'Ghost Black Badge', 'Ghost Series II', 'Phantom', 'Phantom Extended', 'Phantom Coupe', 'Phantom Drophead Coupe', 'Phantom Series II', 'Wraith', 'Wraith Black Badge', 'Dawn', 'Dawn Black Badge', 'Spectre', 'Spectre Black Badge'],
    'Alpine':        ['A110', 'A110 S', 'A110 GT', 'A110 R', 'A110 Legende', 'A110 Premiere Edition', 'A110 Color Edition'],
    'Polestar':      ['1', '2', '2 Long Range', '2 Performance', '4', '6'],
    'Lotus':         ['Elise', 'Elise S', 'Exige', 'Exige S', 'Exige V6 Cup', 'Evora', 'Evora GT', 'Emira', 'Emira V6', 'Evija'],
    'Genesis':       ['G70', 'G70 Shooting Brake', 'G70 Sport', 'G80', 'G80 Electrified', 'G80 Sport', 'G90', 'G90 Long Wheelbase', 'GV60', 'GV60 Performance', 'Electrified G80'],
    'BYD':           ['Seagull', 'Dolphin', 'Dolphin Mini', 'Seal', 'Han', 'Han EV', 'Han DM', 'Atto 2', 'Song Pro EV'],
    'MG':            ['MG3', 'MG3 Hybrid+', 'MG4', 'MG4 Trophy', 'MG5', 'MG5 SW', 'MG6', 'MG ZS', 'MG ZS EV'],
    'Chevrolet':     ['Spark', 'Aveo', 'Cruze', 'Cruze SW', 'Malibu', 'Malibu Hybrid', 'Impala', 'Camaro', 'Camaro SS', 'Camaro ZL1', 'Corvette', 'Corvette Stingray', 'Corvette Z06', 'Corvette ZR1', 'Corvette E-Ray', 'Sonic', 'Bolt EV', 'Bolt EUV'],
    'Dodge':         ['Viper', 'Challenger', 'Challenger R/T', 'Challenger SRT Hellcat', 'Challenger SRT Demon', 'Challenger Daytona', 'Charger', 'Charger R/T', 'Charger SRT Hellcat', 'Charger Daytona EV', 'Dart', 'Avenger', 'Neon', 'Stratus'],
    'Chrysler':      ['300', '300C', '300 SRT', 'Sebring', 'Sebring Convertible', '200', '200 Convertible', 'PT Cruiser', 'PT Cruiser Cabrio', 'Crossfire', 'Crossfire Roadster'],
    'Cadillac':      ['ATS', 'ATS-V', 'ATS Coupe', 'CT4', 'CT4-V', 'CT4-V Blackwing', 'CT5', 'CT5-V', 'CT5-V Blackwing', 'CT6', 'CTS', 'CTS-V', 'XTS', 'ELR', 'LYRIQ'],
    'Lincoln':       ['MKZ', 'MKZ Hybrid', 'MKS', 'Continental', 'Zephyr'],
    'Acura':         ['ILX', 'TL', 'TLX', 'TLX Type S', 'RL', 'RLX', 'NSX', 'NSX Type S', 'Integra', 'Integra Type S', 'Legend', 'TSX', 'TSX Sport Wagon', 'RSX', 'RSX Type S'],
    'Infiniti':      ['G35', 'G37', 'G37 Convertible', 'G37 IPL', 'Q30', 'Q50', 'Q50 Red Sport 400', 'Q60', 'Q60 Red Sport 400', 'Q70', 'Q70 Hybrid'],
    'Haval':         ['H2', 'H4', 'Jolion', 'Jolion Pro', 'M6'],
    'Chery':         ['Arrizo 5', 'Arrizo 5 Pro', 'Arrizo 5e', 'Arrizo 8'],
    'Geely':         ['Emgrand', 'Emgrand GT', 'Coolray', 'GC9'],
    'Nio':           ['ET5', 'ET5 Touring', 'ET7', 'ET9'],
    'Xpeng':         ['P5', 'P7', 'P7i', 'P9'],
    'Zeekr':         ['001', '007', '9'],
    'Lynk & Co':     ['03', '03+'],
    'Lucid':         ['Air', 'Air Pure', 'Air Touring', 'Air Grand Touring', 'Air Grand Touring Performance', 'Air Sapphire'],
    'SsangYong':     ['Tivoli', 'Tivoli Grand', 'Korando'],
  },

  suv: {
    // ── Most popular first ──────────────────────────
    'Toyota':        ['C-HR', 'C-HR Hybrid', 'Yaris Cross', 'Yaris Cross Hybrid', 'Corolla Cross', 'RAV4', 'RAV4 Hybrid', 'RAV4 Plug-in', 'RAV4 Adventure', 'Highlander', 'Highlander Hybrid', 'bZ4X', 'Land Cruiser', 'Land Cruiser 70', 'Land Cruiser 200', 'Land Cruiser 300', 'Land Cruiser Prado', '4Runner', 'Sequoia', 'Sequoia Hybrid', 'Fortuner', 'Rush', 'FJ Cruiser', 'Venza', 'Harrier'],
    'Volkswagen':    ['T-Cross', 'T-Roc', 'T-Roc R', 'T-Roc Cabriolet', 'Tiguan', 'Tiguan Allspace', 'Tiguan R', 'Touareg', 'Touareg R', 'Touareg eHybrid', 'ID.4', 'ID.4 GTX', 'ID.4 Pro', 'ID.5', 'ID.5 GTX', 'ID.6', 'Taos'],
    'Renault':       ['Captur', 'Captur E-Tech', 'Captur Plug-in', 'Kadjar', 'Koleos', 'Austral', 'Austral E-Tech', 'Espace', 'Espace E-Tech', 'Rafale', 'Rafale E-Tech', 'Scenic E-Tech', 'Symbioz', 'Symbioz E-Tech'],
    'Peugeot':       ['2008', '2008 GT', 'e-2008', '3008', '3008 GT', '3008 Hybrid4', 'e-3008', '5008', '5008 GT', 'e-5008', '4007', '4008'],
    'Ford':          ['EcoSport', 'Puma', 'Puma ST', 'Puma Hybrid', 'Kuga', 'Kuga ST-Line', 'Kuga Plug-in', 'Kuga PHEV', 'Edge', 'Explorer', 'Explorer Plug-in', 'Expedition', 'Bronco', 'Bronco Sport', 'Bronco Raptor', 'Bronco 2-Door', 'Escape', 'Escape Hybrid', 'Everest', 'Endeavour', 'Territory', 'Maverick'],
    'Hyundai':       ['Bayon', 'Venue', 'Kona', 'Kona N', 'Kona Hybrid', 'Kona Electric', 'Ioniq 5', 'Ioniq 5 N', 'Ioniq 9', 'Tucson', 'Tucson Hybrid', 'Tucson Plug-in', 'Tucson N Line', 'Santa Fe', 'Santa Fe Hybrid', 'Santa Fe Plug-in', 'Palisade', 'Nexo', 'ix20', 'ix35', 'ix55', 'Creta', 'Creta Electric'],
    'Kia':           ['Stonic', 'Stonic GT-Line', 'Niro', 'Niro HEV', 'Niro PHEV', 'Niro EV', 'Xceed', 'Xceed Plug-in', 'Sportage', 'Sportage Hybrid', 'Sportage Plug-in', 'Sportage GT-Line', 'EV6', 'EV6 GT', 'EV9', 'EV9 GT-Line', 'Sorento', 'Sorento Hybrid', 'Sorento Plug-in', 'Telluride', 'Soul', 'Mohave', 'Seltos'],
    'BMW':           ['iX1', 'X1', 'X1 M Sport', 'iX2', 'X2', 'X2 M35i', 'iX3', 'X3', 'X3 M', 'X3 M Competition', 'X4', 'X4 M', 'X4 M Competition', 'X5', 'X5 M', 'X5 M Competition', 'X6', 'X6 M', 'X6 M Competition', 'X7', 'X7 M60i', 'XM', 'XM Label Red', 'iX', 'iX xDrive40', 'iX xDrive50', 'iX M60'],
    'Mercedes-Benz': ['EQA 250', 'EQA 300', 'EQB 250', 'EQB 300', 'EQC 400', 'GLA 180', 'GLA 200', 'GLA 220d', 'GLA 250', 'GLA 35 AMG', 'GLA 45 AMG', 'GLA 45 S AMG', 'GLB 180', 'GLB 200', 'GLB 220d', 'GLB 250', 'GLC 200', 'GLC 220d', 'GLC 300', 'GLC 300e', 'GLC 400e', 'GLC 43 AMG', 'GLC 63 AMG', 'GLE 300d', 'GLE 350d', 'GLE 400d', 'GLE 450', 'GLE 350e', 'GLE 53 AMG', 'GLE 63 AMG', 'GLE 63 S AMG', 'GLS 350d', 'GLS 400d', 'GLS 450', 'GLS 580', 'GLS 600 Maybach', 'GLS 63 AMG', 'G 350d', 'G 400d', 'G 500', 'G 63 AMG', 'G 65 AMG'],
    'Audi':          ['Q2', 'Q2 35 TFSI', 'Q3', 'Q3 35 TFSI', 'Q3 Sportback', 'RS Q3', 'RS Q3 Sportback', 'Q4 e-tron', 'Q4 Sportback e-tron', 'Q5', 'Q5 Sportback', 'SQ5', 'SQ5 Sportback', 'Q7', 'Q7 45 TDI', 'SQ7', 'Q8', 'Q8 e-tron', 'Q8 Sportback e-tron', 'SQ8', 'SQ8 e-tron', 'RS Q8', 'e-tron', 'e-tron Sportback', 'e-tron S', 'e-tron S Sportback'],
    'Jeep':          ['Renegade', 'Renegade 4xe', 'Renegade Trailhawk', 'Avenger', 'Avenger 4xe', 'Compass', 'Compass 4xe', 'Compass Trailhawk', 'Cherokee', 'Grand Cherokee', 'Grand Cherokee 4xe', 'Grand Cherokee L', 'Grand Cherokee Trailhawk', 'Grand Cherokee SRT', 'Wrangler', 'Wrangler 4xe', 'Wrangler Rubicon', 'Wrangler Sahara', 'Wrangler Unlimited', 'Gladiator', 'Gladiator Rubicon', 'Commander', 'Commander 4xe'],
    'Land Rover':    ['Freelander', 'Freelander 2', 'Discovery Sport', 'Discovery Sport PHEV', 'Range Rover Evoque', 'Range Rover Evoque Convertible', 'Range Rover Evoque P300e', 'Range Rover Velar', 'Range Rover Velar P400e', 'Discovery', 'Discovery D300', 'Discovery D350', 'Range Rover Sport', 'Range Rover Sport SVR', 'Range Rover Sport P510e', 'Range Rover', 'Range Rover Long Wheelbase', 'Range Rover SV', 'Range Rover PHEV', 'Range Rover Electric', 'Defender 90', 'Defender 110', 'Defender 130', 'Defender V8'],
    'Volvo':         ['EX30', 'XC40', 'XC40 Recharge', 'XC40 B4', 'C40 Recharge', 'EX40', 'XC60', 'XC60 Recharge', 'XC60 B5', 'XC70', 'XC90', 'XC90 Recharge', 'XC90 B6', 'EX90'],
    'Nissan':        ['Juke', 'Juke Hybrid', 'Juke N-Sport', 'Qashqai', 'Qashqai e-Power', 'X-Trail', 'X-Trail e-Power', 'X-Trail e-4orce', 'Ariya', 'Ariya 87kWh', 'Pathfinder', 'Murano', 'Armada', 'Patrol', 'Patrol Y61', 'Terra'],
    'Honda':         ['HR-V', 'HR-V e:HEV', 'ZR-V', 'ZR-V e:HEV', 'CR-V', 'CR-V Hybrid', 'CR-V e:HEV', 'CR-V Plug-in', 'Pilot', 'Pilot TrailSport', 'Passport', 'e:Ny1', 'Prologue', 'Ridgeline'],
    'Mazda':         ['CX-3', 'CX-30', 'CX-30 e-Skyactiv', 'CX-30 Turbo', 'CX-5', 'CX-5 Skyactiv-X', 'CX-5 Turbo', 'CX-60', 'CX-60 PHEV', 'CX-80', 'CX-90', 'CX-90 PHEV', 'MX-30', 'MX-30 R-EV', 'CX-7', 'CX-9'],
    'Subaru':        ['XV', 'XV e-Boxer', 'Crosstrek', 'Crosstrek PHEV', 'Crosstrek Wilderness', 'Forester', 'Forester e-Boxer', 'Outback', 'Outback Wilderness', 'Outback XT', 'Ascent', 'Solterra', 'Evoltis', 'Tribeca'],
    'Suzuki':        ['Ignis', 'Ignis Hybrid', 'Vitara', 'Vitara Hybrid', 'Vitara AllGrip', 'S-Cross', 'S-Cross Hybrid', 'S-Cross AllGrip', 'Across', 'Jimny', 'Jimny Sierra', 'Jimny Long', 'Grand Vitara', 'Escudo'],
    'Mitsubishi':    ['ASX', 'ASX Hybrid', 'ASX Ralliart', 'Eclipse Cross', 'Eclipse Cross PHEV', 'Outlander', 'Outlander PHEV', 'Outlander Sport', 'Pajero', 'Pajero Sport', 'Pajero Pinin', 'L200 (double cab)', 'L200 Triton', 'Montero'],
    'Opel':          ['Crossland', 'Crossland X', 'Mokka', 'Mokka-e', 'Mokka Electric', 'Grandland', 'Grandland X', 'Grandland Hybrid', 'Grandland Plug-in', 'Grandland Electric', 'Antara', 'Frontera'],
    'Citroen':       ['C3 Aircross', 'e-C3 Aircross', 'C4 Cactus', 'C5 Aircross', 'C5 Aircross Hybrid', 'e-C4', 'C5 X', 'C5 X Hybrid'],
    'Skoda':         ['Kamiq', 'Kamiq Monte Carlo', 'Karoq', 'Karoq Scout', 'Karoq Sportline', 'Kodiaq', 'Kodiaq RS', 'Kodiaq L&K', 'Enyaq', 'Enyaq RS', 'Enyaq Coupe', 'Enyaq Coupe RS', 'Enyaq 85', 'Yeti', 'Yeti Outdoor'],
    'SEAT':          ['Arona', 'Arona FR', 'Arona Xcellence', 'Ateca', 'Ateca FR', 'Ateca Xcellence', 'Tarraco', 'Tarraco FR', 'Tarraco Xcellence'],
    'Cupra':         ['Ateca', 'Formentor', 'Formentor VZ', 'Formentor e-Hybrid', 'Formentor VZ5', 'Tavascan', 'Tavascan VZ', 'Terramar', 'Terramar e-Hybrid'],
    'DS':            ['DS 3 Crossback', 'DS 3 E-Tense', 'DS 7', 'DS 7 Crossback', 'DS 7 E-Tense', 'DS 7 E-Tense 4x4'],
    'Dacia':         ['Duster', 'Duster 4WD', 'Duster Prestige', 'Bigster', 'Bigster Hybrid', 'Jogger'],
    'Alfa Romeo':    ['Stelvio', 'Stelvio Sprint', 'Stelvio Veloce', 'Stelvio Quadrifoglio', 'Tonale', 'Tonale PHEV', 'Tonale Quadrifoglio'],
    'Fiat':          ['500X', '500X City Cross', '500X Cross', '500X Sport', 'Freemont', 'Freemont AWD', 'Sedici'],
    'Porsche':       ['Macan', 'Macan S', 'Macan GTS', 'Macan Turbo', 'Macan Electric', 'Macan 4', 'Macan 4S', 'Cayenne', 'Cayenne E-Hybrid', 'Cayenne S', 'Cayenne GTS', 'Cayenne Turbo', 'Cayenne Turbo GT', 'Cayenne Turbo S E-Hybrid', 'Cayenne Coupe', 'Cayenne Coupe Turbo'],
    'Lexus':         ['UX 200', 'UX 250h', 'NX 200t', 'NX 250', 'NX 300', 'NX 300h', 'NX 350h', 'NX 450h+', 'RX 300', 'RX 350', 'RX 350h', 'RX 400h', 'RX 450h', 'RX 450h+', 'RX 500h', 'RZ 300e', 'RZ 450e', 'GX 460', 'GX 550', 'LX 450d', 'LX 570', 'LX 600'],
    'Jaguar':        ['E-Pace', 'E-Pace P300e', 'E-Pace R-Dynamic', 'F-Pace', 'F-Pace SVR', 'F-Pace P400e', 'F-Pace 30d', 'I-Pace', 'I-Pace HSE', 'I-Pace EV400'],
    'Maserati':      ['Levante', 'Levante GT', 'Levante S', 'Levante Trofeo', 'Levante Hybrid', 'Grecale', 'Grecale GT', 'Grecale Modena', 'Grecale Trofeo', 'Grecale Folgore'],
    'Lamborghini':   ['Urus', 'Urus S', 'Urus Performante', 'Urus Pearl Capsule', 'Sterrato'],
    'Ferrari':       ['Purosangue'],
    'Tesla':         ['Model Y', 'Model Y Long Range', 'Model Y Performance', 'Model Y Standard Range', 'Model X', 'Model X Long Range', 'Model X Plaid', 'Cybertruck', 'Cybertruck Foundation Series'],
    'MINI':          ['Countryman', 'Countryman JCW', 'Countryman Plug-in', 'Countryman E', 'Aceman', 'Aceman E', 'Aceman JCW'],
    'Smart':         ['#1', '#1 Brabus', '#1 Pure', '#3', '#3 Brabus', '#3 Pure'],
    'BYD':           ['Atto 3', 'Atto 3 Extended', 'Atto 4', 'Tang', 'Tang EV', 'Tang PHEV', 'Song Pro', 'Song Pro EV', 'Yuan Plus', 'Seal U', 'Seal U DM', 'Sealion 6', 'Sealion 7', 'Yangwang U8'],
    'MG':            ['ZS', 'ZS EV', 'ZS Hybrid+', 'HS', 'HS Plug-in', 'HS Plus EV', 'RX8', 'Marvel R', 'EHS'],
    'Genesis':       ['GV60', 'GV60 Performance', 'Electrified GV70', 'GV70', 'GV70 Sport', 'GV70 Prestige', 'GV80', 'GV80 Coupe', 'GV90'],
    'Chevrolet':     ['Trax', 'Trax Activ', 'Trailblazer', 'Trailblazer Activ', 'Equinox', 'Equinox Hybrid', 'Equinox EV', 'Blazer', 'Blazer RS', 'Blazer EV', 'Traverse', 'Traverse RS', 'Tahoe', 'Tahoe Z71', 'Suburban', 'Suburban Z71'],
    'GMC':           ['Terrain', 'Terrain Denali', 'Terrain AT4', 'Acadia', 'Acadia Denali', 'Envision', 'Yukon', 'Yukon Denali', 'Yukon AT4', 'Yukon XL', 'Yukon XL Denali'],
    'Dodge':         ['Durango', 'Durango R/T', 'Durango SRT', 'Durango SRT Hellcat', 'Journey', 'Nitro'],
    'Cadillac':      ['XT4', 'XT4 Sport', 'XT5', 'XT5 Sport', 'XT6', 'XT6 Sport', 'Escalade', 'Escalade Sport', 'Escalade ESV', 'Escalade Platinum', 'LYRIQ', 'LYRIQ Sport', 'OPTIQ', 'VISTIQ'],
    'Lincoln':       ['Corsair', 'Corsair Grand Touring', 'Nautilus', 'Nautilus Grand Touring', 'Aviator', 'Aviator Grand Touring', 'Navigator', 'Navigator L', 'Navigator Black Label'],
    'Acura':         ['RDX', 'RDX A-Spec', 'RDX Type S', 'MDX', 'MDX Type S', 'ZDX', 'ZDX Type S', 'CDX'],
    'Infiniti':      ['QX30', 'QX50', 'QX55', 'QX60', 'QX70', 'QX80', 'FX35', 'FX45', 'FX50', 'EX35'],
    'Bentley':       ['Bentayga', 'Bentayga EWB', 'Bentayga EWB Azure', 'Bentayga Speed', 'Bentayga S', 'Bentayga Hybrid', 'Bentayga Odyssean'],
    'Rolls-Royce':   ['Cullinan', 'Cullinan Black Badge', 'Cullinan Series II'],
    'Aston Martin':  ['DBX', 'DBX707'],
    'Polestar':      ['3', '3 Long Range', '3 Long Range Dual Motor', '4', '4 Long Range'],
    'Rivian':        ['R1S', 'R1S Adventure', 'R1S Max Pack', 'R2', 'R3'],
    'Nio':           ['ES6', 'ES7', 'ES8', 'EC6', 'EC7', 'EL6', 'EL7', 'EL8', 'EL9'],
    'Xpeng':         ['G3', 'G3i', 'G6', 'G9'],
    'Zeekr':         ['X', 'X AWD'],
    'Lynk & Co':     ['01', '01 Hybrid', '05', '06', '08', '09'],
    'Haval':         ['H2', 'H4', 'H6', 'H6 GT', 'H9', 'Jolion', 'Jolion Pro', 'Dargo', 'Raptor'],
    'Chery':         ['Tiggo 2', 'Tiggo 2 Pro', 'Tiggo 4', 'Tiggo 4 Pro', 'Tiggo 5x', 'Tiggo 7', 'Tiggo 7 Pro', 'Tiggo 8', 'Tiggo 8 Pro', 'Tiggo 9'],
    'Geely':         ['Coolray', 'Tugella', 'Monjaro', 'Okavango', 'Atlas Pro'],
    'SsangYong':     ['Tivoli', 'Tivoli Grand', 'Korando', 'Korando e-Motion', 'Rexton', 'Rexton Sports', 'Torres', 'Torres EVX'],
    'Isuzu':         ['D-Max', 'D-Max V-Cross', 'MU-X', 'MU-7'],
    'Lucid':         ['Gravity', 'Gravity Grand Touring'],
  },

  van: {
    // ── Most popular first ──────────────────────────
    'Volkswagen':    ['Touran', 'Touran Highline', 'Sharan', 'Sharan Comfortline', 'Multivan', 'Multivan T7', 'Multivan eHybrid', 'Multivan Life', 'Multivan Style', 'Caravelle', 'Caravelle Comfortline', 'Transporter', 'Transporter T5', 'Transporter T6', 'Transporter T6.1', 'Transporter Caravelle', 'Caddy', 'Caddy Maxi', 'Caddy California', 'Caddy Life', 'ID.Buzz', 'ID.Buzz Long', 'Crafter Kombi', 'Crafter Tourer'],
    'Renault':       ['Kangoo', 'Kangoo Combi', 'Kangoo E-Tech', 'Kangoo Maxi', 'Grand Scenic', 'Scenic', 'Scenic E-Tech', 'Espace', 'Grand Espace', 'Espace E-Tech', 'Lodgy', 'Lodgy Stepway', 'Trafic', 'Trafic SpaceClass', 'Trafic Passenger', 'Master', 'Master SpaceClass', 'Master Combi'],
    'Peugeot':       ['Partner', 'Partner Tepee', 'Partner e-Partner', 'Rifter', 'Rifter Long', 'Rifter Allure', 'e-Rifter', 'Traveller', 'Traveller Business', 'e-Traveller', 'Expert', 'Expert Tepee', 'Boxer Combi', '807', '1007'],
    'Citroen':       ['Berlingo', 'Berlingo Multispace', 'Berlingo XL', 'e-Berlingo', 'Grand C4 Picasso', 'C4 Picasso', 'C4 SpaceTourer', 'Grand C4 SpaceTourer', 'C8', 'Jumpy', 'Jumpy Passenger', 'e-Jumpy', 'SpaceTourer', 'SpaceTourer XS', 'SpaceTourer M', 'SpaceTourer XL', 'e-SpaceTourer', 'Relay Combi', 'Jumper Combi'],
    'Ford':          ['Tourneo Connect', 'Grand Tourneo Connect', 'Tourneo Courier', 'Tourneo Custom', 'Tourneo Custom PHEV', 'Tourneo Custom Titanium', 'Galaxy', 'Galaxy Titanium', 'S-Max', 'S-Max Hybrid', 'S-Max Titanium', 'Transit Connect', 'Transit Custom', 'Transit Custom PHEV', 'Transit Kombi', 'Transit Bus'],
    'Mercedes-Benz': ['Vito', 'Vito Tourer', 'Vito 116 CDI', 'EQV 300', 'EQV 300 Long', 'V 200d', 'V 220d', 'V 250d', 'V 300d', 'V 220d Long', 'V 300d Long', 'Marco Polo', 'Marco Polo Horizon', 'Marco Polo Activity', 'Viano', 'Viano Trend', 'Sprinter Kombi', 'Sprinter Tourer', 'Metris'],
    'Fiat':          ['Doblo', 'Doblo Maxi', 'Doblo Combi', 'e-Doblo', 'Qubo', 'Fiorino Combi', 'Multipla', 'Ulysse', 'Ulysse EMotion', 'Scudo', 'Scudo Combi', 'e-Scudo', 'Ducato Combi', 'Ducato Panorama'],
    'Opel':          ['Combo', 'Combo Life', 'Combo Life XL', 'e-Combo Life', 'Zafira', 'Zafira Life', 'Zafira Life L', 'Zafira Life XL', 'e-Zafira Life', 'Vivaro', 'Vivaro Combi', 'Vivaro-e', 'Movano', 'Movano Combi', 'e-Movano', 'Sintra', 'Agila'],
    'Toyota':        ['ProAce', 'ProAce Verso', 'ProAce Verso Long', 'ProAce Electric', 'ProAce Verso Electric', 'ProAce City', 'ProAce City Verso', 'ProAce City Verso Long', 'ProAce City Electric', 'Previa', 'Previa Hybrid', 'Verso', 'Verso-S', 'Alphard', 'Alphard Executive Lounge', 'Hiace', 'Hiace Grandia', 'Granvia', 'Sienna', 'Sienna Hybrid'],
    'Kia':           ['Carnival', 'Carnival Hybrid', 'Carnival Limousine', 'Carens', 'Carens Eco', 'Carens 7-seat'],
    'Hyundai':       ['Staria', 'Staria Load', 'Staria Premium', 'Staria 7-seat', 'Staria 9-seat', 'H-1', 'H-1 Travel', 'H-1 Wagon', 'H350'],
    'Nissan':        ['Townstar', 'Townstar Combi', 'Townstar EV', 'NV200', 'NV200 Evalia', 'e-NV200 Evalia', 'Primastar', 'Primastar Combi', 'NV300', 'NV300 Combi', 'NV400', 'NV400 Combi', 'Quest'],
    'SEAT':          ['Alhambra', 'Alhambra Eco', 'Alhambra Style', 'Tarraco 7-seat'],
    'Chrysler':      ['Voyager', 'Grand Voyager', 'Grand Voyager Executive', 'Town & Country', 'Pacifica', 'Pacifica Hybrid', 'Pacifica PHEV', 'Pacifica Pinnacle'],
    'Dodge':         ['Grand Caravan', 'Grand Caravan SE', 'Caravan', 'Journey'],
    'Honda':         ['Odyssey', 'Odyssey Elite', 'Odyssey Touring', 'FR-V', 'Stream', 'Jazz Crosstar', 'Freed'],
    'Mitsubishi':    ['Delica', 'Delica D:5', 'Delica Star Wagon', 'L300', 'L300 Exceed', 'Grandis', 'Space Wagon', 'Space Gear'],
    'Dacia':         ['Jogger', 'Jogger Hybrid', 'Jogger Extreme', 'Lodgy', 'Lodgy Stepway', 'Dokker', 'Dokker Stepway'],
    'Lancia':        ['Phedra', 'Voyager', 'Zeta', 'Zeta EL', 'Musa'],
    'Mazda':         ['5', 'Premacy', 'MPV', 'MPV LX'],
    'Maxus':         ['Deliver 9', 'MIFA 6', 'MIFA 6 EV', 'MIFA 9', 'MIFA 9 EV', 'T90 EV'],
    'RAM':           ['ProMaster', 'ProMaster City', 'ProMaster Window Van', 'ProMaster 1500', 'ProMaster 2500', 'ProMaster 3500'],
    'GMC':           ['Savana', 'Savana Passenger', 'Safari'],
    'Chevrolet':     ['Express', 'Express Passenger', 'Express LS', 'Astro', 'Astro LT', 'Uplander'],
    'BYD':           ['M6', 'M6 EV'],
    'Buick':         ['Enclave', 'Enclave Avenir', 'GL8'],
    'Alfa Romeo':    ['156 Sportwagon', '159 Sportwagon'],
  },
};

// ===== BOOKING STATE =====
const state = {
  step: 1,
  category: null, categoryName: '',
  packageId: null, packageName: '',
  vehicleType: 'sedan',
  brand: '', model: '',
  addons: { pethair: false, stains: false, sedanseater: 0, suvseater: 0, dirtinterior: false },
  calYear: null, calMonth: null,
  date: null, dateStr: '',
  time: null,
  fname: '', lname: '', phone: '', email: '', plate: '', notes: '',
  basePrice: 0, totalPrice: 0,
};

// ===== PRICING DATA =====
const PACKAGES = {
  carwash: [
    { id: 'basic',    name: 'Basic Wash',     desc: 'Exterior hand wash, wheel, window & interior vacuum',    price: { sedan: 15, suv: 20, van: 25 }, dur: 30,
      features: ['Exterior Hand Wash', 'Wheel Cleaning', 'Window Cleaning', 'Interior Vacuum'] },
    { id: 'standard', name: 'Standard Wash',  desc: 'Full exterior + interior, wax, polish & engine clean',  price: { sedan: 25, suv: 35, van: 45 }, dur: 60, popular: true,
      features: ['Full Exterior Wash', 'Interior Vacuum', 'Dashboard Wipe-Down', 'Wax & Polish', 'Tire Dressing', 'Engine Bay Clean'] },
    { id: 'premium',  name: 'Premium Wash',   desc: 'Standard + deep internal cleaning',                     price: { sedan: 50, suv: 65, van: 80 }, dur: 90,
      features: ['Full Standard Package', 'Deep Internal Cleaning'] },
  ],
  interior: [
    { id: 'premium',  name: 'Interior Premium', desc: 'Full clean with conditioning & odor elimination',     price: { sedan: 80, suv: 80, van: 80 }, dur: 120,
      features: ['Full Interior Deep Clean', 'Leather Conditioning', 'Odor Elimination', 'Fabric Protector'] },
  ],
  engine: [
    { id: 'basic',    name: 'Engine Rinse',   desc: 'Basic engine bay degreasing & rinse',                   price: { sedan: 10, suv: 10, van: 10 }, dur: 20,
      features: ['Degreaser Application', 'Pressure Rinse', 'Air Blow Dry'] },
  ],
};

const CAT_NAMES = { carwash: 'Car Wash', interior: 'Interior Detailing', engine: 'Engine Cleaning' };
const CAT_ICONS = { carwash: 'fa-car-side', interior: 'fa-couch', engine: 'fa-gears' };
const ADDON_PRICES = { pethair: 5, stains: 5, dirtinterior: 5 };

const SLOTS_WEEKDAY = ['8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM'];
const SLOTS_SUNDAY  = ['8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','12:30 PM'];
const MONTH_NAMES   = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES     = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ===== STEP NAVIGATION =====
function goTo(n) {
  document.querySelectorAll('.bw-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + n).classList.add('active');

  document.querySelectorAll('.bw-step').forEach((el, i) => {
    el.classList.toggle('active', i + 1 === n);
    el.classList.toggle('done',   i + 1 < n);
  });
  for (let i = 1; i <= 5; i++) {
    const line = document.getElementById('line-' + i);
    if (line) line.classList.toggle('done', i < n);
  }

  state.step = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (n === 6) renderSummary();
}

function nextStep() {
  if (!validate(state.step)) return;
  goTo(state.step + 1);
}

function prevStep() {
  goTo(state.step - 1);
}

function validate(step) {
  if (step === 1 && !state.category) {
    alert('Please select a service category to continue.'); return false;
  }
  if (step === 2 && !state.packageId) {
    alert('Please select a package to continue.'); return false;
  }
  if (step === 3) {
    if (!state.brand) { alert('Please select your car brand.'); return false; }
    if (!state.model) { alert('Please select your car model.'); return false; }
    if (state.vehicleType === 'sedan' && !state.addons.sedanseater) {
      alert('Please select the number of seats for your Sedan.'); return false;
    }
    if (state.vehicleType === 'suv' && !state.addons.suvseater) {
      alert('Please select the number of seats for your SUV.'); return false;
    }
  }
  if (step === 4 && !state.time) {
    alert('Please select a date and time to continue.'); return false;
  }
  if (step === 5) {
    state.fname = document.getElementById('bw-fname').value.trim();
    state.lname = document.getElementById('bw-lname').value.trim();
    state.phone = document.getElementById('bw-phone').value.trim();
    state.email = document.getElementById('bw-email').value.trim();
    if (!state.fname || !state.lname || !state.phone) { alert('Please fill in your name and phone number.'); return false; }
    if (!state.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) { alert('Please enter a valid email address.'); return false; }
    state.plate = document.getElementById('bw-plate').value.trim();
    state.notes = document.getElementById('bw-notes').value.trim();
  }
  return true;
}

// ===== STEP 1: CATEGORY =====
function selectCat(card) {
  document.querySelectorAll('.bw-cat-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  state.category     = card.dataset.cat;
  state.categoryName = CAT_NAMES[state.category];
  state.packageId    = null;
  renderPackages();
  setTimeout(() => goTo(2), 180);
}

// ===== STEP 2: PACKAGES =====
function renderPackages() {
  document.getElementById('s2-title').textContent = 'Services for: ' + state.categoryName;
  const pkgs = PACKAGES[state.category] || [];
  document.getElementById('pkg-list').innerHTML = pkgs.map(p => `
    <div class="bw-pkg-card${p.popular ? ' popular' : ''}" data-id="${p.id}" onclick="selectPkg('${p.id}')">
      ${p.popular ? '<div class="bw-pkg-badge">Most Popular</div>' : ''}
      <div class="bw-pkg-inner">
        <div class="bw-pkg-left">
          <div class="bw-pkg-name">${p.name}</div>
          <div class="bw-pkg-desc">${p.desc}</div>
          <ul class="bw-pkg-feats">
            ${p.features.map(f => `<li><i class="fas fa-check"></i>${f}</li>`).join('')}
          </ul>
        </div>
        <div class="bw-pkg-right">
          <span class="bw-pkg-from">from</span>
          <div class="bw-pkg-price">€${p.price.sedan}</div>
          <div class="bw-pkg-dur"><i class="fas fa-clock"></i>${p.dur} min</div>
        </div>
      </div>
    </div>
  `).join('');
}

function selectPkg(id) {
  state.packageId   = id;
  state.packageName = PACKAGES[state.category].find(p => p.id === id).name;
  document.querySelectorAll('.bw-pkg-card').forEach(c => c.classList.toggle('selected', c.dataset.id === id));
  updatePrice();
  setTimeout(() => goTo(3), 180);
}

// ===== STEP 3: VEHICLE + ADDONS =====
let _brandListCache = [];
let _modelListCache = [];

function _resetCustomEntry() {
  const fullWrap = document.getElementById('bw-custom-full');
  const modelWrap = document.getElementById('bw-custom-model-only');
  const modelDd = document.getElementById('bw-model-dropdown');
  if (fullWrap)  { fullWrap.style.display  = 'none'; }
  if (modelWrap) { modelWrap.style.display = 'none'; }
  if (modelDd)   { modelDd.style.display   = ''; }
  const cb = document.getElementById('bw-custom-brand-val');
  const cm = document.getElementById('bw-custom-model-full-val');
  const cmo = document.getElementById('bw-custom-model-val');
  if (cb)  cb.value  = '';
  if (cm)  cm.value  = '';
  if (cmo) cmo.value = '';
}

function refreshBrands() {
  const data = CAR_DATA[state.vehicleType] || {};
  _brandListCache = Object.keys(data).sort();
  state.brand = '';
  state.model = '';

  const triggerText = document.getElementById('bw-brand-trigger-text');
  if (triggerText) triggerText.textContent = 'Select brand…';

  const searchEl = document.getElementById('bw-brand-search');
  if (searchEl) searchEl.value = '';

  _modelListCache = [];
  const modelTriggerText = document.getElementById('bw-model-trigger-text');
  if (modelTriggerText) modelTriggerText.textContent = 'Select a brand first…';
  const modelSearch = document.getElementById('bw-model-search');
  if (modelSearch) modelSearch.value = '';
  const modelList = document.getElementById('bw-model-list');
  if (modelList) modelList.innerHTML = '';
  const modelDropdown = document.getElementById('bw-model-dropdown');
  if (modelDropdown) modelDropdown.classList.add('bw-model-dropdown--disabled');

  _resetCustomEntry();
  renderBrandList(_brandListCache);
}

function renderBrandList(brands) {
  const list = document.getElementById('bw-brand-list');
  if (!list) return;
  const items = brands.map(brand => {
    const isActive = state.brand === brand;
    return `<div class="bw-brand-item${isActive ? ' active' : ''}" data-brand="${brand}" onclick="selectBrand(this.dataset.brand)">
      <span class="bw-brand-item-name">${brand}</span>
      ${isActive ? '<i class="fas fa-check bw-brand-item-check"></i>' : ''}
    </div>`;
  }).join('');

  const otherActive = state.brand === '__other__';
  const otherItem = `<div class="bw-brand-item bw-brand-other${otherActive ? ' active' : ''}" onclick="selectBrand('__other__')">
    <i class="fas fa-pen" style="font-size:11px;margin-right:6px;opacity:.7;"></i>
    <span class="bw-brand-item-name">My brand isn't listed…</span>
  </div>`;

  list.innerHTML = (items || '<div class="bw-brand-no-results">No brands found</div>') + otherItem;
}

function filterBrands(query) {
  const q = query.toLowerCase().trim();
  const filtered = q ? _brandListCache.filter(b => b.toLowerCase().includes(q)) : _brandListCache;
  renderBrandList(filtered);
}

function toggleBrandDropdown() {
  const dropdown = document.getElementById('bw-brand-dropdown');
  if (dropdown.classList.contains('open')) {
    closeBrandDropdown();
  } else {
    closeModelDropdown();
    dropdown.classList.add('open');
    var field = dropdown.parentElement;
    if (field) field.style.zIndex = '200';
    const searchEl = document.getElementById('bw-brand-search');
    if (searchEl) setTimeout(function() { searchEl.focus(); }, 60);
  }
}

function closeBrandDropdown() {
  const dropdown = document.getElementById('bw-brand-dropdown');
  if (dropdown) {
    dropdown.classList.remove('open');
    var field = dropdown.parentElement;
    if (field) field.style.zIndex = '';
  }
}

function selectBrand(brand) {
  if (brand === '__other__') {
    state.brand = '__other__';
    state.model = '';
    const triggerText = document.getElementById('bw-brand-trigger-text');
    if (triggerText) triggerText.textContent = 'Not listed (entering manually)';
    const modelDd = document.getElementById('bw-model-dropdown');
    if (modelDd) modelDd.style.display = 'none';
    document.getElementById('bw-custom-full').style.display = '';
    document.getElementById('bw-custom-model-only').style.display = 'none';
    const cb = document.getElementById('bw-custom-brand-val');
    const cm = document.getElementById('bw-custom-model-full-val');
    if (cb) { cb.value = ''; state.brand = ''; }
    if (cm) { cm.value = ''; state.model = ''; }
    const searchEl = document.getElementById('bw-brand-search');
    filterBrands(searchEl ? searchEl.value : '');
    closeBrandDropdown();
    return;
  }

  // Show model dropdown (in case it was hidden for custom)
  const modelDd = document.getElementById('bw-model-dropdown');
  if (modelDd) modelDd.style.display = '';
  document.getElementById('bw-custom-full').style.display = 'none';
  document.getElementById('bw-custom-model-only').style.display = 'none';

  state.brand = brand;
  state.model = '';

  const triggerText = document.getElementById('bw-brand-trigger-text');
  if (triggerText) triggerText.textContent = brand;

  _modelListCache = (CAR_DATA[state.vehicleType] || {})[brand] || [];

  const modelTriggerText = document.getElementById('bw-model-trigger-text');
  if (modelTriggerText) modelTriggerText.textContent = 'Select model…';
  const modelSearch = document.getElementById('bw-model-search');
  if (modelSearch) modelSearch.value = '';
  if (modelDd) modelDd.classList.remove('bw-model-dropdown--disabled');

  renderModelList(_modelListCache);

  const searchEl = document.getElementById('bw-brand-search');
  filterBrands(searchEl ? searchEl.value : '');
  closeBrandDropdown();
}

function renderModelList(models) {
  const list = document.getElementById('bw-model-list');
  if (!list) return;
  const items = models.map(function(model) {
    const isActive = state.model === model;
    return '<div class="bw-model-item' + (isActive ? ' active' : '') + '" onclick="selectModel(\'' + model.replace(/'/g, "\\'") + '\')">' +
      '<span class="bw-model-item-name">' + model + '</span>' +
      (isActive ? '<i class="fas fa-check bw-model-item-check"></i>' : '') +
      '</div>';
  }).join('');

  const otherActive = state.model === '__other__';
  const otherItem = '<div class="bw-model-item bw-model-other' + (otherActive ? ' active' : '') + '" onclick="selectModel(\'__other__\')">' +
    '<i class="fas fa-pen" style="font-size:11px;margin-right:6px;opacity:.7;"></i>' +
    '<span class="bw-model-item-name">My model isn\'t listed…</span>' +
    '</div>';

  list.innerHTML = (items || '<div class="bw-model-no-results">No models found</div>') + otherItem;
}

function filterModels(query) {
  const q = query.toLowerCase().trim();
  const filtered = q ? _modelListCache.filter(function(m) { return m.toLowerCase().includes(q); }) : _modelListCache;
  renderModelList(filtered);
}

function toggleModelDropdown() {
  const dropdown = document.getElementById('bw-model-dropdown');
  if (!dropdown || dropdown.classList.contains('bw-model-dropdown--disabled')) return;
  if (dropdown.classList.contains('open')) {
    closeModelDropdown();
  } else {
    closeBrandDropdown();
    dropdown.classList.add('open');
    var field = dropdown.parentElement;
    if (field) field.style.zIndex = '200';
    const searchEl = document.getElementById('bw-model-search');
    if (searchEl) setTimeout(function() { searchEl.focus(); }, 60);
  }
}

function closeModelDropdown() {
  const dropdown = document.getElementById('bw-model-dropdown');
  if (dropdown) {
    dropdown.classList.remove('open');
    var field = dropdown.parentElement;
    if (field) field.style.zIndex = '';
  }
}

function selectModel(model) {
  if (model === '__other__') {
    state.model = '';
    const modelTriggerText = document.getElementById('bw-model-trigger-text');
    if (modelTriggerText) modelTriggerText.textContent = 'Not listed (entering manually)';
    document.getElementById('bw-custom-model-only').style.display = '';
    const inp = document.getElementById('bw-custom-model-val');
    if (inp) { inp.value = ''; state.model = ''; setTimeout(function() { inp.focus(); }, 60); }
    closeModelDropdown();
    return;
  }

  document.getElementById('bw-custom-model-only').style.display = 'none';

  state.model = model;
  const triggerText = document.getElementById('bw-model-trigger-text');
  if (triggerText) triggerText.textContent = model;
  const searchEl = document.getElementById('bw-model-search');
  filterModels(searchEl ? searchEl.value : '');
  closeModelDropdown();
}

function _closeDropdownsIfOutside(e) {
  const brandDropdown = document.getElementById('bw-brand-dropdown');
  if (brandDropdown && !brandDropdown.contains(e.target)) closeBrandDropdown();
  const modelDropdown = document.getElementById('bw-model-dropdown');
  if (modelDropdown && !modelDropdown.contains(e.target)) closeModelDropdown();
}
document.addEventListener('click', _closeDropdownsIfOutside);
document.addEventListener('touchstart', _closeDropdownsIfOutside, { passive: true });

function handleVtype(btn) {
  document.querySelectorAll('.bw-vtype').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.vehicleType = btn.dataset.vtype;

  const sedanInline = document.getElementById('sedan-seater-inline');
  if (sedanInline) {
    sedanInline.style.display = state.vehicleType === 'sedan' ? '' : 'none';
    if (state.vehicleType !== 'sedan') {
      state.addons.sedanseater = 0;
      document.querySelectorAll('.bw-sedan-seat').forEach(b => b.classList.remove('active'));
    }
  }
  const suvInline = document.getElementById('suv-seater-inline');
  if (suvInline) {
    suvInline.style.display = state.vehicleType === 'suv' ? '' : 'none';
    if (state.vehicleType !== 'suv') {
      state.addons.suvseater = 0;
      document.querySelectorAll('.bw-suv-seat').forEach(b => b.classList.remove('active'));
    }
  }
  refreshBrands();
  updatePrice();
}

function handleSedanSeat(btn) {
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    state.addons.sedanseater = 0;
  } else {
    document.querySelectorAll('.bw-sedan-seat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.addons.sedanseater = parseInt(btn.dataset.seats);
  }
  updatePrice();
}

function handleSuvSeat(btn) {
  if (btn.classList.contains('active')) {
    btn.classList.remove('active');
    state.addons.suvseater = 0;
  } else {
    document.querySelectorAll('.bw-suv-seat').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.addons.suvseater = parseInt(btn.dataset.seats);
  }
  updatePrice();
}

function handleAddon(btn) {
  const addon = btn.dataset.addon;
  const val   = btn.dataset.val;
  if (val === 'no')        state.addons[addon] = false;
  else if (val === 'yes')  state.addons[addon] = true;
  else                     state.addons[addon] = parseInt(val);
  btn.closest('.bw-addon-card').querySelectorAll('.bw-yn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updatePrice();
}

function updatePrice() {
  if (!state.category || !state.packageId) return;
  const pkg           = PACKAGES[state.category].find(p => p.id === state.packageId);
  const base          = pkg.price[state.vehicleType];
  const suvExtra      = state.addons.suvseater === 7 ? 5 : 0;
  const sedanDiscount = state.addons.sedanseater === 2 ? -5 : 0;
  state.basePrice  = base;
  state.totalPrice = base
    + (state.addons.pethair      ? ADDON_PRICES.pethair      : 0)
    + (state.addons.stains       ? ADDON_PRICES.stains       : 0)
    + sedanDiscount
    + suvExtra
    + (state.addons.dirtinterior ? ADDON_PRICES.dirtinterior : 0);

  document.getElementById('pc-icon').className  = 'fas ' + CAT_ICONS[state.category];
  document.getElementById('pc-name').textContent = pkg.name;
  document.getElementById('pc-cat').textContent  = state.categoryName;
  document.getElementById('pc-base').textContent = '€' + base;
  document.getElementById('pc-total').textContent = '€' + state.totalPrice;
  document.getElementById('row-pethair').style.display     = state.addons.pethair      ? 'flex' : 'none';
  document.getElementById('row-stains').style.display      = state.addons.stains       ? 'flex' : 'none';
  document.getElementById('row-sedanseater').style.display  = sedanDiscount !== 0       ? 'flex' : 'none';
  document.getElementById('row-suvseater').style.display   = suvExtra > 0              ? 'flex' : 'none';
  if (suvExtra > 0) document.getElementById('row-suvseater-amt').textContent = '+€' + suvExtra;
  document.getElementById('row-dirtinterior').style.display = state.addons.dirtinterior ? 'flex' : 'none';
}

// ===== STEP 4: CALENDAR =====
function initCalendar() {
  const now = new Date();
  state.calYear  = now.getFullYear();
  state.calMonth = now.getMonth();
  renderCalendar();
}

function calPrev() {
  state.calMonth--;
  if (state.calMonth < 0) { state.calMonth = 11; state.calYear--; }
  renderCalendar();
}

function calNext() {
  state.calMonth++;
  if (state.calMonth > 11) { state.calMonth = 0; state.calYear++; }
  renderCalendar();
}

function renderCalendar() {
  const now   = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  document.getElementById('cal-month').textContent = MONTH_NAMES[state.calMonth] + ' ' + state.calYear;

  const firstDay     = new Date(state.calYear, state.calMonth, 1).getDay();
  const daysInMonth  = new Date(state.calYear, state.calMonth + 1, 0).getDate();

  let html = DAY_NAMES.map(d => `<div class="bw-cal-dayname">${d}</div>`).join('');

  for (let i = 0; i < firstDay; i++) html += '<div class="bw-cal-day empty"></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const date    = new Date(state.calYear, state.calMonth, d);
    const isPast  = date < today;
    const isToday = date.getTime() === today.getTime();
    const isSel   = state.date && date.getTime() === state.date.getTime();
    const ds      = state.calYear + '-' + String(state.calMonth + 1).padStart(2,'0') + '-' + String(d).padStart(2,'0');

    let cls = 'bw-cal-day';
    if (isPast)  cls += ' past';
    if (isToday) cls += ' today';
    if (isSel)   cls += ' selected';

    html += isPast
      ? `<div class="${cls}">${d}</div>`
      : `<div class="${cls}" onclick="selectDate('${ds}')">${d}</div>`;
  }

  document.getElementById('cal-grid').innerHTML = html;
}

function selectDate(ds) {
  state.date    = new Date(ds + 'T00:00:00');
  state.dateStr = ds;
  state.time    = null;
  document.getElementById('btn-s4-next').disabled = true;
  renderCalendar();
  renderSlots();
}

function renderSlots() {
  const dow   = state.date.getDay();
  const slots = dow === 0 ? SLOTS_SUNDAY : SLOTS_WEEKDAY;
  const day   = state.date.getDate();
  const mon   = MONTH_NAMES[state.date.getMonth()];

  document.getElementById('slots-title').textContent = 'Available times for: ' + mon + ' ' + day;
  document.getElementById('slots-grid').innerHTML = slots.map(s => `
    <button class="bw-slot${state.time === s ? ' selected' : ''}" onclick="selectSlot('${s}')">${s}</button>
  `).join('');
}

function selectSlot(time) {
  state.time = time;
  document.getElementById('btn-s4-next').disabled = false;
  document.querySelectorAll('.bw-slot').forEach(b => b.classList.toggle('selected', b.textContent.trim() === time));
}

// ===== STEP 6: SUMMARY =====
function renderSummary() {
  const dateFmt = state.date
    ? state.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  const suvExtra      = state.addons.suvseater === 7 ? 5 : 0;
  const sedanDiscount = state.addons.sedanseater === 2 ? 5 : 0;
  const addonStr = [
    state.addons.pethair      ? 'Pet Hair Removal (+€5)'                                                                  : null,
    state.addons.stains       ? 'Stain Treatment (+€5)'                                                                   : null,
    state.addons.sedanseater  ? `Sedan ${state.addons.sedanseater}-Seater${sedanDiscount ? ' (-€' + sedanDiscount + ')' : ''}` : null,
    state.addons.suvseater    ? `SUV ${state.addons.suvseater}-Seater${suvExtra ? ' (+€' + suvExtra + ')' : ''}`          : null,
    state.addons.dirtinterior ? 'Heavy Soiling (+€5)'                                                                     : null,
  ].filter(Boolean).join(', ') || 'None';

  const rows = [
    { icon: 'fa-tag',         label: 'Category',  value: state.categoryName },
    { icon: 'fa-star',        label: 'Package',   value: state.packageName },
    { icon: 'fa-car',         label: 'Vehicle',   value: state.vehicleType.charAt(0).toUpperCase() + state.vehicleType.slice(1) + ' — ' + state.brand + ' ' + state.model },
    { icon: 'fa-plus-circle', label: 'Add-ons',   value: addonStr },
    { icon: 'fa-calendar',    label: 'Date',      value: dateFmt },
    { icon: 'fa-clock',       label: 'Time',      value: state.time || '—' },
    { icon: 'fa-user',        label: 'Name',      value: state.fname + ' ' + state.lname },
    { icon: 'fa-phone',       label: 'Phone',     value: '+39 ' + state.phone },
    { icon: 'fa-envelope',    label: 'Email',     value: state.email || '—' },
  ];
  if (state.plate) rows.push({ icon: 'fa-id-card',     label: 'Plate',  value: state.plate });
  if (state.notes) rows.push({ icon: 'fa-note-sticky', label: 'Notes',  value: state.notes });

  document.getElementById('summary-list').innerHTML = rows.map(r => `
    <div class="bw-summary-row">
      <div class="bw-summary-icon"><i class="fas ${r.icon}"></i></div>
      <div class="bw-summary-label">${r.label}</div>
      <div class="bw-summary-value">${r.value}</div>
    </div>
  `).join('');

  document.getElementById('summary-total').textContent = '€' + state.totalPrice;
}

// ===== SUBMIT =====
async function submitBooking() {
  const btn = document.getElementById('btn-confirm');
  const err = document.getElementById('bw-err');
  err.style.display = 'none';
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing…';
  btn.disabled  = true;

  const to24h = t => {
    if (!t) return '';
    const [time, mod] = t.split(' ');
    let [h, m] = time.split(':');
    h = parseInt(h);
    if (mod === 'PM' && h !== 12) h += 12;
    if (mod === 'AM' && h === 12) h = 0;
    return h.toString().padStart(2,'0') + ':' + m;
  };

  const payload = {
    client_name:    state.fname + ' ' + state.lname,
    email:          state.email,
    phone:          '+39' + state.phone,
    category:       state.categoryName,
    plan:           state.packageName,
    vehicle_type:   state.vehicleType,
    vehicle_model:  state.brand + ' ' + state.model,
    date:           state.dateStr,
    time_slot:      to24h(state.time),
    pet_hair_removal: state.addons.pethair,
    bird_stains:      state.addons.stains,
    sedan_seater:     state.addons.sedanseater || null,
    suv_seater:       state.addons.suvseater || null,
    dirty_interior:   state.addons.dirtinterior,
    license_plate:    state.plate,
    notes:          state.notes,
    total_price:    state.totalPrice,
  };

  try {
    await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(payload),
    });

    const dateFmt = state.date
      ? state.date.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })
      : '—';

    document.getElementById('overlay-details').innerHTML = [
      { icon: 'fa-user',     val: state.fname + ' ' + state.lname },
      { icon: 'fa-star',     val: state.categoryName + ' — ' + state.packageName },
      { icon: 'fa-car',      val: state.brand + ' ' + state.model },
      { icon: 'fa-calendar', val: dateFmt },
      { icon: 'fa-clock',    val: state.time },
      { icon: 'fa-euro-sign',val: 'Total: €' + state.totalPrice },
    ].map(r => `<div class="bw-cd-row"><i class="fas ${r.icon}"></i><span>${r.val}</span></div>`).join('');

    document.getElementById('bw-overlay').style.display = 'flex';

  } catch (e) {
    err.textContent  = 'Booking failed: ' + e.message + '. Please try again or call us directly.';
    err.style.display = 'block';
    btn.innerHTML    = '<i class="fas fa-calendar-check"></i> Confirm Appointment';
    btn.disabled     = false;
  }
}

// ===== RESET =====
function resetWizard() {
  Object.assign(state, {
    step: 1, category: null, categoryName: '', packageId: null, packageName: '',
    vehicleType: 'sedan', brand: '', model: '',
    addons: { pethair: false, stains: false, sedanseater: 0, suvseater: 0, dirtinterior: false },
    date: null, dateStr: '', time: null,
    fname: '', lname: '', phone: '', email: '', plate: '', notes: '',
    basePrice: 0, totalPrice: 0,
  });
  document.getElementById('bw-overlay').style.display = 'none';
  document.querySelectorAll('.bw-cat-card').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.bw-yn-no').forEach(b => b.classList.add('active'));
  document.querySelectorAll('.bw-yn-yes').forEach(b => b.classList.remove('active'));
  const sedanInline = document.getElementById('sedan-seater-inline');
  if (sedanInline) sedanInline.style.display = '';
  document.querySelectorAll('.bw-sedan-seat').forEach(b => b.classList.remove('active'));
  const suvInline = document.getElementById('suv-seater-inline');
  if (suvInline) suvInline.style.display = 'none';
  document.querySelectorAll('.bw-suv-seat').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.bw-vtype').forEach((b, i) => b.classList.toggle('active', i === 0));
  refreshBrands();
  goTo(1);
}

function populateBrands() {
  refreshBrands();
}

// ===== INIT =====
initCalendar();
populateBrands();

(function applyUrlPreset() {
  const params  = new URLSearchParams(window.location.search);
  const catParam = params.get('category');
  const pkgParam = params.get('package');
  if (!catParam || !pkgParam) return;
  if (!PACKAGES[catParam]) return;
  const pkg = PACKAGES[catParam].find(p => p.id === pkgParam);
  if (!pkg) return;

  const catCard = document.querySelector('.bw-cat-card[data-cat="' + catParam + '"]');
  if (catCard) {
    document.querySelectorAll('.bw-cat-card').forEach(c => c.classList.remove('active'));
    catCard.classList.add('active');
  }
  state.category     = catParam;
  state.categoryName = CAT_NAMES[catParam];
  state.packageId    = pkgParam;
  state.packageName  = pkg.name;
  renderPackages();
  updatePrice();
  goTo(3);
})();
