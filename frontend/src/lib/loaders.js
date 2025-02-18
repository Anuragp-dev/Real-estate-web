import apiRequest from "./apiRequest"

export const singlePageLoader = async ({ request, params }) => {
    const response = await apiRequest(`/posts/${params.id}`)
    return response.data
}