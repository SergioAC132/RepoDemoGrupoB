import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MiComponente from './componentes/MiComponente.jsx'
import Tarjeta from './componentes/Tarjeta.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Tarjeta
      imagen="mango"
      nombre="MANGO"
      region="Sur de México"
      texto="Es una fruta que sabe rico con chamoy y miguelito"
    />
    <Tarjeta
      imagen="kiwi"
      nombre="KIWI"
      region="Sureste de México"
      texto="Es una fruta que sabe rico pero si se madura se pone dulce"
    />
    <Tarjeta
      imagen="naranja"
      nombre="NARANJA"
      region="Centro de México"
      texto="Tiene gajos y también se le pone miguelito rico"
    />
    <Tarjeta
      imagen="piña"
      nombre="PIÑA"
      region="No se"
      texto="Sabe rica con miguelito también, pero mucho te esporea la lengua"
    />
    <Tarjeta
      imagen="platano"
      nombre="PLATANO"
      region="Centro de México"
      texto="Se la comen los changos"
    />
  </StrictMode>,
)
