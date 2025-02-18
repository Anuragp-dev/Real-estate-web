import apiRequest from "./apiRequest"

export const singlePageLoader = async ({ request, params }) => {
    const response = await apiRequest("/posts/getPost/" + params.id);
    return response.data
}