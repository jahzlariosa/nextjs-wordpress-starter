import React from 'react'
import Blog from './blogList'

function BlogPage() {

  return (
    <div className="max-w-screen-xl w-7/12 px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="text-center my-20">
        <h1 className="text-7xl font-bold">Blog Page</h1>
      </div>
      {/* @ts-ignore */} {/* This is a known bug with TypeScript */}
      <Blog endpoint={process.env.WORDPRESS_REST_API_ENDPOINT}/>
    </div>
  )
}

export default BlogPage