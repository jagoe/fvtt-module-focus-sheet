![Supported Foundry Version](https://img.shields.io/badge/Foundry-v0.7.9-informational)
![Release](https://img.shields.io/github/v/release/jagoe/fvtt-module-focus-sheet?sort=semver)
![Forge Installs](https://img.shields.io/badge/dynamic/json?url=https:%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ffocus-sheet&query=package.installs&colorB=4aa94a&label=Forge%20Installs)

![Pipeline Status](https://github.com/jagoe/fvtt-module-focus-sheet/workflows/Module%20CI/CD/badge.svg)
[![codecov](https://codecov.io/gh/jagoe/fvtt-module-focus-sheet/branch/main/graph/badge.svg?token=SCJTRYKL84)](https://codecov.io/gh/jagoe/fvtt-module-focus-sheet)

![License](https://img.shields.io/github/license/jagoe/fvtt-module-focus-sheet)

## Changelog

A changelog can bout found [here](./CHANGELOG.md).

# Description

A Foundry VTT module that automatically opens and focuses the current combatant's actor/token sheet.\
It works well with [PopOut!](https://github.com/League-of-Foundry-Developers/fvtt-module-popout) to declutter the screen, while still enabling a GM to quickly view and access each combatant's sheet.

Currently, there is no public API for the module. If there is a need for one, feel free to open an issue or create a PR.

## Installation

Install using the following URL: <https://github.com/jagoe/fvtt-module-focus-sheet/releases/latest/download/module.json>.

Then, as GM, enable the `Focus Sheet` module in the `Manage Modules` settings in the Game Settings tab.

## Configuration

The module can be configured using the `Module Settings`, providing the following options:

### Automatically Open Sheets

By default, the current combatant's sheet will only be brought to the top/focused if has already been opened.\
Enabling this setting also opens the sheet if it has not been opened yet, but only if the player has at least Observer
permissions. Optionally, automatically opened sheets will be opened popped-out.

#### (TBD) Open At Location

Here you can specify where to open the sheet.\
If opened using PopOut!, it will be opened relative to the top-left corner of your screen.\
If opened without PopOut!, it will be opened relative to the top-left corner of your Foundry VTT viewport.

### (TBD) Minimize and Restore Sheets on Turn End/Start

Enabling these settings will minimize the last sheet once a turn has ended, freeing up space and restore a minimized
sheet on turn start, respectively.

## License

This Foundry VTT module is licensed under a [GNU General Public License v3.0 License](./LICENSE).
