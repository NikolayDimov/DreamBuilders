import { Link } from 'react-router-dom';
import { formatDate } from "../../../../utils/formatDAte";
import { useAuth } from '../../../../contexts/AuthContext';


import './CatalogItem.css';

export default function ProjectItem({ item, children }) {
    const { user } = useAuth();


    return (
        <div className="col-lg-4 col-md-6">
            <div className="bg-light">
                <img className="img-fluid card-image" src={item.img} alt="Project Picture" />
                <div className="p-4">
                    <div className="d-flex justify-content-between mb-4">
                        <div className="d-flex align-items-center">
                            <i className="fa-regular fa-user"></i>
                            <span>{item.owner_email}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="ms-3">
                                <i className="far fa-calendar-alt text-primary me-2" />
                                {formatDate(item.createdAt)}
                            </span>
                        </div>
                    </div>
                    <h4 className="text-uppercase mb-3">
                        {item.projectName}
                    </h4>
                    <Link to={`/details/${item.id}`}>
                        <p className="text-uppercase fw-bold">
                            {user?.uid && item.owner_uid === user.uid
                                ? <span className='viewMyProject'>View My Project</span>
                                : 'View the Project'}
                            <i className="bi bi-arrow-right" />
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
