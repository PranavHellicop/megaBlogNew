import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE} from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import dbStore from '../../appwrite/config'

//we will reuse this form component, coz user may be visiting the form for editing purpose or to create a new post

const PostForm = ({post}) => {
    console.log(post? post:"post not present")
   
    const { register, handleSubmit, watch, getValues,
        setValue, control }
        = useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.slug || "",
                content: post?.content || "",
                status: post?.status || "active"
            }
        })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
    console.log(data)

        if (post) {
            const file = data.image[0] ? await dbStore.uploadFile(data.image[0]) : null

            if (file) {
                await dbStore.deleteFile(post.featuredImage)

            }
            const dbPost = await dbStore.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = data.image[0] ?
                await dbStore.uploadFile(data.image[0]) : null
            if (file) {

                data.featuredImage = file.$id

                const dbPost = await dbStore.createPost({
                    ...data,
                    userId: userData.$id
                })
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

        const slugTransform = useCallback((value) => {
            if (value && typeof value === "string") 
                return value
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-zA-Z\d\s]+/g, "-")
                    .replace(/\s/g, "-")
            

            return ""

        }, [])

        useEffect(() => {
            const subscription = watch((value, { name }) => {
                if (name === 'title') {
                    setValue("slug", slugTransform(value.title,
                        { shouldValidate: true }))
                }
            })

            return () => subscription.unsubscribe()

        }, [watch, slugTransform, setValue])

    

    return (
        <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
            <div className='w-2/3 px-2'>
                <Input
                    label="Title: "
                    className="mb-4"
                    {...register("title", {
                        required: true
                    })}
                />
                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {
                        required: true
                    })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.
                            currentTarget.value),
                            { shouldValidate: true })
                    }}
                />

                <RTE
                    name="content"
                    label="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>
            <div className='w-1/3 px-2'>
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {
                        required: !post
                    })}
                />
                {post && (
                    <div className='w-full mb-4'>
                        <img
                            src={dbStore.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className='rounded-lg'
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    
                    {...register("status", {
                        required: true
                    })}      
                />
                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className='w-full'
                >
                    {post ? "Update" : "Submit"}
                </Button>


            </div>

        </form>
    )
}

export default PostForm