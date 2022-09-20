import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { playlistState } from '../atoms/playlistAtom'
import Song from './Song'
import { useRecoilValue } from 'recoil'
import useSpotify from '../hooks/useSpotify'

function Songs() {
  const playlist = useRecoilValue(playlistState)
  const spotifyApi = useSpotify();
  const [tracks, setTracks] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (playlist && spotifyApi.getAccessToken()) {
      spotifyApi.getPlaylistTracks(playlist.id).then((data) => {
        setTracks(data.body.items);
      });
    }
  }, [session, spotifyApi, playlist]);

  return (
    <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
      {tracks.map((track, i) => (
        <Song key={track.track.id} order={i} track={track}/>
      ))}
    </div>
  );
}

export default Songs