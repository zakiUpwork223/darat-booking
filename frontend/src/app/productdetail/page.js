import React from 'react';
import ProductDetail from './_components/ProductDetail';
import Header from '../home/_components/Header';
import Navbar from '../home/_components/Navbar';
import { Suspense } from 'react';

function page() {
    return (
        <div>
            <Header />
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <ProductDetail />
            </Suspense>
        </div>
    );
}

export default page;
