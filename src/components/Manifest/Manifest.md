### Default example

```jsx
import React from 'react';

import { Manifest } from '@texttree/svg-viewer-poc';
const link = 'https://git.door43.org/BSA/ru_biblemap/raw/branch/master/manifest.yaml';
const [project, setProject] = React.useState();
<Manifest setProject={setProject} link={link} />;
```
