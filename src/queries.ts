import type { CatalogueApp, CatalogueSubform } from "./types.ts";
import { appCatalogue } from "./appCatalogue.ts";

/**
 * The distinct subform apps the catalogue declares.
 *
 * One subform is carried by a dozen parents, so reading them off the apps directly gives the same app back many
 * times. This answers with each one once, in the order they are first declared.
 *
 * @param catalogue - The apps to read. Defaults to the whole catalogue.
 * @returns Each declared subform app, once.
 */
export function subformApps(catalogue: CatalogueApp[] = appCatalogue): CatalogueSubform[] {
    const seen = new Map<string, CatalogueSubform>();
    for (const entry of catalogue) {
        for (const subForm of entry.subForms) {
            const key = `${subForm.org}/${subForm.app}`;
            if (!seen.has(key)) {
                seen.set(key, subForm);
            }
        }
    }
    return [...seen.values()];
}

/**
 * The app with the given organisation and name.
 *
 * @param org - The organisation that owns the app.
 * @param app - The app's name within that organisation.
 * @param catalogue - The apps to search. Defaults to the whole catalogue.
 * @returns The app, or undefined when the catalogue does not name it.
 */
export function findApp(org: string, app: string, catalogue: CatalogueApp[] = appCatalogue): CatalogueApp | undefined {
    return catalogue.find((entry) => entry.org === org && entry.app === app);
}

/**
 * Every app that declares the given subform data type.
 *
 * @param dataType - The subform's data type.
 * @param catalogue - The apps to search. Defaults to the whole catalogue.
 * @returns The apps declaring it, which may be none.
 */
export function appsDeclaringSubform(dataType: string, catalogue: CatalogueApp[] = appCatalogue): CatalogueApp[] {
    return catalogue.filter((entry) => entry.subForms.some((subForm) => subForm.dataType === dataType));
}
