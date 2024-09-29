
import   {useState} from 'react';
import LoginForm from '../componets/Login';
import RegisterForm from '../componets/Register';

function  AuthPage() {
    const [isloging, setIsLoading] = useState(true);

    const handleAuthPage= async () => {
        setIsLoading( prevVal => {return !prevVal});
        
    } 
    return (
        <div>
            {isloging? (
                <LoginForm  handleToggle={handleAuthPage}/>
            ) : (
              <RegisterForm  handleToggle={handleAuthPage}/>
            )}
        </div>
    )
}

export default AuthPage;