import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect }  from 'react-redux';
import Button from '@material-ui/core/Button';

class Hero extends Component {
    renderLink() {
      switch(this.props.auth.auth) {
        case null:
          return;
        case false:
          return (
            <React.Fragment>
                <Link 
                    to='/login'
                    style={{ textDecoration: 'none'}}
                    className='HeroLink'
                >
                    <Button
                        variant='contained'
                        color='secondary'
                        size="large"
                    >
                        SignUp
                    </Button>
                </Link>
            </React.Fragment>
          )
        default: 
          return (
            <React.Fragment>
            </React.Fragment>
          );
      }
    }
    render() {
        return (
            <div className='HeroContainer'>       
                    <div className='HeroTextContainer'>
                        <h1 className="HeroTitle">Let's track that bug.</h1>
                    {this.renderLink()}
                    </div>
            </div>
        );
    };
  };


function mapStateToProps(auth) {
    return {
      auth: auth
    };
  }
  
  export default connect(mapStateToProps)(Hero);
  