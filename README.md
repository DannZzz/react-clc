# A simple commands for generating React Components

## Installation

```shell
npm install -g react-clc
```

```shell
yarn global add react-clc
```

## Setup configuration file for project

```shell
rc init
```

P.S. run `rc --help` for more information about options

## Examples

## $ component | c

This one creates **Home** component in source directory, with its style

```shell
rc component home
```

This one creates **Home** directory, also component and style files within

```shell
rc c home/home
```

## $ directory-component | dc

**directory-component** command creates directory with specified name, then component and style within

This one will create **Home** directory in source directory, component and style within

```shell
rc directory-component home
```

## component-config.json file

```json
{
  "style": "css",
  "component": "function",
  "fileExtension": "jsx",
  "sourceDir": "src"
}
```

## Configuration

<details>
    <summary>style</summary>
    Types

    - "css"
    - "scss"
    - "less"
    - "sass"
    - false (for no style file)

</details>

<details>
    <summary>component</summary>
    Types

    - "function"
    - "class"

</details>

<details>
    <summary>fileExtension</summary>
    Types

    - "js"
    - "jsx"
    - "tsx"

</details>

<details>
    <summary>sourceDir</summary>
    Folder Path (string)

    - src
    - src/components

</details>
