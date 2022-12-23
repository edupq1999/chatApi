const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.userId
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,
        conversationId: newConversation.id
    })
    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async (id, obj) => {
    const data = Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0]
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

module.exports = {
    findConversationById,
    findAllConversations,
    createConversation,
    updateConversation,
    deleteConversation
}