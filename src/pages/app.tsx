import { Helmet } from 'react-helmet-async';
import HomeView from '../sections/home/homeview';

// ----------------------------------------------------------------------

export default function AppPage() {
    return (
        <>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>

            <HomeView />
        </>
    );
}
