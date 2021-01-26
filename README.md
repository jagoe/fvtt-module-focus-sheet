![](https://img.shields.io/badge/Foundry-v0.7.9-informational)
<!--- Downloads @ Latest Badge -->
![Latest Release Download Count](https://img.shields.io/github/downloads/jagoe/fvtt-module-focus-sheet/latest/module.zip)

<!--- Forge Bazaar Install % Badge -->
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2F<focus-sheet>&colorB=4aa94a)

## Changelog

A changelog can bout found [here](./CHANGELOG.md).

# Description

A Foundry VTT module that automatically opens and focuses the current combatant's actor/token sheet.\
It works well with [PopOut!](https://github.com/League-of-Foundry-Developers/fvtt-module-popout) to declutter the screen, while still enabling a GM to quickly view and access each combatant's sheet.

Currently, there is no public API for the module. If there is a need for one, feel free to open an issue or create a PR.

## Installation

Install using the following URL: <https://raw.githubusercontent.com/jagoe/fvtt-module-focus-sheet/master/module.json>.

Then, as GM, enable the `Focus Sheet` module in the `Manage Modules` settings in the Game Settings tab.

## Configuration

The module can be configured using the `Module Settings`, providing the following options:

### (TBD) Automatically Open Sheets

By default, the current combatant's sheet will only be brought to the top/focused if has already been opened.\
Enabling this setting also opens the sheet if it has not been opened yet.

#### (TBD) Open Using PopOut!

If this setting is enabled, the sheet will automatically popped out into it's own window when opened.\
This setting is disabled if the PopOut! module is not active.

#### (TBD) Open At Location

Here you can specify where to open the sheet.\
If opened using PopOut!, it will be opened relative to the top-left corner of your screen.\
If opened without PopOut!, it will be opened relative to the top-left corner of your Foundry VTT viewport.

### (TBD) Minimize Last Combatant Sheet

Enabling this will minimize the last sheet once a turn has ended, freeing up space.
This setting is disabled if `Open Using PopOut!` is enabled.

## License

This Foundry VTT module is licensed under a [GNU General Public License v3.0 License](./LICENSE).
