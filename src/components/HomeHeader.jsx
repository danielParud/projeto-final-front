import React from "react";

export default function HomeHeader(props) {
  return (
    <React.Fragment>
      <div className="text-gray-900 pt-12 pr-0 pb-14 pl-0 bg-white">
        <div
          className="w-full pt-4 pr-5 pb-6 pl-5 mt-0 mr-auto mb-0 ml-auto space-y-5 sm:py-8 md:py-12 sm:space-y-8 md:space-y-16
      max-w-7xl"
        >
          <div className="flex flex-col items-center sm:px-5 md:flex-row">
            <div className="flex flex-col items-start justify-center w-full h-full pt-6 pr-0 pb-6 pl-0 mb-6 md:mb-0 md:w-1/2">
              <div
                className="flex flex-col items-start justify-center h-full space-y-3 transform md:pr-10 lg:pr-16
            md:space-y-5"
              >
                <div className="bg-green-500 flex items-center leading-none rounded-full text-gray-50 py-1 px-4 uppercase">
                  <p className="inline text-xs font-medium">Try out now</p>
                </div>
                <h1 className="text-4xl font-bold leading-none lg:text-5xl xl:text-6xl">
                  {props.primaryText}
                </h1>
                <div className="pt-2 pr-0 pb-0 pl-0">
                  <p className="font-medium inline text-3xl text-gray-400">
                    {props.secondaryText}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="block">
                <img
                  src="https://www.skylinesoftware.com/wp-content/webp-express/webp-images/uploads/2020/03/software-project-post-2_optimized.jpg.webp"
                  className="object-cover rounded-lg max-h-64 sm:max-h-96 btn- w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
