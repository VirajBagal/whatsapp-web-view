import UserModel from "../models/user";
import ChannelModel from "../models/channel";
import { sendResponse, sendError } from "../../utility";
import { contactsList } from "./mockData";

module.exports = {
  createUser: async (req, res) => {
    const requestData = req.body;
    const isUserExist = await UserModel.findOneData({
      email: requestData.email,
    });
    if (isUserExist)
      return sendResponse(
        res,
        isUserExist,
        "User fetched successfully",
        true,
        200
      );

    const userObj = new UserModel(req.body);
    await userObj.saveData();
    sendResponse(res, userObj, "User created successfully", true, 200);
  },

  createChannel: async (req, res) => {
    const channelUsers = req.body.channelUsers;
    const firstUser = channelUsers[0];
    const secondUser = channelUsers[1];
    let isChannelAlreadyExist = false;
    let channelModel;

    const channelList = contactsList;
    if (channelList && channelList.length) {
      channelList.forEach((channel) => {
        if (channel.email === secondUser.email) {
          isChannelAlreadyExist = true;
        }
        if (isChannelAlreadyExist)
          channelModel = channel
      });
    }

    if (isChannelAlreadyExist)
      return sendResponse(res, channelModel, "Channel created successfully", true, 200);

    channelModel = new ChannelModel(req.body);
    await channelModel.saveData();
    sendResponse(res, channelModel, "Channel created successfully", true, 200);
  },

  getChannelList: async (req, res) => {
    const requestData = req.query;
    const channelList = contactsList;
    sendResponse(res, channelList, "Channel list fetched", true, 200);
  },

  searchUser: async (req, res) => {
    const requestData = req.query;
    let result = null;
    contactsList.forEach((contact) => {
      if (contact.name.toLowerCase().startsWith(requestData.email.toLowerCase())) {
        result = contact;
      }
    })
    if (!result) return sendError(res, {}, "No user found!");
    sendResponse(res, result, "User found successfully", true, 200);
  },

  sendMessage: async (req, res) => {
    const requestData = req.body;
    await ChannelModel.findOneAndUpdateData(
      { _id: requestData.channelId },
      { $push: { messages: requestData.messages } }
    );
    sendResponse(res, {}, "Message sent successfully", true, 200);
  },
};
