import { useEffect, useState } from "react";
import { auth } from '../firebase'; // Adjust path as necessary
import { onAuthStateChanged } from "firebase/auth";

const AuthDetails: React.FC = () => {
    const [authUser, setAuthUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });


        return () => unsubscribe();
    }, []);

    return (
        <div>
            {authUser ? (
                <p>Logged in as {authUser.email}</p>
            ) : (
                <p>Signed out</p>
            )}
        </div>
    );
};

export default AuthDetails;