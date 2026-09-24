import { appsDeclaringSubform, findApp, subformApps } from "./queries.ts";
import { describe, it } from "node:test";
import { appCatalogue } from "./appCatalogue.ts";
import assert from "node:assert/strict";

describe("the catalogue", () => {
    it("names every app once", () => {
        const names = appCatalogue.map((entry) => `${entry.org}/${entry.app}`);

        assert.deepEqual([...new Set(names)], names);
    });

    it("gives every app an organisation, a name and a data type", () => {
        for (const entry of appCatalogue) {
            assert.ok(entry.org.length > 0, `${entry.app} has no org`);
            assert.ok(entry.app.length > 0, `an app under ${entry.org} has no name`);
            assert.ok(entry.dataType.length > 0, `${entry.org}/${entry.app} has no data type`);
        }
    });

    it("gives every app a list of subforms, empty when it has none", () => {
        // Reading them is otherwise a guard at every call site.
        for (const entry of appCatalogue) {
            assert.ok(Array.isArray(entry.subForms), `${entry.org}/${entry.app} has no subForms list`);
        }
    });

    it("keeps the apps in order by organisation and name, so a diff of this file reads as one", () => {
        const names = appCatalogue.map((entry) => `${entry.org}/${entry.app}`);

        assert.deepEqual(names, [...names].sort((a, b) => a.localeCompare(b)));
    });
});

describe("the subforms", () => {
    it("files every subform under the same data type wherever it is declared", () => {
        // A subform carried by a dozen parents is one app, so two parents disagreeing about its data type is a
        // mistake in this file rather than something a consumer should have to reconcile.
        const dataTypes = new Map<string, string>();
        for (const entry of appCatalogue) {
            for (const subForm of entry.subForms) {
                const key = `${subForm.org}/${subForm.app}`;
                const known = dataTypes.get(key);
                assert.ok(known === undefined || known === subForm.dataType, `${key} is filed under both ${known} and ${subForm.dataType}`);
                dataTypes.set(key, subForm.dataType);
            }
        }
    });

    it("gives every subform an organisation, a name and a data type", () => {
        for (const subForm of subformApps()) {
            assert.ok(subForm.org.length > 0 && subForm.app.length > 0 && subForm.dataType.length > 0, `incomplete subform ${subForm.app}`);
        }
    });

    it("does not list a subform app as an app in its own right", () => {
        // The two are read separately, and an app in both lists would be counted twice.
        for (const subForm of subformApps()) {
            assert.equal(findApp(subForm.org, subForm.app), undefined, `${subForm.app} is both an app and a subform`);
        }
    });

    it("answers with each subform once, however many parents carry it", () => {
        const declared = appCatalogue.flatMap((entry) => entry.subForms);
        const distinct = subformApps();

        assert.ok(declared.length > distinct.length, "expected at least one subform to be carried by more than one app");
        assert.deepEqual(
            distinct.map((subForm) => subForm.app),
            [...new Set(declared.map((subForm) => subForm.app))]
        );
    });
});

describe("the layout files", () => {
    it("names a json file with a path for each one", () => {
        for (const entry of appCatalogue) {
            for (const file of entry.layoutFiles ?? []) {
                assert.ok(file.name.length > 0, `${entry.app} has a layout file with no name`);
                assert.ok(file.path.endsWith(".json"), `${entry.app} has a layout path that is not a json file: ${file.path}`);
            }
        }
    });

    it("names each layout after the file it points at", () => {
        for (const entry of appCatalogue) {
            for (const file of entry.layoutFiles ?? []) {
                assert.equal(file.path.split("/").pop(), `${file.name}.json`, `${entry.app}: ${file.name} does not match ${file.path}`);
            }
        }
    });
});

describe("looking an app up", () => {
    it("finds an app by its organisation and name", () => {
        assert.equal(findApp("dibk", "an-v2")?.dataType, "AN");
    });

    it("answers with nothing for an app the catalogue does not name", () => {
        assert.equal(findApp("dibk", "ikke-en-app"), undefined);
        assert.equal(findApp("annen-org", "an-v2"), undefined, "the organisation has to match too");
    });

    it("finds every app that declares a given subform", () => {
        const declaring = appsDeclaringSubform("GjennomfoeringsplanDataV7");

        assert.ok(declaring.length > 1, "expected the gjennomfoeringsplan subform to be carried by several apps");
        for (const entry of declaring) {
            assert.ok(entry.subForms.some((subForm) => subForm.dataType === "GjennomfoeringsplanDataV7"));
        }
    });

    it("answers with nothing for a subform nothing declares", () => {
        assert.deepEqual(appsDeclaringSubform("IkkeEnDataType"), []);
    });

    it("reads a catalogue it is given rather than the whole one", () => {
        const one = [{ org: "test", app: "test-v1", dataType: "Test", subForms: [] }];

        assert.equal(findApp("test", "test-v1", one)?.dataType, "Test");
        assert.equal(findApp("dibk", "an-v2", one), undefined);
        assert.deepEqual(subformApps(one), []);
    });
});
