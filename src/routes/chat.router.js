import KnexContainer from '../middleware/api/knexContainer.js';
import config from '../config/sqlLite3.js';
let database = new KnexContainer(config, 'messages') 

export const chatRouter = {

  createMessagesTable: async () => {
    try {
      database = new KnexContainer(config, 'messages') 
      await database.createTable()
    } catch (error) {
      console.log({Server: error})
    }
  },  
  getAllMessages: async () => {
    try {
      database = new KnexContainer(config, 'messages') 
      const allMessages = await database.getAll()
      return allMessages
    } catch (error) {
      console.log({Server: error})
    }
  },

  addNewMessage: async (message) => {
    try {
      database = new KnexContainer(config, 'messages') 
      const prevMessages = await database.getAll()
      const currentDate = new Date().toLocaleString()

     

      const newMessage = {
       
        email: message.email ? message.email : 'anonymous@mail.com',
        date: currentDate,
        messageText: message.messageText ? message.messageText : '(Empty message)',
      }
      database = new KnexContainer(config, 'messages')     
      await database.save(newMessage)
    } catch (error) {
      console.log({Server: error})
    }
  },
}


export default chatRouter;