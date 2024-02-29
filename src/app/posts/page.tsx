"use client";
import Layout from "@/app/layout";
import { Header } from "@/components/header";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
};

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const response = await axios.get('/api/posts');
    return response.data;
  }

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  return (
    <Layout>
      <main className="container">
        <Header />

        <Table>
          <TableCaption>A list of your recent posts.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead className="text-right">Published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((posts: Post) => (
              <TableRow key={posts.id}>
                <TableCell className="font-medium">{posts.id}</TableCell>
                <TableCell className="font-medium">{posts.title}</TableCell>
                <TableCell className="font-medium">{posts.content}</TableCell>
                <TableCell>{posts.published ? 'Yes' : 'No' }</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {posts.length} posts
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </main>
    </Layout>
  );
}
