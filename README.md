<div align="center">
  <h1>gendiff</h1>
  <p>console utility for comparing two configuration files and showing their differences</p>
</div>

[![Maintainability](https://api.codeclimate.com/v1/badges/9567aa49ed7a59f9d9f1/maintainability)](https://codeclimate.com/github/alexunnt/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/9567aa49ed7a59f9d9f1/test_coverage)](https://codeclimate.com/github/alexunnt/frontend-project-lvl2/test_coverage)
[![Node CI](https://github.com/alexunnt/frontend-project-lvl2/workflows/Node%20CI/badge.svg)](https://github.com/alexunnt/frontend-project-lvl2/actions)

## Installation

```
$ make install
$ make publish
$ npm link
```
**Note:** To start using the utility first clone the package.

## Usage

```
$ gendiff FILENAME.json FILENAME.json
```
[![asciicast](https://asciinema.org/a/309073.svg)](https://asciinema.org/a/309073)
```
$ gendiff FILENAME.yml FILENAME.yml
```
[![asciicast](https://asciinema.org/a/309074.svg)](https://asciinema.org/a/309074)
```
$ gendiff FILENAME.ini FILENAME.ini
```
[![asciicast](https://asciinema.org/a/309075.svg)](https://asciinema.org/a/309075)

```
$ gendiff --format [type] FILENAME.[extension] FILENAME.[extension]
```
**Note:** ```[type]: complex, plain``` or ```json```; ```[extension]: json, yml``` or ```ini```.

[![asciicast](https://asciinema.org/a/309459.svg)](https://asciinema.org/a/309459)

[![asciicast](https://asciinema.org/a/309673.svg)](https://asciinema.org/a/309673)

## Help

```
$ gendiff -h
```
