import Link from "next/link";
import React from "react";

type PageProps = {
  params: {
    searchTerm: string;
  };
};

type SearchResults = [
    {
        id: number;
        title: string;
        slug: string;
        author: string;
        excerpt: { rendered: string};
        content: { rendered: string};
        date: string;
        type: string;
        featured_img_url: string;
        url: string;
      }
];


const search = async (searchTerm: string) => {
  const res = await fetch(`${process.env.WORDPRESS_REST_API_ENDPOINT}/search?search=${searchTerm}`);
  const data: SearchResults = await res.json();
  
  console.log(data);
  return data;
};



async function SearchResults({ params: { searchTerm } }: PageProps) {
    const searchResults = await search(searchTerm);

    return (
      <>
        <div className="container mx-auto my-20">
        <p className="text-gray-500 text-lg mb-5">You searched for: {searchTerm}</p>
        <ul>
        {searchResults.map((results)=>{
            console.log(searchResults)
          return (
            <>
              <li key={results.id} className="bg-white p-2 mb-2 border border-zinc-800 rounded-md">
                <Link href={`/${results.type}s/${stripUrl({ url: results.url })}`} className="font-bold">
                    <span dangerouslySetInnerHTML={{__html:results.title}} ></span>
                </Link>
              </li>
            </>
          );
        })}
        </ul>
        </div>
      </>
    );
  }

  function stripUrl({ url }: { url: string; }): string {
    return url.replace(`${process.env.SEARCH_DOMAIN}`, '').replace(/\//g, '');
  }

export default SearchResults;
