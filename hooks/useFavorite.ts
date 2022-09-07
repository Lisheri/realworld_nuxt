import { useState } from './index';
import { addFavorite, removeFavorite } from '@/apis/favorite';
export const useFavorite = (props) => {
  const [isFavoriteing, setIsFavoriteing] = useState(false);
  const handleFavorite = () => {
    if (isFavoriteing.value) {
      return;
    }
    setIsFavoriteing(true);
    const { favorited, slug, onFavorivedChange } = props;
    if (!favorited) {
      addFavorite(slug).then(() => {
        console.info(slug);
      }).finally(() => {
        setIsFavoriteing(false)
      });
    } else {
      removeFavorite(slug).then(() => {
        console.info(slug);
      }).finally(() => {
        setIsFavoriteing(false)
      });
    }
    onFavorivedChange(slug, !favorited);
  };
  return { handleFavorite, isFavoriteing }
}