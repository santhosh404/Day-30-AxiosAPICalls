import React from 'react';

// Chakra ui imports
import {
    Avatar,
    Card,
    Flex,
    Box,
    CardHeader,
    Heading,
    CardFooter,
    CardBody,
    Button,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
} from '@chakra-ui/react';

import { Link, useNavigate } from 'react-router-dom';

import menuIconLight from "../assets/three-dot-light.svg";
import menuIconDark from "../assets/three-dot-dark.svg";
import { useUsers } from '../contexts/UserContext';

export default function UserDetailsCard({ user, colorMode }) {

    const { handleDelete } = useUsers()
    const navigate = useNavigate()

    return (
        <>
            <Card maxW='md' sx={{ borderRadius: "20px" }}>
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={user.name} src={user?.avatar ? user?.avatar : "https://bit.ly/sage-adebayo"} />

                            <Box>
                                <Heading size='sm'>{user.name}</Heading>
                                <Text>@{user.username}</Text>
                            </Box>
                        </Flex>
                        {/* <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                        /> */}
                        {/* Edit and Delete Popovers */}
                        <Popover style={{ width: 'auto' }} placement='right-start'>
                            <PopoverTrigger>
                                <Button className={`${colorMode === "dark" ? "bg-gray-600" : "bg-gray-200"} cursor-pointer `} sx={{borderRadius: '100%', padding: 0}}>
                                    {
                                        colorMode === "dark" ?
                                            <img src={menuIconLight} />
                                            :
                                            <img src={menuIconDark} />
                                    }
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent width={"auto"}>
                                <PopoverArrow />
                                <PopoverBody>
                                    <p onClick={() => navigate(`user/${user.id}`)} className={`p-1 ${colorMode === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"} rounded-md cursor-pointer`}>Edit</p>
                                    <p onClick={() => handleDelete(user.id)} className={`p-1 ${colorMode === "dark" ? "hover:bg-red-500" : "hover:bg-red-200"} rounded-md cursor-pointer`}>Delete</p>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>

                    </Flex>
                </CardHeader>
                <CardBody>
                    <h3 className='text-[14px] font-[700] my-2'>User Details</h3>
                    <div className={`${colorMode === 'light' ? 'bg-[#f5f5f5]' : 'bg-[#1A202C]'} flex flex-wrap gap-5 justify-between w-full p-5 rounded-xl`}>
                        <div className='flex flex-col'>
                            <Text className='font-bold text-[13px] text-[gray]'>Phone</Text>
                            <p className='w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px]'>{user.phone}</p>
                        </div>

                        <div className='flex flex-col'>
                            <Text className='font-bold text-[13px] text-[gray]'>Email</Text>
                            <Text className='w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px]'>{user.email}</Text>
                        </div>
                        <div className='flex flex-col'>
                            <Text className='font-bold text-[13px] text-[gray]'>Website</Text>
                            <a href='conrad.com' className='w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px]'>{user.website}</a>
                        </div>
                        <div className='flex flex-col'>
                            <Text className='font-bold text-[13px] text-[gray]'>Com name</Text>
                            <p className='w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px]'>{user.company.name}</p>
                        </div>

                        <div className='flex flex-col'>
                            <Text className='font-bold text-[13px] text-[gray]'>Catch Phrase</Text>
                            <Text className='w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px]'>{user.company.catchPhrase}</Text>
                        </div>
                        <div className='flex flex-col'>
                            <Text className='font-bold text-[13px] text-[gray]'>BS</Text>
                            <a href='conrad.com' className='w-[80px] overflow-hidden whitespace-nowrap text-ellipsis text-[13px]'>{user.company.bs}</a>
                        </div>
                    </div>
                </CardBody>


                <CardFooter
                    justify='space-between'
                    flexWrap='wrap'
                    sx={{
                        '& > button': {
                            minW: '136px',
                        },
                    }}
                >
                    <Link to={`user/${user.id}`} className='w-full'>
                        <Button colorScheme='gray' flex='1' className='w-full'>
                            View user
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </>
    )
}
