import React from 'react';
import {RouterProvider} from 'react-router-dom';
import { router } from './routes/router';

const App = () => {
  return (
    <div className="bg-[#191919] min-h-screen text-white">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
