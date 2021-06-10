import { createClient } from 'contentful';
import Link from 'next/link';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({ content_type: 'product' });

  return {
    props: {
      products: res.items,
    },
  };
}

export default function Recipes({ products }) {
  const { title, slug } = products[0].fields;
  return (
    <div className='recipe-list'>
      Recipe List
      <div>{title}</div>
      <Link href={'/products/' + slug}>
        <a>Look at this</a>
      </Link>
    </div>
  );
}
