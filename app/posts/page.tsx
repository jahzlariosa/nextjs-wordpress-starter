import React from "react";
import PostLists from "./PostLists";

function PostsPage() {
  return (
    <div className="max-w-screen-xl w-7/12 px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="text-center my-20">
        <h1 className="text-7xl font-bold">Post Page</h1>
      </div>
      {/* @ts-ignore */} {/* This is a known bug with TypeScript */}
      <PostLists />
    </div>
  );
}

export default PostsPage;
