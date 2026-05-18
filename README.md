# Node + TS Play

- This is a Node sandbox for playing around with the latest TypeScript features
- TypeScript version: see [package.json](./package.json#)
- Node version: see [.nvmrc](./.nvmrc)
- This is built for macOS, has not been tested on others

## Setup

1. Install [fnm](https://github.com/Schniz/fnm)
   ```sh
   curl -fsSL https://fnm.vercel.app/install | bash
   ```
1. Install node:
   ```sh
   fnm use
   ```
1. Confirm the current node version matches the [.nvmrc](./.nvmrc):
   ```sh
   node -v
   ```
1. [corepack](https://github.com/nodejs/corepack) is installed with node:
   ```sh
   corepack -v
   ```
1. Install pnpm:
   ```sh
   corepack enable
   ```
1. Install dependencies:
   ```sh
   pnpm install
   ```

## Project Structure

1. Each sub-project is in a directory beginning with `ts-`
   - e.g. **[ts-bundler-tsc](./ts-bundler-tsc/)**
1. Naming convention:
   - `ts-<module_resolution>-<transpiler>`
   - **module-resolution:**
     - The value of the [moduleResolution](https://www.typescriptlang.org/tsconfig/#moduleResolution) compiler field
   - **transpiler:**
     - The tool handling transpilation
     - _tsc_: TypeScript is handling it
     - _node_: Node is running it natively
1. Each sub-project has a matching pnpm start command:
   - e.g. `pnpm start:bundler:tsc`
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

1. Run the start script:
   - `pnpm start:bundler:tsc`
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
- [Pull request](https://github.com/microsoft/TypeScript/issues/54500)

## TS 6 Questions

### Project: "ts-bundler-tsc"

#### tsconfig module

Commenting out the tsconfig **module** field and only leaving `moduleResolution: bundler` is NOT a compiler error. This is not the case with the others (see below).

#### .js import

You have to add **.js** to the import:

```ts
import { hello } from "./my-module.js";
```

Or it won't be resolved at runtime. I assumed omitting would've succeeded given the **bundler** mode or at least an error at compile time given none of the following flags are set:

- `noEmit`
- `rewriteRelativeImportExtensions`
- `allowArbitraryExtensions`
- `allowImportingTsExtensions`

It is being used to emit JS, even in **bundler** mode, so we aren't using an external tool to handle processing the imports.

**allowImportingTsExtensions** is only allowed with `noEmit: false`. I think the same logic could apply to `moduleResolution: bundler` to avoid this type of confusion.

### Project: "ts-node-node"

#### tsconfig module

Commenting out the **module** setting entirely and only leaving `moduleResolution: nodenext` IS A compiler error. We have to make sure it's set to _nodenext_.

See the below for further discussion on this.

### Project: "ts-node-tsc"

#### tsconfig defaults

This tsconfig is empty which should result in the following defaults:

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

What is the default of **moduleResolution** in this case? **bundler**?

### Runtime Compiler Defaults

The **tsc** CLI flag [--showConfig](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options) does not include the fully resolved compiler settings at runtime. e.g. the defaults.

Without this, we have a limited debugging capability unless we dig further into the API or source code which are more time consuming approaches.

It would be helpful to augment this (or create a new arg) to add the injected settings which would provide a more complete picture.
