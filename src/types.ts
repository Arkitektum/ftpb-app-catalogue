/** One layout file belonging to an app, named as the app's repository names it. */
export interface LayoutFile {
    /** The layout's name, without the .json extension. */
    name: string;
    /** Where the file sits in the app's repository. */
    path: string;
}

/** A subform app, referenced by the app that carries it. */
export interface CatalogueSubform {
    /** The organisation that owns the app, as Altinn Studio spells it. */
    org: string;
    /** The app's name within that organisation. */
    app: string;
    /** The data type this subform's form data lives under. */
    dataType: string;
}

/** An Altinn Studio app this tooling knows about. */
export interface CatalogueApp {
    /** The organisation that owns the app, as Altinn Studio spells it. */
    org: string;
    /** The app's name within that organisation. */
    app: string;
    /** The data type the app's main form data lives under. */
    dataType: string;
    /** The subform apps this app references. Empty when it has none. */
    subForms: CatalogueSubform[];
    /**
     * The layout files worth reading for this app, where naming them saves guessing. Absent for most apps, which
     * are read through whatever their repository holds.
     */
    layoutFiles?: LayoutFile[];
}
