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

## $ native | m

**native** command creates React Native component with or without style

This one creates **Home** component in source directory, with its style

```shell
rc native home
```

# You can use **-dc** option with **native** and **component** commands for creating components in own directories!

## Example

```shell
rc native home -dc
```

## component-config.json file

```json
{
  "style": "css",
  "component": "function",
  "fileExtension": "jsx",
  "sourceDir": "src",
  "directoryComponent": "no",
  "nativeStyle": "file"
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
    - "none" (for no style file)

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
    Directory Path (string)

    - src
    - src/components

</details>

<details>
    <summary>directoryComponent</summary>
    Wheter the components must have their own directories or not

    Types

    - "yes"
    - "no"

</details>

<details>
    <summary>nativeStyle</summary>

    Types

    - "file"
    - "in" (styles at the end of the component file)
    - "none"

</details>
