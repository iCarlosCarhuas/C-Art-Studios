import React from 'react';

export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {['Ingreso de Usuario', 'Lugar de envío', 'Modo de Pago', 'Confirmar Orden'].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2  
          text-center 
       ${
         index <= activeStep
           ? 'border-teal-500   text-teal-500'
           : 'border-purple-400 text-purple-400'
       }
          
       `}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
