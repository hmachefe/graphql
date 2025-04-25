import { useQuery, useMutation } from '@apollo/client';
import { GET_GAMES, DELETE_GAME, ADD_GAME, UPDATE_GAME } from './graphql';
import { Game } from './types';
import GameForm, { GameFormInputs } from './components/GameForm';

interface GamesData {
  games: Game[];
}

export default function App() {
  const { loading, error, data } = useQuery<GamesData>(GET_GAMES);
  const [deleteGame] = useMutation(DELETE_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });
  const [addGame] = useMutation(ADD_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });
  const [updateGame] = useMutation(UPDATE_GAME, {
    refetchQueries: [{ query: GET_GAMES }],
  });

  const handleAddGame = (formData: GameFormInputs) => {
    const platforms = formData.platform.split(',').map((p) => p.trim());
    addGame({ variables: { game: { title: formData.title, platform: platforms } } });
  };

  const handleDelete = (id: string) => deleteGame({ variables: { id } });
  const handleUpdate = (id: string) => {
    updateGame({ variables: { id, edits: { title: 'Updated Game Title' } } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading games!</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-screen-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          🎮 Game Library
        </h1>

        <GameForm onAdd={handleAddGame} />

        {data?.games.map((game) => (
          <div key={game.id} className="mb-4 p-4 border rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{game.title}</h2>
            <p className="text-sm text-gray-600">Platforms: {game.platform.join(', ')}</p>
            <p className="text-sm text-gray-600">Reviews: {game.reviews.length}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleUpdate(game.id)}
                className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded"
              >
                ✏️ Update
              </button>
              <button
                onClick={() => handleDelete(game.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
