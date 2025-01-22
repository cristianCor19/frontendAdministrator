import {useForm} from 'react-hook-form'
import {useSession} from '../context/SessionContext'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import '../styles/login.css'

function LoginPage(){

    const { register, handleSubmit,
        formState: { errors }, setValue} = useForm({
        defaultValues: {
          email: '',
          password: ''
        }
    });
    const {signin, errors: signinErrors, isAuthenticated,  role, logout} = useSession()
    const navigate = useNavigate()
    

    const onSubmit = handleSubmit(async (data) => {
        try {
          await signin(data);
          if (!isAuthenticated) {
            setValue('password', '');
          }
        } catch (error) {
          console.error('Login error:', error);
        }
    });

    useEffect(() => {
        
        if (role === 'customer') {
            console.log('entro');
            logout()
            navigate('/login')
        }else{

            if(isAuthenticated) navigate('/Home')
        }
    }, [isAuthenticated, logout, navigate, role])
    

    return(
        <div className='principal login-test'>
            <div className="container--login">
                    {signinErrors.map((error, i) => (
                    <div className="bg-red-500 text-white text-center text-errors" key={i}>
                        {error}
            
                    </div>
                    ))}
                    <form onSubmit={onSubmit} className="form--box">
                        
                        <div className="container--input">
                            <input 
                                type="email"
                                className="input-field placeholder" placeholder="Digite su usuario"
                                {...register("email", { 
                                    required: "El correo es requerido",
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "correo inválido"
                                    }
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="container--input">
                            <input 
                                type="password" 
                                name="user" id="user" required placeholder="Digite su contraseña"
                            
                                {...register("password", { 
                                    required: "La contraseña es requerida",
                                    minLength: {
                                        value: 6,
                                        message: "La contraseña debe tener al menos 8 caracteres"
                                    }
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="container--adiccionales">
                            <Link to={"/formRecovery"} className="login--link">He olvidado mi contraseña</Link>
                        </div>
                        <button type="submit">Iniciar sesión</button>
                        
                    </form>
            </div>
        </div>
    )
}

export default LoginPage