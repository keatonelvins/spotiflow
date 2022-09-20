import React from 'react'

function Song({ order, track }) {
  return (
    <div className='grid grid-cols-2 text-gray-500 py-2 px-5 hover:bg-gray-900 rounded-'>
        <div className='flex items-center space-x-8'>
            <p className="w-1">{order+1}</p>
            <img className='h-10 w-10' src={track.track.album.images[0]?.url}/>
            <div>
              <p className='w-60 lg:w-100 truncate text-white'>{track.track.name}</p>
              <p>{track.track.artists[0].name}</p>
            </div>
        </div>
        <div className='flex items-center'>
          <p className='w-60 lg:w-100 hidden md:inline'>{track.track.album.name}</p>
        </div>
    </div>
  );
}

export default Song