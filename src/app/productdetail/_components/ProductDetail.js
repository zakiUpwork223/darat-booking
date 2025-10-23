'use client'
import React from 'react';
import CardDetails from '@/app/utilities/_components/CardDetails';
import { useSearchParams } from 'next/navigation';

function ProductDetail() {

    const params = useSearchParams()
    const head = params.get('head')
    return (
            <CardDetails
                Heading={head}
            />
    );
}

export default ProductDetail;
