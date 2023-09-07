// import React, { useEffect, useState } from "react";
// import Grid from "@mui/material/Grid";
// // import Carousel from "react-material-ui-carousel";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
// import Footer from "./Footer";
// import { Link } from "react-router-dom";
// import Loading from "./Loading";
// import axios from "axios";
// import { MuseumItem, BrandItem } from "./Hottopics";
// import Box from "@mui/material/Box";
// import Header from "./Header";
// import Carousel from "./Carousel";

// export default function HomePage(props) {
//   var [mainBlog, setMainBlog] = useState([]);
//   var [secondaryBlog, setSecondaryBlog] = useState([]);
//   var [consolebrands, setConsoleBrands] = useState(null);
//   var [mobilebrands, setMobileBrands] = useState(null);
//   var [pcbrands, setPCBrands] = useState(null);
//   var [museums, setMuseums] = useState(null);

//   useEffect(() => {
//     var config = {
//       method: "get",
//       url: process.env.REACT_APP_API_BASE_URL + "/mainBlog",
//     };

//     axios(config).then(function (response) {
//       if (response.status === 200) {
//         setMainBlog(response.data);
//       } else {
//         setMainBlog([]);
//       }
//     });

//     var config = {
//       method: "get",
//       url: process.env.REACT_APP_API_BASE_URL + "/sideBlog",
//     };

//     axios(config).then(function (response) {
//       if (response.status === 200) {
//         setSecondaryBlog(response.data);
//       } else setSecondaryBlog(null);
//     });

//     var config = {
//       method: "get",
//       url: process.env.REACT_APP_API_BASE_URL + "/allbrands",
//     };

//     axios(config).then(function (response) {
//       if (response.status === 200) {
//         console.log(response.data);
//         setConsoleBrands(
//           response.data.Console.length > 5
//             ? response.data.Console.slice(0, 5)
//             : response.data.Console
//         );
//         setMobileBrands(response.data.Mobile.slice(0, 5));
//         setPCBrands(response.data.PC.slice(0, 5));
//       }
//     });

//     var config = {
//       method: "get",
//       url: process.env.REACT_APP_API_BASE_URL + "/museums",
//     };

//     axios(config).then(function (response) {
//       if (response.status === 200) {
//         setMuseums(response.data);
//       }
//     });
//   }, []);

//   if (
//     consolebrands === null ||
//     museums === null ||
//     mainBlog === null ||
//     secondaryBlog === null
//   ) {
//     return <Loading />;
//   }

//   const brandsArray = {};

//   brandsArray["Consoles"] = (
//     <div className="shadow-xl border-2 align-middle dark:text-white dark:bg-gray-800 h-auto rounded-lg m-2">
//       <Box sx={{ display: { xs: "none", md: "flex" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1} md={1} sm={1}></Grid>
//           {consolebrands.map((brand, index) => (
//             <Grid item xs={4} sm={4} md={2} key={index}>
//               <BrandItem height="100" brand={brand} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//       <Box sx={{ display: { xs: "flex", md: "none" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1.5} md={1} sm={1.5}></Grid>
//           {consolebrands.slice(0, 2).map((brand, index) => (
//             <Grid item xs={4.5} sm={4.5} md={2} key={index}>
//               <BrandItem height="100" brand={brand} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </div>
//   );
//   brandsArray["Mobiles"] = (
//     <div className="shadow-xl border-2 dark:text-white dark:bg-gray-800 py-1 h-auto rounded-lg m-2 items-center">
//       <Box sx={{ display: { xs: "none", md: "flex" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1} md={1} sm={1}></Grid>
//           {mobilebrands.map((brand, index) => (
//             <Grid item xs={4} sm={4} md={2} key={index}>
//               <BrandItem height="100" brand={brand} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//       <Box sx={{ display: { xs: "flex", md: "none" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1.5} md={1} sm={1.5}></Grid>
//           {mobilebrands.slice(0, 2).map((brand, index) => (
//             <Grid item xs={4.5} sm={4.5} md={2} key={index}>
//               <BrandItem height="100" brand={brand} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </div>
//   );
//   brandsArray["PCs"] = (
//     <div className="shadow-xl border-2 dark:text-white dark:bg-gray-800 py-1 h-auto rounded-lg m-2 items-center">
//       <Box sx={{ display: { xs: "none", md: "flex" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1} md={1} sm={1}></Grid>
//           {pcbrands.map((brand, index) => (
//             <Grid item xs={4} sm={4} md={2} key={index}>
//               <BrandItem height="100" brand={brand} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//       <Box sx={{ display: { xs: "flex", md: "none" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1.5} md={1} sm={1.5}></Grid>
//           {pcbrands.slice(0, 2).map((brand, index) => (
//             <Grid item xs={4.5} sm={4.5} md={2} key={index}>
//               <BrandItem height="100" brand={brand} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </div>
//   );

