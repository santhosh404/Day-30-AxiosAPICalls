import React from 'react';
import UserDetailsCard from '../components/UserDetailsCard';
import { Button, Container, Tooltip, useColorMode, Spinner } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useUsers } from '../contexts/UserContext.jsx';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Dashboard() {

  const { allUsers, loading } = useUsers()
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <>
      <Container maxW={"1300px"}>
        <div className='flex justify-center md:justify-between gap-5 flex-wrap mx-10 md:mx-20 my-10'>
          <div className='flex gap-5 items-center flex-wrap'>
            <h1 className='text-3xl font-[900]'>All Users ({allUsers?.length})</h1>
            {

              colorMode === "dark" ? <Tooltip label={"Light Mode"}><SunIcon onClick={toggleColorMode} className='text-2xl cursor-pointer icon-font' /></Tooltip> :
                <Tooltip label={"Dark Mode"}><MoonIcon onClick={toggleColorMode} className='text-2xl cursor-pointer icon-font' /></Tooltip>

            }
          </div>
          <div className='flex gap-5 items-center flex-wrap md:flex-nowrap justify-center'>
            <Link to="/create-user"><Button colorScheme='twitter' className='w-full md:w-auto'>Create User</Button></Link>
          </div>


        </div>

        {/* Users List Card */}
        <div className='flex gap-10 flex-wrap items-center justify-center my-10'>
          {
            loading ? <div className='flex justify-center my-10 items-center gap-3'>
              <Spinner />
              <small>Loading users</small>
            </div> :
              allUsers?.length === 0 && !loading ? <p>No users exist</p> :
                allUsers?.map((user, idx) => (
                  <UserDetailsCard
                    key={idx}
                    user={user}
                    colorMode={colorMode}
                  />
                ))
          }
        </div>
      </Container>

    </>
  )
}
