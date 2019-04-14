// Dependencies
import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import styled from 'styled-components';


class Loading extends Component {
    render(){
        return (
            <LoadingWrapper>
            <div>
            <Button variant="primary" disabled>
                <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                Loading...
            </Button>
            </div>
            </LoadingWrapper>
        )
    }
}

const LoadingWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default Loading;
