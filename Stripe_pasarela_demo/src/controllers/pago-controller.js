import Stripe from "stripe";
import { STRIPE_KEY } from "../config.js"

const stripe = new Stripe(STRIPE_KEY);

const crearSesionPago = async (req, res) => {
    const sesion = await stripe.checkout.sessions.create({
        line_items:[ 
            {
                price_data:{ 
                    product_data:{
                        name:`televisión`,
                        description: `Televisión de 60 pulgadas`,
                    },
                    currency: `mxn`, 
                    unit_amount: 4000, 
                },
                quantity: 2, 
            }, 
            {
                price_data:{
                    product_data:{ 
                        name:`Xbox Series S`, 
                        description: `Xbox para videojuegos de nueva generación`,
                    },
                    currency: `mxn`, 
                    unit_amount: 700, 
                },
                quantity: 1,
            }
        ],
        mode: "payment",
        success_url: `http://localhost:4000/exito`,
        cancel_url: `http://localhost:4000/cancelado`
    });
    res.json(sesion);
};

export default crearSesionPago;