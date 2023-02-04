import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Posts } from "@/typings";

const fetchPostsList = async () => {
  const res = await fetch(`${process.env.WORDPRESS_REST_API_ENDPOINT}/posts/`, {
    next: { revalidate: 60 },
  });
  const postLists: Posts = await res.json();
  return postLists;
};

async function PostLists() {
  const postLists = await fetchPostsList();
  return (
    <div>
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4">
          {postLists.map((post) => {
            return (
              <div
                key={post.id}
                className="bg-white border-gray-300 mb-2 rounded-md col-span-1"
              >
                <Link href={`/posts/${post.slug}`}>
                  <div className="grid grid-cols-1">
                    <Image src={post.featured_img_url} width={640} height={0} alt={post.title.rendered}/>
                    <div className="postBody p-2">
                      <h2
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                        className="text-2xl"
                      ></h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt.rendered,
                        }}
                      ></p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostLists;
