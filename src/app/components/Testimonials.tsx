"use client";

import Image from 'next/image';

type TestimonialProps = {
  content: string;
  name: string;
  role: string;
  image: string;
};

const Testimonial = ({ content, name, role, image }: TestimonialProps) => (
  <div className="bg-white rounded-lg shadow p-8 relative">
    <div className="absolute -top-5 left-8 w-10 h-10 bg-blue-500 flex items-center justify-center rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10.5h1.5a2 2 0 1 0-2-2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 10.5h1.5a2 2 0 1 0-2-2" />
      </svg>
    </div>
    <p className="text-gray-600 italic mb-6">{content}</p>
    <div className="flex items-center">
      <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
        <Image src={image} alt={name} width={48} height={48} className="object-cover" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </div>
  </div>
);

const testimonials = [
  {
    content: "Shiksha Tech has revolutionized how we manage our school's operations. The real-time attendance and grading systems have saved our staff countless hours of administrative work.",
    name: "Rajesh Kumar",
    role: "Principal, Delhi Public School",
    image: "/placeholders/profile-rk.svg"
  },
  {
    content: "As a parent, I appreciate the instant updates on my child's attendance and performance. The app has made communication with teachers seamless and effective.",
    name: "Priya Sharma",
    role: "Parent",
    image: "/placeholders/profile-ps.svg"
  },
  {
    content: "The financial management module has streamlined our fee collection process, reducing errors and saving time. The reporting features provide valuable insights for planning.",
    name: "Anand Patel",
    role: "Administrator, Modern Academy",
    image: "/placeholders/profile-ap.svg"
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by educational institutions across the country
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 