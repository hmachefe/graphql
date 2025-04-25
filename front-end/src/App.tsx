import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_GAMES, DELETE_GAME, ADD_GAME, UPDATE_GAME } from './graphql';
import { Game } from './types';

interface GamesData {
  games: Game[];
}

function App() {
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

  const handleDelete = (id: string) => {
    deleteGame({ variables: { id } });
  };

  const handleAdd = () => {
    addGame({
      variables: {
        game: {
          title: "New Game " + Math.floor(Math.random() * 1000),
          platform: ["PC"],
        }
      }
    });
  };

  const handleUpdate = (id: string) => {
    updateGame({
      variables: {
        id,
        edits: { title: "Updated Game Title" }
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading games!</p>;

  return (
    <div>
      <h1>🎮 Game Library</h1>
      <button onClick={handleAdd}>➕ Add Game</button>
      {data?.games.map((game) => (
        <div key={game.id} style={{ borderBottom: '1px solid #ccc', margin: '10px 0' }}>
          <h2>{game.title}</h2>
          <p>Platforms: {game.platform.join(', ')}</p>
          <p>Reviews: {game.reviews.length}</p>
          <button onClick={() => handleUpdate(game.id)}>✏️ Update</button>
          <button onClick={() => handleDelete(game.id)}>🗑️ Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;
