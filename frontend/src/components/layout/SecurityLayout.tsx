import ContainerCss from '../../assets/css/client/Container-Design.module.css'

export const SecurityLayout = ({ icon, title, description }: any) => {
    return (
        <>
            <div className={ContainerCss.container}>
                <div className="d-flex align-items-center justify-content-between">
                    {/* icon, title, description */}
                    <div className='d-flex align-items-center'>
                        <div>
                            <span className='rounded-circle' style={{ backgroundColor: 'lightgreen', color: 'green' }}>{icon}</span>
                        </div>
                        <div className='ms-2'>
                            <p style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '13px' }} className='mb-0'>{title}</p>
                            <p style={{ fontFamily: 'sans-serif', fontWeight: 'lighter', fontSize: '13px' }} className='text-secondary'>{description}</p>
                        </div>
                    </div>

                    {/* info, status */}
                    <div className="d-flex align-items-center">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora a autem aliquam repellat odit dolorem suscipit maxime voluptate vel, amet nobis molestiae ullam facere beatae in sed quasi quae pariatur.</p>
                    </div>
                </div>
            </div>
        </>
    )
}