import React from 'react';
import Giscus from '@giscus/react';

export default function Comments() {
    return (
        <Giscus
            id="comments"
            repo="hanpq/getps.dev"
            repoId="MDEwOlJlcG9zaXRvcnkzMTI4OTM0OTI="
            category="Comments"
            categoryId="DIC_kwDOEqZgNM4CRzAp"
            mapping="pathname"
            strict="1"
            term="Comments"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="dark"
            lang="en"
            loading="lazy"
        />
    );
}
