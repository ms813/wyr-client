import SockJS from 'sockjs-client';

class SocketService {

    socket;
    gameId;

    constructor(gameId) {
        this.gameId = gameId;
        this.connect(gameId);
    }

    connect = (gameId) => {
        this.socket = new SockJS(`/wyr/${gameId}`);
        this.socket.onopen = () => {
            console.log('Socket opened', this.socket);
        };
    };

    send = (data, callback) => {
        if (!this.socket) {
            this.connect(this.gameId);
        }

        this.socket.send(data, callback);
    };
};

export default SocketService;