import React from "react";  
import { showAlert } from 'tailwind-toastify';

function Terms() { 
    const handleShowAlert = (type, title, message) => {
        showAlert(type, title, message);
      }
    
      return (
        <>
          <p  onClick={() => handleShowAlert('info', 'Terms and servcies', '1. Cleaning services for residential or commercial spaces. 2.  Handyman services for minor repairs and installations. 3. Lawn care and landscaping services. 4. Event planning and coordination for small gatherings or parties. 5. Personal assistant services for errands and administrative tasks.')}>Terms and Conditions</p>
        </>
      );
    }

export default Terms;