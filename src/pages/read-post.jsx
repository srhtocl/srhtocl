
import React, { useEffect, useState } from "react";
import Post from "../components/post";
import { getAllDocuments } from "../services/post-methods";

export default function AllPosts() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        (async () => { setPosts(await getAllDocuments()) })()

        
    }, []);


    return (

        <section className="sr-layout">

            {posts.map((post, key) => { return <Post key={key} post={post} /> })}
            
        </section>


    )

}