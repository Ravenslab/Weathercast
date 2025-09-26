import React from 'react';
import Map from '@/components/MapWrapper';

function Page() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Map</h1>
      <Map />
    </div>
  );
}

export default Page;
