import kiwi from '../imagenes/kiwi.jpg';
import mango from '../imagenes/mango.jpg';
import naranja from '../imagenes/naranja.jpg';
import piña from '../imagenes/piña.jpg';
import platano from '../imagenes/platano.jpg';
import '../estilos/Tarjeta.css';

const imagenes = {
    kiwi, mango, naranja, piña, platano
}

function Tarjeta(props) {
    return(
        <div className="contenedor-tarjeta">
            <img 
                className="imagen-tarjeta"
                src={imagenes[props.imagen]} 
                alt="Imagen de fruta ${props.nombre}" />
            <div className="contenedor-texto-tarjeta">
                <p className="titulo-tarjeta">
                    <stong>{props.nombre}</stong>
                </p>
                <p className="subtitulo-tarjeta">
                    {props.region}
                </p>
                <p className="texto-tarjeta">
                    {props.texto}
                </p>
            </div>
        </div>
    );
}

export default Tarjeta;