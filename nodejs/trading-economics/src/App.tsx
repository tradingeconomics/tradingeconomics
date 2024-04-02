import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { headerContext } from './hooks/HeaderContext';
import { RoutesList } from './utils/Routes';

const App = () => {
  const [title, setTitle] = useState('Indicators');

  return (
    <headerContext.Provider value={{ title, setTitle }}>
      <div className='flex'>
        <Navbar />
        <main className='flex flex-col grow bg-gray-pure min-h-screen'>
          <Header />
          <div className='flex grow'>
            <Routes>
              {RoutesList.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </main>
      </div>
    </headerContext.Provider>
  );
};

export default App;
