import FontHomepage from './Homepage/FontHomepage';
import AboutStart from './Homepage/AboutStart';
import ServiceStart from './Homepage/ServiceStart';
import Appointment from './Homepage/Appointment';
import Portfolio from './Homepage/Portfolio';
import Team from './Homepage/Team';
import Testimonial from './Homepage/Testimonial';
import LatestThreePosts from './Homepage/LatestThreePosts';


export default function Home() {
    return (
        <>
            <FontHomepage />
            <AboutStart />
            <ServiceStart />
            <Appointment />
            <Portfolio />
            <Team />
            <Testimonial />
            <LatestThreePosts />
        </>
    );
}