import Title from "@/components/main-title";
import Link from "next/link";
export default function NotFound() {
  return (
    <main className="grid h-screen place-items-center bg-dark-color px-4 ">
      <div className="text-center">
        <p className="text-base font-semibold text-vibrant-red">404</p>
        {/* <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
          Page not found
        </h1> */}
        <Title text="Page not found" className="mt-4" />
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 hover:scale-105 ">
          <Link
            href="/"
            className="text-sm font-semibold text-white hover:text-vibrant-hover/90 "
          >
            Go back home <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
