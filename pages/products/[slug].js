import { createClient } from 'contentful';
import Image from 'next/image';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'product',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'product',
    'fields.slug': params.slug,
  });

  return {
    props: { product: items[0] },
    revalidate: 1,
  };
}

export default function RecipeDetails({ product }) {
  if (!product) return <div>Loading</div>;

  const { imageProductMobile, title, description } = product.fields;
  return (
    <div>
      {title}
      <div>
        <Image
          src={`http:${imageProductMobile.fields.file.url}`}
          width={imageProductMobile.fields.file.details.image.width}
          height={imageProductMobile.fields.file.details.image.height}
          quality={100}
        />
      </div>
      {description}
    </div>
  );
}
