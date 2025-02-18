import apiRequest from "./apiRequest"

export const singlePageLoader = async ({ request, params }) => {
    const response = await apiRequest("/posts/getPost/" + params.id);
    return response.data
}

export const listPageLoader = async ({ request, params }) => {
    const query = request.url.split("?")[1]
    const response = await apiRequest("/posts/getPosts/" + query);
    return response.data
}