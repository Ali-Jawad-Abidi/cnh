import Footer from "./Footer";
import Header from "./Header";
import HandymanIcon from "@mui/icons-material/Handyman";

function CategoryCard(props) {
  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 shadow-xl">
      {/* <svg
        class="w-full h-7 text-gray-500 dark:text-gray-400 mb-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M16.293 3.293a1 1 0 0 1 1.414 1.414L4.93 18.607a1 1 0 0 1-1.414-1.414L16.293 3.293z" />
      </svg> */}
      <HandymanIcon style={{ fontSize: "4rem" }} className="mb-2" />
      <a href="/service">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Go to this step by step guideline process on how to certify for your
        weekly benefits:
      </p>
      <a
        href="/service"
        class="inline-flex items-center text-blue-600 hover:underline"
      >
        Proceed to Buy
        <svg
          class="w-3 h-3 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </a>
    </div>
  );
}

function ServiceCard() {
  return (
    <div class="max-w-sm  bg-white border border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="# mx-auto h-20 items-center justify-center">
        <img
          class="rounded-t-lg object-fill"
          src="https://flowbite.com/docs/images/blog/image-4.jpg"
          alt=""
        />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Web Developement
          </h5>

          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            £25
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <a
          href="#"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            class="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

function OfferCard(props) {
  return (
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
        {props.title}
      </h5>
      <div class="flex items-baseline text-gray-900 dark:text-white">
        <span class="text-3xl font-semibold">£</span>
        <span class="text-5xl font-extrabold tracking-tight">25</span>
        <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">
          /hr
        </span>
      </div>
      <ul role="list" class="space-y-5 my-7">
        <li class="flex space-x-3 items-center">
          <svg
            class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            2 team members
          </span>
        </li>
        <li class="flex space-x-3">
          <svg
            class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            20GB Cloud storage
          </span>
        </li>
        <li class="flex space-x-3">
          <svg
            class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
            Integration help
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            Sketch Files
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            API Access
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            Complete documentation
          </span>
        </li>
        <li class="flex space-x-3 line-through decoration-gray-500">
          <svg
            class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span class="text-base font-normal leading-tight text-gray-500">
            24×7 phone & email support
          </span>
        </li>
      </ul>
      <button
        type="button"
        class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Choose plan
      </button>
    </div>
  );
}

export default function Services(props) {
  return (
    <div className="dark:bg-gray-900">
      <Header />
      <p className="text-center text-blue-600 text-xl font-bold my-8">
        CONSOLENOSTALGIA SERVICES
      </p>
      <div className="min-h-screen px-12">
        <div className="grid grid-cols-3 gap-2">
          <CategoryCard title={"Repair"} />
          <CategoryCard title={"Upgrade"} />
          <CategoryCard title={"Parts and Tools"} />
          <CategoryCard title={"Replacement"} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
