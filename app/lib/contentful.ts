import { createClient } from 'contentful';

const client = createClient({
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  space: process.env.CONTENTFUL_SPACE_ID as string,
});

export async function fetchCypherpunks() {
  const entries = await client.getEntries({ content_type: 'cypherpunk' });
  return entries.items;
}

export async function fetchCypherpunkBySlug(slug: string) {
  return await client.getEntries({
    content_type: 'cypherpunk',
    'fields.slug': slug,
  });
}

export async function fetchTools() {
  const entries = await client.getEntries({ content_type: 'tool' });
  entries.items.map(i => {
    console.log(    i.fields
      );

  })
  return entries.items;
}

export async function fetchToolBySlug(slug: string) {
  return await client.getEntries({
    content_type: 'tool',
    'fields.slug': slug,
    limit: 1,
  });
}
