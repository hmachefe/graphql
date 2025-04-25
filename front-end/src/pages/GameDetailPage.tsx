// src/pages/GameDetailPage.tsx
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Game } from '../types';

const GET_GAME = gql`
  query GetGame($id: ID!) {
    game(id: $id) {
      id
      title
      platform
      reviews {
        id
        rating
        content
        author {
          name
        }
      }
    }
  }
`;

interface GameData {
  game: Game;
}

export default function GameDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery<GameData>(GET_GAME, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading game.</p>;
  if (!data?.game) return <p>Game not found.</p>;

  const { title, platform, reviews } = data.game;

  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="mb-2 text-gray-700">Platforms: {platform.join(', ')}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Reviews</h2>
      <ul className="space-y-2">
        {reviews.map((review) => (
          <li key={review.id} className="bg-white p-4 shadow rounded">
            <p className="text-sm text-gray-800">
              <strong>{review.author.name}</strong>: {review.content} ⭐{review.rating}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
