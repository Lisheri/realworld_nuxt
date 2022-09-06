import { postAction, deleteAction } from "./manage";

export const addFavorite = (slug: string) => postAction(`/articles/${slug}/favorite`);

export const removeFavorite = (slug: string) => deleteAction(`/articles/${slug}/favorite`);

