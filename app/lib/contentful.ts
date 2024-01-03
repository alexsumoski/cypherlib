import { createClient } from 'contentful';

const client = createClient({
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
    space: process.env.CONTENTFUL_SPACE_ID as string,
});

export async function getCypherpunks() {


    const entries = await client.getEntries({ content_type: 'cypherpunk' });
    return entries.items;
}

export const getCypherpunk = async (slug: any) => {
    const response = await client.getEntries({
      content_type: 'cypherpunk',
      'fields.slug': slug,
    });
  
    return response.items[0];
  };