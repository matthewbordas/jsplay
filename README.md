# Node + TS Play

- This is a Node sandbox for playing around with the latest TypeScript features
- TypeScript version: see [package.json](./package.json#)
- Node version: see [.nvmrc](./.nvmrc)

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
     - The tsc [compiler option](https://www.typescriptlang.org/tsconfig/#moduleResolution) used
   - **transpiler:**
     - The tool handling transpilation
     - tsc: TypeScript is handling it
     - node: Node is running it natively
1. Each sub-project has a matching pnpm start command:
   - e.g. `pnpm start:bundler:tsc`
1. Each directory typically has one of each:
   - `.gitignore` (optional)
     - If it has tsc build artifacts
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
1. Check the console for output
   ```sh
   x = 1
   hello
   ```
1. Go to the sub-project:
   - `cd ts-bundler-tsc`
1. Review the source files, configuration, and any build artifacts
1. Make changes as desired
1. After making changes:
   - `pnpm fix` (format/lint)
   - `pnpm clean` (remove .js artifacts)
1. Ready to run again
