import React, { useEffect, useState } from 'react'
import { Box, Button, Card, FormLabel, Heading, Image, Input, Stack, Spinner } from '@chakra-ui/react'
import { createUser, getSingleUser } from '../services/UserService';
import { useUsers } from '../contexts/UserContext';

export default function UserForm({ formik, userId, isEditPage, userInputs, setUserInputs }) {

    // State to store userDetails
    const [userDetail, setUserDetail] = useState({})

    //Getting the context
    const { loading, setLoading } = useUsers()

    //Function to get the user detail based on id
    const getUser = async () => {
        setLoading(true)

        try {
            const response = await getSingleUser(userId);
            if (response) {
                setUserDetail(response)
                setLoading(false)
            }
        }
        catch (error) {
            console.log(error);
            setLoading(false)

        }
    }

    //Calling getSingleUserApi
    useEffect(() => {
        //If the page is create user then we don't need to call the api
        if (userId) {
            getUser()
        }
    }, [userId])

    // Update userInputs when userDetail is fetched or when isEditPage changes
    useEffect(() => {
        if (isEditPage && userDetail) {
            setUserInputs({
                name: userDetail.name || '',
                username: userDetail.username || '',
                phone: userDetail.phone || '',
                email: userDetail.email || '',
                website: userDetail.website || '',
                address: {
                    street: userDetail.address?.street || '',
                    suite: userDetail.address?.suite || '',
                    city: userDetail.address?.city || '',
                    zipcode: userDetail.address?.zipcode || ''
                },
                company: {
                    name: userDetail.company?.name || '',
                    catchPhrase: userDetail.company?.catchPhrase || '',
                    bs: userDetail.company?.bs || ''
                }
            });
        }
    }, [isEditPage, userDetail]);




    return (
        <>
            {
                loading ? <div className='flex justify-center my-10 items-center gap-3'>
                    <Spinner />
                    <small>Loading user detail</small>
                </div> :
                    <div className='flex flex-col justify-center items-center gap-5 w-full'>
                        {/* Personal Details Card */}
                        <Card className='p-5 w-full'>
                            <Stack spacing={4}>
                                <Heading as="h5" size="md" className='my-5'>Personal Details</Heading>

                                <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                    <Box className='w-full'>
                                        <FormLabel>Name <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Leanne Graham"
                                            value={formik.values.name}
                                            name='name'
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        // onChange={(e) => setUserInputs(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                        {
                                            formik.touched.name && formik.errors.name && (
                                                <small className='text-[red]'>
                                                    {formik.errors.name}
                                                </small>
                                            )
                                        }
                                    </Box>
                                    <Box className='w-full'>
                                        <FormLabel>username <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Bret"
                                            value={formik.values.username}
                                            name='username'
                                            // onChange={(e) => setUserInputs(prev => ({ ...prev, username: e.target.value }))}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.username && formik.errors.username && (
                                                <small className='text-[red]'>
                                                    {formik.errors.username}
                                                </small>
                                            )
                                        }
                                    </Box>
                                </div>

                                <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                    <Box className="w-full">
                                        <FormLabel>Email <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Bret@gmail.com"
                                            value={formik.values.email}
                                            name='email'
                                            // onChange={(e) => setUserInputs(prev => ({ ...prev, email: e.target.value }))}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.email && formik.errors.email && (
                                                <small className='text-[red]'>
                                                    {formik.errors.email}
                                                </small>
                                            )
                                        }
                                    </Box>
                                    <Box className="w-full">
                                        <FormLabel>Phone <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="1-770-736-8031 x56442"
                                            value={formik.values.phone}
                                            name='phone'
                                            // onChange={(e) => setUserInputs(prev => ({ ...prev, phone: e.target.value }))}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.phone && formik.errors.phone && (
                                                <small className='text-[red]'>
                                                    {formik.errors.phone}
                                                </small>
                                            )
                                        }
                                    </Box>
                                </div>

                                <Box className="w-full">
                                    <FormLabel>Website</FormLabel>
                                    <Input
                                        placeholder="hildegard.org"
                                        value={formik.values.website}
                                        name='website'
                                        // onChange={(e) => setUserInputs(prev => ({ ...prev, website: e.target.value }))}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </Box>
                                <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                    <Box className="w-full">
                                        <FormLabel>Street <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Kulas Light"
                                            value={formik.values?.address?.street}
                                            name='address.street'
                                            // onChange={(e) => setUserInputs(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched.address?.street && formik.errors.address?.street && (
                                                <small className='text-[red]'>
                                                    {formik.errors.address.street}
                                                </small>
                                            )
                                        }
                                    </Box>
                                    <Box className="w-full">
                                        <FormLabel>Suite <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Apt. 556"
                                            value={formik.values?.address?.suite}
                                            name='address.suite'
                                            // onChange={(e) => setUserInputs(prev => ({ ...prev, address: { ...prev.address, suite: e.target.value } }))}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched?.address?.suite && formik.errors?.address?.suite && (
                                                <small className='text-[red]'>
                                                    {formik.errors?.address?.suite}
                                                </small>
                                            )
                                        }
                                    </Box>
                                </div>
                                <div className='flex justify-center flex-wrap md:flex-nowrap gap-5'>
                                    <Box className="w-full">
                                        <FormLabel>City <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="Gwenborough"
                                            value={formik.values?.address?.city}
                                            name='address.city'
                                            // onChange={(e) => setUserInputs(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched?.address?.city && formik.errors?.address?.city && (
                                                <small className='text-[red]'>
                                                    {formik.errors?.address?.city}
                                                </small>
                                            )
                                        }
                                    </Box>
                                    <Box className="w-full">
                                        <FormLabel>Zipcode <span className='text-[red]'>*</span></FormLabel>
                                        <Input
                                            placeholder="92998-3874"
                                            value={formik.values?.address?.zipcode}
                                            name='address.zipcode'
                                            // onChange={(e) => setUserInputs(prev => ({ ...prev, address: { ...prev.address, zipcode: e.target.value } }))}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {
                                            formik.touched?.address?.zipcode && formik.errors?.address?.zipcode && (
                                                <small className='text-[red]'>
                                                    {formik.errors?.address?.zipcode}
                                                </small>
                                            )
                                        }
                                    </Box>
                                </div>
                            </Stack>
                        </Card>

                        {/* Company Details Card */}
                        <Card className="p-5 w-full">
                            <Stack spacing={4}>
                                <Heading as="h5" size="md" className='my-5'>Company Details</Heading>
                                <Box className="w-full">
                                    <FormLabel>Company Name <span className='text-[red]'>*</span></FormLabel>
                                    <Input
                                        placeholder="Romaguera-Crona"
                                        value={formik.values?.company?.name}
                                        name='company.name'
                                        // onChange={(e) => setUserInputs(prev => ({ ...prev, company: { ...prev.company, name: e.target.value } }))}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched?.company?.name && formik.errors?.company?.name && (
                                            <small className='text-[red]'>
                                                {formik.errors?.company?.name}
                                            </small>
                                        )
                                    }
                                </Box>
                                <Box className="w-full">
                                    <FormLabel>Catch Phrase <span className='text-[red]'>*</span></FormLabel>
                                    <Input
                                        placeholder="Multi-layered client-server neural-net"
                                        value={formik.values?.company?.catchPhrase}
                                        name='company.catchPhrase'
                                        // onChange={(e) => setUserInputs(prev => ({ ...prev, company: { ...prev.company, catchPhrase: e.target.value } }))}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched?.company?.catchPhrase && formik.errors?.company?.catchPhrase && (
                                            <small className='text-[red]'>
                                                {formik.errors?.company?.catchPhrase}
                                            </small>
                                        )
                                    }
                                </Box>
                                <Box className="w-full">
                                    <FormLabel>BS <span className='text-[red]'>*</span></FormLabel>
                                    <Input
                                        placeholder="harness real-time e-markets"
                                        value={formik.values?.company?.bs}
                                        name='company.bs'
                                        // onChange={(e) => setUserInputs(prev => ({ ...prev, company: { ...prev.company, bs: e.target.value } }))}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {
                                        formik.touched?.company?.bs && formik.errors?.company?.bs && (
                                            <small className='text-[red]'>
                                                {formik.errors?.company?.bs}
                                            </small>
                                        )
                                    }
                                </Box>


                            </Stack>
                        </Card>
                    </div>

            }

        </>
    )
}
