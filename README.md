# package-description

## Install

```bash
npm install package-description
```

## usage
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
  -f, --force [force]  Replace existed file
  -h, --help           display help for command
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

Describe new packages

Options:
  -t, --type <type>  Which packages to describe. new – not described yet,
                     unknown – with status unknown, all – both of them
                     (choices: "new", "unknown", "all", default: "new")
  -h, --help         display help for command
```

