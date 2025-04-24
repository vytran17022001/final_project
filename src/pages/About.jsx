import React from "react";

const About = () => {
  return (
    <>
      <div className="w-full">
        {/* Banner */}
        <div className="relative h-64 md:h-96 ">
          <img
            src="https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-3.jpg"
            alt="About Us Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-12 text-gray-800 space-y-12">
          {/* Mission Section */}
          <section className="text-center space-y-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#f26b38]">
              Our Mission
            </h2>
            <p className="text-base md:text-lg leading-relaxed">
              We deliver a modern, premium, and approachable cinematic
              experience. Galaxy aims to build a comfortable and high-quality
              cinema system with dedicated customer service.
            </p>
          </section>

          {/* Development Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#f26b38]">
                Our Journey
              </h3>
              <p className="leading-relaxed">
                Cinema is one of Vietnam’s leading local cinema chains,
                expanding across the country. Since 2005, cinema has constantly
                innovated technology and services to provide the best experience
                for moviegoers.
              </p>
            </div>
            <div>
              <img
                src="https://vending-cdn.kootoro.com/torov-cms/upload/image/1669199303922-quảng%20cáo%20rạp%20chiếu%20phim%20bằng%20poster.jpg"
                alt="Development"
                className="rounded-lg shadow-md w-full object-cover"
              />
            </div>
          </section>

          {/* Vision and Core Values Section */}
          <section className="bg-yellow-50 rounded-lg p-8 space-y-8 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-600">
                  Vision
                </h3>
                <p>
                  To become the No. 1 local cinema brand in Vietnam with
                  outstanding service quality and customer experience.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-600">
                  Core Values
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Customer-centric approach</li>
                  <li>Continuous innovation</li>
                  <li>Top-notch quality</li>
                  <li>Professionalism and dedication</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
