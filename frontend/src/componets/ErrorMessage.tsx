import React from'react'; 
function  ErrorMensaje({children}:{children: React.ReactNode} ) {
    return ( <>
        <div className="alert alert-danger bg-red-100 border-l-4 border-red-500 text-red-700  " role="alert">
           <span className="px-2">{children}</span> 
        </div>
       
    </> );
}

export default ErrorMensaje;