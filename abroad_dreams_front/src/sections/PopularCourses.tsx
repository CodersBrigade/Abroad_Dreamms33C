import CoursesCard from "../components/CoursesCard.tsx";

import { products } from "../constants";

import type { IProduct } from "../types";

const PopularCourses = () => {
  return (
    <section id="products" className="max-container max-sm:mt-12">
      <div className="flex flex-col justify-start gap-5">
        <h2 className="text-4xl font-palanquin font-bold">
          <span className="text-coral-red">Popular</span> Courses
        </h2>
        <p className="lg:max-w-lg font-montserrat text-slate-gray">
            We count down the most popular course choices for students for studies abroad...
        </p>
      </div>

      <div className="mt-16 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {products.map((product: IProduct) => (
          <CoursesCard key={product.name} {...product} />
        ))}
      </div>
    </section>
  )
}

export default PopularCourses
