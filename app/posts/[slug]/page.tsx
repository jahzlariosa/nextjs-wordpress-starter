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
    <div className="container mx-auto px-5 xl:w-7/12">
        <div className="postHeadings py-20">
            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} className="text-5xl"></h2>
            <div className="postMeta mt-3">
                <div className="flex flex-wrap">
                    <div>Date Posted: {tFormat(post.date)}</div>
                </div>
            </div>
        </div>
        <div className="postBody mb-20">
            {post && (
                <div>
                {post.featured_img_url && (
                    <div className="postFeaturedImage mb-10">
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
        </div>
    </div>
    </>
  );
}

function tFormat(timestamp:any) {
    let date = new Date(timestamp);
    let options:any = {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return date.toLocaleString('en-US', options);
}
  

export default singlePostPage;