//   var MuseumsArray = [];
//   console.log(museums);

//   MuseumsArray.push(
//     <div className="p-2 dark:text-white dark:bg-gray-800 rounded-lg shadow-lg">
//       <Box sx={{ display: { xs: "none", md: "flex" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1} md={1} sm={1}></Grid>
//           {museums.map((mus, index) => (
//             <Grid item xs={2} md={2} sm={2} key={index}>
//               <MuseumItem fontSize={15} item={mus} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//       <Box sx={{ display: { xs: "flex", md: "none" } }}>
//         <Grid container spacing={1}>
//           <Grid item xs={1.5} md={1} sm={1.5}></Grid>
//           {museums.slice(0, 2).map((mus, index) => (
//             <Grid item xs={4.5} md={6} sm={4.5} key={index}>
//               <MuseumItem fontSize={10} item={mus} />
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
//     </div>
//   );

//   var slides = [];

//   mainBlog.map((blog, index) => {
//     slides.push(
//       <Link to={`/blogs/${blog._id}`}>
//         <div className="bg-gray-200 flex flex-col lg:flex-row dark:bg-gray-800 shadow-xl rounded-xl p-4 flex flex-row gap-2">
//           <img
//             src={blog.image}
//             alt="blog image"
//             className="object-cover h-48 lg:w-2/5 rounded-lg"
//           />
//           <div className="lg:w-3/5 text-left line-clamp-5 dark:text-white text-bold text-xl">
//             {blog.text}
//           </div>
//         </div>
//       </Link>
//     );
//   });

//   var BrandSlides = [];

//   Object.entries(brandsArray).map(([key, value]) => {
//     BrandSlides.push(
//       <>
//         <p className="font-bold text-lg">{key}</p>

//         <>{value}</>
//       </>
//     );
//   });

//   return (
//     <div className="dark:bg-gray-900 dark:text-white flex flex-col gap-2 min-h-screen">
//       <Header />
//       <div className="min-h-screen">
//         {mainBlog && (
//           <div className="mx-6 flex flex-col gap-2">
//             <div>
//               <span className="text-3xl dark:text-white upper">THE</span>

//               <span className="text-3xl dark:text-white font-bold upper">
//                 {" LATEST"}
//               </span>
//             </div>

//             <Carousel slides={slides} slide />
//           </div>
//         )}

//         {secondaryBlog && (
//           <Link
//             className="mx-6 flex flex-col gap-2 pointer-cursor"
//             to={`/blogs/${secondaryBlog._id}`}
//           >
//             <div>
//               <div>
//                 <span className="text-3xl dark:text-white upper">HOT</span>

//                 <span className="text-3xl dark:text-white font-bold upper">
//                   {" TOPICS"}
//                 </span>
//               </div>
//               <div className="bg-gray-200 flex flex-col lg:flex-row dark:bg-gray-800 shadow-xl rounded-xl p-4 flex flex-row gap-2">
//                 <img
//                   src={secondaryBlog.image}
//                   alt="blog image"
//                   className="object-cover h-48 lg:w-2/5 rounded-lg"
//                 />
//                 <div className="lg:w-3/5 text-left line-clamp-5 dark:text-white text-bold text-xl">
//                   {secondaryBlog.text}
//                 </div>
//               </div>
//             </div>
//           </Link>
//         )}

