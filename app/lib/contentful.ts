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
    limit: 1,
  });
}

export async function fetchTools() {
  const entries = await client.getEntries({ content_type: 'tool' });
  return entries.items;
}

export async function fetchToolBySlug(slug: string) {
  return await client.getEntries({
    content_type: 'tool',
    'fields.slug': slug,
    limit: 1,
  });
}

export async function fetchGuides() {
  const entries = await client.getEntries({ content_type: 'guide' });
  return entries.items;
}

export async function fetchGuideBySlug(slug: string) {
  return await client.getEntries({
    content_type: 'guide',
    'fields.slug': slug,
    limit: 1,
  });
}
