import {socketApi} from "../../socketApi/api";
import {AppDispatch} from "../../store/store";

const initialChatState: ChatStateType = {
   messages: []
}

export const chatReducer = (state: ChatStateType = initialChatState, action: ActionsType): ChatStateType => {
   switch (action.type) {
      case "MESSAGES-RECEIVED":
         return {...state, messages: action.messages}
      case "NEW-MESSAGE-RECEIVED":
         return {...state, messages: [...state.messages, action.newMessage]}
      default:
         return state
   }
}

const messagesReceived = (messages: MessageType[]) => ({type: "MESSAGES-RECEIVED", messages} as  const)
const newMessageReceived = (newMessage: MessageType) => ({type: "NEW-MESSAGE-RECEIVED", newMessage} as  const)

export const createConnection = () => (dispatch: AppDispatch) => {
   socketApi.createConnection()
   socketApi.subscribe(
      (messages: MessageType[]) =>
         dispatch(messagesReceived(messages)),
      (newMessage: MessageType) =>
         dispatch(newMessageReceived(newMessage))
   )
}
export const destroyConnection = () => ()=> {
   socketApi.destroyConnection()
}
export const sendMessage = (message: string) => ()=> {
   socketApi.sendMessage(message)
}
export const sendName = (name: string) => ()=> {
   socketApi.sendName(name)
}

// types
export type ChatStateType = {
   messages: MessageType[]
}
export type MessageType = {
   message: string;
   user: {
      id: string;
      name: string;
   }
}
export type ActionsType =
   | ReturnType<typeof messagesReceived>
   | ReturnType<typeof newMessageReceived>
