import React from 'react'
import ClientInfo from './_components/ClientInfo'
import Header from '@/app/home/_components/Header'
import Navbar from '@/app/home/_components/Navbar'
import { Suspense } from 'react';

function page() {
    return (
        <div>
            <Header />
            <Navbar />
            <Suspense fallback={<div>Loading...</div>}>
                <ClientInfo />
            </Suspense>
        </div>
    )
}

export default page
