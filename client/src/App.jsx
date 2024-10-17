import React from 'react';
import { useRoutes } from 'react-router-dom';
import Navigation from './components/Navigation';
import ViewPlantKits from './pages/ViewPlantKits';
import CreatePlantKit from './pages/CreatePlantKit';
import EditPlantKit from './pages/EditPlantKit';
import PlantKitDetails from './pages/PlantKitDetails';
import './App.css';

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreatePlantKit title='DIY Delight | Customize' />
    },
    {
      path: '/create',
      element: <CreatePlantKit title='DIY Delight | Customize' />
    },
    {
      path: '/plantkits',
      element: <ViewPlantKits title='DIY Delight | Plant Kits' />
    },
    {
      path: '/plantkits/:id',
      element: <PlantKitDetails title='DIY Delight | View' />
    },
    {
      path: '/edit/:id',
      element: <EditPlantKit title='DIY Delight | Edit' />
    },
    {
      path: '/details/:id', 
      element: <PlantKitDetails title='DIY Delight | Details' />
    }
  ]);

  return (
    <div className='app'>
      <Navigation />
      { element }
    </div>
  );
}

export default App;
