class Player {
  /**
   * Unique player ID.
   *
   * @type {string}
   */
  id = null;

  /**
   * Socket.IO client ID.
   *
   * @type {string}
   */
  clientId = null;

  /**
   * Player's display name.
   *
   * @type {string}
   */
  username = '';

  /**
   * Player online status.
   *
   * @type {bool}
   */
  online = true;

  /**
   * Player game ID.
   *
   * @type {string}
   */
  gameId = null;

  /**
   * Number of cards played by player.
   *
   * @type {number}
   */
  cardsPlayed = 0;

  /**
   * Create new player.
   *
   * @param {string} id       Unique player identifier
   * @param {string} clientId Socket.IO client ID
   */
  constructor(id, clientId) {
    if (!id || !clientId) {
      throw new Error('[Player] ID and clientID have to be set!');
    }

    this.id = id;
    this.clientId = clientId;
  }

  /**
   * Record a card played by player.
   */
  recordCardPlayed() {
    this.cardsPlayed++;
  }

  /**
   * Set game ID and reset cards played.
   *
   * @param {string} gameId Unique game ID
   */
  setGameId(gameId) {
    this.gameId = gameId;
    this.cardsPlayed = 0;
  }

  /**
   * Get properties to serialize for client
   */
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      cardsPlayed: this.cardsPlayed,
      online: this.online
    };
  }
}

export default Player;
