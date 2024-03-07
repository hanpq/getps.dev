import {
    mdiEyeRefreshOutline,
    mdiAccountGroup,
    mdiAndroid,
    mdiAppleIos,
    mdiArchiveOutline,
    mdiBash,
    mdiBookSearchOutline,
    mdiCakeVariant,
    mdiCheckAll,
    mdiCheckboxMarked,
    mdiCollage,
    mdiContentCopy,
    mdiDevices,
    mdiExpansionCard,
    mdiFaceMan,
    mdiFaceManOutline,
    mdiFile,
    mdiFileSearch,
    mdiFolder,
    mdiForum,
    mdiHeart,
    mdiImage,
    mdiImageAlbum,
    mdiImageMultipleOutline,
    mdiImageSearch,
    mdiKeyboardSettingsOutline,
    mdiMagnify,
    mdiMap,
    mdiMaterialDesign,
    mdiMatrix,
    mdiMerge,
    mdiMonitor,
    mdiMotionPlayOutline,
    mdiPalette,
    mdiPanVertical,
    mdiPartyPopper,
    mdiPencil,
    mdiRaw,
    mdiRotate360,
    mdiSecurity,
    mdiServer,
    mdiShareAll,
    mdiShareCircle,
    mdiStar,
    mdiTag,
    mdiText,
    mdiThemeLightDark,
    mdiTrashCanOutline,
    mdiVectorCombine,
    mdiVideo,
    mdiWeb,
    mdiPackageVariantClosed,
} from '@mdi/js';
import Layout from '@theme/Layout';
import React from 'react';
import Timeline, { DateType, Item } from '../components/timeline';

const items: Item[] = [
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSImmich launched',
        title: 'PSImmich',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSimmich',
        date: new Date(2023, 11, 15),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSMQTT launched',
        title: 'PSMQTT',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSMQTT',
        date: new Date(2023, 11, 15),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSLogs launched',
        title: 'PSLogs',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSLogs',
        date: new Date(2023, 8, 24),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSDev launched',
        title: 'PSDev',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSDev',
        date: new Date(2022, 12, 21),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSScriptInfo launched',
        title: 'PSScriptInfo',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSScriptInfo',
        date: new Date(2022, 11, 14),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSDaikin launched',
        title: 'PSDaikin',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSDaikin',
        date: new Date(2022, 11, 13),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSDataset launched',
        title: 'PSDataset',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSDataset',
        date: new Date(2022, 11, 13),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSSort launched',
        title: 'PSSort',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSSort',
        date: new Date(2022, 11, 13),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSPortainer launched',
        title: 'PSPortainer',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSPortainer',
        date: new Date(2022, 10, 25),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPackageVariantClosed,
        description: 'Powershell module PSQueue launched',
        title: 'PSQueue',
        linklabel: 'Github',
        link: 'https://github.com/hanpq/PSQueue',
        date: new Date(2021, 1, 22),
        dateType: DateType.RELEASE,
    },
    {
        icon: mdiPartyPopper,
        title: 'Website getps.dev launched',
        description: 'Website getps.dev launched',
        linklabel: 'getps.dev',
        link: 'https://getps.dev',
        date: new Date(2020, 11, 14),
        dateType: DateType.DATE,
    },
];

export default function MilestonePage(): JSX.Element {
    return (
        <Layout title="Milestones" description="History of Immich">
            <section className="my-8">
                <h1 className="md:text-6xl text-center mb-10 text-immich-primary dark:text-immich-dark-primary px-2">
                    Milestones
                </h1>
                <p className="text-center text-xl px-2">
                    A list of project achievements and milestones<br />

                </p>
                <div className="flex justify-around mt-8 w-full max-w-full">
                    <Timeline items={items} />
                </div>
            </section>
        </Layout>
    );
}
