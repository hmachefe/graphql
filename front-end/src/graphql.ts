import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
      title
      platform
      reviews {
        id
        rating
        author {
          name
        }
      }
    }
  }
`;

export const DELETE_GAME = gql`
  mutation DeleteGame($id: ID!) {
    deleteGame(id: $id) {
      id
      title
    }
  }
`;

export const ADD_GAME = gql`
  mutation AddGame($game: AddGameInput!) {
    addGame(game: $game) {
      id
      title
    }
  }
`;

export const UPDATE_GAME = gql`
  mutation UpdateGame($id: ID!, $edits: EditGameInput!) {
    updateGame(id: $id, edits: $edits) {
      id
      title
    }
  }
`;
