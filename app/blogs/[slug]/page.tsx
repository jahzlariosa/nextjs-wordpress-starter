import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Posts } from "@/typings";

type PageProps = {
  params: {
    slug: string;
  };
};

const fetchPostSingle = async (slug: string) => {
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
  const posts: Posts = await res.json();
  //returns posts and finds the slug
  return posts.find((posts) => posts.slug === slug);
};

async function singlePostPage({ params: { slug } }: PageProps) {
  const post = await fetchPostSingle(slug);
  if (!post) return notFound();
  return (
    <>
    <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="text-7xl text-center mb-20"></h2>
      {post && (
        <div>
          {post.featured_img_url && (
            <div className="postFeaturedImage mb-20">
              <Image
                src={post.featured_img_url}
                alt={post.title.rendered}
                width={500}
                height={500}
                className="w-full"
              />
            </div>
          )}
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }}></p>
        </div>
      )}
    </>
  );
}

export default singlePostPage;
