import React from 'react';

const PlayerGameOver = () => <div>
    The game has finished, thanks for playing!
    <button onClick={() => window.location.reload()}>Again?</button>
</div>;

export default PlayerGameOver;