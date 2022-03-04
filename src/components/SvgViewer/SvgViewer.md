### Default example

```jsx
import React from 'react';

import { SvgViewer } from '@texttree/svg-viewer-poc';
const marks = {
  mapid112: 'Египет',
  mapid96: 'Исход и завоевание Ханаана',
  mapid94: 'Средиземное Море',
};
<SvgViewer
  link={'https://git.door43.org/BSA/ru_biblemap/raw/branch/master/map/exodus.svg'}
  marks={marks}
/>;
```
