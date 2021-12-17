import { observer } from 'mobx-react-lite';
import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(
    function ServerError() {
        const {commonStore} = useStore();
    
        return (
            <Container>
                <Header as='h1'>Server Error</Header>
                <Header sub as='h5'>{commonStore.error?.message}</Header>
                {commonStore.error?.details &&
                    <Segment>
                        <Header as ='h4' content='Stack Trace' color='teal'/>
                        <code style={{marginTop: '10px'}}>{commonStore.error?.details}</code>
                    </Segment>
                }
            </Container>
        )
    }
) 