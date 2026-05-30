import { ShieldCheck } from 'lucide-react';
import ContainerCss from '../../assets/css/client/Container-Design.module.css'
import { Input } from '../ui/Input';
import { Label } from '../ui/Labels';   
import { useUser } from '../../context/authContext';
import { allCountries } from 'country-telephone-data';
import { AppButton } from '../ui/Button';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'sonner';
import { ProfileUpdateService } from '../../service/HandleProfileFormSubmission';

export const PersonalInformation = () => {
    const { user, refreshUser } = useUser();

    const getFlagEmoji = (countryCode: string) => {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char =>  127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    };

    const [formData, setFormData] = useState({
        fullname: user?.fullname,
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
        dob: user?.dob,
        address: user?.address,
        city: user?.city,
        state: user?.state,
        postal_code: user?.postal_code,
        country_code: user?.countryCode
    })

    useEffect(() => {
        if (user) {
            setFormData({
                fullname: user?.fullname,
                username: user?.username,
                email: user?.email,
                phone: user?.phone,
                dob: user?.dob,
                address: user?.residentialAddress,
                city: user?.city,
                state: user?.state,
                postal_code: user?.postalCode, 
                country_code: user?.countryCode
            })
        }
    }, [user])

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toasterId = toast.loading('Updating information...', {id: 'updating'});
        const requiredFields = [
            { name: 'Residential address', value: formData.address },
            { name: 'City', value: formData.city },
            { name: 'State', value: formData.state },
            { name: 'Postal code', value: formData.postal_code },
            { name: 'Country code', value: formData.country_code },
            { name: 'Phone number', value: formData.phone }
        ];

        const emptyInput = requiredFields.find((input) => !input.value || input.value.trim() === '');
        if (emptyInput) {
            toast.warning(`${emptyInput.name} is required to proceed`, {id: toasterId});
            return false;
        }

        /**
         * fix issue of not raeding some input values
         */

        try {
            const request = await ProfileUpdateService(formData);
            console.log(formData);
            if (request.success === false) {
                toast.error(request.message || 'Something went wrong', {id: toasterId});    
                return false;
            }

            toast.success('Profile updated successfully', {id: toasterId});
            refreshUser();
        }

        catch (error) {
            toast.error('Something went wrong', {id: toasterId});
        }
    }

    const cancelProcess = () => {
        setFormData({
            fullname: user?.fullname || '',
            username: user?.username || '',
            email: user?.email || '',
            phone: user?.phone || '',
            dob: user?.dob || '',
            address: user?.address || '',
            city: user?.city || '',
            state: user?.state || '',
            postal_code: user?.postal_code || '',
            country_code: user?.countryCode || ''
        });
    }

    return (
        <>
            <div className={`${ContainerCss.container} mb-5 pb-5`}>
                {/* title */}
                <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='fw-bold'>
                    <p className='m-0'>Personal Information</p>
                    <small className='text-secondary'>Update your personal details.</small>
                </div>

                {/* form here */}
                <form onSubmit={handleSubmit}>
                    <div className="container-fluid p-0 mt-3">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'fullname'} required title='Full Name'></Label>
                                    <Input type='text' className='form-control' readOnly name='fullname' value={formData.fullname} placeholder='Enter full name' onChange={handleInput} />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'username'} required title='Username'></Label>
                                    <Input type='text' className='form-control' name='username' readOnly value={formData.username} placeholder='Enter username' onChange={handleInput} />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'email'} required title='Email Address'></Label>
                                    <Input type='text' className='form-control' name='email' readOnly value={formData.email} placeholder='Enter email' onChange={handleInput} />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'phone'} required title='Phone Number'></Label>
                                    <div className="input-group">
                                        <select name="country_code" id="" value={formData.country_code || ''} onChange={handleInput} className='border-secondary text-dark rounded-start' style={{ fontFamily: 'sans-serif', fontSize: '14px' }}>
                                            <option value={formData.country_code || null}>+ {formData.country_code || '000'}</option>
                                            {allCountries.map((country: any) => (
                                                <option key={country.iso2} value={country.dialCode}>
                                                    {getFlagEmoji(country.iso2)} +{country.dialCode}
                                                </option>
                                            ))}
                                        </select>
                                        <Input type='tel' className='form-control' name='phone' value={formData.phone} placeholder='123456789' onChange={handleInput} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'dob'} required={false} title='Date of Birth'></Label>
                                    <Input type='date' className='form-control' name='dob' value={formData.dob} onChange={handleInput} />
                                </div>
                            </div>
                            
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'address'} required={true} title='Residential Address'></Label>
                                    <Input type='text' className='form-control' placeholder='e.g. 1 Demo street' name='address' value={formData?.address} onChange={handleInput} />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'city'} required={true} title='City'></Label>
                                    <Input type='text' className='form-control' name='city' placeholder='e.g. New York' value={formData.city} onChange={handleInput} />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'state'} required={true} title='State'></Label>
                                    <Input type='text' className='form-control' name='state' placeholder='e.g. Florida' value={formData.state} onChange={handleInput} />
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-6 col-xl-6 mb-2">
                                <div className="form-group">
                                    <Label htmlFor={'postal code'} required={true} title='Postal Code'></Label>
                                    <Input type='text' className='form-control' name='postal_code' placeholder='e.g. 1391ADF' value={formData.postal_code} onChange={handleInput} />
                                </div>
                            </div>

                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="alert alert-success">
                                    <div className="d-flex align-items-center">
                                        <span>
                                            <ShieldCheck size={24} strokeWidth={3} />
                                        </span>
                                        <div className='ms-2'>
                                            <p className='m-0' style={{ fontFamily: 'sans-serif' }}>Your information is secure</p>
                                            <p className='m-0' style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>{import.meta.env.VITE_APP_NAME} uses bank-level encryption to keep your personal information safe and secure.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="float-end">
                                    <AppButton title={'Cancel'} type='button' onClick={cancelProcess} className='btn btn-outline-secondary rounded-0 p-2' />
                                    <AppButton title={'Save Changes'} type='submit' className='btn btn-success p-2 rounded-0 ms-3' />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}