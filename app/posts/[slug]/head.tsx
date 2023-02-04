import React from 'react'
import { Posts } from '@/typings';

type PageProps = {
    params: {
      slug: string;
    };
  };
  

  const fetchPostSingleHead = async (slug: string) => {
    //Fetch single post content with slug
    const res = await fetch(
      `${process.env.WORDPRESS_REST_API_ENDPOINT}/posts/?slug=${slug}`,
      { next: { revalidate: 60 } }
    );
    //res status Checker
    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      throw new Error(res.statusText);
    }
    const posts:Posts = await res.json();

    //returns posts and finds the slug
    return posts.find(post => post.slug === slug);

  };

async function Head({ params: { slug } }: PageProps) {
const meta = await fetchPostSingleHead(slug);
  return (
    <>
    {meta ? (
    <>
    <title>{meta.title.rendered}</title>
    <link rel="icon" href="/vercel.svg" />
    <meta name="description" content={meta.excerpt.rendered} />
    <meta name="keywords" content={meta.tags} />
    <meta property="og:title" content={meta.title.rendered} />
    <meta property="og:description" content={meta.excerpt.rendered} />
    <meta property="og:image" content={meta.featured_img_url} />
    <meta property="og:url" content={meta.slug} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={meta.title.rendered} />
    <meta name="twitter:description" content={meta.excerpt.rendered} />
    <meta name="twitter:image" content={meta.featured_img_url} />
    <link rel="canonical" href={meta.slug} />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="Jahz"/>
    <meta name="publisher" content="Jahz Web Solutions" />
    </>
    ) : <title>Loading...</title>}
    </>
    )
    }

export default Head