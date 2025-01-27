import HomePage from './pages/homePage/HomePage'
import {
  createBrowserRouter,
  RouterProvider,
  Router,
  Link

} from "react-router-dom";
import ListPage from './pages/listPage/listPage';
import Layout from './pages/layout/layout';
import SinglePage from './pages/singlePage/singlePage';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
      ]
    },
   
  ])

  return (

   

    <RouterProvider router={router} />
  )
}

export default App