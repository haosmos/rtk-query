import { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import AlbumsListItems from './AlbumsListItems';

function AlbumsList({ user }) {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, result] = useAddAlbumMutation();
  // const [removeAlbum, removeAlbumResult] = useRemoveAlbumMutation();
  
  const handleAddAlbum = () => {
    addAlbum(user);
  }
  
  let content;
  if(isFetching) {
    content = <Skeleton className="h-10 w-full" times={3}/>
  } else if (error) {
    content = <div>Error loading albums</div>
  } else {
    content = data.map(album => {
      return <AlbumsListItems key={album.id} album={album}/>
    })
  }
  
  return (
      <>
        <div className="m-2 flex flex-row items-center justify-between">
          <h3 className="text-lg font bold">
            Albums for {user.name}
          </h3>
          <Button onClick={handleAddAlbum}>
            + Add album
          </Button>
        </div>
        <div>
          {content}
        </div>
      </>
  )
}

export default AlbumsList;