//         <div className="flex flex-col gap-2">
//           <div>
//             <span className="text-3xl dark:text-white upper">BROWSE</span>

//             <span className="text-3xl dark:text-white font-bold upper">
//               {" BRANDS"}
//             </span>
//           </div>
//           <Carousel slides={BrandSlides} slide={false} />
//         </div>

//         <div className="flex flex-col gap-2">
//           <span className="text-3xl dark:text-white font-bold">
//             {"MUSEUMS"}
//           </span>

//           <div className="dark:bg-gray-800 dark:text-white w-full rounded-lg shadow-lg border-2">
//             {MuseumsArray}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Header from "./Header";
import Carousel from "./Carousel";
import Footer from "./Footer";
import Loading from "./Loading";
import { MuseumItem, BrandItem } from "./Hottopics";
import HtmlParser from "./HtmlParser";

export default function HomePage(props) {
  const [mainBlog, setMainBlog] = useState([]);
  const [secondaryBlog, setSecondaryBlog] = useState([]);
  const [consolebrands, setConsoleBrands] = useState([]);
  const [mobilebrands, setMobileBrands] = useState([]);
  const [pcbrands, setPCBrands] = useState([]);
  const [museums, setMuseums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          mainBlogResponse,
          secondaryBlogResponse,
          brandsResponse,
          museumsResponse,
        ] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/mainBlog`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/sideBlog`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/allbrands`),
          axios.get(`${process.env.REACT_APP_API_BASE_URL}/museums`),
        ]);

        setMainBlog(mainBlogResponse.data);
        setSecondaryBlog(secondaryBlogResponse.data);
        console.log(secondaryBlogResponse.data);
        const data = brandsResponse.data;
        setConsoleBrands(
          data.Console.length > 5 ? data.Console.slice(0, 5) : data.Console
        );
        setMobileBrands(data.Mobile.slice(0, 5));
        setPCBrands(data.PC.slice(0, 5));
        setMuseums(museumsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const renderMainBlog = () => {
    if (mainBlog.length === 0) {
      return <div>No main blog posts available.</div>;
    }

    return mainBlog.map((blog, index) => (
      <Link to={`/blogs/${blog._id}`} key={index}>
        <div className="bg-gray-200 flex flex-col lg:flex-row dark:bg-gray-800 shadow-xl rounded-xl p-4 gap-4">
          <img
            src={blog.image}
            alt="blog image"
            className="object-cover h-48 lg:w-2/5 rounded-lg"
          />
          <div className="lg:w-3/5 text-left line-clamp-5 dark:text-white text-bold text-xl">
            <HtmlParser htmlContent={blog.text} />
          </div>
        </div>
      </Link>
    ));
  };

  const renderMuseums = () => {
    if (museums.length === 0) {
      return <div>No museums available.</div>;
    }

    return museums.map((mus, index) => (
      <div key={index}>
        <div className="p-2 dark:text-white dark:bg-gray-800 rounded-lg shadow-lg">
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Grid container spacing={1}>
              <Grid item xs={1} md={1} sm={1}></Grid>
              {museums.map((mus, index) => (
                <Grid item xs={2} md={2} sm={2} key={index}>
                  <MuseumItem fontSize={15} item={mus} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Grid container spacing={1}>
              <Grid item xs={1.5} md={1} sm={1.5}></Grid>
              {museums.slice(0, 2).map((mus, index) => (
                <Grid item xs={4.5} md={6} sm={4.5} key={index}>
                  <MuseumItem fontSize={10} item={mus} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      </div>
    ));
  };

  const brandsArray = {};

  brandsArray["Consoles"] = (
    <div className="shadow-xl border-2 align-middle dark:text-white dark:bg-gray-800 h-auto rounded-lg m-2">
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={1} sm={1}></Grid>
          {consolebrands.map((brand, index) => (
            <Grid item xs={4} sm={4} md={2} key={index}>
              <BrandItem height="100" brand={brand} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Grid container spacing={1}>
          <Grid item xs={1.5} md={1} sm={1.5}></Grid>
          {consolebrands.slice(0, 2).map((brand, index) => (
            <Grid item xs={4.5} sm={4.5} md={2} key={index}>
              <BrandItem height="100" brand={brand} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
  brandsArray["Mobiles"] = (
    <div className="shadow-xl border-2 dark:text-white dark:bg-gray-800 py-1 h-auto rounded-lg m-2 items-center">
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={1} sm={1}></Grid>
          {mobilebrands.map((brand, index) => (
            <Grid item xs={4} sm={4} md={2} key={index}>
              <BrandItem height="100" brand={brand} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Grid container spacing={1}>
          <Grid item xs={1.5} md={1} sm={1.5}></Grid>
          {mobilebrands.slice(0, 2).map((brand, index) => (
            <Grid item xs={4.5} sm={4.5} md={2} key={index}>
              <BrandItem height="100" brand={brand} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
  brandsArray["PCs"] = (
    <div className="shadow-xl border-2 dark:text-white dark:bg-gray-800 py-1 h-auto rounded-lg m-2 items-center">
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={1} sm={1}></Grid>
          {pcbrands.map((brand, index) => (
            <Grid item xs={4} sm={4} md={2} key={index}>
              <BrandItem height="100" brand={brand} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Grid container spacing={1}>
          <Grid item xs={1.5} md={1} sm={1.5}></Grid>
          {pcbrands.slice(0, 2).map((brand, index) => (
            <Grid item xs={4.5} sm={4.5} md={2} key={index}>
              <BrandItem height="100" brand={brand} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );

  const renderBrandSlides = () => {
    const brandSlides = Object.entries(brandsArray).map(([key, value]) => (
      <div key={key}>
        <p className="font-bold text-lg text-left mx-2">{key}</p>
        {value}
      </div>
    ));

    return brandSlides.length === 0 ? (
      <div>No brand slides available.</div>
    ) : (
      brandSlides
    );
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white flex flex-col gap-2 min-h-screen">
      <Header />
      <Grid container>
        <Grid item xs={1} md={1} sm={1}></Grid>
        <Grid item xs={10} md={10} sm={10}>
          <div className="min-h-screen">
            {mainBlog && (
              <div className="mx-6 flex flex-col gap-2">
                <div>
                  <span className="text-3xl dark:text-white upper">THE</span>
                  <span className="text-3xl dark:text-white font-bold upper">
                    {" LATEST"}
                  </span>
                </div>
                <Carousel slides={renderMainBlog()} slide />
              </div>
            )}

            {secondaryBlog && (
              <Link
                className="mx-6 flex flex-col gap-2 pointer-cursor"
                to={`/blogs/${secondaryBlog._id}`}
              >
                <div>
                  <div>
                    <span className="text-3xl dark:text-white upper">HOT</span>
                    <span className="text-3xl dark:text-white font-bold upper">
                      {" TOPICS"}
                    </span>
                  </div>
                  <div className="bg-gray-200 flex flex-col lg:flex-row dark:bg-gray-800 shadow-xl rounded-xl p-4 gap-4">
                    <img
                      src={secondaryBlog.image}
                      alt="blog image"
                      className="object-cover h-48 lg:w-2/5 rounded-lg"
                    />
                    <div className="lg:w-3/5 text-left line-clamp-5 dark:text-white text-bold text-xl">
                      <HtmlParser htmlContent={secondaryBlog.text} />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            <div className="flex flex-col gap-2 mt-4">
              <div>
                <span className="text-3xl dark:text-white upper">BROWSE</span>
                <span className="text-3xl dark:text-white font-bold upper">
                  {" BRANDS"}
                </span>
              </div>
              <Carousel slides={renderBrandSlides()} slide={false} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-3xl dark:text-white font-bold">
                {"MUSEUMS"}
              </span>
              <div className="dark:bg-gray-800 dark:text-white w-full rounded-lg shadow-lg border-2">
                {renderMuseums()}
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
