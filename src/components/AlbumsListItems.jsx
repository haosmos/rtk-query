import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import ExpandablePanel from './ExpandablePanel';
import { useRemoveAlbumMutation } from '../store';
import PhotosList from './PhotosList';

function AlbumsListItems({ album }) {
  const [removeAlbum, result] = useRemoveAlbumMutation();
  
  const handleRemoveAlbum = () => {
    removeAlbum(album);
  }
  
  const header = (
      <div className="flex flex-row items-center">
        <Button loading={result.loading} className="mr-2" onClick={handleRemoveAlbum}>
          <GoTrashcan />
        </Button>
        {album.title}
      </div>
  );
  
  return (
      <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album}/>
      </ExpandablePanel>
  )
}

export default AlbumsListItems;
