import { observer } from 'mobx-react-lite';
import React from 'react'
import LinkButton from '../../app/common/form/LinkButton';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';

export default observer(
    function HomePage() {
        const { userStore, modalStore } = useStore();
        return (
            <div className='h-full flex flex-col justify-center items-center'>

                {userStore.isLoggedIn ? (
                    <>
                        <h2 className='text-black text-3xl mb-6'>Welcome to Travel App</h2>
                        <LinkButton
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-blue-300 hover:bg-blue-400 "
                            to='/brands' >
                            Go to the App
                        </LinkButton>
                    </>

                ) : (
                    <>
                        <button onClick={() => modalStore.openModal(<LoginForm />)}
                           className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black bg-blue-300 hover:bg-blue-400 "
                        >
                            Login
                        </button>

                    </>

                )}

            </div>
        )
    }
)


