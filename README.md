# A simple commands for generating React Components

## Installation

```shall
npm install -g react-clc
```

```shall
yarn global add react-clc
```

## Setup configuration file for project

```shall
rc init
```

P.S. run `rc --help` for more information about options

## Examples

This one creates **Home** component in source directory, with its style

```shall
rc component home
```

This one creates **Home** directory, also component and style files within

```shall
rc c home/home
```

P.S. **c** and **component** are the same commands

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
