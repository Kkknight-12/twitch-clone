import { useEffect, useState } from "react";

const GoogleAuth = () => {
    const [ isSignedIn, setIsSignedIn ] = useState(null);
    const [ auth, setAuth ] = useState({});

    useEffect( ()=> {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init( {
                clientId:'582603124029-l1g8m5icd9hnqfvp0kj03h0t93u3tglg.apps.googleusercontent.com',
                scope:'email'
            }).then( () => {
                setAuth( window.gapi.auth2.getAuthInstance() );
                // setIsSignedIn( auth.isSignedIn.get() );
                // function inside listen will be invoked any
                // time authentication status get changed
                // auth.isSignedIn.listen( onAuthChange );
            })
        });
        // onAuthChange();
    }, []);

    console.log(Object.keys(auth).length !== 0)
    // console.log(auth.constructor)
    console.log(isSignedIn)

    useEffect( ()=> {
        const onAuthChange = () => {
            if(Object.keys(auth).length !== 0){
                setIsSignedIn( auth.isSignedIn.get() )
            }
        };
        onAuthChange()
    },[auth])

    const onSingIn = () =>{
        console.log(auth)
        auth.signIn();
        authButton()
    };

    const onSingOut = () =>{
        auth.signOut();
        authButton()
    };

    const authButton = () => {
        if( isSignedIn === null ){
            return <div>I don't know if we are signied in</div>
        } else if( isSignedIn ){
            return (
                <button
                    onClick={onSingOut}
                    className="ui red google button">
                    <i className="google icon"/>
                        Sign Out
                </button>
            )
        } else{
            return (
                <button 
                    onClick={onSingIn}
                    className="ui red google button">
                    <i className="google icon"/>
                        Sign In with Google
                </button>
            )
        }
    };
    // to signIn
    // gapi.auth2.getAuthInstance().signIn()
    return ( 
        <div>{authButton()}</div>
    );
}

export default GoogleAuth;