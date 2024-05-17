import { Button, Container, Heading, IconButton, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import UserForm from '../components/UserForm';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBackIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useUsers } from '../contexts/UserContext';
import { createUser, updateUser } from '../services/UserService';

import { useFormik } from 'formik';
import * as Yup from "yup"

export default function UserPage() {

  //useNavigate router hook
  const navigate = useNavigate()

  const { id } = useParams();

  const [isEditPage, setIsEditPage] = useState(false)

  //State to handle button loading 
  const [btnLoading, setBtnLoading] = useState(false)

  //Getting the contexts
  const { handleDelete, toast, fetchUsers } = useUsers()

  // State to store user inputs
  const [userInputs, setUserInputs] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: ''
    }
  });

  //Checking whelther the page is edit page or create page
  useEffect(() => {
    if (id) {
      setIsEditPage(true)
    }
  }, [])

  //Function to Save the user data
  // const handleSave = async () => {
  //   setBtnLoading(true)
  //   try {

  //     const response = isEditPage ? await updateUser(id, userInputs) : await createUser(userInputs);
  //     if (response) {
  //       setBtnLoading(false)
  //       toast({
  //         title: `User ${isEditPage ? 'Updated' : 'Created'}`,
  //         description: `Success!, We have ${isEditPage ? 'Updated' : 'Created'} the user for you!`,
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true
  //       })
  //       navigate('/')

  //       //Calling the users list api
  //       fetchUsers();
  //     }
  //   }

  //   catch (error) {
  //     setBtnLoading(false)
  //     toast({
  //       title: "Error",
  //       description: error.message,
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true
  //     })
  //   }
  // }

  //Validation schema
  const userValidation = Yup.object().shape({
    name: Yup.string().required('Name is required!'),
    username: Yup.string().required('Username is required!'),
    email: Yup.string().email('Invalid Email!').required('Email is required!'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.object().shape({
      street: Yup.string().required('Street name is required'),
      suite: Yup.string().required('Suite is required!'),
      city: Yup.string().required('City name is required!'),
      zipcode: Yup.string().required('Zipcode is required!')
    }),
    company: Yup.object().shape({
      name: Yup.string().required('Company name is required!'),
      catchPhrase: Yup.string().required('Catch Phrase is required!'),
      bs: Yup.string().required('bs is required!')
    })
  });

  const userFormik = useFormik({
    initialValues: userInputs,
    validationSchema: userValidation,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setBtnLoading(true)
      try {

        const response = isEditPage ? await updateUser(id, values) : await createUser(values);
        if (response) {
          setBtnLoading(false)
          toast({
            title: `User ${isEditPage ? 'Updated' : 'Created'}`,
            description: `Success!, We have ${isEditPage ? 'Updated' : 'Created'} the user for you!`,
            status: "success",
            duration: 3000,
            isClosable: true
          })
          navigate('/')

          //Calling the users list api
          fetchUsers();
        }
      }

      catch (error) {
        setBtnLoading(false)
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true
        })
      }
    }
  })

  return (
    <>
      <Container maxW={"1000px"}>
        <form onSubmit={userFormik.handleSubmit}>
          <div className='flex flex-col gap-5 justify-center my-10 w-full'>
            <div className='flex justify-center md:justify-between flex-wrap gap-5'>
              <div className='flex items-center flex-wrap gap-5'>
                <IconButton icon={<ArrowBackIcon />} onClick={() => {
                  navigate('/');
                  fetchUsers();
                }} />
                <Heading as="h4" size="xl">{isEditPage ? "Edit or Delete User" : "Create User"}</Heading>
              </div>
              <div className='flex items-center flex-wrap md:flex-nowrap gap-5'>
                <Button colorScheme="twitter" size="md" leftIcon={(!btnLoading && isEditPage) && <EditIcon />} type='submit'>{btnLoading && <Spinner size={'sm'} />}{isEditPage ? " Update" : " Save"}</Button>
                {isEditPage && <Button colorScheme='red' leftIcon={<DeleteIcon />} onClick={() => handleDelete(id)}>Delete user</Button>}

              </div>
            </div>

            <UserForm
              userId={id}
              isEditPage={isEditPage}
              userInputs={userInputs}
              setUserInputs={setUserInputs}
              formik={userFormik}
            />
          </div>
        </form>


      </Container>

    </>
  )
}
