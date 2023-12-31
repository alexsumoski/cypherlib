import { Entry, createClient } from 'contentful';
import { GetStaticPaths, GetStaticProps } from 'next';

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