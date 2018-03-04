# streitpatience

Implementation of two-player game "Streitpatience" (also known as Russian Bank)

## Shared redux logic

API and UI share the same redux logic to modify state.

Setup thoughts:

* One code base, no copying around
* Paths resolve correctly in local code editor
* Docker does not properly support symlinks in containers
* React does not allow imports from a parent directory of the `src` folder (express does though)

Solution:

* Redux files live in `ui/src/redux`
* Those are symlinked locally to `redux` folder, which API references
* Original `ui/src/redux` folder is mounted as `/redux` volume into API container to keep paths working
* `api/.babelrc` and `api/node_modules` (for plugin dependencies) are mounted into `/redux` volume to keep babel working
