# PatternFly React
  
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-green.svg?style=for-the-badge)](https://lernajs.io/)
[![PatternFly npm badge](https://img.shields.io/npm/v/@patternfly/react-core.svg?label=PF%20Core&style=for-the-badge)](https://www.npmjs.com/package/@patternfly/react-core)

This project provides a set of React components for the [PatternFly project](https://patternfly.org).  

**Community:** [PatternFly website](https://www.patternfly.org) | [Slack](https://slack.patternfly.org) | [Medium](https://medium.com/patternfly) | [Mailing list](https://www.redhat.com/mailman/listinfo/patternfly)

### Table of contents
1. [PatternFly React packages](#patternfly-react-packages)
2. [Setup](#Setup)
3. [Contribution guidelines](#Contribution-guidelines)
4. [License](#License) 

Using PatternFly 3? Take a look at the [PatternFly 3 React component information](https://github.com/patternfly/patternfly-react/blob/patternfly-3/README.md).

### PatternFly React packages

| Package link | Description |
| --- | --- |
| **:blue_heart: Core packages** |
| &nbsp;&nbsp;[@patternfly/react-core](./packages/react-core/README.md) | Core set of components |
| &nbsp;&nbsp;[@patternfly/react-table](./packages/react-table/README.md) | Table components | 
| &nbsp;&nbsp;[@patternfly/react-charts](./packages/react-charts/README.md) | Chart components
| &nbsp;&nbsp;[@patternfly/react-icons](./packages/react-icons/README.md) | Icon components |
| &nbsp;&nbsp;[@patternfly/react-styles](./packages/react-styles/README.md) | PatternFly CSS styles |
| &nbsp;&nbsp;[@patternfly/react-tokens](./packages/react-tokens/README.md) | PatternFly CSS variable tokens |
| **:yellow_heart: Extension packages** |
| &nbsp;&nbsp;[@patternfly/react-log-viewer](https://github.com/patternfly/react-log-viewer/blob/main/README.md) | Virtualized log viewer component |
| &nbsp;&nbsp;[@patternfly/react-catalog-view-extension](https://github.com/patternfly/react-catalog-view/blob/main/README.md) | Catalog view extension |
| &nbsp;&nbsp;[@patternfly/react-topology](https://github.com/patternfly/react-topology/blob/main/README.md) | Topology components |
| **:open_file_folder: Supporting packages** |
| &nbsp;&nbsp;[@patternfly/react-docs](./packages/react-docs/README.md) | Gatsby documentation site for components |
| &nbsp;&nbsp;[@patternfly/react-integration](./packages/react-integration/README.md) | Cypress integration tests |
| **:x: Deprecated packages** |
| &nbsp;&nbsp;[@patternfly/react-virtualized-extension](https://github.com/patternfly/react-virtualized-extension/blob/main/README.md) | Table and list row virtualization extension |

### Setup  

Before you begin, check out this [overview of PatternFly](http://patternfly.org/get-started/about) to get familiar with the basic elements of the design system.

#### Install a package manager
Install a package manager before using the PatternFly libraries.

* [Use npm](https://nodejs.org/en/download/package-manager)
* [Use Yarn](https://yarnpkg.com/getting-started/install)


#### Start with PatternFly React seed
If you want to start with your existing project, skip to [Install and configure PatternFly React](#install-and-configure-patternfly-react).

[PatternFly React seed](https://github.com/patternfly/patternfly-react-seed) is an open source build scaffolding utility. It gives developers a jump-start when creating new projects that will use PatternFly.


1. **Fork the project**

  * TypeScript: [Fork and clone the PatternFly React Seed project](https://github.com/patternfly/patternfly-react-seed).
  * JavaScript: [Fork and clone the JavaScript branch of the PatternFly React Seed project](https://github.com/patternfly/patternfly-react-seed/tree/javascript).

    For more information about how to fork and clone a repo, [view GitHub Help](https://help.github.com/articles/fork-a-repo/).

2. **Install the project**

    Follow the steps outlined in the [PatternFly React Seed README](https://github.com/patternfly/patternfly-react-seed#quick-start) to install.

#### Install and configure PatternFly React
* Using npm, run the following command to install:
  ```
  npm install @patternfly/react-core --save
  ```
  
  **OR**

* Using yarn, run the following command to install:
  ```
  yarn add @patternfly/react-core
  ```
  
    Once the library is installed, use the specific setup instructions for that library to access the components it contains.  These can be found in the readme for each [library](#patternfly-react-packages). 

### Contribution guidelines
All React contributors must first be [PatternFly community contributors](https://www.patternfly.org/get-started/contribute/contributing-to-patternfly). If you're already a PatternFly community contributor, check out the [React contribution guidelines](https://github.com/patternfly/patternfly-react/tree/main/CONTRIBUTING.md) to make React contributions.

### License
PatternFly React is licensed under the [MIT License](https://github.com/patternfly/patternfly-react/tree/main/LICENSE).
     
