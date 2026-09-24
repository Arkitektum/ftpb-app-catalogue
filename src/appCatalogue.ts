import type { CatalogueApp } from "./types.ts";

/**
 * Every Altinn Studio app this tooling knows about, and the data type each one's form data lives under.
 *
 * This is the one list. Both the components API and the API tools read it from here, because they held their own
 * copies until 2026-09-24 and the copies had already drifted apart by one app.
 *
 * An app's own applicationmetadata is always authoritative. This list is for knowing which apps to look at before
 * any of them has been asked.
 */
export const appCatalogue: CatalogueApp[] = [
    {
        org: "dat",
        app: "byggesak-samtykke-v3",
        dataType: "ArbeidstilsynetSamtykkeSoknad",
        subForms: []
    },
    {
        org: "dibk",
        app: "an-v2",
        dataType: "AN",
        subForms: []
    },
    {
        org: "dibk",
        app: "disp-v1",
        dataType: "DS",
        subForms: [
            { org: "dibk", app: "dispensasjonssoeknad-v1", dataType: "DispensasjonssoeknadDataV1" },
            { org: "dibk", app: "gjenpart-nabovarsel-v3", dataType: "GjenpartNabovarselDataV3" }
        ]
    },
    {
        org: "dibk",
        app: "es-v2",
        dataType: "ES",
        subForms: [
            { org: "dibk", app: "dispensasjonssoeknad-v1", dataType: "DispensasjonssoeknadDataV1" },
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" },
            { org: "dibk", app: "gjenpart-nabovarsel-v3", dataType: "GjenpartNabovarselDataV3" }
        ]
    },
    {
        org: "dibk",
        app: "et-v4",
        dataType: "ET",
        subForms: [
            { org: "dibk", app: "dispensasjonssoeknad-v1", dataType: "DispensasjonssoeknadDataV1" },
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" },
            { org: "dibk", app: "gjenpart-nabovarsel-v3", dataType: "GjenpartNabovarselDataV3" }
        ]
    },
    {
        org: "dibk",
        app: "fa-v3",
        dataType: "FA",
        subForms: [
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" }
        ]
    },
    {
        org: "dibk",
        app: "fa-v5",
        dataType: "FA",
        subForms: [
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" }
        ]
    },
    {
        org: "dibk",
        app: "fts-v1",
        dataType: "FTS",
        subForms: [
            { org: "dibk", app: "dispensasjonssoeknad-v1", dataType: "DispensasjonssoeknadDataV1" },
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" }
        ]
    },
    {
        org: "dibk",
        app: "hoeringettersyn-v2",
        dataType: "HoeringOgOffentligEttersyn",
        subForms: []
    },
    {
        org: "dibk",
        app: "hoeringettersynuttalelse-v2",
        dataType: "HoeringOgOffentligEttersynUttalelse",
        subForms: [],
        layoutFiles: [
            { name: "Uttalelse", path: "App/ui/form/layouts/Uttalelse.json" },
            { name: "UttalelsePdf", path: "App/ui/form/layouts/UttalelsePdf.json" }
        ]
    },
    {
        org: "dibk",
        app: "ig-v3",
        dataType: "IG",
        subForms: [
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" }
        ]
    },
    {
        org: "dibk",
        app: "ig-v5",
        dataType: "IG",
        subForms: [
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" }
        ]
    },
    {
        org: "dibk",
        app: "innsending-planforslag",
        dataType: "OversendelseReguleringsplanforslag",
        subForms: [],
        layoutFiles: [
            { name: "DisplayLayout", path: "App/ui/hovedskjema/layouts/DisplayLayout.json" }
        ]
    },
    {
        org: "dibk",
        app: "ko-v2",
        dataType: "KO",
        subForms: []
    },
    {
        org: "dibk",
        app: "mb-v3",
        dataType: "MB",
        subForms: [
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" }
        ]
    },
    {
        org: "dibk",
        app: "mb-v5",
        dataType: "MB",
        subForms: [
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" }
        ]
    },
    {
        org: "dibk",
        app: "nabovarsel-svar-v5",
        dataType: "NVS",
        subForms: [],
        layoutFiles: [
            { name: "SvarSkjemaPdf", path: "App/ui/svarskjema/layouts/SvarSkjemaPdf.json" }
        ]
    },
    {
        org: "dibk",
        app: "nabovarsel-v5",
        dataType: "NV",
        subForms: [
            { org: "dibk", app: "dispensasjonsvarsel-v1", dataType: "DispensasjonsvarselDataV1" }
        ]
    },
    {
        org: "dibk",
        app: "rs-v4",
        dataType: "RS",
        subForms: [
            { org: "dibk", app: "dispensasjonssoeknad-v1", dataType: "DispensasjonssoeknadDataV1" },
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" },
            { org: "dibk", app: "gjenpart-nabovarsel-v3", dataType: "GjenpartNabovarselDataV3" }
        ]
    },
    {
        org: "dibk",
        app: "sa-v2",
        dataType: "SA",
        subForms: []
    },
    {
        org: "dibk",
        app: "su-v2",
        dataType: "SU",
        subForms: [
            { org: "dibk", app: "dispensasjonssoeknad-v1", dataType: "DispensasjonssoeknadDataV1" },
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" },
            { org: "dibk", app: "gjenpart-nabovarsel-v3", dataType: "GjenpartNabovarselDataV3" }
        ]
    },
    {
        org: "dibk",
        app: "ta-v4",
        dataType: "TA",
        subForms: [
            { org: "dibk", app: "dispensasjonssoeknad-v1", dataType: "DispensasjonssoeknadDataV1" },
            { org: "dibk", app: "gjennomfoeringsplan-v7", dataType: "GjennomfoeringsplanDataV7" },
            { org: "dibk", app: "gjenpart-nabovarsel-v3", dataType: "GjenpartNabovarselDataV3" }
        ]
    },
    {
        org: "dibk",
        app: "ts-v1",
        dataType: "TS",
        subForms: []
    },
    {
        org: "dibk",
        app: "varselplanoppstart-v3",
        dataType: "Planvarsel",
        subForms: []
    },
    {
        org: "dibk",
        app: "varselplanoppstart-v4",
        dataType: "Planvarsel",
        subForms: []
    },
    {
        org: "dibk",
        app: "varselplanoppstartuttalelse-v3",
        dataType: "Planuttalelse",
        subForms: [],
        layoutFiles: [
            { name: "UttalelseSkjemaPdf", path: "App/ui/Planuttalelse/layouts/UttalelseSkjemaPdf.json" }
        ]
    }
];
