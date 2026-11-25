{
const REIFEN = { typ: "reifen", text: "Reifenluftdruck" };
const NP = text => ({ text, naechstePruefung: true });
const OHNE_NR = (id, text) => ({ id, text, nr: false });
const FAHRZEUGDATEN = { titel: "Fahrzeugdaten", punkte: [
  { id: "km", typ: "zahl", text: "Kilometerstand nach der Probefahrt", einheit: "km", nr: false }
]};
const PROBEFAHRT_ENDE = [
  "Betriebsbremse, Feststellbremse (Wirkung ausreichend, ABS-Leuchte)",
  "Lenkung (Lenkhilfe prüfen, Lenkungsspiel prüfen max. 3 cm)"
];
const RC = [
  "Rollcontainer (ohne Beschädigungen, Fahrbarkeit, Funktion Bremse)",
  "Beladung (gesichert, vollständig, ohne Beschädigung)"
];
const RC61 = ["Beschädigungen, Fahrbarkeit, Bremse prüfen", "Beladung vollständig und gesichert"];

window.FAHRZEUGCHECK_CONFIG = {
  organisation: "Freiwillige Feuerwehr Naila",

  // Mehrere Empfänger mit Komma trennen. PLATZHALTER – bitte ersetzen!
  empfaenger: "butji1337@gmail.com",

  // {fahrzeug} {datum} {maengel} (und {pruefart}, falls Prüfarten genutzt werden)
  // {datum} = Prüfdatum, vorbelegt mit dem aktuellen Datum.
  betreff: "Checkliste {fahrzeug} – {datum}{maengel}",

  unterschrift: true,

  // Leer = keine Auswahl der Prüfart (wie auf den Papier-Checklisten).
  pruefarten: [],

  // Reifendruck: Abweichung vom Sollwert, ab der ein Wert als Auffälligkeit markiert wird (bar).
  // Annahme – bei Bedarf anpassen.
  reifenToleranz: 0.2,

  status: [
    { id: "io", kurz: "i.O.", text: "in Ordnung", farbe: "ok" },
    { id: "s", kurz: "S", label: "Störung", text: "Störung – Gerätewart und Kommandantur informieren!",
      farbe: "bad", stoerung: true, notiz: "Was ist defekt? (Pflicht)" },
    { id: "b", kurz: "B", label: "behoben", text: "Störung selbst behoben",
      farbe: "warn", notiz: "Was wurde behoben? (Kurznotiz, Pflicht)" }
  ],

  /* reifen: Sollwert je Achse in bar. Achsen bekommen automatisch die Felder „links“ und „rechts“,
     „Reserverad“ nur ein Feld. Ein Bereich [min, max] ist auch möglich (z. B. Sommer/Winter). */
  fahrzeuge: [
    {
      id: "10-1", kurz: "10/1", name: "Naila 10/1",
      reifen: { VA: 2.3, HA: [2.8, 3.0] }, reifenHinweis: "HA: Winter 3,0 bar, Sommer 2,8 bar",
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor, Lenkung, Bremsflüssigkeit)",
          "Kraftstoff (Füllstand mind. ¾)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeugbeleuchtung, Kontrollleuchten, Blaulicht, Heckwarneinrichtung)",
          "Hupe, Sondersignalanlage",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Spiegel",
          "Sicherheitsgurte, Kopfstütze positioniert",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Federung (Fahrzeug steht gerade)",
          "Leitungen (keine Leckagen)",
          "Anhängerzugvorrichtung",
          "Abschmieren (Türscharniere, -dichtungen)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Notfallset (1x Warndreieck, 2x Warnweste, 1x Warnleuchte, Verbandkasten)",
          "Funk, Funkgeräte (Funktion, Ladeerhaltung, Akkus geladen)"
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig)",
          "Taschenlampen (Funktion, Ladeerhaltung, Testlauf 30 Min.)",
          "1x Winkerkelle, 4x Faltleitkegel (Funktion, Batterien)",
          NP("Feuerlöscher AB Schaum 6 kg, verplombt"),
          "Funktionswesten (ZF, Abschnittsleiter, EL)",
          "Getränke vorhanden (MHD?)"
        ]},
        { titel: "Probefahrt 30 km", punkte: [
          "Schaltung, Kupplung, Gas", ...PROBEFAHRT_ENDE, "Fahrzeug sauber (ggf. waschen)"
        ]},
        FAHRZEUGDATEN
      ]
    },
    {
      id: "11-1", kurz: "11/1", name: "Naila 11/1",
      reifen: { VA: 4.1, HA: 4.2, Reserverad: 4.5 },
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor, Lenkung, Bremsflüssigkeit)",
          "Kraftstoff (Füllstand mind. ¾), AdBlue (Füllstand mind. ¼)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeugbeleuchtung, Kontrollleuchten, Heckwarneinrichtung, Umfeldbeleuchtung)",
          "Hupe, Sondersignalanlage",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Spiegel (Funktion), Rückfahrkamera (Funktionen)",
          "Sicherheitsgurte, Kopfstütze positioniert",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Federung (Fahrzeug steht gerade)",
          "Leitungen (keine Leckagen)",
          "Anhängerzugvorrichtung",
          "Abschmieren (Türscharniere, -dichtungen, Lagerungen)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Notfallset (1x Warndreieck, 6x Warnweste, 2x Warnleuchte, Kfz-Verbandkasten)",
          "Funk, Handfunkgeräte (Funktion, Akkus geladen)"
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig)",
          "Aggregat (Öl, Kraftstoff, Testlauf mit Verbraucher mind. 15 Min.)",
          "Reservekanister (voll, Zustand, Alter)",
          "RZA (Funktion, Vollständigkeit, Batterien)",
          "6x Powerflare (schwarzer Koffer): Funktion, Akkus laden",
          NP("Feuerlöscher ABC Pulver 6 kg, verplombt"),
          "2x Winkerkelle, 3x Adalit-Handlampen (Funktion, Testlauf 30 Minuten)",
          "Beleuchtungsstativ + LED-Strahler (Funktion, Zubehör)",
          "Funktionswesten (Vollständigkeit)",
          "Unterlegkeil",
          "2x Faltdreiecke, 2x Euroblitz-Leuchte (Funktion, Ladeerhaltung, Testlauf 15 Min.)",
          "5-Gasmessgerät + Aufsteckpumpe (Funktion, Ladegerät, Zubehör)",
          "Schreibmaterial (Papier, Stifte usw., Papier Thermodrucker)",
          "Einsatzpläne",
          "Schlüssel Bauhof, BMA-Anlagen",
          NP("Notfallkoffer verplombt"),
          "MOBS (Funktion, Zubehör)",
          "Getränke vorhanden (MHD?), „Kaffeebox“ (Inhalt, MHD)"
        ]},
        { titel: "Probefahrt 30 km", punkte: [
          "Automatikgetriebe (Funktion, Schaltung, Kick-down)", ...PROBEFAHRT_ENDE, "Fahrzeug sauber (ggf. waschen)"
        ]},
        { titel: "Fahrzeugdaten", punkte: [
          ...FAHRZEUGDATEN.punkte,
          { id: "tuev", typ: "monat", text: "Nächster TÜV", nr: false }
        ]}
      ]
    },
    {
      id: "23-1", kurz: "23/1", untertitel: "mit Anhänger P250", name: "Naila 23/1",
      reifen: { VA: 8.5, HA: 8.0 },
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor, Lenkung, Kupplungsflüssigkeit)",
          "Kraftstoff (Füllstand mind. ¾), AdBlue (Füllstand mind. ¼)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeugbeleuchtung, Kontrollleuchten, Blaulicht, Heckwarneinrichtung)",
          "Suchfahrscheinwerfer, Rückfahrscheinwerfer, Spiegel, Spiegelheizung",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Bremse (Luftkessel entwässern)",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Hupe, Sondersignalanlage (Funktion, Ölstand Kompressor)",
          "Sicherheitsgurte, Kopfstütze positioniert, Sitzlagerung PA fest und Funktion",
          "Federung (Fahrzeug steht gerade)",
          "Unterlegkeile",
          "Leitungen (keine Leckagen)",
          "Abschmieren (Türscharniere, -dichtungen, Lagerungen, Jalousien)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Funk, Funkgeräte (Funktion, Ladeerhaltung, Akkus geladen)",
          "Hygieneboard (Druckluft, Wasserentnahme, Seife, Desinfektion, Papierhandtücher)",
          "Feuerlöschkreiselpumpe (Ölstand Entlüftungseinrichtung)",
          "Feuerlöschkreiselpumpe (Schließdruckprüfung, Entwässerung, Trockensaugprobe)",
          "Notfallset (2x Warndreieck, 3x Warnweste, 2x Warnleuchte, Verbandkasten)",
          "Lichtmast (Funktion)",
          "Rückfahrkamera (Funktion, Sauberkeit)",
          "Beleuchtung (Geräteräume, Umfeld, Dachkasten, Mannschaftsraum, Trittbrett)",
          OHNE_NR("wassertank", "Wassertank voll (4.350 l)"),
          OHNE_NR("schaumtank", "Schaumtank Class A voll (500 l)")
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig)",
          "4x Pressluftatmer, 4x Maske",
          NP("2x Feuerlöscher ABC 6 kg, 2x CO2 5 kg, verplombt"),
          NP("2x CO2 5 kg, verplombt"),
          NP("Feuerlöscher ABC 50 kg fahrbar, verplombt"),
          NP("Feuerlöscher CO2 30 kg fahrbar, verplombt"),
          NP("Feuerlöscher Klasse D 50 kg fahrbar, verplombt"),
          NP("HiPress"),
          "Aggregat Benzin (Öl, Kraftstoff, Testlauf 15 Min. mit Verbraucher, Schutzleiterprüfung, ZMS-Start)",
          "Beleuchtungsgruppe (Funktion, vollständig)",
          "Tauchpumpe (Funktion, Zubehör)",
          "Chiemseepumpe (Funktion, Zubehör)",
          "3x Handlampen (Funktion, Ladeerhaltung, Testlauf 30 Minuten)",
          "2x Winkerkellen, 2x Blitzleuchten (Funktion, Batterien)",
          "Motorlüfter (Öl, Kraftstoff, Funktion, Reifenluftdruck, Motoröl-Nachfüllflasche)",
          "Kraftstoff- und Kettensägenkanister (voll, Alter, Zustand), 2x Schaumkanister Class A",
          "Kettensäge (Testlauf, Kettenspiel, Zubehör, getankt)",
          "Getränke vorhanden (MHD?)",
          "Elektroadapter Anhänger (vorhanden)"
        ]},
        { titel: "Anhänger P250", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Räder (Profil, Beschädigungen, Reifenluftdruck 3,5 bar), Handbremse prüfen",
          "Beleuchtung (prüfen)",
          "Schläuche, Löschpistolen (Zustand)",
          NP("Verplombt")
        ]},
        { titel: "Probefahrt 30 km + Anhänger P250", punkte: [
          "Schaltung, Kupplung, Gas", ...PROBEFAHRT_ENDE,
          "Differentialsperre, Verteilergetriebesperre (prüfen bei gerader Fahrt)",
          "Schleuderketten (Funktion)",
          "Fahrzeug sauber (ggf. waschen)"
        ]},
        FAHRZEUGDATEN
      ]
    },
    {
      id: "30-1", kurz: "30/1", name: "Naila 30/1",
      reifen: { VA: 7.5, HA: 8.0 },
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor, Lenkung, Kupplungsflüssigkeit)",
          "Kraftstoff (Füllstand mind. ¾)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeugbeleuchtung, Kontrollleuchten, Blaulicht, Heckwarneinrichtung)",
          "Spiegel, Rückfahrscheinwerfer",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Bremse (Luftkessel entwässern)",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Hupe, Sondersignalanlage (Funktion, Ölstand Kompressor)",
          "Sicherheitsgurte, Kopfstütze positioniert",
          "Federung (Fahrzeug steht gerade)",
          "Unterlegkeile",
          "Leitungen (keine Leckagen)",
          "Abschmieren (Türscharniere, -dichtungen, Lagerungen, Jalousien)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Notfallset (2x Warndreieck, 3x Warnweste, 2x Warnleuchte, Verbandkasten)",
          "Abstützung/Stützbalken (Rost, Schmierung)",
          "Leiterpark (Zustand, Schmierung, Beschädigungen)",
          "Hydraulikölstand (prüfen – Leiterauflage)",
          "Funk, Funkgeräte (Funktion, Ladeerhaltung, Akkus geladen)",
          "Rettungskorb, Wenderohr, Tragenlagerung, Lüfterauflage (Funktion, Schmieren)",
          "Absturzsicherungsöse, Kranöse 4000 kg, Lastöse 400 kg (Zustand)",
          "Rettungskorb (Steckdosen, Beleuchtung, Sprechanlage, Fahrbetrieb)",
          "Beleuchtung (Leiterpark, Umfeldbeleuchtung, Geräteräume)"
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig)",
          "2x Handlampen (Funktion, Ladeerhaltung, Testlauf 30 Minuten)",
          "1x Winkerkelle (Funktion, Batterien)",
          "LED-Warnleuchtenkoffer „Powerflare“ (vollständig, Akku geladen)",
          "2x Pressluftatmer, 2x Maske",
          NP("Feuerlöscher ABC 12 kg, verplombt"),
          "Aggregat Benzin (Öl, Kraftstoff, Testlauf mit Verbraucher 15 Min., Schutzleiterprüfung, Fremdstart, Reservekanister [voll, Alter, Zustand])",
          "Absturzsicherungssatz, Auf- und Abseilgerätesatz (vorhanden)",
          "Elektrolüfter (Funktion), wasserbetriebener Lüfter (Zustand)",
          "Elektrosäge (Funktion, Kettenspiel)",
          "Rettungssäge (Testlauf, Kettenspiel, Zubehör, getankt, Reservekanister [voll, Alter, Zustand])",
          "Getränke vorhanden (MHD)"
        ]},
        { titel: "Probefahrt 30 km", punkte: [
          "Schaltung, Kupplung, Gas", ...PROBEFAHRT_ENDE,
          "Differentialsperre (prüfen bei gerader Fahrt)",
          "Schleuderketten (Funktion)",
          "Fahrzeug sauber (ggf. waschen)"
        ]},
        FAHRZEUGDATEN
      ]
    },
    {
      id: "40-1", kurz: "40/1", name: "Naila 40/1",
      reifen: { VA: 7.5, HA: 7.0, Haspel: 1.5 },
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor, Lenkung, Kupplungsflüssigkeit)",
          "Kraftstoff (Füllstand mind. ¾)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeugbeleuchtung, Kontrollleuchten, Blaulicht, Heckwarneinrichtung)",
          "Suchscheinwerfer, Rückfahrscheinwerfer, Spiegel",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Bremse (Luftkessel entwässern)",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Hupe, Sondersignalanlage (Funktion, Ölstand Kompressor)",
          "Sicherheitsgurte, Kopfstütze positioniert, PA-Halterung",
          "Federung (Fahrzeug steht gerade)",
          "Unterlegkeile",
          "Leitungen (keine Leckagen)",
          "Abschmieren (Türscharniere, -dichtungen, Lagerungen, Jalousien)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Funk, Funkgeräte (Funktion, Ladeerhaltung, Akkus geladen)",
          "Standheizung Testlauf 15 Minuten",
          "Feuerlöschkreiselpumpe (Ölstand Entlüftungseinrichtung)",
          "Feuerlöschkreiselpumpe (Schließdruckprüfung, Entwässerung, Trockensaugprobe)",
          "Notfallset (2x Warndreieck, 9x Warnweste, 3x Warnleuchte, Verbandkasten)",
          "Lichtmast (Funktion, abschmieren)",
          "Beleuchtung (Geräteräume, Mannschaftsraum)",
          OHNE_NR("wassertank", "Wassertank voll (1.200 l)"),
          OHNE_NR("schaumkanister", "Schaumkanister MBS 6x")
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig)",
          "4x Pressluftatmer, 4x Maske",
          NP("Feuerlöscher ABC 12 kg, verplombt"),
          NP("Feuerlöscher D 12 kg, verplombt"),
          NP("Feuerlöscher CO2 5 kg, verplombt"),
          "Kübelspritze (gefüllt)",
          "Tauchpumpe, Wassersauger (Funktion, Zubehör)",
          "Beleuchtungsgruppe (Funktion, vollständig)",
          "Aggregat Benzin (Öl, getankt + Reservekanister [voll, Alter, Zustand], Testlauf mit Verbraucher 15 Min., Schutzleiterprüfung)",
          "Hydraulikaggregat, Rettungssatz, Zylinder (Testlauf, Ölstand)",
          "Säbelsäge (Zustand, Funktion, Akku geladen, 2x Sägeblätter)",
          "Kettensäge (Testlauf, Kettenspiel, Zubehör, getankt + Reservekanister [voll, Alter, Zustand])",
          "Getränke vorhanden? (MHD)",
          "Türöffnungssatz vollständig + Akkuschrauber (Funktion, Akku geladen)",
          "5x Handlampen (Funktion, Ladeerhaltung)",
          "2x Winkerkellen, 2x Blitzleuchten, Megaphon (Funktion, Batterien)",
          "WBK (Funktion, 4x Akkus geladen), Testlauf 15 Minuten",
          "RZA-Checkbox (Funktion, Batterien)"
        ]},
        { titel: "Probefahrt 30 km", punkte: [
          "Schaltung, Kupplung, Gas", ...PROBEFAHRT_ENDE,
          "Differentialsperre, Verteilergetriebe, -sperre (prüfen bei gerader Fahrt)",
          "Fahrzeug sauber (ggf. waschen)"
        ]},
        FAHRZEUGDATEN
      ]
    },
    {
      id: "41-1", kurz: "41/1", name: "Naila 41/1",
      reifen: { VA: 5.4, HA: 6.7 },
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor)",
          "Kraftstoff (Füllstand mind. ¾), AdBlue (mind. ½ voll)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeug-, Umfeldbeleuchtung, Kontrollleuchten, Blaulicht, Heckwarneinrichtung)",
          "Suchscheinwerfer, Spiegel",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Bremse (Luftkessel entwässern)",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Hupe, Sondersignalanlage (Funktion, Ölstand Kompressor)",
          "Federung (Fahrzeug steht gerade)",
          "Unterlegkeile",
          "Leitungen (keine Leckagen)",
          "Abschmieren (Türscharniere, Türdichtungen, Lagerungen, Jalousien)",
          "Sicherheitsgurte (Beschädigungen, Gurtschlösser)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Funk, 7x HRT (Funktion, Ladeerhaltung, Akkus geladen)",
          "Standheizung Testlauf 15 Minuten",
          "Feuerlöschkreiselpumpe (Entlüftungseinrichtung, Entwässerung)",
          "Lichtmast (Funktion, Absenkung)",
          "Notfallset (2x Warndreieck, 9x Warnweste, 2x Warnleuchte), 2x Anhaltestab (Funktion, Batterie)",
          "Beleuchtung (Geräteräume, Mannschaftsraum)",
          "Dachbeladung (Inhalt Dachkästen, Sicherung Leitern und Wasserwerfer)",
          "Haspel (Beladung vollständig)",
          OHNE_NR("wassertank", "Wassertank voll (2.500 l)"),
          OHNE_NR("schaumtank", "Schaumtank Class A voll (200 l)")
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig)",
          "8x Adalit-Lampen (Funktion, Laufzeit, Ladeerhaltung), Testlauf mind. 30 Minuten",
          "Trolley Verkehrsabsicherung (Ladeerhaltung, Funktion Blitzleuchten, Vollständigkeit), Testlauf 30 Min.",
          "WBK (Funktion), Testlauf mind. 15 Min.",
          "Akku-Scheinwerfer (Funktion, Ladeerhaltung), Testlauf mind. 30 Min.",
          "Ölbinder (gefüllt?)",
          "Tauchpumpe (Funktion, Zubehör)",
          "Wassersauger (Funktion, Zubehör)",
          "6x Pressluftatmer, 6x Maske, RZA-Checkbox (Funktion, Batterien)",
          "Hygieneboard (Füllstand Seife und Desinfektion, Handschuhe, Druckluft, Zubehör)",
          "Überdrucklüfter (Funktion)",
          NP("2x Feuerlöscher ABC 6 kg, verplombt"),
          NP("2x CO2-Löscher 5 kg, verplombt"),
          NP("HiPress, gefüllt"),
          "Kettensäge (Testlauf, Kettenspiel, Zubehör, getankt, Reservekanister voll, Alter, Zustand)",
          "Motor-Trennschleifer (Testlauf, Zubehör, getankt, MHD Trennscheiben)",
          "Aggregat Benzin (Testlauf mit Verbraucher mind. 15 Min., Schutzleiterprüfung, Kraftstoffkanister voll, Alter, Zustand)",
          "Reservekanister Fahrzeug (voll, Alter, Zustand)",
          "Getränke vorhanden? (MHD), Funktion Kühlbox",
          "Säbelsäge (Funktion, Zubehör, Akku + Reserve-Akku geladen?)",
          NP("Verbandsrucksack, verplombt")
        ]},
        { titel: "Probefahrt 30 km", punkte: [
          "Automatikgetriebe (Funktion, Schaltung, Kick-down)", ...PROBEFAHRT_ENDE,
          "Differentialsperre, Verteilergetriebesperre (prüfen bei gerader Fahrt)",
          "Fahrzeug sauber (ggf. waschen)"
        ]},
        FAHRZEUGDATEN
      ]
    },
    {
      id: "56-1", kurz: "56/1", name: "Naila 56/1",
      reifen: { VA: 6.0, HA: 6.5 },
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor, Lenkung)",
          "Kraftstoff (Füllstand mind. ¾), AdBlue (Füllstand mind. ¼)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeugbeleuchtung, Kontrollleuchten, Blaulicht, Heckwarneinrichtung)",
          "Suchfahrscheinwerfer, Spiegel, Spiegelheizung",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Bremse (Luftkessel entwässern)",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Hupe, Sondersignalanlage (Funktion)",
          "Sicherheitsgurte",
          "Federung (Fahrzeug steht gerade)",
          "2x Unterlegkeile (gesichert, ohne Schäden)",
          "Leitungen (keine Leckagen)",
          "Abschmieren (Türscharniere, -dichtungen, Klappen)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Plane (ohne Beschädigung, Befestigung, Funktion, abschmieren)",
          "Funk, Funkgeräte (Funktion, Ladeerhaltung, Akkus geladen)",
          "Standheizung Testlauf 15 Minuten",
          "Hygienebox (vollständig, Wasser wechseln)",
          "Notfallset (1x Warndreieck, 6x Warnweste, 1x Warnleuchte, Verbandkasten)",
          "Zubehörbox (vollständig, siehe Foto), Planenstange",
          "Rückfahrkamera, Seitenkamera (Funktion, Sauberkeit)",
          "Beleuchtung (Ladefläche, Umfeld, Staukästen, Unterboden, Mannschaftsraum)",
          "Fahrzeugreservekanister (gefüllt, Zustand, Alter)",
          NP("Feuerlöscher ABC 6 kg, verplombt"),
          "2x Blitzleuchte, 2x Anhaltestab, 3x Handlampe (Funktion, Ladeerhaltung, Batterie)",
          "Ladebordwand (Funktion, Beleuchtung, Undichtigkeiten, abschmieren)"
        ]},
        { titel: "Beladung", punkte: [
          "Rollcontainer (LADEERHALTUNG ANGESCHLOSSEN, ohne Beschädigungen, Fahrbarkeit, Funktion Bremse)",
          "Beladung (gesichert, vollständig, ohne Beschädigung)",
          "Beleuchtungsgruppen (Funktion, vollständig)",
          "Chiemseepumpen (Funktion, Zubehör)",
          "Aggregate Benzin (Öl, Kraftstoff, Testlauf 15 Min. mit Verbraucher, ISO- und Schutzleiterprüfung, Not-Aus)",
          "Reservekanister (gefüllt, Alter, Zustand, Zubehör)",
          "11x Handlampen, 2x Blitzleuchte (Testlauf 30 Minuten), 2x Anhaltestab (Funktion, Batterie)"
        ]},
        { titel: "Probefahrt 30 km", punkte: [
          "Fahrprogramme (Feuerwehr, Effizient, Funktion Kick-down)", ...PROBEFAHRT_ENDE,
          "Differentialsperre, Verteilergetriebe, Sperren (prüfen bei gerader Fahrt)",
          "Fahrzeug sauber (ggf. waschen)"
        ]},
        FAHRZEUGDATEN
      ]
    },
    {
      id: "56-1-rc", kurz: "56/1 RC", untertitel: "Rollcontainer", name: "Naila 56/1 Rollcontainer",
      abschnitte: [
        { titel: "Rollcontainer Pumpe", punkte: [
          ...RC,
          "Pumpe (Testlauf 15 Min., Trockensaugprobe, voll getankt)",
          "Reservekanister (gefüllt, Alter, Zustand, Ölflasche)"
        ]},
        { titel: "Rollcontainer Zubehör Pumpe", punkte: [...RC] },
        { titel: "Rollcontainer Wasserschaden", punkte: [
          ...RC, "Wassersauger (Funktion, Zubehör)", "Tauchpumpe (Funktion, Zubehör)"
        ]},
        { titel: "Rollcontainer CSA (auf dem 56/1)", punkte: [...RC] },
        { titel: "Rollcontainer Atemschutz (auf dem 56/1)", punkte: [RC[0]] },
        { titel: "Rollcontainer Gleis + Garnituren (auf dem 56/1)", punkte: [...RC] },
        { titel: "Rollcontainer „Wechselkleidung“ (auf dem 56/1)", punkte: [RC[0]] }
      ]
    },
    {
      id: "61-1", kurz: "61/1", name: "Naila 61/1",
      reifen: { VA: 6.0, HA: 6.5 },
      abschnitte: [
        { titel: "Fahrgestell", punkte: [
          "Kühlflüssigkeit (Füllstand, Frostschutz)",
          "Öl (Motor, Lenkung)",
          "Kraftstoff (Füllstand mind. ¾), AdBlue (Füllstand mind. ¼)",
          REIFEN,
          "Räder/Reifen (Profil, Beschädigung, Fremdkörper, Radbolzen)",
          "Beleuchtung (Fahrzeugbeleuchtung, Kontrollleuchten, Blaulicht, Heckwarneinrichtung, Mannschaftsraum)",
          "Arbeitsstellenscheinwerfer, Rückfahrscheinwerfer, Spiegel, Spiegelheizung",
          "Scheiben, Scheibenwischer, Scheibenwaschanlage",
          "Bremse (Luftkessel entwässern)",
          "Keine sichtbaren Schäden (Rost, sonstige Schäden)",
          "Hupe, Sondersignalanlage (Funktion, Ölstand Kompressor)",
          "Sicherheitsgurte, Kopfstütze positioniert",
          "Federung (Fahrzeug steht gerade)",
          "Unterlegkeile (Befestigung, Zustand)",
          "Leitungen (keine Leckagen)",
          "Abschmieren (Türscharniere, -dichtungen, Lagerungen, Jalousien)"
        ]},
        { titel: "Aufbau", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Funk, Funkgeräte (Funktion, Ladeerhaltung, Akkus geladen)",
          "Reserve-Akku mit Ladegerät (Funktion, Ladeerhaltung)",
          "2x Anhaltestab, 3x Handlampe (Funktion, Ladeerhaltung)",
          "Gasmessgerät (Funktion, Ladeerhaltung, Zubehör)",
          "Standheizung Testlauf 15 Minuten",
          "Notfallset (1x Warndreieck, 3x Warnweste, 1x Warnleuchte, Verbandkasten)",
          "Rückfahrkamera (Funktion, Sauberkeit)",
          "Seilwinde (Funktion mit und ohne Last, Beschädigungen, schmieren, Zubehör)",
          "Fahrzeugreservekanister (gefüllt, Alter, Zustand)",
          "Trittbretter (Beleuchtung, schmieren)",
          "Ladebordwand (Funktion, Fernbedienung, Warnflaggen, Undichtigkeiten, abschmieren)",
          "Beleuchtung (Geräteräume, Umfeld, Unterboden, Dachkästen, Ladefläche, Ladebordwand)"
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig, ohne Beschädigung)",
          "Elektrolüfter (Testlauf)",
          "„Zubehör Fahrzeug“ komplett",
          "Büffelheber (Funktion, Auflageplatten)",
          "Hebekissen mit Zubehör (Sichtprüfung)",
          "Säbelsäge, Winkelschleifer (Funktion, Akkus geladen)",
          "Kettensäge Elektro (Funktion, Kettenspiel)",
          "Trennschleifer, Rettungssäge, Kettensäge (Testlauf, getankt, Zubehör, MHD?, Reservekanister [voll, Zustand])",
          "Hydraulikaggregat (Testlauf, Ölstand)",
          "Rettungssatz, -zylinder (Funktionen, gesichert)",
          "Kombigerät (Funktion, Akku, Ladegerät)",
          "4x Euroblitz (Funktion, Ladeerhaltung), Testlauf 30 Minuten",
          "12x Warnblitzleuchten (Funktion, Zubehör)",
          NP("1x Feuerlöscher CO2 5 kg, verplombt"),
          NP("2x Feuerlöscher ABC Pulver 6 kg, verplombt"),
          NP("1x Feuerlöscher Schaum 9 l, verplombt"),
          NP("HiPress"),
          "Helme (Zustand, Beleuchtung)",
          "Druckluftflaschen (Druck, gesichert)",
          "Getränke vorhanden? (MHD?)",
          "Hygienefach (Druckluft, Seife, Desinfektion, Papierhandtücher, Wasser wechseln)",
          "Schlagschrauber (Funktion, Akku geladen)",
          "Generator (Testlauf mit Verbraucher 30 Min., ISO-Prüfung, Not-Aus)",
          "Lichtmast (Funktion)",
          "Mehrzweckzug (Funktion, Zubehör)",
          "2x Bohrhammer (Funktion, Zubehör)",
          "Akkuschrauber (Funktion, Zubehör, Akku)",
          "2x LED-Akkustrahler (Funktion, Testlauf 30 Minuten, Ladeerhaltung)",
          "2x Pressluftatmer (Kurzprüfung, Druck), 2x Maske",
          "Dichtkissen (Sichtkontrolle)",
          "2x Schutzhelm für Plasmaschneider (Funktion Lüfter, Akku LADEN!)",
          "Dieselpumpe mit Zubehör (Sichtkontrolle)"
        ]},
        { titel: "Rollcontainer Umwelt", punkte: [
          ...RC61, "Dichtlanzen (Sichtprüfung)", "Fußpumpe (Funktion)"
        ]},
        { titel: "Rollcontainer Beleuchtung", punkte: [
          ...RC61, "Beleuchtungsgruppen prüfen",
          "Aggregat (Öl, Kraftstoff, Testlauf mit Verbrauchern 30 Minuten, Schutzleiterprüfung)",
          "Reservekanister (gefüllt, Zubehör, Alter, Zustand)",
          "LADEERHALTUNG ANGESCHLOSSEN"
        ]},
        { titel: "Rollcontainer Zelt", punkte: [
          ...RC61, "Heizung Testlauf 10 Min.", "Gebläse (Funktion)", "Beleuchtung (Funktion)", "Luftpumpe (Funktion)"
        ]},
        { titel: "Rollcontainer VU", punkte: [
          ...RC61, "Hydraulikaggregat Testlauf 30 Minuten, Ölstand", "Zylinder, Schläuche (Zustand, Funktion)",
          "Hydraulischer Hebesatz (Funktion)"
        ]},
        { titel: "Probefahrt 30 km + Anhänger ÖSA", punkte: [
          "Automatikgetriebe (Funktion, Schaltung, Kick-down)", ...PROBEFAHRT_ENDE,
          "Differentialsperre, Verteilergetriebe, Sperren (prüfen bei gerader Fahrt)",
          "Schleuderketten (Funktion)",
          "Fahrzeug sauber (ggf. waschen)"
        ]},
        FAHRZEUGDATEN
      ]
    },
    {
      id: "61-1-sa", kurz: "61/1 SA", untertitel: "Anhänger Ölschaden / Logistik", name: "Anhänger Ölschaden/Logistik (61/1 SA)",
      abschnitte: [
        { titel: "Aufbau und Fahrgestell", punkte: [
          "Keine sichtbaren Schäden (Rost, sonst. Schäden)",
          "Räder (Profil, Beschädigungen, Reserverad, Reifenluftdruck 4,0 bar)",
          "Beleuchtung (Fahrzeug, Ladefläche prüfen)",
          "Stützrad (prüfen, schmieren)",
          "Auflaufbremse, Feststellbremse, Abreißseil (prüfen, schmieren)",
          "Unterlegkeile (Befestigung, Zustand, vollständig)",
          "Abstützung Heckbereich links und rechts",
          "Plane (Beschädigungen, Befestigung)"
        ]},
        { titel: "Beladung", punkte: [
          "Beladung (gesichert, vollständig)",
          "Raubox Dichtkissen",
          "Raubox CSA",
          "Raubox Ölsperre",
          "Raubox Wassersauger",
          "Raubox Zubehör Ölschaden",
          "3 Schaufeln, 3 Besen, 3 Wasserschieber",
          "Sackkarre, Streugerät",
          "3 leere Fässer",
          "4x Öl Ex Pulver",
          "3x Öl Ex Hart (Schaumkanister)",
          "2x Öl Ex 82",
          "Feuerwehraxt, Vorschlaghammer",
          "4x Ölspurschilder mit Füßen"
        ]}
      ]
    }
  ]
};
}
