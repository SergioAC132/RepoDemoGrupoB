import { useState } from "react";

export default function Demo() {
    var [nombre, setNombre] = useState("Luis");
    return(
        <div>
            <h2>{nombre}</h2>
            <button onClick={() => {
                /*if (nombre == "Arturo") {
                    setNombre("Luis")
                } else {
                    setNombre("Arturo")
                }*/

                nombre === "Arturo" ? setNombre("Luis") : setNombre("Arturo");
            }}>
                Click me
            </button>
        </div>
    );
}

