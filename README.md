# Easy2giveTemplate1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.8.

## Secret management

Angular-CLI does not support `process.env`. To securly use API keys the app is using `extra.json` file, which is currently in its "template" state (untracked with `git update-index --skip-worktree`);
When developing locally, manually update its properties with secrets.
When deploying, use the CI to manipulate its properties (curerntly: GitHub secrets and GitHub Actions to (set JSON fields)[https://github.com/jossef/action-set-json-field]);

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `build-for-dev` to build the project with base-href feature (`/Wedding__landing-page-pwa/`) using `environment.dev.ts`.
Run `build-deploy-as-root` to build the project without base-href using `environment.prod.ts`. 