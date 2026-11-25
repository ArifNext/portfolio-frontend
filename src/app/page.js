// src/app/page.jsx
import Hero from "@/components/master/Hero";
import About from "@/components/master/About";
import Services from "@/components/master/Services";
import Skills from "@/components/master/Skills";
import Portfolio from "@/components/master/Portfolio";
import Contact from "@/components/master/Contact";

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      
      <section id="about">
        <About />
      </section>
      
      <section id="services">
        <Services />
      </section>
      
      <section id="skills">
        <Skills />
      </section>
      
      {/* <section id="portfolio">
        <Portfolio />
      </section> */}
      
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}