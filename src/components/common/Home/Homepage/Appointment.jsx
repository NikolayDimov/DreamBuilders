import EmailForm from '../../EmailComponent/Email';


export default function Appointment() {


    return (
        <div className="container-fluid py-6 px-5">
            <div className="row gx-5">
                <div className="col-lg-4 mb-5 mb-lg-0">
                    <div className="mb-4">
                        <h1 className="display-5 text-uppercase mb-4">
                            Request A <span className="text-primary">Call Back</span>
                        </h1>
                    </div>
                    <p className="mb-5">
                        If you want to connect with us. If you like some project and find it really cool. If want more information for some existing house project.
                        If You're having trouble creating your new project.
                        Just get in touch with us, and we'll provide you with details about the project and pricing.
                    </p>
                </div>
                <div className="col-lg-6">
                    <div className="contact-form bg-light p-5">
                        <EmailForm />
                    </div>
                </div>
            </div>
        </div>
    );
}