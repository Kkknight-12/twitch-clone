import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions"
// gapi.auth2.getAuthInstance().currentUser.get().getId()

class GoogleAuth extends Component{

    componentDidMount( ){
        window.gapi.load( 'client:auth2', () => {
            window.gapi.load( 'client:auth2', () => {
            window.gapi.client.init( {
                clientId:'582603124029-l1g8m5icd9hnqfvp0kj03h0t93u3tglg.apps.googleusercontent.com',
                scope: 'email'
            }).then( () => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange( this.auth.isSignedIn.get()  );
                // function inside listen will be invoked any
                // time authentication status get changed
                this.auth.isSignedIn.listen( this.onAuthChange );
            })
            }); 
        })
    }

    onAuthChange = ( isSignedIn ) => { // true or false
    //    console.log(this.props) // {isSignedIn: null, signIn: ƒ, signOut: ƒ}
        if( isSignedIn ){
            // action will run to reducer to match type
            // true or false
            // console.log(this.props.signIn()) // {type: "SIGN_IN"}
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            // console.log(this.props.signOut()) // {type: "SIGN_OUT"}
            this.props.signOut();
        }
    };

    onSingIn = () =>{
        // console.log(this.auth)
        this.auth.signIn();
    };

    onSingOut = () =>{
        this.auth.signOut()
    };

    authButton = () => {
        if( this.props.isSignedIn === null ){
            return <div>I don't know if we are signied in</div>
        } else if( this.props.isSignedIn ){
            return (
                <button
                    onClick={this.onSingOut}
                    className="ui red google button">
                    <i className="google icon"/>
                        Sign Out
                </button>
            )
        } else{
            return (
                <button 
                    onClick={this.onSingIn}
                    className="ui red google button">
                    <i className="google icon"/>
                        Sign In with Google
                </button>
            )
        }
    };

    // to signIn
    // gapi.auth2.getAuthInstance().signIn()
    render(){
        // console.log(this.auth)
        return (
            <div>{this.authButton()}</div>
            );
        };
};

const mapStateToProps = ( state ) => {
    // console.log(state)
    /* {auth: {…}}
            auth: {isSignedIn: null} */
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect( mapStateToProps, { signIn, signOut } )(GoogleAuth);