// src/pages/GameListPage.tsx

import { useQuery, useMutation } from '@apollo/client';
import { GET_GAMES, DELETE_GAME, ADD_GAME, UPDATE_GAME } from '../graphql';
import { Game } from '../types';
import GameForm, { GameFormInputs } from '../components/GameForm';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface GamesData {
  games: Game[];
}

export default function GameListPage() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const { loading, error, data } = useQuery<GamesData>(GET_GAMES);  
  
  const [deleteGame] = useMutation(DELETE_GAME);

  const [addGame] = useMutation(ADD_GAME, {
    update(cache, { data }) {
      const newGame = data?.addGame;
      if (!newGame) return;
  
      const existingGames = cache.readQuery<GamesData>({ query: GET_GAMES });
  
      if (existingGames?.games) {
        cache.writeQuery({
          query: GET_GAMES,
          data: {
            games: [...existingGames.games, newGame],
          },
        });
      }
    },
  });
  
  const [updateGame] = useMutation(UPDATE_GAME, {
    update(cache, { data }) {
      const updatedGame = data?.updateGame;
      if (!updatedGame) return;
  
      const existingGames = cache.readQuery<GamesData>({ query: GET_GAMES });
  
      if (existingGames?.games) {
        cache.writeQuery({
          query: GET_GAMES,
          data: {
            games: existingGames.games.map((game) =>
              game.id === updatedGame.id ? { ...game, ...updatedGame } : game
            ),
          },
        });
      }
    },
  });
  

  const handleAddGame = async (formData: GameFormInputs) => {
    try {
      const platforms = formData.platform.split(',').map((p) => p.trim());
      await addGame({ variables: { game: { title: formData.title, platform: platforms } } });
      toast.success(t('gameAdded'));
    } catch (error) {
      toast.error(t('gameAddFailed'));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGame({
        variables: { id },
        update(cache) {
          const existingGames = cache.readQuery<GamesData>({ query: GET_GAMES });
  
          if (existingGames?.games) {
            cache.writeQuery({
              query: GET_GAMES,
              data: {
                games: existingGames.games.filter((game) => game.id !== id),
              },
            });
          }
        },
      });
      toast.success(t('gameDeleted'));
    } catch (error) {
      toast.error(t('gameDeleteFailed'));
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await updateGame({ variables: { id, edits: { title: 'Updated Game Title' } } });
      toast.success(t('gameUpdated'));
    } catch (error) {
      toast.error(t('gameUpdateFailed'));
    }
  };

  if (loading) return <p>{t('loading')}</p>;
  if (error) return <p>{t('errorLoadingGames')}</p>;

  return (
    <>
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => changeLanguage('en')} className="px-2 py-1 border rounded">EN</button>
        <button onClick={() => changeLanguage('fr')} className="px-2 py-1 border rounded">FR</button>
      </div>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-screen-md mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
            {t('welcome')}
          </h1>

          <GameForm onAdd={handleAddGame} />

          {data?.games.map((game) => (
            <div key={game.id} className="mb-4 p-4 border rounded shadow bg-white">
              <Link to={`/games/${game.id}`}>
                <h2 className="text-xl font-semibold hover:underline">{game.title}</h2>
              </Link>
              <p className="text-sm text-gray-600">{t('platforms')}: {game.platform.join(', ')}</p>
              <p className="text-sm text-gray-600">{t('reviews')}: {game.reviews.length}</p>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleUpdate(game.id)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
                >
                  {t('update')}
                </button>
                <button
                  onClick={() => handleDelete(game.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
