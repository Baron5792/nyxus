import React, { useEffect } from "react"
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Labels";
import { Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { AppButton } from "../../components/ui/Button";
import { toast } from "sonner";

export const Login = () => {
    useEffect(() => {
        document.title = `Login - ${import.meta.env.VITE_APP_NAME}`;
    }, [])

    // const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const handleVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }

    const [formData, setForData] = React.useState({
        email: '',
        password: ''
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toasterId = toast.loading('Processing', {id: 'processing', description: 'This could take a while'});
        const requiredFields = [
            { name: 'Email address', value: formData.email },
            { name: 'Password', value: formData.password }
        ]
        const formInput = requiredFields.find((input) => input.value.trim() === '');
        if (formInput) {
            toast.warning(`${formInput.name} is required to proceed`, {id: toasterId, description: 'Fill every required field to proceed'});
            return false;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_CONTROLLER}auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            })

            const request = await response.json();
            if (!response.ok || request.status === false) {
                toast.error(request.message || 'Something went wrong', {id: toasterId, description: 'Please try again'});
                return false;
            }

            toast.dismiss('processing');
            // navigate('/client/dashboard');
            window.location.href = '/client/dashboard';
        }

        catch (error) {
            toast.error('Something went wrong', {id: toasterId, description: 'Please try again later'});
        }
    }

    return (
        <>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <Label htmlFor="email" title="Email" required />
                    <Input type="email" placeholder="example@gmail.com" value={formData.email} name="email" className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group">
                    <Label htmlFor="password" title="Password" required />
                    <div className="input-group">
                        <Input type={passwordVisible ? "text": 'password'} placeholder="********" value={formData.password} name="password" className="form-control border-end-0" onChange={handleInput} />
                        <button type="button" className="btn btn-normal border-start-0 border-top border-end border-bottom border-success text-success" onClick={handleVisibility}>{passwordVisible ? (
                            <EyeOff strokeWidth={1} />
                        ): <Eye strokeWidth={1} />}</button>
                    </div>
                </div>

                {/* forgot password */}
                <div className="d-block">
                    <NavLink to={'/auth/reset/forgot-password'} className={'float-end text-decoration-none small text-success mt-1 mb-5'} style={{ fontFamily: 'sans-serif' }}>Forgot Password?</NavLink>
                </div>

                {/* submit button */}
                <div className="py-4">
                    <AppButton type="submit" title="Sign In" className="btn btn-success form-control" />
                </div>

                {/* not signed up yet? */}
                <div>
                    <p className="small">Not signed up yet? <NavLink to={'/auth/register'} className={'text-decoration-none text-success'}>Register Now</NavLink></p>
                </div>
            </form>
        </>
    )
}