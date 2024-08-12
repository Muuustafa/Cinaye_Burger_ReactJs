import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './components/Accueil';
import GestionnaireAccueil from './components/GestionnaireAccueil';
import ClientAccueil from './components/ClientAccueil';
import BurgerList from './components/BurgerList';
import BurgerForm from './components/BurgerForm';
import BurgerDetails from './components/BurgerDetails';
import CommandeList from './components/CommandeList';
import CommandeForm from './components/CommandeForm';
import Statistiques from './components/Statistiques';
import CatalogueBurgers from './components/CatalogueBurgers';
import './index.css';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/gestionnaire" element={<GestionnaireAccueil />} />
            <Route path="/gestionnaire/burgers" element={<BurgerList />} />
            <Route path="/gestionnaire/ajouter-burger" element={<BurgerForm />} />
            <Route path="/gestionnaire/modifier-burger/:id" element={<BurgerForm />} />
            <Route path="/gestionnaire/commandes" element={<CommandeList />} />
            <Route path="/gestionnaire/statistiques" element={<Statistiques />} />
            <Route path="/client" element={<ClientAccueil />} />
            <Route path="/client/burgers" element={<CatalogueBurgers />} />
            <Route path="/client/burgers/:id" element={<BurgerDetails />} />
            <Route path="/client/commander" element={<CommandeForm />} />
          </Routes>
        </main>
        <Footer />  {/* Use the Footer component here */}
      </div>
    </Router>
  );
}

export default App;

