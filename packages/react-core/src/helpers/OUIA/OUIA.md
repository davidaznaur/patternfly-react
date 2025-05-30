---
id: Open UI Automation
section: developer-resources
---
import { Fragment } from 'react';

## About Open UI Automation

Open UI Automation (OUIA) is a specification of certain key guidelines to follow when creating a new
web framework or application. The goal is to ease the burden of creating and maintaining automated
testing environments. OUIA standardizes some HTML attributes and web page
behavior. It helps to create trivial and unambiguous locators of the elements in the DOM for
various automated test suites.

### Why not use `id` or `ARIA`?

`ARIA` is designed as an accessibility specification, and it doesn't account for aspects that are crucial
for automation such as a component type. The `id` attribute might be reserved by some front-end code, and
there might be restrictions on changing it. Having a separate id attribute makes it application and
framework independent. Developers and testers have a contract that these attributes are designed for
UI automation.

### Specification parts

The following blocks exist in the specification:

* `OUIA:Component` - components and component frameworks
* `OUIA:Page` - page identification
* `OUIA:PageSafe` - interaction safety

You can find the complete description on the [OUIA website](https://ouia.readthedocs.io).

### Usage

PatternFly generates a `data-ouia-component-type` attribute for selected components automatically
based on the name. For example, the `data-ouia-component-type` attribute for the
[button component](/components/button) is `PF6/Button`. The id of the `data-ouia-component-id`
attribute is random by default. To specify the concrete id, add an `ouiaId` prop to the
component.

### Example

```js
import { Fragment } from 'react';
import { Button } from '@patternfly/react-core';

<Fragment>
  <Button>Button</Button>
  <br />
  <br />
  <Button ouiaId="static_id">Button with ouiaId</Button>
</Fragment>
```

## OUIA-compliant PatternFly 5 components

### react-core package

* [Alert](/components/alert)
* [Breadcrumb](/components/breadcrumb)
* [Button](/components/button)
* [Card](/components/card)
* [Checkbox](/components/forms/checkbox)
* [Chip](/components/chip)
* [Dropdown](/components/menus/dropdown)
* [DropdownItem](/components/menus/dropdown)
* [FormSelect](/components/forms/form-select)
* [Menu](/components/menus/menu)
* [Modal](/components/modal)
* [Navigation](/components/navigation)
* [NavExpandable](/components/navigation)
* [NavItem](/components/navigation)
* [Pagination](/components/pagination)
* [Radio](/components/forms/radio)
* [Select](/components/menus/select)
* [Switch](/components/switch)
* [TabContent](/components/tabs)
* [Tabs](/components/tabs)
* [Text](/components/text)
* [TextInput](/components/forms/text-input)
* [Title](/components/title)
* [Toolbar](/components/toolbar)

### react-table package

* [Table](/components/table)
* [Tr](/components/table)
