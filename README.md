# JS Play

JS Playground

## Getting Started

1. Install [fnm](https://github.com/Schniz/fnm)
1. **fnm** should switch to the correct node version from the **.nvmrc**
   - Confirm with `node -v`
   - Expected: `v20.16.0`
1. Check if you have corepack:
   ```zsh
   corepack -v
   ```
1. If not, install it:
   ```zsh
   brew install corepack
   ```
1. Enable pnpm:
   ```zsh
   corepack enable pnpm
   ```
1. Install pnpm:
   ```zsh
   corepack use pnpm@9
   ```
1. Install dependencies:
   ```zsh
   pnpm install
   ```
1. Install Husky for pre-commit hooks
   ```zsh
   pnpm prepare
   ```
