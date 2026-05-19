# Node + TS Play

This is a Node sandbox for playing around with the latest TypeScript features:

- **TypeScript Version:** see [package.json](./package.json)
- **Node Version:** see [.nvmrc](./.nvmrc)

This is built for macOS, it has not been tested on other platforms.

## Setup

1. Install [fnm](https://github.com/Schniz/fnm):
   ```sh
   curl -fsSL https://fnm.vercel.app/install | bash
   ```
1. Install [node](https://nodejs.org/en/about/previous-releases):
   ```sh
   fnm use
   ```
1. Confirm the node version matches the [.nvmrc](./.nvmrc):
   ```sh
   node -v
   ```
1. Node includes [corepack](https://github.com/nodejs/corepack):
   ```sh
   corepack -v
   ```
1. Use corepack to install [pnpm](https://pnpm.io/installation#using-corepack):
   ```sh
   corepack enable
   ```
1. Install dependencies:
   ```sh
   pnpm install
   ```

## Project Structure

1. Each sub-project is in a directory beginning with `ts-`
   - **[ts-bundler-tsc](./ts-bundler-tsc/)**
   - **[ts-node-node](./ts-node-node/)**
   - **[ts-node-tsc](./ts-node-tsc/)**
1. Naming convention:
   - `ts-[module_resolution]-[transpiler]`
1. Module resolution:
   - The value of the [moduleResolution](https://www.typescriptlang.org/tsconfig/#moduleResolution) compiler field
1. Transpiler:
   - The tool handling transpilation
   - _tsc_: TypeScript is handling it
   - _node_: Node is running it natively
1. Each directory typically has one of each:
   - `.gitignore` (optional)
     - If it has _tsc_ build artifacts
   - `app.ts`
     - Entry point
   - `my-module.ts`
     - Example import
   - `start.sh`
     - Start script
   - `tsconfig.json`
     - TypeScript config

## Example Workflow

1. Each sub-project has a start command:
   - `pnpm start:bundler:tsc`
   - `pnpm start:node:node`
   - `pnpm start:node:tsc`
1. Run one of the start scripts
1. Check the console for output:
   ```sh
   x = 1
   hello
   ```
1. Navigate to the project folder
1. Review the source files, configuration, and any build artifacts
1. Make changes as desired
1. After making changes:
   - `pnpm fix` (format/lint)
   - `pnpm clean` (remove _.js_ artifacts)
1. Ready to run again

## TS 6 Release

- [Announcement](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html)
- [Deprecation List](https://github.com/microsoft/TypeScript/issues/54500)
- [Release Plan](https://github.com/microsoft/TypeScript/issues/63085)
- [Issue #63330 (Defaults)](https://github.com/microsoft/TypeScript/issues/63330)

## TS 6 Questions

### Project: [ts-bundler-tsc](./ts-bundler-tsc/)

#### Emitting with Bundler Module Resolution?

With `moduleResolution` set to **bundler** and _tsc_ emitting JS, you have to add **.js** to the import:

```ts
import { hello } from "./my-module.js";
```

If you don't, it won't be resolved at runtime. I assumed omitting would've succeeded given **bundler** mode or at least a compile-time error given none of the following flags are set:

- [noEmit](https://www.typescriptlang.org/tsconfig/#noEmit)
- [allowImportingTsExtensions](https://www.typescriptlang.org/tsconfig/#allowImportingTsExtensions)
- [allowArbitraryExtensions](https://www.typescriptlang.org/tsconfig/#allowArbitraryExtensions)
- [rewriteRelativeImportExtensions](https://www.typescriptlang.org/tsconfig/#rewriteRelativeImportExtensions)

It's emitting JS in **bundler** mode, we aren't using another tool.

_allowImportingTsExtensions_ is only allowed with `noEmit: true`. The same logic could apply to `moduleResolution: bundler` to avoid this type of confusion.

Unless there's a reason you'd still want to _emit_ even in **bundler** mode?

### Project: [ts-node-tsc](./ts-node-tsc/)

#### What are the Correct TSConfig Defaults?

Leaving the _tsconfig_ empty, we assume the following defaults will be utilized:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "nodenext",
    "target": "es2025",
    "lib": ["ES2025"]
  }
}
```

However, if you try setting that in the config, you will get an error saying that **module** must be _nodenext_ if **moduleResolution** is _nodenext_.

This is confusing because the [release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-6-0.html#simple-default-changes) specify:

> module defaults to esnext: Similarly, the new default module is esnext, acknowledging that ESM is now the dominant module format.

What is the default of **moduleResolution** in this case? _bundler_?

### Misc: Compiler Arg to View Full Defaults

The _tsc_ CLI flag [--showConfig](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options) does not include the fully resolved compiler settings at runtime. e.g. the defaults.

Without this, we have limited debugging capabilities unless we dig further into the API or source code. This creates friction after releases when the defaults can change and the documentation may not be completely accurate.

It would be helpful to augment this (or create a new arg) to add the injected settings which would provide a more complete picture. Furthermore, this would lessen the burden on all of the docs staying in sync and move the source of truth closing to the code and tooling.

