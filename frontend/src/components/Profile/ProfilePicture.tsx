import { Camera, UploadCloudIcon } from 'lucide-react';
import css from '../../assets/css/client/Container-Design.module.css';
import DefaultImg from '../../assets/images/avatar/bandmember.jpg';
import { AppButton } from '../ui/Button';
import React, { useState, type FormEvent } from 'react';
import { CustomModal } from '../ui/Modal';
import { toast } from 'sonner';
import { UpdateAvatarService } from '../../service/Update-Avatar';
import { useUser } from '../../context/authContext';

export const ProfilePicture = () => {
    const { user, refreshUser } = useUser();
    const [modal, setModal] = useState(false);
    const handleModal = () => {
        setModal(true);
    }

    const borderStyle = {
        backgroundColor: '#f0f7ff',
        color: '#0a58ca',
        padding: '2px 6px 6px 6px',
        cursor: 'pointer',
        border: '2px dotted #0d6efd',
        borderRadius: '4px',
        fontSize: '14px',
        fontFamily: 'sans-serif',
    };

    const [fileName, setFileName] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const targetFile = e.target.files && e.target.files[0];
        if (!targetFile) {
            // handle file upoad
            setFileName(null);
            return;
        }
        setFile(targetFile);
        setFileName(targetFile.name);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const toasterId = toast.loading('Processing...', {id: 'updating'});
        const selectedFile = file;
        if (!selectedFile) {
            toast.warning('Please select a file', {id: toasterId, description: 'An image is required to proceed'});
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        if (!fileName) {
            toast.warning('Please select a file to upload', {id: toasterId});
            return false;
        }

        try {
            console.log('Form: ', formData);
            const request = await UpdateAvatarService(formData);
            if (request.success === false) {
                toast.error(request.message || 'Something went wrong', {id: toasterId, description: 'Your profile picture could not be updated. Please try again later.'});
                return false;
            }

            toast.success('Successfully updated', { id: toasterId, description: 'Your profile picture has been updated' });
            setModal(false);
            setFileName(null);
            setFile(null);
            refreshUser();
        }   

        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className={css['container']}>
                {/* title */}
                <div style={{ fontFamily: 'sans-serif', fontSize: '14px' }} className='fw-bold'>
                    <p>Profile Picture</p>
                </div>

                <div className='my-2 position-relative' style={{ width: '140px', height: '140px', margin: 'auto' }}>
                    {user && user.avatar && user.avatar.length > 0 ? (
                        <img src={`${import.meta.env.VITE_APP_AVATAR_URL}${user.avatar}`} alt={`${import.meta.env.VITE_APP_NAME} avatar`} className='rounded-circle w-100' style={{ height: '100%' }} />
                    ) : (
                        <img src={DefaultImg} alt={`${DefaultImg} - ${import.meta.env.VITE_APP_NAME}`} className='rounded-circle w-100' />
                    )}
                    <div className='position-absolute' style={{ bottom: '15px', right: '0px' }}>
                        <span className='bg-white p-2 rounded-circle' onClick={handleModal} >
                            <Camera className='text-secondary' />
                        </span>
                    </div>
                </div>
                <div className='text-center text-secondary' style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>
                    <p>JPG, PNG or JPEG. Max size of 4MB</p>
                </div>
                <div className='text-center'>
                    <AppButton type='button' className='btn btn-outline-success btn-sm rounded p-2' onClick={handleModal} title={'Change Photo'} />
                </div>
            </div>

            <CustomModal onClick={modal} onHide={() => setModal(false)} title='Update Avatar'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="file" onChange={handleInput} accept="image/*" className='d-none form-control' name='avatar' id='avatar' />
                        <label htmlFor='avatar' className='form-label d-block w-100 text-center py-5' style={borderStyle}>
                            <UploadCloudIcon />
                            {fileName ? fileName : (
                                <small style={{ overflow: 'hidden', fontFamily: 'sans-serif', fontSize: '13px' }} className='d-block ms-2'>{fileName}</small>
                            )}
                        </label>
                    </div>
                    <div className='text-end mt-3'>
                        <AppButton type='submit' className='btn btn-primary rounded-0 px-3 py-2' title={'Upload'} />    
                    </div>
                </form>
            </CustomModal>
        </>
    )
}