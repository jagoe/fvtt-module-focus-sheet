![Release](https://img.shields.io/github/v/release/jagoe/fvtt-module-focus-sheet?sort=semver)
![Supported Foundry Version](https://img.shields.io/badge/Foundry-v9-informational)
![Supported Foundry Version](https://img.shields.io/badge/Foundry-v10-informational)
![Latest Release Download Count](https://img.shields.io/github/downloads/jagoe/fvtt-module-focus-sheet/latest/module.zip)
![Forge Installs](https://img.shields.io/badge/dynamic/json?url=https:%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ffocus-sheet&query=package.installs&colorB=4aa94a&label=Forge%20Installs&suffix=%25)

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

Install using the following [manifest URL](https://github.com/jagoe/fvtt-module-focus-sheet/releases/latest/download/module.json).

Then, as GM, enable the `Focus Sheet` module in the `Manage Modules` settings in the Game Settings tab.

## Configuration

The module can be configured using the `Module Settings`, providing the following options:

### Automatically Open Sheets

By default, the current combatant's sheet will only be brought to the top/focused if has already been opened.\
Enabling this setting also opens the sheet if it has not been opened yet, but only if the player has at least Observer
permissions. Optionally, automatically opened sheets will be opened popped-out.

#### Open At Location

Here you can specify where to open the sheet.\
If opened without PopOut!, it will be opened relative to the top-left corner of your Foundry VTT viewport.\
If opened using PopOut!, it will be opened relative to the top-left corner of the main window.

_Caveat:_ Some browsers do not support moving windows across screens.

### Automatically Close Sheets

Enabling this setting will close the previous sheet once its turn has ended, freeing up space. When combat ends, the
currently opened sheet will be closed as well.\
This functionality is indepent of the auto-open feature.

### Ignore PC Sheets

Enabling this setting will prevent PC (player character) sheets from being affected by any other of the module' features.\
This is being configured by a comma-separated list of sheet types that each represent a sheet type you want the module to ignore.

For the following systems PC sheet types will be recognized automatically:

* D&D 5e
* Pathfinder 2e

Feel free to request more or create a PR to augment [the list](src/scripts/System/getSystemPcActorTypes.ts).

The setting can be used to ignore any other type of sheet as well, such as NPC sheets, vehicle sheets, PoI sheets, etc.\
To retrieve the sheet type of the current combatant, you can enter `game.combat.combatant.actor.data.type` in the browser console.

## License

This Foundry VTT module is licensed under a [GNU General Public License v3.0 License](./LICENSE).
