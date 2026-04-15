import { useState } from "react"

export default function Contador() {
    var[numero, setNumero] = useState(0);
    return(
        <div>
            <h2>{numero}</h2>
            <button onClick={() => {
                setNumero(numero+1);
            }}>
                +
            </button>
            <button onClick={() => {
                setNumero(numero-1);
            }}>
                -
            </button>
        </div>
    );
}