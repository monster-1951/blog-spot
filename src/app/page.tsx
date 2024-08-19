import { FetchPosts } from "@/actions/FetchPosts";
import Header from "@/components/custom/Header";
import HomeOfPosts, { post } from "@/components/custom/HomeOfPosts";
import mongoose from 'mongoose';



// const post = [
//   {
//     _id: new ObjectId('66c1f6b4de7b23fb36f8ad8b'),
//     postedBy: new ObjectId('66c18b3153ee4b3e6ea26b6d'),
//     title: '<p><span style="color: rgb(34, 170, 68);">The Rise of AI in Modern Technology</span></p>',
//     content: '<p><span style="color: rgb(34, 170, 68);">Artificial intelligence (AI) has transformed from a futuristic concept into a reality that permeates various industries. From healthcare to finance, AI is making waves, offering solutions that were once thought impossible. This blog explores the impact of AI on modern technology and what the future holds.</span></p>',
//     category: [ 'Technology' ],
//     media: '',
//     comments: [],
//     likes: [],
//     createdAt: 2024-08-18T13:27:16.744Z,
//     updatedAt: 2024-08-18T13:27:16.744Z,
//     __v: 0
//   }
// ]

export default async function Home() {
  const { ObjectId } = mongoose.Types;
  const transformPostData = (data: any[]): post[] => {
    return data.map(item => ({
      _id: item._id instanceof ObjectId ? item._id.toString() : item._id,
      postedBy: item.postedBy instanceof ObjectId ? item.postedBy.toString() : item.postedBy,
      author: item.author,
      title: item.title,
      content: item.content,
      category: item.category,
      media: item.media,
      comments: item.comments.map((comment: any) => comment.toString()), // Convert comments if needed
      likes: item.likes.map((like: any) => like.toString()), // Convert likes if needed
      createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
      updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : item.updatedAt,
      __v: item.__v
    }));
  };
  const fetch = (await FetchPosts()) as post[]
  const posts = transformPostData(fetch)
  // console.log(fetch,"fetch ➕")
  return (
    <>
      <Header HomeHeader />
      <HomeOfPosts posts={posts} />
    </>
  );
}
