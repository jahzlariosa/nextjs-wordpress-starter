import React from "react";

function Footer() {
  return (
    <>
      <footer aria-label="Site Footer" className="bg-white">
        <div className="container py-16 mx-auto ">
          <div className="lg:flex lg:items-start lg:gap-8">

            <div className="grid grid-cols-2 gap-8 mt-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
                <div className="col-span-2">
                    <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Get the latest news!
                    </h2>

                    <p className="mt-4 text-gray-500">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                        Esse non cupiditate quae nam molestias.
                    </p>
                    </div>
                </div>

                <div className="col-span-2 lg:col-span-3 lg:flex lg:items-end">
                    <form className="w-full">
                    <label className="sr-only"> Email </label>

                    <div className="p-2 border border-gray-100 focus-within:ring sm:flex sm:items-center sm:gap-4">
                        <input
                        type="email"
                        id="UserEmail"
                        placeholder="dev@jahz.xyz"
                        className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm p-3 border border-gray-100 focus-within:ring"
                        />

                        <button className="w-full px-6 py-3 mt-1 text-sm font-bold tracking-wide text-white rounded-md uppercase transition-none bg-indigo-500 hover:bg-indigo-600 sm:mt-0 sm:w-auto sm:flex-shrink-0">
                        Sign Up
                        </button>
                    </div>
                    </form>
                </div>
              </div>
          </div>

          <div className="pt-8 mt-8 border-t border-gray-100">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <p className="text-xs text-left text-gray-500">
                &copy; 2023. Company Name. All rights reserved.
              </p>

              <nav aria-label="Footer Navigation - Support">
                <ul className="flex flex-wrap justify-start gap-4 text-xs lg:justify-end">
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-500 transition hover:opacity-75"
                    >
                      Cookies
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
