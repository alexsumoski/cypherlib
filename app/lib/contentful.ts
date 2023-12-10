import { createClient } from 'contentful';

export async function getCypherpunks() {
    const client = createClient({
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
        space: process.env.CONTENTFUL_SPACE_ID as string,
    });

    const entries = await client.getEntries({ content_type: 'cypherpunk' });
    return entries.items;
}
