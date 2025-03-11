import apiRequest from "./apiRequest"
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
    const response = await apiRequest("/posts/getPost/" + params.id);
    return response.data
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1]
    const response = await apiRequest("/posts/getPosts?" + query);
    return response.data
}

export const ProfilePageLoader = async () => {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return defer({
      postResponse: postPromise,
      chatResponse: chatPromise,
    });
  };