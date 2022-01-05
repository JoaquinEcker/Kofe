import React from "react";
import { Header } from "../components/Header";
import Content from "../components/Content"
const Home = () => {
  return (
    <>
      <div
        style={{
          height: 50,
        }}
      ></div>
      <div className="w-full bg-black">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="text-center pb-12">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white ">
              Kofe
            </h1>
            <h2 className="text-base font-bold text-white">
              Somos la empresa #1 en venta de capsulas de café.
            </h2>
          </div>
        </section>
      </div>
      <Header />
      <Content />
    </>
  );
};

export default Home;
