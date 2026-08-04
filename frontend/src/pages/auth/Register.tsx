import React, { useEffect } from "react"
import { Input } from "../../components/ui/Input"
import { Label } from "../../components/ui/Labels"
import { AppButton } from "../../components/ui/Button"
import { NavLink, useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const Register = () => {
    useEffect(() => {
        document.title = `Register - ${import.meta.env.VITE_APP_NAME}`;
    }, [])

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        fullname: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        referralCode: ''
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const toasterId = toast.loading('Processing', {id: 'processing'});

        const requiredInputs = [
            { name: 'Full Name', value: formData.fullname },
            { name: 'Email', value: formData.email },
            { name: 'Phone Number', value: formData.phone },
            { name:'Password', value: formData.password },
            { name: 'Confirm Password', value: formData.confirmPassword }
        ];

        const emptyInput = requiredInputs.find((input) => input.value.trim() === '');
        if (emptyInput) {
            toast.warning(`${emptyInput.name} is required`, {id: toasterId, description: 'Fill every required field to proceed.'});
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.warning('Passwords do not match', {description: 'Passwords must match to proceed', id: toasterId});
            return false;
        }

        try {
            const response = await fetch (`${import.meta.env.VITE_APP_CONTROLLER}auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify({
                    fullname: formData.fullname,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                    referralCode: formData.referralCode
                })
            })

            const request = await response.json();
            if (!response.ok || request.status === false) {
                toast.error(request.message || 'Something went wrong', {id: toasterId})
                return false;
            }

            toast.success('Registration successful!', {id: toasterId, description: `Sign in immediately to invest on ${import.meta.env.VITE_APP_NAME}`});
            navigate('/auth/login');
        }

        catch (error: any) {
            toast.error(error.message || 'Something went wrong', {id: toasterId});
        }
    }

    return (
        <>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                    <Label htmlFor="fullname" title="Full Name" required />
                    <Input type="text" value={formData.fullname} placeholder="" name="fullname" className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group mb-4">
                    <Label htmlFor="email" title="Email" required />
                    <Input type="email" value={formData.email} placeholder="" name="email" className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group mb-4">
                    <Label htmlFor="phone" title="Phone Number" required />
                    <Input type="tel" value={formData.phone} placeholder="" name="phone" className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group mb-4">
                    <Label htmlFor="password" title="Password" required />
                    <Input type="password" value={formData.password} placeholder="" name="password" className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group mb-4">
                    <Label htmlFor="confirmPassword" title="Confirm Password" required />
                    <Input type="password" value={formData.confirmPassword} placeholder="" name="confirmPassword" className="form-control" onChange={handleInput} />
                </div>

                <div className="form-group mb-4">
                    <Label htmlFor="referralCode" title="Referral Code (Optional)" />
                    <Input type="text" value={formData.referralCode} placeholder="" name="referralCode" className="form-control" onChange={handleInput} />
                </div>

                <div>
                    <AppButton type="submit" className="form-control btn btn-success" title="Register" />
                </div>
                
                {/* Already have an account */}
                <div>
                    <p className="float-start mt-3 small">Alread have an account? <NavLink to={'/auth/login'} className={'text-decoration-none small text-success'}>Login Now</NavLink></p>
                </div>
            </form>
        </>
    )
}
        
     