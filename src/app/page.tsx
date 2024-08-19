import { FetchPosts } from "@/actions/FetchPosts";
import Header from "@/components/custom/Header";
import HomeOfPosts, { post } from "@/components/custom/HomeOfPosts";
import mongoose from 'mongoose';


export const revalidate =  1000// revalidate at most every hour
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
  const fetch = await FetchPosts() as post[]
  const posts = transformPostData(fetch)
  return (
    <>
      <Header HomeHeader />
      <HomeOfPosts posts={posts} />
    </>
  );
}
