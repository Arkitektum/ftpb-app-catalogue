# @arkitektum/ftpb-app-catalogue

![CI](https://github.com/Arkitektum/ftpb-app-catalogue/actions/workflows/ci.yml/badge.svg) ![npm version](https://img.shields.io/npm/v/@arkitektum/ftpb-app-catalogue.svg)

The Altinn Studio apps this tooling knows about, and the data type each one's form data lives under.

This exists because two repositories kept their own copy of the same list. `altinn-studio-custom-components-api` maintained it as `altinnStudioApps.mjs` and `altinn-studio-api-tools` as `appCatalogue.ts`, whose header claimed it was generated from the first although nothing generated it. By September 2026 the two had drifted: one app was in the first list and not the second, and nothing in either repository could notice.

An app's own applicationmetadata is always authoritative. This list is for knowing which apps to look at before any of them has been asked, and for guessing a data type before an app has been probed.

It is published in both ESM and CommonJS builds, with TypeScript declarations.

## Who uses it

- **`altinn-studio-custom-components-api`** projects it onto the `appOwner`/`appName` field names that repository has always used, and reads `layoutFiles` for the few apps that name them.
- **`altinn-studio-api-tools`** narrows it to the fields its `GET /catalogue` endpoint serves, which is everything except `layoutFiles`.

Neither holds a list of its own any more. Add an app here, publish, and bump the dependency in both.

They also share [`@arkitektum/ftpb-testmotor-client`](https://github.com/Arkitektum/ftpb-testmotor-client), which reads example data for the apps listed here. The two packages are independent, and a consumer can use either alone.

## Installation

```bash
npm install @arkitektum/ftpb-app-catalogue
```

```bash
yarn add @arkitektum/ftpb-app-catalogue
```

## Usage

```js
import { appCatalogue, findApp, subformApps } from "@arkitektum/ftpb-app-catalogue";

for (const entry of appCatalogue) {
    console.log(`${entry.org}/${entry.app} holds its form data under ${entry.dataType}`);
}

const disp = findApp("dibk", "disp-v1");
const subforms = subformApps();
```

Consumers that spell the fields differently project the list on the way in rather than editing it here.

```js
const apps = appCatalogue.map((entry) => ({
    appOwner: entry.org,
    appName: entry.app,
    dataType: entry.dataType
}));
```

## API

| Export | Kind | Purpose |
| ------ | ---- | ------- |
| `appCatalogue` | constant | Every app, ordered by organisation and name. |
| `findApp(org, app, catalogue?)` | function | One app, or undefined when the catalogue does not name it. Both parts must match. |
| `subformApps(catalogue?)` | function | Each declared subform app once, in the order first declared. |
| `appsDeclaringSubform(dataType, catalogue?)` | function | Every app declaring that subform, which may be none. |
| `CatalogueApp`, `CatalogueSubform`, `LayoutFile` | types | The shapes above, for TypeScript callers. |

Each function takes an optional catalogue as its last argument, defaulting to the whole list. That is there for tests, which should not have to stand up the real list to check a caller's own logic.

## What belongs here

An app's identity and the data type its form data lives under, for every app the tooling looks at. A subform app is named by the apps that carry it rather than listed separately, since a subform with no parent is not something this tooling reaches.

`layoutFiles` is carried for the few apps where naming the layouts saves guessing at them. It is absent for most, which are read through whatever their repository holds.

What does not belong here is anything an app answers for itself. Example form data, layout contents and validation results are all fetched, and a copy of any of them would be stale the day after it was written.

## The list is checked, not just stored

`yarn test` asserts what a catalogue has to be true for, rather than restating its contents: every app named once, in order; every subform filed under the same data type wherever it is declared; no app appearing both in its own right and as a subform; every layout file named after the file it points at. A list edited by hand fails these before it reaches a consumer.

## Development

```bash
yarn install
yarn lint
yarn typecheck
yarn test
yarn build
```

Tests run on Node's own test runner against the TypeScript sources, so there is no test framework or transform step to install. Node 24 or later is required.
