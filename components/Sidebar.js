import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playlistState } from '../atoms/playlistAtom'

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists({limit: 50}).then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="text-gray-500 p-5 text-sm scrollbar-hide border-r border-gray-900 overflow-y-scroll h-screen">
        <div className="space-y-4">
            {playlists.map((playlist) => (
              <p key={playlist.id} onClick={() => setPlaylist(playlist)} className='cursor-pointer hover:text-white text-lg'>{playlist.name}</p>
            ))}
        </div>
    </div>
  )
}

export default Sidebar;