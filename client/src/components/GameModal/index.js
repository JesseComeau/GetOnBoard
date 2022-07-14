import React, { useState, useEffect } from "react";
import ModalGameCard from "../Cards/ModalGameCard";
import { QUERY_GAMES } from "../../utils/queries";
import gameSearch from "../../utils/gameSearch";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_GAME } from "../../utils/mutations";
import { Modal, Button } from "react-bootstrap";

const GameModal = ({ showModal, searchTerm, closeModal }) => {
  console.log("Search Term: ", searchTerm);
  const [gameData, setGameData] = useState([]);
  const [addGame, { error }] = useMutation(ADD_GAME);

  const handleAddBook = async (gameToAdd) => {
    try {
      const { data } = await addGame({
        variables: { ...gameToAdd },
      });
      console.log("Added Game Data: ", data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    gameSearch(searchTerm, setGameData);
    console.log("API Data: ", gameData);
  }, []);

  console.log("State Game Data: ", gameData);

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Game Search Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {gameData.length === 0 ? (
          <div>Loading...</div>
        ) : (
          gameData.map((game) => {
            return (
              <div key={game.title}>
                <ModalGameCard game={game} />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleAddBook(game)}
                >
                  Save Game
                </button>
              </div>
            );
          })
        )}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn-green" onClick={closeModal}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameModal;
