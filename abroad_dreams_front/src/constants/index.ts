import type {
  INavLink,
  IFooterSection,
  IProduct,
  IReview,
  IService,
  IShoe,
  ISocialMedia,
  IStatistic,
} from "../types";

import {
  facebook,
  instagram,
  stepOne,
  stepTwo,
  stepThree,
  twitter,
} from "../assets/icons";

import {
  bigShoe1,
  bigShoe2,
  bigShoe3, courseAi, courseComputing, courseCybersecurity, courseEarlychildhood,
  // customer1,
  customer2, testimonialImage,
  // shoe4,
  // shoe5,
  // shoe6,
  // shoe7,
  thumbnailShoe1,
  thumbnailShoe2,
  thumbnailShoe3,
} from "../assets/images";

export const navLinks: INavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about-us", label: "About Us" },
  { href: "#products", label: "Courses" },
  { href: "#contact-us", label: "Contact Us" },
];

export const shoes: IShoe[] = [
  {
    thumbnail: thumbnailShoe1,
    bigShoe: bigShoe1,
  },
  {
    thumbnail: thumbnailShoe2,
    bigShoe: bigShoe2,
  },
  {
    thumbnail: thumbnailShoe3,
    bigShoe: bigShoe3,
  },
];

export const statistics: IStatistic[] = [
  { value: "1k+", label: "Courses" },
  { value: "50+", label: "Educational Institutions" },
  { value: "250+", label: "Students" },
];

export const products: IProduct[] = [
  {
    imgUrl: courseComputing,
    name: "Bsc. Honours in Computing",
    price: "CHC50109",
    rating: 3,
  },
  {
    imgUrl: courseAi,
    name: "Bsc. Honours in Artificial Intelligence",
    price: "CHC50120",
    rating: 4,
  },
  {
    imgUrl: courseEarlychildhood,
    name: "Diploma of Early Childhood Education & Care",
    price: "DHC50221",
    rating: 4,
  },
  {
    imgUrl: courseCybersecurity,
    name: "Bsc. in Cyber Security Engineering",
    price: "CHC50103",
    rating: 3,
  },
];

export const services: IService[] = [
  {
    imgUrl: stepOne,
    label: "Step 1:",
    subtext: "Register for your free account.",
  },
  {
    imgUrl: stepTwo,
    label: "Step 2:",
    subtext:
      "Complete your Profile Information in Personalized Dashboard.",
  },
  {
    imgUrl: stepThree,
    label: "Step 3:",
    subtext: "Start your College Application process.",
  },
];

export const reviews: IReview[] = [
  {
    imgUrl: testimonialImage,
    customerName: "Karan Bohara",
    rating: 4.5,
    feedback:
      "Abroad Dreams exceeded expectations – outstanding attention to detail and top-notch service. Highly recommended for a seamless study abroad experience!",
  },
  {
    imgUrl: customer2,
    customerName: "Sushma Sharma",
    rating: 4.6,
    feedback:
      "Abroad Dreams platform simplifies it all! Easy navigation, seamless processes – your gateway to a hassle-free study abroad experience.",
  },
];

export const footerLinks: IFooterSection[] = [
  {
    title: "Services",
    links: [
      { name: "Language Classes", link: "/" },
      { name: "Visa Information", link: "/" },
      { name: "Appointments", link: "/" },
    ],
  },
  {
    title: "Useful Links",
    links: [
      { name: "About Abroad Dreams", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How It Works", link: "/" },
      { name: "Privacy Policy", link: "/" },
      { name: "Track My Application", link: "/" },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      { name: "hello@abroad-dreams.com", link: "mailto:hello@abroad-dreams.com" },
      { name: "+977 1 4510123", link: "tel:+97714510123" },
    ],
  },
];

export const socialMedia: ISocialMedia[] = [
  { src: facebook, alt: "facebook logo" },
  { src: twitter, alt: "twitter logo" },
  { src: instagram, alt: "instagram logo" },
];
