import {io} from "socket.io-client";
import {Socket} from "socket.io-client/build/esm/socket";
import {MessageType} from "../store/chat/chatReducer";


export const socketApi = {
   socket: null as null | Socket,
   createConnection() {
      this.socket = io("http://localhost:8080");
   },
   destroyConnection() {
      this.socket?.disconnect()
      this.socket = null
   },
   subscribe(
      initMessagesCallback: (payload: MessageType[]) => void,
      newMessageCallback: (payload: MessageType) => void
   ) {
      this.socket?.on('init-messages-loaded', initMessagesCallback)
      this.socket?.on("new-message-sent", newMessageCallback)
   },
   sendMessage(message: string) {
      this.socket?.emit("client-message-sent", message);
   },
   sendName(name: string) {
      this.socket?.emit("client-name-set", name);
   },
}
