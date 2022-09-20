import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRecoilValue } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'
import useSpotify from '../hooks/useSpotify'
import Songs from './Songs'
import getTrackOrder from '../lib/flow.js'


function Body() {
    const spotifyApi = useSpotify();
    const playlist = useRecoilValue(playlistState)

    function flowTracks() {
        if (playlist && spotifyApi.getAccessToken()) {
            spotifyApi.getPlaylistTracks(playlist.id).then((data) => {
                const tracks = data.body.items
                const trackIds = tracks.map((track) => track.track.id)
                spotifyApi.getAudioFeaturesForTracks(trackIds).then(function (data) {
                    const flowOrder = getTrackOrder(trackIds, data.body.audio_features)

                    const tracksRequest = flowOrder?.map((id) => {
                        return `spotify:track:${id}`
                    })
                    
                    spotifyApi.removeTracksFromPlaylist(playlist.id, tracksRequest.map((track) => {return {"uri": track}})).then(() => {
                        spotifyApi.addTracksToPlaylist(playlist.id, tracksRequest)
                    })
                });    
            });
        }
    }
     
    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
            <header className='absolute top-10 right-10'>
                <div className='flex items-center font-bold bg-[#00b4d8] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-3 px-5 text-white' 
                onClick={() => flowTracks()}>
                    <h1>Flow</h1>
                </div>
    
            </header>
            <section className='flex items-end space-x-7 bg-gradient-to-b to-black from-[#0077b6] h-80 p-8'>
                <img className='h-44 w-44 object-cover shadow-2xl'src={playlist?.images?.[0]?.url}/>
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
                        {playlist?.name}
                    </h1>
                </div>
            </section>
            <div>
                <Songs />
            </div>
            
        </div>
    );
}

export default Body