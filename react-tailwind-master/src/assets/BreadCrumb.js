import { Box, Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((pathname) => pathname);
  const searchnames = location.search
    .split("&")
    .filter((searchname) => searchname);

  return (
    // <div className="xs:hidden sm:hidden lg:block">
    <Box sx={{ display: { xs: "none", md: "none", lg: "flex" } }}>
      <Grid container>
        <Grid item xs={1.5} md={1.5} sm={1.5}></Grid>
        <Grid item xs={9} md={9} sm={9}>
          <div className="mb-2">
            <nav
              class="flex px-5 py-2 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              aria-label="Breadcrumb"
            >
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                  <a
                    href="/"
                    class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                    </svg>
                    Home
                  </a>
                </li>
                {pathnames.map((pathname, index) => (
                  <Link
                    to={`/${pathnames
                      .slice(0, index + 1)
                      .join("/")}${searchnames.slice(0, index + 1).join("&")}`}
                  >
                    <li>
                      <div class="flex items-center">
                        <svg
                          aria-hidden="true"
                          class="w-6 h-6 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        <a
                          href="#"
                          class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                        >
                          {decodeURIComponent(pathname)
                            .charAt(0)
                            .toUpperCase() +
                            decodeURIComponent(pathname).slice(1)}
                        </a>
                      </div>
                    </li>
                  </Link>
                ))}
              </ol>
            </nav>
          </div>
        </Grid>
      </Grid>
    </Box>
    // </div>
  );
}
