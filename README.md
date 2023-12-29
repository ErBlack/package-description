# package-description

This package allows you to describe your dependencies in a separate file. This file can be used to check the status of dependencies or find out why such dependencies was installed.

## Install

```bash
npm install package-description
```

## Quick start

This command will create a `package-description.json` file in the current directory. All packages will be in unknown status. You can edit this file manually or use `package-description describe` command.

```bash
npx package-description --init
```

## Description entry

Description of a dependency includes the status, text description, and additional fields for specific statuses. Here is a list of the statuses:

`unknown` - The package is not described.
`actual` - The package is actual and updated. It should have a filled `description` field providing information on what this package is used for.
`outdated` - The package is outdated. It should have a filled `description` field explaining what this package is used for and an `issueLink` pointing to the relevant issue that discusses the necessary update.
`deprecated` - The package should be removed. It should have a filled `description` field explaining why this package is deprecated, an `issueLink` pointing to the issue discussing its removal, and optionally a `replacement` field suggesting a recommended alternative package.

## Default descriptions

If you have a common set of dependencies, you can describe them in a separate file. Descriptions from this file will be used as default values for `init` and `describe` commands.

## Usage
### package-description 

```Usage: package-description package-description [options] [command]

A tool for describing package.json

Options:
  -h, --help      display help for command

Commands:
  init            Generate a description file for a package.json
  lint            Validate a package-description.json file
  describe        Describe a new packages
  help [command]  display help for command
```

### package-description init

```Usage: package-description init [options]

Generate a description file for a package.json

Options:
  -f, --force [force]                               Replace existed file
  -d, --default-descriptions [defaultDescriptions]  Path to the file with default descriptions that will be used to fill initial descriptions and suggested in the "describe" command.
  -h, --help                                        display help for command
```

### package-description lint

```Usage: package-description lint [options]

Check package-description.json file

Options:
  --fix       Fix problems if it possible
  -h, --help  display help for command
```

### package-description describe

```Usage: package-description describe [options]

Step-by-step description of new packages and packages with an unknown status
with prompts.

Options:
  -t, --type <type>  Which packages to describe. new – not described yet,
                     unknown – with status unknown, all – both of them
                     (choices: "new", "unknown", "all", default: "new")
  -h, --help         display help for command
```

