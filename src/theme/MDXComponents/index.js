import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Comments from '@site/src/components/Comments';
import Button from '@site/src/components/Button';
import Timeline from '@site/src/components/Timeline';

export default {
    // Re-use the default mapping
    ...MDXComponents,
    Comments,
    Button,
    Timeline,
};
