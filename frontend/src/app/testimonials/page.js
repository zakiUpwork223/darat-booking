import React from 'react';
import Header from '../home/_components/Header';
import Navbar from '../home/_components/Navbar';
import Testimonials from './_components/Testimonials';
import Footer from '../home/_components/Footer';

function page() {
  return (
    <div>
      <Header />
      <Navbar />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default page;
