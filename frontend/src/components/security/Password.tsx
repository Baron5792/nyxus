import { Fingerprint, X } from 'lucide-react'
import css from './../../assets/css/client/Container-Design.module.css'
import { AppButton } from '../ui/Button'
import { useTheme } from '../../context/ThemeContext'
import React, { useState, type FormEvent } from 'react'
import { Label } from '../ui/Labels'
import { Input } from '../ui/Input'
import { toast } from 'sonner'
import { CustomModal } from '../ui/Modal'

export const ChangePassword = () => {
    const { theme } = useTheme();
    const [modal, setModal] = React.useState(false);
    const showModal = () => {
        setModal(!modal);
    }

    const [input, setInput] = useState({
        current_password: '',
        new_password: '',
        confirm_new_password: ''
    })

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const submitForm = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const toasterId = toast.loading("Processing...", {id: 'processing'});
        const requiredInput = ['new_password', 'current_password', 'confirm_new_password'];
        for (const element of requiredInput) {
            const formattedName = element.replace(/_/g, " ");
            if (!input[element as keyof typeof input].trim()) {
                toast.warning(`${formattedName} is required to proceed.`, { id: toasterId });
                return;
            }
        }   

        if (input.new_password !== input.confirm_new_password) {
            toast.warning('New password does not match.', {id: toasterId});
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_CONTROLLER}client/update/change-password`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(input),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const request = await response.json();

            if (!request.success === true) {
                toast.error(request.message || 'Something went wrong', {id: toasterId});
                return;
            }

            toast.success('Password changed successfully', {id: toasterId});
            setModal(false);
        }

        catch (e) {
            console.log(e);
            toast.error('Something went wrong', {id: toasterId});
        }
    }

    return (
        <>
            <div className={theme === 'dark' ? css['dark-no_margin']: css.no_margin}>
                <div className="d-lg-flex d-block align-items-center justify-content-between">
                    {/* icon and description */}
                    <div className='d-flex align-items-center'>
                        <div>
                            <span className='d-flex align-items-center justify-content-center rounded-circle bg-success' style={{ width: '40px', height: '40px' }}>
                                <Fingerprint className='text-white' size={24} />
                            </span>
                        </div>
                        <div className='ms-2'>
                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: '' }}>Password</p>
                            <p className='m-0 text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '12px' }}>Update your password regularly to keep your account secure.</p>
                        </div>
                    </div>
                    {/* status and button */}
                    <div className='d-flex align-items-center '>
                        <span style={{ fontFamily: 'sans-serif', fontSize: '12px' }} className={`text-${theme === 'dark' ? 'secondary': 'muted'} me-3`}>Last changed: 2 days ago</span>
                        <AppButton onClick={showModal} type='button' className='btn btn-outline-success btn-sm px-2' title="Change" />
                    </div>
                </div>
            </div>


            <CustomModal title='Change Password' onHide={() => setModal(false)} onClick={modal}>
                <form onSubmit={submitForm}>
                    <div className='px-3 py-4'>

                        {/* Content */}
                        <div className='mt-3'>
                            <div className="form-group mb-2">
                                <Label htmlFor='current password' title='Current Password' required />
                                <Input type='password' onChange={handleInput} className='d-block form-control' name='current_password' />
                            </div>

                            <div className="form-group mb-2">
                                <Label  htmlFor='new_password' title='New Password' required />
                                <Input type='password' className='d-block form-control' onChange={handleInput} name='new_password' />
                            </div>

                            <div className="form-group mb-4">
                                <Label  htmlFor='confirm_new_password' title='Confirm New Password' required />
                                <Input type='password' className='d-block form-control' onChange={handleInput} name='confirm_new_password' />
                            </div>

                            <div className="form-group">
                                <AppButton type='submit' className='btn btn-success btn-lg rounded-0 py-2 px-2' title={'Change Password'} />
                            </div>
                        </div>
                    </div>
                </form>
            </CustomModal>
        </>
    )
}