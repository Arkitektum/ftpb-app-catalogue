# @arkitektum/ftpb-app-catalogue

![CI](https://github.com/Arkitektum/ftpb-app-catalogue/actions/workflows/ci.yml/badge.svg) ![npm version](https://img.shields.io/npm/v/@arkitektum/ftpb-app-catalogue.svg)

The Altinn Studio apps the FtPB tooling knows about, the data type each app's form data lives under, and the subform apps each one carries. It is the shared list for the repositories that need it, so they agree about which apps there are.

An app's own applicationmetadata is authoritative. This list is for knowing which apps to look at before any of them has been asked, and for guessing a data type before an app has been probed.

It is published in both ESM and CommonJS builds, with TypeScript declarations.

## Who uses it

- **`altinn-studio-custom-components-api`** maps it onto the `appOwner`/`appName` field names that repository uses, and reads `layoutFiles` for the apps that name them.
- **`altinn-studio-api-tools`** narrows it to the fields its `GET /catalogue` endpoint serves, which is everything except `layoutFiles`.

To add an app, add it here, publish, and bump the dependency in both.

Example data for the apps listed here is read with [`@arkitektum/ftpb-testmotor-client`](https://github.com/Arkitektum/ftpb-testmotor-client). The two packages are independent.

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

Consumers that spell the fields differently map the list when they read it.

```js
const apps = appCatalogue.map((entry) => ({
    appOwner: entry.org,
    appName: entry.app,
    dataType: entry.dataType
}));
```

## API

| Export                                           | Kind     | Purpose                                                                           |
| ------------------------------------------------ | -------- | --------------------------------------------------------------------------------- |
| `appCatalogue`                                   | constant | Every app, ordered by organisation and name.                                      |
| `findApp(org, app, catalogue?)`                  | function | One app, or undefined when the catalogue does not name it. Both parts must match. |
| `subformApps(catalogue?)`                        | function | Each declared subform app once, in the order first declared.                      |
| `appsDeclaringSubform(dataType, catalogue?)`     | function | Every app declaring a subform with that data type, which may be none.             |
| `CatalogueApp`, `CatalogueSubform`, `LayoutFile` | types    | The shapes described under Data, for TypeScript callers.                          |

Each function takes an optional catalogue as its last argument, defaulting to the whole list, so tests can pass a small catalogue of their own.

## Data

Each `CatalogueApp` has:

- `org` and `app`: the app's organisation and name, as Altinn Studio spells them.
- `dataType`: the data type the app's main form data lives under.
- `subForms`: the subform apps the app carries, each as `{ org, app, dataType }`. Empty when it has none. A subform app is listed only under the apps that carry it, never as an app in its own right.
- `layoutFiles` (optional): the layout files worth reading for the app, each as `{ name, path }`, where `name` is the file name without `.json` and `path` is where the file sits in the app's repository. Absent for most apps.

## Development

```bash
yarn install
yarn lint
yarn typecheck
yarn test
yarn build
yarn format        # prettier --write
yarn format:check  # prettier --check
```

`yarn test` runs Node's built-in test runner against the TypeScript sources. It checks the rules the list has to follow: every app named once and kept in order by organisation and name, every subform filed under the same data type wherever it is declared, no app listed both in its own right and as a subform, and every layout file named after the file it points at.

Node 24 or later is required.

## Licence

[MIT](./LICENSE)
